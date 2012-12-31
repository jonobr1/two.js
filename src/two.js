/**
 * @author jonobr1 / http://jonobr1.com/
 * At the moment dependent on Three.js and underscore.js
 */

(function() {

  var root = this;
  var previousTwo = this.Two || {};
  var objects = [];

  /**
   * Globals
   */
  var twos = [], looped, millis = 0, on_update;

  /**
   * Constants
   */
  var PI = Math.PI,
    TWO_PI = Math.PI * 2.0,
    HALF_PI = Math.PI * 0.5,
    RENDER_DEPTH = 0;

  /**
   * Cross browser events.
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
   * two.js is a two-dimensional drawing api built on top of Three.js
   * meant for modern browsers. Because it's in two-dimensions two handles
   * the canvas, renderer, scene, and camera for you.
   *
   * @class
   */
  var Two = function(params) {

    var params = _.defaults(params || {}, {
      type: Two.TYPES.webgl,
      autoplay: true,
      width: 640,
      height: 480,
      fullscreen: false
    });

    this.__playing = params.autoplay;

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(0, params.width, 0, params.height, -10000);

    this.scene.add(this.camera);

    var canvas = params.canvas || document.createElement('canvas');

    if (params.type === Two.TYPES.webgl
      && (canvas.getContext('webgl')
        || canvas.getContext('experimental-webgl'))) {

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas
      });
      params.type = Two.TYPES.webgl;

    } else if (params.type === Two.TYPES.svg) {

      this.renderer = new THREE.SVGRenderer({});

    } else {

      this.renderer = new THREE.CanvasRenderer({
        canvas: canvas
      });
      params.type = Two.TYPES.canvas2d;

    }

    this.type = params.type;
    this.domElement = this.renderer.domElement;

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

    this.renderer.sortElements = false;

    twos.push(this);

  };

  _.extend(Two.prototype, {

    /**
     * Returns the previous attached object bound to the window's scope.
     * Make's sure there is no object / property collision.
     */
    noConflict: function() {
      return previousTwo;
    },

    /**
     * DOM
     */

    /**
     * @param {Element} the parent element to append two's dom element.
     */
    appendTo: function(elem) {

      if (!_.isElement(elem)) {
        return this;
      }

      elem.appendChild(this.renderer.domElement);

      return this;

    },

    /**
     * @param {Function} callback to be fired when two's resize triggers.
     */
    onResize: function(func) {

      this.__onResize = func;
      return this;

    },

    /**
     * Controls
     */

    /**
     * @param {Function} callback to be fired when two renders shapes to the
     * browser.
     */
    draw: function(func) {

      this.__onUpdate = func;
      return this;

    },

    /**
     * Add this two to the Request Animation Frame loop.
     */
    play: function() {

      if (!looped) {
        Two.start();
      }

      this.__playing = true;
      return this;

    },

    /**
     * Remove this two from the Request Animation Frame loop.
     */
    pause: function() {

      this.__playing = false;
      return this;

    },

    /**
     * Rendering
     */

    /**
     * Render everything to two's canvas.
     */
    render: function() {

      if (!this.__playing) {
        return this;
      }

      if (_.isFunction(this.__onUpdate)) {
        this.__onUpdate(millis);
      }

      this.renderer.render(this.scene, this.camera);
      return this;

    },

    /**
     * Add a two primitive to the scene.
     */
    add: function(object) {
      this.scene.add(object.mesh);
      return object;
    },

    /**
     * Convenience methods for constructing and adding shapes.
     */

    addRectangle: function(x, y, width, height) {

      var rect = new Two.Rectangle(x, y, width, height);
      return this.add(rect);

    },

    addArc: function(x, y, radius, startAngle, endAngle, ccw) {
      var arc = new Two.Arc(x, y, radius, startAngle, endAngle, ccw);
      return this.add(arc);
    },

    addEllipse: function(x, y, width, height) {

      var ellipse = new Two.Ellipse(x, y, width, height);
      return this.add(ellipse);

    },

    addCircle: function(x, y, radius) {

      var circle = new Two.Circle(x, y, radius);
      return this.add(circle);

    },

    addLine: function(x1, y1, x2, y2) {

      var line = new Two.Line(x1, y1, x2, y2);
      return this.add(line);

    },

    addPolygon: function(p) {

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

      var poly = new Two.Polygon(points, !!arguments[l - 1]);
      return this.add(poly);

    },

    addGroup: function() {

      var objects = arguments;
      var group = new Two.Group(objects);
      return this.add(group);

    }

  });

  _.extend(Two, {

    VERSION: 0.1,

    TYPES: {
      webgl: 'webgl',
      canvas2d: 'canvas2d'
    },

    RESOLUTION: 32,

    INSTANCES: twos,

    DEFAULTS: {},

    /**
     * Controls
     */

    /**
     * Turns on Request Animation Frame.
     */
    start: function() {
      if (looped) {
        return this;
      }
      looped = true;
      loop();
      return this;
    },

    onUpdate: function(func) {
      on_update = func;
      return this;
    },

    /**
     * Stop Request Animation Frame.
     */
    stop: function() {
      if (!looped) {
        return this;
      }
      looped = false;
      return this;
    },

    /**
     * Two.Rectangle is a ready-to-be-added-to-the-scene class.
     * @extends Two.Polygon
     * @class
     * 
     * @param {Number} x position of upperleft-corner coordinate.
     * @param {Number} y position of upperleft-corner coordinate.
     * @param {Number} width of rectangle.
     * @param {Number} height of rectangle.
     */
    Rectangle: function(x, y, width, height) {

      this.__width = width;
      this.__height = height;

      var hw = width / 2;
      var hh = height / 2;

      var a = x - hw;
      var b = y - hh;
      var c = x + hw;
      var d = y + hh;

      Two.Polygon.call(this, [
        new Two.Vector(a, b),
        new Two.Vector(c, b),
        new Two.Vector(c, d),
        new Two.Vector(a, d)
      ]);

    },

    /**
     * Two.Arc is a ready-to-be-added-to-the-scene class.
     * @extends Two.Polygon
     * @class
     *
     * @param {Number} x position of center/origin of arc.
     * @param {Number} y position of center/origin of arc.
     * @param {Number} radius of arc.
     * @param {Number} startAngle where the arc begins.
     * @param {Number} endAngle where the arc ends.
     * @param {Boolean} is the arc counter-clockwise.
     */
    Arc: function(x, y, radius, startAngle, endAngle, ccw) {

      this.__radius = radius;

      var phi = Math.min(Math.abs(endAngle - startAngle), TWO_PI);
      var pct = phi / TWO_PI;
      var step = phi / (Two.RESOLUTION * pct);
      var angles = !!ccw ? _.range(-endAngle, -startAngle + step, step)
        : _.range(startAngle, endAngle + step, step);

      var points = _.map(angles, function(theta) {
        var xpos = radius * Math.cos(theta) + x;
        var ypos = radius * Math.sin(theta) + y;
        return new Two.Vector(xpos, ypos);
      });

      points.push(new Two.Vector(x, y));

      Two.Polygon.call(this, points);

    },

    /**
     * Circle is a ready-to-be-added-to-the-scene class.
     * @extends Two.Ellipse
     * @class
     * 
     * @param {Number} x position of center coordinate.
     * @param {Number} y position of center coordinate.
     * @param {Number} radius of circle.
     */
    Circle: function(x, y, radius) {

      this.__radius = radius;

      Two.Ellipse.call(this, x, y, radius, radius);

    },

    /**
     * Two.Ellipse is a ready-to-be-added-to-the-scene class.
     * @extends Two.Polygon
     * @class
     *
     * @param {Number} x position of center coordinate.
     * @param {Number} y position of center coordinate.
     * @param {Number} width of ellipse.
     * @param {Number} height of ellipse.
     */
    Ellipse: function(x, y, width, height) {

      this.__width = width;
      this.__height = height;

      var resolution = Two.RESOLUTION;

      Two.Polygon.call(this, _.map(_.range(resolution), function(i) {
        var pct = (i + 1) / resolution;
        var angle = TWO_PI * pct;
        var xpos = width * Math.cos(angle) + x;
        var ypos = height * Math.sin(angle) + y;
        return new Two.Vector(xpos, ypos);
      }));

    },

    /**
     * Two.Line is a ready-to-be-added-to-the-scene class.
     * 
     * @param {Number} x position of first coordinate.
     * @param {Number} y position of first coordinate.
     * @param {Number} x position of final coordinate.
     * @param {Number} y position of final coordinate.
     * @class
     */
    Line: function(x1, y1, x2, y2) {

      var points = [];
      if (_.isArray(x1)) {
        points = x1;
        x1 = points[0].x;
        y1 = points[0].y;
      } else {
        for (var i = 0, l = arguments.length; i < l; i+=2) {
          points.push(new Two.Vector(arguments[i] - x1, arguments[i + 1] - y1));
        }
      }

      this.geometry = new THREE.Geometry();
      this.geometry.vertices = points;

      this.material = new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        overdraw: true
      });
      this.mesh = new THREE.Line(this.geometry, this.material);

      this.mesh.position.x = x1;
      this.mesh.position.y = y1;

      this.mesh.renderDepth = getRenderDepth();

      objects.push(this);

    },

    /**
     * Two.Polygon is a ready-to-be added to the scene class.
     * 
     * @param {Array} an array of x, y objects to define the shape.
     * @param {Boolean} describe whether the shape is open, true, or closed.
     * @class
     */
    Polygon: function(points, open) {

      var shape = new THREE.Shape(points);

      var bb = shape.getBoundingBox();
      var centroid = new Two.Vector(bb.centroid.x, bb.centroid.y);
      var center = new THREE.Shape();

      _.each(points, function(p, i) {
        p.subSelf(centroid);
        if (i === 0) {
          center.moveTo(p.x, p.y);
        } else {
          center.lineTo(p.x, p.y);
        }
      });

      this.geometry = center.makeGeometry();
      this.material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true, // Hack: for WebGL Rendering
        overdraw: true     // Hack: for canvas Rendering
      });
      this.material.side = THREE.DoubleSide;

      var vlength = this.geometry.vertices.length;
      var v1 = this.geometry.vertices[0];
      var v2 = this.geometry.vertices[vlength - 1];

      // Close the shape
      if (!_.isEqual(v1, v2) && !open) {
        this.geometry.vertices.push(v1);
      }

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.x = bb.centroid.x;
      this.mesh.position.y = bb.centroid.y;

      this.mesh.doubleSided = true;
      this.mesh.renderDepth = getRenderDepth();

      this.outline = new Two.Line(this.geometry.vertices);
      this.mesh.add(this.outline.mesh);

      // Normalize to parent-child relationship
      this.outline.mesh.position.x = 0;
      this.outline.mesh.position.y = 0;

      objects.push(this);

    },

    /**
     * Two.Group is a ready-to-be-added to the scene class. It takes any number
     * of child Two.Shapes and wraps them into a group.
     *
     * @param {Array} child shapes to be added to the group.
     */
    Group: function(children) {

      this.children = [];
      this.mesh = new THREE.Object3D();

      this.add.apply(this, children);
      this.center();

    },

    /**
     * Two.Vector is a primitive vector class for use with Three.js with
     * conveniences to neglect the z property.
     * 
     * @extends THREE.Vector3
     * @class
     */
    Vector: function(a, b, c) {

      var l = arguments.length;

      if (l <= 1 && _.isObject(a)) {
        this.x = a.x || 0;
        this.y = a.y || 0;
        this.z = a.z || 0;
      } else {
        this.x = a || 0;
        this.y = b || 0;
        this.z = c || 0;
      }

    }

  });

  var ShapeProto = {

    /**
     * Get the vertex coordinates of a shape.
     * @param {Boolean} Return the actual array, or a clone.
     * @return {Array} of objects with x, y, z position of each coordinate.
     */
    getVertices: function(original) {

      return original ? this.geometry.vertices : _.map(this.geometry.vertices, function(v) {
        return new Two.Vector(v.x, v.y);
      });

    },

    /**
     * Force boolean updates to make THREE calculate the new vertex positions.
     */
    updateVertexFlags: function() {

      this.geometry.verticesNeedUpdate = true;
      if (this.outline) {
        this.outline.geometry.verticesNeedUpdate = true;
      }

      return this;

    },

    /**
     * Set new coordinate positions for vertices of a given shape.
     * @param {Array} an array of vertices. Does not need to be complete and
     * does not need to be the same length.
     * @param {Boolean} set whether you don't want to update the rendering of
     * the shape. Not usually desired.
     */
    setVertices: function(vertices, silent) {

      _.each(vertices, function(v, i) {
        var vertex = this.geometry.vertices[i];
        if (_.isUndefined(vertex)) {
          vertex = new Two.Vector();
          this.geometry.vertices[i] = vertex;
        }
        vertex.set(v.x, v.y, v.z || 0);
      }, this);

      return !!silent ? this : this.updateVertexFlags();

    },

    /**
     * Scale the shape. Pass one argument for a uniform scale, two arguments for
     * x, y transform.
     */
    scale: function(x, y) {

      var l = arguments.length;

      if (l <= 0) {
        return this.mesh.scale;
      } else if (l <= 1) {
        y = x;
      }

      this.mesh.scale.x = x;
      this.mesh.scale.y = y;
      return this;

    },

    /**
     * Rotate the shape in radians.
     */
    rotate: function(radians) {

      var l = arguments.length;

      if (l <= 0) {
        return this.mesh.rotation.z;
      }

      this.mesh.rotation.z = radians;
      return this;

    },

    /**
     * Position a shape somewhere in two-dimensions.
     */
    translate: function(x, y) {

      var l = arguments.length;

      if (l <= 0) {
        return this.mesh.position;
      }

      this.mesh.position.x = x;
      this.mesh.position.y = y;

      return this;

    },

    /**
     * getter-setter for udpating the z-index of an object
     */
    zIndex: function(z) {

      if (arguments.length <= 0) {
        return this.mesh.renderDepth;
      }

      this.mesh.renderDepth = z;

      // Always make sure the stroke is above the fill.
      if (this.outline) {
        this.outline.mesh.renderDepth = z + 1;
      }

      return this;

    }

  };

  var GroupProto = {

    scale: ShapeProto.scale,

    rotate: ShapeProto.rotate,

    translate: ShapeProto.translate,

    /**
     *
     */
    add: function() {

      var objects = _.toArray(arguments);

      _.each(objects, function(object) {
        this.mesh.add(object.mesh);
      }, this);

      this.children = this.children.concat(objects);

      return this;

    },

    /**
     * getter-setter for udpating the z-index of an object
     */
    zIndex: function(z) {

      if (arguments.length <= 0) {
        return this.mesh.renderDepth;
      }

      this.mesh.renderDepth = z;

      // Update the children as well
      _.each(this.mesh.children, function(child, i) {
        child.renderDepth = z - i;
      }, this);

      return this;

    },

    /**
     *
     */
    stroke: function(r, g, b, a) {

      var length = arguments.length;

      if (length <= 1) {
        g = b = r;
        a = 1.0;
      } else if (length <= 3) {
        a = 1.0;
      }

      for (var i = 0, l = this.mesh.children.length; i < l; i++) {

        var child = this.mesh.children[i];
        var material = child.material;

        if (!(material instanceof THREE.BasicLineMaterial)) {
          continue;
        }

        material.color.setRGB(r, g, b);
        material.opacity = a;

      }

      return this;

    },

    /**
     *
     */
    fill: function(r, g, b, a) {

      var length = arguments.length;

      if (length <= 1) {
        g = b = r;
        a = 1.0;
      } else if (length <= 3) {
        a = 1.0;
      }

      for (var i = 0, l = this.mesh.children.length; i < l; i++) {

        var child = this.mesh.children[i];
        var material = child.material;

        if (!(material instanceof THREE.MeshBasicMaterial)) {
          continue;
        }

        material.color.setRGB(r, g, b);
        material.opacity = a;

      }

      return this;

    },

    /**
     * Update internal variables and calculations.
     */
    center: function() {

      var rect = this.getBoundingClientRect();

      // Apply the new positioning to be anchored center.

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      console.log(rect);

      _.each(this.children, function(child) {

        child.mesh.position.x -= rect.centroid.x;
        child.mesh.position.y -= rect.centroid.y;

      }, this);

      // Finally update the group so that the current shapes
      // haven't appeared to move.

      this.translate(rect.centroid.x, rect.centroid.y);

      return this;

    },

    getBoundingClientRect: function() {

      var rect = { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity };

      _.each(this.children, function(child) {

        var bb = child.mesh.geometry.shapebb;
        var p = child.mesh.position;

        var r = bb.maxX + p.x;
        var l = bb.minX + p.x;
        var t = bb.minY + p.y;
        var b = bb.maxY + p.y;

        rect.left = Math.min(rect.left, l);
        rect.top = Math.min(rect.top, t);
        rect.right = Math.max(rect.right, r);
        rect.bottom = Math.max(rect.bottom, b);

        // this.mesh.add(child.mesh);

      }, this);

      rect.width = rect.right - rect.left;
      rect.height = rect.bottom - rect.top;

      return rect;

    }

  };

  /**
   * Prototype for all objects have fill-like material
   * Two.Rectangle
   * Two.Arc
   * Two.Circle
   * Two.Ellipse
   * Two.Polygon
   */
  var FillProto = {

    /**
     * Remove the visibility of a fill.
     */
    noFill: function() {

      this.fill(0, 0, 0, 0);
      return this;

    },

    /**
     * Define the filled color of a shape.
     */
    fill: function(r, g, b, a) {
      var length = arguments.length;
      if (length <= 1) {
        g = b = r;
        a = 1.0;
      } else if (length <= 3) {
        a = 1.0;
      }
      this.material.color.setRGB(r, g, b);
      this.material.opacity = a;
      return this;
    }

  };

  /**
   * Prototype for all objects that have stroke-like material
   * Two.Line
   */
  var StrokeProto = {

    /**
     * Remove the visibility of a stroke.
     */
    noStroke: function() {

      this.strokeWeight(0).stroke(0, 0, 0, 0);
      return this;

    },

    /**
     * Define the color of a stroke.
     */
    stroke: function(r, g, b, a) {
      var length = arguments.length;
      if (length <= 1) {
        g = b = r;
        a = 1.0;
      } else if (length <= 3) {
        a = 1.0;
      }
      if (_.isObject(this.outline)) {
        this.outline.material.color.setRGB(r, g, b);
        this.outline.material.opacity = a;
      } else {
        this.material.color.setRGB(r, g, b);
        this.material.opacity = a;
      }
      return this;
    },

    /**
     * Define the weight or thickness of a stroke.
     */
    strokeWeight: function(n) {
      if (_.isObject(this.outline)) {
        this.outline.material.linewidth = n;
      } else {
        this.material.linewidth = n;
      }
      return this;
    }

  };

  /**
   * Prototype for Two.Polygon
   */
  var PolyProto = {

    

  };

  var RectProto = {

    width: function(width) {

      var l = arguments.length;
      if (l <= 0) {
        return this.__width;
      }

      this.__width = width;

      var vertices = this.getVertices(true);
      var last = vertices.length - 1;
      var hw = width / 2;

      _.each(vertices, function(v, i) {
        if (i > 0 && i < last) {
          v.x = hw;
        } else {
          v.x = -hw;
        }
      }, this);

      return this.updateVertexFlags();

    },

    height: function(height) {

      var l = arguments.length;
      if (l <= 0) {
        return this.__height;
      }

      this.__height = height;

      var vertices = this.getVertices(true);
      var last = vertices.length - 1;
      var hh = height / 2;

      _.each(vertices, function(v, i) {
        if (i < 2) {
          v.y = -hh;
        } else {
          v.y = hh;
        }
      }, this);

      return this.updateVertexFlags();

    }

  }

  var EllipseProto = {

    width: function(width) {

      var l = arguments.length;
      if (l <= 0) {
        return this.__width;
      }

      this.__width = width;

      var vertices = this.getVertices(true);
      var amount = vertices.length;
      var w = width, h = this.__height;

      _.each(vertices, function(v, i) {

        var pct = i / amount;
        var x = w * Math.cos(pct * TWO_PI);
        var y = h * Math.sin(pct * TWO_PI);

        v.x = x;
        v.y = y;

      }, this);

      return this.updateVertexFlags();

    },

    height: function(height) {

      var l = arguments.length;
      if (l <= 0) {
        return this.__height;
      }

      this.__height = height;

      var vertices = this.getVertices(true);
      var amount = vertices.length;
      var w = this.__width, h = height;

      _.each(vertices, function(v, i) {

        var pct = i / amount;
        var x = w * Math.cos(pct * TWO_PI);
        var y = h * Math.sin(pct * TWO_PI);

        v.x = x;
        v.y = y;

      }, this);

      return this.updateVertexFlags();

    }

  };

  var CircleProto = {

    radius: function(radius) {

      var l = arguments.length;
      if (l <= 0) {
        return this.__radius;
      }
      this.__radius = radius;

      var vertices = this.getVertices(true);
      var amount = vertices.length;

      _.each(vertices, function(v, i) {

        var pct = i / amount;
        var x = radius * Math.cos(pct * TWO_PI);
        var y = radius * Math.sin(pct * TWO_PI);

        v.x = x;
        v.y = y;

      }, this);

      return this.updateVertexFlags();

    }

  };

  var ArcProto = {

    radius: function(radius) {

      var l = arguments.length;
      if (l <= 0) {
        return this.__radius;
      }

      var vertices = this.getVertices(true);
      var amount = vertices.length;

    }

  };

  var VectorProto = {

    clone: function() {
      return new Two.Vector(this.x, this.y);
    }

  };

  _.extend(Two.Polygon.prototype, ShapeProto, FillProto, StrokeProto);
  _.extend(Two.Line.prototype, ShapeProto, StrokeProto);
  _.extend(Two.Rectangle.prototype, Two.Polygon.prototype, RectProto);
  _.extend(Two.Arc.prototype, Two.Polygon.prototype, ArcProto);
  _.extend(Two.Ellipse.prototype, Two.Polygon.prototype, EllipseProto);
  _.extend(Two.Circle.prototype, Two.Polygon.prototype, CircleProto);
  _.extend(Two.Vector.prototype, THREE.Vector3.prototype);
  _.extend(Two.Group.prototype, GroupProto);

  // Super THREE.Vector3.prototype on Two.Vector
  _.each(THREE.Vector3.prototype, function(v, k) {
    if (_.isFunction(v)) {
      Two.Vector.prototype[k] = function() {
        v.apply(this, arguments);
        if (_.isUndefined(this.z)) {
          this.z = 0;
        }
      };
    } else {
      Two.Vector.prototype[k] = v;
    }
  });

  _.extend(Two.Vector.prototype, VectorProto);

  function getRenderDepth() {
    var depth = RENDER_DEPTH;
    RENDER_DEPTH--;
    return depth;
  }

  function fitToWindow() {

    var wr = document.body.getBoundingClientRect();

    var width = this.width = wr.width;
    var height = this.height = wr.height;

    this.renderer.setSize(width, height);

    this.camera.top = 0;
    this.camera.left = 0;
    this.camera.right = width;
    this.camera.bottom = height;

    this.camera.updateProjectionMatrix();

    if (_.isFunction(this.__onResize)) {
      this.__onResize(width, height);
    }

  }

  function loop() {
    if (_.isFunction(on_update)) {
      on_update(millis);
    }
    _.each(twos, function(two) {
      two.render();
    });
    millis++;
    if (looped) {
      requestAnimationFrame(loop);
    }
  }

  /**
   * Export
   */
  root['Two'] = Two;

})();
