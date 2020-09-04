# Two.WebGLRenderer


__Extends__: `Two.Events`


This class is used by [Two](/documentation/) when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `parameters` | This object is inherited when constructing a new instance of [Two](/documentation/). |
| `parameters.domElement` | The `<canvas />` to draw to. If none given a new one will be constructed. |
| `parameters.offscreenElement` | The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates. |
| `parameters.antialias` | Determines whether the canvas should clear render with antialias on. |



---

<div class="instance">

## Two.WebGLRenderer.domElement






The `<canvas />` associated with the Two.js scene.









</div>



---

<div class="instance">

## Two.WebGLRenderer.scene






The root group of the scenegraph.









</div>



---

<div class="instance">

## Two.WebGLRenderer.overdraw






Determines whether the canvas clears the background each draw call.









</div>



---

<div class="instance">

## Two.WebGLRenderer.ctx






Associated two dimensional context to render on the `<canvas />`.









</div>



---

<div class="instance">

## Two.WebGLRenderer.program






Associated WebGL program to render all elements from the scenegraph.









</div>



---

<div class="static">

## Two.WebGLRenderer.Utils






A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.









</div>



---

<div class="instance">

## Two.WebGLRenderer.setSize




__Triggers__:

+ `event:resize`






| Argument | Description |
| ---- | ----------- |
| `width` | The new width of the renderer. |
| `height` | The new height of the renderer. |
| `ratio` | The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen. |


Change the size of the renderer.



</div>



---

<div class="instance">

## Two.WebGLRenderer.render










Render the current scene to the `<canvas />`.



</div>


