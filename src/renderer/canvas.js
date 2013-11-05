(function() {

  /**
   * Constants
   */

  var root = this;
  var mod = Two.Utils.mod;
  var getRatio = Two.Utils.getRatio;

  // Localized variables
  var matrix, stroke, linewidth, fill, opacity, visible, cap, join, miter,
    closed, commands, length, last;
  var next, prev, a, c, ux, uy, vx, vy, ar, bl, br, cl, x, y;

  var canvas = {

    group: {

      render: function(ctx) {

        // TODO: Add a check here to only invoke update if need be.
        this.update();

        matrix = this._matrix.elements;

        ctx.save();
        ctx.transform(
          matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);

        _.each(this.children, function(child) {
          canvas.polygon.render.call(child, ctx);
        });

        ctx.restore();

        return this.flagReset();

      }

    },

    polygon: {

      render: function(ctx) {

        // TODO: Add a check here to only invoke update if need be.
        this.update();

        matrix = this._matrix.elements;
        stroke = this.stroke;
        linewidth = this.linewidth;
        fill = this.fill;
        opacity = this.opacity;
        visible = this.visible;
        cap = this.cap;
        join = this.join;
        miter = this.miter;
        closed = this.closed;
        commands = this._vertices; // Commands
        length = commands.length;
        last = length - 1;

        if (!visible) {
          return this;
        }

        // Transform

        ctx.save();

        if (matrix) {
          ctx.transform(
            matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5]);
        }

        // Styles

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

          x = b.x.toFixed(3), y = b.y.toFixed(3);

          switch (b._command) {

            case Two.Commands.close:
              ctx.closePath();
              break;

            case Two.Commands.curve:

              prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
              next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

              a = commands[prev], c = commands[next];
              ar = (a.controls && a.controls.right) || a;
              bl = (b.controls && b.controls.left) || b;

              vx = ar.x.toFixed(3);
              vy = ar.y.toFixed(3);

              ux = bl.x.toFixed(3);
              uy = bl.y.toFixed(3);

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              if (i >= last && closed) {

                br = (b.controls && b.controls.right) || b;
                cl = (c.controls && c.controls.left) || c;

                vx = br.x.toFixed(3);
                vy = br.y.toFixed(3);

                ux = cl.x.toFixed(3);
                uy = cl.y.toFixed(3);

                x = c.x.toFixed(3);
                y = c.y.toFixed(3);

                ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

              }

              break;

            case Two.Commands.line:
              ctx.lineTo(x, y);
              break;

            case Two.Commands.move:
              ctx.moveTo(x, y);
              break;

          }

        });

        // Loose ends

        if (closed) {
          ctx.closePath();
        }

        ctx.fill();
        ctx.stroke();

        ctx.restore();

        return this.flagReset();

      }

    }

  };

  var Renderer = Two[Two.Types.canvas] = function(params) {

    this.domElement = params.domElement || document.createElement('canvas');
    this.ctx = this.domElement.getContext('2d');
    this.overdraw = false;

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

})();
