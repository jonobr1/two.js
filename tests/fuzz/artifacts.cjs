const fs = require('node:fs/promises');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { root } = require('./server.cjs');

async function artifacts(label = 'campaign') {
  const directory = path.join(root, '.fuzz-artifacts', `${label}-${new Date().toISOString().replace(/[:.]/g, '-')}-${process.pid}`);
  await fs.mkdir(directory, { recursive: true });
  const metadata = {
    schemaVersion: 1,
    revision: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
    node: process.version,
    fastCheck: require('fast-check/package.json').version,
    playwright: require('playwright/package.json').version,
  };
  const save = (name, data) => fs.writeFile(path.join(directory, name), JSON.stringify(data, null, 2) + '\n');
  await save('environment.json', metadata);
  return {
    directory, save,
    async failure(input, result, replay = {}) {
      await save('failure.json', { schemaVersion: 1, input, result, replay, environment: metadata });
      // Data is text, never interpolated into executable JavaScript or HTML markup.
      const data = JSON.stringify(input).replace(/</g, '\\u003c');
      await fs.writeFile(path.join(directory, 'reproduce.html'), `<!doctype html>
<meta charset="utf-8"><title>Two.js fuzz reproducer</title>
<p>Open from the repository's local HTTP server. Results appear below and in the console.</p>
<pre id="result"></pre><script type="application/json" id="input">${data}</script>
<script type="module">
import { execute } from '/tests/fuzz/targets.js';
const build = ${JSON.stringify(result.metadata?.build || 'source')};
let Two;
if (build === 'umd' || build === 'min') {
  const script = document.createElement('script');
  script.src = build === 'umd' ? '/build/two.js' : '/build/two.min.js';
  await new Promise((resolve, reject) => { script.onload = resolve; script.onerror = reject; document.head.appendChild(script); });
  Two = window.Two;
} else Two = (await import(build === 'esm' ? '/build/two.module.js' : '/src/two.js')).default;
const result = execute(Two, JSON.parse(document.getElementById('input').textContent));
document.getElementById('result').textContent = JSON.stringify(result, null, 2);
console.log(result);
</script>\n`);
    },
  };
}

module.exports = { artifacts };
