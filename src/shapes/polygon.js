(function(Two, _, Backbone, requestAnimationFrame) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;

  var Polygon = Two.Polygon = function(ox, oy, r, sides) {

    sides = Math.max(sides || 0, 3);

    var points = _.map(_.range(sides), function(i) {
      var pct = (i + 0.5) / sides;
      var theta = TWO_PI * pct + Math.PI / 2;
      var x = r * cos(theta);
      var y = r * sin(theta);
      return new Two.Anchor(x, y);
    });

    Path.call(this, points, true);
    this.translation.set(ox, oy);

  };

  _.extend(Polygon.prototype, Path.prototype);

  Path.MakeObservable(Polygon.prototype);

})(
  this.Two,
  typeof require === 'function' && !(typeof define === 'function' && define.amd) ? require('underscore') : this._,
  typeof require === 'function' && !(typeof define === 'function' && define.amd) ? require('backbone') : this.Backbone,
  typeof require === 'function' && !(typeof define === 'function' && define.amd) ? require('requestAnimationFrame') : this.requestAnimationFrame
);
