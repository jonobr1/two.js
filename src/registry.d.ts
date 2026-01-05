declare module 'two.js/src/registry' {
  /**
   * @name Two.Registry
   * @class
   * @description An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.
   */
  export class Registry {
    map: {};
    /**
     * @name Two.Registry#add
     * @function
     * @param {String} id - A unique identifier.
     * @param obj - Any type of variable to be registered to the directory.
     * @description Adds any value to the directory. Assigned by the `id`.
     */
    add(id: string, obj: any): Registry;
    /**
     * @name Two.Registry#remove
     * @function
     * @param {String} id - A unique identifier.
     * @description Remove any value from the directory by its `id`.
     */
    remove(id: string): Registry;
    /**
     * @name Two.Registry#get
     * @function
     * @param {String} id - A unique identifier.
     * @returns {?Object} The associated value. If unavailable then `undefined` is returned.
     * @description Get a registered value by its `id`.
     */
    get(id: string): any | null;
  }
}
