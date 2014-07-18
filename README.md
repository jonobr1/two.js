<h1 id="masthead" style="display: block; width: 285px; height: 80px; background: url(http://jonobr1.github.io/two.js/images/logo.gif) center center no-repeat; overflow: hidden; text-indent: -9999px;">two.js</h1>

A two-dimensional drawing api meant for modern browsers. It is renderer agnostic enabling the same api to render in multiple contexts: webgl, canvas2d, and svg.

[Home](http://jonobr1.github.com/two.js) • [Examples](http://jonobr1.github.com/two.js/#examples) • [Documentation](http://jonobr1.github.com/two.js/#documentation) • [Help](https://github.com/jonobr1/two.js/issues?labels=question)

## Usage
Download the [minified library](https://raw.github.com/jonobr1/two.js/master/build/two.min.js) and include it in your html. Alternatively see [how to build the library yourself](https://github.com/jonobr1/two.js#custom-build).

```html
<script src="js/two.min.js"></script>
```

Here is boilerplate html in order to draw a spinning rectangle in two.js:

```html
<!doctype html>
<html>
  <head>
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
Two.js uses [nodejs](http://nodejs.org/) in order to build source files. You'll first want to install that.
Next you'll want to install [grunt](https://npmjs.org/package/grunt):

```
cd two.js
npm install grunt
```
You can edit the files that we be included in the build by modifying ./Gruntfile.js.
If you're making an application and you're only using one renderer (i.e: svg context) then it is highly recommended to remove canvas and webgl renderers from your build in order to drastically decrease your file size.

Finally, build the project:

```
grunt
```

If you are having problems running the closure compiler (it requires a JDK to be installed), run

```
grunt build-uglify
```
instead to minify the build with uglify.

## Change Log

##### Nightly
+ Updated `Two.interpret` to handle polybezier path data
+ Added `Two.Group.mask` and `Two.Polygon.clip` in order to create clipping masks
+ `Two.Group` has own `opacity` property [Leo Koppelkamm](https://github.com/DieBuche)
+ Rendering optimizations [Leo Koppelkamm](https://github.com/DieBuche)
+ `Two.noConflict` non-destructive command internally to the library
+ `Two.interpret` decomposes `transform` attribute of source tag
+ `Two.interpret` handles item irregularities from [Inkscape](http://www.inkscape.org/)
+ Changed `Two.Identifier` to use underscores instead of hyphens for dot-notation access [Leo Koppelkamm](https://github.com/DieBuche)
+ Added `Two.Group.getById` and `Two.Group.getByClassName` methods for convenient selection [Leo Koppelkamm](https://github.com/DieBuche)
+ Added `classList` to all `Two.Shape`s [Leo Koppelkamm](https://github.com/DieBuche)
+ Enabled inference of applied styles on imported svgs [Leo Koppelkamm](https://github.com/DieBuche)
+ Added `Two.Polygon.getPointAt` method to get coordinates on a curve/line
+ Added `Two.Polygon.length` property and `Two.Polygon._updateLength` method to calculate length of curve/line
+ Updated `Two.Group.prototype` observable properties on `Two.Polygon.Properties` to ensure each property is considered unique
+ ~~`Two.Polygon.vertices` first and last vertex create automated control points when `Two.Polygon.curved = true`~~
+ Updated `Two.Polygon.subdivide` method to accomodate `Two.makeEllipse`
+ Enabled `id` to be properly interpreted from SVG elements [@chrisdelbuck](http://github.com/chrisdelbuck)
+ Updated `webgl` renderer `getBoundingClientRect` to accommodate `relative` anchors
+ Updated `beginning` and `ending` to clamp to each other
+ Reorganized `Two.Polygon._update` and `Two.Polygon.plot` in order to handle `beginning` and `ending` properties
+ Updated `Two.getComputedMatrix` and `Two.Polygon.getBoundingClientRect` to adhere to nested transformations
+ Updated `Two.Anchor` to change `control` points relatively by default through `anchor.relative` property
+ Updated `Two.Polygon.subdivide` method to accomodate `curved = false` circumstances
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
+ Remove execution path dependency on utils/build.js [@masonbiler](https://github.com/masonbiler)
+ Added `timeDelta` property to every `two` instance
+ Added gruntfile, package.json for more integration with `npm`, and dependency free build (`build/two.clean.js`) [@iros](https://github.com/iros)
+ Crossbrowser compatibility with `noStroke` and `noFill` commands

##### May 3, 2013 [v0.2.0](https://github.com/jonobr1/two.js/tree/v0.2.0)
+ First alpha release

##### Jan 29, 2013 [v0.1.0-alpha](https://github.com/jonobr1/two.js/tree/v0.1.0-alpha)
+ Proof of Concept built from Three.js
