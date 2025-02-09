---
title: Two.Stop
pageClass: docs
lang: en-US
---

# Two.Stop


<div class="extends">

Extends: [Two.Element](/docs/element/)

</div>





<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  offset  | The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created. |
|  color  | The color of the stop. Default value flip flops from white to black as new stops are created. |
|  opacity  | The opacity value. Default value is 1, cannot be lower than 0. |



<div class="static member ">

## Index

<h2 class="longname" aria-hidden="true"><a href="#Index"><span class="prefix">Two.Stop.</span><span class="shortname">Index</span></a></h2>










<div class="properties">


The current index being referenced for calculating a stop's default offset value.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js#L88">
    stop.js:88
  </a>

</div>




</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Stop.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.Stop](/docs/effects/stop/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js#L94">
    stop.js:94
  </a>

</div>




</div>



<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.Stop.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.Stop



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.Stop](/docs/effects/stop/) to create a new instance |
</div>




<div class="description">

Create a new [Two.Stop](/docs/effects/stop/) from an object notation of a [Two.Stop](/docs/effects/stop/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js#L100">
    stop.js:100
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.Stop.toObject](/docs/effects/stop/#toobject)
:::


</div>


</div>



<div class="instance member ">

## offset

<h2 class="longname" aria-hidden="true"><a href="#offset"><span class="prefix">Two.Stop.</span><span class="shortname">offset</span></a></h2>










<div class="properties">


The offset percentage of the stop represented as a zero-to-one value.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js#L65">
    stop.js:65
  </a>

</div>




</div>



<div class="instance member ">

## opacity

<h2 class="longname" aria-hidden="true"><a href="#opacity"><span class="prefix">Two.Stop.</span><span class="shortname">opacity</span></a></h2>










<div class="properties">


The alpha percentage of the stop represented as a zero-to-one value.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js#L71">
    stop.js:71
  </a>

</div>



<div class="tags">


::: tip nota-bene
This is only supported on the [Two.SVGRenderer](/docs/renderers/svg/). You can get the same effect by encoding opacity into `rgba` strings in the color.
:::


</div>


</div>



<div class="instance member ">

## color

<h2 class="longname" aria-hidden="true"><a href="#color"><span class="prefix">Two.Stop.</span><span class="shortname">color</span></a></h2>










<div class="properties">


The color of the stop.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js#L78">
    stop.js:78
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Stop.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  stop  | The reference [Two.Stop](/docs/effects/stop/) |
</div>




<div class="description">

Copy the properties of one [Two.Stop](/docs/effects/stop/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js#L118">
    stop.js:118
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Stop.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Stop



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent gradient to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Stop](/docs/effects/stop/) with the same properties of the current path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js#L137">
    stop.js:137
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Stop.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/stop.js#L162">
    stop.js:162
  </a>

</div>




</div>


