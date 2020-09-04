# Two.Matrix



A class to store 3 x 3 transformation matrix information. In addition to storing data `Two.Matrix` has suped up methods for commonplace mathematical operations.


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

<div class="instance">

## Two.Matrix.elements






The underlying data stored as an array.









</div>



---

<div class="static">

## Utils.getComputedMatrix


__Returns__:



+ `Two.Matrix`



The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.









| Argument | Description |
| ---- | ----------- |
| `object` | The Two.js object that has a matrix property to calculate from. |
| `matrix` | The matrix to apply calculated transformations to if available. |


Method to get the world space transformation of a given object in a Two.js scene.



</div>



---

<div class="static">

## Two.Matrix.Identity






A stored reference to the default value of a 3 x 3 matrix.









</div>



---

<div class="static">

## Two.Matrix.Multiply


__Returns__:



+ `Two.Matrix`



- If an optional `C` matrix isn't passed then a new one is created and returned.









| Argument | Description |
| ---- | ----------- |
| `A` |  |
| `B` |  |
| `C` | An optional matrix to apply the multiplication to. |


Multiply two matrices together and return the result.



</div>



---

<div class="instance">

## Two.Matrix.manual






Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.








::: tip nota-bene
- Setting to `true` nullifies [Two.Shape.translation](/documentation/shape#two-shape-translation), [Two.Shape.rotation](/documentation/shape#two-shape-rotation), and [Two.Shape.scale](/documentation/shape#two-shape-scale).
:::


</div>



---

<div class="instance">

## Two.Matrix.set








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


Set an array of values onto the matrix. Order described in [Two.Matrix](/documentation/matrix).



</div>



---

<div class="instance">

## Two.Matrix.set








| Argument | Description |
| ---- | ----------- |
| `a` | The array of elements to apply. |


Set an array of values onto the matrix. Order described in [Two.Matrix](/documentation/matrix).



</div>



---

<div class="instance">

## Two.Matrix.copy










Copy the matrix of one to the current instance.



</div>



---

<div class="instance">

## Two.Matrix.identity










Turn matrix to the identity, like resetting.



</div>



---

<div class="static">

## Two.Matrix.multiply








| Argument | Description |
| ---- | ----------- |
| `a` | The scalar to be multiplied. |


Multiply all components of the matrix against a single scalar value.



</div>



---

<div class="static">

## Two.Matrix.multiply








| Argument | Description |
| ---- | ----------- |
| `a` | The x component to be multiplied. |
| `b` | The y component to be multiplied. |
| `c` | The z component to be multiplied. |


Multiply all components of a matrix against a 3 component vector.



</div>



---

<div class="static">

## Two.Matrix.multiply








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


Multiply all components of a matrix against another matrix.



</div>



---

<div class="instance">

## Two.Matrix.inverse








| Argument | Description |
| ---- | ----------- |
| `out` | The optional matrix to apply the inversion to. |


Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.



</div>



---

<div class="instance">

## Two.Matrix.scale








| Argument | Description |
| ---- | ----------- |
| `scale` | The one dimensional scale to apply to the matrix. |


Uniformly scale the transformation matrix.



</div>



---

<div class="instance">

## Two.Matrix.scale








| Argument | Description |
| ---- | ----------- |
| `sx` | The horizontal scale factor. |
| `sy` | The vertical scale factor |


Scale the transformation matrix in two dimensions.



</div>



---

<div class="instance">

## Two.Matrix.rotate








| Argument | Description |
| ---- | ----------- |
| `radians` | The amount to rotate in radians. |


Rotate the matrix.



</div>



---

<div class="instance">

## Two.Matrix.translate








| Argument | Description |
| ---- | ----------- |
| `x` | The horizontal translation value to apply. |
| `y` | The vertical translation value to apply. |


Translate the matrix.



</div>



---

<div class="instance">

## Two.Matrix.skewX








| Argument | Description |
| ---- | ----------- |
| `radians` | The amount to skew in radians. |


Skew the matrix by an angle in the x axis direction.



</div>



---

<div class="instance">

## Two.Matrix.skewY








| Argument | Description |
| ---- | ----------- |
| `radians` | The amount to skew in radians. |


Skew the matrix by an angle in the y axis direction.



</div>



---

<div class="instance">

## Two.Matrix.toString


__Returns__:



+ `String`



- The transformation matrix as a 6 component string separated by spaces.









| Argument | Description |
| ---- | ----------- |
| `fullMatrix` | Return the full 9 elements of the matrix or just 6 for 2D transformations. |


Create a transform string. Used for the Two.js rendering APIs.



</div>



---

<div class="instance">

## Two.Matrix.toTransformArray








| Argument | Description |
| ---- | ----------- |
| `fullMatrix` | Return the full 9 elements of the matrix or just 6 in the format for 2D transformations. |
| `output` | An array empty or otherwise to apply the values to. |


Create a transform array. Used for the Two.js rendering APIs.



</div>



---

<div class="instance">

## Two.Matrix.toArray








| Argument | Description |
| ---- | ----------- |
| `fullMatrix` | Return the full 9 elements of the matrix or just 6 for 2D transformations. |
| `output` | An array empty or otherwise to apply the values to. |


Create a transform array. Used for the Two.js rendering APIs.



</div>



---

<div class="instance">

## Two.Matrix.toObject










Create a JSON compatible object that represents information of the matrix.



</div>



---

<div class="instance">

## Two.Matrix.clone










Clone the current matrix.



</div>


