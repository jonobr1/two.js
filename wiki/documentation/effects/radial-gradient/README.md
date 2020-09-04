# Two.RadialGradient


__Extends__: `Two.Gradient`





### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | The x position of the origin of the radial gradient. |
| `y` | The y position of the origin of the radial gradient. |
| `radius` | The radius of the radial gradient. |
| `stops` | A list of [Two.Stop](/documentation/stop)s that contain the gradient fill pattern for the gradient. |
| `focalX` | The x position of the focal point on the radial gradient. |
| `focalY` | The y position of the focal point on the radial gradient. |



---

<div class="instance">

## Two.RadialGradient.center






The x and y value for where the origin of the radial gradient is.









</div>



---

<div class="instance">

## Two.RadialGradient.focal






The x and y value for where the focal point of the radial gradient is.








::: tip nota-bene
This effects the spray or spread of the radial gradient.
:::


</div>



---

<div class="instance">

## Two.RadialGradient.Stop














</div>



---

<div class="static">

## Two.RadialGradient.Properties






A list of properties that are on every [Two.RadialGradient](/documentation/radialgradient).









</div>



---

<div class="static">

## Two.RadialGradient.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.RadialGradient](/documentation/radialgradient) to any object. Handy if you'd like to extend the [Two.RadialGradient](/documentation/radialgradient) class on a custom class.



</div>



---

<div class="instance">

## Two.RadialGradient.clone


__Returns__:



+ `Two.Gradient`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of [Two.RadialGradient](/documentation/radialgradient) with the same properties of the current path.



</div>



---

<div class="instance">

## Two.RadialGradient.toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.



</div>


