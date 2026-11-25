// Exercise the actual loader without fetching or executing script URLs.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '../tests/performance/index.html'), 'utf8');
assert.ok(html.includes('<script src="./loader.js"></script>'), 'The page loads the tested entry point.');
const loader = fs.readFileSync(path.join(__dirname, '../tests/performance/loader.js'), 'utf8');
const cases = [
  ['', '../../build/two.js'],
  ['?bundle=', '../../build/two.js'],
  ['?bundle=current', '../../build/two.js'],
  ['?bundle=baseline', '/baseline.js'],
  ['?bundle=%62aseline', '/baseline.js'],
  ['?bundle=BASELINE', '../../build/two.js'],
  ['?bundle=/baseline.js', '../../build/two.js'],
  ['?bundle=../../other.js', '../../build/two.js'],
  ['?bundle=https://example.invalid/script.js', '../../build/two.js'],
  ['?bundle=//example.invalid/script.js', '../../build/two.js'],
  ['?bundle=javascript:alert(1)', '../../build/two.js'],
  ['?bundle=data:text/javascript,alert(1)', '../../build/two.js'],
  ['?bundle=baseline%2f..%2fother.js', '../../build/two.js'],
];

for (const [search, expected] of cases) {
  const scripts = [];
  vm.runInNewContext(loader, {
    location: { search },
    URLSearchParams,
    document: {
      createElement(tag) { assert.strictEqual(tag, 'script'); return {}; },
      body: { appendChild(script) { scripts.push(script); } },
    },
  });
  assert.strictEqual(scripts.length, 1, 'One bundle is selected: ' + search);
  assert.strictEqual(scripts[0].src, expected, 'Bundle selection is closed: ' + search);
  scripts[0].onload();
  assert.strictEqual(scripts.length, 2, 'The workload loader is appended: ' + search);
  assert.strictEqual(scripts[1].src, './workloads.js', 'The workload URL stays fixed.');
}
console.log('Benchmark loader: ' + cases.length + ' selector cases passed.');
