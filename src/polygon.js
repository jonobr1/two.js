(function() {

  var Polygon = Two.Polygon = function(vertices, closed, curved) {

    Two.Shape.call(this);

    // Further getter setters for Polygon for closed and curved properties

    // Add additional logic for watching the vertices.

    var closed = !!closed;
    var curved = !!curved;

    var updateVertices = _.debounce(_.bind(function(property) { // Call only once a frame.
      this.trigger(Two.Events.change, this.id, 'vertices', this.vertices, this.closed, this.curved);
    }, this), 0);

    Object.defineProperty(this, 'closed', {
      get: function() {
        return closed;
      },
      set: function(v) {
        closed = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'curved', {
      get: function() {
        return curved;
      },
      set: function(v) {
        curved = !!v;
        updateVertices();
      }
    });

    // At the moment cannot alter the array itself, just it's points.

    this.vertices = vertices;

    _.each(this.vertices, function(v) {

      v.bind(Two.Events.change, updateVertices);

    }, this);

  };

  _.extend(Polygon, {

  });

  _.extend(Polygon.prototype, Two.Shape.prototype, {

  });

})();