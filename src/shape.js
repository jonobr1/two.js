import { Constants } from './constants.js';
import { Events } from './events.js';
import { Element } from './element.js';
import { Matrix } from './matrix.js';
import { Vector } from './vector.js';
import { getComputedMatrix } from './utils/math.js';

/**
 * @name Two.Shape
 * @class
 * @extends Two.Element
 * @description The foundational transformation object for the Two.js scenegraph.
 */
export class Shape extends Element {

  /**
   * @name Two.Shape#_flagMatrix
   * @private
   * @property {Boolean} - Determines whether the matrix needs updating.
   */
  _flagMatrix = true;

  /**
   * @name Two.Shape#_flagScale
   * @private
   * @property {Boolean} - Determines whether the scale needs updating.
   */
  _flagScale = false;

  // Underlying Properties

  /**
   * @name Two.Shape#_matrix
   * @private
   * @property {Two.Matrix} - The matrix value of the shape's position, rotation, and scale.
   */
  _matrix = null;

  /**
   * @name Two.Shape#_worldMatrix
   * @private
   * @property {Two.Matrix} - The matrix value of the shape's position, rotation, and scale in the scene.
   */
  _worldMatrix = null;

  /**
   * @name Two.Shape#_position
   * @private
   * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
   */
  _position = null;

  /**
   * @name Two.Shape#_rotation
   * @private
   * @property {Number} - The rotation value in Number.
   */
  _rotation = 0;

  /**
   * @name Two.Shape#_scale
   * @private
   * @property {Number|Two.Vector} - The scale value in Number. Can be a vector for non-uniform scaling.
   */
  _scale = 1;

  /**
   * @name Two.Shape#_skewX
   * @private
   * @property {Number} - The rotation value in Number.
   */
  _skewX = 0;

  /**
   * @name Two.Shape#_skewY
   * @private
   * @property {Number} - The rotation value in Number.
   */
  _skewY = 0;

  constructor() {

    super();

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    /**
     * @name Two.Shape#renderer
     * @property {Object}
     * @description Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
     * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
     */
    this._renderer.flagMatrix = FlagMatrix.bind(this);
    this.isShape = true;

    /**
     * @name Two.Shape#id
     * @property {String} - Session specific unique identifier.
     * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
     */
    this.id = Constants.Identifier + Constants.uniqueId();

    /**
     * @name Two.Shape#matrix
     * @property {Two.Matrix}
     * @description The transformation matrix of the shape.
     * @nota-bene {@link Two.Shape#position}, {@link Two.Shape#rotation}, {@link Two.Shape#scale}, {@link Two.Shape#skewX}, and {@link Two.Shape#skewY} apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
     */
    this.matrix = new Matrix();

    /**
     * @name Two.Shape#worldMatrix
     * @property {Two.Matrix}
     * @description The transformation matrix of the shape in the scene.
     */
    this.worldMatrix = new Matrix();

    /**
     * @name Two.Shape#position
     * @property {Two.Vector} - The x and y value for where the shape is placed relative to its parent.
     */
    this.position = new Vector();

    /**
     * @name Two.Shape#rotation
     * @property {Number} - The value in Number for how much the shape is rotated relative to its parent.
     */
    this.rotation = 0;

    /**
     * @name Two.Shape#scale
     * @property {Number} - The value for how much the shape is scaled relative to its parent.
     * @nota-bene This value can be replaced with a {@link Two.Vector} to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
     */
    this.scale = 1;

    /**
     * @name Two.Shape#skewX
     * @property {Number} - The value in Number for how much the shape is skewed relative to its parent.
     * @description Skew the shape by an angle in the x axis direction.
     */
    this.skewX = 0;

    /**
     * @name Two.Shape#skewY
     * @property {Number} - The value in Number for how much the shape is skewed relative to its parent.
     * @description Skew the shape by an angle in the y axis direction.
     */
    this.skewY = 0;

  }

  get renderer() {
    return this._renderer;
  }
  set renderer(v) {
    this._renderer = v;
  }

  /**
   * @name Two.Shape#translation
   * @description Alias for {@link Two.Shape#position}.
   */
  get translation() {
    return proto.position.get.apply(this, arguments);
  }
  set translation(v) {
    proto.position.set.apply(this, arguments);
  }

  /**
   * @name Two.Shape#addTo
   * @function
   * @param {Two.Group} group - The parent the shape adds itself to.
   * @description Convenience method to add itself to the scenegraph.
   */
  addTo(group) {
    group.add(this);
    return this;
  }

  /**
   * @name Two.Shape#remove
   * @function
   * @description Remove self from the scene / parent.
   */
  remove() {

    if (!this.parent) {
      return this;
    }

    this.parent.remove(this);

    return this;

  }

  /**
   * @name Two.Shape#clone
   * @function
   * @param {Two.Group} [parent] - Optional argument to automatically add the shape to a scenegraph.
   * @returns {Two.Shape}
   * @description Create a new {@link Two.Shape} with the same values as the current shape.
   */
  clone(parent) {

    const clone = new Shape();

    clone.position.copy(this.position);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();

  }

  /**
   * @name Two.Shape#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update(bubbles) {

    if (!this._matrix.manual && this._flagMatrix) {

      this._matrix
        .identity()
        .translate(this.position.x, this.position.y);

        if (this._scale instanceof Vector) {
          this._matrix.scale(this._scale.x, this._scale.y);
        } else {
          this._matrix.scale(this._scale);
        }

        this._matrix.rotate(this.rotation);
        this._matrix.skewX(this.skewX);
        this._matrix.skewY(this.skewY);
    }

    if (bubbles) {
      if (this.parent && this.parent._update) {
        this.parent._update();
      }
    }

    return this;

  }

  /**
   * @name Two.Shape#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {

    this._flagMatrix = this._flagScale = false;

    super.flagReset.call(this);

    return this;

  }

}

const proto = {
  position: {
    enumerable: true,
    get: function() {
      return this._position;
    },
    set: function(v) {
      if (this._position) {
        this._position.unbind(Events.Types.change, this._renderer.flagMatrix);
      }
      this._position = v;
      this._position.bind(Events.Types.change, this._renderer.flagMatrix);
      FlagMatrix.call(this);
    }
  },
  rotation: {
    enumerable: true,
    get: function() {
      return this._rotation;
    },
    set: function(v) {
      this._rotation = v;
      this._flagMatrix = true;
    }
  },
  scale: {
    enumerable: true,
    get: function() {
      return this._scale;
    },
    set: function(v) {
      if (this._scale instanceof Vector) {
        this._scale.unbind(Events.Types.change, this._renderer.flagMatrix);
      }
      this._scale = v;
      if (this._scale instanceof Vector) {
        this._scale.bind(Events.Types.change, this._renderer.flagMatrix);
      }
      this._flagMatrix = true;
      this._flagScale = true;
    }
  },
  skewX: {
    enumerable: true,
    get: function() {
      return this._skewX;
    },
    set: function(v) {
      this._skewX = v;
      this._flagMatrix = true;
    }
  },
  skewY: {
    enumerable: true,
    get: function() {
      return this._skewY;
    },
    set: function(v) {
      this._skewY = v;
      this._flagMatrix = true;
    }
  },
  matrix: {
    enumerable: true,
    get: function() {
      return this._matrix;
    },
    set: function(v) {
      this._matrix = v;
      this._flagMatrix = true;
    }
  },
  worldMatrix: {
    enumerable: true,
    get: function() {
      // TODO: Make DRY
      getComputedMatrix(this, this._worldMatrix);
      return this._worldMatrix;
    },
    set: function(v) {
      this._worldMatrix = v;
    }
  }
};

/**
 * @name FlagMatrix
 * @function
 * @private
 * @description Utility function used in conjunction with event handlers to update the flagMatrix of a shape.
 */
function FlagMatrix() {
  this._flagMatrix = true;
}
