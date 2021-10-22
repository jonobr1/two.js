import { _ } from '../utils/underscore.js';
import { Events } from '../events.js';

/**
 * @name Two.Stop
 * @class
 * @param {Number} [offset] - The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created.
 * @param {String} [color] - The color of the stop. Default value flip flops from white to black as new stops are created.
 * @param {Number} [opacity] - The opacity value. Default value is 1, cannot be lower than 0.
 * @nota-bene Used specifically in conjunction with {@link Two.Gradient}s to control color graduation.
 */
export class Stop extends Events {

  constructor(offset, color, opacity) {

    super();

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    /**
     * @name Two.Stop#renderer
     * @property {Object}
     * @description Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
     * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
     */
    this.renderer = {};
    this._renderer.type = 'stop';

    /**
     * @name Two.Stop#offset
     * @property {Number} - The offset percentage of the stop represented as a zero-to-one value.
     */
    this.offset = typeof offset === 'number' ? offset
      : Stop.Index <= 0 ? 0 : 1;

    /**
     * @name Two.Stop#opacity
     * @property {Number} - The alpha percentage of the stop represented as a zero-to-one value.
     */
    this.opacity = typeof opacity === 'number' ? opacity : 1;

    /**
     * @name Two.Stop#color
     * @property {String} - The color of the stop.
     */
    this.color = (typeof color === 'string') ? color
      : Stop.Index <= 0 ? '#fff' : '#000';

    Stop.Index = (Stop.Index + 1) % 2;

  }

  /**
   * @name Two.Stop.Index
   * @property {Number} - The current index being referenced for calculating a stop's default offset value.
   */
  static Index = 0;

  /**
   * @name Two.Stop.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Stop}.
   */
  static Properties = ['offset', 'opacity', 'color'];

  /**
   * @name Two.Stop#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Stop}
   * @description Create a new instance of {@link Two.Stop} with the same properties of the current path.
   */
  clone() {

    const clone = new Stop();

    _.each(Stop.Properties, function(property) {
      clone[property] = this[property];
    }, this);

    return clone;

  }

  /**
   * @name Two.Stop#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject() {

    const result = {};

    _.each(Stop.Properties, function(k) {
      result[k] = this[k];
    }, this);

    return result;

  }

  /**
   * @name Two.Stop#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {

    this._flagOffset = this._flagColor = this._flagOpacity = false;

    return this;

  }

}

const proto = {
  offset: {
    enumerable: true,
    get: function() {
      return this._offset;
    },
    set: function(v) {
      this._offset = v;
      this._flagOffset = v;
      if (this.parent) {
        this.parent._flagStops = true;
      }
    }
  },
  opacity: {
    enumerable: true,
    get: function() {
      return this._opacity;
    },
    set: function(v) {
      this._opacity = v;
      this._flagOpacity = v;
      if (this.parent) {
        this.parent._flagStops = true;
      }
    }
  },
  color: {
    enumerable: true,
    get: function() {
      return this._color;
    },
    set: function(v) {
      this._color = v;
      this._flagColor = v;
      if (this.parent) {
        this.parent._flagStops = true;
      }
    }
  },
  renderer: {
    enumerable: false,
    get: function() {
      return this._renderer;
    },
    set: function(obj) {
      this._renderer = obj;
    }
  }
};
