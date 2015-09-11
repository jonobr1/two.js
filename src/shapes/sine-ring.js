(function(Two, _, Backbone, requestAnimationFrame) {

  var Path = Two.Path, PI = Math.PI, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin, abs = Math.abs;

  var SineRing = Two.SineRing = function(ox, oy, r, periods, amplitude, mod) {

    var size = (periods * 2) + 1;
    var angleStep = Math.PI / periods;
    var bezierDelta = PI * r / periods / 2;
    mod = mod || 1;

    var points = [];
    var theta = PI, x, y, lx, ly, rx, ry;

    points.push(
      new Two.Anchor( 
        sin(theta) * (r + (amplitude/2)),
        cos(theta) * (r + (amplitude/2)),
        0,0,0,0,
        Two.Commands.move
      )
    );

    for (var i = 0; i < size; i++) {

      theta = (angleStep * i) + PI;

      if ((i%2) === 0) {
        x = Math.sin(theta) * (r + (amplitude/2));
        y = Math.cos(theta) * (r + (amplitude/2));
      } else {
        x = Math.sin(theta) * (r - (amplitude/2));
        y = Math.cos(theta) * (r - (amplitude/2));
      }

      lx = ((Math.sin(theta - (Math.PI/2))) * bezierDelta) * mod;
      ly = ((Math.cos(theta - (Math.PI/2))) * bezierDelta) * mod;
      rx = ((Math.sin(theta + (Math.PI/2))) * bezierDelta) * mod;
      ry = ((Math.cos(theta + (Math.PI/2))) * bezierDelta) * mod;

      if (i === 0) {
        lx = ly = 0;
      }

      if (i === size - 1) {
        rx = ry = 0;
      }

      points.push(new Two.Anchor(x, y, lx, ly, rx, ry, Two.Commands.curve));

    }

    Path.call(this, points, true, false, true);
    this.translation.set(ox, oy);

  };

  _.extend(SineRing.prototype, Path.prototype);

  Path.MakeObservable(SineRing.prototype);

})(
  Two,
  typeof require === 'function' ? require('underscore') : _,
  typeof require === 'function' ? require('backbone') : Backbone,
  typeof require === 'function' ? require('requestAnimationFrame') : requestAnimationFrame
);
