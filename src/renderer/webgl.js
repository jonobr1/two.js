(function() {

  // Localize variables
  var CanvasRenderer = Two[Two.Types.canvas],
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  var Group = function(styles) {

    CanvasRenderer.Group.call(this, styles);

  };

  _.extend(Group.prototype, CanvasRenderer.Group.prototype, {

    render: function(gl, colorLocation, matrices) {

      // Apply matrices here somehow...

      _.each(this.children, function(child) {
        child.render(gl, colorLocation);
      });

    }

  });

  var Element = function(styles) {

    CanvasRenderer.Element.call(this, styles);

  };

  _.extend(Element.prototype, CanvasRenderer.Element.prototype, {

    render: function(gl, colorLocation, matrices) {

      setRectangle(gl, 60, 60, 100, 100);

      // draw
      gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

    }

  });

  var webgl = {

    /**
     * Interpret a css color string and return an object of normalized
     * r, g, b color values.
     */
    interpret: function(v) {
      return v;
    },

    /**
     * Takes an array of vertices and converts them into an array of
     * triangles ready to be fed to the webgl renderer.
     */
    toArray: function(points, curved, closed) {

      // If curved, then subdivide the path.

      // Tesselate the points.

      // Return the triangles array.

    },

    program: {

      create: function(gl, shaders) {

        var program = gl.createProgram();
        _.each(shaders, function(s) {
          gl.attachShader(program, s);
        });

        gl.linkProgram(program);
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
          error = gl.getProgramInfoLog(program);
          throw new Two.Utils.Error('unable to link program: ' + error);
          gl.deleteProgram(program);
          return null;
        }

        return program;

      }

    },

    shaders: {

      create: function(gl, source, type) {

        var shader = gl.createShader(gl[type]);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
          var error = gl.getShaderInfoLog(shader);
          throw new Two.Utils.Error('unable to compile shader ' + shader + ': ' + error);
          gl.deleteShader(shader);
          return null;
        }

        return shader;

      },

      types: {
        vertex: 'VERTEX_SHADER',
        fragment: 'FRAGMENT_SHADER'
      },

      vertex: [
        'attribute vec2 position;',
        '',
        'uniform vec2 resolution;',
        '',
        'void main() {',
        '   vec2 normal = position / resolution;',
        '   vec2 clipspace = (normal * 2.0) - 1.0;',
        '',
        '   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);',
        '}'
      ].join('\n'),

      fragment: [
        'precision mediump float;',
        '',
        'uniform vec4 color;',
        '',
        'void main() {',
        '  gl_FragColor = color;',
        '}'
      ].join('\n')

    }

  };

  /**
   * Webgl Renderer inherits from the Canvas 2d Renderer
   * with additional modifications.
   */
  var Renderer = Two[Two.Types.webgl] = function() {

    this.domElement = document.createElement('canvas');

    this.elements = [];

    // Everything drawn on the canvas needs to come from the stage.
    this.stage = null;

    this.ctx = this.domElement.getContext('webgl')
      || this.domElement.getContext('experimental-webgl');

    if (!this.ctx) {
      throw new Two.Utils.Error('unable to create a webgl context. Try using another renderer.');
    }

    // Compile Base Shaders to draw in pixel space.
    var vs = webgl.shaders.create(
      this.ctx, webgl.shaders.vertex, webgl.shaders.types.vertex);
    var fs = webgl.shaders.create(
      this.ctx, webgl.shaders.fragment, webgl.shaders.types.fragment);

    this.program = webgl.program.create(this.ctx, [vs, fs]);
    this.ctx.useProgram(this.program);

    // Create and bind the drawing buffer

    // look up where the vertex data needs to go.
    var positionLocation = this.ctx.getAttribLocation(this.program, 'position');
    this.colorLocation = this.ctx.getUniformLocation(this.program, 'color');

    // Create a buffer and put a single clipspace rectangle in
    // it (2 triangles)
    var buffer = this.ctx.createBuffer();
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, buffer);
    this.ctx.enableVertexAttribArray(positionLocation);
    this.ctx.vertexAttribPointer(positionLocation, 2, this.ctx.FLOAT, false, 0, 0);

  };

  _.extend(Renderer, {

    Group: Group,

    Element: Element,

    getStyles: getStyles,

    setStyles: setStyles

  });

  _.extend(Renderer.prototype, Backbone.Events, CanvasRenderer.prototype, {

    setSize: function(width, height) {

      CanvasRenderer.prototype.setSize.apply(this, arguments);

      this.ctx.viewport(0, 0, width, height);

      var resolutionLocation = this.ctx.getUniformLocation(
        this.program, 'resolution');
      this.ctx.uniform2f(resolutionLocation, width, height);

      return this;

    },

    render: function() {

      if (_.isNull(this.stage)) {
        return this;
      }

      // Draw a green rectangle

      var gl = this.ctx,
        program = this.program;

      gl.clear(gl.COLOR_BUFFER_BIT);

      this.stage.render(gl, this.colorLocation);

      return this;

    }

  });

  function setRectangle(gl, x, y, width, height) {
    var x1 = x - width / 2;
    var x2 = x + width / 2;
    var y1 = y - height / 2;
    var y2 = y + height / 2;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
       x1, y1,
       x2, y1,
       x1, y2,
       x1, y2,
       x2, y1,
       x2, y2]), gl.STATIC_DRAW);
  }

  function getStyles(o) {

    var styles = {},
      id = o.id,
      matrix = o._matrix,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = id;
    }
    if (_.isObject(matrix)) {
      styles.matrix = matrix.toArray();
    }
    if (stroke) {
      styles.stroke = webgl.interpret(stroke); // Interpret color
    }
    if (fill) {
      styles.fill = webgl.interpret(fill); // Interpret color
    }
    if (_.isNumber(opacity)) {
      styles.opacity = opacity;
    }
    if (cap) {
      styles.cap = cap;
    }
    if (join) {
      styles.join = join;
    }
    if (miter) {
      styles.miter = miter;
    }
    if (linewidth) {
      styles.linewidth = linewidth;
    }
    if (vertices) {
      styles.triangles = webgl.toArray(vertices, curved, closed);
    }
    styles.visible = !!visible;
    styles.curved = !!curved;
    styles.closed = !!closed;

    return styles;

  }

  function setStyles(elem, property, value) {

    switch (property) {

      case 'matrix':
        property = 'matrix';
        value = value.toArray();
        break;
      case 'stroke':
        // interpret color
        value = webgl.interpret(value);
        break;
      case 'fill':
        // interpret color
        value = webgl.interpret(value);
        break;
      case 'vertices':
        property = 'triangles';
        value = webgl.toArray(value, elem.curved, elem.closed);
        break;
    }

    elem[property] = value;

  }

})();