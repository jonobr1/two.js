/**
 * @author jonobr1 / http://jonobr1.com/
 * Dependent on Three.js and underscore.js
 */

(function() {

  var root = this;
  var objects = [];

  var dds = [], looped;

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

    hasEventListeners: _.isFunction(document.body.addEventListener),

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
   * deedee.js is a two-dimensional drawing api built on top of Three.js
   * meant for modern browsers.
   *
   * @class
   */
  var DD = function(params) {

    var params = _.defaults(params || {}, {
      type: DD.TYPES.webgl,
      autoplay: true,
      width: 640,
      height: 480,
      fullscreen: false
    });

    this.__playing = params.autoplay;

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(0, params.width, 0, params.height, -10000);

    this.scene.add(this.camera);

    var canvas = document.createElement('canvas');

    if (params.type === DD.TYPES.webgl
      && (canvas.getContext('webgl')
        || canvas.getContext('experimental-webgl'))) {

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas
      });
      params.type = DD.TYPES.webgl;

    } else {

      this.renderer = new THREE.CanvasRenderer({
        canvas: canvas
      });
      params.type = DD.TYPES.canvas2d;

    }

    this.type = params.type;

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

    dds.push(this);

  };

  _.extend(DD.prototype, {

    /**
     * DOM
     */

    appendTo: function(elem) {

      if (!_.isElement(elem)) {
        return this;
      }

      elem.appendChild(this.renderer.domElement);

      return this;

    },

    onResize: function(func) {

      this.__onResize = func;
      return this;

    },

    /**
     * Controls
     */

    draw: function(func) {

      this.__onUpdate = func;
      return this;

    },

    play: function() {

      this.__playing = true;
      return this;

    },

    pause: function() {

      this.__playing = false;
      return this;

    },

    /**
     * Rendering
     */

    render: function() {

      if (!this.__playing) {
        return this;
      }

      if (_.isFunction(this.__onUpdate)) {
        this.__onUpdate();
      }

      this.renderer.render(this.scene, this.camera);
      return this;

    },

    addRectangle: function(x, y, width, height) {

      var rect = new DD.Rectangle(x, y, width, height);
      this.scene.add(rect.mesh);
      return rect;

    },

    addEllipse: function(x, y, width, height) {

      var ellipse = new DD.Ellipse(x, y, width, height);
      this.scene.add(ellipse.mesh);
      return ellipse;

    },

    addCircle: function(x, y, radius) {

      var circle = new DD.Circle(x, y, radius);
      this.scene.add(circle.mesh);
      return circle;

    },

    addLine: function(x1, y1, x2, y2) {

      var line = new DD.Line(x1, y1, x2, y2);
      this.scene.add(line.mesh);
      return line;

    },

    addPolygon: function() {

      var points = [];
      for (var i = 0, l = arguments.length; i < l; i+=2) {
        points.push(new THREE.Vector3(arguments[i], arguments[i + 1], 0));
      }

      var poly = new DD.Polygon(points);
      this.scene.add(poly.mesh);
      return poly;

    }

  });

  _.extend(DD, {

    VERSION: 0.1,

    TYPES: {
      webgl: 'webgl',
      canvas2d: 'canvas2d'
    },

    RESOLUTION: 32,

    INSTANCES: dds,

    DEFAULTS: {
      extrudeSettings: {
        amount: 0,  bevelEnabled: false
      }
    },

    /**
     * Controls
     */

    start: function() {
      if (looped) {
        return this;
      }
      looped = true;
      loop();
      return this;
    },

    stop: function() {
      if (!looped) {
        return this;
      }
      looped = false;
      return this;
    },

    /**
     * @class
     */
    Rectangle: function(x, y, width, height) {

      var hw = width / 2;
      var hh = height / 2;

      var a = x - hw;
      var b = y - hh;
      var c = x + hw;
      var d = y + hh;

      DD.Polygon.call(this, [
        new THREE.Vector3(a, b, 0),
        new THREE.Vector3(c, b, 0),
        new THREE.Vector3(c, d, 0),
        new THREE.Vector3(a, d, 0)
      ]);

    },

    /**
     * @class
     */
    Circle: function(x, y, radius) {

      DD.Ellipse.call(this, x, y, radius, radius);

    },

    /**
     * @class
     */
    Ellipse: function(x, y, width, height) {

      var resolution = DD.RESOLUTION;

      DD.Polygon.call(this, _.map(_.range(resolution), function(i) {
        var pct = i / resolution;
        var angle = TWO_PI * pct;
        var xpos = width * Math.cos(angle) + x;
        var ypos = height * Math.sin(angle) + y;
        return new THREE.Vector3(xpos, ypos, 0);
      }));

    },

    /**
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
          points.push(new THREE.Vector3(arguments[i] - x1, arguments[i + 1] - y1, 0));
        }
      }

      this.geometry = new THREE.Geometry();
      this.geometry.vertices = points;

      this.material = new THREE.LineBasicMaterial({ color: 0x000000 });
      this.mesh = new THREE.Line(this.geometry, this.material);

      this.mesh.position.x = x1;
      this.mesh.position.y = y1;

      this.mesh.renderDepth = getRenderDepth();

      objects.push(this);

    },

    /**
     * @class
     */
    Polygon: function(points) {

      var shape = new THREE.Shape(points);

      var bb = shape.getBoundingBox();
      var centroid = new THREE.Vector3(bb.centroid.x, bb.centroid.y, 0);
      var center = new THREE.Shape();

      _.each(points, function(p, i) {
        p.subSelf(centroid);
        if (i === 0) {
          center.moveTo(p.x, p.y);
        } else {
          center.lineTo(p.x, p.y);
        }
      });

      var first = points[0];

      // Close the shape
      if (!_.isEqual(first, points[points.length - 1])) {
        points.push(first.clone());
      }

      this.geometry = center.extrude(DD.DEFAULTS.extrudeSettings);
      this.material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        overdraw: true // Hack: for canvas rendering
      });

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.x = bb.centroid.x;
      this.mesh.position.y = bb.centroid.y;

      this.mesh.doubleSided = true;
      this.mesh.renderDepth = getRenderDepth();

      this.outline = new DD.Line(this.geometry.vertices);
      this.mesh.add(this.outline.mesh);

      // Normalize to parent-child relationship
      this.outline.mesh.position.x = 0;
      this.outline.mesh.position.y = 0;

      objects.push(this);

    }

  });

  var ShapeProto = {

    scale: function(amt) {

      this.mesh.scale.x = amt;
      this.mesh.scale.y = amt;
      return this;

    },

    rotate: function(radians) {

      this.mesh.rotation.z = radians;
      return this;

    },

    translate: function(x, y) {

      this.mesh.position.x = x;
      this.mesh.position.y = y;

      return this;

    }

  };

  /**
   * Prototype for all objects have fill-like material
   * DD.Rectangle
   * DD.Circle
   * DD.Polygon
   */
  var FillProto = {

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
   * DD.Line
   */
  var StrokeProto = {

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
   * Prototype for DD.Polygon
   */
  var PolyProto = {

    

  };

  _.extend(DD.Polygon.prototype, ShapeProto, FillProto, StrokeProto);
  _.extend(DD.Line.prototype, ShapeProto, StrokeProto);
  _.extend(DD.Rectangle.prototype, DD.Polygon.prototype);
  _.extend(DD.Ellipse.prototype, DD.Polygon.prototype);
  _.extend(DD.Circle.prototype, DD.Ellipse.prototype);

  function getRenderDepth() {
    var depth = RENDER_DEPTH;
    RENDER_DEPTH++;
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
    _.each(dds, function(two) {
      two.render();
    });
    if (looped) {
      requestAnimationFrame(loop);
    }
  }

  /**
   * Export
   */
  root['DD'] = DD;

})();
