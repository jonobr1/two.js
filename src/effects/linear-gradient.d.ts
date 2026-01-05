declare module 'two.js/src/effects/linear-gradient' {
  /**
   * @name Two.LinearGradient
   * @class
   * @param {Number} [x1=0] - The x position of the first end point of the linear gradient.
   * @param {Number} [y1=0] - The y position of the first end point of the linear gradient.
   * @param {Number} [x2=0] - The x position of the second end point of the linear gradient.
   * @param {Number} [y2=0] - The y position of the second end point of the linear gradient.
   * @param {Stop[]} [stops] - A list of {@link Two.Stop}s that contain the gradient fill pattern for the gradient.
   * @nota-bene The linear gradient lives within the space of the parent object's matrix space.
   */
  export class LinearGradient extends Gradient {
    /**
     * @name Two.LinearGradient.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.LinearGradient} to create a new instance
     * @returns {Two.LinearGradient}
     * @description Create a new {@link Two.LinearGradient} from an object notation of a {@link Two.LinearGradient}.
     * @nota-bene Works in conjunction with {@link Two.LinearGradient#toObject}
     */
    static fromObject(
      obj: Parameters<typeof Gradient.fromObject>[0] & {
        left?: { x: number; y: number } | Vector;
        right?: { x: number; y: number } | Vector;
      }
    ): LinearGradient;
    constructor(
      x1?: number,
      y1?: number,
      x2?: number,
      y2?: number,
      stops?: Stop[]
    );
    /**
     * @name Two.LinearGradient#_flagEndPoints
     * @private
     * @property {Boolean} - Determines whether the {@link Two.LinearGradient#left} or {@link Two.LinearGradient#right} changed and needs to update.
     */
    private _flagEndPoints;
    private _left: Vector;
    private _right: Vector;
    /**
     * @name Two.LinearGradient#left
     * @property {Vector} - The x and y value for where the first end point is placed on the canvas.
     */
    left: Vector;
    /**
     * @name Two.LinearGradient#right
     * @property {Vector} - The x and y value for where the second end point is placed on the canvas.
     */
    right: Vector;
    /**
     * @name Two.LinearGradient#copy
     * @function
     * @param {Two.LinearGradient} gradient - The reference {@link Two.LinearGradient}
     * @description Copy the properties of one {@link Two.LinearGradient} onto another.
     */
    copy(gradient: LinearGradient): LinearGradient;
    /**
     * @name Two.LinearGradient#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Gradient}
     * @description Create a new instance of {@link Two.LinearGradient} with the same properties of the current path.
     */
    clone(parent?: Group): LinearGradient;
    /**
     * @name Two.LinearGradient#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject(): object;
    /**
     * @name Two.LinearGradient#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    protected _update(bubbles?: boolean): LinearGradient;
    /**
     * @name Two.LinearGradient#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset(): LinearGradient;
  }
  import { Gradient } from 'two.js/src/effects/gradient';
  import { Group } from 'two.js/src/group';
  import { Stop } from 'two.js/src/effects/stop';
  import { Vector } from 'two.js/src/vector';
}
