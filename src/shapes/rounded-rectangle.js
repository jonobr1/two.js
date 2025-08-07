import { Commands } from '../utils/path-commands.js';
import { Events } from '../events.js';

import { Path } from '../path.js';
import { Anchor } from '../anchor.js';
import { Vector } from '../vector.js';

/**
 * @name Two.RoundedRectangle
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the rounded rectangle.
 * @param {Number} [y=0] - The y position of the rounded rectangle.
 * @param {Number} [width=0] - The width value of the rounded rectangle.
 * @param {Number} [height=0] - The width value of the rounded rectangle.
 * @param {Number|Two.Vector} [radius=0] - The radius value of the rounded rectangle.
 * @param {Number} [resolution=12] - The number of vertices used to construct the rounded rectangle.
 */
export class RoundedRectangle extends Path {
  /**
   * @name Two.RoundedRectangle#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#width} needs updating.
   */
  _flagWidth = false;
  /**
   * @name Two.RoundedRectangle#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#height} needs updating.
   */
  _flagHeight = false;
  /**
   * @name Two.RoundedRectangle#_flagRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#radius} needs updating.
   */
  _flagRadius = false;

  /**
   * @name Two.RoundedRectangle#_width
   * @private
   * @see {@link Two.RoundedRectangle#width}
   */
  _width = 0;
  /**
   * @name Two.RoundedRectangle#_height
   * @private
   * @see {@link Two.RoundedRectangle#height}
   */
  _height = 0;
  /**
   * @name Two.RoundedRectangle#_radius
   * @private
   * @see {@link Two.RoundedRectangle#radius}
   */
  _radius = 12;

  constructor(x, y, width, height, radius) {
    if (
      typeof radius === 'undefined' &&
      typeof width === 'number' &&
      typeof height === 'number'
    ) {
      radius = Math.floor(Math.min(width, height) / 12);
    }

    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(
        new Anchor(0, 0, 0, 0, 0, 0, i === 0 ? Commands.move : Commands.curve)
      );
    }

    // points[points.length - 1].command = Two.Commands.close;

    super(points);

    this._renderer.type = 'rounded-rectangle';

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this.closed = true;
    this.automatic = false;

    this._renderer.flagRadius = FlagRadius.bind(this);

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
    if (typeof radius === 'number' || radius instanceof Vector) {
      this.radius = radius;
    }

    this._update();

    if (typeof x === 'number') {
      this.translation.x = x;
    }
    if (typeof y === 'number') {
      this.translation.y = y;
    }
  }

  /**
   * @name Two.RoundedRectangle.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.RoundedRectangle}.
   */
  static Properties = ['width', 'height', 'radius'];

  /**
   * @name Two.RoundedRectangle.fromObject
   * @function
   * @param {Object} obj - Object notation of a {@link Two.RoundedRectangle} to create a new instance
   * @returns {Two.RoundedRectangle}
   * @description Create a new {@link Two.RoundedRectangle} from an object notation of a {@link Two.RoundedRectangle}.
   * @nota-bene Works in conjunction with {@link Two.RoundedRectangle#toObject}
   */
  static fromObject(obj) {
    const rectangle = new RoundedRectangle().copy(obj);

    if ('id' in obj) {
      rectangle.id = obj.id;
    }

    return rectangle;
  }

  /**
   * @name Two.RoundedRectangle#copy
   * @function
   * @param {Two.RoundedRectangle} roundedRectangle - The reference {@link Two.RoundedRectangle}
   * @description Copy the properties of one {@link Two.RoundedRectangle} onto another.
   */
  copy(roundedRectangle) {
    super.copy.call(this, roundedRectangle);

    for (let i = 0; i < RoundedRectangle.Properties.length; i++) {
      const k = RoundedRectangle.Properties[i];
      if (k in roundedRectangle) {
        const value = roundedRectangle[k];
        if (/radius/i.test(k)) {
          this[k] =
            typeof value === 'number' || value instanceof Vector
              ? value
              : new Vector().copy(value);
        } else if (typeof value === 'number') {
          this[k] = value;
        }
      }
    }

    return this;
  }

  /**
   * @name Two.RoundedRectangle#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update() {
    if (
      this._flagVertices ||
      this._flagWidth ||
      this._flagHeight ||
      this._flagRadius
    ) {
      const width = this._width;
      const height = this._height;

      let rx, ry;

      if (this._radius instanceof Vector) {
        rx = this._radius.x;
        ry = this._radius.y;
      } else {
        rx = this._radius;
        ry = this._radius;
      }

      let v;
      let w = width / 2;
      let h = height / 2;

      v = this.vertices[0];
      v.x = -(w - rx);
      v.y = -h;

      // Upper Right Corner

      v = this.vertices[1];
      v.x = w - rx;
      v.y = -h;
      v.controls.left.clear();
      v.controls.right.x = rx;
      v.controls.right.y = 0;

      v = this.vertices[2];
      v.x = w;
      v.y = -(h - ry);
      v.controls.right.clear();
      v.controls.left.clear();

      // Bottom Right Corner

      v = this.vertices[3];
      v.x = w;
      v.y = h - ry;
      v.controls.left.clear();
      v.controls.right.x = 0;
      v.controls.right.y = ry;

      v = this.vertices[4];
      v.x = w - rx;
      v.y = h;
      v.controls.right.clear();
      v.controls.left.clear();

      // Bottom Left Corner

      v = this.vertices[5];
      v.x = -(w - rx);
      v.y = h;
      v.controls.left.clear();
      v.controls.right.x = -rx;
      v.controls.right.y = 0;

      v = this.vertices[6];
      v.x = -w;
      v.y = h - ry;
      v.controls.left.clear();
      v.controls.right.clear();

      // Upper Left Corner

      v = this.vertices[7];
      v.x = -w;
      v.y = -(h - ry);
      v.controls.left.clear();
      v.controls.right.x = 0;
      v.controls.right.y = -ry;

      v = this.vertices[8];
      v.x = -(w - rx);
      v.y = -h;
      v.controls.left.clear();
      v.controls.right.clear();

      v = this.vertices[9];
      v.copy(this.vertices[8]);
    }

    super._update.call(this);

    return this;
  }

  /**
   * @name Two.RoundedRectangle#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    this._flagWidth = this._flagHeight = this._flagRadius = false;
    super.flagReset.call(this);

    return this;
  }

  /**
   * @name Two.RoundedRectangle#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.RoundedRectangle}
   * @description Create a new instance of {@link Two.RoundedRectangle} with the same properties of the current path.
   */
  clone(parent) {
    const width = this.width;
    const height = this.height;
    const radius = this.radius;

    const clone = new RoundedRectangle(0, 0, width, height, radius);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    for (let i = 0; i < Path.Properties.length; i++) {
      const k = Path.Properties[i];
      clone[k] = this[k];
    }

    if (parent) {
      parent.add(clone);
    }

    return clone;
  }

  /**
   * @name Two.RoundedRectangle#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject() {
    const object = super.toObject.call(this);

    object.renderer.type = 'rounded-rectangle';

    for (let i = 0; i < RoundedRectangle.Properties.length; i++) {
      const k = RoundedRectangle.Properties[i];
      object[k] = this[k];
    }

    object.radius =
      typeof this.radius === 'number' ? this.radius : this.radius.toObject();

    return object;
  }
}

const proto = {
  width: {
    enumerable: true,
    get: function () {
      return this._width;
    },
    set: function (v) {
      this._width = v;
      this._flagWidth = true;
    },
  },
  height: {
    enumerable: true,
    get: function () {
      return this._height;
    },
    set: function (v) {
      this._height = v;
      this._flagHeight = true;
    },
  },
  radius: {
    enumerable: true,
    get: function () {
      return this._radius;
    },
    set: function (v) {
      if (this._radius instanceof Vector) {
        this._radius.unbind(Events.Types.change, this._renderer.flagRadius);
      }

      this._radius = v;

      if (this._radius instanceof Vector) {
        this._radius.bind(Events.Types.change, this._renderer.flagRadius);
      }

      this._flagRadius = true;
    },
  },
};

/**
 * @name FlagRadius
 * @private
 * @property {Function} - A convenience function to trigger the flag for radius changing.
 */
function FlagRadius() {
  this._flagRadius = true;
}
