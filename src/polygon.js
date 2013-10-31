(function() {

  /**
   * Constants
   */

  var min = Math.min, max = Math.max, round = Math.round;

  // Localized variables
  var l, ia, ib, last, v, i;

  var Polygon = Two.Polygon = function(vertices, closed, curved, manual) {

    Two.Shape.call(this);

    this._closed = !!closed;
    this._curved = !!curved;

    // Determines whether or not two.js should calculate curves, lines, and
    // commands automatically for you or to let the developer manipulate them
    // for themselves.
    this._automatic = !manual;

    this.beginning = 0;
    this.ending = 1;

    this._vertices = [];
    this.vertices = vertices.slice();

  };

  _.extend(Polygon.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    _flagVertices: true,

    // Underlying Properties

    _closed: true,
    _curved: false,
    _automatic: true,
    _beginning: 0,
    _ending: 1.0,

    clone: function(parent) {

      var parent = parent || this.parent;

      var points = _.map(this.vertices, function(v) {
        return v.clone();
      });

      var clone = new Polygon(points, this.closed, this.curved, !this.automatic);

      _.each(Two.Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      parent.add(clone);

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

      if (this.curved) {
        Two.Utils.getCurveFromPoints(this.vertices, this.closed);
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

      this._automatic = false;
      this._curved = false;

      this.vertices = _.flatten(points);
      this.plot();

      return this;

    },

    update: function() {

      if (this._flagVertices) {

        if (this._automatic) {
          this.plot();
        }

        l = this.vertices.length;
        last = l - 1;

        ia = round((this._beginning) * last);
        ib = round((this._ending) * last);

        this._vertices.length = 0;

        for (i = ia; i < ib + 1; i++) {
          v = this.vertices[i];
          this._vertices.push(v);
        }

      }

      Two.Shape.prototype.update.call(this);

      /**
       * Reset Flags
       */

      this._flagVertices = false;

      return this;

    }

  });

  Object.defineProperty(Polygon.prototype, 'closed', {
    get: function() {
      return this._closed;
    },
    set: function(v) {
      this._closed = !!v;
    }
  });

  Object.defineProperty(Polygon.prototype, 'curved', {
    get: function() {
      return this._curved;
    },
    set: function(v) {
      this._curved = !!v;
    }
  });

  Object.defineProperty(Polygon.prototype, 'automatic', {
    get: function() {
      return this._automatic;
    },
    set: function(v) {
      if (v === this._automatic) {
        return;
      }
      this._automatic = !!v;
    }
  });

  Object.defineProperty(Polygon.prototype, 'beginning', {
    get: function() {
      return this._beginning;
    },
    set: function(v) {
      this._beginning = min(max(v, 0.0), 1.0);
      this._flagVertices = true;
    }
  });

  Object.defineProperty(Polygon.prototype, 'ending', {
    get: function() {
      return this._ending;
    },
    set: function(v) {
      this._ending = min(max(v, 0.0), 1.0);
      this._flagVertices = true;
    }
  });

})();
