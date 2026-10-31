# Allocation audit for issue #802

The audit covers every JavaScript module in `src/` and both runtime variants
in `extras/`. Declarations, documentation, and generated bundles are not
independent allocation sites. The baseline is commit `b3cb894c`.

Allocations were inventoried with a JavaScript AST scan for object/array
literals, constructors, and closures, supplemented by searches for allocating
calls (`slice`, `map`, `filter`, `concat`, `split`, `bind`, and `Object.keys`).
Constructor, clone, serialization, return-value, callback, and recursive
workspace lifetimes were reviewed separately. Browser sampling determined
which repeated sites to change.

A file does not need a cache simply because it allocates. Caller-owned results,
event payloads, instance state, async resources, and snapshots must keep their
existing lifetimes. Ordinary scalar locals do not create garbage-collected
objects and remain local. Cached references must be cleared after use, and
recursive or re-entrant invocations must never share active scratch state.

## Core

| Module | Disposition |
| --- | --- |
| `src/anchor.js` | Preserve instance-owned control vectors, clone results, serialized objects, and event callbacks. |
| `src/children.js` | Preserve child registries and event subscriptions owned by each collection. |
| `src/collection.js` | Preserve fresh `map` results and removal-event arrays. Callbacks may retain or recursively dispatch those payloads. |
| `src/constants.js` | Initialization-time constants and callbacks; no repeated workspace cache needed. |
| `src/element.js` | Preserve instance renderer state, serialization results, and disposal resets. |
| `src/events.js` | **Changed:** skip payload allocation without listeners; use direct calls for zero through three payload arguments. Larger payload arrays stay invocation-local for nested dispatch. |
| `src/group.js` | **Changed:** guard reusable hit-test context/options against nested queries; allocate and return one caller-owned result array; clear context references in `finally`. Recursive bounds stay local. Preserve lookup results and collection snapshots. |
| `src/matrix.js` | **Changed:** eliminate the matrix-operand array using existing scalar arguments. Preserve caller-owned vector products, inverse/default outputs, serialization, and transform arrays. SVG transform formatting remains a measured follow-up candidate. |
| `src/path.js` | **Changed:** calculate private point transforms directly in bounds and containment instead of allocating vector-product arrays. Preserve public bounds/point results and instance-owned renderer anchors. Extra trim anchors and smoothing workspace remain candidates for dedicated workloads and callback-lifetime review. |
| `src/registry.js` | Instance-owned registry map; no repeated temporary workspace. |
| `src/shape.js` | Preserve matrices, vectors, clones, serialization, and independently returned bounds. Empty default options are small; no additional shared mutable options introduced. |
| `src/text.js` | Preserve measurement results, native metrics, and public bounds. Font formatting and intermediate transforms remain candidates; this change does not add font or metrics invalidation state. |
| `src/two.js` | Preserve factory outputs, scene instances, load callbacks, and `Instances.slice()` iteration semantics when update handlers dispose instances. |
| `src/vector.js` | Preserve caller-owned arithmetic/clone results and per-instance event state. |

## Renderers

| Module | Disposition |
| --- | --- |
| `src/renderers/svg.js` | **Changed:** create the group child-list context only when additions, subtractions, or order changes need it. Keep it invocation-local around recursive render hooks. Attribute maps, DOM creation, and transform-string allocations remain candidates for separate measurements. |
| `src/renderers/canvas.js` | Preserve renderer/element-owned vectors, contexts, and existing buffers. Font array joins remain candidates. No global render context added around hooks or recursive groups. Benefits from common matrix/event changes are measured separately. |
| `src/renderers/webgl.js` | Preserve GPU resource ownership, renderer matrices, rasterization state, and existing typed buffers. Font formatting and native rasterization remain candidates. No broader sharing of recursive render scratch introduced. Benefits from common matrix/event changes are measured separately. |

## Shapes

| Module | Disposition |
| --- | --- |
| `src/shapes/arc-segment.js` | Preserve persistent vertices and clone/factory results; vertices grow when geometry requires them. |
| `src/shapes/circle.js` | Preserve persistent vertices, controls, and clone/factory results. |
| `src/shapes/ellipse.js` | Preserve persistent vertices, controls, and clone/factory results. |
| `src/shapes/line.js` | Constructor-owned endpoints; no new temporary cache. |
| `src/shapes/points.js` | Dirty updates replace private vertex buffers; defer buffer reuse until a points-update workload measures it and render-hook lifetimes are checked. Preserve public subdivision results. |
| `src/shapes/polygon.js` | Preserve instance vertices allocated when side count grows and caller-owned clones. |
| `src/shapes/rectangle.js` | Preserve instance origin, endpoints, and clones. Missing-vertex repair is instance state. |
| `src/shapes/rounded-rectangle.js` | Preserve instance vertices, radius vectors, controls, and clones. |
| `src/shapes/star.js` | Preserve instance vertices allocated when side count grows and caller-owned clones. |

## Effects

| Module | Disposition |
| --- | --- |
| `src/effects/gradient.js` | Preserve stop collections, snapshots, clones, and serialization. |
| `src/effects/image-sequence.js` | Preserve sequence textures, per-operation callbacks, collection snapshots, and clones. |
| `src/effects/image.js` | Stretch updates allocate a public texture scale vector. Defer changing its identity/lifetime until resize workloads and retained-reference behavior are assessed. |
| `src/effects/linear-gradient.js` | Preserve per-instance endpoint vectors and caller-owned clones. |
| `src/effects/radial-gradient.js` | Preserve per-instance center/focal vectors and caller-owned clones. |
| `src/effects/sprite.js` | Preserve texture/origin state, playback callbacks, and clones. |
| `src/effects/stop.js` | Preserve caller-owned stops/clones and instance event state. |
| `src/effects/texture.js` | Preserve asynchronous load callbacks, registered image resources, offsets/scales, and clones. These lifetimes span method invocations. |

## Utilities

| Module | Disposition |
| --- | --- |
| `src/utils/canvas-polyfill.js` | Initialization and environment-owned shims; no per-call scratch cache. |
| `src/utils/curves.js` | **Changed:** accumulate Bezier extrema numerically instead of allocating root/coordinate arrays. Preserve independently owned bounds, subdivision anchors, reflections, and arc-anchor results. Curve-length integrand closures remain a candidate for dedicated profiling. |
| `src/utils/device-pixel-ratio.js` | Numeric/environment queries; no useful temporary cache. |
| `src/utils/dom.js` | Preserve DOM callbacks and RAF handles. Vendor detection runs at initialization; the Date fallback is not a measured hotspot. |
| `src/utils/error.js` | Error instances require independent identity and stack information. |
| `src/utils/hit-test.js` | **Changed:** sample cubic points directly instead of constructing temporary Anchors; stream arc samples into final geometry and remove the angle IIFE. Returned geometry remains independently owned; no persistent sampled-geometry cache or invalidation scheme added. |
| `src/utils/interpret-svg.js` | Preserve independent interpreted shapes, inherited style state, and recursive parsing contexts. No shared mutable styles across recursive reads. |
| `src/utils/math.js` | **Changed:** guard the reusable ancestor list across change-event re-entry; clear references in `finally`; retain at most 64 cleared logical slots. Deeper/nested calls remain supported. Preserve optional/default matrix outputs and decomposition results. |
| `src/utils/path-commands.js` | Static constants; no repeated allocations. |
| `src/utils/path.js` | Smoothing/subdivision creates work arrays and anchors while triggering coordinate-change callbacks. Defer numeric workspace reuse until dedicated profiling and re-entrant mutation tests are available. |
| `src/utils/root.js` | Environment reference only; no repeated allocations. |
| `src/utils/shaders.js` | Preserve shader/program/buffer ownership and initialization callbacks. |
| `src/utils/shape.js` | Preserve delegated public subdivision results and deserialized effects. Hit-test sampling no longer requests disposable subdivision Anchors. |
| `src/utils/underscore.js` | Preserve argument/key snapshots around iteratees and property accessors. Any reusable workspace needs callback isolation; not a dominant measured allocation site. |
| `src/utils/xhr.js` | Requests and completion callbacks belong to individual asynchronous operations. |

## Extras

| Module | Disposition |
| --- | --- |
| `extras/js/arc.js` | Preserve instance anchor arrays and caller-owned clones. |
| `extras/js/zui.js` | Preserve surfaces, matrices, limits, and caller-owned coordinate results. |
| `extras/jsm/arc.js` | Same ownership requirements as the classic Arc variant. |
| `extras/jsm/zui.js` | Same ownership requirements as the classic ZUI variant. |

The bounded Jev ownership review covered collection payloads, factories,
geometry mutation, points buffers, image scale identity, SVG contexts, async
resources, extras, and utility snapshots. Its lower-confidence collection
judgment was checked against `Collection.pop`, `shift`, and `map`: event arrays
escape to handlers and map arrays escape to callers, so neither is shared.
Execution, numeric equivalence, regressions, and profiling were verified with
the actual source and browser tools.
