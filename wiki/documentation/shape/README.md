---
pageClass: documentation-class
---

# Two.Shape


<div class="extends">

__Extends__: [Two.Events](/documentation/events/)

</div>


The foundational transformation object for the Two.js scenegraph.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js" />
</div>







<div class="static function ">

## FlagMatrix

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">FlagMatrix</span></h2>















<div class="description">

Utility function used in conjunction with event handlers to update the flagMatrix of a shape.

</div>



<div class="meta">

  [`shape.js:86`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L86)

</div>






</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">MakeObservable</span></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Shape](/documentation/shape) to any object. Handy if you'd like to extend the [Two.Shape](/documentation/shape) class on a custom class.

</div>



<div class="meta">

  [`shape.js:95`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L95)

</div>






</div>



<div class="instance member ">

## renderer

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">renderer</span></h2>










<div class="properties">



</div>






<div class="description">

Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.

</div>



<div class="meta">

  [`shape.js:17`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L17)

</div>



<div class="tags">


::: tip nota-bene
With the [Two.SvgRenderer](/documentation/svgrenderer) you can access the underlying SVG element created via `shape.renderer.elem`.
:::


</div>




</div>



<div class="instance member ">

## id

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">id</span></h2>










<div class="properties">

Session specific unique identifier.

</div>








<div class="meta">

  [`shape.js:27`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L27)

</div>



<div class="tags">


::: tip nota-bene
In the [Two.SvgRenderer](/documentation/svgrenderer) change this to change the underlying SVG element's id too.
:::


</div>




</div>



<div class="instance member ">

## classList

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">classList</span></h2>










<div class="properties">



</div>






<div class="description">

A list of class strings stored if imported / interpreted  from an SVG element.

</div>



<div class="meta">

  [`shape.js:34`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L34)

</div>






</div>



<div class="instance member ">

## matrix

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">matrix</span></h2>










<div class="properties">



</div>






<div class="description">

The transformation matrix of the shape.

</div>



<div class="meta">

  [`shape.js:41`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L41)

</div>



<div class="tags">


::: tip nota-bene
[Two.Shape.translation](/documentation/shape/#two-shape-translation), [Two.Shape.rotation](/documentation/shape/#two-shape-rotation), [Two.Shape.scale](/documentation/shape/#two-shape-scale), [Two.Shape.skewX](/documentation/shape/#two-shape-skewx), and [Two.Shape.skewY](/documentation/shape/#two-shape-skewy) apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
:::


</div>




</div>



<div class="instance member ">

## translation

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">translation</span></h2>










<div class="properties">

The x and y value for where the shape is placed relative to its parent.

</div>








<div class="meta">

  [`shape.js:49`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L49)

</div>






</div>



<div class="instance member ">

## rotation

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">rotation</span></h2>










<div class="properties">

The value in Number for how much the shape is rotated relative to its parent.

</div>








<div class="meta">

  [`shape.js:55`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L55)

</div>






</div>



<div class="instance member ">

## scale

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">scale</span></h2>










<div class="properties">

The value for how much the shape is scaled relative to its parent.

</div>








<div class="meta">

  [`shape.js:61`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L61)

</div>



<div class="tags">


::: tip nota-bene
This value can be replaced with a [Two.Vector](/documentation/vector) to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
:::


</div>




</div>



<div class="instance member ">

## skewX

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">skewX</span></h2>










<div class="properties">

The value in Number for how much the shape is skewed relative to its parent.

</div>






<div class="description">

Skew the shape by an angle in the x axis direction.

</div>



<div class="meta">

  [`shape.js:68`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L68)

</div>






</div>



<div class="instance member ">

## skewY

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">skewY</span></h2>










<div class="properties">

The value in Number for how much the shape is skewed relative to its parent.

</div>






<div class="description">

Skew the shape by an angle in the y axis direction.

</div>



<div class="meta">

  [`shape.js:75`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L75)

</div>






</div>



<div class="instance member ">

## className

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">className</span></h2>










<div class="properties">

A class to be applied to the element to be compatible with CSS styling.

</div>








<div class="meta">

  [`shape.js:336`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L336)

</div>



<div class="tags">


::: tip nota-bene
Only available for the SVG renderer.
:::


</div>




</div>



<div class="instance function ">

## addTo

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">addTo</span></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  group  | The parent the shape adds itself to. |
</div>




<div class="description">

Convenience method to add itself to the scenegraph.

</div>



<div class="meta">

  [`shape.js:343`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L343)

</div>






</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Shape.</span><span class="shortname">clone</span></h2>




<div class="returns">

__Returns__: Two.Shape



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | Optional argument to automatically add the shape to a scenegraph. |
</div>




<div class="description">

Create a new [Two.Shape](/documentation/shape) with the same values as the current shape.

</div>



<div class="meta">

  [`shape.js:354`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src/shape.js#L354)

</div>






</div>


