import { Commands } from '../utils/path-commands.js';
import { TWO_PI } from '../utils/math.js';

import { Path } from '../path.js';
import { Anchor } from '../anchor.js';

const cos = Math.cos,
  sin = Math.sin;

/**
 * @name Two.Polygon
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the polygon.
 * @param {Number} [y=0] - The y position of the polygon.
 * @param {Number} [radius=0] - The radius value of the polygon.
 * @param {Number} [sides=12] - The number of vertices used to construct the polygon.
 */
export class Polygon extends Path {
  /**
   * @name Two.Polygon#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Polygon#width} needs updating.
   */
  _flagWidth = false;
  /**
   * @name Two.Polygon#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Polygon#height} needs updating.
   */
  _flagHeight = false;
  /**
   * @name Two.Polygon#_flagSides
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Polygon#sides} needs updating.
   */
  _flagSides = false;

  /**
   * @name Two.Polygon#_radius
   * @private
   * @see {@link Two.Polygon#radius}
   */
  _radius = 0;
  /**
   * @name Two.Polygon#_width
   * @private
   * @see {@link Two.Polygon#width}
   */
  _width = 0;
  /**
   * @name Two.Polygon#_height
   * @private
   * @see {@link Two.Polygon#height}
   */
  _height = 0;
  /**
   * @name Two.Polygon#_sides
   * @private
   * @see {@link Two.Polygon#sides}
   */
  _sides = 0;

  constructor(x, y, radius, sides) {
    sides = Math.max(sides || 0, 3);

    super();

    this._renderer.type = 'polygon';

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this.closed = true;
    this.automatic = false;

    /**
     * @name Two.Polygon#radius
     * @property {Number} - The radius value of the polygon.
     * @nota-bene This property is tied to {@link Two.Polygon#width} and {@link Two.Polygon#height}. When you set `radius`, it affects `width` and `height`. Likewise, if you set `width` or `height` it will change the `radius`.
     */
    if (typeof radius === 'number') {
      this.radius = radius;
    }

    /**
     * @name Two.Polygon#width
     * @property {Number} - The size of the width of the polygon.
     * @nota-bene This property is tied to {@link Two.Polygon#radius}. When you set `radius`, it affects the `width`. Likewise, if you set `width` it will change the `radius`.
     */

    /**
     * @name Two.Polygon#height
     * @property {Number} - The size of the height of the polygon.
     * @nota-bene This property is tied to {@link Two.Polygon#radius}. When you set `radius`, it affects the `height`. Likewise, if you set `height` it will change the `radius`.
     */

    /**
     * @name Two.Polygon#sides
     * @property {Number} - The amount of sides the polyogn has.
     */
    if (typeof sides === 'number') {
      this.sides = sides;
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
   * @name Two.Polygon.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Polygon}.
   */
  static Properties = ['width', 'height', 'sides'];

  /**
   * @name Two.Polygon.fromObject
   * @function
   * @param {Object} obj - Object notation of a {@link Two.Polygon} to create a new instance
   * @returns {Two.Polygon}
   * @description Create a new {@link Two.Polygon} from an object notation of a {@link Two.Polygon}.
   * @nota-bene Works in conjunction with {@link Two.Polygon#toObject}
   */
  static fromObject(obj) {
    const polygon = new Polygon().copy(obj);

    if ('id' in obj) {
      polygon.id = obj.id;
    }

    return polygon;
  }

  /**
   * @name Two.Polygon#copy
   * @function
   * @param {Two.Polygon} polygon - The reference {@link Two.Polygon}
   * @description Copy the properties of one {@link Two.Polygon} onto another.
   */
  copy(polygon) {
    super.copy.call(this, polygon);

    for (let i = 0; i < Polygon.Properties.length; i++) {
      const k = Polygon.Properties[i];
      if (k in polygon && typeof polygon[k] === 'number') {
        this[k] = polygon[k];
      }
    }

    return this;
  }

  /**
   * @name Two.Polygon#_update
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
      this._flagSides
    ) {
      const sides = this._sides;
      const amount = sides + 1;
      let length = this.vertices.length;

      if (length > sides) {
        this.vertices.splice(sides - 1, length - sides);
        length = sides;
      }

      for (let i = 0; i < amount; i++) {
        const pct = (i + 0.5) / sides;
        const theta = TWO_PI * pct + Math.PI / 2;
        const x = (this._width * cos(theta)) / 2;
        const y = (this._height * sin(theta)) / 2;

        if (i >= length) {
          this.vertices.push(new Anchor(x, y));
        } else {
          this.vertices[i].set(x, y);
        }

        this.vertices[i].command = i === 0 ? Commands.move : Commands.line;
      }
    }

    super._update.call(this);
    return this;
  }

  /**
   * @name Two.Polygon#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    this._flagWidth = this._flagHeight = this._flagSides = false;
    super.flagReset.call(this);

    return this;
  }

  /**
   * @name Two.Polygon#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Polygon}
   * @description Create a new instance of {@link Two.Polygon} with the same properties of the current path.
   */
  clone(parent) {
    const clone = new Polygon(0, 0, 0, this.sides);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;
    clone.width = this.width;
    clone.height = this.height;

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
   * @name Two.Polygon#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject() {
    const object = super.toObject.call(this);

    object.renderer.type = 'polygon';

    for (let i = 0; i < Polygon.Properties.length; i++) {
      const k = Polygon.Properties[i];
      object[k] = this[k];
    }

    return object;
  }
}

const proto = {
  radius: {
    enumerable: true,
    get: function () {
      return this._radius;
    },
    set: function (v) {
      this._radius = v;
      this.width = v * 2;
      this.height = v * 2;
    },
  },
  width: {
    enumerable: true,
    get: function () {
      return this._width;
    },
    set: function (v) {
      this._width = v;
      this._flagWidth = true;
      this._radius = Math.max(this.width, this.height) / 2;
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
      this._radius = Math.max(this.width, this.height) / 2;
    },
  },
  sides: {
    enumerable: true,
    get: function () {
      return this._sides;
    },
    set: function (v) {
      this._sides = v;
      this._flagSides = true;
    },
  },
};
