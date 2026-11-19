const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const fc = require('fast-check');
const { startServer } = require('./server.cjs');
const { Session } = require('./session.cjs');
const { artifacts } = require('./artifacts.cjs');
const { discover } = require('./runner.cjs');

async function main() {
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
    console.log('Harness self-tests passed: hang termination, recovery, unhandled errors, failure-preserving shrinking, infrastructure isolation, artifacts, replay.');
  } finally {
    await session.close();
    await server.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
