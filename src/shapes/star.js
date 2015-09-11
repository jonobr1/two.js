(function(Two, _, Backbone, requestAnimationFrame) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;

  var Star = Two.Star = function(ox, oy, or, ir, sides) {

    if (!_.isNumber(ir)) {
      ir = or / 2;
    }

    if (!_.isNumber(sides) || sides <= 0) {
      sides = 5;
    }

    var length = sides * 2;

    var points = _.map(_.range(length), function(i) {
      var pct = (i - 0.5) / length;
      var theta = pct * TWO_PI;
      var r = (i % 2 ? ir : or);
      var x = r * cos(theta);
      var y = r * sin(theta);
      return new Two.Anchor(x, y);
    });

    Path.call(this, points, true);
    this.translation.set(ox, oy);

  };

  _.extend(Star.prototype, Path.prototype);

  Path.MakeObservable(Star.prototype);

})(
  Two,
  typeof require === 'function' ? require('underscore') : _,
  typeof require === 'function' ? require('backbone') : Backbone,
  typeof require === 'function' ? require('requestAnimationFrame') : requestAnimationFrame
);
