(function() {

  var Polygon = Two.Polygon = function(vertices, closed) {

    Two.Shape.call(this);

    this.vertices = vertices;
    this.closed = !!closed;

  };

  _.extend(Polygon, {

  });

  _.extend(Polygon.prototype, Two.Shape.prototype, {

  });

})();