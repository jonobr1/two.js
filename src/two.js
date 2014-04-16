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
    pow = Math.pow,
    min = Math.min,
    max = Math.max;

  /**
   * Localized variables
   */

  var count = 0;

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

    _.each(params, function(v, k) {
      if (k === 'fullscreen' || k === 'width' || k === 'height'
        || k === 'autostart') {
        return;
      }
      this[k] = v;
    }, this);

    // Specified domElement overrides type declaration.
    if (_.isElement(params.domElement)) {
      this.type = Two.Types[params.domElement.tagName.toLowerCase()];
    }

    this.renderer = new Two[this.type](this);
    Two.Utils.setPlaying.call(this, params.autostart);
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
      _.extend(this.renderer.domElement.style, {
        display: 'block',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      dom.bind(root, 'resize', fitted);
      fitted();


    } else if (!_.isElement(params.domElement)) {

      this.renderer.setSize(params.width, params.height, this.ratio);
      this.width = params.width;
      this.height = params.height;

    }

    this.scene = this.renderer.scene;

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

    Version: 'v0.4.0',

    Identifier: 'two-',

    Properties: {
      hierarchy: 'hierarchy',
      demotion: 'demotion'
    },

    Events: {
      play: 'play',
      pause: 'pause',
      update: 'update',
      render: 'render',
      resize: 'resize',
      change: 'change',
      remove: 'remove',
      insert: 'insert'
    },

    Commands: {
      move: 'M',
      line: 'L',
      curve: 'C',
      close: 'Z'
    },

    Resolution: 8,

    Instances: [],

    noConflict: function() {
      root.Two = previousTwo;
      return this;
    },

    uniqueId: function() {
      var id = count;
      count++;
      return id;
    },

    Utils: {

      /**
       * Release an arbitrary class' events from the two.js corpus and recurse
       * through its children and or vertices.
       */
      release: function(obj) {

        if (!_.isObject(obj)) {
          return;
        }

        if (_.isFunction(obj.unbind)) {
          obj.unbind();
        }

        if (obj.vertices) {
          if (_.isFunction(obj.vertices.unbind)) {
            obj.vertices.unbind();
          }
          _.each(obj.vertices, function(v) {
            if (_.isFunction(v.unbind)) {
              v.unbind();
            }
          });
        }

        if (obj.children) {
          _.each(obj.children, function(obj) {
            Two.Utils.release(obj);
          });
        }

      },

      Curve: {

        CollinearityEpsilon: pow(10, -30),

        RecursionLimit: 16,

        CuspLimit: 0,

        Tolerance: {
          distance: 0.25,
          angle: 0,
          epsilon: 0.01
        }

      },

      /**
       * Account for high dpi rendering.
       * http://www.html5rocks.com/en/tutorials/canvas/hidpi/
       */

      devicePixelRatio: root.devicePixelRatio || 1,

      getBackingStoreRatio: function(ctx) {
        return ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;
      },

      getRatio: function(ctx) {
        return Two.Utils.devicePixelRatio / getBackingStoreRatio(ctx);
      },

      /**
       * Properly defer play calling until after all objects
       * have been updated with their newest styles.
       */
      setPlaying: function(b) {

        this.playing = !!b;
        return this;

      },

      /**
       * Return the computed matrix of a nested object.
       * TODO: Optimize traversal.
       */
      getComputedMatrix: function(object, matrix) {

        var matrices = [];
        var matrix = (matrix && matrix.identity()) || new Two.Matrix();
        var parent = object;

        while (parent && parent._matrix) {
          matrices.push(parent._matrix);
          parent = parent.parent;
        }

        matrices.reverse();

        _.each(matrices, function(m) {

          var e = m.elements;
          matrix.multiply(
            e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);

        });

        return matrix;

      },

      applySvgAttributes: function(node, elem) {

        _.each(node.attributes, function(v, k) {

          var property = v.nodeName;

          switch (property) {

            case 'transform':

              // TODO:
              // Need to figure out how to decompose matrix into
              // translation, rotation, scale.

              // var transforms = node[k].baseVal;
              // var matrix = new Two.Matrix();
              // _.each(_.range(transforms.numberOfItems), function(i) {
              //   var m = transforms.getItem(i).matrix;
              //   matrix.multiply(m.a, m.b, m.c, m.d, m.e, m.f);
              // });
              // elem.setMatrix(matrix);
              break;
            case 'visibility':
              elem.visible = !!v.nodeValue;
              break;
            case 'stroke-linecap':
              elem.cap = v.nodeValue;
              break;
            case 'stroke-linejoin':
              elem.join = v.nodeValue;
              break;
            case 'stroke-miterlimit':
              elem.miter = v.nodeValue;
              break;
            case 'stroke-width':
              elem.linewidth = parseFloat(v.nodeValue);
              break;
            case 'stroke-opacity':
            case 'fill-opacity':
            case 'opacity':
              elem.opacity = v.nodeValue;
              break;
            case 'fill':
              elem.fill = v.nodeValue;
              break;
            case 'stroke':
              elem.stroke = v.nodeValue;
              break;
            case 'id':
              elem.id = v.nodeValue;
              break;
          }

        });

        return elem;

      },

      /**
       * Read any number of SVG node types and create Two equivalents of them.
       */
      read: {

        svg: function() {
          return Two.Utils.read.g.apply(this, arguments);
        },

        g: function(node) {

          var group = new Two.Group();

          this.add(group);

          _.each(node.childNodes, function(n) {

            var tag = n.nodeName;
            if (!tag) return;
            
            var tagName = tag.replace(/svg\:/ig, '').toLowerCase();

            if (tagName in Two.Utils.read) {
              var o = Two.Utils.read[tagName].call(this, n);
              group.add(o);
            }

          }, this);

          return Two.Utils.applySvgAttributes(node, group);

        },

        polygon: function(node, open) {

          var points = node.getAttribute('points');

          var verts = [];
          points.replace(/([\d\.?]+),([\d\.?]+)/g, function(match, p1, p2) {
            verts.push(new Two.Anchor(parseFloat(p1), parseFloat(p2)));
          });

          var poly = new Two.Polygon(verts, !open).noStroke();
          poly.fill = 'black';

          return Two.Utils.applySvgAttributes(node, poly);

        },

        polyline: function(node) {
          return Two.Utils.read.polygon(node, true);
        },

        path: function(node) {

          var path = node.getAttribute('d');

          // Create a Two.Polygon from the paths.
          var coord, control;
          var coords, relative = false;
          var closed = false;
          var commands = path.match(/[a-df-z][^a-df-z]*/ig);
          var last = commands.length - 1;

          var points = _.flatten(_.map(commands, function(command, i) {

            var result, x, y;
            var type = command[0];
            var lower = type.toLowerCase();

            coords = command.slice(1).trim();
            coords = coords.replace(/(-?\d+(?:\.\d*)?)[eE]([+\-]?\d+)/g, function(match, n1, n2) {
              return parseFloat(n1) * Math.pow(10, n2);
            });
            coords = coords.split(/[\s,]+|(?=\s?[+\-])/);
            relative = type === lower;

            var x1, y1, x2, y2, x3, y3, x4, y4, reflection;

            switch (lower) {

              case 'z':
                if (i >= last) {
                  closed = true;
                } else {
                  x = coord.x;
                  y = coord.y;
                  result = new Two.Anchor(
                    x, y,
                    undefined, undefined,
                    undefined, undefined,
                    Two.Commands.close
                  );
                }
                break;

              case 'm':
              case 'l':

                x = parseFloat(coords[0]);
                y = parseFloat(coords[1]);

                result = new Two.Anchor(
                  x, y,
                  undefined, undefined,
                  undefined, undefined,
                  lower === 'm' ? Two.Commands.move : Two.Commands.line
                );

                if (relative) {
                  result.addSelf(coord);
                }

                // result.controls.left.copy(result);
                // result.controls.right.copy(result);

                coord = result;
                break;

              case 'h':
              case 'v':

                var a = lower === 'h' ? 'x' : 'y';
                var b = a === 'x' ? 'y' : 'x';

                result = new Two.Anchor(
                  undefined, undefined,
                  undefined, undefined,
                  undefined, undefined,
                  Two.Commands.line
                );
                result[a] = parseFloat(coords[0]);
                result[b] = coord[b];

                if (relative) {
                  result[a] += coord[a];
                }

                // result.controls.left.copy(result);
                // result.controls.right.copy(result);

                coord = result;
                break;

              case 's':
              case 'c':

                x1 = coord.x, y1 = coord.y;
                if (!control) {
                  control = new Two.Vector().copy(coord);
                }

                if (lower === 'c') {

                  x2 = parseFloat(coords[0]), y2 = parseFloat(coords[1]);
                  x3 = parseFloat(coords[2]), y3 = parseFloat(coords[3]);
                  x4 = parseFloat(coords[4]), y4 = parseFloat(coords[5]);

                } else {

                  // Calculate reflection control point for proper x2, y2
                  // inclusion.

                  reflection = Two.Utils.getReflection(coord, control, relative);

                  x2 = reflection.x, y2 = reflection.y;
                  x3 = parseFloat(coords[0]), y3 = parseFloat(coords[1]);
                  x4 = parseFloat(coords[2]), y4 = parseFloat(coords[3]);

                }

                if (relative) {
                  x2 += x1, y2 += y1;
                  x3 += x1, y3 += y1;
                  x4 += x1, y4 += y1;
                }

                if (!_.isObject(coord.controls)) {
                  Two.Anchor.AppendCurveProperties(coord);
                }

                coord.controls.right.set(x2 - coord.x, y2 - coord.y);
                result = new Two.Anchor(
                  x4, y4,
                  x3 - x4, y3 - y4,
                  undefined, undefined,
                  Two.Commands.curve
                );

                coord = result;
                control = result.controls.left;

                break;

              case 't':
              case 'q':

                x1 = coord.x, y1 = coord.y;

                if (!control) {
                  control = new Two.Vector().copy(coord);
                }

                if (control.isZero()) {
                  x2 = x1, y2 = y1;
                } else {
                  x2 = control.x, y1 = control.y;
                }

                if (lower === 'q') {

                  x3 = parseFloat(coords[0]), y3 = parseFloat(coords[1]);
                  x4 = parseFloat(coords[1]), y4 = parseFloat(coords[2]);

                } else {

                  reflection = Two.Utils.getReflection(coord, control, relative);

                  x3 = reflection.x, y3 = reflection.y;
                  x4 = parseFloat(coords[0]), y4 = parseFloat(coords[1]);

                }

                if (relative) {
                  x2 += x1, y2 += y1;
                  x3 += x1, y3 += y1;
                  x4 += x1, y4 += y1;
                }

                if (!_.isObject(coord.controls)) {
                  Two.Anchor.AppendCurveProperties(coord);
                }

                coord.controls.right.set(x2 - coord.x, y2 - coord.y);
                result = new Two.Anchor(
                  x4, y4,
                  x3 - x4, y3 - y4,
                  undefined, undefined,
                  Two.Commands.curve
                );

                coord = result;
                control = result.controls.left;

                break;

              case 'a':
                throw new Two.Utils.Error('not yet able to interpret Elliptical Arcs.');
            }

            return result;

          }));

          if (points.length <= 1) {
            return;
          }

          points = _.compact(points);

          var poly = new Two.Polygon(points, closed, undefined, true).noStroke();
          poly.fill = 'black';

          return Two.Utils.applySvgAttributes(node, poly);

        },

        circle: function(node) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var r = parseFloat(node.getAttribute('r'));

          var amount = Two.Resolution;
          var points = _.map(_.range(amount), function(i) {
            var pct = i / amount;
            var theta = pct * TWO_PI;
            var x = r * cos(theta);
            var y = r * sin(theta);
            return new Two.Anchor(x, y);
          }, this);

          var circle = new Two.Polygon(points, true, true).noStroke();
          circle.translation.set(x, y);
          circle.fill = 'black';

          return Two.Utils.applySvgAttributes(node, circle);

        },

        ellipse: function(node) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var width = parseFloat(node.getAttribute('rx'));
          var height = parseFloat(node.getAttribute('ry'));

          var amount = Two.Resolution;
          var points = _.map(_.range(amount), function(i) {
            var pct = i / amount;
            var theta = pct * TWO_PI;
            var x = width * cos(theta);
            var y = height * sin(theta);
            return new Two.Anchor(x, y);
          }, this);

          var ellipse = new Two.Polygon(points, true, true).noStroke();
          ellipse.translation.set(x, y);
          ellipse.fill = 'black';

          return Two.Utils.applySvgAttributes(node, ellipse);

        },

        rect: function(node) {

          var x = parseFloat(node.getAttribute('x'));
          var y = parseFloat(node.getAttribute('y'));
          var width = parseFloat(node.getAttribute('width'));
          var height = parseFloat(node.getAttribute('height'));

          var w2 = width / 2;
          var h2 = height / 2;

          var points = [
            new Two.Anchor(w2, h2),
            new Two.Anchor(-w2, h2),
            new Two.Anchor(-w2, -h2),
            new Two.Anchor(w2, -h2)
          ];

          var rect = new Two.Polygon(points, true).noStroke();
          rect.translation.set(x + w2, y + h2);
          rect.fill = 'black';

          return Two.Utils.applySvgAttributes(node, rect);

        },

        line: function(node) {

          var x1 = parseFloat(node.getAttribute('x1'));
          var y1 = parseFloat(node.getAttribute('y1'));
          var x2 = parseFloat(node.getAttribute('x2'));
          var y2 = parseFloat(node.getAttribute('y2'));

          var width = x2 - x1;
          var height = y2 - y1;

          var w2 = width / 2;
          var h2 = height / 2;

          var points = [
            new Two.Anchor(- w2, - h2),
            new Two.Anchor(w2, h2)
          ];

          // Center line and translate to desired position.

          var line = new Two.Polygon(points).noFill();
          line.translation.set(x1 + w2, y1 + h2);

          return Two.Utils.applySvgAttributes(node, line);

        }

      },

      /**
       * Given 2 points (a, b) and corresponding control point for each
       * return an array of points that represent points plotted along
       * the curve. Number points determined by limit.
       */
      subdivide: function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {

        var limit = limit || Two.Utils.Curve.RecursionLimit;
        var amount = limit + 1;

        // // Don't recurse if the end points are identical
        // if (x1 === x4 && y1 === y4) {
        //   return [new Two.Anchor(x4, y4)];
        // }

        return _.map(_.range(0, amount), function(i) {

          var t = i / amount;
          var x = getPointOnCubicBezier(t, x1, x2, x3, x4);
          var y = getPointOnCubicBezier(t, y1, y2, y3, y4);

          return new Two.Anchor(x, y);

        });

      },

      getPointOnCubicBezier: function(t, a, b, c, d) {
        var k = 1 - t;
        return (k * k * k * a) + (3 * k * k * t * b) + (3 * k * t * t * c)
          + (t * t * t * d);
      },

      /**
       * Creates a set of points that have u, v values for anchor positions
       */
      getCurveFromPoints: function(points, closed) {

        var l = points.length, last = l - 1;

        for (var i = 0; i < l; i++) {

          var point = points[i];

          if (!_.isObject(point.controls)) {
            Two.Anchor.AppendCurveProperties(point);
          }

          var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

          var a = points[prev];
          var b = point;
          var c = points[next];
          getControlPoints(a, b, c);

          b._command = i === 0 ? Two.Commands.move : Two.Commands.curve;

          b.controls.left.x = _.isNumber(b.controls.left.x) ? b.controls.left.x : b.x;
          b.controls.left.y = _.isNumber(b.controls.left.y) ? b.controls.left.y : b.y;

          b.controls.right.x = _.isNumber(b.controls.right.x) ? b.controls.right.x : b.x;
          b.controls.right.y = _.isNumber(b.controls.right.y) ? b.controls.right.y : b.y;

        }

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

        b.u = _.isObject(b.controls.left) ? b.controls.left : new Two.Vector(0, 0);
        b.v = _.isObject(b.controls.right) ? b.controls.right : new Two.Vector(0, 0);

        d1 *= 0.33; // Why 0.33?
        d2 *= 0.33;

        if (a2 < a1) {
          mid += HALF_PI;
        } else {
          mid -= HALF_PI;
        }

        b.controls.left.x = cos(mid) * d1;
        b.controls.left.y = sin(mid) * d1;

        mid -= PI;

        b.controls.right.x = cos(mid) * d2;
        b.controls.right.y = sin(mid) * d2;

        if (!b._relative) {
          b.controls.left.x += b.x;
          b.controls.left.y += b.y;
          b.controls.right.x += b.x;
          b.controls.right.y += b.y;
        }

        return b;

      },

      /**
       * Get the reflection of a point "b" about point "a".
       */
      getReflection: function(a, b, relative) {

        var d = b.distanceTo(Two.Vector.zero);
        var theta = angleBetween(Two.Vector.zero, b);

        return new Two.Vector(
          d * Math.cos(theta) + (relative ? 0 : a.x),
          d * Math.sin(theta) + (relative ? 0 : a.y)
        );

      },

      angleBetween: function(A, B) {

        var dx, dy;

        if (arguments.length >= 4) {

          dx = arguments[0] - arguments[2];
          dy = arguments[1] - arguments[3];

          return atan2(dy, dx);

        }

        dx = A.x - B.x;
        dy = A.y - B.y;

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

      /**
       * Array like collection that triggers inserted and removed events 
       * removed : pop / shift / splice
       * inserted : push / unshift / splice (with > 2 arguments)
       */

      Collection: function() {

        Array.call(this);

        if(arguments.length > 1) {
          Array.prototype.push.apply(this, arguments);
        } else if( arguments[0] && Array.isArray(arguments[0]) ) {
          Array.prototype.push.apply(this, arguments[0]);
        }

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

  Two.Utils.Collection.prototype = new Array();
  Two.Utils.Collection.constructor = Two.Utils.Collection;

  _.extend(Two.Utils.Collection.prototype, Backbone.Events, {

    pop: function() {
      var popped = Array.prototype.pop.apply(this, arguments);
      this.trigger(Two.Events.remove, [popped]);
      return popped;
    },

    shift: function() {
      var shifted = Array.prototype.shift.apply(this, arguments);
      this.trigger(Two.Events.remove, [shifted]);
      return shifted;
    },

    push: function() {
      var pushed = Array.prototype.push.apply(this, arguments);
      this.trigger(Two.Events.insert, arguments);
      return pushed;
    },

    unshift: function() {
      var unshifted = Array.prototype.unshift.apply(this, arguments);
      this.trigger(Two.Events.insert, arguments);
      return unshifted;
    },

    splice: function() {
      var spliced = Array.prototype.splice.apply(this, arguments);
      var inserted;

      this.trigger(Two.Events.remove, spliced);

      if(arguments.length > 2) {
        inserted = this.slice(arguments[0], arguments.length-2);
        this.trigger(Two.Events.insert, inserted);
      }
      return spliced;
    }

  });

  // Localize utils

  var distanceBetween = Two.Utils.distanceBetween,
    distanceBetweenSquared = Two.Utils.distanceBetweenSquared,
    angleBetween = Two.Utils.angleBetween,
    getControlPoints = Two.Utils.getControlPoints,
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    solveSegmentIntersection = Two.Utils.solveSegmentIntersection,
    decoupleShapes = Two.Utils.decoupleShapes,
    mod = Two.Utils.mod,
    getBackingStoreRatio = Two.Utils.getBackingStoreRatio,
    getPointOnCubicBezier = Two.Utils.getPointOnCubicBezier;

  _.extend(Two.prototype, Backbone.Events, {

    appendTo: function(elem) {

      elem.appendChild(this.renderer.domElement);
      return this;

    },

    play: function() {

      Two.Utils.setPlaying.call(this, true);
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

      var animated = !!this._lastFrame;
      var now = getNow();

      this.frameCount++;

      if (animated) {
        this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
      }
      this._lastFrame = now;

      var width = this.width;
      var height = this.height;
      var renderer = this.renderer;

      // Update width / height for the renderer
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize(width, height, this.ratio);
      }

      this.trigger(Two.Events.update, this.frameCount, this.timeDelta);

      return this.render();

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

    remove: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      this.scene.remove(objects);

      return this;

    },

    clear: function() {

      this.scene.remove(_.toArray(this.scene.children));
      return this;

    },

    makeLine: function(x1, y1, x2, y2) {

      var width = x2 - x1;
      var height = y2 - y1;

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Anchor(- w2, - h2),
        new Two.Anchor(w2, h2)
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
        new Two.Anchor(-w2, -h2),
        new Two.Anchor(w2, -h2),
        new Two.Anchor(w2, h2),
        new Two.Anchor(-w2, h2)
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
        return new Two.Anchor(x, y);
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
          points.push(new Two.Anchor(x, y));
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
          points.push(new Two.Anchor(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined));
      var rect = poly.getBoundingClientRect();
      poly.center().translation
        .set(rect.left + rect.width / 2, rect.top + rect.height / 2);

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

    },

    // Utility Functions will go here.

    /**
     * Interpret an SVG Node and add it to this instance's scene. The
     * distinction should be made that this doesn't `import` svg's, it solely
     * interprets them into something compatible for Two.js — this is slightly
     * different than a direct transcription.
     */
    interpret: function(svgNode) {

      var tag = svgNode.tagName.toLowerCase();

      if (!(tag in Two.Utils.read)) {
        return null;
      }

      var node = Two.Utils.read[tag].call(this, svgNode);

      this.add(node);

      return node;

    }

  });

  function fitToWindow() {

    var wr = document.body.getBoundingClientRect();

    var width = this.width = wr.width;
    var height = this.height = wr.height;

    this.renderer.setSize(width, height, this.ratio);
    this.trigger(Two.Events.resize, width, height);

  }

  function getNow() {
    return ((root.performance && root.performance.now)
      ? root.performance : Date).now();
  }

  // Request Animation Frame

  (function() {

    requestAnimationFrame(arguments.callee);

    _.each(Two.Instances, function(t) {

      if (t.playing) {
        t.update();
      }

    });

  })();

  //exports to multiple environments
  if (typeof define === 'function' && define.amd)
  //AMD
  define(function(){ return Two; });
  else if (typeof module != "undefined" && module.exports)
  //Node
  module.exports = Two;

})();
