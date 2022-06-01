---
title: Two
pageClass: docs
lang: en-US
---

# Two


<div class="extends">

Extends: [Two.Events](/docs/events/)

</div>


The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/two.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  options  |  |
|  options.fullscreen  | Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. This overrides `options.fitted` as well. |
|  options.fitted  | Set to `true` to automatically make the stage adapt to the width and height of the parent element. This parameter overrides `width` and `height` parameters if set to `true`. |
|  options.width  | The width of the stage on construction. This can be set at a later time. |
|  options.height  | The height of the stage on construction. This can be set at a later time. |
|  options.type  | The type of renderer to setup drawing with. See [Two.Types]() for available options. |
|  options.autostart  | Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for [Two.play](). |
|  options.domElement  | The canvas or SVG element to draw into. This overrides the `options.type` argument. |



<div class="static member ">

## Types

<h2 class="longname" aria-hidden="true"><a href="#Types"><span class="prefix">Two.</span><span class="shortname">Types</span></a></h2>










<div class="properties">


The different rendering types available in the library.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L268">
    two.js:268
  </a>

</div>




</div>



<div class="static member ">

## Version

<h2 class="longname" aria-hidden="true"><a href="#Version"><span class="prefix">Two.</span><span class="shortname">Version</span></a></h2>










<div class="properties">


The current working version of the library, `v0.8.9`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L274">
    two.js:274
  </a>

</div>




</div>



<div class="static member ">

## PublishDate

<h2 class="longname" aria-hidden="true"><a href="#PublishDate"><span class="prefix">Two.</span><span class="shortname">PublishDate</span></a></h2>










<div class="properties">


The automatically generated publish date in the build process to verify version release candidates.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L280">
    two.js:280
  </a>

</div>




</div>



<div class="static member ">

## Identifier

<h2 class="longname" aria-hidden="true"><a href="#Identifier"><span class="prefix">Two.</span><span class="shortname">Identifier</span></a></h2>










<div class="properties">


String prefix for all Two.js object's ids. This trickles down to SVG ids.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L286">
    two.js:286
  </a>

</div>




</div>



<div class="static member ">

## Resolution

<h2 class="longname" aria-hidden="true"><a href="#Resolution"><span class="prefix">Two.</span><span class="shortname">Resolution</span></a></h2>










<div class="properties">


Default amount of vertices to be used for interpreting Arcs and ArcSegments.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L292">
    two.js:292
  </a>

</div>




</div>



<div class="static member ">

## AutoCalculateImportedMatrices

<h2 class="longname" aria-hidden="true"><a href="#AutoCalculateImportedMatrices"><span class="prefix">Two.</span><span class="shortname">AutoCalculateImportedMatrices</span></a></h2>










<div class="properties">


When importing SVGs through the [Two.interpret]() and [Two.load](), this boolean determines whether Two.js infers and then overrides the exact transformation matrix of the reference SVG.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L298">
    two.js:298
  </a>

</div>



<div class="tags">


::: tip nota-bene
`false` copies the exact transformation matrix values, but also sets the path's `matrix.manual = true`.
:::


</div>


</div>



<div class="static member ">

## Instances

<h2 class="longname" aria-hidden="true"><a href="#Instances"><span class="prefix">Two.</span><span class="shortname">Instances</span></a></h2>










<div class="properties">


Registered list of all Two.js instances in the current session.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L305">
    two.js:305
  </a>

</div>




</div>



<div class="static function ">

## uniqueId

<h2 class="longname" aria-hidden="true"><a href="#uniqueId"><span class="prefix">Two.</span><span class="shortname">uniqueId</span></a></h2>




<div class="returns">

__Returns__: Number


Ever increasing Number.


</div>












<div class="description">

Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L311">
    two.js:311
  </a>

</div>




</div>



<div class="static member ">

## Utils

<h2 class="longname" aria-hidden="true"><a href="#Utils"><span class="prefix">Two.</span><span class="shortname">Utils</span></a></h2>










<div class="properties">


A massive object filled with utility functions and properties.



__Two.Utils.read__: A collection of SVG parsing functions indexed by element name.



__Two.Utils.read.path__: Parse SVG path element or `d` attribute string.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L353">
    two.js:353
  </a>

</div>




</div>



<div class="instance member ">

## type

<h2 class="longname" aria-hidden="true"><a href="#type"><span class="prefix">Two.</span><span class="shortname">type</span></a></h2>










<div class="properties">


A string representing which type of renderer the instance has instantiated.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L126">
    two.js:126
  </a>

</div>




</div>



<div class="instance member ">

## renderer

<h2 class="longname" aria-hidden="true"><a href="#renderer"><span class="prefix">Two.</span><span class="shortname">renderer</span></a></h2>










<div class="properties">


The instantiated rendering class for the instance. For a list of possible rendering types check out Two.Types.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L132">
    two.js:132
  </a>

</div>




</div>



<div class="instance member ">

## scene

<h2 class="longname" aria-hidden="true"><a href="#scene"><span class="prefix">Two.</span><span class="shortname">scene</span></a></h2>










<div class="properties">


The base level [Two.Group](/docs/group/) which houses all objects for the instance. Because it is a [Two.Group](/docs/group/) transformations can be applied to it that will affect all objects in the instance. This is handy as a makeshift inverted camera.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L138">
    two.js:138
  </a>

</div>




</div>



<div class="instance member ">

## width

<h2 class="longname" aria-hidden="true"><a href="#width"><span class="prefix">Two.</span><span class="shortname">width</span></a></h2>










<div class="properties">


The width of the instance's dom element.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L144">
    two.js:144
  </a>

</div>




</div>



<div class="instance member ">

## height

<h2 class="longname" aria-hidden="true"><a href="#height"><span class="prefix">Two.</span><span class="shortname">height</span></a></h2>










<div class="properties">


The height of the instance's dom element.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L150">
    two.js:150
  </a>

</div>




</div>



<div class="instance member ">

## frameCount

<h2 class="longname" aria-hidden="true"><a href="#frameCount"><span class="prefix">Two.</span><span class="shortname">frameCount</span></a></h2>










<div class="properties">


An integer representing how many frames have elapsed.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L156">
    two.js:156
  </a>

</div>




</div>



<div class="instance member ">

## timeDelta

<h2 class="longname" aria-hidden="true"><a href="#timeDelta"><span class="prefix">Two.</span><span class="shortname">timeDelta</span></a></h2>










<div class="properties">


A number representing how much time has elapsed since the last frame in milliseconds.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L162">
    two.js:162
  </a>

</div>




</div>



<div class="instance member ">

## playing

<h2 class="longname" aria-hidden="true"><a href="#playing"><span class="prefix">Two.</span><span class="shortname">playing</span></a></h2>










<div class="properties">


A boolean representing whether or not the instance is being updated through the automatic `requestAnimationFrame`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L168">
    two.js:168
  </a>

</div>




</div>



<div class="instance function ">

## fit

<h2 class="longname" aria-hidden="true"><a href="#fit"><span class="prefix">Two.</span><span class="shortname">fit</span></a></h2>















<div class="description">

If `options.fullscreen` or `options.fitted` in construction create this function. It sets the `width` and `height` of the instance to its respective parent `window` or `element` depending on the `options` passed.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L207">
    two.js:207
  </a>

</div>




</div>



<div class="instance function ">

## appendTo

<h2 class="longname" aria-hidden="true"><a href="#appendTo"><span class="prefix">Two.</span><span class="shortname">appendTo</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  elem  | The DOM element to append the Two.js stage to. |
</div>




<div class="description">

Shorthand method to append your instance of Two.js to the `document`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L361">
    two.js:361
  </a>

</div>




</div>



<div class="instance function ">

## play

<h2 class="longname" aria-hidden="true"><a href="#play"><span class="prefix">Two.</span><span class="shortname">play</span></a></h2>








<div class="fires">

__Triggers__:

+ `event:play`

</div>








<div class="description">

Call to start an internal animation loop.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L383">
    two.js:383
  </a>

</div>



<div class="tags">


::: tip nota-bene
This function initiates a `requestAnimationFrame` loop.
:::


</div>


</div>



<div class="instance function ">

## pause

<h2 class="longname" aria-hidden="true"><a href="#pause"><span class="prefix">Two.</span><span class="shortname">pause</span></a></h2>








<div class="fires">

__Triggers__:

+ `event:pause`

</div>








<div class="description">

Call to stop the internal animation loop for a specific instance of Two.js.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L398">
    two.js:398
  </a>

</div>




</div>



<div class="instance function ">

## release

<h2 class="longname" aria-hidden="true"><a href="#release"><span class="prefix">Two.</span><span class="shortname">release</span></a></h2>




<div class="returns">

__Returns__: Object


The object passed for event deallocation.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  |  |
</div>




<div class="description">

Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L415">
    two.js:415
  </a>

</div>




</div>



<div class="instance function ">

## update

<h2 class="longname" aria-hidden="true"><a href="#update"><span class="prefix">Two.</span><span class="shortname">update</span></a></h2>








<div class="fires">

__Triggers__:

+ `event:update`

</div>








<div class="description">

Update positions and calculations in one pass before rendering. Then render to the canvas.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L468">
    two.js:468
  </a>

</div>



<div class="tags">


::: tip nota-bene
This function is called automatically if using [Two.play]() or the `autostart` parameter in construction.
:::


</div>


</div>



<div class="instance function ">

## render

<h2 class="longname" aria-hidden="true"><a href="#render"><span class="prefix">Two.</span><span class="shortname">render</span></a></h2>








<div class="fires">

__Triggers__:

+ `event:render`

</div>








<div class="description">

Render all drawable and visible objects of the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L506">
    two.js:506
  </a>

</div>




</div>



<div class="instance function ">

## add

<h2 class="longname" aria-hidden="true"><a href="#add"><span class="prefix">Two.</span><span class="shortname">add</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  objects  | An array of Two.js objects. Alternatively can add objects as individual arguments. |
</div>




<div class="description">

A shorthand method to add specific Two.js objects to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L521">
    two.js:521
  </a>

</div>




</div>



<div class="instance function ">

## remove

<h2 class="longname" aria-hidden="true"><a href="#remove"><span class="prefix">Two.</span><span class="shortname">remove</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  objects  | An array of Two.js objects. |
</div>




<div class="description">

A shorthand method to remove specific Two.js objects from the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L538">
    two.js:538
  </a>

</div>




</div>



<div class="instance function ">

## clear

<h2 class="longname" aria-hidden="true"><a href="#clear"><span class="prefix">Two.</span><span class="shortname">clear</span></a></h2>















<div class="description">

Removes all objects from the instance's scene. If you intend to have the browser garbage collect this, don't forget to delete the references in your application as well.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L556">
    two.js:556
  </a>

</div>




</div>



<div class="instance function ">

## makeLine

<h2 class="longname" aria-hidden="true"><a href="#makeLine"><span class="prefix">Two.</span><span class="shortname">makeLine</span></a></h2>




<div class="returns">

__Returns__: Two.Line



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x1  |  |
|  y1  |  |
|  x2  |  |
|  y2  |  |
</div>




<div class="description">

Creates a Two.js line and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L568">
    two.js:568
  </a>

</div>




</div>



<div class="instance function ">

## makeArrow

<h2 class="longname" aria-hidden="true"><a href="#makeArrow"><span class="prefix">Two.</span><span class="shortname">makeArrow</span></a></h2>




<div class="returns">

__Returns__: Two.Path



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x1  |  |
|  y1  |  |
|  x2  |  |
|  y2  |  |
</div>




<div class="description">

Creates a Two.js arrow and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L587">
    two.js:587
  </a>

</div>




</div>



<div class="instance function ">

## makeRectangle

<h2 class="longname" aria-hidden="true"><a href="#makeRectangle"><span class="prefix">Two.</span><span class="shortname">makeRectangle</span></a></h2>




<div class="returns">

__Returns__: Two.Rectangle



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
|  width  |  |
|  height  |  |
</div>




<div class="description">

Creates a Two.js rectangle and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L632">
    two.js:632
  </a>

</div>




</div>



<div class="instance function ">

## makeRoundedRectangle

<h2 class="longname" aria-hidden="true"><a href="#makeRoundedRectangle"><span class="prefix">Two.</span><span class="shortname">makeRoundedRectangle</span></a></h2>




<div class="returns">

__Returns__: Two.Rectangle



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
|  width  |  |
|  height  |  |
|  sides  |  |
</div>




<div class="description">

Creates a Two.js rounded rectangle and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L651">
    two.js:651
  </a>

</div>




</div>



<div class="instance function ">

## makeCircle

<h2 class="longname" aria-hidden="true"><a href="#makeCircle"><span class="prefix">Two.</span><span class="shortname">makeCircle</span></a></h2>




<div class="returns">

__Returns__: Two.Circle



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
|  radius  |  |
|  resolution  |  |
</div>




<div class="description">

Creates a Two.js circle and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L671">
    two.js:671
  </a>

</div>




</div>



<div class="instance function ">

## makeEllipse

<h2 class="longname" aria-hidden="true"><a href="#makeEllipse"><span class="prefix">Two.</span><span class="shortname">makeEllipse</span></a></h2>




<div class="returns">

__Returns__: Two.Ellipse



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
|  rx  |  |
|  ry  |  |
|  resolution  |  |
</div>




<div class="description">

Creates a Two.js ellipse and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L690">
    two.js:690
  </a>

</div>




</div>



<div class="instance function ">

## makeStar

<h2 class="longname" aria-hidden="true"><a href="#makeStar"><span class="prefix">Two.</span><span class="shortname">makeStar</span></a></h2>




<div class="returns">

__Returns__: Two.Star



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
|  outerRadius  |  |
|  innerRadius  |  |
|  sides  |  |
</div>




<div class="description">

Creates a Two.js star and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L710">
    two.js:710
  </a>

</div>




</div>



<div class="instance function ">

## makeCurve

<h2 class="longname" aria-hidden="true"><a href="#makeCurve"><span class="prefix">Two.</span><span class="shortname">makeCurve</span></a></h2>




<div class="returns">

__Returns__: Two.Path


- Where `path.curved` is set to `true`.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  points  | An array of [Two.Anchor](/docs/anchor/) points. |
|  | Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into [Two.Anchor](/docs/anchor/)s for use in the path. |
</div>




<div class="description">

Creates a Two.js path that is curved and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L730">
    two.js:730
  </a>

</div>



<div class="tags">


::: tip nota-bene
In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
:::


</div>


</div>



<div class="instance function ">

## makePolygon

<h2 class="longname" aria-hidden="true"><a href="#makePolygon"><span class="prefix">Two.</span><span class="shortname">makePolygon</span></a></h2>




<div class="returns">

__Returns__: Two.Polygon



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
|  radius  |  |
|  sides  |  |
</div>




<div class="description">

Creates a Two.js polygon and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L767">
    two.js:767
  </a>

</div>




</div>



<div class="instance function ">

## makeArcSegment

<h2 class="longname" aria-hidden="true"><a href="#makeArcSegment"><span class="prefix">Two.</span><span class="shortname">makeArcSegment</span></a></h2>




<div class="returns">

__Returns__: Two.ArcSegment



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
|  innerRadius  |  |
|  outerRadius  |  |
|  startAngle  |  |
|  endAngle  |  |
|  resolution  | The number of vertices that should comprise the arc segment. |
</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L786">
    two.js:786
  </a>

</div>




</div>



<div class="instance function ">

## makePoints

<h2 class="longname" aria-hidden="true"><a href="#makePoints"><span class="prefix">Two.</span><span class="shortname">makePoints</span></a></h2>




<div class="returns">

__Returns__: Two.Points



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  points  | An array of [Two.Vector](/docs/vector/) points |
|  | Alternatively you can pass alternating `x` / `y` coordinate values as individual agrguments. These will be combined into [Two.Vector](/docs/vector/)s for use in the points object. |
</div>




<div class="description">

Creates a Two.js points object and adds it to the current scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L805">
    two.js:805
  </a>

</div>




</div>



<div class="instance function ">

## makePath

<h2 class="longname" aria-hidden="true"><a href="#makePath"><span class="prefix">Two.</span><span class="shortname">makePath</span></a></h2>




<div class="returns">

__Returns__: Two.Path



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  points  | An array of [Two.Anchor](/docs/anchor/) points |
|  | Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into [Two.Anchor](/docs/anchor/)s for use in the path. |
</div>




<div class="description">

Creates a Two.js path and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L838">
    two.js:838
  </a>

</div>



<div class="tags">


::: tip nota-bene
In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
:::


</div>


</div>



<div class="instance function ">

## makeText

<h2 class="longname" aria-hidden="true"><a href="#makeText"><span class="prefix">Two.</span><span class="shortname">makeText</span></a></h2>




<div class="returns">

__Returns__: Two.Text



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  message  |  |
|  x  |  |
|  y  |  |
|  styles  | An object to describe any of the [Two.Text.Properties](/docs/text/#properties) including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc.. |
</div>




<div class="description">

Creates a Two.js text object and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L879">
    two.js:879
  </a>

</div>




</div>



<div class="instance function ">

## makeLinearGradient

<h2 class="longname" aria-hidden="true"><a href="#makeLinearGradient"><span class="prefix">Two.</span><span class="shortname">makeLinearGradient</span></a></h2>




<div class="returns">

__Returns__: Two.LinearGradient



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x1  |  |
|  y1  |  |
|  x2  |  |
|  y2  |  |
|  args  | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |
</div>




<div class="description">

Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L895">
    two.js:895
  </a>

</div>




</div>



<div class="instance function ">

## makeRadialGradient

<h2 class="longname" aria-hidden="true"><a href="#makeRadialGradient"><span class="prefix">Two.</span><span class="shortname">makeRadialGradient</span></a></h2>




<div class="returns">

__Returns__: Two.RadialGradient



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x1  |  |
|  y1  |  |
|  radius  |  |
|  args  | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |
</div>




<div class="description">

Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L917">
    two.js:917
  </a>

</div>




</div>



<div class="instance function ">

## makeSprite

<h2 class="longname" aria-hidden="true"><a href="#makeSprite"><span class="prefix">Two.</span><span class="shortname">makeSprite</span></a></h2>




<div class="returns">

__Returns__: Two.Sprite



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  pathOrTexture  | The URL path to an image or an already created [Two.Texture](/docs/effects/texture/). |
|  x  |  |
|  y  |  |
|  columns  |  |
|  rows  |  |
|  frameRate  |  |
|  autostart  |  |
</div>




<div class="description">

Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L938">
    two.js:938
  </a>

</div>




</div>



<div class="instance function ">

## makeImageSequence

<h2 class="longname" aria-hidden="true"><a href="#makeImageSequence"><span class="prefix">Two.</span><span class="shortname">makeImageSequence</span></a></h2>




<div class="returns">

__Returns__: Two.ImageSequence



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  pathsOrTextures  | An array of paths or of [Two.Textures](/docs/effects/texture/). |
|  x  |  |
|  y  |  |
|  frameRate  |  |
|  autostart  |  |
</div>




<div class="description">

Creates a Two.js image sequence object and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L963">
    two.js:963
  </a>

</div>




</div>



<div class="instance function ">

## makeTexture

<h2 class="longname" aria-hidden="true"><a href="#makeTexture"><span class="prefix">Two.</span><span class="shortname">makeTexture</span></a></h2>




<div class="returns">

__Returns__: Two.Texture



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  pathOrSource  | The URL path to an image or a DOM image-like element. |
|  callback  | Function to be invoked when the image is loaded. |
</div>




<div class="description">

Creates a Two.js texture object.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L986">
    two.js:986
  </a>

</div>




</div>



<div class="instance function ">

## makeGroup

<h2 class="longname" aria-hidden="true"><a href="#makeGroup"><span class="prefix">Two.</span><span class="shortname">makeGroup</span></a></h2>




<div class="returns">

__Returns__: Two.Group



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  objects  | Two.js objects to be added to the group in the form of an array or as individual arguments. |
</div>




<div class="description">

Creates a Two.js group object and adds it to the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L1001">
    two.js:1001
  </a>

</div>




</div>



<div class="instance function ">

## interpret

<h2 class="longname" aria-hidden="true"><a href="#interpret"><span class="prefix">Two.</span><span class="shortname">interpret</span></a></h2>




<div class="returns">

__Returns__: Two.Group



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  svg  | The SVG node to be parsed. |
|  shallow  | Don't create a top-most group but append all content directly. |
|  add  | – Automatically add the reconstructed SVG node to scene. |
</div>




<div class="description">

Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L1022">
    two.js:1022
  </a>

</div>




</div>



<div class="instance function ">

## load

<h2 class="longname" aria-hidden="true"><a href="#load"><span class="prefix">Two.</span><span class="shortname">load</span></a></h2>




<div class="returns">

__Returns__: Two.Group



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  pathOrSVGContent  | The URL path of an SVG file or an SVG document as text. |
|  callback  | Function to call once loading has completed. |
</div>




<div class="description">

Load an SVG file or SVG text and interpret it into Two.js legible objects.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L1055">
    two.js:1055
  </a>

</div>




</div>


