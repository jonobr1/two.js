(function(Two) {

  var Path = Two.Path, PI = Math.PI, TWO_PI = Math.PI * 2, HALF_PI = Math.PI/2,
    cos = Math.cos, sin = Math.sin, abs = Math.abs, _ = Two.Utils;

  var ArcSegment = Two.ArcSegment = function(ox, oy, ir, or, sa, ea, res) {

    var points = _.map(_.range(res || (Two.Resolution * 2)), function() {
      return new Two.Anchor();
    });

    Path.call(this, points, false, false, true);

    this.innerRadius = ir;
    this.outerRadius = or;

    this.startAngle = sa;
    this.endAngle = ea;

    this._update();
    this.translation.set(ox, oy);

  }

  _.extend(ArcSegment, {

    Properties: ['startAngle', 'endAngle', 'innerRadius', 'outerRadius'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(ArcSegment.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(ArcSegment.prototype, Path.prototype, {

    _flagStartAngle: false,
    _flagEndAngle: false,
    _flagInnerRadius: false,
    _flagOuterRadius: false,

    _startAngle: 0,
    _endAngle: Math.PI * 2,
    _innerRadius: 0,
    _outerRadius: 0,

    _update: function() {

      Path.prototype._update.call(this);

      if (this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius
        || this._flagOuterRadius) {

        var vertices = this.vertices;
        var command;

        for (var i = 0, last = vertices.length - 1; i < vertices.length; i++) {

          var pct = i / last;
          var v = vertices[i];

          var sa = this._startAngle;
          var ea = this._endAngle;

          var ir = this._innerRadius;
          var or = this._outerRadius;

          if (ir > 0) {
            pct *= 2;
          }

          var theta = pct * (ea - sa) + sa;
          var radius = or;

          if (pct >= 1) {
            theta = (2 - pct) * (ea - sa) + sa;
            radius = ir;
          }

          var x = radius * Math.cos(theta);
          var y = radius * Math.sin(theta);

          switch (i) {
            case 0:
              command = Two.Commands.move;
              break;
            case last:
              command = Two.Commands.close;
              break;
            default:
              command = Two.Commands.curve;
          }

          v.command = command;
          v.x = x;
          v.y = y;

        }

      }

      return this;

    },

    flagReset: function() {

      Path.prototype.flagReset.call(this);

      this._flagStartAngle = this._flagEndAngle
        = this._flagInnerRadius = this._flagOuterRadius = false;

      return this;

    }

  });

  ArcSegment.MakeObservable(ArcSegment.prototype);

})(this.Two);
