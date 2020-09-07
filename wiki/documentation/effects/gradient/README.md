# Two.Gradient



This is the base class for constructing different types of gradients with Two.js. The two common gradients are [Two.LinearGradient](/documentation/lineargradient) and [Two.RadialGradient](/documentation/radialgradient).


### Constructor


| Argument | Description |
| ---- | ----------- |
| `stops` | A list of [Two.Stop](/documentation/stop)s that contain the gradient fill pattern for the gradient. |



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


Convenience function to apply observable qualities of a [Two.Gradient](/documentation/gradient) to any object. Handy if you'd like to extend the [Two.Gradient](/documentation/gradient) class on a custom class.



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


