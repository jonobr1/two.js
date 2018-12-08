(function(Two) {

  // Constants

  var min = Math.min, max = Math.max, round = Math.round,
    ceil = Math.ceil, floor = Math.floor,
    getComputedMatrix = Two.Utils.getComputedMatrix;

  var commands = {};
  var _ = Two.Utils;

  _.each(Two.Commands, function(v, k) {
    commands[k] = new RegExp(v);
  });

  /**
   * @name Two.Path
   * @class
   * @extends Two.Shape
   * @param {Two#Anchor[]} [vertices] - A list of Two.Anchors that represent the order and coordinates to construct the rendered shape.
   * @param {Boolean} [closed=false] - Describes whether the shape is closed or open.
   * @param {Boolean} [curved=false] - Describes whether the shape automatically calculates bezier handles for each vertex.
   * @param {Boolean} [manual=false] - Describes whether the developer controls how vertices are plotted or if Two.js automatically plots coordinates based on closed and curved booleans.
   * @description This is the primary primitive class for creating all drawable shapes in Two.js. Unless specified methods return their instance of `Two.Path` for the purpose of chaining.
   */
  var Path = Two.Path = function(vertices, closed, curved, manual) {

    Two.Shape.call(this);

    this._renderer.type = 'path';
    this._renderer.flagVertices = _.bind(Path.FlagVertices, this);
    this._renderer.bindVertices = _.bind(Path.BindVertices, this);
    this._renderer.unbindVertices = _.bind(Path.UnbindVertices, this);

    this._renderer.flagFill = _.bind(Path.FlagFill, this);
    this._renderer.flagStroke = _.bind(Path.FlagStroke, this);
    this._renderer.vertices = [];
    this._renderer.collection = [];

    /**
     * @name Two.Path#closed
     * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point.
     */
    this._closed = !!closed;

    /**
     * @name Two.Path#curved
     * @property {Boolean} - When the path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
     */
    this._curved = !!curved;

    /**
     * @name Two.Path#beginning
     * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
     * @description `Two.Path.beginning` is a percentage value that represents at what percentage into the path should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#ending}.
     */
    this.beginning = 0;

    /**
     * @name Two.Path#ending
     * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
     * @description `Two.Path.ending` is a percentage value that represents at what percentage into the path should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#beginning}.
     */
    this.ending = 1;

    // Style properties

    /**
     * @name Two.Path#fill
     * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
     */
    this.fill = '#fff';

    /**
     * @name Two.Path#stroke
     * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
     */
    this.stroke = '#000';

    /**
     * @name Two.Path#linewidth
     * @property {Number} - The thickness in pixels of the stroke.
     */
    this.linewidth = 1.0;

    /**
     * @name Two.Path#opacity
     * @property {Number} - The opaqueness of the path.
     * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
     */
    this.opacity = 1.0;

    /**
     * @name Two.Path#className
     * @property {String} - A class name to be searched by in {@link Two.Group}s.
     */
    this.className = '';

    /**
     * @name Two.Path#visible
     * @property {Boolean} - Display the path or not.
     * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
     */
    this.visible = true;

    /**
     * @name Two.Path#cap
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
     */
    this.cap = 'butt';      // Default of Adobe Illustrator

    /**
     * @name Two.Path#join
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
     */
    this.join = 'miter';    // Default of Adobe Illustrator

    /**
     * @name Two.Path#miter
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
     */
    this.miter = 4;         // Default of Adobe Illustrator

    /**
     * @name Two.Path#vertices
     * @property {Two.Anchor[]} - An ordered list of anchor points for rendering the path.
     * @description An of `Two.Anchor` objects that consist of what form the path takes.
     * @nota-bene The array when manipulating is actually a {@link Two.Utils.Collection}.
     */
    this.vertices = vertices;

    /**
     * @name Two.Path#automatic
     * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
     */
    this.automatic = !manual;

    /**
     * @name Two.Path#dashes
     * @property {String} - List of dash and gap values.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
     */
    this.dashes = [];

  };

  _.extend(Path, {

    /**
     * @name Two.Path.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Path}.
     */
    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'opacity',
      'className',
      'visible',
      'cap',
      'join',
      'miter',

      'closed',
      'curved',
      'automatic',
      'beginning',
      'ending'
    ],

    Utils: {
      getCurveLength: getCurveLength
    },

    /**
     * @name Two.Path.FlagVertices
     * @function
     * @description Cached method to let renderers know vertices have been updated on a {@link Two.Path}.
     */
    FlagVertices: function() {
      this._flagVertices = true;
      this._flagLength = true;
      if (this.parent) {
        this.parent._flagLength = true;
      }
    },

    /**
     * @name Two.Path.BindVertices
     * @function
     * @description Cached method to let {@link Two.Path} know vertices have been added to the instance.
     */
    BindVertices: function(items) {

      // This function is called a lot
      // when importing a large SVG
      var i = items.length;
      while (i--) {
        items[i].bind(Two.Events.change, this._renderer.flagVertices);
      }

      this._renderer.flagVertices();

    },

    /**
     * @name Two.Path.BindVertices
     * @function
     * @description Cached method to let {@link Two.Path} know vertices have been removed from the instance.
     */
    UnbindVertices: function(items) {

      var i = items.length;
      while (i--) {
        items[i].unbind(Two.Events.change, this._renderer.flagVertices);
      }

      this._renderer.flagVertices();

    },

    /**
     * @name Two.Path.FlagFill
     * @function
     * @description Cached method to let {@link Two.Path} know the fill has changed.
     */
    FlagFill: function() {
      this._flagFill = true;
    },

    /**
     * @name Two.Path.FlagFill
     * @function
     * @description Cached method to let {@link Two.Path} know the stroke has changed.
     */
    FlagStroke: function() {
      this._flagStroke = true;
    },

    /**
     * @name Two.Path.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a `Two.Path` to any object. Handy if you'd like to extend the `Two.Path` class on a custom class.
     */
    MakeObservable: function(object) {

      Two.Shape.MakeObservable(object);

      // Only the 7 defined properties are flagged like this. The subsequent
      // properties behave differently and need to be hand written.
      _.each(Path.Properties.slice(2, 9), Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'fill', {
        enumerable: true,
        get: function() {
          return this._fill;
        },
        set: function(f) {

          if (this._fill instanceof Two.Gradient
            || this._fill instanceof Two.LinearGradient
            || this._fill instanceof Two.RadialGradient
            || this._fill instanceof Two.Texture) {
            this._fill.unbind(Two.Events.change, this._renderer.flagFill);
          }

          this._fill = f;
          this._flagFill = true;

          if (this._fill instanceof Two.Gradient
            || this._fill instanceof Two.LinearGradient
            || this._fill instanceof Two.RadialGradient
            || this._fill instanceof Two.Texture) {
            this._fill.bind(Two.Events.change, this._renderer.flagFill);
          }

        }
      });

      Object.defineProperty(object, 'stroke', {
        enumerable: true,
        get: function() {
          return this._stroke;
        },
        set: function(f) {

          if (this._stroke instanceof Two.Gradient
            || this._stroke instanceof Two.LinearGradient
            || this._stroke instanceof Two.RadialGradient
            || this._stroke instanceof Two.Texture) {
            this._stroke.unbind(Two.Events.change, this._renderer.flagStroke);
          }

          this._stroke = f;
          this._flagStroke = true;

          if (this._stroke instanceof Two.Gradient
            || this._stroke instanceof Two.LinearGradient
            || this._stroke instanceof Two.RadialGradient
            || this._stroke instanceof Two.Texture) {
            this._stroke.bind(Two.Events.change, this._renderer.flagStroke);
          }

        }
      });

      /**
       * @name Two.Path#length
       * @property {Number} - The sum of distances between all {@link Two.Path#vertices}.
       */
      Object.defineProperty(object, 'length', {
        get: function() {
          if (this._flagLength) {
            this._updateLength();
          }
          return this._length;
        }
      });

      Object.defineProperty(object, 'closed', {
        enumerable: true,
        get: function() {
          return this._closed;
        },
        set: function(v) {
          this._closed = !!v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'curved', {
        enumerable: true,
        get: function() {
          return this._curved;
        },
        set: function(v) {
          this._curved = !!v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'automatic', {
        enumerable: true,
        get: function() {
          return this._automatic;
        },
        set: function(v) {
          if (v === this._automatic) {
            return;
          }
          this._automatic = !!v;
          var method = this._automatic ? 'ignore' : 'listen';
          _.each(this.vertices, function(v) {
            v[method]();
          });
        }
      });

      Object.defineProperty(object, 'beginning', {
        enumerable: true,
        get: function() {
          return this._beginning;
        },
        set: function(v) {
          this._beginning = v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'ending', {
        enumerable: true,
        get: function() {
          return this._ending;
        },
        set: function(v) {
          this._ending = v;
          this._flagVertices = true;
        }
      });

      Object.defineProperty(object, 'vertices', {

        enumerable: true,

        get: function() {
          return this._collection;
        },

        set: function(vertices) {

          var updateVertices = this._renderer.flagVertices;
          var bindVertices = this._renderer.bindVertices;
          var unbindVertices = this._renderer.unbindVertices;

          // Remove previous listeners
          if (this._collection) {
            this._collection
              .unbind(Two.Events.insert, bindVertices)
              .unbind(Two.Events.remove, unbindVertices);
          }

          // Create new Collection with copy of vertices
          if (vertices instanceof Two.Utils.Collection) {
            this._collection = vertices;
          } else {
            this._collection = new Two.Utils.Collection(vertices || []);
          }


          // Listen for Collection changes and bind / unbind
          this._collection
            .bind(Two.Events.insert, bindVertices)
            .bind(Two.Events.remove, unbindVertices);

          // Bind Initial Vertices
          bindVertices(this._collection);

        }

      });

      /**
       * @name Two.Path#clip
       * @property {Two.Shape} - Object to define clipping area.
       * @nota-bene This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
       */
      Object.defineProperty(object, 'clip', {
        enumerable: true,
        get: function() {
          return this._clip;
        },
        set: function(v) {
          this._clip = v;
          this._flagClip = true;
        }
      });

    }

  });

  _.extend(Path.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    /**
     * @name Two.Path#_flagVertices
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#vertices} need updating.
     */
    _flagVertices: true,

    /**
     * @name Two.Path#_flagLength
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#length} needs updating.
     */
    _flagLength: true,

    /**
     * @name Two.Path#_flagFill
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#fill} needs updating.
     */
    _flagFill: true,

    /**
     * @name Two.Path#_flagStroke
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#stroke} needs updating.
     */
    _flagStroke: true,

    /**
     * @name Two.Path#_flagLinewidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#linewidth} needs updating.
     */
    _flagLinewidth: true,

    /**
     * @name Two.Path#_flagOpacity
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#opacity} needs updating.
     */
    _flagOpacity: true,

    /**
     * @name Two.Path#_flagVisible
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#visible} needs updating.
     */
    _flagVisible: true,

    /**
     * @name Two.Path#_flagClassName
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#className} needs updating.
     */
    _flagClassName: true,

    /**
     * @name Two.Path#_flagCap
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#cap} needs updating.
     */
    _flagCap: true,

    /**
     * @name Two.Path#_flagJoin
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#join} needs updating.
     */
    _flagJoin: true,

    /**
     * @name Two.Path#_flagMiter
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#miter} needs updating.
     */
    _flagMiter: true,

    /**
     * @name Two.Path#_flagClip
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#clip} needs updating.
     */
    _flagClip: false,

    // Underlying Properties

    /**
     * @name Two.Path#_length
     * @private
     * @see {@link Two.Path#length}
     */
    _length: 0,

    /**
     * @name Two.Path#_fill
     * @private
     * @see {@link Two.Path#fill}
     */
    _fill: '#fff',

    /**
     * @name Two.Path#_stroke
     * @private
     * @see {@link Two.Path#stroke}
     */
    _stroke: '#000',

    /**
     * @name Two.Path#_linewidth
     * @private
     * @see {@link Two.Path#linewidth}
     */
    _linewidth: 1.0,

    /**
     * @name Two.Path#_opacity
     * @private
     * @see {@link Two.Path#opacity}
     */
    _opacity: 1.0,

    /**
     * @name Two.Path#_className
     * @private
     * @see {@link Two.Path#className}
     */
    _className: '',

    /**
     * @name Two.Path#_visible
     * @private
     * @see {@link Two.Path#visible}
     */
    _visible: true,

    /**
     * @name Two.Path#_cap
     * @private
     * @see {@link Two.Path#cap}
     */
    _cap: 'round',

    /**
     * @name Two.Path#_join
     * @private
     * @see {@link Two.Path#join}
     */
    _join: 'round',

    /**
     * @name Two.Path#_miter
     * @private
     * @see {@link Two.Path#miter}
     */
    _miter: 4,

    /**
     * @name Two.Path#_closed
     * @private
     * @see {@link Two.Path#closed}
     */
    _closed: true,

    /**
     * @name Two.Path#_curved
     * @private
     * @see {@link Two.Path#curved}
     */
    _curved: false,

    /**
     * @name Two.Path#_automatic
     * @private
     * @see {@link Two.Path#automatic}
     */
    _automatic: true,

    /**
     * @name Two.Path#_beginning
     * @private
     * @see {@link Two.Path#beginning}
     */
    _beginning: 0,

    /**
     * @name Two.Path#_ending
     * @private
     * @see {@link Two.Path#ending}
     */
    _ending: 1.0,

    /**
     * @name Two.Path#_clip
     * @private
     * @see {@link Two.Path#clip}
     */
    _clip: false,

    constructor: Path,

    /**
     * @name Two.Path#clone
     * @function
     * @param {Two.Group} parent - The parent group or scene to add the clone to.
     * @returns {Two.Path}
     * @description Create a new instance of {@link Two.Path} with the same properties of the current path.
     */
    clone: function(parent) {

      var clone = new Path();

      clone.vertices = this.vertices;

      for (var i = 0; i < Path.Properties.length; i++) {
        var k = Path.Properties[i];
        clone[k] = this[k];
      }

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      if (parent) {
        parent.add(clone);
      }

      return clone._update();

    },

    /**
     * @name Two.Path#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject: function() {

      var result = {
        vertices: _.map(this.vertices, function(v) {
          return v.toObject();
        })
      };

      _.each(Two.Shape.Properties, function(k) {
        result[k] = this[k];
      }, this);

      result.translation = this.translation.toObject();
      result.rotation = this.rotation;
      result.scale = this.scale instanceof Two.Vector ? this.scale.toObject() : this.scale;

      return result;

    },

    /**
     * @name Two.Path#noFill
     * @function
     * @description Short hand method to set fill to `transparent`.
     */
    noFill: function() {
      this.fill = 'transparent';
      return this;
    },

    /**
     * @name Two.Path#noStroke
     * @function
     * @description Short hand method to set stroke to `transparent`.
     */
    noStroke: function() {
      this.stroke = 'transparent';
      return this;
    },

    /**
     * @name Two.Path#corner
     * @function
     * @description Orient the vertices of the shape to the upper left-hand corner of the path.
     */
    corner: function() {

      var rect = this.getBoundingClientRect(true);

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
     * @name Two.Path#center
     * @function
     * @description Orient the vertices of the shape to the center of the path.
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
     * @name Two.Path#remove
     * @function
     * @description Remove self from the scene / parent.
     */
    remove: function() {

      if (!this.parent) {
        return this;
      }

      this.parent.remove(this);

      return this;

    },

    /**
     * @name Two.Path#getBoundingClientRect
     * @function
     * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
     * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
     * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
     */
    getBoundingClientRect: function(shallow) {
      var matrix, border, l, x, y, i, v0, c0, c1, v1;

      var left = Infinity, right = -Infinity,
          top = Infinity, bottom = -Infinity;

      // TODO: Update this to not __always__ update. Just when it needs to.
      this._update(true);

      matrix = !!shallow ? this._matrix : getComputedMatrix(this);

      border = this.linewidth / 2;
      l = this._renderer.vertices.length;

      if (l <= 0) {
        v = matrix.multiply(0, 0, 1);
        return {
          top: v.y,
          left: v.x,
          right: v.x,
          bottom: v.y,
          width: 0,
          height: 0
        };
      }

      for (i = 1; i < l; i++) {

        v1 = this._renderer.vertices[i];
        v0 = this._renderer.vertices[i - 1];

        if (v0.controls && v1.controls) {

          if (v0.relative) {
            c0 = matrix.multiply(
              v0.controls.right.x + v0.x, v0.controls.right.y + v0.y, 1);
          } else {
            c0 = matrix.multiply(
              v0.controls.right.x, v0.controls.right.y, 1);
          }
          v0 = matrix.multiply(v0.x, v0.y, 1);

          if (v1.relative) {
            c1 = matrix.multiply(
              v1.controls.left.x + v1.x, v1.controls.left.y + v1.y, 1);
          } else {
            c1 = matrix.multiply(
              v1.controls.left.x, v1.controls.left.y, 1);
          }
          v1 = matrix.multiply(v1.x, v1.y, 1);

          var bb = Two.Utils.getCurveBoundingBox(
            v0.x, v0.y, c0.x, c0.y, c1.x, c1.y, v1.x, v1.y);

          top = min(bb.min.y - border, top);
          left = min(bb.min.x - border, left);
          right = max(bb.max.x + border, right);
          bottom = max(bb.max.y + border, bottom);

        } else {

          if (i <= 1) {

            v0 = matrix.multiply(v0.x, v0.y, 1);

            top = min(v0.y - border, top);
            left = min(v0.x - border, left);
            right = max(v0.x + border, right);
            bottom = max(v0.y + border, bottom);

          }

          v1 = matrix.multiply(v1.x, v1.y, 1);

          top = min(v1.y - border, top);
          left = min(v1.x - border, left);
          right = max(v1.x + border, right);
          bottom = max(v1.y + border, bottom);

        }

      }

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
     * @name Two.Path#getPointAt
     * @function
     * @param {Boolean} t - Percentage value describing where on the Two.Path to estimate and assign coordinate values.
     * @param {Two.Vector} [obj=undefined] - Object to apply calculated x, y to. If none available returns new Object.
     * @returns {Object}
     * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this Two.Path's curve.
     */
    getPointAt: function(t, obj) {

      var ia, ib, result;
      var x, x1, x2, x3, x4, y, y1, y2, y3, y4, left, right;
      var target = this.length * Math.min(Math.max(t, 0), 1);
      var length = this.vertices.length;
      var last = length - 1;

      var a = null;
      var b = null;

      for (var i = 0, l = this._lengths.length, sum = 0; i < l; i++) {

        if (sum + this._lengths[i] >= target) {

          if (this._closed) {
            ia = Two.Utils.mod(i, length);
            ib = Two.Utils.mod(i - 1, length);
            if (i === 0) {
              ia = ib;
              ib = i;
            }
          } else {
            ia = i;
            ib = Math.min(Math.max(i - 1, 0), last);
          }

          a = this.vertices[ia];
          b = this.vertices[ib];
          target -= sum;
          if (this._lengths[i] !== 0) {
            t = target / this._lengths[i];
          } else {
            t = 0;
          }

          break;

        }

        sum += this._lengths[i];

      }

      if (_.isNull(a) || _.isNull(b)) {
        return null;
      }

      if (!a) {
        return b;
      } else if (!b) {
        return a;
      }

      right = b.controls && b.controls.right;
      left = a.controls && a.controls.left;

      x1 = b.x;
      y1 = b.y;
      x2 = (right || b).x;
      y2 = (right || b).y;
      x3 = (left || a).x;
      y3 = (left || a).y;
      x4 = a.x;
      y4 = a.y;

      if (right && b.relative) {
        x2 += b.x;
        y2 += b.y;
      }

      if (left && a.relative) {
        x3 += a.x;
        y3 += a.y;
      }

      x = Two.Utils.getComponentOnCubicBezier(t, x1, x2, x3, x4);
      y = Two.Utils.getComponentOnCubicBezier(t, y1, y2, y3, y4);

      // Higher order points for control calculation.
      var t1x = Two.Utils.lerp(x1, x2, t);
      var t1y = Two.Utils.lerp(y1, y2, t);
      var t2x = Two.Utils.lerp(x2, x3, t);
      var t2y = Two.Utils.lerp(y2, y3, t);
      var t3x = Two.Utils.lerp(x3, x4, t);
      var t3y = Two.Utils.lerp(y3, y4, t);

      // Calculate the returned points control points.
      var brx = Two.Utils.lerp(t1x, t2x, t);
      var bry = Two.Utils.lerp(t1y, t2y, t);
      var alx = Two.Utils.lerp(t2x, t3x, t);
      var aly = Two.Utils.lerp(t2y, t3y, t);

      if (_.isObject(obj)) {

        obj.x = x;
        obj.y = y;

        if (!_.isObject(obj.controls)) {
          Two.Anchor.AppendCurveProperties(obj);
        }

        obj.controls.left.x = brx;
        obj.controls.left.y = bry;
        obj.controls.right.x = alx;
        obj.controls.right.y = aly;

        if (!_.isBoolean(obj.relative) || obj.relative) {
          obj.controls.left.x -= x;
          obj.controls.left.y -= y;
          obj.controls.right.x -= x;
          obj.controls.right.y -= y;
        }

        obj.t = t;

        return obj;

      }

      result = new Two.Anchor(
        x, y, brx - x, bry - y, alx - x, aly - y,
        this._curved ? Two.Commands.curve : Two.Commands.line
      );

      result.t = t;

      return result;

    },

    /**
     * @name Two.Path#plot
     * @function
     * @description Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
     * @nota-bene While this method is public it is internally called by {@link Two.Path#_update} when `automatic = true`.
     */
    plot: function() {

      if (this.curved) {
        Two.Utils.getCurveFromPoints(this._collection, this.closed);
        return this;
      }

      for (var i = 0; i < this._collection.length; i++) {
        this._collection[i].command = i === 0 ? Two.Commands.move : Two.Commands.line;
      }

      return this;

    },

    /**
     * @name Two.Path#subdivide
     * @function
     * @param {Integer} limit - How many times to recurse subdivisions.
     * @description Insert a {@link Two.Anchor} at the midpoint between every item in {@link Two.Path#vertices}.
     */
    subdivide: function(limit) {
      //TODO: DRYness (function below)
      this._update();

      var last = this.vertices.length - 1;
      var b = this.vertices[last];
      var closed = this._closed || this.vertices[last]._command === Two.Commands.close;
      var points = [];
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
          b = a;
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

          points[points.length - 1].command = closed
            ? Two.Commands.close : Two.Commands.line;

        }

        b = a;

      }, this);

      this._automatic = false;
      this._curved = false;
      this.vertices = points;

      return this;

    },

    /**
     * @name Two.Path#_updateLength
     * @function
     * @private
     * @param {Integer} [limit=] -
     * @param {Boolean} [silent=false] - If set to `true` then the path isn't updated before calculation. Useful for internal use.
     * @description Recalculate the {@link Two.Path#length} value.
     */
    _updateLength: function(limit, silent) {
      //TODO: DRYness (function above)
      if (!silent) {
        this._update();
      }

      var length = this.vertices.length;
      var last = length - 1;
      var b = this.vertices[last];
      var closed = false;//this._closed || this.vertices[last]._command === Two.Commands.close;
      var sum = 0;

      if (_.isUndefined(this._lengths)) {
        this._lengths = [];
      }

      _.each(this.vertices, function(a, i) {

        if ((i <= 0 && !closed) || a.command === Two.Commands.move) {
          b = a;
          this._lengths[i] = 0;
          return;
        }

        this._lengths[i] = getCurveLength(a, b, limit);
        this._lengths[i] = Two.Utils.toFixed(this._lengths[i]);
        sum += this._lengths[i];

        if (i >= last && closed) {

          b = this.vertices[(i + 1) % length];

          this._lengths[i + 1] = getCurveLength(a, b, limit);
          this._lengths[i + 1] = Two.Utils.toFixed(this._lengths[i + 1]);
          sum += this._lengths[i + 1];

        }

        b = a;

      }, this);

      this._length = sum;
      this._flagLength = false;

      return this;

    },

    /**
     * @name Two.Path#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update: function() {

      if (this._flagVertices) {

        if (this._automatic) {
          this.plot();
        }

        if (this._flagLength) {
          this._updateLength(undefined, true);
        }

        var l = this._collection.length;
        var last = l - 1;
        var closed = this._closed;

        var beginning = Math.min(this._beginning, this._ending);
        var ending = Math.max(this._beginning, this._ending);

        var bid = getIdByLength(this, beginning * this._length);
        var eid = getIdByLength(this, ending * this._length);

        var low = ceil(bid);
        var high = floor(eid);

        var left, right, prev, next, v;

        this._renderer.vertices.length = 0;

        for (var i = 0; i < l; i++) {

          if (this._renderer.collection.length <= i) {
            // Expected to be `relative` anchor points.
            this._renderer.collection.push(new Two.Anchor());
          }

          if (i > high && !right) {

            v = this._renderer.collection[i];
            v.copy(this._collection[i]);
            this.getPointAt(ending, v);
            v.command = this._renderer.collection[i].command;
            this._renderer.vertices.push(v);

            right = v;
            prev = this._collection[i - 1];

            // Project control over the percentage `t`
            // of the in-between point
            if (prev && prev.controls) {

              v.controls.right.clear();

              this._renderer.collection[i - 1].controls.right
                .clear()
                .lerp(prev.controls.right, v.t);

            }

          } else if (i >= low && i <= high) {

            v = this._renderer.collection[i]
              .copy(this._collection[i]);
            this._renderer.vertices.push(v);

            if (i === high && contains(this, ending)) {
              right = v;
              if (!closed && right.controls) {
                right.controls.right.clear();
              }
            } else if (i === low && contains(this, beginning)) {
              left = v;
              left.command = Two.Commands.move;
              if (!closed && left.controls) {
                left.controls.left.clear();
              }
            }

          }

        }

        // Prepend the trimmed point if necessary.
        if (low > 0 && !left) {

          i = low - 1;

          v = this._renderer.collection[i];
          v.copy(this._collection[i]);
          this.getPointAt(beginning, v);
          v.command = Two.Commands.move;
          this._renderer.vertices.unshift(v);

          left = v;
          next = this._collection[i + 1];

          // Project control over the percentage `t`
          // of the in-between point
          if (next && next.controls) {

            v.controls.left.clear();

            this._renderer.collection[i + 1].controls.left
              .copy(next.controls.left)
              .lerp(Two.Vector.zero, v.t);

          }

        }

      }

      Two.Shape.prototype._update.apply(this, arguments);

      return this;

    },

    /**
     * @name Two.Path#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset: function() {

      this._flagVertices =  this._flagFill =  this._flagStroke =
         this._flagLinewidth = this._flagOpacity = this._flagVisible =
         this._flagCap = this._flagJoin = this._flagMiter =
         this._flagClassName = this._flagClip = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Path.MakeObservable(Path.prototype);

   // Utility functions

  function contains(path, t) {

    if (t === 0 || t === 1) {
      return true;
    }

    var length = path._length;
    var target = length * t;
    var elapsed = 0;

    for (var i = 0; i < path._lengths.length; i++) {
      var dist = path._lengths[i];
      if (elapsed >= target) {
        return target - elapsed >= 0;
      }
      elapsed += dist;
    }

    return false;

  }

  /**
   * @protected
   * @param {Two.Path} path - The path to analyze against.
   * @param {Number} target - The target length at which to find an anchor.
   * @returns {Integer}
   * @description Return the id of an anchor based on a target length.
   */
  function getIdByLength(path, target) {

    var total = path._length;

    if (target <= 0) {
      return 0;
    } else if (target >= total) {
      return path._lengths.length - 1;
    }

    for (var i = 0, sum = 0; i < path._lengths.length; i++) {

      if (sum + path._lengths[i] >= target) {
        target -= sum;
        return Math.max(i - 1, 0) + target / path._lengths[i];
      }

      sum += path._lengths[i];

    }

    return - 1;

  }

  function getCurveLength(a, b, limit) {
    // TODO: DRYness
    var x1, x2, x3, x4, y1, y2, y3, y4;

    var right = b.controls && b.controls.right;
    var left = a.controls && a.controls.left;

    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;

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
    // TODO: DRYness
    var x1, x2, x3, x4, y1, y2, y3, y4;

    var right = b.controls && b.controls.right;
    var left = a.controls && a.controls.left;

    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;

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

})((typeof global !== 'undefined' ? global : (this || window)).Two);
