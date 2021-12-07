import Commands from '../utils/path-commands.js';

import root from '../utils/root.js';
import { getPoT, mod, NumArray, TWO_PI } from '../utils/math.js';
import shaders from '../utils/shaders.js';
import Events from '../events.js';
import TwoError from '../utils/error.js';
import getRatio from '../utils/get-ratio.js';
import _ from '../utils/underscore.js';

import Group from '../group.js';
import Vector from '../vector.js';
import Matrix from '../matrix.js';
import Registry from '../registry.js';

import LinearGradient from '../effects/linear-gradient.js';
import RadialGradient from '../effects/radial-gradient.js';
import Texture from '../effects/texture.js';

import CanvasRenderer from './canvas.js';

// Constants

var multiplyMatrix = Matrix.Multiply,
  identity = [1, 0, 0, 0, 1, 0, 0, 0, 1],
  transformation = new NumArray(9),
  CanvasUtils = CanvasRenderer.Utils;

var quad = new NumArray([
  0, 0,
  1, 0,
  0, 1,
  0, 1,
  1, 0,
  1, 1
]);

var webgl = {

  precision: 0.9,

  isHidden: /(undefined|none|transparent)/i,

  canvas: (root.document ? root.document.createElement('canvas') : { getContext: function() {} }),

  alignments: {
    left: 'start',
    middle: 'center',
    right: 'end'
  },

  matrix: new Matrix(),

  group: {

    removeChild: function(child, gl) {
      if (child.children) {
        for (var i = 0; i < child.children.length; i++) {
          webgl.group.removeChild(child.children[i], gl);
        }
      }
      // Deallocate texture to free up gl memory.
      if (child._renderer.texture) {
        gl.deleteTexture(child._renderer.texture);
        delete child._renderer.texture;
      }
      // Deallocate vertices to free up gl memory.
      if (child._renderer.positionBuffer) {
        gl.deleteBuffer(child._renderer.positionBuffer);
        delete child._renderer.positionBuffer;
      }
    },

    render: function(gl, programs) {

      if (!this._visible) {
        return;
      }

      this._update();

      var parent = this.parent;
      var flagParentMatrix = (parent._matrix && parent._matrix.manual) || parent._flagMatrix;
      var flagMatrix = this._matrix.manual || this._flagMatrix;

      if (flagParentMatrix || flagMatrix) {

        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }

        // Reduce amount of object / array creation / deletion
        this._matrix.toTransformArray(true, transformation);

        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }

        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x;
          this._renderer.scale.y = this._scale.y;
        } else {
          this._renderer.scale.x = this._scale;
          this._renderer.scale.y = this._scale;
        }

        if (!(/renderer/i.test(parent._renderer.type))) {
          this._renderer.scale.x *= parent._renderer.scale.x;
          this._renderer.scale.y *= parent._renderer.scale.y;
        }

        if (flagParentMatrix) {
          this._flagMatrix = true;
        }

      }

      if (this._mask) {

        // Stencil away everything that isn't rendered by the mask
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);

        gl.stencilFunc(gl.ALWAYS, 1, 0);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        // Don't draw the element onto the canvas, only onto the stencil buffer
        gl.colorMask(false, false, false, false);

        webgl[this._mask._renderer.type].render.call(this._mask, gl, programs, this);

        gl.stencilFunc(gl.EQUAL, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.colorMask(true, true, true, true);

      }

      this._flagOpacity = parent._flagOpacity || this._flagOpacity;

      this._renderer.opacity = this._opacity
        * (parent && parent._renderer ? parent._renderer.opacity : 1);

      var i;
      if (this._flagSubtractions) {
        for (i = 0; i < this.subtractions.length; i++) {
          webgl.group.removeChild(this.subtractions[i], gl);
        }
      }

      for (i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        webgl[child._renderer.type].render.call(child, gl, programs);
      }

      if (this._mask) {
        gl.disable(gl.STENCIL_TEST);
      }

      return this.flagReset();

    }

  },

  path: {

    updateCanvas: function(elem) {

      var prev, a, c, ux, uy, vx, vy, ar, bl, br, cl, x, y;
      var isOffset;

      var commands = elem._renderer.vertices;
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
      var dashes = elem.dashes;
      var length = commands.length;
      var last = length - 1;

      canvas.width = Math.max(Math.ceil(elem._renderer.rect.width * scale.x), 1);
      canvas.height = Math.max(Math.ceil(elem._renderer.rect.height * scale.y), 1);

      var centroid = elem._renderer.rect.centroid;
      var cx = centroid.x;
      var cy = centroid.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fill) {
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          webgl[fill._renderer.type].render.call(fill, ctx, elem);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
          ctx.strokeStyle = stroke._renderer.effect;
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
        if (!closed && cap) {
          ctx.lineCap = cap;
        }
      }
      if (typeof opacity === 'number') {
        ctx.globalAlpha = opacity;
      }

      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }

      var d;
      ctx.save();
      ctx.scale(scale.x, scale.y);

      ctx.translate(cx, cy);

      ctx.beginPath();
      for (var i = 0; i < commands.length; i++) {

        var b = commands[i];

        x = b.x;
        y = b.y;

        switch (b.command) {

          case Commands.close:
            ctx.closePath();
            break;

          case Commands.arc:

            var rx = b.rx;
            var ry = b.ry;
            var xAxisRotation = b.xAxisRotation;
            var largeArcFlag = b.largeArcFlag;
            var sweepFlag = b.sweepFlag;

            prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
            a = commands[prev];

            var ax = a.x;
            var ay = a.y;

            CanvasUtils.renderSvgArcCommand(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y);
            break;

          case Commands.curve:

            prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);

            a = commands[prev];

            ar = (a.controls && a.controls.right) || Vector.zero;
            bl = (b.controls && b.controls.left) || Vector.zero;

            if (a._relative) {
              vx = ar.x + a.x;
              vy = ar.y + a.y;
            } else {
              vx = ar.x;
              vy = ar.y;
            }

            if (b._relative) {
              ux = bl.x + b.x;
              uy = bl.y + b.y;
            } else {
              ux = bl.x;
              uy = bl.y;
            }

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            if (i >= last && closed) {

              c = d;

              br = (b.controls && b.controls.right) || Vector.zero;
              cl = (c.controls && c.controls.left) || Vector.zero;

              if (b._relative) {
                vx = br.x + b.x;
                vy = br.y + b.y;
              } else {
                vx = br.x;
                vy = br.y;
              }

              if (c._relative) {
                ux = cl.x + c.x;
                uy = cl.y + c.y;
              } else {
                ux = cl.x;
                uy = cl.y;
              }

              x = c.x;
              y = c.y;

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

            break;

          case Commands.line:
            ctx.lineTo(x, y);
            break;

          case Commands.move:
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
        isOffset = fill._renderer && fill._renderer.offset;
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

    // Returns the rect of a set of verts. Typically takes vertices that are
    // "centered" around 0 and returns them to be anchored upper-left.
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

      if (typeof border === 'number') {
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

    render: function(gl, programs, forcedParent) {

      if (!this._visible || !this._opacity) {
        return this;
      }

      this._update();

      // Calculate what changed

      var parent = forcedParent || this.parent;
      var program = programs[this._renderer.type];
      var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
      var flagMatrix = this._matrix.manual || this._flagMatrix;
      var parentChanged = this._renderer.parent !== parent;
      var flagTexture = this._flagVertices || this._flagFill
        || (this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints))
        || (this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal))
        || (this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale))
        || (this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints))
        || (this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal))
        || (this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale))
        || this._flagStroke || this._flagLinewidth || this._flagOpacity
        || parent._flagOpacity || this._flagVisible || this._flagCap
        || this._flagJoin || this._flagMiter || this._flagScale
        || (this.dashes && this.dashes.length > 0)
        || !this._renderer.texture;

      if (flagParentMatrix || flagMatrix || parentChanged) {

        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }

        // Reduce amount of object / array creation / deletion

        this._matrix.toTransformArray(true, transformation);

        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale.y * parent._renderer.scale.y;
        } else {
          this._renderer.scale.x = this._scale * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale * parent._renderer.scale.y;
        }

        if (parentChanged) {
          this._renderer.parent = parent;
        }
      }

      if (this._mask) {

        // Stencil away everything that isn't rendered by the mask
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);

        gl.stencilFunc(gl.ALWAYS, 1, 0);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        // Don't draw the element onto the canvas, only onto the stencil buffer
        gl.colorMask(false, false, false, false);

        webgl[this._mask._renderer.type].render.call(this._mask, gl, programs, this);

        gl.stencilFunc(gl.EQUAL, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.colorMask(true, true, true, true);

      }

      if (flagTexture) {

        if (!this._renderer.rect) {
          this._renderer.rect = {};
        }

        this._renderer.opacity = this._opacity * parent._renderer.opacity;

        webgl.path.getBoundingClientRect(
          this._renderer.vertices, this._linewidth, this._renderer.rect);

        webgl.updateTexture.call(webgl, gl, this);

      } else {

        // We still need to update child Two elements on the fill and
        // stroke properties.
        if (this._fill && this._fill._update) {
          this._fill._update();
        }
        if (this._stroke && this._stroke._update) {
          this._stroke._update();
        }

      }

      if (this._clip && !forcedParent || !this._renderer.texture) {
        return this;
      }

      if (programs.current !== program) {

        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, programs.buffers.position);
        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.position);
        gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

        if (!programs.resolution.flagged) {
          gl.uniform2f(
            gl.getUniformLocation(program, 'u_resolution'),
            programs.resolution.width,
            programs.resolution.height
          );
        }

        programs.current = program;

      }

      if (programs.resolution.flagged) {
        gl.uniform2f(
          gl.getUniformLocation(program, 'u_resolution'),
          programs.resolution.width,
          programs.resolution.height
        );
      }

      // Draw Texture
      gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);

      // Draw Rect
      var rect = this._renderer.rect;
      gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
      gl.uniform4f(program.rect, rect.left, rect.top, rect.right, rect.bottom);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (this._mask) {
        gl.disable(gl.STENCIL_TEST);
      }

      return this.flagReset();

    }

  },

  points: {

    // The canvas is a texture that is a rendering of one vertex
    updateCanvas: function(elem) {

      var isOffset;

      var canvas = this.canvas;
      var ctx = this.ctx;

      // Styles
      var stroke = elem._stroke;
      var linewidth = elem._linewidth;
      var fill = elem._fill;
      var opacity = elem._renderer.opacity || elem._opacity;
      var dashes = elem.dashes;
      var size = elem._size;
      var dimension = size;

      if (!(webgl.isHidden.test(stroke))) {
        dimension += linewidth;
      }

      canvas.width = getPoT(dimension);
      canvas.height = canvas.width;

      var aspect = dimension / canvas.width;

      var cx = canvas.width / 2;
      var cy = canvas.height / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fill) {
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          webgl[fill._renderer.type].render.call(fill, ctx, elem);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth / aspect;
        }
      }
      if (typeof opacity === 'number') {
        ctx.globalAlpha = opacity;
      }

      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(webgl.precision, webgl.precision); // Precision for even rendering
      ctx.beginPath();
      ctx.arc(0, 0, (size / aspect) * 0.5, 0, TWO_PI);
      ctx.restore();

      // Loose ends

      if (closed) {
        ctx.closePath();
      }

      if (!webgl.isHidden.test(fill)) {
        isOffset = fill._renderer && fill._renderer.offset;
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

    },

    render: function(gl, programs, forcedParent) {

      if (!this._visible || !this._opacity) {
        return this;
      }

      this._update();

      // Calculate what changed

      var parent = forcedParent || this.parent;
      var program = programs[this._renderer.type];
      var size = this._size;
      var sizeAttenuation = this._sizeAttenuation;
      var stroke = this._stroke;
      var linewidth = this._linewidth;
      var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
      var flagMatrix = this._matrix.manual || this._flagMatrix;
      var parentChanged = this._renderer.parent !== parent;
      var commands = this._renderer.vertices;
      var length = this._renderer.collection.length;
      var flagVertices = this._flagVertices;
      var flagTexture = this._flagFill
        || (this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints))
        || (this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal))
        || (this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale))
        || (this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints))
        || (this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal))
        || (this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale))
        || this._flagStroke || this._flagLinewidth || this._flagOpacity
        || parent._flagOpacity || this._flagVisible || this._flagScale
        || (this.dashes && this.dashes.length > 0)
        || !this._renderer.texture;

      if (flagParentMatrix || flagMatrix || parentChanged) {

        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }

        // Reduce amount of object / array creation / deletion

        this._matrix.toTransformArray(true, transformation);

        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale.y * parent._renderer.scale.y;
        } else {
          this._renderer.scale.x = this._scale * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale * parent._renderer.scale.y;
        }

        if (parentChanged) {
          this._renderer.parent = parent;
        }

      }

      if (flagVertices) {

        var positionBuffer = this._renderer.positionBuffer;
        if (positionBuffer) {
          gl.deleteBuffer(positionBuffer);
        }

        // Bind the vertex buffer
        this._renderer.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._renderer.positionBuffer);
        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.position);
        gl.bufferData(gl.ARRAY_BUFFER, commands, gl.STATIC_DRAW);

      }

      if (flagTexture) {

        this._renderer.opacity = this._opacity * parent._renderer.opacity;

        webgl.updateTexture.call(webgl, gl, this);

      } else {

        // We still need to update child Two elements on the fill and
        // stroke properties.
        if (this._fill && this._fill._update) {
          this._fill._update();
        }
        if (this._stroke && this._stroke._update) {
          this._stroke._update();
        }

      }

      if (this._clip && !forcedParent || !this._renderer.texture) {
        return this;
      }

      if (!webgl.isHidden.test(stroke)) {
        size += linewidth;
      }
      size /= webgl.precision;
      if (sizeAttenuation) {
        size *= Math.max(this._renderer.scale.x, this._renderer.scale.y);
      }

      if (programs.current !== program) {
        gl.useProgram(program);
        if (!programs.resolution.flagged) {
          gl.uniform2f(
            gl.getUniformLocation(program, 'u_resolution'),
            programs.resolution.width,
            programs.resolution.height
          );
        }
        programs.current = program;
      }

      if (programs.resolution.flagged) {
        gl.uniform2f(
          gl.getUniformLocation(program, 'u_resolution'),
          programs.resolution.width,
          programs.resolution.height
        );
      }

      // Draw Texture
      gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);

      // Draw Points
      gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
      gl.uniform1f(program.size, size * programs.resolution.ratio);
      gl.drawArrays(gl.POINTS, 0, length);

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
      var dashes = elem.dashes;
      var decoration = elem._decoration;

      canvas.width = Math.max(Math.ceil(elem._renderer.rect.width * scale.x), 1);
      canvas.height = Math.max(Math.ceil(elem._renderer.rect.height * scale.y), 1);

      var centroid = elem._renderer.rect.centroid;
      var cx = centroid.x;
      var cy = centroid.y;

      var a, b, c, d, e, sx, sy, x1, y1, x2, y2;
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
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          webgl[fill._renderer.type].render.call(fill, ctx, elem);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = linewidth;
        }
      }
      if (typeof opacity === 'number') {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }

      ctx.save();
      ctx.scale(scale.x, scale.y);
      ctx.translate(cx, cy);

      if (!webgl.isHidden.test(fill)) {

        if (fill._renderer && fill._renderer.offset) {

          sx = fill._renderer.scale.x;
          sy = fill._renderer.scale.y;

          ctx.save();
          ctx.translate( - fill._renderer.offset.x,
            - fill._renderer.offset.y);
          ctx.scale(sx, sy);

          a = elem._size / fill._renderer.scale.y;
          b = elem._leading / fill._renderer.scale.y;
          ctx.font = [elem._style, elem._weight, a + 'px/',
            b + 'px', elem._family].join(' ');

          c = fill._renderer.offset.x / fill._renderer.scale.x;
          d = fill._renderer.offset.y / fill._renderer.scale.y;

          ctx.fillText(elem.value, c, d);
          ctx.restore();

        } else {
          ctx.fillText(elem.value, 0, 0);
        }

      }

      if (!webgl.isHidden.test(stroke)) {

        if (stroke._renderer && stroke._renderer.offset) {

          sx = stroke._renderer.scale.x;
          sy = stroke._renderer.scale.y;

          ctx.save();
          ctx.translate(- stroke._renderer.offset.x,
            - stroke._renderer.offset.y);
          ctx.scale(sx, sy);

          a = elem._size / stroke._renderer.scale.y;
          b = elem._leading / stroke._renderer.scale.y;
          ctx.font = [elem._style, elem._weight, a + 'px/',
            b + 'px', elem._family].join(' ');

          c = stroke._renderer.offset.x / stroke._renderer.scale.x;
          d = stroke._renderer.offset.y / stroke._renderer.scale.y;
          e = linewidth / stroke._renderer.scale.x;

          ctx.lineWidth = e;
          ctx.strokeText(elem.value, c, d);
          ctx.restore();

        } else {
          ctx.strokeText(elem.value, 0, 0);
        }

      }

      // Handle text-decoration
      if (/(underline|strikethrough)/i.test(decoration)) {

        var metrics = ctx.measureText(elem.value);

        switch (decoration) {
          case 'underline':
            y1 = metrics.actualBoundingBoxAscent;
            y2 = metrics.actualBoundingBoxAscent;
            break;
          case 'strikethrough':
            y1 = 0;
            y2 = 0;
            break;
        }

        x1 = - metrics.width / 2;
        x2 = metrics.width / 2;

        ctx.lineWidth = Math.max(Math.floor(elem._size / 15), 1);
        ctx.strokeStyle = ctx.fillStyle;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

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
      var width = ctx.measureText(elem._value).width * 1.25;
      var height = Math.max(elem._size, elem._leading) * 1.25;

      if (this._linewidth && !webgl.isHidden.test(this._stroke)) {
        width += this._linewidth * 2;
        height += this._linewidth * 2;
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

    render: function(gl, programs, forcedParent) {

      if (!this._visible || !this._opacity) {
        return this;
      }

      this._update();

      // Calculate what changed

      var parent = forcedParent || this.parent;
      var program = programs[this._renderer.type];
      var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
      var flagMatrix = this._matrix.manual || this._flagMatrix;
      var parentChanged = this._renderer.parent !== parent;
      var flagTexture = this._flagVertices || this._flagFill
        || (this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints))
        || (this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal))
        || (this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale))
        || (this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints))
        || (this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal))
        || (this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale))
        || this._flagStroke || this._flagLinewidth || this._flagOpacity
        || parent._flagOpacity || this._flagVisible || this._flagScale
        || this._flagValue || this._flagFamily || this._flagSize
        || this._flagLeading || this._flagAlignment || this._flagBaseline
        || this._flagStyle || this._flagWeight || this._flagDecoration
        || (this.dashes && this.dashes.length > 0)
        || !this._renderer.texture;

      if (flagParentMatrix || flagMatrix || parentChanged) {

        if (!this._renderer.matrix) {
          this._renderer.matrix = new NumArray(9);
        }

        // Reduce amount of object / array creation / deletion

        this._matrix.toTransformArray(true, transformation);

        multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }
        if (this._scale instanceof Vector) {
          this._renderer.scale.x = this._scale.x * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale.y * parent._renderer.scale.y;
        } else {
          this._renderer.scale.x = this._scale * parent._renderer.scale.x;
          this._renderer.scale.y = this._scale * parent._renderer.scale.y;
        }

        if (parentChanged) {
          this._renderer.parent = parent;
        }
      }

      if (this._mask) {

        // Stencil away everything that isn't rendered by the mask
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.enable(gl.STENCIL_TEST);

        gl.stencilFunc(gl.ALWAYS, 1, 0);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        // Don't draw the element onto the canvas, only onto the stencil buffer
        gl.colorMask(false, false, false, false);

        webgl[this._mask._renderer.type].render.call(this._mask, gl, programs, this);

        gl.stencilFunc(gl.EQUAL, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
        gl.colorMask(true, true, true, true);

      }

      if (flagTexture) {

        if (!this._renderer.rect) {
          this._renderer.rect = {};
        }

        this._renderer.opacity = this._opacity * parent._renderer.opacity;

        webgl.text.getBoundingClientRect(this, this._renderer.rect);

        webgl.updateTexture.call(webgl, gl, this);

      } else {

        // We still need to update child Two elements on the fill and
        // stroke properties.
        if (this._fill && this._fill._update) {
          this._fill._update();
        }
        if (this._stroke && this._stroke._update) {
          this._stroke._update();
        }

      }

      if (this._clip && !forcedParent || !this._renderer.texture) {
        return this;
      }

      if (programs.current !== program) {

        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, programs.buffers.position);
        gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.position);
        gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

        if (!programs.resolution.flagged) {
          gl.uniform2f(
            gl.getUniformLocation(program, 'u_resolution'),
            programs.resolution.width,
            programs.resolution.height
          );
        }

        programs.current = program;

      }

      if (programs.resolution.flagged) {
        gl.uniform2f(
          gl.getUniformLocation(program, 'u_resolution'),
          programs.resolution.width,
          programs.resolution.height
        );
      }

      // Draw Texture
      gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);

      // Draw Rect
      var rect = this._renderer.rect;
      gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
      gl.uniform4f(program.rect, rect.left, rect.top, rect.right, rect.bottom);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (this._mask) {
        gl.disable(gl.STENCIL_TEST);
      }

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

      if (((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded)) {
        this._renderer.effect = ctx.createPattern(image, this._repeat);
      } else if (!this._renderer.effect) {
        return this.flagReset();
      }

      if (this._flagOffset || this._flagLoaded || this._flagScale) {

        if (!(this._renderer.offset instanceof Vector)) {
          this._renderer.offset = new Vector();
        }

        this._renderer.offset.x = - this._offset.x;
        this._renderer.offset.y = - this._offset.y;

        if (image) {

          this._renderer.offset.x += image.width / 2;
          this._renderer.offset.y += image.height / 2;

          if (this._scale instanceof Vector) {
            this._renderer.offset.x *= this._scale.x;
            this._renderer.offset.y *= this._scale.y;
          } else {
            this._renderer.offset.x *= this._scale;
            this._renderer.offset.y *= this._scale;
          }
        }

      }

      if (this._flagScale || this._flagLoaded) {

        if (!(this._renderer.scale instanceof Vector)) {
          this._renderer.scale = new Vector();
        }

        if (this._scale instanceof Vector) {
          this._renderer.scale.copy(this._scale);
        } else {
          this._renderer.scale.set(this._scale, this._scale);
        }

      }

      return this.flagReset();

    }

  },

  updateTexture: function(gl, elem) {

    this[elem._renderer.type].updateCanvas.call(webgl, elem);

    if (this.canvas.width <= 0 || this.canvas.height <= 0) {
      if (elem._renderer.texture) {
        gl.deleteTexture(elem._renderer.texture);
      }
      delete elem._renderer.texture;
      return;
    }

    if (!elem._renderer.texture) {
      elem._renderer.texture = gl.createTexture();
    }

    gl.bindTexture(gl.TEXTURE_2D, elem._renderer.texture);

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
        throw new TwoError('unable to link program: ' + error);
      }

      return program;

    }

  },

  TextureRegistry: new Registry()

};

webgl.ctx = webgl.canvas.getContext('2d');

/**
 * @name Two.WebGLRenderer
 * @class
 * @extends Two.Events
 * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
 * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
 * @param {HTMLCanvasElement} [parameters.offscreenElement] - The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates.
 * @param {Boolean} [parameters.antialias] - Determines whether the canvas should clear render with antialias on.
 * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.
 * @see {@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
 */
function Renderer(params) {

  var gl, program, vs, fs;

  /**
   * @name Two.WebGLRenderer#domElement
   * @property {Element} - The `<canvas />` associated with the Two.js scene.
   */
  this.domElement = params.domElement || document.createElement('canvas');

  if (typeof params.offscreenElement !== 'undefined') {
    webgl.canvas = params.offscreenElement;
    webgl.ctx = webgl.canvas.getContext('2d');
  }

  /**
   * @name Two.WebGLRenderer#scene
   * @property {Two.Group} - The root group of the scenegraph.
   */
  this.scene = new Group();
  this.scene.parent = this;

  this._renderer = {
    type: 'renderer',
    matrix: new NumArray(identity),
    scale: 1,
    opacity: 1
  };
  this._flagMatrix = true;

  // http://games.greggman.com/game/webgl-and-alpha/
  // http://www.khronos.org/registry/webgl/specs/latest/#5.2
  params = _.defaults(params || {}, {
    antialias: false,
    alpha: true,
    premultipliedAlpha: true,
    stencil: true,
    preserveDrawingBuffer: true,
    overdraw: false
  });

  /**
   * @name Two.WebGLRenderer#overdraw
   * @property {Boolean} - Determines whether the canvas clears the background each draw call.
   * @default true
   */
  this.overdraw = params.overdraw;

  /**
   * @name Two.WebGLRenderer#ctx
   * @property {WebGLContext} - Associated two dimensional context to render on the `<canvas />`.
   */
  gl = this.ctx = this.domElement.getContext('webgl', params) ||
    this.domElement.getContext('experimental-webgl', params);

  if (!this.ctx) {
    throw new TwoError(
      'unable to create a webgl context. Try using another renderer.');
  }

  // Compile Base Shaders to draw in pixel space.
  vs = shaders.create(gl, shaders.path.vertex, shaders.types.vertex);
  fs = shaders.create(gl, shaders.path.fragment, shaders.types.fragment);

  /**
   * @name Two.WebGLRenderer#programs
   * @property {Object} - Associated WebGL programs to render all elements from the scenegraph.
   */
  this.programs = {
    current: null,
    buffers: {
      position: gl.createBuffer()
    },
    resolution: {
      width: 0,
      height: 0,
      ratio: 1,
      flagged: false
    }
  };

  program = this.programs.path = webgl.program.create(gl, [vs, fs]);
  this.programs.text = this.programs.path;

  // Create and bind the drawing buffer

  // look up where the vertex data needs to go.
  program.position = gl.getAttribLocation(program, 'a_position');
  program.matrix = gl.getUniformLocation(program, 'u_matrix');
  program.rect = gl.getUniformLocation(program, 'u_rect');

  // Bind the vertex buffer
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(program.position);
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

  // Compile Base Shaders to draw in pixel space.
  vs = shaders.create(gl, shaders.points.vertex, shaders.types.vertex);
  fs = shaders.create(gl, shaders.points.fragment, shaders.types.fragment);

  program = this.programs.points = webgl.program.create(gl, [vs, fs]);

  // Create and bind the drawing buffer

  // look up where the vertex data needs to go.
  program.position = gl.getAttribLocation(program, 'a_position');
  program.matrix = gl.getUniformLocation(program, 'u_matrix');
  program.size = gl.getUniformLocation(program, 'u_size');

  // Setup some initial statements of the gl context
  gl.enable(gl.BLEND);

  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
}

_.extend(Renderer, {

  /**
   * @name Two.WebGLRenderer.Utils
   * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.
   */
  Utils: webgl

});

_.extend(Renderer.prototype, Events, {

  constructor: Renderer,

  /**
   * @name Two.WebGLRenderer#setSize
   * @function
   * @fires resize
   * @param {Number} width - The new width of the renderer.
   * @param {Number} height - The new height of the renderer.
   * @param {Number} [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
   * @description Change the size of the renderer.
   */
  setSize: function(width, height, ratio) {

    var w, h;
    var ctx = this.ctx;

    this.width = width;
    this.height = height;

    this.ratio = typeof ratio === 'undefined' ? getRatio(ctx) : ratio;

    this.domElement.width = width * this.ratio;
    this.domElement.height = height * this.ratio;

    if (_.isObject(this.domElement.style)) {
      _.extend(this.domElement.style, {
        width: width + 'px',
        height: height + 'px'
      });
    }

    // Set for this.stage parent scaling to account for HDPI
    this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio;

    this._flagMatrix = true;

    w = width * this.ratio;
    h = height * this.ratio;

    ctx.viewport(0, 0, w, h);

    this.programs.resolution.width = w;
    this.programs.resolution.height = h;
    this.programs.resolution.ratio = this.ratio;
    this.programs.resolution.flagged = true;

    return this.trigger(Events.Types.resize, width, height, ratio);

  },

  /**
   * @name Two.WebGLRenderer#render
   * @function
   * @description Render the current scene to the `<canvas />`.
   */
  render: function() {

    var gl = this.ctx;

    if (!this.overdraw) {
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    webgl.group.render.call(this.scene, gl, this.programs);
    this._flagMatrix = false;
    this.programs.resolution.flagged = true;

    return this;

  }

});

export default Renderer;
