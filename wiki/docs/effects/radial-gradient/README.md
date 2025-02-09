---
title: Two.RadialGradient
pageClass: docs
lang: en-US
---

# Two.RadialGradient


<div class="extends">

Extends: [Two.Gradient](/docs/effects/gradient/)

</div>





<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  x  | The x position of the origin of the radial gradient. |
|  y  | The y position of the origin of the radial gradient. |
|  radius  | The radius of the radial gradient. |
|  stops  | A list of [Two.Stop](/docs/effects/stop/)s that contain the gradient fill pattern for the gradient. |
|  focalX  | The x position of the focal point on the radial gradient. |
|  focalY  | The y position of the focal point on the radial gradient. |



<div class="static member ">

## Stop

<h2 class="longname" aria-hidden="true"><a href="#Stop"><span class="prefix">Two.RadialGradient.</span><span class="shortname">Stop</span></a></h2>

















<div class="see">

See: [Two.Stop](/docs/effects/stop/)

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L87">
    radial-gradient.js:87
  </a>

</div>




</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.RadialGradient.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.RadialGradient](/docs/effects/radial-gradient/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L93">
    radial-gradient.js:93
  </a>

</div>




</div>



<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.RadialGradient.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.RadialGradient



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.RadialGradient](/docs/effects/radial-gradient/) to create a new instance |
</div>




<div class="description">

Create a new [Two.RadialGradient](/docs/effects/radial-gradient/) from an object notation of a [Two.RadialGradient](/docs/effects/radial-gradient/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L99">
    radial-gradient.js:99
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.RadialGradient.toObject](/docs/effects/radial-gradient/#toobject)
:::


</div>


</div>



<div class="instance member ">

## center

<h2 class="longname" aria-hidden="true"><a href="#center"><span class="prefix">Two.RadialGradient.</span><span class="shortname">center</span></a></h2>










<div class="properties">


The x and y value for where the origin of the radial gradient is.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L55">
    radial-gradient.js:55
  </a>

</div>




</div>



<div class="instance member ">

## focal

<h2 class="longname" aria-hidden="true"><a href="#focal"><span class="prefix">Two.RadialGradient.</span><span class="shortname">focal</span></a></h2>










<div class="properties">


The x and y value for where the focal point of the radial gradient is.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L63">
    radial-gradient.js:63
  </a>

</div>



<div class="tags">


::: tip nota-bene
This effects the spray or spread of the radial gradient.
:::


</div>


</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.RadialGradient.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  gradient  | The reference [Two.RadialGradient](/docs/effects/radial-gradient/) |
</div>




<div class="description">

Copy the properties of one [Two.RadialGradient](/docs/effects/radial-gradient/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L117">
    radial-gradient.js:117
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.RadialGradient.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Gradient



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.RadialGradient](/docs/effects/radial-gradient/) with the same properties of the current path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L143">
    radial-gradient.js:143
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.RadialGradient.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L179">
    radial-gradient.js:179
  </a>

</div>




</div>


