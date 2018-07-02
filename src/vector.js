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
     * @property {Number} x - The horizontal x-component of the vector.
     */
    this.x = x || 0;

    /**
     * @name Two.Vector#y
     * @property {Number} y - The vertical y-component of the vector.
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

    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    copy: function(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    },

    clear: function() {
      this.x = 0;
      this.y = 0;
      return this;
    },

    clone: function() {
      return new Vector(this.x, this.y);
    },

    add: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x.x) && _.isNumber(x.y)) {
          this.x += x.x;
          this.y += x.y;
        } else {
          this.x += x;
          this.y += x;
        }
      } else {
        this.x += x;
        this.y += y;
      }
      return this;
    },

    addSelf: function(v) {
      return this.add(v);
    },

    sub: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x.x) && _.isNumber(x.y)) {
          this.x -= x.x;
          this.y -= x.y;
        } else {
          this.x -= x;
          this.y -= x;
        }
      } else {
        this.x -= x;
        this.y -= y;
      }
      return this;
    },

    subtract: function() {
      return Vector.prototype.sub.apply(this, arguments);
    },

    subSelf: function(v) {
      return this.sub(v);
    },

    subtractSelf: function(v) {
      return this.sub(v);
    },

    multiply: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x.x) && _.isNumber(x.y)) {
          this.x *= x.x;
          this.y *= x.y;
        } else {
          this.x *= x;
          this.y *= x;
        }
      } else {
        this.x *= x;
        this.y *= y;
      }
      return this;
    },

    multiplySelf: function(v) {
      return this.multiply.apply(this, arguments);
    },

    multiplyScalar: function(s) {
      return this.multiply.apply(this, arguments);
    },

    divide: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (_.isNumber(x.x) && _.isNumber(x.y)) {
          this.x /= x.x;
          this.y /= x.y;
        } else {
          this.x /= x;
          this.y /= x;
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

    divideScalar: function(s) {
      return this.divide.apply(this, arguments);
    },

    negate: function() {
      return this.multiply(-1);
    },

    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },

    lengthSquared: function() {
      return this.x * this.x + this.y * this.y;
    },

    length: function() {
      return Math.sqrt(this.lengthSquared());
    },

    normalize: function() {
      return this.divideScalar(this.length());
    },

    distanceTo: function(v) {
      return Math.sqrt(this.distanceToSquared(v));
    },

    distanceToSquared: function(v) {
      var dx = this.x - v.x,
          dy = this.y - v.y;
      return dx * dx + dy * dy;
    },

    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },

    equals: function(v, eps) {
      eps = (typeof eps === 'undefined') ?  0.0001 : eps;
      return (this.distanceTo(v) < eps);
    },

    lerp: function(v, t) {
      var x = (v.x - this.x) * t + this.x;
      var y = (v.y - this.y) * t + this.y;
      return this.set(x, y);
    },

    isZero: function(eps) {
      eps = (typeof eps === 'undefined') ?  0.0001 : eps;
      return (this.length() < eps);
    },

    toString: function() {
      return this.x + ', ' + this.y;
    },

    toObject: function() {
      return { x: this.x, y: this.y };
    },

    rotate: function (radians) {
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      this.x = this.x * cos - this.y * sin;
      this.y = this.x * sin + this.y * cos;
      return this;
    }

  });

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
        if (_.isNumber(x.x) && _.isNumber(x.y)) {
          this._x += x.x;
          this._y += x.y;
        } else {
          this._x += x;
          this._y += x;
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
        if (_.isNumber(x.x) && _.isNumber(x.y)) {
          this._x -= x.x;
          this._y -= x.y;
        } else {
          this._x -= x;
          this._y -= x;
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
        if (_.isNumber(x.x) && _.isNumber(x.y)) {
          this._x *= x.x;
          this._y *= x.y;
        } else {
          this._x *= x;
          this._y *= x;
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
        if (_.isNumber(x.x) && _.isNumber(x.y)) {
          this._x /= x.x;
          this._y /= x.y;
        } else {
          this._x /= x;
          this._y /= x;
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
