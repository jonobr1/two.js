import { Commands } from '../utils/path-commands.js';
import { TWO_PI } from '../utils/math.js';

import { Path } from '../path.js';
import { Anchor } from '../anchor.js';

const cos = Math.cos,
  sin = Math.sin;

/**
 * @name Two.Star
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the star.
 * @param {Number} [y=0] - The y position of the star.
 * @param {Number} [innerRadius=0] - The inner radius value of the star.
 * @param {Number} [outerRadius=0] - The outer radius value of the star.
 * @param {Number} [sides=5] - The number of sides used to construct the star.
 */
export class Star extends Path {
  /**
   * @name Two.Star#_flagInnerRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Star#innerRadius} needs updating.
   */
  _flagInnerRadius = false;
  /**
   * @name Two.Star#_flagOuterRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Star#outerRadius} needs updating.
   */
  _flagOuterRadius = false;
  /**
   * @name Two.Star#_flagSides
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Star#sides} needs updating.
   */
  _flagSides = false;

  /**
   * @name Two.Star#_innerRadius
   * @private
   * @see {@link Two.Star#innerRadius}
   */
  _innerRadius = 0;
  /**
   * @name Two.Star#_outerRadius
   * @private
   * @see {@link Two.Star#outerRadius}
   */
  _outerRadius = 0;
  /**
   * @name Two.Star#_sides
   * @private
   * @see {@link Two.Star#sides}
   */
  _sides = 0;

  constructor(x, y, innerRadius, outerRadius, sides) {
    if (arguments.length <= 3) {
      outerRadius = innerRadius;
      innerRadius = outerRadius / 2;
    }

    if (typeof sides !== 'number' || sides <= 0) {
      sides = 5;
    }

    super();

    this._renderer.type = 'star';

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this.closed = true;
    this.automatic = false;

    /**
     * @name Two.Star#innerRadius
     * @property {Number} - The size of the inner radius of the star.
     */
    if (typeof innerRadius === 'number') {
      this.innerRadius = innerRadius;
    }

    /**
     * @name Two.Star#outerRadius
     * @property {Number} - The size of the outer radius of the star.
     */
    if (typeof outerRadius === 'number') {
      this.outerRadius = outerRadius;
    }

    /**
     * @name Two.Star#sides
     * @property {Number} - The amount of sides the star has.
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
   * @name Two.Star.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Star}.
   */
  static Properties = ['innerRadius', 'outerRadius', 'sides'];

  /**
   * @name Two.Star.fromObject
   * @function
   * @param {Object} obj - Object notation of a {@link Two.Star} to create a new instance
   * @returns {Two.Star}
   * @description Create a new {@link Two.Star} from an object notation of a {@link Two.Star}.
   * @nota-bene Works in conjunction with {@link Two.Star#toObject}
   */
  static fromObject(obj) {
    const star = new Star().copy(obj);

    if ('id' in obj) {
      star.id = obj.id;
    }

    return star;
  }

  /**
   * @name Two.Star#copy
   * @function
   * @param {Two.Star} star - The reference {@link Two.Star}
   * @description Copy the properties of one {@link Two.Star} onto another.
   */
  copy(star) {
    super.copy.call(this, star);

    for (let i = 0; i < Star.Properties.length; i++) {
      const k = Star.Properties[i];
      if (k in star && typeof star[k] === 'number') {
        this[k] = star[k];
      }
    }

    return this;
  }

  /**
   * @name Two.Star#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update() {
    if (
      this._flagVertices ||
      this._flagInnerRadius ||
      this._flagOuterRadius ||
      this._flagSides
    ) {
      const sides = this._sides * 2;
      const amount = sides + 1;
      let length = this.vertices.length;

      if (length > sides) {
        this.vertices.splice(sides - 1, length - sides);
        length = sides;
      }

      for (let i = 0; i < amount; i++) {
        const pct = (i + 0.5) / sides;
        const theta = TWO_PI * pct;
        const r = (!(i % 2) ? this._innerRadius : this._outerRadius) / 2;
        const x = r * cos(theta);
        const y = r * sin(theta);

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
   * @name Two.Star#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false;
    super.flagReset.call(this);

    return this;
  }

  /**
   * @name Two.Star#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Star}
   * @description Create a new instance of {@link Two.Star} with the same properties of the current path.
   */
  clone(parent) {
    const ir = this.innerRadius;
    const or = this.outerRadius;
    const sides = this.sides;

    const clone = new Star(0, 0, ir, or, sides);

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
   * @name Two.Star#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject() {
    const object = super.toObject.call(this);

    object.renderer.type = 'star';

    for (let i = 0; i < Star.Properties.length; i++) {
      const k = Star.Properties[i];
      object[k] = this[k];
    }

    return object;
  }
}

const proto = {
  innerRadius: {
    enumerable: true,
    get: function () {
      return this._innerRadius;
    },
    set: function (v) {
      this._innerRadius = v;
      this._flagInnerRadius = true;
    },
  },
  outerRadius: {
    enumerable: true,
    get: function () {
      return this._outerRadius;
    },
    set: function (v) {
      this._outerRadius = v;
      this._flagOuterRadius = true;
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
