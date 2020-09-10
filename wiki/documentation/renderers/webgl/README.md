# Two.WebGLRenderer


<div class="extends">

__Extends__: `Two.Events`

</div>


This class is used by [Two](/documentation/) when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1109)

</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
| `parameters` | This object is inherited when constructing a new instance of [Two](/documentation/). |
| `parameters.domElement` | The `<canvas />` to draw to. If none given a new one will be constructed. |
| `parameters.offscreenElement` | The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates. |
| `parameters.antialias` | Determines whether the canvas should clear render with antialias on. |



---

<div class="static member ">

## Two.WebGLRenderer.Utils








<div class="properties">

A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1228)

</div>






</div>



---

<div class="instance member ">

## Two.WebGLRenderer.domElement








<div class="properties">

The `<canvas />` associated with the Two.js scene.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1124)

</div>






</div>



---

<div class="instance member ">

## Two.WebGLRenderer.scene








<div class="properties">

The root group of the scenegraph.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1135)

</div>






</div>



---

<div class="instance member ">

## Two.WebGLRenderer.overdraw








<div class="properties">

Determines whether the canvas clears the background each draw call.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1161)

</div>






</div>



---

<div class="instance member ">

## Two.WebGLRenderer.ctx








<div class="properties">

Associated two dimensional context to render on the `<canvas />`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1168)

</div>






</div>



---

<div class="instance member ">

## Two.WebGLRenderer.program








<div class="properties">

Associated WebGL program to render all elements from the scenegraph.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1186)

</div>






</div>



---

<div class="instance function ">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1240)

</div>






</div>



---

<div class="instance function ">

## Two.WebGLRenderer.render













<div class="description">

Render the current scene to the `<canvas />`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1281)

</div>






</div>


