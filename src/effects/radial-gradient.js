import Events from '../events.js';
import defineGetterSetter from '../utils/get-set.js';
import _ from '../utils/underscore.js';

import Stop from './stop.js';
import Gradient from './gradient.js';
import Vector from '../vector.js';

/**
 * @name Two.RadialGradient
 * @class
 * @extends Two.Gradient
 * @param {Number} [x=0] - The x position of the origin of the radial gradient.
 * @param {Number} [y=0] - The y position of the origin of the radial gradient.
 * @param {Number} [radius=0] - The radius of the radial gradient.
 * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
 * @param {Number} [focalX=0] - The x position of the focal point on the radial gradient.
 * @param {Number} [focalY=0] - The y position of the focal point on the radial gradient.
 * @nota-bene The radial gradient lives within the space of the parent object's matrix space.
 */
function RadialGradient(cx, cy, r, stops, fx, fy) {

  Gradient.call(this, stops);

  this._renderer.type = 'radial-gradient';

  /**
   * @name Two.RadialGradient#center
   * @property {Two.Vector} - The x and y value for where the origin of the radial gradient is.
   */
  this.center = new Vector()
    .bind(Events.Types.change, (function() {
      this._flagCenter = true;
    }).bind(this));

  this.radius = typeof r === 'number' ? r : 20;

  /**
   * @name Two.RadialGradient#focal
   * @property {Two.Vector} - The x and y value for where the focal point of the radial gradient is.
   * @nota-bene This effects the spray or spread of the radial gradient.
   */
  this.focal = new Vector()
    .bind(Events.Types.change, (function() {
      this._flagFocal = true;
    }).bind(this));

  if (typeof cx === 'number') {
    this.center.x = cx;
  }
  if (typeof cy === 'number') {
    this.center.y = cy;
  }

  this.focal.copy(this.center);

  if (typeof fx === 'number') {
    this.focal.x = fx;
  }
  if (typeof fy === 'number') {
    this.focal.y = fy;
  }

}

_.extend(RadialGradient, {

  /**
   * @name Two.RadialGradient#Stop
   * @see {@link Two.Stop}
   */
  Stop: Stop,

  /**
   * @name Two.RadialGradient.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.RadialGradient}.
   */
  Properties: [
    'radius'
  ],

  /**
   * @name Two.RadialGradient.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.RadialGradient} to any object. Handy if you'd like to extend the {@link Two.RadialGradient} class on a custom class.
   */
  MakeObservable: function(object) {

    Gradient.MakeObservable(object);

    _.each(RadialGradient.Properties, defineGetterSetter, object);

  }

});

_.extend(RadialGradient.prototype, Gradient.prototype, {

  constructor: RadialGradient,

  /**
   * @name Two.RadialGradient#_flagRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RadialGradient#radius} changed and needs to update.
   */
  _flagRadius: false,
  /**
   * @name Two.RadialGradient#_flagCenter
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RadialGradient#center} changed and needs to update.
   */
  _flagCenter: false,
  /**
   * @name Two.RadialGradient#_flagFocal
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RadialGradient#focal} changed and needs to update.
   */
  _flagFocal: false,

  /**
   * @name Two.RadialGradient#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Gradient}
   * @description Create a new instance of {@link Two.RadialGradient} with the same properties of the current path.
   */
  clone: function(parent) {

    var stops = this.stops.map(function(stop) {
      return stop.clone();
    });

    var clone = new RadialGradient(this.center._x, this.center._y,
        this._radius, stops, this.focal._x, this.focal._y);

    _.each(Gradient.Properties.concat(RadialGradient.Properties), function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.RadialGradient#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var result = Gradient.prototype.toObject.call(this);

    _.each(RadialGradient.Properties, function(k) {
      result[k] = this[k];
    }, this);

    result.center = this.center.toObject();
    result.focal = this.focal.toObject();

    return result;

  },

  /**
   * @name Two.RadialGradient#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagRadius || this._flatCenter || this._flagFocal
      || this._flagSpread || this._flagStops) {
      this.trigger(Events.Types.change);
    }

    return this;

  },

  /**
   * @name Two.RadialGradient#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagRadius = this._flagCenter = this._flagFocal = false;

    Gradient.prototype.flagReset.call(this);

    return this;

  }

});

RadialGradient.MakeObservable(RadialGradient.prototype);

export default RadialGradient;
