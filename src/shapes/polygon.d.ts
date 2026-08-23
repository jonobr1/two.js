declare module 'two.js/src/shapes/polygon' {
  /**
   * @name Two.Polygon
   * @class
   * @param {Number} [x=0] - The x position of the polygon.
   * @param {Number} [y=0] - The y position of the polygon.
   * @param {Number} [radius=0] - The radius value of the polygon.
   * @param {Number} [sides=12] - The number of vertices used to construct the polygon.
   */
  export class Polygon extends Path {
    /**
     * @name Two.Polygon.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Polygon}.
     */
    static Properties: ('width' | 'height' | 'sides' | string)[];
    /**
     * @name Two.Polygon.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Polygon} to create a new instance
     * @returns {Two.Polygon}
     * @description Create a new {@link Two.Polygon} from an object notation of a {@link Two.Polygon}.
     * @nota-bene Works in conjunction with {@link Two.Polygon#toObject}
     */
    static fromObject(
      obj: Parameters<typeof Path.fromObject>[0] & {
        width?: number;
        height?: number;
        sides?: number;
      }
    ): Polygon;
    /**
     * @name Two.Polygon#_flagWidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Polygon#width} needs updating.
     */
    private _flagWidth;
    /**
     * @name Two.Polygon#_flagHeight
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Polygon#height} needs updating.
     */
    private _flagHeight;
    /**
     * @name Two.Polygon#_flagSides
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Polygon#sides} needs updating.
     */
    private _flagSides;
    /**
     * @name Two.Polygon#_width
     * @private
     * @see {@link Two.Polygon#width}
     */
    private _width;
    /**
     * @name Two.Polygon#_height
     * @private
     * @see {@link Two.Polygon#height}
     */
    private _height;
    /**
     * @name Two.Polygon#_sides
     * @private
     * @see {@link Two.Polygon#sides}
     */
    private _sides;
    constructor(x?: number, y?: number, radius?: number, sides?: number);
    closed: boolean;
    radius: number;
    width: number;
    height: number;
    sides: number;
    /**
     * @name Two.Polygon#copy
     * @function
     * @param {Two.Polygon} polygon - The reference {@link Two.Polygon}
     * @description Copy the properties of one {@link Two.Polygon} onto another.
     */
    copy(polygon: Polygon): Polygon;
    /**
     * @name Two.Polygon#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Polygon}
     * @description Create a new instance of {@link Two.Polygon} with the same properties of the current path.
     */
    clone(parent?: Group): Polygon;
  }
  import { Path } from 'two.js/src/path';
  import { Group } from 'two.js/src/group';
}
