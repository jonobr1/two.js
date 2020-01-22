(function(Two) {

  var Path = Two.Path, TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;
  var _ = Two.Utils;

  /**
   * @name Two.Star
   * @class
   * @extends Two.Path
   * @param {Number} [x=0] - The x position of the star.
   * @param {Number} [y=0] - The y position of the star.
   * @param {Number} innerRadius - The inner radius value of the star.
   * @param {Number} outerRadius - The outer radius value of the star.
   * @param {Number} [sides=5] - The number of sides used to construct the star.
   */
  var Star = Two.Star = function(ox, oy, ir, or, sides) {

    if (arguments.length <= 3) {
      or = ir;
      ir = or / 2;
    }

    if (!_.isNumber(sides) || sides <= 0) {
      sides = 5;
    }

    var length = sides * 2;

    Path.call(this);
    this.closed = true;
    this.automatic = false;

    /**
     * @name Two.Star#innerRadius
     * @property {Number} - The size of the inner radius of the star.
     */
    this.innerRadius = ir;
    /**
     * @name Two.Star#outerRadius
     * @property {Number} - The size of the outer radius of the star.
     */
    this.outerRadius = or;
    /**
     * @name Two.Star#sides
     * @property {Number} - The amount of sides the star has.
     */
    this.sides = sides;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(Star, {

    /**
     * @name Two.Star.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Star}.
     */
    Properties: ['innerRadius', 'outerRadius', 'sides'],

    /**
     * @name Two.Star.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a {@link Two.Star} to any object. Handy if you'd like to extend the {@link Two.Star} class on a custom class.
     */
    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(Star.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(Star.prototype, Path.prototype, {

    /**
     * @name Two.Star#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Star#innerRadius} needs updating.
     */
    _flagInnerRadius: false,
    /**
     * @name Two.Star#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Star#outerRadius} needs updating.
     */
    _flagOuterRadius: false,
    /**
     * @name Two.Star#_flagSides
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Star#sides} needs updating.
     */
    _flagSides: false,

    /**
     * @name Two.Star#_innerRadius
     * @private
     * @see {@link Two.Star#innerRadius}
     */
    _innerRadius: 0,
    /**
     * @name Two.Star#_outerRadius
     * @private
     * @see {@link Two.Star#outerRadius}
     */
    _outerRadius: 0,
    /**
     * @name Two.Star#_sides
     * @private
     * @see {@link Two.Star#sides}
     */
    _sides: 0,

    constructor: Star,

    /**
     * @name Two.Star#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update: function() {

      if (this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {

        var sides = this._sides * 2;
        var amount = sides + 1;
        var length = this.vertices.length;

        if (length > sides) {
          this.vertices.splice(sides - 1, length - sides);
          length = sides;
        }

        for (var i = 0; i < amount; i++) {

          var pct = (i + 0.5) / sides;
          var theta = TWO_PI * pct;
          var r = (!(i % 2) ? this._innerRadius : this._outerRadius) / 2;
          var x = r * cos(theta);
          var y = r * sin(theta);

          if (i >= length) {
            this.vertices.push(new Two.Anchor(x, y));
          } else {
            this.vertices[i].set(x, y);
          }

          this.vertices[i].command = i === 0
            ? Two.Commands.move : Two.Commands.line;

        }

      }

      Path.prototype._update.call(this);

      return this;

    },

    /**
     * @name Two.Star#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset: function() {

      this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false;
      Path.prototype.flagReset.call(this);

      return this;

    },

    /**
     * @name Two.Star#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Star}
     * @description Create a new instance of {@link Two.Star} with the same properties of the current path.
     */
    clone: function(parent) {

      var ir = this.innerRadius;
      var or = this.outerRadius;
      var sides = this.sides;

      var clone = new Star(0, 0, ir, or, sides);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    /**
     * @name Two.Star#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject: function() {

      var object = Path.prototype.toObject.call(this);

      _.each(Star.Properties, function(property) {
        object[property] = this[property];
      }, this);

      return object;

    }

  });

  Star.MakeObservable(Star.prototype);

})((typeof global !== 'undefined' ? global : (this || self || window)).Two);
