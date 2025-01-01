---
title: Two.Points
pageClass: docs
lang: en-US
---

# Two.Points


<div class="extends">

Extends: [Two.Shape](/docs/shape/)

</div>


This is a primary primitive class for quickly and easily drawing points in Two.js. Unless specified methods return their instance of `Two.Points` for the purpose of chaining.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  vertices  | A list of [Two.Vector](/docs/vector/)s that represent the order and coordinates to construct a rendered set of points. |



<div class="instance member ">

## sizeAttenuation

<h2 class="longname" aria-hidden="true"><a href="#sizeAttenuation"><span class="prefix">Two.Points.</span><span class="shortname">sizeAttenuation</span></a></h2>










<div class="properties">


Boolean dictating whether Two.js should scale the size of the points based on its matrix hierarchy.


</div>






<div class="description">

Set to `true` if you'd like the size of the points to be relative to the scale of its parents; `false` to disregard. Default is `false`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L74">
    points.js:74
  </a>

</div>




</div>



<div class="instance member ">

## beginning

<h2 class="longname" aria-hidden="true"><a href="#beginning"><span class="prefix">Two.Points.</span><span class="shortname">beginning</span></a></h2>










<div class="properties">


Number between zero and one to state the beginning of where the path is rendered.


</div>






<div class="description">

[Two.Points.beginning](/docs/shapes/points/#beginning) is a percentage value that represents at what percentage into the path should the renderer start drawing.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L81">
    points.js:81
  </a>

</div>




</div>



<div class="instance member ">

## ending

<h2 class="longname" aria-hidden="true"><a href="#ending"><span class="prefix">Two.Points.</span><span class="shortname">ending</span></a></h2>










<div class="properties">


Number between zero and one to state the ending of where the path is rendered.


</div>






<div class="description">

[Two.Points.ending](/docs/shapes/points/#ending) is a percentage value that represents at what percentage into the path should the renderer start drawing.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L88">
    points.js:88
  </a>

</div>




</div>



<div class="instance member ">

## fill

<h2 class="longname" aria-hidden="true"><a href="#fill"><span class="prefix">Two.Points.</span><span class="shortname">fill</span></a></h2>










<div class="properties">


The value of what the path should be filled in with.


</div>








<div class="see">

See: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L97">
    points.js:97
  </a>

</div>




</div>



<div class="instance member ">

## stroke

<h2 class="longname" aria-hidden="true"><a href="#stroke"><span class="prefix">Two.Points.</span><span class="shortname">stroke</span></a></h2>










<div class="properties">


The value of what the path should be outlined in with.


</div>








<div class="see">

See: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L104">
    points.js:104
  </a>

</div>




</div>



<div class="instance member ">

## className

<h2 class="longname" aria-hidden="true"><a href="#className"><span class="prefix">Two.Points.</span><span class="shortname">className</span></a></h2>










<div class="properties">


A class to be applied to the element to be compatible with CSS styling.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L111">
    points.js:111
  </a>

</div>



<div class="tags">


::: tip nota-bene
Only available for the SVG renderer.
:::


</div>


</div>



<div class="instance member ">

## visible

<h2 class="longname" aria-hidden="true"><a href="#visible"><span class="prefix">Two.Points.</span><span class="shortname">visible</span></a></h2>










<div class="properties">


Display the points or not.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L118">
    points.js:118
  </a>

</div>



<div class="tags">


::: tip nota-bene
For [Two.CanvasRenderer](/docs/renderers/canvas/) and [Two.WebGLRenderer](/docs/renderers/webgl/) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>


</div>



<div class="instance member ">

## vertices

<h2 class="longname" aria-hidden="true"><a href="#vertices"><span class="prefix">Two.Points.</span><span class="shortname">vertices</span></a></h2>










<div class="properties">


An ordered list of vector points for rendering points.


</div>






<div class="description">

A list of [Two.Vector](/docs/vector/) objects that consist of which coordinates to draw points at.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L125">
    points.js:125
  </a>

</div>



<div class="tags">


::: tip nota-bene
The array when manipulating is actually a [Two.Collection](/docs/collection/).
:::


</div>


</div>



<div class="instance member ">

## dashes

<h2 class="longname" aria-hidden="true"><a href="#dashes"><span class="prefix">Two.Points.</span><span class="shortname">dashes</span></a></h2>










<div class="properties">


Array of numbers. Odd indices represent dash length. Even indices represent dash space.


</div>






<div class="description">

A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.

</div>



<div class="see">

See: [https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) for more information on the SVG stroke-dasharray attribute.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L133">
    points.js:133
  </a>

</div>




</div>



<div class="instance member ">

## dashes.offset

<h2 class="longname" aria-hidden="true"><a href="#dashes.offset"><span class="prefix">Two.Points.</span><span class="shortname">dashes.offset</span></a></h2>










<div class="properties">


A number in pixels to offset [Two.Points.dashes](/docs/shapes/points/#dashes) display.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L141">
    points.js:141
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Points.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  points  | The reference [Two.Points](/docs/shapes/points/) |
</div>




<div class="description">

Copy the properties of one [Two.Points](/docs/shapes/points/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L177">
    points.js:177
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Points.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Points



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Points](/docs/shapes/points/) with the same properties of the current path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L205">
    points.js:205
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Points.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the points object.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L243">
    points.js:243
  </a>

</div>




</div>



<div class="instance function ">

## noFill

<h2 class="longname" aria-hidden="true"><a href="#noFill"><span class="prefix">Two.Points.</span><span class="shortname">noFill</span></a></h2>















<div class="description">

Short hand method to set fill to `none`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L272">
    points.js:272
  </a>

</div>




</div>



<div class="instance function ">

## noStroke

<h2 class="longname" aria-hidden="true"><a href="#noStroke"><span class="prefix">Two.Points.</span><span class="shortname">noStroke</span></a></h2>















<div class="description">

Short hand method to set stroke to `none`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L279">
    points.js:279
  </a>

</div>




</div>



<div class="instance function ">

## corner

<h2 class="longname" aria-hidden="true"><a href="#corner"><span class="prefix">Two.Points.</span><span class="shortname">corner</span></a></h2>















<div class="description">

Orient the vertices of the shape to the upper left-hand corner of the points object.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L286">
    points.js:286
  </a>

</div>




</div>



<div class="instance function ">

## center

<h2 class="longname" aria-hidden="true"><a href="#center"><span class="prefix">Two.Points.</span><span class="shortname">center</span></a></h2>















<div class="description">

Orient the vertices of the shape to the center of the points object.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L293">
    points.js:293
  </a>

</div>




</div>



<div class="instance function ">

## getBoundingClientRect

<h2 class="longname" aria-hidden="true"><a href="#getBoundingClientRect"><span class="prefix">Two.Points.</span><span class="shortname">getBoundingClientRect</span></a></h2>




<div class="returns">

__Returns__: Object


- Returns object with top, left, right, bottom, width, height attributes.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  shallow  | Describes whether to calculate off local matrix or world matrix. |
</div>




<div class="description">

Return an object with top, left, right, bottom, width, and height parameters of the path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L300">
    points.js:300
  </a>

</div>




</div>



<div class="instance function ">

## subdivide

<h2 class="longname" aria-hidden="true"><a href="#subdivide"><span class="prefix">Two.Points.</span><span class="shortname">subdivide</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  limit  | How many times to recurse subdivisions. |
</div>




<div class="description">

Insert a [Two.Vector](/docs/vector/) at the midpoint between every item in [Two.Points.vertices](/docs/shapes/points/#vertices).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L309">
    points.js:309
  </a>

</div>




</div>



<div class="instance member ">

## length

<h2 class="longname" aria-hidden="true"><a href="#length"><span class="prefix">Two.Points.</span><span class="shortname">length</span></a></h2>










<div class="properties">


The sum of distances between all [Two.Points.vertices](/docs/shapes/points/#vertices).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/points.js#L529">
    points.js:529
  </a>

</div>




</div>


