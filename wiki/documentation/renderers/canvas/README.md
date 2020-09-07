# Two.CanvasRenderer


__Extends__: `Two.Events`


This class is used by [Two](/documentation/) when constructing with `type` of `Two.Types.canvas`. It takes Two.js' scenegraph and renders it to a `<canvas />`.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `parameters` | This object is inherited when constructing a new instance of [Two](/documentation/). |
| `parameters.domElement` | The `<canvas />` to draw to. If none given a new one will be constructed. |
| `parameters.overdraw` | Determines whether the canvas should clear the background or not. Defaults to `true`. |
| `parameters.smoothing` | Determines whether the canvas should antialias drawing. Set it to `false` when working with pixel art. `false` can lead to better performance, since it would use a cheaper interpolation algorithm. |



---

<div class="static">

## Two.CanvasRenderer.Utils






A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />`.









</div>



---

<div class="instance">

## Two.CanvasRenderer.domElement






The `<canvas />` associated with the Two.js scene.









</div>



---

<div class="instance">

## Two.CanvasRenderer.ctx






Associated two dimensional context to render on the `<canvas />`.









</div>



---

<div class="instance">

## Two.CanvasRenderer.overdraw






Determines whether the canvas clears the background each draw call.









</div>



---

<div class="instance">

## Two.CanvasRenderer.scene






The root group of the scenegraph.









</div>



---

<div class="instance">

## Two.CanvasRenderer.setSize




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

## Two.CanvasRenderer.render










Render the current scene to the `<canvas />`.



</div>


