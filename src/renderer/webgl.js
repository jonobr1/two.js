(function() {

  /**
   * Constants
   */
  var OBJECT_COUNT = 0;

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  var Group = function(styles) {

  };

  _.extend(Group.prototype, {

  });

  var Element = function(styles) {

  };

  _.extend(Element.prototype, {

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