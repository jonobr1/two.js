# Two.Path


__Extends__: `Two.Shape`


This is the primary primitive class for creating all drawable shapes in Two.js. Unless specified methods return their instance of `Two.Path` for the purpose of chaining.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `vertices` | A list of [Two.Anchor](/documentation/anchor)s that represent the order and coordinates to construct the rendered shape. |
| `closed` | Describes whether the shape is closed or open. |
| `curved` | Describes whether the shape automatically calculates bezier handles for each vertex. |
| `manual` | Describes whether the developer controls how vertices are plotted or if Two.js automatically plots coordinates based on closed and curved booleans. |



---

<div class="instance">

## Two.Path.closed






Determines whether a final line is drawn between the final point in the `vertices` array and the first point.









</div>



---

<div class="instance">

## Two.Path.curved






When the path is `automatic = true` this boolean determines whether the lines between the points are curved or not.









</div>



---

<div class="instance">

## Two.Path.beginning






Number between zero and one to state the beginning of where the path is rendered.





[Two.Path.beginning](/documentation/path#two-path-beginning) is a percentage value that represents at what percentage into the path should the renderer start drawing.


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Path.ending](/documentation/path#two-path-ending).
:::


</div>



---

<div class="instance">

## Two.Path.ending






Number between zero and one to state the ending of where the path is rendered.





[Two.Path.ending](/documentation/path#two-path-ending) is a percentage value that represents at what percentage into the path should the renderer start drawing.


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Path.beginning](/documentation/path#two-path-beginning).
:::


</div>



---

<div class="instance">

## Two.Path.fill






The value of what the path should be filled in with.









</div>



---

<div class="instance">

## Two.Path.stroke






The value of what the path should be outlined in with.









</div>



---

<div class="instance">

## Two.Path.linewidth






The thickness in pixels of the stroke.









</div>



---

<div class="instance">

## Two.Path.opacity






The opaqueness of the path.








::: tip nota-bene
Can be used in conjunction with CSS Colors that have an alpha value.
:::


</div>



---

<div class="instance">

## Two.Path.className






A class to be applied to the element to be compatible with CSS styling.








::: tip nota-bene
Only available for the SVG renderer.
:::


</div>



---

<div class="instance">

## Two.Path.visible






Display the path or not.








::: tip nota-bene
For [Two.CanvasRenderer](/documentation/canvasrenderer) and [Two.WebGLRenderer](/documentation/webglrenderer) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>



---

<div class="instance">

## Two.Path.cap
















</div>



---

<div class="instance">

## Two.Path.join
















</div>



---

<div class="instance">

## Two.Path.miter
















</div>



---

<div class="instance">

## Two.Path.vertices






An ordered list of anchor points for rendering the path.





A list of [Two.Anchor](/documentation/anchor) objects that consist of what form the path takes.


::: tip nota-bene
The array when manipulating is actually a [Two.Utils.Collection](/documentation/utils#two-utils-collection).
:::


</div>



---

<div class="instance">

## Two.Path.automatic






Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.









</div>



---

<div class="instance">

## Two.Path.dashes






Array of numbers. Odd indices represent dash length. Even indices represent dash space.





A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.



</div>



---

<div class="instance">

## Two.Path.dashes.offset






A number in pixels to offset [Two.Path.dashes](/documentation/path#two-path-dashes) display.









</div>



---

<div class="static">

## Two.Path.Properties






A list of properties that are on every [Two.Path](/documentation/path).









</div>



---

<div class="static">

## Two.Path.FlagVertices










Cached method to let renderers know vertices have been updated on a [Two.Path](/documentation/path).



</div>



---

<div class="static">

## Two.Path.BindVertices










Cached method to let [Two.Path](/documentation/path) know vertices have been added to the instance.



</div>



---

<div class="static">

## Two.Path.UnbindVertices










Cached method to let [Two.Path](/documentation/path) know vertices have been removed from the instance.



</div>



---

<div class="static">

## Two.Path.FlagFill










Cached method to let [Two.Path](/documentation/path) know the fill has changed.



</div>



---

<div class="static">

## Two.Path.FlagFill










Cached method to let [Two.Path](/documentation/path) know the stroke has changed.



</div>



---

<div class="static">

## Two.Path.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.Path](/documentation/path) to any object. Handy if you'd like to extend the [Two.Path](/documentation/path) class on a custom class.



</div>



---

<div class="instance">

## Two.Path.length






The sum of distances between all [Two.Path.vertices](/documentation/path#two-path-vertices).









</div>



---

<div class="instance">

## Two.Path.clip






Object to define clipping area.








::: tip nota-bene
This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
:::


</div>



---

<div class="instance">

## Two.Path.clone


__Returns__:



+ `Two.Path`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of [Two.Path](/documentation/path) with the same properties of the current path.



</div>



---

<div class="instance">

## Two.Path.toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.



</div>



---

<div class="instance">

## Two.Path.noFill










Short hand method to set fill to `transparent`.



</div>



---

<div class="instance">

## Two.Path.noStroke










Short hand method to set stroke to `transparent`.



</div>



---

<div class="instance">

## Two.Path.corner










Orient the vertices of the shape to the upper left-hand corner of the path.



</div>



---

<div class="instance">

## Two.Path.center










Orient the vertices of the shape to the center of the path.



</div>



---

<div class="instance">

## Two.Path.remove










Remove self from the scene / parent.



</div>



---

<div class="instance">

## Two.Path.getBoundingClientRect


__Returns__:



+ `Object`



- Returns object with top, left, right, bottom, width, height attributes.









| Argument | Description |
| ---- | ----------- |
| `shallow` | Describes whether to calculate off local matrix or world matrix. |


Return an object with top, left, right, bottom, width, and height parameters of the path.



</div>



---

<div class="instance">

## Two.Path.getPointAt


__Returns__:



+ `Object`











| Argument | Description |
| ---- | ----------- |
| `t` | Percentage value describing where on the Two.Path to estimate and assign coordinate values. |
| `obj` | Object to apply calculated x, y to. If none available returns new Object. |


Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this Two.Path's curve.



</div>



---

<div class="instance">

## Two.Path.plot










Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.


::: tip nota-bene
While this method is public it is internally called by [Two.Path._update](/documentation/path#two-path-_update) when `automatic = true`.
:::


</div>



---

<div class="instance">

## Two.Path.subdivide








| Argument | Description |
| ---- | ----------- |
| `limit` | How many times to recurse subdivisions. |


Insert a [Two.Anchor](/documentation/anchor) at the midpoint between every item in [Two.Path.vertices](/documentation/path#two-path-vertices).



</div>


