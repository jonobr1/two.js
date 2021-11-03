---
pageClass: documentation-class
---

# Two.LinearGradient


<div class="extends">

__Extends__: [Two.Gradient](/documentation/effects/gradient/)

</div>





<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/linear-gradient.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `x1`  | The x position of the first end point of the linear gradient. |
|  `y1`  | The y position of the first end point of the linear gradient. |
|  `x2`  | The x position of the second end point of the linear gradient. |
|  `y2`  | The y position of the second end point of the linear gradient. |
|  `stops`  | A list of [Two.Stop](/documentation/stop)s that contain the gradient fill pattern for the gradient. |



---

<div class="static member ">

## Stop
<span class="longname">Two.LinearGradient.Stop</span>















<div class="meta">

  [linear-gradient.js:55](https://github.com/jonobr1/two.js/blob/dev/src/effects/linear-gradient.js#L55)

</div>





<div class="see">

[Two.Stop](/documentation/stop)

</div>


</div>



---

<div class="static function ">

## MakeObservable
<span class="longname">Two.LinearGradient.MakeObservable</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `object`  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.LinearGradient](/documentation/lineargradient) to any object. Handy if you'd like to extend the [Two.LinearGradient](/documentation/lineargradient) class on a custom class.

</div>



<div class="meta">

  [linear-gradient.js:61](https://github.com/jonobr1/two.js/blob/dev/src/effects/linear-gradient.js#L61)

</div>






</div>



---

<div class="static function ">

## FlagEndPoints
<span class="longname">Two.LinearGradient.FlagEndPoints</span>













<div class="description">

Cached method to let renderers know end points have been updated on a [Two.LinearGradient](/documentation/lineargradient).

</div>



<div class="meta">

  [linear-gradient.js:71](https://github.com/jonobr1/two.js/blob/dev/src/effects/linear-gradient.js#L71)

</div>






</div>



---

<div class="instance member ">

## left
<span class="longname">Two.LinearGradient.left</span>








<div class="properties">

The x and y value for where the first end point is placed on the canvas.

</div>








<div class="meta">

  [linear-gradient.js:27](https://github.com/jonobr1/two.js/blob/dev/src/effects/linear-gradient.js#L27)

</div>






</div>



---

<div class="instance member ">

## right
<span class="longname">Two.LinearGradient.right</span>








<div class="properties">

The x and y value for where the second end point is placed on the canvas.

</div>








<div class="meta">

  [linear-gradient.js:32](https://github.com/jonobr1/two.js/blob/dev/src/effects/linear-gradient.js#L32)

</div>






</div>



---

<div class="instance function ">

## clone
<span class="longname">Two.LinearGradient.clone</span>




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

Create a new instance of [Two.LinearGradient](/documentation/lineargradient) with the same properties of the current path.

</div>



<div class="meta">

  [linear-gradient.js:93](https://github.com/jonobr1/two.js/blob/dev/src/effects/linear-gradient.js#L93)

</div>






</div>



---

<div class="instance function ">

## toObject
<span class="longname">Two.LinearGradient.toObject</span>




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the path.

</div>



<div class="meta">

  [linear-gradient.js:121](https://github.com/jonobr1/two.js/blob/dev/src/effects/linear-gradient.js#L121)

</div>






</div>


