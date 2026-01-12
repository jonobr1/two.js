declare module 'two.js/extras/jsm/helpers/bounding-box-helper' {
  /**
   * Options for configuring the BoundingBoxHelper appearance
   */
  export interface BoundingBoxHelperOptions {
    /** Stroke color for the bounding box */
    color?: string;
    /** Line width for the bounding box */
    linewidth?: number;
    /** Show corner handles */
    showHandles?: boolean;
    /** Handle size in pixels */
    handleSize?: number;
    /** Handle fill color */
    handleFill?: string;
    /** Show rotation handle */
    showRotationHandle?: boolean;
    /** Distance of rotation handle from top edge */
    rotationHandleOffset?: number;
  }

  /**
   * Bounding box information returned by getBoundingInfo
   */
  export interface BoundingBoxInfo {
    /** Center X in world space */
    centerX: number;
    /** Center Y in world space */
    centerY: number;
    /** Width of bounds (before rotation) */
    width: number;
    /** Height of bounds (before rotation) */
    height: number;
    /** Rotation in radians */
    rotation: number;
    /** Scale X */
    scaleX: number;
    /** Scale Y */
    scaleY: number;
    /** Corner positions in world space [nw, ne, se, sw] */
    corners: Array<{ x: number; y: number }>;
  }

  /**
   * @name Two.BoundingBoxHelper
   * @class
   * @extends Two.Group
   * @param {Two.Shape|Two.Group|Array<Two.Shape|Two.Group>} [target] - The target object(s) to visualize.
   * @param {BoundingBoxHelperOptions} [options] - Configuration options for the bounding box appearance.
   * @description A pure visualization helper that shows the oriented bounding box of target object(s).
   * This helper automatically calculates and displays bounding boxes around shapes or groups.
   * Call the `update()` method in your animation loop to keep the helper synchronized with target transforms.
   */
  export class BoundingBoxHelper extends Group {
    /**
     * @name Two.BoundingBoxHelper#_targets
     * @private
     * @property {Array<Two.Shape|Two.Group>} - The target object(s) being visualized.
     */
    private _targets: Array<Shape | Group>;

    /**
     * @name Two.BoundingBoxHelper#_options
     * @private
     * @property {Object} - Configuration options.
     */
    private _options: Required<BoundingBoxHelperOptions>;

    /**
     * @name Two.BoundingBoxHelper#box
     * @property {Two.Rectangle} - The bounding box rectangle.
     */
    box: Rectangle;

    /**
     * @name Two.BoundingBoxHelper#handles
     * @property {Two.Points} - Corner handle points.
     */
    handles: Points;

    /**
     * @name Two.BoundingBoxHelper#rotationHandle
     * @property {Two.Group} - Rotation handle group.
     */
    rotationHandle: Group;

    constructor(
      target?: Shape | Group | Array<Shape | Group>,
      options?: BoundingBoxHelperOptions
    );

    /**
     * @name Two.BoundingBoxHelper#setTarget
     * @function
     * @param {Two.Shape|Two.Group|Array<Two.Shape|Two.Group>} target - The target object(s) for the bounding box.
     * @returns {Two.BoundingBoxHelper} - Returns the instance for chaining.
     * @description Set the target object(s) for the bounding box visualization.
     */
    setTarget(target: Shape | Group | Array<Shape | Group>): this;

    /**
     * @name Two.BoundingBoxHelper#targets
     * @property {Array<Two.Shape|Two.Group>} - Get current targets.
     */
    get targets(): Array<Shape | Group>;

    /**
     * @name Two.BoundingBoxHelper#update
     * @function
     * @returns {Two.BoundingBoxHelper} - Returns the instance for chaining.
     * @description Update the bounding box visualization.
     * Call this in your animation loop or when targets change.
     */
    update(): this;

    /**
     * @name Two.BoundingBoxHelper#getBoundingInfo
     * @function
     * @returns {BoundingBoxInfo} - Comprehensive bounding information.
     * @description Get comprehensive bounding information for the target(s).
     */
    getBoundingInfo(): BoundingBoxInfo;

    /**
     * @name Two.BoundingBoxHelper#_getSingleTargetInfo
     * @private
     * @function
     * @param {Two.Shape|Two.Group} target - The target object.
     * @returns {BoundingBoxInfo} - Bounding information for a single target.
     */
    private _getSingleTargetInfo(target: Shape | Group): BoundingBoxInfo;

    /**
     * @name Two.BoundingBoxHelper#_getMultiTargetInfo
     * @private
     * @function
     * @param {Array<Two.Shape|Two.Group>} targets - The target objects.
     * @returns {BoundingBoxInfo} - Bounding information for multiple targets.
     */
    private _getMultiTargetInfo(targets: Array<Shape | Group>): BoundingBoxInfo;

    /**
     * @name Two.BoundingBoxHelper#dispose
     * @function
     * @returns {Two.BoundingBoxHelper} - Returns the instance for chaining.
     * @description Dispose of the helper. Clears targets and removes from parent.
     */
    dispose(): this;
  }

  import { Group } from 'two.js/src/group';
  import { Shape } from 'two.js/src/shape';
  import { Rectangle } from 'two.js/src/shapes/rectangle';
  import { Points } from 'two.js/src/shapes/points';
}
