declare module 'two.js/src/shapes/ellipse' {
  /**
   * @name Two.Ellipse
   * @class
   * @param {Number} [x=0] - The x position of the ellipse.
   * @param {Number} [y=0] - The y position of the ellipse.
   * @param {Number} [rx=0] - The radius value of the ellipse in the x direction.
   * @param {Number} [ry=0] - The radius value of the ellipse in the y direction.
   * @param {Number} [resolution=4] - The number of vertices used to construct the ellipse.
   */
  export class Ellipse extends Path {
    /**
     * @name Two.Ellipse.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Ellipse}.
     */
    static Properties: ('width' | 'height' | string)[];
    /**
     * @name Two.Ellipse.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Ellipse} to create a new instance
     * @returns {Two.Ellipse}
     * @description Create a new {@link Two.Ellipse} from an object notation of a {@link Two.Ellipse}.
     * @nota-bene Works in conjunction with {@link Two.Ellipse#toObject}
     */
    fromObject(
      obj: Parameters<typeof Path.fromObject>[0] & {
        width?: number;
        height?: number;
      }
    ): Ellipse;
    constructor(
      x?: number,
      y?: number,
      rx?: number,
      ry?: number,
      resolution?: number
    );
    /**
     * @name Two.Ellipse#_flagWidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Ellipse#width} needs updating.
     */
    private _flagWidth;
    /**
     * @name Two.Ellipse#_flagHeight
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Ellipse#height} needs updating.
     */
    private _flagHeight;
    /**
     * @name Two.Ellipse#_width
     * @private
     * @see {@link Two.Ellipse#width}
     */
    private _width;
    /**
     * @name Two.Ellipse#_height
     * @private
     * @see {@link Two.Ellipse#height}
     */
    private _height;
    width: number;
    height: number;
    /**
     * @name Two.Ellipse#copy
     * @function
     * @param {Two.Ellipse} ellipse - The reference {@link Two.Ellipse}
     * @description Copy the properties of one {@link Two.Ellipse} onto another.
     */
    copy(ellipse: Ellipse): Ellipse;
  }
  import { Path } from 'two.js/src/path';
}
