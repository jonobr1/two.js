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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L55">
    linear-gradient.js:55
  </a>

</div>




</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><a href="#MakeObservable"><span class="prefix">Two.LinearGradient.</span><span class="shortname">MakeObservable</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.LinearGradient](/docs/effects/linear-gradient/) to any object. Handy if you'd like to extend the [Two.LinearGradient](/docs/effects/linear-gradient/) class on a custom class.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L61">
    linear-gradient.js:61
  </a>

</div>




</div>



<div class="static function ">

## FlagEndPoints

<h2 class="longname" aria-hidden="true"><a href="#FlagEndPoints"><span class="prefix">Two.LinearGradient.</span><span class="shortname">FlagEndPoints</span></a></h2>















<div class="description">

Cached method to let renderers know end points have been updated on a [Two.LinearGradient](/docs/effects/linear-gradient/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L71">
    linear-gradient.js:71
  </a>

</div>




</div>



<div class="instance member ">

## left

<h2 class="longname" aria-hidden="true"><a href="#left"><span class="prefix">Two.LinearGradient.</span><span class="shortname">left</span></a></h2>










<div class="properties">

The x and y value for where the first end point is placed on the canvas.

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L27">
    linear-gradient.js:27
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L32">
    linear-gradient.js:32
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L93">
    linear-gradient.js:93
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/linear-gradient.js#L121">
    linear-gradient.js:121
  </a>

</div>




</div>


