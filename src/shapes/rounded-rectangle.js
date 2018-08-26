(function(Two) {

  var Path = Two.Path;
  var _ = Two.Utils;

  var RoundedRectangle = Two.RoundedRectangle = function(ox, oy, width, height, radius) {

    if (_.isUndefined(radius)) {
      radius = Math.floor(Math.min(width, height) / 12);
    }

    var amount = 10;

    var points = _.map(_.range(amount), function(i) {
      return new Two.Anchor(0, 0, 0, 0, 0, 0,
        i === 0 ? Two.Commands.move : Two.Commands.curve);
    });

    // points[points.length - 1].command = Two.Commands.close;

    Path.call(this, points);

    this.closed = true;
    this.automatic = false;

    this._renderer.flagRadius = _.bind(RoundedRectangle.FlagRadius, this);

    this.width = width;
    this.height = height;
    this.radius = radius;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(RoundedRectangle, {

    Properties: ['width', 'height'],

    FlagRadius: function() {
      this._flagRadius = true;
    },

    MakeObservable: function(object) {

      Path.MakeObservable(object);
      _.each(RoundedRectangle.Properties, Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'radius', {
        enumerable: true,
        get: function() {
          return this._radius;
        },
        set: function(v) {

          if (this._radius instanceof Two.Vector) {
            this._radius.unbind(Two.Events.change, this._renderer.flagRadius);
          }

          this._radius = v;

          if (this._radius instanceof Two.Vector) {
            this._radius.bind(Two.Events.change, this._renderer.flagRadius);
          }

          this._flagRadius = true;

        }
      });

    }

  });

  _.extend(RoundedRectangle.prototype, Path.prototype, {

    _width: 0,
    _height: 0,
    _radius: 0,

    _flagWidth: false,
    _flagHeight: false,
    _flagRadius: false,

    constructor: RoundedRectangle,

    _update: function() {

      if (this._flagWidth || this._flagHeight || this._flagRadius) {

        var width = this._width;
        var height = this._height;

        var rx, ry;

        if (this._radius instanceof Two.Vector) {
          rx = this._radius.x;
          ry = this._radius.y;
        } else {
          rx = this._radius;
          ry = this._radius;
        }

        var v;
        var w = width / 2;
        var h = height / 2;

        v = this.vertices[0];
        v.x = - (w - rx);
        v.y = - h;

        // Upper Right Corner

        v = this.vertices[1];
        v.x = (w - rx);
        v.y = - h;
        v.controls.left.clear();
        v.controls.right.x = rx;
        v.controls.right.y = 0;

        v = this.vertices[2];
        v.x = w;
        v.y = - (h - ry);
        v.controls.right.clear();
        v.controls.left.clear();

        // Bottom Right Corner

        v = this.vertices[3];
        v.x = w;
        v.y = (h - ry);
        v.controls.left.clear();
        v.controls.right.x = 0;
        v.controls.right.y = ry;

        v = this.vertices[4];
        v.x = (w - rx);
        v.y = h;
        v.controls.right.clear();
        v.controls.left.clear();

        // Bottom Left Corner

        v = this.vertices[5];
        v.x = - (w - rx);
        v.y = h;
        v.controls.left.clear();
        v.controls.right.x = - rx;
        v.controls.right.y = 0;

        v = this.vertices[6];
        v.x = - w;
        v.y = (h - ry);
        v.controls.left.clear();
        v.controls.right.clear();

        // Upper Left Corner

        v = this.vertices[7];
        v.x = - w;
        v.y = - (h - ry);
        v.controls.left.clear();
        v.controls.right.x = 0;
        v.controls.right.y = - ry;

        v = this.vertices[8];
        v.x = - (w - rx);
        v.y = - h;
        v.controls.left.clear();
        v.controls.right.clear();

        v = this.vertices[9];
        v.copy(this.vertices[8]);

      }

      Path.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = this._flagRadius = false;
      Path.prototype.flagReset.call(this);

      return this;

    },

    clone: function(parent) {

      var width = this.width;
      var height = this.height;
      var radius = this.radius;

      var clone = new RoundedRectangle(0, 0, width, height, radius);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    }

  });

  RoundedRectangle.MakeObservable(RoundedRectangle.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
