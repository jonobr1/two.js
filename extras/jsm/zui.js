import { Matrix } from '../../src/matrix.js';

class Surface {
  constructor(object) {
    this.object = object;
  }

  limits(min, max) {
    const min_exists = typeof min !== 'undefined';
    const max_exists = typeof max !== 'undefined';

    if (!max_exists && !min_exists) {
      return { min: this.min, max: this.max };
    }

    this.min = min_exists ? min : this.min;
    this.max = max_exists ? max : this.max;

    return this;
  }

  apply(px, py, s) {
    this.object.translation.set(px, py);
    this.object.scale = s;
    return this;
  }
}

/**
 * @name Two.ZUI
 * @class
 * @param {Two.Group} group - The scene or group to
 * @param {HTMLElement} [domElement=document.body] - The HTML Element to attach event listeners to.
 * @description {@link Two.ZUI} is an extra class to turn your Two.js scene into a Google Maps or Adobe Illustrator style interface. See {@link https://codepen.io/jonobr1/pen/PobMKwb} for example usage.
 */
export class ZUI {
  constructor(group, domElement) {
    this.limits = {
      scale: ZUI.Limit.clone(),
      x: ZUI.Limit.clone(),
      y: ZUI.Limit.clone(),
    };

    this.viewport = domElement || document.body;
    this.viewportOffset = {
      top: 0,
      left: 0,
      matrix: new Matrix(),
    };

    this.surfaceMatrix = new Matrix();

    this.surfaces = [];
    this.reset();
    this.updateSurface();

    this.add(new Surface(group));
  }

  static Surface = Surface;

  static Clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  static Limit = {
    min: -Infinity,
    max: Infinity,
    clone: function () {
      const result = {};
      for (let k in this) {
        result[k] = this[k];
      }
      return result;
    },
  };

  static TranslateMatrix(m, x, y) {
    m.elements[2] += x;
    m.elements[5] += y;
    return m;
  }

  static PositionToScale(pos) {
    return Math.exp(pos);
  }

  static ScaleToPosition(scale) {
    return Math.log(scale);
  }

  //

  add(surface) {
    this.surfaces.push(surface);
    const limits = surface.limits();
    this.addLimits(limits.min, limits.max);
    return this;
  }

  /**
   * @name Two.ZUI#addLimits
   * @function
   * @param {Number} [min=-Infinity] - The minimum scale the ZUI can zoom out to.
   * @param {Number} [max=Infinity] - The maximum scale the ZUI can zoom in to.
   */
  addLimits(min, max) {
    if (typeof min !== 'undefined') {
      if (this.limits.scale.min) {
        this.limits.scale.min = Math.max(min, this.limits.scale.min);
      } else {
        this.limits.scale.min = min;
      }
    }

    if (typeof max === 'undefined') {
      return this;
    }

    if (this.limits.scale.max) {
      this.limits.scale.max = Math.min(max, this.limits.scale.max);
    } else {
      this.limits.scale.max = max;
    }

    return this;
  }

  /**
   * @name Two.ZUI#clientToSurface
   * @function
   * @param {Two.Vector} a
   * @description Convert an x, y coordinate in the user’s space to the object's projected space. Optionally pass a z property on the object to apply depth.
   * @returns {Object} - An object with x, y, and z components
   * @overloaded
   */

  /**
   * @name Two.ZUI#clientToSurface
   * @param {Number} [a=0] - The x component of position to be transformed.
   * @param {Number} [b=0] - The y component of position to be transformed.
   * @param {Number} [c=1] - The optional z component of position to be transformed.
   * @description Convert an x, y coordinate in the user’s space to the object's projected space. Optionally pass a z property on the object to apply depth.
   * @returns {Object} - An object with x, y, and z components
   * @overloaded
   */
  clientToSurface(a, b, c) {
    this.updateOffset();
    const m = this.surfaceMatrix.inverse();
    let x, y, z;
    if (arguments.length === 1) {
      const v = a;
      x = typeof v.x === 'number' ? v.x : 0;
      y = typeof v.y === 'number' ? v.y : 0;
      z = typeof v.z === 'number' ? v.z : 1;
    } else {
      x = typeof a === 'number' ? a : 0;
      y = typeof b === 'number' ? b : 0;
      z = typeof c === 'number' ? c : 1;
    }
    const n = this.viewportOffset.matrix.inverse().multiply(x, y, z);
    const r = m.multiply(n[0], n[1], n[2]);
    return { x: r[0], y: r[1], z: r[2] };
  }

  /**
   * @name Two.ZUI#surfaceToClient
   * @function
   * @param {Two.Vector} a
   * @description Convert an x, y coordinate in projected space to the user’s space. Optionally pass a z property on the object to apply depth.
   * @returns {Object} - An object with x, y, and z components
   * @overloaded
   */

  /**
   * @name Two.ZUI#surfaceToClient
   * @param {Number} [a=0] - The x component of position to be transformed.
   * @param {Number} [b=0] - The y component of position to be transformed.
   * @param {Number} [c=1] - The optional z component of position to be transformed.
   * @description Convert an x, y coordinate in projected space to the user’s space. Optionally pass a z property on the object to apply depth.
   * @returns {Object} - An object with x, y, and z components
   * @overloaded
   */
  surfaceToClient(a, b, c) {
    this.updateOffset();
    const vo = this.viewportOffset.matrix.clone();
    let x, y, z;
    if (arguments.length === 1) {
      const v = a;
      x = typeof v.x === 'number' ? v.x : 0;
      y = typeof v.y === 'number' ? v.y : 0;
      z = typeof v.z === 'number' ? v.z : 1;
    } else {
      x = typeof a === 'number' ? a : 0;
      y = typeof b === 'number' ? b : 0;
      z = typeof c === 'number' ? c : 1;
    }
    const sm = this.surfaceMatrix.multiply(x, y, z);
    const r = vo.multiply(sm[0], sm[1], sm[2]);
    return { x: r[0], y: r[1], z: r[2] };
  }

  /**
   * @name Two.ZUI#zoomBy
   * @function
   * @param {Number} byF - The factor to scale by.
   * @param {Number} clientX - The x position of the user's input.
   * @param {Number} clientY - The y position of the user's input.
   * @description A function to zoom by an incremental amount and a position. Typically used for pinch-and-zoom or mousewheel effects.
   */
  zoomBy(byF, clientX, clientY) {
    const s = ZUI.PositionToScale(this.zoom + byF);
    this.zoomSet(s, clientX, clientY);
    return this;
  }

  /**
   * @name Two.ZUI#zoomSet
   * @function
   * @param {Number} zoom - The level of the zoom.
   * @param {Number} clientX - The x position of the user's input.
   * @param {Number} clientY - The y position of the user's input.
   * @description A function to set the zoom amount and the origin position. This is used internally by {@Two.ZUI#zoomBy}.
   */
  zoomSet(zoom, clientX, clientY) {
    const newScale = this.fitToLimits(zoom);
    this.zoom = ZUI.ScaleToPosition(newScale);

    if (newScale === this.scale) {
      return this;
    }

    const sf = this.clientToSurface(clientX, clientY);
    const scaleBy = newScale / this.scale;

    this.surfaceMatrix.scale(scaleBy);
    this.scale = newScale;

    const c = this.surfaceToClient(sf);
    const dx = clientX - c.x;
    const dy = clientY - c.y;
    this.translateSurface(dx, dy);

    return this;
  }

  /**
   * @name Two.ZUI#translateSurface
   * @function
   * @param {Number} x - The x amount to pan.
   * @param {Number} y - The y amount to pan.
   * @description Set the position of the ZUI by an incremental translation amount.
   */
  translateSurface(x, y) {
    ZUI.TranslateMatrix(this.surfaceMatrix, x, y);
    this.updateSurface();
    return this;
  }

  updateOffset() {
    const rect = this.viewport.getBoundingClientRect();

    this.viewportOffset.left = rect.left - document.body.scrollLeft;
    this.viewportOffset.top = rect.top - document.body.scrollTop;

    this.viewportOffset.matrix
      .identity()
      .translate(this.viewportOffset.left, this.viewportOffset.top);

    return this;
  }

  updateSurface() {
    const e = this.surfaceMatrix.elements;
    for (let i = 0; i < this.surfaces.length; i++) {
      this.surfaces[i].apply(e[2], e[5], e[0]);
    }

    return this;
  }

  /**
   * @name Two.ZUI#reset
   * @function
   * @description Reset the zoom and scale factors to their original instantiated state.
   */
  reset() {
    this.zoom = 0;
    this.scale = 1.0;
    this.surfaceMatrix.identity();
    this.updateSurface();
    return this;
  }

  fitToLimits(s) {
    return ZUI.Clamp(s, this.limits.scale.min, this.limits.scale.max);
  }
}
