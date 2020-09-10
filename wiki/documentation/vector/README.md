# Two.Vector



A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L4)

</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | Any number to represent the horizontal x-component of the vector. |
| `y` | Any number to represent the vertical y-component of the vector. |



---

<div class="static member ">

## Two.Vector.zero








<div class="properties">

Handy reference to a vector with component values 0, 0 at all times.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L29)

</div>






</div>



---

<div class="static function ">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L36)

</div>






</div>



---

<div class="static function ">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L48)

</div>






</div>



---

<div class="static function ">

## Two.Vector.subtract













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L60)

</div>






</div>



---

<div class="static function ">

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






<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L69)

</div>






</div>



---

<div class="static function ">

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






<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L82)

</div>






</div>



---

<div class="static function ">

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






<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L109)

</div>






</div>



---

<div class="static function ">

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






<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L122)

</div>






</div>



---

<div class="static function ">

## Two.Vector.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Vector](/documentation/vector) to any object. Handy if you'd like to extend the [Two.Vector](/documentation/vector) class on a custom class.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L138)

</div>






</div>



---

<div class="instance member ">

## Two.Vector.x








<div class="properties">

The horizontal x-component of the vector.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L13)

</div>






</div>



---

<div class="instance member ">

## Two.Vector.y








<div class="properties">

The vertical y-component of the vector.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L19)

</div>






</div>



---

<div class="instance function ">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L177)

</div>






</div>



---

<div class="instance function ">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L191)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.clear




<div class="returns">

__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.


</div>










<div class="description">

Set the x / y component values of the vector to zero.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L204)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.clone




<div class="returns">

__Returns__:



+ `Two.Vector`



- A new instance of [Two.Vector](/documentation/vector).


</div>










<div class="description">

Create a new vector and copy the existing values onto the newly created instance.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L216)

</div>






</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L226)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L235)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L244)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function ">

## Two.Vector.addSelf













<div class="description">

Alias for [Two.Vector.add](/documentation/vector#two-vector-add).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L271)

</div>






</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L280)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L289)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L298)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function ">

## Two.Vector.subtract













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L325)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.subSelf













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L334)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.subtractSelf













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L343)

</div>






</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L352)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L361)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L370)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function ">

## Two.Vector.multiplySelf













<div class="description">

Alias for [Two.Vector.multiply](/documentation/vector#two-vector-multiply).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L397)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.multiplyScalar










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `s` | The scalar to multiply by. |
</div>




<div class="description">

Mulitiply the vector by a single number. Shorthand to call [Two.Vector.multiply](/documentation/vector#two-vector-multiply) directly.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L406)

</div>






</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L416)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L425)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L434)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function ">

## Two.Vector.divideSelf













<div class="description">

Alias for [Two.Vector.divide](/documentation/vector#two-vector-divide).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L467)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.divideScalar










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `s` | The scalar to divide by. |
</div>




<div class="description">

Divide the vector by a single number. Shorthand to call [Two.Vector.divide](/documentation/vector#two-vector-divide) directly.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L476)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.negate













<div class="description">

Invert each component's sign value.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L486)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.negate




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L495)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.length




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the length of a vector.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L505)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.lengthSquared




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the length of the vector to the power of two. Widely used as less expensive than [Two.Vector.length](/documentation/vector#two-vector-length), because it isn't square-rooting any numbers.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L515)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.normalize













<div class="description">

Normalize the vector from negative one to one.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L525)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.distanceTo




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the distance between two vectors.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L534)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.distanceToSquared




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the distance between two vectors to the power of two. Widely used as less expensive than [Two.Vector.distanceTo](/documentation/vector#two-vector-distanceto), because it isn't square-rooting any numbers.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L544)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.setLength










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `l` | length to set vector to. |
</div>




<div class="description">

Set the length of a vector.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L556)

</div>






</div>



---

<div class="instance function ">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L566)

</div>






</div>



---

<div class="instance function ">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L579)

</div>





<div class="see">

[Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.

</div>


</div>



---

<div class="instance function ">

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



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L593)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.toString




<div class="returns">

__Returns__:



+ `String`




</div>










<div class="description">

Return a comma-separated string of x, y value. Great for storing in a database.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L605)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the vector.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L615)

</div>






</div>



---

<div class="instance function ">

## Two.Vector.rotate










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `radians` | The amoun to rotate the vector by. |
</div>




<div class="description">

Rotate a vector.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L625)

</div>






</div>


