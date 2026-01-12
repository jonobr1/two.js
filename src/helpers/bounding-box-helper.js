import { Group } from '../group.js';
import { Rectangle } from '../shapes/rectangle.js';
import { Circle } from '../shapes/circle.js';
import { Line } from '../shapes/line.js';
import { Points } from '../shapes/points.js';
import { Vector } from '../vector.js';

/**
 * @name Two.BoundingBoxHelper
 * @class
 * @extends Two.Group
 * @param {Two.Shape|Two.Group|Array<Two.Shape|Two.Group>} [target] - The target object(s) to visualize.
 * @param {Object} [options] - Configuration options for the bounding box appearance.
 * @param {String} [options.color='#00AEFF'] - Stroke color for the bounding box.
 * @param {Number} [options.linewidth=1] - Line width for the bounding box.
 * @param {Boolean} [options.showHandles=true] - Show corner handles.
 * @param {Number} [options.handleSize=8] - Handle size in pixels.
 * @param {String} [options.handleFill='#00AEFF'] - Handle fill color.
 * @param {Boolean} [options.showRotationHandle=true] - Show rotation handle.
 * @param {Number} [options.rotationHandleOffset=20] - Distance of rotation handle from top edge.
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
  _targets = [];

  /**
   * @name Two.BoundingBoxHelper#_options
   * @private
   * @property {Object} - Configuration options.
   */
  _options = {};

  constructor(target, options = {}) {
    super();

    this._options = {
      color: options.color !== undefined ? options.color : '#00AEFF',
      linewidth: options.linewidth !== undefined ? options.linewidth : 1,
      showHandles: options.showHandles !== undefined ? options.showHandles : true,
      handleSize: options.handleSize !== undefined ? options.handleSize : 8,
      handleFill: options.handleFill !== undefined ? options.handleFill : '#00AEFF',
      showRotationHandle: options.showRotationHandle !== undefined ? options.showRotationHandle : true,
      rotationHandleOffset: options.rotationHandleOffset !== undefined ? options.rotationHandleOffset : 20,
    };

    // Create bounding box rectangle
    this.box = new Rectangle(0, 0, 0, 0);
    this.box.stroke = this._options.color;
    this.box.linewidth = this._options.linewidth;
    this.box.noFill();

    // Create corner handles (8 points: 4 corners + 4 edge midpoints)
    const handleVerts = [
      new Vector(), // NW
      new Vector(), // N (top center)
      new Vector(), // NE
      new Vector(), // E (right center)
      new Vector(), // SE
      new Vector(), // S (bottom center)
      new Vector(), // SW
      new Vector(), // W (left center)
    ];
    this.handles = new Points(handleVerts);
    this.handles.size = this._options.handleSize;
    this.handles.fill = this._options.handleFill;
    this.handles.noStroke();
    this.handles.visible = this._options.showHandles;

    // Create rotation handle
    this.rotationHandle = new Group();
    const rotLine = new Line(0, 0, 0, -this._options.rotationHandleOffset);
    rotLine.stroke = this._options.color;
    rotLine.linewidth = this._options.linewidth;

    const rotCircle = new Circle(0, -this._options.rotationHandleOffset, 5);
    rotCircle.fill = this._options.handleFill;
    rotCircle.noStroke();

    this.rotationHandle.add(rotLine, rotCircle);
    this.rotationHandle.visible = this._options.showRotationHandle;

    this.add(this.box, this.handles, this.rotationHandle);

    // Set initial target
    if (target) {
      this.setTarget(target);
    }
  }

  /**
   * @name Two.BoundingBoxHelper#setTarget
   * @function
   * @param {Two.Shape|Two.Group|Array<Two.Shape|Two.Group>} target - The target object(s) for the bounding box.
   * @returns {Two.BoundingBoxHelper} - Returns the instance for chaining.
   * @description Set the target object(s) for the bounding box visualization.
   */
  setTarget(target) {
    this._targets = Array.isArray(target) ? target : [target];
    this.update();
    return this;
  }

  /**
   * @name Two.BoundingBoxHelper#targets
   * @property {Array<Two.Shape|Two.Group>} - Get current targets.
   */
  get targets() {
    return this._targets;
  }

  /**
   * @name Two.BoundingBoxHelper#update
   * @function
   * @returns {Two.BoundingBoxHelper} - Returns the instance for chaining.
   * @description Update the bounding box visualization.
   * Call this in your animation loop or when targets change.
   */
  update() {
    if (this._targets.length === 0) {
      this.visible = false;
      return this;
    }

    this.visible = true;
    const info = this.getBoundingInfo();

    // Update box dimensions
    this.box.width = info.width;
    this.box.height = info.height;

    // Update group position and rotation to match target
    this.position.set(info.centerX, info.centerY);
    this.rotation = info.rotation;

    // Update handle positions (in local space)
    const hw = info.width / 2;
    const hh = info.height / 2;

    const verts = this.handles.vertices;
    verts[0].set(-hw, -hh); // NW
    verts[1].set(0, -hh);    // N
    verts[2].set(hw, -hh);   // NE
    verts[3].set(hw, 0);     // E
    verts[4].set(hw, hh);    // SE
    verts[5].set(0, hh);     // S
    verts[6].set(-hw, hh);   // SW
    verts[7].set(-hw, 0);    // W

    // Update rotation handle position
    this.rotationHandle.position.set(0, -hh);

    return this;
  }

  /**
   * @name Two.BoundingBoxHelper#getBoundingInfo
   * @function
   * @returns {Object} - Comprehensive bounding information.
   * @property {Number} centerX - Center X in world space.
   * @property {Number} centerY - Center Y in world space.
   * @property {Number} width - Width of bounds (before rotation).
   * @property {Number} height - Height of bounds (before rotation).
   * @property {Number} rotation - Rotation in radians.
   * @property {Number} scaleX - Scale X.
   * @property {Number} scaleY - Scale Y.
   * @property {Array<Object>} corners - Corner positions in world space [nw, ne, se, sw].
   * @description Get comprehensive bounding information for the target(s).
   */
  getBoundingInfo() {
    if (this._targets.length === 0) {
      return {
        centerX: 0, centerY: 0,
        width: 0, height: 0,
        rotation: 0,
        scaleX: 1, scaleY: 1,
        corners: [],
      };
    }

    // For single target, use its transform directly
    if (this._targets.length === 1) {
      return this._getSingleTargetInfo(this._targets[0]);
    }

    // For multiple targets, compute combined bounds
    return this._getMultiTargetInfo(this._targets);
  }

  /**
   * @name Two.BoundingBoxHelper#_getSingleTargetInfo
   * @private
   * @function
   * @param {Two.Shape|Two.Group} target - The target object.
   * @returns {Object} - Bounding information for a single target.
   */
  _getSingleTargetInfo(target) {
    // Get local bounds (before world transform)
    const rect = target.getBoundingClientRect(true);

    const position = target.translation || { x: 0, y: 0 };
    const rotation = typeof target.rotation === 'number' ? target.rotation : 0;
    const scale = target.scale;
    const scaleX = typeof scale === 'number' ? scale : (scale && scale.x !== undefined ? scale.x : 1);
    const scaleY = typeof scale === 'number' ? scale : (scale && scale.y !== undefined ? scale.y : 1);

    const width = rect.width;
    const height = rect.height;

    // Calculate corners in world space
    const hw = width / 2;
    const hh = height / 2;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    const corners = [
      { x: -hw, y: -hh }, // NW
      { x: hw, y: -hh },  // NE
      { x: hw, y: hh },   // SE
      { x: -hw, y: hh },  // SW
    ].map(({ x, y }) => ({
      x: position.x + (x * cos - y * sin),
      y: position.y + (x * sin + y * cos),
    }));

    return {
      centerX: position.x,
      centerY: position.y,
      width,
      height,
      rotation,
      scaleX,
      scaleY,
      corners,
    };
  }

  /**
   * @name Two.BoundingBoxHelper#_getMultiTargetInfo
   * @private
   * @function
   * @param {Array<Two.Shape|Two.Group>} targets - The target objects.
   * @returns {Object} - Bounding information for multiple targets.
   */
  _getMultiTargetInfo(targets) {
    // Get world-space AABB of all targets
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    for (const target of targets) {
      const rect = target.getBoundingClientRect(false); // world space
      minX = Math.min(minX, rect.left);
      minY = Math.min(minY, rect.top);
      maxX = Math.max(maxX, rect.right);
      maxY = Math.max(maxY, rect.bottom);
    }

    const width = maxX - minX;
    const height = maxY - minY;
    const centerX = minX + width / 2;
    const centerY = minY + height / 2;

    return {
      centerX,
      centerY,
      width,
      height,
      rotation: 0, // Multi-select uses axis-aligned box
      scaleX: 1,
      scaleY: 1,
      corners: [
        { x: minX, y: minY },
        { x: maxX, y: minY },
        { x: maxX, y: maxY },
        { x: minX, y: maxY },
      ],
    };
  }

  /**
   * @name Two.BoundingBoxHelper#dispose
   * @function
   * @returns {Two.BoundingBoxHelper} - Returns the instance for chaining.
   * @description Dispose of the helper. Clears targets and removes from parent.
   */
  dispose() {
    this._targets = [];
    if (this.parent) {
      this.parent.remove(this);
    }
    return this;
  }
}
