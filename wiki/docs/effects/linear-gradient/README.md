---
title: Two.LinearGradient
pageClass: docs
lang: en-US
---

# Two.LinearGradient


<div class="extends">

Extends: [Two.Gradient](/docs/effects/gradient/)

</div>





<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  x1  | The x position of the first end point of the linear gradient. |
|  y1  | The y position of the first end point of the linear gradient. |
|  x2  | The x position of the second end point of the linear gradient. |
|  y2  | The y position of the second end point of the linear gradient. |
|  stops  | A list of [Two.Stop](/docs/effects/stop/)s that contain the gradient fill pattern for the gradient. |



<div class="static member ">

## Stop

<h2 class="longname" aria-hidden="true"><a href="#Stop"><span class="prefix">Two.LinearGradient.</span><span class="shortname">Stop</span></a></h2>

















<div class="see">

See: [Two.Stop](/docs/effects/stop/)

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L64">
    linear-gradient.js:64
  </a>

</div>




</div>



<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.LinearGradient.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.LinearGradient



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.LinearGradient](/docs/effects/linear-gradient/) to create a new instance |
</div>




<div class="description">

Create a new [Two.LinearGradient](/docs/effects/linear-gradient/) from an object notation of a [Two.LinearGradient](/docs/effects/linear-gradient/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L72">
    linear-gradient.js:72
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.LinearGradient.toObject](/docs/effects/linear-gradient/#toobject)
:::


</div>


</div>



<div class="instance member ">

## left

<h2 class="longname" aria-hidden="true"><a href="#left"><span class="prefix">Two.LinearGradient.</span><span class="shortname">left</span></a></h2>










<div class="properties">


The x and y value for where the first end point is placed on the canvas.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L39">
    linear-gradient.js:39
  </a>

</div>




</div>



<div class="instance member ">

## right

<h2 class="longname" aria-hidden="true"><a href="#right"><span class="prefix">Two.LinearGradient.</span><span class="shortname">right</span></a></h2>










<div class="properties">


The x and y value for where the second end point is placed on the canvas.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L44">
    linear-gradient.js:44
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.LinearGradient.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  gradient  | The reference [Two.LinearGradient](/docs/effects/linear-gradient/) |
</div>




<div class="description">

Copy the properties of one [Two.LinearGradient](/docs/effects/linear-gradient/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L90">
    linear-gradient.js:90
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.LinearGradient.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Gradient



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.LinearGradient](/docs/effects/linear-gradient/) with the same properties of the current path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L112">
    linear-gradient.js:112
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.LinearGradient.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L147">
    linear-gradient.js:147
  </a>

</div>




</div>


