(function() {

  /**
   * Constants
   */
  var OBJECT_COUNT = 0;

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  var Group = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

    this.children = {};

  };

  _.extend(Group.prototype, {

    appendChild: function() {

      var parent = elem.parent;
      var id = elem.id;

      if (!_.isUndefined(parent)) {
        delete parent.children[id];
      }

      this.children[id] = elem;
      elem.parent = this;

      return this;

    },

    render: function() {

    }

  });

  var Element = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

  };

  _.extend(Element.prototype, {

    render: function() {

    }

  });

  /**
   * Webgl Renderer inherits from the Canvas 2d Renderer
   * with additional modifications.
   */
  var Renderer = Two[Two.Types.webgl] = function() {

    Two[Two.Types.canvas].call(this);

    this.ctx = this.domElement.getContext('webgl')
      || this.domElement.getContext('experimental-webgl');

    if (!this.ctx) {
      throw new Two.Utils.Error('unable to create a webgl context. Try using another renderer.');
    }

  };

  _.extend(Renderer, {

    Group: Group,

    Element: Element

  });

  _.extend(Renderer.prototype, Backbone.Events, Two[Two.Types.canvas].prototype, {

    render: function() {

    }

  });

})();