---
title: Two.Shape
pageClass: docs
lang: en-US
---

# Two.Shape


<div class="extends">

Extends: [Two.Element](/docs/element/)

</div>


The foundational transformation object for the Two.js scenegraph.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js" />
</div>


<carbon-ads />






<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.Shape.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.Shape



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.Shape](/docs/shape/) to create a new instance |
</div>




<div class="description">

Create a new [Two.Shape](/docs/shape/) from an object notation of a [Two.Shape](/docs/shape/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L144">
    shape.js:144
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.Shape.toObject](/docs/shape/#toobject)
:::


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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L86">
    shape.js:86
  </a>

</div>



<div class="tags">


::: tip nota-bene
With the [Two.SVGRenderer](/docs/renderers/svg/) you can access the underlying SVG element created via `shape.renderer.elem`.
:::


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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L95">
    shape.js:95
  </a>

</div>



<div class="tags">


::: tip nota-bene
[Two.Shape.position](/docs/shape/#position), [Two.Shape.rotation](/docs/shape/#rotation), [Two.Shape.scale](/docs/shape/#scale), [Two.Shape.skewX](/docs/shape/#skewx), and [Two.Shape.skewY](/docs/shape/#skewy) apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
:::


</div>


</div>



<div class="instance member ">

## worldMatrix

<h2 class="longname" aria-hidden="true"><a href="#worldMatrix"><span class="prefix">Two.Shape.</span><span class="shortname">worldMatrix</span></a></h2>










<div class="properties">





</div>






<div class="description">

The transformation matrix of the shape in the scene.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L103">
    shape.js:103
  </a>

</div>




</div>



<div class="instance member ">

## position

<h2 class="longname" aria-hidden="true"><a href="#position"><span class="prefix">Two.Shape.</span><span class="shortname">position</span></a></h2>










<div class="properties">


The x and y value for where the shape is placed relative to its parent.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L110">
    shape.js:110
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L116">
    shape.js:116
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L122">
    shape.js:122
  </a>

</div>



<div class="tags">


::: tip nota-bene
This value can be replaced with a [Two.Vector](/docs/vector/) to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L129">
    shape.js:129
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L136">
    shape.js:136
  </a>

</div>




</div>



<div class="instance member ">

## translation

<h2 class="longname" aria-hidden="true"><a href="#translation"><span class="prefix">Two.Shape.</span><span class="shortname">translation</span></a></h2>















<div class="description">

Alias for [Two.Shape.position](/docs/shape/#position).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L169">
    shape.js:169
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L180">
    shape.js:180
  </a>

</div>




</div>



<div class="instance function ">

## remove

<h2 class="longname" aria-hidden="true"><a href="#remove"><span class="prefix">Two.Shape.</span><span class="shortname">remove</span></a></h2>















<div class="description">

Remove self from the scene / parent.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L191">
    shape.js:191
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Shape.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  shape  |  |
</div>




<div class="description">

Copy the properties of one [Two.Shape](/docs/shape/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L206">
    shape.js:206
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

Create a new [Two.Shape](/docs/shape/) with the same values as the current shape.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L246">
    shape.js:246
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Shape.</span><span class="shortname">toObject</span></a></h2>















<div class="description">

Create a JSON compatible object that represents information of the shape.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L273">
    shape.js:273
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.Shape.fromObject](/docs/shape/#fromobject)
:::


</div>


</div>


