(function(Two, _, Backbone, requestAnimationFrame) {

  var Path = Two.Path, PI = Math.PI, TWO_PI = Math.PI * 2, HALF_PI = Math.PI/2, cos = Math.cos, sin = Math.sin, abs = Math.abs;

  /*
  @class ArcSegment
    ox : Origin X
    oy : Origin Y
    ir : Inner Radius
    or : Outer Radius
    sa : Starting Angle
    ea : Ending Angle
    res : Resolution
  */
  var ArcSegment = Two.ArcSegment = function(ox, oy, ir, or, sa, ea, res) {

    if (sa > ea) {
      ea += Math.PI*2;
    }

    res = res || 8;

    var rot = sa;
    var ta = ea - sa;
    var angleStep = ta / res;
    var command = Two.Commands.move;
    var points = [];

    points.push( new Two.Anchor(
      Math.sin(0) * or,
      Math.cos(0) * or,
      0,0,0,0,
      command
    ));


    var theta, x, y, lx, ly, rx, ry;
    command = Two.Commands.curve;

    //Do Outer Edge
    for (var i = 0; i < res+1; i++) {

      theta = i * angleStep;
      x = sin(theta) * or;
      y = cos(theta) * or;
      lx = sin(theta - HALF_PI) * (angleStep / PI) * or;
      ly = cos(theta - HALF_PI) * (angleStep / PI) * or;
      rx = sin(theta + HALF_PI) * (angleStep / PI) * or;
      ry = cos(theta + HALF_PI) * (angleStep / PI) * or;

      if (i===0) {
        lx = ly = 0;
      }

      if (i===res) {
        rx = ry = 0;
      }

      points.push( new Two.Anchor(
        x, y, lx, ly, rx, ry, command
      ));
    }

    //Do Inner Edge
    for (var j = 0; j < res+1; j++) {

      theta = ta - (angleStep * j);
      x = sin(theta) * ir;
      y = cos(theta) * ir;
      lx = sin(theta - (PI*1.5)) * (angleStep / PI) * ir;
      ly = cos(theta - (PI*1.5)) * (angleStep / PI) * ir;
      rx = sin(theta + (PI*1.5)) * (angleStep / PI) * ir;
      ry = cos(theta + (PI*1.5)) * (angleStep / PI) * ir;

      if (j===0) {
        lx = ly = 0;
      }

      if (j===res) {
        rx = ry = 0;
      }

      points.push( new Two.Anchor(
        x, y, lx, ly, rx, ry, command
      ));
    }

    command = Two.Commands.close
    points.push( new Two.Anchor(
      Math.sin(0) * or,
      Math.cos(0) * or,
      0,0,0,0,
      command
    ));


    Path.call(this, points, true, false, true);
    this.rotation = sa;
    this.translation.set(ox, oy);
  }

  _.extend(ArcSegment.prototype, Path.prototype);

  Path.MakeObservable(ArcSegment.prototype);

})(
  Two,
  typeof require === 'function' ? require('underscore') : _,
  typeof require === 'function' ? require('backbone') : Backbone,
  typeof require === 'function' ? require('requestAnimationFrame') : requestAnimationFrame
);
