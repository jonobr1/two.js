(function(Two) {

  var _ = Two.Utils;

  /**
   * @class
   * @name Two.Registry
   */
  var Registry = Two.Registry = function() {

    this.map = {};

  };

  _.extend(Registry, {

  });

  _.extend(Registry.prototype, {

    constructor: Registry,

    add: function(id, obj) {
      this.map[id] = obj;
      return this;
    },

    remove: function(id) {
      delete this.map[id];
      return this;
    },

    get: function(id) {
      return this.map[id];
    },

    contains: function(id) {
      return id in this.map;
    }

  });

})((typeof global !== 'undefined' ? global : (this || window)).Two);
