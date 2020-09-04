import _ from '../utils/underscore.js';
import Events from '../events.js';

/**
 * @name Two.Stop
 * @class
 * @param {Number} [offset] - The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created.
 * @param {CssColor} [color] - The color of the stop. Default value flip flops from white to black as new stops are created.
 * @param {Number} [opacity] - The opacity value. Default value is 1, cannot be lower than 0.
 * @nota-bene Used specifically in conjunction with {@link Two.Gradient}s to control color graduation.
 */
var Stop = function(offset, color, opacity) {

  /**
   * @name Two.Stop#_renderer
   * @property {Object}
   * @private
   * @description A private object to store relevant renderer specific variables.
   * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `stop._renderer.elem`.
   */
  this._renderer = {};
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
   * @property {CssColor} - The color of the stop.
   */
  this.color = (typeof color === 'string') ? color
    : Stop.Index <= 0 ? '#fff' : '#000';

  Stop.Index = (Stop.Index + 1) % 2;

};

_.extend(Stop, {

  /**
   * @name Two.Stop.Index
   * @property {Number} - The current index being referenced for calculating a stop's default offset value.
   */
  Index: 0,

  /**
   * @name Two.Stop.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Stop}.
   */
  Properties: [
    'offset',
    'opacity',
    'color'
  ],

  /**
   * @name Two.Stop.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Stop} to any object. Handy if you'd like to extend the {@link Two.Stop} class on a custom class.
   */
  MakeObservable: function(object) {

    _.each(Stop.Properties, function(property) {

      var object = this;
      var secret = '_' + property;
      var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

      Object.defineProperty(object, property, {
        enumerable: true,
        get: function() {
          return this[secret];
        },
        set: function(v) {
          this[secret] = v;
          this[flag] = true;
          if (this.parent) {
            this.parent._flagStops = true;
          }
        }
      });

    }, object);

  }

});

_.extend(Stop.prototype, Events, {

  constructor: Stop,

  /**
   * @name Two.Stop#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Stop}
   * @description Create a new instance of {@link Two.Stop} with the same properties of the current path.
   */
  clone: function() {

    var clone = new Stop();

    _.each(Stop.Properties, function(property) {
      clone[property] = this[property];
    }, this);

    return clone;

  },

  /**
   * @name Two.Stop#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var result = {};

    _.each(Stop.Properties, function(k) {
      result[k] = this[k];
    }, this);

    return result;

  },

  /**
   * @name Two.Stop#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagOffset = this._flagColor = this._flagOpacity = false;

    return this;

  }

});

Stop.MakeObservable(Stop.prototype);
Stop.prototype.constructor = Stop;

export default Stop;
