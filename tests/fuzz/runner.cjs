const fs = require('node:fs/promises');
const path = require('node:path');
const fc = require('fast-check');
const { startServer, root } = require('./server.cjs');
const { Session } = require('./session.cjs');
const { generators, commandSeeds } = require('./generators.cjs');
const { artifacts } = require('./artifacts.cjs');

function options(args) {
  const result = { browser: 'chromium', build: 'source', runs: 100, seed: 424242, budget: 180000, timeout: 2000 };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--corpus-only') result.corpusOnly = true;
    else if (arg === '--nightly') Object.assign(result, { runs: 1000, seed: Date.now() | 0, budget: 1500000 });
    else if (['--browser', '--build', '--target', '--path', '--runs', '--seed', '--budget', '--timeout'].includes(arg)) {
      const key = arg.slice(2), value = args[++i];
      if (value === undefined) throw new Error('Missing value for ' + arg);
      result[key] = ['runs', 'seed', 'budget', 'timeout'].includes(key) ? Number(value) : value;
    } else if (!arg.startsWith('-') && !result.file) result.file = arg;
    else throw new Error('Unknown argument: ' + arg);
  }
  for (const [key, min, max] of [['runs', 1, 1000000], ['seed', -2147483648, 2147483647], ['budget', 1000, 3600000], ['timeout', 50, 60000]]) {
    if (!Number.isInteger(result[key]) || result[key] < min || result[key] > max) throw new Error('Invalid ' + key);
  }
  if (result.target && !generators[result.target]) throw new Error('Unknown target: ' + result.target);
  if (result.path !== undefined && !result.target) throw new Error('--path requires --target');
  return result;
}

async function corpus() {
  const inputs = [...commandSeeds];
  for (const file of (await fs.readdir(path.join(root, 'tests/images/interpretation'))).sort()) {
    if (file.endsWith('.svg')) inputs.push({ target: 'svg-fixture', name: file, svg: await fs.readFile(path.join(root, 'tests/images/interpretation', file), 'utf8') });
  }
  for (const file of (await fs.readdir(path.join(__dirname, 'regressions'))).sort()) {
    if (file.endsWith('.json')) inputs.push(JSON.parse(await fs.readFile(path.join(__dirname, 'regressions', file), 'utf8')).input);
  }
  return inputs;
}

// Kept reusable so the harness tests verify the real shrinking/artifact pipeline.
async function discover(arbitrary, evaluate, output, parameters) {
  let original, signature, lastFailure, infrastructureError;
  const details = await fc.check(fc.asyncProperty(arbitrary, async (input) => {
    if (infrastructureError) return true;
    await output.save('active.json', { schemaVersion: 1, input });
    let result;
    try { result = await evaluate(input); }
    catch (error) { infrastructureError = error; return false; }
    if (result.ok) return true;
    const key = `${result.category}:${result.property}`;
    if (!original) {
      original = { input, result };
      signature = key;
      await output.save('original.json', original);
    }
    // Shrinking must preserve the initial failure rather than minimize a new bug.
    if (key !== signature) {
      await output.save('secondary.json', { input, result });
      return true;
    }
    lastFailure = result;
    return false;
  }), parameters);
  if (infrastructureError) {
    await output.save('infrastructure-error.json', { message: infrastructureError.stack });
    throw infrastructureError;
  }
  if (original) {
    const input = details.counterexample ? details.counterexample[0] : original.input;
    await output.failure(input, lastFailure, { seed: details.seed, path: details.counterexamplePath, numRuns: details.numRuns, numShrinks: details.numShrinks, interrupted: details.interrupted });
  }
  return { details, failed: Boolean(original) || details.failed || details.interrupted };
}

async function main(args = process.argv.slice(2)) {
  const config = options(args);
  const output = await artifacts();
  const server = await startServer();
  const session = new Session(server.url, config);
  const started = Date.now(), counts = {};
  let watchdog, cleanupError, status = 'failed';
  try {
    await output.save('config.json', config);
    console.log('Fuzz artifacts: ' + output.directory);
    // Outer wall-clock bound includes corpus, shrinking, setup, and teardown.
    watchdog = setTimeout(() => {
      console.error('Campaign deadline exceeded; active.json retains the in-flight case.');
      setTimeout(() => process.exit(1), 6000).unref();
      session.close().finally(() => process.exit(1));
    }, config.budget);
    const run = async (input) => {
      await output.save('active.json', { schemaVersion: 1, input });
      const result = await session.run(input);
      counts[input.target] = (counts[input.target] || 0) + 1;
      return result;
    };
    if (config.file) {
      const saved = JSON.parse(await fs.readFile(config.file, 'utf8'));
      if (!saved.input) throw new Error('Replay file must contain input');
      const result = await run(saved.input);
      await output.save('replay.json', result);
      if (!result.ok) { await output.failure(saved.input, result); throw new Error(JSON.stringify(result)); }
      console.log('Concrete case passed.');
    } else {
      // Concrete regressions and command-family coverage precede randomized discovery.
      for (const input of await corpus()) {
        const result = await run(input);
        if (!result.ok) { await output.failure(input, result); throw new Error(JSON.stringify(result)); }
      }
      if (!config.corpusOnly) {
        for (const [target, arbitrary] of Object.entries(generators)) {
          if (config.target && target !== config.target) continue;
          console.log(`${target}: seed=${config.seed}, runs=${config.runs}`);
          const { details, failed } = await discover(arbitrary, run, output, {
            seed: config.seed, numRuns: config.runs, path: config.path,
            interruptAfterTimeLimit: Math.min(30000 + config.runs * 500, config.budget - (Date.now() - started) - 1000),
            markInterruptAsFailure: true,
          });
          if (failed) throw new Error(`${target} failed; seed=${details.seed}, path=${details.counterexamplePath}. See ${output.directory}`);
        }
      }
      console.log('Fuzz campaign passed: ' + JSON.stringify(counts));
    }
    status = 'passed';
  } catch (error) {
    await output.save('run-error.json', { message: error.stack });
    throw error;
  } finally {
    try {
      try { await session.close(); }
      finally { await server.close(); }
    } catch (error) {
      status = 'failed';
      cleanupError = error;
    } finally {
      clearTimeout(watchdog);
      await output.save('summary.json', { status, counts, durationMs: Date.now() - started, metadata: session.metadata });
    }
  }
  if (cleanupError) throw cleanupError;
}

if (require.main === module) main().catch((error) => { console.error(error); process.exitCode = 1; });
module.exports = { main, discover, options };
