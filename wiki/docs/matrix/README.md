---
title: Two.Matrix
pageClass: docs
lang: en-US
---

# Two.Matrix



A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has suped up methods for commonplace mathematical operations.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  a  | The value for element at the first column and first row. |
|  b  | The value for element at the second column and first row. |
|  c  | The value for element at the third column and first row. |
|  d  | The value for element at the first column and second row. |
|  e  | The value for element at the second column and second row. |
|  f  | The value for element at the third column and second row. |
|  g  | The value for element at the first column and third row. |
|  h  | The value for element at the second column and third row. |
|  i  | The value for element at the third column and third row. |



<div class="static member ">

## Identity

<h2 class="longname" aria-hidden="true"><a href="#Identity"><span class="prefix">Two.Matrix.</span><span class="shortname">Identity</span></a></h2>










<div class="properties">


A stored reference to the default value of a 3 x 3 matrix.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L59">
    matrix.js:59
  </a>

</div>




</div>



<div class="static function ">

## Multiply

<h2 class="longname" aria-hidden="true"><a href="#Multiply"><span class="prefix">Two.Matrix.</span><span class="shortname">Multiply</span></a></h2>




<div class="returns">

__Returns__: Two.Matrix


- If an optional `C` matrix isn't passed then a new one is created and returned.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  A  |  |
|  B  |  |
|  C  | An optional matrix to apply the multiplication to. |
</div>




<div class="description">

Multiply two matrices together and return the result.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L69">
    matrix.js:69
  </a>

</div>




</div>



<div class="instance member ">

## elements

<h2 class="longname" aria-hidden="true"><a href="#elements"><span class="prefix">Two.Matrix.</span><span class="shortname">elements</span></a></h2>










<div class="properties">


The underlying data stored as an array.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L26">
    matrix.js:26
  </a>

</div>




</div>



<div class="instance member ">

## manual

<h2 class="longname" aria-hidden="true"><a href="#manual"><span class="prefix">Two.Matrix.</span><span class="shortname">manual</span></a></h2>










<div class="properties">


Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L32">
    matrix.js:32
  </a>

</div>



<div class="tags">


::: tip nota-bene
- Setting to `true` nullifies [Two.Shape.translation](/docs/shape/#translation), [Two.Shape.rotation](/docs/shape/#rotation), and [Two.Shape.scale](/docs/shape/#scale).
:::


</div>


</div>



<div class="instance function ">

## set

<h2 class="longname" aria-hidden="true"><a href="#set"><span class="prefix">Two.Matrix.</span><span class="shortname">set</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  a  | The value for element at the first column and first row. |
|  b  | The value for element at the second column and first row. |
|  c  | The value for element at the third column and first row. |
|  d  | The value for element at the first column and second row. |
|  e  | The value for element at the second column and second row. |
|  f  | The value for element at the third column and second row. |
|  g  | The value for element at the first column and third row. |
|  h  | The value for element at the second column and third row. |
|  i  | The value for element at the third column and third row. |
</div>




<div class="description">

Set an array of values onto the matrix. Order described in [Two.Matrix](/docs/matrix/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L124">
    matrix.js:124
  </a>

</div>




</div>



<div class="instance function ">

## set

<h2 class="longname" aria-hidden="true"><a href="#set"><span class="prefix">Two.Matrix.</span><span class="shortname">set</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  a  | The array of elements to apply. |
</div>




<div class="description">

Set an array of values onto the matrix. Order described in [Two.Matrix](/docs/matrix/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L139">
    matrix.js:139
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Matrix.</span><span class="shortname">copy</span></a></h2>















<div class="description">

Copy the matrix of one to the current instance.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L174">
    matrix.js:174
  </a>

</div>




</div>



<div class="instance function ">

## identity

<h2 class="longname" aria-hidden="true"><a href="#identity"><span class="prefix">Two.Matrix.</span><span class="shortname">identity</span></a></h2>















<div class="description">

Turn matrix to the identity, like resetting.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L197">
    matrix.js:197
  </a>

</div>




</div>



<div class="instance function overloaded">

## multiply

<h2 class="longname" aria-hidden="true"><a href="#multiply"><span class="prefix">Two.Matrix.</span><span class="shortname">multiply</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  a  | The scalar to be multiplied. |
</div>




<div class="description">

Multiply all components of the matrix against a single scalar value.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L218">
    matrix.js:218
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance function overloaded">

## multiply

<h2 class="longname" aria-hidden="true"><a href="#multiply"><span class="prefix">Two.Matrix.</span><span class="shortname">multiply</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  a  | The x component to be multiplied. |
|  b  | The y component to be multiplied. |
|  c  | The z component to be multiplied. |
</div>




<div class="description">

Multiply all components of a matrix against a 3 component vector.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L226">
    matrix.js:226
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance function overloaded">

## multiply

<h2 class="longname" aria-hidden="true"><a href="#multiply"><span class="prefix">Two.Matrix.</span><span class="shortname">multiply</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>











<div class="params">

| Argument | Description |
| ---- | ----------- |
|  a  | The value at the first column and first row of the matrix to be multiplied. |
|  b  | The value at the second column and first row of the matrix to be multiplied. |
|  c  | The value at the third column and first row of the matrix to be multiplied. |
|  d  | The value at the first column and second row of the matrix to be multiplied. |
|  e  | The value at the second column and second row of the matrix to be multiplied. |
|  f  | The value at the third column and second row of the matrix to be multiplied. |
|  g  | The value at the first column and third row of the matrix to be multiplied. |
|  h  | The value at the second column and third row of the matrix to be multiplied. |
|  i  | The value at the third column and third row of the matrix to be multiplied. |
</div>




<div class="description">

Multiply all components of a matrix against another matrix.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L236">
    matrix.js:236
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance function ">

## inverse

<h2 class="longname" aria-hidden="true"><a href="#inverse"><span class="prefix">Two.Matrix.</span><span class="shortname">inverse</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  out  | The optional matrix to apply the inversion to. |
</div>




<div class="description">

Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L318">
    matrix.js:318
  </a>

</div>




</div>



<div class="instance function ">

## scale

<h2 class="longname" aria-hidden="true"><a href="#scale"><span class="prefix">Two.Matrix.</span><span class="shortname">scale</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  scale  | The one dimensional scale to apply to the matrix. |
</div>




<div class="description">

Uniformly scale the transformation matrix.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L360">
    matrix.js:360
  </a>

</div>




</div>



<div class="instance function ">

## scale

<h2 class="longname" aria-hidden="true"><a href="#scale"><span class="prefix">Two.Matrix.</span><span class="shortname">scale</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  sx  | The horizontal scale factor. |
|  sy  | The vertical scale factor |
</div>




<div class="description">

Scale the transformation matrix in two dimensions.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L367">
    matrix.js:367
  </a>

</div>




</div>



<div class="instance function ">

## rotate

<h2 class="longname" aria-hidden="true"><a href="#rotate"><span class="prefix">Two.Matrix.</span><span class="shortname">rotate</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  Number  | The amount to rotate in Number. |
</div>




<div class="description">

Rotate the matrix.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L385">
    matrix.js:385
  </a>

</div>




</div>



<div class="instance function ">

## translate

<h2 class="longname" aria-hidden="true"><a href="#translate"><span class="prefix">Two.Matrix.</span><span class="shortname">translate</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  | The horizontal translation value to apply. |
|  y  | The vertical translation value to apply. |
</div>




<div class="description">

Translate the matrix.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L400">
    matrix.js:400
  </a>

</div>




</div>



<div class="instance function ">

## skewX

<h2 class="longname" aria-hidden="true"><a href="#skewX"><span class="prefix">Two.Matrix.</span><span class="shortname">skewX</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  Number  | The amount to skew in Number. |
</div>




<div class="description">

Skew the matrix by an angle in the x axis direction.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L413">
    matrix.js:413
  </a>

</div>




</div>



<div class="instance function ">

## skewY

<h2 class="longname" aria-hidden="true"><a href="#skewY"><span class="prefix">Two.Matrix.</span><span class="shortname">skewY</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  Number  | The amount to skew in Number. |
</div>




<div class="description">

Skew the matrix by an angle in the y axis direction.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L427">
    matrix.js:427
  </a>

</div>




</div>



<div class="instance function ">

## toString

<h2 class="longname" aria-hidden="true"><a href="#toString"><span class="prefix">Two.Matrix.</span><span class="shortname">toString</span></a></h2>




<div class="returns">

__Returns__: String


- The transformation matrix as a 6 component string separated by spaces.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  fullMatrix  | Return the full 9 elements of the matrix or just 6 for 2D transformations. |
</div>




<div class="description">

Create a transform string. Used for the Two.js rendering APIs.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L441">
    matrix.js:441
  </a>

</div>




</div>



<div class="instance function ">

## toTransformArray

<h2 class="longname" aria-hidden="true"><a href="#toTransformArray"><span class="prefix">Two.Matrix.</span><span class="shortname">toTransformArray</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  fullMatrix  | Return the full 9 elements of the matrix or just 6 in the format for 2D transformations. |
|  output  | An array empty or otherwise to apply the values to. |
</div>




<div class="description">

Create a transform array. Used for the Two.js rendering APIs.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L457">
    matrix.js:457
  </a>

</div>




</div>



<div class="instance function ">

## toArray

<h2 class="longname" aria-hidden="true"><a href="#toArray"><span class="prefix">Two.Matrix.</span><span class="shortname">toArray</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  fullMatrix  | Return the full 9 elements of the matrix or just 6 for 2D transformations. |
|  output  | An array empty or otherwise to apply the values to. |
</div>




<div class="description">

Create a transform array. Used for the Two.js rendering APIs.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L516">
    matrix.js:516
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Matrix.</span><span class="shortname">toObject</span></a></h2>















<div class="description">

Create a JSON compatible object that represents information of the matrix.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L575">
    matrix.js:575
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Matrix.</span><span class="shortname">clone</span></a></h2>















<div class="description">

Clone the current matrix.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/matrix.js#L587">
    matrix.js:587
  </a>

</div>




</div>


