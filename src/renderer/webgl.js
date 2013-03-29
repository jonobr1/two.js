(function() {

  var CanvasRenderer = Two[Two.Types.canvas],
    multiplyMatrix = Two.Matrix.Multiply,
    getCommands = Two[Two.Types.canvas].Utils.toArray,
    mod = Two.Utils.mod;

  var Group = function(styles) {

    CanvasRenderer.Group.call(this, styles);

  };

  _.extend(Group.prototype, CanvasRenderer.Group.prototype, {

    appendChild: function() {

      CanvasRenderer.Group.prototype.appendChild.apply(this, arguments);

      this.updateMatrix();

      return this;

    },

    updateTexture: function(ctx) {

      _.each(this.children, function(child) {
        child.updateTexture(ctx);
      });

      return this;

    },

    updateMatrix: function(parent) {

      var matrix = (parent && parent._matrix) || this.parent && this.parent._matrix;
      var scale = (parent && parent._scale) || this.parent && this.parent._scale;

      if (!matrix) {
        return this;
      }

      this._matrix = multiplyMatrix(this.matrix, matrix);
      this._scale = this.scale * scale;

      _.each(this.children, function(child) {
        child.updateMatrix(this);
      }, this);

      return this;

    },

    render: function(gl, program) {

      _.each(this.children, function(child) {
        child.render(gl, program);
      });

    }

  });

  var Element = function(styles) {

    CanvasRenderer.Element.call(this, styles);

  };

  _.extend(Element.prototype, CanvasRenderer.Element.prototype, {

    updateMatrix: function(parent) {

      var matrix = (parent && parent._matrix) || this.parent && this.parent._matrix;
      var scale = (parent && parent._scale) || this.parent && this.parent._scale;

      if (!matrix) {
        return this;
      }

      this._matrix = multiplyMatrix(this.matrix, matrix);
      this._scale = this.scale * scale;

      return this;

    },

    updateTexture: function(ctx) {

      webgl.updateTexture(ctx, this);
      return this;

    },

    render: function(gl, program) {

      if (!this.visible || !this.opacity || !this.buffer) {
        return this;
      }

      // Draw Texture

      gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordsBuffer);

      gl.vertexAttribPointer(program.textureCoords, 2, gl.FLOAT, false, 0, 0);

      gl.bindTexture(gl.TEXTURE_2D, this.texture);


      // Draw Rect

      gl.uniformMatrix3fv(program.matrix, false, this._matrix);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

      gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      return this;

    }

  });

  var webgl = {

    canvas: document.createElement('canvas'),

    uv: new Two.Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1
    ]),

    /**
     * Returns the rect of a set of verts. Typically takes vertices that are
     * "centered" around 0 and returns them to be anchored upper-left.
     */
    getBoundingClientRect: function(vertices, border, curved) {

      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(vertices, function(v, i) {

        var x = v.x, y = v.y, a, b, c, d;

        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);

        if (!!curved) {

          a = v.u.x, b = v.u.y;
          c = v.v.x, d = v.v.y;

          top = Math.min(b, d, top);
          left = Math.min(a, c, left);
          right = Math.max(a, c, right);
          bottom = Math.max(b, d, bottom);

        }

      });

      // Expand borders

      if (_.isNumber(border)) {
        top -= border;
        left -= border;
        right += border;
        bottom += border;
      }

      var width = right - left;
      var height = bottom - top;

      var centroid = {
        x: Math.abs(left),
        y: Math.abs(top)
      };

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: width,
        height: height,
        centroid: centroid
      };

    },

    getTriangles: function(rect) {
      var top = rect.top,
        left = rect.left,
        right = rect.right,
        bottom = rect.bottom;
      return new Two.Array([
        left, top,
        right, top,
        left, bottom,
        left, bottom,
        right, top,
        right, bottom
      ]);
    },

    updateCanvas: function(elem) {

      var commands = elem.commands;
      var canvas = this.canvas;
      var ctx = this.ctx;

      // Styles

      var scale = elem._scale,
        stroke = elem.stroke,
        linewidth = elem.linewidth * scale,
        fill = elem.fill,
        opacity = elem.opacity,
        cap = elem.cap,
        join = elem.join,
        miter = elem.miter,
        curved = elem.curved,
        closed = elem.closed,
        length = commands.length,
        last = length - 1;

      canvas.width = Math.max(Math.ceil(elem.rect.width * scale), 1);
      canvas.height = Math.max(Math.ceil(elem.rect.height * scale), 1);

      var centroid = elem.rect.centroid;
      var cx = centroid.x * scale, cy = centroid.y * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fill) {
        ctx.fillStyle = fill;
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
      }
      if (linewidth) {
        ctx.lineWidth = linewidth;
      }
      if (miter) {
        ctx.miterLimit = miter;
      }
      if (join) {
        ctx.lineJoin = join;
      }
      if (cap) {
        ctx.lineCap = cap;
      }
      if (_.isNumber(opacity)) {
        ctx.globalAlpha = opacity;
      }

      ctx.beginPath();
      _.each(commands, function(b, i) {

        var x = (b.x * scale + cx).toFixed(3),
          y = (b.y * scale + cy).toFixed(3);

        if (curved) {

          var prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

          var a = commands[prev];
          var c = commands[next];

          var vx = (a.v.x * scale + cx).toFixed(3);
          var vy = (a.v.y * scale + cy).toFixed(3);

          var ux = (b.u.x * scale + cx).toFixed(3);
          var uy = (b.u.y * scale + cy).toFixed(3);

          if (i <= 0) {

            ctx.moveTo(x, y);

          } else {

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            // Add a final point and close it off

            if (i >= last && closed) {

              vx = (b.v.x * scale + cx).toFixed(3);
              vy = (b.v.y * scale + cy).toFixed(3);

              ux = (c.u.x * scale + cx).toFixed(3);
              uy = (c.u.y * scale + cy).toFixed(3);

              x = (c.x * scale + cx).toFixed(3);
              y = (c.y * scale + cy).toFixed(3);

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

          }

        } else {

          if (i <= 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

        }
      });

      // Loose ends

      if (closed && !curved) {
        ctx.closePath();
      }

      ctx.fill();
      ctx.stroke();

    },

    updateTexture: function(gl, elem) {

      this.updateCanvas(elem);

      if (elem.texture) {
        gl.deleteTexture(elem.texture);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.textureCoordsBuffer);

      elem.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, elem.texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);

    },

    updateBuffer: function(gl, elem, program) {

      if (_.isObject(elem.buffer)) {
        gl.deleteBuffer(elem.buffer);
      }

      elem.buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.buffer);
      gl.enableVertexAttribArray(program.position);

      gl.bufferData(gl.ARRAY_BUFFER, elem.triangles, gl.STATIC_DRAW);

      if (_.isObject(elem.textureCoordsBuffer)) {
        gl.deleteBuffer(elem.textureCoordsBuffer);
      }

      elem.textureCoordsBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.textureCoordsBuffer);
      gl.enableVertexAttribArray(program.textureCoords);

      gl.bufferData(gl.ARRAY_BUFFER, this.uv, gl.STATIC_DRAW);

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
        'attribute vec2 a_position;',
        'attribute vec2 a_textureCoords;',
        '',
        'uniform mat3 u_matrix;',
        'uniform vec2 u_resolution;',
        '',
        'varying vec2 v_textureCoords;',
        '',
        'void main() {',
        '   vec2 projected = (u_matrix * vec3(a_position, 1)).xy;',
        '   vec2 normal = projected / u_resolution;',
        '   vec2 clipspace = (normal * 2.0) - 1.0;',
        '',
        '   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);',
        '   v_textureCoords = a_textureCoords;',
        '}'
      ].join('\n'),

      fragment: [
        'precision mediump float;',
        '',
        'uniform sampler2D u_image;',
        'varying vec2 v_textureCoords;',
        '',
        'void main() {',
        '  gl_FragColor = texture2D(u_image, v_textureCoords);',
        '}'
      ].join('\n')

    }

  };

  webgl.ctx = webgl.canvas.getContext('2d');

  var Renderer = Two[Two.Types.webgl] = function(options) {

    this.count = 0;
    this.domElement = document.createElement('canvas');

    this.elements = [];

    // Everything drawn on the canvas needs to come from the stage.
    this.stage = null;

    // http://games.greggman.com/game/webgl-and-alpha/
    // http://www.khronos.org/registry/webgl/specs/latest/#5.2
    var params = _.defaults(options || {}, {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      stencil: true,
      preserveDrawingBuffer: false
    });

    var gl = this.ctx = this.domElement.getContext('webgl', params)
      || this.domElement.getContext('experimental-webgl', params);

    if (!this.ctx) {
      throw new Two.Utils.Error(
        'unable to create a webgl context. Try using another renderer.');
    }

    // Compile Base Shaders to draw in pixel space.
    var vs = webgl.shaders.create(
      gl, webgl.shaders.vertex, webgl.shaders.types.vertex);
    var fs = webgl.shaders.create(
      gl, webgl.shaders.fragment, webgl.shaders.types.fragment);

    this.program = webgl.program.create(gl, [vs, fs]);
    gl.useProgram(this.program);

    // Create and bind the drawing buffer

    // look up where the vertex data needs to go.
    this.program.position = gl.getAttribLocation(this.program, 'a_position');
    this.program.matrix = gl.getUniformLocation(this.program, 'u_matrix');
    this.program.textureCoords = gl.getAttribLocation(this.program, 'a_textureCoords');

    // Copied from Three.js WebGLRenderer
    gl.disable(gl.DEPTH_TEST);

    // Setup some initial statements of the gl context
    gl.enable(gl.BLEND);
    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE, gl.ONE_MINUS_SRC_ALPHA );

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
        this.program, 'u_resolution');
      this.ctx.uniform2f(resolutionLocation, width, height);

      return this;

    },

    render: function() {

      if (_.isNull(this.stage)) {
        return this;
      }

      // Draw a green rectangle

      this.stage.render(this.ctx, this.program);

      return this;

    }

  });

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
      styles.matrix = styles._matrix = matrix.toArray(true);
      styles.scale = styles._scale = 1;
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
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
      styles.vertices = getCommands(vertices, curved, closed);
      styles.commands = styles.vertices;
      styles.rect = webgl.getBoundingClientRect(styles.commands, styles.linewidth, styles.curved);
      styles.triangles = webgl.getTriangles(styles.rect);
    }
    styles.visible = !!visible;
    styles.curved = !!curved;
    styles.closed = !!closed;

    // Update buffer and texture

    if (o instanceof Two.Polygon) {
      webgl.updateBuffer(this.ctx, styles, this.program);
      Element.prototype.updateTexture.call(styles, this.ctx);
    }

    return styles;

  }

  function setStyles(elem, property, value, closed, curved, strokeChanged) {

    var textureNeedsUpdate = false;

    if (/matrix/.test(property)) {
      elem[property] = value.toArray(true);
      if (_.isNumber(closed)) {
        textureNeedsUpdate = elem.scale !== closed;
        elem.scale = closed;
      }
      elem.updateMatrix();
    } else if (/(stroke|fill|opacity|cap|join|miter|linewidth)/.test(property)) {
      elem[property] = value;
      elem.rect = webgl.getBoundingClientRect(elem.commands, elem.linewidth, elem.curved);
      elem.triangles = webgl.getTriangles(elem.rect);
      webgl.updateBuffer(this.ctx, elem, this.program);
      textureNeedsUpdate = true;
    } else if (property === 'vertices') {
      if (!_.isUndefined(closed)) {
        elem.closed = closed;
      }
      if (!_.isUndefined(curved)) {
        elem.curved = curved;
      }
      if (strokeChanged) {
        elem.commands = getCommands(value, elem.curved, elem.closed);
      } else {
        elem.vertices = getCommands(value, elem.curved, elem.closed);
        elem.commands = elem.vertices;
      }
      elem.rect = webgl.getBoundingClientRect(elem.vertices, elem.linewidth, elem.curved);
      elem.triangles = webgl.getTriangles(elem.rect);
      webgl.updateBuffer(this.ctx, elem, this.program);
      textureNeedsUpdate = true;
    } else {
      elem[property] = value;
    }

    if (textureNeedsUpdate) {
      elem.updateTexture(this.ctx)
    }

  }

})();