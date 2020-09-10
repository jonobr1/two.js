# Two.Matrix



A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has suped up methods for commonplace mathematical operations.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L10)

</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
| `a` | The value for element at the first column and first row. |
| `b` | The value for element at the second column and first row. |
| `c` | The value for element at the third column and first row. |
| `d` | The value for element at the first column and second row. |
| `e` | The value for element at the second column and second row. |
| `f` | The value for element at the third column and second row. |
| `g` | The value for element at the first column and third row. |
| `h` | The value for element at the second column and third row. |
| `i` | The value for element at the third column and third row. |



---

<div class="static member ">

## Two.Matrix.Identity








<div class="properties">

A stored reference to the default value of a 3 x 3 matrix.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L51)

</div>






</div>



---

<div class="static function ">

## Two.Matrix.Multiply




<div class="returns">

__Returns__:



+ `Two.Matrix`



- If an optional `C` matrix isn't passed then a new one is created and returned.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `A` |  |
| `B` |  |
| `C` | An optional matrix to apply the multiplication to. |
</div>




<div class="description">

Multiply two matrices together and return the result.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L61)

</div>






</div>



---

<div class="instance member ">

## Two.Matrix.elements








<div class="properties">

The underlying data stored as an array.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L27)

</div>






</div>



---

<div class="instance member ">

## Two.Matrix.manual








<div class="properties">

Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L121)

</div>



<div class="tags">


::: tip nota-bene
- Setting to `true` nullifies [Two.Shape.translation](/documentation/shape#two-shape-translation), [Two.Shape.rotation](/documentation/shape#two-shape-rotation), and [Two.Shape.scale](/documentation/shape#two-shape-scale).
:::


</div>




</div>



---

<div class="instance function ">

## Two.Matrix.set










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `a` | The value for element at the first column and first row. |
| `b` | The value for element at the second column and first row. |
| `c` | The value for element at the third column and first row. |
| `d` | The value for element at the first column and second row. |
| `e` | The value for element at the second column and second row. |
| `f` | The value for element at the third column and second row. |
| `g` | The value for element at the first column and third row. |
| `h` | The value for element at the second column and third row. |
| `i` | The value for element at the third column and third row. |
</div>




<div class="description">

Set an array of values onto the matrix. Order described in [Two.Matrix](/documentation/matrix).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L128)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.set










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `a` | The array of elements to apply. |
</div>




<div class="description">

Set an array of values onto the matrix. Order described in [Two.Matrix](/documentation/matrix).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L143)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.copy













<div class="description">

Copy the matrix of one to the current instance.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L180)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.identity













<div class="description">

Turn matrix to the identity, like resetting.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L203)

</div>






</div>



---

<div class="instance function overloaded">

## Two.Matrix.multiply


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
| `a` | The scalar to be multiplied. |
</div>




<div class="description">

Multiply all components of the matrix against a single scalar value.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L224)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## Two.Matrix.multiply


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
| `a` | The x component to be multiplied. |
| `b` | The y component to be multiplied. |
| `c` | The z component to be multiplied. |
</div>




<div class="description">

Multiply all components of a matrix against a 3 component vector.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L232)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function overloaded">

## Two.Matrix.multiply


<div class="overloaded-label">

_Overloaded_

</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
| `a` | The value at the first column and first row of the matrix to be multiplied. |
| `b` | The value at the second column and first row of the matrix to be multiplied. |
| `c` | The value at the third column and first row of the matrix to be multiplied. |
| `d` | The value at the first column and second row of the matrix to be multiplied. |
| `e` | The value at the second column and second row of the matrix to be multiplied. |
| `f` | The value at the third column and second row of the matrix to be multiplied. |
| `g` | The value at the first column and third row of the matrix to be multiplied. |
| `h` | The value at the second column and third row of the matrix to be multiplied. |
| `i` | The value at the third column and third row of the matrix to be multiplied. |
</div>




<div class="description">

Multiply all components of a matrix against another matrix.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L242)

</div>



<div class="tags">



</div>




</div>



---

<div class="instance function ">

## Two.Matrix.inverse










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `out` | The optional matrix to apply the inversion to. |
</div>




<div class="description">

Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L325)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.scale










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `scale` | The one dimensional scale to apply to the matrix. |
</div>




<div class="description">

Uniformly scale the transformation matrix.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L367)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.scale










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `sx` | The horizontal scale factor. |
| `sy` | The vertical scale factor |
</div>




<div class="description">

Scale the transformation matrix in two dimensions.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L374)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.rotate










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `radians` | The amount to rotate in radians. |
</div>




<div class="description">

Rotate the matrix.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L392)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.translate










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` | The horizontal translation value to apply. |
| `y` | The vertical translation value to apply. |
</div>




<div class="description">

Translate the matrix.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L407)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.skewX










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `radians` | The amount to skew in radians. |
</div>




<div class="description">

Skew the matrix by an angle in the x axis direction.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L420)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.skewY










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `radians` | The amount to skew in radians. |
</div>




<div class="description">

Skew the matrix by an angle in the y axis direction.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L434)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.toString




<div class="returns">

__Returns__:



+ `String`



- The transformation matrix as a 6 component string separated by spaces.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `fullMatrix` | Return the full 9 elements of the matrix or just 6 for 2D transformations. |
</div>




<div class="description">

Create a transform string. Used for the Two.js rendering APIs.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L448)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.toTransformArray










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `fullMatrix` | Return the full 9 elements of the matrix or just 6 in the format for 2D transformations. |
| `output` | An array empty or otherwise to apply the values to. |
</div>




<div class="description">

Create a transform array. Used for the Two.js rendering APIs.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L464)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.toArray










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `fullMatrix` | Return the full 9 elements of the matrix or just 6 for 2D transformations. |
| `output` | An array empty or otherwise to apply the values to. |
</div>




<div class="description">

Create a transform array. Used for the Two.js rendering APIs.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L523)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.toObject













<div class="description">

Create a JSON compatible object that represents information of the matrix.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L582)

</div>






</div>



---

<div class="instance function ">

## Two.Matrix.clone













<div class="description">

Clone the current matrix.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/matrix.js#L594)

</div>






</div>


