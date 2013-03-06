two.js
======

__This is considered alpha grade__. A two-dimensional drawing api meant for modern browsers. It is renderer agnostic enabling the same api to render in multiple contexts: webgl, canvas2d, and svg.

### Roadmap:
+ Figure out how fill / stroke `alpha` is applied with opacity and set the proper blend mode.
+ Add ability to remove shapes from a scene.
+ Make `Two.Group` center its children

### Concerns:
+ How does `canvas2d` perform on `ctx.fillStyle` and `ctx.setStyle` at high volumes of particles.
+ How to do stroke properties, namely `miter`, `cap`, and `join`, in `webgl`.

### Up for discussion:
+ Add `width` and `height` properties to `Two.Polygon`.
+ Add `radius` to `Two.Circle`.
+ Add `Two.Arc`.
+ Add a `z-index` property to `Two.Shape`.
+ Standardized way to apply other types of transformations — namely `skewX`, `skewY`, `scaleX`, `scaleY`.
+ Add svg import. This requires smart subdivision of compound paths.

### Notes:
+ More information on triangulation [here](https://groups.google.com/forum/?fromgroups=#!topic/poly2tri/d0UL8Kew8dY).