(function() {

  var root = this;
  var previousTwo = root.Two || {};

  /**
   * Constants
   */

  var sin = Math.sin,
    cos = Math.cos,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,
    round = Math.round,
    abs = Math.abs,
    PI = Math.PI,
    TWO_PI = PI * 2,
    HALF_PI = PI / 2,
    pow = Math.pow;

  /**
   * Cross browser dom events.
   */
  var dom = {

    hasEventListeners: _.isFunction(root.addEventListener),

    bind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.addEventListener(event, func, !!bool);
      } else {
        elem.attachEvent('on' + event, func);
      }
      return this;
    },

    unbind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.removeEventListeners(event, func, !!bool);
      } else {
        elem.detachEvent('on' + event, func);
      }
      return this;
    }

  };

  /**
   * @class
   */
  var Two = root.Two = function(options) {

    // Determine what Renderer to use and setup a scene.

    var params = _.defaults(options || {}, {
      fullscreen: false,
      width: 640,
      height: 480,
      type: Two.Types.svg,
      autostart: false
    });

    this.type = params.type;
    this.renderer = new Two[this.type](this);
    this.playing = params.autostart;
    this.frameCount = 0;

    if (params.fullscreen) {

      var fitted = _.bind(fitToWindow, this);
      _.extend(document.body.style, {
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      dom.bind(window, 'resize', fitted);
      fitted();


    } else {

      this.renderer.setSize(params.width, params.height);
      this.width = params.width;
      this.height = params.height;

    }

    this.scene = new Two.Group();
    this.renderer.add(this.scene);

    Two.Instances.push(this);

  };

  _.extend(Two, {

    /**
     * Primitive
     */

    Array: root.Float32Array || Array,

    Types: {
      webgl: 'WebGLRenderer',
      svg: 'SVGRenderer',
      canvas: 'CanvasRenderer'
    },

    Properties: {
      hierarchy: 'hierarchy'
    },

    Events: {
      play: 'play',
      pause: 'pause',
      update: 'update',
      render: 'render',
      resize: 'resize',
      change: 'change'
    },

    Resolution: 8,

    Instances: [],

    noConflict: function() {
      root.Two = previousTwo;
      return this;
    },

    Utils: {

      Curve: {

        CollinearityEpsilon: pow(10, -30),

        RecursionLimit: 32,

        CuspLimit: 2,

        Tolerance: {
          distance: 0.25,
          angle: 0,
          epsilon: 0.01
        }

      },

      /**
       * Given 2 points (a, b) and corresponding control point for each
       * return an array of points that represent an Adaptive Subdivision
       * of Bezier Curves. Founded in the online article:
       *
       * http://www.antigrain.com/research/adaptive_bezier/index.html
       *
       * Where level represents how many levels deep the function has
       * already recursed.
       *
       */
      subdivide: function(x1, y1, x2, y2, x3, y3, x4, y4, level) {

        // Constants
        var epsilon = Two.Utils.Curve.CollinearityEpsilon,
          limit = Two.Utils.Curve.RecursionLimit,
          cuspLimit = Two.Utils.Curve.CuspLimit,
          tolerance = Two.Utils.Curve.Tolerance;

        var level = level || 0;

        var x12 = (x1 + x2) / 2,
            y12 = (y1 + y2) / 2,
            x23 = (x2 + x3) / 2,
            y23 = (y2 + y3) / 2,
            x34 = (x3 + x4) / 2,
            y34 = (y3 + y4) / 2,
            x123  = (x12 + x23) / 2,
            y123  = (y12 + y23) / 2,
            x234  = (x23 + x34) / 2,
            y234  = (y23 + y34) / 2,
            x1234 = (x123 + x234) / 2,
            y1234 = (y123 + y234) / 2;

        if (level > 0) {

          // Try to approximate the full cubic curve by a single straight line.
          var dx = x4 - x1;
          var dy = y4 - y1;

          var d2 = abs(((x2 - x4) * dy - (y2 - y4) * dx));
          var d3 = abs(((x3 - x4) * dy - (y3 - y4) * dx));

          var da1, da2;

          if (d2 > epsilon && d3 > epsilon) {

            if ((d2 + d3) * (d2 + d3) <= tolerance.distance * (dx * dx + dy * dy)) {

              if (tolerance.angle < tolerance.epsilon) {
                return [new Two.Vector(x1234, y1234)];
              }

              var a23 = atan2(y3 - y2, x3 - x2);
              da1 = abs(a23 - atan2(y2 - y1, x2 - x1));
              da2 = abs(atan2(y4 - y3, x4 - x3) - a23);

              if (da1 >= PI) da1 = TWO_PI - da1;
              if (da2 >= PI) da2 = TWO_PI - da2;

              if (da1 + da2 < tolerance.angle) {
                return [new Two.Vector(x1234, y1234)];
              }

              if (cuspLimit !== 0) {

                if (da1 > cuspLimit) {
                  return [new Two.Vector(x2, y2)];
                }

                if (da2 > cuspLimit) {
                  return [new Two.Vector(x3, y3)];
                }

              }

            }

          }

        } else {

          if (d2 > epsilon) {

            if (d2 * d2 <= tolerance.distance * (dx * dx + dy * dy)) {

              if (tolerance.angle < tolerance.epsilon) {
                return [new Two.Vector(x1234, y1234)];
              }

              da1 = abs(atan2(y3 - y2, x3 - x2) - atan2(y2 - y1, x2 - x1));
              if (da1 >= PI) da1 = TWO_PI - da1;

              if (da1 < tolerance.angle) {
                return [
                  new Two.Vector(x2, y2),
                  new Two.Vector(x3, y3)
                ];
              }

              if (cuspLimit !== 0) {

                if (da1 > cuspLimit) {
                  return [new Two.Vector(x2, y2)];
                }

              }

            } else if (d3 > epsilon) {

              if (d3 * d3 <= tolerance.distance * (dx * dx + dy * dy)) {

                if (tolerance.angle < tolerance.epsilon) {
                  return [new Two.Vector(x1234, y1234)];
                }

                da1 = abs(atan2(y4 - y3, x4 - x3) - atan2(y3 - y2, x3 - x2));
                if (da1 >= PI) da1 = TWO_PI - da1;

                if (da1 < tolerance.angle) {
                  return [
                    new Two.Vector(x2, y2),
                    new Two.Vector(x3, y3)
                  ];
                }

                if (cuspLimit !== 0) {

                  if (da1 > cuspLimit) {
                    return [new Two.Vector2(x3, y3)];
                  }

                }

              }

            } else {

              dx = x1234 - (x1 + x4) / 2;
              dy = y1234 - (y1 + y4) / 2;
              if (dx * dx + dy * dy <= tolerance.distance) {
                return [new Two.Vector(x1234, y1234)];
              }

            }

          }

        }

        return Two.Utils.subdivide(
          x1, y1, x12, y12, x123, y123, x1234, y1234, level + 1
        ).concat(Two.Utils.subdivide(
          x1234, y1234, x234, y234, x34, y34, x4, y4, level + 1
        ));

      },

      /**
       * Creates a set of points that have u, v values for anchor positions
       */
      getCurveFromPoints: function(points, closed) {

        var curve = [], l = points.length, last = l - 1;

        for (var i = 0; i < l; i++) {

          var p = points[i];
          var point = { x: p.x, y: p.y };
          curve.push(point);

          var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

          var a = points[prev];
          var b = point;
          var c = points[next];
          getControlPoints(a, b, c);

          if (!b.u.x && !b.u.y) {
            b.u.x = b.x;
            b.u.y = b.y;
          }

          if (!b.v.x && !b.v.y) {
            b.v.x = b.x;
            b.v.y = b.y;
          }

        }

        return curve;

      },

      /**
       * Given three coordinates return the control points for the middle, b,
       * vertex.
       */
      getControlPoints: function(a, b, c) {

        var a1 = angleBetween(a, b);
        var a2 = angleBetween(c, b);

        var d1 = distanceBetween(a, b);
        var d2 = distanceBetween(c, b);

        var mid = (a1 + a2) / 2;

        // So we know which angle corresponds to which side.

        var u, v;

        if (d1 < 0.0001 || d2 < 0.0001) {
          b.u = { x: b.x, y: b.y };
          b.v = { x: b.x, y: b.y };
          return b;
        }

        d1 *= 0.33; // Why 0.33?
        d2 *= 0.33;

        if (a2 < a1) {
          mid += HALF_PI;
        } else {
          mid -= HALF_PI;
        }

        u = {
          x: b.x + cos(mid) * d1,
          y: b.y + sin(mid) * d1
        };

        mid -= PI;

        v = {
          x: b.x + cos(mid) * d2,
          y: b.y + sin(mid) * d2
        };

        b.u = u;
        b.v = v;

        return b;

      },

      angleBetween: function(A, B) {

        var dx = A.x - B.x;
        var dy = A.y - B.y;

        return atan2(dy, dx);

      },

      distanceBetweenSquared: function(p1, p2) {

        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;

        return dx * dx + dy * dy;

      },

      distanceBetween: function(p1, p2) {

        return sqrt(distanceBetweenSquared(p1, p2));

      },

      mod: function(v, l) {

        while (v < 0) {
          v += l;
        }

        return v % l;

      },

      // Custom Error Throwing for Two.js

      Error: function(message) {
        this.name = 'two.js';
        this.message = message;
      }

    }

  });

  Two.Utils.Error.prototype = new Error();
  Two.Utils.Error.prototype.constructor = Two.Utils.Error;

  // Localize utils

  var distanceBetween = Two.Utils.distanceBetween,
    distanceBetweenSquared = Two.Utils.distanceBetweenSquared,
    angleBetween = Two.Utils.angleBetween,
    getControlPoints = Two.Utils.getControlPoints,
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  _.extend(Two.prototype, Backbone.Events, {

    appendTo: function(elem) {

      elem.appendChild(this.renderer.domElement);
      return this;

    },

    play: function() {

      this.playing = true;

      return this.trigger(Two.Events.play);

    },

    pause: function() {

      this.playing = false;

      return this.trigger(Two.Events.pause);

    },

    /**
     * Update positions and calculations in one pass before rendering.
     */
    update: function() {

      this.frameCount++;

      var width = this.width;
      var height = this.height;
      var renderer = this.renderer;

      // Update width / height for the renderer
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize(width, height);
      }

      return this.trigger(Two.Events.update, this.frameCount);

    },

    /**
     * Render all drawable - visible objects of the scene.
     */
    render: function() {

      this.renderer.render();

      return this.trigger(Two.Events.render, this.frameCount);

    },

    /**
     * Convenience Methods
     */

    add: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      this.scene.add(objects);
      return this;

    },

    makeLine: function(x1, y1, x2, y2) {

      var width = x2 - x1;
      var height = y2 - y1;

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Vector(- w2, - h2),
        new Two.Vector(w2, h2)
      ];

      // Center line and translate to desired position.

      var line = new Two.Polygon(points).noFill();
      line.translation.set(x1 + w2, y1 + h2);

      this.scene.add(line);
      return line;

    },

    makeRectangle: function(x, y, width, height) {

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Vector(w2, h2),
        new Two.Vector(-w2, h2),
        new Two.Vector(-w2, -h2),
        new Two.Vector(w2, -h2)
      ];

      var rect = new Two.Polygon(points, true);
      rect.translation.set(x, y);

      this.scene.add(rect);
      return rect;

    },

    makeCircle: function(ox, oy, r) {

      return this.makeEllipse(ox, oy, r, r);

    },

    makeEllipse: function(ox, oy, width, height) {

      var amount = Two.Resolution;

      var points = _.map(_.range(amount), function(i) {
        var pct = i / amount;
        var theta = pct * TWO_PI;
        var x = width * cos(theta);
        var y = height * sin(theta);
        return new Two.Vector(x, y);
      }, this);

      var ellipse = new Two.Polygon(points, true, true);
      ellipse.translation.set(ox, oy);

      this.scene.add(ellipse);

      return ellipse;

    },

    makeCurve: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Vector(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined), true);
      var rect = poly.getBoundingClientRect();

      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      _.each(poly.vertices, function(v) {
        v.x -= cx;
        v.y -= cy;
      });

      poly.translation.set(cx, cy);

      this.scene.add(poly);

      return poly;

    },

    /**
     * Convenience method to make and draw a Two.Polygon.
     */
    makePolygon: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Vector(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined));
      var rect = poly.getBoundingClientRect();

      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      _.each(poly.vertices, function(v) {
        v.x -= cx;
        v.y -= cy;
      });

      poly.translation.set(cx, cy);

      this.scene.add(poly);

      return poly;

    },

    makeGroup: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      var group = new Two.Group();
      this.scene.add(group);
      group.add(objects);

      return group;

    }

    // Utility Functions will go here.

  });

  function fitToWindow() {

    var wr = document.body.getBoundingClientRect();

    var width = this.width = wr.width;
    var height = this.height = wr.height;

    this.renderer.setSize(width, height);
    this.trigger(Two.Events.resize, width, height);

  }

  // Request Animation Frame

  (function() {

    _.each(Two.Instances, function(t) {

      if (t.playing) {
        t.update().render();
      }

    });

    requestAnimationFrame(arguments.callee);

  })();

})();