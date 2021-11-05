---
pageClass: docs
---

# Two.Stop






<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js" />
</div>



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

  [`stop.js:49`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js#L49)

</div>






</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Stop.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">

A list of properties that are on every [Two.Stop](/documentation/stop).

</div>








<div class="meta">

  [`stop.js:55`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js#L55)

</div>






</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><a href="#MakeObservable"><span class="prefix">Two.Stop.</span><span class="shortname">MakeObservable</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Stop](/documentation/stop) to any object. Handy if you'd like to extend the [Two.Stop](/documentation/stop) class on a custom class.

</div>



<div class="meta">

  [`stop.js:65`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js#L65)

</div>






</div>



<div class="instance member ">

## renderer

<h2 class="longname" aria-hidden="true"><a href="#renderer"><span class="prefix">Two.Stop.</span><span class="shortname">renderer</span></a></h2>










<div class="properties">



</div>






<div class="description">

Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.

</div>



<div class="meta">

  [`stop.js:14`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js#L14)

</div>



<div class="tags">


::: tip nota-bene
With the [Two.SvgRenderer](/documentation/svgrenderer) you can access the underlying SVG element created via `shape.renderer.elem`.
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

  [`stop.js:23`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js#L23)

</div>






</div>



<div class="instance member ">

## opacity

<h2 class="longname" aria-hidden="true"><a href="#opacity"><span class="prefix">Two.Stop.</span><span class="shortname">opacity</span></a></h2>










<div class="properties">

The alpha percentage of the stop represented as a zero-to-one value.

</div>








<div class="meta">

  [`stop.js:30`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js#L30)

</div>






</div>



<div class="instance member ">

## color

<h2 class="longname" aria-hidden="true"><a href="#color"><span class="prefix">Two.Stop.</span><span class="shortname">color</span></a></h2>










<div class="properties">

The color of the stop.

</div>








<div class="meta">

  [`stop.js:36`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js#L36)

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
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Stop](/documentation/stop) with the same properties of the current path.

</div>



<div class="meta">

  [`stop.js:117`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js#L117)

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

  [`stop.js:136`](https://github.com/jonobr1/two.js/blob/dev/C:\Users\pures\Jono\two-js\src\effects/stop.js#L136)

</div>






</div>


