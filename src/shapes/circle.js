(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  var Circle = Two.Circle = function(ox, oy, r) {

    var amount = Two.Resolution;

    var points = _.map(_.range(amount), function(i) {
      return new Two.Anchor();
    }, this);

    Path.call(this, points, true, true);

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

    _update: function() {

      if (this._flagRadius) {
        for (var i = 0, l = this.vertices.length; i < l; i++) {
          var pct = i / l;
          var theta = pct * TWO_PI;
          var x = this._radius * cos(theta);
          var y = this._radius * sin(theta);
          this.vertices[i].set(x, y);
        }
      }

      Path.prototype._update.call(this);
      return this;

    },

    flagReset: function() {

      this._flagRadius = false;

      Path.prototype.flagReset.call(this);
      return this;

    }

  });

  Circle.MakeObservable(Circle.prototype);

})((typeof global !== 'undefined' ? global : this).Two);
