declare module 'two.js/src/shapes/rounded-rectangle' {
  /**
     * @name Two.RoundedRectangle
     * @class

     * @param {Number} [x=0] - The x position of the rounded rectangle.
     * @param {Number} [y=0] - The y position of the rounded rectangle.
     * @param {Number} [width=0] - The width value of the rounded rectangle.
     * @param {Number} [height=0] - The width value of the rounded rectangle.
     * @param {Number} [radius=0] - The radius value of the rounded rectangle.
     * @param {Number} [resolution=12] - The number of vertices used to construct the rounded rectangle.
     */
  export class RoundedRectangle extends Path {
    /**
     * @name Two.RoundedRectangle.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.RoundedRectangle}.
     */
    static Properties: ('width' | 'height' | 'radius' | string)[];
    /**
     * @name Two.RoundedRectangle.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.RoundedRectangle} to create a new instance
     * @returns {Two.RoundedRectangle}
     * @description Create a new {@link Two.RoundedRectangle} from an object notation of a {@link Two.RoundedRectangle}.
     * @nota-bene Works in conjunction with {@link Two.RoundedRectangle#toObject}
     */
    fromObject(
      obj: Parameters<typeof Path.fromObject>[0] & {
        width?: number;
        height?: number;
        radius?: number;
      }
    ): RoundedRectangle;
    constructor(
      x?: number,
      y?: number,
      width?: number,
      height?: number,
      radius?: number | Vector
    );
    /**
     * @name Two.RoundedRectangle#_flagWidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#width} needs updating.
     */
    private _flagWidth;
    /**
     * @name Two.RoundedRectangle#_flagHeight
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#height} needs updating.
     */
    private _flagHeight;
    /**
     * @name Two.RoundedRectangle#_flagRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#radius} needs updating.
     */
    private _flagRadius;
    /**
     * @name Two.RoundedRectangle#_width
     * @private
     * @see {@link Two.RoundedRectangle#width}
     */
    private _width;
    /**
     * @name Two.RoundedRectangle#_height
     * @private
     * @see {@link Two.RoundedRectangle#height}
     */
    private _height;
    /**
     * @name Two.RoundedRectangle#_radius
     * @private
     * @see {@link Two.RoundedRectangle#radius}
     */
    private _radius;
    width: number;
    height: number;
    radius: number | Vector;
    /**
     * @name Two.RoundedRectangle.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.RoundedRectangle} to create a new instance
     * @returns {Two.RoundedRectangle}
     * @description Create a new {@link Two.RoundedRectangle} from an object notation of a {@link Two.RoundedRectangle}.
     * @nota-bene Works in conjunction with {@link Two.RoundedRectangle#toObject}
     */
    copy(roundedRectangle: RoundedRectangle): RoundedRectangle;
  }
  import { Path } from 'two.js/src/path';
  import { Vector } from 'two.js/src/vector';
}
