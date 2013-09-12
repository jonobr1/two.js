(function() {

  /**
   * Constants
   */

  var min = Math.min, max = Math.max, round = Math.round;

  var Polygon = Two.Polygon = function(vertices, closed, curved, manual) {

    Two.Shape.call(this);

    // Further getter setters for Polygon for closed and curved properties

    // Add additional logic for watching the vertices.

    this._closed = !!closed;
    this._curved = !!curved;

    // Determines whether or not two.js should calculate curves, lines, and
    // commands automatically for you or to let the developer manipulate them
    // for themselves.
    this._automatic = !manual;

    var beginning = 0.0;
    var ending = 1.0;
    var strokeChanged = false;
    var verticesChanged = false;
    var verticesCollection;
    var renderedVertices = [];

    var updateVertices = _.debounce(_.bind(function(property) { // Call only once a frame.

      var l, ia, ib, last;

      if (this._automatic) {
        this.plot();
      }

      if (strokeChanged || verticesChanged) {

        l = verticesCollection.length;
        last = l - 1;

        ia = round((beginning) * last);
        ib = round((ending) * last);

        renderedVertices.length = 0;

        for (var i = ia; i < ib + 1; i++) {
          var v = verticesCollection[i];
          renderedVertices.push(v);
        }

      }

      this.trigger(Two.Events.change,
        this.id, 'vertices', renderedVertices, this._closed, strokeChanged);

      strokeChanged = false;
      verticesChanged = false;

    }, this), 0);

    Object.defineProperty(this, 'closed', {
      get: function() {
        return this._closed;
      },
      set: function(v) {
        this._closed = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'curved', {
      get: function() {
        return this._curved;
      },
      set: function(v) {
        this._curved = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'automatic', {
      get: function() {
        return this._automatic;
      },
      set: function(v) {
        if (v === this._automatic) {
          return;
        }
        this._automatic = !!v;
        var method = this._automatic ? 'ignore' : 'listen';
        // Add / remove handlers to propagated handle events
        _.each(this.vertices, function(v) {
          v[method]();
        }, this);
        updateVertices();
      }
    });

    Object.defineProperty(this, 'beginning', {
      get: function() {
        return beginning;
      },
      set: function(v) {
        beginning = min(max(v, 0.0), 1.0);
        strokeChanged = true;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'ending', {
      get: function() {
        return ending;
      },
      set: function(v) {
        ending = min(max(v, 0.0), 1.0);
        strokeChanged = true;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'vertices', {

      get: function() {
        return verticesCollection;
      },

      set: function(vertices) {

        var bindVerts = _.bind(function(items) {

          _.each(items, function(v) {
            v.bind(Two.Events.change, updateVertices);
          }, this);

          verticesChanged = true; // Update rendered Vertices
          updateVertices();

        }, this);

        var unbindVerts = _.bind(function(items) {

          _.each(items, function(v) {
            v.unbind(Two.Events.change, updateVertices);
          }, this);

          verticesChanged = true; // Update rendered Vertices
          updateVertices();

        }, this);

        // Remove previous listeners
        if (verticesCollection) {
          verticesCollection.unbind();
        }

        // Create new Collection with copy of vertices
        verticesCollection = new Two.Utils.Collection(vertices.slice(0));

        // Listen for Collection changes and bind / unbind
        verticesCollection.bind(Two.Events.insert, bindVerts);
        verticesCollection.bind(Two.Events.remove, unbindVerts);

        // Bind Initial Vertices
        verticesChanged = true;
        bindVerts(verticesCollection);

      }

    });

    this.vertices = vertices;

    if (this._automatic) {
      this.plot();
      return this;
    }

    _.each(this.vertices, function(v) {
      _.isFunction(v.listen) && v.listen();
    });

  };

  _.extend(Polygon.prototype, Two.Shape.prototype, {

    clone: function() {

      var points = _.map(this.vertices, function(v) {
        return v.clone();
      });

      var clone = new Polygon(points, this._closed, this._curved);

      _.each(Two.Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      return clone;

    },

    /**
     * Orient the vertices of the shape to the upper lefthand
     * corner of the polygon.
     */
    corner: function() {

      var rect = this.getBoundingClientRect(true);
      var corner = { x: rect.left, y: rect.top };

      _.each(this.vertices, function(v) {
        v.subSelf(corner);
      });

      return this;

    },

    /**
     * Orient the vertices of the shape to the center of the
     * polygon.
     */
    center: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.vertices, function(v) {
        v.subSelf(rect.centroid);
      });

      // this.translation.addSelf(rect.centroid);

      return this;

    },

    /**
     * Remove self from the scene / parent.
     */
    remove: function() {

      if (!this.parent) {
        return this;
      }

      this.parent.remove(this);

      return this;

    },

    /**
     * Return an object with top, left, right, bottom, width, and height
     * parameters of the group.
     */
    getBoundingClientRect: function(shallow) {

      var border = this.linewidth / 2, temp;
      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(this.vertices, function(v) {
        var x = v.x, y = v.y;
        top = min(y, top);
        left = min(x, left);
        right = max(x, right);
        bottom = max(y, bottom);
      });

      // Expand borders

      top -= border;
      left -= border;
      right += border;
      bottom += border;

      var matrix = !!shallow ? this._matrix : Two.Utils.getComputedMatrix(this);

      var a = matrix.multiply(left, top, 1);
      var b = matrix.multiply(right, top, 1);
      var c = matrix.multiply(right, bottom, 1);
      var d = matrix.multiply(left, bottom, 1);

      top = min(a.y, b.y, c.y, d.y);
      left = min(a.x, b.x, c.x, d.x);
      right = max(a.x, b.x, c.x, d.x);
      bottom = max(a.y, b.y, c.y, d.y);

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: right - left,
        height: bottom - top
      };

    },

    /**
     * Based on closed / curved and sorting of vertices plot where all points
     * should be and where the respective handles should be too.
     */
    plot: function() {

      if (this._curved) {
        Two.Utils.getCurveFromPoints(this.vertices, this._closed);
        return this;
      }

      _.each(this.vertices, function(p, i) {
        p._command = i === 0 ? Two.Commands.move : Two.Commands.line;
      }, this);

      return this;

    },

    subdivide: function() {

      var last = this.vertices.length - 1;
      var closed = this._closed || this.vertices[last].command === Two.Commands.close;
      var points = [];
      var b;

      _.each(this.vertices, function(a, i) {

        var x1, y1, x2, y2, x3, y3, x4, y4;

        if (i <= 0 && !closed) {
          b = a;
          return;
        }

        x1 = b.x, y1 = b.y;
        x2 = ((b.controls && b.controls.right) || b).x, y2 = ((b.controls && b.controls.right) || b).y;
        x3 = ((a.controls && a.controls.left) || a).x, y3 = ((a.controls && a.controls.left) || a).y;
        x4 = a.x, y4 = a.y;

        points.push(Two.Utils.subdivide(x1, y1, x2, y2, x3, y3, x4, y4));

        b = a;

      }, this);

      this._manual = false;
      this._curved = false;

      this.vertices = _.flatten(points);
      this.plot();

      return this;

    }

  });


})();
