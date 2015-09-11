(function(Two, _, Backbone, requestAnimationFrame) {

  var Path = Two.Path;

  var RoundedRectangle = Two.RoundedRectangle = function(ox, oy, width, height, radius) {

    var w2 = width / 2;
    var h2 = height / 2;
    var x, y;

    if (!_.isNumber(radius)) {
      radius = Math.floor(Math.min(width, height) / 12);
    }

    var points = [
      new Two.Anchor(- w2 + radius, - h2),
      new Two.Anchor(w2 - radius, - h2)
    ];

    x = w2;
    y = - h2;
    points = roundCorner(points, x, y, radius, 1);

    points.push(new Two.Anchor(w2, h2 - radius));

    x = w2;
    y = h2;
    points = roundCorner(points, x, y, radius, 4);

    points.push(new Two.Anchor(- w2 + radius, h2));

    x = - w2;
    y = h2;
    points = roundCorner(points, x, y, radius, 3);

    points.push(new Two.Anchor(- w2, - h2 + radius));

    x = - w2;
    y = - h2;
    points = roundCorner(points, x, y, radius, 2);

    points.pop();

    Path.call(this, points, true);
    this.translation.set(ox, oy);

  };

  _.extend(RoundedRectangle.prototype, Path.prototype);

  Path.MakeObservable(RoundedRectangle.prototype);

  function roundCorner(points, x, y, radius, quadrant) {

    var start = 0, end = 0;
    var length = Two.Resolution;

    var a = points[points.length - 1];
    var b = new Two.Anchor(x, y);

    var xr = x < 0 ? - radius : radius;
    var yr = y < 0 ? - radius : radius;

    switch (quadrant) {
      case 1:
        start = - Math.PI / 2;
        end = 0;
        break;
      case 2:
        start = - Math.PI;
        end = - Math.PI / 2;
        break;
      case 3:
        start = - Math.PI * 1.5;
        end = - Math.PI;
        break;
      case 4:
        start = 0;
        end = Math.PI / 2;
        break;
    }

    var curve = _.map(_.range(length), function(i) {

      var theta = map(length - i, 0, length, start, end);
      var tx = radius * Math.cos(theta) + x - xr;
      var ty = radius * Math.sin(theta) + y - yr;
      var anchor = new Two.Anchor(tx, ty);

      return anchor;

    }).reverse();

    return points.concat(curve);

  }

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

})(
  Two,
  typeof require === 'function' ? require('underscore') : _,
  typeof require === 'function' ? require('backbone') : Backbone,
  typeof require === 'function' ? require('requestAnimationFrame') : requestAnimationFrame
);
