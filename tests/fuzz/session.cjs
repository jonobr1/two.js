const playwright = require('playwright');

function deadline(promise, milliseconds, message) {
  let timer;
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new Error(message)), milliseconds);
    }),
  ]).finally(() => clearTimeout(timer));
}

class Session {
  constructor(url, { browser = 'chromium', build = 'source', timeout = 2000 } = {}) {
    if (!['chromium', 'firefox', 'webkit'].includes(browser)) throw new Error('Unknown browser');
    if (!['source', 'umd', 'esm', 'min'].includes(build)) throw new Error('Unknown build');
    this.url = url;
    this.browserName = browser;
    this.build = build;
    this.timeout = timeout;
  }

  async start() {
    if (this.browser && this.browser.isConnected()) return;
    await this.close();
    this.server = await playwright[this.browserName].launchServer({ headless: true, timeout: 15000 });
    this.browser = await playwright[this.browserName].connect(this.server.wsEndpoint(), { timeout: 15000 });
    this.metadata = { browser: this.browserName, version: this.browser.version(), build: this.build, viewport: [256, 256], deviceScaleFactor: 1 };
  }

  async close() {
    const server = this.server;
    this.server = null;
    this.browser = null;
    if (server) await deadline(server.kill(), 5000, 'Browser process termination failed');
  }

  async run(input, selfTest = false) {
    await this.start();
    let context, result, teardownError;
    const logs = [], errors = [], blocked = [];
    let crashed = false;
    const record = (list, item) => { if (list.length < 50) list.push(item); };
    try {
      // Setup failures are infrastructure errors, never shrinkable property failures.
      context = await this.browser.newContext({ viewport: { width: 256, height: 256 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
      await context.route('**/*', (route) => {
        const url = route.request().url();
        if (url.startsWith(this.url + '/')) return route.continue();
        record(blocked, url);
        return route.abort();
      });
      const page = await context.newPage();
      page.on('console', (message) => record(logs, { type: message.type(), text: message.text() }));
      page.on('pageerror', (error) => record(errors, error.stack || error.message));
      page.on('crash', () => { crashed = true; });
      await page.goto(`${this.url}/tests/fuzz/index.html?build=${this.build}`, { timeout: 15000 });
      await page.waitForFunction(() => window.fuzzReady, null, { timeout: 15000 });
      const work = (async () => {
        const output = await page.evaluate(({ input, selfTest }) => window.runFuzzCase(input, selfTest), { input, selfTest });
        // Drain a task turn so unhandled rejections are observed before teardown.
        await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 0)));
        return output;
      })();
      try {
        result = await deadline(work, this.timeout, 'Case execution deadline exceeded');
        if (errors.length) result = { ok: false, category: 'unhandled-error', property: input.target, message: errors.join('\n') };
      } catch (error) {
        result = { ok: false, category: error.message === 'Case execution deadline exceeded' ? 'timeout' : (crashed || !this.browser.isConnected() ? 'crash' : 'execution-error'), property: input.target, message: error.stack };
        // Kill the actual browser process tree; rejecting the evaluate promise is insufficient.
        await this.close();
      }
    } finally {
      if (context && this.browser) {
        try { await deadline(context.close(), 2000, 'Context teardown stalled'); }
        catch (error) { await this.close(); teardownError = error; }
      }
    }
    if (teardownError) throw teardownError;
    return { ...result, logs, blocked, metadata: this.metadata };
  }
}

module.exports = { Session, deadline };
