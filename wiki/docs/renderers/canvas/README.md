---
title: Two.CanvasRenderer
pageClass: docs
lang: en-US
---

# Two.CanvasRenderer


<div class="extends">

Extends: [Two.Events](/docs/events/)

</div>


This class is used by [Two]() when constructing with `type` of `Two.Types.canvas`. It takes Two.js' scenegraph and renders it to a `<canvas />`.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/canvas.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  parameters  | This object is inherited when constructing a new instance of [Two](). |
|  parameters.domElement  | The `<canvas />` to draw to. If none given a new one will be constructed. |
|  parameters.overdraw  | Determines whether the canvas should clear the background or not. Defaults to `true`. |
|  parameters.smoothing  | Determines whether the canvas should antialias drawing. Set it to `false` when working with pixel art. `false` can lead to better performance, since it would use a cheaper interpolation algorithm. |



<div class="static member ">

## Utils

<h2 class="longname" aria-hidden="true"><a href="#Utils"><span class="prefix">Two.CanvasRenderer.</span><span class="shortname">Utils</span></a></h2>










<div class="properties">


A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/canvas.js#L1128">
    canvas.js:1128
  </a>

</div>




</div>



<div class="instance member ">

## domElement

<h2 class="longname" aria-hidden="true"><a href="#domElement"><span class="prefix">Two.CanvasRenderer.</span><span class="shortname">domElement</span></a></h2>










<div class="properties">


The `<canvas />` associated with the Two.js scene.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/canvas.js#L1097">
    canvas.js:1097
  </a>

</div>




</div>



<div class="instance member ">

## ctx

<h2 class="longname" aria-hidden="true"><a href="#ctx"><span class="prefix">Two.CanvasRenderer.</span><span class="shortname">ctx</span></a></h2>










<div class="properties">


Associated two dimensional context to render on the `<canvas />`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/canvas.js#L1103">
    canvas.js:1103
  </a>

</div>




</div>



<div class="instance member ">

## overdraw

<h2 class="longname" aria-hidden="true"><a href="#overdraw"><span class="prefix">Two.CanvasRenderer.</span><span class="shortname">overdraw</span></a></h2>










<div class="properties">


Determines whether the canvas clears the background each draw call.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/canvas.js#L1109">
    canvas.js:1109
  </a>

</div>




</div>



<div class="instance member ">

## scene

<h2 class="longname" aria-hidden="true"><a href="#scene"><span class="prefix">Two.CanvasRenderer.</span><span class="shortname">scene</span></a></h2>










<div class="properties">


The root group of the scenegraph.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/canvas.js#L1120">
    canvas.js:1120
  </a>

</div>




</div>



<div class="instance function ">

## setSize

<h2 class="longname" aria-hidden="true"><a href="#setSize"><span class="prefix">Two.CanvasRenderer.</span><span class="shortname">setSize</span></a></h2>








<div class="fires">

__Triggers__:

+ `event:resize`

</div>





<div class="params">

| Argument | Description |
| ---- | ----------- |
|  width  | The new width of the renderer. |
|  height  | The new height of the renderer. |
|  ratio  | The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen. |
</div>




<div class="description">

Change the size of the renderer.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/canvas.js#L1134">
    canvas.js:1134
  </a>

</div>




</div>



<div class="instance function ">

## render

<h2 class="longname" aria-hidden="true"><a href="#render"><span class="prefix">Two.CanvasRenderer.</span><span class="shortname">render</span></a></h2>















<div class="description">

Render the current scene to the `<canvas />`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/canvas.js#L1162">
    canvas.js:1162
  </a>

</div>




</div>


