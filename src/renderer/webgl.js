(function(Two) {

  /**
   * Constants
   */

  var root = Two.root,
    multiplyMatrix = Two.Matrix.Multiply,
    mod = Two.Utils.mod,
    identity = [1, 0, 0, 0, 1, 0, 0, 0, 1],
    transformation = new Two.Array(9),
    getRatio = Two.Utils.getRatio,
    getComputedMatrix = Two.Utils.getComputedMatrix,
    toFixed = Two.Utils.toFixed,
    _ = Two.Utils;

  var webgl = {

    isHidden: /(none|transparent)/i,

    canvas: (root.document ? root.document.createElement('canvas') : { getContext: _.identity }),

    alignments: {
      left: 'start',
      middle: 'center',
      right: 'end'
    },

    matrix: new Two.Matrix(),

    uv: new Two.Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1
    ]),

    group: {

      removeChild: function(child, gl) {
        if (child.children) {
          for (var i = 0; i < child.children.length; i++) {
            webgl.group.removeChild(child.children[i], gl);
          }
          return;
        }
        // Deallocate texture to free up gl memory.
        gl.deleteTexture(child._renderer.texture);
        delete child._renderer.texture;
      },

      renderChild: function(child) {
        webgl[child._renderer.type].render.call(child, this.gl, this.program);
      },

      render: function(gl, program) {

        this._update();

        var parent = this.parent;
        var flagParentMatrix = (parent._matrix && parent._matrix.manual) || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;

        if (flagParentMatrix || flagMatrix) {

          if (!this._renderer.matrix) {
            this._renderer.matrix = new Two.Array(9);
          }

          // Reduce amount of object / array creation / deletion
          this._matrix.toArray(true, transformation);

          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          this._renderer.scale = this._scale * parent._renderer.scale;

          if (flagParentMatrix) {
            this._flagMatrix = true;
          }

        }

        if (this._mask) {

          gl.enable(gl.STENCIL_TEST);
          gl.stencilFunc(gl.ALWAYS, 1, 1);

          gl.colorMask(false, false, false, true);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);

          webgl[this._mask._renderer.type].render.call(this._mask, gl, program, this);

          gl.colorMask(true, true, true, true);
          gl.stencilFunc(gl.NOTEQUAL, 0, 1);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

        }

        this._flagOpacity = parent._flagOpacity || this._flagOpacity;

        this._renderer.opacity = this._opacity
          * (parent && parent._renderer ? parent._renderer.opacity : 1);

        if (this._flagSubtractions) {
          for (var i = 0; i < this.subtractions.length; i++) {
            webgl.group.removeChild(this.subtractions[i], gl);
          }
        }

        this.children.forEach(webgl.group.renderChild, {
          gl: gl,
          program: program
        });

        if (this._mask) {

          gl.colorMask(false, false, false, false);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);

          webgl[this._mask._renderer.type].render.call(this._mask, gl, program, this);

          gl.colorMask(true, true, true, true);
          gl.stencilFunc(gl.NOTEQUAL, 0, 1);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

          gl.disable(gl.STENCIL_TEST);

        }

        return this.flagReset();

      }

    },

    path: {

      updateCanvas: function(elem) {

        var next, prev, a, c, ux, uy, vx, vy, ar, bl, br, cl, x, y;
        var isOffset;

        var commands = elem._vertices;
        var canvas = this.canvas;
        var ctx = this.ctx;

        // Styles
        var scale = elem._renderer.scale;
        var stroke = elem._stroke;
        var linewidth = elem._linewidth;
        var fill = elem._fill;
        var opacity = elem._renderer.opacity || elem._opacity;
        var cap = elem._cap;
        var join = elem._join;
        var miter = elem._miter;
        var closed = elem._closed;
        var length = commands.length;
        var last = length - 1;

        canvas.width = Math.max(Math.ceil(elem._renderer.rect.width * scale), 1);
        canvas.height = Math.max(Math.ceil(elem._renderer.rect.height * scale), 1);

        var centroid = elem._renderer.rect.centroid;
        var cx = centroid.x;
        var cy = centroid.y;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (fill) {
          if (_.isString(fill)) {
            ctx.fillStyle = fill;
          } else {
            webgl[fill._renderer.type].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (_.isString(stroke)) {
            ctx.strokeStyle = stroke;
          } else {
            webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
            ctx.strokeStyle = stroke._renderer.effect;
          }
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

        var d;
        ctx.save();
        ctx.scale(scale, scale);
        ctx.translate(cx, cy);

        ctx.beginPath();
        for (var i = 0; i < commands.length; i++) {

          b = commands[i];

          x = toFixed(b._x);
          y = toFixed(b._y);

          switch (b._command) {

            case Two.Commands.close:
              ctx.closePath();
              break;

            case Two.Commands.curve:

              prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
              next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

              a = commands[prev];
              c = commands[next];
              ar = (a.controls && a.controls.right) || Two.Vector.zero;
              bl = (b.controls && b.controls.left) || Two.Vector.zero;

              if (a._relative) {
                vx = toFixed((ar.x + a._x));
                vy = toFixed((ar.y + a._y));
              } else {
                vx = toFixed(ar.x);
                vy = toFixed(ar.y);
              }

              if (b._relative) {
                ux = toFixed((bl.x + b._x));
                uy = toFixed((bl.y + b._y));
              } else {
                ux = toFixed(bl.x);
                uy = toFixed(bl.y);
              }

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              if (i >= last && closed) {

                c = d;

                br = (b.controls && b.controls.right) || Two.Vector.zero;
                cl = (c.controls && c.controls.left) || Two.Vector.zero;

                if (b._relative) {
                  vx = toFixed((br.x + b._x));
                  vy = toFixed((br.y + b._y));
                } else {
                  vx = toFixed(br.x);
                  vy = toFixed(br.y);
                }

                if (c._relative) {
                  ux = toFixed((cl.x + c._x));
                  uy = toFixed((cl.y + c._y));
                } else {
                  ux = toFixed(cl.x);
                  uy = toFixed(cl.y);
                }

                x = toFixed(c._x);
                y = toFixed(c._y);

                ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              }

              break;

            case Two.Commands.line:
              ctx.lineTo(x, y);
              break;

            case Two.Commands.move:
              d = b;
              ctx.moveTo(x, y);
              break;

          }

        }

        // Loose ends

        if (closed) {
          ctx.closePath();
        }

        if (!webgl.isHidden.test(fill)) {
          isOffset = fill._renderer && fill._renderer.offset
          if (isOffset) {
            ctx.save();
            ctx.translate(
              - fill._renderer.offset.x, - fill._renderer.offset.y);
            ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
          }
          ctx.fill();
          if (isOffset) {
            ctx.restore();
          }
        }

        if (!webgl.isHidden.test(stroke)) {
          isOffset = stroke._renderer && stroke._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(
              - stroke._renderer.offset.x, - stroke._renderer.offset.y);
            ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
            ctx.lineWidth = linewidth / stroke._renderer.scale.x;
          }
          ctx.stroke();
          if (isOffset) {
            ctx.restore();
          }
        }

        ctx.restore();

      },

      /**
       * Returns the rect of a set of verts. Typically takes vertices that are
       * "centered" around 0 and returns them to be anchored upper-left.
       */
      getBoundingClientRect: function(vertices, border, rect) {

        var left = Infinity, right = -Infinity,
            top = Infinity, bottom = -Infinity,
            width, height;

        vertices.forEach(function(v) {

          var x = v.x, y = v.y, controls = v.controls;
          var a, b, c, d, cl, cr;

          top = Math.min(y, top);
          left = Math.min(x, left);
          right = Math.max(x, right);
          bottom = Math.max(y, bottom);

          if (!v.controls) {
            return;
          }

          cl = controls.left;
          cr = controls.right;

          if (!cl || !cr) {
            return;
          }

          a = v._relative ? cl.x + x : cl.x;
          b = v._relative ? cl.y + y : cl.y;
          c = v._relative ? cr.x + x : cr.x;
          d = v._relative ? cr.y + y : cr.y;

          if (!a || !b || !c || !d) {
            return;
          }

          top = Math.min(b, d, top);
          left = Math.min(a, c, left);
          right = Math.max(a, c, right);
          bottom = Math.max(b, d, bottom);

        });

        // Expand borders

        if (_.isNumber(border)) {
          top -= border;
          left -= border;
          right += border;
          bottom += border;
        }

        width = right - left;
        height = bottom - top;

        rect.top = top;
        rect.left = left;
        rect.right = right;
        rect.bottom = bottom;
        rect.width = width;
        rect.height = height;

        if (!rect.centroid) {
          rect.centroid = {};
        }

        rect.centroid.x = - left;
        rect.centroid.y = - top;

      },

      render: function(gl, program, forcedParent) {

        if (!this._visible || !this._opacity) {
          return this;
        }

        this._update();

        // Calculate what changed

        var parent = this.parent;
        var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var flagTexture = this._flagVertices || this._flagFill
          || (this._fill instanceof Two.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints))
          || (this._fill instanceof Two.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal))
          || (this._fill instanceof Two.Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagOffset || this._fill._flagScale))
          || (this._stroke instanceof Two.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints))
          || (this._stroke instanceof Two.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal))
          || (this._stroke instanceof Two.Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagOffset || this._fill._flagScale))
          || this._flagStroke || this._flagLinewidth || this._flagOpacity
          || parent._flagOpacity || this._flagVisible || this._flagCap
          || this._flagJoin || this._flagMiter || this._flagScale
          || !this._renderer.texture;

        if (flagParentMatrix || flagMatrix) {

          if (!this._renderer.matrix) {
            this._renderer.matrix = new Two.Array(9);
          }

          // Reduce amount of object / array creation / deletion

          this._matrix.toArray(true, transformation);

          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          this._renderer.scale = this._scale * parent._renderer.scale;

        }

        if (flagTexture) {

          if (!this._renderer.rect) {
            this._renderer.rect = {};
          }

          if (!this._renderer.triangles) {
            this._renderer.triangles = new Two.Array(12);
          }

          this._renderer.opacity = this._opacity * parent._renderer.opacity;

          webgl.path.getBoundingClientRect(this._vertices, this._linewidth, this._renderer.rect);
          webgl.getTriangles(this._renderer.rect, this._renderer.triangles);

          webgl.updateBuffer.call(webgl, gl, this, program);
          webgl.updateTexture.call(webgl, gl, this);

        }

        // if (this._mask) {
        //   webgl[this._mask._renderer.type].render.call(mask, gl, program, this);
        // }

        if (this._clip && !forcedParent) {
          return;
        }

        // Draw Texture

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.textureCoordsBuffer);

        gl.vertexAttribPointer(program.textureCoords, 2, gl.FLOAT, false, 0, 0);

        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);


        // Draw Rect

        gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.buffer);

        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        return this.flagReset();

      }

    },

    text: {

      updateCanvas: function(elem) {

        var canvas = this.canvas;
        var ctx = this.ctx;

        // Styles
        var scale = elem._renderer.scale;
        var stroke = elem._stroke;
        var linewidth = elem._linewidth * scale;
        var fill = elem._fill;
        var opacity = elem._renderer.opacity || elem._opacity;

        canvas.width = Math.max(Math.ceil(elem._renderer.rect.width * scale), 1);
        canvas.height = Math.max(Math.ceil(elem._renderer.rect.height * scale), 1);

        var centroid = elem._renderer.rect.centroid;
        var cx = centroid.x;
        var cy = centroid.y;

        var a, b, c, d, e, sx, sy;
        var isOffset = fill._renderer && fill._renderer.offset
          && stroke._renderer && stroke._renderer.offset;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!isOffset) {
          ctx.font = [elem._style, elem._weight, elem._size + 'px/' +
            elem._leading + 'px', elem._family].join(' ');
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Styles
        if (fill) {
          if (_.isString(fill)) {
            ctx.fillStyle = fill;
          } else {
            webgl[fill._renderer.type].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (_.isString(stroke)) {
            ctx.strokeStyle = stroke;
          } else {
            webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
            ctx.strokeStyle = stroke._renderer.effect;
          }
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
        if (_.isNumber(opacity)) {
          ctx.globalAlpha = opacity;
        }

        ctx.save();
        ctx.scale(scale, scale);
        ctx.translate(cx, cy);

        if (!webgl.isHidden.test(fill)) {

          if (fill._renderer && fill._renderer.offset) {

            sx = toFixed(fill._renderer.scale.x);
            sy = toFixed(fill._renderer.scale.y);

            ctx.save();
            ctx.translate( - toFixed(fill._renderer.offset.x),
              - toFixed(fill._renderer.offset.y));
            ctx.scale(sx, sy);

            a = elem._size / fill._renderer.scale.y;
            b = elem._leading / fill._renderer.scale.y;
            ctx.font = [elem._style, elem._weight, toFixed(a) + 'px/',
              toFixed(b) + 'px', elem._family].join(' ');

            c = fill._renderer.offset.x / fill._renderer.scale.x;
            d = fill._renderer.offset.y / fill._renderer.scale.y;

            ctx.fillText(elem.value, toFixed(c), toFixed(d));
            ctx.restore();

          } else {
            ctx.fillText(elem.value, 0, 0);
          }

        }

        if (!webgl.isHidden.test(stroke)) {

          if (stroke._renderer && stroke._renderer.offset) {

            sx = toFixed(stroke._renderer.scale.x);
            sy = toFixed(stroke._renderer.scale.y);

            ctx.save();
            ctx.translate(- toFixed(stroke._renderer.offset.x),
              - toFixed(stroke._renderer.offset.y));
            ctx.scale(sx, sy);

            a = elem._size / stroke._renderer.scale.y;
            b = elem._leading / stroke._renderer.scale.y;
            ctx.font = [elem._style, elem._weight, toFixed(a) + 'px/',
              toFixed(b) + 'px', elem._family].join(' ');

            c = stroke._renderer.offset.x / stroke._renderer.scale.x;
            d = stroke._renderer.offset.y / stroke._renderer.scale.y;
            e = linewidth / stroke._renderer.scale.x;

            ctx.lineWidth = toFixed(e);
            ctx.strokeText(elem.value, toFixed(c), toFixed(d));
            ctx.restore();

          } else {
            ctx.strokeText(elem.value, 0, 0);
          }

        }

        ctx.restore();

      },

      getBoundingClientRect: function(elem, rect) {

        var ctx = webgl.ctx;

        ctx.font = [elem._style, elem._weight, elem._size + 'px/' +
          elem._leading + 'px', elem._family].join(' ');

        ctx.textAlign = 'center';
        ctx.textBaseline = elem._baseline;

        // TODO: Estimate this better
        var width = ctx.measureText(elem._value).width;
        var height = Math.max(elem._size || elem._leading);

        if (this._linewidth && !webgl.isHidden.test(this._stroke)) {
          // width += this._linewidth; // TODO: Not sure if the `measure` calcs this.
          height += this._linewidth;
        }

        var w = width / 2;
        var h = height / 2;

        switch (webgl.alignments[elem._alignment] || elem._alignment) {

          case webgl.alignments.left:
            rect.left = 0;
            rect.right = width;
            break;
          case webgl.alignments.right:
            rect.left = - width;
            rect.right = 0;
            break;
          default:
            rect.left = - w;
            rect.right = w;
        }

        // TODO: Gradients aren't inherited...
        switch (elem._baseline) {
          case 'bottom':
            rect.top = - height;
            rect.bottom = 0;
            break;
          case 'top':
            rect.top = 0;
            rect.bottom = height;
            break;
          default:
            rect.top = - h;
            rect.bottom = h;
        }

        rect.width = width;
        rect.height = height;

        if (!rect.centroid) {
          rect.centroid = {};
        }

        // TODO:
        rect.centroid.x = w;
        rect.centroid.y = h;

      },

      render: function(gl, program, forcedParent) {

        if (!this._visible || !this._opacity) {
          return this;
        }

        this._update();

        // Calculate what changed

        var parent = this.parent;
        var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var flagTexture = this._flagVertices || this._flagFill
          || (this._fill instanceof Two.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints))
          || (this._fill instanceof Two.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal))
          || (this._fill instanceof Two.Texture && (this._fill._flagLoaded && this._fill.loaded))
          || (this._stroke instanceof Two.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints))
          || (this._stroke instanceof Two.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal))
          || (this._texture instanceof Two.Texture && (this._texture._flagLoaded && this._texture.loaded))
          || this._flagStroke || this._flagLinewidth || this._flagOpacity
          || parent._flagOpacity || this._flagVisible || this._flagScale
          || this._flagValue || this._flagFamily || this._flagSize
          || this._flagLeading || this._flagAlignment || this._flagBaseline
          || this._flagStyle || this._flagWeight || this._flagDecoration
          || !this._renderer.texture;

        if (flagParentMatrix || flagMatrix) {

          if (!this._renderer.matrix) {
            this._renderer.matrix = new Two.Array(9);
          }

          // Reduce amount of object / array creation / deletion

          this._matrix.toArray(true, transformation);

          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          this._renderer.scale = this._scale * parent._renderer.scale;

        }

        if (flagTexture) {

          if (!this._renderer.rect) {
            this._renderer.rect = {};
          }

          if (!this._renderer.triangles) {
            this._renderer.triangles = new Two.Array(12);
          }

          this._renderer.opacity = this._opacity * parent._renderer.opacity;

          webgl.text.getBoundingClientRect(this, this._renderer.rect);
          webgl.getTriangles(this._renderer.rect, this._renderer.triangles);

          webgl.updateBuffer.call(webgl, gl, this, program);
          webgl.updateTexture.call(webgl, gl, this);

        }

        // if (this._mask) {
        //   webgl[this._mask._renderer.type].render.call(mask, gl, program, this);
        // }

        if (this._clip && !forcedParent) {
          return;
        }

        // Draw Texture

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.textureCoordsBuffer);

        gl.vertexAttribPointer(program.textureCoords, 2, gl.FLOAT, false, 0, 0);

        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);


        // Draw Rect

        gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.buffer);

        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        return this.flagReset();

      }

    },

    'linear-gradient': {

      render: function(ctx, elem) {

        if (!ctx.canvas.getContext('2d')) {
          return;
        }

        this._update();

        if (!this._renderer.effect || this._flagEndPoints || this._flagStops) {

          this._renderer.effect = ctx.createLinearGradient(
            this.left._x, this.left._y,
            this.right._x, this.right._y
          );

          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.effect.addColorStop(stop._offset, stop._color);
          }

        }

        return this.flagReset();

      }

    },

    'radial-gradient': {

      render: function(ctx, elem) {

        if (!ctx.canvas.getContext('2d')) {
          return;
        }

        this._update();

        if (!this._renderer.effect || this._flagCenter || this._flagFocal
            || this._flagRadius || this._flagStops) {

          this._renderer.effect = ctx.createRadialGradient(
            this.center._x, this.center._y, 0,
            this.focal._x, this.focal._y, this._radius
          );

          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.effect.addColorStop(stop._offset, stop._color);
          }

        }

        return this.flagReset();

      }

    },

    texture: {

      render: function(ctx, elem) {

        if (!ctx.canvas.getContext('2d')) {
          return;
        }

        this._update();

        var image = this.image;
        var repeat;

        if (!this._renderer.effect || ((this._flagLoaded || this._flagRepeat) && this.loaded)) {
          this._renderer.effect = ctx.createPattern(image, this._repeat);
        }

        if (this._flagOffset || this._flagLoaded || this._flagScale) {

          if (!(this._renderer.offset instanceof Two.Vector)) {
            this._renderer.offset = new Two.Vector();
          }

          this._renderer.offset.x = this._offset.x;
          this._renderer.offset.y = this._offset.y;

          if (image) {

            this._renderer.offset.x -= image.width / 2;
            this._renderer.offset.y += image.height / 2;

            if (this._scale instanceof Two.Vector) {
              this._renderer.offset.x *= this._scale.x;
              this._renderer.offset.y *= this._scale.y;
            } else {
              this._renderer.offset.x *= this._scale;
              this._renderer.offset.y *= this._scale;
            }
          }

        }

        if (this._flagScale || this._flagLoaded) {

          if (!(this._renderer.scale instanceof Two.Vector)) {
            this._renderer.scale = new Two.Vector();
          }

          if (this._scale instanceof Two.Vector) {
            this._renderer.scale.copy(this._scale);
          } else {
            this._renderer.scale.set(this._scale, this._scale);
          }

        }

        return this.flagReset();

      }

    },

    getTriangles: function(rect, triangles) {

      var top = rect.top,
          left = rect.left,
          right = rect.right,
          bottom = rect.bottom;

      // First Triangle

      triangles[0] = left;
      triangles[1] = top;

      triangles[2] = right;
      triangles[3] = top;

      triangles[4] = left;
      triangles[5] = bottom;

      // Second Triangle

      triangles[6] = left;
      triangles[7] = bottom;

      triangles[8] = right;
      triangles[9] = top;

      triangles[10] = right;
      triangles[11] = bottom;

    },

    updateTexture: function(gl, elem) {

      this[elem._renderer.type].updateCanvas.call(webgl, elem);

      if (elem._renderer.texture) {
        gl.deleteTexture(elem._renderer.texture);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, elem._renderer.textureCoordsBuffer);

      // TODO: Is this necessary every time or can we do once?
      // TODO: Create a registry for textures
      elem._renderer.texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, elem._renderer.texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      if (this.canvas.width <= 0 || this.canvas.height <= 0) {
        return;
      }

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);

    },

    updateBuffer: function(gl, elem, program) {

      if (_.isObject(elem._renderer.buffer)) {
        gl.deleteBuffer(elem._renderer.buffer);
      }

      elem._renderer.buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem._renderer.buffer);
      gl.enableVertexAttribArray(program.position);

      gl.bufferData(gl.ARRAY_BUFFER, elem._renderer.triangles, gl.STATIC_DRAW);

      if (_.isObject(elem._renderer.textureCoordsBuffer)) {
        gl.deleteBuffer(elem._renderer.textureCoordsBuffer);
      }

      elem._renderer.textureCoordsBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem._renderer.textureCoordsBuffer);
      gl.enableVertexAttribArray(program.textureCoords);

      gl.bufferData(gl.ARRAY_BUFFER, this.uv, gl.STATIC_DRAW);

    },

    program: {

      create: function(gl, shaders) {
        var program, linked, error;
        program = gl.createProgram();
        _.each(shaders, function(s) {
          gl.attachShader(program, s);
        });

        gl.linkProgram(program);
        linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
          error = gl.getProgramInfoLog(program);
          gl.deleteProgram(program);
          throw new Two.Utils.Error('unable to link program: ' + error);
        }

        return program;

      }

    },

    shaders: {

      create: function(gl, source, type) {
        var shader, compiled, error;
        shader = gl.createShader(gl[type]);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
          error = gl.getShaderInfoLog(shader);
          gl.deleteShader(shader);
          throw new Two.Utils.Error('unable to compile shader ' + shader + ': ' + error);
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
        '   vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;',
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

    },

    TextureRegistry: new Two.Registry()

  };

  webgl.ctx = webgl.canvas.getContext('2d');

  var Renderer = Two[Two.Types.webgl] = function(options) {

    var params, gl, vs, fs;
    this.domElement = options.domElement || document.createElement('canvas');

    // Everything drawn on the canvas needs to come from the stage.
    this.scene = new Two.Group();
    this.scene.parent = this;

    this._renderer = {
      matrix: new Two.Array(identity),
      scale: 1,
      opacity: 1
    };
    this._flagMatrix = true;

    // http://games.greggman.com/game/webgl-and-alpha/
    // http://www.khronos.org/registry/webgl/specs/latest/#5.2
    params = _.defaults(options || {}, {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      stencil: true,
      preserveDrawingBuffer: true,
      overdraw: false
    });

    this.overdraw = params.overdraw;

    gl = this.ctx = this.domElement.getContext('webgl', params) ||
      this.domElement.getContext('experimental-webgl', params);

    if (!this.ctx) {
      throw new Two.Utils.Error(
        'unable to create a webgl context. Try using another renderer.');
    }

    // Compile Base Shaders to draw in pixel space.
    vs = webgl.shaders.create(
      gl, webgl.shaders.vertex, webgl.shaders.types.vertex);
    fs = webgl.shaders.create(
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

    // https://code.google.com/p/chromium/issues/detail?id=316393
    // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, gl.TRUE);

    gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE, gl.ONE_MINUS_SRC_ALPHA );

  };

  _.extend(Renderer, {

    Utils: webgl

  });

  _.extend(Renderer.prototype, Two.Utils.Events, {

    setSize: function(width, height, ratio) {

      this.width = width;
      this.height = height;

      this.ratio = _.isUndefined(ratio) ? getRatio(this.ctx) : ratio;

      this.domElement.width = width * this.ratio;
      this.domElement.height = height * this.ratio;

      _.extend(this.domElement.style, {
        width: width + 'px',
        height: height + 'px'
      });

      width *= this.ratio;
      height *= this.ratio;

      // Set for this.stage parent scaling to account for HDPI
      this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio;

      this._flagMatrix = true;

      this.ctx.viewport(0, 0, width, height);

      var resolutionLocation = this.ctx.getUniformLocation(
        this.program, 'u_resolution');
      this.ctx.uniform2f(resolutionLocation, width, height);

      return this;

    },

    render: function() {

      var gl = this.ctx;

      if (!this.overdraw) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }

      webgl.group.render.call(this.scene, gl, this.program);
      this._flagMatrix = false;

      return this;

    }

  });

})((typeof global !== 'undefined' ? global : this).Two);
