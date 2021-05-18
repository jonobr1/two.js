import Commands from '../utils/path-commands.js';
import Events from '../events.js';
import defineGetterSetter from '../utils/get-set.js';
import _ from '../utils/underscore.js';

import Path from '../path.js';
import Anchor from '../anchor.js';
import Vector from '../vector.js';

/**
 * @name Two.RoundedRectangle
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the rounded rectangle.
 * @param {Number} [y=0] - The y position of the rounded rectangle.
 * @param {Number} [width=0] - The width value of the rounded rectangle.
 * @param {Number} [height=0] - The width value of the rounded rectangle.
 * @param {Number} [radius=0] - The radius value of the rounded rectangle.
 * @param {Number} [resolution=12] - The number of vertices used to construct the rounded rectangle.
 */
function RoundedRectangle(ox, oy, width, height, radius) {

  if (typeof radius === 'undefined' &&
    typeof width === 'number' && typeof height === 'number') {
    radius = Math.floor(Math.min(width, height) / 12);
  }

  var amount = 10;

  var points = [];
  for (var i = 0; i < amount; i++) {
    points.push(
      new Anchor(0, 0, 0, 0, 0, 0,
        i === 0 ? Commands.move : Commands.curve)
    );
  }

  // points[points.length - 1].command = Two.Commands.close;

  Path.call(this, points);

  this.closed = true;
  this.automatic = false;

  this._renderer.flagRadius = RoundedRectangle.FlagRadius.bind(this);

  /**
   * @name Two.RoundedRectangle#width
   * @property {Number} - The width of the rounded rectangle.
   */
  if (typeof width === 'number') {
    this.width = width;
  }

  /**
   * @name Two.RoundedRectangle#height
   * @property {Number} - The height of the rounded rectangle.
   */
  if (typeof height === 'number') {
    this.height = height;
  }

  /**
   * @name Two.RoundedRectangle#radius
   * @property {Number} - The size of the radius of the rounded rectangle.
   */
  if (typeof radius === 'number') {
    this.radius = radius;
  }

  this._update();
  this.translation.set(ox, oy);

}

_.extend(RoundedRectangle, {

  /**
   * @name Two.RoundedRectangle.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.RoundedRectangle}.
   */
  Properties: ['width', 'height'],

  /**
   * @name Two.RoundedRectangle.FlagRadius
   * @property {Function} - A convenience function to trigger the flag for radius changing.
   */
  FlagRadius: function() {
    this._flagRadius = true;
  },

  /**
   * @name Two.RoundedRectangle.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.RoundedRectangle} to any object. Handy if you'd like to extend the {@link Two.RoundedRectangle} class on a custom class.
   */
  MakeObservable: function(object) {

    Path.MakeObservable(object);
    _.each(RoundedRectangle.Properties, defineGetterSetter, object);

    Object.defineProperty(object, 'radius', {
      enumerable: true,
      get: function() {
        return this._radius;
      },
      set: function(v) {

        if (this._radius instanceof Vector) {
          this._radius.unbind(Events.Types.change, this._renderer.flagRadius);
        }

        this._radius = v;

        if (this._radius instanceof Vector) {
          this._radius.bind(Events.Types.change, this._renderer.flagRadius);
        }

        this._flagRadius = true;

      }
    });

  }

});

_.extend(RoundedRectangle.prototype, Path.prototype, {

  constructor: RoundedRectangle,

  /**
   * @name Two.RoundedRectangle#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#width} needs updating.
   */
  _flagWidth: false,
  /**
   * @name Two.RoundedRectangle#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#height} needs updating.
   */
  _flagHeight: false,
  /**
   * @name Two.RoundedRectangle#_flagRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#radius} needs updating.
   */
  _flagRadius: false,

  /**
   * @name Two.RoundedRectangle#_width
   * @private
   * @see {@link Two.RoundedRectangle#width}
   */
  _width: 0,
  /**
   * @name Two.RoundedRectangle#_height
   * @private
   * @see {@link Two.RoundedRectangle#height}
   */
  _height: 0,
  /**
   * @name Two.RoundedRectangle#_radius
   * @private
   * @see {@link Two.RoundedRectangle#radius}
   */
  _radius: 12,

  /**
   * @name Two.RoundedRectangle#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagRadius) {

      var width = this._width;
      var height = this._height;

      var rx, ry;

      if (this._radius instanceof Vector) {
        rx = this._radius.x;
        ry = this._radius.y;
      } else {
        rx = this._radius;
        ry = this._radius;
      }

      var v;
      var w = width / 2;
      var h = height / 2;

      v = this.vertices[0];
      v.x = - (w - rx);
      v.y = - h;

      // Upper Right Corner

      v = this.vertices[1];
      v.x = (w - rx);
      v.y = - h;
      v.controls.left.clear();
      v.controls.right.x = rx;
      v.controls.right.y = 0;

      v = this.vertices[2];
      v.x = w;
      v.y = - (h - ry);
      v.controls.right.clear();
      v.controls.left.clear();

      // Bottom Right Corner

      v = this.vertices[3];
      v.x = w;
      v.y = (h - ry);
      v.controls.left.clear();
      v.controls.right.x = 0;
      v.controls.right.y = ry;

      v = this.vertices[4];
      v.x = (w - rx);
      v.y = h;
      v.controls.right.clear();
      v.controls.left.clear();

      // Bottom Left Corner

      v = this.vertices[5];
      v.x = - (w - rx);
      v.y = h;
      v.controls.left.clear();
      v.controls.right.x = - rx;
      v.controls.right.y = 0;

      v = this.vertices[6];
      v.x = - w;
      v.y = (h - ry);
      v.controls.left.clear();
      v.controls.right.clear();

      // Upper Left Corner

      v = this.vertices[7];
      v.x = - w;
      v.y = - (h - ry);
      v.controls.left.clear();
      v.controls.right.x = 0;
      v.controls.right.y = - ry;

      v = this.vertices[8];
      v.x = - (w - rx);
      v.y = - h;
      v.controls.left.clear();
      v.controls.right.clear();

      v = this.vertices[9];
      v.copy(this.vertices[8]);

    }

    Path.prototype._update.call(this);

    return this;

  },

  /**
   * @name Two.RoundedRectangle#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagWidth = this._flagHeight = this._flagRadius = false;
    Path.prototype.flagReset.call(this);

    return this;

  },

  /**
   * @name Two.RoundedRectangle#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.RoundedRectangle}
   * @description Create a new instance of {@link Two.RoundedRectangle} with the same properties of the current path.
   */
  clone: function(parent) {

    var width = this.width;
    var height = this.height;
    var radius = this.radius;

    var clone = new RoundedRectangle(0, 0, width, height, radius);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    _.each(Path.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.RoundedRectangle#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(RoundedRectangle.Properties, function(property) {
      object[property] = this[property];
    }, this);

    object.radius = typeof this.radius === 'number'
      ? this.radius : this.radius.toObject();

    return object;

  }

});

RoundedRectangle.MakeObservable(RoundedRectangle.prototype);

export default RoundedRectangle;
