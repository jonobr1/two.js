---
pageClass: documentation-class
---

# Two.Vector



A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/vector.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `x`  | Any number to represent the horizontal x-component of the vector. |
|  `y`  | Any number to represent the vertical y-component of the vector. |



---

<div class="static member ">

## zero
<span class="longname">Two.Vector.zero</span>








<div class="properties">

Handy reference to a vector with component values 0, 0 at all times.

</div>








<div class="meta">

  [vector.js:29](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L29)

</div>






</div>



---

<div class="static function ">

## add
<span class="longname">Two.Vector.add</span>




<div class="returns">

__Returns__:



+ `Two.Vector`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v1`  |  |
|  `v2`  |  |
</div>




<div class="description">

Add two vectors together.

</div>



<div class="meta">

  [vector.js:36](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L36)

</div>






</div>



---

<div class="static function ">

## sub
<span class="longname">Two.Vector.sub</span>




<div class="returns">

__Returns__:



+ `Two.Vector`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v1`  |  |
|  `v2`  |  |
</div>




<div class="description">

Subtract two vectors: `v2` from `v1`.

</div>



<div class="meta">

  [vector.js:48](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L48)

</div>






</div>



---

<div class="static function ">

## subtract
<span class="longname">Two.Vector.subtract</span>













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector/#two-vector-sub).

</div>



<div class="meta">

  [vector.js:60](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L60)

</div>






</div>



---

<div class="static function ">

## ratioBetween
<span class="longname">Two.Vector.ratioBetween</span>




<div class="returns">

__Returns__:



+ `Number`



The ratio betwen two points `v1` and `v2`.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `A`  |  |
|  `B`  |  |
</div>






<div class="meta">

  [vector.js:69](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L69)

</div>






</div>



---

<div class="static function ">

## angleBetween
<span class="longname">Two.Vector.angleBetween</span>




<div class="returns">

__Returns__:



+ `Number`



The angle between points `v1` and `v2`.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v1`  |  |
|  `v2`  |  |
</div>






<div class="meta">

  [vector.js:82](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L82)

</div>






</div>



---

<div class="static function ">

## distanceBetween
<span class="longname">Two.Vector.distanceBetween</span>




<div class="returns">

__Returns__:



+ `Number`



The distance between points `v1` and `v2`. Distance is always positive.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v1`  |  |
|  `v2`  |  |
</div>






<div class="meta">

  [vector.js:109](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L109)

</div>






</div>



---

<div class="static function ">

## distanceBetweenSquared
<span class="longname">Two.Vector.distanceBetweenSquared</span>




<div class="returns">

__Returns__:



+ `Number`



The squared distance between points `v1` and `v2`.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v1`  |  |
|  `v2`  |  |
</div>






<div class="meta">

  [vector.js:122](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L122)

</div>






</div>



---

<div class="static function ">

## MakeObservable
<span class="longname">Two.Vector.MakeObservable</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `object`  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Vector](/documentation/vector) to any object. Handy if you'd like to extend the [Two.Vector](/documentation/vector) class on a custom class.

</div>



<div class="meta">

  [vector.js:138](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L138)

</div>






</div>



---

<div class="instance member ">

## x
<span class="longname">Two.Vector.x</span>








<div class="properties">

The horizontal x-component of the vector.

</div>








<div class="meta">

  [vector.js:13](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L13)

</div>






</div>



---

<div class="instance member ">

## y
<span class="longname">Two.Vector.y</span>








<div class="properties">

The vertical y-component of the vector.

</div>








<div class="meta">

  [vector.js:19](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L19)

</div>






</div>



---

<div class="instance function ">

## set
<span class="longname">Two.Vector.set</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
</div>




<div class="description">

Set the x / y components of a vector to specific number values.

</div>



<div class="meta">

  [vector.js:177](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L177)

</div>






</div>



---

<div class="instance function ">

## copy
<span class="longname">Two.Vector.copy</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  |  |
</div>




<div class="description">

Copy the x / y components of another object `v`.

</div>



<div class="meta">

  [vector.js:190](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L190)

</div>






</div>



---

<div class="instance function ">

## clear
<span class="longname">Two.Vector.clear</span>













<div class="description">

Set the x / y component values of the vector to zero.

</div>



<div class="meta">

  [vector.js:202](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L202)

</div>






</div>



---

<div class="instance function ">

## clone
<span class="longname">Two.Vector.clone</span>













<div class="description">

Create a new vector and copy the existing values onto the newly created instance.

</div>



<div class="meta">

  [vector.js:213](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L213)

</div>






</div>



---

<div class="instance function overloaded">

## add
<span class="longname">Two.Vector.add</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  |  |
</div>




<div class="description">

Add an object with x / y component values to the instance.

</div>



<div class="meta">

  [vector.js:222](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L222)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## add
<span class="longname">Two.Vector.add</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  |  |
</div>




<div class="description">

Add the **same** number to both x / y component values of the instance.

</div>



<div class="meta">

  [vector.js:230](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L230)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## add
<span class="longname">Two.Vector.add</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
</div>




<div class="description">

Add `x` / `y` values to their respective component value on the instance.

</div>



<div class="meta">

  [vector.js:238](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L238)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function ">

## addSelf
<span class="longname">Two.Vector.addSelf</span>













<div class="description">

Alias for [Two.Vector.add](/documentation/vector/#two-vector-add).

</div>



<div class="meta">

  [vector.js:264](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L264)

</div>






</div>



---

<div class="instance function overloaded">

## sub
<span class="longname">Two.Vector.sub</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  |  |
</div>




<div class="description">

Subtract an object with x / y component values to the instance.

</div>



<div class="meta">

  [vector.js:273](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L273)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## sub
<span class="longname">Two.Vector.sub</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  |  |
</div>




<div class="description">

Subtract the **same** number to both x / y component values of the instance.

</div>



<div class="meta">

  [vector.js:281](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L281)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## sub
<span class="longname">Two.Vector.sub</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
</div>




<div class="description">

Subtract `x` / `y` values to their respective component value on the instance.

</div>



<div class="meta">

  [vector.js:289](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L289)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function ">

## subtract
<span class="longname">Two.Vector.subtract</span>













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector/#two-vector-sub).

</div>



<div class="meta">

  [vector.js:315](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L315)

</div>






</div>



---

<div class="instance function ">

## subSelf
<span class="longname">Two.Vector.subSelf</span>













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector/#two-vector-sub).

</div>



<div class="meta">

  [vector.js:324](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L324)

</div>






</div>



---

<div class="instance function ">

## subtractSelf
<span class="longname">Two.Vector.subtractSelf</span>













<div class="description">

Alias for [Two.Vector.sub](/documentation/vector/#two-vector-sub).

</div>



<div class="meta">

  [vector.js:333](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L333)

</div>






</div>



---

<div class="instance function overloaded">

## multiply
<span class="longname">Two.Vector.multiply</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  |  |
</div>




<div class="description">

Multiply an object with x / y component values to the instance.

</div>



<div class="meta">

  [vector.js:342](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L342)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## multiply
<span class="longname">Two.Vector.multiply</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  |  |
</div>




<div class="description">

Multiply the **same** number to both x / y component values of the instance.

</div>



<div class="meta">

  [vector.js:350](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L350)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## multiply
<span class="longname">Two.Vector.multiply</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
</div>




<div class="description">

Multiply `x` / `y` values to their respective component value on the instance.

</div>



<div class="meta">

  [vector.js:358](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L358)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function ">

## multiplySelf
<span class="longname">Two.Vector.multiplySelf</span>













<div class="description">

Alias for [Two.Vector.multiply](/documentation/vector/#two-vector-multiply).

</div>



<div class="meta">

  [vector.js:384](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L384)

</div>






</div>



---

<div class="instance function ">

## multiplyScalar
<span class="longname">Two.Vector.multiplyScalar</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `s`  | The scalar to multiply by. |
</div>




<div class="description">

Mulitiply the vector by a single number. Shorthand to call [Two.Vector.multiply](/documentation/vector/#two-vector-multiply) directly.

</div>



<div class="meta">

  [vector.js:393](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L393)

</div>






</div>



---

<div class="instance function overloaded">

## divide
<span class="longname">Two.Vector.divide</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  |  |
</div>




<div class="description">

Divide an object with x / y component values to the instance.

</div>



<div class="meta">

  [vector.js:403](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L403)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## divide
<span class="longname">Two.Vector.divide</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  |  |
</div>




<div class="description">

Divide the **same** number to both x / y component values of the instance.

</div>



<div class="meta">

  [vector.js:411](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L411)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## divide
<span class="longname">Two.Vector.divide</span>


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
</div>




<div class="description">

Divide `x` / `y` values to their respective component value on the instance.

</div>



<div class="meta">

  [vector.js:419](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L419)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function ">

## divideSelf
<span class="longname">Two.Vector.divideSelf</span>













<div class="description">

Alias for [Two.Vector.divide](/documentation/vector/#two-vector-divide).

</div>



<div class="meta">

  [vector.js:451](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L451)

</div>






</div>



---

<div class="instance function ">

## divideScalar
<span class="longname">Two.Vector.divideScalar</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `s`  | The scalar to divide by. |
</div>




<div class="description">

Divide the vector by a single number. Shorthand to call [Two.Vector.divide](/documentation/vector/#two-vector-divide) directly.

</div>



<div class="meta">

  [vector.js:460](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L460)

</div>






</div>



---

<div class="instance function ">

## negate
<span class="longname">Two.Vector.negate</span>













<div class="description">

Invert each component's sign value.

</div>



<div class="meta">

  [vector.js:470](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L470)

</div>






</div>



---

<div class="instance function ">

## negate
<span class="longname">Two.Vector.negate</span>




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.

</div>



<div class="meta">

  [vector.js:479](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L479)

</div>






</div>



---

<div class="instance function ">

## length
<span class="longname">Two.Vector.length</span>




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the length of a vector.

</div>



<div class="meta">

  [vector.js:489](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L489)

</div>






</div>



---

<div class="instance function ">

## lengthSquared
<span class="longname">Two.Vector.lengthSquared</span>




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the length of the vector to the power of two. Widely used as less expensive than [Two.Vector.length](/documentation/vector/#two-vector-length), because it isn't square-rooting any numbers.

</div>



<div class="meta">

  [vector.js:499](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L499)

</div>






</div>



---

<div class="instance function ">

## normalize
<span class="longname">Two.Vector.normalize</span>













<div class="description">

Normalize the vector from negative one to one.

</div>



<div class="meta">

  [vector.js:509](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L509)

</div>






</div>



---

<div class="instance function ">

## distanceTo
<span class="longname">Two.Vector.distanceTo</span>




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the distance between two vectors.

</div>



<div class="meta">

  [vector.js:518](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L518)

</div>






</div>



---

<div class="instance function ">

## distanceToSquared
<span class="longname">Two.Vector.distanceToSquared</span>




<div class="returns">

__Returns__:



+ `Number`




</div>










<div class="description">

Get the distance between two vectors to the power of two. Widely used as less expensive than [Two.Vector.distanceTo](/documentation/vector/#two-vector-distanceto), because it isn't square-rooting any numbers.

</div>



<div class="meta">

  [vector.js:528](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L528)

</div>






</div>



---

<div class="instance function ">

## setLength
<span class="longname">Two.Vector.setLength</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `l`  | length to set vector to. |
</div>




<div class="description">

Set the length of a vector.

</div>



<div class="meta">

  [vector.js:540](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L540)

</div>






</div>



---

<div class="instance function ">

## equals
<span class="longname">Two.Vector.equals</span>




<div class="returns">

__Returns__:



+ `Boolean`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  | The vector to compare against. |
|  `eps`  | An options epsilon for precision. |
</div>




<div class="description">

Qualify if one vector roughly equal another. With a margin of error defined by epsilon.

</div>



<div class="meta">

  [vector.js:550](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L550)

</div>






</div>



---

<div class="instance function ">

## lerp
<span class="longname">Two.Vector.lerp</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `v`  | The destination vector to step towards. |
|  `t`  | The zero to one value of how close the current vector gets to the destination vector. |
</div>




<div class="description">

Linear interpolate one vector to another by an amount `t` defined as a zero to one number.

</div>



<div class="meta">

  [vector.js:563](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L563)

</div>





<div class="see">

[Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.

</div>


</div>



---

<div class="instance function ">

## isZero
<span class="longname">Two.Vector.isZero</span>




<div class="returns">

__Returns__:



+ `Boolean`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `eps`  | Optional precision amount to check against. |
</div>




<div class="description">

Check to see if vector is roughly zero, based on the `epsilon` precision value.

</div>



<div class="meta">

  [vector.js:577](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L577)

</div>






</div>



---

<div class="instance function ">

## toString
<span class="longname">Two.Vector.toString</span>




<div class="returns">

__Returns__:



+ `String`




</div>










<div class="description">

Return a comma-separated string of x, y value. Great for storing in a database.

</div>



<div class="meta">

  [vector.js:589](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L589)

</div>






</div>



---

<div class="instance function ">

## toObject
<span class="longname">Two.Vector.toObject</span>




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the vector.

</div>



<div class="meta">

  [vector.js:599](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L599)

</div>






</div>



---

<div class="instance function ">

## rotate
<span class="longname">Two.Vector.rotate</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `Number`  | The amoun to rotate the vector by. |
</div>




<div class="description">

Rotate a vector.

</div>



<div class="meta">

  [vector.js:609](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L609)

</div>






</div>


