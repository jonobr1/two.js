(function(Two) {

  // Localized variables
  var commands = Two.Commands;
  var _ = Two.Utils;

  /**
   * @class
   * @name Two.Anchor
   * @param {Number} [x=0] - The x position of the root anchor point.
   * @param {Number} [y=0] - The y position of the root anchor point.
   * @param {Number} [lx=0] - The x position of the left handle point.
   * @param {Number} [ly=0] - The y position of the left handle point.
   * @param {Number} [rx=0] - The x position of the right handle point.
   * @param {Number} [ry=0] - The y position of the right handle point.
   * @param {String} [command=Two.Commands.move] - The command to describe how to render. Applicable commands are {@link Two.Commands}
   * @extends Two.Vector
   * @description An object that holds 3 `Two.Vector`s, the anchor point and its corresponding handles: `left` and `right`. In order to properly describe the bezier curve about the point there is also a command property to describe what type of drawing should occur when Two.js renders the anchors.
   */
  var Anchor = Two.Anchor = function(x, y, lx, ly, rx, ry, command) {

    Two.Vector.call(this, x, y);

    this._broadcast = _.bind(function() {
      this.trigger(Two.Events.change);
    }, this);

    this._command = command || commands.move;
    this._relative = true;

    var ilx = _.isNumber(lx);
    var ily = _.isNumber(ly);
    var irx = _.isNumber(rx);
    var iry = _.isNumber(ry);

    // Append the `controls` object only if control points are specified,
    // keeping the Two.Anchor inline with a Two.Vector until it needs to
    // evolve beyond those functions — e.g: a simple 2 component vector.
    if (ilx || ily || irx || iry) {
      Two.Anchor.AppendCurveProperties(this);
    }

    if (ilx) {
      this.controls.left.x = lx;
    }
    if (ily) {
      this.controls.left.y = ly;
    }
    if (irx) {
      this.controls.right.x = rx;
    }
    if (iry) {
      this.controls.right.y = ry;
    }

  };

  _.extend(Two.Anchor, {

    /**
     * @name Two.Anchor.AppendCurveProperties
     * @function
     * @param {Two.Anchor} anchor - The instance to append the `control`object to.
     * @description Adds the `controls` property as an object with `left` and `right` properties to access the bezier control handles that define how the curve is drawn. It also sets the `relative` property to `true` making vectors in the `controls` object relative to their corresponding root anchor point.
     */
    AppendCurveProperties: function(anchor) {

      anchor.relative = true;

      /**
       * @name Two.Anchor#controls
       * @property {Object} controls
       * @description An plain object that holds the controls handles for a {@link Two.Anchor}.
       */
      anchor.controls = {};

      /**
       * @name Two.Anchor#controls#left
       * @property {Two.Vector} left
       * @description The "left" control point to define handles on a bezier curve.
       */
      anchor.controls.left = new Two.Vector(0, 0);

      /**
       * @name Two.Anchor#controls#right
       * @property {Two.Vector} right
       * @description The "left" control point to define handles on a bezier curve.
       */
      anchor.controls.right = new Two.Vector(0, 0);

    },

    /**
     * @name Two.Anchor.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a `Two.Anchor` to any object. Handy if you'd like to extend the `Two.Anchor` class on a custom class.
     */
    MakeObservable: function(object) {

      /**
       * @name Two.Anchor#command
       * @property {Two.Commands}
       * @description A draw command associated with the anchor point.
       */
      Object.defineProperty(object, 'command', {

        enumerable: true,

        get: function() {
          return this._command;
        },

        set: function(c) {
          this._command = c;
          if (this._command === commands.curve && !_.isObject(this.controls)) {
            Anchor.AppendCurveProperties(this);
          }
          return this.trigger(Two.Events.change);
        }

      });

      /**
       * @name Two.Anchor#relative
       * @property {Boolean}
       * @description A boolean to render control points relative to the root anchor point or in global coordinate-space to the rest of the scene.
       */
      Object.defineProperty(object, 'relative', {

        enumerable: true,

        get: function() {
          return this._relative;
        },

        set: function(b) {
          if (this._relative == b) {
            return this;
          }
          this._relative = !!b;
          return this.trigger(Two.Events.change);
        }

      });

      _.extend(object, Two.Vector.prototype, AnchorProto);

      // Make it possible to bind and still have the Anchor specific
      // inheritance from Two.Vector. In this case relying on `Two.Vector`
      // to do much of the heavy event-listener binding / unbinding.
      object.bind = object.on = function() {
        var bound = this._bound;
        Two.Vector.prototype.bind.apply(this, arguments);
        if (!bound) {
          _.extend(this, AnchorProto);
        }
      };

    }

  });

  var AnchorProto = {

    constructor: Two.Anchor,

    /**
     * @name Two.Anchor#listen
     * @function
     * @description Convenience method used mainly by {@link Two.Path#vertices} to listen and propagate changes from control points up to their respective anchors and further if necessary.
     */
    listen: function() {

      if (!_.isObject(this.controls)) {
        Two.Anchor.AppendCurveProperties(this);
      }

      this.controls.left.bind(Two.Events.change, this._broadcast);
      this.controls.right.bind(Two.Events.change, this._broadcast);

      return this;

    },

    /**
     * @name Two.Anchor#ignore
     * @function
     * @description Convenience method used mainly by {@link Two.Path#vertices} to ignore changes from a specific anchor's control points.
     */
    ignore: function() {

      this.controls.left.unbind(Two.Events.change, this._broadcast);
      this.controls.right.unbind(Two.Events.change, this._broadcast);

      return this;

    },

    /**
     * @name Two.Anchor#copy
     * @function
     * @param {Two.Anchor} v - The anchor to apply values to.
     * @description Copy the properties of one {@link Two.Anchor} onto another.
     */
    copy: function(v) {

      this.x = v.x;
      this.y = v.y;

      if (_.isString(v.command)) {
        this.command = v.command;
      }
      if (_.isObject(v.controls)) {
        if (!_.isObject(this.controls)) {
          Two.Anchor.AppendCurveProperties(this);
        }
        // TODO: Do we need to listen here?
        this.controls.left.copy(v.controls.left);
        this.controls.right.copy(v.controls.right);
      }
      if (_.isBoolean(v.relative)) {
        this.relative = v.relative;
      }

      // TODO: Hack for `Two.Commands.arc`
      if (this.command === Two.Commands.arc) {
        this.rx = v.rx;
        this.ry = v.ry;
        this.xAxisRotation = v.xAxisRotation;
        this.largeArcFlag = v.largeArcFlag;
        this.sweepFlag = v.sweepFlag;
      }

      return this;

    },

    /**
     * @name Two.Anchor#clone
     * @function
     * @returns {Two.Anchor}
     * @description Create a new {@link Two.Anchor}, set all its values to the current instance and return it for use.
     */
    clone: function() {

      var controls = this.controls;

      var clone = new Two.Anchor(
        this.x,
        this.y,
        controls && controls.left.x,
        controls && controls.left.y,
        controls && controls.right.x,
        controls && controls.right.y,
        this.command
      );
      clone.relative = this._relative;
      return clone;

    },

    /**
     * @name Two.Anchor#toObject
     * @function
     * @returns {Object} - An object with properties filled out to mirror {@link Two.Anchor}.
     * @description Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.
     */
    toObject: function() {
      var o = {
        x: this.x,
        y: this.y
      };
      if (this._command) {
        o.command = this._command;
      }
      if (this._relative) {
        o.relative = this._relative;
      }
      if (this.controls) {
        o.controls = {
          left: this.controls.left.toObject(),
          right: this.controls.right.toObject()
        };
      }
      return o;
    },

    /**
     * @name Two.Anchor#toString
     * @function
     * @returns {String} - A String with comma-separated values reflecting the various values on the current instance.
     * @description Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible {@link Two.Anchor#toObject}.
     */
    toString: function() {
      if (!this.controls) {
        return [this._x, this._y].join(', ');
      }
      return [this._x, this._y, this.controls.left.x, this.controls.left.y,
        this.controls.right.x, this.controls.right.y, this._command,
        this._relative ? 1 : 0].join(', ');
    }

  };

  Two.Anchor.MakeObservable(Two.Anchor.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
