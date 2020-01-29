import {getComputedMatrix} from './utils/math.js';
import Events from './events.js';
import defineGetterSetter from './utils/get-set.js';
import _ from './utils/dash.js';

import Shape from './shape.js';

import {Gradient} from './effects/gradient.js';
import LinearGradient from './effects/linear-gradient.js';
import RadialGradient from './effects/radial-gradient.js';
import Texture from './effects/texture.js';

/**
 * @name Two.Text
 * @class
 * @extends Two.Shape
 * @param {String} message - The String to be rendered to the scene.
 * @param {Number} [x=0] - The position in the x direction for the object.
 * @param {Number} [y=0] - The position in the y direction for the object.
 * @param {Object} [styles] - An object where styles are applied. Attribute must exist in Two.Text.Properties.
 * @description This is a primitive class for creating drawable text that can be added to the scenegraph.
 */
var Text = function(message, x, y, styles) {

  Shape.call(this);

  this._renderer.type = 'text';
  this._renderer.flagFill = Text.FlagFill.bind(this);
  this._renderer.flagStroke = Text.FlagStroke.bind(this);

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

  _.each(Text.Properties, function(property) {

    if (property in styles) {
      this[property] = styles[property];
    }

  }, this);

};

_.extend(Text, {

  /**
   * @name Two.Text.Ratio
   * @property {Number} - Approximate aspect ratio of a typeface's character width to height.
   */
  Ratio: 0.6,

  /**
   * @name Two.Text.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Text}.
   */
  Properties: [
    'value', 'family', 'size', 'leading', 'alignment', 'linewidth', 'style',
    'className', 'weight', 'decoration', 'baseline', 'opacity', 'visible',
    'fill', 'stroke',
  ],

  /**
   * @name Two.Text.FlagFill
   * @function
   * @description Cached method to let renderers know the fill property have been updated on a {@link Two.Text}.
   */
  FlagFill: function() {
    this._flagFill = true;
  },

  /**
   * @name Two.Text.FlagStroke
   * @function
   * @description Cached method to let renderers know the stroke property have been updated on a {@link Two.Text}.
   */
  FlagStroke: function() {
    this._flagStroke = true;
  },

  MakeObservable: function(object) {

    Shape.MakeObservable(object);

    _.each(Text.Properties.slice(0, 13), defineGetterSetter, object);

    Object.defineProperty(object, 'fill', {
      enumerable: true,
      get: function() {
        return this._fill;
      },
      set: function(f) {

        if (this._fill instanceof Gradient
          || this._fill instanceof LinearGradient
          || this._fill instanceof RadialGradient
          || this._fill instanceof Texture) {
          this._fill.unbind(Events.Types.change, this._renderer.flagFill);
        }

        this._fill = f;
        this._flagFill = true;

        if (this._fill instanceof Gradient
          || this._fill instanceof LinearGradient
          || this._fill instanceof RadialGradient
          || this._fill instanceof Texture) {
          this._fill.bind(Events.Types.change, this._renderer.flagFill);
        }

      }
    });

    Object.defineProperty(object, 'stroke', {
      enumerable: true,
      get: function() {
        return this._stroke;
      },
      set: function(f) {

        if (this._stroke instanceof Gradient
          || this._stroke instanceof LinearGradient
          || this._stroke instanceof RadialGradient
          || this._stroke instanceof Texture) {
          this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
        }

        this._stroke = f;
        this._flagStroke = true;

        if (this._stroke instanceof Gradient
          || this._stroke instanceof LinearGradient
          || this._stroke instanceof RadialGradient
          || this._stroke instanceof Texture) {
          this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
        }

      }
    });

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

    Object.defineProperty(object, 'dashes', {
      enumerable: true,
      get: function() {
        return this._dashes;
      },
      set: function(v) {
        if (typeof v.offset !== 'number') {
          v.offset = this._dashes.offset || 0;
        }
        this._dashes = v;
      }
    });

  }

});

_.extend(Text.prototype, Shape.prototype, {

  // Flags
  // http://en.wikipedia.org/wiki/Flag

  /**
   * @name Two.Text#_flagValue
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#value} need updating.
   */
  _flagValue: true,

  /**
   * @name Two.Text#_flagFamily
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#family} need updating.
   */
  _flagFamily: true,

  /**
   * @name Two.Text#_flagSize
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#size} need updating.
   */
  _flagSize: true,

  /**
   * @name Two.Text#_flagLeading
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#leading} need updating.
   */
  _flagLeading: true,

  /**
   * @name Two.Text#_flagAlignment
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#alignment} need updating.
   */
  _flagAlignment: true,

  /**
   * @name Two.Text#_flagBaseline
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#baseline} need updating.
   */
  _flagBaseline: true,

  /**
   * @name Two.Text#_flagStyle
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#style} need updating.
   */
  _flagStyle: true,

  /**
   * @name Two.Text#_flagWeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#weight} need updating.
   */
  _flagWeight: true,

  /**
   * @name Two.Text#_flagDecoration
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#decoration} need updating.
   */
  _flagDecoration: true,

  /**
   * @name Two.Text#_flagFill
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#fill} need updating.
   */
  _flagFill: true,

  /**
   * @name Two.Text#_flagStroke
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#stroke} need updating.
   */
  _flagStroke: true,

  /**
   * @name Two.Text#_flagLinewidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#linewidth} need updating.
   */
  _flagLinewidth: true,

  /**
   * @name Two.Text#_flagOpacity
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#opacity} need updating.
   */
  _flagOpacity: true,

  /**
   * @name Two.Text#_flagClassName
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#className} need updating.
   */
  _flagClassName: true,

  /**
   * @name Two.Text#_flagVisible
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#visible} need updating.
   */
  _flagVisible: true,

  /**
   * @name Two.Text#_flagClip
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Text#clip} need updating.
   */
  _flagClip: false,

  // Underlying Properties

  /**
   * @name Two.Text#value
   * @property {String} - The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.
   */
  _value: '',

  /**
   * @name Two.Text#family
   * @property {String} - The font family Two.js should attempt to regsiter for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.
   */
  _family: 'sans-serif',

  /**
   * @name Two.Text#size
   * @property {Number} - The font size in Two.js point space. Defaults to `13`.
   */
  _size: 13,

  /**
   * @name Two.Text#leading
   * @property {Number} - The height between lines measured from base to base in Two.js point space. Defaults to `17`.
   */
  _leading: 17,

  /**
   * @name Two.Text#alignment
   * @property {String} - Alignment of text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.
   */
  _alignment: 'center',

  /**
   * @name Two.Text#baseline
   * @property {String} - The vertical aligment of the text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.
   */
  _baseline: 'middle',

  /**
   * @name Two.Text#style
   * @property {String} - The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.
   */
  _style: 'normal',

  /**
   * @name Two.Text#weight
   * @property {Number} - A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.
   */
  _weight: 500,

  /**
   * @name Two.Text#decoration
   * @property {String} - String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.
   */
  _decoration: 'none',

  /**
   * @name Two.Text#fill
   * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
   */
  _fill: '#000',

  /**
   * @name Two.Text#stroke
   * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
   */
  _stroke: 'transparent',

  /**
   * @name Two.Text#linewidth
   * @property {Number} - The thickness in pixels of the stroke.
   */
  _linewidth: 1,

  /**
   * @name Two.Text#opacity
   * @property {Number} - The opaqueness of the text object.
   * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
   */
  _opacity: 1,

  /**
   * @name Two.Text#className
   * @property {String} - A class to be applied to the element to be compatible with CSS styling. Only available for the {@link Two.SvgRenderer}.
   */
  _className: '',

  /**
   * @name Two.Text#visible
   * @property {Boolean} - Display the text object or not.
   * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
   */
  _visible: true,

  /**
   * @name Two.Text#clip
   * @property {Two.Shape} - Object to define clipping area.
   * @nota-bene This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
   */
  _clip: false,

  /**
   * @name Two.Text#_dashes
   * @private
   * @see {@link Two.Text#dashes}
   */
  _dashes: [],

  constructor: Text,

  /**
   * @name Two.Text#remove
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
   * @name Two.Text#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Text}
   * @description Create a new instance of {@link Two.Text} with the same properties of the current text object.
   */
  clone: function(parent) {

    var clone = new Text(this.value);
    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;

    _.each(Text.Properties, function(property) {
      clone[property] = this[property];
    }, this);

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();

  },

  /**
   * @name Two.Text#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the text object.
   */
  toObject: function() {

    var result = {
      translation: this.translation.toObject(),
      rotation: this.rotation,
      scale: this.scale
    };

    if (this.matrix.manual) {
      result.matrix = this.matrix.toObject();
    }

    _.each(Text.Properties, function(property) {
      result[property] = this[property];
    }, this);

    return result;

  },

  /**
   * @name Two.Text#noFill
   * @function
   * @description Short hand method to set fill to `transparent`.
   */
  noFill: function() {
    this.fill = 'transparent';
    return this;
  },

  /**
   * @name Two.Text#noStroke
   * @function
   * @description Short hand method to set stroke to `transparent`.
   */
  noStroke: function() {
    this.stroke = undefined;
    this.linewidth = undefined;
    return this;
  },

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
  getBoundingClientRect: function(shallow) {

    var matrix, border, l, x, y, i, v;
    var left, right, top, bottom;

    // TODO: Update this to not __always__ update. Just when it needs to.
    this._update(true);

    matrix = shallow ? this._matrix : getComputedMatrix(this);

    var height = this.leading;
    var width = this.value.length * this.size * Text.Ratio;

    switch (this.alignment) {
      case 'left':
        left = 0;
        right = width;
        break;
      case 'right':
        left = - width;
        right = 0;
        break;
      default:
        left = - width / 2;
        right = width / 2;
    }

    switch (this.baseline) {
      case 'top':
        top = 0;
        bottom = height;
        break;
      case 'bottom':
        top = - height;
        bottom = 0;
        break;
      default:
        top = - height / 2;
        bottom = height / 2;
    }

    v = matrix.multiply(left, top, 1);

    top = v.y;
    left = v.x;

    v = matrix.multiply(right, bottom, 1);

    right = v.x;
    bottom = v.y;

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
   * @name Two.Text#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagValue = this._flagFamily = this._flagSize =
      this._flagLeading = this._flagAlignment = this._flagFill =
      this._flagStroke = this._flagLinewidth = this._flagOpacity =
      this._flagVisible = this._flagClip = this._flagDecoration =
      this._flagClassName = this._flagBaseline = false;

    Shape.prototype.flagReset.call(this);

    return this;

  }

});

Text.MakeObservable(Text.prototype);

export default Text;