---
pageClass: documentation-class
---

# Two.RadialGradient


<div class="extends">

__Extends__: `Two.Gradient`

</div>





<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/radial-gradient.js#L9)

</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `x`  | The x position of the origin of the radial gradient. |
|  `y`  | The y position of the origin of the radial gradient. |
|  `radius`  | The radius of the radial gradient. |
|  `stops`  | A list of [Two.Stop](/documentation/stop)s that contain the gradient fill pattern for the gradient. |
|  `focalX`  | The x position of the focal point on the radial gradient. |
|  `focalY`  | The y position of the focal point on the radial gradient. |



---

<div class="static member ">

## Two.RadialGradient.Properties








<div class="properties">

A list of properties that are on every [Two.RadialGradient](/documentation/radialgradient).

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/radial-gradient.js#L74)

</div>






</div>



---

<div class="static function ">

## Two.RadialGradient.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `object`  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.RadialGradient](/documentation/radialgradient) to any object. Handy if you'd like to extend the [Two.RadialGradient](/documentation/radialgradient) class on a custom class.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/radial-gradient.js#L82)

</div>






</div>



---

<div class="instance member ">

## Two.RadialGradient.center








<div class="properties">

The x and y value for where the origin of the radial gradient is.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/radial-gradient.js#L27)

</div>






</div>



---

<div class="instance member ">

## Two.RadialGradient.focal








<div class="properties">

The x and y value for where the focal point of the radial gradient is.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/radial-gradient.js#L38)

</div>



<div class="tags">


::: tip nota-bene
This effects the spray or spread of the radial gradient.
:::


</div>




</div>



---

<div class="instance member ">

## Two.RadialGradient.Stop















<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/radial-gradient.js#L68)

</div>





<div class="see">

[Two.Stop](/documentation/stop)

</div>


</div>



---

<div class="instance function ">

## Two.RadialGradient.clone




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

Create a new instance of [Two.RadialGradient](/documentation/radialgradient) with the same properties of the current path.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/radial-gradient.js#L121)

</div>






</div>



---

<div class="instance function ">

## Two.RadialGradient.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the path.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/radial-gradient.js#L149)

</div>






</div>


