import Commands from '../utils/path-commands.js';
import Events from '../events.js';
import defineGetterSetter from '../utils/get-set.js';
import _ from '../utils/underscore.js';

import Path from '../path.js';
import Anchor from '../anchor.js';
import Vector from '../vector.js';

/**
 * @name Two.Rectangle
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the rectangle.
 * @param {Number} [y=0] - The y position of the rectangle.
 * @param {Number} [width] - The width value of the rectangle.
 * @param {Number} [height] - The width value of the rectangle.
 */
function Rectangle(x, y, width, height) {

  Path.call(this, [
    new Anchor(),
    new Anchor(),
    new Anchor(),
    new Anchor()
    // new Anchor() // TODO: Figure out how to handle this for `beginning` / `ending` animations
  ], true, false, true);

  /**
   * @name Two.Rectangle#width
   * @property {Number} - The size of the width of the rectangle.
   */
  this.width = width;
  /**
   * @name Two.Rectangle#height
   * @property {Number} - The size of the height of the rectangle.
   */
  this.height = height;

  /**
   * @name Two.Rectangle#origin
   * @property {Number} - A two-component vector describing the origin offset to draw the rectangle. Default is `0, 0`.
   */
  this.origin = new Vector();
  this.translation.set(x, y);

  this._update();

}

_.extend(Rectangle, {

  /**
   * @name Two.Rectangle.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Rectangle}.
   */
  Properties: ['width', 'height'],

  /**
   * @name Two.Rectangle.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Rectangle} to any object. Handy if you'd like to extend the {@link Two.Rectangle} class on a custom class.
   */
  MakeObservable: function(object) {

    Path.MakeObservable(object);
    _.each(Rectangle.Properties, defineGetterSetter, object);

    Object.defineProperty(object, 'origin', {
      enumerable: true,
      get: function() {
        return this._origin;
      },
      set: function(v) {
        if (this._origin) {
          this._origin.unbind(Events.Types.change, this._renderer.flagVertices);
        }
        this._origin = v;
        this._origin.bind(Events.Types.change, this._renderer.flagVertices);
        this._renderer.flagVertices();
      }
    });

  }

});

_.extend(Rectangle.prototype, Path.prototype, {

  constructor: Rectangle,

  /**
   * @name Two.Rectangle#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Rectangle#width} needs updating.
   */
  _flagWidth: 0,
  /**
   * @name Two.Rectangle#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Rectangle#height} needs updating.
   */
  _flagHeight: 0,

  /**
   * @name Two.Rectangle#_width
   * @private
   * @see {@link Two.Rectangle#width}
   */
  _width: 0,
  /**
   * @name Two.Rectangle#_height
   * @private
   * @see {@link Two.Rectangle#height}
   */
  _height: 0,

  _origin: null,

  /**
   * @name Two.Rectangle#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagVertices || this._flagWidth || this._flagHeight) {

      var xr = this._width / 2;
      var yr = this._height / 2;

      if (!this._closed && this.vertices.length === 4) {
        this.vertices.push(new Anchor());
      }

      this.vertices[0].set(-xr, -yr).add(this._origin).command = Commands.move;
      this.vertices[1].set(xr, -yr).add(this._origin).command = Commands.line;
      this.vertices[2].set(xr, yr).add(this._origin).command = Commands.line;
      this.vertices[3].set(-xr, yr).add(this._origin).command = Commands.line;
      // FYI: Two.Sprite and Two.ImageSequence have 4 verts
      if (this.vertices[4]) {
        this.vertices[4].set(-xr, -yr).add(this._origin).command = Commands.line;
      }

    }

    Path.prototype._update.call(this);

    return this;

  },

  /**
   * @name Two.Rectangle#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagWidth = this._flagHeight = false;
    Path.prototype.flagReset.call(this);

    return this;

  },

  /**
   * @name Two.Rectangle#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Rectangle}
   * @description Create a new instance of {@link Two.Rectangle} with the same properties of the current path.
   */
  clone: function(parent) {

    var clone = new Rectangle(0, 0, this.width, this.height);

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
   * @name Two.Rectangle#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);
    object.width = this.width;
    object.height = this.height;
    object.origin = this.origin.toObject();
    return object;

  }

});

Rectangle.MakeObservable(Rectangle.prototype);

export default Rectangle;
