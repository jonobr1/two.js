import { Group } from './group.js';
import { Path } from './path.js';
import { findPathIntersections } from './utils/boolean-operations.js';
import { constructBooleanResult } from './utils/boolean-result.js';

/**
 * @name Two.BooleanGroup
 * @class
 * @extends Two.Group
 * @param {Two.Shape[]} [children] - A list of {@link Two.Shape} objects for boolean operations.
 * @param {String} [operation='union'] - The boolean operation to apply: 'union', 'subtract', 'intersect', or 'exclude'.
 * @description A {@link Two.Group} that applies boolean operations to its children. The result is cached and recomputed only when the operation or children change.
 */
export class BooleanGroup extends Group {
  /**
   * @name Two.BooleanGroup#_flagOperation
   * @private
   * @property {Boolean} - Determines whether the {@link Two.BooleanGroup#operation} needs updating.
   */
  _flagOperation = false;

  /**
   * @name Two.BooleanGroup#_operation
   * @private
   * @property {String} - The boolean operation type.
   * @see {@link Two.BooleanGroup#operation}
   */
  _operation = 'union';

  /**
   * @name Two.BooleanGroup#_resultPath
   * @private
   * @property {Two.Path} - Cached result path from the boolean operation.
   */
  _resultPath = null;

  constructor(children, operation) {
    super(children);

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this._renderer.type = 'boolean-group';

    /**
     * @name Two.BooleanGroup#operation
     * @property {String} - The boolean operation to apply to children: 'union', 'subtract', 'intersect', or 'exclude'.
     */
    if (operation) {
      this.operation = operation;
    }
  }

  /**
   * @name Two.BooleanGroup.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.BooleanGroup}.
   */
  static Properties = ['operation'];

  /**
   * @name Two.BooleanGroup.Operations
   * @property {Object} - Object of possible boolean operations to perform
   */
  static Operations = {
    union: 'union',
    subtract: 'subtract',
    intersect: 'intersect',
    exclude: 'exclude',
  };

  /**
   * @name Two.BooleanGroup#getResultPath
   * @function
   * @returns {Two.Path} - The computed result path of the boolean operation.
   * @description Returns the cached result path if available, otherwise computes and caches it.
   */
  getResultPath() {
    if (this._flagOperation || !this._resultPath) {
      // Filter children to get only Path objects
      const paths = this.children.filter(child => child instanceof Path);

      // Handle edge cases
      if (paths.length === 0) {
        console.warn('Two.BooleanGroup: No path children to perform boolean operation on');
        this._resultPath = null;
        this._flagOperation = false;
        return null;
      }

      if (paths.length === 1) {
        // Single path - just clone it
        this._resultPath = paths[0].clone();
        this._flagOperation = false;
        return this._resultPath;
      }

      // Check for open paths (strict mode)
      const hasOpenPaths = paths.some(p => !p.closed);
      if (hasOpenPaths) {
        console.warn('Two.BooleanGroup: Boolean operations require closed paths');
        this._resultPath = null;
        this._flagOperation = false;
        return null;
      }

      // Find all pairwise intersections
      const allIntersections = [];
      for (let i = 0; i < paths.length; i++) {
        for (let j = i + 1; j < paths.length; j++) {
          const intersections = findPathIntersections(paths[i], paths[j]);
          intersections.forEach(inter => {
            allIntersections.push({
              ...inter,
              path1Index: i,
              path2Index: j
            });
          });
        }
      }

      // Construct boolean result
      this._resultPath = constructBooleanResult(
        paths,
        this._operation,
        allIntersections
      );

      this._flagOperation = false;
    }

    return this._resultPath;
  }

  /**
   * @name Two.BooleanGroup#flatten
   * @function
   * @returns {Two.Path} - A new permanent path representing the boolean operation result.
   * @description Converts the boolean group to a permanent path. The returned path is not cached and represents a snapshot of the current operation result.
   */
  flatten() {
    const resultPath = this.getResultPath();

    if (!resultPath) {
      return null;
    }

    // Clone the result path to create a permanent copy
    const permanentPath = resultPath.clone();

    // Copy transformation from the boolean group to the permanent path
    permanentPath.translation.copy(this.translation);
    permanentPath.rotation = this.rotation;
    permanentPath.scale = this.scale;

    if (this.matrix.manual) {
      permanentPath.matrix.copy(this.matrix);
    }

    return permanentPath;
  }

  /**
   * @name Two.BooleanGroup#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. If the operation changed or children were modified, it triggers recomputation of the result path.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update() {
    // Check if we need to recompute the boolean operation result
    if (
      this._flagOperation ||
      this._flagAdditions ||
      this._flagSubtractions ||
      this._flagOrder
    ) {
      // Mark that the result needs recomputation
      this._flagOperation = true;

      // Get the result path (will trigger recomputation if needed)
      const resultPath = this.getResultPath();

      // If we have a result path, apply group styling to it
      if (resultPath) {
        resultPath.fill = this.fill;
        resultPath.stroke = this.stroke;
        resultPath.linewidth = this.linewidth;
        resultPath.opacity = this.opacity;
        resultPath.visible = this.visible;
        resultPath.cap = this.cap;
        resultPath.join = this.join;
        resultPath.miter = this.miter;
      }
    }

    // Call parent update
    return super._update.apply(this, arguments);
  }

  /**
   * @name Two.BooleanGroup#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    this._flagOperation = false;

    super.flagReset.call(this);

    return this;
  }

  /**
   * @name Two.BooleanGroup#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.BooleanGroup}
   * @description Create a new instance of {@link Two.BooleanGroup} with the same properties of the current group.
   */
  clone(parent) {
    const children = this.children.map(function (child) {
      return child.clone();
    });

    const clone = new BooleanGroup(children, this.operation);

    clone.opacity = this.opacity;

    if (this.mask) {
      clone.mask = this.mask;
    }

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.className = this.className;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();
  }

  /**
   * @name Two.BooleanGroup#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the boolean group.
   */
  toObject() {
    const result = super.toObject.call(this);

    result.renderer.type = 'boolean-group';
    result.operation = this.operation;

    return result;
  }
}

const proto = {
  operation: {
    enumerable: true,
    get: function () {
      return this._operation;
    },
    set: function (v) {
      const validOperations = Object.values(BooleanGroup.Operations);
      if (validOperations.indexOf(v) === -1) {
        console.warn(
          `Two.BooleanGroup: Invalid operation "${v}". Valid operations are: ${validOperations.join(
            ', '
          )}`
        );
        return;
      }
      this._flagOperation = this._operation !== v || this._flagOperation;
      this._operation = v;
    },
  },
};
