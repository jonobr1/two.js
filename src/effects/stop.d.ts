declare module 'two.js/src/effects/stop' {
  /**
   * @name Two.Stop
   * @class
   * @param {Number} [offset] - The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created.
   * @param {String} [color] - The color of the stop. Default value flip flops from white to black as new stops are created.
   * @param {Number} [opacity] - The opacity value. Default value is 1, cannot be lower than 0.
   * @nota-bene Used specifically in conjunction with {@link Two.Gradient}s to control color graduation.
   */
  export class Stop extends TwoElement {
    /**
     * @name Two.Stop.Index
     * @property {Number} - The current index being referenced for calculating a stop's default offset value.
     */
    static Index: number;
    /**
     * @name Two.Stop.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Stop}.
     */
    static override Properties: ('offset' | 'color' | 'opacity' | string)[];
    /**
     * @name Two.Stop.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Stop} to create a new instance
     * @returns {Two.Stop}
     * @description Create a new {@link Two.Stop} from an object notation of a {@link Two.Stop}.
     * @nota-bene Works in conjunction with {@link Two.Stop#toObject}
     */
    static fromObject(
      obj: Parameters<typeof TwoElement.fromObject>[0] & {
        offset?: number;
        color?: string;
        opacity?: number;
      }
    ): Stop;
    constructor(offset?: number, color?: string, opacity?: number);
    /**
     * @name Two.Stop#_flagOffset
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Stop#offset} needs updating.
     */
    private _flagOffset;
    /**
     * @name Two.Stop#_flagOpacity
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Stop#opacity} needs updating.
     */
    private _flagOpacity;
    /**
     * @name Two.Stop#_flagColor
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Stop#color} needs updating.
     */
    private _flagColor;
    /**
     * @name Two.Stop#_offset
     * @private
     * @see {@link Two.Stop#offset}
     */
    private _offset;
    /**
     * @name Two.Stop#_opacity
     * @private
     * @see {@link Two.Stop#opacity}
     */
    private _opacity;
    /**
     * @name Two.Stop#_color
     * @private
     * @see {@link Two.Stop#color}
     */
    private _color;
    /**
     * @name Two.Stop#offset
     * @property {Number} - The offset percentage of the stop represented as a zero-to-one value.
     */
    offset: number;
    /**
     * @name Two.Stop#opacity
     * @property {Number} - The alpha percentage of the stop represented as a zero-to-one value.
     */
    opacity: number;
    /**
     * @name Two.Stop#color
     * @property {String} - The color of the stop.
     */
    color: string;
    /**
     * @name Two.Stop#copy
     * @function
     * @param {Two.Stop} stop - The reference {@link Two.Stop}
     * @description Copy the properties of one {@link Two.Stop} onto another.
     */
    copy(stop: Stop): Stop;
    /**
     * @name Two.Stop#clone
     * @function
     * @param {Gradient} [parent] - The parent group or scene to add the clone to.
     * @returns {Stop}
     * @description Create a new instance of {@link Two.Stop} with the same properties of the current path.
     */
    clone(parent?: Gradient): Stop;
    /**
     * @name Two.Stop#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject(): object;
    /**
     * @name Two.Stop#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset(): Stop;
  }
  import { Element as TwoElement } from 'two.js/src/element';
  import { Gradient } from 'two.js/src/effects/gradient';
}
