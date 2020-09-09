# Two.Vector



A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | Any number to represent the horizontal x-component of the vector. |
| `y` | Any number to represent the vertical y-component of the vector. |



---

<div class="static ">

## Two.Vector.zero








<div class="properties">

Handy reference to a vector with component values 0, 0 at all times.

</div>











</div>



---

<div class="static ">

## Two.Vector.add




<div class="returns">

__Returns__:



+ `Two.Vector`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |
</div>




<div class="description">

Add two vectors together.

</div>






</div>



---

<div class="static ">

## Two.Vector.sub




<div class="returns">

__Returns__:



+ `Two.Vector`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |
</div>




<div class="description">

Subtract two vectors: `v2` from `v1`.

</div>






</div>



---

<div class="static ">

## Two.Vector.subtract













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).

</div>






</div>



---

<div class="static ">

## Two.Vector.ratioBetween




<div class="returns">

__Returns__:



+ `Number`



The ratio betwen two points `v1` and `v2`.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `A` |  |
| `B` |  |
</div>









</div>



---

<div class="static ">

## Two.Vector.angleBetween




<div class="returns">

__Returns__:



+ `Radians`



The angle between points `v1` and `v2`.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |
</div>









</div>



---

<div class="static ">

## Two.Vector.distanceBetween




<div class="returns">

__Returns__:



+ `Number`



The distance between points `v1` and `v2`. Distance is always positive.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |
</div>









</div>



---

<div class="static ">

## Two.Vector.distanceBetweenSquared




<div class="returns">

__Returns__:



+ `Number`



The squared distance between points `v1` and `v2`.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |
</div>









</div>



---

<div class="static ">

## Two.Vector.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Vector](/documentation/vector) to any object. Handy if you'd like to extend the [Two.Vector](/documentation/vector) class on a custom class.

</div>






</div>



---

<div class="instance ">

## Two.Vector.x








<div class="properties">

The horizontal x-component of the vector.

</div>











</div>



---

<div class="instance ">

## Two.Vector.y








<div class="properties">

The vertical y-component of the vector.

</div>











</div>



---

<div class="instance ">

## Two.Vector.set




<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
</div>




<div class="description">

Set the x / y components of a vector to specific number values.

</div>






</div>



---

<div class="instance ">

## Two.Vector.copy




<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` |  |
</div>




<div class="description">

Copy the x / y components of another object `v`.

</div>






</div>



---

<div class="instance ">

## Two.Vector.clear




<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>










<div class="description">

Set the x / y component values of the vector to zero.

</div>






</div>



---

<div class="instance ">

## Two.Vector.clone




<div class="returns">

__Returns__:



+ `Two.Vector`



- A new instance of [Two.Vector](/documentation/vector).


</div>










<div class="description">

Create a new vector and copy the existing values onto the newly created instance.

</div>






</div>



---

<div class="instance overloaded">

## Two.Vector.add


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` |  |
</div>




<div class="description">

Add an object with x / y component values to the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance overloaded">

## Two.Vector.add


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` |  |
</div>




<div class="description">

Add the **same** number to both x / y component values of the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance overloaded">

## Two.Vector.add


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
</div>




<div class="description">

Add `x` / `y` values to their respective component value on the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance ">

## Two.Vector.addSelf













<div class="description">

Alias for [Two.Vector.add](/documentation/vector#two-vector-add).

</div>






</div>



---

<div class="instance overloaded">

## Two.Vector.sub


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` |  |
</div>




<div class="description">

Subtract an object with x / y component values to the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance overloaded">

## Two.Vector.sub


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` |  |
</div>




<div class="description">

Subtract the **same** number to both x / y component values of the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance overloaded">

## Two.Vector.sub


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
</div>




<div class="description">

Subtract `x` / `y` values to their respective component value on the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance ">

## Two.Vector.subtract













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).

</div>






</div>



---

<div class="instance ">

## Two.Vector.subSelf













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).

</div>






</div>



---

<div class="instance ">

## Two.Vector.subtractSelf













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).

</div>






</div>



---

<div class="instance overloaded">

## Two.Vector.multiply


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` |  |
</div>




<div class="description">

Multiply an object with x / y component values to the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance overloaded">

## Two.Vector.multiply


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` |  |
</div>




<div class="description">

Multiply the **same** number to both x / y component values of the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance overloaded">

## Two.Vector.multiply


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
</div>




<div class="description">

Multiply `x` / `y` values to their respective component value on the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance ">

## Two.Vector.multiplySelf













<div class="description">

Alias for [Two.Vector.multiply](/documentation/vector#two-vector-multiply).

</div>






</div>



---

<div class="instance ">

## Two.Vector.multiplyScalar










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `s` | The scalar to multiply by. |
</div>




<div class="description">

Mulitiply the vector by a single number. Shorthand to call [Two.Vector.multiply](/documentation/vector#two-vector-multiply) directly.

</div>






</div>



---

<div class="instance overloaded">

## Two.Vector.divide


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` |  |
</div>




<div class="description">

Divide an object with x / y component values to the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance overloaded">

## Two.Vector.divide


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` |  |
</div>




<div class="description">

Divide the **same** number to both x / y component values of the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance overloaded">

## Two.Vector.divide


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
</div>




<div class="description">

Divide `x` / `y` values to their respective component value on the instance.

</div>



<div class="tags">



</div>




</div>



---

<div class="instance ">

## Two.Vector.divideSelf













<div class="description">

Alias for [Two.Vector.divide](/documentation/vector#two-vector-divide).

</div>






</div>



---

<div class="instance ">

## Two.Vector.divideScalar










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `s` | The scalar to divide by. |
</div>




<div class="description">

Divide the vector by a single number. Shorthand to call [Two.Vector.divide](/documentation/vector#two-vector-divide) directly.

</div>






</div>



---

<div class="instance ">

## Two.Vector.negate













<div class="description">

Invert each component's sign value.

</div>






</div>



---

<div class="instance ">

## Two.Vector.negate




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.

</div>






</div>



---

<div class="instance ">

## Two.Vector.length




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the length of a vector.

</div>






</div>



---

<div class="instance ">

## Two.Vector.lengthSquared




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the length of the vector to the power of two. Widely used as less expensive than [Two.Vector.length](/documentation/vector#two-vector-length), because it isn't square-rooting any numbers.

</div>






</div>



---

<div class="instance ">

## Two.Vector.normalize













<div class="description">

Normalize the vector from negative one to one.

</div>






</div>



---

<div class="instance ">

## Two.Vector.distanceTo




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the distance between two vectors.

</div>






</div>



---

<div class="instance ">

## Two.Vector.distanceToSquared




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the distance between two vectors to the power of two. Widely used as less expensive than [Two.Vector.distanceTo](/documentation/vector#two-vector-distanceto), because it isn't square-rooting any numbers.

</div>






</div>



---

<div class="instance ">

## Two.Vector.setLength










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `l` | length to set vector to. |
</div>




<div class="description">

Set the length of a vector.

</div>






</div>



---

<div class="instance ">

## Two.Vector.equals




<div class="returns">

__Returns__:



+ `Boolean`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` | The vector to compare against. |
| `eps` | An options epsilon for precision. |
</div>




<div class="description">

Qualify if one vector roughly equal another. With a margin of error defined by epsilon.

</div>






</div>



---

<div class="instance ">

## Two.Vector.lerp










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` | The destination vector to step towards. |
| `t` | The zero to one value of how close the current vector gets to the destination vector. |
</div>




<div class="description">

Linear interpolate one vector to another by an amount `t` defined as a zero to one number.

</div>





<div class="see">

[Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.

</div>


</div>



---

<div class="instance ">

## Two.Vector.isZero




<div class="returns">

__Returns__:



+ `Boolean`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `eps` | Optional precision amount to check against. |
</div>




<div class="description">

Check to see if vector is roughly zero, based on the `epsilon` precision value.

</div>






</div>



---

<div class="instance ">

## Two.Vector.toString




<div class="returns">

__Returns__:



+ `String`




</div>










<div class="description">

Return a comma-separated string of x, y value. Great for storing in a database.

</div>






</div>



---

<div class="instance ">

## Two.Vector.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the vector.

</div>






</div>



---

<div class="instance ">

## Two.Vector.rotate










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `radians` | The amoun to rotate the vector by. |
</div>




<div class="description">

Rotate a vector.

</div>






</div>


