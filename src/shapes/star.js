(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  var Star = Two.Star = function(ox, oy, or, ir, sides) {

    if (!_.isNumber(ir)) {
      ir = or / 2;
    }

    if (!_.isNumber(sides) || sides <= 0) {
      sides = 5;
    }

    var length = sides * 2;

    var points = _.map(_.range(length), function(i) {
      return new Two.Anchor();
    });

    Path.call(this, points, true);

    this.innerRadius = ir;
    this.outerRadius = or;
    this.sides = sides;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(Star, {

    Properties: ['innerRadius', 'outerRadius', 'sides'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(Star.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(Star.prototype, Path.prototype, {

    _innerRadius: 0,
    _outerRadius: 0,
    _sides: 0,

    _flagInnerRadius: false,
    _flagOuterRadius: false,
    _flagSides: false,

    _update: function() {

      if (this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {

        var sides = this._sides * 2;
        var amount = this.vertices.length;

        if (amount > sides) {
          this.vertices.splice(sides - 1, amount - sides);
        }

        for (var i = 0; i < sides; i++) {

          var pct = (i + 0.5) / sides;
          var theta = TWO_PI * pct;
          var r = (i % 2 ? this._innerRadius : this._outerRadius);
          var x = r * cos(theta);
          var y = r * sin(theta);

          if (i >= amount) {
            this.vertices.push(new Two.Anchor(x, y));
          } else {
            this.vertices[i].set(x, y);
          }

        }

      }

      Path.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false;
      Path.prototype.flagReset.call(this);

      return this;

    }

  });

  Star.MakeObservable(Star.prototype);

})((typeof global !== 'undefined' ? global : this).Two);
