(function(Two, _, Backbone, requestAnimationFrame) {

  /**
   * Constants
   */
  var mod = Two.Utils.mod, toFixed = Two.Utils.toFixed;
  var getRatio = Two.Utils.getRatio;

  // Returns true if this is a non-transforming matrix
  var isDefaultMatrix = function (m) {
    return (m[0] == 1 && m[3] == 0 && m[1] == 0 && m[4] == 1 && m[2] == 0 && m[5] == 0);
  };

  var canvas = {

    isHidden: /(none|transparent)/i,

    group: {

      renderChild: function(child) {
        canvas[child._renderer.type].render.call(child, this.ctx, true, this.clip);
      },

      render: function(ctx) {

        // TODO: Add a check here to only invoke _update if need be.
        this._update();

        var matrix = this._matrix.elements;
        var parent = this.parent;
        this._renderer.opacity = this._opacity * (parent && parent._renderer ? parent._renderer.opacity : 1);

        var defaultMatrix = isDefaultMatrix(matrix);

        var mask = this._mask;
        // var clip = this._clip;

        if (!this._renderer.context) {
          this._renderer.context = {};
        }

        this._renderer.context.ctx = ctx;
        // this._renderer.context.clip = clip;

        if (!defaultMatrix) {
          ctx.save();
          ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);
        }

        if (mask) {
          canvas[mask._renderer.type].render.call(mask, ctx, true);
        }

        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i];
          canvas[child._renderer.type].render.call(child, ctx);
        }

        if (!defaultMatrix) {
          ctx.restore();
        }

       /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (clip) {
        //   ctx.clip();
        // }

        return this.flagReset();

      }

    },

    path: {

      render: function(ctx, forced, parentClipped) {

        var matrix, stroke, linewidth, fill, opacity, visible, cap, join, miter,
            closed, commands, length, last, next, prev, a, b, c, d, ux, uy, vx, vy,
            ar, bl, br, cl, x, y, mask, clip, defaultMatrix;

        // TODO: Add a check here to only invoke _update if need be.
        this._update();

        matrix = this._matrix.elements;
        stroke = this._stroke;
        linewidth = this._linewidth;
        fill = this._fill;
        opacity = this._opacity * this.parent._renderer.opacity;
        visible = this._visible;
        cap = this._cap;
        join = this._join;
        miter = this._miter;
        closed = this._closed;
        commands = this._vertices; // Commands
        length = commands.length;
        last = length - 1;
        defaultMatrix = isDefaultMatrix(matrix);

        // mask = this._mask;
        clip = this._clip;

        if (!forced && (!visible || clip)) {
          return this;
        }

        // Transform
        if (!defaultMatrix) {
          ctx.save();
          ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);
        }

       /**
         * Commented two-way functionality of clips / masks with groups and
         * polygons. Uncomment when this bug is fixed:
         * https://code.google.com/p/chromium/issues/detail?id=370951
         */

        // if (mask) {
        //   canvas[mask._renderer.type].render.call(mask, ctx, true);
        // }

        // Styles
        if (fill) {
          if (_.isString(fill)) {
            ctx.fillStyle = fill;
          } else {
            canvas[fill._renderer.type].render.call(fill, ctx);
            ctx.fillStyle = fill._renderer.gradient;
          }
        }
        if (stroke) {
          if (_.isString(stroke)) {
            ctx.strokeStyle = stroke;
          } else {
            canvas[stroke._renderer.type].render.call(stroke, ctx);
            ctx.strokeStyle = stroke._renderer.gradient;
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
              ar = (a.controls && a.controls.right) || a;
              bl = (b.controls && b.controls.left) || b;

              if (a._relative) {
                vx = (ar.x + toFixed(a._x));
                vy = (ar.y + toFixed(a._y));
              } else {
                vx = toFixed(ar.x);
                vy = toFixed(ar.y);
              }

              if (b._relative) {
                ux = (bl.x + toFixed(b._x));
                uy = (bl.y + toFixed(b._y));
              } else {
                ux = toFixed(bl.x);
                uy = toFixed(bl.y);
              }

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              if (i >= last && closed) {

                c = d;

                br = (b.controls && b.controls.right) || b;
                cl = (c.controls && c.controls.left) || c;

                if (b._relative) {
                  vx = (br.x + toFixed(b._x));
                  vy = (br.y + toFixed(b._y));
                } else {
                  vx = toFixed(br.x);
                  vy = toFixed(br.y);
                }

                if (c._relative) {
                  ux = (cl.x + toFixed(c._x));
                  uy = (cl.y + toFixed(c._y));
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

        if (!clip && !parentClipped) {
          if (!canvas.isHidden.test(fill)) ctx.fill();
          if (!canvas.isHidden.test(stroke)) ctx.stroke();
        }

        if (!defaultMatrix) {
          ctx.restore();
        }

        if (clip && !parentClipped) {
          ctx.clip();
        }

        return this.flagReset();

      }

    },

    'linear-gradient': {

      render: function(ctx) {

        this._update();

        if (!this._renderer.gradient || this._flagEndPoints || this._flagStops) {

          this._renderer.gradient = ctx.createLinearGradient(
            this.left._x, this.left._y,
            this.right._x, this.right._y
          );

          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.gradient.addColorStop(stop._offset, stop._color);
          }

        }

        return this.flagReset();

      }

    },

    'radial-gradient': {

      render: function(ctx) {

        this._update();

        if (!this._renderer.gradient || this._flagCenter || this._flagFocal
            || this._flagRadius || this._flagStops) {

          this._renderer.gradient = ctx.createRadialGradient(
            this.center._x, this.center._y, 0,
            this.focal._x, this.focal._y, this._radius
          );

          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.gradient.addColorStop(stop._offset, stop._color);
          }

        }

        return this.flagReset();

      }
    }

  };

  var Renderer = Two[Two.Types.canvas] = function(params) {
    // Smoothing property. Defaults to true
    // Set it to false when working with pixel art.
    // false can lead to better performance, since it would use a cheaper interpolation algorithm.
    // It might not make a big difference on GPU backed canvases.
    var smoothing = (params.smoothing !== false);
    this.domElement = params.domElement || document.createElement('canvas');
    this.ctx = this.domElement.getContext('2d');
    this.overdraw = params.overdraw || false;

    this.ctx.imageSmoothingEnabled = smoothing;
    this.ctx.mozImageSmoothingEnabled = smoothing;
    this.ctx.oImageSmoothingEnabled = smoothing;
    this.ctx.webkitImageSmoothingEnabled = smoothing;
    this.ctx.imageSmoothingEnabled = smoothing;

    // Everything drawn on the canvas needs to be added to the scene.
    this.scene = new Two.Group();
    this.scene.parent = this;
  };


  _.extend(Renderer, {

    Utils: canvas

  });

  _.extend(Renderer.prototype, Backbone.Events, {

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

      return this;

    },

    render: function() {

      var isOne = this.ratio === 1;

      if (!isOne) {
        this.ctx.save();
        this.ctx.scale(this.ratio, this.ratio);
      }

      if (!this.overdraw) {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }

      canvas.group.render.call(this.scene, this.ctx);

      if (!isOne) {
        this.ctx.restore();
      }

      return this;

    }

  });

  function resetTransform(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

})(
  Two,
  typeof require === 'function' ? require('underscore') : _,
  typeof require === 'function' ? require('backbone') : Backbone,
  typeof require === 'function' ? require('requestAnimationFrame') : requestAnimationFrame
);
