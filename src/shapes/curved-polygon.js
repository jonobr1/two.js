(function() {

  var Path = Two.Path, PI = Math.PI, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin, abs = Math.abs;

  var CurvedPolygon = Two.CurvedPolygon = function(ox, oy, r, sides, mod) {

    var points = [];
    sides = Math.max(sides || 0, 3);
    var sidesBump = sides+1;
    var angleStep = TWO_PI / sides;
    var bezierDelta =  PI * r / sides / 2 ;
    mod = mod || 0;

    var command = Two.Commands.move;
    var theta = PI, x, y, lx, ly, rx, ry;

    points.push(
      new Two.Anchor( 
        sin(theta) * (r),
        cos(theta) * (r),
        0,0,0,0,
        command
      )
    );

    for (var i = 0; i < sidesBump; i++) {

      theta = (angleStep * i) + PI;
      command = Two.Commands.curve;

      x = Math.sin(theta) * r;
      y = Math.cos(theta) * r;

      if (mod >= 0) {

        lx = (sin(theta - (Math.PI/2))) * bezierDelta * mod;
        ly = (cos(theta - (Math.PI/2))) * bezierDelta * mod;
        rx = (sin(theta + (Math.PI/2))) * bezierDelta * mod;
        ry = (cos(theta + (Math.PI/2))) * bezierDelta * mod;

      } else {

        lx = (sin(theta - (Math.PI))) * bezierDelta * abs(mod);
        ly = (cos(theta - (Math.PI))) * bezierDelta * abs(mod);
        rx = (sin(theta + (Math.PI))) * bezierDelta * abs(mod);
        ry = (cos(theta + (Math.PI))) * bezierDelta * abs(mod);

      }

      if (i === 0) {
        lx = 0;
        ly = 0;
      }

      if (i === sidesBump - 1) {
        rx = 0;
        ry = 0;
      }

      points.push(new Two.Anchor(x, y, lx, ly, rx, ry, command));

    }

    Path.call(this, points, true, false, true);
    this.translation.set(ox, oy);

  };

  _.extend(CurvedPolygon.prototype, Path.prototype);

  Path.MakeObservable(CurvedPolygon.prototype);

})();