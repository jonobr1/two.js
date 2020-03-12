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

## Two.Matrix#elements






The underlying data stored as an array.











---

## Two.Matrix.Identity






A stored reference to the default value of a 3 x 3 matrix.











---

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





---

## Two.Matrix#manual






Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.








::: tip nota-bene
- Setting to `true` nullifies {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale}.
:::




---

## Two.Matrix#set








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


Set an array of values onto the matrix. Order described in {@link Two.Matrix}.





---

## Two.Matrix#set








| Argument | Description |
| ---- | ----------- |
| `a` | The array of elements to apply. |


Set an array of values onto the matrix. Order described in {@link Two.Matrix}.





---

## Two.Matrix#identity










Turn matrix to the identity, like resetting.





---

## Two.Matrix.multiply








| Argument | Description |
| ---- | ----------- |
| `a` | The scalar to be multiplied. |


Multiply all components of the matrix against a single scalar value.





---

## Two.Matrix.multiply








| Argument | Description |
| ---- | ----------- |
| `a` | The x component to be multiplied. |
| `b` | The y component to be multiplied. |
| `c` | The z component to be multiplied. |


Multiply all components of a matrix against a 3 component vector.





---

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





---

## Two.Matrix#inverse








| Argument | Description |
| ---- | ----------- |
| `out` | The optional matrix to apply the inversion to. |


Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.





---

## Two.Matrix#scale








| Argument | Description |
| ---- | ----------- |
| `scale` | The one dimensional scale to apply to the matrix. |


Uniformly scale the transformation matrix.





---

## Two.Matrix#scale








| Argument | Description |
| ---- | ----------- |
| `sx` | The horizontal scale factor. |
| `sy` | The vertical scale factor |


Scale the transformation matrix in two dimensions.





---

## Two.Matrix#rotate








| Argument | Description |
| ---- | ----------- |
| `radians` | The amount to rotate in radians. |


Rotate the matrix.





---

## Two.Matrix#translate








| Argument | Description |
| ---- | ----------- |
| `x` | The horizontal translation value to apply. |
| `y` | The vertical translation value to apply. |


Translate the matrix.





---

## Two.Matrix#skewX








| Argument | Description |
| ---- | ----------- |
| `radians` | The amount to skew in radians. |


Skew the matrix by an angle in the x axis direction.





---

## Two.Matrix#skewY








| Argument | Description |
| ---- | ----------- |
| `radians` | The amount to skew in radians. |


Skew the matrix by an angle in the y axis direction.





---

## Two.Matrix#toString


__Returns__:



+ `String`



- The transformation matrix as a 6 component string separated by spaces.









| Argument | Description |
| ---- | ----------- |
| `fullMatrix` | Return the full 9 elements of the matrix or just 6 for 2D transformations. |


Create a transform string. Used for the Two.js rendering APIs.





---

## Two.Matrix#toTransformArray








| Argument | Description |
| ---- | ----------- |
| `fullMatrix` | Return the full 9 elements of the matrix or just 6 in the format for 2D transformations. |
| `output` | An array empty or otherwise to apply the values to. |


Create a transform array. Used for the Two.js rendering APIs.





---

## Two.Matrix#toArray








| Argument | Description |
| ---- | ----------- |
| `fullMatrix` | Return the full 9 elements of the matrix or just 6 for 2D transformations. |
| `output` | An array empty or otherwise to apply the values to. |


Create a transform array. Used for the Two.js rendering APIs.





---

## Two.Matrix#clone










Clone the current matrix.




