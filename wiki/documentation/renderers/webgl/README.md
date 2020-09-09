# Two.WebGLRenderer


<div class="extends">

__Extends__: `Two.Events`

</div>


This class is used by [Two](/documentation/) when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `parameters` | This object is inherited when constructing a new instance of [Two](/documentation/). |
| `parameters.domElement` | The `<canvas />` to draw to. If none given a new one will be constructed. |
| `parameters.offscreenElement` | The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates. |
| `parameters.antialias` | Determines whether the canvas should clear render with antialias on. |



---

<div class="static ">

## Two.WebGLRenderer.Utils








<div class="properties">

A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.

</div>











</div>



---

<div class="instance ">

## Two.WebGLRenderer.domElement








<div class="properties">

The `<canvas />` associated with the Two.js scene.

</div>











</div>



---

<div class="instance ">

## Two.WebGLRenderer.scene








<div class="properties">

The root group of the scenegraph.

</div>











</div>



---

<div class="instance ">

## Two.WebGLRenderer.overdraw








<div class="properties">

Determines whether the canvas clears the background each draw call.

</div>











</div>



---

<div class="instance ">

## Two.WebGLRenderer.ctx








<div class="properties">

Associated two dimensional context to render on the `<canvas />`.

</div>











</div>



---

<div class="instance ">

## Two.WebGLRenderer.program








<div class="properties">

Associated WebGL program to render all elements from the scenegraph.

</div>











</div>



---

<div class="instance ">

## Two.WebGLRenderer.setSize






<div class="fires">

__Triggers__:

+ `event:resize`

</div>





<div class="params">

| Argument | Description |
| ---- | ----------- |
| `width` | The new width of the renderer. |
| `height` | The new height of the renderer. |
| `ratio` | The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen. |
</div>




<div class="description">

Change the size of the renderer.

</div>






</div>



---

<div class="instance ">

## Two.WebGLRenderer.render













<div class="description">

Render the current scene to the `<canvas />`.

</div>






</div>


