declare module 'two.js/src/shapes/rectangle' {
  /**
   * @name Two.Rectangle
   * @class
   * @param {Number} [x=0] - The x position of the rectangle.
   * @param {Number} [y=0] - The y position of the rectangle.
   * @param {Number} [width=1] - The width value of the rectangle.
   * @param {Number} [height=1] - The width value of the rectangle.
   */
  export class Rectangle extends Path {
    /**
     * @name Two.Rectangle.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Rectangle}.
     */
    static Properties: ('width' | 'height' | 'origin' | string)[];
    /**
     * @name Two.Rectangle.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Rectangle} to create a new instance
     * @returns {Two.Rectangle}
     * @description Create a new {@link Two.Rectangle} from an object notation of a {@link Two.Rectangle}.
     * @nota-bene Works in conjunction with {@link Two.Rectangle#toObject}
     */
    static fromObject(
      obj: Parameters<typeof Path.fromObject>[0] & {
        width?: number;
        height?: number;
        origin?: { x: number; y: number } | Vector;
      }
    ): Rectangle;
    constructor(x?: number, y?: number, width?: number, height?: number);
    /**
     * @name Two.Rectangle#width
     * @property {Number} - The size of the width of the rectangle.
     */
    width: number;
    /**
     * @name Two.Rectangle#height
     * @property {Number} - The size of the height of the rectangle.
     */
    height: number;
    /**
     * @name Two.Rectangle#origin
     * @property {Number} - A two-component vector describing the origin offset to draw the rectangle. Default is `0, 0`.
     */
    origin: Vector;
    /**
     * @name Two.Rectangle#_flagWidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Rectangle#width} needs updating.
     */
    private _flagWidth;
    /**
     * @name Two.Rectangle#_flagHeight
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Rectangle#height} needs updating.
     */
    private _flagHeight;
    /**
     * @name Two.Rectangle#_width
     * @private
     * @see {@link Two.Rectangle#width}
     */
    private _width;
    /**
     * @name Two.Rectangle#_height
     * @private
     * @see {@link Two.Rectangle#height}
     */
    private _height;
    private _origin: Vector;
    /**
     * @name Two.Rectangle#copy
     * @function
     * @param {Two.Rectangle} rectangle - The reference {@link Two.Rectangle}
     * @description Copy the properties of one {@link Two.Rectangle} onto another.
     */
    copy(rectangle: Rectangle): Rectangle;
    /**
     * @name Two.Rectangle#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Rectangle}
     * @description Create a new instance of {@link Two.Rectangle} with the same properties of the current path.
     */
    clone(parent?: Group): Rectangle;
  }
  import { Path } from 'two.js/src/path';
  import { Vector } from 'two.js/src/vector';
  import { Group } from 'two.js/src/group';
}
