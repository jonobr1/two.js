# Two.SVGRenderer


__Extends__: `Two.Events`


This class is used by [Two](/documentation/) when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `parameters` | This object is inherited when constructing a new instance of [Two](/documentation/). |
| `parameters.domElement` | The `<svg />` to draw to. If none given a new one will be constructed. |



---

<div class="static">

## Two.SVGRenderer.Utils






A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.









</div>



---

<div class="instance">

## Two.SVGRenderer.domElement






The `<svg />` associated with the Two.js scene.









</div>



---

<div class="instance">

## Two.SVGRenderer.scene






The root group of the scenegraph.









</div>



---

<div class="instance">

## Two.SVGRenderer.defs






The `<defs />` to apply gradients, patterns, and bitmap imagery.









</div>



---

<div class="instance">

## Two.SVGRenderer.setSize








| Argument | Description |
| ---- | ----------- |
| `width` | The new width of the renderer. |
| `height` | The new height of the renderer. |


Change the size of the renderer.


::: tip nota-bene
Triggers a `Two.Events.resize`.
:::


</div>



---

<div class="instance">

## Two.SVGRenderer.render










Render the current scene to the `<svg />`.



</div>


