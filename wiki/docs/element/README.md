---
title: Two.Element
pageClass: docs
lang: en-US
---

# Two.Element


<div class="extends">

Extends: [Two.Events](/docs/events/)

</div>


The foundational object for the Two.js scenegraph.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/element.js" />
</div>


<carbon-ads />






<div class="instance member ">

## renderer

<h2 class="longname" aria-hidden="true"><a href="#renderer"><span class="prefix">Two.Element.</span><span class="shortname">renderer</span></a></h2>










<div class="properties">


Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/element.js#L25">
    element.js:25
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

<h2 class="longname" aria-hidden="true"><a href="#id"><span class="prefix">Two.Element.</span><span class="shortname">id</span></a></h2>










<div class="properties">


Session specific unique identifier.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/element.js#L32">
    element.js:32
  </a>

</div>



<div class="tags">


::: tip nota-bene
In the [Two.SvgRenderer]() change this to change the underlying SVG element's id too.
:::


</div>


</div>



<div class="instance member ">

## className

<h2 class="longname" aria-hidden="true"><a href="#className"><span class="prefix">Two.Element.</span><span class="shortname">className</span></a></h2>










<div class="properties">


A class to be applied to the element to be compatible with CSS styling.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/element.js#L39">
    element.js:39
  </a>

</div>



<div class="tags">


::: tip nota-bene
Only available for the SVG renderer.
:::


</div>


</div>



<div class="instance member ">

## classList

<h2 class="longname" aria-hidden="true"><a href="#classList"><span class="prefix">Two.Element.</span><span class="shortname">classList</span></a></h2>










<div class="properties">





</div>






<div class="description">

A list of class strings stored if imported / interpreted  from an SVG element.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/element.js#L46">
    element.js:46
  </a>

</div>




</div>



<div class="instance function ">

## flagReset

<h2 class="longname" aria-hidden="true"><a href="#flagReset"><span class="prefix">Two.Element.</span><span class="shortname">flagReset</span></a></h2>















<div class="description">

Called internally by Two.js's renderer to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/element.js#L63">
    element.js:63
  </a>

</div>




</div>


