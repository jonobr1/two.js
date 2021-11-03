---
pageClass: documentation-class
---

# Two.Gradient



This is the base class for constructing different types of gradients with Two.js. The two common gradients are [Two.LinearGradient](/documentation/lineargradient) and [Two.RadialGradient](/documentation/radialgradient).


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  stops  | A list of [Two.Stop](/documentation/stop)s that contain the gradient fill pattern for the gradient. |



<div class="static member ">

## Stop

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">Stop</span></h2>

















<div class="meta">

  [`gradient.js:57`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L57)

</div>





<div class="see">

[Two.Stop](/documentation/stop)

</div>


</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">Properties</span></h2>










<div class="properties">

A list of properties that are on every [Two.Gradient](/documentation/gradient).

</div>








<div class="meta">

  [`gradient.js:63`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L63)

</div>






</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">MakeObservable</span></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Gradient](/documentation/gradient) to any object. Handy if you'd like to extend the [Two.Gradient](/documentation/gradient) class on a custom class.

</div>



<div class="meta">

  [`gradient.js:71`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L71)

</div>






</div>



<div class="static function ">

## FlagStops

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">FlagStops</span></h2>















<div class="description">

Cached method to let renderers know stops have been updated on a [Two.Gradient](/documentation/gradient).

</div>



<div class="meta">

  [`gradient.js:146`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L146)

</div>






</div>



<div class="static function ">

## BindVertices

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">BindVertices</span></h2>















<div class="description">

Cached method to let [Two.Gradient](/documentation/gradient) know vertices have been added to the instance.

</div>



<div class="meta">

  [`gradient.js:155`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L155)

</div>






</div>



<div class="static function ">

## UnbindStops

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">UnbindStops</span></h2>















<div class="description">

Cached method to let [Two.Gradient](/documentation/gradient) know vertices have been removed from the instance.

</div>



<div class="meta">

  [`gradient.js:174`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L174)

</div>






</div>



<div class="instance member ">

## renderer

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">renderer</span></h2>










<div class="properties">



</div>






<div class="description">

Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.

</div>



<div class="meta">

  [`gradient.js:17`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L17)

</div>



<div class="tags">


::: tip nota-bene
With the [Two.SvgRenderer](/documentation/svgrenderer) you can access the underlying SVG element created via `shape.renderer.elem`.
:::


</div>




</div>



<div class="instance member ">

## id

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">id</span></h2>










<div class="properties">

Session specific unique identifier.

</div>








<div class="meta">

  [`gradient.js:26`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L26)

</div>



<div class="tags">


::: tip nota-bene
In the [Two.SvgRenderer](/documentation/svgrenderer) change this to change the underlying SVG element's id too.
:::


</div>




</div>



<div class="instance member ">

## spread

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">spread</span></h2>










<div class="properties">

Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.

</div>








<div class="meta">

  [`gradient.js:38`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L38)

</div>





<div class="see">

[https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute](https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute) for more information

</div>


</div>



<div class="instance member ">

## stops

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">stops</span></h2>










<div class="properties">

An ordered list of [Two.Stop](/documentation/stop)s for rendering the gradient.

</div>








<div class="meta">

  [`gradient.js:45`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L45)

</div>






</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">clone</span></h2>




<div class="returns">

__Returns__: Two.Gradient



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Gradient](/documentation/gradient) with the same properties of the current path.

</div>



<div class="meta">

  [`gradient.js:219`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L219)

</div>






</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><span class="prefix">Two.Gradient.</span><span class="shortname">toObject</span></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the path.

</div>



<div class="meta">

  [`gradient.js:246`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/gradient.js#L246)

</div>






</div>


