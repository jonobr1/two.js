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






<div class="instance member ">

## renderer

<h2 class="longname" aria-hidden="true"><a href="#renderer"><span class="prefix">Two.Shape.</span><span class="shortname">renderer</span></a></h2>










<div class="properties">





</div>






<div class="description">

Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L89">
    shape.js:89
  </a>

</div>



<div class="tags">


::: tip nota-bene
With the [Two.SvgRenderer]() you can access the underlying SVG element created via `shape.renderer.elem`.
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L98">
    shape.js:98
  </a>

</div>



<div class="tags">


::: tip nota-bene
In the [Two.SvgRenderer]() change this to change the underlying SVG element's id too.
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L105">
    shape.js:105
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L113">
    shape.js:113
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L120">
    shape.js:120
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L126">
    shape.js:126
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L132">
    shape.js:132
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L139">
    shape.js:139
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L146">
    shape.js:146
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L162">
    shape.js:162
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L173">
    shape.js:173
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L184">
    shape.js:184
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shape.js#L201">
    shape.js:201
  </a>

</div>




</div>


