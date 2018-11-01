(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, HALF_PI = Math.PI / 2;
  var cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  // Circular coefficient
  var c = (4 / 3) * Math.tan(Math.PI / 8);

  var Ellipse = Two.Ellipse = function(ox, oy, rx, ry, resolution) {

    if (!_.isNumber(ry)) {
      ry = rx;
    }

    var amount = resolution || 5;

    var points = _.map(_.range(amount), function(i) {
      return new Two.Anchor();
    }, this);

    Path.call(this, points, true, true, true);

    this.width = rx * 2;
    this.height = ry * 2;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(Ellipse, {

    Properties: ['width', 'height'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(Ellipse.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(Ellipse.prototype, Path.prototype, {

    _width: 0,
    _height: 0,

    _flagWidth: false,
    _flagHeight: false,

    constructor: Ellipse,

    _update: function() {

      if (this._flagWidth || this._flagHeight) {
        for (var i = 0, l = this.vertices.length, last = l - 1; i < l; i++) {

          var pct = i / last;
          var theta = pct * TWO_PI;

          var rx = this._width / 2;
          var ry = this._height / 2;
          var ct = cos(theta);
          var st = sin(theta);

          var x = rx * cos(theta);
          var y = ry * sin(theta);

          var lx = i === 0 ? 0 : rx * c * cos(theta - HALF_PI);
          var ly = i === 0 ? 0 : ry * c * sin(theta - HALF_PI);

          var rx = i === last ? 0 : rx * c * cos(theta + HALF_PI);
          var ry = i === last ? 0 : ry * c * sin(theta + HALF_PI);

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

      this._flagWidth = this._flagHeight = false;

      Path.prototype.flagReset.call(this);
      return this;

    },

    clone: function(parent) {

      var rx = this.width / 2;
      var ry = this.height / 2;
      var resolution = this.vertices.length;
      var clone = new Ellipse(0, 0, rx, ry, resolution);

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

  Ellipse.MakeObservable(Ellipse.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
