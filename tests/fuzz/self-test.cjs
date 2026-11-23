const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { setTimeout: delay } = require('node:timers/promises');
const fc = require('fast-check');
const { startServer } = require('./server.cjs');
const { Session } = require('./session.cjs');
const { artifacts } = require('./artifacts.cjs');
const { discover } = require('./runner.cjs');

async function checkInterruptedDiscovery(duringShrink) {
  const output = await artifacts(duringShrink ? 'self-test-interrupted-shrink' : 'self-test-interrupted-case');
  const completed = [];
  let attempts = 0;
  const { details, failed } = await discover(
    fc.integer({ min: 7, max: 1000 }),
    async (input) => {
      attempts++;
      if (!duringShrink || attempts > 1) await delay(500);
      completed.push(input);
      return { ok: false, category: 'assertion', property: 'injected-failure', message: String(input) };
    },
    output,
    { seed: 12345, numRuns: 1, interruptAfterTimeLimit: 250, markInterruptAsFailure: true }
  );
  assert.equal(failed, true);
  assert.equal(details.interrupted, true);
  assert.equal(completed.length, duringShrink ? 2 : 1, 'Discovery waited for the interrupted candidate');
  const saved = JSON.parse(await fs.readFile(path.join(output.directory, 'failure.json'), 'utf8'));
  assert.equal(saved.input, completed[0], 'Replay uses the candidate known to have failed');
  assert.equal(saved.result.message, String(saved.input), 'Diagnostics describe the saved candidate');
  assert.equal(saved.replay.path, details.counterexamplePath);
  await fs.access(path.join(output.directory, 'reproduce.html'));
}

async function main() {
  await checkInterruptedDiscovery(false);
  await checkInterruptedDiscovery(true);
  const server = await startServer();
  const session = new Session(server.url, { timeout: 250 });
  const output = await artifacts('self-test');
  try {
    await session.start();
    const oldProcess = session.server.process();
    await output.save('active.json', { input: { target: 'hang' } });
    const hang = await session.run({ target: 'hang' }, true);
    assert.equal(hang.category, 'timeout');
    assert.ok(oldProcess.exitCode !== null || oldProcess.signalCode !== null, 'Hung browser process exited');
    assert.equal((await session.run({ target: 'healthy' }, true)).ok, true, 'Next case uses a healthy browser');
    const unhandled = await session.run({ target: 'unhandled' }, true);
    assert.equal(unhandled.category, 'unhandled-error');
    // Use the production runner: find, shrink, persist, and concretely replay.
    let foundFailure = false;
    const { details, failed } = await discover(
      fc.integer({ min: 0, max: 1000 }).map((number) => ({ target: 'failure', number })),
      async (input) => {
        const result = await session.run(input, true);
        if (!result.ok) foundFailure = true;
        else if (foundFailure) return { ok: false, category: 'assertion', property: 'different-bug' };
        return result;
      }, output,
      { seed: 12345, numRuns: 100, interruptAfterTimeLimit: 30000, markInterruptAsFailure: true }
    );
    assert.equal(failed, true);
    assert.equal(details.counterexample[0].number, 7, 'Shrank to the boundary');
    const saved = JSON.parse(await fs.readFile(path.join(output.directory, 'failure.json'), 'utf8'));
    assert.equal((await session.run(saved.input, true)).property, 'injected-failure');
    assert.equal(saved.replay.seed, 12345);
    assert.ok((await fs.readFile(path.join(output.directory, 'reproduce.html'), 'utf8')).includes('application/json'));
    let setupAttempts = 0;
    await assert.rejects(discover(fc.integer(), async () => {
      setupAttempts++;
      throw new Error('Injected infrastructure failure');
    }, output, { seed: 1, numRuns: 10 }), /Injected infrastructure failure/);
    assert.equal(setupAttempts, 1, 'Infrastructure failure is not re-executed during shrinking');
    console.log('Harness self-tests passed: hang recovery, unhandled errors, failure-preserving shrinking, interrupted discovery, infrastructure isolation, artifacts, replay.');
  } finally {
    await session.close();
    await server.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
