declare module 'two.js/src/shapes/star' {
  /**
   * @name Two.Star
   * @class
   * @param {Number} [x=0] - The x position of the star.
   * @param {Number} [y=0] - The y position of the star.
   * @param {Number} [innerRadius=0] - The inner radius value of the star.
   * @param {Number} [outerRadius=0] - The outer radius value of the star.
   * @param {Number} [sides=5] - The number of sides used to construct the star.
   */
  export class Star extends Path {
    /**
     * @name Two.Star.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Star}.
     */
    static Properties: ('innerRadius' | 'outerRadius' | 'sides' | string)[];
    /**
     * @name Two.Star.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Star} to create a new instance
     * @returns {Two.Star}
     * @description Create a new {@link Two.Star} from an object notation of a {@link Two.Star}.
     * @nota-bene Works in conjunction with {@link Two.Star#toObject}
     */
    static fromObject(
      obj: Parameters<typeof Path.fromObject>[0] & {
        innerRadius?: number;
        outerRadius?: number;
        sides?: number;
      }
    ): Star;
    constructor(
      ox?: number,
      oy?: number,
      ir?: number,
      or?: number,
      sides?: number
    );
    /**
     * @name Two.Star#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Star#innerRadius} needs updating.
     */
    private _flagInnerRadius;
    /**
     * @name Two.Star#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Star#outerRadius} needs updating.
     */
    private _flagOuterRadius;
    /**
     * @name Two.Star#_flagSides
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Star#sides} needs updating.
     */
    private _flagSides;
    /**
     * @name Two.Star#_innerRadius
     * @private
     * @see {@link Two.Star#innerRadius}
     */
    private _innerRadius;
    /**
     * @name Two.Star#_outerRadius
     * @private
     * @see {@link Two.Star#outerRadius}
     */
    private _outerRadius;
    /**
     * @name Two.Star#_sides
     * @private
     * @see {@link Two.Star#sides}
     */
    private _sides;
    /**
     * @name Two.Star#innerRadius
     * @property {Number} - The size of the inner radius of the star.
     */
    innerRadius: number;
    /**
     * @name Two.Star#outerRadius
     * @property {Number} - The size of the outer radius of the star.
     */
    outerRadius: number;
    /**
     * @name Two.Star#sides
     * @property {Number} - The amount of sides the star has.
     */
    sides: number;
    /**
     * @name Two.Star#copy
     * @function
     * @param {Two.Star} star - The reference {@link Two.Star}
     * @description Copy the properties of one {@link Two.Star} onto another.
     */
    copy(star: Star): Star;
    /**
     * @name Two.Star#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Star}
     * @description Create a new instance of {@link Two.Star} with the same properties of the current path.
     */
    clone(parent: Group): Star;
  }
  import { Path } from 'two.js/src/path';
  import { Group } from 'two.js/src/group';
}
