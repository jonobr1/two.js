import Events from './events.js';
import _ from './utils/underscore.js';

import Matrix from './matrix.js';
import Vector from './vector.js';

import Constants from './constants.js';

/**
 * @name Two.Shape
 * @class
 * @extends Two.Events
 * @description The foundational transformation object for the Two.js scenegraph.
 */
function Shape() {

  /**
   * @name Two.Shape#renderer
   * @property {Object}
   * @description Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
   * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
   */
  this.renderer = {};
  this._renderer.flagMatrix = Shape.FlagMatrix.bind(this);
  this.isShape = true;

  /**
   * @name Two.Shape#id
   * @property {String} - Session specific unique identifier.
   * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
   */
  this.id = Constants.Identifier + Constants.uniqueId();

  /**
   * @name Two.Shape#classList
   * @property {String[]}
   * @description A list of class strings stored if imported / interpreted  from an SVG element.
   */
  this.classList = [];

  /**
   * @name Two.Shape#matrix
   * @property {Two.Matrix}
   * @description The transformation matrix of the shape.
   * @nota-bene {@link Two.Shape#translation}, {@link Two.Shape#rotation}, {@link Two.Shape#scale}, {@link Two.Shape#skewX}, and {@link Two.Shape#skewY} apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
   */
  this.matrix = new Matrix();

  /**
   * @name Two.Shape#translation
   * @property {Two.Vector} - The x and y value for where the shape is placed relative to its parent.
   */
  this.translation = new Vector();

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

_.extend(Shape, {

  /**
   * @name Two.Shape.FlagMatrix
   * @function
   * @description Utility function used in conjunction with event handlers to update the flagMatrix of a shape.
   */
  FlagMatrix: function() {
    this._flagMatrix = true;
  },

  /**
   * @name Two.Shape.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Shape} to any object. Handy if you'd like to extend the {@link Two.Shape} class on a custom class.
   */
  MakeObservable: function(object) {

    var translation = {
      enumerable: false,
      get: function() {
        return this._translation;
      },
      set: function(v) {
        if (this._translation) {
          this._translation.unbind(Events.Types.change, this._renderer.flagMatrix);
        }
        this._translation = v;
        this._translation.bind(Events.Types.change, this._renderer.flagMatrix);
        Shape.FlagMatrix.call(this);
      }
    };

    Object.defineProperty(object, 'translation', translation);
    Object.defineProperty(object, 'position', translation);

    Object.defineProperty(object, 'rotation', {
      enumerable: true,
      get: function() {
        return this._rotation;
      },
      set: function(v) {
        this._rotation = v;
        this._flagMatrix = true;
      }
    });

    Object.defineProperty(object, 'scale', {
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
    });

    Object.defineProperty(object, 'skewX', {
      enumerable: true,
      get: function() {
        return this._skewX;
      },
      set: function(v) {
        this._skewX = v;
        this._flagMatrix = true;
      }
    });

    Object.defineProperty(object, 'skewY', {
      enumerable: true,
      get: function() {
        return this._skewY;
      },
      set: function(v) {
        this._skewY = v;
        this._flagMatrix = true;
      }
    });

    Object.defineProperty(object, 'matrix', {
      enumerable: true,
      get: function() {
        return this._matrix;
      },
      set: function(v) {
        this._matrix = v;
        this._flagMatrix = true;
      }
    });

    Object.defineProperty(object, 'id', {
      enumerable: true,
      get: function() {
        return this._id;
      },
      set: function(v) {
        var id = this._id;
        if (v === this._id) {
          return;
        }
        this._id = v;
        this._flagId = true;
        if (this.parent) {
          delete this.parent.children.ids[id];
          this.parent.children.ids[this._id] = this;
        }
      }
    });

    Object.defineProperty(object, 'className', {

      enumerable: true,

      get: function() {
        return this._className;
      },

      set: function(v) {

        this._flagClassName = this._className !== v;

        if (this._flagClassName) {

          var prev = this._className.split(/\s+?/);
          var dest = v.split(/\s+?/);

          for (var i = 0; i < prev.length; i++) {
            var className = prev[i];
            var index = Array.prototype.indexOf.call(this.classList, className);
            if (index >= 0) {
              this.classList.splice(index, 1);
            }
          }

          this.classList = this.classList.concat(dest);

        }

        this._className = v;

      }

    });

    Object.defineProperty(object, 'renderer', {

      enumerable: false,

      get: function() {
        return this._renderer;
      },

      set: function(obj) {
        this._renderer = obj;
      }

    });

  }

});

_.extend(Shape.prototype, Events, {

  constructor: Shape,

  // Flags

  /**
   * @name Two.Shape#_id
   * @private
   * @property {Boolean} - Determines whether the id needs updating.
   */
  _flagId: true,

  /**
   * @name Two.Shape#_flagMatrix
   * @private
   * @property {Boolean} - Determines whether the matrix needs updating.
   */
  _flagMatrix: true,

  /**
   * @name Two.Shape#_flagScale
   * @private
   * @property {Boolean} - Determines whether the scale needs updating.
   */
  _flagScale: false,

  // _flagMask: false,
  // _flagClip: false,

  /**
   * @name Two.Shape#_flagClassName
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#className} need updating.
   */
  _flagClassName: false,

  // Underlying Properties

  _id: '',

  /**
   * @name Two.Shape#_translation
   * @private
   * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
   */
  _translation: null,

  /**
   * @name Two.Shape#_rotation
   * @private
   * @property {Number} - The rotation value in Number.
   */
  _rotation: 0,

  /**
   * @name Two.Shape#_translation
   * @private
   * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
   */
  _scale: 1,

  /**
   * @name Two.Shape#_skewX
   * @private
   * @property {Number} - The rotation value in Number.
   */
  _skewX: 0,

  /**
   * @name Two.Shape#_skewY
   * @private
   * @property {Number} - The rotation value in Number.
   */
  _skewY: 0,

  // _mask: null,
  // _clip: false,

  /**
   * @name Two.Shape#className
   * @property {String} - A class to be applied to the element to be compatible with CSS styling.
   * @nota-bene Only available for the SVG renderer.
   */
  _className: '',

  /**
   * @name Two.Shape#addTo
   * @function
   * @param {Two.Group} group - The parent the shape adds itself to.
   * @description Convenience method to add itself to the scenegraph.
   */
  addTo: function(group) {
    group.add(this);
    return this;
  },

  /**
   * @name Two.Shape#clone
   * @function
   * @param {Two.Group} [parent] - Optional argument to automatically add the shape to a scenegraph.
   * @returns {Two.Shape}
   * @description Create a new {@link Two.Shape} with the same values as the current shape.
   */
  clone: function(parent) {

    var clone = new Shape();

    clone.translation.copy(this.translation);
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

  },

  /**
   * @name Two.Shape#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function(bubbles) {

    if (!this._matrix.manual && this._flagMatrix) {

      this._matrix
        .identity()
        .translate(this.translation.x, this.translation.y);

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

  },

  /**
   * @name Two.Shape#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagId = this._flagMatrix = this._flagScale =
      this._flagClassName = false;

    return this;

  }

});

Shape.MakeObservable(Shape.prototype);

export default Shape;
