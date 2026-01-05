declare module 'two.js/src/shape' {
  export interface ShapeHitTestOptions {
    precision?: number;
    tolerance?: number;
    fill?: boolean;
    stroke?: boolean;
    ignoreVisibility?: boolean;
  }
  /**
     * @name Two.Shape
     * @class

     * @description The foundational transformation object for the Two.js scenegraph.
     */
  export class Shape extends TwoElement {
    static Properties: (
      | 'position'
      | 'rotation'
      | 'scale'
      | 'skewX'
      | 'skewY'
      | 'matrix'
      | 'worldMatrix'
      | string
    )[];
    /**
     * @name Two.Shape.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Shape} to create a new instance
     * @returns {Two.Shape}
     * @description Create a new {@link Two.Shape} from an object notation of a {@link Two.Shape}.
     * @nota-bene Works in conjunction with {@link Two.Shape#toObject}
     */
    static fromObject(
      obj: Parameters<typeof TwoElement.fromObject>[0] &
        ((
          | {
              translation?: { x: number; y: number } | Vector;
              position?: never;
            }
          | {
              position?: { x: number; y: number } | Vector;
              translation?: never;
            }
        ) & {
          rotation?: number;
          scale?: number | { x: number; y: number } | Vector;
          skewX?: number;
          skewY?: number;
          matrix?: Parameters<typeof Matrix.fromObject>[0];
        })
    ): Shape;
    /**
     * @name Two.Shape#_flagMatrix
     * @private
     * @property {Boolean} - Determines whether the matrix needs updating.
     */
    private _flagMatrix;
    /**
     * @name Two.Shape#_flagScale
     * @private
     * @property {Boolean} - Determines whether the scale needs updating.
     */
    private _flagScale;
    /**
     * @name Two.Shape#_matrix
     * @private
     * @property {Matrix} - The matrix value of the shape's position, rotation, and scale.
     */
    private _matrix;
    /**
     * @name Two.Shape#_worldMatrix
     * @private
     * @property {Matrix} - The matrix value of the shape's position, rotation, and scale in the scene.
     */
    private _worldMatrix;
    /**
     * @name Two.Shape#_position
     * @private
     * @property {Vector} - The translation values as a {@link Two.Vector}.
     */
    private _position;
    /**
     * @name Two.Shape#_rotation
     * @private
     * @property {Number} - The rotation value in Number.
     */
    private _rotation;
    /**
     * @name Two.Shape#_scale
     * @private
     * @property {Number|Vector} - The scale value in Number. Can be a vector for non-uniform scaling.
     */
    private _scale;
    /**
     * @name Two.Shape#_skewX
     * @private
     * @property {Number} - The rotation value in Number.
     */
    private _skewX;
    /**
     * @name Two.Shape#_skewY
     * @private
     * @property {Number} - The rotation value in Number.
     */
    private _skewY;
    isShape: true;
    /**
     * @name Two.Shape#id
     * @property {String} - Session specific unique identifier.
     * @nota-bene In the {@link Two.SVGRenderer} change this to change the underlying SVG element's id too.
     */
    id: string;
    /**
     * @name Two.Shape#matrix
     * @property {Matrix}
     * @description The transformation matrix of the shape.
     * @nota-bene {@link Two.Shape#position}, {@link Two.Shape#rotation}, {@link Two.Shape#scale}, {@link Two.Shape#skewX}, and {@link Two.Shape#skewY} apply their values to the matrix when changed. The matrix is what is sent to the renderer to be drawn.
     */
    matrix: Matrix;
    /**
     * @name Two.Shape#worldMatrix
     * @property {Matrix}
     * @description The transformation matrix of the shape in the scene.
     */
    worldMatrix: Matrix;
    /**
     * @name Two.Shape#position
     * @property {Vector} - The x and y value for where the shape is placed relative to its parent.
     */
    position: Vector;
    /**
     * @name Two.Shape#rotation
     * @property {Number} - The value in Number for how much the shape is rotated relative to its parent.
     */
    rotation: number;
    /**
     * @name Two.Shape#scale
     * @property {Number} - The value for how much the shape is scaled relative to its parent.
     * @nota-bene This value can be replaced with a {@link Two.Vector} to do non-uniform scaling. e.g: `shape.scale = new Two.Vector(2, 1);`
     */
    scale: number | Vector;
    /**
     * @name Two.Shape#skewX
     * @property {Number} - The value in Number for how much the shape is skewed relative to its parent.
     * @description Skew the shape by an angle in the x axis direction.
     */
    skewX: number;
    /**
     * @name Two.Shape#skewY
     * @property {Number} - The value in Number for how much the shape is skewed relative to its parent.
     * @description Skew the shape by an angle in the y axis direction.
     */
    skewY: number;
    set translation(arg: Vector);
    /**
     * @name Two.Shape#translation
     * @description Alias for {@link Two.Shape#position}.
     */
    get translation(): Vector;
    /**
     * @name Two.Shape#addTo
     * @function
     * @param {Group} group - The parent the shape adds itself to.
     * @description Convenience method to add itself to the scenegraph.
     */
    addTo(group: Group): Shape;
    /**
     * @name Two.Shape#remove
     * @function
     * @description Remove self from the scene / parent.
     */
    remove(): Shape;
    /**
     * @name Two.Shape#copy
     * @function
     * @param {Two.Shape} shape
     * @description Copy the properties of one {@link Two.Shape} onto another.
     */
    copy(shape: Shape): Shape;
    /**
     * @name Two.Shape#clone
     * @function
     * @param {Group} [parent] - Optional argument to automatically add the shape to a scenegraph.
     * @returns {Shape}
     * @description Create a new {@link Two.Shape} with the same values as the current shape.
     */
    clone(parent?: Group): Shape;
    /**
     * @name Two.Shape#toObject
     * @function
     * @description Create a JSON compatible object that represents information of the shape.
     * @nota-bene Works in conjunction with {@link Two.Shape.fromObject}
     */
    toObject(): object;
    /**
     * @name Two.Shape#dispose
     * @function
     * @description Release the shape's bound objects by unbinding relevant events.
     */
    dispose(): Shape;
    /**
     * @name Two.Shape#contains
     * @function
     * @param {Number} x - x coordinate to hit test against
     * @param {Number} y - y coordinate to hit test against
     * @param {Object} [options] - Optional options object
     * @param {Boolean} [options.ignoreVisibility] - If `true`, hit test against `shape.visible = false` shapes
     * @param {Number} [options.tolerance] - Padding to hit test against in pixels
     * @description Check to see if coordinates are within a {@link Two.Shape}'s bounding rectangle
     */
    contains(x: number, y: number, options?: ShapeHitTestOptions): boolean;
    /**
     * @name Two.Shape#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    protected _update(bubbles?: boolean): Shape;
    /**
     * @name Two.Shape#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset(): Shape;
  }
  import { Element as TwoElement } from 'two.js/src/element';
  import { Matrix } from 'two.js/src/matrix';
  import { Vector } from 'two.js/src/vector';
  import { Group } from 'two.js/src/group';
}
