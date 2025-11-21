// Utils

import { CanvasPolyfill } from './utils/canvas-polyfill.js';
import * as Curves from './utils/curves.js';
import { dom } from './utils/dom.js';
import { TwoError } from './utils/error.js';
import { getRatio } from './utils/device-pixel-ratio.js';
import { read } from './utils/interpret-svg.js';
import * as math from './utils/math.js';
import { Commands } from './utils/path-commands.js';
import { _ } from './utils/underscore.js';
import { xhr } from './utils/xhr.js';

// Core Classes

import { Anchor } from './anchor.js';
import { Collection } from './collection.js';
import { Events } from './events.js';
import { Group } from './group.js';
import { Matrix } from './matrix.js';
import { Path } from './path.js';
import { Registry } from './registry.js';
import { Element } from './element.js';
import { Shape } from './shape.js';
import { Text } from './text.js';
import { Vector } from './vector.js';

// Effects

import { Stop } from './effects/stop.js';
import { Gradient } from './effects/gradient.js';
import { Image } from './effects/image.js';
import { ImageSequence } from './effects/image-sequence.js';
import { LinearGradient } from './effects/linear-gradient.js';
import { RadialGradient } from './effects/radial-gradient.js';
import { Sprite } from './effects/sprite.js';
import { Texture } from './effects/texture.js';

// Secondary Classes

import { ArcSegment } from './shapes/arc-segment.js';
import { Circle } from './shapes/circle.js';
import { Ellipse } from './shapes/ellipse.js';
import { Line } from './shapes/line.js';
import { Points } from './shapes/points.js';
import { Polygon } from './shapes/polygon.js';
import { Rectangle } from './shapes/rectangle.js';
import { RoundedRectangle } from './shapes/rounded-rectangle.js';
import { Star } from './shapes/star.js';

// Renderers

import { Renderer as CanvasRenderer } from './renderers/canvas.js';
import { Renderer as SVGRenderer } from './renderers/svg.js';
import { Renderer as WebGLRenderer } from './renderers/webgl.js';

import { Constants } from './constants.js';

const Utils = _.extend(
  {
    Error: TwoError,
    getRatio,
    read,
    xhr,
  },
  _,
  CanvasPolyfill,
  Curves,
  math
);

/**
 * @name Two
 * @class
 * @global
 * @extends Two.Events
 * @param {Object} [options]
 * @param {Boolean} [options.fullscreen=false] - Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. This overrides `options.fitted` as well.
 * @param {Boolean} [options.fitted=false] - Set to `true` to automatically make the stage adapt to the width and height of the parent element. This parameter overrides `width` and `height` parameters if set to `true`.
 * @param {Number} [options.width=640] - The width of the stage on construction. This can be set at a later time.
 * @param {Number} [options.height=480] - The height of the stage on construction. This can be set at a later time.
 * @param {String} [options.type=Two.Types.svg] - The type of renderer to setup drawing with. See {@link Two.Types} for available options.
 * @param {Boolean} [options.autostart=false] - Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for {@link Two#play}.
 * @param {Element} [options.domElement] - The canvas or SVG element to draw into. This overrides the `options.type` argument.
 * @description The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.
 */
export default class Two {
  // Warning: inherit events while overriding static properties
  /**
   * @private
   */
  _events = new Events();

  // Getters and setters aren't enumerable
  get _bound() {
    return this._events._bound;
  }
  set _bound(v) {
    this._events._bound = v;
  }

  addEventListener() {
    return this._events.addEventListener.apply(this, arguments);
  }
  on() {
    return this._events.addEventListener.apply(this, arguments);
  }
  bind() {
    return this._events.addEventListener.apply(this, arguments);
  }
  removeEventListener() {
    return this._events.removeEventListener.apply(this, arguments);
  }
  off() {
    return this._events.removeEventListener.apply(this, arguments);
  }
  unbind() {
    return this._events.removeEventListener.apply(this, arguments);
  }
  dispatchEvent() {
    return this._events.dispatchEvent.apply(this, arguments);
  }
  trigger() {
    return this._events.dispatchEvent.apply(this, arguments);
  }
  listen() {
    return this._events.listen.apply(this, arguments);
  }
  ignore() {
    return this._events.ignore.apply(this, arguments);
  }

  /**
   * @name Two#type
   * @property {String} - A string representing which type of renderer the instance has instantiated.
   */
  type = '';

  /**
   * @name Two#renderer
   * @property {(Two.SVGRenderer|Two.CanvasRenderer|Two.WebGLRenderer)} - The instantiated rendering class for the instance. For a list of possible rendering types check out Two.Types.
   */
  renderer = null;

  /**
   * @name Two#scene
   * @property {Two.Group} - The base level {@link Two.Group} which houses all objects for the instance. Because it is a {@link Two.Group} transformations can be applied to it that will affect all objects in the instance. This is handy as a makeshift inverted camera.
   */
  scene = null;

  /**
   * @name Two#width
   * @property {Number} - The width of the instance's dom element.
   */
  width = 0;

  /**
   * @name Two#height
   * @property {Number} - The height of the instance's dom element.
   */
  height = 0;

  /**
   * @name Two#frameCount
   * @property {Number} - An integer representing how many frames have elapsed.
   */
  frameCount = 0;

  /**
   * @name Two#timeDelta
   * @property {Number} - A number representing how much time has elapsed since the last frame in milliseconds.
   */
  timeDelta = 0;

  /**
   * @name Two#playing
   * @property {Boolean} - A boolean representing whether or not the instance is being updated through the automatic `requestAnimationFrame`.
   */
  playing = false;

  constructor(options) {
    // Determine what Renderer to use and setup a scene.

    const params = _.defaults(options || {}, {
      fullscreen: false,
      fitted: false,
      width: 640,
      height: 480,
      type: Two.Types.svg,
      autostart: false,
    });

    _.each(
      params,
      function (v, k) {
        if (/fullscreen/i.test(k) || /autostart/i.test(k)) {
          return;
        }
        this[k] = v;
      },
      this
    );

    // Specified domElement overrides type declaration only if the element does not support declared renderer type.
    if (_.isElement(params.domElement)) {
      const tagName = params.domElement.tagName.toLowerCase();
      // TODO: Reconsider this if statement's logic.
      if (
        !/^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(
          this.type + '-' + tagName
        )
      ) {
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
        position: 'fixed',
      });
      _.extend(this.renderer.domElement.style, {
        display: 'block',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed',
      });
      dom.bind(this.fit.domElement, 'resize', this.fit);
      this.fit();
    } else if (params.fitted) {
      this.fit = fitToParent.bind(this);
      _.extend(this.renderer.domElement.style, {
        display: 'block',
      });
    } else if (
      typeof params.width === 'number' &&
      typeof params.height === 'number'
    ) {
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

  static NextFrameId = Constants.NextFrameId;

  // Primitive

  /**
   * @name Two.Types
   * @property {Object} - The different rendering types available in the library.
   */
  static Types = Constants.Types;

  /**
   * @name Two.Version
   * @property {String} - The current working version of the library, `$version`.
   */
  static Version = Constants.Version;

  /**
   * @name Two.PublishDate
   * @property {String} - The automatically generated publish date in the build process to verify version release candidates.
   */
  static PublishDate = Constants.PublishDate;

  /**
   * @name Two.Identifier
   * @property {String} - String prefix for all Two.js object's ids. This trickles down to SVG ids.
   */
  static Identifier = Constants.Identifier;

  /**
   * @name Two.Resolution
   * @property {Number} - Default amount of vertices to be used for interpreting Arcs and ArcSegments.
   */
  static Resolution = Constants.Resolution;

  /**
   * @name Two.AutoCalculateImportedMatrices
   * @property {Boolean} - When importing SVGs through the {@link Two#interpret} and {@link Two#load}, this boolean determines whether Two.js infers and then overrides the exact transformation matrix of the reference SVG.
   * @nota-bene `false` copies the exact transformation matrix values, but also sets the path's `matrix.manual = true`.
   */
  static AutoCalculateImportedMatrices =
    Constants.AutoCalculateImportedMatrices;

  /**
   * @name Two.Instances
   * @property {Two[]} - Registered list of all Two.js instances in the current session.
   */
  static Instances = Constants.Instances;

  /**
   * @function Two.uniqueId
   * @description Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
   * @returns {Number} Ever increasing Number.
   */
  static uniqueId = Constants.uniqueId;

  static Anchor = Anchor;
  static Collection = Collection;
  static Events = Events;
  static Group = Group;
  static Matrix = Matrix;
  static Path = Path;
  static Registry = Registry;
  static Element = Element;
  static Shape = Shape;
  static Text = Text;
  static Vector = Vector;

  static Gradient = Gradient;
  static Image = Image;
  static ImageSequence = ImageSequence;
  static LinearGradient = LinearGradient;
  static RadialGradient = RadialGradient;
  static Sprite = Sprite;
  static Stop = Stop;
  static Texture = Texture;

  static ArcSegment = ArcSegment;
  static Circle = Circle;
  static Ellipse = Ellipse;
  static Line = Line;
  static Points = Points;
  static Polygon = Polygon;
  static Rectangle = Rectangle;
  static RoundedRectangle = RoundedRectangle;
  static Star = Star;

  static CanvasRenderer = CanvasRenderer;
  static SVGRenderer = SVGRenderer;
  static WebGLRenderer = WebGLRenderer;

  /**
   * @name Two.Commands
   * @property {Object} - Map of possible path commands. Taken from the SVG specification. Commands include: `move`, `line`, `curve`, `arc`, and `close`.
   */
  static Commands = Commands;

  /**
   * @name Two.Utils
   * @property {Object} Utils - A massive object filled with utility functions and properties.
   * @property {Object} Two.Utils.read - A collection of SVG parsing functions indexed by element name.
   * @property {Function} Two.Utils.read.path - Parse SVG path element or `d` attribute string.
   */
  static Utils = Utils;

  /**
   * @name Two#appendTo
   * @function
   * @param {Element} elem - The DOM element to append the Two.js stage to.
   * @description Shorthand method to append your instance of Two.js to the `document`.
   */
  appendTo(elem) {
    elem.appendChild(this.renderer.domElement);

    if (this.fit) {
      if (this.fit.domElement !== window) {
        this.fit.domElement = elem;
        this.fit.attached = false;
      }
      this.update();
    }

    return this;
  }

  /**
   * @name Two#play
   * @function
   * @fires play
   * @description Call to start an internal animation loop.
   * @nota-bene This function initiates a `requestAnimationFrame` loop.
   */
  play() {
    this.playing = true;
    raf.init();
    return this.trigger(Events.Types.play);
  }

  /**
   * @name Two#pause
   * @function
   * @fires pause
   * @description Call to stop the internal animation loop for a specific instance of Two.js.
   */
  pause() {
    this.playing = false;
    return this.trigger(Events.Types.pause);
  }

  setPlaying(p) {
    this.playing = p;
  }

  /**
   * @name Two#release
   * @function
   * @param {Two.Element} [obj] - Object to release from event listening. If none provided then the root {@link Two.Group} will be used.
   * @returns {Two.Element} The object passed for event deallocation.
   * @description Release a {@link Two.Element}’s events from memory and recurse through its children, effects, and/or vertices.
   */
  release(obj) {
    let i, v, child;

    // Release this instance of Two.js if nothing passed
    if (typeof obj === 'undefined') {
      return this.release(this.scene);
    }

    if (typeof obj.unbind === 'function') {
      obj.unbind();
    }

    // Unbind effects applied to an object
    if (typeof obj.fill === 'object' && 'unbind' in obj.fill) {
      obj.fill.unbind();
    }
    if (typeof obj.stroke === 'object' && 'unbind' in obj.stroke) {
      obj.stroke.unbind();
    }

    // Unbind vertices on an object
    if (obj.vertices) {
      if (typeof obj.vertices.unbind === 'function') {
        try {
          obj.vertices.unbind();
        } catch (e) {
          // Ignore unbind errors for incomplete Collection objects
        }
      }
      for (i = 0; i < obj.vertices.length; i++) {
        v = obj.vertices[i];
        if (typeof v.unbind === 'function') {
          v.unbind();
        }
        if (v.controls) {
          if (v.controls.left && typeof v.controls.left.unbind === 'function') {
            v.controls.left.unbind();
          }
          if (
            v.controls.right &&
            typeof v.controls.right.unbind === 'function'
          ) {
            v.controls.right.unbind();
          }
        }
      }
    }

    // Unbind any children of the object
    if (obj.children) {
      for (i = 0; i < obj.children.length; i++) {
        child = obj.children[i];
        this.release(child);
      }
      if (typeof obj.children.unbind === 'function') {
        try {
          obj.children.unbind();
        } catch (e) {
          // Ignore unbind errors for incomplete Collection objects
        }
      }
    }

    // Clean up renderer-specific resources
    if (obj._renderer) {
      // SVG DOM element cleanup
      if (obj._renderer.elem && obj._renderer.elem.parentNode) {
        obj._renderer.elem.parentNode.removeChild(obj._renderer.elem);
        delete obj._renderer.elem;
      }

      // WebGL resource cleanup
      if (this.type === 'WebGLRenderer' && this.renderer.ctx) {
        const gl = this.renderer.ctx;

        // Clean up textures
        if (obj._renderer.texture) {
          gl.deleteTexture(obj._renderer.texture);
          delete obj._renderer.texture;
        }

        // Clean up buffers
        if (obj._renderer.positionBuffer) {
          gl.deleteBuffer(obj._renderer.positionBuffer);
          delete obj._renderer.positionBuffer;
        }

        // Clean up any other WebGL effects
        if (obj._renderer.effect) {
          obj._renderer.effect = null;
        }
      }

      // Canvas renderer cleanup - clear cached contexts and data
      if (this.type === 'CanvasRenderer' && obj._renderer.context) {
        delete obj._renderer.context;
      }
    }

    return obj;
  }

  /**
   * @name Two#getShapesAtPoint
   * @function
   * @param {Number} x - X coordinate in world space.
   * @param {Number} y - Y coordinate in world space.
   * @param {Object} [options] - Hit test configuration.
   * @param {Boolean} [options.visibleOnly=true] - Limit results to visible shapes.
   * @param {Boolean} [options.includeGroups=false] - Include groups in the hit results.
   * @param {('all'|'deepest')} [options.mode='all'] - Whether to return all intersecting shapes or only the top-most.
   * @param {Boolean} [options.deepest] - Alias for `mode: 'deepest'`.
   * @param {Number} [options.precision] - Segmentation precision for curved geometry.
   * @param {Number} [options.tolerance=0] - Pixel tolerance applied to hit testing.
   * @param {Boolean} [options.fill] - Override fill testing behaviour.
   * @param {Boolean} [options.stroke] - Override stroke testing behaviour.
   * @param {Function} [options.filter] - Predicate to filter shapes from the result set.
   * @returns {Two.Shape[]} Ordered list of shapes under the specified point, front to back.
   * @description Returns shapes underneath the provided coordinates. Coordinates are expected in world space (matching the renderer output).
   * @nota-bene Delegates to {@link Two.Group#getShapesAtPoint} on the root scene.
   */
  getShapesAtPoint(x, y, options) {
    if (this.scene && typeof this.scene.getShapesAtPoint === 'function') {
      return this.scene.getShapesAtPoint(x, y, options);
    }
    return [];
  }

  /**
   * @name Two#update
   * @function
   * @fires update
   * @description Update positions and calculations in one pass before rendering. Then render to the canvas.
   * @nota-bene This function is called automatically if using {@link Two#play} or the `autostart` parameter in construction.
   */
  update() {
    const animated = !!this._lastFrame;
    const now = _.performance.now();

    if (animated) {
      this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
    }
    this._lastFrame = now;

    if (this.fit && this.fit.domElement && !this.fit.attached) {
      dom.bind(this.fit.domElement, 'resize', this.fit);
      this.fit.attached = true;
      this.fit();
    }

    const width = this.width;
    const height = this.height;
    const renderer = this.renderer;

    // Update width / height for the renderer
    if (width !== renderer.width || height !== renderer.height) {
      renderer.setSize(width, height, this.ratio);
    }

    this.trigger(Events.Types.update, this.frameCount, this.timeDelta);

    return this.render();
  }

  /**
   * @name Two#render
   * @function
   * @fires render
   * @description Render all drawable and visible objects of the scene.
   */
  render() {
    this.renderer.render();
    return this.trigger(Events.Types.render, this.frameCount++);
  }

  // Convenience Methods

  /**
   * @name Two#add
   * @function
   * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects. Alternatively can add objects as individual arguments.
   * @description A shorthand method to add specific Two.js objects to the scene.
   */
  add(objects) {
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }

    this.scene.add(objects);
    return this;
  }

  /**
   * @name Two#remove
   * @function
   * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects.
   * @description A shorthand method to remove specific Two.js objects from the scene.
   */
  remove(objects) {
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }

    this.scene.remove(objects);

    return this;
  }

  /**
   * @name Two#clear
   * @function
   * @description Removes all objects from the instance's scene. If you intend to have the browser garbage collect this, don't forget to delete the references in your application as well.
   */
  clear() {
    this.scene.remove(this.scene.children);
    return this;
  }

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
  makeLine(x1, y1, x2, y2) {
    const line = new Line(x1, y1, x2, y2);
    this.scene.add(line);

    return line;
  }

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
  makeArrow(x1, y1, x2, y2, size) {
    const headlen = typeof size === 'number' ? size : 10;

    const angle = Math.atan2(y2 - y1, x2 - x1);

    const vertices = [
      new Anchor(
        x1,
        y1,
        undefined,
        undefined,
        undefined,
        undefined,
        Commands.move
      ),
      new Anchor(
        x2,
        y2,
        undefined,
        undefined,
        undefined,
        undefined,
        Commands.line
      ),
      new Anchor(
        x2 - headlen * Math.cos(angle - Math.PI / 4),
        y2 - headlen * Math.sin(angle - Math.PI / 4),
        undefined,
        undefined,
        undefined,
        undefined,
        Commands.line
      ),

      new Anchor(
        x2,
        y2,
        undefined,
        undefined,
        undefined,
        undefined,
        Commands.move
      ),
      new Anchor(
        x2 - headlen * Math.cos(angle + Math.PI / 4),
        y2 - headlen * Math.sin(angle + Math.PI / 4),
        undefined,
        undefined,
        undefined,
        undefined,
        Commands.line
      ),
    ];

    const path = new Path(vertices, false, false, true);
    path.noFill();
    path.cap = 'round';
    path.join = 'round';

    this.scene.add(path);

    return path;
  }

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
  makeRectangle(x, y, width, height) {
    const rect = new Rectangle(x, y, width, height);
    this.scene.add(rect);

    return rect;
  }

  /**
   * @name Two#makeRoundedRectangle
   * @function
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {Number} sides
   * @returns {Two.RoundedRectangle}
   * @description Creates a Two.js rounded rectangle and adds it to the scene.
   */
  makeRoundedRectangle(x, y, width, height, sides) {
    const rect = new RoundedRectangle(x, y, width, height, sides);
    this.scene.add(rect);

    return rect;
  }

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
  makeCircle(x, y, radius, resolution) {
    const circle = new Circle(x, y, radius, resolution);
    this.scene.add(circle);

    return circle;
  }

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
  makeEllipse(x, y, rx, ry, resolution) {
    const ellipse = new Ellipse(x, y, rx, ry, resolution);
    this.scene.add(ellipse);

    return ellipse;
  }

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
  makeStar(x, y, outerRadius, innerRadius, sides) {
    const star = new Star(x, y, outerRadius, innerRadius, sides);
    this.scene.add(star);

    return star;
  }

  /**
   * @name Two#makeCurve
   * @function
   * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points.
   * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
   * @returns {Two.Path} - Where `path.curved` is set to `true`.
   * @description Creates a Two.js path that is curved and adds it to the scene.
   * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
   */
  makeCurve(points) {
    const l = arguments.length;

    if (!Array.isArray(points)) {
      points = [];
      for (let i = 0; i < l; i += 2) {
        const x = arguments[i];
        if (typeof x !== 'number') {
          break;
        }
        const y = arguments[i + 1];
        points.push(new Anchor(x, y));
      }
    }

    const last = arguments[l - 1];
    const curve = new Path(
      points,
      !(typeof last === 'boolean' ? last : undefined),
      true
    );
    const rect = curve.getBoundingClientRect();
    curve
      .center()
      .translation.set(rect.left + rect.width / 2, rect.top + rect.height / 2);

    this.scene.add(curve);

    return curve;
  }

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
  makePolygon(x, y, radius, sides) {
    const poly = new Polygon(x, y, radius, sides);
    this.scene.add(poly);

    return poly;
  }

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
   * @returns {Two.ArcSegment}
   */
  makeArcSegment(
    x,
    y,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    resolution
  ) {
    const arcSegment = new ArcSegment(
      x,
      y,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      resolution
    );
    this.scene.add(arcSegment);
    return arcSegment;
  }

  /**
   * @name Two#makePoints
   * @function
   * @param {Two.Vector[]} [points] - An array of {@link Two.Vector} points
   * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual agrguments. These will be combined into {@link Two.Vector}s for use in the points object.
   * @returns {Two.Points}
   * @description Creates a Two.js points object and adds it to the current scene.
   */
  makePoints(p) {
    const l = arguments.length;
    let vertices = p;

    if (!Array.isArray(p)) {
      vertices = [];
      for (let i = 0; i < l; i += 2) {
        const x = arguments[i];
        if (typeof x !== 'number') {
          break;
        }
        const y = arguments[i + 1];
        vertices.push(new Vector(x, y));
      }
    }

    const points = new Points(vertices);

    this.scene.add(points);

    return points;
  }

  /**
   * @name Two#makePath
   * @function
   * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points
   * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
   * @returns {Two.Path}
   * @description Creates a Two.js path and adds it to the scene.
   * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
   */
  makePath(p) {
    const l = arguments.length;
    let points = p;

    if (!Array.isArray(p)) {
      points = [];
      for (let i = 0; i < l; i += 2) {
        const x = arguments[i];
        if (typeof x !== 'number') {
          break;
        }
        const y = arguments[i + 1];
        points.push(new Anchor(x, y));
      }
    }

    const last = arguments[l - 1];
    const path = new Path(
      points,
      !(typeof last === 'boolean' ? last : undefined)
    );
    const rect = path.getBoundingClientRect();
    if (
      typeof rect.top === 'number' &&
      typeof rect.left === 'number' &&
      typeof rect.right === 'number' &&
      typeof rect.bottom === 'number'
    ) {
      path
        .center()
        .translation.set(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
    }

    this.scene.add(path);

    return path;
  }

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
  makeText(message, x, y, styles) {
    const text = new Text(message, x, y, styles);
    this.add(text);
    return text;
  }

  /**
   * @name Two#makeLinearGradient
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @param {...Two.Stop} args - Any number of color stops sometimes referred to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
   * @returns {Two.LinearGradient}
   * @description Creates a Two.js linear gradient and adds it to the scene. In the case of an effect it's added to an invisible "definitions" group.
   */
  makeLinearGradient(x1, y1, x2, y2 /* stops */) {
    const stops = Array.prototype.slice.call(arguments, 4);
    const gradient = new LinearGradient(x1, y1, x2, y2, stops);

    this.add(gradient);

    return gradient;
  }

  /**
   * @name Two#makeRadialGradient
   * @function
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} radius
   * @param {...Two.Stop} args - Any number of color stops sometimes referred to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
   * @returns {Two.RadialGradient}
   * @description Creates a Two.js linear-gradient object and adds it to the scene. In the case of an effect it's added to an invisible "definitions" group.
   */
  makeRadialGradient(x1, y1, radius /* stops */) {
    const stops = Array.prototype.slice.call(arguments, 3);
    const gradient = new RadialGradient(x1, y1, radius, stops);

    this.add(gradient);

    return gradient;
  }

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
  makeSprite(pathOrTexture, x, y, columns, rows, frameRate, autostart) {
    const sprite = new Sprite(pathOrTexture, x, y, columns, rows, frameRate);
    if (autostart) {
      sprite.play();
    }
    this.add(sprite);

    return sprite;
  }

  /**
   * @name Two#makeImage
   * @function
   * @param {(String|Two.Texture)} pathOrTexture - The URL path to an image or an already created {@link Two.Texture}.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} width
   * @param {Number} height
   * @param {String} [mode="fill"]
   * @returns {Two.Image}
   * @description Creates a Two.js image object and adds it to the scene. Images are scaled to fit the provided width and height.
   */
  makeImage(pathOrTexture, x, y, width, height, mode) {
    const image = new Image(pathOrTexture, x, y, width, height, mode);
    this.add(image);

    return image;
  }

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
  makeImageSequence(pathsOrTextures, x, y, frameRate, autostart) {
    const imageSequence = new ImageSequence(pathsOrTextures, x, y, frameRate);
    if (autostart) {
      imageSequence.play();
    }
    this.add(imageSequence);

    return imageSequence;
  }

  /**
   * @name Two#makeTexture
   * @function
   * @param {(String|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)} [pathOrSource] - The URL path to an image or a DOM image-like element.
   * @param {Function} [callback] - Function to be invoked when the image is loaded.
   * @returns {Two.Texture}
   * @description Creates a Two.js texture object.
   */
  makeTexture(pathOrSource, callback) {
    const texture = new Texture(pathOrSource, callback);
    return texture;
  }

  /**
   * @name Two#makeGroup
   * @function
   * @param {(Two.Shape[]|...Two.Shape)} [objects] - Two.js objects to be added to the group in the form of an array or as individual arguments.
   * @returns {Two.Group}
   * @description Creates a Two.js group object and adds it to the scene.
   */
  makeGroup(objects) {
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    }

    const group = new Group();
    this.scene.add(group);
    group.add(objects);

    return group;
  }

  /**
   * @name Two#interpret
   * @function
   * @param {SVGElement} svg - The SVG node to be parsed.
   * @param {Boolean} shallow - Don't create a top-most group but append all content directly.
   * @param {Boolean} [add=true] – Automatically add the reconstructed SVG node to scene.
   * @returns {Two.Group}
   * @description Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.
   */
  interpret(svg, shallow, add) {
    const tag = svg.tagName.toLowerCase();

    add = typeof add !== 'undefined' ? add : true;

    if (!(tag in read)) {
      return null;
    }

    const node = read[tag].call(this, svg);

    if (add) {
      this.add(shallow && node instanceof Group ? node.children : node);
    } else if (node.parent) {
      // Remove `g` tags that have been added to scenegraph / DOM
      // in order to be compatible with `getById` methods.
      node.remove();
    }

    return node;
  }

  /**
   * @name Two#load
   * @function
   * @param {String|SVGElement} pathOrSVGContent - The URL path of an SVG file or an SVG document as text.
   * @param {Function} [callback] - Function to call once loading has completed.
   * @returns {Two.Group}
   * @description Load an SVG file or SVG text and interpret it into Two.js legible objects.
   */
  load(pathOrSVGContent, callback) {
    const group = new Group();
    let elem, i, child;

    const attach = function (data) {
      dom.temp.innerHTML = data;

      for (i = 0; i < dom.temp.children.length; i++) {
        elem = dom.temp.children[i];
        child = this.interpret(elem, false, false);
        if (child !== null) {
          group.add(child);
        }
      }

      if (typeof callback === 'function') {
        const svg =
          dom.temp.children.length <= 1
            ? dom.temp.children[0]
            : dom.temp.children;
        callback(group, svg);
      }
    }.bind(this);

    if (/\.svg$/i.test(pathOrSVGContent)) {
      xhr(pathOrSVGContent, attach);

      return group;
    }

    attach(pathOrSVGContent);

    return group;
  }
}

function fitToWindow() {
  const wr = document.body.getBoundingClientRect();

  const width = (this.width = wr.width);
  const height = (this.height = wr.height);

  this.renderer.setSize(width, height, this.ratio);
}

function fitToParent() {
  const parent = this.renderer.domElement.parentElement;
  if (!parent) {
    console.warn('Two.js: Attempting to fit to parent, but no parent found.');
    return;
  }
  const wr = parent.getBoundingClientRect();

  const width = (this.width = wr.width);
  const height = (this.height = wr.height);

  this.renderer.setSize(width, height, this.ratio);
}

function updateDimensions(width, height) {
  this.width = width;
  this.height = height;
  this.trigger(Events.Types.resize, width, height);
}

// Request Animation Frame

const raf = dom.getRequestAnimationFrame();

function loop() {
  for (let i = 0; i < Two.Instances.length; i++) {
    const t = Two.Instances[i];
    if (t.playing) {
      t.update();
    }
  }

  Two.NextFrameId = raf(loop);
}

raf.init = function () {
  loop();
  raf.init = function () {};
};
