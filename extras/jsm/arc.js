import { TWO_PI } from '../../src/utils/math.js';
import { Constants } from '../../src/constants.js';

import { Anchor } from '../../src/anchor.js';
import { Path } from '../../src/path.js';

const cos = Math.cos,
  sin = Math.sin;

/**
 * @name Two.Arc
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the arc.
 * @param {Number} [y=0] - The y position of the arc.
 * @param {Number} [width=0] - The width, horizontal diameter, of the arc.
 * @param {Number} [height=0] - The height, vertical diameter, of the arc.
 * @param {Number} [startAngle=0] - The starting angle of the arc in radians.
 * @param {Number} [endAngle=6.283] - The ending angle of the arc in radians.
 * @param {Number} [resolution=4] - The number of vertices used to construct the circle.
 */
export class Arc extends Path {
  _flagWidth = false;
  _flagHeight = false;
  _flagStartAngle = false;
  _flagEndAngle = false;

  _width = 0;
  _height = 0;
  _startAngle = 0;
  _endAngle = TWO_PI;

  constructor(x, y, width, height, startAngle, endAngle, resolution) {
    if (typeof resolution !== 'number') {
      resolution = Constants.Resolution;
    }

    const points = [];
    for (let i = 0; i < resolution; i++) {
      points.push(new Anchor());
    }

    super(points);

    for (let j = 0; j < Arc.Properties.length; j++) {
      const prop = Arc.Properties[j];
      Object.defineProperty(this, prop, protos[prop]);
    }

    this.curved = true;

    /**
     * @name Two.Arc#width
     * @property {Number} - The horizontal size of the arc.
     */
    if (typeof width === 'number') {
      this.width = width;
    }

    /**
     * @name Two.Arc#height
     * @property {Number} - The vertical size of the arc.
     */
    if (typeof height === 'number') {
      this.height = height;
    }

    /**
     * @name Two.ArcSegment#startAngle
     * @property {Number} - The angle of one side for the arc segment.
     */
    if (typeof startAngle === 'number') {
      this.startAngle = startAngle;
    }

    /**
     * @name Two.ArcSegment#endAngle
     * @property {Number} - The angle of the other side for the arc segment.
     */
    if (typeof endAngle === 'number') {
      this.endAngle = endAngle;
    }

    this._update();

    if (typeof x === 'number') {
      this.position.x = x;
    }
    if (typeof y === 'number') {
      this.position.y = y;
    }
  }

  /**
   * @name Two.Arc.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Arc}.
   */
  static Properties = ['width', 'height', 'startAngle', 'endAngle'];

  /**
   * @name Two.Arc#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update() {
    if (
      this._flagVertices ||
      this._flagRadius ||
      this._flagWidth ||
      this._flagHeight ||
      this._flagStartAngle ||
      this._flagEndAngle
    ) {
      const { width, height, startAngle, endAngle, vertices } = this;
      const rx = width / 2;
      const ry = height / 2;

      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];
        const pct = i / (vertices.length - 1);
        const theta = pct * (endAngle - startAngle) + startAngle;

        v.x = rx * cos(theta);
        v.y = ry * sin(theta);
      }
    }

    super._update.call(this);

    return this;
  }

  /**
   * @name Two.Arc#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    super.flagReset.call(this);

    this._flagWidth =
      this._flagHeight =
      this._flagStartAngle =
      this._flagEndAngle =
        false;

    return this;
  }

  /**
   * @name Two.Arc#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.ArcSegment}
   * @description Create a new instance of {@link Two.ArcSegment} with the same properties of the current path.
   */
  clone() {
    const { width, height, startAngle, endAngle } = this;
    const resolution = this.vertices.length;

    const clone = new Arc(
      0,
      0,
      width,
      height,
      startAngle,
      endAngle,
      resolution
    );

    clone.position.copy(this.position);
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
}

const protos = {
  width: {
    enumerable: true,
    get: function () {
      return this._width;
    },
    set: function (v) {
      if (v !== this._width) {
        this._width = v;
        this._flagWidth = true;
      }
    },
  },
  height: {
    enumerable: true,
    get: function () {
      return this._height;
    },
    set: function (v) {
      if (v !== this._height) {
        this._height = v;
        this._flagHeight = true;
      }
    },
  },
  startAngle: {
    enumerable: true,
    get: function () {
      return this._startAngle;
    },
    set: function (v) {
      if (v !== this._startAngle) {
        this._startAngle = v;
        this._flagStartAngle = true;
      }
    },
  },
  endAngle: {
    enumerable: true,
    get: function () {
      return this._endAngle;
    },
    set: function (v) {
      if (v !== this._endAngle) {
        this._endAngle = v;
        this._flagEndAngle = true;
      }
    },
  },
};
