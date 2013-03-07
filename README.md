two.js
======

__This is considered alpha grade__. A two-dimensional drawing api meant for modern browsers. It is renderer agnostic enabling the same api to render in multiple contexts: webgl, canvas2d, and svg.

### Roadmap:
+ `Two.Group` unable to re-add.
+ Make `Two.Group` center its children.
+ Add svg import.

### Concerns:
+ How does `canvas2d` perform on `ctx.fillStyle` and `ctx.setStyle` at high volumes of particles.
+ How to do stroke properties, namely `miter`, `cap`, and `join`, in `webgl`.
+ `webgl` does not composite document content behind it. The canvas is an opaque element.

### Up for discussion:
+ Add `width` and `height` properties to `Two.Polygon`.
+ Add `radius` to `Two.Circle`.
+ Add `Two.Arc`.
+ Add a `z-index` property to `Two.Shape`.
+ Standardized way to apply other types of transformations — namely `skewX`, `skewY`, `scaleX`, `scaleY`.

### Notes:
+ More information on triangulation [here](https://groups.google.com/forum/?fromgroups=#!topic/poly2tri/d0UL8Kew8dY).
+ For importing svg I’ve implemented the Adaptive Quadratic Bezier Subdivision from [this](http://www.antigrain.com/research/adaptive_bezier/index.html) c++ implementation.