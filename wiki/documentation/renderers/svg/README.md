---
pageClass: documentation-class
---

# Two.SVGRenderer


<div class="extends">

__Extends__: `Two.Events`

</div>


This class is used by [Two](/documentation/) when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L886)

</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `parameters`  | This object is inherited when constructing a new instance of [Two](/documentation/). |
|  `parameters.domElement`  | The `<svg />` to draw to. If none given a new one will be constructed. |



---

<div class="static member ">

## Two.SVGRenderer.Utils








<div class="properties">

A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L922)

</div>






</div>



---

<div class="instance member ">

## Two.SVGRenderer.domElement








<div class="properties">

The `<svg />` associated with the Two.js scene.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L896)

</div>






</div>



---

<div class="instance member ">

## Two.SVGRenderer.scene








<div class="properties">

The root group of the scenegraph.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L902)

</div>






</div>



---

<div class="instance member ">

## Two.SVGRenderer.defs








<div class="properties">

The `<defs />` to apply gradients, patterns, and bitmap imagery.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L909)

</div>






</div>



---

<div class="instance function ">

## Two.SVGRenderer.setSize










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `width`  | The new width of the renderer. |
|  `height`  | The new height of the renderer. |
</div>




<div class="description">

Change the size of the renderer.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L934)

</div>



<div class="tags">


::: tip nota-bene
Triggers a `Two.Events.resize`.
:::


</div>




</div>



---

<div class="instance function ">

## Two.SVGRenderer.render













<div class="description">

Render the current scene to the `<svg />`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L956)

</div>






</div>


