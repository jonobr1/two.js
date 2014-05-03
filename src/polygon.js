(function() {

  /**
   * Constants
   */

  var min = Math.min, max = Math.max, round = Math.round,
    getComputedMatrix = Two.Utils.getComputedMatrix;

  // Localized variables
  var l, ia, ib, last, closed, v, i, parent, points, clone, rect, corner,
    border, temp, left, right, top, bottom, x, y, a, b, c, d, m, matrix, curved,
    x1, y1, x2, y2, x3, y3, x4, y4, sum, target, length, t;

  var commands = {};

  _.each(Two.Commands, function(v, k) {
    commands[k] = new RegExp(v);
  });

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
      'miter',
      'clip',
      'mask',  // Order matters here! See LN:85

      'closed',
      'curved',
      'automatic',
      'beginning',
      'ending'
    ],

    FlagVertices: function() {
      this._flagVertices = true;
      this._flagLength = true;
    },

    MakeObservable: function(object) {

      Two.Shape.MakeObservable(object);

      // Only the first 8 properties are flagged like this. The subsequent
      // properties behave differently and need to be hand written.
      _.each(Polygon.Properties.slice(0, 9), function(property) {

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

      Object.defineProperty(object, 'mask', {
        get: function() {
          return this._mask;
        },
        set: function(v) {
          this._mask = v;
          this._flagMask = true;
          if (!v.clip) {
            v.clip = true;
          }
        }
      });

      Object.defineProperty(object, 'length', {
        get: function() {
          if (this._flagLength) {
            this._updateLength();
          }
          return this._length;
        },
        set: function(v) {
          // TODO: What should this do?
        }
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
          this._beginning = min(max(v, 0.0), this._ending);
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'ending', {
        get: function() {
          return this._ending;
        },
        set: function(v) {
          this._ending = min(max(v, this._beginning), 1.0);
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
    _flagLength: true,

    _flagFill: true,
    _flagStroke: true,
    _flagLinewidth: true,
    _flagOpacity: true,
    _flagVisible: true,

    _flagMask: false,
    _flagClip: false,

    _flagCap: true,
    _flagJoin: true,
    _flagMiter: true,

    // Underlying Properties

    _length: 0,

    _fill: '#fff',
    _stroke: '#000',
    _linewidth: 1.0,
    _opacity: 1.0,
    _visible: true,

    _cap: 'round',
    _join: 'round',
    _miter: 4,

    _mask: null,
    _clip: false,

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

      matrix = !!shallow ? this._matrix : getComputedMatrix(this);

      border = this.linewidth / 2, temp;
      left = Infinity, right = -Infinity;
      top = Infinity, bottom = -Infinity;

      _.each(this._vertices, function(v) {
        x = v.x, y = v.y;
        v = matrix.multiply(x, y , 1);
        top = min(v.y - border, top);
        left = min(v.x - border, left);
        right = max(v.x + border, right);
        bottom = max(v.y + border, bottom);
      });

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
     * Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s
     * coordinates to that percentage on this Two.Polygon's curve.
     */
    getPointAt: function(t, obj) {

      target = this.length * Math.min(Math.max(t, 0), 1);
      length = this.vertices.length;
      last = length - 1;

      a = null;
      b = null;

      for (i = 0, l = this._lengths.length, sum = 0; i < l; i++) {

        if (sum + this._lengths[i] > target) {
          a = this.vertices[this.closed ? Two.Utils.mod(i, length) : i];
          b = this.vertices[Math.min(Math.max(i - 1, 0), last)];
          target -= sum;
          t = target / this._lengths[i];
          break;
        }

        sum += this._lengths[i];

      }

      if (_.isNull(a) || _.isNull(b)) {
        return null;
      }

      right = b.controls && b.controls.right;
      left = a.controls && a.controls.left;

      x1 = b.x, y1 = b.y;
      x2 = (right || b).x, y2 = (right || b).y;
      x3 = (left || a).x, y3 = (left || a).y;
      x4 = a.x, y4 = a.y;

      if (right && b._relative) {
        x2 += b.x;
        y2 += b.y;
      }

      if (left && a._relative) {
        x3 += a.x;
        y3 += a.y;
      }

      x = Two.Utils.getPointOnCubicBezier(t, x1, x2, x3, x4);
      y = Two.Utils.getPointOnCubicBezier(t, y1, y2, y3, y4);

      if (_.isObject(obj)) {
        obj.x = x;
        obj.y = y;
        return obj;
      }

      return new Two.Vector(x, y);

    },

    /**
     * Based on closed / curved and sorting of vertices plot where all points
     * should be and where the respective handles should be too.
     */
    plot: function() {

      if (this.curved) {
        Two.Utils.getCurveFromPoints(this._vertices, this.closed);
        return this;
      }

      _.each(this._vertices, function(p, i) {
        p._command = i === 0 ? Two.Commands.move : Two.Commands.line;
      }, this);

      return this;

    },

    subdivide: function(limit) {

      this._update();

      last = this.vertices.length - 1;
      b = this.vertices[last];
      closed = this._closed || this.vertices[last]._command === Two.Commands.close;
      curved = this._curved;
      points = [];

      _.each(this.vertices, function(a, i) {

        if (i <= 0 && !closed) {
          b = a;
          return;
        }

        if (a.command === Two.Commands.move) {
          points.push(new Two.Anchor(b.x, b.y));
          if (i > 0) {
            points[points.length - 1].command = Two.Commands.line;
          }
          b = m = a;
          return;
        }

        var verts = getSubdivisions(a, b, limit);
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

          // TODO: Add check if the two vectors in question are the same values.
          if (this._closed && this._automatic) {

            b = a;
            a = m;

            verts = getSubdivisions(a, b, limit);
            points = points.concat(verts);

            // Assign commands to all the verts
            _.each(verts, function(v, i) {
              if (i <= 0 && b.command === Two.Commands.move) {
                v.command = Two.Commands.move;
              } else {
                v.command = Two.Commands.line;
              }
            });

          } else if (closed) {
            points.push(new Two.Anchor(a.x, a.y));
          }

          points[points.length - 1].command = closed ? Two.Commands.close : Two.Commands.line;

        }

        b = a;

      }, this);

      this._automatic = false;
      this._curved = false;
      this.vertices = points;

      return this;

    },

    _updateLength: function(limit) {

      this._update();

      last = this.vertices.length - 1;
      b = this.vertices[last];
      closed = this._closed || this.vertices[last]._command === Two.Commands.close;
      curved = this._curved;
      sum = 0;

      if (_.isUndefined(this._lengths)) {
        this._lengths = [];
      }

      _.each(this.vertices, function(a, i) {

        if ((i <= 0 && !closed) || a.command === Two.Commands.move) {
          b = m = a;
          this._lengths[i] = 0;
          return;
        }

        this._lengths[i] = getCurveLength(a, b, limit);
        sum += this._lengths[i];

        if (i >= last && closed) {

          b = a;
          a = m;

          this._lengths[i + 1] = getCurveLength(a, b, limit);
          sum += this._lengths[i + 1];

        }

        b = a;

      }, this);

      this._length = sum;

      return this;

    },

    _update: function() {

      if (this._flagVertices) {

        l = this.vertices.length;
        last = l - 1;

        ia = round((this._beginning) * last);
        ib = round((this._ending) * last);

        this._vertices.length = 0;

        for (i = ia; i < ib + 1; i++) {
          v = this.vertices[i];
          this._vertices.push(v);
        }

        if (this._automatic) {
          this.plot();
        }

      }

      Two.Shape.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagVertices =  this._flagFill =  this._flagStroke
        = this._flagLinewidth = this._flagOpacity = this._flagVisible
        = this._flagCap = this._flagJoin = this._flagMiter
        = this._flagClip = this._flagMask = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Polygon.MakeObservable(Polygon.prototype);

  /**
   * Utility functions
   */

  function getCurveLength(a, b, limit) {

    right = b.controls && b.controls.right;
    left = a.controls && a.controls.left;

    x1 = b.x, y1 = b.y;
    x2 = (right || b).x, y2 = (right || b).y;
    x3 = (left || a).x, y3 = (left || a).y;
    x4 = a.x, y4 = a.y;

    if (right && b._relative) {
      x2 += b.x;
      y2 += b.y;
    }

    if (left && a._relative) {
      x3 += a.x;
      y3 += a.y;
    }

    return Two.Utils.getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit);

  }

  function getSubdivisions(a, b, limit) {

    right = b.controls && b.controls.right;
    left = a.controls && a.controls.left;

    x1 = b.x, y1 = b.y;
    x2 = (right || b).x, y2 = (right || b).y;
    x3 = (left || a).x, y3 = (left || a).y;
    x4 = a.x, y4 = a.y;

    if (right && b._relative) {
      x2 += b.x;
      y2 += b.y;
    }

    if (left && a._relative) {
      x3 += a.x;
      y3 += a.y;
    }

    return Two.Utils.subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit);

  }

})();
