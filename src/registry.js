/**
 * @name Two.Registry
 * @class
 * @description An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.
 */
export class Registry {

  map = {};

  constructor() {}

  /**
   * @name Two.Registry#add
   * @function
   * @param {String} id - A unique identifier.
   * @param obj - Any type of variable to be registered to the directory.
   * @description Adds any value to the directory. Assigned by the `id`.
   */
  add(id, obj) {
    this.map[id] = obj;
    return this;
  }

  /**
   * @name Two.Registry#remove
   * @function
   * @param {String} id - A unique identifier.
   * @description Remove any value from the directory by its `id`.
   */
  remove(id) {
    delete this.map[id];
    return this;
  }

  /**
   * @name Two.Registry#get
   * @function
   * @param {String} id - A unique identifier.
   * @returns {?Object} The associated value. If unavailable then `undefined` is returned.
   * @description Get a registered value by its `id`.
   */
  get(id) {
    return this.map[id];
  }

  /**
   * @name Two.Registry#contains
   * @function
   * @param {String} id - A unique identifier.
   * @returns {Boolean}
   * @description Convenience method to see if a value is registered to an `id` already.
   */
  contains(id) {
    return id in this.map;
  }

}
