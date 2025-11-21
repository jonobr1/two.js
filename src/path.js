import { Commands } from './utils/path-commands.js';
import { Collection } from './collection.js';
import { lerp, mod, decomposeMatrix } from './utils/math.js';
import {
  getComponentOnCubicBezier,
  getCurveBoundingBox,
  getCurveFromPoints,
} from './utils/curves.js';
import {
  contains,
  getIdByLength,
  getCurveLength,
  getSubdivisions,
  getEffectFromObject,
} from './utils/shape.js';
import { _ } from './utils/underscore.js';

import { Shape } from './shape.js';
import { Events } from './events.js';
import { Vector } from './vector.js';
import { Anchor } from './anchor.js';
import { Matrix } from './matrix.js';

import { Gradient } from './effects/gradient.js';
import { LinearGradient } from './effects/linear-gradient.js';
import { RadialGradient } from './effects/radial-gradient.js';
import { Texture } from './effects/texture.js';
import {
  buildPathHitParts,
  pointInPolygons,
  distanceToSegments,
  hasVisibleFill,
  hasVisibleStroke,
} from './utils/hit-test.js';
import {
  clearHandleComponent,
  setHandleComponent,
  inheritRelative,
  isSegmentCurved,
  splitSubdivisionSegment,
  applyGlobalSmooth,
  applyLocalSmooth,
} from './utils/path.js';

// Constants

const min = Math.min,
  max = Math.max,
  ceil = Math.ceil,
  floor = Math.floor;

const vector = new Vector();
const hitTestMatrix = new Matrix();

/**
 * @name Two.Path
 * @class
 * @extends Two.Shape
 * @param {Two.Anchor[]} [vertices] - A list of {@link Two.Anchor}s that represent the order and coordinates to construct the rendered shape.
 * @param {Boolean} [closed=false] - Describes whether the shape is closed or open.
 * @param {Boolean} [curved=false] - Describes whether the shape automatically calculates bezier handles for each vertex.
 * @param {Boolean} [manual=false] - Describes whether the developer controls how vertices are plotted or if Two.js automatically plots coordinates based on closed and curved booleans.
 * @description This is the primary primitive class for creating all drawable shapes in Two.js. Unless specified methods return their instance of `Two.Path` for the purpose of chaining.
 */
export class Path extends Shape {
  /**
   * @name Two.Path#_flagVertices
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#vertices} need updating.
   */
  _flagVertices = true;

  /**
   * @name Two.Path#_flagLength
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#length} needs updating.
   */
  _flagLength = true;

  /**
   * @name Two.Path#_flagFill
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#fill} needs updating.
   */
  _flagFill = true;

  /**
   * @name Two.Path#_flagStroke
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#stroke} needs updating.
   */
  _flagStroke = true;

  /**
   * @name Two.Path#_flagLinewidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#linewidth} needs updating.
   */
  _flagLinewidth = true;

  /**
   * @name Two.Path#_flagOpacity
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#opacity} needs updating.
   */
  _flagOpacity = true;

  /**
   * @name Two.Path#_flagVisible
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#visible} needs updating.
   */
  _flagVisible = true;

  /**
   * @name Two.Path#_flagCap
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#cap} needs updating.
   */
  _flagCap = true;

  /**
   * @name Two.Path#_flagJoin
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#join} needs updating.
   */
  _flagJoin = true;

  /**
   * @name Two.Path#_flagMiter
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#miter} needs updating.
   */
  _flagMiter = true;

  /**
   * @name Two.Path#_flagStrokeAttenuation
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#strokeAttenuation} needs updating.
   */
  _flagStrokeAttenuation = true;

  /**
   * @name Two.Path#_flagMask
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#mask} needs updating.
   */
  _flagMask = false;

  /**
   * @name Two.Path#_flagClip
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Path#clip} needs updating.
   */
  _flagClip = false;

  // Underlying Properties

  /**
   * @name Two.Path#_length
   * @private
   * @see {@link Two.Path#length}
   */
  _length = 0;

  /**
   * @name Two.Path#_fill
   * @private
   * @see {@link Two.Path#fill}
   */
  _fill = '#fff';

  /**
   * @name Two.Path#_stroke
   * @private
   * @see {@link Two.Path#stroke}
   */
  _stroke = '#000';

  /**
   * @name Two.Path#_linewidth
   * @private
   * @see {@link Two.Path#linewidth}
   */
  _linewidth = 1;

  /**
   * @name Two.Path#_opacity
   * @private
   * @see {@link Two.Path#opacity}
   */
  _opacity = 1.0;

  /**
   * @name Two.Path#_visible
   * @private
   * @see {@link Two.Path#visible}
   */
  _visible = true;

  /**
   * @name Two.Path#_cap
   * @private
   * @see {@link Two.Path#cap}
   */
  _cap = 'round';

  /**
   * @name Two.Path#_join
   * @private
   * @see {@link Two.Path#join}
   */
  _join = 'round';

  /**
   * @name Two.Path#_miter
   * @private
   * @see {@link Two.Path#miter}
   */
  _miter = 4;

  /**
   * @name Two.Path#_closed
   * @private
   * @see {@link Two.Path#closed}
   */
  _closed = true;

  /**
   * @name Two.Path#_curved
   * @private
   * @see {@link Two.Path#curved}
   */
  _curved = false;

  /**
   * @name Two.Path#_automatic
   * @private
   * @see {@link Two.Path#automatic}
   */
  _automatic = true;

  /**
   * @name Two.Path#_beginning
   * @private
   * @see {@link Two.Path#beginning}
   */
  _beginning = 0;

  /**
   * @name Two.Path#_ending
   * @private
   * @see {@link Two.Path#ending}
   */
  _ending = 1.0;

  /**
   * @name Two.Path#_mask
   * @private
   * @see {@link Two.Path#mask}
   */
  _mask = null;

  /**
   * @name Two.Path#_clip
   * @private
   * @see {@link Two.Path#clip}
   */
  _clip = false;

  /**
   * @name Two.Path#_dashes
   * @private
   * @see {@link Two.Path#dashes}
   */
  _dashes = null;

  /**
   * @name Two.Path#_strokeAttenuation
   * @private
   * @see {@link Two.Path#strokeAttenuation}
   */
  _strokeAttenuation = true;

  constructor(vertices, closed, curved, manual) {
    super();

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this._renderer.type = 'path';
    this._renderer.flagVertices = FlagVertices.bind(this);
    this._renderer.bindVertices = BindVertices.bind(this);
    this._renderer.unbindVertices = UnbindVertices.bind(this);

    this._renderer.flagFill = FlagFill.bind(this);
    this._renderer.flagStroke = FlagStroke.bind(this);
    this._renderer.vertices = [];
    this._renderer.collection = [];

    /**
     * @name Two.Path#closed
     * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point.
     */
    this.closed = !!closed;

    /**
     * @name Two.Path#curved
     * @property {Boolean} - When the path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
     */
    this.curved = !!curved;

    /**
     * @name Two.Path#beginning
     * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
     * @description {@link Two.Path#beginning} is a percentage value that represents at what percentage into the path should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#ending}.
     */
    this.beginning = 0;

    /**
     * @name Two.Path#ending
     * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
     * @description {@link Two.Path#ending} is a percentage value that represents at what percentage into the path should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Path#beginning}.
     */
    this.ending = 1;

    // Style properties

    /**
     * @name Two.Path#fill
     * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    this.fill = '#fff';

    /**
     * @name Two.Path#stroke
     * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    this.stroke = '#000';

    /**
     * @name Two.Path#linewidth
     * @property {Number} - The thickness in pixels of the stroke.
     */
    this.linewidth = 1;

    /**
     * @name Two.Path#opacity
     * @property {Number} - The opaqueness of the path.
     * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
     */
    this.opacity = 1;

    /**
     * @name Two.Path#className
     * @property {String} - A class to be applied to the element to be compatible with CSS styling.
     * @nota-bene Only rendered to DOM in the SVG renderer.
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
    this.cap = 'butt'; // Default of Adobe Illustrator

    /**
     * @name Two.Path#join
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
     */
    this.join = 'miter'; // Default of Adobe Illustrator

    /**
     * @name Two.Path#miter
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
     */
    this.miter = 4; // Default of Adobe Illustrator

    /**
     * @name Two.Path#vertices
     * @property {Two.Anchor[]} - An ordered list of anchor points for rendering the path.
     * @description A list of {@link Two.Anchor} objects that consist of what form the path takes.
     * @nota-bene The array when manipulating is actually a {@link Two.Collection}.
     */
    this.vertices = vertices;

    /**
     * @name Two.Path#automatic
     * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
     */
    this.automatic = !manual;

    /**
     * @name Two.Path#dashes
     * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
     * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
     */
    this.dashes = [];

    /**
     * @name Two.Path#dashes#offset
     * @property {Number} - A number in pixels to offset {@link Two.Path#dashes} display.
     */
    this.dashes.offset = 0;
  }

  /**
   * @name Two.Path.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Path}.
   */
  static Properties = [
    'fill',
    'stroke',
    'linewidth',
    'opacity',
    'visible',
    'cap',
    'join',
    'miter',
    'closed',
    'curved',
    'automatic',
    'beginning',
    'ending',
    'dashes',
    'strokeAttenuation',
  ];

  static Utils = {
    getCurveLength,
  };

  /**
   * @name Two.Path.fromObject
   * @function
   * @param {Object} obj - Object notation of a {@link Two.Path} to create a new instance
   * @returns {Two.Path}
   * @description Create a new {@link Two.Path} from an object notation of a {@link Two.Path}.
   * @nota-bene Works in conjunction with {@link Two.Path#toObject}
   */
  static fromObject(obj) {
    const fill =
      typeof obj.fill === 'string' ? obj.fill : getEffectFromObject(obj.fill);
    const stroke =
      typeof obj.stroke === 'string'
        ? obj.stroke
        : getEffectFromObject(obj.stroke);
    const path = new Path().copy({ ...obj, fill, stroke });

    if ('id' in obj) {
      path.id = obj.id;
    }

    return path;
  }

  /**
   * @name Two.Path#copy
   * @function
   * @param {Two.Path} path - The reference {@link Two.Path}
   * @description Copy the properties of one {@link Two.Path} onto another.
   */
  copy(path) {
    super.copy.call(this, path);

    if (path.vertices) {
      this.vertices = [];
      for (let j = 0; j < path.vertices.length; j++) {
        const v = path.vertices[j];
        if (v instanceof Anchor) {
          this.vertices.push(path.vertices[j].clone());
        } else {
          this.vertices.push(new Anchor().copy(v));
        }
      }
    }

    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      if (k in path) {
        this[k] = path[k];
      }
    }

    return this;
  }

  /**
   * @name Two.Path#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Path}
   * @description Create a new instance of {@link Two.Path} with the same properties of the current path.
   */
  clone(parent) {
    const clone = new Path();

    for (let j = 0; j < this.vertices.length; j++) {
      clone.vertices.push(this.vertices[j].clone());
    }

    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      clone[k] = this[k];
    }

    clone.className = this.className;

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();
  }

  /**
   * @name Two.Path#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   * @nota-bene Works in conjunction with {@link Two.Path.fromObject}
   */
  toObject() {
    const result = super.toObject.call(this);

    result.renderer.type = 'path';
    result.vertices = this.vertices.map((v) => v.toObject());

    _.each(
      Path.Properties,
      (k) => {
        if (typeof this[k] !== 'undefined') {
          if (this[k].toObject) {
            result[k] = this[k].toObject();
          } else {
            result[k] = this[k];
          }
        }
      },
      this
    );

    return result;
  }

  /**
   * @name Two.Path#dispose
   * @function
   * @returns {Two.Path}
   * @description Release the path's renderer resources and detach all events.
   * This method cleans up vertices collection events, individual vertex events,
   * control point events, and disposes fill/stroke effects (calling dispose()
   * on Gradients and Textures for thorough cleanup) while preserving the
   * renderer type for potential re-attachment to a new renderer.
   */
  dispose() {
    // Call parent dispose to preserve renderer type and unbind events
    super.dispose();

    // Unbind vertices collection events
    if (this.vertices && typeof this.vertices.unbind === 'function') {
      try {
        this.vertices.unbind();
      } catch (e) {
        // Ignore unbind errors for incomplete Collection objects
      }
    }

    // Unbind individual vertex events and control point events
    if (this.vertices) {
      for (let i = 0; i < this.vertices.length; i++) {
        const v = this.vertices[i];
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

    // Dispose fill effect (more thorough than unbind)
    if (typeof this.fill === 'object' && this.fill && 'dispose' in this.fill) {
      this.fill.dispose();
    } else if (
      typeof this.fill === 'object' &&
      this.fill &&
      'unbind' in this.fill
    ) {
      this.fill.unbind();
    }

    // Dispose stroke effect (more thorough than unbind)
    if (
      typeof this.stroke === 'object' &&
      this.stroke &&
      'dispose' in this.stroke
    ) {
      this.stroke.dispose();
    } else if (
      typeof this.stroke === 'object' &&
      this.stroke &&
      'unbind' in this.stroke
    ) {
      this.stroke.unbind();
    }

    return this;
  }

  /**
   * @name Two.Path#noFill
   * @function
   * @description Short hand method to set fill to `none`.
   */
  noFill() {
    this.fill = 'none';
    return this;
  }

  /**
   * @name Two.Path#noStroke
   * @function
   * @description Short hand method to set stroke to `none`.
   */
  noStroke() {
    this.stroke = 'none';
    this.linewidth = 0;
    return this;
  }

  /**
   * @name Two.Path#corner
   * @function
   * @description Orient the vertices of the shape to the upper left-hand corner of the path.
   */
  corner() {
    const rect = this.getBoundingClientRect(true);
    const hw = rect.width / 2;
    const hh = rect.height / 2;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < this.vertices.length; i++) {
      const v = this.vertices[i];
      v.x -= cx;
      v.y -= cy;
      v.x += hw;
      v.y += hh;
    }

    if (this.mask) {
      this.mask.translation.x -= cx;
      this.mask.translation.x += hw;
      this.mask.translation.y -= cy;
      this.mask.translation.y += hh;
    }

    return this;
  }

  /**
   * @name Two.Path#center
   * @function
   * @description Orient the vertices of the shape to the center of the path.
   */
  center() {
    const rect = this.getBoundingClientRect(true);

    const cx = rect.left + rect.width / 2 - this.translation.x;
    const cy = rect.top + rect.height / 2 - this.translation.y;

    for (let i = 0; i < this.vertices.length; i++) {
      const v = this.vertices[i];
      v.x -= cx;
      v.y -= cy;
    }

    if (this.mask) {
      this.mask.translation.x -= cx;
      this.mask.translation.y -= cy;
    }

    return this;
  }

  /**
   * @name Two.Path#getBoundingClientRect
   * @function
   * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
   * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
   * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
   */
  getBoundingClientRect(shallow) {
    let matrix, border, l, i, v0, v1;

    let left = Infinity,
      right = -Infinity,
      top = Infinity,
      bottom = -Infinity;

    // TODO: Update this to not __always__ update. Just when it needs to.
    this._update(true);

    matrix = shallow ? this.matrix : this.worldMatrix;

    border = (this.linewidth || 0) / 2;
    l = this._renderer.vertices.length;

    if (
      this.linewidth > 0 ||
      (this.stroke && !/(transparent|none)/i.test(this.stroke))
    ) {
      if (this.matrix.manual) {
        const { scaleX, scaleY } = decomposeMatrix(
          matrix.elements[0],
          matrix.elements[3],
          matrix.elements[1],
          matrix.elements[4],
          matrix.elements[2],
          matrix.elements[5]
        );
        if (typeof scaleX === 'number' && typeof scaleY === 'number') {
          border = (Math.max(scaleX, scaleY) * (this.linewidth || 0)) / 2;
        }
      } else {
        border *=
          typeof this.scale === 'number'
            ? this.scale
            : Math.max(this.scale.x, this.scale.y);
      }
    }

    if (l <= 0) {
      return {
        width: 0,
        height: 0,
      };
    }

    for (i = 0; i < l; i++) {
      v1 = this._renderer.vertices[i];
      // If i = 0, then this "wraps around" to the last vertex. Otherwise, it's the previous vertex.
      // This is important for handling cyclic paths.
      v0 = this._renderer.vertices[(i + l - 1) % l];

      const [v0x, v0y] = matrix.multiply(v0.x, v0.y);
      const [v1x, v1y] = matrix.multiply(v1.x, v1.y);

      if (v0.controls && v1.controls) {
        let rx = v0.controls.right.x;
        let ry = v0.controls.right.y;

        if (v0.relative) {
          rx += v0.x;
          ry += v0.y;
        }

        let [c0x, c0y] = matrix.multiply(rx, ry);

        let lx = v1.controls.left.x;
        let ly = v1.controls.left.y;

        if (v1.relative) {
          lx += v1.x;
          ly += v1.y;
        }

        let [c1x, c1y] = matrix.multiply(lx, ly);

        const bb = getCurveBoundingBox(v0x, v0y, c0x, c0y, c1x, c1y, v1x, v1y);

        top = min(bb.min.y - border, top);
        left = min(bb.min.x - border, left);
        right = max(bb.max.x + border, right);
        bottom = max(bb.max.y + border, bottom);
      } else {
        if (i <= 1) {
          top = min(v0y - border, top);
          left = min(v0x - border, left);
          right = max(v0x + border, right);
          bottom = max(v0y + border, bottom);
        }

        top = min(v1y - border, top);
        left = min(v1x - border, left);
        right = max(v1x + border, right);
        bottom = max(v1y + border, bottom);
      }
    }

    return {
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      width: right - left,
      height: bottom - top,
    };
  }

  /**
   * @name Two.Path#contains
   * @function
   * @param {Number} x - x coordinate to hit test against
   * @param {Number} y - y coordinate to hit test against
   * @param {Object} [options] - Optional options object
   * @param {Boolean} [options.ignoreVisibility] - If `true`, hit test against `path.visible = false` shapes
   * @param {Number} [options.tolerance] - Padding to hit test against in pixels
   * @returns {Boolean}
   * @description Check to see if coordinates are within a {@link Two.Path}'s bounding rectangle
   * @nota-bene Expects *world-space coordinates* – the same pixel-space you get from the renderer (e.g., mouse `clientX`/`clientY` adjusted for the canvas’s offset and pixel ratio).
   */
  contains(x, y, options) {
    const opts = options || {};
    const ignoreVisibility = opts.ignoreVisibility === true;

    if (!ignoreVisibility && this.visible === false) {
      return false;
    }

    if (
      !ignoreVisibility &&
      typeof this.opacity === 'number' &&
      this.opacity <= 0
    ) {
      return false;
    }

    const tolerance = typeof opts.tolerance === 'number' ? opts.tolerance : 0;

    this._update(true);

    const rect = this.getBoundingClientRect();

    if (
      !rect ||
      x < rect.left - tolerance ||
      x > rect.right + tolerance ||
      y < rect.top - tolerance ||
      y > rect.bottom + tolerance
    ) {
      return false;
    }

    const matrix = this.worldMatrix;
    const inverse = matrix && matrix.inverse(hitTestMatrix);

    if (!inverse) {
      return super.contains(x, y, opts);
    }

    const [localX, localY] = inverse.multiply(x, y, 1);
    const precision =
      typeof opts.precision === 'number' && !Number.isNaN(opts.precision)
        ? Math.max(1, Math.floor(opts.precision))
        : 8;

    const fillTest = hasVisibleFill(this, opts.fill);
    const strokeTest = hasVisibleStroke(this, opts.stroke);

    const { polygons, segments } = buildPathHitParts(this, precision);

    if (fillTest && polygons.length > 0) {
      if (pointInPolygons(polygons, localX, localY)) {
        return true;
      }
    }

    if (strokeTest && segments.length > 0) {
      const linewidth = typeof this.linewidth === 'number' ? this.linewidth : 0;
      if (linewidth > 0) {
        const distance = distanceToSegments(segments, localX, localY);
        if (distance <= linewidth / 2 + tolerance) {
          return true;
        }
      }
    }

    if (!fillTest && !strokeTest) {
      return super.contains(x, y, opts);
    }

    if (fillTest && polygons.length === 0) {
      return super.contains(x, y, opts);
    }

    return false;
  }

  /**
   * @name Two.Path#getPointAt
   * @function
   * @param {Number} t - Percentage value describing where on the {@link Two.Path} to estimate and assign coordinate values.
   * @param {Two.Vector} [obj] - Object to apply calculated x, y to. If none available returns new `Object`.
   * @returns {Object}
   * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this {@link Two.Path}'s curve.
   */
  getPointAt(t, obj) {
    let ia, ib, result;
    let x, x1, x2, x3, x4, y, y1, y2, y3, y4, left, right;
    let target = this.length * Math.min(Math.max(t, 0), 1);
    const length = this.vertices.length;
    const last = length - 1;

    let a = null;
    let b = null;

    for (let i = 0, l = this._lengths.length, sum = 0; i < l; i++) {
      if (sum + this._lengths[i] >= target) {
        if (this._closed) {
          ia = mod(i, length);
          ib = mod(i - 1, length);
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

    if (a === null || b === null) {
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

    x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
    y = getComponentOnCubicBezier(t, y1, y2, y3, y4);

    // Higher order points for control calculation.
    const t1x = lerp(x1, x2, t);
    const t1y = lerp(y1, y2, t);
    const t2x = lerp(x2, x3, t);
    const t2y = lerp(y2, y3, t);
    const t3x = lerp(x3, x4, t);
    const t3y = lerp(y3, y4, t);

    // Calculate the returned points control points.
    const brx = lerp(t1x, t2x, t);
    const bry = lerp(t1y, t2y, t);
    const alx = lerp(t2x, t3x, t);
    const aly = lerp(t2y, t3y, t);

    if (_.isObject(obj)) {
      obj.x = x;
      obj.y = y;

      if (obj instanceof Anchor) {
        obj.controls.left.x = brx;
        obj.controls.left.y = bry;
        obj.controls.right.x = alx;
        obj.controls.right.y = aly;

        if (!(typeof obj.relative === 'boolean') || obj.relative) {
          obj.controls.left.x -= x;
          obj.controls.left.y -= y;
          obj.controls.right.x -= x;
          obj.controls.right.y -= y;
        }
      }

      obj.t = t;

      return obj;
    }

    result = new Anchor(
      x,
      y,
      brx - x,
      bry - y,
      alx - x,
      aly - y,
      this._curved ? Commands.curve : Commands.line
    );

    result.t = t;

    return result;
  }

  /**
   * @name Two.Path#plot
   * @function
   * @description Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
   * @nota-bene While this method is public it is internally called by {@link Two.Path#_update} when `automatic = true`.
   */
  plot() {
    if (this.curved) {
      getCurveFromPoints(this._collection, this.closed);
      return this;
    }

    for (let i = 0; i < this._collection.length; i++) {
      this._collection[i].command = i === 0 ? Commands.move : Commands.line;
    }

    return this;
  }

  /**
   * @name Two.Path#smooth
   * @function
   * @param {Object} [options] - Configuration for smoothing.
   * @param {String} [options.type='continuous'] - Type of smoothing algorithm.
   * @param {Number} [options.from=0] - Index of vertices to start smoothing
   * @param {Number} [options.to=1] - Index of vertices to terminate smoothing
   * @description Adjust vertex handles to generate smooth curves without toggling `automatic`.
   */
  smooth(options) {
    const opts = options || {};
    const type = opts.type || 'continuous';
    const vertices = this._collection;
    const length = vertices.length;

    if (length < 2) {
      return this;
    }

    const closed =
      this._closed ||
      (length > 0 &&
        vertices[length - 1] &&
        vertices[length - 1].command === Commands.close);

    const resolveIndex = (value, defaultIndex) => {
      if (value === undefined || value === null) {
        return defaultIndex;
      }

      if (typeof value === 'number') {
        if (closed) {
          return mod(value, length);
        }
        let index = value;
        if (index < 0) {
          index += length;
        }
        return Math.min(Math.max(index, 0), length - 1);
      }

      const idx = vertices.indexOf(value);
      return idx !== -1 ? idx : defaultIndex;
    };

    const loop = closed && opts.from === undefined && opts.to === undefined;
    let from = resolveIndex(opts.from, 0);
    let to = resolveIndex(opts.to, length - 1);

    if (from > to) {
      if (closed) {
        from -= length;
      } else {
        const temp = from;
        from = to;
        to = temp;
      }
    }

    const rangeLength = to - from + 1;
    for (let i = 0; i < rangeLength; i += 1) {
      const index = mod(from + i, length);
      const anchor = vertices[index];
      const isOpenStart = !closed && index === 0;
      if (anchor.command === Commands.move && !isOpenStart) {
        anchor.command = Commands.line;
      }
    }

    if (type === 'continuous' || type === 'asymmetric') {
      applyGlobalSmooth(
        vertices,
        from,
        to,
        closed,
        loop,
        type === 'asymmetric'
      );
    } else if (type === 'catmull-rom' || type === 'geometric') {
      const range = {
        type,
        factor: opts.factor,
      };
      applyLocalSmooth(vertices, from, to, closed, loop, range);
    } else {
      throw new Error(
        `Path.smooth does not support type "${type}". Try 'continuous', 'asymmetric', 'catmull-rom', or 'geometric'.`
      );
    }

    this._automatic = false;
    this._flagVertices = true;
    this._flagLength = true;

    return this;
  }

  /**
   * @name Two.Path#subdivide
   * @function
   * @param {Number} limit - How many times to recurse subdivisions.
   * @description Insert a {@link Two.Anchor} at the midpoint between every item in {@link Two.Path#vertices}.
   */
  subdivide(limit) {
    this._update();

    const vertices = this.vertices;
    const length = vertices.length;
    if (length < 2) {
      return this;
    }

    const points = [];
    let prevOriginal = null;
    let subpathStartOriginal = null;

    for (let i = 0; i < length; i += 1) {
      const currentOriginal = vertices[i];

      if (!prevOriginal || currentOriginal.command === Commands.move) {
        const clone = currentOriginal.clone();
        points.push(clone);
        prevOriginal = currentOriginal;
        subpathStartOriginal = currentOriginal;
        continue;
      }

      const isCurve = isSegmentCurved(currentOriginal, prevOriginal);

      if (isCurve) {
        const subdivided = getSubdivisions(currentOriginal, prevOriginal, limit);
        const steps = subdivided.length;
        const prevClone = points[points.length - 1];
        let startSegment = prevClone.clone();
        let endSegment = currentOriginal.clone();
        let prevCloneRef = prevClone;
        let prevT = 0;

        if (steps <= 1) {
          const currentClone = currentOriginal.clone();
          points.push(currentClone);
        } else {
          for (let j = 1; j < steps; j += 1) {
            const globalT = j / steps;
            const denom = 1 - prevT;
            const localT =
              denom <= Number.EPSILON ? globalT : (globalT - prevT) / denom;

            const split = splitSubdivisionSegment(
              startSegment,
              endSegment,
              localT
            );

            setHandleComponent(
              prevCloneRef,
              'right',
              split.startOut.x - prevCloneRef.x,
              split.startOut.y - prevCloneRef.y
            );

            const newAnchor = split.anchor;
            points.push(newAnchor);

            prevCloneRef = newAnchor;
            startSegment = newAnchor.clone();
            prevT = globalT;

            setHandleComponent(
              endSegment,
              'left',
              split.endIn.x - endSegment.x,
              split.endIn.y - endSegment.y
            );
          }

          const currentClone = currentOriginal.clone();
          currentClone.controls.left.copy(endSegment.controls.left);
          points.push(currentClone);
        }
      } else {
        const subdivided = getSubdivisions(currentOriginal, prevOriginal, limit);

        for (let j = 1; j < subdivided.length; j += 1) {
          const anchor = subdivided[j];
          inheritRelative(anchor, prevOriginal);
          clearHandleComponent(anchor, 'left');
          clearHandleComponent(anchor, 'right');
          anchor.command = Commands.line;
          points.push(anchor);
        }

        const currentClone = currentOriginal.clone();
        points.push(currentClone);
      }

      prevOriginal = currentOriginal;

      if (currentOriginal.command === Commands.close) {
        prevOriginal = subpathStartOriginal;
      }
    }

    this._automatic = false;
    this._curved = false;
    this.vertices = points;

    return this;
  }

  /**
   * @name Two.Path#_updateLength
   * @function
   * @private
   * @param {Number} [limit] -
   * @param {Boolean} [silent=false] - If set to `true` then the path isn't updated before calculation. Useful for internal use.
   * @description Recalculate the {@link Two.Path#length} value.
   */
  _updateLength(limit, silent) {
    // TODO: DRYness (function above)
    if (!silent) {
      this._update();
    }

    const length = this.vertices.length;
    const last = length - 1;
    const closed = false; //this._closed || this.vertices[last]._command === Commands.close;

    let b = this.vertices[last];
    let sum = 0;

    if (typeof this._lengths === 'undefined') {
      this._lengths = [];
    }

    _.each(
      this.vertices,
      function (a, i) {
        if ((i <= 0 && !closed) || a.command === Commands.move) {
          b = a;
          this._lengths[i] = 0;
          return;
        }

        this._lengths[i] = getCurveLength(a, b, limit);
        sum += this._lengths[i];

        b = a;
      },
      this
    );

    this._length = sum;
    this._flagLength = false;

    return this;
  }

  /**
   * @name Two.Path#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update() {
    if (this._flagVertices) {
      if (this._automatic) {
        this.plot();
      }

      if (this._flagLength) {
        this._updateLength(undefined, true);
      }

      const l = this._collection.length;
      const closed = this._closed;

      const beginning = Math.min(this._beginning, this._ending);
      const ending = Math.max(this._beginning, this._ending);

      const bid = getIdByLength(this, beginning * this._length);
      const eid = getIdByLength(this, ending * this._length);

      const low = ceil(bid);
      const high = floor(eid);

      let left, right, prev, next, v, i;

      this._renderer.vertices.length = 0;

      for (i = 0; i < l; i++) {
        if (this._renderer.collection.length <= i) {
          // Expected to be `relative` anchor points.
          this._renderer.collection.push(new Anchor());
        }

        if (i > high && !right) {
          v = this._renderer.collection[i].copy(this._collection[i]);
          this.getPointAt(ending, v);
          v.command = this._renderer.collection[i].command;
          this._renderer.vertices.push(v);

          right = v;
          prev = this._collection[i - 1];

          // Project control over the percentage `t`
          // of the in-between point
          if (prev && prev.controls) {
            if (v.relative) {
              v.controls.right.clear();
            } else {
              v.controls.right.copy(v);
            }

            if (prev.relative) {
              this._renderer.collection[i - 1].controls.right
                .copy(prev.controls.right)
                .lerp(Vector.zero, 1 - v.t);
            } else {
              this._renderer.collection[i - 1].controls.right
                .copy(prev.controls.right)
                .lerp(prev, 1 - v.t);
            }
          }
        } else if (i >= low && i <= high) {
          v = this._renderer.collection[i].copy(this._collection[i]);
          this._renderer.vertices.push(v);

          if (i === high && contains(this, ending)) {
            right = v;
            if (!closed && right.controls) {
              if (right.relative) {
                right.controls.right.clear();
              } else {
                right.controls.right.copy(right);
              }
            }
          } else if (i === low && contains(this, beginning)) {
            left = v;
            left.command = Commands.move;
            if (!closed && left.controls) {
              if (left.relative) {
                left.controls.left.clear();
              } else {
                left.controls.left.copy(left);
              }
            }
          }
        }
      }

      // Prepend the trimmed point if necessary.
      if (low > 0 && !left) {
        i = low - 1;

        v = this._renderer.collection[i].copy(this._collection[i]);
        this.getPointAt(beginning, v);
        v.command = Commands.move;
        this._renderer.vertices.unshift(v);

        next = this._collection[i + 1];

        // Project control over the percentage `t`
        // of the in-between point
        if (next && next.controls) {
          v.controls.left.clear();

          if (next.relative) {
            this._renderer.collection[i + 1].controls.left
              .copy(next.controls.left)
              .lerp(Vector.zero, v.t);
          } else {
            vector.copy(next);
            this._renderer.collection[i + 1].controls.left
              .copy(next.controls.left)
              .lerp(next, v.t);
          }
        }
      }
    }

    Shape.prototype._update.apply(this, arguments);

    return this;
  }

  /**
   * @name Two.Path#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    this._flagVertices =
      this._flagLength =
      this._flagFill =
      this._flagStroke =
      this._flagLinewidth =
      this._flagOpacity =
      this._flagVisible =
      this._flagCap =
      this._flagJoin =
      this._flagMiter =
      this._flagClip =
      this._flagStrokeAttenuation =
        false;

    Shape.prototype.flagReset.call(this);

    return this;
  }
}

const proto = {
  linewidth: {
    enumerable: true,
    get: function () {
      return this._linewidth;
    },
    set: function (v) {
      this._linewidth = v;
      this._flagLinewidth = true;
    },
  },
  opacity: {
    enumerable: true,
    get: function () {
      return this._opacity;
    },
    set: function (v) {
      this._opacity = v;
      this._flagOpacity = true;
    },
  },
  visible: {
    enumerable: true,
    get: function () {
      return this._visible;
    },
    set: function (v) {
      this._visible = v;
      this._flagVisible = true;
    },
  },
  cap: {
    enumerable: true,
    get: function () {
      return this._cap;
    },
    set: function (v) {
      this._cap = v;
      this._flagCap = true;
    },
  },
  join: {
    enumerable: true,
    get: function () {
      return this._join;
    },
    set: function (v) {
      this._join = v;
      this._flagJoin = true;
    },
  },
  miter: {
    enumerable: true,
    get: function () {
      return this._miter;
    },
    set: function (v) {
      this._miter = v;
      this._flagMiter = true;
    },
  },

  fill: {
    enumerable: true,
    get: function () {
      return this._fill;
    },
    set: function (f) {
      if (
        this._fill instanceof Gradient ||
        this._fill instanceof LinearGradient ||
        this._fill instanceof RadialGradient ||
        this._fill instanceof Texture
      ) {
        this._fill.unbind(Events.Types.change, this._renderer.flagFill);
      }

      this._fill = f;
      this._flagFill = true;

      if (
        this._fill instanceof Gradient ||
        this._fill instanceof LinearGradient ||
        this._fill instanceof RadialGradient ||
        this._fill instanceof Texture
      ) {
        this._fill.bind(Events.Types.change, this._renderer.flagFill);
      }
    },
  },

  stroke: {
    enumerable: true,
    get: function () {
      return this._stroke;
    },
    set: function (f) {
      if (
        this._stroke instanceof Gradient ||
        this._stroke instanceof LinearGradient ||
        this._stroke instanceof RadialGradient ||
        this._stroke instanceof Texture
      ) {
        this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
      }

      this._stroke = f;
      this._flagStroke = true;

      if (
        this._stroke instanceof Gradient ||
        this._stroke instanceof LinearGradient ||
        this._stroke instanceof RadialGradient ||
        this._stroke instanceof Texture
      ) {
        this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
      }
    },
  },

  /**
   * @name Two.Path#length
   * @property {Number} - The sum of distances between all {@link Two.Path#vertices}.
   */
  length: {
    get: function () {
      if (this._flagLength) {
        this._updateLength();
      }
      return this._length;
    },
  },

  closed: {
    enumerable: true,
    get: function () {
      return this._closed;
    },
    set: function (v) {
      this._closed = !!v;
      this._flagVertices = true;
    },
  },

  curved: {
    enumerable: true,
    get: function () {
      return this._curved;
    },
    set: function (v) {
      this._curved = !!v;
      this._flagVertices = true;
    },
  },

  automatic: {
    enumerable: true,
    get: function () {
      return this._automatic;
    },
    set: function (v) {
      if (v === this._automatic) {
        return;
      }
      this._automatic = !!v;
      const method = this._automatic ? 'ignore' : 'listen';
      _.each(this.vertices, function (v) {
        v[method]();
      });
    },
  },

  beginning: {
    enumerable: true,
    get: function () {
      return this._beginning;
    },
    set: function (v) {
      this._beginning = v;
      this._flagVertices = true;
    },
  },

  ending: {
    enumerable: true,
    get: function () {
      return this._ending;
    },
    set: function (v) {
      this._ending = v;
      this._flagVertices = true;
    },
  },

  vertices: {
    enumerable: true,

    get: function () {
      return this._collection;
    },

    set: function (vertices) {
      const bindVertices = this._renderer.bindVertices;
      const unbindVertices = this._renderer.unbindVertices;

      // Remove previous listeners
      if (this._collection) {
        this._collection
          .unbind(Events.Types.insert, bindVertices)
          .unbind(Events.Types.remove, unbindVertices);
      }

      // Create new Collection with copy of vertices
      if (vertices instanceof Collection) {
        this._collection = vertices;
      } else {
        this._collection = new Collection(vertices || []);
      }

      // Listen for Collection changes and bind / unbind
      this._collection
        .bind(Events.Types.insert, bindVertices)
        .bind(Events.Types.remove, unbindVertices);

      // Bind Initial Vertices
      bindVertices(this._collection);
    },
  },

  /**
   * @name Two.Path#mask
   * @property {Two.Shape} - The shape whose alpha property becomes a clipping area for the path.
   * @nota-bene This property is currently not working because of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
   */
  mask: {
    enumerable: true,

    get: function () {
      return this._mask;
    },

    set: function (v) {
      this._mask = v;
      this._flagMask = true;
      if (_.isObject(v) && !v.clip) {
        v.clip = true;
      }
    },
  },

  /**
   * @name Two.Path#clip
   * @property {Boolean} - Tells Two.js renderer if this object represents a mask for another object (or not).
   */
  clip: {
    enumerable: true,
    get: function () {
      return this._clip;
    },
    set: function (v) {
      this._clip = v;
      this._flagClip = true;
    },
  },

  dashes: {
    enumerable: true,
    get: function () {
      return this._dashes;
    },
    set: function (v) {
      if (typeof v.offset !== 'number') {
        v.offset = (this.dashes && this._dashes.offset) || 0;
      }
      this._dashes = v;
    },
  },

  /**
   * @name Two.Path#strokeAttenuation
   * @property {Boolean} - When set to `true`, stroke width scales with transformations (default behavior). When `false`, stroke width remains constant in screen space.
   * @description When `strokeAttenuation` is `false`, the stroke width is automatically adjusted to compensate for the object's world transform scale, maintaining constant visual thickness regardless of zoom level. When `true` (default), stroke width scales normally with transformations.
   */
  strokeAttenuation: {
    enumerable: true,
    get: function () {
      return this._strokeAttenuation;
    },
    set: function (v) {
      this._strokeAttenuation = !!v;
      this._flagStrokeAttenuation = true;
      this._flagLinewidth = true;
    },
  },
};

// Utility functions

/**
 * @name FlagVertices
 * @private
 * @function
 * @description Cached method to let renderers know vertices have been updated on a {@link Two.Path}.
 */
function FlagVertices() {
  this._flagVertices = true;
  this._flagLength = true;
  if (this.parent) {
    this.parent._flagLength = true;
  }
}

/**
 * @name BindVertices
 * @private
 * @function
 * @description Cached method to let {@link Two.Path} know vertices have been added to the instance.
 */
function BindVertices(items) {
  // This function is called a lot
  // when importing a large SVG
  let i = items.length;
  while (i--) {
    items[i].bind(Events.Types.change, this._renderer.flagVertices);
  }

  this._renderer.flagVertices();
}

/**
 * @name UnbindVertices
 * @private
 * @function
 * @description Cached method to let {@link Two.Path} know vertices have been removed from the instance.
 */
function UnbindVertices(items) {
  let i = items.length;
  while (i--) {
    items[i].unbind(Events.Types.change, this._renderer.flagVertices);
  }

  this._renderer.flagVertices();
}

/**
 * @name FlagFill
 * @private
 * @function
 * @description Cached method to let {@link Two.Path} know the fill has changed.
 */
function FlagFill() {
  this._flagFill = true;
}

/**
 * @name FlagFill
 * @private
 * @function
 * @description Cached method to let {@link Two.Path} know the stroke has changed.
 */
function FlagStroke() {
  this._flagStroke = true;
}

export { FlagVertices, BindVertices, UnbindVertices, FlagFill, FlagStroke };
