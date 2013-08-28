(function() {

  var commands = Two.Commands;

  /**
   * An object that holds 3 `Two.Vector`s, the anchor point and its
   * corresponding handles: `left` and `right`.
   */
  var Anchor = Two.Anchor = function(x, y, ux, uy, vx, vy, command) {

    Two.Vector.call(this, x, y);

    this._broadcast = _.bind(function() {
      this.trigger(Two.Events.change);
    }, this);

    Object.defineProperty(this, 'command', {

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

    this._command = command || commands.move;

    // TODO: Only add this to commands.curve...
    Anchor.AppendCurveProperties(this);
    this.controls.left.x = _.isNumber(ux) ? ux : x;
    this.controls.left.y = _.isNumber(uy) ? uy : y;
    this.controls.right.x = _.isNumber(vx) ? vx : x;
    this.controls.right.y = _.isNumber(vy) ? vy : y;

  };

  _.extend(Anchor, {

    AppendCurveProperties: function(anchor) {

      var x = this._x, y = this._y;

      anchor.controls = {
        left: new Two.Vector(x, y),
        right: new Two.Vector(x, y)
      };

    }

  });

  _.extend(Anchor.prototype, Two.Vector.prototype, {

    listen: function() {

      if (this._command !== commands.curve) {
        return this;
      }

      if (!_.isObject(this.controls)) {
        Anchor.AppendCurveProperties(this);
      }

      _.each(this.controls, function(v) {
        v.bind(Two.Events.change, this._broadcast);
      }, this);

      return this;

    },

    ignore: function() {

      _.each(this.controls, function(v) {
        v.unbind(Two.Events.change, this._broadcast);
      }, this);

      return this;

    }

  });

})();