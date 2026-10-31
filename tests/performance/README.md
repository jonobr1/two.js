# Allocation benchmarks

Issue [#802](https://github.com/jonobr1/two.js/issues/802) reduces temporary
allocations without sharing caller-owned results or active recursive state.
The [module audit](./allocation-audit.md) covers all 53 runtime JavaScript
modules, including candidates intentionally deferred after ownership review.
The public API and handwritten declarations are unchanged.

## Run interactively

Run `npm run build` and `npm run dev`, then open
`http://localhost:8080/tests/performance/`. Select a workload and run it with
the browser's allocation profiler. A different build can be selected with
`?bundle=/path/to/two.js`. The interactive button reports CPU timings only;
elapsed time is not a measurement of allocations or GC.

## Run a comparison

Build an untouched checkout of the baseline with its own locked dependencies.
The optional driver uses Playwright and an installed Chrome executable. It
does not require adding dependencies to this library:

```sh
npm ci
npm run build
npm install --prefix /tmp/two-allocation-tools --no-audit --no-fund playwright
NODE_PATH=/tmp/two-allocation-tools/node_modules node utils/benchmark-allocations.js \
  --baseline /path/to/baseline/build/two.js \
  --browser '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --samples 300 --rounds 3 --output /tmp/two-allocation-results.json
```

The browser path is platform-specific. Alternatively, install Playwright's
Chromium and omit `--browser`. Omit `--baseline` to measure only the current
build, or use `--workloads path-hit,hit-query` to restrict the comparison.

The driver serves the fixtures on localhost with cross-origin isolation to
enable finer browser timers. It creates a fresh page for each measurement,
warms up for 100 steps, measures 300 CPU samples, and profiles a separate 300
steps. Baseline/current order alternates between rounds. CPU timings exclude
allocation sampling and tracing overhead.

The Chrome heap sampler uses a 4 KiB interval and includes objects collected
by minor and major GC. Allocated bytes are statistical estimates including
driver overhead, not exact object counts. GC event counts and durations are
recorded during the profiling pass, which itself affects collection behavior.
Forced collections bracket retained-heap measurements and are excluded from
the GC event counts. Disposed heap is also recorded after dropping fixtures.
The JSON includes build/workload hashes, per-round results, checksums, and
the largest sampled allocation sites.

Each step is one of the following:

| Workload | Work per step |
| --- | --- |
| matrix | 61.12 | 1.75 | 97.1% | 0.055 / 0.020 | 62 / 2 |
| curve-bounds | 160.68 | 15.63 | 90.3% | 0.105 / 0.030 | 167 / 17 |
| world-matrix | 62.68 | 20.26 | 67.7% | 0.065 / 0.045 | 65 / 21 |
| path-hit | 292.00 | 35.96 | 87.7% | 1.375 / 0.205 | 175 / 39 |
| hit-query | 1697.85 | 209.77 | 87.6% | 6.385 / 0.850 | 608 / 204 |
| svg | 75.38 | 36.73 | 51.3% | 0.230 / 0.220 | 34 / 16 |
| canvas | 43.16 | 5.23 | 87.9% | 0.325 / 0.295 | 36 / 6 |
| webgl | 43.52 | 5.60 | 87.1% | 10.020 / 10.005 | 45 / 7 |

Every baseline/current workload checksum matched in all three rounds. Sampled
allocation volume and GC event counts decreased across all workloads. GC
durations and renderer CPU timings vary between rounds; WebGL median p95
changed by -0.1%. These measurements support allocation reductions,
not a claim that every renderer becomes faster. Software WebGL timings do not
establish hardware-GPU performance. The third round was restarted in a fresh
Chrome process after a navigation timeout; the incomplete round was discarded.

Post-disposal heap stayed approximately stable between rounds. A separate
forced-GC WeakRef check tested an otherwise unreachable group and its shape
after one deepest-hit query: both survived on the baseline, while both were
collected on the current build. This demonstrates removal of that specific
cached-result retention path; it is not a general leak-proofing claim.

Remaining sampled sites include owned hit geometry, public bounds results,
SVG attribute/transform strings, and computed-matrix work. Further reuse
must preserve result ownership, mutation snapshots, callbacks, and recursive
lifetimes. No persistent geometry memoization or new invalidation scheme was
introduced.

## Correctness validation

- The new hit-query regressions failed against the baseline with eight
  assertion failures and pass with the cache fix.
- Full Chrome QUnit runner: **1,368 passed / 10 failed** assertions. The
  untouched rebuilt baseline has **1,144 passed / the same 10 failed** image
  comparisons. The added suites contribute 224 passing assertions with no
  additional failures. QUnit 3.0.0 and Resemble.js 5.0.0 were served locally
  in the browser harness.
- The non-WebGL runner loads the new suites and reports **1,147 passed / 4
  failed** assertions; its four image failures are also present in the full
  baseline run.
- Seeded differential checks matched the baseline exactly for 5,000 cubic
  bounds, 2,500 mixed line/cubic/arc hit geometries, 600 nested/transformed
  bounding boxes, and 9,000 containment queries.
- Regression coverage includes retained and mutated results, empty/deepest
  queries, nested filters and change events, option reset, callback exceptions,
  deep/short hierarchies, event arities, absolute/relative controls, arc sweep,
  degenerate radii, and nested SVG render hooks during child-list changes.
- `npm run build`, `npx eslint .`, `npm run types:check`,
  `npm run docs:generate`, `npm run docs:build`, and `git diff --check` pass.

The generated bundles and size statistics are refreshed. API documentation
generation was checked; unrelated generated source-link churn is excluded.
