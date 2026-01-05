declare module 'two.js/src/shapes/arc-segment' {
  /**
   * @name Two.ArcSegment
   * @class
   * @param {Number} [x=0] - The x position of the arc segment.
   * @param {Number} [y=0] - The y position of the arc segment.
   * @param {Number} [innerRadius=0] - The inner radius value of the arc segment.
   * @param {Number} [outerRadius=0] - The outer radius value of the arc segment.
   * @param {Number} [startAngle=0] - The start angle of the arc segment in Number.
   * @param {Number} [endAngle=6.2831] - The end angle of the arc segment in Number.
   * @param {Number} [resolution=24] - The number of vertices used to construct the arc segment.
   */
  export class ArcSegment extends Path {
    static Properties: (
      | 'startAngle'
      | 'endAngle'
      | 'innerRadius'
      | 'outerRadius'
      | string
    )[];
    /**
     * @name Two.ArcSegment.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.ArcSegment} to create a new instance
     * @returns {Two.ArcSegment}
     * @description Create a new {@link Two.ArcSegment} from an object notation of a {@link Two.ArcSegment}.
     * @nota-bene Works in conjunction with {@link Two.ArcSegment#toObject}
     */
    fromObject(
      obj: Parameters<typeof Path.fromObject>[0] & {
        startAngle?: number;
        endAngle?: number;
        innerRadius?: number;
        outerRadius?: number;
      }
    ): ArcSegment;
    constructor(
      ox?: number,
      oy?: number,
      ir?: number,
      or?: number,
      sa?: number,
      ea?: number,
      res?: number
    );
    /**
     * @name Two.ArcSegment#_flagStartAngle
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#startAngle} needs updating.
     */
    private _flagStartAngle;
    /**
     * @name Two.ArcSegment#_flagEndAngle
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#endAngle} needs updating.
     */
    private _flagEndAngle;
    /**
     * @name Two.ArcSegment#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#innerRadius} needs updating.
     */
    private _flagInnerRadius;
    /**
     * @name Two.ArcSegment#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#outerRadius} needs updating.
     */
    private _flagOuterRadius;
    /**
     * @name Two.ArcSegment#_startAngle
     * @private
     * @see {@link Two.ArcSegment#startAngle}
     */
    private _startAngle;
    /**
     * @name Two.ArcSegment#_endAngle
     * @private
     * @see {@link Two.ArcSegment#endAngle}
     */
    private _endAngle;
    /**
     * @name Two.ArcSegment#_innerRadius
     * @private
     * @see {@link Two.ArcSegment#innerRadius}
     */
    private _innerRadius;
    /**
     * @name Two.ArcSegment#_outerRadius
     * @private
     * @see {@link Two.ArcSegment#outerRadius}
     */
    private _outerRadius;
    /**
     * @name Two.ArcSegment#innerRadius
     * @property {Number} - The size of the inner radius of the arc segment.
     */
    innerRadius: number;
    /**
     * @name Two.ArcSegment#outerRadius
     * @property {Number} - The size of the outer radius of the arc segment.
     */
    outerRadius: number;
    /**
     * @name Two.ArcSegment#startAngle
     * @property {Number} - The angle of one side for the arc segment.
     */
    startAngle: number;
    /**
     * @name Two.ArcSegment#endAngle
     * @property {Number} - The angle of the other side for the arc segment.
     */
    endAngle: number;
    /**
     * @name Two.ArcSegment#copy
     * @function
     * @param {Two.ArcSegment} arcSegment - The reference {@link Two.ArcSegment}
     * @description Copy the properties of one {@link Two.ArcSegment} onto another.
     */
    copy(arcSegment: ArcSegment): ArcSegment;
    /**
     * @name Two.ArcSegment#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.ArcSegment}
     * @description Create a new instance of {@link Two.ArcSegment} with the same properties of the current path.
     */
    clone(parent: Group): ArcSegment;
  }
  import { Path } from 'two.js/src/path';
  import { Group } from 'two.js/src/group';
}
