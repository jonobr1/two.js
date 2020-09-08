# Two.Vector



A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | Any number to represent the horizontal x-component of the vector. |
| `y` | Any number to represent the vertical y-component of the vector. |



---

<div class="static ">

## Two.Vector.zero








Handy reference to a vector with component values 0, 0 at all times.









</div>



---

<div class="static ">

## Two.Vector.add




__Returns__:



+ `Two.Vector`











| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |


Add two vectors together.



</div>



---

<div class="static ">

## Two.Vector.sub




__Returns__:



+ `Two.Vector`











| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |


Subtract two vectors: `v2` from `v1`.



</div>



---

<div class="static ">

## Two.Vector.subtract












Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).



</div>



---

<div class="static ">

## Two.Vector.ratioBetween




__Returns__:



+ `Number`



The ratio betwen two points `v1` and `v2`.









| Argument | Description |
| ---- | ----------- |
| `A` |  |
| `B` |  |






</div>



---

<div class="static ">

## Two.Vector.angleBetween




__Returns__:



+ `Radians`



The angle between points `v1` and `v2`.









| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |






</div>



---

<div class="static ">

## Two.Vector.distanceBetween




__Returns__:



+ `Number`



The distance between points `v1` and `v2`. Distance is always positive.









| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |






</div>



---

<div class="static ">

## Two.Vector.distanceBetweenSquared




__Returns__:



+ `Number`



The squared distance between points `v1` and `v2`.









| Argument | Description |
| ---- | ----------- |
| `v1` |  |
| `v2` |  |






</div>



---

<div class="static ">

## Two.Vector.MakeObservable










| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.Vector](/documentation/vector) to any object. Handy if you'd like to extend the [Two.Vector](/documentation/vector) class on a custom class.



</div>



---

<div class="instance ">

## Two.Vector.x








The horizontal x-component of the vector.









</div>



---

<div class="instance ">

## Two.Vector.y








The vertical y-component of the vector.









</div>



---

<div class="instance ">

## Two.Vector.set




__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Set the x / y components of a vector to specific number values.



</div>



---

<div class="instance ">

## Two.Vector.copy




__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Copy the x / y components of another object `v`.



</div>



---

<div class="instance ">

## Two.Vector.clear




__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.











Set the x / y component values of the vector to zero.



</div>



---

<div class="instance ">

## Two.Vector.clone




__Returns__:



+ `Two.Vector`



- A new instance of [Two.Vector](/documentation/vector).











Create a new vector and copy the existing values onto the newly created instance.



</div>



---

<div class="instance overloaded">

## Two.Vector.add


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Add an object with x / y component values to the instance.





</div>



---

<div class="instance overloaded">

## Two.Vector.add


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Add the **same** number to both x / y component values of the instance.





</div>



---

<div class="instance overloaded">

## Two.Vector.add


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Add `x` / `y` values to their respective component value on the instance.





</div>



---

<div class="instance ">

## Two.Vector.addSelf












Alias for [Two.Vector.add](/documentation/vector#two-vector-add).



</div>



---

<div class="instance overloaded">

## Two.Vector.sub


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract an object with x / y component values to the instance.





</div>



---

<div class="instance overloaded">

## Two.Vector.sub


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Subtract the **same** number to both x / y component values of the instance.





</div>



---

<div class="instance overloaded">

## Two.Vector.sub


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Subtract `x` / `y` values to their respective component value on the instance.





</div>



---

<div class="instance ">

## Two.Vector.subtract












Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).



</div>



---

<div class="instance ">

## Two.Vector.subSelf












Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).



</div>



---

<div class="instance ">

## Two.Vector.subtractSelf












Alias for [Two.Vector.sub](/documentation/vector#two-vector-sub).



</div>



---

<div class="instance overloaded">

## Two.Vector.multiply


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Multiply an object with x / y component values to the instance.





</div>



---

<div class="instance overloaded">

## Two.Vector.multiply


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Multiply the **same** number to both x / y component values of the instance.





</div>



---

<div class="instance overloaded">

## Two.Vector.multiply


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Multiply `x` / `y` values to their respective component value on the instance.





</div>



---

<div class="instance ">

## Two.Vector.multiplySelf












Alias for [Two.Vector.multiply](/documentation/vector#two-vector-multiply).



</div>



---

<div class="instance ">

## Two.Vector.multiplyScalar










| Argument | Description |
| ---- | ----------- |
| `s` | The scalar to multiply by. |


Mulitiply the vector by a single number. Shorthand to call [Two.Vector.multiply](/documentation/vector#two-vector-multiply) directly.



</div>



---

<div class="instance overloaded">

## Two.Vector.divide


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Divide an object with x / y component values to the instance.





</div>



---

<div class="instance overloaded">

## Two.Vector.divide


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `v` |  |


Divide the **same** number to both x / y component values of the instance.





</div>



---

<div class="instance overloaded">

## Two.Vector.divide


_Overloaded_



__Returns__:



+ `Two.Vector`



- An instance of itself for the purpose of chaining.









| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |


Divide `x` / `y` values to their respective component value on the instance.





</div>



---

<div class="instance ">

## Two.Vector.divideSelf












Alias for [Two.Vector.divide](/documentation/vector#two-vector-divide).



</div>



---

<div class="instance ">

## Two.Vector.divideScalar










| Argument | Description |
| ---- | ----------- |
| `s` | The scalar to divide by. |


Divide the vector by a single number. Shorthand to call [Two.Vector.divide](/documentation/vector#two-vector-divide) directly.



</div>



---

<div class="instance ">

## Two.Vector.negate












Invert each component's sign value.



</div>



---

<div class="instance ">

## Two.Vector.negate




__Returns__:



+ `Number`













Get the [dot product][https://en.wikipedia.org/wiki/Dot_product](https://en.wikipedia.org/wiki/Dot_product) of the vector.



</div>



---

<div class="instance ">

## Two.Vector.length




__Returns__:



+ `Number`













Get the length of a vector.



</div>



---

<div class="instance ">

## Two.Vector.lengthSquared




__Returns__:



+ `Number`













Get the length of the vector to the power of two. Widely used as less expensive than [Two.Vector.length](/documentation/vector#two-vector-length), because it isn't square-rooting any numbers.



</div>



---

<div class="instance ">

## Two.Vector.normalize












Normalize the vector from negative one to one.



</div>



---

<div class="instance ">

## Two.Vector.distanceTo




__Returns__:



+ `Number`













Get the distance between two vectors.



</div>



---

<div class="instance ">

## Two.Vector.distanceToSquared




__Returns__:



+ `Number`













Get the distance between two vectors to the power of two. Widely used as less expensive than [Two.Vector.distanceTo](/documentation/vector#two-vector-distanceto), because it isn't square-rooting any numbers.



</div>



---

<div class="instance ">

## Two.Vector.setLength










| Argument | Description |
| ---- | ----------- |
| `l` | length to set vector to. |


Set the length of a vector.



</div>



---

<div class="instance ">

## Two.Vector.equals




__Returns__:



+ `Boolean`











| Argument | Description |
| ---- | ----------- |
| `v` | The vector to compare against. |
| `eps` | An options epsilon for precision. |


Qualify if one vector roughly equal another. With a margin of error defined by epsilon.



</div>



---

<div class="instance ">

## Two.Vector.lerp










| Argument | Description |
| ---- | ----------- |
| `v` | The destination vector to step towards. |
| `t` | The zero to one value of how close the current vector gets to the destination vector. |


Linear interpolate one vector to another by an amount `t` defined as a zero to one number.



</div>



---

<div class="instance ">

## Two.Vector.isZero




__Returns__:



+ `Boolean`











| Argument | Description |
| ---- | ----------- |
| `eps` | Optional precision amount to check against. |


Check to see if vector is roughly zero, based on the `epsilon` precision value.



</div>



---

<div class="instance ">

## Two.Vector.toString




__Returns__:



+ `String`













Return a comma-separated string of x, y value. Great for storing in a database.



</div>



---

<div class="instance ">

## Two.Vector.toObject




__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the vector.



</div>



---

<div class="instance ">

## Two.Vector.rotate










| Argument | Description |
| ---- | ----------- |
| `radians` | The amoun to rotate the vector by. |


Rotate a vector.



</div>


