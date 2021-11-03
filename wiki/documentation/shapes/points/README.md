---
pageClass: documentation-class
---

# Two.Points


<div class="extends">

__Extends__: `Two.Shape`

</div>


This is a primary primitive class for quickly and easily drawing points in Two.js. Unless specified methods return their instance of `Two.Points` for the purpose of chaining.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L20)

</div>



## Constructor


| Argument | Description |
| ---- | ----------- |
|  `vertices`  | A list of [Two.Vector](/documentation/vector)s that represent the order and coordinates to construct a rendered set of points. |



---

<div class="instance member ">

### Two.Points.sizeAttenuation








<div class="properties">

Boolean dictating whether Two.js should scale the size of the points based on its matrix hierarcy.

</div>






<div class="description">

Set to `true` if you'd like the size of the points to be relative to the scale of its parents; `false` to disregard. Default is `false`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L41)

</div>






</div>



---

<div class="instance member ">

### Two.Points.beginning








<div class="properties">

Number between zero and one to state the beginning of where the path is rendered.

</div>






<div class="description">

[Two.Points.beginning](/documentation/points/#two-points-beginning) is a percentage value that represents at what percentage into the path should the renderer start drawing.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L48)

</div>






</div>



---

<div class="instance member ">

### Two.Points.ending








<div class="properties">

Number between zero and one to state the ending of where the path is rendered.

</div>






<div class="description">

[Two.Points.ending](/documentation/points/#two-points-ending) is a percentage value that represents at what percentage into the path should the renderer start drawing.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L55)

</div>






</div>



---

<div class="instance member ">

### Two.Points.fill








<div class="properties">

The value of what the path should be filled in with.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L64)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>


</div>



---

<div class="instance member ">

### Two.Points.stroke








<div class="properties">

The value of what the path should be outlined in with.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L71)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>


</div>



---

<div class="instance member ">

### Two.Points.className








<div class="properties">

A class to be applied to the element to be compatible with CSS styling.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L78)

</div>



<div class="tags">


::: tip nota-bene
Only available for the SVG renderer.
:::


</div>




</div>



---

<div class="instance member ">

### Two.Points.visible








<div class="properties">

Display the points or not.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L85)

</div>



<div class="tags">


::: tip nota-bene
For [Two.CanvasRenderer](/documentation/canvasrenderer) and [Two.WebGLRenderer](/documentation/webglrenderer) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>




</div>



---

<div class="instance member ">

### Two.Points.vertices








<div class="properties">

An ordered list of vector points for rendering points.

</div>






<div class="description">

A list of [Two.Vector](/documentation/vector) objects that consist of which coordinates to draw points at.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L92)

</div>



<div class="tags">


::: tip nota-bene
The array when manipulating is actually a [Two.Collection](/documentation/collection).
:::


</div>




</div>



---

<div class="instance member ">

### Two.Points.dashes








<div class="properties">

Array of numbers. Odd indices represent dash length. Even indices represent dash space.

</div>






<div class="description">

A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L100)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) for more information on the SVG stroke-dasharray attribute.

</div>


</div>



---

<div class="instance member ">

### Two.Points.dashes.offset








<div class="properties">

A number in pixels to offset [Two.Points.dashes](/documentation/points/#two-points-dashes) display.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L108)

</div>






</div>



---

<div class="instance member ">

### Two.Points.length








<div class="properties">

The sum of distances between all [Two.Points.vertices](/documentation/points/#two-points-vertices).

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L191)

</div>






</div>



---

<div class="instance function ">

### Two.Points.clone




<div class="returns">

__Returns__:



+ `Two.Points`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `parent`  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Points](/documentation/points) with the same properties of the current path.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L309)

</div>






</div>



---

<div class="instance function ">

### Two.Points.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the points object.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L349)

</div>






</div>



---

<div class="instance function ">

### Two.Points.noFill













<div class="description">

Short hand method to set fill to `transparent`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L383)

</div>






</div>



---

<div class="instance function ">

### Two.Points.noStroke













<div class="description">

Short hand method to set stroke to `transparent`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L390)

</div>






</div>



---

<div class="instance function ">

### Two.Points.corner













<div class="description">

Orient the vertices of the shape to the upper left-hand corner of the points object.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L397)

</div>






</div>



---

<div class="instance function ">

### Two.Points.center













<div class="description">

Orient the vertices of the shape to the center of the points object.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L404)

</div>






</div>



---

<div class="instance function ">

### Two.Points.remove













<div class="description">

Remove self from the scene / parent.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L411)

</div>






</div>



---

<div class="instance function ">

### Two.Points.getBoundingClientRect




<div class="returns">

__Returns__:



+ `Object`



- Returns object with top, left, right, bottom, width, height attributes.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `shallow`  | Describes whether to calculate off local matrix or world matrix. |
</div>




<div class="description">

Return an object with top, left, right, bottom, width, and height parameters of the path.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L418)

</div>






</div>



---

<div class="instance function ">

### Two.Points.subdivide










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `limit`  | How many times to recurse subdivisions. |
</div>




<div class="description">

Insert a [Two.Vector](/documentation/vector) at the midpoint between every item in [Two.Points.vertices](/documentation/points/#two-points-vertices).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shapes/points.js#L427)

</div>






</div>


