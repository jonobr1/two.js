(function() {

  // Localized variables
  var parent, flag, x, y, dx, dy;

  var Vector = Two.Vector = function(x, y) {

    this.x = x || 0;
    this.y = y || 0;

  };

  _.extend(Vector.prototype, {

    // Underlying Properties

    _x: 0,
    _y: 0,

    set: function(x, y) {
      this._x = x;
      this._y = y;
      return this.trigger();
    },

    copy: function(v) {
      this._x = v.x;
      this._y = v.y;
      return this.trigger();
    },

    clear: function() {
      this._x = 0;
      this._y = 0;
      return this.trigger();
    },

    clone: function() {
      return new Vector(this._x, this._y);
    },

    add: function(v1, v2) {
      this._x = v1.x + v2.x;
      this._y = v1.y + v2.y;
      return this.trigger();
    },

    addSelf: function(v) {
      this._x += v.x;
      this._y += v.y;
      return this.trigger();
    },

    sub: function(v1, v2) {
      this._x = v1.x - v2.x;
      this._y = v1.y - v2.y;
      return this.trigger();
    },

    subSelf: function(v) {
      this._x -= v.x;
      this._y -= v.y;
      return this.trigger();
    },

    multiplySelf: function(v) {
      this._x *= v.x;
      this._y *= v.y;
      return this.trigger();
    },

    multiplyScalar: function(s) {
      this._x *= s;
      this._y *= s;
      return this.trigger();
    },

    divideScalar: function(s) {
      if (s) {
        this._x /= s;
        this._y /= s;
        this.trigger();
      } else {
        this.set(0, 0);
      }
      return this;
    },

    negate: function() {
      return this.multiplyScalar(-1);
    },

    dot: function(v) {
      return this._x * v.x + this._y * v.y;
    },

    lengthSquared: function() {
      x = this._x, y = this._y;
      return x * x + y * y;
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
      dx = this._x - v.x, dy = this._y - v.y;
      return dx * dx + dy * dy;
    },

    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },

    equals: function(v) {
      return (this.distanceTo(v) < 0.0001 /* almost same position */);
    },

    lerp: function(v, t) {
      x = (v.x - this._x) * t + this._x;
      y = (v.y - this._y) * t + this._y;
      return this.set(x, y);
    },

    isZero: function() {
      return (this.length() < 0.0001 /* almost zero */ );
    },

    toString: function() {
      return this._x + ',' + this._y;
    },

    toObject: function(o) {
      if (_.isObject(o)) {
        o.x = this._x;
        o.y = this._y;
        return o;
      }
      return { x: this._x, y: this._y };
    },

    // Two.js specifc functionality

    bind: function(parent, flag) {

      this._parent = parent;
      this._flag = flag;

      return this;

    },

    trigger: function() {

      parent = this._parent, flag = this._flag;
      if (parent && flag) {
        parent[flag] = true;
      }

      return this;

    }

  });

  Object.defineProperty(Vector.prototype, 'x', {
    get: function() {
      return this._x;
    },
    set: function(v) {
      this._x = v;
      this.trigger();
    }
  });

  Object.defineProperty(Vector.prototype, 'y', {
    get: function() {
      return this._y;
    },
    set: function(v) {
      this._y = v;
      this.trigger();
    }
  })

})();
