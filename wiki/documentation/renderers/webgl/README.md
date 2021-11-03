---
pageClass: documentation-class
---

# Two.WebGLRenderer


<div class="extends">

__Extends__: [Two.Events](/documentation/events/)

</div>


This class is used by [Two](/documentation/) when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `parameters`  | This object is inherited when constructing a new instance of [Two](/documentation/). |
|  `parameters.domElement`  | The `<canvas />` to draw to. If none given a new one will be constructed. |
|  `parameters.offscreenElement`  | The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates. |
|  `parameters.antialias`  | Determines whether the canvas should clear render with antialias on. |



---

<div class="static member ">

## Utils
<span class="longname">Two.WebGLRenderer.Utils</span>








<div class="properties">

A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.

</div>








<div class="meta">

  [webgl.js:1559](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1559)

</div>






</div>



---

<div class="instance member ">

## domElement
<span class="longname">Two.WebGLRenderer.domElement</span>








<div class="properties">

The `<canvas />` associated with the Two.js scene.

</div>








<div class="meta">

  [webgl.js:1441](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1441)

</div>






</div>



---

<div class="instance member ">

## scene
<span class="longname">Two.WebGLRenderer.scene</span>








<div class="properties">

The root group of the scenegraph.

</div>








<div class="meta">

  [webgl.js:1452](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1452)

</div>






</div>



---

<div class="instance member ">

## overdraw
<span class="longname">Two.WebGLRenderer.overdraw</span>








<div class="properties">

Determines whether the canvas clears the background each draw call.

</div>








<div class="meta">

  [webgl.js:1478](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1478)

</div>






</div>



---

<div class="instance member ">

## ctx
<span class="longname">Two.WebGLRenderer.ctx</span>








<div class="properties">

Associated two dimensional context to render on the `<canvas />`.

</div>








<div class="meta">

  [webgl.js:1485](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1485)

</div>






</div>



---

<div class="instance member ">

## programs
<span class="longname">Two.WebGLRenderer.programs</span>








<div class="properties">

Associated WebGL programs to render all elements from the scenegraph.

</div>








<div class="meta">

  [webgl.js:1501](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1501)

</div>






</div>



---

<div class="instance function ">

## setSize
<span class="longname">Two.WebGLRenderer.setSize</span>






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

  [webgl.js:1571](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1571)

</div>






</div>



---

<div class="instance function ">

## render
<span class="longname">Two.WebGLRenderer.render</span>













<div class="description">

Render the current scene to the `<canvas />`.

</div>



<div class="meta">

  [webgl.js:1619](https://github.com/jonobr1/two.js/blob/dev/src/renderers/webgl.js#L1619)

</div>






</div>


