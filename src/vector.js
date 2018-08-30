(function(Two) {

  var _ = Two.Utils;

  /**
   * @name Two.Vector
   * @class
   * @param {Number} [x=0] - Any number to represent the horizontal x-component of the vector.
   * @param {Number} [y=0] - Any number to represent the vertical y-component of the vector.
   * @description A class to store x / y component vector data. In addition to storing data `Two.Vector` has suped up methods for commonplace mathematical operations.
   */
  var Vector = Two.Vector = function(x, y) {

    /**
     * @name Two.Vector#x
     * @property {Number} - The horizontal x-component of the vector.
     */
    this.x = x || 0;

    /**
     * @name Two.Vector#y
     * @property {Number} - The vertical y-component of the vector.
     */
    this.y = y || 0;

  };

  _.extend(Vector, {

    /**
     * @name Two.Vector.zero
     * @readonly
     * @property {Two.Vector} - Handy reference to a vector with component values 0, 0 at all times.
     */
    zero: new Two.Vector(),

    /**
     * @name Two.Vector.add
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Two.Vector}
     * @description Add two vectors together.
     */
    add: function(v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    },

    /**
     * @name Two.Vector.sub
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Two.Vector}
     * @description Subtract two vectors: `v2` from `v1`.
     */
    sub: function(v1, v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    },

    /**
     * @name Two.Vector.subtract
     * @borrows Two.Vector.sub as Two.Vector.subtract
     */
    subtract: function(v1, v2) {
      return Vector.sub(v1, v2);
    },

    /**
     * @name Two.Vector.ratioBetween
     * @function
     * @param {Two.Vector} A
     * @param {Two.Vector} B
     * @returns {Number} The ratio betwen two points `v1` and `v2`.
     */
    ratioBetween: function(v1, v2) {

      return (v1.x * v2.x + v1.y * v2.y) / (v1.length() * v2.length());

    },

    /**
     * @name Two.Vector.angleBetween
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Radians} The angle between points `v1` and `v2`.
     */
    angleBetween: function(v1, v2) {

      var dx, dy;

      if (arguments.length >= 4) {

        dx = arguments[0] - arguments[2];
        dy = arguments[1] - arguments[3];

        return Math.atan2(dy, dx);

      }

      dx = v1.x - v2.x;
      dy = v1.y - v2.y;

      return Math.atan2(dy, dx);

    },

    /**
     * @name Two.Vector.distanceBetween
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Number} The distance between points `v1` and `v2`. Distance is always positive.
     */
    distanceBetween: function(v1, v2) {

      return Math.sqrt(Vector.distanceBetweenSquared(v1, v2));

    },

    /**
     * @name Two.Vector.distanceBetweenSquared
     * @function
     * @param {Two.Vector} v1
     * @param {Two.Vector} v2
     * @returns {Number} The squared distance between points `v1` and `v2`.
     */
    distanceBetweenSquared: function(v1, v2) {

      var dx = v1.x - v2.x;
      var dy = v1.y - v2.y;

      return dx * dx + dy * dy;

    },

    /**
     * @name Two.Vector.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a `Two.Vector` to any object. Handy if you'd like to extend the `Two.Vector` class on a custom class.
     */
    MakeObservable: function(object) {

      // /**
      //  * Override Backbone bind / on in order to add properly broadcasting.
      //  * This allows Two.Vector to not broadcast events unless event listeners
      //  * are explicity bound to it.
      //  */

      object.bind = object.on = function() {

        if (!this._bound) {
          this._x = this.x;
          this._y = this.y;
          Object.defineProperty(this, 'x', xgs);
          Object.defineProperty(this, 'y', ygs);
          _.extend(this, BoundProto);
          this._bound = true; // Reserved for event initialization check
        }

        Two.Utils.Events.bind.apply(this, arguments);

        return this;

      };

    }

  });

  _.extend(Vector.prototype, Two.Utils.Events, {

    constructor: Vector,

    /**
     * @name Two.Vector#set
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Set the x / y components of a vector to specific number values.
     */
    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    /**
     * @name Two.Vector#copy
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Copy the x / y components of another object `v`.
     */
    copy: function(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    },

    /**
     * @name Two.Vector#clear
     * @function
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Set the x / y component values of the vector to zero.
     */
    clear: function() {
      this.x = 0;
      this.y = 0;
      return this;
    },

    /**
     * @name Two.Vector#clone
     * @function
     * @returns {Two.Vector} - A new instance of `Two.Vector`.
     * @description Create a new vector and copy the existing values onto the newly created instance.
     */
    clone: function() {
      return new Vector(this.x, this.y);
    },

    /**
     * @name Two.Vector#add
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Add an object with x / y component values to the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#add
     * @function
     * @param {Number} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Add the **same** number to both x / y component values of the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#add
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Add `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    add: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this.x += x;
          this.y += x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this.x += x.x;
          this.y += x.y;
        }
      } else {
        this.x += x;
        this.y += y;
      }
      return this;
    },

    /**
     * @name Two.Vector#addSelf
     * @borrows Two.Vector#add as Two.Vector#addSelf
     */
    addSelf: function(v) {
      return this.add.apply(this, arguments);
    },

    /**
     * @name Two.Vector#sub
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Subtract an object with x / y component values to the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#sub
     * @function
     * @param {Number} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Subtract the **same** number to both x / y component values of the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#sub
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Subtract `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    sub: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this.x -= x;
          this.y -= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this.x -= x.x;
          this.y -= x.y;
        }
      } else {
        this.x -= x;
        this.y -= y;
      }
      return this;
    },

    /**
     * @name Two.Vector#subtract
     * @borrows Two.Vector#sub as Two.Vector#subtract
     */
    subtract: function() {
      return this.sub.apply(this, arguments);
    },

    /**
     * @name Two.Vector#subSelf
     * @borrows Two.Vector#sub as Two.Vector#subSelf
     */
    subSelf: function(v) {
      return this.sub.apply(this, arguments);
    },

    /**
     * @name Two.Vector#subtractSelf
     * @borrows Two.Vector#sub as Two.Vector#subtractSelf
     */
    subtractSelf: function(v) {
      return this.sub.apply(this, arguments);
    },

    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Multiply an object with x / y component values to the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Number} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Multiply the **same** number to both x / y component values of the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Multiply `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    multiply: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this.x *= x;
          this.y *= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this.x *= x.x;
          this.y *= x.y;
        }
      } else {
        this.x *= x;
        this.y *= y;
      }
      return this;
    },

    /**
     * @name Two.Vector#multiplySelf
     * @borrows Two.Vector#multiply as Two.Vector#multiplySelf
     */
    multiplySelf: function(v) {
      return this.multiply.apply(this, arguments);
    },

    /**
     * @name Two.Vector#multiplyScalar
     * @function
     * @param {Number} s - The scalar to multiply by.
     * @description Mulitiply the vector by a single number. Shorthand to call {@link Two.Vector#multiply} directly.
     */
    multiplyScalar: function(s) {
      return this.multiply(s);
    },

    /**
     * @name Two.Vector#divide
     * @function
     * @param {Two.Vector} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Divide an object with x / y component values to the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#divide
     * @function
     * @param {Number} v
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Divide the **same** number to both x / y component values of the instance.
     * @overloaded
     */

    /**
     * @name Two.Vector#divide
     * @function
     * @param {Number} x
     * @param {Number} y
     * @returns {Two.Vector} - An instance of itself for the purpose of chaining.
     * @description Divide `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    divide: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this.x /= x;
          this.y /= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this.x /= x.x;
          this.y /= x.y;
        }
      } else {
        this.x /= x;
        this.y /= y;
      }
      if (_.isNaN(this.x)) {
        this.x = 0;
      }
      if (_.isNaN(this.y)) {
        this.y = 0;
      }
      return this;
    },

    /**
     * @name Two.Vector#divideSelf
     * @borrows Two.Vector#divide as Two.Vector#divideSelf
     */
    divideSelf: function(v) {
      return this.divide.apply(this, arguments);
    },

    /**
     * @name Two.Vector#divideScalar
     * @function
     * @param {Number} s - The scalar to divide by.
     * @description Divide the vector by a single number. Shorthand to call {@link Two.Vector#divide} directly.
     */
    divideScalar: function(s) {
      return this.divide(s);
    },

    /**
     * @name Two.Vector#negate
     * @function
     * @description Invert each component's sign value.
     */
    negate: function() {
      return this.multiply(-1);
    },

    /**
     * @name Two.Vector#negate
     * @function
     * @returns {Number}
     * @description Get the [dot product]{@link https://en.wikipedia.org/wiki/Dot_product} of the vector.
     */
    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },

    /**
     * @name Two.Vector#length
     * @function
     * @returns {Number}
     * @description Get the length of a vector.
     */
    length: function() {
      return Math.sqrt(this.lengthSquared());
    },

    /**
     * @name Two.Vector#lengthSquared
     * @function
     * @returns {Number}
     * @description Get the length of the vector to the power of two. Widely used as less expensive than {@link Two.Vector#length}, because it isn't square-rooting any numbers.
     */
    lengthSquared: function() {
      return this.x * this.x + this.y * this.y;
    },

    /**
     * @name Two.Vector#normalize
     * @function
     * @description Normalize the vector from negative one to one.
     */
    normalize: function() {
      return this.divideScalar(this.length());
    },

    /**
     * @name Two.Vector#distanceTo
     * @function
     * @returns {Number}
     * @description Get the distance between two vectors.
     */
    distanceTo: function(v) {
      return Math.sqrt(this.distanceToSquared(v));
    },

    /**
     * @name Two.Vector#distanceToSquared
     * @function
     * @returns {Number}
     * @description Get the distance between two vectors to the power of two. Widely used as less expensive than {@link Two.Vector#distanceTo}, because it isn't square-rooting any numbers.
     */
    distanceToSquared: function(v) {
      var dx = this.x - v.x,
          dy = this.y - v.y;
      return dx * dx + dy * dy;
    },

    /**
     * @name Two.Vector#setLength
     * @function
     * @param {Number} l - length to set vector to.
     * @description Set the length of a vector.
     */
    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },

    /**
     * @name Two.Vector#equals
     * @function
     * @param {Two.Vector} v - The vector to compare against.
     * @param {Number} [eps=0.0001] - An options epsilon for precision.
     * @returns {Boolean}
     * @description Qualify if one vector roughly equal another. With a margin of error defined by epsilon.
     */
    equals: function(v, eps) {
      eps = (typeof eps === 'undefined') ?  0.0001 : eps;
      return (this.distanceTo(v) < eps);
    },

    /**
     * @name Two.Vector#lerp
     * @function
     * @param {Two.Vector} v - The destination vector to step towards.
     * @param {Number} t - The zero to one value of how close the current vector gets to the destination vector.
     * @description Linear interpolate one vector to another by an amount `t` defined as a zero to one number.
     * @see [Matt DesLauriers]{@link https://twitter.com/mattdesl/status/1031305279227478016} has a good thread about this.
     */
    lerp: function(v, t) {
      var x = (v.x - this.x) * t + this.x;
      var y = (v.y - this.y) * t + this.y;
      return this.set(x, y);
    },

    /**
     * @name Two.Vector#isZero
     * @function
     * @param {Number} [eps=0.0001] - Optional precision amount to check against.
     * @returns {Boolean}
     * @description Check to see if vector is roughly zero, based on the `epsilon` precision value.
     */
    isZero: function(eps) {
      eps = (typeof eps === 'undefined') ?  0.0001 : eps;
      return (this.length() < eps);
    },

    /**
     * @name Two.Vector#toString
     * @function
     * @returns {String}
     * @description Return a comma-separated string of x, y value. Great for storing in a database.
     */
    toString: function() {
      return this.x + ', ' + this.y;
    },

    /**
     * @name Two.Vector#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the vector.
     */
    toObject: function() {
      return { x: this.x, y: this.y };
    },

    /**
     * @name Two.Vector#rotate
     * @function
     * @param {Radians} radians - The amoun to rotate the vector by.
     * @description Rotate a vector.
     */
    rotate: function(radians) {
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      this.x = this.x * cos - this.y * sin;
      this.y = this.x * sin + this.y * cos;
      return this;
    }

  });

  // The same set of prototypical functions, but using the underlying
  // getter or setter for `x` and `y` values. This set of functions
  // is used instead of the previously documented ones above when
  // Two.Vector#bind is invoked and there is event dispatching processed
  // on x / y property changes.
  var BoundProto = {

    constructor: Vector,

    set: function(x, y) {
      this._x = x;
      this._y = y;
      return this.trigger(Two.Events.change);
    },

    copy: function(v) {
      this._x = v.x;
      this._y = v.y;
      return this.trigger(Two.Events.change);
    },

    clear: function() {
      this._x = 0;
      this._y = 0;
      return this.trigger(Two.Events.change);
    },

    clone: function() {
      return new Vector(this._x, this._y);
    },

    add: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this._x += x;
          this._y += x;
        }  else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this._x += x.x;
          this._y += x.y;
        }
      } else {
        this._x += x;
        this._y += y;
      }
      return this.trigger(Two.Events.change);
    },

    sub: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this._x -= x;
          this._y -= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this._x -= x.x;
          this._y -= x.y;
        }
      } else {
        this._x -= x;
        this._y -= y;
      }
      return this.trigger(Two.Events.change);
    },

    multiply: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this._x *= x;
          this._y *= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this._x *= x.x;
          this._y *= x.y;
        }
      } else {
        this._x *= x;
        this._y *= y;
      }
      return this.trigger(Two.Events.change);
    },

    divide: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x)) {
          this._x /= x;
          this._y /= x;
        } else if (x && _.isNumber(x.x) && _.isNumber(x.y)) {
          this._x /= x.x;
          this._y /= x.y;
        }
      } else {
        this._x /= x;
        this._y /= y;
      }
      if (_.isNaN(this._x)) {
        this._x = 0;
      }
      if (_.isNaN(this._y)) {
        this._y = 0;
      }
      return this.trigger(Two.Events.change);
    },

    dot: function(v) {
      return this._x * v.x + this._y * v.y;
    },

    lengthSquared: function() {
      return this._x * this._x + this._y * this._y;
    },

    distanceToSquared: function(v) {
      var dx = this._x - v.x,
          dy = this._y - v.y;
      return dx * dx + dy * dy;
    },

    lerp: function(v, t) {
      var x = (v.x - this._x) * t + this._x;
      var y = (v.y - this._y) * t + this._y;
      return this.set(x, y);
    },

    toString: function() {
      return this._x + ', ' + this._y;
    },

    toObject: function() {
      return { x: this._x, y: this._y };
    },

    rotate: function (radians) {
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      this._x = this._x * cos - this._y * sin;
      this._y = this._x * sin + this._y * cos;
      return this;
    }

  };

  var xgs = {
    enumerable: true,
    get: function() {
      return this._x;
    },
    set: function(v) {
      this._x = v;
      this.trigger(Two.Events.change, 'x');
    }
  };

  var ygs = {
    enumerable: true,
    get: function() {
      return this._y;
    },
    set: function(v) {
      this._y = v;
      this.trigger(Two.Events.change, 'y');
    }
  };

  Vector.MakeObservable(Vector.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
