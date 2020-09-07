# Two.LinearGradient


__Extends__: `Two.Gradient`





### Constructor


| Argument | Description |
| ---- | ----------- |
| `x1` | The x position of the first end point of the linear gradient. |
| `y1` | The y position of the first end point of the linear gradient. |
| `x2` | The x position of the second end point of the linear gradient. |
| `y2` | The y position of the second end point of the linear gradient. |
| `stops` | A list of [Two.Stop](/documentation/stop)s that contain the gradient fill pattern for the gradient. |



---

<div class="static">

## Two.LinearGradient.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.LinearGradient](/documentation/lineargradient) to any object. Handy if you'd like to extend the [Two.LinearGradient](/documentation/lineargradient) class on a custom class.



</div>



---

<div class="static">

## Two.LinearGradient.FlagEndPoints










Cached method to let renderers know end points have been updated on a [Two.LinearGradient](/documentation/lineargradient).



</div>



---

<div class="instance">

## Two.LinearGradient.left






The x and y value for where the first end point is placed on the canvas.









</div>



---

<div class="instance">

## Two.LinearGradient.right






The x and y value for where the second end point is placed on the canvas.









</div>



---

<div class="instance">

## Two.LinearGradient.Stop














</div>



---

<div class="instance">

## Two.LinearGradient.clone


__Returns__:



+ `Two.Gradient`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of [Two.LinearGradient](/documentation/lineargradient) with the same properties of the current path.



</div>



---

<div class="instance">

## Two.LinearGradient.toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.



</div>


