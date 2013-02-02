(function() {

  var root = this;
  var previousTwo = root.Two || {};

  /**
   * Constants
   */

  var PI = Math.PI,
    TWO_PI = PI * 2,
    HALF_PI = PI * 0.5;

  /**
   * Cross browser dom events.
   */
  var dom = {

    hasEventListeners: _.isFunction(root.addEventListener),

    bind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.addEventListener(event, func, !!bool);
      } else {
        elem.attachEvent('on' + event, func);
      }
      return this;
    },

    unbind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.removeEventListeners(event, func, !!bool);
      } else {
        elem.detachEvent('on' + event, func);
      }
      return this;
    }

  };

  /**
   * @class
   */
  var Two = root.Two = function(options) {

    // Determine what Renderer to use and setup a scene.

    var params = _.defaults(options || {}, {
      fullscreen: false,
      width: 400,
      height: 400,
      type: Two.types.svg,
      autostart: true
    });

    this.renderer = new Two[params.type]();
    this.playing = params.autostart;

    if (params.fullscreen) {

      var fitted = _.bind(fitToWindow, this);
      _.extend(document.body.style, {
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      dom.bind(window, 'resize', fitted);
      fitted();


    } else {

      this.renderer.setSize(params.width, params.height);
      this.width = params.width;
      this.height = params.height;

    }

    this.scene = new Two.Group();
    this.renderer.add(this.scene);

    Two.instances.push(this);

  };

  _.extend(Two, {

    types: {
      webgl: 'WebGLRenderer',
      svg: 'SVGRenderer',
      canvas: 'CanvasRenderer'
    },

    instances: [],

    noConflict: function() {
      root.Two = previousTwo;
      return this;
    }

  });

  _.extend(Two.prototype, Backbone.Events, {

    appendTo: function(elem) {

      elem.appendChild(this.renderer.domElement);
      return this;

    },

    play: function() {

      this.playing = true;

      return this.trigger('play');

    },

    pause: function() {

      this.playing = false;

      return this.trigger('pause');

    },

    /**
     * Update positions and calculations in one pass before rendering.
     */
    update: function() {

      var width = this.width;
      var height = this.height;
      var renderer = this.renderer;

      // Update width / height for the renderer
      if (width !== renderer.width) {
        renderer.width = width;
      }
      if (height !== renderer.height) {
        renderer.height = height;
      }

      return this.trigger('update');

    },

    /**
     * Render all drawable - visible objects of the scene.
     */
    render: function() {

      this.renderer.render();

      return this.trigger('render');

    }

  });

  function fitToWindow() {

    var wr = document.body.getBoundingClientRect();

    var width = this.width = wr.width;
    var height = this.height = wr.height;

    this.renderer.setSize(width, height);
    this.trigger('resize', width, height);

  }

  // Request Animation Frame

  (function() {

    _.each(Two.instances, function(t) {

      if (t.playing) {
        t.update().render();
      }

    });

    requestAnimationFrame(arguments.callee);

  })();

})();