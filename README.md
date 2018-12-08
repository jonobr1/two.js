# Two.js

A two-dimensional drawing api meant for modern browsers. It is renderer agnostic enabling the same api to render in multiple contexts: webgl, canvas2d, and svg.

[Home](http://jonobr1.github.io/two.js) • [Examples](http://jonobr1.github.io/two.js/#examples) • [Documentation](http://jonobr1.github.io/two.js/#documentation) • [Help](https://github.com/jonobr1/two.js/issues?labels=question)

## Usage
Download the latest [minified library](https://raw.github.com/jonobr1/two.js/dev/build/two.min.js) and include it in your html.

```html
<script src="js/two.min.js"></script>
```

It can also be installed via [npm](https://www.npmjs.com/package/two.js), Node Package Manager:

```js
npm install --save two.js
```
Alternatively see [how to build the library yourself](https://github.com/jonobr1/two.js#custom-build).


Here is boilerplate html in order to draw a spinning rectangle in two.js:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="js/two.min.js"></script>
  </head>
  <body>
    <script>
      var two = new Two({
        fullscreen: true,
        autostart: true
      }).appendTo(document.body);
      var rect = two.makeRectangle(two.width / 2, two.height / 2, 50 ,50);
      two.bind('update', function() {
        rect.rotation += 0.001;
      });
    </script>
  </body>
</html>
```

## Custom Build
Two.js uses [nodejs](http://nodejs.org/) in order to build source files. You'll first want to install that. Once installed open up a terminal and head to the repository folder:

```
cd ~/path-to-repo/two.js
npm install
```

This will give you a number of libraries that the development of Two.js relies on. If for instance you only use the `SvgRenderer` then you can really cut down on the file size by excluding the other renderers. To do this, modify `/utils/build.js` to only add the files you'd like. Then run:

```
node ./utils/build
```

And the resulting `/build/two.js` and `/build/two.min.js` will be updated to your specification.

---

### Running in Headless Environments

As of version `v0.7.x` Two.js can also run in a headless environment, namely running on the server with the help of a library called [Node Canvas](https://github.com/Automattic/node-canvas). We don't add Node Canvas to dependencies of Two.js because it's _not necessary_ to run it in the browser. However, it has all the hooks setup to run in a cloud environment. To get started follow the installation instructions on Automattic's [readme](https://github.com/Automattic/node-canvas#installation). After you've done that run:

```
npm install canvas
npm intsall two.js
```

Now in a JavaScript file setup your Two.js scenegraph and save out frames whenever you need to:

```javascript
var { createCanvas, Image } = require('canvas');
var Two = require('two.js')

var fs = require('fs');
var path = require('path');

var width = 800;
var height = 600;

var canvas = createCanvas(width, height);
Two.Utils.shim(canvas, Image);

var time = Date.now();

var two = new Two({
  width: width,
  height: height,
  domElement: canvas
});

var rect = two.makeRectangle(width / 2, height / 2, 50, 50);
rect.fill = 'rgb(255, 100, 100)';
rect.noStroke();

two.render();

var settings = { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE };
fs.writeFileSync(path.resolve(__dirname, './images/rectangle.png'), canvas.toBuffer('image/png', settings));
console.log('Finished rendering. Time took: ', Date.now() - time);

process.exit();

```

## Change Log

#### December 8, 2018 [v0.7.0-beta.3](https://github.com/jonobr1/two.js/releases/tag/v0.7.0-beta.3)
+ Canvas Renderer supports dashed and non dashed paths
+ Enforce `Two.Rectangle` has four `vertices`
+ Fixed `Two.Path.closed` on latest `ending` calculations

#### November 18, 2018 [v0.7.0-beta.2](https://github.com/jonobr1/two.js/releases/tag/v0.7.0-beta.2)
+ Updated Two.js compatibility with webpack and node-canvas 2.0.0+

#### November 3, 2018 [v0.7.0-beta.1](https://github.com/jonobr1/two.js/releases/tag/v0.7.0-beta.1)
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

#### December 1, 2017 [v0.7.0-alpha.1](https://github.com/jonobr1/two.js/releases/tag/v0.7.0-alpha.1)
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

##### February 9, 2016 [v0.6.0](https://github.com/jonobr1/two.js/releases/tag/v0.6.0)
+ Updated `Two.CanvasRenderer.ctx.imageSmoothingEnabled` to not use deprecated invocation, [issue 178](https://github.com/jonobr1/two.js/issues/178)
+ Fixed `Two.Group.mask` in `SVGRenderer` to append to DOM correctly
+ Updated `require` imports to be compatible with [require.js](http://requirejs.org/)
+ Added `Two.Text` for programmatically writing text in Two.js

##### October 1, 2015 [v0.5.0](https://github.com/jonobr1/two.js/releases/tag/v0.5.0)
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

##### July 22, 2014 [v0.4.0](https://github.com/jonobr1/two.js/releases/tag/v0.4.0)
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

##### October 25, 2013 [v0.3.0](https://github.com/jonobr1/two.js/tree/v0.3.0)
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

##### May 3, 2013 [v0.2.0](https://github.com/jonobr1/two.js/tree/v0.2.0)
+ First alpha release

##### Jan 29, 2013 [v0.1.0-alpha](https://github.com/jonobr1/two.js/tree/v0.1.0-alpha)
+ Proof of Concept built from Three.js
