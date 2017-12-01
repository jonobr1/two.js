(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  var Ellipse = Two.Ellipse = function(ox, oy, rx, ry) {

    if (!_.isNumber(ry)) {
      ry = rx;
    }

    var amount = Two.Resolution;

    var points = _.map(_.range(amount), function(i) {
      return new Two.Anchor();
    }, this);

    Path.call(this, points, true, true);

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

    _update: function() {

      if (this._flagWidth || this._flagHeight) {
        for (var i = 0, l = this.vertices.length; i < l; i++) {
          var pct = i / l;
          var theta = pct * TWO_PI;
          var x = this._width * cos(theta) / 2;
          var y = this._height * sin(theta) / 2;
          this.vertices[i].set(x, y);
        }
      }

      Path.prototype._update.call(this);
      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = false;

      Path.prototype.flagReset.call(this);
      return this;

    }

  });

  Ellipse.MakeObservable(Ellipse.prototype);

})((typeof global !== 'undefined' ? global : this).Two);
