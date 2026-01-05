declare module 'two.js/src/effects/radial-gradient' {
  /**
   * @name Two.RadialGradient
   * @class
   * @param {Number} [x=0] - The x position of the origin of the radial gradient.
   * @param {Number} [y=0] - The y position of the origin of the radial gradient.
   * @param {Number} [radius=0] - The radius of the radial gradient.
   * @param {Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
   * @param {Number} [focalX=0] - The x position of the focal point on the radial gradient.
   * @param {Number} [focalY=0] - The y position of the focal point on the radial gradient.
   * @nota-bene The radial gradient lives within the space of the parent object's matrix space.
   */
  export class RadialGradient extends Gradient {
    /**
     * @name Two.RadialGradient.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.RadialGradient} to create a new instance
     * @returns {Two.RadialGradient}
     * @description Create a new {@link Two.RadialGradient} from an object notation of a {@link Two.RadialGradient}.
     * @nota-bene Works in conjunction with {@link Two.RadialGradient#toObject}
     */
    static fromObject(
      obj: Parameters<typeof Gradient.fromObject>[0] & {
        radius?: number;
        center?: { x: number; y: number } | Vector;
        focal?: { x: number; y: number } | Vector;
      }
    ): RadialGradient;
    constructor(
      cx?: number,
      cy?: number,
      r?: number,
      stops?: Stop[],
      fx?: number,
      fy?: number
    );
    /**
     * @name Two.RadialGradient#_flagRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RadialGradient#radius} changed and needs to update.
     */
    private _flagRadius;
    /**
     * @name Two.RadialGradient#_flagCenter
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RadialGradient#center} changed and needs to update.
     */
    private _flagCenter;
    /**
     * @name Two.RadialGradient#_flagFocal
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RadialGradient#focal} changed and needs to update.
     */
    private _flagFocal;
    private _radius: number;
    private _center: Vector;
    private _focal: Vector;
    /**
     * @name Two.RadialGradient#center
     * @property {Vector} - The x and y value for where the origin of the radial gradient is.
     */
    center: Vector;
    radius: number;
    /**
     * @name Two.RadialGradient#focal
     * @property {Vector} - The x and y value for where the focal point of the radial gradient is.
     * @nota-bene This effects the spray or spread of the radial gradient.
     */
    focal: Vector;
    /**
     * @name Two.RadialGradient#copy
     * @function
     * @param {Two.RadialGradient} gradient - The reference {@link Two.RadialGradient}
     * @description Copy the properties of one {@link Two.RadialGradient} onto another.
     */
    copy(gradient: RadialGradient): RadialGradient;
    /**
     * @name Two.RadialGradient#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.RadialGradient}
     * @description Create a new instance of {@link Two.RadialGradient} with the same properties of the current path.
     */
    clone(parent?: Group): RadialGradient;
    /**
     * @name Two.RadialGradient#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject(): object;
    /**
     * @name Two.RadialGradient#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update(): RadialGradient;
    /**
     * @name Two.RadialGradient#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset(): RadialGradient;
  }
  import { Gradient } from 'two.js/src/effects/gradient';
  import { Group } from 'two.js/src/group';
  import { Stop } from 'two.js/src/effects/stop';
  import { Vector } from 'two.js/src/vector';
}
