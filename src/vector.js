(function(Two) {

  var _ = Two.Utils;

  /**
   * @class
   * @name Two.Vector
   * @param {Number} [x=0]
   * @param {Number} [y=0]
   */
  var Vector = Two.Vector = function(x, y) {

    this.x = x || 0;
    this.y = y || 0;

  };

  _.extend(Vector, {

    zero: new Two.Vector(),

    add: function(v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    },

    sub: function(v1, v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    },

    subtract: function(v1, v2) {
      return Vector.sub(v1, v2);
    },

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
      if (arguments.length <= 1) {
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
      if (arguments.length <= 1) {
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
      if (arguments.length <= 1) {
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
      return this.multiply(v);
    },

    multiplyScalar: function(s) {
      return this.multiply(s);
    },

    divide: function(x, y) {
      if (arguments.length <= 1) {
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
      return this.divide(s);
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
      if (arguments.length <= 1) {
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

    sub: function(v1, v2) {
      if (arguments.length <= 1) {
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
      if (arguments.length <= 1) {
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

    divide: function() {
      if (arguments.length <= 1) {
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
