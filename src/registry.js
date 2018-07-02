(function(Two) {

  var _ = Two.Utils;

  /**
   * @name Two.Registry
   * @class
   * @description An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.
   */
  var Registry = Two.Registry = function() {

    this.map = {};

  };

  _.extend(Registry.prototype, {

    constructor: Registry,

    /**
     * @name Two.Registry#add
     * @function
     * @param {String} id - A unique identifier.
     * @param value - Any type of variable to be registered to the directory.
     * @description Adds any value to the directory. Assigned by the `id`.
     */
    add: function(id, obj) {
      this.map[id] = obj;
      return this;
    },

    /**
     * @name Two.Registry#remove
     * @function
     * @param {String} id - A unique identifier.
     * @description Remove any value from the directory by its `id`.
     */
    remove: function(id) {
      delete this.map[id];
      return this;
    },

    /**
     * @name Two.Registry#get
     * @function
     * @param {String} id - A unique identifier.
     * @returns value - The associated value. If unavailable then `undefined` is returned.
     * @description Get a registered value by its `id`.
     */
    get: function(id) {
      return this.map[id];
    },

    /**
     * @name Two.Registry#contains
     * @function
     * @param {String} id - A unique identifier.
     * @returns {Boolean}
     * @description Convenience method to see if a value is registered to an `id` already.
     */
    contains: function(id) {
      return id in this.map;
    }

  });

})((typeof global !== 'undefined' ? global : (this || window)).Two);
