(function() {

  var Vector = Two.Vector = function(x, y) {
    this._x = x || 0;
    this._y = y || 0;
  };

  Object.defineProperty(Vector.prototype, 'x', {
    get: function() {
      return this._x;
    },
    set: function(v) {
      this._x = v;
      if (this._bound) this.trigger(Two.Events.change, 'x');
    }
  });

  Object.defineProperty(Vector.prototype, 'y', {
    get: function() {
      return this._y;
    },
    set: function(v) {
      this._y = v;
      if (this._bound) this.trigger(Two.Events.change, 'y');
    }
  });

  _.extend(Vector, {

    zero: new Two.Vector()

  });

  _.extend(Vector.prototype, Backbone.Events, {

    set: function(x, y) {
      this._x = x;
      this._y = y;
      if (this._bound) this.trigger(Two.Events.change);
      return this;
    },

    copy: function(v) {
      this._x = v.x;
      this._y = v.y;
      if (this._bound) this.trigger(Two.Events.change);
      return this;
    },

    clear: function() {
      this._x = 0;
      this._y = 0;
      if (this._bound) this.trigger(Two.Events.change);
      return this;
    },

    clone: function() {
      return new Vector(this._x, this._y);
    },

    add: function(v1, v2) {
      this._x = v1.x + v2.x;
      this._y = v1.y + v2.y;
      if (this._bound) this.trigger(Two.Events.change);
      return this;
    },

    addSelf: function(v) {
      this._x += v.x;
      this._y += v.y;
      if (this._bound) this.trigger(Two.Events.change);
      return this;
    },

    sub: function(v1, v2) {
      this._x = v1.x - v2.x;
      this._y = v1.y - v2.y;
      if (this._bound) this.trigger(Two.Events.change);
      return this;
    },

    subSelf: function(v) {
      this._x -= v.x;
      this._y -= v.y;
      if (this._bound) this.trigger(Two.Events.change);
      return this;
    },

    multiplySelf: function(v) {
      this._x *= v.x;
      this._y *= v.y;
      if (this._bound) this.trigger(Two.Events.change);
      return this;
    },

    multiplyScalar: function(s) {
      this._x *= s;
      this._y *= s;
      if (this._bound) this.trigger(Two.Events.change);
      return this;
    },

    divideScalar: function(s) {
      if (s) {
        this._x /= s;
        this._y /= s;
        if (this._bound) this.trigger(Two.Events.change);
        return this;
      }
      return this.clear();
    },

    negate: function() {
      return this.multiplyScalar(-1);
    },

    dot: function(v) {
      return this._x * v.x + this._y * v.y;
    },

    lengthSquared: function() {
      return this._x * this._x + this._y * this._y;
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
      var dx = this._x - v.x,
          dy = this._y - v.y;
      return dx * dx + dy * dy;
    },

    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },

    equals: function(v) {
      return (this.distanceTo(v) < 0.0001 /* almost same position */);
    },

    lerp: function(v, t) {
      var x = (v.x - this._x) * t + this._x;
      var y = (v.y - this._y) * t + this._y;
      return this.set(x, y);
    },

    isZero: function() {
      return (this.length() < 0.0001 /* almost zero */ );
    },

    toString: function() {
      return this._x + ',' + this._y;
    },

    toObject: function() {
      return { x: this._x, y: this._y };
    }
  });

  /**
   * Override Backbone bind / on in order to add properly broadcasting.
   * This allows Two.Vector to not broadcast events unless event listeners
   * are explicity bound to it.
   */

  Two.Vector.prototype.bind = Two.Vector.prototype.on = function() {
    // Enable events selectively
    this._bound = true;

    return Backbone.Events.bind.apply(this, arguments);
  };

  Two.Vector.prototype.unbind = Two.Vector.prototype.on = function() {
    // Disable events selectively
    if (!this._events) {
      // TODO
      // This doesn't actually work right now
      // it would require events to unset the _events prop
      // when no listeners are left
      this._bound = false;
    }

    return Backbone.Events.unbind.apply(this, arguments);
  };

})();
