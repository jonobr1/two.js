---
pageClass: change-log
sidebarDepth: 3
title: Two.js Changelog
lang: en-US
---

# Changelog

All notable changes to this project will be documented in this file. The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<carbon-ads />

## May 31, 2022 v0.8.10

<h3 class="visible">June 9, 2022</h3><version-link v="v0.8.10" />

+ Added `Two.Arc` to `/extras` directory
+ Made `/extras/js/zui.js` ES6 compliant
+ Removed `/extras` modules from generated documentation
+ Added method documentation to `Two.ZUI`
+ Improved `types.d.ts`
+ Fixed Commonjs imports from `package.json`

## May 9, 2022 v0.8.7

<h3 class="visible">May 9, 2022</h3><version-link v="v0.8.7" />

+ Fixed documentation links
+ Made `Two.Group` and `Two.Text` properties public in TypeScript types
+ Added overloaded methods to TypeScript types
+ Fixed `Two.Path.ending` discrepancies when `Two.Path.curved = true`

## Mar 29, 2022 v0.8.5

<h3 class="visible">Mar 29, 2022</h3><version-link v="v0.8.5" />

+ Added `Two.Gradient` parent parameter to `Two.Stop.clone`
+ ___Breaking___: Added export maps so extras are imported like so `import { ZUI } from 'two.js/extras/zui.js'`

## Jan 29, 2022 v0.8.3

<h3 class="visible">Jan 29, 2022</h3><version-link v="v0.8.3" />

+ Improved `Two.Element.className` flagging and `classList` construction
+ Manually amended `types.d.ts` for better TypeScript developing

## Jan 19, 2022 v0.8.2

<h3 class="visible">Jan 21, 2022</h3><version-link v="v0.8.2" />

+ Removed `#` private declared variables for better EcmaScript compatibility
+ Fixed `Two.Path.begining` and `Two.Path.ending` interpolation when `Two.Anchor.relative = false`
+ Added `Two.Utils.read.path(string)` which allows for string interpretation of an SVG path's `d` attribute
+ Added `Two.Shape.worldMatrix`

## Jan 10, 2022 v0.8.0

<h3 class="visible">Jan 10, 2022</h3><version-link v="v0.8.0" />

+ Added `Two.Element` as an EcmaScript 6 class
+ Converted `Two.ImageSequence` to EcmaScript 6 class
+ Converted `Two.Sprite` to EcmaScript 6 class
+ Converted `Two.Texture` to EcmaScript 6 class
+ Converted `Two.Stop` to EcmaScript 6 class
+ Converted `Two.RadialGradient` to EcmaScript 6 class
+ Converted `Two.LinearGradient` to EcmaScript 6 class
+ Converted `Two.Gradient` to EcmaScript 6 class
+ Converted `Two.Star` to EcmaScript 6 class
+ Converted `Two.RoundedRectangle` to EcmaScript 6 class
+ Converted `Two.Rectangle` to EcmaScript 6 class
+ Converted `Two.Polygon` to EcmaScript 6 class
+ Converted `Two.Points` to EcmaScript 6 class
+ Converted `Two.Line` to EcmaScript 6 class
+ Converted `Two.Ellipse` to EcmaScript 6 class
+ Converted `Two.Circle` to EcmaScript 6 class
+ Converted `Two.ArcSegment` to EcmaScript 6 class
+ Converted `Two.Path` to EcmaScript 6 class
+ Converted `Two.Group` to EcmaScript 6 class
+ Converted `Two.Text` to EcmaScript 6 class
+ Converted `Two.Shape` to EcmaScript 6 class
+ Converted `Two.Matrix` to EcmaScript 6 class
+ Converted `Two.Registry` to EcmaScript 6 class
+ Converted `Two.Children` to EcmaScript 6 class
+ Converted `Two.Collection` to EcmaScript 6 class
+ Converted `Two.Events` to EcmaScript 6 class
+ Converted `Two.Anchor` to EcmaScript 6 class
+ Converted `Two.Vector` to EcmaScript 6 class
+ `Two.interpret` appropriately inherits classes to `<g />` tags [@elShiaLabeouf](https://github.com/elShiaLabeouf)
+ `Two.interpret` inherits classes and `data-*` attributes [@elShiaLabeouf](https://github.com/elShiaLabeouf)

## Dec 15, 2021 v0.7.13

<h3 class="visible">Dec 15, 2021</h3><version-link v="v0.7.13" />

+ Improved SVG gradient interpretation
+ `Two.interpret` can properly unwrap CSS `url()` commands
+ Added `Two.Gradient.units` and respected in all renderers
+ Default units space for `Two.Gradient` is `objectBoundingBox`
+ Removed destructive attribute assignments in `Two.interpret`
+ Interpreted gradients are reused as `<defs />`

## Nov 24, 2021 v0.7.12

<h3 class="visible">Nov 24, 2021</h3><version-link v="v0.7.12" />

+ Made mask removal possible on `Two.Group`s, `Two.Path`s, and `Two.Points`'
+ Simplified `Two.Points.vertices` management for renderers improving adaptability

## Nov 20, 2021 v0.7.10

<h3 class="visible">Nov 20, 2021</h3><version-link v="v0.7.10" />

+ Fixed empty vertices issue on `Two.Points`

## Nov 11, 2021 v0.7.9

<h3 class="visible">Nov 11, 2021</h3><version-link v="v0.7.9" />

+ Made `Two.load` and `Two.interpret` consistently apply SVG `viewBox`
+ Made `Two.Rectangle.origin` act as inverse anchor positioning
+ Made `Two.Path.toObject` objectify `fill` and `stroke` attributes that are `Two.Texture` and `Two.Gradient`
+ Improved reassigned id selection on interpreted SVG elements
+ Improved `Two.load` group duplication
+ Added `Two.Points` and `Two.makePoints` to all renderers
+ Made `Two.release` mimic behavior of `Two.remove`

## Jul 13, 2021 v0.7.8

<h3 class="visible">Jul 13, 2021</h3><version-link v="v0.7.8" />

+ Made `types.d.ts` a shim of a module so that it can at least be loaded in TypeScript projects while the ES6 class declaration is still work-in-progress

## Jul 10, 2021 v0.7.6

<h3 class="visible">Jul 10, 2021</h3><version-link v="v0.7.6" />

+ Fixed `id` setting on all objects of Two.js
+ Fixed `Two.ArcSegment.clone` outer radius issue
+ Standardized vertex generation in higher order primitives
+ Type declaration improvements
+ Improved `Two.Group.center`, `Two.Group.corner`, `Two.Path.center`, `Two.Path.corner`
+ Improved SVG gradient interpretation
+ Added `<defs />` interpretation
+ Added `Two.Path.mask` and `Two.Text.mask` properties
+ Standardized `Texture.id` to be compliant with other `Two.Shape.id`
+ Added ability to interpret `<clipPath />` and `<image />` SVG elements

## Apr 23, 2021 v0.7.5

<h3 class="visible">Apr 23, 2021</h3><version-link v="v0.7.5" />

+ Improved `Two.Circle.beginning` & `Two.Circle.ending` behavior
+ Improved `fitted` logic on instances of `Two`
+ Improved `Two.Children` and `Two.Collection` instantiation versatility
+ Improved `Two.Group.getBoundingClientRect`, `Two.Path.getBoundingClientRect`, and `Two.Text.getBoundingClientRect`
+ Improved higher level shapes', like `Two.Circle`, ability to handle zeroed out arguments

## Apr 2, 2021 v0.7.4

<h3 class="visible">Apr 2, 2021</h3><version-link v="v0.7.4" />

+ Improved Typescript type declarations
+ Successfully export `extras/` directory in both JavaScript and JavaScript Module format
+ Added `Two.Shape.skewX` and `Two.Shape.skewY` [@gburlet](https://github.com/gburlet)

## Mar 26, 2021 v0.7.3

<h3 class="visible">Mar 26, 2021</h3><version-link v="v0.7.3" />

+ Exposed `Two.Shape.renderer` for easier access to underlying SVG elements
+ Added Typescript declaration types to Two.js
+ Made `Two.Group` listen to `Two.Shape.id` changes through new observable property and flags
+ Improved `Two.interpret` performance and functionality through improved regular expressions [@adroitwhiz](https://github.com/adroitwhiz)
+ `Two.Group.visible` is a property held on the group and does not trickle down to children
+ Improved scientific notation interpretation in SVG elements
+ `Two.load` appends a hidden DOM element to the document's `<head />` so that `getComputedStyles` works more consistently with `Two.interpret`

## Jan 12, 2021 v0.7.1

<h3 class="visible">Jan 12, 2021</h3><version-link v="v0.7.1" />

+ Added `Two.AutoCalculateImportedMatrices` to control different ways of importing SVG transformations
+ Fixed `Two.Text.className` application
+ Added basic text support in `Two.interpret`
+ Exposed `Two.fit` for external use
+ Added a `fitted` argument to the `Two` constructor to make instance adaptively match the size of its parent element
+ Simplified `Two.release` method
+ Added support for scientific notation in `Two.interpret`
+ Added `Two.Text.decoration` styling to `Two.CanvasRenderer` and `Two.WebGLRenderer`
+ Increased precision on `Two.Utils.toFixed` for Firefox transformation engine performance increase
+ Added support to import `<use />` tags from SVG interpretation [@eulertour](https://github.com/eulertour)
+ Removed extraneous underscore calls from `Two.Utils` [@adroitwhiz](https://github.com/adroitwhiz)
+ Ensured `Two.interpret` respects the `add` parameter to be added (or not) to the current instance
+ Modularized Two.js classes / files [@adroitwhiz](https://github.com/adroitwhiz)
+ Made Two.js compatible with `import` modules [@adroitwhiz](https://github.com/adroitwhiz)
+ Added wiki as [VuePress](https://vuepress.vuejs.org/) project

## Jan 22, 2020 v0.7.0

<h3 class="visible">Jan 22, 2020</h3><version-link v="v0.7.0" />

+ Exposed `resolution` parameter in `Two.makeCircle` and `Two.makeEllipse` as the final parameter
+ Made `Two.Circle` and `Two.Ellipse` recalculate controls points on `_update` and made vertex amounts cyclical [@adroitwhiz](https://github.com/adroitwhiz)
+ Added [ESLint](https://eslint.org/) scripts to development environment [@adroitwhiz](https://github.com/adroitwhiz)
+ Improve performance of WebGLRenderer by leveraging uniform to construct plane and removing duplicate render calls [@adroitwhiz](https://github.com/adroitwhiz)
+ Unpacked `scale` objects in WebGLRenderer [@adroitwhiz](https://github.com/adroitwhiz)
+ Removed unnecessary `gl.colorMask` calls [@adroitwhiz](https://github.com/adroitwhiz)
+ Removed `Two.Utils.toFixed` calls on Canvas and WebGLRenderers [@adroitwhiz](https://github.com/adroitwhiz)
+ `Two.Shape.clone` clones `Two.Shape.matrix` when `Two.Shape.matrix.manual` is set to `true`
+ Improved `Two.Group.mask` rendering in `Two.WebGLRenderer`
+ Fixed `Two.WebGLRenderer.setSize` recursive loop error
+ Connected `Two.Shape.className` to `Two.Shape.classList` for searching and class assignment in SVG elements
+ Performance improvements on canvas HTML5 styles [@brandonheyer](https://github.com/brandonheyer)
+ Added trickle down styling to `Two.Group.closed`, `Two.Group.curved`, and `Two.Group.automatic`
+ Check for Duplicity on `Two.Group.add`
+ Accounted for offset positions in `Two.Path.center` and `Two.Group.center` methods
+ Exposed `Two.Shape.matrix` as a publicly accessible property
+ Removed `Two.Utils.deltaTransformPoint` and patched `Two.Utils.decomposeMatrix` to more accurately parse matrices
+ Added support for various position inclusion of gradients and other effects in `Two.interpret`
+ Improved `Two.Utils.applySvgAttributes` rotation from SVG interpretation
+ Added `Two.makeArrow` for Simple Triangular Tipped Arrows [@mike168m](https://github.com/mike168m)
+ Improved `Two.Matrix` efficiency of calculations
+ Added `Two.Path.dashes.offset` and `Two.Text.dashes.offset` properties for animating dashed strokes in all renderers
+ Fixed `Two.Path.corner` method to not be additive on successive invocations
+ Split `Two.Matrix.toArray` into two different functions. One for 2D transforms and one for a plain object (JSON) representation
+ Added `Two.Matrix.toTransformArray` intended for 2D transformation use internally
+ `WebGLRenderer` more robustly supports displaying bitmap content
+ Added `<g />` attributes to be inherited by children in SVG interpretation
+ Added `offscreenElement` as an option when constructing WebGL Renderers for WebWorker compatibility
+ Added `Two.Shape.position` accessor to `Two.Shape.translation` for ease of use with [matter.js](http://brm.io/matter-js/)
+ Added `Two.Path.dashes` and `Two.Text.dashes` support to WebGL and Canvas Renderers

## Dec 8, 2018 v0.7.0-beta.3

<h3 class="visible">Dec 8, 2018</h3><version-link v="v0.7.0-beta.3" />

+ Canvas Renderer supports dashed and non dashed paths
+ Enforce `Two.Rectangle` has four `vertices`
+ Fixed `Two.Path.closed` on latest `ending` calculations

## Nov 18, 2018 v0.7.0-beta.2

<h3 class="visible">Nov 18, 2018</h3><version-link v="v0.7.0-beta.2" />

+ Updated Two.js compatibility with webpack and node-canvas 2.0.0+

## Nov 3, 2018 v0.7.0-beta.1

<h3 class="visible">Nov 3, 2018</h3><version-link v="v0.7.0-beta-1" />

+ Altered `Two.Path.clone` and `Two.Text.clone` to use references where possible and to `_update()` on return
+ Improved multi-decimal and arc SVG interpretation
+ Added `Two.Commands.arc` for better arc rendering across all renderers
+ `Two.Path` and `Two.Text` now have `dashes` property to define stroke dashing behavior [@danvanorden](https://github.com/danvanorden)
+ `Two.Vector` arithmetic methods made more consistent — still need to improve performance
+ `Two.Path.vertices` will not clone vectors, improving developer clarity
+ Two.js clone methods do not force adding to a parent
+ `Two.ImageSequence`, `Two.Sprite`, and `Two.Rectangle` have `origin` properties for offset rendering
+ `Two.Group.getBoundingClientRect` will pass-through on effects instead of break
+ `Two.interpret` apply SVG node `style` attributes to paths. Inherits from groups ~~and infers SVG `viewBox` attribute against Two.js instance~~
+ `Two.interpret` improves multi-decimal formatted `d` attributes
+ `Two.ZUI` added through the new `/extras` folder
+ `Two.Text.getBoundingClientRect` now returns an estimated bounding box object
+ `Two.interpret` properly assigns back calculated `Z` coordinates
+ `Two.load` now immediately returns a `Two.Group` for use without callbacks if desired
+ Added `Two.Group.length` to return the calculated length of all child paths
+ `Two.Group.beginning` and `Two.Group.ending` calculate based on child `Two.Path`s for intuitive grouped animating
+ Added `Two.Utils.shim` to properly handle `canvas` and `image` element spoofing in headless environments
+ Improved conformance between primitive shapes
+ `Two.Path.getBoundingClientRect` considers control points from bezier curves
+ `Two.Path.beginning` and `Two.Path.ending` calculate based on distance increasing accuracy for animation, but also performance load
+ Moved `Two.Path._vertices` underlying to list of rendered points to `Two.Path._renderer.vertices`
+ Improved accuracy of `Two.Path.ending` and `Two.Path.beginning` on open paths
+ Added specific `clone` method to `Two.ArcSegment`, `Two.Circle`, `Two.Ellipse`, `Two.Polygon`, `Two.Rectangle`, `Two.RoundedRectangle`, and `Two.Star` primitives
+ Added ability to read `viewBox` property from root SVG node in `Two.interpret`
+ Added more reliable transform getter in `Two.interpret`
+ Added `rx` and `ry` property reading on `Two.Utils.read.rect`
+ Added `Two.Utils.read['rounded-rect']` to interpret Rounded Rectangles
+ Added ability for `Two.RoundedRectangle.radius` to be a `Two.Vector` for x, y component styling
+ Added ES6 compatible `./build/two.module.js` for importing library
+ Improved `Q` SVG interpretation
+ `Two.Texture`, `Two.Sprite`, and `Two.ImageSequence` implemented in `WebGLRenderer`
+ Added `className` property to `Two.Shape`s for easier CSS styling in `SVGRenderer` [@fr0](https://github.com/fr0)
+ `Two.Events.resize` is now bound to a renderer's `setSize` function giving a more generic solution to change scenegraph items based on dimensions changing

## Dec 1, 2017 v0.7.0-alpha.1

<h3 class="visible">Dec 1, 2017</h3><version-link v="v0.7.0-alpha-1" />

+ Fixed closed `Two.Path.getPointAt` method to clamp properly
+ Added `Two.Texture.repeat` for describing pattern invocations
+ Added `Two.Texture`, `Two.Sprite`, and `Two.ImageSequence`
+ Removed `Two.Shape` inheritance for `Two.Gradient`s
+ Added `Two.Vector.rotate` method [@ferm10n](https://github.com/ferm10n)
+ Objects clone to parent only if parent exists [@ferm10n](https://github.com/ferm10n)
+ Vendor agnostic `requestAnimationFrame` [@ferm10n](https://github.com/ferm10n)
+ `Two.Utils.Events.listenTo` and `Two.Utils.Events.stopListening` [@ferm10n](https://github.com/ferm10n)
+ `Two.Utils.Events` added to `Two.Path.prototype` for event inheritance [@ferm10n](https://github.com/ferm10n)
+ Enhanced `Two.Shape.scale` to allow both numbers and `Two.Vector` as property value
+ Made `Two.interpret` use latest primitives
+ Added `Two.Circle` primitive
+ `Two.Shape.translation` is now a getter/setter and can be replaced
+ Fixed translation interpretation to strip out `'px'` strings
+ Removed `Two.SineRing` — make `Two.Star.curved = true` and it's the same effect
+ Enhanced `Two.ArcSegment`, `Two.Ellipse`, `Two.Polygon`, `Two.Rectangle`, `Two.RoundedRectangle`, `Two.Star`
+ Fixed `Two.Anchor.relative` interpretation in `svg`, `canvas`, and `webgl` renderers
+ Made Getters / Setters enumerable for iteration compatibility
+ Fixed Two.Utils.Collection.splice method and added additional test
+ Added compatibility with [node.js](http://nodejs.org/), [browserify](http://browserify.org), and [node-canvas](https://github.com/Automattic/node-canvas)
+ Removed third party dependencies
+ Added `remove` method to `Two.Text`
+ Fixed ordering on same parent additions for `Two.Group`

## Feb 9, 2016 v0.6.0

<h3 class="visible">Feb 9, 2016</h3><version-link v="v0.6.0" />

+ Updated `Two.CanvasRenderer.ctx.imageSmoothingEnabled` to not use deprecated invocation, [issue 178](https://github.com/jonobr1/two.js/issues/178)
+ Fixed `Two.Group.mask` in `SVGRenderer` to append to DOM correctly
+ Updated `require` imports to be compatible with [require.js](http://requirejs.org/)
+ Added `Two.Text` for programmatically writing text in Two.js

## Oct 1, 2015 v0.5.0

<h3 class="visible">Oct 1, 2015</h3><version-link v="v0.5.0" />

+ Added support for `two.interpret` to import `svg`'s gradients
+ Added `Two.Utils.xhr` and `two.load` methods to asynchronously load SVG files
+ Added `Two.Gradient`, `Two.LinearGradient`, and `Two.RadialGradient`
+ Added dependency check to ensure ASM loading in environments like NPM as well as in the browser
+ Properly deleted `webgl` textures on removal of `Two.Path`
+ Added support for `two.interpret` to import `svg`'s [Elliptical Arcs](http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands)
+ Added `Two.ArcSegment` and `Two.SineRing` as new shapes invoked like `Two.Path` [@chrisdelbuck](http://github.com/chrisdelbuck)
+ Added `Two.Line`, `Two.Rectangle`, `Two.RoundedRectangle`, `Two.Ellipse`, `Two.Polygon`, and `Two.Star` as new shapes invoked like `Two.Path`
+ ___Breaking___: renamed `Two.Polygon` to `Two.Path`
+ Performance enhancements to `webgl` renderer
+ Performance enhancements to `canvas` renderer [Leo Koppelkamm](https://github.com/ponychicken)
+ Enabled render ordering in `Two.Group.children` based on previous augmentation
+ Augmented `Two.Group.children` to inherit from `Two.Collection` effectively making it an array instead of a map [Leo Koppelkamm](https://github.com/ponychicken)
  - The map can still be accessed at `Two.Group.children.ids`

## Jul 22, 2014 v0.4.0

<h3 class="visible">Jul 22, 2014</h3> <version-link v="v0.4.0" />

+ Updated `Two.interpret` to handle polybezier path data
+ Added `Two.Group.mask` and `Two.Polygon.clip` in order to create clipping masks
+ `Two.Group` has own `opacity` property [Leo Koppelkamm](https://github.com/ponychicken)
+ Rendering optimizations [Leo Koppelkamm](https://github.com/ponychicken)
+ `Two.noConflict` non-destructive command internally to the library
+ `Two.interpret` decomposes `transform` attribute of source tag
+ `Two.interpret` handles item irregularities from [Inkscape](http://www.inkscape.org/)
+ Changed `Two.Identifier` to use underscores instead of hyphens for dot-notation access [Leo Koppelkamm](https://github.com/ponychicken)
+ Added `Two.Group.getById` and `Two.Group.getByClassName` methods for convenient selection [Leo Koppelkamm](https://github.com/ponychicken)
+ Added `classList` to all `Two.Shape`s [Leo Koppelkamm](https://github.com/ponychicken)
+ Enabled inference of applied styles on imported svgs [Leo Koppelkamm](https://github.com/ponychicken)
+ Added `Two.Polygon.getPointAt` method to get coordinates on a curve/line
+ Added `Two.Polygon.length` property and `Two.Polygon._updateLength` method to calculate length of curve/line
+ Updated `Two.Group.prototype` observable properties on `Two.Polygon.Properties` to ensure each property is considered unique
+ ~~`Two.Polygon.vertices` first and last vertex create automated control points when `Two.Polygon.curved = true`~~
+ Updated `Two.Polygon.subdivide` method to accommodate `Two.makeEllipse`
+ Enabled `id` to be properly interpreted from SVG elements [@chrisdelbuck](http://github.com/chrisdelbuck)
+ Updated `webgl` renderer `getBoundingClientRect` to accommodate `relative` anchors
+ Updated `beginning` and `ending` to clamp to each other
+ Reorganized `Two.Polygon._update` and `Two.Polygon.plot` in order to handle `beginning` and `ending` properties
+ Updated `Two.getComputedMatrix` and `Two.Polygon.getBoundingClientRect` to adhere to nested transformations
+ Updated `Two.Anchor` to change `control` points relatively by default through `anchor.relative` property
+ Updated `Two.Polygon.subdivide` method to accommodate `curved = false` circumstances
+ Updated `svg`, `canvas`, and `webgl` renderers to properly reflect holes in curved `Two.Polygon`s
+ Updated `Two.Group` `clone` method
+ Added `toObject` method to `Two.Group`, `Two.Polygon`, `Two.Anchor`
+ `Two.Polygon` initializes `polygon.cap = 'butt'` and `polygon.join = 'miter'` based on Adobe Illustrator defaults
+ `Two.Polygon.subdivide` method now works with `Two.Commands.move` for noncontiguous polygons
+ Internally update matrices on `getBoundingClientRect` in order to remove the need to defer or wait for internal variables to be up-to-date
+ Refactor of renderers and scenegraph for performance optimization and lower memory footprint
  - Relinquished internal _events_ for _flags_
  - Prototypical declaration of `Object.defineProperty`
  - Added `_update` and `flagReset` methods to `Two.Shape`, `Two.Group`, and `Two.Polygon`
  - Decoupled `canvas` and `webgl` renderers and are now independent
  - Added `_matrix.manual` to override the default behavior of a `Two.Polygon` transformation
  - Localized variables per file as much as possible to reduce Garbage Collection on runtime

## Oct 25, 2013 v0.3.0

<h3 class="visible">Oct 25, 2013</h3><version-link v="v0.3.0" />

+ Can properly pass `domElement` on construction of new instance of two
+ Added `overdraw` boolean to `webgl` renderer [@arodic](https://github.com/arodic)
+ Added support for ie9 svg interpretation [@tomconroy](https://github.com/tomconroy)
+ Added `subdivide` method for `Two.Polygon` and `Two.Group`
+ Ensure sure that `manual` properly is set on construction of `Two.Polygon` that it binds `Two.Anchor.controls` change events
+ Added automatic High DPI support for `webgl` renderer
+ Updated `two.interpret(svg)` to handle compound paths
+ Added [`Two.Anchor`](http://jonobr1.github.io/two.js/#two-anchor) which represents all anchor points drawn in two.js
+ Modified source to not have any instances of `window` for node use
+ Updated to underscore.js 1.5.1
+ Added `Two.Utils.getReflection` method to properly get reflection's in svg interpretation
+ Made `Two.Vector` inherently not broadcast events and now needs to be explicity bound to in order to broadcast events, which two.js does internally for you
+ Created `Two.Utils.Collection` an observable array-like class that `polygon.vertices` inherit [@fchasen](http://github.com/fchasen)
+ Added `Two.Events.insert` and `Two.Events.remove` for use with `Two.Utils.Collection`
+ Properly recurses `getBoundingClientRect` for both `Two.Group` and `Two.Polygon`
+ Added `Two.Version` to clarify forthcoming builds
+ Updated hierarchy ordering of `group.children` in `canvas` and `webgl` renderers
+ Updated shallow and bidirectional `remove` method for `Two.Group` and `Two.Polygon`
+ Added `corner` method to `Two.Group` and `Two.Polygon` allowing anchoring along the upper lefthand corner of the form
+ Modified `center` method of `Two.Group` and `Two.Polygon` to not affect the `translation` property to stay inline with `corner` method and any future orientation and anchoring logic
+ Added automatic High DPI support for `canvas` renderer
+ Added `overdraw` boolean to `canvas` renderer
+ Added AMD loader compatibility [@thomasrudin](http://github.com/thomasrudin)
+ Deferred `two.update();` to account for canvas and webgl
+ Added `remove` and `clear` methods to `two` instance
+ Updated svg interpretation for `webgl` context
+ ~~Added matrix property to all `Two.Shape`'s for advanced transformations~~
+ Added `inverse` method to `Two.Matrix`
+ Remove execution path dependency on utils/build.js [@masonblier](https://github.com/masonblier)
+ Added `timeDelta` property to every `two` instance
+ Added gruntfile, package.json for more integration with `npm`, and dependency free build (`build/two.clean.js`) [@iros](https://github.com/iros)
+ Crossbrowser compatibility with `noStroke` and `noFill` commands

## May 3, 2013 v0.2.0

<h3 class="visible">May 3, 2013</h3><version-link v="v0.2.0" />

+ First alpha release

## Jan 29, 2013 v0.1.0-alpha

<h3 class="visible">Jan 29, 2013</h3><version-link v="v0.1.0-alpha" />

+ Proof of Concept built from Three.js
