(function(Two) {

  var Path = Two.Path, PI = Math.PI, TWO_PI = Math.PI * 2, HALF_PI = Math.PI / 2,
    cos = Math.cos, sin = Math.sin, abs = Math.abs, _ = Two.Utils;

  var ArcSegment = Two.ArcSegment = function(ox, oy, ir, or, sa, ea, res) {

    var points = _.map(_.range(res || (Two.Resolution * 3)), function() {
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
    _endAngle: TWO_PI,
    _innerRadius: 0,
    _outerRadius: 0,

    _update: function() {

      if (this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius
        || this._flagOuterRadius) {

        var sa = this._startAngle;
        var ea = this._endAngle;

        var ir = this._innerRadius;
        var or = this._outerRadius;

        var connected = mod(sa, TWO_PI) === mod(ea, TWO_PI);
        var punctured = ir > 0;

        var vertices = this.vertices;
        var length = (punctured ? vertices.length / 2 : vertices.length);
        var command, id = 0;

        if (connected) {
          length--;
        } else if (!punctured) {
          length -= 2;
        }

        /**
         * Outer Circle
         */
        for (var i = 0, last = length - 1; i < length; i++) {

          var pct = i / last;
          var v = vertices[id];
          var theta = pct * (ea - sa) + sa;
          var step = (ea - sa) / length;

          var x = or * Math.cos(theta);
          var y = or * Math.sin(theta);

          switch (i) {
            case 0:
              command = Two.Commands.move;
              break;
            default:
              command = Two.Commands.curve;
          }

          v.command = command;
          v.x = x;
          v.y = y;
          v.controls.left.clear();
          v.controls.right.clear();

          if (v.command === Two.Commands.curve) {
            var amp = or * step / Math.PI;
            v.controls.left.x = amp * Math.cos(theta - HALF_PI);
            v.controls.left.y = amp * Math.sin(theta - HALF_PI);
            v.controls.right.x = amp * Math.cos(theta + HALF_PI);
            v.controls.right.y = amp * Math.sin(theta + HALF_PI);
            if (i === 1) {
              v.controls.left.multiplyScalar(2);
            }
            if (i === last) {
              v.controls.right.multiplyScalar(2);
            }
          }

          id++;

        }

        if (punctured) {

          if (connected) {
            vertices[id].command = Two.Commands.close;
            id++;
          } else {
            length--;
            last = length - 1;
          }

          /**
           * Inner Circle
           */
          for (i = 0; i < length; i++) {

            pct = i / last;
            v = vertices[id];
            theta = (1 - pct) * (ea - sa) + sa;
            step = (ea - sa) / length;

            x = ir * Math.cos(theta);
            y = ir * Math.sin(theta);
            command = Two.Commands.curve;
            if (i <= 0) {
              command = connected ? Two.Commands.move : Two.Commands.line;
            }

            v.command = command;
            v.x = x;
            v.y = y;
            v.controls.left.clear();
            v.controls.right.clear();

            if (v.command === Two.Commands.curve) {
              amp = ir * step / Math.PI;
              v.controls.left.x = amp * Math.cos(theta + HALF_PI);
              v.controls.left.y = amp * Math.sin(theta + HALF_PI);
              v.controls.right.x = amp * Math.cos(theta - HALF_PI);
              v.controls.right.y = amp * Math.sin(theta - HALF_PI);
              if (i === 1) {
                v.controls.left.multiplyScalar(2);
              }
              if (i === last) {
                v.controls.right.multiplyScalar(2);
              }
            }

            id++;

          }

        } else if (!connected) {

          vertices[id].command = Two.Commands.line;
          vertices[id].x = 0;
          vertices[id].y = 0;
          id++;

        }

        /**
         * Final Point
         */
        vertices[id].command = Two.Commands.close;

      }

      Path.prototype._update.call(this);

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

  function mod(v, l) {
    while (v < 0) {
      v += l;
    }
    return v % l;
  }

})((typeof global !== 'undefined' ? global : this).Two);
