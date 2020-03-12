# Two



The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `options` |  |
| `options.fullscreen` | Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. |
| `options.width` | The width of the stage on construction. This can be set at a later time. |
| `options.height` | The height of the stage on construction. This can be set at a later time. |
| `options.type` | The type of renderer to setup drawing with. See {@link Two.Types} for available options. |
| `options.autostart` | Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for {@link Two#play}. |



---

## Two.root










The root of the session context. In the browser this is the `window` variable. This varies in headless environments.





---

## Two.nextFrameID












The id of the next requestAnimationFrame function.





---

## Two.Array










A simple polyfill for Float32Array.





---

## Two.Types






The different rendering types availabe in the library.











---

## Two.Version






The current working version of the library.











---

## Two.PublishDate






The automatically generated publish date in the build process to verify version release candidates.











---

## Two.Identifier






String prefix for all Two.js object's ids. This trickles down to SVG ids.











---

## Two.Events






Map of possible events in Two.js.











---

## Two.Commands






Map of possible path commands. Taken from the SVG specification.











---

## Two.Resolution






Default amount of vertices to be used for interpreting Arcs and ArcSegments.











---

## Two.Instances






Registered list of all Two.js instances in the current session.











---

## Two.noConflict


__Returns__:



+ `Two`



Returns access to the top-level Two.js library for local use.











A function to revert the global namespaced `Two` variable to its previous incarnation.





---

## Two.uniqueId


__Returns__:



+ `Number`



Ever increasing integer.











Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.





---

## Two.Utils










A hodgepodge of handy functions, math, and properties are stored here.





---

## Two.Utils.performance






A special `Date` like object to get the current millis of the session. Used internally to calculate time between frames.e.g: `Two.Utils.performance.now() // milliseconds since epoch`











---

## Two.Utils.defineProperty








| Argument | Description |
| ---- | ----------- |
| `property` | The property to add an enumerable getter / setter to. |


Convenience function to setup the flag based getter / setter that most properties are defined as in Two.js.





---

## Two.Utils.shim


__Returns__:



+ `canvas`



Returns the instanced canvas object you passed from with additional attributes needed for Two.js.









| Argument | Description |
| ---- | ----------- |
| `canvas` | The instanced `Canvas` object provided by `node-canvas`. |
| `Image` | The prototypical `Image` object provided by `node-canvas`. This is only necessary to pass if you're going to load bitmap imagery. |


Convenience method for defining all the dependencies from the npm package `node-canvas`. See [node-canvas]{@link https://github.com/Automattic/node-canvas} for additional information on setting up HTML5 `<canvas />` drawing in a node.js environment.





---

## Two.Utils.release


__Returns__:



+ `Object`



The object passed for event deallocation.









| Argument | Description |
| ---- | ----------- |
| `obj` |  |


Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.





---

## Two.Utils.xhr


__Returns__:



+ `XMLHttpRequest`



The constructed and called XHR request.









| Argument | Description |
| ---- | ----------- |
| `path` |  |
| `callback` |  |


Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method.





---

## Two.Utils.Curve






Additional utility constant variables related to curve math and calculations.











---

## Two.Utils.getRatio


__Returns__:



+ `Number`



The ratio of a unit in Two.js to the pixel density of a session's screen.









| Argument | Description |
| ---- | ----------- |
| `ctx` |  |








---

## Two.Utils.setPlaying


__Returns__:



+ `Two`



The instance called with for potential chaining.











Internal convenience method to properly defer play calling until after all objects have been updated with their newest styles.





---

## Two.Utils.getComputedMatrix


__Returns__:



+ `Two.Matrix`



The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.









| Argument | Description |
| ---- | ----------- |
| `object` | The Two.js object that has a matrix property to calculate from. |
| `matrix` | The matrix to apply calculated transformations to if available. |


Method to get the world space transformation of a given object in a Two.js scene.





---

## Two.Utils.decomposeMatrix


__Returns__:



+ `Object`



An object containing relevant skew values.









| Argument | Description |
| ---- | ----------- |
| `matrix` | The matrix to decompose. |


Decompose a 2D 3x3 Matrix to find the skew.





---

## Two.Utils.extractCSSText


__Returns__:



+ `Object`



styles









| Argument | Description |
| ---- | ----------- |
| `text` | The CSS text body to be parsed and extracted. |
| `styles` | The styles object to apply CSS key values to. |


Parse CSS text body and apply them as key value pairs to a JavaScript object.





---

## Two.Utils.getSvgStyles


__Returns__:



+ `Object`



styles









| Argument | Description |
| ---- | ----------- |
| `node` | The SVG node to parse. |


Get the CSS comands from the `style` attribute of an SVG node and apply them as key value pairs to a JavaScript object.





---

## Two.Utils.applySvgViewBox


__Returns__:



+ `Two.Shape`



node
       @ @description









| Argument | Description |
| ---- | ----------- |
| `node` | The Two.js object to apply viewbox matrix to |
| `value` | The viewBox value from the SVG attribute |








---

## Two.Utils.applySvgAttributes


__Returns__:



+ `Two.Shape`



The Two.js object passed now with applied attributes.









| Argument | Description |
| ---- | ----------- |
| `node` | An SVG Node to extrapolate attributes from. |
| `elem` | The Two.js object to apply extrapolated attributes to. |


This function iterates through an SVG Node's properties and stores ones of interest. It tries to resolve styles applied via CSS as well.





---

## Two.Utils.getScene


__Returns__:



+ `Two.Group`



- The highest order {@link Two.Group} in the scenegraph.











| Argument | Description |
| ---- | ----------- |
| `node` | The currently available object in the scenegraph. |








---

## Two.Utils.read






A map of functions to read any number of SVG node types and create Two.js equivalents of them. Primarily used by the {@link Two#interpret} method.











---

## Two.Utils.subdivide


__Returns__:



+ `Array.<Two.Anchor>`



A list of anchor points ordered in between `x1`, `y1` and `x4`, `y4`









| Argument | Description |
| ---- | ----------- |
| `x1` | x position of first anchor point. |
| `y1` | y position of first anchor point. |
| `x2` | x position of first anchor point's "right" bezier handle. |
| `y2` | y position of first anchor point's "right" bezier handle. |
| `x3` | x position of second anchor point's "left" bezier handle. |
| `y3` | y position of second anchor point's "left" bezier handle. |
| `x4` | x position of second anchor point. |
| `y4` | y position of second anchor point. |
| `limit` | The amount of vertices to create by subdividing. |


Given 2 points (a, b) and corresponding control point for each return an array of points that represent points plotted along the curve. The number of returned points is determined by `limit`.





---

## Two.Utils.getComponentOnCubicBezier


__Returns__:



+ `Number`



The coordinate value for a specific component along a cubic bezier curve by `t`.









| Argument | Description |
| ---- | ----------- |
| `t` | Zero-to-one value describing what percentage to calculate. |
| `a` | The firt point's component value. |
| `b` | The first point's bezier component value. |
| `c` | The second point's bezier component value. |
| `d` | The second point's component value. |








---

## Two.Utils.getCurveLength


__Returns__:



+ `Number`



The length of a curve.









| Argument | Description |
| ---- | ----------- |
| `x1` | x position of first anchor point. |
| `y1` | y position of first anchor point. |
| `x2` | x position of first anchor point's "right" bezier handle. |
| `y2` | y position of first anchor point's "right" bezier handle. |
| `x3` | x position of second anchor point's "left" bezier handle. |
| `y3` | y position of second anchor point's "left" bezier handle. |
| `x4` | x position of second anchor point. |
| `y4` | y position of second anchor point. |
| `limit` | The amount of vertices to create by subdividing. |


Given 2 points (a, b) and corresponding control point for each, return a float that represents the length of the curve using Gauss-Legendre algorithm. Limit iterations of calculation by `limit`.





---

## Two.Utils.getCurveBoundingBox


__Returns__:



+ `Object`



Object contains min and max `x` / `y` bounds.









| Argument | Description |
| ---- | ----------- |
| `x1` | x position of first anchor point. |
| `y1` | y position of first anchor point. |
| `x2` | x position of first anchor point's "right" bezier handle. |
| `y2` | y position of first anchor point's "right" bezier handle. |
| `x3` | x position of second anchor point's "left" bezier handle. |
| `y3` | y position of second anchor point's "left" bezier handle. |
| `x4` | x position of second anchor point. |
| `y4` | y position of second anchor point. |








---

## Two.Utils.integrate








| Argument | Description |
| ---- | ----------- |
| `f` |  |
| `a` |  |
| `b` |  |
| `n` |  |


Integration for `getCurveLength` calculations.





---

## Two.Utils.getCurveFromPoints








| Argument | Description |
| ---- | ----------- |
| `points` |  |
| `closed` |  |


Sets the bezier handles on {@link Two.Anchor}s in the `points` list with estimated values to create a catmull-rom like curve. Used by {@link Two.Path#plot}.





---

## Two.Utils.getControlPoints


__Returns__:



+ `Two.Anchor`



Returns the passed middle point `b`.









| Argument | Description |
| ---- | ----------- |
| `a` |  |
| `b` |  |
| `c` |  |


Given three coordinates set the control points for the middle, b, vertex based on its position with the adjacent points.





---

## Two.Utils.getReflection


__Returns__:



+ `Two.Vector`



New {@link Two.Vector} that represents the reflection point.









| Argument | Description |
| ---- | ----------- |
| `a` |  |
| `b` |  |
| `relative` |  |


Get the reflection of a point `b` about point `a`. Where `a` is in absolute space and `b` is relative to `a`.





---

## Two.Utils.getAnchorsFromArcData








| Argument | Description |
| ---- | ----------- |
| `center` |  |
| `xAxisRotation` |  |
| `rx` | x radius |
| `ry` | y radius |
| `ts` |  |
| `td` |  |
| `ccw` | Set path traversal to counter-clockwise |








---

## Two.Utils.lerp


__Returns__:



+ `Number`











| Argument | Description |
| ---- | ----------- |
| `a` | Start value. |
| `b` | End value. |
| `t` | Zero-to-one value describing percentage between a and b. |


Linear interpolation between two values `a` and `b` by an amount `t`.





---

## Two.Utils.toFixed


__Returns__:



+ `Number`



That float trimmed to the third decimal place.









| Argument | Description |
| ---- | ----------- |
| `v` | Any float |


A pretty fast toFixed(3) alternative.





---

## Two.Utils.mod


__Returns__:



+ `Number`











| Argument | Description |
| ---- | ----------- |
| `v` | The value to modulo |
| `l` | The value to modulo by |


Modulo with added functionality to handle negative values in a positive manner.





---

## Two.Utils.Collection










An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.





---

## Two.Utils.Error










Custom error throwing for Two.js specific identification.





---

## Two.Utils.Events










Object inherited by many Two.js objects in order to facilitate custom events.





---

## Two.Utils.Events.on








| Argument | Description |
| ---- | ----------- |
| `name` | The name of the event to bind a function to. |
| `handler` | The function to be invoked when the event is dispatched. |


Call to add a listener to a specific event name.





---

## Two.Utils.Events.off








| Argument | Description |
| ---- | ----------- |
| `name` | The name of the event intended to be removed. |
| `handler` | The handler intended to be reomved. |


Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.





---

## Two.Utils.Events.trigger








| Argument | Description |
| ---- | ----------- |
| `name` | The name of the event to dispatch. |
| `arguments` | Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed. |


Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.





---

## Two.Utils.Events.bind
















---

## Two.Utils.Events.unbind
















---

## Two#appendTo








| Argument | Description |
| ---- | ----------- |
| `elem` | The DOM element to append the Two.js stage to. |


Shorthand method to append your instance of Two.js to the `document`.





---

## Two#play




__Triggers__:

+ `event:play`








Call to start an internal animation loop.


::: tip nota-bene
This function initiates a `requestAnimationFrame` loop.
:::




---

## Two#pause




__Triggers__:

+ `event:pause`








Call to stop the internal animation loop for a specific instance of Two.js.





---

## Two#update




__Triggers__:

+ `event:update`








Update positions and calculations in one pass before rendering. Then render to the canvas.


::: tip nota-bene
This function is called automatically if using {@link Two#play} or the `autostart` parameter in construction.
:::




---

## Two#render




__Triggers__:

+ `event:render`








Render all drawable and visible objects of the scene.





---

## Two#add








| Argument | Description |
| ---- | ----------- |
| `objects` | An array of Two.js objects. Alternatively can add objects as individual arguments. |


A shorthand method to add specific Two.js objects to the scene.





---

## Two#remove








| Argument | Description |
| ---- | ----------- |
| `objects` | An array of Two.js objects. |


A shorthand method to remove specific Two.js objects from the scene.





---

## Two#clear










Remove all all Two.js objects from the scene.





---

## Two#makeLine


__Returns__:



+ `Two.Line`











| Argument | Description |
| ---- | ----------- |
| `x1` |  |
| `y1` |  |
| `x2` |  |
| `y2` |  |


Creates a Two.js line and adds it to the scene.





---

## Two#makeArrow


__Returns__:



+ `Two.Path`











| Argument | Description |
| ---- | ----------- |
| `x1` |  |
| `y1` |  |
| `x2` |  |
| `y2` |  |


Creates a Two.js arrow and adds it to the scene.





---

## Two#makeRectangle


__Returns__:



+ `Two.Rectangle`











| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `width` |  |
| `height` |  |


Creates a Two.js rectangle and adds it to the scene.





---

## Two#makeRoundedRectangle


__Returns__:



+ `Two.Rectangle`











| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `width` |  |
| `height` |  |
| `sides` |  |


Creates a Two.js rounded rectangle and adds it to the scene.





---

## Two#makeCircle


__Returns__:



+ `Two.Circle`











| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `radius` |  |


Creates a Two.js circle and adds it to the scene.





---

## Two#makeEllipse


__Returns__:



+ `Two.Ellipse`











| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `rx` |  |
| `ry` |  |


Creates a Two.js ellipse and adds it to the scene.





---

## Two#makeStar


__Returns__:



+ `Two.Star`











| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `outerRadius` |  |
| `innerRadius` |  |
| `sides` |  |


Creates a Two.js star and adds it to the scene.





---

## Two#makeCurve


__Returns__:



+ `Two.Path`



- Where `path.curved` is set to `true`.









| Argument | Description |
| ---- | ----------- |
| `points` | An array of {@link Two.Anchor} points. |
| `` | Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path. |


Creates a Two.js path that is curved and adds it to the scene.


::: tip nota-bene
In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
:::




---

## Two#makePolygon


__Returns__:



+ `Two.Polygon`











| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `radius` |  |
| `sides` |  |


Creates a Two.js polygon and adds it to the scene.





---

## Two#makeArcSegment








| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `innerRadius` |  |
| `outerRadius` |  |
| `startAngle` |  |
| `endAngle` |  |
| `resolution` | The number of vertices that should comprise the arc segment. |








---

## Two#makePath


__Returns__:



+ `Two.Path`











| Argument | Description |
| ---- | ----------- |
| `points` | An array of {@link Two.Anchor} points. |
| `` | Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path. |


Creates a Two.js path and adds it to the scene.


::: tip nota-bene
In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
:::




---

## Two#makeText


__Returns__:



+ `Two.Text`











| Argument | Description |
| ---- | ----------- |
| `message` |  |
| `x` |  |
| `y` |  |
| `styles` | An object to describe any of the {@link Two.Text.Properties} including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc.. |


Creates a Two.js text object and adds it to the scene.





---

## Two#makeLinearGradient


__Returns__:



+ `Two.LinearGradient`











| Argument | Description |
| ---- | ----------- |
| `x1` |  |
| `y1` |  |
| `x2` |  |
| `y2` |  |
| `stops` | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |


Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.





---

## Two#makeRadialGradient


__Returns__:



+ `Two.RadialGradient`











| Argument | Description |
| ---- | ----------- |
| `x1` |  |
| `y1` |  |
| `radius` |  |
| `stops` | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |


Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.





---

## Two#makeSprite


__Returns__:



+ `Two.Sprite`











| Argument | Description |
| ---- | ----------- |
| `pathOrTexture` | The URL path to an image or an already created {@link Two.Texture}. |
| `x` |  |
| `y` |  |
| `columns` |  |
| `rows` |  |
| `frameRate` |  |
| `autostart` |  |


Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.





---

## Two#makeImageSequence


__Returns__:



+ `Two.ImageSequence`











| Argument | Description |
| ---- | ----------- |
| `pathsOrTextures` | An array of paths or of {@link Two.Textures}. |
| `x` |  |
| `y` |  |
| `frameRate` |  |
| `autostart` |  |


Creates a Two.js image sequence object and adds it to the scene.





---

## Two#makeTexture


__Returns__:



+ `Two.Texture`











| Argument | Description |
| ---- | ----------- |
| `pathOrSource` | The URL path to an image or a DOM image-like element. |
| `callback` | Function to be invoked when the image is loaded. |


Creates a Two.js texture object.





---

## Two#makeGroup


__Returns__:



+ `Two.Group`











| Argument | Description |
| ---- | ----------- |
| `objects` | Two.js objects to be added to the group in the form of an array or as individual arguments. |


Creates a Two.js group object and adds it to the scene.





---

## Two#interpret


__Returns__:



+ `Two.Group`











| Argument | Description |
| ---- | ----------- |
| `svgNode` | The SVG node to be parsed. |
| `shallow` | Don't create a top-most group but append all content directly. |
| `add` | – Automatically add the reconstructed SVG node to scene. |


Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js — this is slightly different than a direct transcription.





---

## Two#load


__Returns__:



+ `Two.Group`











| Argument | Description |
| ---- | ----------- |
| `pathOrSVGContent` | The URL path of an SVG file or an SVG document as text. |
| `callback` | Function to call once loading has completed. |


Load an SVG file or SVG text and interpret it into Two.js legible objects.




