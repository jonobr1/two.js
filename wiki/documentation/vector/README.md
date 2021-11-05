---
pageClass: docs
---

# Two.Vector



A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/vector.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  x  | Any number to represent the horizontal x-component of the vector. |
|  y  | Any number to represent the vertical y-component of the vector. |



<div class="static member ">

## zero

<h2 class="longname" aria-hidden="true"><a href="#zero"><span class="prefix">Two.Vector.</span><span class="shortname">zero</span></a></h2>










<div class="properties">

Handy reference to a vector with component values 0, 0 at all times.

</div>








<div class="meta">

  [`vector.js:29`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L29)

</div>






</div>



<div class="static function ">

## add

<h2 class="longname" aria-hidden="true"><a href="#add"><span class="prefix">Two.Vector.</span><span class="shortname">add</span></a></h2>




<div class="returns">

__Returns__: Two.Vector



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v1  |  |
|  v2  |  |
</div>




<div class="description">

Add two vectors together.

</div>



<div class="meta">

  [`vector.js:36`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L36)

</div>






</div>



<div class="static function ">

## sub

<h2 class="longname" aria-hidden="true"><a href="#sub"><span class="prefix">Two.Vector.</span><span class="shortname">sub</span></a></h2>




<div class="returns">

__Returns__: Two.Vector



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v1  |  |
|  v2  |  |
</div>




<div class="description">

Subtract two vectors: `v2` from `v1`.

</div>



<div class="meta">

  [`vector.js:48`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L48)

</div>






</div>



<div class="static function ">

## subtract

<h2 class="longname" aria-hidden="true"><a href="#subtract"><span class="prefix">Two.Vector.</span><span class="shortname">subtract</span></a></h2>















<div class="description">

Alias for [Two.Vector.sub](/documentation/vector/#two-vector-sub).

</div>



<div class="meta">

  [`vector.js:60`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L60)

</div>






</div>



<div class="static function ">

## ratioBetween

<h2 class="longname" aria-hidden="true"><a href="#ratioBetween"><span class="prefix">Two.Vector.</span><span class="shortname">ratioBetween</span></a></h2>




<div class="returns">

__Returns__: Number


The ratio betwen two points `v1` and `v2`.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  A  |  |
|  B  |  |
</div>






<div class="meta">

  [`vector.js:69`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L69)

</div>






</div>



<div class="static function ">

## angleBetween

<h2 class="longname" aria-hidden="true"><a href="#angleBetween"><span class="prefix">Two.Vector.</span><span class="shortname">angleBetween</span></a></h2>




<div class="returns">

__Returns__: Number


The angle between points `v1` and `v2`.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v1  |  |
|  v2  |  |
</div>






<div class="meta">

  [`vector.js:82`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L82)

</div>






</div>



<div class="static function ">

## distanceBetween

<h2 class="longname" aria-hidden="true"><a href="#distanceBetween"><span class="prefix">Two.Vector.</span><span class="shortname">distanceBetween</span></a></h2>




<div class="returns">

__Returns__: Number


The distance between points `v1` and `v2`. Distance is always positive.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v1  |  |
|  v2  |  |
</div>






<div class="meta">

  [`vector.js:109`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L109)

</div>






</div>



<div class="static function ">

## distanceBetweenSquared

<h2 class="longname" aria-hidden="true"><a href="#distanceBetweenSquared"><span class="prefix">Two.Vector.</span><span class="shortname">distanceBetweenSquared</span></a></h2>




<div class="returns">

__Returns__: Number


The squared distance between points `v1` and `v2`.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v1  |  |
|  v2  |  |
</div>






<div class="meta">

  [`vector.js:122`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L122)

</div>






</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><a href="#MakeObservable"><span class="prefix">Two.Vector.</span><span class="shortname">MakeObservable</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Vector](/documentation/vector) to any object. Handy if you'd like to extend the [Two.Vector](/documentation/vector) class on a custom class.

</div>



<div class="meta">

  [`vector.js:138`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L138)

</div>






</div>



<div class="instance member ">

## x

<h2 class="longname" aria-hidden="true"><a href="#x"><span class="prefix">Two.Vector.</span><span class="shortname">x</span></a></h2>










<div class="properties">

The horizontal x-component of the vector.

</div>








<div class="meta">

  [`vector.js:13`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L13)

</div>






</div>



<div class="instance member ">

## y

<h2 class="longname" aria-hidden="true"><a href="#y"><span class="prefix">Two.Vector.</span><span class="shortname">y</span></a></h2>










<div class="properties">

The vertical y-component of the vector.

</div>








<div class="meta">

  [`vector.js:19`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L19)

</div>






</div>



<div class="instance function ">

## set

<h2 class="longname" aria-hidden="true"><a href="#set"><span class="prefix">Two.Vector.</span><span class="shortname">set</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
</div>




<div class="description">

Set the x / y components of a vector to specific number values.

</div>



<div class="meta">

  [`vector.js:177`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L177)

</div>






</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Vector.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  |  |
</div>




<div class="description">

Copy the x / y components of another object `v`.

</div>



<div class="meta">

  [`vector.js:190`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L190)

</div>






</div>



<div class="instance function ">

## clear

<h2 class="longname" aria-hidden="true"><a href="#clear"><span class="prefix">Two.Vector.</span><span class="shortname">clear</span></a></h2>















<div class="description">

Set the x / y component values of the vector to zero.

</div>



<div class="meta">

  [`vector.js:202`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L202)

</div>






</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Vector.</span><span class="shortname">clone</span></a></h2>















<div class="description">

Create a new vector and copy the existing values onto the newly created instance.

</div>



<div class="meta">

  [`vector.js:213`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L213)

</div>






</div>



<div class="instance function overloaded">

## add

<h2 class="longname" aria-hidden="true"><a href="#add"><span class="prefix">Two.Vector.</span><span class="shortname">add</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  |  |
</div>




<div class="description">

Add an object with x / y component values to the instance.

</div>



<div class="meta">

  [`vector.js:222`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L222)

</div>



<div class="tags">



</div>




</div>



<div class="instance function overloaded">

## add

<h2 class="longname" aria-hidden="true"><a href="#add"><span class="prefix">Two.Vector.</span><span class="shortname">add</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  |  |
</div>




<div class="description">

Add the **same** number to both x / y component values of the instance.

</div>



<div class="meta">

  [`vector.js:230`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L230)

</div>



<div class="tags">



</div>




</div>



<div class="instance function overloaded">

## add

<h2 class="longname" aria-hidden="true"><a href="#add"><span class="prefix">Two.Vector.</span><span class="shortname">add</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
</div>




<div class="description">

Add `x` / `y` values to their respective component value on the instance.

</div>



<div class="meta">

  [`vector.js:238`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L238)

</div>



<div class="tags">



</div>




</div>



<div class="instance function ">

## addSelf

<h2 class="longname" aria-hidden="true"><a href="#addSelf"><span class="prefix">Two.Vector.</span><span class="shortname">addSelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.add](/documentation/vector/#two-vector-add).

</div>



<div class="meta">

  [`vector.js:264`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L264)

</div>






</div>



<div class="instance function overloaded">

## sub

<h2 class="longname" aria-hidden="true"><a href="#sub"><span class="prefix">Two.Vector.</span><span class="shortname">sub</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  |  |
</div>




<div class="description">

Subtract an object with x / y component values to the instance.

</div>



<div class="meta">

  [`vector.js:273`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L273)

</div>



<div class="tags">



</div>




</div>



<div class="instance function overloaded">

## sub

<h2 class="longname" aria-hidden="true"><a href="#sub"><span class="prefix">Two.Vector.</span><span class="shortname">sub</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  |  |
</div>




<div class="description">

Subtract the **same** number to both x / y component values of the instance.

</div>



<div class="meta">

  [`vector.js:281`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L281)

</div>



<div class="tags">



</div>




</div>



<div class="instance function overloaded">

## sub

<h2 class="longname" aria-hidden="true"><a href="#sub"><span class="prefix">Two.Vector.</span><span class="shortname">sub</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
</div>




<div class="description">

Subtract `x` / `y` values to their respective component value on the instance.

</div>



<div class="meta">

  [`vector.js:289`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L289)

</div>



<div class="tags">



</div>




</div>



<div class="instance function ">

## subtract

<h2 class="longname" aria-hidden="true"><a href="#subtract"><span class="prefix">Two.Vector.</span><span class="shortname">subtract</span></a></h2>















<div class="description">

Alias for [Two.Vector.sub](/documentation/vector/#two-vector-sub).

</div>



<div class="meta">

  [`vector.js:315`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L315)

</div>






</div>



<div class="instance function ">

## subSelf

<h2 class="longname" aria-hidden="true"><a href="#subSelf"><span class="prefix">Two.Vector.</span><span class="shortname">subSelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.sub](/documentation/vector/#two-vector-sub).

</div>



<div class="meta">

  [`vector.js:324`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L324)

</div>






</div>



<div class="instance function ">

## subtractSelf

<h2 class="longname" aria-hidden="true"><a href="#subtractSelf"><span class="prefix">Two.Vector.</span><span class="shortname">subtractSelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.sub](/documentation/vector/#two-vector-sub).

</div>



<div class="meta">

  [`vector.js:333`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L333)

</div>






</div>



<div class="instance function overloaded">

## multiply

<h2 class="longname" aria-hidden="true"><a href="#multiply"><span class="prefix">Two.Vector.</span><span class="shortname">multiply</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  |  |
</div>




<div class="description">

Multiply an object with x / y component values to the instance.

</div>



<div class="meta">

  [`vector.js:342`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L342)

</div>



<div class="tags">



</div>




</div>



<div class="instance function overloaded">

## multiply

<h2 class="longname" aria-hidden="true"><a href="#multiply"><span class="prefix">Two.Vector.</span><span class="shortname">multiply</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  |  |
</div>




<div class="description">

Multiply the **same** number to both x / y component values of the instance.

</div>



<div class="meta">

  [`vector.js:350`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L350)

</div>



<div class="tags">



</div>




</div>



<div class="instance function overloaded">

## multiply

<h2 class="longname" aria-hidden="true"><a href="#multiply"><span class="prefix">Two.Vector.</span><span class="shortname">multiply</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
</div>




<div class="description">

Multiply `x` / `y` values to their respective component value on the instance.

</div>



<div class="meta">

  [`vector.js:358`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L358)

</div>



<div class="tags">



</div>




</div>



<div class="instance function ">

## multiplySelf

<h2 class="longname" aria-hidden="true"><a href="#multiplySelf"><span class="prefix">Two.Vector.</span><span class="shortname">multiplySelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.multiply](/documentation/vector/#two-vector-multiply).

</div>



<div class="meta">

  [`vector.js:384`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L384)

</div>






</div>



<div class="instance function ">

## multiplyScalar

<h2 class="longname" aria-hidden="true"><a href="#multiplyScalar"><span class="prefix">Two.Vector.</span><span class="shortname">multiplyScalar</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  s  | The scalar to multiply by. |
</div>




<div class="description">

Mulitiply the vector by a single number. Shorthand to call [Two.Vector.multiply](/documentation/vector/#two-vector-multiply) directly.

</div>



<div class="meta">

  [`vector.js:393`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L393)

</div>






</div>



<div class="instance function overloaded">

## divide

<h2 class="longname" aria-hidden="true"><a href="#divide"><span class="prefix">Two.Vector.</span><span class="shortname">divide</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  |  |
</div>




<div class="description">

Divide an object with x / y component values to the instance.

</div>



<div class="meta">

  [`vector.js:403`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L403)

</div>



<div class="tags">



</div>




</div>



<div class="instance function overloaded">

## divide

<h2 class="longname" aria-hidden="true"><a href="#divide"><span class="prefix">Two.Vector.</span><span class="shortname">divide</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  |  |
</div>




<div class="description">

Divide the **same** number to both x / y component values of the instance.

</div>



<div class="meta">

  [`vector.js:411`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L411)

</div>



<div class="tags">



</div>




</div>



<div class="instance function overloaded">

## divide

<h2 class="longname" aria-hidden="true"><a href="#divide"><span class="prefix">Two.Vector.</span><span class="shortname">divide</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  |  |
|  y  |  |
</div>




<div class="description">

Divide `x` / `y` values to their respective component value on the instance.

</div>



<div class="meta">

  [`vector.js:419`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L419)

</div>



<div class="tags">



</div>




</div>



<div class="instance function ">

## divideSelf

<h2 class="longname" aria-hidden="true"><a href="#divideSelf"><span class="prefix">Two.Vector.</span><span class="shortname">divideSelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.divide](/documentation/vector/#two-vector-divide).

</div>



<div class="meta">

  [`vector.js:451`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L451)

</div>






</div>



<div class="instance function ">

## divideScalar

<h2 class="longname" aria-hidden="true"><a href="#divideScalar"><span class="prefix">Two.Vector.</span><span class="shortname">divideScalar</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  s  | The scalar to divide by. |
</div>




<div class="description">

Divide the vector by a single number. Shorthand to call [Two.Vector.divide](/documentation/vector/#two-vector-divide) directly.

</div>



<div class="meta">

  [`vector.js:460`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L460)

</div>






</div>



<div class="instance function ">

## negate

<h2 class="longname" aria-hidden="true"><a href="#negate"><span class="prefix">Two.Vector.</span><span class="shortname">negate</span></a></h2>















<div class="description">

Invert each component's sign value.

</div>



<div class="meta">

  [`vector.js:470`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L470)

</div>






</div>



<div class="instance function ">

## negate

<h2 class="longname" aria-hidden="true"><a href="#negate"><span class="prefix">Two.Vector.</span><span class="shortname">negate</span></a></h2>




<div class="returns">

__Returns__: Number



</div>












<div class="description">

Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.

</div>



<div class="meta">

  [`vector.js:479`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L479)

</div>






</div>



<div class="instance function ">

## length

<h2 class="longname" aria-hidden="true"><a href="#length"><span class="prefix">Two.Vector.</span><span class="shortname">length</span></a></h2>




<div class="returns">

__Returns__: Number



</div>












<div class="description">

Get the length of a vector.

</div>



<div class="meta">

  [`vector.js:489`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L489)

</div>






</div>



<div class="instance function ">

## lengthSquared

<h2 class="longname" aria-hidden="true"><a href="#lengthSquared"><span class="prefix">Two.Vector.</span><span class="shortname">lengthSquared</span></a></h2>




<div class="returns">

__Returns__: Number



</div>












<div class="description">

Get the length of the vector to the power of two. Widely used as less expensive than [Two.Vector.length](/documentation/vector/#two-vector-length), because it isn't square-rooting any numbers.

</div>



<div class="meta">

  [`vector.js:499`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L499)

</div>






</div>



<div class="instance function ">

## normalize

<h2 class="longname" aria-hidden="true"><a href="#normalize"><span class="prefix">Two.Vector.</span><span class="shortname">normalize</span></a></h2>















<div class="description">

Normalize the vector from negative one to one.

</div>



<div class="meta">

  [`vector.js:509`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L509)

</div>






</div>



<div class="instance function ">

## distanceTo

<h2 class="longname" aria-hidden="true"><a href="#distanceTo"><span class="prefix">Two.Vector.</span><span class="shortname">distanceTo</span></a></h2>




<div class="returns">

__Returns__: Number



</div>












<div class="description">

Get the distance between two vectors.

</div>



<div class="meta">

  [`vector.js:518`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L518)

</div>






</div>



<div class="instance function ">

## distanceToSquared

<h2 class="longname" aria-hidden="true"><a href="#distanceToSquared"><span class="prefix">Two.Vector.</span><span class="shortname">distanceToSquared</span></a></h2>




<div class="returns">

__Returns__: Number



</div>












<div class="description">

Get the distance between two vectors to the power of two. Widely used as less expensive than [Two.Vector.distanceTo](/documentation/vector/#two-vector-distanceto), because it isn't square-rooting any numbers.

</div>



<div class="meta">

  [`vector.js:528`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L528)

</div>






</div>



<div class="instance function ">

## setLength

<h2 class="longname" aria-hidden="true"><a href="#setLength"><span class="prefix">Two.Vector.</span><span class="shortname">setLength</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  l  | length to set vector to. |
</div>




<div class="description">

Set the length of a vector.

</div>



<div class="meta">

  [`vector.js:540`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L540)

</div>






</div>



<div class="instance function ">

## equals

<h2 class="longname" aria-hidden="true"><a href="#equals"><span class="prefix">Two.Vector.</span><span class="shortname">equals</span></a></h2>




<div class="returns">

__Returns__: Boolean



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  | The vector to compare against. |
|  eps  | An options epsilon for precision. |
</div>




<div class="description">

Qualify if one vector roughly equal another. With a margin of error defined by epsilon.

</div>



<div class="meta">

  [`vector.js:550`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L550)

</div>






</div>



<div class="instance function ">

## lerp

<h2 class="longname" aria-hidden="true"><a href="#lerp"><span class="prefix">Two.Vector.</span><span class="shortname">lerp</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  | The destination vector to step towards. |
|  t  | The zero to one value of how close the current vector gets to the destination vector. |
</div>




<div class="description">

Linear interpolate one vector to another by an amount `t` defined as a zero to one number.

</div>



<div class="meta">

  [`vector.js:563`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L563)

</div>





<div class="see">

[Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.

</div>


</div>



<div class="instance function ">

## isZero

<h2 class="longname" aria-hidden="true"><a href="#isZero"><span class="prefix">Two.Vector.</span><span class="shortname">isZero</span></a></h2>




<div class="returns">

__Returns__: Boolean



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  eps  | Optional precision amount to check against. |
</div>




<div class="description">

Check to see if vector is roughly zero, based on the `epsilon` precision value.

</div>



<div class="meta">

  [`vector.js:577`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L577)

</div>






</div>



<div class="instance function ">

## toString

<h2 class="longname" aria-hidden="true"><a href="#toString"><span class="prefix">Two.Vector.</span><span class="shortname">toString</span></a></h2>




<div class="returns">

__Returns__: String



</div>












<div class="description">

Return a comma-separated string of x, y value. Great for storing in a database.

</div>



<div class="meta">

  [`vector.js:589`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L589)

</div>






</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Vector.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the vector.

</div>



<div class="meta">

  [`vector.js:599`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L599)

</div>






</div>



<div class="instance function ">

## rotate

<h2 class="longname" aria-hidden="true"><a href="#rotate"><span class="prefix">Two.Vector.</span><span class="shortname">rotate</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  Number  | The amoun to rotate the vector by. |
</div>




<div class="description">

Rotate a vector.

</div>



<div class="meta">

  [`vector.js:609`](https://github.com/jonobr1/two.js/blob/dev/src/vector.js#L609)

</div>






</div>


