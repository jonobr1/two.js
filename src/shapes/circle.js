import { Commands } from '../utils/path-commands.js';
import { HALF_PI, TWO_PI } from '../utils/math.js';

import { Path } from '../path.js';
import { Anchor } from '../anchor.js';

const cos = Math.cos,
  sin = Math.sin;

/**
 * @name Two.Circle
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the circle.
 * @param {Number} [y=0] - The y position of the circle.
 * @param {Number} [radius=0] - The radius value of the circle.
 * @param {Number} [resolution=4] - The number of vertices used to construct the circle.
 */
export class Circle extends Path {
  /**
   * @name Two.Circle#_flagRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Circle#radius} needs updating.
   */
  _flagRadius = false;

  /**
   * @name Two.Circle#_radius
   * @private
   * @see {@link Two.Circle#radius}
   */
  _radius = 0;

  constructor(ox, oy, r, resolution) {
    // At least 2 vertices are required for proper circlage
    const amount = resolution ? Math.max(resolution, 2) : 4;
    const points = [];
    for (let i = 0; i < amount; i++) {
      points.push(new Anchor(0, 0, 0, 0, 0, 0));
    }

    super(points, true, true, true);

    this._renderer.type = 'circle';

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    /**
     * @name Two.Circle#radius
     * @property {Number} - The size of the radius of the circle.
     */
    if (typeof r === 'number') {
      this.radius = r;
    }

    this._update();

    if (typeof ox === 'number') {
      this.translation.x = ox;
    }
    if (typeof oy === 'number') {
      this.translation.y = oy;
    }
  }

  /**
   * @name Two.Circle.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Circle}.
   */
  static Properties = ['radius'];

  /**
   * @name Two.Circle.fromObject
   * @function
   * @param {Object} obj - Object notation of a {@link Two.Circle} to create a new instance
   * @returns {Two.Circle}
   * @description Create a new {@link Two.Circle} from an object notation of a {@link Two.Circle}.
   * @nota-bene Works in conjunction with {@link Two.Circle#toObject}
   */
  static fromObject(obj) {
    const circle = new Circle().copy(obj);

    if ('id' in obj) {
      circle.id = obj.id;
    }

    return circle;
  }

  /**
   * @name Two.Circle#copy
   * @function
   * @param {Two.Circle} circle - The reference {@link Two.Circle}
   * @description Copy the properties of one {@link Two.Circle} onto another.
   */
  copy(circle) {
    super.copy.call(this, circle);

    for (let i = 0; i < Circle.Properties.length; i++) {
      const k = Circle.Properties[i];
      if (k in circle && typeof circle[k] === 'number') {
        this[k] = circle[k];
      }
    }

    return this;
  }

  /**
   * @name Two.Circle#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update() {
    if (this._flagVertices || this._flagRadius) {
      let length = this.vertices.length;

      if (!this._closed && length > 2) {
        length -= 1;
      }

      // Coefficient for approximating circular arcs with Bezier curves
      const c = (4 / 3) * Math.tan(Math.PI / (length * 2));
      const radius = this._radius;
      const rc = radius * c;

      for (let i = 0; i < this.vertices.length; i++) {
        const pct = i / length;
        const theta = pct * TWO_PI;

        const x = radius * cos(theta);
        const y = radius * sin(theta);

        const lx = rc * cos(theta - HALF_PI);
        const ly = rc * sin(theta - HALF_PI);

        const rx = rc * cos(theta + HALF_PI);
        const ry = rc * sin(theta + HALF_PI);

        const v = this.vertices[i];

        v.command = i === 0 ? Commands.move : Commands.curve;
        v.set(x, y);
        v.controls.left.set(lx, ly);
        v.controls.right.set(rx, ry);
      }
    }

    super._update.call(this);
    return this;
  }

  /**
   * @name Two.Circle#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    this._flagRadius = false;

    super.flagReset.call(this);
    return this;
  }

  /**
   * @name Two.Circle#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Circle}
   * @description Create a new instance of {@link Two.Circle} with the same properties of the current path.
   */
  clone(parent) {
    const clone = new Circle(0, 0, this.radius, this.vertices.length);

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
   * @name Two.Circle#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject() {
    const object = super.toObject.call(this);

    object.renderer.type = 'circle';

    for (let i = 0; i < Circle.Properties.length; i++) {
      const k = Circle.Properties[i];
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
      this._flagRadius = true;
    },
  },
};
