---
pageClass: documentation-class
---

# Two.CanvasRenderer


<div class="extends">

__Extends__: [Two.Events](/documentation/events/)

</div>


This class is used by [Two](/documentation/) when constructing with `type` of `Two.Types.canvas`. It takes Two.js' scenegraph and renders it to a `<canvas />`.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/renderers/canvas.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `parameters`  | This object is inherited when constructing a new instance of [Two](/documentation/). |
|  `parameters.domElement`  | The `<canvas />` to draw to. If none given a new one will be constructed. |
|  `parameters.overdraw`  | Determines whether the canvas should clear the background or not. Defaults to `true`. |
|  `parameters.smoothing`  | Determines whether the canvas should antialias drawing. Set it to `false` when working with pixel art. `false` can lead to better performance, since it would use a cheaper interpolation algorithm. |



---

<div class="static member ">

## Utils
<span class="longname">Two.CanvasRenderer.Utils</span>








<div class="properties">

A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />`.

</div>








<div class="meta">

  [canvas.js:937](https://github.com/jonobr1/two.js/blob/dev/src/renderers/canvas.js#L937)

</div>






</div>



---

<div class="instance member ">

## domElement
<span class="longname">Two.CanvasRenderer.domElement</span>








<div class="properties">

The `<canvas />` associated with the Two.js scene.

</div>








<div class="meta">

  [canvas.js:903](https://github.com/jonobr1/two.js/blob/dev/src/renderers/canvas.js#L903)

</div>






</div>



---

<div class="instance member ">

## ctx
<span class="longname">Two.CanvasRenderer.ctx</span>








<div class="properties">

Associated two dimensional context to render on the `<canvas />`.

</div>








<div class="meta">

  [canvas.js:909](https://github.com/jonobr1/two.js/blob/dev/src/renderers/canvas.js#L909)

</div>






</div>



---

<div class="instance member ">

## overdraw
<span class="longname">Two.CanvasRenderer.overdraw</span>








<div class="properties">

Determines whether the canvas clears the background each draw call.

</div>








<div class="meta">

  [canvas.js:915](https://github.com/jonobr1/two.js/blob/dev/src/renderers/canvas.js#L915)

</div>






</div>



---

<div class="instance member ">

## scene
<span class="longname">Two.CanvasRenderer.scene</span>








<div class="properties">

The root group of the scenegraph.

</div>








<div class="meta">

  [canvas.js:926](https://github.com/jonobr1/two.js/blob/dev/src/renderers/canvas.js#L926)

</div>






</div>



---

<div class="instance function ">

## setSize
<span class="longname">Two.CanvasRenderer.setSize</span>






<div class="fires">

__Triggers__:

+ `event:resize`

</div>





<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `width`  | The new width of the renderer. |
|  `height`  | The new height of the renderer. |
|  `ratio`  | The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen. |
</div>




<div class="description">

Change the size of the renderer.

</div>



<div class="meta">

  [canvas.js:949](https://github.com/jonobr1/two.js/blob/dev/src/renderers/canvas.js#L949)

</div>






</div>



---

<div class="instance function ">

## render
<span class="longname">Two.CanvasRenderer.render</span>













<div class="description">

Render the current scene to the `<canvas />`.

</div>



<div class="meta">

  [canvas.js:979](https://github.com/jonobr1/two.js/blob/dev/src/renderers/canvas.js#L979)

</div>






</div>


