---
title: Two.Group
pageClass: docs
lang: en-US
---

# Two.Group


<div class="extends">

Extends: [Two.Shape](/docs/shape/)

</div>


This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/group.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  children  | A list of objects that inherit [Two.Shape](/docs/shape/). For instance, the array could be a [Two.Path](/docs/path/), [Two.Text](/docs/text/), and [Two.RoundedRectangle](/docs/shapes/rounded-rectangle/). |



<div class="static function ">

## InsertChildren

<h2 class="longname" aria-hidden="true"><a href="#InsertChildren"><span class="prefix">Two.Group.</span><span class="shortname">InsertChildren</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  children  | The objects to be inserted. |
</div>




<div class="description">

Cached method to let renderers know children have been added to a [Two.Group](/docs/group/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L225">
    group.js:225
  </a>

</div>




</div>



<div class="static function ">

## RemoveChildren

<h2 class="longname" aria-hidden="true"><a href="#RemoveChildren"><span class="prefix">Two.Group.</span><span class="shortname">RemoveChildren</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  children  | The objects to be removed. |
</div>




<div class="description">

Cached method to let renderers know children have been removed from a [Two.Group](/docs/group/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L237">
    group.js:237
  </a>

</div>




</div>



<div class="static function ">

## OrderChildren

<h2 class="longname" aria-hidden="true"><a href="#OrderChildren"><span class="prefix">Two.Group.</span><span class="shortname">OrderChildren</span></a></h2>















<div class="description">

Cached method to let renderers know order has been updated on a [Two.Group](/docs/group/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L249">
    group.js:249
  </a>

</div>




</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Group.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.Group](/docs/group/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L258">
    group.js:258
  </a>

</div>




</div>



<div class="instance member ">

## fill

<h2 class="longname" aria-hidden="true"><a href="#fill"><span class="prefix">Two.Group.</span><span class="shortname">fill</span></a></h2>










<div class="properties">


The value of what all child shapes should be filled in with.


</div>








<div class="see">

See: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L86">
    group.js:86
  </a>

</div>




</div>



<div class="instance member ">

## stroke

<h2 class="longname" aria-hidden="true"><a href="#stroke"><span class="prefix">Two.Group.</span><span class="shortname">stroke</span></a></h2>










<div class="properties">


The value of what all child shapes should be outlined in with.


</div>








<div class="see">

See: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L93">
    group.js:93
  </a>

</div>




</div>



<div class="instance member ">

## linewidth

<h2 class="longname" aria-hidden="true"><a href="#linewidth"><span class="prefix">Two.Group.</span><span class="shortname">linewidth</span></a></h2>










<div class="properties">


The thickness in pixels of the stroke for all child shapes.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L100">
    group.js:100
  </a>

</div>




</div>



<div class="instance member ">

## opacity

<h2 class="longname" aria-hidden="true"><a href="#opacity"><span class="prefix">Two.Group.</span><span class="shortname">opacity</span></a></h2>










<div class="properties">


The opaqueness of all child shapes.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L106">
    group.js:106
  </a>

</div>



<div class="tags">


::: tip nota-bene
Becomes multiplied by the individual child's opacity property.
:::


</div>


</div>



<div class="instance member ">

## visible

<h2 class="longname" aria-hidden="true"><a href="#visible"><span class="prefix">Two.Group.</span><span class="shortname">visible</span></a></h2>










<div class="properties">


Display the path or not.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L113">
    group.js:113
  </a>

</div>



<div class="tags">


::: tip nota-bene
For [Two.CanvasRenderer](/docs/renderers/canvas/) and [Two.WebGLRenderer](/docs/renderers/webgl/) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>


</div>



<div class="instance member ">

## cap

<h2 class="longname" aria-hidden="true"><a href="#cap"><span class="prefix">Two.Group.</span><span class="shortname">cap</span></a></h2>










<div class="properties">





</div>








<div class="see">

See: [https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty)

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L120">
    group.js:120
  </a>

</div>




</div>



<div class="instance member ">

## join

<h2 class="longname" aria-hidden="true"><a href="#join"><span class="prefix">Two.Group.</span><span class="shortname">join</span></a></h2>










<div class="properties">





</div>








<div class="see">

See: [https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty)

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L127">
    group.js:127
  </a>

</div>




</div>



<div class="instance member ">

## miter

<h2 class="longname" aria-hidden="true"><a href="#miter"><span class="prefix">Two.Group.</span><span class="shortname">miter</span></a></h2>










<div class="properties">





</div>








<div class="see">

See: [https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty)

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L134">
    group.js:134
  </a>

</div>




</div>



<div class="instance member ">

## closed

<h2 class="longname" aria-hidden="true"><a href="#closed"><span class="prefix">Two.Group.</span><span class="shortname">closed</span></a></h2>










<div class="properties">


Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L141">
    group.js:141
  </a>

</div>




</div>



<div class="instance member ">

## curved

<h2 class="longname" aria-hidden="true"><a href="#curved"><span class="prefix">Two.Group.</span><span class="shortname">curved</span></a></h2>










<div class="properties">


When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L147">
    group.js:147
  </a>

</div>




</div>



<div class="instance member ">

## automatic

<h2 class="longname" aria-hidden="true"><a href="#automatic"><span class="prefix">Two.Group.</span><span class="shortname">automatic</span></a></h2>










<div class="properties">


Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L153">
    group.js:153
  </a>

</div>




</div>



<div class="instance member ">

## beginning

<h2 class="longname" aria-hidden="true"><a href="#beginning"><span class="prefix">Two.Group.</span><span class="shortname">beginning</span></a></h2>










<div class="properties">


Number between zero and one to state the beginning of where the path is rendered.


</div>






<div class="description">

[Two.Group.beginning](/docs/group/#beginning) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L159">
    group.js:159
  </a>

</div>



<div class="tags">


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.ending](/docs/group/#ending).
:::


</div>


</div>



<div class="instance member ">

## ending

<h2 class="longname" aria-hidden="true"><a href="#ending"><span class="prefix">Two.Group.</span><span class="shortname">ending</span></a></h2>










<div class="properties">


Number between zero and one to state the ending of where the path is rendered.


</div>






<div class="description">

[Two.Group.ending](/docs/group/#ending) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L167">
    group.js:167
  </a>

</div>



<div class="tags">


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.beginning](/docs/group/#beginning).
:::


</div>


</div>



<div class="instance member ">

## length

<h2 class="longname" aria-hidden="true"><a href="#length"><span class="prefix">Two.Group.</span><span class="shortname">length</span></a></h2>










<div class="properties">


The sum of distances between all child lengths.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L175">
    group.js:175
  </a>

</div>




</div>



<div class="instance member ">

## mask

<h2 class="longname" aria-hidden="true"><a href="#mask"><span class="prefix">Two.Group.</span><span class="shortname">mask</span></a></h2>










<div class="properties">


The Two.js object to clip from a group's rendering.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L181">
    group.js:181
  </a>

</div>




</div>



<div class="instance member ">

## additions

<h2 class="longname" aria-hidden="true"><a href="#additions"><span class="prefix">Two.Group.</span><span class="shortname">additions</span></a></h2>










<div class="properties">





</div>






<div class="description">

An automatically updated list of children that need to be appended to the renderer's scenegraph.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L199">
    group.js:199
  </a>

</div>




</div>



<div class="instance member ">

## subtractions

<h2 class="longname" aria-hidden="true"><a href="#subtractions"><span class="prefix">Two.Group.</span><span class="shortname">subtractions</span></a></h2>










<div class="properties">





</div>






<div class="description">

An automatically updated list of children that need to be removed from the renderer's scenegraph.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L206">
    group.js:206
  </a>

</div>




</div>



<div class="instance member ">

## children

<h2 class="longname" aria-hidden="true"><a href="#children"><span class="prefix">Two.Group.</span><span class="shortname">children</span></a></h2>










<div class="properties">





</div>






<div class="description">

A list of all the children in the scenegraph.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L213">
    group.js:213
  </a>

</div>



<div class="tags">


::: tip nota-bene
Ther order of this list indicates the order each element is rendered to the screen.
:::


</div>


</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Group.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Group



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Group](/docs/group/) with the same properties of the current group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L275">
    group.js:275
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Group.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L320">
    group.js:320
  </a>

</div>




</div>



<div class="instance function ">

## corner

<h2 class="longname" aria-hidden="true"><a href="#corner"><span class="prefix">Two.Group.</span><span class="shortname">corner</span></a></h2>















<div class="description">

Orient the children of the group to the upper left-hand corner of that group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L350">
    group.js:350
  </a>

</div>




</div>



<div class="instance function ">

## center

<h2 class="longname" aria-hidden="true"><a href="#center"><span class="prefix">Two.Group.</span><span class="shortname">center</span></a></h2>















<div class="description">

Orient the children of the group to the center of that group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L374">
    group.js:374
  </a>

</div>




</div>



<div class="instance function ">

## getById

<h2 class="longname" aria-hidden="true"><a href="#getById"><span class="prefix">Two.Group.</span><span class="shortname">getById</span></a></h2>




<div class="returns">

__Returns__: Two.Shape


- Or `null` if nothing is found.


</div>












<div class="description">

Recursively search for id. Returns the first element found.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L402">
    group.js:402
  </a>

</div>




</div>



<div class="instance function ">

## getByClassName

<h2 class="longname" aria-hidden="true"><a href="#getByClassName"><span class="prefix">Two.Group.</span><span class="shortname">getByClassName</span></a></h2>




<div class="returns">

__Returns__: Array.<Two.Shape>


- Or empty array if nothing is found.


</div>












<div class="description">

Recursively search for classes. Returns an array of matching elements.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L426">
    group.js:426
  </a>

</div>




</div>



<div class="instance function ">

## getByType

<h2 class="longname" aria-hidden="true"><a href="#getByType"><span class="prefix">Two.Group.</span><span class="shortname">getByType</span></a></h2>




<div class="returns">

__Returns__: Array.<Two.Shape>


- Empty array if nothing is found.


</div>












<div class="description">

Recursively search for children of a specific type, e.g. [Two.Path](/docs/path/). Pass a reference to this type as the param. Returns an array of matching elements.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L449">
    group.js:449
  </a>

</div>




</div>



<div class="instance function ">

## add

<h2 class="longname" aria-hidden="true"><a href="#add"><span class="prefix">Two.Group.</span><span class="shortname">add</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  objects  | An array of objects to be added. Can also be supplied as individual arguments. |
</div>




<div class="description">

Add objects to the group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L472">
    group.js:472
  </a>

</div>




</div>



<div class="instance function ">

## remove

<h2 class="longname" aria-hidden="true"><a href="#remove"><span class="prefix">Two.Group.</span><span class="shortname">remove</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  objects  | An array of objects to be removed. Can be also removed as individual arguments. If no arguments are passed, then it removes itself from its parent. |
</div>




<div class="description">

Remove objects from the group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L506">
    group.js:506
  </a>

</div>




</div>



<div class="instance function ">

## getBoundingClientRect

<h2 class="longname" aria-hidden="true"><a href="#getBoundingClientRect"><span class="prefix">Two.Group.</span><span class="shortname">getBoundingClientRect</span></a></h2>




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

Return an object with top, left, right, bottom, width, and height parameters of the group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L549">
    group.js:549
  </a>

</div>




</div>



<div class="instance function ">

## noFill

<h2 class="longname" aria-hidden="true"><a href="#noFill"><span class="prefix">Two.Group.</span><span class="shortname">noFill</span></a></h2>















<div class="description">

Apply `noFill` method to all child shapes.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L623">
    group.js:623
  </a>

</div>




</div>



<div class="instance function ">

## noStroke

<h2 class="longname" aria-hidden="true"><a href="#noStroke"><span class="prefix">Two.Group.</span><span class="shortname">noStroke</span></a></h2>















<div class="description">

Apply `noStroke` method to all child shapes.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L635">
    group.js:635
  </a>

</div>




</div>



<div class="instance function ">

## subdivide

<h2 class="longname" aria-hidden="true"><a href="#subdivide"><span class="prefix">Two.Group.</span><span class="shortname">subdivide</span></a></h2>















<div class="description">

Apply `subdivide` method to all child shapes.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/group.js#L647">
    group.js:647
  </a>

</div>




</div>


