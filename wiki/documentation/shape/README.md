# Two.Shape


__Extends__: `Events`


The foundational transformation object for the Two.js scenegraph.






---

<div class="static">

## Two.Shape.FlagMatrix










Utility function used in conjunction with event handlers to update the flagMatrix of a shape.



</div>



---

<div class="static">

## Two.Shape.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.Shape](/documentation/shape) to any object. Handy if you'd like to extend the [Two.Shape](/documentation/shape) class on a custom class.



</div>



---

<div class="instance">

## Two.Shape.id






Session specific unique identifier.








::: tip nota-bene
In the [Two.SvgRenderer](/documentation/svgrenderer) change this to change the underlying SVG element's id too.
:::


</div>



---

<div class="instance">

## Two.Shape.classList












A list of class strings stored if imported / interpreted  from an SVG element.



</div>



---

<div class="instance">

## Two.Shape.matrix












The transformation matrix of the shape.


::: tip nota-bene
[Two.Shape.translation](/documentation/shape#two-shape-translation), [Two.Shape.rotation](/documentation/shape#two-shape-rotation), and [Two.Shape.scale](/documentation/shape#two-shape-scale) apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
:::


</div>



---

<div class="instance">

## Two.Shape.translation






The x and y value for where the shape is placed relative to its parent.









</div>



---

<div class="instance">

## Two.Shape.rotation






The value in radians for how much the shape is rotated relative to its parent.









</div>



---

<div class="instance">

## Two.Shape.scale






The value for how much the shape is scaled relative to its parent.








::: tip nota-bene
This value can be replaced with a [Two.Vector](/documentation/vector) to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
:::


</div>



---

<div class="instance">

## Two.Group.className






A class to be applied to the element to be compatible with CSS styling.








::: tip nota-bene
Only available for the SVG renderer.
:::


</div>



---

<div class="instance">

## Two.Shape.addTo








| Argument | Description |
| ---- | ----------- |
| `group` | The parent the shape adds itself to. |


Convenience method to add itself to the scenegraph.



</div>



---

<div class="instance">

## Two.Shape.clone


__Returns__:



+ `Two.Shape`











| Argument | Description |
| ---- | ----------- |
| `parent` | Optional argument to automatically add the shape to a scenegraph. |


Create a new [Two.Shape](/documentation/shape) with the same values as the current shape.



</div>


