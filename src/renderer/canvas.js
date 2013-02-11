(function() {

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

      

    }

  });

})();