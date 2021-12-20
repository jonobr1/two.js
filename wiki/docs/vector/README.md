---
title: Two.Vector
pageClass: docs
lang: en-US
---

# Two.Vector



A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js" />
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L68">
    vector.js:68
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L75">
    vector.js:75
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L87">
    vector.js:87
  </a>

</div>




</div>



<div class="static function ">

## subtract

<h2 class="longname" aria-hidden="true"><a href="#subtract"><span class="prefix">Two.Vector.</span><span class="shortname">subtract</span></a></h2>















<div class="description">

Alias for [Two.Vector.sub](/docs/vector/#sub).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L99">
    vector.js:99
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L108">
    vector.js:108
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L121">
    vector.js:121
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L146">
    vector.js:146
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L159">
    vector.js:159
  </a>

</div>




</div>



<div class="instance member ">

## x

<h2 class="longname" aria-hidden="true"><a href="#x"><span class="prefix">Two.Vector.</span><span class="shortname">x</span></a></h2>










<div class="properties">

The horizontal x-component of the vector.

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L54">
    vector.js:54
  </a>

</div>




</div>



<div class="instance member ">

## y

<h2 class="longname" aria-hidden="true"><a href="#y"><span class="prefix">Two.Vector.</span><span class="shortname">y</span></a></h2>










<div class="properties">

The vertical y-component of the vector.

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L60">
    vector.js:60
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L183">
    vector.js:183
  </a>

</div>




</div>



<div class="instance function ">

## clear

<h2 class="longname" aria-hidden="true"><a href="#clear"><span class="prefix">Two.Vector.</span><span class="shortname">clear</span></a></h2>















<div class="description">

Set the x / y component values of the vector to zero.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L195">
    vector.js:195
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Vector.</span><span class="shortname">clone</span></a></h2>















<div class="description">

Create a new vector and copy the existing values onto the newly created instance.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L206">
    vector.js:206
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L215">
    vector.js:215
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L223">
    vector.js:223
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L231">
    vector.js:231
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance function ">

## addSelf

<h2 class="longname" aria-hidden="true"><a href="#addSelf"><span class="prefix">Two.Vector.</span><span class="shortname">addSelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.add](/docs/vector/#add).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L257">
    vector.js:257
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L266">
    vector.js:266
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L274">
    vector.js:274
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L282">
    vector.js:282
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance function ">

## subtract

<h2 class="longname" aria-hidden="true"><a href="#subtract"><span class="prefix">Two.Vector.</span><span class="shortname">subtract</span></a></h2>















<div class="description">

Alias for [Two.Vector.sub](/docs/vector/#sub).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L308">
    vector.js:308
  </a>

</div>




</div>



<div class="instance function ">

## subSelf

<h2 class="longname" aria-hidden="true"><a href="#subSelf"><span class="prefix">Two.Vector.</span><span class="shortname">subSelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.sub](/docs/vector/#sub).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L317">
    vector.js:317
  </a>

</div>




</div>



<div class="instance function ">

## subtractSelf

<h2 class="longname" aria-hidden="true"><a href="#subtractSelf"><span class="prefix">Two.Vector.</span><span class="shortname">subtractSelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.sub](/docs/vector/#sub).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L326">
    vector.js:326
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L335">
    vector.js:335
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L343">
    vector.js:343
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L351">
    vector.js:351
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance function ">

## multiplySelf

<h2 class="longname" aria-hidden="true"><a href="#multiplySelf"><span class="prefix">Two.Vector.</span><span class="shortname">multiplySelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.multiply](/docs/vector/#multiply).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L377">
    vector.js:377
  </a>

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

Mulitiply the vector by a single number. Shorthand to call [Two.Vector.multiply](/docs/vector/#multiply) directly.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L386">
    vector.js:386
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L396">
    vector.js:396
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L404">
    vector.js:404
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L412">
    vector.js:412
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance function ">

## divideSelf

<h2 class="longname" aria-hidden="true"><a href="#divideSelf"><span class="prefix">Two.Vector.</span><span class="shortname">divideSelf</span></a></h2>















<div class="description">

Alias for [Two.Vector.divide](/docs/vector/#divide).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L444">
    vector.js:444
  </a>

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

Divide the vector by a single number. Shorthand to call [Two.Vector.divide](/docs/vector/#divide) directly.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L453">
    vector.js:453
  </a>

</div>




</div>



<div class="instance function ">

## negate

<h2 class="longname" aria-hidden="true"><a href="#negate"><span class="prefix">Two.Vector.</span><span class="shortname">negate</span></a></h2>















<div class="description">

Invert each component's sign value.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L463">
    vector.js:463
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L472">
    vector.js:472
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L482">
    vector.js:482
  </a>

</div>




</div>



<div class="instance function ">

## lengthSquared

<h2 class="longname" aria-hidden="true"><a href="#lengthSquared"><span class="prefix">Two.Vector.</span><span class="shortname">lengthSquared</span></a></h2>




<div class="returns">

__Returns__: Number



</div>












<div class="description">

Get the length of the vector to the power of two. Widely used as less expensive than [Two.Vector.length](/docs/vector/#length) because it isn't square-rooting any numbers.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L492">
    vector.js:492
  </a>

</div>




</div>



<div class="instance function ">

## normalize

<h2 class="longname" aria-hidden="true"><a href="#normalize"><span class="prefix">Two.Vector.</span><span class="shortname">normalize</span></a></h2>















<div class="description">

Normalize the vector from negative one to one.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L502">
    vector.js:502
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L511">
    vector.js:511
  </a>

</div>




</div>



<div class="instance function ">

## distanceToSquared

<h2 class="longname" aria-hidden="true"><a href="#distanceToSquared"><span class="prefix">Two.Vector.</span><span class="shortname">distanceToSquared</span></a></h2>




<div class="returns">

__Returns__: Number



</div>












<div class="description">

Get the distance between two vectors to the power of two. Widely used as less expensive than [Two.Vector.distanceTo](/docs/vector/#distanceto) because it isn't square-rooting any numbers.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L521">
    vector.js:521
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L533">
    vector.js:533
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L543">
    vector.js:543
  </a>

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



<div class="see">

See: [Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L556">
    vector.js:556
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L570">
    vector.js:570
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L582">
    vector.js:582
  </a>

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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L592">
    vector.js:592
  </a>

</div>




</div>



<div class="instance function ">

## rotate

<h2 class="longname" aria-hidden="true"><a href="#rotate"><span class="prefix">Two.Vector.</span><span class="shortname">rotate</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  radians  | The amount to rotate the vector by in radians. |
</div>




<div class="description">

Rotate a vector.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L602">
    vector.js:602
  </a>

</div>




</div>


