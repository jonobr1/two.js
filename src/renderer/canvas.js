(function() {

  /**
   *
   */
  var OBJECT_COUNT = 0;

  var Renderer = Two[Two.Types.canvas] = function() {

    this.domElement = document.createElement('canvas');
    this.ctx = this.domElement.getContext('2d');

    this.elements = [];
    this.commands = [];

  };

  _.extend(Renderer, {

    

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height) {

      this.width = this.domElement.width = width;
      this.height = this.domElement.height = height;

      _.extend(this.domElement.style, {
        width: this.width + 'px'.
        height: this.height + 'px'
      });

      return this;

    },

    add: function(o) {

      var l = arguments.length,
        objects = o,
        elements = this.elements,
        domElement = this.domElement;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        var elem, tag, styles, isGroup = object instanceof Two.Group;

        if (_.isUndefined(object.id)) {
          object.id = generateId();
        }

        // Generate an element, a JavaScript object, that holds all the
        // necessary information to draw to the canvas successfully.

        if (isGroup) {
          // Kind of represents a matrix, save and restore set.
        } else {
          // Has styles and draw commands.
        }

      }, this);

      return this;

    }

  });

  function generateId() {
    var count = OBJECT_COUNT;
    OBJECT_COUNT++;
    return count;
  }

})();