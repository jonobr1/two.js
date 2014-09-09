(function() {

  var Path = Two.Path;

  var Polygon = Two.Polygon = function(points) {

    Path.call(this, points, true);

  };

  _.extend(Polygon.prototype, Path.prototype);

  Path.MakeObservable(Polygon.prototype);

})();