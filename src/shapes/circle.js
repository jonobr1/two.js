(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, HALF_PI = Math.PI / 2;
  var cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  // Circular coefficient
  var c = (4 / 3) * Math.tan(Math.PI / 8);

  var Circle = Two.Circle = function(ox, oy, r, res) {

    var amount = res || 5;

    var points = _.map(_.range(amount), function(i) {
      return new Two.Anchor();
    }, this);

    Path.call(this, points, true, true, true);

    this.radius = r;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(Circle, {

    Properties: ['radius'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(Circle.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(Circle.prototype, Path.prototype, {

    _radius: 0,
    _flagRadius: false,

    constructor: Circle,

    _update: function() {

      if (this._flagRadius) {
        for (var i = 0, l = this.vertices.length, last = l - 1; i < l; i++) {

          var pct = i / last;
          var theta = pct * TWO_PI;

          var radius = this._radius;
          var ct = cos(theta);
          var st = sin(theta);
          var rc = radius * c;

          var x = radius * cos(theta);
          var y = radius * sin(theta);

          var lx = i === 0 ? 0 : rc * cos(theta - HALF_PI);
          var ly = i === 0 ? 0 : rc * sin(theta - HALF_PI);

          var rx = i === last ? 0 : rc * cos(theta + HALF_PI);
          var ry = i === last ? 0 : rc * sin(theta + HALF_PI);

          var v = this.vertices[i];

          v.command = i === 0 ? Two.Commands.move : Two.Commands.curve;
          v.set(x, y);
          v.controls.left.set(lx, ly);
          v.controls.right.set(rx, ry);

        }
      }

      Path.prototype._update.call(this);
      return this;

    },

    flagReset: function() {

      this._flagRadius = false;

      Path.prototype.flagReset.call(this);
      return this;

    },

    clone: function(parent) {

      var clone = new Circle(0, 0, this.radius, this.vertices.length);
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

  Circle.MakeObservable(Circle.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
