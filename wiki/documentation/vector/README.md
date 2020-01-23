# Two.Vector



A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | Any number to represent the horizontal x-component of the vector. |
| `y` | Any number to represent the vertical y-component of the vector. |



---

## Two.Vector#x






The horizontal x-component of the vector.











---

## Two.Vector#y






The vertical y-component of the vector.











---

## Two.Vector.zero






Handy reference to a vector with component values 0, 0 at all times.











---

## Two.Vector.add


__Returns__:



+ `Two.Vector`











| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |


Add two vectors together.





---

## Two.Vector.sub


__Returns__:



+ `Two.Vector`











| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |


Subtract two vectors: `v2` from `v1`.





---

## Two.Vector.subtract
















---

## Two.Vector.ratioBetween


__Returns__:



+ `Number`



The ratio betwen two points `v1` and `v2`.









| Argument | Description |
| ---- | ----------- |
| `A` |  |
| `B` |  |








---

## Two.Vector.angleBetween


__Returns__:



+ `Radians`



The angle between points `v1` and `v2`.









| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |








---

## Two.Vector.distanceBetween


__Returns__:



+ `Number`



The distance between points `v1` and `v2`. Distance is always positive.









| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |








---

## Two.Vector.distanceBetweenSquared


__Returns__:



+ `Number`



The squared distance between points `v1` and `v2`.









| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |








---

## Two.Vector.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.Vector} to any object. Handy if you'd like to extend the {@link Two.Vector} class on a custom class.





---

## Two.Vector#set


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Set the x / y components of a vector to specific number values.





---

## Two.Vector#copy


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Copy the x / y components of another object `v`.





---

## Two.Vector#clear


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.











Set the x / y component values of the vector to zero.





---

## Two.Vector#clone


__Returns__:



+ `Two.Vector`



- A new instance of {@link Two.Vector}.











Create a new vector and copy the existing values onto the newly created instance.





---

## Two.Vector#add


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Add an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#add


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Add the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#add


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Add `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::




---

## Two.Vector#addSelf
















---

## Two.Vector#sub


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#sub


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#sub


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Subtract `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::




---

## Two.Vector#subtract
















---

## Two.Vector#subSelf
















---

## Two.Vector#subtractSelf
















---

## Two.Vector#multiply


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Multiply an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#multiply


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Multiply the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#multiply


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Multiply `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::




---

## Two.Vector#multiplySelf
















---

## Two.Vector#multiplyScalar








| Argument | Description |
| ---- | ----------- |
| `s` | The scalar to multiply by. |


Mulitiply the vector by a single number. Shorthand to call {@link Two.Vector#multiply} directly.





---

## Two.Vector#divide


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Divide an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#divide


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Divide the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#divide


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Divide `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::




---

## Two.Vector#divideSelf
















---

## Two.Vector#divideScalar








| Argument | Description |
| ---- | ----------- |
| `s` | The scalar to divide by. |


Divide the vector by a single number. Shorthand to call {@link Two.Vector#divide} directly.





---

## Two.Vector#negate










Invert each component's sign value.





---

## Two.Vector#negate


__Returns__:



+ `Number`













Get the [dot product]{@link https://en.wikipedia.org/wiki/Dot_product} of the vector.





---

## Two.Vector#length


__Returns__:



+ `Number`













Get the length of a vector.





---

## Two.Vector#lengthSquared


__Returns__:



+ `Number`













Get the length of the vector to the power of two. Widely used as less expensive than {@link Two.Vector#length}, because it isn't square-rooting any numbers.





---

## Two.Vector#normalize










Normalize the vector from negative one to one.





---

## Two.Vector#distanceTo


__Returns__:



+ `Number`













Get the distance between two vectors.





---

## Two.Vector#distanceToSquared


__Returns__:



+ `Number`













Get the distance between two vectors to the power of two. Widely used as less expensive than {@link Two.Vector#distanceTo}, because it isn't square-rooting any numbers.





---

## Two.Vector#setLength








| Argument | Description |
| ---- | ----------- |
| `l` | length to set vector to. |


Set the length of a vector.





---

## Two.Vector#equals


__Returns__:



+ `Boolean`











| Argument | Description |
| ---- | ----------- |
| `v` | The vector to compare against. |
| `eps` | An options epsilon for precision. |


Qualify if one vector roughly equal another. With a margin of error defined by epsilon.





---

## Two.Vector#lerp








| Argument | Description |
| ---- | ----------- |
| `v` | The destination vector to step towards. |
| `t` | The zero to one value of how close the current vector gets to the destination vector. |


Linear interpolate one vector to another by an amount `t` defined as a zero to one number.





---

## Two.Vector#isZero


__Returns__:



+ `Boolean`











| Argument | Description |
| ---- | ----------- |
| `eps` | Optional precision amount to check against. |


Check to see if vector is roughly zero, based on the `epsilon` precision value.





---

## Two.Vector#toString


__Returns__:



+ `String`













Return a comma-separated string of x, y value. Great for storing in a database.





---

## Two.Vector#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the vector.





---

## Two.Vector#rotate








| Argument | Description |
| ---- | ----------- |
| `radians` | The amoun to rotate the vector by. |


Rotate a vector.





---

## Two.Vector.subtract.Two.Vector.subtract


__Returns__:



+ `Two.Vector`











| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |


Subtract two vectors: `v2` from `v1`.





---

## Two.Vector#addSelf#addSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Add an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#addSelf#addSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Add the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#addSelf#addSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Add `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::




---

## Two.Vector#subtract#subtract


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#subtract#subtract


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#subtract#subtract


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Subtract `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::




---

## Two.Vector#subSelf#subSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#subSelf#subSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#subSelf#subSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Subtract `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::




---

## Two.Vector#subtractSelf#subtractSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#subtractSelf#subtractSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#subtractSelf#subtractSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Subtract `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::




---

## Two.Vector#multiplySelf#multiplySelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Multiply an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#multiplySelf#multiplySelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Multiply the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#multiplySelf#multiplySelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Multiply `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::




---

## Two.Vector#divideSelf#divideSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Divide an object with x / y component values to the instance.


::: tip overloaded

:::




---

## Two.Vector#divideSelf#divideSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Divide the **same** number to both x / y component values of the instance.


::: tip overloaded

:::




---

## Two.Vector#divideSelf#divideSelf


__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Divide `x` / `y` values to their respective component value on the instance.


::: tip overloaded

:::



