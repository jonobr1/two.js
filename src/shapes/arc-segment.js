(function(Two) {

  var Path = Two.Path, PI = Math.PI, TWO_PI = Math.PI * 2, HALF_PI = Math.PI / 2,
    cos = Math.cos, sin = Math.sin, abs = Math.abs, _ = Two.Utils,
    mod = Two.Utils.mod;

  /**
   * @name Two.ArcSegment
   * @class
   * @extends Two.Path
   * @param {Number} [x=0] - The x position of the arc segment.
   * @param {Number} [y=0] - The y position of the arc segment.
   * @param {Number} innerRadius - The inner radius value of the arc segment.
   * @param {Number} outerRadius - The outer radius value of the arc segment.
   * @param {Radians} startAngle - The start angle of the arc segment in radians.
   * @param {Radians} endAngle - The end angle of the arc segment in radians.
   * @param {Number} [resolution=24] - The number of vertices used to construct the arc segment.
   */
  var ArcSegment = Two.ArcSegment = function(ox, oy, ir, or, sa, ea, res) {

    var amount = res || (Two.Resolution * 3);
    var points = _.map(_.range(amount), function() {
      return new Two.Anchor();
    });

    Path.call(this, points, true, false, true);

    /**
     * @name Two.ArcSegment#innerRadius
     * @property {Number} - The size of the inner radius of the arc segment.
     */
    this.innerRadius = ir;
    /**
     * @name Two.ArcSegment#outerRadius
     * @property {Number} - The size of the outer radius of the arc segment.
     */
    this.outerRadius = or;

    /**
     * @name Two.ArcSegment#startRadius
     * @property {Radians} - The angle of one side for the arc segment.
     */
    this.startAngle = sa;
    /**
     * @name Two.ArcSegment#endAngle
     * @property {Radians} - The angle of the other side for the arc segment.
     */
    this.endAngle = ea;

    this._update();

    if (_.isNumber(ox)) {
      this.translation.x = ox;
    }
    if (_.isNumber(oy)) {
      this.translation.y = oy;
    }

  }

  _.extend(ArcSegment, {

    /**
     * @name Two.ArcSegment.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.ArcSegment}.
     */
    Properties: ['startAngle', 'endAngle', 'innerRadius', 'outerRadius'],

    /**
     * @name Two.ArcSegment.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a {@link Two.ArcSegment} to any object. Handy if you'd like to extend the {@link Two.ArcSegment} class on a custom class.
     */
    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(ArcSegment.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(ArcSegment.prototype, Path.prototype, {

    /**
     * @name Two.ArcSegment#_flagStartAngle
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#startAngle} needs updating.
     */
    _flagStartAngle: false,
    /**
     * @name Two.ArcSegment#_flagEndAngle
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#endAngle} needs updating.
     */
    _flagEndAngle: false,
    /**
     * @name Two.ArcSegment#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#innerRadius} needs updating.
     */
    _flagInnerRadius: false,
    /**
     * @name Two.ArcSegment#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#outerRadius} needs updating.
     */
    _flagOuterRadius: false,

    /**
     * @name Two.ArcSegment#_startAngle
     * @private
     * @see {@link Two.ArcSegment#startAngle}
     */
    _startAngle: 0,
    /**
     * @name Two.ArcSegment#_endAngle
     * @private
     * @see {@link Two.ArcSegment#endAngle}
     */
    _endAngle: TWO_PI,
    /**
     * @name Two.ArcSegment#_innerRadius
     * @private
     * @see {@link Two.ArcSegment#innerRadius}
     */
    _innerRadius: 0,
    /**
     * @name Two.ArcSegment#_outerRadius
     * @private
     * @see {@link Two.ArcSegment#outerRadius}
     */
    _outerRadius: 0,

    constructor: ArcSegment,

    /**
     * @name Two.ArcSegment#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update: function() {

      if (this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius
        || this._flagOuterRadius) {

        var sa = this._startAngle;
        var ea = this._endAngle;

        var ir = this._innerRadius;
        var or = this._outerRadius;

        var connected = mod(sa, TWO_PI) === mod(ea, TWO_PI);
        var punctured = ir > 0;

        var vertices = this.vertices;
        var length = (punctured ? vertices.length / 2 : vertices.length);
        var command, id = 0;

        if (connected) {
          length--;
        } else if (!punctured) {
          length -= 2;
        }

        /**
         * Outer Circle
         */
        for (var i = 0, last = length - 1; i < length; i++) {

          var pct = i / last;
          var v = vertices[id];
          var theta = pct * (ea - sa) + sa;
          var step = (ea - sa) / length;

          var x = or * Math.cos(theta);
          var y = or * Math.sin(theta);

          switch (i) {
            case 0:
              command = Two.Commands.move;
              break;
            default:
              command = Two.Commands.curve;
          }

          v.command = command;
          v.x = x;
          v.y = y;
          v.controls.left.clear();
          v.controls.right.clear();

          if (v.command === Two.Commands.curve) {
            var amp = or * step / Math.PI;
            v.controls.left.x = amp * Math.cos(theta - HALF_PI);
            v.controls.left.y = amp * Math.sin(theta - HALF_PI);
            v.controls.right.x = amp * Math.cos(theta + HALF_PI);
            v.controls.right.y = amp * Math.sin(theta + HALF_PI);
            if (i === 1) {
              v.controls.left.multiplyScalar(2);
            }
            if (i === last) {
              v.controls.right.multiplyScalar(2);
            }
          }

          id++;

        }

        if (punctured) {

          if (connected) {
            vertices[id].command = Two.Commands.close;
            id++;
          } else {
            length--;
            last = length - 1;
          }

          /**
           * Inner Circle
           */
          for (i = 0; i < length; i++) {

            pct = i / last;
            v = vertices[id];
            theta = (1 - pct) * (ea - sa) + sa;
            step = (ea - sa) / length;

            x = ir * Math.cos(theta);
            y = ir * Math.sin(theta);
            command = Two.Commands.curve;
            if (i <= 0) {
              command = connected ? Two.Commands.move : Two.Commands.line;
            }

            v.command = command;
            v.x = x;
            v.y = y;
            v.controls.left.clear();
            v.controls.right.clear();

            if (v.command === Two.Commands.curve) {
              amp = ir * step / Math.PI;
              v.controls.left.x = amp * Math.cos(theta + HALF_PI);
              v.controls.left.y = amp * Math.sin(theta + HALF_PI);
              v.controls.right.x = amp * Math.cos(theta - HALF_PI);
              v.controls.right.y = amp * Math.sin(theta - HALF_PI);
              if (i === 1) {
                v.controls.left.multiplyScalar(2);
              }
              if (i === last) {
                v.controls.right.multiplyScalar(2);
              }
            }

            id++;

          }

          // Final Point
          vertices[id].copy(vertices[0]);
          vertices[id].command = Two.Commands.line;

        } else if (!connected) {

          vertices[id].command = Two.Commands.line;
          vertices[id].x = 0;
          vertices[id].y = 0;
          id++;

          // Final Point
          vertices[id].copy(vertices[0]);
          vertices[id].command = Two.Commands.line;

        }

      }

      Path.prototype._update.call(this);

      return this;

    },

    /**
     * @name Two.ArcSegment#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset: function() {

      Path.prototype.flagReset.call(this);

      this._flagStartAngle = this._flagEndAngle
        = this._flagInnerRadius = this._flagOuterRadius = false;

      return this;

    },

    /**
     * @name Two.ArcSegment#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.ArcSegment}
     * @description Create a new instance of {@link Two.ArcSegment} with the same properties of the current path.
     */
    clone: function(parent) {

      var ir = this.innerRadius;
      var or = this.outerradius;
      var sa = this.startAngle;
      var ea = this.endAngle;
      var resolution = this.vertices.length;

      var clone = new ArcSegment(0, 0, ir, or, sa, ea, resolution);

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
     * @name Two.ArcSegment#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject: function() {

      var object = Path.prototype.toObject.call(this);

      _.each(ArcSegment.Properties, function(property) {
        object[property] = this[property]
      }, this);

      return object;

    }

  });

  ArcSegment.MakeObservable(ArcSegment.prototype);

})((typeof global !== 'undefined' ? global : (this || self || window)).Two);
