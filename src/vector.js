import { Events } from './events.js';
import { toFixed } from './utils/math.js';

const proto = {
  x: {
    enumerable: true,
    get: function () {
      return this._x;
    },
    set: function (v) {
      if (this._x !== v) {
        this._x = v;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    },
  },
  y: {
    enumerable: true,
    get: function () {
      return this._y;
    },
    set: function (v) {
      if (this._y !== v) {
        this._y = v;
        if (this._bound) {
          this.dispatchEvent(Events.Types.change);
        }
      }
    },
  },
};

/**
 * @name Two.Vector
 * @class
 * @extends Two.Events
 * @param {Number} [x=0] - Any number to represent the horizontal `x` component of the vector.
 * @param {Number} [y=0] - Any number to represent the vertical `y` component of the vector.
 * @description A class to store `x` / `y` component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.
 */
export class Vector extends Events {
  /**
   * @name Two.Vector#_x
   * @private
   */
  _x = 0;
  /**
   * @name Two.Vector#_y
   * @private
   */
  _y = 0;

  constructor(x = 0, y = 0) {
    super();

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    /**
     * @name Two.Vector#x
     * @property {Number} - The horizontal x-component of the vector.
     * @type {Number}
     */
    this.x = x;

    /**
     * @name Two.Vector#y
     * @property {Number} - The vertical y-component of the vector.
     * @type {Number}
     */
    this.y = y;
  }

  /**
   * @name Two.Vector.zero
   * @readonly
   * @property {Two.Vector} - Handy reference to a vector with component values 0, 0 at all times.
   */
  static zero = new Vector();

  /**
   * @name Two.Vector.left
   * @readonly
   * @property {Two.Vector} - Handy reference to a vector with component values -1, 0 at all times.
   */
  static left = new Vector(-1, 0);

  /**
   * @name Two.Vector.right
   * @readonly
   * @property {Two.Vector} - Handy reference to a vector with component values 1, 0 at all times.
   */
  static right = new Vector(1, 0);

  /**
   * @name Two.Vector.up
   * @readonly
   * @property {Two.Vector} - Handy reference to a vector with component values 0, -1 at all times.
   */
  static up = new Vector(0, -1);

  /**
   * @name Two.Vector.down
   * @readonly
   * @property {Two.Vector} - Handy reference to a vector with component values 0, 1 at all times.
   */
  static down = new Vector(0, 1);

  /**
   * @name Two.Vector.add
   * @function
   * @param {Two.Vector} v1 - First {@link Two.Vector}
   * @param {Two.Vector} v2 - Second {@link Two.Vector}
   * @returns {Two.Vector}
   * @description Add two vectors together.
   */
  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  /**
   * @name Two.Vector.sub
   * @function
   * @param {Two.Vector} v1 - First {@link Two.Vector}
   * @param {Two.Vector} v2 - Second {@link Two.Vector}
   * @returns {Two.Vector}
   * @description Subtract two vectors: `v2` from `v1`.
   */
  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  /**
   * @name Two.Vector.subtract
   * @function
   * @description Alias for {@link Two.Vector.sub}.
   */
  static subtract(v1, v2) {
    return Vector.sub(v1, v2);
  }

  /**
   * @name Two.Vector.ratioBetween
   * @function
   * @param {Two.Vector} v1 - First {@link Two.Vector}
   * @param {Two.Vector} v2 - Second {@link Two.Vector}
   * @returns {Number} The ratio betwen two points `v1` and `v2`.
   */
  static ratioBetween(v1, v2) {
    return (v1.x * v2.x + v1.y * v2.y) / (v1.length() * v2.length());
  }

  /**
   * @name Two.Vector.angleBetween
   * @function
   * @param {Two.Vector} v1 - First {@link Two.Vector}
   * @param {Two.Vector} v2 - Second {@link Two.Vector}
   * @returns {Number} The angle between points `v1` and `v2`.
   */
  static angleBetween(v1, v2) {
    if (arguments.length >= 4) {
      const dx = arguments[0] - arguments[2];
      const dy = arguments[1] - arguments[3];

      return Math.atan2(dy, dx);
    }

    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;

    return Math.atan2(dy, dx);
  }

  /**
   * @name Two.Vector.distanceBetween
   * @function
   * @param {Two.Vector} v1 - First {@link Two.Vector}
   * @param {Two.Vector} v2 - Second {@link Two.Vector}
   * @returns {Number} The distance between points `v1` and `v2`. Distance is always positive.
   */
  static distanceBetween(v1, v2) {
    return Math.sqrt(Vector.distanceBetweenSquared(v1, v2));
  }

  /**
   * @name Two.Vector.distanceBetweenSquared
   * @function
   * @param {Two.Vector} v1 - First {@link Two.Vector}
   * @param {Two.Vector} v2 - Second {@link Two.Vector}
   * @returns {Number} The squared distance between points `v1` and `v2`.
   */
  static distanceBetweenSquared(v1, v2) {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;

    return dx * dx + dy * dy;
  }

  //

  /**
   * @name Two.Vector#set
   * @function
   * @param {number} x - Value of `x` component
   * @param {number} y - Value of `y` component
   */
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * @name Two.Vector#copy
   * @function
   * @param {Two.Vector} v - The {@link Two.Vector} to copy
   * @description Copy the `x` / `y` components of another object {@link Two.Vector}.
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /**
   * @name Two.Vector#clear
   * @function
   * @description Set the `x` / `y` component values of the vector to zero.
   */
  clear() {
    this.x = 0;
    this.y = 0;
    return this;
  }

  /**
   * @name Two.Vector#clone
   * @function
   * @description Create a new vector and copy the existing values onto the newly created instance.
   * @return {Two.Vector}
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * @name Two.Vector#add
   * @function
   * @param {Two.Vector} v - The {@link Two.Vector} to add
   * @description Add an object with `x` / `y` component values to the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#add
   * @function
   * @param {Number} n - Number to add
   * @description Add the **same** number to both `x` / `y` component values of the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#add
   * @function
   * @param {Number} x - Number to add to `x` component
   * @param {Number} y - Number to add to `y` component
   * @description Add `x` / `y` values to their respective component value on the instance.
   * @overloaded
   */
  add(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this.x += x;
        this.y += x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this.x += x.x;
        this.y += x.y;
      }
    } else {
      this.x += x;
      this.y += y;
    }
    return this;
  }

  /**
   * @name Two.Vector#addSelf
   * @function
   * @description Alias for {@link Two.Vector.add}.
   */
  addSelf(v) {
    return this.add.apply(this, arguments);
  }

  /**
   * @name Two.Vector#sub
   * @function
   * @param {Two.Vector} v - The amount as a {@link Two.Vector} to subtract
   * @description Subtract an object with `x` / `y` component values to the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#sub
   * @function
   * @param {Number} n - Number to subtract
   * @description Subtract the **same** number to both `x` / `y` component values of the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#sub
   * @function
   * @param {Number} x - Number to subtract from `x` component
   * @param {Number} y - Number to subtract from `y` component
   * @description Subtract `x` / `y` values to their respective component value on the instance.
   * @overloaded
   */
  sub(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this.x -= x;
        this.y -= x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this.x -= x.x;
        this.y -= x.y;
      }
    } else {
      this.x -= x;
      this.y -= y;
    }
    return this;
  }

  /**
   * @name Two.Vector#subtract
   * @function
   * @description Alias for {@link Two.Vector.sub}.
   */
  subtract() {
    return this.sub.apply(this, arguments);
  }

  /**
   * @name Two.Vector#subSelf
   * @function
   * @description Alias for {@link Two.Vector.sub}.
   */
  subSelf(v) {
    return this.sub.apply(this, arguments);
  }

  /**
   * @name Two.Vector#subtractSelf
   * @function
   * @description Alias for {@link Two.Vector.sub}.
   */
  subtractSelf(v) {
    return this.sub.apply(this, arguments);
  }

  /**
   * @name Two.Vector#multiply
   * @function
   * @param {Two.Vector} v - The {@link Two.Vector} to multiply
   * @description Multiply an object with `x` / `y` component values to the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#multiply
   * @function
   * @param {Number} n - The number to multiply
   * @description Multiply the **same** number to both x / y component values of the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#multiply
   * @function
   * @param {Number} x - The number to multiply to `x` component
   * @param {Number} y - The number to multiply to `y` component
   * @description Multiply `x` / `y` values to their respective component value on the instance.
   * @overloaded
   */
  multiply(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this.x *= x;
        this.y *= x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this.x *= x.x;
        this.y *= x.y;
      }
    } else {
      this.x *= x;
      this.y *= y;
    }
    return this;
  }

  /**
   * @name Two.Vector#multiplySelf
   * @function
   * @description Alias for {@link Two.Vector.multiply}.
   */
  multiplySelf(v) {
    return this.multiply.apply(this, arguments);
  }

  /**
   * @name Two.Vector#multiplyScalar
   * @function
   * @param {Number} s - The scalar to multiply by.
   * @description Mulitiply the vector by a single number. Shorthand to call {@link Two.Vector#multiply} directly.
   */
  multiplyScalar(s) {
    return this.multiply(s);
  }

  /**
   * @name Two.Vector#divide
   * @function
   * @param {Two.Vector} v - The {@link Two.Vector} to divide
   * @description Divide an object with `x` / `y` component values to the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#divide
   * @function
   * @param {Number} n - The number to divide
   * @description Divide the **same** number to both x / y component values of the instance.
   * @overloaded
   */

  /**
   * @name Two.Vector#divide
   * @function
   * @param {Number} x - The number to divide on the `x` component
   * @param {Number} y - The number to divide on the `y` component
   * @description Divide `x` / `y` values to their respective component value on the instance.
   * @overloaded
   */
  divide(x, y) {
    if (arguments.length <= 0) {
      return this;
    } else if (arguments.length <= 1) {
      if (typeof x === 'number') {
        this.x /= x;
        this.y /= x;
      } else if (x && typeof x.x === 'number' && typeof x.y === 'number') {
        this.x /= x.x;
        this.y /= x.y;
      }
    } else {
      this.x /= x;
      this.y /= y;
    }
    if (isNaN(this.x)) {
      this.x = 0;
    }
    if (isNaN(this.y)) {
      this.y = 0;
    }
    return this;
  }

  /**
   * @name Two.Vector#divideSelf
   * @function
   * @description Alias for {@link Two.Vector.divide}.
   */
  divideSelf(v) {
    return this.divide.apply(this, arguments);
  }

  /**
   * @name Two.Vector#divideScalar
   * @function
   * @param {Number} s - The scalar to divide by.
   * @description Divide the vector by a single number. Shorthand to call {@link Two.Vector#divide} directly.
   */
  divideScalar(s) {
    return this.divide(s);
  }

  /**
   * @name Two.Vector#negate
   * @function
   * @description Invert each component's sign value.
   */
  negate() {
    return this.multiply(-1);
  }

  /**
   * @name Two.Vector#dot
   * @function
   * @returns {Number}
   * @description Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * @name Two.Vector#length
   * @function
   * @returns {Number}
   * @description Get the length of a vector.
   */
  length() {
    return Math.sqrt(this.lengthSquared());
  }

  /**
   * @name Two.Vector#lengthSquared
   * @function
   * @returns {Number}
   * @description Get the length of the vector to the power of two. Widely used as less expensive than {@link Two.Vector#length} because it isn't square-rooting any numbers.
   */
  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * @name Two.Vector#normalize
   * @function
   * @description Normalize the vector from negative one to one.
   */
  normalize() {
    return this.divideScalar(this.length());
  }

  /**
   * @name Two.Vector#distanceTo
   * @function
   * @returns {Number}
   * @description Get the distance between two vectors.
   */
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }

  /**
   * @name Two.Vector#distanceToSquared
   * @function
   * @returns {Number}
   * @description Get the distance between two vectors to the power of two. Widely used as less expensive than {@link Two.Vector#distanceTo} because it isn't square-rooting any numbers.
   */
  distanceToSquared(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  /**
   * @name Two.Vector#setLength
   * @function
   * @param {Number} l - length to set vector to.
   * @description Set the length of a vector.
   */
  setLength(l) {
    return this.normalize().multiplyScalar(l);
  }

  /**
   * @name Two.Vector#equals
   * @function
   * @param {Two.Vector} v - The vector to compare against.
   * @param {Number} [eps=0.0001] - An options epsilon for precision.
   * @returns {Boolean}
   * @description Qualify if one vector roughly equal another. With a margin of error defined by epsilon.
   */
  equals(v, eps) {
    eps = typeof eps === 'undefined' ? 0.0001 : eps;
    return this.distanceTo(v) < eps;
  }

  /**
   * @name Two.Vector#lerp
   * @function
   * @param {Two.Vector} v - The destination vector to step towards.
   * @param {Number} t - The zero to one value of how close the current vector gets to the destination vector.
   * @description Linear interpolate one vector to another by an amount `t` defined as a zero to one number.
   * @see [Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.
   */
  lerp(v, t) {
    const x = (v.x - this.x) * t + this.x;
    const y = (v.y - this.y) * t + this.y;
    return this.set(x, y);
  }

  /**
   * @name Two.Vector#isZero
   * @function
   * @param {Number} [eps=0.0001] - Optional precision amount to check against.
   * @returns {Boolean}
   * @description Check to see if vector is roughly zero, based on the `epsilon` precision value.
   */
  isZero(eps) {
    eps = typeof eps === 'undefined' ? 0.0001 : eps;
    return this.length() < eps;
  }

  /**
   * @name Two.Vector#toString
   * @function
   * @returns {String}
   * @description Return a comma-separated string of x, y value. Great for storing in a database.
   */
  toString() {
    return this.x + ', ' + this.y;
  }

  /**
   * @name Two.Vector#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the vector.
   */
  toObject() {
    return { x: toFixed(this.x), y: toFixed(this.y) };
  }

  /**
   * @name Two.Vector#rotate
   * @function
   * @param {Number} radians - The amount to rotate the vector by in radians.
   * @description Rotate a vector.
   */
  rotate(radians) {
    const x = this.x;
    const y = this.y;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
    return this;
  }
}
