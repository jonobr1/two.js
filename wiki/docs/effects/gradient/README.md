---
pageClass: docs
---

# Two.Gradient



This is the base class for constructing different types of gradients with Two.js. The two common gradients are [Two.LinearGradient](/docs/lineargradient) and [Two.RadialGradient](/docs/radialgradient).


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  stops  | A list of [Two.Stop](/docs/stop)s that contain the gradient fill pattern for the gradient. |



<div class="static member ">

## Stop

<h2 class="longname" aria-hidden="true"><a href="#Stop"><span class="prefix">Two.Gradient.</span><span class="shortname">Stop</span></a></h2>

















<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L57">
    gradient.js:57
  </a>

</div>





<div class="see">

[Two.Stop](/docs/stop)

</div>


</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Gradient.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">

A list of properties that are on every [Two.Gradient](/docs/gradient).

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L63">
    gradient.js:63
  </a>

</div>






</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><a href="#MakeObservable"><span class="prefix">Two.Gradient.</span><span class="shortname">MakeObservable</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Gradient](/docs/gradient) to any object. Handy if you'd like to extend the [Two.Gradient](/docs/gradient) class on a custom class.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L71">
    gradient.js:71
  </a>

</div>






</div>



<div class="static function ">

## FlagStops

<h2 class="longname" aria-hidden="true"><a href="#FlagStops"><span class="prefix">Two.Gradient.</span><span class="shortname">FlagStops</span></a></h2>















<div class="description">

Cached method to let renderers know stops have been updated on a [Two.Gradient](/docs/gradient).

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L146">
    gradient.js:146
  </a>

</div>






</div>



<div class="static function ">

## BindVertices

<h2 class="longname" aria-hidden="true"><a href="#BindVertices"><span class="prefix">Two.Gradient.</span><span class="shortname">BindVertices</span></a></h2>















<div class="description">

Cached method to let [Two.Gradient](/docs/gradient) know vertices have been added to the instance.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L155">
    gradient.js:155
  </a>

</div>






</div>



<div class="static function ">

## UnbindStops

<h2 class="longname" aria-hidden="true"><a href="#UnbindStops"><span class="prefix">Two.Gradient.</span><span class="shortname">UnbindStops</span></a></h2>















<div class="description">

Cached method to let [Two.Gradient](/docs/gradient) know vertices have been removed from the instance.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L174">
    gradient.js:174
  </a>

</div>






</div>



<div class="instance member ">

## renderer

<h2 class="longname" aria-hidden="true"><a href="#renderer"><span class="prefix">Two.Gradient.</span><span class="shortname">renderer</span></a></h2>










<div class="properties">



</div>






<div class="description">

Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L17">
    gradient.js:17
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

<h2 class="longname" aria-hidden="true"><a href="#id"><span class="prefix">Two.Gradient.</span><span class="shortname">id</span></a></h2>










<div class="properties">

Session specific unique identifier.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L26">
    gradient.js:26
  </a>

</div>



<div class="tags">


::: tip nota-bene
In the [Two.SvgRenderer](/docs/svgrenderer) change this to change the underlying SVG element's id too.
:::


</div>




</div>



<div class="instance member ">

## spread

<h2 class="longname" aria-hidden="true"><a href="#spread"><span class="prefix">Two.Gradient.</span><span class="shortname">spread</span></a></h2>










<div class="properties">

Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L38">
    gradient.js:38
  </a>

</div>





<div class="see">

[https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute](https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute) for more information

</div>


</div>



<div class="instance member ">

## stops

<h2 class="longname" aria-hidden="true"><a href="#stops"><span class="prefix">Two.Gradient.</span><span class="shortname">stops</span></a></h2>










<div class="properties">

An ordered list of [Two.Stop](/docs/stop)s for rendering the gradient.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L45">
    gradient.js:45
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

Create a new instance of [Two.Gradient](/docs/gradient) with the same properties of the current path.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L219">
    gradient.js:219
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L246">
    gradient.js:246
  </a>

</div>






</div>


