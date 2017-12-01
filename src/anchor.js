(function(Two) {

  // Localized variables
  var commands = Two.Commands;
  var _ = Two.Utils;

  /**
   * An object that holds 3 `Two.Vector`s, the anchor point and its
   * corresponding handles: `left` and `right`.
   */
  var Anchor = Two.Anchor = function(x, y, ux, uy, vx, vy, command) {

    Two.Vector.call(this, x, y);

    this._broadcast = _.bind(function() {
      this.trigger(Two.Events.change);
    }, this);

    this._command = command || commands.move;
    this._relative = true;

    if (!command) {
      return this;
    }

    Anchor.AppendCurveProperties(this);

    if (_.isNumber(ux)) {
      this.controls.left.x = ux;
    }
    if (_.isNumber(uy)) {
      this.controls.left.y = uy;
    }
    if (_.isNumber(vx)) {
      this.controls.right.x = vx;
    }
    if (_.isNumber(vy)) {
      this.controls.right.y = vy;
    }

  };

  _.extend(Anchor, {

    AppendCurveProperties: function(anchor) {
      anchor.controls = {
        left: new Two.Vector(0, 0),
        right: new Two.Vector(0, 0)
      };
    }

  });

  var AnchorProto = {

    listen: function() {

      if (!_.isObject(this.controls)) {
        Anchor.AppendCurveProperties(this);
      }

      this.controls.left.bind(Two.Events.change, this._broadcast);
      this.controls.right.bind(Two.Events.change, this._broadcast);

      return this;

    },

    ignore: function() {

      this.controls.left.unbind(Two.Events.change, this._broadcast);
      this.controls.right.unbind(Two.Events.change, this._broadcast);

      return this;

    },

    clone: function() {

      var controls = this.controls;

      var clone = new Two.Anchor(
        this.x,
        this.y,
        controls && controls.left.x,
        controls && controls.left.y,
        controls && controls.right.x,
        controls && controls.right.y,
        this.command
      );
      clone.relative = this._relative;
      return clone;

    },

    toObject: function() {
      var o = {
        x: this.x,
        y: this.y
      };
      if (this._command) {
        o.command = this._command;
      }
      if (this._relative) {
        o.relative = this._relative;
      }
      if (this.controls) {
        o.controls = {
          left: this.controls.left.toObject(),
          right: this.controls.right.toObject()
        };
      }
      return o;
    },

    toString: function() {
      if (!this.controls) {
        return [this._x, this._y].join(', ');
      }
      return [this._x, this._y, this.controls.left.x, this.controls.left.y,
        this.controls.right.x, this.controls.right.y].join(', ');
    }

  };

  Object.defineProperty(Anchor.prototype, 'command', {

    enumerable: true,

    get: function() {
      return this._command;
    },

    set: function(c) {
      this._command = c;
      if (this._command === commands.curve && !_.isObject(this.controls)) {
        Anchor.AppendCurveProperties(this);
      }
      return this.trigger(Two.Events.change);
    }

  });

  Object.defineProperty(Anchor.prototype, 'relative', {

    enumerable: true,

    get: function() {
      return this._relative;
    },

    set: function(b) {
      if (this._relative == b) {
        return this;
      }
      this._relative = !!b;
      return this.trigger(Two.Events.change);
    }

  });

  _.extend(Anchor.prototype, Two.Vector.prototype, AnchorProto);

  // Make it possible to bind and still have the Anchor specific
  // inheritance from Two.Vector
  Two.Anchor.prototype.bind = Two.Anchor.prototype.on = function() {
    Two.Vector.prototype.bind.apply(this, arguments);
    _.extend(this, AnchorProto);
  };

  Two.Anchor.prototype.unbind = Two.Anchor.prototype.off = function() {
    Two.Vector.prototype.unbind.apply(this, arguments);
    _.extend(this, AnchorProto);
  };

})((typeof global !== 'undefined' ? global : this).Two);
