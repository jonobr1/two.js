---
pageClass: documentation-class
---

# Two.SVGRenderer


<div class="extends">

__Extends__: [Two.Events](/documentation/events/)

</div>


This class is used by [Two](/documentation/) when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `parameters`  | This object is inherited when constructing a new instance of [Two](/documentation/). |
|  `parameters.domElement`  | The `<svg />` to draw to. If none given a new one will be constructed. |



---

<div class="static member ">

## Utils
<span class="longname">Two.SVGRenderer.Utils</span>








<div class="properties">

A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.

</div>








<div class="meta">

  [svg.js:1083](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L1083)

</div>






</div>



---

<div class="instance member ">

## domElement
<span class="longname">Two.SVGRenderer.domElement</span>








<div class="properties">

The `<svg />` associated with the Two.js scene.

</div>








<div class="meta">

  [svg.js:1057](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L1057)

</div>






</div>



---

<div class="instance member ">

## scene
<span class="longname">Two.SVGRenderer.scene</span>








<div class="properties">

The root group of the scenegraph.

</div>








<div class="meta">

  [svg.js:1063](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L1063)

</div>






</div>



---

<div class="instance member ">

## defs
<span class="longname">Two.SVGRenderer.defs</span>








<div class="properties">

The `<defs />` to apply gradients, patterns, and bitmap imagery.

</div>








<div class="meta">

  [svg.js:1070](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L1070)

</div>






</div>



---

<div class="instance function ">

## setSize
<span class="longname">Two.SVGRenderer.setSize</span>










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

  [svg.js:1095](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L1095)

</div>



<div class="tags">


::: tip nota-bene
Triggers a `Two.Events.resize`.
:::


</div>




</div>



---

<div class="instance function ">

## render
<span class="longname">Two.SVGRenderer.render</span>













<div class="description">

Render the current scene to the `<svg />`.

</div>



<div class="meta">

  [svg.js:1117](https://github.com/jonobr1/two.js/blob/dev/src/renderers/svg.js#L1117)

</div>






</div>


