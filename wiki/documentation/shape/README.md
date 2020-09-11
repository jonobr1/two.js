---
pageClass: documentation-class
---

# Two.Shape


<div class="extends">

__Extends__: `Events`

</div>


The foundational transformation object for the Two.js scenegraph.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L9)

</div>







---

<div class="static function ">

## Two.Shape.FlagMatrix













<div class="description">

Utility function used in conjunction with event handlers to update the flagMatrix of a shape.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L73)

</div>






</div>



---

<div class="static function ">

## Two.Shape.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `object`  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Shape](/documentation/shape) to any object. Handy if you'd like to extend the [Two.Shape](/documentation/shape) class on a custom class.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L82)

</div>






</div>



---

<div class="instance member ">

## Two.Shape.id








<div class="properties">

Session specific unique identifier.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L28)

</div>



<div class="tags">


::: tip nota-bene
In the [Two.SvgRenderer](/documentation/svgrenderer) change this to change the underlying SVG element's id too.
:::


</div>




</div>



---

<div class="instance member ">

## Two.Shape.classList








<div class="properties">



</div>






<div class="description">

A list of class strings stored if imported / interpreted  from an SVG element.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L35)

</div>






</div>



---

<div class="instance member ">

## Two.Shape.matrix








<div class="properties">



</div>






<div class="description">

The transformation matrix of the shape.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L42)

</div>



<div class="tags">


::: tip nota-bene
[Two.Shape.translation](/documentation/shape#two-shape-translation), [Two.Shape.rotation](/documentation/shape#two-shape-rotation), and [Two.Shape.scale](/documentation/shape#two-shape-scale) apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
:::


</div>




</div>



---

<div class="instance member ">

## Two.Shape.translation








<div class="properties">

The x and y value for where the shape is placed relative to its parent.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L50)

</div>






</div>



---

<div class="instance member ">

## Two.Shape.rotation








<div class="properties">

The value in radians for how much the shape is rotated relative to its parent.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L56)

</div>






</div>



---

<div class="instance member ">

## Two.Shape.scale








<div class="properties">

The value for how much the shape is scaled relative to its parent.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L62)

</div>



<div class="tags">


::: tip nota-bene
This value can be replaced with a [Two.Vector](/documentation/vector) to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
:::


</div>




</div>



---

<div class="instance member ">

## Two.Shape.className








<div class="properties">

A class to be applied to the element to be compatible with CSS styling.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L246)

</div>



<div class="tags">


::: tip nota-bene
Only available for the SVG renderer.
:::


</div>




</div>



---

<div class="instance function ">

## Two.Shape.addTo










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `group`  | The parent the shape adds itself to. |
</div>




<div class="description">

Convenience method to add itself to the scenegraph.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L255)

</div>






</div>



---

<div class="instance function ">

## Two.Shape.clone




<div class="returns">

__Returns__:



+ `Two.Shape`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `parent`  | Optional argument to automatically add the shape to a scenegraph. |
</div>




<div class="description">

Create a new [Two.Shape](/documentation/shape) with the same values as the current shape.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/shape.js#L266)

</div>






</div>


