(function() {

  /**
   * Constants
   */
  var OBJECT_COUNT = 0;

  // Localize variables
  var CanvasRenderer = Two[Two.Types.canvas],
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  var Group = function(styles) {

    CanvasRenderer.Group.call(this, styles);

  };

  _.extend(Group.prototype, CanvasRenderer.Group.prototype, {

    render: function() {

    }

  });

  var Element = function(styles) {

    CanvasRenderer.Element.call(this, styles);

  };

  _.extend(Element.prototype, CanvasRenderer.Element.prototype, {

    render: function() {

    }

  });

  var webgl = {

    

  };

  /**
   * Webgl Renderer inherits from the Canvas 2d Renderer
   * with additional modifications.
   */
  var Renderer = Two[Two.Types.webgl] = function() {

    CanvasRenderer.call(this);

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

  _.extend(Renderer.prototype, Backbone.Events, CanvasRenderer.prototype, {

    render: function() {

    }

  });

})();