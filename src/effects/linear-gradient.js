(function(Two) {

  var _ = Two.Utils;

  /**
   * @name Two.LinearGradient
   * @class
   * @extends Two.Gradient
   * @param {Number} [x1=0] - The x position of the first end point of the linear gradient.
   * @param {Number} [y1=0] - The y position of the first end point of the linear gradient.
   * @param {Number} [x2=0] - The x position of the second end point of the linear gradient.
   * @param {Number} [y2=0] - The y position of the second end point of the linear gradient.
   * @param {Two.Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
   * @nota-bene The linear gradient lives within the space of the parent object's matrix space.
   */
  var LinearGradient = Two.LinearGradient = function(x1, y1, x2, y2, stops) {

    Two.Gradient.call(this, stops);

    this._renderer.type = 'linear-gradient';

    var flagEndPoints = _.bind(LinearGradient.FlagEndPoints, this);

    /**
     * @name Two.LinearGradient#left
     * @property {Two.Vector} - The x and y value for where the first end point is placed on the canvas.
     */
    this.left = new Two.Vector().bind(Two.Events.change, flagEndPoints);
    /**
     * @name Two.LinearGradient#right
     * @property {Two.Vector} - The x and y value for where the second end point is placed on the canvas.
     */
    this.right = new Two.Vector().bind(Two.Events.change, flagEndPoints);

    if (_.isNumber(x1)) {
      this.left.x = x1;
    }
    if (_.isNumber(y1)) {
      this.left.y = y1;
    }
    if (_.isNumber(x2)) {
      this.right.x = x2;
    }
    if (_.isNumber(y2)) {
      this.right.y = y2;
    }

  };

  _.extend(LinearGradient, {

    /**
     * @name Two.LinearGradient#Stop
     * @see {@link Two.Stop}
     */
    Stop: Two.Gradient.Stop,

    /**
     * @name Two.LinearGradient.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a {@link Two.LinearGradient} to any object. Handy if you'd like to extend the {@link Two.LinearGradient} class on a custom class.
     */
    MakeObservable: function(object) {
      Two.Gradient.MakeObservable(object);
    },

    /**
     * @name Two.LinearGradient.FlagEndPoints
     * @function
     * @description Cached method to let renderers know end points have been updated on a {@link Two.LinearGradient}.
     */
    FlagEndPoints: function() {
      this._flagEndPoints = true;
    }

  });

  _.extend(LinearGradient.prototype, Two.Gradient.prototype, {

    /**
     * @name Two.LinearGradient#_flagEndPoints
     * @private
     * @property {Boolean} - Determines whether the {@link Two.LinearGradient#left} or {@link Two.LinearGradient#right} changed and needs to update.
     */
    _flagEndPoints: false,

    constructor: LinearGradient,

    /**
     * @name Two.LinearGradient#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Gradient}
     * @description Create a new instance of {@link Two.LinearGradient} with the same properties of the current path.
     */
    clone: function(parent) {

      var stops = _.map(this.stops, function(stop) {
        return stop.clone();
      });

      var clone = new LinearGradient(this.left._x, this.left._y,
        this.right._x, this.right._y, stops);

      _.each(Two.Gradient.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    /**
     * @name Two.LinearGradient#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject: function() {

      var result = Two.Gradient.prototype.toObject.call(this);

      result.left = this.left.toObject();
      result.right = this.right.toObject();

      return result;

    },

    /**
     * @name Two.LinearGradient#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update: function() {

      if (this._flagEndPoints || this._flagSpread || this._flagStops) {
        this.trigger(Two.Events.change);
      }

      return this;

    },

    /**
     * @name Two.LinearGradient#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset: function() {

      this._flagEndPoints = false;

      Two.Gradient.prototype.flagReset.call(this);

      return this;

    }

  });

  LinearGradient.MakeObservable(LinearGradient.prototype);

})((typeof global !== 'undefined' ? global : (this || self || window)).Two);
