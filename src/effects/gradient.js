import Collection from '../collection.js';
import Events from '../events.js';
import defineGetterSetter from '../utils/get-set.js';
import _ from '../utils/underscore.js';

import Constants from '../constants.js';
import Stop from './stop.js';

/**
 * @name Two.Gradient
 * @class
 * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
 * @description This is the base class for constructing different types of gradients with Two.js. The two common gradients are {@link Two.LinearGradient} and {@link Two.RadialGradient}.
 */
var Gradient = function(stops) {

  /**
   * @name Two.Gradient#_renderer
   * @property {Object}
   * @private
   * @description A private object to store relevant renderer specific variables.
   * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `gradient._renderer.elem`.
   */
  this._renderer = {};
  this._renderer.type = 'gradient';

  /**
   * @name Two.Gradient#id
   * @property {String} - Session specific unique identifier.
   * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
   */
  this.id = Constants.Identifier + Constants.uniqueId();
  this.classList = [];

  this._renderer.flagStops = Gradient.FlagStops.bind(this);
  this._renderer.bindStops = Gradient.BindStops.bind(this);
  this._renderer.unbindStops = Gradient.UnbindStops.bind(this);

  /**
   * @name Two.Gradient#spread
   * @property {String} - Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle. Possible values are `'pad'`, `'reflect'`, and `'repeat'`.
   * @see {@link https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute} for more information
   */
  this.spread = 'pad';

  /**
   * @name Two.Gradient#stops
   * @property {Two.Stop[]} - An ordered list of {@link Two.Stop}s for rendering the gradient.
   */
  this.stops = stops;

};

_.extend(Gradient, {

  /**
   * @name Two.Gradient#Stop
   * @see {@link Two.Stop}
   */
  Stop: Stop,

  /**
   * @name Two.Gradient.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Gradient}.
   */
  Properties: [
    'spread'
  ],

  /**
   * @name Two.Gradient.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Gradient} to any object. Handy if you'd like to extend the {@link Two.Gradient} class on a custom class.
   */
  MakeObservable: function(object) {

    _.each(Gradient.Properties, defineGetterSetter, object);

    Object.defineProperty(object, 'stops', {

      enumerable: true,

      get: function() {
        return this._stops;
      },

      set: function(stops) {

        var updateStops = this._renderer.flagStops;
        var bindStops = this._renderer.bindStops;
        var unbindStops = this._renderer.unbindStops;

        // Remove previous listeners
        if (this._stops) {
          this._stops
            .unbind(Events.Types.insert, bindStops)
            .unbind(Events.Types.remove, unbindStops);
        }

        // Create new Collection with copy of Stops
        this._stops = new Collection((stops || []).slice(0));

        // Listen for Collection changes and bind / unbind
        this._stops
          .bind(Events.Types.insert, bindStops)
          .bind(Events.Types.remove, unbindStops);

        // Bind Initial Stops
        bindStops(this._stops);

      }

    });

  },

  /**
   * @name Two.Gradient.FlagStops
   * @function
   * @description Cached method to let renderers know stops have been updated on a {@link Two.Gradient}.
   */
  FlagStops: function() {
    this._flagStops = true;
  },

  /**
   * @name Two.Gradient.BindVertices
   * @function
   * @description Cached method to let {@link Two.Gradient} know vertices have been added to the instance.
   */
  BindStops: function(items) {

    // This function is called a lot
    // when importing a large SVG
    var i = items.length;
    while(i--) {
      items[i].bind(Events.Types.change, this._renderer.flagStops);
      items[i].parent = this;
    }

    this._renderer.flagStops();

  },

  /**
   * @name Two.Gradient.UnbindStops
   * @function
   * @description Cached method to let {@link Two.Gradient} know vertices have been removed from the instance.
   */
  UnbindStops: function(items) {

    var i = items.length;
    while(i--) {
      items[i].unbind(Events.Types.change, this._renderer.flagStops);
      delete items[i].parent;
    }

    this._renderer.flagStops();

  }

});

_.extend(Gradient.prototype, Events, {

  /**
   * @name Two.Gradient#_flagStops
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Gradient#stops} need updating.
   */
  _flagStops: false,
  /**
   * @name Two.Gradient#_flagSpread
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Gradient#spread} need updating.
   */
  _flagSpread: false,

  /**
   * @name Two.Gradient#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Gradient}
   * @description Create a new instance of {@link Two.Gradient} with the same properties of the current path.
   */
  clone: function(parent) {

    var stops = this.stops.map(function(s) {
      return s.clone();
    });

    var clone = new Gradient(stops);

    _.each(Gradient.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.Gradient#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var result = {
      stops: this.stops.map(function(s) {
        return s.toObject();
      })
    };

    _.each(Gradient.Properties, function(k) {
      result[k] = this[k];
    }, this);

    return result;

  },

  /**
   * @name Two.Gradient#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagSpread || this._flagStops) {
      this.trigger(Events.Types.change);
    }

    return this;

  },

  /**
   * @name Two.Gradient#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagSpread = this._flagStops = false;

    return this;

  }

});

Gradient.MakeObservable(Gradient.prototype);

export default Gradient;
