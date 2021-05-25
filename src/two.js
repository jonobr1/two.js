// Utils

import CanvasShim from './utils/canvas-shim.js';
import * as Curves from './utils/curves.js';
import dom from './utils/dom.js';
import TwoError from './utils/error.js';
import getRatio from './utils/get-ratio.js';
import defineGetterSetter from './utils/get-set.js';
import interpretSVG from './utils/interpret-svg.js';
import * as math from './utils/math.js';
import Commands from './utils/path-commands.js';
import _ from './utils/underscore.js';
import xhr from './utils/xhr.js';

// Core Classes

import Anchor from './anchor.js';
import Collection from './collection.js';
import Events from './events.js';
import Group from './group.js';
import Matrix from './matrix.js';
import Path from './path.js';
import Registry from './registry.js';
import Shape from './shape.js';
import Text from './text.js';
import Vector from './vector.js';

// Effects

import Stop from './effects/stop.js';
import Gradient from './effects/gradient.js';
import ImageSequence from './effects/image-sequence.js';
import LinearGradient from './effects/linear-gradient.js';
import RadialGradient from './effects/radial-gradient.js';
import Sprite from './effects/sprite.js';
import Texture from './effects/texture.js';

// Secondary Classes

import ArcSegment from './shapes/arc-segment.js';
import Circle from './shapes/circle.js';
import Ellipse from './shapes/ellipse.js';
import Line from './shapes/line.js';
import Polygon from './shapes/polygon.js';
import Rectangle from './shapes/rectangle.js';
import RoundedRectangle from './shapes/rounded-rectangle.js';
import Star from './shapes/star.js';

// Renderers

import CanvasRenderer from './renderers/canvas.js';
import SVGRenderer from './renderers/svg.js';
import WebGLRenderer from './renderers/webgl.js';

import Constants from './constants.js';

/**
 * @name Two
 * @class
 * @global
 * @param {Object} [options]
 * @param {Boolean} [options.fullscreen=false] - Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. This overrides `options.fitted` as well.
 * @param {Boolean} [options.fitted=false] = Set to `true` to automatically make the stage adapt to the width and height of the parent element. This parameter overrides `width` and `height` parameters if set to `true`.
 * @param {Number} [options.width=640] - The width of the stage on construction. This can be set at a later time.
 * @param {Number} [options.height=480] - The height of the stage on construction. This can be set at a later time.
 * @param {String} [options.type=Two.Types.svg] - The type of renderer to setup drawing with. See {@link Two.Types} for available options.
 * @param {Boolean} [options.autostart=false] - Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for {@link Two#play}.
 * @param {Element} [options.domElement] - The canvas or SVG element to draw into. This overrides the `options.type` argument.
 * @description The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.
 */
function Two(options) {

  // Determine what Renderer to use and setup a scene.

  var params = _.defaults(options || {}, {
    fullscreen: false,
    fitted: false,
    width: 640,
    height: 480,
    type: Two.Types.svg,
    autostart: false
  });

  _.each(params, function(v, k) {
    if (/fullscreen/i.test(k) || /autostart/i.test(k)) {
      return;
    }
    this[k] = v;
  }, this);

  // Specified domElement overrides type declaration only if the element does not support declared renderer type.
  if (_.isElement(params.domElement)) {
    var tagName = params.domElement.tagName.toLowerCase();
    // TODO: Reconsider this if statement's logic.
    if (!/^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type+'-'+tagName)) {
      this.type = Two.Types[tagName];
    }
  }

  this.renderer = new Two[this.type](this);
  this.setPlaying(params.autostart);
  this.frameCount = 0;

  /**
   * @name Two#fit
   * @function
   * @description If `options.fullscreen` or `options.fitted` in construction create this function. It sets the `width` and `height` of the instance to its respective parent `window` or `element` depending on the `options` passed.
   */
  if (params.fullscreen) {

    this.fit = fitToWindow.bind(this);
    this.fit.domElement = window;
    this.fit.attached = true;
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
    dom.bind(this.fit.domElement, 'resize', this.fit);
    this.fit();

  } else if (params.fitted) {

    this.fit = fitToParent.bind(this);
    _.extend(this.renderer.domElement.style, {
      display: 'block'
    });

  } else if (!_.isElement(params.domElement)) {

    this.renderer.setSize(params.width, params.height, this.ratio);
    this.width = params.width;
    this.height = params.height;

  }

  this.renderer.bind(Events.Types.resize, updateDimensions.bind(this));
  this.scene = this.renderer.scene;

  Two.Instances.push(this);
  if (params.autostart) {
    raf.init();
  }

}

_.extend(Two, Constants);

_.extend(Two.prototype, Events, {

  constructor: Two,

  /**
   * @name Two#type
   * @property {String} - A string representing which type of renderer the instance has instantiated.
   */
  type: '',

  /**
   * @name Two#renderer
   * @property {(Two.SVGRenderer|Two.CanvasRenderer|Two.WebGLRenderer)} - The instantiated rendering class for the instance. For a list of possible rendering types check out Two.Types.
   */
  renderer: null,

  /**
   * @name Two#scene
   * @property {Two.Group} - The base level {@link Two.Group} which houses all objects for the instance. Because it is a {@link Two.Group} transformations can be applied to it that will affect all objects in the instance. This is handy as a makeshift inverted camera.
   */
  scene: null,

  /**
   * @name Two#width
   * @property {Number} - The width of the instance's dom element.
   */
  width: 0,

  /**
   * @name Two#height
   * @property {Number} - The height of the instance's dom element.
   */
  height: 0,

  /**
   * @name Two#frameCount
   * @property {Number} - An integer representing how many frames have elapsed.
   */
  frameCount: 0,

  /**
   * @name Two#timeDelta
   * @property {Number} - A number representing how much time has elapsed since the last frame in milliseconds.
   */
  timeDelta: 0,

  /**
   * @name Two#playing
   * @property {Boolean} - A boolean representing whether or not the instance is being updated through the automatic `requestAnimationFrame`.
   */
  playing: false,

  /**
   * @name Two#appendTo
   * @function
   * @param {Element} elem - The DOM element to append the Two.js stage to.
   * @description Shorthand method to append your instance of Two.js to the `document`.
   */
  appendTo: function(elem) {

    elem.appendChild(this.renderer.domElement);

    if (this.fit) {
      if (this.fit.domElement !== window) {
        this.fit.domElement = elem;
        this.fit.attached = false;
      }
      this.update();
    }

    return this;

  },

  /**
   * @name Two#play
   * @function
   * @fires Two.Events.Types.play event
   * @description Call to start an internal animation loop.
   * @nota-bene This function initiates a `requestAnimationFrame` loop.
   */
  play: function() {

    this.playing = true;
    raf.init();
    return this.trigger(Events.Types.play);

  },

  /**
   * @name Two#pause
   * @function
   * @fires Two.Events.Types.pause event
   * @description Call to stop the internal animation loop for a specific instance of Two.js.
   */
  pause: function() {

    this.playing = false;
    return this.trigger(Events.Types.pause);

  },

  setPlaying: function(p) {
    this.playing = p;
  },

  /**
   * @name Two#release
   * @function
   * @param {Object} obj
   * @returns {Object} The object passed for event deallocation.
   * @description Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.
   */
  release: function(obj) {

    var i, v, child;

    if (!_.isObject(obj)) {
      return;
    }

    if (typeof obj.unbind === 'function') {
      obj.unbind();
    }

    if (obj.vertices) {
      if (typeof obj.vertices.unbind === 'function') {
        obj.vertices.unbind();
      }
      for (i = 0; i < obj.vertices.length; i++) {
        v = obj.vertices[i];
        if (typeof v.unbind === 'function') {
          v.unbind();
        }
      }
    }

    if (obj.children) {
      for (i = 0; i < obj.children.length; i++) {
        child = obj.children[i];
        this.release(child);
      }
    }

    return obj;

  },

  /**
   * @name Two#update
   * @function
   * @fires Two.Events.Types.update event
   * @description Update positions and calculations in one pass before rendering. Then render to the canvas.
   * @nota-bene This function is called automatically if using {@link Two#play} or the `autostart` parameter in construction.
   */
  update: function() {

    var animated = !!this._lastFrame;
    var now = _.performance.now();

    if (animated) {
      this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
    }
    this._lastFrame = now;

    if (this.fit && this.fit.domElement && !this.fit.attached) {
        dom.bind(this.fit.domElement, 'resize', this.fit);
        this.fit.attached = true;
        this.fit();
    }

    var width = this.width;
    var height = this.height;
    var renderer = this.renderer;

    // Update width / height for the renderer
    if (width !== renderer.width || height !== renderer.height) {
      renderer.setSize(width, height, this.ratio);
    }

    this.trigger(Events.Types.update, this.frameCount, this.timeDelta);

    return this.render();

  },

  /**
   * @name Two#render
   * @function
   * @fires render
   * @description Render all drawable and visible objects of the scene.
   */
  render: function() {

    this.renderer.render();
    return this.trigger(Events.Types.render, this.frameCount++);

  },

  // Convenience Methods

  /**
   * @name Two#add
   * @function
   * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects. Alternatively can add objects as individual arguments.
   * @description A shorthand method to add specific Two.js objects to the scene.
   */
  add: function(o) {

    var objects = o;
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }

    this.scene.add(objects);
    return this;

  },

  /**
   * @name Two#remove
   * @function
   * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects.
   * @description A shorthand method to remove specific Two.js objects from the scene.
   */
  remove: function(o) {

    var objects = o;
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }

    this.scene.remove(objects);

    return this;

  },

  /**
   * @name Two#clear
   * @function
   * @description Removes all objects from the instance's scene. If you intend to have the browser garbage collect this, don't forget to delete the references in your application as well.
   */
  clear: function() {

    this.scene.remove(this.scene.children);
    return this;

  },

  /**
   * @name Two#makeLine
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @returns {Two.Line}
   * @description Creates a Two.js line and adds it to the scene.
   */
  makeLine: function(x1, y1, x2, y2) {

    var line = new Line(x1, y1, x2, y2);
    this.scene.add(line);

    return line;

  },

  /**
   * @name Two#makeArrow
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @returns {Two.Path}
   * @description Creates a Two.js arrow and adds it to the scene.
   */
  makeArrow: function(x1, y1, x2, y2, size) {

    var headlen = typeof size === 'number' ? size : 10;

    var angle = Math.atan2(y2 - y1, x2 - x1);

    var vertices = [

      new Anchor(x1, y1, undefined, undefined, undefined, undefined, Commands.move),
      new Anchor(x2, y2, undefined, undefined, undefined, undefined, Commands.line),
      new Anchor(
        x2 - headlen * Math.cos(angle - Math.PI / 4),
        y2 - headlen * Math.sin(angle - Math.PI / 4),
        undefined, undefined, undefined, undefined, Commands.line
      ),

      new Anchor(x2, y2, undefined, undefined, undefined, undefined, Commands.move),
      new Anchor(
        x2 - headlen * Math.cos(angle + Math.PI / 4),
        y2 - headlen * Math.sin(angle + Math.PI / 4),
        undefined, undefined, undefined, undefined, Commands.line
      )

    ];

    var path = new Path(vertices, false, false, true);
    path.noFill();
    path.cap = 'round';
    path.join = 'round';

    this.scene.add(path);

    return path;
  },

  /**
   * @name Two#makeRectangle
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @returns {Two.Rectangle}
   * @description Creates a Two.js rectangle and adds it to the scene.
   */
  makeRectangle: function(x, y, width, height) {

    var rect = new Rectangle(x, y, width, height);
    this.scene.add(rect);

    return rect;

  },

  /**
   * @name Two#makeRoundedRectangle
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {Number} sides
   * @returns {Two.Rectangle}
   * @description Creates a Two.js rounded rectangle and adds it to the scene.
   */
  makeRoundedRectangle: function(x, y, width, height, sides) {

    var rect = new RoundedRectangle(x, y, width, height, sides);
    this.scene.add(rect);

    return rect;

  },

  /**
   * @name Two#makeCircle
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {Number} [resolution=4]
   * @returns {Two.Circle}
   * @description Creates a Two.js circle and adds it to the scene.
   */
  makeCircle: function(x, y, radius, resolution) {

    var circle = new Circle(x, y, radius, resolution);
    this.scene.add(circle);

    return circle;

  },

  /**
   * @name Two#makeEllipse
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} rx
   * @param {Number} ry
   * @param {Number} [resolution=4]
   * @returns {Two.Ellipse}
   * @description Creates a Two.js ellipse and adds it to the scene.
   */
  makeEllipse: function(x, y, rx, ry, resolution) {

    var ellipse = new Ellipse(x, y, rx, ry, resolution);
    this.scene.add(ellipse);

    return ellipse;

  },

  /**
   * @name Two#makeStar
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} outerRadius
   * @param {Number} innerRadius
   * @param {Number} sides
   * @returns {Two.Star}
   * @description Creates a Two.js star and adds it to the scene.
   */
  makeStar: function(ox, oy, outerRadius, innerRadius, sides) {

    var star = new Star(ox, oy, outerRadius, innerRadius, sides);
    this.scene.add(star);

    return star;

  },

  /**
   * @name Two#makeCurve
   * @function
   * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points.
   * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
   * @returns {Two.Path} - Where `path.curved` is set to `true`.
   * @description Creates a Two.js path that is curved and adds it to the scene.
   * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
   */
  makeCurve: function(p) {

    var l = arguments.length, points = p;
    if (!Array.isArray(p)) {
      points = [];
      for (var i = 0; i < l; i+=2) {
        var x = arguments[i];
        if (typeof x !== 'number') {
          break;
        }
        var y = arguments[i + 1];
        points.push(new Anchor(x, y));
      }
    }

    var last = arguments[l - 1];
    var curve = new Path(points, !(typeof last === 'boolean' ? last : undefined), true);
    var rect = curve.getBoundingClientRect();
    curve.center().translation
      .set(rect.left + rect.width / 2, rect.top + rect.height / 2);

    this.scene.add(curve);

    return curve;

  },

  /**
   * @name Two#makePolygon
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {Number} sides
   * @returns {Two.Polygon}
   * @description Creates a Two.js polygon and adds it to the scene.
   */
  makePolygon: function(x, y, radius, sides) {

    var poly = new Polygon(x, y, radius, sides);
    this.scene.add(poly);

    return poly;

  },

  /**
   * @name Two#makeArcSegment
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} innerRadius
   * @param {Number} outerRadius
   * @param {Number} startAngle
   * @param {Number} endAngle
   * @param {Number} [resolution=Two.Resolution] - The number of vertices that should comprise the arc segment.
   */
  makeArcSegment: function(ox, oy, ir, or, sa, ea, res) {
    var arcSegment = new ArcSegment(ox, oy, ir, or, sa, ea, res);
    this.scene.add(arcSegment);
    return arcSegment;
  },

  /**
   * @name Two#makePath
   * @function
   * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points.
   * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
   * @returns {Two.Path}
   * @description Creates a Two.js path and adds it to the scene.
   * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
   */
  makePath: function(p) {

    var l = arguments.length, points = p;
    if (!Array.isArray(p)) {
      points = [];
      for (var i = 0; i < l; i+=2) {
        var x = arguments[i];
        if (typeof x !== 'number') {
          break;
        }
        var y = arguments[i + 1];
        points.push(new Anchor(x, y));
      }
    }

    var last = arguments[l - 1];
    var path = new Path(points, !(typeof last === 'boolean' ? last : undefined));
    var rect = path.getBoundingClientRect();
    if (typeof rect.top === 'number'   && typeof rect.left === 'number' &&
        typeof rect.right === 'number' && typeof rect.bottom === 'number') {
      path.center().translation
        .set(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    this.scene.add(path);

    return path;

  },

  /**
   * @name Two#makeText
   * @function
   * @param {String} message
   * @param {Number} x
   * @param {Number} y
   * @param {Object} [styles] - An object to describe any of the {@link Two.Text.Properties} including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc..
   * @returns {Two.Text}
   * @description Creates a Two.js text object and adds it to the scene.
   */
  makeText: function(message, x, y, styles) {
    var text = new Text(message, x, y, styles);
    this.add(text);
    return text;
  },

  /**
   * @name Two#makeLinearGradient
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @param {...Two.Stop} stops - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
   * @returns {Two.LinearGradient}
   * @description Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
   */
  makeLinearGradient: function(x1, y1, x2, y2 /* stops */) {

    var stops = Array.prototype.slice.call(arguments, 4);
    var gradient = new LinearGradient(x1, y1, x2, y2, stops);

    this.add(gradient);

    return gradient;

  },

  /**
   * @name Two#makeRadialGradient
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} radius
   * @param {...Two.Stop} stops - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
   * @returns {Two.RadialGradient}
   * @description Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
   */
  makeRadialGradient: function(x1, y1, r /* stops */) {

    var stops = Array.prototype.slice.call(arguments, 3);
    var gradient = new RadialGradient(x1, y1, r, stops);

    this.add(gradient);

    return gradient;

  },

  /**
   * @name Two#makeSprite
   * @function
   * @param {(String|Two.Texture)} pathOrTexture - The URL path to an image or an already created {@link Two.Texture}.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} [columns=1]
   * @param {Number} [rows=1]
   * @param {Number} [frameRate=0]
   * @param {Boolean} [autostart=false]
   * @returns {Two.Sprite}
   * @description Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.
   */
  makeSprite: function(path, x, y, cols, rows, frameRate, autostart) {

    var sprite = new Sprite(path, x, y, cols, rows, frameRate);
    if (autostart) {
      sprite.play();
    }
    this.add(sprite);

    return sprite;

  },

  /**
   * @name Two#makeImageSequence
   * @function
   * @param {(String[]|Two.Texture[])} pathsOrTextures - An array of paths or of {@link Two.Textures}.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} [frameRate=0]
   * @param {Boolean} [autostart=false]
   * @returns {Two.ImageSequence}
   * @description Creates a Two.js image sequence object and adds it to the scene.
   */
  makeImageSequence: function(paths, x, y, frameRate, autostart) {

    var imageSequence = new ImageSequence(paths, x, y, frameRate);
    if (autostart) {
      imageSequence.play();
    }
    this.add(imageSequence);

    return imageSequence;

  },

  /**
   * @name Two#makeTexture
   * @function
   * @param {(String|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)} [pathOrSource] - The URL path to an image or a DOM image-like element.
   * @param {Function} [callback] - Function to be invoked when the image is loaded.
   * @returns {Two.Texture}
   * @description Creates a Two.js texture object.
   */
  makeTexture: function(path, callback) {

    var texture = new Texture(path, callback);
    return texture;

  },

  /**
   * @name Two#makeGroup
   * @function
   * @param {(Two.Shape[]|...Two.Shape)} [objects] - Two.js objects to be added to the group in the form of an array or as individual arguments.
   * @returns {Two.Group}
   * @description Creates a Two.js group object and adds it to the scene.
   */
  makeGroup: function(o) {

    var objects = o;
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }

    var group = new Group();
    this.scene.add(group);
    group.add(objects);

    return group;

  },

  /**
   * @name Two#interpret
   * @function
   * @param {SVGElement} SVGElement - The SVG node to be parsed.
   * @param {Boolean} shallow - Don't create a top-most group but append all content directly.
   * @param {Boolean} add – Automatically add the reconstructed SVG node to scene.
   * @returns {Two.Group}
   * @description Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.
   */
  interpret: function(SVGElement, shallow, add) {

    var tag = SVGElement.tagName.toLowerCase();

    add = (typeof add !== 'undefined') ? add : true;

    if (!(tag in interpretSVG)) {
      return null;
    }

    var node = interpretSVG[tag].call(this, SVGElement);

    if (add) {
      this.add(shallow && node instanceof Group ? node.children : node);
    } else if (node.parent) {
      // Remove `g` tags that have been added to scenegraph / DOM
      // in order to be compatible with `getById` methods.
      node.remove();
    }

    return node;

  },

  /**
   * @name Two#load
   * @function
   * @param {String|SVGElement} pathOrSVGContent - The URL path of an SVG file or an SVG document as text.
   * @param {Function} callback - Function to call once loading has completed.
   * @returns {Two.Group}
   * @description Load an SVG file or SVG text and interpret it into Two.js legible objects.
   */
  load: function(text, callback) {

    var group = new Group();
    var elem, i, j;

    var attach = (function(data) {

      dom.temp.innerHTML = data;

      for (i = 0; i < dom.temp.children.length; i++) {
        elem = dom.temp.children[i];
        if (/svg/i.test(elem.nodeName)) {
          // Two.Utils.applySvgViewBox.call(this, group, elem.getAttribute('viewBox'));
          for (j = 0; j < elem.children.length; j++) {
            group.add(this.interpret(elem.children[j]));
          }
        } else {
          group.add(this.interpret(elem));
        }
      }

      if (typeof callback === 'function') {
        var svg = dom.temp.children.length <= 1
          ? dom.temp.children[0] : dom.temp.children;
        callback(group, svg);
      }

    }).bind(this);

    if (/.*\.svg/ig.test(text)) {

      xhr(text, attach);

      return group;

    }

    attach(text);

    return group;

  }

});

function fitToWindow() {

  var wr = document.body.getBoundingClientRect();

  var width = this.width = wr.width;
  var height = this.height = wr.height;

  this.renderer.setSize(width, height, this.ratio);

}

function fitToParent() {

  var parent = this.renderer.domElement.parentElement;
  if (!parent) {
    console.warn('Two.js: Attempting to fit to parent, but no parent found.');
    return;
  }
  var wr = parent.getBoundingClientRect();

  var width = this.width = wr.width;
  var height = this.height = wr.height;

  this.renderer.setSize(width, height, this.ratio);

}

function updateDimensions(width, height) {
  this.width = width;
  this.height = height;
  this.trigger(Events.Types.resize, width, height);
}

// Request Animation Frame

var raf = dom.getRequestAnimationFrame();

function loop() {

  for (var i = 0; i < Two.Instances.length; i++) {
    var t = Two.Instances[i];
    if (t.playing) {
      t.update();
    }
  }

  Two.nextFrameID = raf(loop);

}

raf.init = function() {
  loop();
  raf.init = function() {};
};

_.extend(Two, {
  Anchor: Anchor,
  Collection: Collection,
  Events: Events,
  Group: Group,
  Matrix: Matrix,
  Path: Path,
  Registry: Registry,
  Shape: Shape,
  Text: Text,
  Vector: Vector,

  Gradient: Gradient,
  ImageSequence: ImageSequence,
  LinearGradient: LinearGradient,
  RadialGradient: RadialGradient,
  Sprite: Sprite,
  Stop: Stop,
  Texture: Texture,

  ArcSegment: ArcSegment,
  Circle: Circle,
  Ellipse: Ellipse,
  Line: Line,
  Polygon: Polygon,
  Rectangle: Rectangle,
  RoundedRectangle: RoundedRectangle,
  Star: Star,

  CanvasRenderer: CanvasRenderer,
  SVGRenderer: SVGRenderer,
  WebGLRenderer: WebGLRenderer,

  Commands: Commands,

  /**
   * @name Two.Utils
   * @property {Object} - A massive object filled with utility functions and properties.
   */
  Utils: _.extend({

    Error: TwoError,
    getRatio: getRatio,
    defineGetterSetter: defineGetterSetter,
    read: interpretSVG,
    xhr: xhr

  }, _, CanvasShim, Curves, math)

});

export default Two;
