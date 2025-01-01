---
title: Two.Vector
pageClass: docs
lang: en-US
---

# Two.Vector


<div class="extends">

Extends: [Two.Events](/docs/events/)

</div>


A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js" />
</div>


<carbon-ads />


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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L77">
    vector.js:77
  </a>

</div>




</div>



<div class="static member ">

## left

<h2 class="longname" aria-hidden="true"><a href="#left"><span class="prefix">Two.Vector.</span><span class="shortname">left</span></a></h2>










<div class="properties">


Handy reference to a vector with component values -1, 0 at all times.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L84">
    vector.js:84
  </a>

</div>




</div>



<div class="static member ">

## right

<h2 class="longname" aria-hidden="true"><a href="#right"><span class="prefix">Two.Vector.</span><span class="shortname">right</span></a></h2>










<div class="properties">


Handy reference to a vector with component values 1, 0 at all times.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L91">
    vector.js:91
  </a>

</div>




</div>



<div class="static member ">

## up

<h2 class="longname" aria-hidden="true"><a href="#up"><span class="prefix">Two.Vector.</span><span class="shortname">up</span></a></h2>










<div class="properties">


Handy reference to a vector with component values 0, -1 at all times.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L98">
    vector.js:98
  </a>

</div>




</div>



<div class="static member ">

## down

<h2 class="longname" aria-hidden="true"><a href="#down"><span class="prefix">Two.Vector.</span><span class="shortname">down</span></a></h2>










<div class="properties">


Handy reference to a vector with component values 0, 1 at all times.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L105">
    vector.js:105
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L112">
    vector.js:112
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L124">
    vector.js:124
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L136">
    vector.js:136
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
|  v1  |  |
|  v2  |  |
</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L145">
    vector.js:145
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L156">
    vector.js:156
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L177">
    vector.js:177
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L188">
    vector.js:188
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L62">
    vector.js:62
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L69">
    vector.js:69
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L210">
    vector.js:210
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L222">
    vector.js:222
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L233">
    vector.js:233
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L242">
    vector.js:242
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L250">
    vector.js:250
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L258">
    vector.js:258
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L284">
    vector.js:284
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L293">
    vector.js:293
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L301">
    vector.js:301
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L309">
    vector.js:309
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L335">
    vector.js:335
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L344">
    vector.js:344
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L353">
    vector.js:353
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L362">
    vector.js:362
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L370">
    vector.js:370
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L378">
    vector.js:378
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L404">
    vector.js:404
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L413">
    vector.js:413
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L423">
    vector.js:423
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L431">
    vector.js:431
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L439">
    vector.js:439
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L471">
    vector.js:471
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L480">
    vector.js:480
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L490">
    vector.js:490
  </a>

</div>




</div>



<div class="instance function ">

## dot

<h2 class="longname" aria-hidden="true"><a href="#dot"><span class="prefix">Two.Vector.</span><span class="shortname">dot</span></a></h2>




<div class="returns">

__Returns__: Number



</div>












<div class="description">

Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L499">
    vector.js:499
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L509">
    vector.js:509
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L519">
    vector.js:519
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L529">
    vector.js:529
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L538">
    vector.js:538
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L548">
    vector.js:548
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L560">
    vector.js:560
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L570">
    vector.js:570
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L583">
    vector.js:583
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L597">
    vector.js:597
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L609">
    vector.js:609
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L619">
    vector.js:619
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

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/vector.js#L629">
    vector.js:629
  </a>

</div>




</div>


