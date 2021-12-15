---
title: Two
pageClass: docs
lang: en-US
---

# Two



The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/two.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  options  |  |
|  options.fullscreen  | Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. This overrides `options.fitted` as well. |
|  options.fitted  | = Set to `true` to automatically make the stage adapt to the width and height of the parent element. This parameter overrides `width` and `height` parameters if set to `true`. |
|  options.width  | The width of the stage on construction. This can be set at a later time. |
|  options.height  | The height of the stage on construction. This can be set at a later time. |
|  options.type  | The type of renderer to setup drawing with. See [Two.Types](/docs/two/) for available options. |
|  options.autostart  | Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for [Two.play](/docs/two/). |
|  options.domElement  | The canvas or SVG element to draw into. This overrides the `options.type` argument. |



<div class="static member ">

## Utils

<h2 class="longname" aria-hidden="true"><a href="#Utils"><span class="prefix">Two.</span><span class="shortname">Utils</span></a></h2>










<div class="properties">

A massive object filled with utility functions and properties.

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L1046">
    two.js:1046
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L105">
    two.js:105
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L167">
    two.js:167
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L173">
    two.js:173
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L179">
    two.js:179
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L185">
    two.js:185
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L191">
    two.js:191
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L197">
    two.js:197
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L203">
    two.js:203
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L209">
    two.js:209
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L215">
    two.js:215
  </a>

</div>




</div>



<div class="instance function ">

## play

<h2 class="longname" aria-hidden="true"><a href="#play"><span class="prefix">Two.</span><span class="shortname">play</span></a></h2>








<div class="fires">

__Triggers__:

+ `Two.Events.Types.event:play event`

</div>








<div class="description">

Call to start an internal animation loop.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L237">
    two.js:237
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

+ `Two.Events.Types.event:pause event`

</div>








<div class="description">

Call to stop the internal animation loop for a specific instance of Two.js.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L252">
    two.js:252
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L269">
    two.js:269
  </a>

</div>




</div>



<div class="instance function ">

## update

<h2 class="longname" aria-hidden="true"><a href="#update"><span class="prefix">Two.</span><span class="shortname">update</span></a></h2>








<div class="fires">

__Triggers__:

+ `Two.Events.Types.event:update event`

</div>








<div class="description">

Update positions and calculations in one pass before rendering. Then render to the canvas.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L322">
    two.js:322
  </a>

</div>



<div class="tags">


::: tip nota-bene
This function is called automatically if using [Two.play](/docs/two/) or the `autostart` parameter in construction.
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L360">
    two.js:360
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L375">
    two.js:375
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L393">
    two.js:393
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L412">
    two.js:412
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L424">
    two.js:424
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L443">
    two.js:443
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L488">
    two.js:488
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L507">
    two.js:507
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L527">
    two.js:527
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L546">
    two.js:546
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L566">
    two.js:566
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L586">
    two.js:586
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L622">
    two.js:622
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L641">
    two.js:641
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L659">
    two.js:659
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L690">
    two.js:690
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L729">
    two.js:729
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
|  stops  | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |
</div>




<div class="description">

Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L745">
    two.js:745
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
|  stops  | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |
</div>




<div class="description">

Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L767">
    two.js:767
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L788">
    two.js:788
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L813">
    two.js:813
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L836">
    two.js:836
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L851">
    two.js:851
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
|  SVGElement  | The SVG node to be parsed. |
|  shallow  | Don't create a top-most group but append all content directly. |
|  add  | – Automatically add the reconstructed SVG node to scene. |
</div>




<div class="description">

Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L873">
    two.js:873
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/two.js#L906">
    two.js:906
  </a>

</div>




</div>


