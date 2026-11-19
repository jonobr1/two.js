# Fuzzing implementation plan for Two.js

Status: the initial SVG/geometry foundation is implemented in `tests/fuzz/`; see [the implementation guide](tests/fuzz/README.md) for commands, contracts, and the exact delivered scope. Stateful scene sequences, broader malformed-input campaigns, and visual renderer comparison remain later milestones. This document preserves the original rollout design.

## Recommendation

Implement **structure-aware, property-based fuzzing in real browsers**, using fast-check to generate and shrink inputs and Playwright to execute Two.js in Chromium, Firefox, and WebKit. Start with SVG interpretation and path geometry, then add scene mutation and renderer lifecycle sequences. Add visual differential testing only for a carefully defined subset of drawing features.

This applies the OpenSSF initiative's basic approach—generate many inputs, execute them, and detect bad behavior—to the failures that matter for a browser drawing library: main-thread hangs, exceptions, invalid geometry, stale rendering, broken scene relationships, and incomplete resource cleanup. The linked initiative describes fuzzing broadly; the tooling and priorities below are recommendations based on this repository. [OpenSSF fuzzing initiative](https://openssf.org/technical-initiatives/fuzzing/)

The initial suite will be generation-based, not coverage-guided. fast-check supports large randomized campaigns and shrinking, but increasing its run count does not make input selection coverage-guided. [fast-check fuzzing guide](https://fast-check.dev/docs/advanced/fuzzing/)

## Repository evidence and implications at planning time

| Existing code or tests | Implication for the plan |
| --- | --- |
| `src/two.js`: `interpret()` converts SVG DOM nodes; `load()` accepts SVG text or a URL and uses `dom.temp.innerHTML`. | Test both DOM interpretation and the actual text-loading route. A DOM mock or a standalone string parser misses relevant browser behavior. |
| `src/utils/interpret-svg.js`: numeric tokenization, path commands, inherited styles, transforms, definitions, `<use>`, gradients, and clipping. | Generate SVG syntax and reference relationships, rather than mostly arbitrary bytes. |
| `src/path.js`, `src/utils/curves.js`, `src/utils/hit-test.js`, `src/matrix.js`. | Target degenerate curves, compound paths, trimming, floating-point boundaries, transforms, bounds, and hit testing. |
| `src/group.js`, `src/children.js`, `src/collection.js`, `src/events.js`. | Generate sequences of valid API operations and compare scene membership and events to a small independent model. |
| `src/renderers/{svg,canvas,webgl}.js` and effects under `src/effects/`. | Exercise the same scene descriptions through separate renderer instances, including updates after mutations. |
| `tests/index.html` loads QUnit suites, the built library, and CDN dependencies. Suites already cover interpretation, bounds, hit testing, release, and disposal. | Preserve those tests and use their cases as seeds and contract evidence. Give fuzzing a separate local, reproducible harness. |
| `package.json` has build, lint, and declaration checks, but no automated test command. Existing workflows do not run the browser QUnit suite. | Add explicit browser/fuzz commands and a dedicated workflow. Do not assume browser testing is already automated. |

## 1. Define contracts before writing generators

Separate three input classes so that failures have clear meanings:

1. **Supported valid inputs:** bounded, finite geometry and supported SVG features. Unexpected exceptions, invalid numeric results, and property violations fail the test.
2. **Degenerate but meaningful inputs:** empty paths/groups, zero-length edges, coincident anchors, zero scale, zero radii, and equal trim endpoints. Derive explicit expectations from documentation and existing tests; characterize ambiguous behavior before making it a gate.
3. **Malformed or unsupported inputs:** truncated commands, missing attributes, invalid numbers, missing references, and cyclic SVG references. Check termination and isolation. Define accepted rejection behavior per target; an intentional rejection is not a crash, and a blanket `catch` must not hide unexpected errors.

Do not impose “all results must be finite” on every input. For example, path bounds start with infinity sentinels, and empty or invisible geometry needs its own contract. Similarly, singular matrices are unsuitable for inverse-round-trip properties. A malformed-input finding may require an API behavior decision before it becomes a required regression.

Focus on library correctness and browser availability. Native browser/GPU crashes are useful findings to reproduce and route, but are not automatically vulnerabilities in Two.js. Sanitizing arbitrary uploaded SVG is a separate contract; this plan does not claim that `load()` is an SVG sanitizer.

## 2. Build a browser harness with reliable replay

Add development dependencies for fast-check and Playwright, pinned through the root lockfile. Use the project's `.nvmrc` for Node. Keep all fuzz dependencies out of the distributed library and use the existing esbuild dependency to bundle browser-only test helpers.

Proposed files:

```text
tests/fuzz/
  README.md                     # commands, target contracts, triage
  playwright.config.cjs         # browser projects and local server
  index.html                    # local harness, no CDN dependencies
  browser-entry.js               # instantiate scenes and collect results
  runner.cjs                     # fast-check generation and shrinking in Node
  worker.cjs                     # browser execution and process supervision
  generators/                   # SVG ASTs, geometry, serializable commands
  targets/                      # properties and model assertions
  corpus/                       # reviewed, versioned SVG/JSON seeds
  regressions/                  # minimized cases with assertions
utils/fuzz-build.cjs             # temporary test bundles/server setup
.github/workflows/fuzz.yml
```

The exact file split can stay small for the first target. The important boundary is that generation, saved inputs, and timeout supervision live outside the browser execution thread:

```text
Node: generate case -> persist candidate -> browser worker: execute case
          ^                                      |
          +--------- observations / failure ------+
          |
          +-> shrink -> save reproducer -> regression
```

- Serve repository assets over loopback HTTP. Playwright can manage the local server lifecycle through its `webServer` configuration. [Playwright web server documentation](https://playwright.dev/docs/test-webserver)
- Start with `src/two.js` loaded as a browser ES module. Replay the checked-in regression corpus against freshly built `build/two.js` and `build/two.module.js`; add `build/two.min.js` replay before releases. This checks shipped entry points without multiplying every exploratory campaign.
- Generate serializable SVG/scene/operation descriptions in Node. The browser translates them into real Two.js objects and returns observations. Use stable logical object handles, not generated Two.js IDs, in saved cases.
- Create a fresh page for each candidate and shrink attempt initially. New pages reload module state such as SVG definition caches and instance registries. Optimize reuse only after measuring throughput and proving reset behavior. Restart the browser worker after crashes or hangs.
- Use `autostart: false` and explicit updates. Test animation separately with a controlled clock and a defined frame schedule. Wait for local texture/font readiness rather than arbitrary sleeps.
- Fix viewport, device pixel ratio, background, local assets, and fonts. Record browser version and graphics backend. Use one worker initially to avoid GPU contention.
- Capture exceptions, unhandled rejections, page/browser crashes, context loss, target assertions, and relevant console messages. Do not fail on every warning: some SVG reference failures intentionally warn.
- Restrict requests to the local test server and approved embedded fixtures. Keep generated SVG out of developer documents and privileged browser sessions. Record blocked requests separately from library failures.

Start with explicit configurable limits: 64 KiB of SVG text, 100 SVG/scene nodes, nesting depth 6, 100 path segments, 50 operations per sequence, coordinates within ±10,000, a 256 × 256 output surface, and a 2-second execution deadline after harness readiness. Keep subdivision and reference expansion budgets explicit. These are harness limits, not proposed public API limits. Use separate larger-input campaigns to investigate complexity; do not raise every default to accommodate one slow case.

### Hangs need supervision outside the page

A `setTimeout` inside a page cannot interrupt a synchronous parser loop on that page's main thread. Neither a fast-check timeout nor a rejected `Promise.race` cancels stuck browser work.

Persist the exact candidate before execution. The Node supervisor enforces a per-case deadline and, if normal page/browser closure stalls, terminates and replaces the worker and its browser processes. Separately enforce a campaign deadline and CI job timeout. Playwright's test timeout provides an additional outer limit, not the whole recovery mechanism. [Playwright timeout documentation](https://playwright.dev/docs/test-timeouts)

Return a structured timeout failure to the generator so reduction can proceed against fresh workers. Bound shrinking by time and attempts; retain the original input if reduction cannot finish. Use a separate, higher-budget lane for complexity/resource tests so ordinary rendering variance does not become a hang report.

## 3. Implement targets in this order

### A. SVG interpretation and path syntax

**Entry points:** `two.interpret(svgNode)`, `two.load(svgText, callback)`, followed by updates and geometry queries. Exercise URL loading later through controlled local `.svg` routes, including response failures and callback timing.

Build a small SVG AST generator with shrinkers that preserve valid command arity and reference relationships. Begin with paths, groups, basic shapes, and transforms. Then add definitions, `<use>`, gradients, clipping, inherited styles, and viewBox handling.

Generate and mutate:

- Absolute/relative `M/L/H/V/C/S/Q/T/A/Z`; repeated coordinate groups; implicit line commands after a move; multiple subpaths; explicit and implicit closes.
- Whitespace and comma variants, sign-separated numbers, decimal and exponent notation, small magnitudes, and bounded large values.
- Coincident endpoints, zero radii, all arc-flag combinations, negative coordinates, open/closed paths, and trim boundaries.
- Equivalent transform representations; nested groups; local IDs, reference ordering, missing references, and bounded cyclic `<use>` graphs in the robustness lane.
- Missing/truncated attributes and command arguments through deliberate mutations of valid examples. Keep syntax-invalid XML distinct from valid XML containing malformed path data.

Seed with `tests/images/interpretation/*.svg`, focused examples derived from `tests/suite/svg-interpreter.js`, and minimized future findings. Mix seed mutation with fresh AST generation; keep valid and malformed campaigns separately reported.

**Initial properties:** supported valid SVG completes without unexpected errors and produces valid supported geometry; equivalent whitespace/number spellings and absolute/relative forms preserve geometry within tolerance. Compare DOM and text entry points on a subset with equivalent parsing context. Check that one import's definitions/styles do not contaminate a subsequent unrelated import, including after rejection.

Use native browser SVG path length/point queries as a secondary oracle for a restricted, transform-free subset. Account for Two.js's coordinate recentering and numeric approximation. A disagreement is a candidate to investigate, not proof that the native browser or Two.js is wrong. Two.js explicitly describes interpretation as a compatible conversion rather than a direct SVG transcription.

### B. Path geometry, transforms, and hit testing

**Entry points:** `Path.length`, `getPointAt()`, `getBoundingClientRect()`, `subdivide()`, trimming via `beginning`/`ending`, matrix/vector operations, `Shape.contains()`, and `getShapesAtPoint()`.

Bias generators toward known difficult structures: zero-length segments, collinear/repeated anchors, compound paths, closing edges, extreme scale ratios, reflections, and trim values near 0 and 1. Keep finite coordinate ranges and subdivision depth bounded in the correctness lane. Test NaN, infinity, overflow-sized values, and singular transforms separately as robustness inputs; preserve their identity in replay files instead of losing them through JSON serialization.

Start with properties whose expected answer is independent of the implementation:

- Straight line length matches analytic calculations; sampling stays on the traversed segment and preserves endpoints. `getPointAt()` estimates a curve parameter, so do not assume constant-speed interpolation.
- Translation preserves length and translates bounds and sampled points.
- Uniform scaling of path coordinates changes local length by the absolute scale factor, within tolerance. A shape's transform does not change its local `Path.length`.
- For nonempty, supported, finite paths, length is finite and nonnegative; sampled points lie within appropriate geometric bounds. Exclude undefined empty results and calibrate arc bounds before extending this property.
- Well-conditioned invertible matrices approximately undo their transforms. Use combined absolute/relative tolerances appropriate to Float32 storage and coordinate scale.
- Supported `toObject()`/`fromObject()` round trips preserve documented geometry and style. Normalize IDs and implementation metadata; do not compare entire internal objects.
- Analytically known interior/exterior points of simple circles, rectangles, and lines agree with hit testing after supported transforms. Keep sampled points away from boundaries; handle visibility and stroke options explicitly.
- Trimmed compound paths preserve subpath boundaries and closing-edge traversal. Use the existing closed-path tests as explicit seeds.

Avoid asserting that every shape fills its bounding rectangle or that arbitrary subdivision leaves every representation identical. Those are invalid general properties.

### C. Stateful scene changes and cleanup

Generate command sequences over a small model of object handles, parent membership, order, visibility, and disposal state. Commands should include create, add, remove, reparent, reorder, mutate anchors/transforms/styles, replace fill/stroke, update, serialize, release, and dispose. Use preconditions for normal operations: no accidental group cycles, disposed-object reuse, or unsupported ID collisions in the valid lane.

The model should describe ownership and order, not reproduce renderer internals. fast-check provides command preconditions and model-based sequence shrinking for this style of test. If using `fc.commands`, preserve its `replayPath` as well as the runner's seed/path. [fast-check model-based testing](https://fast-check.dev/docs/advanced/model-based-testing/)

Check after each relevant operation:

- Parent pointers, child order, and child ID lookup agree with the model for supported unique IDs.
- Removed objects stop receiving events that the contract says should be detached.
- A scene rendered incrementally matches a newly constructed scene with the same final description. This is particularly useful for stale dirty flags and reparenting bugs.
- Repeated disposal is safe; disposed instances leave `Two.Instances`; library-owned renderer DOM is removed while caller-supplied DOM remains. Keep `release()` and `dispose()` expectations separate.
- Test-owned listeners and instrumented WebGL allocations/deletions balance according to ownership. Track shared effects explicitly and do not assume independently disposing an owner leaves every shared effect usable.

Use deterministic resource counters and registry/DOM checks as gates. Heap growth and forced-GC measurements can support investigations but should not be initial pass/fail leak oracles. Add controlled delayed image loads, texture replacement, and disposal during update only after synchronous sequences are stable.

### D. Renderer differential and visual fuzzing

Replay the same serialized scene into separate SVG, Canvas, and WebGL instances. Start with opaque basic shapes and simple paths, fixed output dimensions, and no fonts, external images, filters, or renderer-specific features.

First check successful completion, sane output dimensions, stable repeated rendering, and same-renderer incremental-versus-fresh output. Next compare rasterized outputs across renderers with calibrated antialiasing tolerances and edge masks. Use known different scenes to verify that tolerances do not hide missing shapes or large positional errors.

The existing image comparison helper permits a 3% mismatch for its fixtures; do not apply that number universally to random scenes. Tiny missing objects can disappear under a global percentage threshold. Compare occupied regions or component bounds as well as pixels, and save all images/difference masks on failure.

WebGL needs an explicit capability preflight. Initially require it on one verified Chromium software-rendering configuration, record that configuration, and treat unavailable WebGL there as a setup failure. On other browser/runner combinations, report unsupported combinations explicitly. Add hardware-backed runs when available; software rendering does not cover driver-specific behavior. Do not silently count a skipped WebGL target as coverage.

## 4. Reproduction, reduction, and corpus policy

For each failure save:

- Target and property IDs, original and minimized SVG/JSON input, operation sequence, seed, shrink path, and command replay path when applicable.
- Git revision, dependency versions, generator schema version, browser/version, renderer, viewport, DPR, graphics backend, and execution budget.
- Assertion/error details, logs, last completed operation, and screenshots/difference images when relevant.
- A standalone HTML reproducer that loads the relevant library build and runs the concrete input without fast-check.

fast-check exposes seed/path replay parameters. Save concrete inputs too: changing generators or dependency versions can invalidate seed-only replay. [fast-check runner parameters](https://fast-check.dev/docs/api/interfaces/Parameters/)

Shrink ASTs and command sequences structurally before shrinking numeric fields. Preserve valid-input preconditions and reference dependencies; require a candidate reduction to reproduce the same failure category/property. For a timeout or crash, perform bounded reduction in fresh processes rather than retrying in a damaged browser.

Replay reviewed regressions before random discovery. Convert confirmed findings into ordinary assertions in `tests/suite/` where practical, and retain minimized cases in the fuzz regression corpus. Deduplicate by target, failure category, stack/property, and normalized input. Generated campaign artifacts should be CI artifacts, not automatically committed corpus entries.

## 5. CI and local workflow

The initial implementation adds these commands (see `tests/fuzz/README.md` for current options and limits):

```text
npm run test:browser          # existing QUnit suite through Playwright
npm run fuzz:smoke            # regressions + bounded Chromium discovery
npm run fuzz:nightly          # larger campaigns / browser matrix
npm run fuzz:replay -- <file> # concrete saved case, renderer/browser selectable
```

For `test:browser`, pin QUnit, resemblejs, and underscore as development dependencies and serve local copies in the automated runner. Hook QUnit completion/failures explicitly; merely opening `tests/index.html` is not a passing test.

| Lane | Initial scope and budget | Failure policy |
| --- | --- | --- |
| Pull request | All reviewed regressions; Chromium SVG + geometry discovery, initially 100 cases per property; total campaign target of 3 minutes excluding setup. | Gate deterministic assertions and reproduced hangs/crashes. Surface every unexpected failure; retries collect evidence and never erase the initial result. |
| Nightly | Rotating recorded seeds; roughly 10,000 inexpensive geometry/parser cases and 1,000 stateful/renderer cases per target where throughput allows; hard ceiling of 30 minutes per shard. Chromium/Firefox/WebKit for SVG/Canvas; verified WebGL lane separately. | Upload complete reproducers and report new failure clusters. Keep known flaky or ambiguous oracles visible with an owner and resolution criteria. |
| Release | Regression replay against freshly built UMD, ESM, and minified builds; supported browser/renderer combinations. | Fail on confirmed regressions and missing required capabilities. |

These counts and deadlines are starting budgets, not throughput claims. Measure the first target and tune counts to actual browser startup and shrinking costs. Use a small fixed seed set for PR stability and rotating recorded seeds for nightly exploration. Bound every target independently so a slow one cannot consume the whole campaign.

Use ordinary `pull_request`, scheduled, and manual workflows with read-only permissions and no repository secrets. Pin actions consistently with existing workflows. Build before testing and fail on build errors. Cache browser installations by the locked Playwright version; archive failure artifacts even when a worker or job fails. Scheduled CI reports and artifacts are sufficient initially; no automatic issue creation is required.

## 6. Rollout and acceptance criteria

1. **Harness and one SVG property.** Add dependencies, local test serving, supervisor, serializable cases, concrete replay, and one geometry-preserving SVG property. Acceptance: a deliberately broken assertion produces a saved, minimized reproducer; an intentional synchronous hang is terminated from outside the page; a subsequent case still runs. Keep harness self-tests separate from production findings.
2. **SVG and geometry baseline.** Add seed corpus, malformed/degenerate contracts, analytic geometry properties, and PR smoke workflow. Acceptance: regressions run first, failures are reproducible in a fresh browser, generation reaches each intended path-command family, and the agreed CI budget is met.
3. **Scene and lifecycle sequences.** Add the independent scene model, shrinking, incremental-versus-fresh rendering, and ownership-aware cleanup assertions. Acceptance: sequences reduce to concrete operation lists and detect an intentionally introduced membership, dirty-flag, or cleanup error.
4. **Cross-browser and renderer expansion.** Add nightly jobs, calibrated visual comparisons, and verified WebGL setup. Acceptance: reports identify every executed/skipped browser-renderer combination, preserve image evidence, and distinguish setup failures from library failures.

Measure cases/second, valid-case rate, command/feature distribution, distinct failures, replay success, shrink effectiveness, and CI duration. Collect source branch coverage periodically to identify unvisited parser cases and lifecycle transitions. Instrument test builds only and verify findings on uninstrumented builds. Coverage measurement guides generator work; it is not coverage-guided mutation or proof of correctness. Browser-wide comparable coverage is optional; start measurement on a supported Chromium setup.

## 7. Where coverage-guided fuzzing could help later

After the browser suite works, evaluate Jazzer.js for genuinely DOM-independent targets such as math, curves, and a structured decoder feeding geometry operations. Prove those imports run without browser shims and reuse the same contract assertions. Do not replace browser DOM/layout, Canvas, or WebGL with mocks merely to make a Node target run.

OSS-Fuzz's documented JavaScript integration targets Node.js through Jazzer.js. That makes it a possible additional lane for isolated targets, rather than the initial execution environment for this client-side library. Evaluate current tooling compatibility, sustained throughput, coverage gain, and maintenance cost before proposing onboarding. [OSS-Fuzz JavaScript integration](https://google.github.io/oss-fuzz/getting-started/new-project-guide/javascript-lang/)

The first implementation should therefore stop at milestones 1 and 2: reproducible browser SVG/geometry fuzzing with useful assertions and a bounded CI gate. Expand when observed coverage gaps and findings justify the next target.
