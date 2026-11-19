# Browser fuzzing

This implements the first SVG and geometry workstream from [the fuzzing plan](../../FUZZING_PLAN.md). fast-check generates structured inputs in Node and shrinks failures. Playwright executes the real library in fresh browser contexts. This is generation-based fuzzing; coverage does not drive mutation.

## Run locally

Use Node from `.nvmrc`, then:

```sh
npm ci
npx playwright install chromium
npm run fuzz:self-test
npm run fuzz:smoke
```

`fuzz:smoke` replays the corpus first, then runs 100 cases for each of four targets with seed `424242`. The campaign has a three-minute wall-clock ceiling, including corpus, setup, discovery, shrinking, and teardown. The per-case execution deadline is two seconds after harness readiness. Browser startup/readiness has its own 15-second deadlines. A required browser that cannot start is an infrastructure failure.

```sh
npm run fuzz:smoke -- --target geometry --runs 500 --seed 123
npm run fuzz:smoke -- --target geometry --seed 123 --path '0:1:2'
npx playwright install firefox webkit
npm run fuzz:nightly -- --browser firefox
npm run build
npm run fuzz:smoke -- --corpus-only --build umd
npm run fuzz:smoke -- --corpus-only --build esm
npm run fuzz:smoke -- --corpus-only --build min
```

Options: `--browser chromium|firefox|webkit`, `--build source|umd|esm|min`, `--runs N`, `--seed N`, `--target TARGET`, `--path SHRINK_PATH`, `--budget MILLISECONDS`, `--timeout MILLISECONDS`, and `--corpus-only`. `--path` requires a target. Replay paths depend on the generator/dependency versions; concrete cases remain the preferred regression format. `PLAYWRIGHT_BROWSERS_PATH` may select a local browser cache.

Nightly mode uses a rotating recorded seed, 1,000 cases per target, and a 25-minute ceiling. Budget exhaustion fails visibly; counts are not a throughput guarantee. Specify options after `--nightly` to override its defaults. CI runs a Chromium smoke gate and shipped-build corpus replay on PRs; scheduled/manual jobs also explore all three browsers independently. Failure artifacts are retained for 14 days.

## Targets and contracts

| Target | Input and assertions |
| --- | --- |
| `svg-path` | A move and line followed by up to 20 structured commands. Generates absolute/relative `M/L/H/V/C/S/Q/T/A/Z`, finite decimal coordinates, arc flags, zero radii, repeated points, and compound paths. Compares ordinary numeric/whitespace spelling through `interpret()` with equivalent exponent/comma/newline spelling through `load()`, then updates the SVG renderer. Compares finite anchors/controls, world matrices, closure, and fill. Arc flags retain SVG's single-character syntax. |
| `svg-polyline` | Up to 30 points. Compares absolute commands through the DOM entry point with relative deltas through the text entry point. |
| `geometry` | Open/closed polylines, repeated/coincident vertices, sample positions near endpoints, translation, and reflection/scaling of coordinates. Checks analytic total length including closure, sample membership in the traversed segment, endpoints, translated bounds, and length invariance. `getPointAt()` estimates a curve parameter; it does not promise constant-speed interpolation. `Path.length` is local geometry, so the scaling property scales coordinates rather than the shape transform. |
| `transforms` | Well-conditioned invertible matrices, rotations, nonzero uniform scales including reflection, and simple shapes. Checks matrix transforms against trigonometric formulas, inverse/object round trips, analytic interior/exterior hit tests, scene hit membership, visibility options, and shape serialization. |

Coordinates lie within ±1,000; surfaces are 256 × 256 at DPR 1. Correctness generators use finite numbers and bounded arrays, with no filters that silently discard difficult inputs. Numeric comparisons combine an absolute tolerance of 0.002 with a relative tolerance of 0.00002. Hits are sampled well away from edges. These are harness limits, not public API limits.

The corpus includes all existing SVG interpretation fixtures, explicit seeds covering every command in both cases, repeated coordinate groups, zero-radius/coincident arcs, closing-edge traversal, reflected hit tests, and the interpreter's existing warning-and-ignore behavior for missing `<use>` references. Each comparison disposes its instances, checks `Two.Instances`, and each case gets a fresh page/context to reset module globals. Fixtures also exercise gradients, styles, and basic shapes; randomized reference-graph generation is future work.

Empty geometry is not subject to unconditional finite-bounds assertions. Arbitrary malformed paths, NaN/infinity, cyclic references, resource-exhaustion campaigns, animation scheduling, stateful scene sequences, and cross-renderer pixel comparisons remain later workstreams from the plan. No DOM mocks, screenshot-difference thresholds, or browser-engine fuzzers stand in for these targets.

## Failures and replay

Each invocation prints its ignored `.fuzz-artifacts/campaign-...` directory. It contains configuration, revision/dependency/browser metadata, execution counts, and `active.json`, written **before** each candidate executes. A discovery failure additionally saves:

- `original.json`: the first concrete failure and diagnostic result;
- `failure.json`: the reduced input, failure category/property, browser logs, blocked requests, seed/path, and shrink statistics;
- `reproduce.html`: a browser reproducer using the concrete input and library build, with no fast-check dependency.

```sh
npm run fuzz:replay -- .fuzz-artifacts/campaign-EXAMPLE/failure.json
npm run fuzz:replay -- tests/fuzz/regressions/closed-polyline.json --browser webkit
```

Replay uses source/Chromium by default; pass the saved `--browser` and `--build` to match the discovery environment. To open the HTML reproducer, serve the repository root over local HTTP and navigate to its artifact path. It imports the target assertions and Two.js from the checkout; it is independent of the generator, not a self-contained copy of the library. Use CLI replay for hangs so recovery stays supervised.

The supervisor lives outside the page. On an execution deadline or browser crash it kills the actual browser process tree via Playwright's browser server and creates a replacement for the next attempt. Killing is bounded separately. Shrinking preserves the first failure's category/property, has a time limit, and retains the original if interrupted. Infrastructure errors are saved separately and are not repeatedly executed as shrink candidates. The outer campaign deadline exits unsuccessfully and leaves the last candidate on disk.

Triage the property and its preconditions before changing production code. Reproduce in a fresh browser and verify the relevant build. Once confirmed, add a small versioned JSON input under `regressions/` and, where practical, an ordinary QUnit assertion. Retain precise assertions and tolerance limits. Generated campaign artifacts are not automatically added to Git.

`fuzz:self-test` deliberately causes a main-thread hang, an unhandled rejection, and a failing threshold property. It verifies process termination, recovery, shrinking to the boundary, saved artifacts, and concrete replay through the production runner. Its `self-test-...` artifacts contain **intentional** failures and are separate from discovery results. Test hooks cannot be activated by ordinary corpus/replay inputs.

## Existing QUnit suite

```sh
npm run build
npm run test:browser
BROWSER=firefox npm run test:browser
```

The runner uses the original interactive test page, replaces CDN references with locked local QUnit/resemblejs/underscore assets, waits for QUnit completion, reports assertions/page errors, and exits nonzero on failures. Reports are saved under `.fuzz-artifacts/browser-suite-...`. The interactive HTML remains usable as before.

Validation on current `dev` passed 189 of 193 QUnit tests and exposed four image-fit snapshot assertions: `two.makeImage (Mode: fit)` and `two.makeImage (Mode switching)` in both CanvasRenderer and WebGLRenderer. They are existing baseline discrepancies on unchanged production source, independent of the new fuzz targets. The full QUnit CI job is explicitly advisory while those visual references/environment are investigated; the fuzz smoke and corpus jobs fail on regressions. Remove `continue-on-error` from the advisory job after the full suite is verified on the pinned CI browser. Its failures remain visible and no assertions or image tolerances are weakened here.
