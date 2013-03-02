two.js
======

__This is considered alpha grade__. A two-dimensional drawing api meant for modern browsers. It is renderer agnostic enabling the same api to render in multiple contexts: webgl, canvas2d, and svg.

### Roadmap:
+ Make webgl renderer
+ Optimize Tessellation for integration with two.js
  + Remove Tessellation.Point and integrate Two.Vector

### Concerns:
+ How does `canvas2d` perform on `ctx.fillStyle` and `ctx.setStyle` at high volumes of particles.
+ How to convert all css applicable color styles to `webgl` renderer. See notes.
+ Add a `z-index` property to `Two.Shape`

### Up for discussion:
+ add `width` and `height` properties to `Two.Polygon`
+ add `radius` to `Two.Circle`
+ add `Two.Arc`
+ standardized way to apply other types of transformations — namely `skewX`, `skewY`, `scaleX`, `scaleY`
+ Add svg import. This requires smart subdivision of compound paths.

### Notes:
+ Color conversion for webgl renderer should be pulled from [less](https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js).