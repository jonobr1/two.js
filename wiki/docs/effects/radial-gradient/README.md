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



### Constructor


| Argument | Description |
| ---- | ----------- |
|  x  | The x position of the origin of the radial gradient. |
|  y  | The y position of the origin of the radial gradient. |
|  radius  | The radius of the radial gradient. |
|  stops  | A list of [Two.Stop](/docs/stop)s that contain the gradient fill pattern for the gradient. |
|  focalX  | The x position of the focal point on the radial gradient. |
|  focalY  | The y position of the focal point on the radial gradient. |



<div class="static member ">

## Stop

<h2 class="longname" aria-hidden="true"><a href="#Stop"><span class="prefix">Two.RadialGradient.</span><span class="shortname">Stop</span></a></h2>

















<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L68">
    radial-gradient.js:68
  </a>

</div>





<div class="see">

[Two.Stop](/docs/stop)

</div>


</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.RadialGradient.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">

A list of properties that are on every [Two.RadialGradient](/docs/radialgradient).

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L74">
    radial-gradient.js:74
  </a>

</div>






</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><a href="#MakeObservable"><span class="prefix">Two.RadialGradient.</span><span class="shortname">MakeObservable</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.RadialGradient](/docs/radialgradient) to any object. Handy if you'd like to extend the [Two.RadialGradient](/docs/radialgradient) class on a custom class.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L82">
    radial-gradient.js:82
  </a>

</div>






</div>



<div class="instance member ">

## center

<h2 class="longname" aria-hidden="true"><a href="#center"><span class="prefix">Two.RadialGradient.</span><span class="shortname">center</span></a></h2>










<div class="properties">

The x and y value for where the origin of the radial gradient is.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L27">
    radial-gradient.js:27
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L38">
    radial-gradient.js:38
  </a>

</div>



<div class="tags">


::: tip nota-bene
This effects the spray or spread of the radial gradient.
:::


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

Create a new instance of [Two.RadialGradient](/docs/radialgradient) with the same properties of the current path.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L121">
    radial-gradient.js:121
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/radial-gradient.js#L149">
    radial-gradient.js:149
  </a>

</div>






</div>


