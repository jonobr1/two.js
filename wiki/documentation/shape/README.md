# Two.Shape


__Extends__: `Two.Utils.Events`


The foundational transformation object for the Two.js scenegraph.






---

## Two.Shape#id






Session specific unique identifier.








::: tip nota-bene
In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
:::




---

## Two.Shape#classList












A list of class strings stored if imported / interpreted  from an SVG element.





---

## Two.Shape#matrix












The transformation matrix of the shape.


::: tip nota-bene
{@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale} apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
:::




---

## Two.Shape#translation






The x and y value for where the shape is placed relative to its parent.











---

## Two.Shape#rotation






The value in radians for how much the shape is rotated relative to its parent.











---

## Two.Shape#scale






The value for how much the shape is scaled relative to its parent.








::: tip nota-bene
This value can be replaced with a {@link Two.Vector} to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
:::




---

## Two.Shape.FlagMatrix










Utility function used in conjunction with event handlers to update the flagMatrix of a shape.





---

## Two.Shape.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.Shape} to any object. Handy if you'd like to extend the {@link Two.Shape} class on a custom class.





---

## Two.Group#className






A class to be applied to the element to be compatible with CSS styling.








::: tip nota-bene
Only available for the SVG renderer.
:::




---

## Two.Shape#addTo








| Argument | Description |
| ---- | ----------- |
| `group` | The parent the shape adds itself to. |


Convenience method to add itself to the scenegraph.





---

## Two.Shape#clone


__Returns__:



+ `Two.Shape`











| Argument | Description |
| ---- | ----------- |
| `parent` | Optional argument to automatically add the shape to a scenegraph. |


Create a new {@link Two.Shape} with the same values as the current shape.




