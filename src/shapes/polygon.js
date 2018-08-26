(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  var Polygon = Two.Polygon = function(ox, oy, r, sides) {

    sides = Math.max(sides || 0, 3);

    Path.call(this);

    this.closed = true;
    this.automatic = false;

    this.width = r * 2;
    this.height = r * 2;
    this.sides = sides;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(Polygon, {

    Properties: ['width', 'height', 'sides'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(Polygon.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(Polygon.prototype, Path.prototype, {

    _width: 0,
    _height: 0,
    _sides: 0,

    _flagWidth: false,
    _flagHeight: false,
    _flagSides: false,

    constructor: Polygon,

    _update: function() {

      if (this._flagWidth || this._flagHeight || this._flagSides) {

        var sides = this._sides;
        var amount = sides + 1;
        var length = this.vertices.length;

        if (length > sides) {
          this.vertices.splice(sides - 1, length - sides);
          length = sides;
        }

        for (var i = 0; i < amount; i++) {

          var pct = (i + 0.5) / sides;
          var theta = TWO_PI * pct + Math.PI / 2;
          var x = this._width * cos(theta) / 2;
          var y = this._height * sin(theta) / 2;

          if (i >= length) {
            this.vertices.push(new Two.Anchor(x, y));
          } else {
            this.vertices[i].set(x, y);
          }

          this.vertices[i].command = i === 0
            ? Two.Commands.move : Two.Commands.line;

        }

      }

      Path.prototype._update.call(this);
      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = this._flagSides = false;
      Path.prototype.flagReset.call(this);

      return this;

    },

    clone: function(parent) {

      var clone = new Polygon(0, 0, this.radius, this.sides);
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

  Polygon.MakeObservable(Polygon.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
