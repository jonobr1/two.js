/* eslint-env node */
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: __dirname,
  forbidOnly: !!process.env.CI,
  workers: 2,
  timeout: 30000,
  use: {
    baseURL: 'http://127.0.0.1:8081',
    trace: 'retain-on-failure',
  },
  projects: ['chromium', 'firefox', 'webkit'].map((browserName) => ({
    name: browserName,
    use: { browserName },
  })),
  webServer: {
    command: 'node_modules/.bin/esbuild --servedir=. --serve=127.0.0.1:8081',
    cwd: require('path').resolve(__dirname, '../..'),
    url: 'http://127.0.0.1:8081/tests/browser/import.html',
    reuseExistingServer: !process.env.CI,
  },
});
