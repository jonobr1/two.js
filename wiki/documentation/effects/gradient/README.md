# Two.Stop






### Constructor


| Argument | Description |
| ---- | ----------- |
| `offset` | The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created. |
| `color` | The color of the stop. Default value flip flops from white to black as new stops are created. |
| `opacity` | The opacity value. Default value is 1, cannot be lower than 0. |



---

<div class="instance">

## Two.Stop.offset






The offset percentage of the stop represented as a zero-to-one value.









</div>



---

<div class="instance">

## Two.Stop.opacity






The alpha percentage of the stop represented as a zero-to-one value.









</div>



---

<div class="instance">

## Two.Stop.color






The color of the stop.









</div>



---

<div class="static">

## Two.Stop.Index






The current index being referenced for calculating a stop's default offset value.









</div>



---

<div class="static">

## Two.Stop.Properties






A list of properties that are on every [Two.Stop](/documentation/stop).









</div>



---

<div class="static">

## Two.Stop.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.Stop](/documentation/stop) to any object. Handy if you'd like to extend the {@link Two.Stop} class on a custom class.



</div>



---

<div class="instance">

## Two.Stop.clone


__Returns__:



+ `Two.Stop`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of [Two.Stop](/documentation/stop) with the same properties of the current path.



</div>



---

<div class="instance">

## Two.Stop.toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.



</div>



---

<div class="static">

## Two.Gradient








| Argument | Description |
| ---- | ----------- |
| `stops` | A list of [Two.Stop](/documentation/stop)s that contain the gradient fill pattern for the gradient. |


This is the base class for constructing different types of gradients with Two.js. The two common gradients are [Two.LinearGradient](/documentation/lineargradient) and {@link Two.RadialGradient}.



</div>



---

<div class="instance">

## Two.Gradient.id






Session specific unique identifier.








::: tip nota-bene
In the [Two.SvgRenderer](/documentation/svgrenderer) change this to change the underlying SVG element's id too.
:::


</div>



---

<div class="instance">

## Two.Gradient.spread






Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.









</div>



---

<div class="instance">

## Two.Gradient.stops






An ordered list of [Two.Stop](/documentation/stop)s for rendering the gradient.









</div>



---

<div class="instance">

## Two.Gradient.Stop














</div>



---

<div class="static">

## Two.Gradient.Properties






A list of properties that are on every [Two.Gradient](/documentation/gradient).









</div>



---

<div class="static">

## Two.Gradient.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.Gradient](/documentation/gradient) to any object. Handy if you'd like to extend the {@link Two.Gradient} class on a custom class.



</div>



---

<div class="static">

## Two.Gradient.FlagStops










Cached method to let renderers know stops have been updated on a [Two.Gradient](/documentation/gradient).



</div>



---

<div class="static">

## Two.Gradient.BindVertices










Cached method to let [Two.Gradient](/documentation/gradient) know vertices have been added to the instance.



</div>



---

<div class="static">

## Two.Gradient.UnbindStops










Cached method to let [Two.Gradient](/documentation/gradient) know vertices have been removed from the instance.



</div>



---

<div class="instance">

## Two.Gradient.clone


__Returns__:



+ `Two.Gradient`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of [Two.Gradient](/documentation/gradient) with the same properties of the current path.



</div>



---

<div class="instance">

## Two.Gradient.toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.



</div>


