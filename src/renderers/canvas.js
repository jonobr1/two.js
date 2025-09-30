import { Commands } from '../utils/path-commands.js';
import {
  decomposeMatrix,
  mod,
  TWO_PI,
  getEffectiveStrokeWidth,
} from '../utils/math.js';
import { Curve } from '../utils/curves.js';
import { Events } from '../events.js';
import { getRatio } from '../utils/device-pixel-ratio.js';
import { _ } from '../utils/underscore.js';

import { Group } from '../group.js';
import { Vector } from '../vector.js';
import { Constants } from '../constants.js';

// Constants
const emptyArray = [];
const max = Math.max,
  min = Math.min,
  abs = Math.abs,
  sin = Math.sin,
  cos = Math.cos,
  acos = Math.acos,
  sqrt = Math.sqrt;

const canvas = {
  isHidden: /(undefined|none|transparent)/i,

  alignments: {
    left: 'start',
    middle: 'center',
    right: 'end',
  },

  baselines: {
    top: 'top',
    middle: 'middle',
    bottom: 'bottom',
    baseline: 'alphabetic',
  },

  getRendererType: function (type) {
    return type in canvas ? type : 'path';
  },

  group: {
    renderChild: function (child) {
      const prop = canvas.getRendererType(child._renderer.type);
      canvas[prop].render.call(child, this.ctx, true, this.clip);
    },

    render: function (ctx) {
      if (!this._visible) {
        return this;
      }

      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      const matrix = this._matrix.elements;
      const parent = this.parent;
      this._renderer.opacity =
        this._opacity *
        (parent && parent._renderer ? parent._renderer.opacity : 1);

      const mask = this._mask;
      // const clip = this._clip;

      const defaultMatrix = isDefaultMatrix(matrix);
      const shouldIsolate = !defaultMatrix || !!mask;

      if (!this._renderer.context) {
        this._renderer.context = {};
      }

      this._renderer.context.ctx = ctx;
      // this._renderer.context.clip = clip;

      if (shouldIsolate) {
        ctx.save();
        if (!defaultMatrix) {
          ctx.transform(
            matrix[0],
            matrix[3],
            matrix[1],
            matrix[4],
            matrix[2],
            matrix[5]
          );
        }
      }

      if (mask) {
        const prop = canvas.getRendererType(mask._renderer.type);
        canvas[prop].render.call(mask, ctx, true);
      }

      if (this._opacity > 0 && this._scale !== 0) {
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          const prop = canvas.getRendererType(child._renderer.type);
          canvas[prop].render.call(child, ctx);
        }
      }

      if (shouldIsolate) {
        ctx.restore();
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951

      // if (clip) {
      //   ctx.clip();
      // }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  path: {
    render: function (ctx, forced, parentClipped) {
      let matrix,
        stroke,
        linewidth,
        fill,
        opacity,
        visible,
        cap,
        join,
        miter,
        closed,
        commands,
        length,
        last,
        prev,
        a,
        b,
        c,
        d,
        ux,
        uy,
        vx,
        vy,
        ar,
        bl,
        br,
        cl,
        x,
        y,
        mask,
        clip,
        defaultMatrix,
        isOffset,
        dashes,
        po;

      po =
        this.parent && this.parent._renderer
          ? this.parent._renderer.opacity
          : 1;
      mask = this._mask;
      clip = this._clip;
      opacity = this._opacity * (po || 1);
      visible = this._visible;

      if (!forced && (!visible || clip || opacity === 0)) {
        return this;
      }

      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      matrix = this._matrix.elements;
      stroke = this._stroke;
      linewidth = this._linewidth;
      fill = this._fill;
      cap = this._cap;
      join = this._join;
      miter = this._miter;
      closed = this._closed;
      commands = this._renderer.vertices; // Commands
      length = commands.length;
      last = length - 1;
      defaultMatrix = isDefaultMatrix(matrix);
      dashes = this.dashes;

      // Transform
      if (!defaultMatrix) {
        ctx.save();
        ctx.transform(
          matrix[0],
          matrix[3],
          matrix[1],
          matrix[4],
          matrix[2],
          matrix[5]
        );
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951
      if (mask) {
        const prop = canvas.getRendererType(mask._renderer.type);
        canvas[prop].render.call(mask, ctx, true);
      }

      // Styles
      if (fill) {
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          const prop = canvas.getRendererType(fill._renderer.type);
          canvas[prop].render.call(fill, ctx, this);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          const prop = canvas.getRendererType(stroke._renderer.type);
          canvas[prop].render.call(stroke, ctx, this);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = getEffectiveStrokeWidth(this);
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

      ctx.beginPath();

      let rx, ry, xAxisRotation, largeArcFlag, sweepFlag, ax, ay;

      for (let i = 0; i < length; i++) {
        b = commands[i];

        x = b.x;
        y = b.y;

        switch (b.command) {
          case Commands.close:
            ctx.closePath();
            break;

          case Commands.arc:
            rx = b.rx;
            ry = b.ry;
            xAxisRotation = b.xAxisRotation;
            largeArcFlag = b.largeArcFlag;
            sweepFlag = b.sweepFlag;

            prev = closed ? mod(i - 1, length) : max(i - 1, 0);
            a = commands[prev];

            ax = a.x;
            ay = a.y;

            canvas.renderSvgArcCommand(
              ctx,
              ax,
              ay,
              rx,
              ry,
              largeArcFlag,
              sweepFlag,
              xAxisRotation,
              x,
              y
            );
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

      if (!clip && !parentClipped) {
        if (!canvas.isHidden.test(fill)) {
          isOffset = fill._renderer && fill._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
            ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
          }
          ctx.fill();
          if (isOffset) {
            ctx.restore();
          }
        }
        if (!canvas.isHidden.test(stroke)) {
          isOffset = stroke._renderer && stroke._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(
              -stroke._renderer.offset.x,
              -stroke._renderer.offset.y
            );
            ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
            ctx.lineWidth = linewidth / stroke._renderer.scale.x;
          }
          ctx.stroke();
          if (isOffset) {
            ctx.restore();
          }
        }
      }

      if (!defaultMatrix) {
        ctx.restore();
      }

      if (clip && !parentClipped) {
        ctx.clip();
      }

      if (dashes && dashes.length > 0) {
        ctx.setLineDash(emptyArray);
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  points: {
    render: function (ctx, forced, parentClipped) {
      let me,
        stroke,
        linewidth,
        fill,
        opacity,
        visible,
        size,
        commands,
        length,
        b,
        x,
        y,
        defaultMatrix,
        isOffset,
        dashes,
        po;

      po =
        this.parent && this.parent._renderer
          ? this.parent._renderer.opacity
          : 1;
      opacity = this._opacity * (po || 1);
      visible = this._visible;

      if (!forced && (!visible || opacity === 0)) {
        return this;
      }

      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      me = this._matrix.elements;
      stroke = this._stroke;
      linewidth = this._linewidth;
      fill = this._fill;
      commands = this._renderer.collection; // Commands
      length = commands.length;
      defaultMatrix = isDefaultMatrix(me);
      dashes = this.dashes;
      size = this._size;

      // Transform
      if (!defaultMatrix) {
        ctx.save();
        ctx.transform(me[0], me[3], me[1], me[4], me[2], me[5]);
      }

      // Styles
      if (fill) {
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          const prop = canvas.getRendererType(fill._renderer.type);
          canvas[prop].render.call(fill, ctx, this);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          const prop = canvas.getRendererType(stroke._renderer.type);
          canvas[prop].render.call(stroke, ctx, this);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = getEffectiveStrokeWidth(this);
        }
      }
      if (typeof opacity === 'number') {
        ctx.globalAlpha = opacity;
      }

      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }

      ctx.beginPath();

      let radius = size * 0.5,
        m;

      if (!this._sizeAttenuation) {
        m = this.worldMatrix.elements;
        m = decomposeMatrix(m[0], m[3], m[1], m[4], m[2], m[5]);
        radius /= Math.max(m.scaleX, m.scaleY);
      }

      for (let i = 0; i < length; i++) {
        b = commands[i];

        x = b.x;
        y = b.y;

        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, TWO_PI);
      }

      if (!parentClipped) {
        if (!canvas.isHidden.test(fill)) {
          isOffset = fill._renderer && fill._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
            ctx.scale(fill._renderer.scale.x, fill._renderer.scale.y);
          }
          ctx.fill();
          if (isOffset) {
            ctx.restore();
          }
        }
        if (!canvas.isHidden.test(stroke)) {
          isOffset = stroke._renderer && stroke._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(
              -stroke._renderer.offset.x,
              -stroke._renderer.offset.y
            );
            ctx.scale(stroke._renderer.scale.x, stroke._renderer.scale.y);
            ctx.lineWidth = linewidth / stroke._renderer.scale.x;
          }
          ctx.stroke();
          if (isOffset) {
            ctx.restore();
          }
        }
      }

      // Loose ends

      if (!defaultMatrix) {
        ctx.restore();
      }

      if (dashes && dashes.length > 0) {
        ctx.setLineDash(emptyArray);
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  text: {
    render: function (ctx, forced, parentClipped) {
      const po =
        this.parent && this.parent._renderer
          ? this.parent._renderer.opacity
          : 1;
      const opacity = this._opacity * po;
      const visible = this._visible;
      const mask = this._mask;
      const clip = this._clip;

      if (!forced && (!visible || clip || opacity === 0)) {
        return this;
      }

      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      const matrix = this._matrix.elements;
      const stroke = this._stroke;
      const linewidth = this._linewidth;
      const fill = this._fill;
      const decoration = this._decoration;
      const direction = this._direction;
      const defaultMatrix = isDefaultMatrix(matrix);
      const isOffset =
        fill._renderer &&
        fill._renderer.offset &&
        stroke._renderer &&
        stroke._renderer.offset;
      const dashes = this.dashes;
      const alignment = canvas.alignments[this._alignment] || this._alignment;
      const baseline = canvas.baselines[this._baseline] || this._baseline;

      let a, b, c, d, e, sx, sy, x1, y1, x2, y2;

      // Transform
      if (!defaultMatrix) {
        ctx.save();
        ctx.transform(
          matrix[0],
          matrix[3],
          matrix[1],
          matrix[4],
          matrix[2],
          matrix[5]
        );
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951
      if (mask) {
        const prop = canvas.getRendererType(mask._renderer.type);
        canvas[prop].render.call(mask, ctx, true);
      }

      if (!isOffset) {
        ctx.font = [
          this._style,
          this._weight,
          this._size + 'px/' + this._leading + 'px',
          this._family,
        ].join(' ');
      }

      ctx.textAlign = alignment;
      ctx.textBaseline = baseline;
      ctx.direction = direction;

      // Styles
      if (fill) {
        if (typeof fill === 'string') {
          ctx.fillStyle = fill;
        } else {
          const prop = canvas.getRendererType(fill._renderer.type);
          canvas[prop].render.call(fill, ctx, this);
          ctx.fillStyle = fill._renderer.effect;
        }
      }
      if (stroke) {
        if (typeof stroke === 'string') {
          ctx.strokeStyle = stroke;
        } else {
          const prop = canvas.getRendererType(stroke._renderer.type);
          canvas[prop].render.call(stroke, ctx, this);
          ctx.strokeStyle = stroke._renderer.effect;
        }
        if (linewidth) {
          ctx.lineWidth = getEffectiveStrokeWidth(this);
        }
      }
      if (typeof opacity === 'number') {
        ctx.globalAlpha = opacity;
      }
      if (dashes && dashes.length > 0) {
        ctx.lineDashOffset = dashes.offset || 0;
        ctx.setLineDash(dashes);
      }

      if (!clip && !parentClipped) {
        if (!canvas.isHidden.test(fill)) {
          if (fill._renderer && fill._renderer.offset) {
            sx = fill._renderer.scale.x;
            sy = fill._renderer.scale.y;

            ctx.save();
            ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
            ctx.scale(sx, sy);

            a = this._size / fill._renderer.scale.y;
            b = this._leading / fill._renderer.scale.y;
            ctx.font = [
              this._style,
              this._weight,
              a + 'px/',
              b + 'px',
              this._family,
            ].join(' ');

            c = fill._renderer.offset.x / fill._renderer.scale.x;
            d = fill._renderer.offset.y / fill._renderer.scale.y;

            ctx.fillText(this.value, c, d);
            ctx.restore();
          } else {
            ctx.fillText(this.value, 0, 0);
          }
        }

        if (!canvas.isHidden.test(stroke)) {
          if (stroke._renderer && stroke._renderer.offset) {
            sx = stroke._renderer.scale.x;
            sy = stroke._renderer.scale.y;

            ctx.save();
            ctx.translate(
              -stroke._renderer.offset.x,
              -stroke._renderer.offset.y
            );
            ctx.scale(sx, sy);

            a = this._size / stroke._renderer.scale.y;
            b = this._leading / stroke._renderer.scale.y;
            ctx.font = [
              this._style,
              this._weight,
              a + 'px/',
              b + 'px',
              this._family,
            ].join(' ');

            c = stroke._renderer.offset.x / stroke._renderer.scale.x;
            d = stroke._renderer.offset.y / stroke._renderer.scale.y;
            e = linewidth / stroke._renderer.scale.x;

            ctx.lineWidth = e;
            ctx.strokeText(this.value, c, d);
            ctx.restore();
          } else {
            ctx.strokeText(this.value, 0, 0);
          }
        }
      }

      // Handle text-decoration
      if (/(underline|strikethrough)/i.test(decoration)) {
        const metrics = ctx.measureText(this.value);
        let scalar = 1;

        switch (decoration) {
          case 'underline':
            y1 = metrics.actualBoundingBoxDescent;
            y2 = metrics.actualBoundingBoxDescent;
            break;
          case 'strikethrough':
            y1 = 0;
            y2 = 0;
            scalar = 0.5;
            break;
        }

        switch (baseline) {
          case 'top':
            y1 += this._size * scalar;
            y2 += this._size * scalar;
            break;
          case 'baseline':
          case 'bottom':
            y1 -= this._size * scalar;
            y2 -= this._size * scalar;
            break;
        }

        switch (alignment) {
          case 'left':
          case 'start':
            x1 = 0;
            x2 = metrics.width;
            break;
          case 'right':
          case 'end':
            x1 = -metrics.width;
            x2 = 0;
            break;
          default:
            x1 = -metrics.width / 2;
            x2 = metrics.width / 2;
        }

        ctx.lineWidth = Math.max(Math.floor(this._size / 15), 1);
        ctx.strokeStyle = ctx.fillStyle;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      if (!defaultMatrix) {
        ctx.restore();
      }

      // TODO: Test for text
      if (clip && !parentClipped) {
        ctx.clip();
      }

      if (dashes && dashes.length > 0) {
        ctx.setLineDash(emptyArray);
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  'linear-gradient': {
    render: function (ctx, parent) {
      if (!parent) {
        return;
      }

      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      if (
        !this._renderer.effect ||
        this._flagEndPoints ||
        this._flagStops ||
        this._flagUnits
      ) {
        let rect;
        let lx = this.left._x;
        let ly = this.left._y;
        let rx = this.right._x;
        let ry = this.right._y;

        if (/objectBoundingBox/i.test(this._units)) {
          // Convert objectBoundingBox units to userSpaceOnUse units
          rect = parent.getBoundingClientRect(true);
          lx = (lx - 0.5) * rect.width;
          ly = (ly - 0.5) * rect.height;
          rx = (rx - 0.5) * rect.width;
          ry = (ry - 0.5) * rect.height;
        }

        this._renderer.effect = ctx.createLinearGradient(lx, ly, rx, ry);

        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  'radial-gradient': {
    render: function (ctx, parent) {
      if (!parent) {
        return;
      }

      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      if (
        !this._renderer.effect ||
        this._flagCenter ||
        this._flagFocal ||
        this._flagRadius ||
        this._flagStops ||
        this._flagUnits
      ) {
        let rect;
        let cx = this.center._x;
        let cy = this.center._y;
        let fx = this.focal._x;
        let fy = this.focal._y;
        let radius = this._radius;

        if (/objectBoundingBox/i.test(this._units)) {
          // Convert objectBoundingBox units to userSpaceOnUse units
          rect = parent.getBoundingClientRect(true);
          cx = (cx - 0.5) * rect.width * 0.5;
          cy = (cy - 0.5) * rect.height * 0.5;
          fx = (fx - 0.5) * rect.width * 0.5;
          fy = (fy - 0.5) * rect.height * 0.5;
          radius *= Math.min(rect.width, rect.height);
        }

        this._renderer.effect = ctx.createRadialGradient(
          cx,
          cy,
          0,
          fx,
          fy,
          radius
        );

        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          this._renderer.effect.addColorStop(stop._offset, stop._color);
        }
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  texture: {
    render: function (ctx) {
      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      const image = this.image;

      if (
        !this._renderer.effect ||
        ((this._flagLoaded ||
          this._flagImage ||
          this._flagVideo ||
          this._flagRepeat) &&
          this.loaded)
      ) {
        this._renderer.effect = ctx.createPattern(this.image, this._repeat);
      }

      if (this._flagOffset || this._flagLoaded || this._flagScale) {
        if (!(this._renderer.offset instanceof Vector)) {
          this._renderer.offset = new Vector();
        }

        this._renderer.offset.x = -this._offset.x;
        this._renderer.offset.y = -this._offset.y;

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

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  renderSvgArcCommand: function (
    ctx,
    ax,
    ay,
    rx,
    ry,
    largeArcFlag,
    sweepFlag,
    xAxisRotation,
    x,
    y
  ) {
    xAxisRotation = (xAxisRotation * Math.PI) / 180;

    // Ensure radii are positive
    rx = abs(rx);
    ry = abs(ry);

    // Compute (x1′, y1′)
    const dx2 = (ax - x) / 2.0;
    const dy2 = (ay - y) / 2.0;
    const x1p = cos(xAxisRotation) * dx2 + sin(xAxisRotation) * dy2;
    const y1p = -sin(xAxisRotation) * dx2 + cos(xAxisRotation) * dy2;

    // Compute (cx′, cy′)
    const x1ps = x1p * x1p;
    const y1ps = y1p * y1p;
    let rxs = rx * rx;
    let rys = ry * ry;

    // Ensure radii are large enough
    const cr = x1ps / rxs + y1ps / rys;

    if (cr > 1) {
      // scale up rx,ry equally so cr == 1
      const s = sqrt(cr);
      rx = s * rx;
      ry = s * ry;
      rxs = rx * rx;
      rys = ry * ry;
    }

    const dq = rxs * y1ps + rys * x1ps;
    const pq = (rxs * rys - dq) / dq;
    let q = sqrt(max(0, pq));

    if (largeArcFlag === sweepFlag) q = -q;

    const cxp = (q * rx * y1p) / ry;
    const cyp = (-q * ry * x1p) / rx;

    // Step 3: Compute (cx, cy) from (cx′, cy′)
    const cx =
      cos(xAxisRotation) * cxp - sin(xAxisRotation) * cyp + (ax + x) / 2;
    const cy =
      sin(xAxisRotation) * cxp + cos(xAxisRotation) * cyp + (ay + y) / 2;

    // Step 4: Compute θ1 and Δθ
    const startAngle = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
    const delta =
      svgAngle(
        (x1p - cxp) / rx,
        (y1p - cyp) / ry,
        (-x1p - cxp) / rx,
        (-y1p - cyp) / ry
      ) % TWO_PI;

    const endAngle = startAngle + delta;

    const clockwise = sweepFlag === 0;

    renderArcEstimate(
      ctx,
      cx,
      cy,
      rx,
      ry,
      startAngle,
      endAngle,
      clockwise,
      xAxisRotation
    );
  },
};

/**
 * @name Two.CanvasRenderer
 * @class
 * @extends Two.Events
 * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
 * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
 * @param {Boolean} [parameters.overdraw] - Determines whether the canvas should clear the background or not. Defaults to `true`.
 * @param {Boolean} [parameters.smoothing=true] - Determines whether the canvas should antialias drawing. Set it to `false` when working with pixel art. `false` can lead to better performance, since it would use a cheaper interpolation algorithm.
 * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.canvas`. It takes Two.js' scenegraph and renders it to a `<canvas />`.
 */
export class Renderer extends Events {
  constructor(params) {
    super();

    // It might not make a big difference on GPU backed canvases.
    const smoothing = params.smoothing !== false;

    /**
     * @name Two.CanvasRenderer#domElement
     * @property {Element} - The `<canvas />` associated with the Two.js scene.
     */
    this.domElement = params.domElement || document.createElement('canvas');

    /**
     * @name Two.CanvasRenderer#ctx
     * @property {Canvas2DContext} - Associated two dimensional context to render on the `<canvas />`.
     */
    this.ctx = this.domElement.getContext('2d');

    /**
     * @name Two.CanvasRenderer#overdraw
     * @property {Boolean} - Determines whether the canvas clears the background each draw call.
     * @default true
     */
    this.overdraw = params.overdraw || false;

    if (typeof this.ctx.imageSmoothingEnabled !== 'undefined') {
      this.ctx.imageSmoothingEnabled = smoothing;
    }

    /**
     * @name Two.CanvasRenderer#scene
     * @property {Two.Group} - The root group of the scenegraph.
     */
    this.scene = new Group();
    this.scene.parent = this;
  }

  /**
   * @name Two.CanvasRenderer.Utils
   * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />`.
   */
  static Utils = canvas;

  /**
   * @name Two.CanvasRenderer#setSize
   * @function
   * @fires resize
   * @param {Number} width - The new width of the renderer.
   * @param {Number} height - The new height of the renderer.
   * @param {Number} [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
   * @description Change the size of the renderer.
   */
  setSize(width, height, ratio) {
    this.width = width;
    this.height = height;

    this.ratio = typeof ratio === 'undefined' ? getRatio(this.ctx) : ratio;

    this.domElement.width = width * this.ratio;
    this.domElement.height = height * this.ratio;

    if (this.domElement.style) {
      _.extend(this.domElement.style, {
        width: width + 'px',
        height: height + 'px',
      });
    }

    return this.trigger(Events.Types.resize, width, height, ratio);
  }

  /**
   * @name Two.CanvasRenderer#render
   * @function
   * @description Render the current scene to the `<canvas />`.
   */
  render() {
    const isOne = this.ratio === 1;

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
}

function renderArcEstimate(
  ctx,
  ox,
  oy,
  rx,
  ry,
  startAngle,
  endAngle,
  clockwise,
  xAxisRotation
) {
  const delta = endAngle - startAngle;
  const epsilon = Curve.Tolerance.epsilon;
  const samePoints = Math.abs(delta) < epsilon;

  // ensures that deltaAngle is 0 .. 2 PI
  let deltaAngle = mod(delta, TWO_PI);

  if (deltaAngle < epsilon) {
    if (samePoints) {
      deltaAngle = 0;
    } else {
      deltaAngle = TWO_PI;
    }
  }

  if (clockwise === true && !samePoints) {
    if (deltaAngle === TWO_PI) {
      deltaAngle = -TWO_PI;
    } else {
      deltaAngle = deltaAngle - TWO_PI;
    }
  }

  for (let i = 0; i < Constants.Resolution; i++) {
    const t = i / (Constants.Resolution - 1);

    const angle = startAngle + t * deltaAngle;
    let x = ox + rx * Math.cos(angle);
    let y = oy + ry * Math.sin(angle);

    if (xAxisRotation !== 0) {
      const cos = Math.cos(xAxisRotation);
      const sin = Math.sin(xAxisRotation);

      const tx = x - ox;
      const ty = y - oy;

      // Rotate the point about the center of the ellipse.
      x = tx * cos - ty * sin + ox;
      y = tx * sin + ty * cos + oy;
    }

    ctx.lineTo(x, y);
  }
}

function svgAngle(ux, uy, vx, vy) {
  const dot = ux * vx + uy * vy;
  const len = sqrt(ux * ux + uy * uy) * sqrt(vx * vx + vy * vy);
  // floating point precision, slightly over values appear
  let ang = acos(max(-1, min(1, dot / len)));
  if (ux * vy - uy * vx < 0) {
    ang = -ang;
  }

  return ang;
}

// Returns true if this is a non-transforming matrix
function isDefaultMatrix(m) {
  return (
    m[0] === 1 &&
    m[3] === 0 &&
    m[1] === 0 &&
    m[4] === 1 &&
    m[2] === 0 &&
    m[5] === 0
  );
}
