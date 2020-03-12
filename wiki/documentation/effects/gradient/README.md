# Two.Stop






### Constructor


| Argument | Description |
| ---- | ----------- |
| `offset` | The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created. |
| `color` | The color of the stop. Default value flip flops from white to black as new stops are created. |
| `opacity` | The opacity value. Default value is 1, cannot be lower than 0. |



---

## Two.Stop#offset






The offset percentage of the stop represented as a zero-to-one value.











---

## Two.Stop#opacity






The alpha percentage of the stop represented as a zero-to-one value.











---

## Two.Stop#color






The color of the stop.











---

## Two.Stop.Index






The current index being referenced for calculating a stop's default offset value.











---

## Two.Stop.Properties






A list of properties that are on every {@link Two.Stop}.











---

## Two.Stop.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.Stop} to any object. Handy if you'd like to extend the {@link Two.Stop} class on a custom class.





---

## Two.Stop#clone


__Returns__:



+ `Two.Stop`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of {@link Two.Stop} with the same properties of the current path.





---

## Two.Stop#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.





---

## Two.Gradient








| Argument | Description |
| ---- | ----------- |
| `stops` | A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient. |


This is the base class for constructing different types of gradients with Two.js. The two common gradients are {@link Two.LinearGradient} and {@link Two.RadialGradient}.





---

## Two.Gradient#id






Session specific unique identifier.








::: tip nota-bene
In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
:::




---

## Two.Gradient#spread






Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.











---

## Two.Gradient#stops






An ordered list of {@link Two.Stop}s for rendering the gradient.











---

## Two.Gradient#Stop
















---

## Two.Gradient.Properties






A list of properties that are on every {@link Two.Gradient}.











---

## Two.Gradient.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.Gradient} to any object. Handy if you'd like to extend the {@link Two.Gradient} class on a custom class.





---

## Two.Gradient.FlagStops










Cached method to let renderers know stops have been updated on a {@link Two.Gradient}.





---

## Two.Gradient.BindVertices










Cached method to let {@link Two.Gradient} know vertices have been added to the instance.





---

## Two.Gradient.UnbindStops










Cached method to let {@link Two.Gradient} know vertices have been removed from the instance.





---

## Two.Gradient#clone


__Returns__:



+ `Two.Gradient`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of {@link Two.Gradient} with the same properties of the current path.





---

## Two.Gradient#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.




