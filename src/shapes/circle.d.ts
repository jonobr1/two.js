declare module 'two.js/src/shapes/circle' {
  /**
   * @name Two.Circle
   * @class
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
    private _flagRadius;
    /**
     * @name Two.Circle#_radius
     * @private
     * @see {@link Two.Circle#radius}
     */
    private _radius;
    /**
     * @name Two.Circle.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Circle}.
     */
    static Properties: ('radius' | string)[];
    /**
     * @name Two.Circle.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Circle} to create a new instance
     * @returns {Two.Circle}
     * @description Create a new {@link Two.Circle} from an object notation of a {@link Two.Circle}.
     * @nota-bene Works in conjunction with {@link Two.Circle#toObject}
     */
    static fromObject(
      obj: Parameters<typeof Path.fromObject>[0] & {
        radius?: number;
      }
    ): Circle;
    constructor(x?: number, y?: number, radius?: number, resolution?: number);
    /**
     * @name Two.Circle#radius
     * @property {Number} - The size of the radius of the circle.
     */
    radius: number;
    /**
     * @name Two.Circle#copy
     * @function
     * @param {Two.Circle} circle - The reference {@link Two.Circle}
     * @description Copy the properties of one {@link Two.Circle} onto another.
     */
    copy(circle: Circle): Circle;
    /**
     * @name Two.Circle#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Circle}
     * @description Create a new instance of {@link Two.Circle} with the same properties of the current path.
     */
    clone(parent?: Group): Circle;
  }
  import { Path } from 'two.js/src/path';
  import { Group } from 'two.js/src/group';
}
