---
pageClass: docs
---

# Two.WebGLRenderer


<div class="extends">

__Extends__: [Two.Events](/docs/events/)

</div>


This class is used by [Two](/docs/) when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  parameters  | This object is inherited when constructing a new instance of [Two](/docs/). |
|  parameters.domElement  | The `<canvas />` to draw to. If none given a new one will be constructed. |
|  parameters.offscreenElement  | The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates. |
|  parameters.antialias  | Determines whether the canvas should clear render with antialias on. |



<div class="static member ">

## Utils

<h2 class="longname" aria-hidden="true"><a href="#Utils"><span class="prefix">Two.WebGLRenderer.</span><span class="shortname">Utils</span></a></h2>










<div class="properties">

A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.

</div>








<div class="meta">

  [`webgl.js:1559`](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1559)

</div>






</div>



<div class="instance member ">

## domElement

<h2 class="longname" aria-hidden="true"><a href="#domElement"><span class="prefix">Two.WebGLRenderer.</span><span class="shortname">domElement</span></a></h2>










<div class="properties">

The `<canvas />` associated with the Two.js scene.

</div>








<div class="meta">

  [`webgl.js:1441`](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1441)

</div>






</div>



<div class="instance member ">

## scene

<h2 class="longname" aria-hidden="true"><a href="#scene"><span class="prefix">Two.WebGLRenderer.</span><span class="shortname">scene</span></a></h2>










<div class="properties">

The root group of the scenegraph.

</div>








<div class="meta">

  [`webgl.js:1452`](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1452)

</div>






</div>



<div class="instance member ">

## overdraw

<h2 class="longname" aria-hidden="true"><a href="#overdraw"><span class="prefix">Two.WebGLRenderer.</span><span class="shortname">overdraw</span></a></h2>










<div class="properties">

Determines whether the canvas clears the background each draw call.

</div>








<div class="meta">

  [`webgl.js:1478`](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1478)

</div>






</div>



<div class="instance member ">

## ctx

<h2 class="longname" aria-hidden="true"><a href="#ctx"><span class="prefix">Two.WebGLRenderer.</span><span class="shortname">ctx</span></a></h2>










<div class="properties">

Associated two dimensional context to render on the `<canvas />`.

</div>








<div class="meta">

  [`webgl.js:1485`](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1485)

</div>






</div>



<div class="instance member ">

## programs

<h2 class="longname" aria-hidden="true"><a href="#programs"><span class="prefix">Two.WebGLRenderer.</span><span class="shortname">programs</span></a></h2>










<div class="properties">

Associated WebGL programs to render all elements from the scenegraph.

</div>








<div class="meta">

  [`webgl.js:1501`](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1501)

</div>






</div>



<div class="instance function ">

## setSize

<h2 class="longname" aria-hidden="true"><a href="#setSize"><span class="prefix">Two.WebGLRenderer.</span><span class="shortname">setSize</span></a></h2>








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

  [`webgl.js:1571`](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1571)

</div>






</div>



<div class="instance function ">

## render

<h2 class="longname" aria-hidden="true"><a href="#render"><span class="prefix">Two.WebGLRenderer.</span><span class="shortname">render</span></a></h2>















<div class="description">

Render the current scene to the `<canvas />`.

</div>



<div class="meta">

  [`webgl.js:1619`](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1619)

</div>






</div>


