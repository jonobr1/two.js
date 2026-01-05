declare module 'two.js/src/vector' {
  /**
     * @name Two.Vector
     * @class

     * @param {Number} [x=0] - Any number to represent the horizontal x-component of the vector.
     * @param {Number} [y=0] - Any number to represent the vertical y-component of the vector.
     * @description A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.
     */
  export class Vector extends Events {
    /**
     * @name Two.Vector.zero
     * @readonly
     * @property {Vector} - Handy reference to a vector with component values 0, 0 at all times.
     */
    static readonly zero: Vector;
    /**
     * @name Two.Vector.add
     * @function
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {Vector}
     * @description Add two vectors together.
     */
    static add(v1: Vector, v2: Vector): Vector;
    /**
     * @name Two.Vector.sub
     * @function
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {Vector}
     * @description Subtract two vectors: `v2` from `v1`.
     */
    static sub(v1: Vector, v2: Vector): Vector;
    /**
     * @name Two.Vector.subtract
     * @function
     * @description Alias for {@link Two.Vector.sub}.
     */
    static subtract(v1: Vector, v2: Vector): Vector;
    /**
     * @name Two.Vector.ratioBetween
     * @function
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {Number} The ratio betwen two points `v1` and `v2`.
     */
    static ratioBetween(v1: Vector, v2: Vector): number;
    /**
     * @name Two.Vector.angleBetween
     * @function
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {Number} The angle between points `v1` and `v2`.
     */
    static angleBetween(v1: Vector, v2: Vector): number;
    static angleBetween(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * @name Two.Vector.distanceBetween
     * @function
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {Number} The distance between points `v1` and `v2`. Distance is always positive.
     */
    static distanceBetween(v1: Vector, v2: Vector): number;
    /**
     * @name Two.Vector.distanceBetweenSquared
     * @function
     * @param {Vector} v1
     * @param {Vector} v2
     * @returns {Number} The squared distance between points `v1` and `v2`.
     */
    static distanceBetweenSquared(v1: Vector, v2: Vector): number;
    constructor(x?: number, y?: number);
    /**
     * @name Two.Vector#_x
     * @private
     */
    private _x;
    /**
     * @name Two.Vector#_y
     * @private
     */
    private _y;
    /**
     * @name Two.Vector#x
     * @property {Number} - The horizontal x-component of the vector.
     * @type {Number}
     */
    x: number;
    /**
     * @name Two.Vector#y
     * @property {Number} - The vertical y-component of the vector.
     * @type {Number}
     */
    y: number;
    set(x: number, y: number): Vector;
    /**
     * @name Two.Vector#copy
     * @function
     * @param {Vector} v
     * @description Copy the x / y components of another object `v`.
     */
    copy(v: Vector): Vector;
    /**
     * @name Two.Vector#clear
     * @function
     * @description Set the x / y component values of the vector to zero.
     */
    clear(): Vector;
    /**
     * @name Two.Vector#clone
     * @function
     * @description Create a new vector and copy the existing values onto the newly created instance.
     */
    clone(): Vector;
    /**
     * @name Two.Vector#add
     * @function
     * @param {Vector} v
     * @description Add an object with x / y component values to the instance.
     * @overloaded
     */
    add(v: Vector): Vector;
    /**
     * @name Two.Vector#add
     * @function
     * @param {Number} v
     * @description Add the **same** number to both x / y component values of the instance.
     * @overloaded
     */
    add(v: number): Vector;
    /**
     * @name Two.Vector#add
     * @function
     * @param {Number} x
     * @param {Number} y
     * @description Add `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    add(x: number, y: number): Vector;
    /**
     * @name Two.Vector#addSelf
     * @function
     * @description Alias for {@link Two.Vector.add}.
     */
    addSelf(x: number, y: number): Vector;
    addSelf(v: Vector): Vector;
    addSelf(v: number): Vector;
    /**
     * @name Two.Vector#sub
     * @function
     * @param {Vector} v
     * @description Subtract an object with x / y component values to the instance.
     * @overloaded
     */
    sub(v: Vector): Vector;
    /**
     * @name Two.Vector#sub
     * @function
     * @param {Number} v
     * @description Subtract the **same** number to both x / y component values of the instance.
     * @overloaded
     */
    sub(v: number): Vector;
    /**
     * @name Two.Vector#sub
     * @function
     * @param {Number} x
     * @param {Number} y
     * @description Subtract `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    sub(x: number, y: number): Vector;
    /**
     * @name Two.Vector#subtract
     * @function
     * @description Alias for {@link Two.Vector.sub}.
     */
    subtract(x: number, y: number): Vector;
    subtract(v: number): Vector;
    subtract(v: Vector): Vector;
    /**
     * @name Two.Vector#subSelf
     * @function
     * @description Alias for {@link Two.Vector.sub}.
     */
    subSelf(x: number, y: number): Vector;
    subSelf(v: number): Vector;
    subSelf(v: Vector): Vector;
    /**
     * @name Two.Vector#subtractSelf
     * @function
     * @description Alias for {@link Two.Vector.sub}.
     */
    subtractSelft(x: number, y: number): Vector;
    subtractSelft(v: number): Vector;
    subtractSelft(v: Vector): Vector;
    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Vector} v
     * @description Multiply an object with x / y component values to the instance.
     * @overloaded
     */
    multiply(v: number): Vector;
    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Number} v
     * @description Multiply the **same** number to both x / y component values of the instance.
     * @overloaded
     */
    multiply(v: Vector): Vector;
    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Number} x
     * @param {Number} y
     * @description Multiply `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    multiply(x: number, y: number): Vector;
    /**
     * @name Two.Vector#multiplySelf
     * @function
     * @description Alias for {@link Two.Vector.multiply}.
     */
    multiplySelf(v: Vector, ...args: Vector[]): Vector;
    /**
     * @name Two.Vector#multiplyScalar
     * @function
     * @param {Number} s - The scalar to multiply by.
     * @description Mulitiply the vector by a single number. Shorthand to call {@link Two.Vector#multiply} directly.
     */
    multiplyScalar(s: number): Vector;
    /**
     * @name Two.Vector#divide
     * @function
     * @param {Vector} v
     * @description Divide an object with x / y component values to the instance.
     * @overloaded
     */
    divide(v: Vector): Vector;
    /**
     * @name Two.Vector#divide
     * @function
     * @param {Number} v
     * @description Divide the **same** number to both x / y component values of the instance.
     * @overloaded
     */
    divide(v: number): Vector;
    /**
     * @name Two.Vector#divide
     * @function
     * @param {Number} x
     * @param {Number} y
     * @description Divide `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    divide(x: number, y: number): Vector;
    /**
     * @name Two.Vector#divideSelf
     * @function
     * @description Alias for {@link Two.Vector.divide}.
     */
    divideSelf(x: number, y: number): Vector;
    divideSelf(v: number): Vector;
    divideSelf(v: Vector): Vector;
    /**
     * @name Two.Vector#divideScalar
     * @function
     * @param {Number} s - The scalar to divide by.
     * @description Divide the vector by a single number. Shorthand to call {@link Two.Vector#divide} directly.
     */
    divideScalar(s: number): Vector;
    /**
     * @name Two.Vector#negate
     * @function
     * @description Invert each component's sign value.
     */
    negate(): Vector;
    /**
     * @name Two.Vector#negate
     * @function
     * @returns {Number}
     * @description Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.
     */
    dot(v: Vector): number;
    /**
     * @name Two.Vector#length
     * @function
     * @returns {Number}
     * @description Get the length of a vector.
     */
    length(): number;
    /**
     * @name Two.Vector#lengthSquared
     * @function
     * @returns {Number}
     * @description Get the length of the vector to the power of two. Widely used as less expensive than {@link Two.Vector#length} because it isn't square-rooting any numbers.
     */
    lengthSquared(): number;
    /**
     * @name Two.Vector#normalize
     * @function
     * @description Normalize the vector from negative one to one.
     */
    normalize(): Vector;
    /**
     * @name Two.Vector#distanceTo
     * @function
     * @returns {Number}
     * @description Get the distance between two vectors.
     */
    distanceTo(v: Vector): number;
    /**
     * @name Two.Vector#distanceToSquared
     * @function
     * @returns {Number}
     * @description Get the distance between two vectors to the power of two. Widely used as less expensive than {@link Two.Vector#distanceTo} because it isn't square-rooting any numbers.
     */
    distanceToSquared(v: Vector): number;
    /**
     * @name Two.Vector#setLength
     * @function
     * @param {Number} l - length to set vector to.
     * @description Set the length of a vector.
     */
    setLength(l: number): Vector;
    /**
     * @name Two.Vector#equals
     * @function
     * @param {Vector} v - The vector to compare against.
     * @param {Number} [eps=0.0001] - An options epsilon for precision.
     * @returns {Boolean}
     * @description Qualify if one vector roughly equal another. With a margin of error defined by epsilon.
     */
    equals(v: Vector, eps?: number): boolean;
    /**
     * @name Two.Vector#lerp
     * @function
     * @param {Vector} v - The destination vector to step towards.
     * @param {Number} t - The zero to one value of how close the current vector gets to the destination vector.
     * @description Linear interpolate one vector to another by an amount `t` defined as a zero to one number.
     * @see [Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.
     */
    lerp(v: Vector, t: number): Vector;
    /**
     * @name Two.Vector#isZero
     * @function
     * @param {Number} [eps=0.0001] - Optional precision amount to check against.
     * @returns {Boolean}
     * @description Check to see if vector is roughly zero, based on the `epsilon` precision value.
     */
    isZero(eps?: number): boolean;
    /**
     * @name Two.Vector#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the vector.
     */
    toObject(): object;
    /**
     * @name Two.Vector#rotate
     * @function
     * @param {Number} radians - The amount to rotate the vector by in radians.
     * @description Rotate a vector.
     */
    rotate(radians: number): Vector;
  }
  import { Events } from 'two.js/src/events';
}
