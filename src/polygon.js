(function() {

  /**
   * Constants
   */

  var min = Math.min, max = Math.max, round = Math.round,
    getComputedMatrix = Two.Utils.getComputedMatrix;

  // Localized variables
  var l, ia, ib, last, closed, v, i, parent, points, clone, rect, corner,
    border, temp, left, right, top, bottom, x, y, a, b, c, d, matrix,
    x1, y1, x2, y2, x3, y3, x4, y4;

  var Polygon = Two.Polygon = function(vertices, closed, curved, manual) {

    Two.Shape.call(this);

    this._renderer.type = 'polygon';

    this._closed = !!closed;
    this._curved = !!curved;

    this.beginning = 0;
    this.ending = 1;

    // Style properties

    this.fill = '#fff';
    this.stroke = '#000';
    this.linewidth = 1.0;
    this.opacity = 1.0;
    this.visible = true;

    this.cap = 'butt';      // Default of Adobe Illustrator
    this.join = 'miter';    // Default of Adobe Illustrator
    this.miter = 4;         // Default of Adobe Illustrator

    this._vertices = [];
    this.vertices = vertices;

    // Determines whether or not two.js should calculate curves, lines, and
    // commands automatically for you or to let the developer manipulate them
    // for themselves.
    this.automatic = !manual;

  };

  _.extend(Polygon, {

    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'opacity',
      'visible',
      'cap',
      'join',
      'miter',  // Order matters here! See LN:388

      'closed',
      'curved',
      'automatic',
      'beginning',
      'ending'
    ],

    FlagVertices: function() {
      this._flagVertices = true;
    },

    MakeObservable: function(object) {

      Two.Shape.MakeObservable(object);

      // Only the first 8 properties are flagged like this. The subsequent
      // properties behave differently and need to be hand written.
      _.each(Polygon.Properties.slice(0, 8), function(property) {

        var secret = '_' + property;
        var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

        Object.defineProperty(object, property, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this[flag] = true;
          }
        });

      });

      Object.defineProperty(object, 'closed', {
        get: function() {
          return this._closed;
        },
        set: function(v) {
          this._closed = !!v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'curved', {
        get: function() {
          return this._curved;
        },
        set: function(v) {
          this._curved = !!v;
          this._flagVertices = true;
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
          method = this._automatic ? 'ignore' : 'listen';
          _.each(this.vertices, function(v) {
            v[method]();
          });
        }
      });

      Object.defineProperty(object, 'beginning', {
        get: function() {
          return this._beginning;
        },
        set: function(v) {
          this._beginning = min(max(v, 0.0), 1.0);
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'ending', {
        get: function() {
          return this._ending;
        },
        set: function(v) {
          this._ending = min(max(v, 0.0), 1.0);
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'vertices', {

        get: function() {
          return this._collection;
        },

        set: function(vertices) {

          var updateVertices = _.bind(Polygon.FlagVertices, this);

          var bindVerts = _.bind(function(items) {

            _.each(items, function(v) {
              v.bind(Two.Events.change, updateVertices);
            }, this);

            updateVertices();

          }, this);

          var unbindVerts = _.bind(function(items) {

            _.each(items, function(v) {
              v.unbind(Two.Events.change, updateVertices);
            }, this);

            updateVertices();

          }, this);

          // Remove previous listeners
          if (this._collection) {
            this._collection.unbind();
          }

          // Create new Collection with copy of vertices
          this._collection = new Two.Utils.Collection(vertices.slice(0));

          // Listen for Collection changes and bind / unbind
          this._collection.bind(Two.Events.insert, bindVerts);
          this._collection.bind(Two.Events.remove, unbindVerts);

          // Bind Initial Vertices
          verticesChanged = true;
          bindVerts(this._collection);

        }

      });

    }

  });

  _.extend(Polygon.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    _flagVertices: true,

    _flagFill: true,
    _flagStroke: true,
    _flagLinewidth: true,
    _flagOpacity: true,
    _flagVisible: true,

    _flagCap: true,
    _flagJoin: true,
    _flagMiter: true,

    // Underlying Properties

    _fill: '#fff',
    _stroke: '#000',
    _linewidth: 1.0,
    _opacity: 1.0,
    _visible: true,

    _cap: 'round',
    _join: 'round',
    _miter: 4,

    _closed: true,
    _curved: false,
    _automatic: true,
    _beginning: 0,
    _ending: 1.0,

    clone: function(parent) {

      parent = parent || this.parent;

      points = _.map(this.vertices, function(v) {
        return v.clone();
      });

      clone = new Polygon(points, this.closed, this.curved, !this.automatic);

      _.each(Two.Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      parent.add(clone);

      return clone;

    },

    toObject: function() {

      var result = {
        vertices: _.map(this.vertices, function(v) {
          return v.toObject();
        })
      };

      _.each(Two.Shape.Properties, function(k) {
        result[k] = this[k];
      }, this);

      result.translation = this.translation.toObject;
      result.rotation = this.rotation;
      result.scale = this.scale;

      return result;

    },

    noFill: function() {
      this.fill = 'transparent';
      return this;
    },

    noStroke: function() {
      this.stroke = 'transparent';
      return this;
    },

    /**
     * Orient the vertices of the shape to the upper lefthand
     * corner of the polygon.
     */
    corner: function() {

      rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.vertices, function(v) {
        v.addSelf(rect.centroid);
      });

      return this;

    },

    /**
     * Orient the vertices of the shape to the center of the
     * polygon.
     */
    center: function() {

      rect = this.getBoundingClientRect(true);

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

      // TODO: Update this to not __always__ update. Just when it needs to.
      this._update();

      border = this.linewidth / 2, temp;
      left = Infinity, right = -Infinity;
      top = Infinity, bottom = -Infinity;

      _.each(this._vertices, function(v) {
        x = v.x, y = v.y;
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

      matrix = !!shallow ? this._matrix : getComputedMatrix(this);

      a = matrix.multiply(left, top, 1);
      b = matrix.multiply(right, top, 1);
      c = matrix.multiply(right, bottom, 1);
      d = matrix.multiply(left, bottom, 1);

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

    subdivide: function(limit) {

      this._update();

      last = this.vertices.length - 1;
      b = this.vertices[last];
      closed = this._closed || this.vertices[last].command === Two.Commands.close;
      points = [];

      _.each(this.vertices, function(a, i) {

        if (i <= 0 && !closed) {
          b = a;
          return;
        }

        if (a.command === Two.Commands.move) {
          points.push(new Two.Anchor(b.x, b.y));
          points[points.length - 1].command = Two.Commands.line;
          b = a;
          return;
        }

        right = b.controls && b.controls.right;
        left = a.controls && a.controls.left;

        x1 = b.x, y1 = b.y;
        x2 = (right || b).x, y2 = (right || b).y;
        x3 = (left || a).x, y3 = (left || a).y;
        x4 = a.x, y4 = a.y;

        var verts = Two.Utils.subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit);
        points = points.concat(verts);

        // Assign commands to all the verts
        _.each(verts, function(v, i) {
          if (i <= 0 && b.command === Two.Commands.move) {
            v.command = Two.Commands.move;
          } else {
            v.command = Two.Commands.line;
          }
        });

        if (i >= last) {
          points.push(new Two.Anchor(x4, y4));
          points[points.length - 1].command = closed ? Two.Commands.close : Two.Commands.line;
        }

        b = a;

      }, this);

      this._automatic = false;
      this._curved = false;
      this.vertices = points;

      return this;

    },

    _update: function() {

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

      Two.Shape.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagVertices =  this._flagFill =  this._flagStroke
        = this._flagLinewidth = this._flagOpacity = this._flagVisible
        = this._flagCap = this._flagJoin = this._flagMiter = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Polygon.MakeObservable(Polygon.prototype);


})();
