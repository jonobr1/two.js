// Optional browser tooling: NODE_PATH=/path/to/node_modules node
// utils/benchmark-allocations.js --baseline /path/to/old/build/two.js
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { createHash } = require('crypto');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const options = {};
for (let i = 2; i < process.argv.length; i += 2) {
  options[process.argv[i].replace(/^--/, '')] = process.argv[i + 1];
}
const samples = Number(options.samples || 300);
const rounds = Number(options.rounds || 3);
const warmup = 100;
if (!Number.isInteger(samples) || samples <= 0 || !Number.isInteger(rounds) || rounds <= 0) {
  throw new Error('--samples and --rounds must be positive integers');
}
const baseline = options.baseline && path.resolve(options.baseline);
if (baseline) { fs.accessSync(baseline); }

const server = http.createServer((request, response) => {
  // Enable the browser's finer timer resolution for the small CPU workloads.
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = pathname === '/baseline.js' && baseline ? baseline :
    path.resolve(root, '.' + pathname);
  if (file !== baseline && !file.startsWith(root + path.sep)) {
    response.writeHead(403).end();
    return;
  }
  try {
    response.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' : 'text/html');
    response.end(fs.readFileSync(file));
  } catch (error) {
    response.writeHead(404).end(error.message);
  }
});

function summarizeProfile(node, totals) {
  const key = node.callFrame.functionName || '(anonymous)';
  totals[key] = (totals[key] || 0) + node.selfSize;
  let bytes = node.selfSize;
  for (const child of node.children || []) {
    bytes += summarizeProfile(child, totals);
  }
  return bytes;
}

function hashFile(file) {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

async function measure(browser, origin, name, version) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
  const client = await page.context().newCDPSession(page);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    const query = version === 'baseline' ? '?bundle=/baseline.js' : '';
    await page.goto(origin + '/tests/performance/index.html' + query);
    await page.waitForFunction(() => window.AllocationBenchmark);
    await client.send('HeapProfiler.enable');
    await page.evaluate(({ name, warmup }) => {
      window.scenario = window.AllocationBenchmark.create(name);
      for (let i = 0; i < warmup; i++) { window.scenario.step(); }
    }, { name, warmup });
    await client.send('HeapProfiler.collectGarbage');
    // Measure CPU time separately from allocation sampling and tracing overhead.
    const timings = await page.evaluate(samples => {
      const timings = [];
      for (let i = 0; i < samples; i++) {
        const start = performance.now();
        window.scenario.step();
        timings.push(performance.now() - start);
      }
      return timings.sort((a, b) => a - b);
    }, samples);
    await client.send('HeapProfiler.collectGarbage');
    const before = await client.send('Runtime.getHeapUsage');
    const events = [];
    client.on('Tracing.dataCollected', data => events.push(...data.value));
    await client.send('Tracing.start', { categories: 'devtools.timeline,v8', options: 'record-as-much-as-possible' });
    await client.send('HeapProfiler.startSampling', {
      samplingInterval: 4096,
      includeObjectsCollectedByMajorGC: true,
      includeObjectsCollectedByMinorGC: true,
    });
    const checksum = await page.evaluate(samples => {
      for (let i = 0; i < samples; i++) { window.scenario.step(); }
      return window.scenario.checksum();
    }, samples);
    const { profile } = await client.send('HeapProfiler.stopSampling');
    const traceComplete = new Promise(resolve => client.once('Tracing.tracingComplete', resolve));
    await client.send('Tracing.end');
    await traceComplete;
    await client.send('HeapProfiler.collectGarbage');
    const after = await client.send('Runtime.getHeapUsage');
    const allocationSites = {};
    const sampledAllocatedBytes = summarizeProfile(profile.head, allocationSites);
    const gc = events.filter(event => event.ph === 'X' &&
      (event.name === 'MinorGC' || event.name === 'MajorGC'));
    await page.evaluate(() => { window.scenario.dispose(); window.scenario = null; });
    await client.send('HeapProfiler.collectGarbage');
    const disposed = await client.send('Runtime.getHeapUsage');
    if (errors.length) { throw new Error(errors.join('\n')); }
    return {
      name, version, samples, checksum,
      p50Milliseconds: timings[Math.ceil(samples * 0.5) - 1],
      p95Milliseconds: timings[Math.ceil(samples * 0.95) - 1],
      sampledAllocatedBytes,
      gcCount: gc.length,
      gcMilliseconds: gc.reduce((sum, event) => sum + event.dur / 1000, 0),
      retainedHeapDeltaBytes: after.usedSize - before.usedSize,
      disposedHeapBytes: disposed.usedSize,
      topAllocationSites: Object.entries(allocationSites).sort((a, b) => b[1] - a[1]).slice(0, 8),
    };
  } finally {
    await page.close();
  }
}

async function checkHitResultRetention(browser, origin, version) {
  const page = await browser.newPage();
  try {
    await page.goto(origin + '/tests/performance/index.html' +
      (version === 'baseline' ? '?bundle=/baseline.js' : ''));
    await page.waitForFunction(() => window.AllocationBenchmark);
    const client = await page.context().newCDPSession(page);
    await page.evaluate(() => {
      const group = new window.Two.Group();
      const shape = new window.Two.Rectangle(0, 0, 10, 10);
      group.add(shape);
      group.getShapesAtPoint(0, 0, { mode: 'deepest' });
      window.hitQueryWeakRefs = [new window.WeakRef(group), new window.WeakRef(shape)];
    });
    await client.send('HeapProfiler.collectGarbage');
    return await page.evaluate(() => window.hitQueryWeakRefs.map(ref => !!ref.deref()));
  } finally {
    await page.close();
  }
}

async function main() {
  let browser;
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    browser = await chromium.launch({
      headless: true, executablePath: options.browser,
      args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
    });
    const origin = 'http://127.0.0.1:' + server.address().port;
    const names = options.workloads ? options.workloads.split(',') :
      ['matrix', 'curve-bounds', 'world-matrix', 'path-hit', 'hit-query', 'svg', 'canvas', 'webgl'];
    const versions = baseline ? ['baseline', 'current'] : ['current'];
    const report = {
      environment: { browser: browser.version(), platform: os.platform(), arch: os.arch(), cpu: os.cpus()[0].model },
      samples, rounds, warmup, samplingInterval: 4096,
      bundleHashes: {
        baseline: baseline ? hashFile(baseline) : null,
        current: hashFile(path.join(root, 'build/two.js')),
      },
      workloadsHash: hashFile(path.join(root, 'tests/performance/workloads.js')),
      // These are synchronous CPU workloads, not requestAnimationFrame intervals.
      measurements: [], hitQueryRetainedAfterGC: {},
    };
    for (let round = 0; round < rounds; round++) {
      for (const name of names) {
        // Alternate order to reduce systematic warm-up and thermal bias.
        const order = round % 2 ? versions.slice().reverse() : versions;
        for (const version of order) {
          const result = await measure(browser, origin, name, version);
          const peer = report.measurements.find(measurement =>
            measurement.round === round && measurement.name === name && measurement.version !== version);
          if (peer && peer.checksum !== result.checksum) {
            throw new Error('Workload checksum mismatch: ' + name + ', round ' + round);
          }
          report.measurements.push({ round, ...result });
          console.log(JSON.stringify({ round, ...result }));
        }
      }
    }
    for (const version of versions) {
      report.hitQueryRetainedAfterGC[version] = await checkHitResultRetention(browser, origin, version);
    }
    if (options.output) {
      fs.writeFileSync(options.output, JSON.stringify(report, null, 2) + '\n');
    }
    console.log(JSON.stringify({ hitQueryRetainedAfterGC: report.hitQueryRetainedAfterGC }));
  } finally {
    if (browser) { await browser.close(); }
    server.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
