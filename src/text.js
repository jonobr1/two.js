import { Events } from './events.js';
import { _ } from './utils/underscore.js';

import { Shape } from './shape.js';

import { Gradient } from './effects/gradient.js';
import { LinearGradient } from './effects/linear-gradient.js';
import { RadialGradient } from './effects/radial-gradient.js';
import { Texture } from './effects/texture.js';
import { root } from './utils/root.js';
import { getEffectFromObject } from './utils/shape.js';

let canvas;
const min = Math.min,
  max = Math.max;

if (root.document) {
  canvas = document.createElement('canvas');
}

/**
 * @name Two.Text
 * @class
 * @extends Two.Shape
 * @param {String} [message] - The String to be rendered to the scene.
 * @param {Number} [x=0] - The position in the x direction for the object.
 * @param {Number} [y=0] - The position in the y direction for the object.
 * @param {Object} [styles] - An object where styles are applied. Attribute must exist in Two.Text.Properties.
 * @description This is a primitive class for creating drawable text that can be added to the scenegraph.
 * @returns {Two.Text}
 */
export class Text extends Shape {
  /**
   * @name Two.Text#_flagValue
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#value} need updating.
   */
  _flagValue = true;

  /**
   * @name Two.Text#_flagFamily
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#family} need updating.
   */
  _flagFamily = true;

  /**
   * @name Two.Text#_flagSize
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#size} need updating.
   */
  _flagSize = true;

  /**
   * @name Two.Text#_flagLeading
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#leading} need updating.
   */
  _flagLeading = true;

  /**
   * @name Two.Text#_flagAlignment
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#alignment} need updating.
   */
  _flagAlignment = true;

  /**
   * @name Two.Text#_flagBaseline
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#baseline} need updating.
   */
  _flagBaseline = true;

  /**
   * @name Two.Text#_flagStyle
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#style} need updating.
   */
  _flagStyle = true;

  /**
   * @name Two.Text#_flagWeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#weight} need updating.
   */
  _flagWeight = true;

  /**
   * @name Two.Text#_flagDecoration
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#decoration} need updating.
   */
  _flagDecoration = true;

  /**
   * @name Two.Text#_flagFill
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#fill} need updating.
   */
  _flagFill = true;

  /**
   * @name Two.Text#_flagStroke
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#stroke} need updating.
   */
  _flagStroke = true;

  /**
   * @name Two.Text#_flagLinewidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#linewidth} need updating.
   */
  _flagLinewidth = true;

  /**
   * @name Two.Text#_flagOpacity
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#opacity} need updating.
   */
  _flagOpacity = true;

  /**
   * @name Two.Text#_flagVisible
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#visible} need updating.
   */
  _flagVisible = true;

  /**
   * @name Two.Text#_flagMask
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#mask} needs updating.
   */
  _flagMask = false;

  /**
   * @name Two.Text#_flagClip
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#clip} needs updating.
   */
  _flagClip = false;

  /**
   * @name Two.Text#_flagDirection
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#direction} needs updating.
   */
  _flagDirection = true;

  /**
   * @name Two.Text#_flagStrokeAttenuation
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#strokeAttenuation} needs updating.
   */
  _flagStrokeAttenuation = true;

  // Underlying Properties

  /**
   * @name Two.Text#value
   * @property {String} - The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.
   */
  _value = '';

  /**
   * @name Two.Text#family
   * @property {String} - The font family Two.js should attempt to register for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.
   */
  _family = 'sans-serif';

  /**
   * @name Two.Text#size
   * @property {Number} - The font size in Two.js point space. Defaults to `13`.
   */
  _size = 13;

  /**
   * @name Two.Text#leading
   * @property {Number} - The height between lines measured from base to base in Two.js point space. Defaults to `17`.
   */
  _leading = 17;

  /**
   * @name Two.Text#alignment
   * @property {String} - Alignment of text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.
   */
  _alignment = 'center';

  /**
   * @name Two.Text#baseline
   * @property {String} - The vertical aligment of the text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.
   * @nota-bene In headless environments where the canvas is based on {@link https://github.com/Automattic/node-canvas}, `baseline` seems to be the only valid property.
   */
  _baseline = 'middle';

  /**
   * @name Two.Text#style
   * @property {String} - The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.
   */
  _style = 'normal';

  /**
   * @name Two.Text#weight
   * @property {Number} - A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.
   */
  _weight = 500;

  /**
   * @name Two.Text#decoration
   * @property {String} - String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.
   */
  _decoration = 'none';

  /**
   * @name Two.Text#direction
   * @property {String} - String to determine what direction the text should run. Possibly values are `'ltr'` for left-to-right and `'rtl'` for right-to-left. Defaults to `'ltr'`.
   */
  _direction = 'ltr';

  /**
   * @name Two.Text#fill
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  _fill = '#000';

  /**
   * @name Two.Text#stroke
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  _stroke = 'none';

  /**
   * @name Two.Text#linewidth
   * @property {Number} - The thickness in pixels of the stroke.
   */
  _linewidth = 1;

  /**
   * @name Two.Text#opacity
   * @property {Number} - The opaqueness of the text object.
   * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
   */
  _opacity = 1;

  /**
   * @name Two.Text#visible
   * @property {Boolean} - Display the text object or not.
   * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
   */
  _visible = true;

  /**
   * @name Two.Text#mask
   * @property {Two.Shape} - The shape whose alpha property becomes a clipping area for the text.
   * @nota-bene This property is currently not working because of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
   */
  _mask = null;

  /**
   * @name Two.Text#clip
   * @property {Two.Shape} - Object to define clipping area.
   * @nota-bene This property is currently not working because of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
   */
  _clip = false;

  /**
   * @name Two.Text#_dashes
   * @private
   * @see {@link Two.Text#dashes}
   */
  _dashes = null;

  /**
   * @name Two.Text#_strokeAttenuation
   * @private
   * @see {@link Two.Text#strokeAttenuation}
   */
  _strokeAttenuation = true;

  constructor(message, x, y, styles) {
    super();

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this._renderer.type = 'text';
    this._renderer.flagFill = FlagFill.bind(this);
    this._renderer.flagStroke = FlagStroke.bind(this);

    this.value = message;

    if (typeof x === 'number') {
      this.translation.x = x;
    }
    if (typeof y === 'number') {
      this.translation.y = y;
    }

    /**
     * @name Two.Text#dashes
     * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
     * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
     */
    this.dashes = [];

    /**
     * @name Two.Text#dashes#offset
     * @property {Number} - A number in pixels to offset {@link Two.Text#dashes} display.
     */
    this.dashes.offset = 0;

    if (!_.isObject(styles)) {
      return this;
    }

    for (let i = 0; i < Text.Properties.length; i++) {
      const property = Text.Properties[i];
      if (property in styles) {
        this[property] = styles[property];
      }
    }
  }

  /**
   * @name Two.Text.Ratio
   * @property {Number} - Approximate aspect ratio of a typeface's character width to height.
   */
  static Ratio = 0.6;

  /**
   * @name Two.Text.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Text}.
   */
  static Properties = [
    'value',
    'family',
    'size',
    'leading',
    'alignment',
    'linewidth',
    'style',
    'weight',
    'decoration',
    'direction',
    'baseline',
    'opacity',
    'visible',
    'fill',
    'stroke',
    'dashes',
    'strokeAttenuation',
  ];

  /**
   *
   * @name Two.Measure
   * @function
   * @param {Two.Text} [text] - The instance of {@link Two.Text} to measure.
   * @returns {Object} - The width and height of the {@link Two.Text} instance.
   */
  static Measure(text) {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.font = [
        text._style,
        text._weight,
        `${text._size}px/${text._leading}px`,
        text._family,
      ].join(' ');
      const metrics = ctx.measureText(text.value, 0, 0);
      const height =
        metrics.actualBoundingBoxDescent + metrics.actualBoundingBoxAscent;
      return {
        width: metrics.width,
        height,
      };
    } else {
      const width = this.value.length * this.size * Text.Ratio;
      const height = this.leading;
      console.warn(
        'Two.Text: unable to accurately measure text, so using an approximation.'
      );
      return {
        width,
        height,
      };
    }
  }

  /**
   * @name Two.Text.fromObject
   * @function
   * @param {Object} obj - Object notation of a {@link Two.Text} to create a new instance
   * @returns {Two.Text}
   * @description Create a new {@link Two.Text} from an object notation of a {@link Two.Text}.
   * @nota-bene Works in conjunction with {@link Two.Text#toObject}
   */
  static fromObject(obj) {
    const fill =
      typeof obj.fill === 'string' ? obj.fill : getEffectFromObject(obj.fill);
    const stroke =
      typeof obj.stroke === 'string'
        ? obj.stroke
        : getEffectFromObject(obj.stroke);
    const text = new Text().copy({ ...obj, fill, stroke });

    if ('id' in obj) {
      text.id = obj.id;
    }

    return text;
  }

  /**
   * @name Two.Text#copy
   * @function
   * @param {Two.Text} text
   * @description Copy the properties of one {@link Two.Text} onto another.
   */
  copy(text) {
    super.copy.call(this, text);

    for (let i = 0; i < Text.Properties.length; i++) {
      const k = Text.Properties[i];
      if (k in text) {
        this[k] = text[k];
      }
    }

    return this;
  }

  /**
   * @name Two.Text#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Text}
   * @description Create a new instance of {@link Two.Text} with the same properties of the current text object.
   */
  clone(parent) {
    const clone = new Text(this.value);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;

    for (let i = 0; i < Text.Properties.length; i++) {
      const prop = Text.Properties[i];
      clone[prop] = this[prop];
    }

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();
  }

  /**
   * @name Two.Text#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the text object.
   * @nota-bene Works in conjunction with {@link Two.Text.fromObject}
   */
  toObject() {
    const result = super.toObject.call(this);
    result.renderer.type = 'text';

    for (let i = 0; i < Text.Properties.length; i++) {
      const prop = Text.Properties[i];
      result[prop] = this[prop];
    }

    return result;
  }

  /**
   * @name Two.Text#dispose
   * @function
   * @returns {Two.Text}
   * @description Release the text's renderer resources and detach all events.
   * This method disposes fill and stroke effects (calling dispose() on
   * Gradients and Textures for thorough cleanup) while preserving the
   * renderer type for potential re-attachment to a new renderer.
   */
  dispose() {
    // Call parent dispose to preserve renderer type and unbind events
    super.dispose();

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
   * @name Two.Text#noFill
   * @function
   * @description Short hand method to set fill to `none`.
   */
  noFill() {
    this.fill = 'none';
    return this;
  }

  /**
   * @name Two.Text#noStroke
   * @function
   * @description Short hand method to set stroke to `none`.
   */
  noStroke() {
    this.stroke = 'none';
    this.linewidth = 0;
    return this;
  }

  // A shim to not break `getBoundingClientRect` calls.
  // TODO: Implement a way to calculate proper bounding
  // boxes of `Two.Text`.

  /**
   * @name Two.Text#getBoundingClientRect
   * @function
   * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
   * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
   * @description Return an object with top, left, right, bottom, width, and height parameters of the text object.
   */
  getBoundingClientRect(shallow) {
    let matrix;
    let left, right, top, bottom;

    // TODO: Update this to not __always__ update. Just when it needs to.
    this._update(true);

    matrix = shallow ? this.matrix : this.worldMatrix;

    const { width, height } = Text.Measure(this);
    const border = (this._linewidth || 0) / 2;

    switch (this.alignment) {
      case 'left':
        left = -border;
        right = width + border;
        break;
      case 'right':
        left = -(width + border);
        right = border;
        break;
      default:
        left = -(width / 2 + border);
        right = width / 2 + border;
    }

    switch (this.baseline) {
      case 'middle':
        top = -(height / 2 + border);
        bottom = height / 2 + border;
        break;
      default:
        top = -(height + border);
        bottom = border;
    }

    const [ax, ay] = matrix.multiply(left, top);
    const [bx, by] = matrix.multiply(left, bottom);
    const [cx, cy] = matrix.multiply(right, top);
    const [dx, dy] = matrix.multiply(right, bottom);

    top = min(ay, by, cy, dy);
    left = min(ax, bx, cx, dx);
    right = max(ax, bx, cx, dx);
    bottom = max(ay, by, cy, dy);

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
   * @name Two.Text#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    super.flagReset.call(this);

    this._flagValue =
      this._flagFamily =
      this._flagSize =
      this._flagLeading =
      this._flagAlignment =
      this._flagFill =
      this._flagStroke =
      this._flagLinewidth =
      this._flagOpacity =
      this._flagVisible =
      this._flagClip =
      this._flagDecoration =
      this._flagClassName =
      this._flagBaseline =
      this._flagWeight =
      this._flagStyle =
      this._flagDirection =
        false;

    return this;
  }
}

const proto = {
  value: {
    enumerable: true,
    get: function () {
      return this._value;
    },
    set: function (v) {
      this._value = v;
      this._flagValue = true;
    },
  },
  family: {
    enumerable: true,
    get: function () {
      return this._family;
    },
    set: function (v) {
      this._family = v;
      this._flagFamily = true;
    },
  },
  size: {
    enumerable: true,
    get: function () {
      return this._size;
    },
    set: function (v) {
      this._size = v;
      this._flagSize = true;
    },
  },
  leading: {
    enumerable: true,
    get: function () {
      return this._leading;
    },
    set: function (v) {
      this._leading = v;
      this._flagLeading = true;
    },
  },
  alignment: {
    enumerable: true,
    get: function () {
      return this._alignment;
    },
    set: function (v) {
      this._alignment = v;
      this._flagAlignment = true;
    },
  },
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
  style: {
    enumerable: true,
    get: function () {
      return this._style;
    },
    set: function (v) {
      this._style = v;
      this._flagStyle = true;
    },
  },
  weight: {
    enumerable: true,
    get: function () {
      return this._weight;
    },
    set: function (v) {
      this._weight = v;
      this._flagWeight = true;
    },
  },
  decoration: {
    enumerable: true,
    get: function () {
      return this._decoration;
    },
    set: function (v) {
      this._decoration = v;
      this._flagDecoration = true;
    },
  },
  direction: {
    enumerable: true,
    get: function () {
      return this._direction;
    },
    set: function (v) {
      this._direction = v;
      this._flagDirection = true;
    },
  },
  baseline: {
    enumerable: true,
    get: function () {
      return this._baseline;
    },
    set: function (v) {
      this._baseline = v;
      this._flagBaseline = true;
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
   * @name Two.Text#strokeAttenuation
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

/**
 * @name Two.Text.FlagFill
 * @function
 * @private
 * @description Cached method to let renderers know the fill property have been updated on a {@link Two.Text}.
 */
function FlagFill() {
  this._flagFill = true;
}

/**
 * @name Two.Text.FlagStroke
 * @function
 * @private
 * @description Cached method to let renderers know the stroke property have been updated on a {@link Two.Text}.
 */
function FlagStroke() {
  this._flagStroke = true;
}
