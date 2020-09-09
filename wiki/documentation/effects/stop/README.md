# Two.Stop






### Constructor


| Argument | Description |
| ---- | ----------- |
| `offset` | The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created. |
| `color` | The color of the stop. Default value flip flops from white to black as new stops are created. |
| `opacity` | The opacity value. Default value is 1, cannot be lower than 0. |



---

<div class="static ">

## Two.Stop.Index








<div class="properties">

The current index being referenced for calculating a stop's default offset value.

</div>











</div>



---

<div class="static ">

## Two.Stop.Properties








<div class="properties">

A list of properties that are on every [Two.Stop](/documentation/stop).

</div>











</div>



---

<div class="static ">

## Two.Stop.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Stop](/documentation/stop) to any object. Handy if you'd like to extend the [Two.Stop](/documentation/stop) class on a custom class.

</div>






</div>



---

<div class="instance ">

## Two.Stop.offset








<div class="properties">

The offset percentage of the stop represented as a zero-to-one value.

</div>











</div>



---

<div class="instance ">

## Two.Stop.opacity








<div class="properties">

The alpha percentage of the stop represented as a zero-to-one value.

</div>











</div>



---

<div class="instance ">

## Two.Stop.color








<div class="properties">

The color of the stop.

</div>











</div>



---

<div class="instance ">

## Two.Stop.clone




<div class="returns">

__Returns__:



+ `Two.Stop`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Stop](/documentation/stop) with the same properties of the current path.

</div>






</div>



---

<div class="instance ">

## Two.Stop.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the path.

</div>






</div>


