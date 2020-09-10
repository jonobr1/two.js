# Two.Gradient



This is the base class for constructing different types of gradients with Two.js. The two common gradients are [Two.LinearGradient](/documentation/lineargradient) and [Two.RadialGradient](/documentation/radialgradient).


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L9)

</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `stops`  | A list of [Two.Stop](/documentation/stop)s that contain the gradient fill pattern for the gradient. |



---

<div class="static member ">

## Two.Gradient.Properties








<div class="properties">

A list of properties that are on every [Two.Gradient](/documentation/gradient).

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L62)

</div>






</div>



---

<div class="static function ">

## Two.Gradient.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `object`  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Gradient](/documentation/gradient) to any object. Handy if you'd like to extend the [Two.Gradient](/documentation/gradient) class on a custom class.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L70)

</div>






</div>



---

<div class="static function ">

## Two.Gradient.FlagStops













<div class="description">

Cached method to let renderers know stops have been updated on a [Two.Gradient](/documentation/gradient).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L118)

</div>






</div>



---

<div class="static function ">

## Two.Gradient.BindVertices













<div class="description">

Cached method to let [Two.Gradient](/documentation/gradient) know vertices have been added to the instance.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L127)

</div>






</div>



---

<div class="static function ">

## Two.Gradient.UnbindStops













<div class="description">

Cached method to let [Two.Gradient](/documentation/gradient) know vertices have been removed from the instance.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L146)

</div>






</div>



---

<div class="instance member ">

## Two.Gradient.id








<div class="properties">

Session specific unique identifier.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L27)

</div>



<div class="tags">


::: tip nota-bene
In the [Two.SvgRenderer](/documentation/svgrenderer) change this to change the underlying SVG element's id too.
:::


</div>




</div>



---

<div class="instance member ">

## Two.Gradient.spread








<div class="properties">

Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L39)

</div>





<div class="see">

[https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute](https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute) for more information

</div>


</div>



---

<div class="instance member ">

## Two.Gradient.stops








<div class="properties">

An ordered list of [Two.Stop](/documentation/stop)s for rendering the gradient.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L46)

</div>






</div>



---

<div class="instance member ">

## Two.Gradient.Stop















<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L56)

</div>





<div class="see">

[Two.Stop](/documentation/stop)

</div>


</div>



---

<div class="instance function ">

## Two.Gradient.clone




<div class="returns">

__Returns__:



+ `Two.Gradient`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `parent`  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Gradient](/documentation/gradient) with the same properties of the current path.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L180)

</div>






</div>



---

<div class="instance function ">

## Two.Gradient.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the path.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/gradient.js#L207)

</div>






</div>


