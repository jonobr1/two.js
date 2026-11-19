const fs = require('node:fs/promises');
const path = require('node:path');
const playwright = require('playwright');
const { root, startServer } = require('./fuzz/server.cjs');
const { deadline } = require('./fuzz/session.cjs');
const { artifacts } = require('./fuzz/artifacts.cjs');

async function main() {
  const name = process.env.BROWSER || 'chromium';
  if (!['chromium', 'firefox', 'webkit'].includes(name)) throw new Error('Unknown browser');
  const local = await startServer();
  const output = await artifacts('browser-suite');
  let server;
  const errors = [], failures = [];
  try {
    server = await playwright[name].launchServer({ headless: true, timeout: 15000 });
    const browser = await playwright[name].connect(server.wsEndpoint());
    const page = await browser.newPage({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 1 });
    page.on('pageerror', (error) => errors.push(error.stack || error.message));
    await page.route('**/*', (route) => route.request().url().startsWith(local.url + '/') ? route.continue() : route.abort());
    await page.exposeFunction('qunitFailure', (failure) => failures.push(failure));
    await page.addInitScript(() => {
      window.qunitComplete = null;
      // Installed immediately after QUnit's local script loads, before tests run.
      window.attachQUnitReporter = () => {
        QUnit.config.testTimeout = 15000;
        QUnit.on('testEnd', (test) => {
          if (test.status === 'failed') window.qunitFailure({ name: test.fullName, errors: test.errors });
        });
        QUnit.on('runEnd', (result) => { window.qunitComplete = result.testCounts; });
      };
    });
    // Keep the interactive test page intact; replace its CDN routes for automation.
    await page.route('**/tests/index.html', async (route) => {
      let html = await fs.readFile(path.join(root, 'tests/index.html'), 'utf8');
      html = html.replace(/https:\/\/cdn.jsdelivr.net\/npm\/qunit@latest\/qunit\//g, '/node_modules/qunit/qunit/');
      html = html.replace('https://cdn.jsdelivr.net/npm/resemblejs@latest', '/node_modules/resemblejs/resemble.js');
      html = html.replace('https://cdn.jsdelivr.net/npm/qunit@latest', '/node_modules/qunit/qunit/qunit.js');
      html = html.replace('https://cdn.jsdelivr.net/npm/underscore@latest', '/node_modules/underscore/underscore-umd.js');
      html = html.replace('<script src="./src/utils.js">', '<script>window.attachQUnitReporter();</script><script src="./src/utils.js">');
      await route.fulfill({ contentType: 'text/html', body: html });
    });
    await page.goto(local.url + '/tests/index.html');
    await page.waitForFunction(() => window.qunitComplete !== null, null, { timeout: 120000 });
    const counts = await page.evaluate(() => window.qunitComplete);
    const report = { browser: name, counts, failures, errors };
    await output.save('browser-report.json', report);
    console.log(JSON.stringify(report, null, 2));
    console.log('Browser report: ' + output.directory);
    if (!counts.total || counts.failed || errors.length) throw new Error('Browser suite failed');
  } finally {
    if (server) await deadline(server.kill(), 5000, 'Browser termination failed');
    await local.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
