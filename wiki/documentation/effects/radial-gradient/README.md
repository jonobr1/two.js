# Two.RadialGradient


__Extends__: `Two.Gradient`





### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | The x position of the origin of the radial gradient. |
| `y` | The y position of the origin of the radial gradient. |
| `radius` | The radius of the radial gradient. |
| `stops` | A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient. |
| `focalX` | The x position of the focal point on the radial gradient. |
| `focalY` | The y position of the focal point on the radial gradient. |



---

## Two.RadialGradient#center






The x and y value for where the origin of the radial gradient is.











---

## Two.RadialGradient#focal






The x and y value for where the focal point of the radial gradient is.








::: tip nota-bene
This effects the spray or spread of the radial gradient.
:::




---

## Two.RadialGradient#Stop
















---

## Two.RadialGradient.Properties






A list of properties that are on every {@link Two.RadialGradient}.











---

## Two.RadialGradient.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.RadialGradient} to any object. Handy if you'd like to extend the {@link Two.RadialGradient} class on a custom class.





---

## Two.RadialGradient#clone


__Returns__:



+ `Two.Gradient`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of {@link Two.RadialGradient} with the same properties of the current path.





---

## Two.RadialGradient#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.




