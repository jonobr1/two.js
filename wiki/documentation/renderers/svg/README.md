# Two.SVGRenderer


__Extends__: `Two.Utils.Events`


This class is used by {@link Two} when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `parameters` | This object is inherited when constructing a new instance of {@link Two}. |
| `parameters.domElement` | The `<svg />` to draw to. If none given a new one will be constructed. |



---

## Two.SVGRenderer#domElement






The `<svg />` associated with the Two.js scene.











---

## Two.SVGRenderer#scene






The root group of the scenegraph.











---

## Two.SVGRenderer#defs






The `<defs />` to apply gradients, patterns, and bitmap imagery.











---

## Two.SVGRenderer.Utils






A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.











---

## Two.SVGRenderer#setSize




__Triggers__:

+ `event:resize`






| Argument | Description |
| ---- | ----------- |
| `width` | The new width of the renderer. |
| `height` | The new height of the renderer. |


Change the size of the renderer.





---

## Two.SVGRenderer#render










Render the current scene to the `<svg />`.




