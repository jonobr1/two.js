---
title: Two.Gradient
pageClass: docs
lang: en-US
---

# Two.Gradient


<div class="extends">

Extends: [Two.Element](/docs/element/)

</div>


This is the base class for constructing different types of gradients with Two.js. The two common gradients are [Two.LinearGradient](/docs/effects/linear-gradient/) and [Two.RadialGradient](/docs/effects/radial-gradient/).


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  stops  | A list of [Two.Stop](/docs/effects/stop/)s that contain the gradient fill pattern for the gradient. |



<div class="static member ">

## Stop

<h2 class="longname" aria-hidden="true"><a href="#Stop"><span class="prefix">Two.Gradient.</span><span class="shortname">Stop</span></a></h2>

















<div class="see">

See: [Two.Stop](/docs/effects/stop/)

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js#L57">
    gradient.js:57
  </a>

</div>




</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Gradient.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.Gradient](/docs/effects/gradient/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js#L63">
    gradient.js:63
  </a>

</div>




</div>



<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.Gradient.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.Gradient



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.Gradient](/docs/effects/gradient/) to create a new instance |
</div>




<div class="description">

Create a new [Two.Gradient](/docs/effects/gradient/) from an object notation of a [Two.Gradient](/docs/effects/gradient/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js#L69">
    gradient.js:69
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.Gradient.toObject](/docs/effects/gradient/#toobject)
:::


</div>


</div>



<div class="instance member ">

## spread

<h2 class="longname" aria-hidden="true"><a href="#spread"><span class="prefix">Two.Gradient.</span><span class="shortname">spread</span></a></h2>










<div class="properties">


Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.


</div>








<div class="see">

See: [https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute](https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute) for more information

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js#L34">
    gradient.js:34
  </a>

</div>




</div>



<div class="instance member ">

## units

<h2 class="longname" aria-hidden="true"><a href="#units"><span class="prefix">Two.Gradient.</span><span class="shortname">units</span></a></h2>










<div class="properties">


Indicates how coordinate values are interpreted by the renderer. Possible values are `'userSpaceOnUse'` and `'objectBoundingBox'`.


</div>








<div class="see">

See: [https://www.w3.org/TR/SVG11/pservers.html#RadialGradientElementGradientUnitsAttribute](https://www.w3.org/TR/SVG11/pservers.html#RadialGradientElementGradientUnitsAttribute) for more information

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js#L41">
    gradient.js:41
  </a>

</div>




</div>



<div class="instance member ">

## stops

<h2 class="longname" aria-hidden="true"><a href="#stops"><span class="prefix">Two.Gradient.</span><span class="shortname">stops</span></a></h2>










<div class="properties">


An ordered list of [Two.Stop](/docs/effects/stop/)s for rendering the gradient.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js#L48">
    gradient.js:48
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Gradient.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Gradient



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Gradient](/docs/effects/gradient/) with the same properties of the current path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js#L91">
    gradient.js:91
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Gradient.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  gradient  | The reference [Two.Gradient](/docs/effects/gradient/) |
</div>




<div class="description">

Copy the properties of one [Two.Gradient](/docs/effects/gradient/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js#L120">
    gradient.js:120
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Gradient.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/gradient.js#L139">
    gradient.js:139
  </a>

</div>




</div>


