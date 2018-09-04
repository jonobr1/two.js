(function(Two) {

  var _ = Two.Utils;

  /**
   * @name Two.Shape
   * @class
   * @extends Two.Utils.Events
   * @description The foundational transformation object for the Two.js scenegraph.
   */
  var Shape = Two.Shape = function() {

    /**
     * @name Two.Shape#_renderer
     * @property {Object}
     * @private
     * @description A private object to store relevant renderer specific variables.
     * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape._renderer.elem`.
     */
    this._renderer = {};
    this._renderer.flagMatrix = _.bind(Shape.FlagMatrix, this);
    this.isShape = true;

    /**
     * @name Two.Shape#id
     * @property {String} - Session specific unique identifier.
     * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
     */
    this.id = Two.Identifier + Two.uniqueId();

    /**
     * @name Two.Shape#classList
     * @property {Array}
     * @description A list of class strings stored if imported / interpreted  from an SVG element.
     */
    this.classList = [];

    /**
     * @name Two.Shape#_matrix
     * @property
     * @description The transformation matrix of the shape.
     * @nota-bene {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale} apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
     */
    this._matrix = new Two.Matrix();

    /**
     * @name Two.Shape#translation
     * @property {Two.Vector} - The x and y value for where the shape is placed relative to its parent.
     */
    this.translation = new Two.Vector();

    /**
     * @name Two.Shape#rotation
     * @property {Radians} - The value in radians for how much the shape is rotated relative to its parent.
     */
    this.rotation = 0;

    /**
     * @name Two.Shape#scale
     * @property {Number} - The value for how much the shape is scaled relative to its parent.
     * @nota-bene This value can be replaced with a {@link Two.Vector} to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
     */
    this.scale = 1;

  };

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
     * @description Convenience function to apply observable qualities of a `Two.Shape` to any object. Handy if you'd like to extend the `Two.Shape` class on a custom class.
     */
    MakeObservable: function(object) {

      Object.defineProperty(object, 'translation', {
        enumerable: true,
        get: function() {
          return this._translation;
        },
        set: function(v) {
          if (this._translation) {
            this._translation.unbind(Two.Events.change, this._renderer.flagMatrix);
          }
          this._translation = v;
          this._translation.bind(Two.Events.change, this._renderer.flagMatrix);
          Shape.FlagMatrix.call(this);
        }
      });

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

          if (this._scale instanceof Two.Vector) {
            this._scale.unbind(Two.Events.change, this._renderer.flagMatrix);
          }

          this._scale = v;

          if (this._scale instanceof Two.Vector) {
            this._scale.bind(Two.Events.change, this._renderer.flagMatrix);
          }

          this._flagMatrix = true;
          this._flagScale = true;

        }
      });

    }

  });

  _.extend(Shape.prototype, Two.Utils.Events, {

    // Flags

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

    // Underlying Properties

    /**
     * @name Two.Shape#_translation
     * @private
     * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
     */
    _translation: null,

    /**
     * @name Two.Shape#_rotation
     * @private
     * @property {Radians} - The rotation value in radians.
     */
    _rotation: 0,

    /**
     * @name Two.Shape#_translation
     * @private
     * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
     */
    _scale: 1,

    // _mask: null,
    // _clip: false,

    constructor: Shape,

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
     * @description Create a new `Two.Shape` with the same values as the current shape.
     */
    clone: function(parent) {

      var clone = new Shape();

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

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

          if (this._scale instanceof Two.Vector) {
            this._matrix.scale(this._scale.x, this._scale.y);
          } else {
            this._matrix.scale(this._scale);
          }

          this._matrix.rotate(this.rotation);

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

      this._flagMatrix = this._flagScale = false;

      return this;

    }

  });

  Shape.MakeObservable(Shape.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
