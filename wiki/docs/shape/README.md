---
title: Two.Shape
pageClass: docs
lang: en-US
---

# Two.Shape


<div class="extends">

Extends: [Two.Events](/docs/events/)

</div>


The foundational transformation object for the Two.js scenegraph.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js" />
</div>







<div class="static function ">

## FlagMatrix

<h2 class="longname" aria-hidden="true"><a href="#FlagMatrix"><span class="prefix">Two.Shape.</span><span class="shortname">FlagMatrix</span></a></h2>















<div class="description">

Utility function used in conjunction with event handlers to update the flagMatrix of a shape.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L86">
    shape.js:86
  </a>

</div>






</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><a href="#MakeObservable"><span class="prefix">Two.Shape.</span><span class="shortname">MakeObservable</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Shape](/docs/shape) to any object. Handy if you'd like to extend the [Two.Shape](/docs/shape) class on a custom class.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L95">
    shape.js:95
  </a>

</div>






</div>



<div class="instance member ">

## renderer

<h2 class="longname" aria-hidden="true"><a href="#renderer"><span class="prefix">Two.Shape.</span><span class="shortname">renderer</span></a></h2>










<div class="properties">



</div>






<div class="description">

Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L17">
    shape.js:17
  </a>

</div>



<div class="tags">


::: tip nota-bene
With the [Two.SvgRenderer](/docs/svgrenderer) you can access the underlying SVG element created via `shape.renderer.elem`.
:::


</div>




</div>



<div class="instance member ">

## id

<h2 class="longname" aria-hidden="true"><a href="#id"><span class="prefix">Two.Shape.</span><span class="shortname">id</span></a></h2>










<div class="properties">

Session specific unique identifier.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L27">
    shape.js:27
  </a>

</div>



<div class="tags">


::: tip nota-bene
In the [Two.SvgRenderer](/docs/svgrenderer) change this to change the underlying SVG element's id too.
:::


</div>




</div>



<div class="instance member ">

## classList

<h2 class="longname" aria-hidden="true"><a href="#classList"><span class="prefix">Two.Shape.</span><span class="shortname">classList</span></a></h2>










<div class="properties">



</div>






<div class="description">

A list of class strings stored if imported / interpreted  from an SVG element.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L34">
    shape.js:34
  </a>

</div>






</div>



<div class="instance member ">

## matrix

<h2 class="longname" aria-hidden="true"><a href="#matrix"><span class="prefix">Two.Shape.</span><span class="shortname">matrix</span></a></h2>










<div class="properties">



</div>






<div class="description">

The transformation matrix of the shape.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L41">
    shape.js:41
  </a>

</div>



<div class="tags">


::: tip nota-bene
[Two.Shape.translation](/docs/shape/#two-shape-translation), [Two.Shape.rotation](/docs/shape/#two-shape-rotation), [Two.Shape.scale](/docs/shape/#two-shape-scale), [Two.Shape.skewX](/docs/shape/#two-shape-skewx), and [Two.Shape.skewY](/docs/shape/#two-shape-skewy) apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
:::


</div>




</div>



<div class="instance member ">

## translation

<h2 class="longname" aria-hidden="true"><a href="#translation"><span class="prefix">Two.Shape.</span><span class="shortname">translation</span></a></h2>










<div class="properties">

The x and y value for where the shape is placed relative to its parent.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L49">
    shape.js:49
  </a>

</div>






</div>



<div class="instance member ">

## rotation

<h2 class="longname" aria-hidden="true"><a href="#rotation"><span class="prefix">Two.Shape.</span><span class="shortname">rotation</span></a></h2>










<div class="properties">

The value in Number for how much the shape is rotated relative to its parent.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L55">
    shape.js:55
  </a>

</div>






</div>



<div class="instance member ">

## scale

<h2 class="longname" aria-hidden="true"><a href="#scale"><span class="prefix">Two.Shape.</span><span class="shortname">scale</span></a></h2>










<div class="properties">

The value for how much the shape is scaled relative to its parent.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L61">
    shape.js:61
  </a>

</div>



<div class="tags">


::: tip nota-bene
This value can be replaced with a [Two.Vector](/docs/vector) to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
:::


</div>




</div>



<div class="instance member ">

## skewX

<h2 class="longname" aria-hidden="true"><a href="#skewX"><span class="prefix">Two.Shape.</span><span class="shortname">skewX</span></a></h2>










<div class="properties">

The value in Number for how much the shape is skewed relative to its parent.

</div>






<div class="description">

Skew the shape by an angle in the x axis direction.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L68">
    shape.js:68
  </a>

</div>






</div>



<div class="instance member ">

## skewY

<h2 class="longname" aria-hidden="true"><a href="#skewY"><span class="prefix">Two.Shape.</span><span class="shortname">skewY</span></a></h2>










<div class="properties">

The value in Number for how much the shape is skewed relative to its parent.

</div>






<div class="description">

Skew the shape by an angle in the y axis direction.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L75">
    shape.js:75
  </a>

</div>






</div>



<div class="instance member ">

## className

<h2 class="longname" aria-hidden="true"><a href="#className"><span class="prefix">Two.Shape.</span><span class="shortname">className</span></a></h2>










<div class="properties">

A class to be applied to the element to be compatible with CSS styling.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L336">
    shape.js:336
  </a>

</div>



<div class="tags">


::: tip nota-bene
Only available for the SVG renderer.
:::


</div>




</div>



<div class="instance function ">

## addTo

<h2 class="longname" aria-hidden="true"><a href="#addTo"><span class="prefix">Two.Shape.</span><span class="shortname">addTo</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  group  | The parent the shape adds itself to. |
</div>




<div class="description">

Convenience method to add itself to the scenegraph.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L343">
    shape.js:343
  </a>

</div>






</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Shape.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Shape



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | Optional argument to automatically add the shape to a scenegraph. |
</div>




<div class="description">

Create a new [Two.Shape](/docs/shape) with the same values as the current shape.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L354">
    shape.js:354
  </a>

</div>






</div>


