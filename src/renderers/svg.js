import { Commands } from '../utils/path-commands.js';
import { decomposeMatrix, mod, toFixed, getEffectiveStrokeWidth } from '../utils/math.js';
import { Events } from '../events.js';
import { _ } from '../utils/underscore.js';

import { Group } from '../group.js';
import { Vector } from '../vector.js';

const svg = {
  version: 1.1,

  ns: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink',

  alignments: {
    left: 'start',
    center: 'middle',
    right: 'end',
  },

  baselines: {
    top: 'hanging',
    middle: 'middle',
    bottom: 'ideographic',
    baseline: 'alphabetic',
  },

  // Create an svg namespaced element.
  createElement: function (name, attrs) {
    const tag = name;
    const elem = document.createElementNS(svg.ns, tag);
    if (tag === 'svg') {
      attrs = _.defaults(attrs || {}, {
        version: svg.version,
      });
    }
    if (attrs && Object.keys(attrs).length > 0) {
      svg.setAttributes(elem, attrs);
    }
    return elem;
  },

  // Add attributes from an svg element.
  setAttributes: function (elem, attrs) {
    const keys = Object.keys(attrs);
    for (let i = 0; i < keys.length; i++) {
      if (/href/.test(keys[i])) {
        elem.setAttributeNS(svg.xlink, keys[i], attrs[keys[i]]);
      } else {
        elem.setAttribute(keys[i], attrs[keys[i]]);
      }
    }
    return this;
  },

  // Remove attributes from an svg element.
  removeAttributes: function (elem, attrs) {
    for (let key in attrs) {
      elem.removeAttribute(key);
    }
    return this;
  },

  // Turn a set of vertices into a string for the d property of a path
  // element. It is imperative that the string collation is as fast as
  // possible, because this call will be happening multiple times a
  // second.
  toString: function (points, closed) {
    let l = points.length,
      last = l - 1,
      d, // The elusive last Commands.move point
      string = '';

    for (let i = 0; i < l; i++) {
      const b = points[i];

      const prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
      const a = points[prev];

      let command, c;
      let vx, vy, ux, uy, ar, bl, br, cl;
      let rx, ry, xAxisRotation, largeArcFlag, sweepFlag;

      // Access x and y directly,
      // bypassing the getter
      let x = toFixed(b.x);
      let y = toFixed(b.y);

      switch (b.command) {
        case Commands.close:
          command = Commands.close;
          break;

        case Commands.arc:
          rx = b.rx;
          ry = b.ry;
          xAxisRotation = b.xAxisRotation;
          largeArcFlag = b.largeArcFlag;
          sweepFlag = b.sweepFlag;

          command =
            Commands.arc +
            ' ' +
            rx +
            ' ' +
            ry +
            ' ' +
            xAxisRotation +
            ' ' +
            largeArcFlag +
            ' ' +
            sweepFlag +
            ' ' +
            x +
            ' ' +
            y;
          break;

        case Commands.curve:
          ar = (a.controls && a.controls.right) || Vector.zero;
          bl = (b.controls && b.controls.left) || Vector.zero;

          if (a.relative) {
            vx = toFixed(ar.x + a.x);
            vy = toFixed(ar.y + a.y);
          } else {
            vx = toFixed(ar.x);
            vy = toFixed(ar.y);
          }

          if (b.relative) {
            ux = toFixed(bl.x + b.x);
            uy = toFixed(bl.y + b.y);
          } else {
            ux = toFixed(bl.x);
            uy = toFixed(bl.y);
          }

          command =
            (i === 0 ? Commands.move : Commands.curve) +
            ' ' +
            vx +
            ' ' +
            vy +
            ' ' +
            ux +
            ' ' +
            uy +
            ' ' +
            x +
            ' ' +
            y;
          break;

        case Commands.move:
          d = b;
          command = Commands.move + ' ' + x + ' ' + y;
          break;

        default:
          command = b.command + ' ' + x + ' ' + y;
      }

      // Add a final point and close it off

      if (i >= last && closed) {
        if (b.command === Commands.curve) {
          // Make sure we close to the most previous Commands.move
          c = d;

          br = (b.controls && b.controls.right) || b;
          cl = (c.controls && c.controls.left) || c;

          if (b.relative) {
            vx = toFixed(br.x + b.x);
            vy = toFixed(br.y + b.y);
          } else {
            vx = toFixed(br.x);
            vy = toFixed(br.y);
          }

          if (c.relative) {
            ux = toFixed(cl.x + c.x);
            uy = toFixed(cl.y + c.y);
          } else {
            ux = toFixed(cl.x);
            uy = toFixed(cl.y);
          }

          x = toFixed(c.x);
          y = toFixed(c.y);

          command +=
            ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
        }

        if (b.command !== Commands.close) {
          command += ' Z';
        }
      }

      string += command + ' ';
    }

    return string;
  },

  pointsToString: function (points, size) {
    let string = '';
    const r = size * 0.5;

    for (let i = 0; i < points.length; i++) {
      const x = points[i].x;
      const y = points[i].y - r;

      string += Commands.move + ' ' + x + ' ' + y + ' ';
      string += 'a ' + r + ' ' + r + ' 0 1 0 0.001 0 Z';
    }

    return string;
  },

  getClip: function (shape, domElement) {
    let clip = shape._renderer.clip;

    if (!clip) {
      clip = shape._renderer.clip = svg.createElement('clipPath', {
        'clip-rule': 'nonzero',
      });
    }

    if (clip.parentNode === null) {
      domElement.defs.appendChild(clip);
    }

    return clip;
  },

  getRendererType: function (type) {
    return type in svg ? type : 'path';
  },

  defs: {
    update: function (domElement) {
      const { defs } = domElement;
      if (defs._flagUpdate) {
        const children = Array.prototype.slice.call(defs.children, 0);
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const id = child.id;
          const selector = `[fill="url(#${id})"],[stroke="url(#${id})"],[clip-path="url(#${id})"]`;
          const exists = domElement.querySelector(selector);
          if (!exists) {
            defs.removeChild(child);
          }
        }
        defs._flagUpdate = false;
      }
    },
  },

  group: {
    // TODO: Can speed up.
    // TODO: How does this effect a f
    appendChild: function (object) {
      const elem = object._renderer.elem;

      if (!elem) {
        return;
      }

      const tag = elem.nodeName;

      if (!tag || /(radial|linear)gradient/i.test(tag) || object._clip) {
        return;
      }

      this.elem.appendChild(elem);
    },

    removeChild: function (object) {
      const elem = object._renderer.elem;

      if (!elem || elem.parentNode != this.elem) {
        return;
      }

      const tag = elem.nodeName;

      if (!tag) {
        return;
      }

      // Defer subtractions while clipping.
      if (object._clip) {
        return;
      }

      this.elem.removeChild(elem);
    },

    orderChild: function (object) {
      this.elem.appendChild(object._renderer.elem);
    },

    renderChild: function (child) {
      const prop = svg.getRendererType(child._renderer.type);
      svg[prop].render.call(child, this);
    },

    render: function (domElement) {
      // Shortcut for hidden objects.
      // Doesn't reset the flags, so changes are stored and
      // applied once the object is visible again
      if (
        (!this._visible && !this._flagVisible) ||
        (this._opacity === 0 && !this._flagOpacity)
      ) {
        return this;
      }

      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      if (!this._renderer.elem) {
        this._renderer.elem = svg.createElement('g', {
          id: this.id,
        });
        domElement.appendChild(this._renderer.elem);
      }

      // _Update styles for the <g>
      const flagMatrix = this._matrix.manual || this._flagMatrix;
      const context = {
        domElement: domElement,
        elem: this._renderer.elem,
      };

      if (flagMatrix) {
        this._renderer.elem.setAttribute(
          'transform',
          'matrix(' + this._matrix.toString() + ')'
        );
      }

      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        const prop = svg.getRendererType(child._renderer.type);
        svg[prop].render.call(child, domElement);
      }

      if (this._flagId) {
        this._renderer.elem.setAttribute('id', this._id);
      }

      if (this._flagOpacity) {
        this._renderer.elem.setAttribute('opacity', this._opacity);
      }

      if (this._flagVisible) {
        this._renderer.elem.setAttribute(
          'display',
          this._visible ? 'inline' : 'none'
        );
      }

      if (this._flagClassName) {
        this._renderer.elem.setAttribute('class', this.classList.join(' '));
      }

      if (this._flagAdditions) {
        this.additions.forEach(svg.group.appendChild, context);
      }

      if (this._flagSubtractions) {
        this.subtractions.forEach(svg.group.removeChild, context);
      }

      if (this._flagOrder) {
        this.children.forEach(svg.group.orderChild, context);
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951

      // if (this._flagClip) {

      //   clip = svg.getClip(this, domElement);
      //   elem = this._renderer.elem;

      //   if (this._clip) {
      //     elem.removeAttribute('id');
      //     clip.setAttribute('id', this.id);
      //     clip.appendChild(elem);
      //   } else {
      //     clip.removeAttribute('id');
      //     elem.setAttribute('id', this.id);
      //     this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
      //   }

      // }

      if (this._flagMask) {
        if (this._mask) {
          const prop = svg.getRendererType(this._mask._renderer.type);
          svg[prop].render.call(this._mask, domElement);
          this._renderer.elem.setAttribute(
            'clip-path',
            'url(#' + this._mask.id + ')'
          );
        } else {
          this._renderer.elem.removeAttribute('clip-path');
        }
      }

      if (this.dataset) {
        Object.assign(this._renderer.elem.dataset, this.dataset);
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  path: {
    render: function (domElement) {
      // Shortcut for hidden objects.
      // Doesn't reset the flags, so changes are stored and
      // applied once the object is visible again
      if (this._opacity === 0 && !this._flagOpacity) {
        return this;
      }

      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      // Collect any attribute that needs to be changed here
      const changed = {};

      const flagMatrix = this._matrix.manual || this._flagMatrix;

      if (flagMatrix) {
        changed.transform = 'matrix(' + this._matrix.toString() + ')';
      }

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagVertices) {
        const vertices = svg.toString(this._renderer.vertices, this._closed);
        changed.d = vertices;
      }

      if (this._fill && this._fill._renderer) {
        this._renderer.hasFillEffect = true;
        this._fill._update();
        const prop = svg.getRendererType(this._fill._renderer.type);
        svg[prop].render.call(this._fill, domElement, true);
      }

      if (this._flagFill) {
        changed.fill =
          this._fill && this._fill.id
            ? 'url(#' + this._fill.id + ')'
            : this._fill;
        if (
          this._renderer.hasFillEffect &&
          typeof this._fill.id === 'undefined'
        ) {
          domElement.defs._flagUpdate = true;
          delete this._renderer.hasFillEffect;
        }
      }

      if (this._stroke && this._stroke._renderer) {
        this._renderer.hasStrokeEffect = true;
        this._stroke._update();
        const prop = svg.getRendererType(this._stroke._renderer.type);
        svg[prop].render.call(this._stroke, domElement, true);
      }

      if (this._flagStroke) {
        changed.stroke =
          this._stroke && this._stroke.id
            ? 'url(#' + this._stroke.id + ')'
            : this._stroke;
        if (
          this._renderer.hasStrokeEffect &&
          typeof this._stroke.id === 'undefined'
        ) {
          domElement.defs._flagUpdate = true;
          delete this._renderer.hasStrokeEffect;
        }
      }

      if (this._flagLinewidth) {
        changed['stroke-width'] = getEffectiveStrokeWidth(this);
      }

      if (this._flagOpacity) {
        changed['stroke-opacity'] = this._opacity;
        changed['fill-opacity'] = this._opacity;
      }

      if (this._flagClassName) {
        changed['class'] = this.classList.join(' ');
      }

      if (this._flagVisible) {
        changed.visibility = this._visible ? 'visible' : 'hidden';
      }

      if (this._flagCap) {
        changed['stroke-linecap'] = this._cap;
      }

      if (this._flagJoin) {
        changed['stroke-linejoin'] = this._join;
      }

      if (this._flagMiter) {
        changed['stroke-miterlimit'] = this._miter;
      }

      if (this.dashes && this.dashes.length > 0) {
        changed['stroke-dasharray'] = this.dashes.join(' ');
        changed['stroke-dashoffset'] = this.dashes.offset || 0;
      }

      // If there is no attached DOM element yet,
      // create it with all necessary attributes.
      if (!this._renderer.elem) {
        changed.id = this._id;
        this._renderer.elem = svg.createElement('path', changed);
        domElement.appendChild(this._renderer.elem);

        // Otherwise apply all pending attributes
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }

      if (this._flagClip) {
        const clip = svg.getClip(this, domElement);
        const elem = this._renderer.elem;

        if (this._clip) {
          elem.removeAttribute('id');
          clip.setAttribute('id', this.id);
          clip.appendChild(elem);
        } else {
          clip.removeAttribute('id');
          elem.setAttribute('id', this.id);
          this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
        }
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951

      if (this._flagMask) {
        if (this._mask) {
          const prop = svg.getRendererType(this._mask._renderer.type);
          svg[prop].render.call(this._mask, domElement);
          this._renderer.elem.setAttribute(
            'clip-path',
            'url(#' + this._mask.id + ')'
          );
        } else {
          this._renderer.elem.removeAttribute('clip-path');
        }
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  points: {
    render: function (domElement) {
      // Shortcut for hidden objects.
      // Doesn't reset the flags, so changes are stored and
      // applied once the object is visible again
      if (this._opacity === 0 && !this._flagOpacity) {
        return this;
      }

      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      this._update();

      // Collect any attribute that needs to be changed here
      const changed = {};

      const flagMatrix = this._matrix.manual || this._flagMatrix;

      if (flagMatrix) {
        changed.transform = 'matrix(' + this._matrix.toString() + ')';
      }

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagVertices || this._flagSize || this._flagSizeAttenuation) {
        let size = this._size;
        if (!this._sizeAttenuation) {
          const me = this.worldMatrix.elements;
          const m = decomposeMatrix(me[0], me[3], me[1], me[4], me[2], me[5]);
          size /= Math.max(m.scaleX, m.scaleY);
        }
        const vertices = svg.pointsToString(this._renderer.collection, size);
        changed.d = vertices;
      }

      if (this._fill && this._fill._renderer) {
        this._renderer.hasFillEffect = true;
        this._fill._update();
        const prop = svg.getRendererType(this._fill._renderer.type);
        svg[prop].render.call(this._fill, domElement, true);
      }

      if (this._flagFill) {
        changed.fill =
          this._fill && this._fill.id
            ? 'url(#' + this._fill.id + ')'
            : this._fill;
        if (
          this._renderer.hasFillEffect &&
          typeof this._fill.id === 'undefined'
        ) {
          domElement.defs._flagUpdate = true;
          delete this._renderer.hasFillEffect;
        }
      }

      if (this._stroke && this._stroke._renderer) {
        this._renderer.hasStrokeEffect = true;
        this._stroke._update();
        const prop = svg.getRendererType(this._stroke._renderer.type);
        svg[prop].render.call(this._stroke, domElement, true);
      }

      if (this._flagStroke) {
        changed.stroke =
          this._stroke && this._stroke.id
            ? 'url(#' + this._stroke.id + ')'
            : this._stroke;
        if (
          this._renderer.hasStrokeEffect &&
          typeof this._stroke.id === 'undefined'
        ) {
          domElement.defs._flagUpdate = true;
          delete this._renderer.hasStrokeEffect;
        }
      }

      if (this._flagLinewidth) {
        changed['stroke-width'] = getEffectiveStrokeWidth(this);
      }

      if (this._flagOpacity) {
        changed['stroke-opacity'] = this._opacity;
        changed['fill-opacity'] = this._opacity;
      }

      if (this._flagClassName) {
        changed['class'] = this.classList.join(' ');
      }

      if (this._flagVisible) {
        changed.visibility = this._visible ? 'visible' : 'hidden';
      }

      if (this.dashes && this.dashes.length > 0) {
        changed['stroke-dasharray'] = this.dashes.join(' ');
        changed['stroke-dashoffset'] = this.dashes.offset || 0;
      }

      // If there is no attached DOM element yet,
      // create it with all necessary attributes.
      if (!this._renderer.elem) {
        changed.id = this._id;
        this._renderer.elem = svg.createElement('path', changed);
        domElement.appendChild(this._renderer.elem);

        // Otherwise apply all pending attributes
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  text: {
    render: function (domElement) {
      this._update();

      const changed = {};

      const flagMatrix = this._matrix.manual || this._flagMatrix;

      if (flagMatrix) {
        changed.transform = 'matrix(' + this._matrix.toString() + ')';
      }

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagFamily) {
        changed['font-family'] = this._family;
      }
      if (this._flagSize) {
        changed['font-size'] = this._size;
      }
      if (this._flagLeading) {
        changed['line-height'] = this._leading;
      }
      if (this._flagAlignment) {
        changed['text-anchor'] =
          svg.alignments[this._alignment] || this._alignment;
      }
      if (this._flagBaseline) {
        changed['dominant-baseline'] =
          svg.baselines[this._baseline] || this._baseline;
      }
      if (this._flagStyle) {
        changed['font-style'] = this._style;
      }
      if (this._flagWeight) {
        changed['font-weight'] = this._weight;
      }
      if (this._flagDecoration) {
        changed['text-decoration'] = this._decoration;
      }
      if (this._flagDirection) {
        changed['direction'] = this._direction;
      }
      if (this._fill && this._fill._renderer) {
        this._renderer.hasFillEffect = true;
        this._fill._update();
        const prop = svg.getRendererType(this._fill._renderer.type);
        svg[prop].render.call(this._fill, domElement, true);
      }
      if (this._flagFill) {
        changed.fill =
          this._fill && this._fill.id
            ? 'url(#' + this._fill.id + ')'
            : this._fill;
        if (
          this._renderer.hasFillEffect &&
          typeof this._fill.id === 'undefined'
        ) {
          domElement.defs._flagUpdate = true;
          delete this._renderer.hasFillEffect;
        }
      }
      if (this._stroke && this._stroke._renderer) {
        this._renderer.hasStrokeEffect = true;
        this._stroke._update();
        const prop = svg.getRendererType(this._stroke._renderer.type);
        svg[prop].render.call(this._stroke, domElement, true);
      }
      if (this._flagStroke) {
        changed.stroke =
          this._stroke && this._stroke.id
            ? 'url(#' + this._stroke.id + ')'
            : this._stroke;
        if (
          this._renderer.hasStrokeEffect &&
          typeof this._stroke.id === 'undefined'
        ) {
          domElement.defs._flagUpdate = true;
          delete this._renderer.hasStrokeEffect;
        }
      }
      if (this._flagLinewidth) {
        changed['stroke-width'] = getEffectiveStrokeWidth(this);
      }
      if (this._flagOpacity) {
        changed.opacity = this._opacity;
      }
      if (this._flagClassName) {
        changed['class'] = this.classList.join(' ');
      }
      if (this._flagVisible) {
        changed.visibility = this._visible ? 'visible' : 'hidden';
      }
      if (this.dashes && this.dashes.length > 0) {
        changed['stroke-dasharray'] = this.dashes.join(' ');
        changed['stroke-dashoffset'] = this.dashes.offset || 0;
      }

      if (!this._renderer.elem) {
        changed.id = this._id;

        this._renderer.elem = svg.createElement('text', changed);
        domElement.appendChild(this._renderer.elem);
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }

      if (this._flagClip) {
        const clip = svg.getClip(this, domElement);
        const elem = this._renderer.elem;

        if (this._clip) {
          elem.removeAttribute('id');
          clip.setAttribute('id', this.id);
          clip.appendChild(elem);
        } else {
          clip.removeAttribute('id');
          elem.setAttribute('id', this.id);
          this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
        }
      }

      // Commented two-way functionality of clips / masks with groups and
      // polygons. Uncomment when this bug is fixed:
      // https://code.google.com/p/chromium/issues/detail?id=370951

      if (this._flagMask) {
        if (this._mask) {
          const prop = svg.getRendererType(this._mask._renderer.type);
          svg[prop].render.call(this._mask, domElement);
          this._renderer.elem.setAttribute(
            'clip-path',
            'url(#' + this._mask.id + ')'
          );
        } else {
          this._renderer.elem.removeAttribute('clip-path');
        }
      }

      if (this._flagValue) {
        this._renderer.elem.textContent = this._value;
      }

      return this.flagReset();
    },
  },

  'linear-gradient': {
    render: function (domElement, silent) {
      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      if (!silent) {
        this._update();
      }

      const changed = {};

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagEndPoints) {
        changed.x1 = this.left._x;
        changed.y1 = this.left._y;
        changed.x2 = this.right._x;
        changed.y2 = this.right._y;
      }

      if (this._flagSpread) {
        changed.spreadMethod = this._spread;
      }

      if (this._flagUnits) {
        changed.gradientUnits = this._units;
      }

      // If there is no attached DOM element yet,
      // create it with all necessary attributes.
      if (!this._renderer.elem) {
        changed.id = this._id;
        this._renderer.elem = svg.createElement('linearGradient', changed);

        // Otherwise apply all pending attributes
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }

      if (this._renderer.elem.parentNode === null) {
        domElement.defs.appendChild(this._renderer.elem);
      }

      if (this._flagStops) {
        const lengthChanged =
          this._renderer.elem.childNodes.length !== this.stops.length;

        if (lengthChanged) {
          while (this._renderer.elem.lastChild) {
            this._renderer.elem.removeChild(this._renderer.elem.lastChild);
          }
        }

        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          const attrs = {};

          if (stop._flagOffset) {
            attrs.offset = 100 * stop._offset + '%';
          }
          if (stop._flagColor) {
            attrs['stop-color'] = stop._color;
          }
          if (stop._flagOpacity) {
            attrs['stop-opacity'] = stop._opacity;
          }

          if (!stop._renderer.elem) {
            stop._renderer.elem = svg.createElement('stop', attrs);
          } else {
            svg.setAttributes(stop._renderer.elem, attrs);
          }

          if (lengthChanged) {
            this._renderer.elem.appendChild(stop._renderer.elem);
          }
          stop.flagReset();
        }
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  'radial-gradient': {
    render: function (domElement, silent) {
      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      if (!silent) {
        this._update();
      }

      const changed = {};

      if (this._flagId) {
        changed.id = this._id;
      }
      if (this._flagCenter) {
        changed.cx = this.center._x;
        changed.cy = this.center._y;
      }
      if (this._flagFocal) {
        changed.fx = this.focal._x;
        changed.fy = this.focal._y;
      }
      if (this._flagRadius) {
        changed.r = this._radius;
      }
      if (this._flagSpread) {
        changed.spreadMethod = this._spread;
      }

      if (this._flagUnits) {
        changed.gradientUnits = this._units;
      }

      // If there is no attached DOM element yet,
      // create it with all necessary attributes.
      if (!this._renderer.elem) {
        changed.id = this._id;
        this._renderer.elem = svg.createElement('radialGradient', changed);

        // Otherwise apply all pending attributes
      } else {
        svg.setAttributes(this._renderer.elem, changed);
      }

      if (this._renderer.elem.parentNode === null) {
        domElement.defs.appendChild(this._renderer.elem);
      }

      if (this._flagStops) {
        const lengthChanged =
          this._renderer.elem.childNodes.length !== this.stops.length;

        if (lengthChanged) {
          while (this._renderer.elem.lastChild) {
            this._renderer.elem.removeChild(this._renderer.elem.lastChild);
          }
        }

        for (let i = 0; i < this.stops.length; i++) {
          const stop = this.stops[i];
          const attrs = {};

          if (stop._flagOffset) {
            attrs.offset = 100 * stop._offset + '%';
          }
          if (stop._flagColor) {
            attrs['stop-color'] = stop._color;
          }
          if (stop._flagOpacity) {
            attrs['stop-opacity'] = stop._opacity;
          }

          if (!stop._renderer.elem) {
            stop._renderer.elem = svg.createElement('stop', attrs);
          } else {
            svg.setAttributes(stop._renderer.elem, attrs);
          }

          if (lengthChanged) {
            this._renderer.elem.appendChild(stop._renderer.elem);
          }
          stop.flagReset();
        }
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },

  texture: {
    render: function (domElement, silent) {
      if (_.isFunction(this._renderer.onBeforeRender)) {
        this._renderer.onBeforeRender();
      }

      if (!silent) {
        this._update();
      }

      const changed = {};
      const styles = { x: 0, y: 0 };
      const image = this.image;

      if (this._flagId) {
        changed.id = this._id;
      }

      if (this._flagLoaded && this.loaded) {
        switch (image.nodeName.toLowerCase()) {
          case 'canvas':
            styles.href = styles['xlink:href'] = image.toDataURL('image/png');
            break;
          case 'img':
          case 'image':
            styles.href = styles['xlink:href'] = this.src;
            break;
        }
      }

      if (this._flagOffset || this._flagLoaded || this._flagScale) {
        changed.x = this._offset.x;
        changed.y = this._offset.y;

        if (image) {
          changed.x -= image.width / 2;
          changed.y -= image.height / 2;

          if (this._scale instanceof Vector) {
            changed.x *= this._scale.x;
            changed.y *= this._scale.y;
          } else {
            changed.x *= this._scale;
            changed.y *= this._scale;
          }
        }

        if (changed.x > 0) {
          changed.x *= -1;
        }
        if (changed.y > 0) {
          changed.y *= -1;
        }
      }

      if (this._flagScale || this._flagLoaded || this._flagRepeat) {
        changed.width = 0;
        changed.height = 0;

        if (image) {
          changed.width = image.width;
          changed.height = image.height;

          // TODO: Hack / Band-aid
          switch (this._repeat) {
            case 'no-repeat':
              changed.width += 1;
              changed.height += 1;
              break;
          }

          if (this._scale instanceof Vector) {
            changed.width *= this._scale.x;
            changed.height *= this._scale.y;
          } else {
            changed.width *= this._scale;
            changed.height *= this._scale;
          }

          if (/no-repeat/i.test(this._repeat)) {
            styles.preserveAspectRatio = 'xMidYMid';
          } else {
            styles.preserveAspectRatio = 'none';
          }

          styles.width = changed.width;
          styles.height = changed.height;
        }
      }

      if (this._flagScale || this._flagLoaded) {
        if (!this._renderer.image) {
          this._renderer.image = svg.createElement('image', styles);
        } else {
          svg.setAttributes(this._renderer.image, styles);
        }
      }

      if (!this._renderer.elem) {
        changed.id = this._id;
        changed.patternUnits = 'userSpaceOnUse';
        this._renderer.elem = svg.createElement('pattern', changed);
      } else if (Object.keys(changed).length !== 0) {
        svg.setAttributes(this._renderer.elem, changed);
      }

      if (this._renderer.elem.parentNode === null) {
        domElement.defs.appendChild(this._renderer.elem);
      }

      if (
        this._renderer.elem &&
        this._renderer.image &&
        !this._renderer.appended
      ) {
        this._renderer.elem.appendChild(this._renderer.image);
        this._renderer.appended = true;
      }

      if (_.isFunction(this._renderer.onAfterRender)) {
        this._renderer.onAfterRender();
      }

      return this.flagReset();
    },
  },
};

/**
 * @name Two.SVGRenderer
 * @class
 * @extends Two.Events
 * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
 * @param {Element} [parameters.domElement] - The `<svg />` to draw to. If none given a new one will be constructed.
 * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.
 */
export class Renderer extends Events {
  constructor(params) {
    super();

    /**
     * @name Two.SVGRenderer#domElement
     * @property {Element} - The `<svg />` associated with the Two.js scene.
     */
    this.domElement = params.domElement || svg.createElement('svg');

    /**
     * @name Two.SVGRenderer#scene
     * @property {Two.Group} - The root group of the scenegraph.
     */
    this.scene = new Group();
    this.scene.parent = this;

    /**
     * @name Two.SVGRenderer#defs
     * @property {SvgDefintionsElement} - The `<defs />` to apply gradients, patterns, and bitmap imagery.
     */
    this.defs = svg.createElement('defs');
    this.defs._flagUpdate = false;
    this.domElement.appendChild(this.defs);
    this.domElement.defs = this.defs;
    this.domElement.style.overflow = 'hidden';
  }

  /**
   * @name Two.SVGRenderer.Utils
   * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.
   */
  static Utils = svg;

  /**
   * @name Two.SVGRenderer#setSize
   * @function
   * @param {Number} width - The new width of the renderer.
   * @param {Number} height - The new height of the renderer.
   * @description Change the size of the renderer.
   * @nota-bene Triggers a `Two.Events.resize`.
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;

    svg.setAttributes(this.domElement, {
      width: width,
      height: height,
    });

    return this.trigger(Events.Types.resize, width, height);
  }

  /**
   * @name Two.SVGRenderer#render
   * @function
   * @description Render the current scene to the `<svg />`.
   */
  render() {
    svg.group.render.call(this.scene, this.domElement);
    svg.defs.update(this.domElement);

    return this;
  }
}
