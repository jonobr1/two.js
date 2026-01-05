/*
MIT License

Copyright (c) 2012 - 2025 @jonobr1 / http://jono.fyi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var Two = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

  // src/two.js
  var two_exports = {};
  __export(two_exports, {
    default: () => Two
  });

  // src/utils/canvas-polyfill.js
  var CanvasPolyfill = {
    /**
     * @param {Image}
     */
    Image: null,
    /**
     * @param {Boolean}
     */
    isHeadless: false,
    /**
     *
     * @param {canvas} elem - An element to spoof as a `<canvas />`.
     * @param {String} [name] - An optional tag and node name to spoof. Defaults to `'canvas'`.
     * @returns {canvas} - The same `elem` passed in the first argument with updated attributes needed to be used by Two.js.
     * @description Adds attributes invoked by Two.js in order to execute and run correctly. This is used by headless environments.
     */
    shim: function(elem, name) {
      elem.tagName = elem.nodeName = name || "canvas";
      elem.nodeType = 1;
      elem.getAttribute = function(prop) {
        return this[prop];
      };
      elem.setAttribute = function(prop, val) {
        this[prop] = val;
        return this;
      };
      return elem;
    },
    /**
     * @name Two.Utils.polyfill
     * @function
     * @param {canvas} canvas - The instanced `Canvas` object provided by `node-canvas`.
     * @param {Image} [Image] - The prototypical `Image` object provided by `node-canvas`. This is only necessary to pass if you're going to load bitmap imagery.
     * @returns {canvas} Returns the instanced canvas object you passed from with additional attributes needed for Two.js.
     * @description Convenience method for defining all the dependencies from the npm package `node-canvas`. See [node-canvas](https://github.com/Automattic/node-canvas) for additional information on setting up HTML5 `<canvas />` drawing in a node.js environment.
     */
    polyfill: function(canvas3, Image3) {
      CanvasPolyfill.shim(canvas3);
      if (typeof Image3 !== "undefined") {
        CanvasPolyfill.Image = Image3;
      }
      CanvasPolyfill.isHeadless = true;
      return canvas3;
    }
  };

  // src/utils/curves.js
  var curves_exports = {};
  __export(curves_exports, {
    Curve: () => Curve,
    getAnchorsFromArcData: () => getAnchorsFromArcData,
    getComponentOnCubicBezier: () => getComponentOnCubicBezier,
    getControlPoints: () => getControlPoints,
    getCurveBoundingBox: () => getCurveBoundingBox,
    getCurveFromPoints: () => getCurveFromPoints,
    getCurveLength: () => getCurveLength,
    getReflection: () => getReflection,
    integrate: () => integrate,
    subdivide: () => subdivide
  });

  // src/utils/math.js
  var math_exports = {};
  __export(math_exports, {
    HALF_PI: () => HALF_PI,
    NumArray: () => NumArray,
    TWO_PI: () => TWO_PI,
    decomposeMatrix: () => decomposeMatrix,
    getComputedMatrix: () => getComputedMatrix,
    getEffectiveStrokeWidth: () => getEffectiveStrokeWidth,
    getPoT: () => getPoT,
    lerp: () => lerp,
    mod: () => mod,
    setMatrix: () => setMatrix,
    toFixed: () => toFixed
  });

  // src/utils/root.js
  var root;
  if (typeof window !== "undefined") {
    root = window;
  } else if (typeof global !== "undefined") {
    root = global;
  } else if (typeof self !== "undefined") {
    root = self;
  }

  // src/utils/math.js
  var Matrix;
  var TWO_PI = Math.PI * 2;
  var HALF_PI = Math.PI * 0.5;
  function decomposeMatrix(matrix, b, c, d, e, f) {
    let a;
    if (arguments.length <= 1) {
      a = matrix.a;
      b = matrix.b;
      c = matrix.c;
      d = matrix.d;
      e = matrix.e;
      f = matrix.f;
    } else {
      a = matrix;
    }
    return {
      translateX: e,
      translateY: f,
      scaleX: Math.sqrt(a * a + b * b),
      scaleY: Math.sqrt(c * c + d * d),
      rotation: 180 * Math.atan2(b, a) / Math.PI
    };
  }
  function setMatrix(matrix) {
    Matrix = matrix;
  }
  function getComputedMatrix(object, matrix) {
    matrix = matrix && matrix.identity() || new Matrix();
    let parent = object;
    const matrices = [];
    while (parent && parent._matrix) {
      matrices.push(parent._matrix);
      parent = parent.parent;
    }
    matrices.reverse();
    for (let i = 0; i < matrices.length; i++) {
      const m = matrices[i];
      const e = m.elements;
      matrix.multiply(
        e[0],
        e[1],
        e[2],
        e[3],
        e[4],
        e[5],
        e[6],
        e[7],
        e[8]
      );
    }
    return matrix;
  }
  function lerp(a, b, t) {
    return t * (b - a) + a;
  }
  var pots = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
  function getPoT(value) {
    let i = 0;
    while (pots[i] && pots[i] < value) {
      i++;
    }
    return pots[i];
  }
  function mod(v, l) {
    while (v < 0) {
      v += l;
    }
    return v % l;
  }
  var NumArray = root.Float32Array || Array;
  var floor = Math.floor;
  function toFixed(v) {
    return floor(v * 1e6) / 1e6;
  }
  function getEffectiveStrokeWidth(object, worldMatrix) {
    const linewidth = object._linewidth;
    if (object.strokeAttenuation) {
      return linewidth;
    }
    if (!worldMatrix) {
      worldMatrix = object.worldMatrix || getComputedMatrix(object);
    }
    const decomposed = decomposeMatrix(
      worldMatrix.elements[0],
      worldMatrix.elements[3],
      worldMatrix.elements[1],
      worldMatrix.elements[4],
      worldMatrix.elements[2],
      worldMatrix.elements[5]
    );
    const scale = Math.max(Math.abs(decomposed.scaleX), Math.abs(decomposed.scaleY));
    return scale > 0 ? linewidth / scale : linewidth;
  }

  // src/utils/path-commands.js
  var Commands = {
    move: "M",
    line: "L",
    curve: "C",
    arc: "A",
    close: "Z"
  };

  // src/events.js
  var Events = class {
    _events = {};
    _bound = false;
    constructor() {
    }
    /**
     * @name Two.Events#addEventListener
     * @function
     * @param {String} [name] - The name of the event to bind a function to.
     * @param {Function} [handler] - The function to be invoked when the event is dispatched.
     * @description Call to add a listener to a specific event name.
     */
    addEventListener(name, handler) {
      const list = this._events[name] || (this._events[name] = []);
      list.push(handler);
      this._bound = true;
      return this;
    }
    /**
     * @name Two.Events#on
     * @function
     * @description Alias for {@link Two.Events#addEventListener}.
     */
    on() {
      return this.addEventListener.apply(this, arguments);
    }
    /**
     * @name Two.Events#bind
     * @function
     * @description Alias for {@link Two.Events#addEventListener}.
     */
    bind() {
      return this.addEventListener.apply(this, arguments);
    }
    /**
     * @name Two.Events#removeEventListener
     * @function
     * @param {String} [name] - The name of the event intended to be removed.
     * @param {Function} [handler] - The handler intended to be removed.
     * @description Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.
     */
    removeEventListener(name, handler) {
      if (!this._events) {
        return this;
      }
      if (!name && !handler) {
        this._events = {};
        this._bound = false;
        return this;
      }
      const names = name ? [name] : Object.keys(this._events);
      for (let i = 0, l = names.length; i < l; i++) {
        name = names[i];
        let list = this._events[name];
        if (list) {
          let events = [];
          if (handler) {
            for (let j = 0, k = list.length; j < k; j++) {
              let e = list[j];
              e = e.handler ? e.handler : e;
              if (handler !== e) {
                events.push(e);
              }
            }
          }
          this._events[name] = events;
        }
      }
      return this;
    }
    /**
     * @name Two.Events#off
     * @function
     * @description Alias for {@link Two.Events#removeEventListener}.
     */
    off() {
      return this.removeEventListener.apply(this, arguments);
    }
    /**
     * @name Two.Events#unbind
     * @function
     * @description Alias for {@link Two.Events#removeEventListener}.
     */
    unbind() {
      return this.removeEventListener.apply(this, arguments);
    }
    /**
     * @name Two.Events#dispatchEvent
     * @function
     * @param {String} name - The name of the event to dispatch.
     * @param args - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
     * @description Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
     */
    dispatchEvent(name) {
      if (!this._events) {
        return this;
      }
      const args = Array.prototype.slice.call(arguments, 1);
      const events = this._events[name];
      if (events) {
        for (let i = 0; i < events.length; i++) {
          events[i].call(this, ...args);
        }
      }
      return this;
    }
    trigger() {
      return this.dispatchEvent.apply(this, arguments);
    }
    listen(obj, name, handler) {
      const scope = this;
      if (obj) {
        e.obj = obj;
        e.name = name;
        e.handler = handler;
        obj.on(name, e);
      }
      function e() {
        handler.apply(scope, arguments);
      }
      return scope;
    }
    ignore(obj, name, handler) {
      obj.off(name, handler);
      return this;
    }
    /**
     * @name Two.Events.Types
     * @property {Object} - Object of different types of Two.js specific events.
     */
    static Types = {
      play: "play",
      pause: "pause",
      update: "update",
      render: "render",
      resize: "resize",
      change: "change",
      remove: "remove",
      insert: "insert",
      order: "order",
      load: "load"
    };
    static Methods = [
      "addEventListener",
      "on",
      "removeEventListener",
      "off",
      "unbind",
      "dispatchEvent",
      "trigger",
      "listen",
      "ignore"
    ];
  };

  // src/vector.js
  var proto = {
    x: {
      enumerable: true,
      get: function() {
        return this._x;
      },
      set: function(v) {
        if (this._x !== v) {
          this._x = v;
          if (this._bound) {
            this.dispatchEvent(Events.Types.change);
          }
        }
      }
    },
    y: {
      enumerable: true,
      get: function() {
        return this._y;
      },
      set: function(v) {
        if (this._y !== v) {
          this._y = v;
          if (this._bound) {
            this.dispatchEvent(Events.Types.change);
          }
        }
      }
    }
  };
  var Vector = class _Vector extends Events {
    /**
     * @name Two.Vector#_x
     * @private
     */
    _x = 0;
    /**
     * @name Two.Vector#_y
     * @private
     */
    _y = 0;
    constructor(x = 0, y = 0) {
      super();
      for (let prop in proto) {
        Object.defineProperty(this, prop, proto[prop]);
      }
      this.x = x;
      this.y = y;
    }
    /**
     * @name Two.Vector.zero
     * @readonly
     * @property {Two.Vector} - Handy reference to a vector with component values 0, 0 at all times.
     */
    static zero = new _Vector();
    /**
     * @name Two.Vector.left
     * @readonly
     * @property {Two.Vector} - Handy reference to a vector with component values -1, 0 at all times.
     */
    static left = new _Vector(-1, 0);
    /**
     * @name Two.Vector.right
     * @readonly
     * @property {Two.Vector} - Handy reference to a vector with component values 1, 0 at all times.
     */
    static right = new _Vector(1, 0);
    /**
     * @name Two.Vector.up
     * @readonly
     * @property {Two.Vector} - Handy reference to a vector with component values 0, -1 at all times.
     */
    static up = new _Vector(0, -1);
    /**
     * @name Two.Vector.down
     * @readonly
     * @property {Two.Vector} - Handy reference to a vector with component values 0, 1 at all times.
     */
    static down = new _Vector(0, 1);
    /**
     * @name Two.Vector.add
     * @function
     * @param {Two.Vector} v1 - First {@link Two.Vector}
     * @param {Two.Vector} v2 - Second {@link Two.Vector}
     * @returns {Two.Vector}
     * @description Add two vectors together.
     */
    static add(v1, v2) {
      return new _Vector(v1.x + v2.x, v1.y + v2.y);
    }
    /**
     * @name Two.Vector.sub
     * @function
     * @param {Two.Vector} v1 - First {@link Two.Vector}
     * @param {Two.Vector} v2 - Second {@link Two.Vector}
     * @returns {Two.Vector}
     * @description Subtract two vectors: `v2` from `v1`.
     */
    static sub(v1, v2) {
      return new _Vector(v1.x - v2.x, v1.y - v2.y);
    }
    /**
     * @name Two.Vector.subtract
     * @function
     * @description Alias for {@link Two.Vector.sub}.
     */
    static subtract(v1, v2) {
      return _Vector.sub(v1, v2);
    }
    /**
     * @name Two.Vector.ratioBetween
     * @function
     * @param {Two.Vector} v1 - First {@link Two.Vector}
     * @param {Two.Vector} v2 - Second {@link Two.Vector}
     * @returns {Number} The ratio betwen two points `v1` and `v2`.
     */
    static ratioBetween(v1, v2) {
      return (v1.x * v2.x + v1.y * v2.y) / (v1.length() * v2.length());
    }
    /**
     * @name Two.Vector.angleBetween
     * @function
     * @param {Two.Vector} v1 - First {@link Two.Vector}
     * @param {Two.Vector} v2 - Second {@link Two.Vector}
     * @returns {Number} The angle between points `v1` and `v2`.
     */
    static angleBetween(v1, v2) {
      if (arguments.length >= 4) {
        const dx2 = arguments[0] - arguments[2];
        const dy2 = arguments[1] - arguments[3];
        return Math.atan2(dy2, dx2);
      }
      const dx = v1.x - v2.x;
      const dy = v1.y - v2.y;
      return Math.atan2(dy, dx);
    }
    /**
     * @name Two.Vector.distanceBetween
     * @function
     * @param {Two.Vector} v1 - First {@link Two.Vector}
     * @param {Two.Vector} v2 - Second {@link Two.Vector}
     * @returns {Number} The distance between points `v1` and `v2`. Distance is always positive.
     */
    static distanceBetween(v1, v2) {
      return Math.sqrt(_Vector.distanceBetweenSquared(v1, v2));
    }
    /**
     * @name Two.Vector.distanceBetweenSquared
     * @function
     * @param {Two.Vector} v1 - First {@link Two.Vector}
     * @param {Two.Vector} v2 - Second {@link Two.Vector}
     * @returns {Number} The squared distance between points `v1` and `v2`.
     */
    static distanceBetweenSquared(v1, v2) {
      const dx = v1.x - v2.x;
      const dy = v1.y - v2.y;
      return dx * dx + dy * dy;
    }
    //
    /**
     * @name Two.Vector#set
     * @function
     * @param {number} x - Value of `x` component
     * @param {number} y - Value of `y` component
     */
    set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
    /**
     * @name Two.Vector#copy
     * @function
     * @param {Two.Vector} v - The {@link Two.Vector} to copy
     * @description Copy the `x` / `y` components of another object {@link Two.Vector}.
     */
    copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    }
    /**
     * @name Two.Vector#clear
     * @function
     * @description Set the `x` / `y` component values of the vector to zero.
     */
    clear() {
      this.x = 0;
      this.y = 0;
      return this;
    }
    /**
     * @name Two.Vector#clone
     * @function
     * @description Create a new vector and copy the existing values onto the newly created instance.
     * @return {Two.Vector}
     */
    clone() {
      return new _Vector(this.x, this.y);
    }
    /**
     * @name Two.Vector#add
     * @function
     * @param {Two.Vector} v - The {@link Two.Vector} to add
     * @description Add an object with `x` / `y` component values to the instance.
     * @overloaded
     */
    /**
     * @name Two.Vector#add
     * @function
     * @param {Number} n - Number to add
     * @description Add the **same** number to both `x` / `y` component values of the instance.
     * @overloaded
     */
    /**
     * @name Two.Vector#add
     * @function
     * @param {Number} x - Number to add to `x` component
     * @param {Number} y - Number to add to `y` component
     * @description Add `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    add(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (typeof x === "number") {
          this.x += x;
          this.y += x;
        } else if (x && typeof x.x === "number" && typeof x.y === "number") {
          this.x += x.x;
          this.y += x.y;
        }
      } else {
        this.x += x;
        this.y += y;
      }
      return this;
    }
    /**
     * @name Two.Vector#addSelf
     * @function
     * @description Alias for {@link Two.Vector.add}.
     */
    addSelf(v) {
      return this.add.apply(this, arguments);
    }
    /**
     * @name Two.Vector#sub
     * @function
     * @param {Two.Vector} v - The amount as a {@link Two.Vector} to subtract
     * @description Subtract an object with `x` / `y` component values to the instance.
     * @overloaded
     */
    /**
     * @name Two.Vector#sub
     * @function
     * @param {Number} n - Number to subtract
     * @description Subtract the **same** number to both `x` / `y` component values of the instance.
     * @overloaded
     */
    /**
     * @name Two.Vector#sub
     * @function
     * @param {Number} x - Number to subtract from `x` component
     * @param {Number} y - Number to subtract from `y` component
     * @description Subtract `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    sub(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (typeof x === "number") {
          this.x -= x;
          this.y -= x;
        } else if (x && typeof x.x === "number" && typeof x.y === "number") {
          this.x -= x.x;
          this.y -= x.y;
        }
      } else {
        this.x -= x;
        this.y -= y;
      }
      return this;
    }
    /**
     * @name Two.Vector#subtract
     * @function
     * @description Alias for {@link Two.Vector.sub}.
     */
    subtract() {
      return this.sub.apply(this, arguments);
    }
    /**
     * @name Two.Vector#subSelf
     * @function
     * @description Alias for {@link Two.Vector.sub}.
     */
    subSelf(v) {
      return this.sub.apply(this, arguments);
    }
    /**
     * @name Two.Vector#subtractSelf
     * @function
     * @description Alias for {@link Two.Vector.sub}.
     */
    subtractSelf(v) {
      return this.sub.apply(this, arguments);
    }
    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Two.Vector} v - The {@link Two.Vector} to multiply
     * @description Multiply an object with `x` / `y` component values to the instance.
     * @overloaded
     */
    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Number} n - The number to multiply
     * @description Multiply the **same** number to both x / y component values of the instance.
     * @overloaded
     */
    /**
     * @name Two.Vector#multiply
     * @function
     * @param {Number} x - The number to multiply to `x` component
     * @param {Number} y - The number to multiply to `y` component
     * @description Multiply `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    multiply(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (typeof x === "number") {
          this.x *= x;
          this.y *= x;
        } else if (x && typeof x.x === "number" && typeof x.y === "number") {
          this.x *= x.x;
          this.y *= x.y;
        }
      } else {
        this.x *= x;
        this.y *= y;
      }
      return this;
    }
    /**
     * @name Two.Vector#multiplySelf
     * @function
     * @description Alias for {@link Two.Vector.multiply}.
     */
    multiplySelf(v) {
      return this.multiply.apply(this, arguments);
    }
    /**
     * @name Two.Vector#multiplyScalar
     * @function
     * @param {Number} s - The scalar to multiply by.
     * @description Mulitiply the vector by a single number. Shorthand to call {@link Two.Vector#multiply} directly.
     */
    multiplyScalar(s) {
      return this.multiply(s);
    }
    /**
     * @name Two.Vector#divide
     * @function
     * @param {Two.Vector} v - The {@link Two.Vector} to divide
     * @description Divide an object with `x` / `y` component values to the instance.
     * @overloaded
     */
    /**
     * @name Two.Vector#divide
     * @function
     * @param {Number} n - The number to divide
     * @description Divide the **same** number to both x / y component values of the instance.
     * @overloaded
     */
    /**
     * @name Two.Vector#divide
     * @function
     * @param {Number} x - The number to divide on the `x` component
     * @param {Number} y - The number to divide on the `y` component
     * @description Divide `x` / `y` values to their respective component value on the instance.
     * @overloaded
     */
    divide(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (typeof x === "number") {
          this.x /= x;
          this.y /= x;
        } else if (x && typeof x.x === "number" && typeof x.y === "number") {
          this.x /= x.x;
          this.y /= x.y;
        }
      } else {
        this.x /= x;
        this.y /= y;
      }
      if (isNaN(this.x)) {
        this.x = 0;
      }
      if (isNaN(this.y)) {
        this.y = 0;
      }
      return this;
    }
    /**
     * @name Two.Vector#divideSelf
     * @function
     * @description Alias for {@link Two.Vector.divide}.
     */
    divideSelf(v) {
      return this.divide.apply(this, arguments);
    }
    /**
     * @name Two.Vector#divideScalar
     * @function
     * @param {Number} s - The scalar to divide by.
     * @description Divide the vector by a single number. Shorthand to call {@link Two.Vector#divide} directly.
     */
    divideScalar(s) {
      return this.divide(s);
    }
    /**
     * @name Two.Vector#negate
     * @function
     * @description Invert each component's sign value.
     */
    negate() {
      return this.multiply(-1);
    }
    /**
     * @name Two.Vector#dot
     * @function
     * @returns {Number}
     * @description Get the [dot product](https://en.wikipedia.org/wiki/Dot_product) of the vector.
     */
    dot(v) {
      return this.x * v.x + this.y * v.y;
    }
    /**
     * @name Two.Vector#length
     * @function
     * @returns {Number}
     * @description Get the length of a vector.
     */
    length() {
      return Math.sqrt(this.lengthSquared());
    }
    /**
     * @name Two.Vector#lengthSquared
     * @function
     * @returns {Number}
     * @description Get the length of the vector to the power of two. Widely used as less expensive than {@link Two.Vector#length} because it isn't square-rooting any numbers.
     */
    lengthSquared() {
      return this.x * this.x + this.y * this.y;
    }
    /**
     * @name Two.Vector#normalize
     * @function
     * @description Normalize the vector from negative one to one.
     */
    normalize() {
      return this.divideScalar(this.length());
    }
    /**
     * @name Two.Vector#distanceTo
     * @function
     * @returns {Number}
     * @description Get the distance between two vectors.
     */
    distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
    /**
     * @name Two.Vector#distanceToSquared
     * @function
     * @returns {Number}
     * @description Get the distance between two vectors to the power of two. Widely used as less expensive than {@link Two.Vector#distanceTo} because it isn't square-rooting any numbers.
     */
    distanceToSquared(v) {
      const dx = this.x - v.x;
      const dy = this.y - v.y;
      return dx * dx + dy * dy;
    }
    /**
     * @name Two.Vector#setLength
     * @function
     * @param {Number} l - length to set vector to.
     * @description Set the length of a vector.
     */
    setLength(l) {
      return this.normalize().multiplyScalar(l);
    }
    /**
     * @name Two.Vector#equals
     * @function
     * @param {Two.Vector} v - The vector to compare against.
     * @param {Number} [eps=0.0001] - An options epsilon for precision.
     * @returns {Boolean}
     * @description Qualify if one vector roughly equal another. With a margin of error defined by epsilon.
     */
    equals(v, eps) {
      eps = typeof eps === "undefined" ? 1e-4 : eps;
      return this.distanceTo(v) < eps;
    }
    /**
     * @name Two.Vector#lerp
     * @function
     * @param {Two.Vector} v - The destination vector to step towards.
     * @param {Number} t - The zero to one value of how close the current vector gets to the destination vector.
     * @description Linear interpolate one vector to another by an amount `t` defined as a zero to one number.
     * @see [Matt DesLauriers](https://twitter.com/mattdesl/status/1031305279227478016) has a good thread about this.
     */
    lerp(v, t) {
      const x = (v.x - this.x) * t + this.x;
      const y = (v.y - this.y) * t + this.y;
      return this.set(x, y);
    }
    /**
     * @name Two.Vector#isZero
     * @function
     * @param {Number} [eps=0.0001] - Optional precision amount to check against.
     * @returns {Boolean}
     * @description Check to see if vector is roughly zero, based on the `epsilon` precision value.
     */
    isZero(eps) {
      eps = typeof eps === "undefined" ? 1e-4 : eps;
      return this.length() < eps;
    }
    /**
     * @name Two.Vector#toString
     * @function
     * @returns {String}
     * @description Return a comma-separated string of x, y value. Great for storing in a database.
     */
    toString() {
      return this.x + ", " + this.y;
    }
    /**
     * @name Two.Vector#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the vector.
     */
    toObject() {
      return { x: toFixed(this.x), y: toFixed(this.y) };
    }
    /**
     * @name Two.Vector#rotate
     * @function
     * @param {Number} radians - The amount to rotate the vector by in radians.
     * @description Rotate a vector.
     */
    rotate(radians) {
      const x = this.x;
      const y = this.y;
      const cos7 = Math.cos(radians);
      const sin7 = Math.sin(radians);
      this.x = x * cos7 - y * sin7;
      this.y = x * sin7 + y * cos7;
      return this;
    }
  };

  // src/anchor.js
  var Anchor = class _Anchor extends Vector {
    controls = {
      left: new Vector(),
      right: new Vector()
    };
    _command = Commands.move;
    _relative = true;
    _rx = 0;
    _ry = 0;
    _xAxisRotation = 0;
    _largeArcFlag = 0;
    _sweepFlag = 1;
    constructor(x = 0, y = 0, ax = 0, ay = 0, bx = 0, by = 0, command = Commands.move) {
      super(x, y);
      for (let prop in proto2) {
        Object.defineProperty(this, prop, proto2[prop]);
      }
      this.command = command;
      this.relative = true;
      const broadcast = _Anchor.makeBroadcast(this);
      this.controls.left.set(ax, ay).addEventListener(Events.Types.change, broadcast);
      this.controls.right.set(bx, by).addEventListener(Events.Types.change, broadcast);
    }
    static makeBroadcast(scope) {
      return broadcast;
      function broadcast() {
        if (scope._bound) {
          scope.dispatchEvent(Events.Types.change);
        }
      }
    }
    /**
     * @name Two.Anchor.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Anchor} to create a new instance
     * @returns {Two.Anchor}
     * @description Create a new {@link Two.Anchor} from an object notation of a {@link Two.Anchor}.
     * @nota-bene Works in conjunction with {@link Two.Anchor#toObject}
     */
    static fromObject(obj) {
      return new _Anchor().copy(obj);
    }
    /**
     * @name Two.Anchor#copy
     * @function
     * @param {Two.Anchor} v - The anchor to apply values to.
     * @description Copy the properties of one {@link Two.Anchor} onto another.
     */
    copy(v) {
      this.x = v.x;
      this.y = v.y;
      if (typeof v.command === "string") {
        this.command = v.command;
      }
      if (v.controls) {
        if (v.controls.left) {
          this.controls.left.copy(v.controls.left);
        }
        if (v.controls.right) {
          this.controls.right.copy(v.controls.right);
        }
      }
      if (typeof v.relative === "boolean") {
        this.relative = v.relative;
      }
      if (typeof v.rx === "number") {
        this.rx = v.rx;
      }
      if (typeof v.ry === "number") {
        this.ry = v.ry;
      }
      if (typeof v.xAxisRotation === "number") {
        this.xAxisRotation = v.xAxisRotation;
      }
      if (typeof v.largeArcFlag === "number") {
        this.largeArcFlag = v.largeArcFlag;
      }
      if (typeof v.sweepFlag === "number") {
        this.sweepFlag = v.sweepFlag;
      }
      return this;
    }
    /**
     * @name Two.Anchor#clone
     * @function
     * @returns {Two.Anchor}
     * @description Create a new {@link Two.Anchor}, set all its values to the current instance and return it for use.
     */
    clone() {
      return new _Anchor().copy(this);
    }
    /**
     * @name Two.Anchor#toObject
     * @function
     * @returns {Object} - An object with properties filled out to mirror {@link Two.Anchor}.
     * @description Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.
     * @nota-bene Works in conjunction with {@link Two.Anchor.fromObject}
     */
    toObject() {
      return {
        x: toFixed(this.x),
        y: toFixed(this.y),
        command: this.command,
        relative: this.relative,
        controls: {
          left: this.controls.left.toObject(),
          right: this.controls.right.toObject()
        },
        rx: toFixed(this.rx),
        ry: toFixed(this.ry),
        xAxisRotation: toFixed(this.xAxisRotation),
        largeArcFlag: toFixed(this.largeArcFlag),
        sweepFlag: toFixed(this.sweepFlag)
      };
    }
    /**
     * @name Two.Anchor#toString
     * @function
     * @returns {String} - A String with comma-separated values reflecting the various values on the current instance.
     * @description Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible {@link Two.Anchor#toObject}.
     */
    toString() {
      return JSON.stringify(this.toObject());
    }
  };
  var proto2 = {
    command: {
      enumerable: true,
      get: function() {
        return this._command;
      },
      set: function(command) {
        if (this._command !== command) {
          this._command = command;
          if (this._bound) {
            this.dispatchEvent(Events.Types.change);
          }
        }
      }
    },
    relative: {
      enumerable: true,
      get: function() {
        return this._relative;
      },
      set: function(relative) {
        if (this._relative !== !!relative) {
          this._relative = !!relative;
          if (this._bound) {
            this.dispatchEvent(Events.Types.change);
          }
        }
      }
    },
    rx: {
      enumerable: true,
      get: function() {
        return this._rx;
      },
      set: function(rx) {
        if (this._rx !== rx) {
          this._rx = rx;
          if (this._bound) {
            this.dispatchEvent(Events.Types.change);
          }
        }
      }
    },
    ry: {
      enumerable: true,
      get: function() {
        return this._ry;
      },
      set: function(ry) {
        if (this._ry !== ry) {
          this._ry = ry;
          if (this._bound) {
            this.dispatchEvent(Events.Types.change);
          }
        }
      }
    },
    xAxisRotation: {
      enumerable: true,
      get: function() {
        return this._xAxisRotation;
      },
      set: function(xAxisRotation) {
        if (this._xAxisRotation !== xAxisRotation) {
          this._xAxisRotation = xAxisRotation;
          if (this._bound) {
            this.dispatchEvent(Events.Types.change);
          }
        }
      }
    },
    largeArcFlag: {
      enumerable: true,
      get: function() {
        return this._largeArcFlag;
      },
      set: function(largeArcFlag) {
        if (this._largeArcFlag !== largeArcFlag) {
          this._largeArcFlag = largeArcFlag;
          if (this._bound) {
            this.dispatchEvent(Events.Types.change);
          }
        }
      }
    },
    sweepFlag: {
      get: function() {
        return this._sweepFlag;
      },
      set: function(sweepFlag) {
        if (this._sweepFlag !== sweepFlag) {
          this._sweepFlag = sweepFlag;
          if (this._bound) {
            this.dispatchEvent(Events.Types.change);
          }
        }
      }
    }
  };

  // src/constants.js
  var count = 0;
  var Constants = {
    /**
     * @name Two.NextFrameId
     * @property {Number}
     * @description The id of the next `requestAnimationFrame` function. Used to control the (or cancel) the default behavior of Two.js animation loops.
     */
    NextFrameId: null,
    // Primitive
    /**
     * @name Two.Types
     * @property {Object} - The different rendering types available in the library.
     */
    Types: {
      webgl: "WebGLRenderer",
      svg: "SVGRenderer",
      canvas: "CanvasRenderer"
    },
    /**
     * @name Two.Version
     * @property {String} - The current working version of the library.
     */
    Version: "v0.8.23",
    /**
     * @name Two.PublishDate
     * @property {String} - The automatically generated publish date in the build process to verify version release candidates.
     */
    PublishDate: "2026-01-05T18:28:31.207Z",
    /**
     * @name Two.Identifier
     * @property {String} - String prefix for all Two.js object's ids. This trickles down to SVG ids.
     */
    Identifier: "two-",
    /**
     * @name Two.Resolution
     * @property {Number} - Default amount of vertices to be used for interpreting Arcs and ArcSegments.
     */
    Resolution: 12,
    /**
     * @name Two.AutoCalculateImportedMatrices
     * @property {Boolean} - When importing SVGs through the {@link Two#interpret} and {@link Two#load}, this boolean determines whether Two.js infers and then overrides the exact transformation matrix of the reference SVG.
     * @nota-bene `false` copies the exact transformation matrix values, but also sets the path's `matrix.manual = true`.
     */
    AutoCalculateImportedMatrices: true,
    /**
     * @name Two.Instances
     * @property {Two[]} - Registered list of all Two.js instances in the current session.
     */
    Instances: [],
    /**
     * @function Two.uniqueId
     * @description Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
     * @returns {Number} Ever increasing Number.
     */
    uniqueId: function() {
      return count++;
    }
  };

  // src/utils/curves.js
  var Curve = {
    CollinearityEpsilon: Math.pow(10, -30),
    RecursionLimit: 16,
    CuspLimit: 0,
    Tolerance: {
      distance: 0.25,
      angle: 0,
      epsilon: Number.EPSILON
    },
    // Lookup tables for abscissas and weights with values for n = 2 .. 16.
    // As values are symmetric, only store half of them and adapt algorithm
    // to factor in symmetry.
    abscissas: [
      [0.5773502691896],
      [0, 0.7745966692415],
      [0.3399810435849, 0.8611363115941],
      [0, 0.5384693101057, 0.9061798459387],
      [0.2386191860832, 0.6612093864663, 0.9324695142032],
      [0, 0.4058451513774, 0.7415311855994, 0.9491079123428],
      [0.1834346424956, 0.5255324099163, 0.7966664774136, 0.9602898564975],
      [0, 0.3242534234038, 0.6133714327006, 0.8360311073266, 0.9681602395076],
      [
        0.1488743389816,
        0.4333953941292,
        0.679409568299,
        0.865063366689,
        0.9739065285172
      ],
      [
        0,
        0.2695431559523,
        0.5190961292068,
        0.730152005574,
        0.8870625997681,
        0.9782286581461
      ],
      [
        0.1252334085115,
        0.3678314989982,
        0.5873179542866,
        0.7699026741943,
        0.9041172563705,
        0.9815606342467
      ],
      [
        0,
        0.2304583159551,
        0.4484927510364,
        0.6423493394403,
        0.8015780907333,
        0.917598399223,
        0.9841830547186
      ],
      [
        0.1080549487073,
        0.3191123689279,
        0.5152486363582,
        0.6872929048117,
        0.8272013150698,
        0.9284348836636,
        0.9862838086968
      ],
      [
        0,
        0.2011940939974,
        0.3941513470776,
        0.5709721726085,
        0.7244177313602,
        0.8482065834104,
        0.9372733924007,
        0.9879925180205
      ],
      [
        0.0950125098376,
        0.2816035507793,
        0.4580167776572,
        0.6178762444026,
        0.755404408355,
        0.8656312023878,
        0.9445750230732,
        0.9894009349916
      ]
    ],
    weights: [
      [1],
      [0.8888888888889, 0.5555555555556],
      [0.6521451548625, 0.3478548451375],
      [0.5688888888889, 0.4786286704994, 0.2369268850562],
      [0.4679139345727, 0.3607615730481, 0.1713244923792],
      [0.4179591836735, 0.3818300505051, 0.2797053914893, 0.1294849661689],
      [0.3626837833784, 0.3137066458779, 0.2223810344534, 0.1012285362904],
      [
        0.3302393550013,
        0.31234707704,
        0.2606106964029,
        0.1806481606949,
        0.0812743883616
      ],
      [
        0.2955242247148,
        0.26926671931,
        0.219086362516,
        0.1494513491506,
        0.0666713443087
      ],
      [
        0.2729250867779,
        0.2628045445102,
        0.233193764592,
        0.1862902109277,
        0.1255803694649,
        0.0556685671162
      ],
      [
        0.2491470458134,
        0.2334925365384,
        0.2031674267231,
        0.1600783285433,
        0.1069393259953,
        0.0471753363865
      ],
      [
        0.2325515532309,
        0.2262831802629,
        0.2078160475369,
        0.1781459807619,
        0.1388735102198,
        0.0921214998377,
        0.0404840047653
      ],
      [
        0.2152638534632,
        0.2051984637213,
        0.1855383974779,
        0.1572031671582,
        0.1215185706879,
        0.0801580871598,
        0.0351194603318
      ],
      [
        0.2025782419256,
        0.1984314853271,
        0.1861610000156,
        0.166269205817,
        0.1395706779262,
        0.1071592204672,
        0.0703660474881,
        0.0307532419961
      ],
      [
        0.1894506104551,
        0.1826034150449,
        0.169156519395,
        0.1495959888166,
        0.1246289712555,
        0.0951585116825,
        0.0622535239386,
        0.0271524594118
      ]
    ]
  };
  function getComponentOnCubicBezier(t, a, b, c, d) {
    const k = 1 - t;
    return k * k * k * a + 3 * k * k * t * b + 3 * k * t * t * c + t * t * t * d;
  }
  function subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit) {
    limit = limit || Curve.RecursionLimit;
    const amount = limit + 1;
    if (Math.abs(x1 - x4) < 1e-3 && Math.abs(y1 - y4) < 1e-3) {
      return [new Anchor(x4, y4)];
    }
    const result = [];
    for (let i = 0; i < amount; i++) {
      const t = i / amount;
      const x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
      const y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
      result.push(new Anchor(x, y));
    }
    return result;
  }
  function getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit) {
    if (x1 === x2 && y1 === y2 && x3 === x4 && y3 === y4) {
      const dx = x4 - x1;
      const dy = y4 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
    const ax = 9 * (x2 - x3) + 3 * (x4 - x1), bx = 6 * (x1 + x3) - 12 * x2, cx = 3 * (x2 - x1), ay = 9 * (y2 - y3) + 3 * (y4 - y1), by = 6 * (y1 + y3) - 12 * y2, cy = 3 * (y2 - y1);
    function integrand(t) {
      const dx = (ax * t + bx) * t + cx, dy = (ay * t + by) * t + cy;
      return Math.sqrt(dx * dx + dy * dy);
    }
    return integrate(integrand, 0, 1, limit || Curve.RecursionLimit);
  }
  function getCurveBoundingBox(x1, y1, x2, y2, x3, y3, x4, y4) {
    const tvalues = [];
    const bounds = [[], []];
    let a, b, c, t, t1, t2, b2ac, sqrtb2ac;
    for (let i = 0; i < 2; ++i) {
      if (i === 0) {
        b = 6 * x1 - 12 * x2 + 6 * x3;
        a = -3 * x1 + 9 * x2 - 9 * x3 + 3 * x4;
        c = 3 * x2 - 3 * x1;
      } else {
        b = 6 * y1 - 12 * y2 + 6 * y3;
        a = -3 * y1 + 9 * y2 - 9 * y3 + 3 * y4;
        c = 3 * y2 - 3 * y1;
      }
      if (Math.abs(a) < 1e-3) {
        if (Math.abs(b) < 1e-3) {
          continue;
        }
        t = -c / b;
        if (0 < t && t < 1) {
          tvalues.push(t);
        }
        continue;
      }
      b2ac = b * b - 4 * c * a;
      sqrtb2ac = Math.sqrt(b2ac);
      if (b2ac < 0) {
        continue;
      }
      t1 = (-b + sqrtb2ac) / (2 * a);
      if (0 < t1 && t1 < 1) {
        tvalues.push(t1);
      }
      t2 = (-b - sqrtb2ac) / (2 * a);
      if (0 < t2 && t2 < 1) {
        tvalues.push(t2);
      }
    }
    let j = tvalues.length;
    let jlen = j;
    let mt;
    while (j--) {
      t = tvalues[j];
      mt = 1 - t;
      bounds[0][j] = mt * mt * mt * x1 + 3 * mt * mt * t * x2 + 3 * mt * t * t * x3 + t * t * t * x4;
      bounds[1][j] = mt * mt * mt * y1 + 3 * mt * mt * t * y2 + 3 * mt * t * t * y3 + t * t * t * y4;
    }
    bounds[0][jlen] = x1;
    bounds[1][jlen] = y1;
    bounds[0][jlen + 1] = x4;
    bounds[1][jlen + 1] = y4;
    bounds[0].length = bounds[1].length = jlen + 2;
    return {
      min: { x: Math.min.apply(0, bounds[0]), y: Math.min.apply(0, bounds[1]) },
      max: { x: Math.max.apply(0, bounds[0]), y: Math.max.apply(0, bounds[1]) }
    };
  }
  function integrate(f, a, b, n) {
    let x = Curve.abscissas[n - 2], w = Curve.weights[n - 2], A = 0.5 * (b - a), B = A + a, i = 0, m = n + 1 >> 1, sum = n & 1 ? w[i++] * f(B) : 0;
    while (i < m) {
      const Ax = A * x[i];
      sum += w[i++] * (f(B + Ax) + f(B - Ax));
    }
    return A * sum;
  }
  function getCurveFromPoints(points, closed2) {
    const l = points.length, last = l - 1;
    for (let i = 0; i < l; i++) {
      const point = points[i];
      const prev = closed2 ? mod(i - 1, l) : Math.max(i - 1, 0);
      const next = closed2 ? mod(i + 1, l) : Math.min(i + 1, last);
      const a = points[prev];
      const b = point;
      const c = points[next];
      getControlPoints(a, b, c);
      b.command = i === 0 ? Commands.move : Commands.curve;
    }
  }
  function getControlPoints(a, b, c) {
    const a1 = Vector.angleBetween(a, b);
    const a2 = Vector.angleBetween(c, b);
    let d1 = Vector.distanceBetween(a, b);
    let d2 = Vector.distanceBetween(c, b);
    let mid = (a1 + a2) / 2;
    if (d1 < 1e-3 || d2 < 1e-3) {
      if (typeof b.relative === "boolean" && !b.relative) {
        b.controls.left.copy(b);
        b.controls.right.copy(b);
      }
      return b;
    }
    d1 *= 0.33;
    d2 *= 0.33;
    if (a2 < a1) {
      mid += HALF_PI;
    } else {
      mid -= HALF_PI;
    }
    b.controls.left.x = Math.cos(mid) * d1;
    b.controls.left.y = Math.sin(mid) * d1;
    mid -= Math.PI;
    b.controls.right.x = Math.cos(mid) * d2;
    b.controls.right.y = Math.sin(mid) * d2;
    if (typeof b.relative === "boolean" && !b.relative) {
      b.controls.left.x += b.x;
      b.controls.left.y += b.y;
      b.controls.right.x += b.x;
      b.controls.right.y += b.y;
    }
    return b;
  }
  function getReflection(a, b, relative) {
    return new Vector(
      2 * a.x - (b.x + a.x) - (relative ? a.x : 0),
      2 * a.y - (b.y + a.y) - (relative ? a.y : 0)
    );
  }
  function getAnchorsFromArcData(center, xAxisRotation, rx, ry, ts, td, ccw) {
    const resolution = Constants.Resolution;
    const anchors = [];
    for (let i = 0; i < resolution; i++) {
      let pct = (i + 1) / resolution;
      if (ccw) {
        pct = 1 - pct;
      }
      const theta = pct * td + ts;
      const x = rx * Math.cos(theta);
      const y = ry * Math.sin(theta);
      const anchor2 = new Anchor(x, y);
      anchor2.command = Commands.line;
      anchors.push(anchor2);
    }
  }

  // src/utils/underscore.js
  var slice = Array.prototype.slice;
  function isArrayLike(collection) {
    if (collection === null || collection === void 0) return false;
    const length = collection.length;
    return typeof length == "number" && length >= 0 && length < 4294967296;
  }
  var _ = {
    isNaN: function(obj) {
      return typeof obj === "number" && obj !== +obj;
    },
    isElement: function(obj) {
      return !!(obj && obj.nodeType === 1);
    },
    isObject: function(obj) {
      const type = typeof obj;
      return type === "function" || type === "object" && !!obj;
    },
    isFunction: function(obj) {
      return typeof obj === "function";
    },
    extend: function(base) {
      const sources = slice.call(arguments, 1);
      for (let i = 0; i < sources.length; i++) {
        const obj = sources[i];
        for (let k in obj) {
          base[k] = obj[k];
        }
      }
      return base;
    },
    defaults: function(base) {
      const sources = slice.call(arguments, 1);
      for (let i = 0; i < sources.length; i++) {
        const obj = sources[i];
        for (let k in obj) {
          if (base[k] === void 0) {
            base[k] = obj[k];
          }
        }
      }
      return base;
    },
    each: function(obj, iteratee, context) {
      const ctx = context || this;
      const keys = !isArrayLike(obj) && Object.keys(obj);
      const length = (keys || obj).length;
      for (let i = 0; i < length; i++) {
        const k = keys ? keys[i] : i;
        iteratee.call(ctx, obj[k], k, obj);
      }
      return obj;
    },
    /**
     * @name Two.Utils.performance
     * @property {Date} - A special `Date` like object to get the current millis of the session. Used internally to calculate time between frames.
     * e.g: `Utils.performance.now() // milliseconds since epoch`
     */
    performance: root.performance && root.performance.now ? root.performance : Date
  };

  // src/utils/dom.js
  var dom = {
    hasEventListeners: typeof root.addEventListener === "function",
    bind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.addEventListener(event, func, !!bool);
      } else {
        elem.attachEvent("on" + event, func);
      }
      return dom;
    },
    unbind: function(elem, event, func, bool) {
      if (dom.hasEventListeners) {
        elem.removeEventListeners(event, func, !!bool);
      } else {
        elem.detachEvent("on" + event, func);
      }
      return dom;
    },
    getRequestAnimationFrame: function() {
      const vendors = ["ms", "moz", "webkit", "o"];
      let lastTime = 0;
      let request = root.requestAnimationFrame;
      if (!request) {
        for (let i = 0; i < vendors.length; i++) {
          request = root[vendors[i] + "RequestAnimationFrame"] || request;
        }
        request = request || fallbackRequest;
      }
      function fallbackRequest(callback, element) {
        const currTime = (/* @__PURE__ */ new Date()).getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = root.setTimeout(nextRequest, timeToCall);
        lastTime = currTime + timeToCall;
        function nextRequest() {
          callback(currTime + timeToCall);
        }
        return id;
      }
      return request;
    }
  };
  var temp = root.document ? root.document.createElement("div") : {};
  temp.id = "help-two-load";
  Object.defineProperty(dom, "temp", {
    enumerable: true,
    get: function() {
      if (_.isElement(temp) && !root.document.head.contains(temp)) {
        temp.style.display = "none";
        root.document.head.appendChild(temp);
      }
      return temp;
    }
  });

  // src/utils/error.js
  var TwoError = class extends Error {
    name = "Two.js";
    message;
    constructor(message) {
      super();
      this.message = message;
    }
  };

  // src/utils/device-pixel-ratio.js
  var devicePixelRatio = root.devicePixelRatio || 1;
  function getBackingStoreRatio(ctx) {
    return ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  }
  function getRatio(ctx) {
    return devicePixelRatio / getBackingStoreRatio(ctx);
  }

  // src/registry.js
  var Registry = class {
    map = {};
    constructor() {
    }
    /**
     * @name Two.Registry#add
     * @function
     * @param {String} id - A unique identifier.
     * @param obj - Any type of variable to be registered to the directory.
     * @description Adds any value to the directory. Assigned by the `id`.
     */
    add(id, obj) {
      this.map[id] = obj;
      return this;
    }
    /**
     * @name Two.Registry#remove
     * @function
     * @param {String} id - A unique identifier.
     * @description Remove any value from the directory by its `id`.
     */
    remove(id) {
      delete this.map[id];
      return this;
    }
    /**
     * @name Two.Registry#get
     * @function
     * @param {String} id - A unique identifier.
     * @returns {?Object} The associated value. If unavailable then `undefined` is returned.
     * @description Get a registered value by its `id`.
     */
    get(id) {
      return this.map[id];
    }
    /**
     * @name Two.Registry#contains
     * @function
     * @param {String} id - A unique identifier.
     * @returns {Boolean}
     * @description Convenience method to see if a value is registered to an `id` already.
     */
    contains(id) {
      return id in this.map;
    }
  };

  // src/collection.js
  var Collection = class extends Array {
    // Warning: Multiple inheritance hack
    /**
     * @private
     */
    #events = new Events();
    // N.B: Technique to disable enumeration on object
    get _events() {
      return this.#events;
    }
    set _events(e) {
      this.#events = e;
    }
    // Getters and setters aren't enumerable
    get _bound() {
      return this.#events._bound;
    }
    set _bound(v) {
      this.#events._bound = v;
    }
    addEventListener() {
      return this.#events.addEventListener?.apply(this, arguments);
    }
    on() {
      return this.#events.on?.apply(this, arguments);
    }
    bind() {
      return this.#events.bind?.apply(this, arguments);
    }
    removeEventListener() {
      return this.#events.removeEventListener?.apply(this, arguments);
    }
    off() {
      return this.#events.off?.apply(this, arguments);
    }
    unbind() {
      return this.#events.unbind?.apply(this, arguments);
    }
    dispatchEvent() {
      return this.#events.dispatchEvent?.apply(this, arguments);
    }
    trigger() {
      return this.#events.trigger?.apply(this, arguments);
    }
    listen() {
      return this.#events.listen?.apply(this, arguments);
    }
    ignore() {
      return this.#events.ignore?.apply(this, arguments);
    }
    constructor() {
      super();
      if (arguments[0] && Array.isArray(arguments[0])) {
        if (arguments[0].length > 0) {
          this.push.apply(this, arguments[0]);
        }
      } else if (arguments.length > 0) {
        this.push.apply(this, arguments);
      }
    }
    pop() {
      const popped = super.pop.apply(this, arguments);
      this.trigger(Events.Types.remove, [popped]);
      return popped;
    }
    shift() {
      const shifted = super.shift.apply(this, arguments);
      this.trigger(Events.Types.remove, [shifted]);
      return shifted;
    }
    push() {
      const pushed = super.push.apply(this, arguments);
      this.trigger(Events.Types.insert, arguments);
      return pushed;
    }
    unshift() {
      const unshifted = super.unshift.apply(this, arguments);
      this.trigger(Events.Types.insert, arguments);
      return unshifted;
    }
    splice() {
      const spliced = super.splice.apply(this, arguments);
      this.trigger(Events.Types.remove, spliced);
      if (arguments.length > 2) {
        const inserted = this.slice(
          arguments[0],
          arguments[0] + arguments.length - 2
        );
        this.trigger(Events.Types.insert, inserted);
        this.trigger(Events.Types.order);
      }
      return spliced;
    }
    sort() {
      super.sort.apply(this, arguments);
      this.trigger(Events.Types.order);
      return this;
    }
    reverse() {
      super.reverse.apply(this, arguments);
      this.trigger(Events.Types.order);
      return this;
    }
    indexOf() {
      return super.indexOf.apply(this, arguments);
    }
    map(func, scope) {
      const results = [];
      for (let key = 0; key < this.length; key++) {
        const value = this[key];
        let result;
        if (scope) {
          result = func.call(scope, value, key);
        } else {
          result = func(value, key);
        }
        results.push(result);
      }
      return results;
    }
  };

  // src/element.js
  var Element = class _Element extends Events {
    /**
     * @name Two.Element#_flagId
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Element#id} needs updating.
     */
    _flagId = false;
    /**
     * @name Two.Element#_flagClassName
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#className} need updating.
     */
    _flagClassName = false;
    /**
     * @name Two.Element#renderer
     * @property {Object} - Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
     * @nota-bene With the {@link Two.SVGRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
     */
    _renderer = {};
    /**
     * @name Two.Element#id
     * @property {String} - Session specific unique identifier.
     * @nota-bene In the {@link Two.SVGRenderer} change this to change the underlying SVG element's id too.
     */
    _id = Constants.Identifier + Constants.uniqueId();
    /**
     * @name Two.Element#className
     * @property {String} - A class to be applied to the element to be compatible with CSS styling.
     * @nota-bene Only rendered to DOM in the SVG renderer.
     */
    _className = "";
    /**
     * @name Two.Element#classList
     * @property {String[]}
     * @description A list of class strings stored if imported / interpreted  from an SVG element.
     */
    classList = [];
    constructor() {
      super();
      for (let prop in proto3) {
        Object.defineProperty(this, prop, proto3[prop]);
      }
    }
    static Properties = ["renderer", "id", "className"];
    /**
     * @name Two.Element.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Element} to create a new instance
     * @returns {Two.Element}
     * @description Create a new {@link Two.Element} from an object notation of a {@link Two.Element}.
     * @nota-bene Works in conjunction with {@link Two.Element#toObject}
     */
    static fromObject(obj) {
      const elem = new _Element().copy(obj);
      if ("id" in obj) {
        elem.id = obj.id;
      }
      return elem;
    }
    /**
     * @name Two.Element#flagReset
     * @function
     * @description Called internally by Two.js's renderer to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagId = this._flagClassName = false;
      return this;
    }
    copy(element) {
      if (element.renderer && typeof element.renderer.type === "string") {
        this.renderer.type = element.renderer.type;
      }
      if (typeof element.className === "string") {
        this.className = element.className;
      }
      return this;
    }
    toObject() {
      return {
        renderer: { type: this.renderer.type },
        id: this.id,
        className: this.className
      };
    }
    /**
     * @name Two.Element#dispose
     * @function
     * @description Release the element's renderer object and detach any events.
     * This cleans up renderer-specific resources and unbinds all event listeners.
     */
    dispose() {
      if (typeof this.unbind === "function") {
        this.unbind();
      }
      if (this._renderer) {
        if (this._renderer.elem && this._renderer.elem.parentNode) {
          this._renderer.elem.parentNode.removeChild(this._renderer.elem);
          delete this._renderer.elem;
        }
        if (this.type === "WebGLRenderer" && this.renderer.ctx) {
          const gl = this.renderer.ctx;
          if (this._renderer.texture) {
            gl.deleteTexture(this._renderer.texture);
            delete this._renderer.texture;
          }
          if (this._renderer.positionBuffer) {
            gl.deleteBuffer(this._renderer.positionBuffer);
            delete this._renderer.positionBuffer;
          }
          if (this._renderer.effect) {
            this._renderer.effect = null;
          }
        }
        if (this.type === "CanvasRenderer" && this._renderer.context) {
          delete this._renderer.context;
        }
      }
      const rendererType = this._renderer.type;
      this._renderer = { type: rendererType };
      return this;
    }
  };
  var proto3 = {
    renderer: {
      enumerable: false,
      get: function() {
        return this._renderer;
      }
    },
    id: {
      enumerable: true,
      get: function() {
        return this._id;
      },
      set: function(v) {
        const id = this._id;
        if (v === this._id) {
          return;
        }
        this._id = v;
        this._flagId = true;
        if (this.parent) {
          delete this.parent.children.ids[id];
          this.parent.children.ids[this._id] = this;
        }
      }
    },
    className: {
      enumerable: true,
      get: function() {
        return this._className;
      },
      set: function(v) {
        if (this._className !== v) {
          this._flagClassName = true;
          this.classList = v.split(/\s+?/);
          this._className = v;
        }
      }
    }
  };

  // src/effects/texture.js
  var anchor;
  var regex = {
    video: /\.(mp4|webm|ogg)$/i,
    image: /\.(jpe?g|png|gif|tiff|webp)$/i,
    effect: /texture|gradient/i
  };
  if (root.document) {
    anchor = document.createElement("a");
  }
  var Texture = class _Texture extends Element {
    /**
     * @name Two.Texture#_flagSrc
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Texture#src} needs updating.
     */
    _flagSrc = false;
    /**
     * @name Two.Texture#_flagImage
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Texture#image} needs updating.
     */
    _flagImage = false;
    /**
     * @name Two.Texture#_flagVideo
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Texture#video} needs updating.
     */
    _flagVideo = false;
    /**
     * @name Two.Texture#_flagLoaded
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Texture#loaded} needs updating.
     */
    _flagLoaded = false;
    /**
     * @name Two.Texture#_flagRepeat
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Texture#repeat} needs updating.
     */
    _flagRepeat = false;
    /**
     * @name Two.Texture#_flagOffset
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Texture#offset} needs updating.
     */
    _flagOffset = false;
    /**
     * @name Two.Texture#_flagScale
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Texture#scale} needs updating.
     */
    _flagScale = false;
    /**
     * @name Two.Texture#_src
     * @private
     * @see {@link Two.Texture#src}
     */
    _src = "";
    /**
     * @name Two.Texture#_image
     * @private
     * @see {@link Two.Texture#image}
     */
    _image = null;
    /**
     * @name Two.Texture#_loaded
     * @private
     * @see {@link Two.Texture#loaded}
     */
    _loaded = false;
    /**
     * @name Two.Texture#_repeat
     * @private
     * @see {@link Two.Texture#repeat}
     */
    _repeat = "no-repeat";
    /**
     * @name Two.Texture#_scale
     * @private
     * @see {@link Two.Texture#scale}
     */
    _scale = 1;
    /**
     * @name Two.Texture#_offset
     * @private
     * @see {@link Two.Texture#offset}
     */
    _offset = null;
    constructor(src, callback) {
      super();
      for (let prop in proto4) {
        Object.defineProperty(this, prop, proto4[prop]);
      }
      this._renderer.type = "texture";
      this._renderer.flagOffset = FlagOffset.bind(this);
      this._renderer.flagScale = FlagScale.bind(this);
      this.loaded = false;
      this.repeat = "no-repeat";
      this.offset = new Vector();
      if (typeof callback === "function") {
        const loaded = function() {
          this.unbind(Events.Types.load, loaded);
          if (typeof callback === "function") {
            callback();
          }
        }.bind(this);
        this.bind(Events.Types.load, loaded);
      }
      if (typeof src === "string") {
        this.src = src;
      } else if (typeof src === "object") {
        const elemString = Object.prototype.toString.call(src);
        if (elemString === "[object HTMLImageElement]" || elemString === "[object HTMLCanvasElement]" || elemString === "[object HTMLVideoElement]" || elemString === "[object Image]") {
          this.image = src;
        }
      }
      this._update();
    }
    /**
     * @name Two.Texture.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Texture}.
     */
    static Properties = ["src", "loaded", "repeat", "scale", "offset", "image"];
    /**
     * @name Two.Texture.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Texture} to create a new instance
     * @returns {Two.Texture}
     * @description Create a new {@link Two.Texture} from an object notation of a {@link Two.Texture}.
     * @nota-bene Works in conjunction with {@link Two.Texture#toObject}
     */
    fromObject(obj) {
      const texture = new _Texture().copy(obj);
      if ("id" in obj) {
        texture.id = obj.id;
      }
      return texture;
    }
    /**
     * @name Two.Texture.RegularExpressions
     * @property {Object} - A map of compatible DOM Elements categorized by media format.
     */
    static RegularExpressions = regex;
    /**
     * @name Two.Texture.ImageRegistry
     * @property {Two.Registry} - A canonical listing of image data used in a single session of Two.js.
     * @nota-bene This object is used to cache image data between different textures.
     */
    static ImageRegistry = new Registry();
    /**
     * @name Two.Texture.getAbsoluteURL
     * @property {Function} - Serializes a URL as an absolute path for canonical attribution in {@link Two.Texture.ImageRegistry}.
     * @param {String} path
     * @returns {String} - The serialized absolute path.
     */
    static getAbsoluteURL(path) {
      if (!anchor) {
        return path;
      }
      anchor.href = path;
      return anchor.href;
    }
    /**
     * @name Two.Texture.loadHeadlessBuffer
     * @property {Function} - Loads an image as a buffer in headless environments.
     * @param {Two.Texture} texture - The {@link Two.Texture} to be loaded.
     * @param {Function} onLoad - The callback function to be triggered once the image is loaded.
     * @nota-bene - This function uses node's `fs.readFileSync` to spoof the `<img />` loading process in the browser.
     */
    static loadHeadlessBuffer(texture, onLoad) {
      texture.image.onload = onLoad;
      texture.image.src = texture.src;
    }
    /**
     * @name Two.Texture.getTag
     * @property {Function} - Retrieves the tag name of an image, video, or canvas node.
     * @param {HTMLImageElement} image - The image to infer the tag name from.
     * @returns {String} - Returns the tag name of an image, video, or canvas node.
     */
    static getTag(image) {
      return image && image.nodeName && image.nodeName.toLowerCase() || // Headless environments
      "img";
    }
    /**
     * @name Two.Texture.getImage
     * @property {Function} - Convenience function to set {@link Two.Texture#image} properties with canonical versions set in {@link Two.Texture.ImageRegistry}.
     * @param {String} src - The URL path of the image.
     * @returns {HTMLImageElement} - Returns either a cached version of the image or a new one that is registered in {@link Two.Texture.ImageRegistry}.
     */
    static getImage(src) {
      const absoluteSrc = _Texture.getAbsoluteURL(src);
      if (_Texture.ImageRegistry.contains(absoluteSrc)) {
        return _Texture.ImageRegistry.get(absoluteSrc);
      }
      let image;
      if (CanvasPolyfill.Image) {
        image = new CanvasPolyfill.Image();
        CanvasPolyfill.shim(image, "img");
      } else if (root.document) {
        if (regex.video.test(absoluteSrc)) {
          image = document.createElement("video");
        } else {
          image = document.createElement("img");
        }
      } else {
        console.warn("Two.js: no prototypical image defined for Two.Texture");
      }
      image.crossOrigin = "anonymous";
      image.referrerPolicy = "no-referrer";
      return image;
    }
    /**
     * @name Two.Texture.Register
     * @interface
     * @description A collection of functions to register different types of textures. Used internally by a {@link Two.Texture}.
     */
    static Register = {
      canvas: function(texture, callback) {
        texture._src = "#" + texture.id;
        _Texture.ImageRegistry.add(texture.src, texture.image);
        if (typeof callback === "function") {
          callback();
        }
      },
      img: function(texture, callback) {
        const image = texture.image;
        const loaded = function(e) {
          if (!CanvasPolyfill.isHeadless && image.removeEventListener && typeof image.removeEventListener === "function") {
            image.removeEventListener("load", loaded, false);
            image.removeEventListener("error", error, false);
          }
          if (typeof callback === "function") {
            callback();
          }
        };
        const error = function(e) {
          if (!CanvasPolyfill.isHeadless && typeof image.removeEventListener === "function") {
            image.removeEventListener("load", loaded, false);
            image.removeEventListener("error", error, false);
          }
          throw new TwoError("unable to load " + texture.src);
        };
        if (typeof image.width === "number" && image.width > 0 && typeof image.height === "number" && image.height > 0) {
          loaded();
        } else if (!CanvasPolyfill.isHeadless && typeof image.addEventListener === "function") {
          image.addEventListener("load", loaded, false);
          image.addEventListener("error", error, false);
        }
        texture._src = _Texture.getAbsoluteURL(texture._src);
        if (!CanvasPolyfill.isHeadless && image && image.getAttribute("two-src")) {
          return;
        }
        if (!CanvasPolyfill.isHeadless) {
          image.setAttribute("two-src", texture.src);
        }
        _Texture.ImageRegistry.add(texture.src, image);
        if (CanvasPolyfill.isHeadless) {
          _Texture.loadHeadlessBuffer(texture, loaded);
        } else {
          texture.image.src = texture.src;
        }
      },
      video: function(texture, callback) {
        if (CanvasPolyfill.isHeadless) {
          throw new TwoError(
            "video textures are not implemented in headless environments."
          );
        }
        const loaded = function(e) {
          texture.image.removeEventListener("canplaythrough", loaded, false);
          texture.image.removeEventListener("error", error, false);
          texture.image.width = texture.image.videoWidth;
          texture.image.height = texture.image.videoHeight;
          if (typeof callback === "function") {
            callback();
          }
        };
        const error = function(e) {
          texture.image.removeEventListener("canplaythrough", loaded, false);
          texture.image.removeEventListener("error", error, false);
          throw new TwoError("unable to load " + texture.src);
        };
        texture._src = _Texture.getAbsoluteURL(texture._src);
        if (!texture.image.getAttribute("two-src")) {
          texture.image.setAttribute("two-src", texture.src);
          _Texture.ImageRegistry.add(texture.src, texture.image);
        }
        if (texture.image.readyState >= 4) {
          loaded();
        } else {
          texture.image.addEventListener("canplaythrough", loaded, false);
          texture.image.addEventListener("error", error, false);
          texture.image.src = texture.src;
          texture.image.load();
        }
      }
    };
    /**
     * @name Two.Texture.load
     * @function
     * @param {Two.Texture} texture - The texture to load.
     * @param {Function} callback - The function to be called once the texture is loaded.
     */
    static load(texture, callback) {
      let image = texture.image;
      let tag = _Texture.getTag(image);
      if (texture._flagImage) {
        if (/canvas/i.test(tag)) {
          _Texture.Register.canvas(texture, callback);
        } else {
          texture._src = !CanvasPolyfill.isHeadless && image.getAttribute("two-src") || image.src;
          _Texture.Register[tag](texture, callback);
        }
      }
      if (texture._flagSrc) {
        if (!image) {
          image = _Texture.getImage(texture.src);
          texture.image = image;
        }
        tag = _Texture.getTag(image);
        _Texture.Register[tag](texture, callback);
      }
    }
    /**
     * @name Two.Texture#clone
     * @function
     * @returns {Two.Texture}
     * @description Create a new instance of {@link Two.Texture} with the same properties of the current texture.
     */
    clone() {
      const clone = new _Texture(this.src);
      clone.repeat = this.repeat;
      clone.offset.copy(this.offset);
      clone.scale = this.scale;
      return clone;
    }
    /**
     * @name Two.Texture#copy
     * @function
     * @param {Two.Texture} texture - The reference {@link Two.Texture}
     * @description Copy the properties of one {@link Two.Texture} onto another.
     */
    copy(texture) {
      this.src = texture.src;
      this.repeat = texture.repeat;
      this.offset = typeof texture.offset === "number" || texture.offset instanceof Vector ? texture.offset : new Vector().copy(texture.offset);
      this.scale = typeof texture.scale === "number" || texture.scale instanceof Vector ? texture.scale : new Vector().copy(texture.scale);
      return this;
    }
    /**
     * @name Two.Texture#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the texture.
     */
    toObject() {
      const result = super.toObject.call(this);
      result.renderer.type = "texture";
      result.src = this.src;
      result.repeat = this.repeat;
      result.offset = this.offset.toObject();
      result.scale = typeof this.scale === "number" ? this.scale : this.scale.toObject();
      return result;
    }
    /**
     * @name Two.Texture#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagSrc || this._flagImage) {
        this.trigger(Events.Types.change);
        if (this._flagSrc || this._flagImage) {
          this.loaded = false;
          _Texture.load(
            this,
            function() {
              this.loaded = true;
              this.trigger(Events.Types.change).trigger(Events.Types.load);
            }.bind(this)
          );
        }
      }
      if (this._image && this._image.readyState >= 4) {
        this._flagVideo = true;
      }
      return this;
    }
    /**
     * @name Two.Texture#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagSrc = this._flagImage = this._flagLoaded = this._flagRepeat = this._flagVideo = this._flagScale = this._flagOffset = false;
      super.flagReset.call(this);
      return this;
    }
    /**
     * @name Two.Texture#dispose
     * @function
     * @description Detach instance from renderer including any `<defs />` or textures stored in memory.
     */
    dispose() {
      super.dispose();
      if ("elem" in this._renderer) {
        const elem = this._renderer.elem;
        elem.parentNode.removeChild(elem);
      }
      if ("effect" in this._renderer) {
        this._renderer.effect = null;
      }
      return this;
    }
  };
  var proto4 = {
    src: {
      enumerable: true,
      get: function() {
        return this._src;
      },
      set: function(v) {
        this._src = v;
        this._flagSrc = true;
      }
    },
    loaded: {
      enumerable: true,
      get: function() {
        return this._loaded;
      },
      set: function(v) {
        this._loaded = v;
        this._flagLoaded = true;
      }
    },
    repeat: {
      enumerable: true,
      get: function() {
        return this._repeat;
      },
      set: function(v) {
        this._repeat = v;
        this._flagRepeat = true;
      }
    },
    image: {
      enumerable: true,
      get: function() {
        return this._image;
      },
      set: function(image) {
        const tag = Texture.getTag(image);
        let index;
        switch (tag) {
          case "canvas":
            index = "#" + image.id;
            break;
          default:
            index = image.src;
        }
        if (Texture.ImageRegistry.contains(index)) {
          this._image = Texture.ImageRegistry.get(image.src);
        } else {
          this._image = image;
        }
        this._flagImage = true;
      }
    },
    offset: {
      enumerable: true,
      get: function() {
        return this._offset;
      },
      set: function(v) {
        if (this._offset) {
          this._offset.unbind(Events.Types.change, this._renderer.flagOffset);
        }
        this._offset = v;
        this._offset.bind(Events.Types.change, this._renderer.flagOffset);
        this._flagOffset = true;
      }
    },
    scale: {
      enumerable: true,
      get: function() {
        return this._scale;
      },
      set: function(v) {
        if (this._scale instanceof Vector) {
          this._scale.unbind(Events.Types.change, this._renderer.flagScale);
        }
        this._scale = v;
        if (this._scale instanceof Vector) {
          this._scale.bind(Events.Types.change, this._renderer.flagScale);
        }
        this._flagScale = true;
      }
    }
  };
  function FlagOffset() {
    this._flagOffset = true;
  }
  function FlagScale() {
    this._flagScale = true;
  }

  // src/effects/stop.js
  var Stop = class _Stop extends Element {
    /**
     * @name Two.Stop#_flagOffset
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Stop#offset} needs updating.
     */
    _flagOffset = true;
    /**
     * @name Two.Stop#_flagOpacity
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Stop#opacity} needs updating.
     */
    _flagOpacity = true;
    /**
     * @name Two.Stop#_flagColor
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Stop#color} needs updating.
     */
    _flagColor = true;
    /**
     * @name Two.Stop#_offset
     * @private
     * @see {@link Two.Stop#offset}
     */
    _offset = 0;
    /**
     * @name Two.Stop#_opacity
     * @private
     * @see {@link Two.Stop#opacity}
     */
    _opacity = 1;
    /**
     * @name Two.Stop#_color
     * @private
     * @see {@link Two.Stop#color}
     */
    _color = "#fff";
    constructor(offset, color, opacity) {
      super();
      for (let prop in proto5) {
        Object.defineProperty(this, prop, proto5[prop]);
      }
      this._renderer.type = "stop";
      this.offset = typeof offset === "number" ? offset : _Stop.Index <= 0 ? 0 : 1;
      this.opacity = typeof opacity === "number" ? opacity : 1;
      this.color = typeof color === "string" ? color : _Stop.Index <= 0 ? "#fff" : "#000";
      _Stop.Index = (_Stop.Index + 1) % 2;
    }
    /**
     * @name Two.Stop.Index
     * @property {Number} - The current index being referenced for calculating a stop's default offset value.
     */
    static Index = 0;
    /**
     * @name Two.Stop.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Stop}.
     */
    static Properties = ["offset", "opacity", "color"];
    /**
     * @name Two.Stop.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Stop} to create a new instance
     * @returns {Two.Stop}
     * @description Create a new {@link Two.Stop} from an object notation of a {@link Two.Stop}.
     * @nota-bene Works in conjunction with {@link Two.Stop#toObject}
     */
    static fromObject(obj) {
      const stop = new _Stop().copy(obj);
      if ("id" in obj) {
        stop.id = obj.id;
      }
      return stop;
    }
    /**
     * @name Two.Stop#copy
     * @function
     * @param {Two.Stop} stop - The reference {@link Two.Stop}
     * @description Copy the properties of one {@link Two.Stop} onto another.
     */
    copy(stop) {
      super.copy.call(this, stop);
      for (let i = 0; i < _Stop.Properties.length; i++) {
        const k = _Stop.Properties[i];
        if (k in stop) {
          this[k] = stop[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Stop#clone
     * @function
     * @param {Two.Gradient} [parent] - The parent gradient to add the clone to.
     * @returns {Two.Stop}
     * @description Create a new instance of {@link Two.Stop} with the same properties of the current path.
     */
    clone(parent) {
      const clone = new _Stop();
      _.each(
        _Stop.Properties,
        function(property) {
          clone[property] = this[property];
        },
        this
      );
      if (parent && parent.stops) {
        parent.stops.push(clone);
      }
      return clone;
    }
    /**
     * @name Two.Stop#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const result = super.toObject.call(this);
      result.renderer.type = "stop";
      _.each(
        _Stop.Properties,
        (k) => {
          result[k] = this[k];
        },
        this
      );
      return result;
    }
    /**
     * @name Two.Stop#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagOffset = this._flagColor = this._flagOpacity = false;
      super.flagReset.call(this);
      return this;
    }
  };
  var proto5 = {
    offset: {
      enumerable: true,
      get: function() {
        return this._offset;
      },
      set: function(v) {
        this._offset = v;
        this._flagOffset = true;
        if (this.parent) {
          this.parent._flagStops = true;
        }
      }
    },
    opacity: {
      enumerable: true,
      get: function() {
        return this._opacity;
      },
      set: function(v) {
        this._opacity = v;
        this._flagOpacity = true;
        if (this.parent) {
          this.parent._flagStops = true;
        }
      }
    },
    color: {
      enumerable: true,
      get: function() {
        return this._color;
      },
      set: function(v) {
        this._color = v;
        this._flagColor = true;
        if (this.parent) {
          this.parent._flagStops = true;
        }
      }
    }
  };

  // src/effects/gradient.js
  var Gradient = class _Gradient extends Element {
    _flagStops = false;
    _flagSpread = false;
    _flagUnits = false;
    _spread = "";
    _units = "";
    constructor(stops) {
      super();
      for (let prop in proto6) {
        Object.defineProperty(this, prop, proto6[prop]);
      }
      this._renderer.type = "gradient";
      this._renderer.flagStops = FlagStops.bind(this);
      this._renderer.bindStops = BindStops.bind(this);
      this._renderer.unbindStops = UnbindStops.bind(this);
      this.spread = "pad";
      this.units = "objectBoundingBox";
      if (stops) {
        this.stops = stops;
      }
    }
    /**
     * @name Two.Gradient.Stop
     * @see {@link Two.Stop}
     */
    static Stop = Stop;
    /**
     * @name Two.Gradient.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Gradient}.
     */
    static Properties = ["spread", "stops", "units"];
    /**
     * @name Two.Gradient.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Gradient} to create a new instance
     * @returns {Two.Gradient}
     * @description Create a new {@link Two.Gradient} from an object notation of a {@link Two.Gradient}.
     * @nota-bene Works in conjunction with {@link Two.Gradient#toObject}
     */
    static fromObject(obj) {
      let stops = obj.stops;
      if (stops && stops.length > 0) {
        stops = stops.map((o) => o instanceof Stop ? o : new Stop().copy(o));
      }
      const gradient = new _Gradient(stops).copy(obj);
      if ("id" in obj) {
        gradient.id = obj.id;
      }
      return gradient;
    }
    /**
     * @name Two.Gradient#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Gradient}
     * @description Create a new instance of {@link Two.Gradient} with the same properties of the current path.
     */
    clone(parent) {
      const stops = this.stops.map((s) => {
        return s.clone();
      });
      const clone = new _Gradient(stops);
      _.each(
        _Gradient.Properties,
        (k) => {
          clone[k] = this[k];
        },
        this
      );
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.Gradient#copy
     * @function
     * @param {Two.Gradient} gradient - The reference {@link Two.Gradient}
     * @description Copy the properties of one {@link Two.Gradient} onto another.
     */
    copy(gradient) {
      super.copy.call(this, gradient);
      for (let i = 0; i < _Gradient.Properties.length; i++) {
        const k = _Gradient.Properties[i];
        if (k in gradient) {
          this[k] = gradient[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Gradient#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const result = {
        stops: this.stops.map((s) => {
          return s.toObject();
        })
      };
      _.each(
        _Gradient.Properties,
        (k) => {
          result[k] = this[k];
        },
        this
      );
      return result;
    }
    /**
     * @name Two.Gradient#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagSpread || this._flagStops) {
        this.trigger(Events.Types.change);
      }
      return this;
    }
    /**
     * @name Two.Gradient#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagSpread = this._flagUnits = this._flagStops = false;
      super.flagReset.call(this);
      return this;
    }
    /**
     * @name Two.Gradient#dispose
     * @function
     * @description Detach instance from renderer including any `<defs />` or textures stored in memory.
     */
    dispose() {
      if ("elem" in this._renderer) {
        const elem = this._renderer.elem;
        elem.parentNode.removeChild(elem);
      }
      if ("effect" in this._renderer) {
        this._renderer.effect = null;
      }
      return this;
    }
  };
  var proto6 = {
    spread: {
      enumerable: true,
      get: function() {
        return this._spread;
      },
      set: function(v) {
        this._spread = v;
        this._flagSpread = true;
      }
    },
    units: {
      enumerable: true,
      get: function() {
        return this._units;
      },
      set: function(v) {
        this._units = v;
        this._flagUnits = true;
      }
    },
    stops: {
      enumerable: true,
      get: function() {
        return this._stops;
      },
      set: function(stops) {
        const bindStops = this._renderer.bindStops;
        const unbindStops = this._renderer.unbindStops;
        if (this._stops) {
          this._stops.unbind(Events.Types.insert, bindStops).unbind(Events.Types.remove, unbindStops);
        }
        this._stops = new Collection((stops || []).slice(0));
        this._stops.bind(Events.Types.insert, bindStops).bind(Events.Types.remove, unbindStops);
        bindStops(this._stops);
      }
    }
  };
  function FlagStops() {
    this._flagStops = true;
  }
  function BindStops(items) {
    let i = items.length;
    while (i--) {
      items[i].bind(Events.Types.change, this._renderer.flagStops);
      items[i].parent = this;
    }
    this._renderer.flagStops();
  }
  function UnbindStops(items) {
    let i = items.length;
    while (i--) {
      items[i].unbind(Events.Types.change, this._renderer.flagStops);
      delete items[i].parent;
    }
    this._renderer.flagStops();
  }

  // src/effects/linear-gradient.js
  var LinearGradient = class _LinearGradient extends Gradient {
    /**
     * @name Two.LinearGradient#_flagEndPoints
     * @private
     * @property {Boolean} - Determines whether the {@link Two.LinearGradient#left} or {@link Two.LinearGradient#right} changed and needs to update.
     */
    _flagEndPoints = false;
    _left = null;
    _right = null;
    constructor(x1, y1, x2, y2, stops) {
      super(stops);
      for (let prop in proto7) {
        Object.defineProperty(this, prop, proto7[prop]);
      }
      this._renderer.type = "linear-gradient";
      this._renderer.flagEndPoints = FlagEndPoints.bind(this);
      this.left = new Vector();
      this.right = new Vector();
      if (typeof x1 === "number") {
        this.left.x = x1;
      }
      if (typeof y1 === "number") {
        this.left.y = y1;
      }
      if (typeof x2 === "number") {
        this.right.x = x2;
      }
      if (typeof y2 === "number") {
        this.right.y = y2;
      }
    }
    /**
     * @name Two.LinearGradient.Stop
     * @see {@link Two.Stop}
     */
    static Stop = Stop;
    static Properties = ["left", "right"];
    /**
     * @name Two.LinearGradient.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.LinearGradient} to create a new instance
     * @returns {Two.LinearGradient}
     * @description Create a new {@link Two.LinearGradient} from an object notation of a {@link Two.LinearGradient}.
     * @nota-bene Works in conjunction with {@link Two.LinearGradient#toObject}
     */
    static fromObject(obj) {
      const gradient = new _LinearGradient().copy(obj);
      if ("id" in obj) {
        gradient.id = obj.id;
      }
      return gradient;
    }
    /**
     * @name Two.LinearGradient#copy
     * @function
     * @param {Two.LinearGradient} gradient - The reference {@link Two.LinearGradient}
     * @description Copy the properties of one {@link Two.LinearGradient} onto another.
     */
    copy(gradient) {
      super.copy.call(this, gradient);
      for (let i = 0; i < _LinearGradient.Properties.length; i++) {
        const k = _LinearGradient.Properties[i];
        if (k in gradient) {
          this[k] = gradient[k] instanceof Vector ? gradient[k] : new Vector().copy(gradient[k]);
        }
      }
      return this;
    }
    /**
     * @name Two.LinearGradient#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Gradient}
     * @description Create a new instance of {@link Two.LinearGradient} with the same properties of the current path.
     */
    clone(parent) {
      const stops = this.stops.map(function(stop) {
        return stop.clone();
      });
      const clone = new _LinearGradient(
        this.left._x,
        this.left._y,
        this.right._x,
        this.right._y,
        stops
      );
      _.each(
        Gradient.Properties,
        function(k) {
          clone[k] = this[k];
        },
        this
      );
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.LinearGradient#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const result = super.toObject.call(this);
      result.left = this.left.toObject();
      result.right = this.right.toObject();
      return result;
    }
    /**
     * @name Two.LinearGradient#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagEndPoints || this._flagSpread || this._flagStops) {
        this.trigger(Events.Types.change);
      }
      return this;
    }
    /**
     * @name Two.LinearGradient#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagEndPoints = false;
      super.flagReset.call(this);
      return this;
    }
  };
  var proto7 = {
    left: {
      enumerable: true,
      get: function() {
        return this._left;
      },
      set: function(v) {
        if (this._left instanceof Vector) {
          this._left.unbind(Events.Types.change, this._renderer.flagEndPoints);
        }
        this._left = v;
        this._left.bind(Events.Types.change, this._renderer.flagEndPoints);
        this._flagEndPoints = true;
      }
    },
    right: {
      enumerable: true,
      get: function() {
        return this._right;
      },
      set: function(v) {
        if (this._right instanceof Vector) {
          this._right.unbind(Events.Types.change, this._renderer.flagEndPoints);
        }
        this._right = v;
        this._right.bind(Events.Types.change, this._renderer.flagEndPoints);
        this._flagEndPoints = true;
      }
    }
  };
  function FlagEndPoints() {
    this._flagEndPoints = true;
  }

  // src/effects/radial-gradient.js
  var RadialGradient = class _RadialGradient extends Gradient {
    /**
     * @name Two.RadialGradient#_flagRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RadialGradient#radius} changed and needs to update.
     */
    _flagRadius = false;
    /**
     * @name Two.RadialGradient#_flagCenter
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RadialGradient#center} changed and needs to update.
     */
    _flagCenter = false;
    /**
     * @name Two.RadialGradient#_flagFocal
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RadialGradient#focal} changed and needs to update.
     */
    _flagFocal = false;
    _radius = 0;
    _center = null;
    _focal = null;
    constructor(cx, cy, r, stops, fx, fy) {
      super(stops);
      for (let prop in proto8) {
        Object.defineProperty(this, prop, proto8[prop]);
      }
      this._renderer.type = "radial-gradient";
      this._renderer.flagCenter = FlagCenter.bind(this);
      this._renderer.flagFocal = FlagFocal.bind(this);
      this.center = new Vector();
      this.radius = typeof r === "number" ? r : 1;
      this.focal = new Vector();
      if (typeof cx === "number") {
        this.center.x = cx;
      }
      if (typeof cy === "number") {
        this.center.y = cy;
      }
      this.focal.copy(this.center);
      if (typeof fx === "number") {
        this.focal.x = fx;
      }
      if (typeof fy === "number") {
        this.focal.y = fy;
      }
    }
    /**
     * @name Two.RadialGradient.Stop
     * @see {@link Two.Stop}
     */
    static Stop = Stop;
    /**
     * @name Two.RadialGradient.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.RadialGradient}.
     */
    static Properties = ["center", "radius", "focal"];
    /**
     * @name Two.RadialGradient.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.RadialGradient} to create a new instance
     * @returns {Two.RadialGradient}
     * @description Create a new {@link Two.RadialGradient} from an object notation of a {@link Two.RadialGradient}.
     * @nota-bene Works in conjunction with {@link Two.RadialGradient#toObject}
     */
    static fromObject(obj) {
      const gradient = new _RadialGradient().copy(obj);
      if ("id" in obj) {
        gradient.id = obj.id;
      }
      return gradient;
    }
    /**
     * @name Two.RadialGradient#copy
     * @function
     * @param {Two.RadialGradient} gradient - The reference {@link Two.RadialGradient}
     * @description Copy the properties of one {@link Two.RadialGradient} onto another.
     */
    copy(gradient) {
      super.copy.call(this, gradient);
      for (let i = 0; i < _RadialGradient.Properties.length; i++) {
        const k = _RadialGradient.Properties[i];
        if (k in gradient) {
          if (/(center|focal)i/.test(k)) {
            this[k] = gradient[k] instanceof Vector ? gradient[k] : new Vector().copy(gradient[k]);
          } else if (typeof gradient[k] === "number") {
            this[k] = gradient[MediaKeySystemAccess];
          }
        }
      }
      return this;
    }
    /**
     * @name Two.RadialGradient#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.RadialGradient}
     * @description Create a new instance of {@link Two.RadialGradient} with the same properties of the current path.
     */
    clone(parent) {
      const stops = this.stops.map(function(stop) {
        return stop.clone();
      });
      const clone = new _RadialGradient(
        this.center._x,
        this.center._y,
        this._radius,
        stops,
        this.focal._x,
        this.focal._y
      );
      _.each(
        Gradient.Properties.concat(_RadialGradient.Properties),
        function(k) {
          clone[k] = this[k];
        },
        this
      );
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.RadialGradient#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const result = super.toObject.call(this);
      _.each(
        _RadialGradient.Properties,
        function(k) {
          result[k] = this[k];
        },
        this
      );
      result.center = this.center.toObject();
      result.focal = this.focal.toObject();
      return result;
    }
    /**
     * @name Two.RadialGradient#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagRadius || this._flatCenter || this._flagFocal || this._flagSpread || this._flagStops) {
        this.trigger(Events.Types.change);
      }
      return this;
    }
    /**
     * @name Two.RadialGradient#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagRadius = this._flagCenter = this._flagFocal = false;
      super.flagReset.call(this);
      return this;
    }
  };
  var proto8 = {
    radius: {
      enumerable: true,
      get: function() {
        return this._radius;
      },
      set: function(v) {
        this._radius = v;
        this._flagRadius = true;
      }
    },
    center: {
      enumerable: true,
      get: function() {
        return this._center;
      },
      set: function(v) {
        if (this._center) {
          this._center.unbind(Events.Types.change, this._renderer.flagCenter);
        }
        this._center = v;
        this._center.bind(Events.Types.change, this._renderer.flagCenter);
        this._flagCenter = true;
      }
    },
    focal: {
      enumerable: true,
      get: function() {
        return this._focal;
      },
      set: function(v) {
        if (this._focal) {
          this._focal.unbind(Events.Types.change, this._renderer.flagFocal);
        }
        this._focal = v;
        this._focal.bind(Events.Types.change, this._renderer.flagFocal);
        this._flagFocal = true;
      }
    }
  };
  function FlagCenter() {
    this._flagCenter = true;
  }
  function FlagFocal() {
    this._flagFocal = true;
  }

  // src/utils/shape.js
  function contains(path, t) {
    if (t === 0 || t === 1) {
      return true;
    }
    const length = path._length;
    const target = length * t;
    let elapsed = 0;
    for (let i = 0; i < path._lengths.length; i++) {
      const dist = path._lengths[i];
      if (elapsed >= target) {
        return target - elapsed >= 0;
      }
      elapsed += dist;
    }
    return false;
  }
  function getIdByLength(path, target) {
    const total = path._length;
    if (target <= 0) {
      return 0;
    } else if (target >= total) {
      return path._lengths.length - 1;
    }
    for (let i = 0, sum = 0; i < path._lengths.length; i++) {
      if (sum + path._lengths[i] >= target) {
        target -= sum;
        return Math.max(i - 1, 0) + target / path._lengths[i];
      }
      sum += path._lengths[i];
    }
    return -1;
  }
  function getCurveLength2(a, b, limit) {
    let x1, x2, x3, x4, y1, y2, y3, y4;
    const right = b.controls && b.controls.right;
    const left = a.controls && a.controls.left;
    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;
    if (right && b._relative) {
      x2 += b.x;
      y2 += b.y;
    }
    if (left && a._relative) {
      x3 += a.x;
      y3 += a.y;
    }
    return getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit);
  }
  function getSubdivisions(a, b, limit) {
    let x1, x2, x3, x4, y1, y2, y3, y4;
    const right = b.controls && b.controls.right;
    const left = a.controls && a.controls.left;
    x1 = b.x;
    y1 = b.y;
    x2 = (right || b).x;
    y2 = (right || b).y;
    x3 = (left || a).x;
    y3 = (left || a).y;
    x4 = a.x;
    y4 = a.y;
    if (right && b._relative) {
      x2 += b.x;
      y2 += b.y;
    }
    if (left && a._relative) {
      x3 += a.x;
      y3 += a.y;
    }
    return subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit);
  }
  function getEffectFromObject(obj) {
    switch (obj.renderer.type) {
      case "texture":
        return Texture.fromObject(obj);
      case "gradient":
        return Gradient.fromObject(obj);
      case "linear-gradient":
        return LinearGradient.fromObject(obj);
      case "radial-gradient":
        return RadialGradient.fromObject(obj);
    }
    return obj;
  }

  // src/matrix.js
  var cos = Math.cos;
  var sin = Math.sin;
  var tan = Math.tan;
  var array = [];
  var Matrix2 = class _Matrix extends Events {
    /**
     * @name Two.Matrix#elements
     * @property {Number[]} - The underlying data stored as an array.
     */
    elements = new NumArray(9);
    /**
     * @name Two.Matrix#manual
     * @property {Boolean} - Determines whether Two.js automatically calculates the values for the matrix or if the developer intends to manage the matrix.
     * @nota-bene - Setting to `true` nullifies {@link Two.Shape#translation}, {@link Two.Shape#rotation}, and {@link Two.Shape#scale}.
     */
    manual = false;
    constructor(a, b, c, d, e, f) {
      super();
      let elements = a;
      if (!Array.isArray(elements)) {
        elements = Array.prototype.slice.call(arguments);
      }
      this.identity();
      if (elements.length > 0) {
        this.set(elements);
      }
    }
    //
    /**
     * @name Two.Matrix.Identity
     * @property {Number[]} - A stored reference to the default value of a 3 x 3 matrix.
     */
    static Identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    /**
     * @name Two.Matrix.Multiply
     * @function
     * @param {Number[]} A - The first {@link Two.Matrix} to multiply
     * @param {Number[]} B - The second {@link Two.Matrix} to multiply
     * @param {Number[]} [C] - An optional {@link Two.Matrix} to apply the result to
     * @returns {Number[]} - If an optional `C` matrix isn't passed then a new one is created and returned.
     * @description Multiply two matrices together and return the result.
     */
    static Multiply(A, B, C) {
      if (B.length <= 3) {
        const e = A;
        let x, y, z;
        const a = B[0] || 0, b = B[1] || 0, c = B[2] || 0;
        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;
        return [x, y, z];
      }
      const A0 = A[0], A1 = A[1], A2 = A[2];
      const A3 = A[3], A4 = A[4], A5 = A[5];
      const A6 = A[6], A7 = A[7], A8 = A[8];
      const B0 = B[0], B1 = B[1], B2 = B[2];
      const B3 = B[3], B4 = B[4], B5 = B[5];
      const B6 = B[6], B7 = B[7], B8 = B[8];
      C = C || new NumArray(9);
      C[0] = A0 * B0 + A1 * B3 + A2 * B6;
      C[1] = A0 * B1 + A1 * B4 + A2 * B7;
      C[2] = A0 * B2 + A1 * B5 + A2 * B8;
      C[3] = A3 * B0 + A4 * B3 + A5 * B6;
      C[4] = A3 * B1 + A4 * B4 + A5 * B7;
      C[5] = A3 * B2 + A4 * B5 + A5 * B8;
      C[6] = A6 * B0 + A7 * B3 + A8 * B6;
      C[7] = A6 * B1 + A7 * B4 + A8 * B7;
      C[8] = A6 * B2 + A7 * B5 + A8 * B8;
      return C;
    }
    /**
     * @name Two.Matrix.fromObject
     * @function
     * @param {Object} obj - The object notation of a Two.Matrix to create a new instance
     * @returns {Two.Matrix}
     * @description Create a new {@link Two.Matrix} from an object notation of a {@link Two.Matrix}.
     * @nota-bene Works in conjunction with {@link Two.Matrix#toObject}
     */
    static fromObject(obj) {
      return new _Matrix().copy(obj);
    }
    /**
     * @name Two.Matrix#set
     * @function
     * @param {Number} a - The value for element at the first column and first row
     * @param {Number} b - The value for element at the second column and first row
     * @param {Number} c - The value for element at the third column and first row
     * @param {Number} d - The value for element at the first column and second row
     * @param {Number} e - The value for element at the second column and second row
     * @param {Number} f - The value for element at the third column and second row
     * @param {Number} g - The value for element at the first column and third row
     * @param {Number} h - The value for element at the second column and third row
     * @param {Number} i - The value for element at the third column and third row
     * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
     */
    /**
     * @name Two.Matrix#set
     * @function
     * @param {Number[]} a - The array of elements to apply
     * @description Set an array of values onto the matrix. Order described in {@link Two.Matrix}.
     */
    set(a, b, c, d, e, f, g, h, i) {
      if (typeof b === "undefined") {
        const elements = a;
        a = elements[0];
        b = elements[1];
        c = elements[2];
        d = elements[3];
        e = elements[4];
        f = elements[5];
        g = elements[6];
        h = elements[7];
        i = elements[8];
      }
      this.elements[0] = a;
      this.elements[1] = b;
      this.elements[2] = c;
      this.elements[3] = d;
      this.elements[4] = e;
      this.elements[5] = f;
      this.elements[6] = g;
      this.elements[7] = h;
      this.elements[8] = i;
      return this.trigger(Events.Types.change);
    }
    /**
     * @name Two.Matrix#copy
     * @function
     * @param {Two.Matrix} m - The matrix to copy
     * @description Copy the matrix of one to the current instance.
     */
    copy(m) {
      this.elements[0] = m.elements[0];
      this.elements[1] = m.elements[1];
      this.elements[2] = m.elements[2];
      this.elements[3] = m.elements[3];
      this.elements[4] = m.elements[4];
      this.elements[5] = m.elements[5];
      this.elements[6] = m.elements[6];
      this.elements[7] = m.elements[7];
      this.elements[8] = m.elements[8];
      this.manual = m.manual;
      return this.trigger(Events.Types.change);
    }
    /**
     * @name Two.Matrix#identity
     * @function
     * @description Turn matrix to the identity, like resetting.
     */
    identity() {
      this.elements[0] = _Matrix.Identity[0];
      this.elements[1] = _Matrix.Identity[1];
      this.elements[2] = _Matrix.Identity[2];
      this.elements[3] = _Matrix.Identity[3];
      this.elements[4] = _Matrix.Identity[4];
      this.elements[5] = _Matrix.Identity[5];
      this.elements[6] = _Matrix.Identity[6];
      this.elements[7] = _Matrix.Identity[7];
      this.elements[8] = _Matrix.Identity[8];
      return this.trigger(Events.Types.change);
    }
    /**
     * @name Two.Matrix#multiply
     * @function
     * @param {Number} s - The scalar to be multiplied.
     * @description Multiply all components of the matrix against a single scalar value.
     * @overloaded
     */
    /**
     * @name Two.Matrix#multiply
     * @function
     * @param {Number} x - The `x` component to be multiplied.
     * @param {Number} y - The `y` component to be multiplied.
     * @param {Number} z - The `z` component to be multiplied.
     * @description Multiply all components of a matrix against a 3 component vector.
     * @overloaded
     */
    /**
     * @name Two.Matrix#multiply
     * @function
     * @param {Number} a - The value at the first column and first row of the matrix to be multiplied.
     * @param {Number} b - The value at the second column and first row of the matrix to be multiplied.
     * @param {Number} c - The value at the third column and first row of the matrix to be multiplied.
     * @param {Number} d - The value at the first column and second row of the matrix to be multiplied.
     * @param {Number} e - The value at the second column and second row of the matrix to be multiplied.
     * @param {Number} f - The value at the third column and second row of the matrix to be multiplied.
     * @param {Number} g - The value at the first column and third row of the matrix to be multiplied.
     * @param {Number} h - The value at the second column and third row of the matrix to be multiplied.
     * @param {Number} i - The value at the third column and third row of the matrix to be multiplied.
     * @description Multiply all components of a matrix against another matrix.
     * @overloaded
     */
    multiply(a, b, c, d, e, f, g, h, i) {
      if (typeof b === "undefined") {
        this.elements[0] *= a;
        this.elements[1] *= a;
        this.elements[2] *= a;
        this.elements[3] *= a;
        this.elements[4] *= a;
        this.elements[5] *= a;
        this.elements[6] *= a;
        this.elements[7] *= a;
        this.elements[8] *= a;
        return this.trigger(Events.Types.change);
      }
      if (typeof c === "undefined") {
        c = 1;
      }
      if (typeof d === "undefined") {
        a = a || 0;
        b = b || 0;
        c = c || 0;
        e = this.elements;
        const x = e[0] * a + e[1] * b + e[2] * c;
        const y = e[3] * a + e[4] * b + e[5] * c;
        const z = e[6] * a + e[7] * b + e[8] * c;
        return [x, y, z];
      }
      const A = this.elements;
      const B = [a, b, c, d, e, f, g, h, i];
      const A0 = A[0], A1 = A[1], A2 = A[2];
      const A3 = A[3], A4 = A[4], A5 = A[5];
      const A6 = A[6], A7 = A[7], A8 = A[8];
      const B0 = B[0], B1 = B[1], B2 = B[2];
      const B3 = B[3], B4 = B[4], B5 = B[5];
      const B6 = B[6], B7 = B[7], B8 = B[8];
      this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
      this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
      this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;
      this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
      this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
      this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;
      this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
      this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
      this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;
      return this.trigger(Events.Types.change);
    }
    /**
     * @name Two.Matrix#inverse
     * @function
     * @param {Two.Matrix} [output] - The optional matrix to apply the inversion to.
     * @description Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
     */
    inverse(output) {
      const a = this.elements;
      output = output || new _Matrix();
      const a00 = a[0], a01 = a[1], a02 = a[2];
      const a10 = a[3], a11 = a[4], a12 = a[5];
      const a20 = a[6], a21 = a[7], a22 = a[8];
      const b01 = a22 * a11 - a12 * a21;
      const b11 = -a22 * a10 + a12 * a20;
      const b21 = a21 * a10 - a11 * a20;
      let det = a00 * b01 + a01 * b11 + a02 * b21;
      if (!det) {
        return null;
      }
      det = 1 / det;
      output.elements[0] = b01 * det;
      output.elements[1] = (-a22 * a01 + a02 * a21) * det;
      output.elements[2] = (a12 * a01 - a02 * a11) * det;
      output.elements[3] = b11 * det;
      output.elements[4] = (a22 * a00 - a02 * a20) * det;
      output.elements[5] = (-a12 * a00 + a02 * a10) * det;
      output.elements[6] = b21 * det;
      output.elements[7] = (-a21 * a00 + a01 * a20) * det;
      output.elements[8] = (a11 * a00 - a01 * a10) * det;
      return output;
    }
    /**
     * @name Two.Matrix#scale
     * @function
     * @param {Number} s - The one dimensional scale to apply to the matrix.
     * @description Uniformly scale the transformation matrix.
     */
    /**
     * @name Two.Matrix#scale
     * @function
     * @param {Number} sx - The horizontal scale factor.
     * @param {Number} sy - The vertical scale factor
     * @description Scale the transformation matrix in two dimensions.
     */
    scale(sx, sy) {
      const l = arguments.length;
      if (l <= 1) {
        sy = sx;
      }
      return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);
    }
    /**
     * @name Two.Matrix#rotate
     * @function
     * @param {Number} n - The amount to rotate in Number.
     * @description Rotate the matrix.
     */
    rotate(n) {
      const c = cos(n);
      const s = sin(n);
      return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);
    }
    /**
     * @name Two.Matrix#translate
     * @function
     * @param {Number} x - The horizontal translation value to apply
     * @param {Number} y - The vertical translation value to apply
     * @description Translate the matrix to specific `x` / `y` values.
     */
    translate(x, y) {
      return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);
    }
    /**
     * @name Two.Matrix#skewX
     * @function
     * @param {Number} n - The amount to skew
     * @description Skew the matrix by an angle in the x axis direction.
     */
    skewX(n) {
      const a = tan(n);
      return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);
    }
    /**
     * @name Two.Matrix#skewY
     * @function
     * @param {Number} n - The amount to skew
     * @description Skew the matrix by an angle in the y axis direction.
     */
    skewY(n) {
      const a = tan(n);
      return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);
    }
    /**
     * @name Two.Matrix#toString
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
     * @returns {String} - The transformation matrix as a 6 component string separated by spaces.
     * @description Create a transform string. Used for the Two.js rendering APIs.
     */
    toString(fullMatrix) {
      array.length = 0;
      this.toTransformArray(fullMatrix, array);
      return array.map(toFixed).join(" ");
    }
    /**
     * @name Two.Matrix#toTransformArray
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 in the format for 2D transformations.
     * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
     * @description Create a transform array. Used for the Two.js rendering APIs.
     */
    toTransformArray(fullMatrix, output) {
      const elements = this.elements;
      const hasOutput = !!output;
      const a = elements[0];
      const b = elements[1];
      const c = elements[2];
      const d = elements[3];
      const e = elements[4];
      const f = elements[5];
      if (fullMatrix) {
        const g = elements[6];
        const h = elements[7];
        const i = elements[8];
        if (hasOutput) {
          output[0] = a;
          output[1] = d;
          output[2] = g;
          output[3] = b;
          output[4] = e;
          output[5] = h;
          output[6] = c;
          output[7] = f;
          output[8] = i;
          return;
        }
        return [a, d, g, b, e, h, c, f, i];
      }
      if (hasOutput) {
        output[0] = a;
        output[1] = d;
        output[2] = b;
        output[3] = e;
        output[4] = c;
        output[5] = f;
        return;
      }
      return [
        a,
        d,
        b,
        e,
        c,
        f
        // Specific format see LN:19
      ];
    }
    /**
     * @name Two.Matrix#toArray
     * @function
     * @param {Boolean} [fullMatrix=false] - Return the full 9 elements of the matrix or just 6 for 2D transformations.
     * @param {Number[]} [output] - An array empty or otherwise to apply the values to.
     * @description Create a transform array. Used for the Two.js rendering APIs.
     */
    toArray(fullMatrix, output) {
      const elements = this.elements;
      const hasOutput = !!output;
      const a = elements[0];
      const b = elements[1];
      const c = elements[2];
      const d = elements[3];
      const e = elements[4];
      const f = elements[5];
      if (fullMatrix) {
        const g = elements[6];
        const h = elements[7];
        const i = elements[8];
        if (hasOutput) {
          output[0] = a;
          output[1] = b;
          output[2] = c;
          output[3] = d;
          output[4] = e;
          output[5] = f;
          output[6] = g;
          output[7] = h;
          output[8] = i;
          return;
        }
        return [a, b, c, d, e, f, g, h, i];
      }
      if (hasOutput) {
        output[0] = a;
        output[1] = b;
        output[2] = c;
        output[3] = d;
        output[4] = e;
        output[5] = f;
        return;
      }
      return [a, b, c, d, e, f];
    }
    /**
     * @name Two.Matrix#toObject
     * @function
     * @description Create a JSON compatible object that represents information of the matrix.
     * @nota-bene Works in conjunction with {@link Two.Matrix.fromObject}
     */
    toObject() {
      return {
        renderer: { type: "matrix" },
        elements: this.toArray(true),
        manual: !!this.manual
      };
    }
    /**
     * @name Two.Matrix#clone
     * @function
     * @description Clone the current matrix.
     */
    clone() {
      return new _Matrix().copy(this);
    }
  };
  setMatrix(Matrix2);

  // src/shape.js
  var Shape = class _Shape extends Element {
    /**
     * @name Two.Shape#_flagMatrix
     * @private
     * @property {Boolean} - Determines whether the matrix needs updating.
     */
    _flagMatrix = true;
    /**
     * @name Two.Shape#_flagScale
     * @private
     * @property {Boolean} - Determines whether the scale needs updating.
     */
    _flagScale = false;
    // Underlying Properties
    /**
     * @name Two.Shape#_matrix
     * @private
     * @property {Two.Matrix} - The matrix value of the shape's position, rotation, and scale.
     */
    _matrix = null;
    /**
     * @name Two.Shape#_worldMatrix
     * @private
     * @property {Two.Matrix} - The matrix value of the shape's position, rotation, and scale in the scene.
     */
    _worldMatrix = null;
    /**
     * @name Two.Shape#_position
     * @private
     * @property {Two.Vector} - The translation values as a {@link Two.Vector}.
     */
    _position = null;
    /**
     * @name Two.Shape#_rotation
     * @private
     * @property {Number} - The rotation value in radians.
     */
    _rotation = 0;
    /**
     * @name Two.Shape#_scale
     * @private
     * @property {Number|Two.Vector} - The scale value in Number. Can be a vector for non-uniform scaling.
     */
    _scale = 1;
    /**
     * @name Two.Shape#_skewX
     * @private
     * @property {Number} - The rotation value in Number.
     */
    _skewX = 0;
    /**
     * @name Two.Shape#_skewY
     * @private
     * @property {Number} - The rotation value in Number.
     */
    _skewY = 0;
    constructor() {
      super();
      for (let prop in proto9) {
        Object.defineProperty(this, prop, proto9[prop]);
      }
      this._renderer.flagMatrix = FlagMatrix.bind(this);
      this.isShape = true;
      this.matrix = new Matrix2();
      this.worldMatrix = new Matrix2();
      this.position = new Vector();
      this.rotation = 0;
      this.scale = 1;
      this.skewX = 0;
      this.skewY = 0;
    }
    static Properties = [
      "position",
      "rotation",
      "scale",
      "skewX",
      "skewY",
      "matrix",
      "worldMatrix"
    ];
    /**
     * @name Two.Shape.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Shape} to create a new instance
     * @returns {Two.Shape}
     * @description Create a new {@link Two.Shape} from an object notation of a {@link Two.Shape}.
     * @nota-bene Works in conjunction with {@link Two.Shape#toObject}
     */
    static fromObject(obj) {
      const shape = new _Shape().copy(obj);
      if ("id" in obj) {
        shape.id = obj.id;
      }
      return shape;
    }
    get renderer() {
      return this._renderer;
    }
    set renderer(v) {
      this._renderer = v;
    }
    /**
     * @name Two.Shape#translation
     * @description Alias for {@link Two.Shape#position}.
     */
    get translation() {
      return proto9.position.get.apply(this, arguments);
    }
    set translation(v) {
      proto9.position.set.apply(this, arguments);
    }
    /**
     * @name Two.Shape#addTo
     * @function
     * @param {Two.Group} group - The parent the shape adds itself to.
     * @description Convenience method to add itself to the scenegraph.
     */
    addTo(group) {
      group.add(this);
      return this;
    }
    /**
     * @name Two.Shape#remove
     * @function
     * @description Remove self from the scene / parent.
     */
    remove() {
      if (!this.parent) {
        return this;
      }
      this.parent.remove(this);
      return this;
    }
    /**
     * @name Two.Shape#contains
     * @function
     * @param {Number} x - x coordinate to hit test against
     * @param {Number} y - y coordinate to hit test against
     * @param {Object} [options] - Optional options object
     * @param {Boolean} [options.ignoreVisibility] - If `true`, hit test against `shape.visible = false` shapes
     * @param {Number} [options.tolerance] - Padding to hit test against in pixels
     * @returns {Boolean}
     * @description Check to see if coordinates are within a {@link Two.Shape}'s bounding rectangle
     * @nota-bene Expects *world-space coordinates* – the same pixel-space you get from the renderer (e.g., mouse `clientX`/`clientY` adjusted for the canvas’s offset and pixel ratio).
     */
    contains(x, y, options) {
      const opts = options || {};
      const ignoreVisibility = opts.ignoreVisibility === true;
      if (!ignoreVisibility && "visible" in this && this.visible === false) {
        return false;
      }
      if (!ignoreVisibility && "opacity" in this && typeof this.opacity === "number" && this.opacity <= 0) {
        return false;
      }
      if (typeof this.getBoundingClientRect !== "function") {
        return false;
      }
      const tolerance = typeof opts.tolerance === "number" ? opts.tolerance : 0;
      this._update(true);
      const rect = this.getBoundingClientRect();
      if (!rect) {
        return false;
      }
      return x >= rect.left - tolerance && x <= rect.right + tolerance && y >= rect.top - tolerance && y <= rect.bottom + tolerance;
    }
    /**
     * @name Two.Shape#copy
     * @function
     * @param {Two.Shape} shape
     * @description Copy the properties of one {@link Two.Shape} onto another.
     */
    copy(shape) {
      super.copy.call(this, shape);
      if ("position" in shape) {
        if (shape.position instanceof Vector) {
          this.position = shape.position;
        } else {
          this.position.copy(shape.position);
        }
      }
      if ("rotation" in shape) {
        this.rotation = shape.rotation;
      }
      if ("scale" in shape) {
        this.scale = typeof shape.scale === "number" || shape.scale instanceof Vector ? shape.scale : new Vector(shape.scale.x, shape.scale.y);
      }
      if ("skewX" in shape) {
        this.skewX = shape.skewX;
      }
      if ("skewY" in shape) {
        this.skewY = shape.skewY;
      }
      if ("matrix" in shape && shape.matrix.manual) {
        this.matrix.copy(shape.matrix);
        this.matrix.manual = true;
      }
      return this;
    }
    /**
     * @name Two.Shape#clone
     * @function
     * @param {Two.Group} [parent] - Optional argument to automatically add the shape to a scenegraph.
     * @returns {Two.Shape}
     * @description Create a new {@link Two.Shape} with the same values as the current shape.
     */
    clone(parent) {
      const clone = new _Shape();
      clone.position.copy(this.position);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      if (parent) {
        parent.add(clone);
      }
      return clone._update();
    }
    /**
     * @name Two.Shape#toObject
     * @function
     * @description Create a JSON compatible object that represents information of the shape.
     * @nota-bene Works in conjunction with {@link Two.Shape.fromObject}
     */
    toObject() {
      const result = super.toObject.call(this);
      result.renderer = { type: "shape" };
      result.isShape = true;
      result.translation = this.translation.toObject();
      result.rotation = this.translation.rotation;
      result.scale = this.scale instanceof Vector ? this.scale.toObject() : this.scale;
      result.skewX = this.skewX;
      result.skewY = this.skewY;
      result.matrix = this.matrix.toObject();
      return result;
    }
    /**
     * @name Two.Shape#dispose
     * @function
     * @description Release the shape's bound objects by unbinding relevant events.
     */
    dispose() {
      super.dispose();
      if (typeof this.translation === "object" && typeof this.translation.unbind === "function") {
        this.translation.unbind();
      }
      if (typeof this.scale === "object" && typeof this.scale.unbind === "function") {
        this.scale.unbind();
      }
    }
    /**
     * @name Two.Shape#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update(bubbles) {
      if (!this._matrix.manual && this._flagMatrix) {
        this._matrix.identity().translate(this.position.x, this.position.y);
        this._matrix.rotate(this.rotation);
        if (this._scale instanceof Vector) {
          this._matrix.scale(this._scale.x, this._scale.y);
        } else {
          this._matrix.scale(this._scale);
        }
        this._matrix.skewX(this.skewX);
        this._matrix.skewY(this.skewY);
      }
      if (bubbles) {
        if (this.parent && this.parent._update) {
          this.parent._update();
        }
      }
      return this;
    }
    /**
     * @name Two.Shape#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagMatrix = this._flagScale = false;
      super.flagReset.call(this);
      return this;
    }
  };
  var proto9 = {
    position: {
      enumerable: true,
      get: function() {
        return this._position;
      },
      set: function(v) {
        if (this._position) {
          this._position.unbind(Events.Types.change, this._renderer.flagMatrix);
        }
        this._position = v;
        this._position.bind(Events.Types.change, this._renderer.flagMatrix);
        FlagMatrix.call(this);
      }
    },
    rotation: {
      enumerable: true,
      get: function() {
        return this._rotation;
      },
      set: function(v) {
        this._rotation = v;
        this._flagMatrix = true;
      }
    },
    scale: {
      enumerable: true,
      get: function() {
        return this._scale;
      },
      set: function(v) {
        if (this._scale instanceof Vector) {
          this._scale.unbind(Events.Types.change, this._renderer.flagMatrix);
        }
        this._scale = v;
        if (this._scale instanceof Vector) {
          this._scale.bind(Events.Types.change, this._renderer.flagMatrix);
        }
        this._flagMatrix = true;
        this._flagScale = true;
      }
    },
    skewX: {
      enumerable: true,
      get: function() {
        return this._skewX;
      },
      set: function(v) {
        this._skewX = v;
        this._flagMatrix = true;
      }
    },
    skewY: {
      enumerable: true,
      get: function() {
        return this._skewY;
      },
      set: function(v) {
        this._skewY = v;
        this._flagMatrix = true;
      }
    },
    matrix: {
      enumerable: true,
      get: function() {
        return this._matrix;
      },
      set: function(v) {
        this._matrix = v;
        this._flagMatrix = true;
      }
    },
    worldMatrix: {
      enumerable: true,
      get: function() {
        getComputedMatrix(this, this._worldMatrix);
        return this._worldMatrix;
      },
      set: function(v) {
        this._worldMatrix = v;
      }
    }
  };
  function FlagMatrix() {
    this._flagMatrix = true;
  }

  // src/utils/hit-test.js
  var TRANSPARENT_REGEX = /^(?:none|transparent)$/i;
  var DEFAULT_PRECISION = 8;
  var EPSILON = Number.EPSILON;
  function createPoint(x, y) {
    return { x, y };
  }
  function pointsEqual(a, b, epsilon = EPSILON) {
    return Math.abs(a.x - b.x) <= epsilon && Math.abs(a.y - b.y) <= epsilon;
  }
  function svgAngle(ux, uy, vx, vy) {
    const dot = ux * vx + uy * vy;
    const len = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy) || 1e-12;
    let ang = Math.acos(Math.max(-1, Math.min(1, dot / len)));
    if (ux * vy - uy * vx < 0) {
      ang = -ang;
    }
    return ang;
  }
  function sampleArcPoints(prev, anchor2, precision) {
    if (!prev) {
      return [createPoint(anchor2.x, anchor2.y)];
    }
    let rx = anchor2.rx;
    let ry = anchor2.ry;
    if (!(rx && ry)) {
      return [createPoint(anchor2.x, anchor2.y)];
    }
    const xAxisRotation = (anchor2.xAxisRotation || 0) * Math.PI / 180;
    const largeArcFlag = anchor2.largeArcFlag ? 1 : 0;
    const sweepFlag = anchor2.sweepFlag ? 1 : 0;
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    const ax = prev.x;
    const ay = prev.y;
    const x = anchor2.x;
    const y = anchor2.y;
    const dx2 = (ax - x) / 2;
    const dy2 = (ay - y) / 2;
    const cosRot = Math.cos(xAxisRotation);
    const sinRot = Math.sin(xAxisRotation);
    let x1p = cosRot * dx2 + sinRot * dy2;
    let y1p = -sinRot * dx2 + cosRot * dy2;
    let rxs = rx * rx;
    let rys = ry * ry;
    const cr = x1p * x1p / rxs + y1p * y1p / rys;
    if (cr > 1) {
      const s = Math.sqrt(cr);
      rx *= s;
      ry *= s;
      rxs = rx * rx;
      rys = ry * ry;
    }
    const dq = rxs * y1p * y1p + rys * x1p * x1p;
    const pq = dq === 0 ? 0 : (rxs * rys - dq) / dq;
    let q = Math.sqrt(Math.max(0, pq));
    if (largeArcFlag === sweepFlag) {
      q = -q;
    }
    const cxp = q * rx * y1p / ry;
    const cyp = -q * ry * x1p / rx;
    const cx = cosRot * cxp - sinRot * cyp + (ax + x) / 2;
    const cy = sinRot * cxp + cosRot * cyp + (ay + y) / 2;
    const startAngle = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
    const delta = svgAngle(
      (x1p - cxp) / rx,
      (y1p - cyp) / ry,
      (-x1p - cxp) / rx,
      (-y1p - cyp) / ry
    ) % TWO_PI;
    const endAngle = startAngle + delta;
    const clockwise = sweepFlag === 0;
    const angleDelta = (() => {
      const raw = endAngle - startAngle;
      const samePoints = Math.abs(raw) < Number.EPSILON;
      let deltaAngle = mod(raw, TWO_PI);
      if (deltaAngle < Number.EPSILON) {
        deltaAngle = samePoints ? 0 : TWO_PI;
      }
      if (clockwise && !samePoints) {
        deltaAngle = deltaAngle === TWO_PI ? -TWO_PI : deltaAngle - TWO_PI;
      }
      return deltaAngle;
    })();
    const steps = Math.max(Constants.Resolution, Math.max(precision * 2, 1));
    const points = [];
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const angle = startAngle + t * angleDelta;
      let px = cx + rx * Math.cos(angle);
      let py = cy + ry * Math.sin(angle);
      if (xAxisRotation !== 0) {
        const tx = px - cx;
        const ty = py - cy;
        const cosR = Math.cos(xAxisRotation);
        const sinR = Math.sin(xAxisRotation);
        px = tx * cosR - ty * sinR + cx;
        py = tx * sinR + ty * cosR + cy;
      }
      points.push(createPoint(px, py));
    }
    return points;
  }
  function buildPathHitParts(path, precision = DEFAULT_PRECISION) {
    const polygons = [];
    const segments = [];
    const vertices = path._renderer && path._renderer.vertices && path._renderer.vertices.length > 0 ? path._renderer.vertices : path.vertices;
    if (!vertices || vertices.length === 0) {
      return { polygons, segments };
    }
    const limit = Math.max(1, Math.floor(precision));
    let currentPolygon = null;
    let firstPoint = null;
    let lastPoint = null;
    let prevVertex = null;
    const closePolygon = (forceClose = false) => {
      if (!currentPolygon) {
        return;
      }
      if (forceClose && firstPoint && lastPoint && !pointsEqual(firstPoint, lastPoint)) {
        const closingPoint = createPoint(firstPoint.x, firstPoint.y);
        segments.push({ a: lastPoint, b: closingPoint });
        currentPolygon.push(closingPoint);
        lastPoint = closingPoint;
      }
      if (currentPolygon.length >= 3 && firstPoint && lastPoint && pointsEqual(firstPoint, lastPoint)) {
        polygons.push(currentPolygon);
      }
      currentPolygon = null;
      firstPoint = null;
      lastPoint = null;
    };
    const appendPoint = (pt) => {
      if (!lastPoint) {
        lastPoint = pt;
        if (currentPolygon) {
          currentPolygon.push(pt);
        }
        return;
      }
      if (pointsEqual(lastPoint, pt)) {
        return;
      }
      segments.push({ a: lastPoint, b: pt });
      if (currentPolygon) {
        currentPolygon.push(pt);
      }
      lastPoint = pt;
    };
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];
      const command = vertex.command || (i === 0 ? Commands.move : Commands.line);
      if (command === Commands.move) {
        closePolygon(false);
        const pt = createPoint(vertex.x, vertex.y);
        currentPolygon = [pt];
        firstPoint = pt;
        lastPoint = pt;
        prevVertex = vertex;
        continue;
      }
      if (!prevVertex) {
        prevVertex = vertices[Math.max(i - 1, 0)];
      }
      if (command === Commands.line) {
        appendPoint(createPoint(vertex.x, vertex.y));
      } else if (command === Commands.curve) {
        const subdivisions = getSubdivisions(vertex, prevVertex, limit);
        for (let j = 1; j < subdivisions.length; j++) {
          const sv = subdivisions[j];
          appendPoint(createPoint(sv.x, sv.y));
        }
        appendPoint(createPoint(vertex.x, vertex.y));
      } else if (command === Commands.arc) {
        const arcPoints = sampleArcPoints(prevVertex, vertex, limit);
        for (let j = 0; j < arcPoints.length; j++) {
          appendPoint(arcPoints[j]);
        }
      } else if (command === Commands.close) {
        closePolygon(true);
        prevVertex = vertex;
        continue;
      } else {
        appendPoint(createPoint(vertex.x, vertex.y));
      }
      prevVertex = vertex;
    }
    if (currentPolygon) {
      const shouldForceClose = !!path._closed || !!path.closed || firstPoint && lastPoint && !pointsEqual(firstPoint, lastPoint);
      closePolygon(shouldForceClose);
    }
    return { polygons, segments };
  }
  function pointInPolygons(polygons, x, y) {
    let inside = false;
    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];
      if (!polygon || polygon.length < 3) {
        continue;
      }
      let lastIndex = polygon.length - 1;
      for (let j = 0; j < polygon.length; j++) {
        const v0 = polygon[lastIndex];
        const v1 = polygon[j];
        const intersects = v1.y > y !== v0.y > y && x < (v0.x - v1.x) * (y - v1.y) / (v0.y - v1.y || 1e-12) + v1.x;
        if (intersects) {
          inside = !inside;
        }
        lastIndex = j;
      }
    }
    return inside;
  }
  function distanceToSegmentSquared(x, y, a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) {
      const ddx2 = x - a.x;
      const ddy2 = y - a.y;
      return ddx2 * ddx2 + ddy2 * ddy2;
    }
    const t = ((x - a.x) * dx + (y - a.y) * dy) / (dx * dx + dy * dy);
    const clamped = Math.max(0, Math.min(1, t));
    const cx = a.x + clamped * dx;
    const cy = a.y + clamped * dy;
    const ddx = x - cx;
    const ddy = y - cy;
    return ddx * ddx + ddy * ddy;
  }
  function distanceToSegments(segments, x, y) {
    if (!segments || segments.length === 0) {
      return Infinity;
    }
    let minDistance = Infinity;
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const distance = distanceToSegmentSquared(x, y, segment.a, segment.b);
      if (distance < minDistance) {
        minDistance = distance;
      }
    }
    return Math.sqrt(minDistance);
  }
  function hasVisibleFill(shape, override) {
    if (typeof override === "boolean") {
      return override;
    }
    const fill = shape.fill;
    if (!fill && fill !== 0) {
      return false;
    }
    if (typeof fill === "string") {
      return !TRANSPARENT_REGEX.test(fill);
    }
    return true;
  }
  function hasVisibleStroke(shape, override) {
    const linewidth = typeof shape.linewidth === "number" ? shape.linewidth : shape._linewidth || 0;
    if (typeof override === "boolean") {
      return override && linewidth > 0;
    }
    if (!(linewidth > 0)) {
      return false;
    }
    const stroke = shape.stroke;
    if (!stroke && stroke !== 0) {
      return false;
    }
    if (typeof stroke === "string") {
      return !TRANSPARENT_REGEX.test(stroke);
    }
    return true;
  }
  function boundsContains(rect, x, y, tolerance = 0) {
    if (!rect) {
      return false;
    }
    const left = rect.left - tolerance;
    const right = rect.right + tolerance;
    const top = rect.top - tolerance;
    const bottom = rect.bottom + tolerance;
    return x >= left && x <= right && y >= top && y <= bottom;
  }

  // src/utils/path.js
  var EPSILON2 = Number.EPSILON;
  function isRelativeAnchor(anchor2) {
    return !(typeof anchor2.relative === "boolean") || !!anchor2.relative;
  }
  function setHandleComponent(anchor2, side, dx, dy) {
    const controls = anchor2.controls;
    if (!controls || !controls[side]) {
      return;
    }
    if (Math.abs(dx) < EPSILON2 && Math.abs(dy) < EPSILON2) {
      if (isRelativeAnchor(anchor2)) {
        controls[side].clear();
      } else {
        controls[side].set(anchor2.x, anchor2.y);
      }
      return;
    }
    if (isRelativeAnchor(anchor2)) {
      controls[side].set(dx, dy);
    } else {
      controls[side].set(anchor2.x + dx, anchor2.y + dy);
    }
  }
  function clearHandleComponent(anchor2, side) {
    setHandleComponent(anchor2, side, 0, 0);
  }
  function getHandleOffset(anchor2, side) {
    const controls = anchor2.controls;
    if (!controls || !controls[side]) {
      return { x: 0, y: 0 };
    }
    if (isRelativeAnchor(anchor2)) {
      return { x: controls[side].x, y: controls[side].y };
    }
    return {
      x: controls[side].x - anchor2.x,
      y: controls[side].y - anchor2.y
    };
  }
  function hasNonZeroHandle(anchor2, side) {
    const offset = getHandleOffset(anchor2, side);
    return Math.abs(offset.x) > EPSILON2 || Math.abs(offset.y) > EPSILON2;
  }
  function updateAnchorCommand(anchor2) {
    if (anchor2.command === Commands.move || anchor2.command === Commands.close) {
      return;
    }
    anchor2.command = hasNonZeroHandle(anchor2, "left") || hasNonZeroHandle(anchor2, "right") ? Commands.curve : Commands.line;
  }
  function inheritRelative(anchor2, reference) {
    if (typeof reference.relative === "boolean") {
      anchor2.relative = reference.relative;
    }
  }
  function isSegmentCurved(a, b) {
    return hasNonZeroHandle(b, "right") || hasNonZeroHandle(a, "left") || hasNonZeroHandle(a, "right") || hasNonZeroHandle(b, "left") || a.command === Commands.curve || b.command === Commands.curve;
  }
  function lerpPoint(a, b, t) {
    return {
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t)
    };
  }
  function getAbsoluteHandle(anchor2, side) {
    const controls = anchor2.controls && anchor2.controls[side];
    if (!controls) {
      return { x: anchor2.x, y: anchor2.y };
    }
    if (isRelativeAnchor(anchor2)) {
      return { x: anchor2.x + controls.x, y: anchor2.y + controls.y };
    }
    return { x: controls.x, y: controls.y };
  }
  function splitSubdivisionSegment(start, end, t) {
    const right = start.controls && start.controls.right;
    const left = end.controls && end.controls.left;
    const p0 = { x: start.x, y: start.y };
    const p1 = right ? getAbsoluteHandle(start, "right") : { ...p0 };
    const p3 = { x: end.x, y: end.y };
    const p2 = left ? getAbsoluteHandle(end, "left") : { ...p3 };
    const q0 = lerpPoint(p0, p1, t);
    const q1 = lerpPoint(p1, p2, t);
    const q2 = lerpPoint(p2, p3, t);
    const r0 = lerpPoint(q0, q1, t);
    const r1 = lerpPoint(q1, q2, t);
    const point = lerpPoint(r0, r1, t);
    const anchor2 = new Anchor(point.x, point.y);
    inheritRelative(anchor2, start);
    setHandleComponent(anchor2, "left", r0.x - point.x, r0.y - point.y);
    setHandleComponent(anchor2, "right", r1.x - point.x, r1.y - point.y);
    anchor2.command = Commands.curve;
    return {
      anchor: anchor2,
      startOut: q0,
      endIn: q2
    };
  }
  function applyGlobalSmooth(vertices, from, to, closed2, loop2, asymmetric) {
    const length = vertices.length;
    const amount = to - from + 1;
    let n = amount - 1;
    let padding = loop2 ? Math.min(amount, 4) : 1;
    let paddingLeft = padding;
    let paddingRight = padding;
    if (!closed2) {
      paddingLeft = Math.min(1, from);
      paddingRight = Math.min(1, length - to - 1);
    }
    n += paddingLeft + paddingRight;
    if (n <= 1) {
      return;
    }
    const knots = new Array(n + 1);
    for (let i = 0, j = from - paddingLeft; i <= n; i += 1, j += 1) {
      const index = mod(j, length);
      knots[i] = vertices[index];
    }
    let x = knots[0].x + 2 * knots[1].x;
    let y = knots[0].y + 2 * knots[1].y;
    let f = 2;
    const n1 = n - 1;
    const rx = [x];
    const ry = [y];
    const rf = [f];
    const px = new Array(n + 1);
    const py = new Array(n + 1);
    for (let i = 1; i < n; i += 1) {
      const internal = i < n1;
      const a = internal ? 1 : asymmetric ? 1 : 2;
      const b = internal ? 4 : asymmetric ? 2 : 7;
      const u = internal ? 4 : asymmetric ? 3 : 8;
      const v = internal ? 2 : asymmetric ? 0 : 1;
      const m = a / f;
      f = rf[i] = b - m;
      x = rx[i] = u * knots[i].x + v * knots[i + 1].x - m * x;
      y = ry[i] = u * knots[i].y + v * knots[i + 1].y - m * y;
    }
    px[n1] = rx[n1] / rf[n1];
    py[n1] = ry[n1] / rf[n1];
    for (let i = n - 2; i >= 0; i -= 1) {
      px[i] = (rx[i] - px[i + 1]) / rf[i];
      py[i] = (ry[i] - py[i + 1]) / rf[i];
    }
    px[n] = (3 * knots[n].x - px[n1]) / 2;
    py[n] = (3 * knots[n].y - py[n1]) / 2;
    const max5 = n - paddingRight;
    for (let i = paddingLeft, j = from; i <= max5; i += 1, j += 1) {
      const index = mod(j, length);
      const anchor2 = vertices[index];
      const hx = px[i] - anchor2.x;
      const hy = py[i] - anchor2.y;
      if (loop2 || i < max5) {
        setHandleComponent(anchor2, "right", hx, hy);
      } else {
        clearHandleComponent(anchor2, "right");
      }
      if (loop2 || i > paddingLeft) {
        setHandleComponent(anchor2, "left", -hx, -hy);
      } else {
        clearHandleComponent(anchor2, "left");
      }
      updateAnchorCommand(anchor2);
    }
  }
  function applyCatmullRom(anchor2, prev, next, factor, clampIn, clampOut) {
    const p0 = prev || anchor2;
    const p1 = anchor2;
    const p2 = next || anchor2;
    const d1 = Vector.distanceBetween(p0, p1);
    const d2 = Vector.distanceBetween(p1, p2);
    const a = factor === void 0 ? 0.5 : factor;
    const d1a = Math.pow(d1, a);
    const d2a = Math.pow(d2, a);
    const d1_2a = d1a * d1a;
    const d2_2a = d2a * d2a;
    if (!clampIn && prev) {
      const A = 2 * d2_2a + 3 * d2a * d1a + d1_2a;
      const N = 3 * d2a * (d2a + d1a);
      if (N !== 0) {
        const hx = (d2_2a * p0.x + A * p1.x - d1_2a * p2.x) / N - p1.x;
        const hy = (d2_2a * p0.y + A * p1.y - d1_2a * p2.y) / N - p1.y;
        setHandleComponent(anchor2, "left", hx, hy);
      } else {
        clearHandleComponent(anchor2, "left");
      }
    } else {
      clearHandleComponent(anchor2, "left");
    }
    if (!clampOut && next) {
      const A = 2 * d1_2a + 3 * d1a * d2a + d2_2a;
      const N = 3 * d1a * (d1a + d2a);
      if (N !== 0) {
        const hx = (d1_2a * p2.x + A * p1.x - d2_2a * p0.x) / N - p1.x;
        const hy = (d1_2a * p2.y + A * p1.y - d2_2a * p0.y) / N - p1.y;
        setHandleComponent(anchor2, "right", hx, hy);
      } else {
        clearHandleComponent(anchor2, "right");
      }
    } else {
      clearHandleComponent(anchor2, "right");
    }
    updateAnchorCommand(anchor2);
  }
  function applyGeometric(anchor2, prev, next, factor, clampIn, clampOut) {
    if (!(prev && next)) {
      if (!prev) {
        clearHandleComponent(anchor2, "left");
      }
      if (!next) {
        clearHandleComponent(anchor2, "right");
      }
      updateAnchorCommand(anchor2);
      return;
    }
    const p0 = prev;
    const p1 = anchor2;
    const p2 = next;
    const d1 = Vector.distanceBetween(p0, p1);
    const d2 = Vector.distanceBetween(p1, p2);
    const total = d1 + d2;
    const tension = factor === void 0 ? 0.4 : factor;
    const vector3 = { x: p0.x - p2.x, y: p0.y - p2.y };
    if (!clampIn && total !== 0) {
      const k = tension * d1 / total;
      setHandleComponent(anchor2, "left", vector3.x * k, vector3.y * k);
    } else {
      clearHandleComponent(anchor2, "left");
    }
    if (!clampOut && total !== 0) {
      const k = tension * d1 / total - tension;
      setHandleComponent(anchor2, "right", vector3.x * k, vector3.y * k);
    } else {
      clearHandleComponent(anchor2, "right");
    }
    updateAnchorCommand(anchor2);
  }
  function applyLocalSmooth(vertices, from, to, closed2, loop2, options) {
    const type = options.type || "catmull-rom";
    const factor = options.factor;
    const length = vertices.length;
    for (let i = from; i <= to; i += 1) {
      const index = mod(i, length);
      const anchor2 = vertices[index];
      if (anchor2.command === Commands.move) {
        clearHandleComponent(anchor2, "left");
        clearHandleComponent(anchor2, "right");
        continue;
      }
      const prevIndex = i === from && !loop2 ? null : i - 1;
      const nextIndex = i === to && !loop2 ? null : i + 1;
      const prev = prevIndex === null ? null : vertices[mod(prevIndex, length)];
      const next = nextIndex === null ? null : vertices[mod(nextIndex, length)];
      const clampIn = prevIndex === null;
      const clampOut = nextIndex === null;
      if (type === "geometric") {
        applyGeometric(anchor2, prev, next, factor, clampIn, clampOut);
      } else {
        applyCatmullRom(anchor2, prev, next, factor, clampIn, clampOut);
      }
    }
  }

  // src/path.js
  var min = Math.min;
  var max = Math.max;
  var ceil = Math.ceil;
  var floor2 = Math.floor;
  var vector = new Vector();
  var hitTestMatrix = new Matrix2();
  var Path = class _Path extends Shape {
    /**
     * @name Two.Path#_flagVertices
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#vertices} need updating.
     */
    _flagVertices = true;
    /**
     * @name Two.Path#_flagLength
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#length} needs updating.
     */
    _flagLength = true;
    /**
     * @name Two.Path#_flagFill
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#fill} needs updating.
     */
    _flagFill = true;
    /**
     * @name Two.Path#_flagStroke
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#stroke} needs updating.
     */
    _flagStroke = true;
    /**
     * @name Two.Path#_flagLinewidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#linewidth} needs updating.
     */
    _flagLinewidth = true;
    /**
     * @name Two.Path#_flagOpacity
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#opacity} needs updating.
     */
    _flagOpacity = true;
    /**
     * @name Two.Path#_flagVisible
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#visible} needs updating.
     */
    _flagVisible = true;
    /**
     * @name Two.Path#_flagCap
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#cap} needs updating.
     */
    _flagCap = true;
    /**
     * @name Two.Path#_flagJoin
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#join} needs updating.
     */
    _flagJoin = true;
    /**
     * @name Two.Path#_flagMiter
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#miter} needs updating.
     */
    _flagMiter = true;
    /**
     * @name Two.Path#_flagStrokeAttenuation
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#strokeAttenuation} needs updating.
     */
    _flagStrokeAttenuation = true;
    /**
     * @name Two.Path#_flagMask
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#mask} needs updating.
     */
    _flagMask = false;
    /**
     * @name Two.Path#_flagClip
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Path#clip} needs updating.
     */
    _flagClip = false;
    // Underlying Properties
    /**
     * @name Two.Path#_length
     * @private
     * @see {@link Two.Path#length}
     */
    _length = 0;
    /**
     * @name Two.Path#_fill
     * @private
     * @see {@link Two.Path#fill}
     */
    _fill = "#fff";
    /**
     * @name Two.Path#_stroke
     * @private
     * @see {@link Two.Path#stroke}
     */
    _stroke = "#000";
    /**
     * @name Two.Path#_linewidth
     * @private
     * @see {@link Two.Path#linewidth}
     */
    _linewidth = 1;
    /**
     * @name Two.Path#_opacity
     * @private
     * @see {@link Two.Path#opacity}
     */
    _opacity = 1;
    /**
     * @name Two.Path#_visible
     * @private
     * @see {@link Two.Path#visible}
     */
    _visible = true;
    /**
     * @name Two.Path#_cap
     * @private
     * @see {@link Two.Path#cap}
     */
    _cap = "round";
    /**
     * @name Two.Path#_join
     * @private
     * @see {@link Two.Path#join}
     */
    _join = "round";
    /**
     * @name Two.Path#_miter
     * @private
     * @see {@link Two.Path#miter}
     */
    _miter = 4;
    /**
     * @name Two.Path#_closed
     * @private
     * @see {@link Two.Path#closed}
     */
    _closed = true;
    /**
     * @name Two.Path#_curved
     * @private
     * @see {@link Two.Path#curved}
     */
    _curved = false;
    /**
     * @name Two.Path#_automatic
     * @private
     * @see {@link Two.Path#automatic}
     */
    _automatic = true;
    /**
     * @name Two.Path#_beginning
     * @private
     * @see {@link Two.Path#beginning}
     */
    _beginning = 0;
    /**
     * @name Two.Path#_ending
     * @private
     * @see {@link Two.Path#ending}
     */
    _ending = 1;
    /**
     * @name Two.Path#_mask
     * @private
     * @see {@link Two.Path#mask}
     */
    _mask = null;
    /**
     * @name Two.Path#_clip
     * @private
     * @see {@link Two.Path#clip}
     */
    _clip = false;
    /**
     * @name Two.Path#_dashes
     * @private
     * @see {@link Two.Path#dashes}
     */
    _dashes = null;
    /**
     * @name Two.Path#_strokeAttenuation
     * @private
     * @see {@link Two.Path#strokeAttenuation}
     */
    _strokeAttenuation = true;
    constructor(vertices, closed2, curved, manual) {
      super();
      for (let prop in proto10) {
        Object.defineProperty(this, prop, proto10[prop]);
      }
      this._renderer.type = "path";
      this._renderer.flagVertices = FlagVertices.bind(this);
      this._renderer.bindVertices = BindVertices.bind(this);
      this._renderer.unbindVertices = UnbindVertices.bind(this);
      this._renderer.flagFill = FlagFill.bind(this);
      this._renderer.flagStroke = FlagStroke.bind(this);
      this._renderer.vertices = [];
      this._renderer.collection = [];
      this.closed = !!closed2;
      this.curved = !!curved;
      this.beginning = 0;
      this.ending = 1;
      this.fill = "#fff";
      this.stroke = "#000";
      this.linewidth = 1;
      this.opacity = 1;
      this.className = "";
      this.visible = true;
      this.cap = "butt";
      this.join = "miter";
      this.miter = 4;
      this.vertices = vertices;
      this.automatic = !manual;
      this.dashes = [];
      this.dashes.offset = 0;
    }
    /**
     * @name Two.Path.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Path}.
     */
    static Properties = [
      "fill",
      "stroke",
      "linewidth",
      "opacity",
      "visible",
      "cap",
      "join",
      "miter",
      "closed",
      "curved",
      "automatic",
      "beginning",
      "ending",
      "dashes",
      "strokeAttenuation"
    ];
    static Utils = {
      getCurveLength: getCurveLength2
    };
    /**
     * @name Two.Path.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Path} to create a new instance
     * @returns {Two.Path}
     * @description Create a new {@link Two.Path} from an object notation of a {@link Two.Path}.
     * @nota-bene Works in conjunction with {@link Two.Path#toObject}
     */
    static fromObject(obj) {
      const fill = typeof obj.fill === "string" ? obj.fill : getEffectFromObject(obj.fill);
      const stroke = typeof obj.stroke === "string" ? obj.stroke : getEffectFromObject(obj.stroke);
      const path = new _Path().copy({ ...obj, fill, stroke });
      if ("id" in obj) {
        path.id = obj.id;
      }
      return path;
    }
    /**
     * @name Two.Path#copy
     * @function
     * @param {Two.Path} path - The reference {@link Two.Path}
     * @description Copy the properties of one {@link Two.Path} onto another.
     */
    copy(path) {
      super.copy.call(this, path);
      if (path.vertices) {
        this.vertices = [];
        for (let j = 0; j < path.vertices.length; j++) {
          const v = path.vertices[j];
          if (v instanceof Anchor) {
            this.vertices.push(path.vertices[j].clone());
          } else {
            this.vertices.push(new Anchor().copy(v));
          }
        }
      }
      for (let i = 0; i < _Path.Properties.length; i++) {
        const k = _Path.Properties[i];
        if (k in path) {
          this[k] = path[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Path#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Path}
     * @description Create a new instance of {@link Two.Path} with the same properties of the current path.
     */
    clone(parent) {
      const clone = new _Path();
      for (let j = 0; j < this.vertices.length; j++) {
        clone.vertices.push(this.vertices[j].clone());
      }
      for (let i = 0; i < _Path.Properties.length; i++) {
        const k = _Path.Properties[i];
        clone[k] = this[k];
      }
      clone.className = this.className;
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      if (parent) {
        parent.add(clone);
      }
      return clone._update();
    }
    /**
     * @name Two.Path#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     * @nota-bene Works in conjunction with {@link Two.Path.fromObject}
     */
    toObject() {
      const result = super.toObject.call(this);
      result.renderer.type = "path";
      result.vertices = this.vertices.map((v) => v.toObject());
      _.each(
        _Path.Properties,
        (k) => {
          if (typeof this[k] !== "undefined") {
            if (this[k].toObject) {
              result[k] = this[k].toObject();
            } else {
              result[k] = this[k];
            }
          }
        },
        this
      );
      return result;
    }
    /**
     * @name Two.Path#dispose
     * @function
     * @returns {Two.Path}
     * @description Release the path's renderer resources and detach all events.
     * This method cleans up vertices collection events, individual vertex events,
     * control point events, and disposes fill/stroke effects (calling dispose()
     * on Gradients and Textures for thorough cleanup) while preserving the
     * renderer type for potential re-attachment to a new renderer.
     */
    dispose() {
      super.dispose();
      if (this.vertices && typeof this.vertices.unbind === "function") {
        try {
          this.vertices.unbind();
        } catch (e) {
        }
      }
      if (this.vertices) {
        for (let i = 0; i < this.vertices.length; i++) {
          const v = this.vertices[i];
          if (typeof v.unbind === "function") {
            v.unbind();
          }
          if (v.controls) {
            if (v.controls.left && typeof v.controls.left.unbind === "function") {
              v.controls.left.unbind();
            }
            if (v.controls.right && typeof v.controls.right.unbind === "function") {
              v.controls.right.unbind();
            }
          }
        }
      }
      if (typeof this.fill === "object" && typeof this.fill.dispose === "function") {
        this.fill.dispose();
      } else if (typeof this.fill === "object" && typeof this.fill.unbind === "function") {
        this.fill.unbind();
      }
      if (typeof this.stroke === "object" && typeof this.stroke.dispose === "function") {
        this.stroke.dispose();
      } else if (typeof this.stroke === "object" && typeof this.stroke.unbind === "function") {
        this.stroke.unbind();
      }
      return this;
    }
    /**
     * @name Two.Path#noFill
     * @function
     * @description Short hand method to set fill to `none`.
     */
    noFill() {
      this.fill = "none";
      return this;
    }
    /**
     * @name Two.Path#noStroke
     * @function
     * @description Short hand method to set stroke to `none`.
     */
    noStroke() {
      this.stroke = "none";
      this.linewidth = 0;
      return this;
    }
    /**
     * @name Two.Path#corner
     * @function
     * @description Orient the vertices of the shape to the upper left-hand corner of the path.
     */
    corner() {
      const rect = this.getBoundingClientRect(true);
      const hw = rect.width / 2;
      const hh = rect.height / 2;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      for (let i = 0; i < this.vertices.length; i++) {
        const v = this.vertices[i];
        v.x -= cx;
        v.y -= cy;
        v.x += hw;
        v.y += hh;
      }
      if (this.mask) {
        this.mask.translation.x -= cx;
        this.mask.translation.x += hw;
        this.mask.translation.y -= cy;
        this.mask.translation.y += hh;
      }
      return this;
    }
    /**
     * @name Two.Path#center
     * @function
     * @description Orient the vertices of the shape to the center of the path.
     */
    center() {
      const rect = this.getBoundingClientRect(true);
      const cx = rect.left + rect.width / 2 - this.translation.x;
      const cy = rect.top + rect.height / 2 - this.translation.y;
      for (let i = 0; i < this.vertices.length; i++) {
        const v = this.vertices[i];
        v.x -= cx;
        v.y -= cy;
      }
      if (this.mask) {
        this.mask.translation.x -= cx;
        this.mask.translation.y -= cy;
      }
      return this;
    }
    /**
     * @name Two.Path#getBoundingClientRect
     * @function
     * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
     * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
     * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
     */
    getBoundingClientRect(shallow) {
      let matrix, border, l, i, v0, v1;
      let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
      this._update(true);
      matrix = shallow ? this.matrix : this.worldMatrix;
      border = (this.linewidth || 0) / 2;
      l = this._renderer.vertices.length;
      if (this.linewidth > 0 || this.stroke && !/(transparent|none)/i.test(this.stroke)) {
        if (this.matrix.manual) {
          const { scaleX, scaleY } = decomposeMatrix(
            matrix.elements[0],
            matrix.elements[3],
            matrix.elements[1],
            matrix.elements[4],
            matrix.elements[2],
            matrix.elements[5]
          );
          if (typeof scaleX === "number" && typeof scaleY === "number") {
            border = Math.max(scaleX, scaleY) * (this.linewidth || 0) / 2;
          }
        } else {
          border *= typeof this.scale === "number" ? this.scale : Math.max(this.scale.x, this.scale.y);
        }
      }
      if (l <= 0) {
        return {
          width: 0,
          height: 0
        };
      }
      for (i = 0; i < l; i++) {
        v1 = this._renderer.vertices[i];
        v0 = this._renderer.vertices[(i + l - 1) % l];
        const [v0x, v0y] = matrix.multiply(v0.x, v0.y);
        const [v1x, v1y] = matrix.multiply(v1.x, v1.y);
        if (v0.controls && v1.controls) {
          let rx = v0.controls.right.x;
          let ry = v0.controls.right.y;
          if (v0.relative) {
            rx += v0.x;
            ry += v0.y;
          }
          let [c0x, c0y] = matrix.multiply(rx, ry);
          let lx = v1.controls.left.x;
          let ly = v1.controls.left.y;
          if (v1.relative) {
            lx += v1.x;
            ly += v1.y;
          }
          let [c1x, c1y] = matrix.multiply(lx, ly);
          const bb = getCurveBoundingBox(v0x, v0y, c0x, c0y, c1x, c1y, v1x, v1y);
          top = min(bb.min.y - border, top);
          left = min(bb.min.x - border, left);
          right = max(bb.max.x + border, right);
          bottom = max(bb.max.y + border, bottom);
        } else {
          if (i <= 1) {
            top = min(v0y - border, top);
            left = min(v0x - border, left);
            right = max(v0x + border, right);
            bottom = max(v0y + border, bottom);
          }
          top = min(v1y - border, top);
          left = min(v1x - border, left);
          right = max(v1x + border, right);
          bottom = max(v1y + border, bottom);
        }
      }
      return {
        top,
        left,
        right,
        bottom,
        width: right - left,
        height: bottom - top
      };
    }
    /**
     * @name Two.Path#contains
     * @function
     * @param {Number} x - x coordinate to hit test against
     * @param {Number} y - y coordinate to hit test against
     * @param {Object} [options] - Optional options object
     * @param {Boolean} [options.ignoreVisibility] - If `true`, hit test against `path.visible = false` shapes
     * @param {Number} [options.tolerance] - Padding to hit test against in pixels
     * @returns {Boolean}
     * @description Check to see if coordinates are within a {@link Two.Path}'s bounding rectangle
     * @nota-bene Expects *world-space coordinates* – the same pixel-space you get from the renderer (e.g., mouse `clientX`/`clientY` adjusted for the canvas’s offset and pixel ratio).
     */
    contains(x, y, options) {
      const opts = options || {};
      const ignoreVisibility = opts.ignoreVisibility === true;
      if (!ignoreVisibility && this.visible === false) {
        return false;
      }
      if (!ignoreVisibility && typeof this.opacity === "number" && this.opacity <= 0) {
        return false;
      }
      const tolerance = typeof opts.tolerance === "number" ? opts.tolerance : 0;
      this._update(true);
      const rect = this.getBoundingClientRect();
      if (!rect || x < rect.left - tolerance || x > rect.right + tolerance || y < rect.top - tolerance || y > rect.bottom + tolerance) {
        return false;
      }
      const matrix = this.worldMatrix;
      const inverse = matrix && matrix.inverse(hitTestMatrix);
      if (!inverse) {
        return super.contains(x, y, opts);
      }
      const [localX, localY] = inverse.multiply(x, y, 1);
      const precision = typeof opts.precision === "number" && !Number.isNaN(opts.precision) ? Math.max(1, Math.floor(opts.precision)) : 8;
      const fillTest = hasVisibleFill(this, opts.fill);
      const strokeTest = hasVisibleStroke(this, opts.stroke);
      const { polygons, segments } = buildPathHitParts(this, precision);
      if (fillTest && polygons.length > 0) {
        if (pointInPolygons(polygons, localX, localY)) {
          return true;
        }
      }
      if (strokeTest && segments.length > 0) {
        const linewidth = typeof this.linewidth === "number" ? this.linewidth : 0;
        if (linewidth > 0) {
          const distance = distanceToSegments(segments, localX, localY);
          if (distance <= linewidth / 2 + tolerance) {
            return true;
          }
        }
      }
      if (!fillTest && !strokeTest) {
        return super.contains(x, y, opts);
      }
      if (fillTest && polygons.length === 0) {
        return super.contains(x, y, opts);
      }
      return false;
    }
    /**
     * @name Two.Path#getPointAt
     * @function
     * @param {Number} t - Percentage value describing where on the {@link Two.Path} to estimate and assign coordinate values.
     * @param {Two.Vector} [obj] - Object to apply calculated x, y to. If none available returns new `Object`.
     * @returns {Object}
     * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this {@link Two.Path}'s curve.
     */
    getPointAt(t, obj) {
      let ia, ib, result;
      let x, x1, x2, x3, x4, y, y1, y2, y3, y4, left, right;
      let target = this.length * Math.min(Math.max(t, 0), 1);
      const length = this.vertices.length;
      const last = length - 1;
      let a = null;
      let b = null;
      for (let i = 0, l = this._lengths.length, sum = 0; i < l; i++) {
        if (sum + this._lengths[i] >= target) {
          if (this._closed) {
            ia = mod(i, length);
            ib = mod(i - 1, length);
            if (i === 0) {
              ia = ib;
              ib = i;
            }
          } else {
            ia = i;
            ib = Math.min(Math.max(i - 1, 0), last);
          }
          a = this.vertices[ia];
          b = this.vertices[ib];
          target -= sum;
          if (this._lengths[i] !== 0) {
            t = target / this._lengths[i];
          } else {
            t = 0;
          }
          break;
        }
        sum += this._lengths[i];
      }
      if (a === null || b === null) {
        return null;
      }
      if (!a) {
        return b;
      } else if (!b) {
        return a;
      }
      right = b.controls && b.controls.right;
      left = a.controls && a.controls.left;
      x1 = b.x;
      y1 = b.y;
      x2 = (right || b).x;
      y2 = (right || b).y;
      x3 = (left || a).x;
      y3 = (left || a).y;
      x4 = a.x;
      y4 = a.y;
      if (right && b.relative) {
        x2 += b.x;
        y2 += b.y;
      }
      if (left && a.relative) {
        x3 += a.x;
        y3 += a.y;
      }
      x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
      y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
      const t1x = lerp(x1, x2, t);
      const t1y = lerp(y1, y2, t);
      const t2x = lerp(x2, x3, t);
      const t2y = lerp(y2, y3, t);
      const t3x = lerp(x3, x4, t);
      const t3y = lerp(y3, y4, t);
      const brx = lerp(t1x, t2x, t);
      const bry = lerp(t1y, t2y, t);
      const alx = lerp(t2x, t3x, t);
      const aly = lerp(t2y, t3y, t);
      if (_.isObject(obj)) {
        obj.x = x;
        obj.y = y;
        if (obj instanceof Anchor) {
          obj.controls.left.x = brx;
          obj.controls.left.y = bry;
          obj.controls.right.x = alx;
          obj.controls.right.y = aly;
          if (!(typeof obj.relative === "boolean") || obj.relative) {
            obj.controls.left.x -= x;
            obj.controls.left.y -= y;
            obj.controls.right.x -= x;
            obj.controls.right.y -= y;
          }
        }
        obj.t = t;
        return obj;
      }
      result = new Anchor(
        x,
        y,
        brx - x,
        bry - y,
        alx - x,
        aly - y,
        this._curved ? Commands.curve : Commands.line
      );
      result.t = t;
      return result;
    }
    /**
     * @name Two.Path#plot
     * @function
     * @description Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
     * @nota-bene While this method is public it is internally called by {@link Two.Path#_update} when `automatic = true`.
     */
    plot() {
      if (this.curved) {
        getCurveFromPoints(this._collection, this.closed);
        return this;
      }
      for (let i = 0; i < this._collection.length; i++) {
        this._collection[i].command = i === 0 ? Commands.move : Commands.line;
      }
      return this;
    }
    /**
     * @name Two.Path#smooth
     * @function
     * @param {Object} [options] - Configuration for smoothing.
     * @param {String} [options.type='continuous'] - Type of smoothing algorithm.
     * @param {Number} [options.from=0] - Index of vertices to start smoothing
     * @param {Number} [options.to=1] - Index of vertices to terminate smoothing
     * @description Adjust vertex handles to generate smooth curves without toggling `automatic`.
     */
    smooth(options) {
      const opts = options || {};
      const type = opts.type || "continuous";
      const vertices = this._collection;
      const length = vertices.length;
      if (length < 2) {
        return this;
      }
      const closed2 = this._closed || length > 0 && vertices[length - 1] && vertices[length - 1].command === Commands.close;
      const resolveIndex = (value, defaultIndex) => {
        if (value === void 0 || value === null) {
          return defaultIndex;
        }
        if (typeof value === "number") {
          if (closed2) {
            return mod(value, length);
          }
          let index = value;
          if (index < 0) {
            index += length;
          }
          return Math.min(Math.max(index, 0), length - 1);
        }
        const idx = vertices.indexOf(value);
        return idx !== -1 ? idx : defaultIndex;
      };
      const loop2 = closed2 && opts.from === void 0 && opts.to === void 0;
      let from = resolveIndex(opts.from, 0);
      let to = resolveIndex(opts.to, length - 1);
      if (from > to) {
        if (closed2) {
          from -= length;
        } else {
          const temp2 = from;
          from = to;
          to = temp2;
        }
      }
      const rangeLength = to - from + 1;
      for (let i = 0; i < rangeLength; i += 1) {
        const index = mod(from + i, length);
        const anchor2 = vertices[index];
        const isOpenStart = !closed2 && index === 0;
        if (anchor2.command === Commands.move && !isOpenStart) {
          anchor2.command = Commands.line;
        }
      }
      if (type === "continuous" || type === "asymmetric") {
        applyGlobalSmooth(
          vertices,
          from,
          to,
          closed2,
          loop2,
          type === "asymmetric"
        );
      } else if (type === "catmull-rom" || type === "geometric") {
        const range = {
          type,
          factor: opts.factor
        };
        applyLocalSmooth(vertices, from, to, closed2, loop2, range);
      } else {
        throw new Error(
          `Path.smooth does not support type "${type}". Try 'continuous', 'asymmetric', 'catmull-rom', or 'geometric'.`
        );
      }
      this._automatic = false;
      this._flagVertices = true;
      this._flagLength = true;
      return this;
    }
    /**
     * @name Two.Path#subdivide
     * @function
     * @param {Number} limit - How many times to recurse subdivisions.
     * @description Insert a {@link Two.Anchor} at the midpoint between every item in {@link Two.Path#vertices}.
     */
    subdivide(limit) {
      this._update();
      const vertices = this.vertices;
      const length = vertices.length;
      if (length < 2) {
        return this;
      }
      const points = [];
      let prevOriginal = null;
      let subpathStartOriginal = null;
      for (let i = 0; i < length; i += 1) {
        const currentOriginal = vertices[i];
        if (!prevOriginal || currentOriginal.command === Commands.move) {
          const clone = currentOriginal.clone();
          points.push(clone);
          prevOriginal = currentOriginal;
          subpathStartOriginal = currentOriginal;
          continue;
        }
        const isCurve = isSegmentCurved(currentOriginal, prevOriginal);
        if (isCurve) {
          const subdivided = getSubdivisions(
            currentOriginal,
            prevOriginal,
            limit
          );
          const steps = subdivided.length;
          const prevClone = points[points.length - 1];
          let startSegment = prevClone.clone();
          let endSegment = currentOriginal.clone();
          let prevCloneRef = prevClone;
          let prevT = 0;
          if (steps <= 1) {
            const currentClone = currentOriginal.clone();
            points.push(currentClone);
          } else {
            for (let j = 1; j < steps; j += 1) {
              const globalT = j / steps;
              const denom = 1 - prevT;
              const localT = denom <= Number.EPSILON ? globalT : (globalT - prevT) / denom;
              const split = splitSubdivisionSegment(
                startSegment,
                endSegment,
                localT
              );
              setHandleComponent(
                prevCloneRef,
                "right",
                split.startOut.x - prevCloneRef.x,
                split.startOut.y - prevCloneRef.y
              );
              const newAnchor = split.anchor;
              points.push(newAnchor);
              prevCloneRef = newAnchor;
              startSegment = newAnchor.clone();
              prevT = globalT;
              setHandleComponent(
                endSegment,
                "left",
                split.endIn.x - endSegment.x,
                split.endIn.y - endSegment.y
              );
            }
            const currentClone = currentOriginal.clone();
            currentClone.controls.left.copy(endSegment.controls.left);
            points.push(currentClone);
          }
        } else {
          const subdivided = getSubdivisions(
            currentOriginal,
            prevOriginal,
            limit
          );
          for (let j = 1; j < subdivided.length; j += 1) {
            const anchor2 = subdivided[j];
            inheritRelative(anchor2, prevOriginal);
            clearHandleComponent(anchor2, "left");
            clearHandleComponent(anchor2, "right");
            anchor2.command = Commands.line;
            points.push(anchor2);
          }
          const currentClone = currentOriginal.clone();
          points.push(currentClone);
        }
        prevOriginal = currentOriginal;
        if (currentOriginal.command === Commands.close) {
          prevOriginal = subpathStartOriginal;
        }
      }
      this._automatic = false;
      this._curved = false;
      this.vertices = points;
      return this;
    }
    /**
     * @name Two.Path#_updateLength
     * @function
     * @private
     * @param {Number} [limit] -
     * @param {Boolean} [silent=false] - If set to `true` then the path isn't updated before calculation. Useful for internal use.
     * @description Recalculate the {@link Two.Path#length} value.
     */
    _updateLength(limit, silent) {
      if (!silent) {
        this._update();
      }
      const length = this.vertices.length;
      const last = length - 1;
      const closed2 = false;
      let b = this.vertices[last];
      let sum = 0;
      if (typeof this._lengths === "undefined") {
        this._lengths = [];
      }
      _.each(
        this.vertices,
        function(a, i) {
          if (i <= 0 && !closed2 || a.command === Commands.move) {
            b = a;
            this._lengths[i] = 0;
            return;
          }
          this._lengths[i] = getCurveLength2(a, b, limit);
          sum += this._lengths[i];
          b = a;
        },
        this
      );
      this._length = sum;
      this._flagLength = false;
      return this;
    }
    /**
     * @name Two.Path#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagVertices) {
        if (this._automatic) {
          this.plot();
        }
        if (this._flagLength) {
          this._updateLength(void 0, true);
        }
        const l = this._collection.length;
        const closed2 = this._closed;
        const beginning = Math.min(this._beginning, this._ending);
        const ending = Math.max(this._beginning, this._ending);
        const bid = getIdByLength(this, beginning * this._length);
        const eid = getIdByLength(this, ending * this._length);
        const low = ceil(bid);
        const high = floor2(eid);
        let left, right, prev, next, v, i;
        this._renderer.vertices.length = 0;
        for (i = 0; i < l; i++) {
          if (this._renderer.collection.length <= i) {
            this._renderer.collection.push(new Anchor());
          }
          if (i > high && !right) {
            v = this._renderer.collection[i].copy(this._collection[i]);
            this.getPointAt(ending, v);
            v.command = this._renderer.collection[i].command;
            this._renderer.vertices.push(v);
            right = v;
            prev = this._collection[i - 1];
            if (prev && prev.controls) {
              if (v.relative) {
                v.controls.right.clear();
              } else {
                v.controls.right.copy(v);
              }
              if (prev.relative) {
                this._renderer.collection[i - 1].controls.right.copy(prev.controls.right).lerp(Vector.zero, 1 - v.t);
              } else {
                this._renderer.collection[i - 1].controls.right.copy(prev.controls.right).lerp(prev, 1 - v.t);
              }
            }
          } else if (i >= low && i <= high) {
            v = this._renderer.collection[i].copy(this._collection[i]);
            this._renderer.vertices.push(v);
            if (i === high && contains(this, ending)) {
              right = v;
              if (!closed2 && right.controls) {
                if (right.relative) {
                  right.controls.right.clear();
                } else {
                  right.controls.right.copy(right);
                }
              }
            } else if (i === low && contains(this, beginning)) {
              left = v;
              left.command = Commands.move;
              if (!closed2 && left.controls) {
                if (left.relative) {
                  left.controls.left.clear();
                } else {
                  left.controls.left.copy(left);
                }
              }
            }
          }
        }
        if (low > 0 && !left) {
          i = low - 1;
          v = this._renderer.collection[i].copy(this._collection[i]);
          this.getPointAt(beginning, v);
          v.command = Commands.move;
          this._renderer.vertices.unshift(v);
          next = this._collection[i + 1];
          if (next && next.controls) {
            v.controls.left.clear();
            if (next.relative) {
              this._renderer.collection[i + 1].controls.left.copy(next.controls.left).lerp(Vector.zero, v.t);
            } else {
              vector.copy(next);
              this._renderer.collection[i + 1].controls.left.copy(next.controls.left).lerp(next, v.t);
            }
          }
        }
      }
      Shape.prototype._update.apply(this, arguments);
      return this;
    }
    /**
     * @name Two.Path#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagCap = this._flagJoin = this._flagMiter = this._flagClip = this._flagStrokeAttenuation = false;
      Shape.prototype.flagReset.call(this);
      return this;
    }
  };
  var proto10 = {
    linewidth: {
      enumerable: true,
      get: function() {
        return this._linewidth;
      },
      set: function(v) {
        this._linewidth = v;
        this._flagLinewidth = true;
      }
    },
    opacity: {
      enumerable: true,
      get: function() {
        return this._opacity;
      },
      set: function(v) {
        this._opacity = v;
        this._flagOpacity = true;
      }
    },
    visible: {
      enumerable: true,
      get: function() {
        return this._visible;
      },
      set: function(v) {
        this._visible = v;
        this._flagVisible = true;
      }
    },
    cap: {
      enumerable: true,
      get: function() {
        return this._cap;
      },
      set: function(v) {
        this._cap = v;
        this._flagCap = true;
      }
    },
    join: {
      enumerable: true,
      get: function() {
        return this._join;
      },
      set: function(v) {
        this._join = v;
        this._flagJoin = true;
      }
    },
    miter: {
      enumerable: true,
      get: function() {
        return this._miter;
      },
      set: function(v) {
        this._miter = v;
        this._flagMiter = true;
      }
    },
    fill: {
      enumerable: true,
      get: function() {
        return this._fill;
      },
      set: function(f) {
        if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
          this._fill.unbind(Events.Types.change, this._renderer.flagFill);
        }
        this._fill = f;
        this._flagFill = true;
        if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
          this._fill.bind(Events.Types.change, this._renderer.flagFill);
        }
      }
    },
    stroke: {
      enumerable: true,
      get: function() {
        return this._stroke;
      },
      set: function(f) {
        if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
          this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
        }
        this._stroke = f;
        this._flagStroke = true;
        if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
          this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
        }
      }
    },
    /**
     * @name Two.Path#length
     * @property {Number} - The sum of distances between all {@link Two.Path#vertices}.
     */
    length: {
      get: function() {
        if (this._flagLength) {
          this._updateLength();
        }
        return this._length;
      }
    },
    closed: {
      enumerable: true,
      get: function() {
        return this._closed;
      },
      set: function(v) {
        this._closed = !!v;
        this._flagVertices = true;
      }
    },
    curved: {
      enumerable: true,
      get: function() {
        return this._curved;
      },
      set: function(v) {
        this._curved = !!v;
        this._flagVertices = true;
      }
    },
    automatic: {
      enumerable: true,
      get: function() {
        return this._automatic;
      },
      set: function(v) {
        if (v === this._automatic) {
          return;
        }
        this._automatic = !!v;
        const method = this._automatic ? "ignore" : "listen";
        _.each(this.vertices, function(v2) {
          v2[method]();
        });
      }
    },
    beginning: {
      enumerable: true,
      get: function() {
        return this._beginning;
      },
      set: function(v) {
        this._beginning = v;
        this._flagVertices = true;
      }
    },
    ending: {
      enumerable: true,
      get: function() {
        return this._ending;
      },
      set: function(v) {
        this._ending = v;
        this._flagVertices = true;
      }
    },
    vertices: {
      enumerable: true,
      get: function() {
        return this._collection;
      },
      set: function(vertices) {
        const bindVertices = this._renderer.bindVertices;
        const unbindVertices = this._renderer.unbindVertices;
        if (this._collection) {
          this._collection.unbind(Events.Types.insert, bindVertices).unbind(Events.Types.remove, unbindVertices);
        }
        if (vertices instanceof Collection) {
          this._collection = vertices;
        } else {
          this._collection = new Collection(vertices || []);
        }
        this._collection.bind(Events.Types.insert, bindVertices).bind(Events.Types.remove, unbindVertices);
        bindVertices(this._collection);
      }
    },
    /**
     * @name Two.Path#mask
     * @property {Two.Shape} - The shape whose alpha property becomes a clipping area for the path.
     * @nota-bene This property is currently not working because of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
     */
    mask: {
      enumerable: true,
      get: function() {
        return this._mask;
      },
      set: function(v) {
        this._mask = v;
        this._flagMask = true;
        if (_.isObject(v) && !v.clip) {
          v.clip = true;
        }
      }
    },
    /**
     * @name Two.Path#clip
     * @property {Boolean} - Tells Two.js renderer if this object represents a mask for another object (or not).
     */
    clip: {
      enumerable: true,
      get: function() {
        return this._clip;
      },
      set: function(v) {
        this._clip = v;
        this._flagClip = true;
      }
    },
    dashes: {
      enumerable: true,
      get: function() {
        return this._dashes;
      },
      set: function(v) {
        if (typeof v.offset !== "number") {
          v.offset = this.dashes && this._dashes.offset || 0;
        }
        this._dashes = v;
      }
    },
    /**
     * @name Two.Path#strokeAttenuation
     * @property {Boolean} - When set to `true`, stroke width scales with transformations (default behavior). When `false`, stroke width remains constant in screen space.
     * @description When `strokeAttenuation` is `false`, the stroke width is automatically adjusted to compensate for the object's world transform scale, maintaining constant visual thickness regardless of zoom level. When `true` (default), stroke width scales normally with transformations.
     */
    strokeAttenuation: {
      enumerable: true,
      get: function() {
        return this._strokeAttenuation;
      },
      set: function(v) {
        this._strokeAttenuation = !!v;
        this._flagStrokeAttenuation = true;
        this._flagLinewidth = true;
      }
    }
  };
  function FlagVertices() {
    this._flagVertices = true;
    this._flagLength = true;
    if (this.parent) {
      this.parent._flagLength = true;
    }
  }
  function BindVertices(items) {
    let i = items.length;
    while (i--) {
      items[i].bind(Events.Types.change, this._renderer.flagVertices);
    }
    this._renderer.flagVertices();
  }
  function UnbindVertices(items) {
    let i = items.length;
    while (i--) {
      items[i].unbind(Events.Types.change, this._renderer.flagVertices);
    }
    this._renderer.flagVertices();
  }
  function FlagFill() {
    this._flagFill = true;
  }
  function FlagStroke() {
    this._flagStroke = true;
  }

  // src/shapes/rectangle.js
  var Rectangle = class _Rectangle extends Path {
    constructor(x, y, width, height) {
      const points = [
        new Anchor(),
        new Anchor(),
        new Anchor(),
        new Anchor()
        // new Anchor() // TODO: Figure out how to handle this for `beginning` / `ending` animations
      ];
      super(points, true, false, true);
      this._renderer.type = "rectangle";
      for (let prop in proto11) {
        Object.defineProperty(this, prop, proto11[prop]);
      }
      this.width = typeof width === "number" ? width : 1;
      this.height = typeof height === "number" ? height : 1;
      this.origin = new Vector();
      if (typeof x === "number") {
        this.translation.x = x;
      }
      if (typeof y === "number") {
        this.translation.y = y;
      }
      this._update();
    }
    /**
     * @name Two.Rectangle.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Rectangle}.
     */
    static Properties = ["width", "height", "origin"];
    /**
     * @name Two.Rectangle.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Rectangle} to create a new instance
     * @returns {Two.Rectangle}
     * @description Create a new {@link Two.Rectangle} from an object notation of a {@link Two.Rectangle}.
     * @nota-bene Works in conjunction with {@link Two.Rectangle#toObject}
     */
    static fromObject(obj) {
      const rectangle = new _Rectangle().copy(obj);
      if ("id" in obj) {
        rectangle.id = obj.id;
      }
      return rectangle;
    }
    /**
     * @name Two.Rectangle#copy
     * @function
     * @param {Two.Rectangle} rectangle - The reference {@link Two.Rectangle}
     * @description Copy the properties of one {@link Two.Rectangle} onto another.
     */
    copy(rectangle) {
      super.copy.call(this, rectangle);
      for (let i = 0; i < _Rectangle.Properties.length; i++) {
        const k = _Rectangle.Properties[i];
        if (k in rectangle) {
          if (typeof rectangle[k] === "number") {
            this[k] = rectangle[k];
          } else if (this[k] instanceof Vector) {
            this[k].copy(rectangle[k]);
          }
        }
      }
      return this;
    }
    /**
     * @name Two.Rectangle#_flagWidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Rectangle#width} needs updating.
     */
    _flagWidth = false;
    /**
     * @name Two.Rectangle#_flagHeight
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Rectangle#height} needs updating.
     */
    _flagHeight = false;
    /**
     * @name Two.Rectangle#_width
     * @private
     * @see {@link Two.Rectangle#width}
     */
    _width = 0;
    /**
     * @name Two.Rectangle#_height
     * @private
     * @see {@link Two.Rectangle#height}
     */
    _height = 0;
    _origin = null;
    /**
     * @name Two.Rectangle#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagVertices || this._flagWidth || this._flagHeight) {
        const xr = this._width / 2;
        const yr = this._height / 2;
        if (!this._closed && this.vertices.length === 4) {
          this.vertices.push(new Anchor());
        }
        this.vertices[0].set(-xr, -yr).sub(this._origin).command = Commands.move;
        this.vertices[1].set(xr, -yr).sub(this._origin).command = Commands.line;
        this.vertices[2].set(xr, yr).sub(this._origin).command = Commands.line;
        this.vertices[3].set(-xr, yr).sub(this._origin).command = Commands.line;
        if (this.vertices[4]) {
          this.vertices[4].set(-xr, -yr).sub(this._origin).command = Commands.line;
        }
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.Rectangle#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagWidth = this._flagHeight = false;
      super.flagReset.call(this);
      return this;
    }
    /**
     * @name Two.Rectangle#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Rectangle}
     * @description Create a new instance of {@link Two.Rectangle} with the same properties of the current path.
     */
    clone(parent) {
      const clone = new _Rectangle(0, 0, this.width, this.height);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      for (let i = 0; i < Path.Properties.length; i++) {
        const k = Path.Properties[i];
        if (clone[k] instanceof Vector) {
          clone[k].copy(this[k]);
        } else {
          clone[k] = this[k];
        }
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.Rectangle#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "rectangle";
      object.width = this.width;
      object.height = this.height;
      object.origin = this.origin.toObject();
      return object;
    }
  };
  var proto11 = {
    width: {
      enumerable: true,
      get: function() {
        return this._width;
      },
      set: function(v) {
        this._width = v;
        this._flagWidth = true;
      }
    },
    height: {
      enumerable: true,
      get: function() {
        return this._height;
      },
      set: function(v) {
        this._height = v;
        this._flagHeight = true;
      }
    },
    origin: {
      enumerable: true,
      get: function() {
        return this._origin;
      },
      set: function(v) {
        if (this._origin) {
          this._origin.unbind(Events.Types.change, this._renderer.flagVertices);
        }
        this._origin = v;
        this._origin.bind(Events.Types.change, this._renderer.flagVertices);
        this._renderer.flagVertices();
      }
    }
  };

  // src/effects/sprite.js
  var Sprite = class _Sprite extends Rectangle {
    /**
     * @name Two.Sprite#_flagTexture
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#texture} needs updating.
     */
    _flagTexture = false;
    /**
     * @name Two.Sprite#_flagColumns
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#columns} need updating.
     */
    _flagColumns = false;
    /**
     * @name Two.Sprite#_flagRows
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#rows} need updating.
     */
    _flagRows = false;
    /**
     * @name Two.Sprite#_flagFrameRate
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#flagFrameRate} needs updating.
     */
    _flagFrameRate = false;
    /**
     * @name Two.Sprite#_flagIndex
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#index} needs updating.
     */
    _flagIndex = false;
    // Private variables
    /**
     * @name Two.Sprite#_amount
     * @private
     * @property {Number} - Number of frames for a given {@link Two.Sprite}.
     */
    _amount = 1;
    /**
     * @name Two.Sprite#_duration
     * @private
     * @property {Number} - Number of milliseconds a {@link Two.Sprite}.
     */
    _duration = 0;
    /**
     * @name Two.Sprite#_startTime
     * @private
     * @property {Milliseconds} - Epoch time in milliseconds of when the {@link Two.Sprite} started.
     */
    _startTime = 0;
    /**
     * @name Two.Sprite#_playing
     * @private
     * @property {Boolean} - Dictates whether the {@link Two.Sprite} is animating or not.
     */
    _playing = false;
    /**
     * @name Two.Sprite#_firstFrame
     * @private
     * @property {Number} - The frame the {@link Two.Sprite} should start with.
     */
    _firstFrame = 0;
    /**
     * @name Two.Sprite#_lastFrame
     * @private
     * @property {Number} - The frame the {@link Two.Sprite} should end with.
     */
    _lastFrame = 0;
    /**
     * @name Two.Sprite#_loop
     * @private
     * @property {Boolean} - Dictates whether the {@link Two.Sprite} should loop or not.
     */
    _loop = true;
    // Exposed through getter-setter
    /**
     * @name Two.Sprite#_texture
     * @private
     * @see {@link Two.Sprite#texture}
     */
    _texture = null;
    /**
     * @name Two.Sprite#_columns
     * @private
     * @see {@link Two.Sprite#columns}
     */
    _columns = 1;
    /**
     * @name Two.Sprite#_rows
     * @private
     * @see {@link Two.Sprite#rows}
     */
    _rows = 1;
    /**
     * @name Two.Sprite#_frameRate
     * @private
     * @see {@link Two.Sprite#frameRate}
     */
    _frameRate = 0;
    /**
     * @name Two.Sprite#_index
     * @private
     * @property {Number} - The current frame the {@link Two.Sprite} is currently displaying.
     */
    _index = 0;
    /**
     * @name Two.Sprite#_origin
     * @private
     * @see {@link Two.Sprite#origin}
     */
    _origin = null;
    constructor(src, ox, oy, cols, rows, frameRate) {
      super(ox, oy, 0, 0);
      this._renderer.type = "sprite";
      for (let prop in proto12) {
        Object.defineProperty(this, prop, proto12[prop]);
      }
      this.noStroke();
      this.noFill();
      if (src instanceof Texture) {
        this.texture = src;
      } else if (typeof src === "string") {
        this.texture = new Texture(src);
      }
      this.origin = new Vector();
      this._update();
      if (typeof cols === "number") {
        this.columns = cols;
      }
      if (typeof rows === "number") {
        this.rows = rows;
      }
      if (typeof frameRate === "number") {
        this.frameRate = frameRate;
      }
      this.index = 0;
    }
    /**
     * @name Two.Sprite.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Sprite}.
     */
    static Properties = [
      "texture",
      "columns",
      "rows",
      "frameRate",
      "index",
      "firstFrame",
      "lastFrame",
      "loop"
    ];
    /**
     * @name Two.Sprite.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Sprite} to create a new instance
     * @returns {Two.Sprite}
     * @description Create a new {@link Two.Sprite} from an object notation of a {@link Two.Sprite}.
     * @nota-bene Works in conjunction with {@link Two.Sprite#toObject}
     */
    static fromObject(obj) {
      const sprite = new _Sprite().copy(obj);
      if ("id" in obj) {
        sprite.id = obj.id;
      }
      return sprite;
    }
    /**
     * @name Two.Sprite#copy
     * @function
     * @param {Two.Sprite} sprite - The reference {@link Two.Sprite}
     * @description Copy the properties of one {@link Two.Sprite} onto another.
     */
    copy(sprite) {
      super.copy.call(this, sprite);
      for (let i = 0; i < _Sprite.Properties.length; i++) {
        const k = _Sprite.Properties[i];
        if (k in sprite) {
          this[k] = sprite[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Sprite#play
     * @function
     * @param {Number} [firstFrame=0] - The index of the frame to start the animation with.
     * @param {Number} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.Sprite#textures}.
     * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped.
     * @description Initiate animation playback of a {@link Two.Sprite}.
     */
    play(firstFrame, lastFrame, onLastFrame) {
      this._playing = true;
      this._firstFrame = 0;
      this._lastFrame = this.amount - 1;
      this._startTime = _.performance.now();
      if (typeof firstFrame === "number") {
        this._firstFrame = firstFrame;
      }
      if (typeof lastFrame === "number") {
        this._lastFrame = lastFrame;
      }
      if (typeof onLastFrame === "function") {
        this._onLastFrame = onLastFrame;
      } else {
        delete this._onLastFrame;
      }
      if (this._index !== this._firstFrame) {
        this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate;
      }
      return this;
    }
    /**
     * @name Two.Sprite#pause
     * @function
     * @description Halt animation playback of a {@link Two.Sprite}.
     */
    pause() {
      this._playing = false;
      return this;
    }
    /**
     * @name Two.Sprite#stop
     * @function
     * @description Halt animation playback of a {@link Two.Sprite} and set the current frame back to the first frame.
     */
    stop() {
      this._playing = false;
      this._index = 0;
      return this;
    }
    /**
     * @name Two.Sprite#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Sprite}
     * @description Create a new instance of {@link Two.Sprite} with the same properties of the current sprite.
     */
    clone(parent) {
      const clone = new _Sprite(
        this.texture,
        this.translation.x,
        this.translation.y,
        this.columns,
        this.rows,
        this.frameRate
      );
      if (this.playing) {
        clone.play(this._firstFrame, this._lastFrame);
      }
      clone.loop = this.loop;
      clone.firstFrame = this.firstFrame;
      clone.lastFrame = this.lastFrame;
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.Sprite#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "sprite";
      object.texture = this.texture.toObject();
      object.columns = this.columns;
      object.rows = this.rows;
      object.frameRate = this.frameRate;
      object.index = this.index;
      object.firstFrame = this.firstFrame;
      object.lastFrame = this.lastFrame;
      object.loop = this.loop;
      return object;
    }
    /**
     * @name Two.Sprite#dispose
     * @function
     * @returns {Two.Sprite}
     * @description Release the sprite's renderer resources and detach all events.
     * This method stops any running animation, clears animation callbacks, disposes
     * the texture (calling dispose() for thorough cleanup), and inherits comprehensive
     * cleanup from the Rectangle/Path hierarchy while preserving the renderer type
     * for potential re-attachment.
     */
    dispose() {
      super.dispose();
      if (this._playing) {
        this._playing = false;
      }
      this._onLastFrame = null;
      this._startTime = 0;
      if (this._texture && typeof this._texture.dispose === "function") {
        this._texture.dispose();
      } else if (this._texture && typeof this._texture.unbind === "function") {
        this._texture.unbind();
      }
      return this;
    }
    /**
     * @name Two.Sprite#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      const effect = this._texture;
      const cols = this._columns;
      const rows = this._rows;
      let width, height, elapsed, amount, duration;
      let index, iw, ih, frames;
      if (effect) {
        if (this._flagColumns || this._flagRows) {
          this._amount = this._columns * this._rows;
        }
        if (this._flagFrameRate) {
          this._duration = 1e3 * this._amount / this._frameRate;
        }
        if (this._flagTexture) {
          this.fill = effect;
        }
        if (effect.loaded) {
          iw = effect.image.width;
          ih = effect.image.height;
          width = iw / cols;
          height = ih / rows;
          amount = this._amount;
          if (this.width !== width) {
            this.width = width;
          }
          if (this.height !== height) {
            this.height = height;
          }
          if (this._playing && this._frameRate > 0) {
            if (_.isNaN(this._lastFrame)) {
              this._lastFrame = amount - 1;
            }
            elapsed = _.performance.now() - this._startTime;
            frames = this._lastFrame + 1;
            duration = 1e3 * (frames - this._firstFrame) / this._frameRate;
            if (this._loop) {
              elapsed = elapsed % duration;
            } else {
              elapsed = Math.min(elapsed, duration);
            }
            index = lerp(this._firstFrame, frames, elapsed / duration);
            index = Math.floor(index);
            if (index !== this._index) {
              this._index = index;
              if (index >= this._lastFrame - 1 && this._onLastFrame) {
                this._onLastFrame();
              }
            }
          }
          const col = this._index % cols;
          const row = Math.floor(this._index / cols);
          const ox = -width * col + (iw - width) / 2;
          const oy = -height * row + (ih - height) / 2;
          if (ox !== effect.offset.x) {
            effect.offset.x = ox;
          }
          if (oy !== effect.offset.y) {
            effect.offset.y = oy;
          }
        }
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.Sprite#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagTexture = this._flagColumns = this._flagRows = this._flagFrameRate = false;
      super.flagReset.call(this);
      return this;
    }
  };
  var proto12 = {
    texture: {
      enumerable: true,
      get: function() {
        return this._texture;
      },
      set: function(v) {
        this._texture = v;
        this._flagTexture = true;
      }
    },
    columns: {
      enumerable: true,
      get: function() {
        return this._columns;
      },
      set: function(v) {
        this._columns = v;
        this._flagColumns = true;
      }
    },
    rows: {
      enumerable: true,
      get: function() {
        return this._rows;
      },
      set: function(v) {
        this._rows = v;
        this._flagRows = true;
      }
    },
    frameRate: {
      enumerable: true,
      get: function() {
        return this._frameRate;
      },
      set: function(v) {
        this._frameRate = v;
        this._flagFrameRate = true;
      }
    },
    index: {
      enumerable: true,
      get: function() {
        return this._index;
      },
      set: function(v) {
        this._index = v;
        this._flagIndex = true;
      }
    },
    firstFrame: {
      enumerable: true,
      get: function() {
        return this._firstFrame;
      },
      set: function(v) {
        this._firstFrame = v;
      }
    },
    lastFrame: {
      enumerable: true,
      get: function() {
        return this._lastFrame;
      },
      set: function(v) {
        this._lastFrame = v;
      }
    },
    loop: {
      enumerable: true,
      get: function() {
        return this._loop;
      },
      set: function(v) {
        this._loop = !!v;
      }
    }
  };

  // src/children.js
  var Children = class extends Collection {
    /**
     * @name Two.Group.Children#ids
     * @property {Object} - Map of all elements in the list keyed by `id`s.
     */
    // N.B: Technique to disable enumeration on object
    #ids = {};
    get ids() {
      return this.#ids;
    }
    constructor(children) {
      children = Array.isArray(children) ? children : Array.prototype.slice.call(arguments);
      super(children);
      this.attach(children);
      this.on(Events.Types.insert, this.attach);
      this.on(Events.Types.remove, this.detach);
    }
    /**
     * @function
     * @name Two.Group.Children#attach
     * @param {Two.Shape[]} children - The objects which extend {@link Two.Shape} to be added.
     * @description Adds elements to the `ids` map.
     */
    attach(children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child && child.id) {
          this.ids[child.id] = child;
        }
      }
      return this;
    }
    /**
     * @function
     * @name Two.Group.Children#detach
     * @param {Two.Shape[]} children - The objects which extend {@link Two.Shape} to be removed.
     * @description Removes elements to the `ids` map.
     */
    detach(children) {
      for (let i = 0; i < children.length; i++) {
        delete this.ids[children[i].id];
      }
      return this;
    }
  };

  // src/shapes/arc-segment.js
  var ArcSegment = class _ArcSegment extends Path {
    /**
     * @name Two.ArcSegment#_flagStartAngle
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#startAngle} needs updating.
     */
    _flagStartAngle = false;
    /**
     * @name Two.ArcSegment#_flagEndAngle
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#endAngle} needs updating.
     */
    _flagEndAngle = false;
    /**
     * @name Two.ArcSegment#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#innerRadius} needs updating.
     */
    _flagInnerRadius = false;
    /**
     * @name Two.ArcSegment#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ArcSegment#outerRadius} needs updating.
     */
    _flagOuterRadius = false;
    /**
     * @name Two.ArcSegment#_startAngle
     * @private
     * @see {@link Two.ArcSegment#startAngle}
     */
    _startAngle = 0;
    /**
     * @name Two.ArcSegment#_endAngle
     * @private
     * @see {@link Two.ArcSegment#endAngle}
     */
    _endAngle = TWO_PI;
    /**
     * @name Two.ArcSegment#_innerRadius
     * @private
     * @see {@link Two.ArcSegment#innerRadius}
     */
    _innerRadius = 0;
    /**
     * @name Two.ArcSegment#_outerRadius
     * @private
     * @see {@link Two.ArcSegment#outerRadius}
     */
    _outerRadius = 0;
    constructor(x, y, ir, or, sa, ea, res) {
      const amount = res || Constants.Resolution * 3;
      const points = [];
      for (let i = 0; i < amount; i++) {
        points.push(new Anchor());
      }
      super(points, true, false, true);
      this._renderer.type = "arc-segment";
      for (let prop in proto13) {
        Object.defineProperty(this, prop, proto13[prop]);
      }
      if (typeof ir === "number") {
        this.innerRadius = ir;
      }
      if (typeof or === "number") {
        this.outerRadius = or;
      }
      if (typeof sa === "number") {
        this.startAngle = sa;
      }
      if (typeof ea === "number") {
        this.endAngle = ea;
      }
      this._update();
      if (typeof x === "number") {
        this.translation.x = x;
      }
      if (typeof y === "number") {
        this.translation.y = y;
      }
    }
    /**
     * @name Two.ArcSegment.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.ArcSegment}.
     */
    static Properties = ["startAngle", "endAngle", "innerRadius", "outerRadius"];
    /**
     * @name Two.ArcSegment.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.ArcSegment} to create a new instance
     * @returns {Two.ArcSegment}
     * @description Create a new {@link Two.ArcSegment} from an object notation of a {@link Two.ArcSegment}.
     * @nota-bene Works in conjunction with {@link Two.ArcSegment#toObject}
     */
    static fromObject(obj) {
      const segment = new _ArcSegment().copy(obj);
      if ("id" in obj) {
        segment.id = obj.id;
      }
      return segment;
    }
    /**
     * @name Two.ArcSegment#copy
     * @function
     * @param {Two.ArcSegment} arcSegment - The reference {@link Two.ArcSegment}
     * @description Copy the properties of one {@link Two.ArcSegment} onto another.
     */
    copy(arcSegment) {
      super.copy.call(this, arcSegment);
      for (let i = 0; i < _ArcSegment.Properties.length; i++) {
        const k = _ArcSegment.Properties[i];
        if (k in arcSegment && typeof arcSegment[k] === "number") {
          this[k] = arcSegment[k];
        }
      }
      return this;
    }
    /**
     * @name Two.ArcSegment#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagVertices || this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius || this._flagOuterRadius) {
        const sa = this._startAngle;
        const ea = this._endAngle;
        const ir = this._innerRadius;
        const or = this._outerRadius;
        const connected = mod(sa, TWO_PI) === mod(ea, TWO_PI);
        const punctured = ir > 0;
        const vertices = this.vertices;
        let length = punctured ? vertices.length / 2 : vertices.length;
        let command, id = 0;
        let i, last, pct, v, theta, step, x, y, amp;
        if (connected) {
          length--;
        } else if (!punctured) {
          length -= 2;
        }
        for (i = 0, last = length - 1; i < length; i++) {
          pct = i / last;
          v = vertices[id];
          theta = pct * (ea - sa) + sa;
          step = (ea - sa) / length;
          x = or * Math.cos(theta);
          y = or * Math.sin(theta);
          switch (i) {
            case 0:
              command = Commands.move;
              break;
            default:
              command = Commands.curve;
          }
          v.command = command;
          v.x = x;
          v.y = y;
          v.controls.left.clear();
          v.controls.right.clear();
          if (v.command === Commands.curve) {
            amp = or * step / Math.PI;
            v.controls.left.x = amp * Math.cos(theta - HALF_PI);
            v.controls.left.y = amp * Math.sin(theta - HALF_PI);
            v.controls.right.x = amp * Math.cos(theta + HALF_PI);
            v.controls.right.y = amp * Math.sin(theta + HALF_PI);
            if (i === 1) {
              v.controls.left.multiplyScalar(2);
            }
            if (i === last) {
              v.controls.right.multiplyScalar(2);
            }
          }
          id++;
        }
        if (punctured) {
          if (connected) {
            vertices[id].command = Commands.close;
            id++;
          } else {
            length--;
            last = length - 1;
          }
          for (i = 0; i < length; i++) {
            pct = i / last;
            v = vertices[id];
            theta = (1 - pct) * (ea - sa) + sa;
            step = (ea - sa) / length;
            x = ir * Math.cos(theta);
            y = ir * Math.sin(theta);
            command = Commands.curve;
            if (i <= 0) {
              command = connected ? Commands.move : Commands.line;
            }
            v.command = command;
            v.x = x;
            v.y = y;
            v.controls.left.clear();
            v.controls.right.clear();
            if (v.command === Commands.curve) {
              amp = ir * step / Math.PI;
              v.controls.left.x = amp * Math.cos(theta + HALF_PI);
              v.controls.left.y = amp * Math.sin(theta + HALF_PI);
              v.controls.right.x = amp * Math.cos(theta - HALF_PI);
              v.controls.right.y = amp * Math.sin(theta - HALF_PI);
              if (i === 1) {
                v.controls.left.multiplyScalar(2);
              }
              if (i === last) {
                v.controls.right.multiplyScalar(2);
              }
            }
            id++;
          }
          vertices[id].copy(vertices[0]);
          vertices[id].command = Commands.line;
        } else if (!connected) {
          vertices[id].command = Commands.line;
          vertices[id].x = 0;
          vertices[id].y = 0;
          id++;
          vertices[id].copy(vertices[0]);
          vertices[id].command = Commands.line;
        }
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.ArcSegment#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      super.flagReset.call(this);
      this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = false;
      return this;
    }
    /**
     * @name Two.ArcSegment#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.ArcSegment}
     * @description Create a new instance of {@link Two.ArcSegment} with the same properties of the current path.
     */
    clone(parent) {
      const ir = this.innerRadius;
      const or = this.outerRadius;
      const sa = this.startAngle;
      const ea = this.endAngle;
      const resolution = this.vertices.length;
      const clone = new _ArcSegment(0, 0, ir, or, sa, ea, resolution);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      for (let i = 0; i < Path.Properties.length; i++) {
        const k = Path.Properties[i];
        clone[k] = this[k];
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.ArcSegment#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "arc-segment";
      for (let i = 0; i < _ArcSegment.Properties.length; i++) {
        const k = _ArcSegment.Properties[i];
        object[k] = this[k];
      }
      return object;
    }
  };
  var proto13 = {
    startAngle: {
      enumerable: true,
      get: function() {
        return this._startAngle;
      },
      set: function(v) {
        this._startAngle = v;
        this._flagStartAngle = true;
      }
    },
    endAngle: {
      enumerable: true,
      get: function() {
        return this._endAngle;
      },
      set: function(v) {
        this._endAngle = v;
        this._flagEndAngle = true;
      }
    },
    innerRadius: {
      enumerable: true,
      get: function() {
        return this._innerRadius;
      },
      set: function(v) {
        this._innerRadius = v;
        this._flagInnerRadius = true;
      }
    },
    outerRadius: {
      enumerable: true,
      get: function() {
        return this._outerRadius;
      },
      set: function(v) {
        this._outerRadius = v;
        this._flagOuterRadius = true;
      }
    }
  };

  // src/shapes/circle.js
  var cos2 = Math.cos;
  var sin2 = Math.sin;
  var Circle = class _Circle extends Path {
    /**
     * @name Two.Circle#_flagRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Circle#radius} needs updating.
     */
    _flagRadius = false;
    /**
     * @name Two.Circle#_radius
     * @private
     * @see {@link Two.Circle#radius}
     */
    _radius = 0;
    constructor(ox, oy, r, resolution) {
      const amount = resolution ? Math.max(resolution, 2) : 4;
      const points = [];
      for (let i = 0; i < amount; i++) {
        points.push(new Anchor(0, 0, 0, 0, 0, 0));
      }
      super(points, true, true, true);
      this._renderer.type = "circle";
      for (let prop in proto14) {
        Object.defineProperty(this, prop, proto14[prop]);
      }
      if (typeof r === "number") {
        this.radius = r;
      }
      this._update();
      if (typeof ox === "number") {
        this.translation.x = ox;
      }
      if (typeof oy === "number") {
        this.translation.y = oy;
      }
    }
    /**
     * @name Two.Circle.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Circle}.
     */
    static Properties = ["radius"];
    /**
     * @name Two.Circle.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Circle} to create a new instance
     * @returns {Two.Circle}
     * @description Create a new {@link Two.Circle} from an object notation of a {@link Two.Circle}.
     * @nota-bene Works in conjunction with {@link Two.Circle#toObject}
     */
    static fromObject(obj) {
      const circle = new _Circle().copy(obj);
      if ("id" in obj) {
        circle.id = obj.id;
      }
      return circle;
    }
    /**
     * @name Two.Circle#copy
     * @function
     * @param {Two.Circle} circle - The reference {@link Two.Circle}
     * @description Copy the properties of one {@link Two.Circle} onto another.
     */
    copy(circle) {
      super.copy.call(this, circle);
      for (let i = 0; i < _Circle.Properties.length; i++) {
        const k = _Circle.Properties[i];
        if (k in circle && typeof circle[k] === "number") {
          this[k] = circle[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Circle#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagVertices || this._flagRadius) {
        let length = this.vertices.length;
        if (!this._closed && length > 2) {
          length -= 1;
        }
        const c = 4 / 3 * Math.tan(Math.PI / (length * 2));
        const radius = this._radius;
        const rc = radius * c;
        for (let i = 0; i < this.vertices.length; i++) {
          const pct = i / length;
          const theta = pct * TWO_PI;
          const x = radius * cos2(theta);
          const y = radius * sin2(theta);
          const lx = rc * cos2(theta - HALF_PI);
          const ly = rc * sin2(theta - HALF_PI);
          const rx = rc * cos2(theta + HALF_PI);
          const ry = rc * sin2(theta + HALF_PI);
          const v = this.vertices[i];
          v.command = i === 0 ? Commands.move : Commands.curve;
          v.set(x, y);
          v.controls.left.set(lx, ly);
          v.controls.right.set(rx, ry);
        }
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.Circle#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagRadius = false;
      super.flagReset.call(this);
      return this;
    }
    /**
     * @name Two.Circle#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Circle}
     * @description Create a new instance of {@link Two.Circle} with the same properties of the current path.
     */
    clone(parent) {
      const clone = new _Circle(0, 0, this.radius, this.vertices.length);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      for (let i = 0; i < Path.Properties.length; i++) {
        const k = Path.Properties[i];
        clone[k] = this[k];
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.Circle#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "circle";
      for (let i = 0; i < _Circle.Properties.length; i++) {
        const k = _Circle.Properties[i];
        object[k] = this[k];
      }
      return object;
    }
  };
  var proto14 = {
    radius: {
      enumerable: true,
      get: function() {
        return this._radius;
      },
      set: function(v) {
        this._radius = v;
        this._flagRadius = true;
      }
    }
  };

  // src/shapes/ellipse.js
  var cos3 = Math.cos;
  var sin3 = Math.sin;
  var Ellipse = class _Ellipse extends Path {
    /**
     * @name Two.Ellipse#_flagWidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Ellipse#width} needs updating.
     */
    _flagWidth = false;
    /**
     * @name Two.Ellipse#_flagHeight
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Ellipse#height} needs updating.
     */
    _flagHeight = false;
    /**
     * @name Two.Ellipse#_width
     * @private
     * @see {@link Two.Ellipse#width}
     */
    _width = 0;
    /**
     * @name Two.Ellipse#_height
     * @private
     * @see {@link Two.Ellipse#height}
     */
    _height = 0;
    constructor(x, y, rx, ry, resolution) {
      if (typeof ry !== "number" && typeof rx === "number") {
        ry = rx;
      }
      const amount = resolution ? Math.max(resolution, 2) : 4;
      const points = [];
      for (let i = 0; i < amount; i++) {
        points.push(new Anchor());
      }
      super(points, true, true, true);
      this._renderer.type = "ellipse";
      for (let prop in proto15) {
        Object.defineProperty(this, prop, proto15[prop]);
      }
      if (typeof rx === "number") {
        this.width = rx * 2;
      }
      if (typeof ry === "number") {
        this.height = ry * 2;
      }
      this._update();
      if (typeof x === "number") {
        this.translation.x = x;
      }
      if (typeof y === "number") {
        this.translation.y = y;
      }
    }
    /**
     * @name Two.Ellipse.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Ellipse}.
     */
    static Properties = ["width", "height"];
    /**
     * @name Two.Ellipse.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Ellipse} to create a new instance
     * @returns {Two.Ellipse}
     * @description Create a new {@link Two.Ellipse} from an object notation of a {@link Two.Ellipse}.
     * @nota-bene Works in conjunction with {@link Two.Ellipse#toObject}
     */
    static fromObject(obj) {
      const ellipse = new _Ellipse().copy(obj);
      if ("id" in obj) {
        ellipse.id = obj.id;
      }
      return ellipse;
    }
    /**
     * @name Two.Ellipse#copy
     * @function
     * @param {Two.Ellipse} ellipse - The reference {@link Two.Ellipse}
     * @description Copy the properties of one {@link Two.Ellipse} onto another.
     */
    copy(ellipse) {
      super.copy.call(this, ellipse);
      for (let i = 0; i < _Ellipse.Properties.length; i++) {
        const k = _Ellipse.Properties[i];
        if (k in ellipse && typeof ellipse[k] === "number") {
          this[k] = ellipse[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Ellipse#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagVertices || this._flagWidth || this._flagHeight) {
        let length = this.vertices.length;
        if (!this._closed && length > 2) {
          length -= 1;
        }
        const c = 4 / 3 * Math.tan(Math.PI / (this.vertices.length * 2));
        const radiusX = this._width / 2;
        const radiusY = this._height / 2;
        for (let i = 0; i < this.vertices.length; i++) {
          const pct = i / length;
          const theta = pct * TWO_PI;
          const x = radiusX * cos3(theta);
          const y = radiusY * sin3(theta);
          const lx = radiusX * c * cos3(theta - HALF_PI);
          const ly = radiusY * c * sin3(theta - HALF_PI);
          const rx = radiusX * c * cos3(theta + HALF_PI);
          const ry = radiusY * c * sin3(theta + HALF_PI);
          const v = this.vertices[i];
          v.command = i === 0 ? Commands.move : Commands.curve;
          v.set(x, y);
          v.controls.left.set(lx, ly);
          v.controls.right.set(rx, ry);
        }
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.Ellipse#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagWidth = this._flagHeight = false;
      super.flagReset.call(this);
      return this;
    }
    /**
     * @name Two.Ellipse#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Ellipse}
     * @description Create a new instance of {@link Two.Ellipse} with the same properties of the current path.
     */
    clone(parent) {
      const rx = this.width / 2;
      const ry = this.height / 2;
      const resolution = this.vertices.length;
      const clone = new _Ellipse(0, 0, rx, ry, resolution);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      for (let i = 0; i < Path.Properties.length; i++) {
        const k = Path.Properties[i];
        clone[k] = this[k];
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.Ellipse#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "ellipse";
      for (let i = 0; i < _Ellipse.Properties.length; i++) {
        const k = _Ellipse.Properties[i];
        object[k] = this[k];
      }
      return object;
    }
  };
  var proto15 = {
    width: {
      enumerable: true,
      get: function() {
        return this._width;
      },
      set: function(v) {
        this._width = v;
        this._flagWidth = true;
      }
    },
    height: {
      enumerable: true,
      get: function() {
        return this._height;
      },
      set: function(v) {
        this._height = v;
        this._flagHeight = true;
      }
    }
  };

  // src/shapes/points.js
  var ceil2 = Math.ceil;
  var floor3 = Math.floor;
  var Points = class _Points extends Shape {
    _flagVertices = true;
    _flagLength = true;
    _flagFill = true;
    _flagStroke = true;
    _flagLinewidth = true;
    _flagOpacity = true;
    _flagVisible = true;
    _flagSize = true;
    _flagSizeAttenuation = true;
    _flagStrokeAttenuation = true;
    _length = 0;
    _fill = "#fff";
    _stroke = "#000";
    _linewidth = 1;
    _opacity = 1;
    _visible = true;
    _size = 1;
    _sizeAttenuation = false;
    _beginning = 0;
    _ending = 1;
    _dashes = null;
    _strokeAttenuation = true;
    constructor(vertices) {
      super();
      for (let prop in proto16) {
        Object.defineProperty(this, prop, proto16[prop]);
      }
      this._renderer.type = "points";
      this._renderer.flagVertices = FlagVertices.bind(this);
      this._renderer.bindVertices = BindVertices.bind(this);
      this._renderer.unbindVertices = UnbindVertices.bind(this);
      this._renderer.flagFill = FlagFill.bind(this);
      this._renderer.flagStroke = FlagStroke.bind(this);
      this._renderer.vertices = null;
      this._renderer.collection = null;
      this.size = 1;
      this.sizeAttenuation = false;
      this.beginning = 0;
      this.ending = 1;
      this.fill = "#fff";
      this.stroke = "#000";
      this.linewidth = 1;
      this.opacity = 1;
      this.className = "";
      this.visible = true;
      this.vertices = vertices;
      this.dashes = [];
      this.dashes.offset = 0;
    }
    /**
     * @name Two.Points.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Points}.
     */
    static Properties = [
      "fill",
      "stroke",
      "linewidth",
      "opacity",
      "visible",
      "size",
      "sizeAttenuation",
      "beginning",
      "ending",
      "dashes",
      "strokeAttenuation"
    ];
    /**
     * @name Two.Points.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Points} to create a new instance
     * @returns {Two.Points}
     * @description Create a new {@link Two.Points} from an object notation of a {@link Two.Points}.
     * @nota-bene Works in conjunction with {@link Two.Points#toObject}
     */
    static fromObject(obj) {
      const fill = typeof obj.fill === "string" ? obj.fill : getEffectFromObject(obj.fill);
      const stroke = typeof obj.stroke === "string" ? obj.stroke : getEffectFromObject(obj.stroke);
      const points = new _Points().copy({ ...obj, fill, stroke });
      if ("id" in obj) {
        points.id = obj.id;
      }
      return points;
    }
    /**
     * @name Two.Points#copy
     * @function
     * @param {Two.Points} points - The reference {@link Two.Points}
     * @description Copy the properties of one {@link Two.Points} onto another.
     */
    copy(points) {
      super.copy.call(this, points);
      for (let j = 0; j < points.vertices.length; j++) {
        const v = points.vertices[j];
        if (v instanceof Anchor) {
          this.vertices.push(points.vertices[j].clone());
        } else {
          this.vertices.push(new Anchor().copy(v));
        }
      }
      for (let i = 0; i < _Points.Properties.length; i++) {
        const k = _Points.Properties[i];
        if (k in points) {
          this[k] = points[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Points#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Points}
     * @description Create a new instance of {@link Two.Points} with the same properties of the current path.
     */
    clone(parent) {
      const clone = new _Points();
      for (let j = 0; j < this.vertices.length; j++) {
        clone.vertices.push(this.vertices[j].clone());
      }
      for (let i = 0; i < _Points.Properties.length; i++) {
        const k = _Points.Properties[i];
        clone[k] = this[k];
      }
      clone.className = this.className;
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      if (parent) {
        parent.add(clone);
      }
      return clone._update();
    }
    /**
     * @name Two.Points#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the points object.
     */
    toObject() {
      const result = super.toObject.call(this);
      result.renderer.type = "points";
      result.vertices = this.vertices.map((v) => v.toObject());
      _.each(
        _Points.Properties,
        function(k) {
          if (typeof this[k] !== "undefined") {
            if (this[k].toObject) {
              result[k] = this[k].toObject();
            } else {
              result[k] = this[k];
            }
          }
        },
        this
      );
      return result;
    }
    /**
     * @name Two.Points#dispose
     * @function
     * @returns {Two.Points}
     * @description Release the points' renderer resources and detach all events.
     * This method cleans up vertices collection events, individual vertex events,
     * and disposes fill/stroke effects (calling dispose() on Gradients and
     * Textures for thorough cleanup) while preserving the renderer type for
     * potential re-attachment to a new renderer.
     */
    dispose() {
      super.dispose();
      if (this.vertices && typeof this.vertices.unbind === "function") {
        try {
          this.vertices.unbind();
        } catch (e) {
        }
      }
      if (this.vertices) {
        for (let i = 0; i < this.vertices.length; i++) {
          const v = this.vertices[i];
          if (typeof v.unbind === "function") {
            v.unbind();
          }
        }
      }
      if (typeof this.fill === "object" && typeof this.fill.dispose === "function") {
        this.fill.dispose();
      } else if (typeof this.fill === "object" && typeof this.fill.unbind === "function") {
        this.fill.unbind();
      }
      if (typeof this.stroke === "object" && typeof this.stroke.dispose === "function") {
        this.stroke.dispose();
      } else if (typeof this.stroke === "object" && typeof this.stroke.unbind === "function") {
        this.stroke.unbind();
      }
      return this;
    }
    /**
     * @name Two.Points#noFill
     * @function
     * @description Short hand method to set fill to `none`.
     */
    noFill = Path.prototype.noFill;
    /**
     * @name Two.Points#noStroke
     * @function
     * @description Short hand method to set stroke to `none`.
     */
    noStroke = Path.prototype.noStroke;
    /**
     * @name Two.Points#corner
     * @function
     * @description Orient the vertices of the shape to the upper left-hand corner of the points object.
     */
    corner = Path.prototype.corner;
    /**
     * @name Two.Points#center
     * @function
     * @description Orient the vertices of the shape to the center of the points object.
     */
    center = Path.prototype.center;
    /**
     * @name Two.Points#getBoundingClientRect
     * @function
     * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
     * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
     * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
     */
    getBoundingClientRect = Path.prototype.getBoundingClientRect;
    /**
     * @name Two.Points#subdivide
     * @function
     * @param {Number} limit - How many times to recurse subdivisions.
     * @description Insert a {@link Two.Vector} at the midpoint between every item in {@link Two.Points#vertices}.
     */
    subdivide(limit) {
      this._update();
      let points = [];
      for (let i = 0; i < this.vertices.length; i++) {
        const a = this.vertices[i];
        const b = this.vertices[i - 1];
        if (!b) {
          continue;
        }
        const x1 = a.x;
        const y1 = a.y;
        const x2 = b.x;
        const y2 = b.y;
        const subdivisions = subdivide(x1, y1, x1, y1, x2, y2, x2, y2, limit);
        points = points.concat(subdivisions);
      }
      this.vertices = points;
      return this;
    }
    /**
     * @name Two.Points#_updateLength
     * @function
     * @private
     * @param {Number} [limit] -
     * @param {Boolean} [silent=false] - If set to `true` then the points object isn't updated before calculation. Useful for internal use.
     * @description Recalculate the {@link Two.Points#length} value.
     */
    _updateLength = Path.prototype._updateLength;
    /**
     * @name Two.Points#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagVertices) {
        if (this._flagLength) {
          this._updateLength(void 0, true);
        }
        const beginning = Math.min(this._beginning, this._ending);
        const ending = Math.max(this._beginning, this._ending);
        const bid = getIdByLength(this, beginning * this._length);
        const eid = getIdByLength(this, ending * this._length);
        const low = ceil2(bid);
        const high = floor3(eid);
        let j = 0, v;
        this._renderer.vertices = [];
        this._renderer.collection = [];
        for (let i = 0; i < this._collection.length; i++) {
          if (i >= low && i <= high) {
            v = this._collection[i];
            this._renderer.collection.push(v);
            this._renderer.vertices[j * 2 + 0] = v.x;
            this._renderer.vertices[j * 2 + 1] = v.y;
            j++;
          }
        }
      }
      super._update.apply(this, arguments);
      return this;
    }
    /**
     * @name Two.Points#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagSize = this._flagSizeAttenuation = false;
      super.flagReset.call(this);
      return this;
    }
  };
  var proto16 = {
    linewidth: {
      enumerable: true,
      get: function() {
        return this._linewidth;
      },
      set: function(v) {
        this._linewidth = v;
        this._flagLinewidth = true;
      }
    },
    opacity: {
      enumerable: true,
      get: function() {
        return this._opacity;
      },
      set: function(v) {
        this._opacity = v;
        this._flagOpacity = true;
      }
    },
    visible: {
      enumerable: true,
      get: function() {
        return this._visible;
      },
      set: function(v) {
        this._visible = v;
        this._flagVisible = true;
      }
    },
    size: {
      enumerable: true,
      get: function() {
        return this._size;
      },
      set: function(v) {
        this._size = v;
        this._flagSize = true;
      }
    },
    sizeAttenuation: {
      enumerable: true,
      get: function() {
        return this._sizeAttenuation;
      },
      set: function(v) {
        this._sizeAttenuation = v;
        this._flagSizeAttenuation = true;
      }
    },
    fill: {
      enumerable: true,
      get: function() {
        return this._fill;
      },
      set: function(f) {
        if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
          this._fill.unbind(Events.Types.change, this._renderer.flagFill);
        }
        this._fill = f;
        this._flagFill = true;
        if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
          this._fill.bind(Events.Types.change, this._renderer.flagFill);
        }
      }
    },
    stroke: {
      enumerable: true,
      get: function() {
        return this._stroke;
      },
      set: function(f) {
        if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
          this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
        }
        this._stroke = f;
        this._flagStroke = true;
        if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
          this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
        }
      }
    },
    /**
     * @name Two.Points#length
     * @property {Number} - The sum of distances between all {@link Two.Points#vertices}.
     */
    length: {
      get: function() {
        if (this._flagLength) {
          this._updateLength();
        }
        return this._length;
      }
    },
    beginning: {
      enumerable: true,
      get: function() {
        return this._beginning;
      },
      set: function(v) {
        this._beginning = v;
        this._flagVertices = true;
      }
    },
    ending: {
      enumerable: true,
      get: function() {
        return this._ending;
      },
      set: function(v) {
        this._ending = v;
        this._flagVertices = true;
      }
    },
    vertices: {
      enumerable: true,
      get: function() {
        return this._collection;
      },
      set: function(vertices) {
        const bindVertices = this._renderer.bindVertices;
        const unbindVertices = this._renderer.unbindVertices;
        if (this._collection) {
          this._collection.unbind(Events.Types.insert, bindVertices).unbind(Events.Types.remove, unbindVertices);
        }
        if (vertices instanceof Collection) {
          this._collection = vertices;
        } else {
          this._collection = new Collection(vertices || []);
        }
        this._collection.bind(Events.Types.insert, bindVertices).bind(Events.Types.remove, unbindVertices);
        bindVertices(this._collection);
      }
    },
    dashes: {
      enumerable: true,
      get: function() {
        return this._dashes;
      },
      set: function(v) {
        if (typeof v.offset !== "number") {
          v.offset = this.dashes && this._dashes.offset || 0;
        }
        this._dashes = v;
      }
    },
    /**
     * @name Two.Points#strokeAttenuation
     * @property {Boolean} - When set to `true`, stroke width scales with transformations (default behavior). When `false`, stroke width remains constant in screen space.
     * @description When `strokeAttenuation` is `false`, the stroke width is automatically adjusted to compensate for the object's world transform scale, maintaining constant visual thickness regardless of zoom level. When `true` (default), stroke width scales normally with transformations.
     */
    strokeAttenuation: {
      enumerable: true,
      get: function() {
        return this._strokeAttenuation;
      },
      set: function(v) {
        this._strokeAttenuation = !!v;
        this._flagStrokeAttenuation = true;
        this._flagLinewidth = true;
      }
    }
  };

  // src/shapes/polygon.js
  var cos4 = Math.cos;
  var sin4 = Math.sin;
  var Polygon = class _Polygon extends Path {
    /**
     * @name Two.Polygon#_flagWidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Polygon#width} needs updating.
     */
    _flagWidth = false;
    /**
     * @name Two.Polygon#_flagHeight
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Polygon#height} needs updating.
     */
    _flagHeight = false;
    /**
     * @name Two.Polygon#_flagSides
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Polygon#sides} needs updating.
     */
    _flagSides = false;
    /**
     * @name Two.Polygon#_radius
     * @private
     * @see {@link Two.Polygon#radius}
     */
    _radius = 0;
    /**
     * @name Two.Polygon#_width
     * @private
     * @see {@link Two.Polygon#width}
     */
    _width = 0;
    /**
     * @name Two.Polygon#_height
     * @private
     * @see {@link Two.Polygon#height}
     */
    _height = 0;
    /**
     * @name Two.Polygon#_sides
     * @private
     * @see {@link Two.Polygon#sides}
     */
    _sides = 0;
    constructor(x, y, radius, sides) {
      sides = Math.max(sides || 0, 3);
      super();
      this._renderer.type = "polygon";
      for (let prop in proto17) {
        Object.defineProperty(this, prop, proto17[prop]);
      }
      this.closed = true;
      this.automatic = false;
      if (typeof radius === "number") {
        this.radius = radius;
      }
      if (typeof sides === "number") {
        this.sides = sides;
      }
      this._update();
      if (typeof x === "number") {
        this.translation.x = x;
      }
      if (typeof y === "number") {
        this.translation.y = y;
      }
    }
    /**
     * @name Two.Polygon.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Polygon}.
     */
    static Properties = ["width", "height", "sides"];
    /**
     * @name Two.Polygon.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Polygon} to create a new instance
     * @returns {Two.Polygon}
     * @description Create a new {@link Two.Polygon} from an object notation of a {@link Two.Polygon}.
     * @nota-bene Works in conjunction with {@link Two.Polygon#toObject}
     */
    static fromObject(obj) {
      const polygon = new _Polygon().copy(obj);
      if ("id" in obj) {
        polygon.id = obj.id;
      }
      return polygon;
    }
    /**
     * @name Two.Polygon#copy
     * @function
     * @param {Two.Polygon} polygon - The reference {@link Two.Polygon}
     * @description Copy the properties of one {@link Two.Polygon} onto another.
     */
    copy(polygon) {
      super.copy.call(this, polygon);
      for (let i = 0; i < _Polygon.Properties.length; i++) {
        const k = _Polygon.Properties[i];
        if (k in polygon && typeof polygon[k] === "number") {
          this[k] = polygon[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Polygon#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagSides) {
        const sides = this._sides;
        const amount = sides + 1;
        let length = this.vertices.length;
        if (length > sides) {
          this.vertices.splice(sides - 1, length - sides);
          length = sides;
        }
        for (let i = 0; i < amount; i++) {
          const pct = (i + 0.5) / sides;
          const theta = TWO_PI * pct + Math.PI / 2;
          const x = this._width * cos4(theta) / 2;
          const y = this._height * sin4(theta) / 2;
          if (i >= length) {
            this.vertices.push(new Anchor(x, y));
          } else {
            this.vertices[i].set(x, y);
          }
          this.vertices[i].command = i === 0 ? Commands.move : Commands.line;
        }
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.Polygon#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagWidth = this._flagHeight = this._flagSides = false;
      super.flagReset.call(this);
      return this;
    }
    /**
     * @name Two.Polygon#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Polygon}
     * @description Create a new instance of {@link Two.Polygon} with the same properties of the current path.
     */
    clone(parent) {
      const clone = new _Polygon(0, 0, 0, this.sides);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      clone.width = this.width;
      clone.height = this.height;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      for (let i = 0; i < Path.Properties.length; i++) {
        const k = Path.Properties[i];
        clone[k] = this[k];
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.Polygon#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "polygon";
      for (let i = 0; i < _Polygon.Properties.length; i++) {
        const k = _Polygon.Properties[i];
        object[k] = this[k];
      }
      return object;
    }
  };
  var proto17 = {
    radius: {
      enumerable: true,
      get: function() {
        return this._radius;
      },
      set: function(v) {
        this._radius = v;
        this.width = v * 2;
        this.height = v * 2;
      }
    },
    width: {
      enumerable: true,
      get: function() {
        return this._width;
      },
      set: function(v) {
        this._width = v;
        this._flagWidth = true;
        this._radius = Math.max(this.width, this.height) / 2;
      }
    },
    height: {
      enumerable: true,
      get: function() {
        return this._height;
      },
      set: function(v) {
        this._height = v;
        this._flagHeight = true;
        this._radius = Math.max(this.width, this.height) / 2;
      }
    },
    sides: {
      enumerable: true,
      get: function() {
        return this._sides;
      },
      set: function(v) {
        this._sides = v;
        this._flagSides = true;
      }
    }
  };

  // src/shapes/rounded-rectangle.js
  var RoundedRectangle = class _RoundedRectangle extends Path {
    /**
     * @name Two.RoundedRectangle#_flagWidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#width} needs updating.
     */
    _flagWidth = false;
    /**
     * @name Two.RoundedRectangle#_flagHeight
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#height} needs updating.
     */
    _flagHeight = false;
    /**
     * @name Two.RoundedRectangle#_flagRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.RoundedRectangle#radius} needs updating.
     */
    _flagRadius = false;
    /**
     * @name Two.RoundedRectangle#_width
     * @private
     * @see {@link Two.RoundedRectangle#width}
     */
    _width = 0;
    /**
     * @name Two.RoundedRectangle#_height
     * @private
     * @see {@link Two.RoundedRectangle#height}
     */
    _height = 0;
    /**
     * @name Two.RoundedRectangle#_radius
     * @private
     * @see {@link Two.RoundedRectangle#radius}
     */
    _radius = 12;
    constructor(x, y, width, height, radius) {
      if (typeof radius === "undefined" && typeof width === "number" && typeof height === "number") {
        radius = Math.floor(Math.min(width, height) / 12);
      }
      const points = [];
      for (let i = 0; i < 10; i++) {
        points.push(
          new Anchor(0, 0, 0, 0, 0, 0, i === 0 ? Commands.move : Commands.curve)
        );
      }
      super(points);
      this._renderer.type = "rounded-rectangle";
      for (let prop in proto18) {
        Object.defineProperty(this, prop, proto18[prop]);
      }
      this.closed = true;
      this.automatic = false;
      this._renderer.flagRadius = FlagRadius.bind(this);
      if (typeof width === "number") {
        this.width = width;
      }
      if (typeof height === "number") {
        this.height = height;
      }
      if (typeof radius === "number" || radius instanceof Vector) {
        this.radius = radius;
      }
      this._update();
      if (typeof x === "number") {
        this.translation.x = x;
      }
      if (typeof y === "number") {
        this.translation.y = y;
      }
    }
    /**
     * @name Two.RoundedRectangle.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.RoundedRectangle}.
     */
    static Properties = ["width", "height", "radius"];
    /**
     * @name Two.RoundedRectangle.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.RoundedRectangle} to create a new instance
     * @returns {Two.RoundedRectangle}
     * @description Create a new {@link Two.RoundedRectangle} from an object notation of a {@link Two.RoundedRectangle}.
     * @nota-bene Works in conjunction with {@link Two.RoundedRectangle#toObject}
     */
    static fromObject(obj) {
      const rectangle = new _RoundedRectangle().copy(obj);
      if ("id" in obj) {
        rectangle.id = obj.id;
      }
      return rectangle;
    }
    /**
     * @name Two.RoundedRectangle#copy
     * @function
     * @param {Two.RoundedRectangle} roundedRectangle - The reference {@link Two.RoundedRectangle}
     * @description Copy the properties of one {@link Two.RoundedRectangle} onto another.
     */
    copy(roundedRectangle) {
      super.copy.call(this, roundedRectangle);
      for (let i = 0; i < _RoundedRectangle.Properties.length; i++) {
        const k = _RoundedRectangle.Properties[i];
        if (k in roundedRectangle) {
          const value = roundedRectangle[k];
          if (/radius/i.test(k)) {
            this[k] = typeof value === "number" || value instanceof Vector ? value : new Vector().copy(value);
          } else if (typeof value === "number") {
            this[k] = value;
          }
        }
      }
      return this;
    }
    /**
     * @name Two.RoundedRectangle#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagRadius) {
        const width = this._width;
        const height = this._height;
        let rx, ry;
        if (this._radius instanceof Vector) {
          rx = this._radius.x;
          ry = this._radius.y;
        } else {
          rx = this._radius;
          ry = this._radius;
        }
        let v;
        let w = width / 2;
        let h = height / 2;
        v = this.vertices[0];
        v.x = -(w - rx);
        v.y = -h;
        v = this.vertices[1];
        v.x = w - rx;
        v.y = -h;
        v.controls.left.clear();
        v.controls.right.x = rx;
        v.controls.right.y = 0;
        v = this.vertices[2];
        v.x = w;
        v.y = -(h - ry);
        v.controls.right.clear();
        v.controls.left.clear();
        v = this.vertices[3];
        v.x = w;
        v.y = h - ry;
        v.controls.left.clear();
        v.controls.right.x = 0;
        v.controls.right.y = ry;
        v = this.vertices[4];
        v.x = w - rx;
        v.y = h;
        v.controls.right.clear();
        v.controls.left.clear();
        v = this.vertices[5];
        v.x = -(w - rx);
        v.y = h;
        v.controls.left.clear();
        v.controls.right.x = -rx;
        v.controls.right.y = 0;
        v = this.vertices[6];
        v.x = -w;
        v.y = h - ry;
        v.controls.left.clear();
        v.controls.right.clear();
        v = this.vertices[7];
        v.x = -w;
        v.y = -(h - ry);
        v.controls.left.clear();
        v.controls.right.x = 0;
        v.controls.right.y = -ry;
        v = this.vertices[8];
        v.x = -(w - rx);
        v.y = -h;
        v.controls.left.clear();
        v.controls.right.clear();
        v = this.vertices[9];
        v.copy(this.vertices[8]);
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.RoundedRectangle#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagWidth = this._flagHeight = this._flagRadius = false;
      super.flagReset.call(this);
      return this;
    }
    /**
     * @name Two.RoundedRectangle#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.RoundedRectangle}
     * @description Create a new instance of {@link Two.RoundedRectangle} with the same properties of the current path.
     */
    clone(parent) {
      const width = this.width;
      const height = this.height;
      const radius = this.radius;
      const clone = new _RoundedRectangle(0, 0, width, height, radius);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      for (let i = 0; i < Path.Properties.length; i++) {
        const k = Path.Properties[i];
        clone[k] = this[k];
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.RoundedRectangle#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "rounded-rectangle";
      for (let i = 0; i < _RoundedRectangle.Properties.length; i++) {
        const k = _RoundedRectangle.Properties[i];
        object[k] = this[k];
      }
      object.radius = typeof this.radius === "number" ? this.radius : this.radius.toObject();
      return object;
    }
  };
  var proto18 = {
    width: {
      enumerable: true,
      get: function() {
        return this._width;
      },
      set: function(v) {
        this._width = v;
        this._flagWidth = true;
      }
    },
    height: {
      enumerable: true,
      get: function() {
        return this._height;
      },
      set: function(v) {
        this._height = v;
        this._flagHeight = true;
      }
    },
    radius: {
      enumerable: true,
      get: function() {
        return this._radius;
      },
      set: function(v) {
        if (this._radius instanceof Vector) {
          this._radius.unbind(Events.Types.change, this._renderer.flagRadius);
        }
        this._radius = v;
        if (this._radius instanceof Vector) {
          this._radius.bind(Events.Types.change, this._renderer.flagRadius);
        }
        this._flagRadius = true;
      }
    }
  };
  function FlagRadius() {
    this._flagRadius = true;
  }

  // src/shapes/star.js
  var cos5 = Math.cos;
  var sin5 = Math.sin;
  var Star = class _Star extends Path {
    /**
     * @name Two.Star#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Star#innerRadius} needs updating.
     */
    _flagInnerRadius = false;
    /**
     * @name Two.Star#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Star#outerRadius} needs updating.
     */
    _flagOuterRadius = false;
    /**
     * @name Two.Star#_flagSides
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Star#sides} needs updating.
     */
    _flagSides = false;
    /**
     * @name Two.Star#_innerRadius
     * @private
     * @see {@link Two.Star#innerRadius}
     */
    _innerRadius = 0;
    /**
     * @name Two.Star#_outerRadius
     * @private
     * @see {@link Two.Star#outerRadius}
     */
    _outerRadius = 0;
    /**
     * @name Two.Star#_sides
     * @private
     * @see {@link Two.Star#sides}
     */
    _sides = 0;
    constructor(x, y, innerRadius, outerRadius, sides) {
      if (arguments.length <= 3) {
        outerRadius = innerRadius;
        innerRadius = outerRadius / 2;
      }
      if (typeof sides !== "number" || sides <= 0) {
        sides = 5;
      }
      super();
      this._renderer.type = "star";
      for (let prop in proto19) {
        Object.defineProperty(this, prop, proto19[prop]);
      }
      this.closed = true;
      this.automatic = false;
      if (typeof innerRadius === "number") {
        this.innerRadius = innerRadius;
      }
      if (typeof outerRadius === "number") {
        this.outerRadius = outerRadius;
      }
      if (typeof sides === "number") {
        this.sides = sides;
      }
      this._update();
      if (typeof x === "number") {
        this.translation.x = x;
      }
      if (typeof y === "number") {
        this.translation.y = y;
      }
    }
    /**
     * @name Two.Star.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Star}.
     */
    static Properties = ["innerRadius", "outerRadius", "sides"];
    /**
     * @name Two.Star.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Star} to create a new instance
     * @returns {Two.Star}
     * @description Create a new {@link Two.Star} from an object notation of a {@link Two.Star}.
     * @nota-bene Works in conjunction with {@link Two.Star#toObject}
     */
    static fromObject(obj) {
      const star = new _Star().copy(obj);
      if ("id" in obj) {
        star.id = obj.id;
      }
      return star;
    }
    /**
     * @name Two.Star#copy
     * @function
     * @param {Two.Star} star - The reference {@link Two.Star}
     * @description Copy the properties of one {@link Two.Star} onto another.
     */
    copy(star) {
      super.copy.call(this, star);
      for (let i = 0; i < _Star.Properties.length; i++) {
        const k = _Star.Properties[i];
        if (k in star && typeof star[k] === "number") {
          this[k] = star[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Star#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      if (this._flagVertices || this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {
        const sides = this._sides * 2;
        const amount = sides + 1;
        let length = this.vertices.length;
        if (length > sides) {
          this.vertices.splice(sides - 1, length - sides);
          length = sides;
        }
        for (let i = 0; i < amount; i++) {
          const pct = (i + 0.5) / sides;
          const theta = TWO_PI * pct;
          const r = (!(i % 2) ? this._innerRadius : this._outerRadius) / 2;
          const x = r * cos5(theta);
          const y = r * sin5(theta);
          if (i >= length) {
            this.vertices.push(new Anchor(x, y));
          } else {
            this.vertices[i].set(x, y);
          }
          this.vertices[i].command = i === 0 ? Commands.move : Commands.line;
        }
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.Star#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false;
      super.flagReset.call(this);
      return this;
    }
    /**
     * @name Two.Star#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Star}
     * @description Create a new instance of {@link Two.Star} with the same properties of the current path.
     */
    clone(parent) {
      const ir = this.innerRadius;
      const or = this.outerRadius;
      const sides = this.sides;
      const clone = new _Star(0, 0, ir, or, sides);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      for (let i = 0; i < Path.Properties.length; i++) {
        const k = Path.Properties[i];
        clone[k] = this[k];
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.Star#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "star";
      for (let i = 0; i < _Star.Properties.length; i++) {
        const k = _Star.Properties[i];
        object[k] = this[k];
      }
      return object;
    }
  };
  var proto19 = {
    innerRadius: {
      enumerable: true,
      get: function() {
        return this._innerRadius;
      },
      set: function(v) {
        this._innerRadius = v;
        this._flagInnerRadius = true;
      }
    },
    outerRadius: {
      enumerable: true,
      get: function() {
        return this._outerRadius;
      },
      set: function(v) {
        this._outerRadius = v;
        this._flagOuterRadius = true;
      }
    },
    sides: {
      enumerable: true,
      get: function() {
        return this._sides;
      },
      set: function(v) {
        this._sides = v;
        this._flagSides = true;
      }
    }
  };

  // src/text.js
  var canvas;
  var min2 = Math.min;
  var max2 = Math.max;
  if (root.document) {
    canvas = document.createElement("canvas");
  }
  var Text = class _Text extends Shape {
    /**
     * @name Two.Text#_flagValue
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#value} need updating.
     */
    _flagValue = true;
    /**
     * @name Two.Text#_flagFamily
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#family} need updating.
     */
    _flagFamily = true;
    /**
     * @name Two.Text#_flagSize
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#size} need updating.
     */
    _flagSize = true;
    /**
     * @name Two.Text#_flagLeading
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#leading} need updating.
     */
    _flagLeading = true;
    /**
     * @name Two.Text#_flagAlignment
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#alignment} need updating.
     */
    _flagAlignment = true;
    /**
     * @name Two.Text#_flagBaseline
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#baseline} need updating.
     */
    _flagBaseline = true;
    /**
     * @name Two.Text#_flagStyle
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#style} need updating.
     */
    _flagStyle = true;
    /**
     * @name Two.Text#_flagWeight
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#weight} need updating.
     */
    _flagWeight = true;
    /**
     * @name Two.Text#_flagDecoration
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#decoration} need updating.
     */
    _flagDecoration = true;
    /**
     * @name Two.Text#_flagFill
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#fill} need updating.
     */
    _flagFill = true;
    /**
     * @name Two.Text#_flagStroke
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#stroke} need updating.
     */
    _flagStroke = true;
    /**
     * @name Two.Text#_flagLinewidth
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#linewidth} need updating.
     */
    _flagLinewidth = true;
    /**
     * @name Two.Text#_flagOpacity
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#opacity} need updating.
     */
    _flagOpacity = true;
    /**
     * @name Two.Text#_flagVisible
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#visible} need updating.
     */
    _flagVisible = true;
    /**
     * @name Two.Text#_flagMask
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#mask} needs updating.
     */
    _flagMask = false;
    /**
     * @name Two.Text#_flagClip
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#clip} needs updating.
     */
    _flagClip = false;
    /**
     * @name Two.Text#_flagDirection
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#direction} needs updating.
     */
    _flagDirection = true;
    /**
     * @name Two.Text#_flagStrokeAttenuation
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Text#strokeAttenuation} needs updating.
     */
    _flagStrokeAttenuation = true;
    // Underlying Properties
    /**
     * @name Two.Text#value
     * @property {String} - The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.
     */
    _value = "";
    /**
     * @name Two.Text#family
     * @property {String} - The font family Two.js should attempt to register for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.
     */
    _family = "sans-serif";
    /**
     * @name Two.Text#size
     * @property {Number} - The font size in Two.js point space. Defaults to `13`.
     */
    _size = 13;
    /**
     * @name Two.Text#leading
     * @property {Number} - The height between lines measured from base to base in Two.js point space. Defaults to `17`.
     */
    _leading = 17;
    /**
     * @name Two.Text#alignment
     * @property {String} - Alignment of text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.
     */
    _alignment = "center";
    /**
     * @name Two.Text#baseline
     * @property {String} - The vertical aligment of the text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.
     * @nota-bene In headless environments where the canvas is based on {@link https://github.com/Automattic/node-canvas}, `baseline` seems to be the only valid property.
     */
    _baseline = "middle";
    /**
     * @name Two.Text#style
     * @property {String} - The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.
     */
    _style = "normal";
    /**
     * @name Two.Text#weight
     * @property {Number} - A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.
     */
    _weight = 500;
    /**
     * @name Two.Text#decoration
     * @property {String} - String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.
     */
    _decoration = "none";
    /**
     * @name Two.Text#direction
     * @property {String} - String to determine what direction the text should run. Possibly values are `'ltr'` for left-to-right and `'rtl'` for right-to-left. Defaults to `'ltr'`.
     */
    _direction = "ltr";
    /**
     * @name Two.Text#fill
     * @property {(String|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    _fill = "#000";
    /**
     * @name Two.Text#stroke
     * @property {(String|Two.Gradient|Two.Texture)} - The value of what the text object should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    _stroke = "none";
    /**
     * @name Two.Text#linewidth
     * @property {Number} - The thickness in pixels of the stroke.
     */
    _linewidth = 1;
    /**
     * @name Two.Text#opacity
     * @property {Number} - The opaqueness of the text object.
     * @nota-bene Can be used in conjunction with CSS Colors that have an alpha value.
     */
    _opacity = 1;
    /**
     * @name Two.Text#visible
     * @property {Boolean} - Display the text object or not.
     * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
     */
    _visible = true;
    /**
     * @name Two.Text#mask
     * @property {Two.Shape} - The shape whose alpha property becomes a clipping area for the text.
     * @nota-bene This property is currently not working because of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
     */
    _mask = null;
    /**
     * @name Two.Text#clip
     * @property {Two.Shape} - Object to define clipping area.
     * @nota-bene This property is currently not working because of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
     */
    _clip = false;
    /**
     * @name Two.Text#_dashes
     * @private
     * @see {@link Two.Text#dashes}
     */
    _dashes = null;
    /**
     * @name Two.Text#_strokeAttenuation
     * @private
     * @see {@link Two.Text#strokeAttenuation}
     */
    _strokeAttenuation = true;
    constructor(message, x, y, styles) {
      super();
      for (let prop in proto20) {
        Object.defineProperty(this, prop, proto20[prop]);
      }
      this._renderer.type = "text";
      this._renderer.flagFill = FlagFill2.bind(this);
      this._renderer.flagStroke = FlagStroke2.bind(this);
      this.value = message;
      if (typeof x === "number") {
        this.translation.x = x;
      }
      if (typeof y === "number") {
        this.translation.y = y;
      }
      this.dashes = [];
      this.dashes.offset = 0;
      if (!_.isObject(styles)) {
        return this;
      }
      for (let i = 0; i < _Text.Properties.length; i++) {
        const property = _Text.Properties[i];
        if (property in styles) {
          this[property] = styles[property];
        }
      }
    }
    /**
     * @name Two.Text.Ratio
     * @property {Number} - Approximate aspect ratio of a typeface's character width to height.
     */
    static Ratio = 0.6;
    /**
     * @name Two.Text.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Text}.
     */
    static Properties = [
      "value",
      "family",
      "size",
      "leading",
      "alignment",
      "linewidth",
      "style",
      "weight",
      "decoration",
      "direction",
      "baseline",
      "opacity",
      "visible",
      "fill",
      "stroke",
      "dashes",
      "strokeAttenuation"
    ];
    /**
     *
     * @name Two.Measure
     * @function
     * @param {Two.Text} [text] - The instance of {@link Two.Text} to measure.
     * @returns {Object} - The width and height of the {@link Two.Text} instance.
     */
    static Measure(text) {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.font = [
          text._style,
          text._weight,
          `${text._size}px/${text._leading}px`,
          text._family
        ].join(" ");
        const metrics = ctx.measureText(text.value, 0, 0);
        const height = metrics.actualBoundingBoxDescent + metrics.actualBoundingBoxAscent;
        return {
          width: metrics.width,
          height
        };
      } else {
        const width = this.value.length * this.size * _Text.Ratio;
        const height = this.leading;
        console.warn(
          "Two.Text: unable to accurately measure text, so using an approximation."
        );
        return {
          width,
          height
        };
      }
    }
    /**
     * @name Two.Text.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Text} to create a new instance
     * @returns {Two.Text}
     * @description Create a new {@link Two.Text} from an object notation of a {@link Two.Text}.
     * @nota-bene Works in conjunction with {@link Two.Text#toObject}
     */
    static fromObject(obj) {
      const fill = typeof obj.fill === "string" ? obj.fill : getEffectFromObject(obj.fill);
      const stroke = typeof obj.stroke === "string" ? obj.stroke : getEffectFromObject(obj.stroke);
      const text = new _Text().copy({ ...obj, fill, stroke });
      if ("id" in obj) {
        text.id = obj.id;
      }
      return text;
    }
    /**
     * @name Two.Text#copy
     * @function
     * @param {Two.Text} text
     * @description Copy the properties of one {@link Two.Text} onto another.
     */
    copy(text) {
      super.copy.call(this, text);
      for (let i = 0; i < _Text.Properties.length; i++) {
        const k = _Text.Properties[i];
        if (k in text) {
          this[k] = text[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Text#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Text}
     * @description Create a new instance of {@link Two.Text} with the same properties of the current text object.
     */
    clone(parent) {
      const clone = new _Text(this.value);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      for (let i = 0; i < _Text.Properties.length; i++) {
        const prop = _Text.Properties[i];
        clone[prop] = this[prop];
      }
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      if (parent) {
        parent.add(clone);
      }
      return clone._update();
    }
    /**
     * @name Two.Text#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the text object.
     * @nota-bene Works in conjunction with {@link Two.Text.fromObject}
     */
    toObject() {
      const result = super.toObject.call(this);
      result.renderer.type = "text";
      for (let i = 0; i < _Text.Properties.length; i++) {
        const prop = _Text.Properties[i];
        result[prop] = this[prop];
      }
      return result;
    }
    /**
     * @name Two.Text#dispose
     * @function
     * @returns {Two.Text}
     * @description Release the text's renderer resources and detach all events.
     * This method disposes fill and stroke effects (calling dispose() on
     * Gradients and Textures for thorough cleanup) while preserving the
     * renderer type for potential re-attachment to a new renderer.
     */
    dispose() {
      super.dispose();
      if (typeof this.fill === "object" && typeof this.fill.dispose === "function") {
        this.fill.dispose();
      } else if (typeof this.fill === "object" && typeof this.fill.unbind === "function") {
        this.fill.unbind();
      }
      if (typeof this.stroke === "object" && typeof this.stroke.dispose === "function") {
        this.stroke.dispose();
      } else if (typeof this.stroke === "object" && typeof this.stroke.unbind === "function") {
        this.stroke.unbind();
      }
      return this;
    }
    /**
     * @name Two.Text#noFill
     * @function
     * @description Short hand method to set fill to `none`.
     */
    noFill() {
      this.fill = "none";
      return this;
    }
    /**
     * @name Two.Text#noStroke
     * @function
     * @description Short hand method to set stroke to `none`.
     */
    noStroke() {
      this.stroke = "none";
      this.linewidth = 0;
      return this;
    }
    // A shim to not break `getBoundingClientRect` calls.
    // TODO: Implement a way to calculate proper bounding
    // boxes of `Two.Text`.
    /**
     * @name Two.Text#getBoundingClientRect
     * @function
     * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
     * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
     * @description Return an object with top, left, right, bottom, width, and height parameters of the text object.
     */
    getBoundingClientRect(shallow) {
      let matrix;
      let left, right, top, bottom;
      this._update(true);
      matrix = shallow ? this.matrix : this.worldMatrix;
      const { width, height } = _Text.Measure(this);
      const border = (this._linewidth || 0) / 2;
      switch (this.alignment) {
        case "left":
          left = -border;
          right = width + border;
          break;
        case "right":
          left = -(width + border);
          right = border;
          break;
        default:
          left = -(width / 2 + border);
          right = width / 2 + border;
      }
      switch (this.baseline) {
        case "middle":
          top = -(height / 2 + border);
          bottom = height / 2 + border;
          break;
        default:
          top = -(height + border);
          bottom = border;
      }
      const [ax, ay] = matrix.multiply(left, top);
      const [bx, by] = matrix.multiply(left, bottom);
      const [cx, cy] = matrix.multiply(right, top);
      const [dx, dy] = matrix.multiply(right, bottom);
      top = min2(ay, by, cy, dy);
      left = min2(ax, bx, cx, dx);
      right = max2(ax, bx, cx, dx);
      bottom = max2(ay, by, cy, dy);
      return {
        top,
        left,
        right,
        bottom,
        width: right - left,
        height: bottom - top
      };
    }
    /**
     * @name Two.Text#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      super.flagReset.call(this);
      this._flagValue = this._flagFamily = this._flagSize = this._flagLeading = this._flagAlignment = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagClip = this._flagDecoration = this._flagClassName = this._flagBaseline = this._flagWeight = this._flagStyle = this._flagDirection = false;
      return this;
    }
  };
  var proto20 = {
    value: {
      enumerable: true,
      get: function() {
        return this._value;
      },
      set: function(v) {
        this._value = v;
        this._flagValue = true;
      }
    },
    family: {
      enumerable: true,
      get: function() {
        return this._family;
      },
      set: function(v) {
        this._family = v;
        this._flagFamily = true;
      }
    },
    size: {
      enumerable: true,
      get: function() {
        return this._size;
      },
      set: function(v) {
        this._size = v;
        this._flagSize = true;
      }
    },
    leading: {
      enumerable: true,
      get: function() {
        return this._leading;
      },
      set: function(v) {
        this._leading = v;
        this._flagLeading = true;
      }
    },
    alignment: {
      enumerable: true,
      get: function() {
        return this._alignment;
      },
      set: function(v) {
        this._alignment = v;
        this._flagAlignment = true;
      }
    },
    linewidth: {
      enumerable: true,
      get: function() {
        return this._linewidth;
      },
      set: function(v) {
        this._linewidth = v;
        this._flagLinewidth = true;
      }
    },
    style: {
      enumerable: true,
      get: function() {
        return this._style;
      },
      set: function(v) {
        this._style = v;
        this._flagStyle = true;
      }
    },
    weight: {
      enumerable: true,
      get: function() {
        return this._weight;
      },
      set: function(v) {
        this._weight = v;
        this._flagWeight = true;
      }
    },
    decoration: {
      enumerable: true,
      get: function() {
        return this._decoration;
      },
      set: function(v) {
        this._decoration = v;
        this._flagDecoration = true;
      }
    },
    direction: {
      enumerable: true,
      get: function() {
        return this._direction;
      },
      set: function(v) {
        this._direction = v;
        this._flagDirection = true;
      }
    },
    baseline: {
      enumerable: true,
      get: function() {
        return this._baseline;
      },
      set: function(v) {
        this._baseline = v;
        this._flagBaseline = true;
      }
    },
    opacity: {
      enumerable: true,
      get: function() {
        return this._opacity;
      },
      set: function(v) {
        this._opacity = v;
        this._flagOpacity = true;
      }
    },
    visible: {
      enumerable: true,
      get: function() {
        return this._visible;
      },
      set: function(v) {
        this._visible = v;
        this._flagVisible = true;
      }
    },
    fill: {
      enumerable: true,
      get: function() {
        return this._fill;
      },
      set: function(f) {
        if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
          this._fill.unbind(Events.Types.change, this._renderer.flagFill);
        }
        this._fill = f;
        this._flagFill = true;
        if (this._fill instanceof Gradient || this._fill instanceof LinearGradient || this._fill instanceof RadialGradient || this._fill instanceof Texture) {
          this._fill.bind(Events.Types.change, this._renderer.flagFill);
        }
      }
    },
    stroke: {
      enumerable: true,
      get: function() {
        return this._stroke;
      },
      set: function(f) {
        if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
          this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
        }
        this._stroke = f;
        this._flagStroke = true;
        if (this._stroke instanceof Gradient || this._stroke instanceof LinearGradient || this._stroke instanceof RadialGradient || this._stroke instanceof Texture) {
          this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
        }
      }
    },
    mask: {
      enumerable: true,
      get: function() {
        return this._mask;
      },
      set: function(v) {
        this._mask = v;
        this._flagMask = true;
        if (_.isObject(v) && !v.clip) {
          v.clip = true;
        }
      }
    },
    clip: {
      enumerable: true,
      get: function() {
        return this._clip;
      },
      set: function(v) {
        this._clip = v;
        this._flagClip = true;
      }
    },
    dashes: {
      enumerable: true,
      get: function() {
        return this._dashes;
      },
      set: function(v) {
        if (typeof v.offset !== "number") {
          v.offset = this.dashes && this._dashes.offset || 0;
        }
        this._dashes = v;
      }
    },
    /**
     * @name Two.Text#strokeAttenuation
     * @property {Boolean} - When set to `true`, stroke width scales with transformations (default behavior). When `false`, stroke width remains constant in screen space.
     * @description When `strokeAttenuation` is `false`, the stroke width is automatically adjusted to compensate for the object's world transform scale, maintaining constant visual thickness regardless of zoom level. When `true` (default), stroke width scales normally with transformations.
     */
    strokeAttenuation: {
      enumerable: true,
      get: function() {
        return this._strokeAttenuation;
      },
      set: function(v) {
        this._strokeAttenuation = !!v;
        this._flagStrokeAttenuation = true;
        this._flagLinewidth = true;
      }
    }
  };
  function FlagFill2() {
    this._flagFill = true;
  }
  function FlagStroke2() {
    this._flagStroke = true;
  }

  // src/effects/image-sequence.js
  var ImageSequence = class _ImageSequence extends Rectangle {
    /**
     * @name Two.ImageSequence#_flagTextures
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ImageSequence#textures} need updating.
     */
    _flagTextures = false;
    /**
     * @name Two.ImageSequence#_flagFrameRate
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ImageSequence#frameRate} needs updating.
     */
    _flagFrameRate = false;
    /**
     * @name Two.ImageSequence#_flagIndex
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ImageSequence#index} needs updating.
     */
    _flagIndex = false;
    // Private variables
    /**
     * @name Two.ImageSequence#_amount
     * @private
     * @property {Number} - Number of frames for a given {@link Two.ImageSequence}.
     */
    _amount = 1;
    /**
     * @name Two.ImageSequence#_duration
     * @private
     * @property {Number} - Number of milliseconds a {@link Two.ImageSequence}.
     */
    _duration = 0;
    /**
     * @name Two.ImageSequence#_index
     * @private
     * @property {Number} - The current frame the {@link Two.ImageSequence} is currently displaying.
     */
    _index = 0;
    /**
     * @name Two.ImageSequence#_startTime
     * @private
     * @property {Milliseconds} - Epoch time in milliseconds of when the {@link Two.ImageSequence} started.
     */
    _startTime = 0;
    /**
     * @name Two.ImageSequence#_playing
     * @private
     * @property {Boolean} - Dictates whether the {@link Two.ImageSequence} is animating or not.
     */
    _playing = false;
    /**
     * @name Two.ImageSequence#_firstFrame
     * @private
     * @property {Number} - The frame the {@link Two.ImageSequence} should start with.
     */
    _firstFrame = 0;
    /**
     * @name Two.ImageSequence#_lastFrame
     * @private
     * @property {Number} - The frame the {@link Two.ImageSequence} should end with.
     */
    _lastFrame = 0;
    /**
     * @name Two.ImageSequence#_playing
     * @private
     * @property {Boolean} - Dictates whether the {@link Two.ImageSequence} should loop or not.
     */
    _loop = true;
    // Exposed through getter-setter
    /**
     * @name Two.ImageSequence#_textures
     * @private
     * @see {@link Two.ImageSequence#textures}
     */
    _textures = null;
    /**
     * @name Two.ImageSequence#_frameRate
     * @private
     * @see {@link Two.ImageSequence#frameRate}
     */
    _frameRate = 0;
    /**
     * @name Two.ImageSequence#_origin
     * @private
     * @see {@link Two.ImageSequence#origin}
     */
    _origin = null;
    constructor(src, ox, oy, frameRate) {
      super(ox, oy, 0, 0);
      this._renderer.type = "image-sequence";
      for (let prop in proto21) {
        Object.defineProperty(this, prop, proto21[prop]);
      }
      this._renderer.flagTextures = FlagTextures.bind(this);
      this._renderer.bindTextures = BindTextures.bind(this);
      this._renderer.unbindTextures = UnbindTextures.bind(this);
      this.noStroke();
      this.noFill();
      if (Array.isArray(src)) {
        this.textures = src.map(GenerateTexture.bind(this));
      } else if (typeof src === "string") {
        this.textures = [GenerateTexture(src)];
      }
      this.origin = new Vector();
      this._update();
      if (typeof frameRate === "number") {
        this.frameRate = frameRate;
      } else {
        this.frameRate = _ImageSequence.DefaultFrameRate;
      }
      this.index = 0;
    }
    /**
     * @name Two.ImageSequence.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.ImageSequence}.
     */
    static Properties = [
      "textures",
      "frameRate",
      "index",
      "firstFrame",
      "lastFrame",
      "loop"
    ];
    /**
     * @name Two.ImageSequence.DefaultFrameRate
     * @property The default frame rate that {@link Two.ImageSequence#frameRate} is set to when instantiated.
     */
    static DefaultFrameRate = 30;
    /**
     * @name Two.ImageSequence.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.ImageSequence} to create a new instance
     * @returns {Two.ImageSequence}
     * @description Create a new {@link Two.ImageSequence} from an object notation of a {@link Two.ImageSequence}.
     * @nota-bene Works in conjunction with {@link Two.ImageSequence#toObject}
     */
    static fromObject(obj) {
      const sequence = new _ImageSequence().copy(obj);
      if ("id" in obj) {
        sequence.id = obj.id;
      }
      return sequence;
    }
    /**
     * @name Two.ImageSequence#copy
     * @function
     * @param {Two.ImageSequence} imageSequence - The reference {@link Two.ImageSequence}
     * @description Copy the properties of one {@link Two.ImageSequence} onto another.
     */
    copy(imageSequence) {
      super.copy.call(this, imageSequence);
      for (let i = 0; i < _ImageSequence.Properties.length; i++) {
        const k = _ImageSequence.Properties[i];
        if (k in imageSequence) {
          this[k] = imageSequence[k];
        }
      }
      return this;
    }
    /**
     * @name Two.ImageSequence#play
     * @function
     * @param {Number} [firstFrame=0] - The index of the frame to start the animation with.
     * @param {Number} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.ImageSequence#textures}.
     * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped.
     * @description Initiate animation playback of a {@link Two.ImageSequence}.
     */
    play(firstFrame, lastFrame, onLastFrame) {
      this._playing = true;
      this._firstFrame = 0;
      this._lastFrame = this.amount - 1;
      this._startTime = _.performance.now();
      if (typeof firstFrame === "number") {
        this._firstFrame = firstFrame;
      }
      if (typeof lastFrame === "number") {
        this._lastFrame = lastFrame;
      }
      if (typeof onLastFrame === "function") {
        this._onLastFrame = onLastFrame;
      } else {
        delete this._onLastFrame;
      }
      if (this._index !== this._firstFrame) {
        this._startTime -= 1e3 * Math.abs(this._index - this._firstFrame) / this._frameRate;
      }
      return this;
    }
    /**
     * @name Two.ImageSequence#pause
     * @function
     * @description Halt animation playback of a {@link Two.ImageSequence}.
     */
    pause() {
      this._playing = false;
      return this;
    }
    /**
     * @name Two.ImageSequence#stop
     * @function
     * @description Halt animation playback of a {@link Two.ImageSequence} and set the current frame back to the first frame.
     */
    stop() {
      this._playing = false;
      this._index = this._firstFrame;
      return this;
    }
    /**
     * @name Two.ImageSequence#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.ImageSequence}
     * @description Create a new instance of {@link Two.ImageSequence} with the same properties of the current image sequence.
     */
    clone(parent) {
      const clone = new _ImageSequence(
        this.textures,
        this.translation.x,
        this.translation.y,
        this.frameRate
      );
      clone._loop = this._loop;
      if (this._playing) {
        clone.play();
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.ImageSequence#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "image-sequence";
      object.textures = this.textures.map(function(texture) {
        return texture.toObject();
      });
      object.frameRate = this.frameRate;
      object.index = this.index;
      object.firstFrame = this.firstFrame;
      object.lastFrame = this.lastFrame;
      object.loop = this.loop;
      return object;
    }
    /**
     * @name Two.ImageSequence#dispose
     * @function
     * @returns {Two.ImageSequence}
     * @description Release the image sequence's renderer resources and detach all events.
     * This method stops any running animation, clears animation callbacks, unbinds
     * textures collection events, and disposes individual textures (calling dispose()
     * for thorough cleanup) while preserving the renderer type for potential
     * re-attachment to a new renderer.
     */
    dispose() {
      super.dispose();
      if (this._playing) {
        this._playing = false;
      }
      this._onLastFrame = null;
      if (this.textures && typeof this.textures.unbind === "function") {
        try {
          this.textures.unbind();
        } catch (e) {
        }
      }
      if (this.textures) {
        for (let i = 0; i < this.textures.length; i++) {
          const texture = this.textures[i];
          if (typeof texture.dispose === "function") {
            texture.dispose();
          } else if (typeof texture.unbind === "function") {
            texture.unbind();
          }
        }
      }
      return this;
    }
    /**
     * @name Two.ImageSequence#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      const effect = this._textures;
      let width, height, elapsed, amount, duration, texture;
      let index, frames;
      if (effect) {
        if (this._flagTextures) {
          this._amount = effect.length;
        }
        if (this._flagFrameRate) {
          this._duration = 1e3 * this._amount / this._frameRate;
        }
        if (this._playing && this._frameRate > 0) {
          amount = this._amount;
          if (_.isNaN(this._lastFrame)) {
            this._lastFrame = amount - 1;
          }
          elapsed = _.performance.now() - this._startTime;
          frames = this._lastFrame + 1;
          duration = 1e3 * (frames - this._firstFrame) / this._frameRate;
          if (this._loop) {
            elapsed = elapsed % duration;
          } else {
            elapsed = Math.min(elapsed, duration);
          }
          index = lerp(this._firstFrame, frames, elapsed / duration);
          index = Math.floor(index);
          if (index !== this._index) {
            this._index = index;
            texture = effect[this._index];
            if (texture.loaded) {
              width = texture.image.width;
              height = texture.image.height;
              if (this.width !== width) {
                this.width = width;
              }
              if (this.height !== height) {
                this.height = height;
              }
              this.fill = texture;
              if (index >= this._lastFrame - 1 && this._onLastFrame) {
                this._onLastFrame();
              }
            }
          }
        } else if (this._flagIndex || !(this.fill instanceof Texture)) {
          texture = effect[this._index];
          if (texture.loaded) {
            width = texture.image.width;
            height = texture.image.height;
            if (this.width !== width) {
              this.width = width;
            }
            if (this.height !== height) {
              this.height = height;
            }
          }
          this.fill = texture;
        }
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.ImageSequence#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      this._flagTextures = this._flagFrameRate = false;
      super.flagReset.call(this);
      return this;
    }
  };
  var proto21 = {
    frameRate: {
      enumerable: true,
      get: function() {
        return this._frameRate;
      },
      set: function(v) {
        this._frameRate = v;
        this._flagFrameRate = true;
      }
    },
    index: {
      enumerable: true,
      get: function() {
        return this._index;
      },
      set: function(v) {
        this._index = v;
        this._flagIndex = true;
      }
    },
    textures: {
      enumerable: true,
      get: function() {
        return this._textures;
      },
      set: function(textures) {
        const bindTextures = this._renderer.bindTextures;
        const unbindTextures = this._renderer.unbindTextures;
        if (this._textures) {
          this._textures.unbind(Events.Types.insert, bindTextures).unbind(Events.Types.remove, unbindTextures);
        }
        this._textures = new Collection((textures || []).slice(0));
        this._textures.bind(Events.Types.insert, bindTextures).bind(Events.Types.remove, unbindTextures);
        bindTextures(this._textures);
      }
    },
    firstFrame: {
      enumerable: true,
      get: function() {
        return this._firstFrame;
      },
      set: function(v) {
        this._firstFrame = v;
      }
    },
    lastFrame: {
      enumerable: true,
      get: function() {
        return this._lastFrame;
      },
      set: function(v) {
        this._lastFrame = v;
      }
    },
    loop: {
      enumerable: true,
      get: function() {
        return this._loop;
      },
      set: function(v) {
        this._loop = !!v;
      }
    }
  };
  function FlagTextures() {
    this._flagTextures = true;
  }
  function BindTextures(items) {
    let i = items.length;
    while (i--) {
      items[i].bind(Events.Types.change, this._renderer.flagTextures);
    }
    this._renderer.flagTextures();
  }
  function UnbindTextures(items) {
    let i = items.length;
    while (i--) {
      items[i].unbind(Events.Types.change, this._renderer.flagTextures);
    }
    this._renderer.flagTextures();
  }
  function GenerateTexture(obj) {
    if (obj instanceof Texture) {
      return obj;
    } else if (typeof obj === "string") {
      return new Texture(obj);
    }
  }

  // src/group.js
  var min3 = Math.min;
  var max3 = Math.max;
  var cache = {
    getShapesAtPoint: {
      results: [],
      hitOptions: {},
      context: {
        x: 0,
        y: 0,
        visibleOnly: true,
        results: null
      },
      single: [],
      output: [],
      empty: []
    }
  };
  var Group = class _Group extends Shape {
    /**
     * @name Two.Group#_flagAdditions
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#additions} needs updating.
     */
    _flagAdditions = false;
    /**
     * @name Two.Group#_flagSubtractions
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#subtractions} needs updating.
     */
    _flagSubtractions = false;
    /**
     * @name Two.Group#_flagOrder
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#order} needs updating.
     */
    _flagOrder = false;
    /**
     * @name Two.Group#_flagVisible
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#visible} needs updating.
     */
    /**
     * @name Two.Group#_flagOpacity
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#opacity} needs updating.
     */
    _flagOpacity = true;
    /**
     * @name Two.Group#_flagBeginning
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#beginning} needs updating.
     */
    _flagBeginning = false;
    /**
     * @name Two.Group#_flagEnding
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#ending} needs updating.
     */
    _flagEnding = false;
    /**
     * @name Two.Group#_flagLength
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#length} needs updating.
     */
    _flagLength = false;
    /**
     * @name Two.Group#_flagMask
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#mask} needs updating.
     */
    _flagMask = false;
    // Underlying Properties
    /**
     * @name Two.Group#fill
     * @property {(String|Two.Gradient|Two.Texture)} - The value of what all child shapes should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    _fill = "#fff";
    /**
     * @name Two.Group#stroke
     * @property {(String|Two.Gradient|Two.Texture)} - The value of what all child shapes should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    _stroke = "#000";
    /**
     * @name Two.Group#linewidth
     * @property {Number} - The thickness in pixels of the stroke for all child shapes.
     */
    _linewidth = 1;
    /**
     * @name Two.Group#opacity
     * @property {Number} - The opaqueness of all child shapes.
     * @nota-bene Becomes multiplied by the individual child's opacity property.
     */
    _opacity = 1;
    /**
     * @name Two.Group#visible
     * @property {Boolean} - Display the path or not.
     * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
     */
    _visible = true;
    /**
     * @name Two.Group#cap
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
     */
    _cap = "round";
    /**
     * @name Two.Group#join
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
     */
    _join = "round";
    /**
     * @name Two.Group#miter
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
     */
    _miter = 4;
    /**
     * @name Two.Group#closed
     * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.
     */
    _closed = true;
    /**
     * @name Two.Group#curved
     * @property {Boolean} - When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
     */
    _curved = false;
    /**
     * @name Two.Group#automatic
     * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
     */
    _automatic = true;
    /**
     * @name Two.Group#beginning
     * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
     * @description {@link Two.Group#beginning} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#ending}.
     */
    _beginning = 0;
    /**
     * @name Two.Group#ending
     * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
     * @description {@link Two.Group#ending} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#beginning}.
     */
    _ending = 1;
    /**
     * @name Two.Group#length
     * @property {Number} - The sum of distances between all child lengths.
     */
    _length = 0;
    /**
     * @name Two.Group#mask
     * @property {Two.Shape} - The Two.js object to clip from a group's rendering.
     */
    _mask = null;
    /**
     * @name Two.Group#_strokeAttenuation
     * @private
     * @see {@link Two.Group#strokeAttenuation}
     */
    _strokeAttenuation = true;
    constructor(children) {
      super();
      for (let prop in proto22) {
        Object.defineProperty(this, prop, proto22[prop]);
      }
      this._renderer.type = "group";
      this.additions = [];
      this.subtractions = [];
      this.children = Array.isArray(children) ? children : Array.prototype.slice.call(arguments);
    }
    static Children = Children;
    /**
     * @name Two.Group.InsertChildren
     * @function
     * @param {Two.Shape[]} children - The objects to be inserted.
     * @description Cached method to let renderers know children have been added to a {@link Two.Group}.
     */
    static InsertChildren(children) {
      for (let i = 0; i < children.length; i++) {
        replaceParent.call(this, children[i], this);
      }
    }
    /**
     * @name Two.Group.RemoveChildren
     * @function
     * @param {Two.Shape[]} children - The objects to be removed.
     * @description Cached method to let renderers know children have been removed from a {@link Two.Group}.
     */
    static RemoveChildren(children) {
      for (let i = 0; i < children.length; i++) {
        replaceParent.call(this, children[i]);
      }
    }
    /**
     * @name Two.Group.OrderChildren
     * @function
     * @description Cached method to let renderers know order has been updated on a {@link Two.Group}.
     */
    static OrderChildren(children) {
      this._flagOrder = true;
    }
    /**
     * @name Two.Group.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Group}.
     */
    static Properties = [
      "fill",
      "stroke",
      "linewidth",
      "cap",
      "join",
      "miter",
      "closed",
      "curved",
      "automatic"
    ];
    static fromObject(obj) {
      const group = new _Group();
      for (let i = 0; i < _Group.Properties.length; i++) {
        const k = _Group.Properties[i];
        if (k in obj) {
          if (/(fill|stroke)/i.test(k)) {
            group[k] = typeof obj[k] === "string" ? obj[k] : getEffectFromObject(obj[k]);
          } else {
            group[k] = obj[k];
          }
        }
      }
      if ("mask" in obj) {
        group.mask = getShapeFromObject(obj.mask);
      }
      if ("id" in obj) {
        group.id = obj.id;
      }
      group.children = obj.children.map(getShapeFromObject);
      return group;
      function getShapeFromObject(child) {
        if (child && child.renderer) {
          switch (child.renderer.type) {
            case "arc-segment":
              return ArcSegment.fromObject(child);
            case "circle":
              return Circle.fromObject(child);
            case "element":
              return Element.fromObject(child);
            case "ellipse":
              return Ellipse.fromObject(child);
            case "group":
              return _Group.fromObject(child);
            case "image":
              return Image.fromObject(child);
            case "image-sequence":
              return ImageSequence.fromObject(child);
            case "path":
              return Path.fromObject(child);
            case "points":
              return Points.fromObject(child);
            case "polygon":
              return Polygon.fromObject(child);
            case "rectangle":
              return Rectangle.fromObject(child);
            case "rounded-rectangle":
              return RoundedRectangle.fromObject(child);
            case "shape":
              return Shape.fromObject(child);
            case "sprite":
              return Sprite.fromObject(child);
            case "star":
              return Star.fromObject(child);
            case "text":
              return Text.fromObject(child);
          }
        }
        return child;
      }
    }
    static IsVisible(element, visibleOnly) {
      if (!visibleOnly) {
        return true;
      }
      let current = element;
      while (current) {
        if (typeof current.visible === "boolean" && !current.visible) {
          return false;
        }
        if (typeof current.opacity === "number" && current.opacity <= 0) {
          return false;
        }
        current = current.parent;
      }
      return true;
    }
    static VisitForHitTest(group, context, includeGroups, filter, hitOptions, tolerance, stopOnFirst) {
      const children = group && group.children;
      if (!children) {
        return false;
      }
      const results = context.results;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (!child) {
          continue;
        }
        if (!_Group.IsVisible(child, context.visibleOnly)) {
          continue;
        }
        const rect = typeof child.getBoundingClientRect === "function" ? child.getBoundingClientRect() : null;
        if (rect && !boundsContains(rect, context.x, context.y, tolerance)) {
          continue;
        }
        if (child instanceof _Group) {
          if (includeGroups && (!filter || filter(child)) && typeof child.contains === "function" && child.contains(context.x, context.y, hitOptions)) {
            results.push(child);
            if (stopOnFirst) {
              return true;
            }
          }
          if (_Group.VisitForHitTest(
            child,
            context,
            includeGroups,
            filter,
            hitOptions,
            tolerance,
            stopOnFirst
          )) {
            return true;
          }
          continue;
        }
        if (!(child instanceof Shape)) {
          continue;
        }
        if (filter && !filter(child)) {
          continue;
        }
        if (typeof child.contains !== "function") {
          continue;
        }
        if (child.contains(context.x, context.y, hitOptions)) {
          results.push(child);
          if (stopOnFirst) {
            return true;
          }
        }
      }
      return false;
    }
    /**
     * @name Two.Group#copy
     * @function
     * @param {Two.Group} [group] - The reference {@link Two.Group}
     * @returns {Two.Group}
     * @description Copy the properties of one {@link Two.Group} onto another.
     */
    copy(group) {
      super.copy.call(this, group);
      console.warn(
        "Two.js: attempting to copy group. Two.Group.children copying not supported."
      );
      for (let i = 0; i < _Group.Properties.length; i++) {
        const k = _Group.Properties[i];
        if (k in group) {
          this[k] = group[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Group#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Group}
     * @description Create a new instance of {@link Two.Group} with the same properties of the current group.
     */
    clone(parent) {
      const clone = new _Group();
      const children = this.children.map(function(child) {
        return child.clone();
      });
      clone.add(children);
      clone.opacity = this.opacity;
      if (this.mask) {
        clone.mask = this.mask;
      }
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.className = this.className;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      if (parent) {
        parent.add(clone);
      }
      return clone._update();
    }
    /**
     * @name Two.Group#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the group.
     */
    toObject() {
      const result = super.toObject.call(this);
      result.renderer.type = "group";
      result.children = [];
      result.opacity = this.opacity;
      result.className = this.className;
      result.mask = this.mask ? this.mask.toObject() : null;
      _.each(
        this.children,
        (child, i) => {
          result.children[i] = child.toObject();
        },
        this
      );
      return result;
    }
    /**
     * @name Two.Group#dispose
     * @function
     * @returns {Two.Group}
     * @description Release the group's renderer resources and detach all events.
     * This method recursively disposes all child objects, unbinds the children
     * collection events, and preserves the renderer type for potential re-attachment
     * to a new renderer.
     */
    dispose() {
      super.dispose();
      if (this.children) {
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          if (typeof child.dispose === "function") {
            child.dispose();
          }
        }
      }
      if (this.children && typeof this.children.unbind === "function") {
        try {
          this.children.unbind();
        } catch (e) {
        }
      }
      return this;
    }
    /**
     * @name Two.Group#getShapesAtPoint
     * @function
     * @param {Number} x - X coordinate in world space.
     * @param {Number} y - Y coordinate in world space.
     * @param {Object} [options] - Hit test configuration.
     * @param {Boolean} [options.visibleOnly=true] - Limit results to visible shapes.
     * @param {Boolean} [options.includeGroups=false] - Include groups in the hit results.
     * @param {('all'|'deepest')} [options.mode='all'] - Whether to return all intersecting shapes or only the top-most.
     * @param {Boolean} [options.deepest] - Alias for `mode: 'deepest'`.
     * @param {Number} [options.precision] - Segmentation precision for curved geometry.
     * @param {Number} [options.tolerance=0] - Pixel tolerance applied to hit testing.
     * @param {Boolean} [options.fill] - Override fill testing behaviour.
     * @param {Boolean} [options.stroke] - Override stroke testing behaviour.
     * @param {Function} [options.filter] - Predicate to filter shapes from the result set.
     * @returns {Shape[]} Ordered list of intersecting shapes, front to back.
     * @description Traverse the group hierarchy and return shapes that contain the specified point.
     * @nota-bene Expects *world-space coordinates* – the same pixel-space you get from the renderer (e.g., mouse `clientX`/`clientY` adjusted for the canvas’s offset and pixel ratio).
     */
    getShapesAtPoint(x, y, options) {
      const opts = options || {};
      const { results, hitOptions, context, single, empty } = cache.getShapesAtPoint;
      results.length = 0;
      const mode = opts.mode === "deepest" || opts.deepest ? "deepest" : "all";
      const visibleOnly = opts.visibleOnly !== false;
      const includeGroups = !!opts.includeGroups;
      const filter = typeof opts.filter === "function" ? opts.filter : null;
      const tolerance = typeof opts.tolerance === "number" ? opts.tolerance : 0;
      if (typeof opts.precision === "number") {
        hitOptions.precision = opts.precision;
      } else {
        delete hitOptions.precision;
      }
      if (typeof opts.fill !== "undefined") {
        hitOptions.fill = opts.fill;
      } else {
        delete hitOptions.fill;
      }
      if (typeof opts.stroke !== "undefined") {
        hitOptions.stroke = opts.stroke;
      } else {
        delete hitOptions.stroke;
      }
      hitOptions.tolerance = tolerance;
      hitOptions.ignoreVisibility = !visibleOnly;
      const stopOnFirst = mode === "deepest";
      context.x = x;
      context.y = y;
      context.visibleOnly = visibleOnly;
      context.results = results;
      _Group.VisitForHitTest(
        this,
        context,
        includeGroups,
        filter,
        hitOptions,
        tolerance,
        stopOnFirst
      );
      if (stopOnFirst) {
        if (results.length > 0) {
          const first = results[0];
          results.length = 0;
          single[0] = first;
          single.length = 1;
          return single;
        }
        empty.length = 0;
        return empty;
      }
      const hits = results.slice();
      results.length = 0;
      return hits;
    }
    /**
     * @name Two.Group#corner
     * @function
     * @description Orient the children of the group to the upper left-hand corner of that group.
     */
    corner() {
      const rect = this.getBoundingClientRect(true);
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.translation.x -= rect.left;
        child.translation.y -= rect.top;
      }
      if (this.mask) {
        this.mask.translation.x -= rect.left;
        this.mask.translation.y -= rect.top;
      }
      return this;
    }
    /**
     * @name Two.Group#center
     * @function
     * @description Orient the children of the group to the center of that group.
     */
    center() {
      const rect = this.getBoundingClientRect(true);
      const cx = rect.left + rect.width / 2 - this.translation.x;
      const cy = rect.top + rect.height / 2 - this.translation.y;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        if (child.isShape) {
          child.translation.x -= cx;
          child.translation.y -= cy;
        }
      }
      if (this.mask) {
        this.mask.translation.x -= cx;
        this.mask.translation.y -= cy;
      }
      return this;
    }
    /**
     * @name Two.Group#getById
     * @function
     * @description Recursively search for id. Returns the first element found.
     * @returns {Two.Shape} - Or `null` if nothing is found.
     */
    getById(id) {
      let found = null;
      function search(node) {
        if (node.id === id) {
          return node;
        } else if (node.children) {
          if (node.children.ids[id]) {
            return node.children.ids[id];
          }
          for (let i = 0; i < node.children.length; i++) {
            found = search(node.children[i]);
            if (found) {
              return found;
            }
          }
        }
        return null;
      }
      return search(this);
    }
    /**
     * @name Two.Group#getByClassName
     * @function
     * @description Recursively search for classes. Returns an array of matching elements.
     * @returns {Two.Shape[]} - Or empty array if nothing is found.
     */
    getByClassName(className) {
      const found = [];
      function search(node) {
        if (Array.prototype.indexOf.call(node.classList, className) >= 0) {
          found.push(node);
        }
        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            search(child);
          }
        }
        return found;
      }
      return search(this);
    }
    /**
     * @name Two.Group#getByType
     * @function
     * @description Recursively search for children of a specific type, e.g. {@link Two.Path}. Pass a reference to this type as the param. Returns an array of matching elements.
     * @returns {Two.Shape[]} - Empty array if nothing is found.
     */
    getByType(type) {
      const found = [];
      function search(node) {
        if (node instanceof type) {
          found.push(node);
        }
        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            search(child);
          }
        }
        return found;
      }
      return search(this);
    }
    /**
     * @name Two.Group#add
     * @function
     * @param {Two.Shape[]|...Two.Shape} objects - An array of objects to be added. Can also be supplied as individual arguments.
     * @description Add objects to the group.
     */
    add(objects) {
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      } else {
        objects = objects.slice();
      }
      for (let i = 0; i < objects.length; i++) {
        const child = objects[i];
        if (!(child && child.id)) {
          continue;
        }
        const index = Array.prototype.indexOf.call(this.children, child);
        if (index >= 0) {
          this.children.splice(index, 1);
        }
        this.children.push(child);
      }
      return this;
    }
    /**
     * @name Two.Group#remove
     * @function
     * @param {Two.Shape[]|...Two.Shape} [objects=self] - An array of objects to be removed. Can be also removed as individual arguments. If no arguments are passed, then it removes itself from its parent.
     * @description Remove objects from the group.
     */
    remove(objects) {
      const l = arguments.length, grandparent = this.parent;
      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      } else {
        objects = objects.slice();
      }
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        if (!object || !this.children.ids[object.id]) {
          continue;
        }
        const index = this.children.indexOf(object);
        if (index >= 0) {
          this.children.splice(index, 1);
        }
      }
      return this;
    }
    /**
     * @name Two.Group#getBoundingClientRect
     * @function
     * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
     * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
     * @description Return an object with top, left, right, bottom, width, and height parameters of the group.
     */
    getBoundingClientRect(shallow) {
      let rect, matrix, tc, lc, rc, bc;
      this._update(true);
      let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
      const regex3 = /texture|gradient/i;
      matrix = shallow ? this.matrix : this.worldMatrix;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        if (!child.visible || regex3.test(child._renderer.type)) {
          continue;
        }
        rect = child.getBoundingClientRect(shallow);
        tc = typeof rect.top !== "number" || _.isNaN(rect.top) || !isFinite(rect.top);
        lc = typeof rect.left !== "number" || _.isNaN(rect.left) || !isFinite(rect.left);
        rc = typeof rect.right !== "number" || _.isNaN(rect.right) || !isFinite(rect.right);
        bc = typeof rect.bottom !== "number" || _.isNaN(rect.bottom) || !isFinite(rect.bottom);
        if (tc || lc || rc || bc) {
          continue;
        }
        if (shallow) {
          const [ax, ay] = matrix.multiply(rect.left, rect.top);
          const [bx, by] = matrix.multiply(rect.right, rect.top);
          const [cx, cy] = matrix.multiply(rect.left, rect.bottom);
          const [dx, dy] = matrix.multiply(rect.right, rect.bottom);
          top = min3(ay, by, cy, dy, top);
          left = min3(ax, bx, cx, dx, left);
          right = max3(ax, bx, cx, dx, right);
          bottom = max3(ay, by, cy, dy, bottom);
        } else {
          top = min3(rect.top, top);
          left = min3(rect.left, left);
          right = max3(rect.right, right);
          bottom = max3(rect.bottom, bottom);
        }
      }
      return {
        top,
        left,
        right,
        bottom,
        width: right - left,
        height: bottom - top
      };
    }
    /**
     * @name Two.Group#noFill
     * @function
     * @description Apply `noFill` method to all child shapes.
     */
    noFill() {
      this.children.forEach(function(child) {
        child.noFill();
      });
      return this;
    }
    /**
     * @name Two.Group#noStroke
     * @function
     * @description Apply `noStroke` method to all child shapes.
     */
    noStroke() {
      this.children.forEach(function(child) {
        child.noStroke();
      });
      return this;
    }
    /**
     * @name Two.Group#subdivide
     * @function
     * @description Apply `subdivide` method to all child shapes.
     */
    subdivide() {
      const args = arguments;
      this.children.forEach(function(child) {
        child.subdivide.apply(child, args);
      });
      return this;
    }
    /**
     * @name Two.Group#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      let i, l, child;
      if (this._flagBeginning || this._flagEnding) {
        const beginning = Math.min(this._beginning, this._ending);
        const ending = Math.max(this._beginning, this._ending);
        const length = this.length;
        let sum = 0;
        const bd = beginning * length;
        const ed = ending * length;
        for (i = 0; i < this.children.length; i++) {
          child = this.children[i];
          l = child.length;
          if (bd > sum + l) {
            child.beginning = 1;
            child.ending = 1;
          } else if (ed < sum) {
            child.beginning = 0;
            child.ending = 0;
          } else if (bd > sum && bd < sum + l) {
            child.beginning = (bd - sum) / l;
            child.ending = 1;
          } else if (ed > sum && ed < sum + l) {
            child.beginning = 0;
            child.ending = (ed - sum) / l;
          } else {
            child.beginning = 0;
            child.ending = 1;
          }
          sum += l;
        }
      }
      return super._update.apply(this, arguments);
    }
    /**
     * @name Two.Group#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      if (this._flagAdditions) {
        this.additions.length = 0;
        this._flagAdditions = false;
      }
      if (this._flagSubtractions) {
        this.subtractions.length = 0;
        this._flagSubtractions = false;
      }
      this._flagOrder = this._flagMask = this._flagOpacity = this._flagBeginning = this._flagEnding = false;
      super.flagReset.call(this);
      return this;
    }
  };
  var proto22 = {
    visible: {
      enumerable: true,
      get: function() {
        return this._visible;
      },
      set: function(v) {
        this._flagVisible = this._visible !== v || this._flagVisible;
        this._visible = v;
      }
    },
    opacity: {
      enumerable: true,
      get: function() {
        return this._opacity;
      },
      set: function(v) {
        this._flagOpacity = this._opacity !== v || this._flagOpacity;
        this._opacity = v;
      }
    },
    beginning: {
      enumerable: true,
      get: function() {
        return this._beginning;
      },
      set: function(v) {
        this._flagBeginning = this._beginning !== v || this._flagBeginning;
        this._beginning = v;
      }
    },
    ending: {
      enumerable: true,
      get: function() {
        return this._ending;
      },
      set: function(v) {
        this._flagEnding = this._ending !== v || this._flagEnding;
        this._ending = v;
      }
    },
    length: {
      enumerable: true,
      get: function() {
        if (this._flagLength || this._length <= 0) {
          this._length = 0;
          if (!this.children) {
            return this._length;
          }
          for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            this._length += child.length;
          }
        }
        return this._length;
      }
    },
    fill: {
      enumerable: true,
      get: function() {
        return this._fill;
      },
      set: function(v) {
        this._fill = v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.fill = v;
        }
      }
    },
    stroke: {
      enumerable: true,
      get: function() {
        return this._stroke;
      },
      set: function(v) {
        this._stroke = v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.stroke = v;
        }
      }
    },
    linewidth: {
      enumerable: true,
      get: function() {
        return this._linewidth;
      },
      set: function(v) {
        this._linewidth = v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.linewidth = v;
        }
      }
    },
    join: {
      enumerable: true,
      get: function() {
        return this._join;
      },
      set: function(v) {
        this._join = v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.join = v;
        }
      }
    },
    miter: {
      enumerable: true,
      get: function() {
        return this._miter;
      },
      set: function(v) {
        this._miter = v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.miter = v;
        }
      }
    },
    cap: {
      enumerable: true,
      get: function() {
        return this._cap;
      },
      set: function(v) {
        this._cap = v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.cap = v;
        }
      }
    },
    closed: {
      enumerable: true,
      get: function() {
        return this._closed;
      },
      set: function(v) {
        this._closed = v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.closed = v;
        }
      }
    },
    curved: {
      enumerable: true,
      get: function() {
        return this._curved;
      },
      set: function(v) {
        this._curved = v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.curved = v;
        }
      }
    },
    automatic: {
      enumerable: true,
      get: function() {
        return this._automatic;
      },
      set: function(v) {
        this._automatic = v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          child.automatic = v;
        }
      }
    },
    children: {
      enumerable: true,
      get: function() {
        return this._children;
      },
      set: function(children) {
        const insertChildren = Group.InsertChildren.bind(this);
        const removeChildren = Group.RemoveChildren.bind(this);
        const orderChildren = Group.OrderChildren.bind(this);
        if (this._children) {
          this._children.unbind();
          if (this._children.length > 0) {
            removeChildren(this._children);
          }
        }
        this._children = new Children(children);
        this._children.bind(Events.Types.insert, insertChildren);
        this._children.bind(Events.Types.remove, removeChildren);
        this._children.bind(Events.Types.order, orderChildren);
        if (children.length > 0) {
          insertChildren(children);
        }
      }
    },
    mask: {
      enumerable: true,
      get: function() {
        return this._mask;
      },
      set: function(v) {
        this._mask = v;
        this._flagMask = true;
        if (_.isObject(v) && !v.clip) {
          v.clip = true;
        }
      }
    },
    /**
     * @name Two.Group#strokeAttenuation
     * @property {Boolean} - When set to `true`, stroke width scales with transformations (default behavior). When `false`, stroke width remains constant in screen space for all child shapes.
     * @description When `strokeAttenuation` is `false`, this property is applied to all child shapes, making their stroke widths automatically adjust to compensate for the group's world transform scale, maintaining constant visual thickness regardless of zoom level. When `true` (default), stroke widths scale normally with transformations.
     */
    strokeAttenuation: {
      enumerable: true,
      get: function() {
        return this._strokeAttenuation;
      },
      set: function(v) {
        this._strokeAttenuation = !!v;
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          if (child.strokeAttenuation !== void 0) {
            child.strokeAttenuation = v;
          }
        }
      }
    }
  };
  function replaceParent(child, newParent) {
    const parent = child.parent;
    let index;
    if (parent === newParent) {
      add();
      return;
    }
    if (parent && parent.children.ids[child.id]) {
      index = Array.prototype.indexOf.call(parent.children, child);
      parent.children.splice(index, 1);
      splice();
    }
    if (newParent) {
      add();
      return;
    }
    splice();
    if (parent._flagAdditions && parent.additions.length === 0) {
      parent._flagAdditions = false;
    }
    if (parent._flagSubtractions && parent.subtractions.length === 0) {
      parent._flagSubtractions = false;
    }
    delete child.parent;
    function add() {
      if (newParent.subtractions.length > 0) {
        index = Array.prototype.indexOf.call(newParent.subtractions, child);
        if (index >= 0) {
          newParent.subtractions.splice(index, 1);
        }
      }
      if (newParent.additions.length > 0) {
        index = Array.prototype.indexOf.call(newParent.additions, child);
        if (index >= 0) {
          newParent.additions.splice(index, 1);
        }
      }
      child.parent = newParent;
      newParent.additions.push(child);
      newParent._flagAdditions = true;
    }
    function splice() {
      index = Array.prototype.indexOf.call(parent.additions, child);
      if (index >= 0) {
        parent.additions.splice(index, 1);
      }
      index = Array.prototype.indexOf.call(parent.subtractions, child);
      if (index < 0) {
        parent.subtractions.push(child);
        parent._flagSubtractions = true;
      }
    }
  }

  // src/shapes/line.js
  var Line = class extends Path {
    constructor(x1, y1, x2, y2) {
      const points = [new Anchor(x1, y1), new Anchor(x2, y2)];
      super(points);
      for (let prop in proto23) {
        Object.defineProperty(this, prop, proto23[prop]);
      }
      this.vertices[0].command = Commands.move;
      this.vertices[1].command = Commands.line;
      this.automatic = false;
    }
    static Properties = ["left", "right"];
  };
  var proto23 = {
    left: {
      enumerable: true,
      get: function() {
        return this.vertices[0];
      },
      set: function(v) {
        if (_.isObject(v)) {
          this.vertices.splice(0, 1, v);
          this.vertices[0].command = Commands.move;
        } else {
          const error = new TwoError("Two.Line.left argument is not an object.");
          console.warn(error.name, error.message);
        }
      }
    },
    right: {
      enumerable: true,
      get: function() {
        return this.vertices[1];
      },
      set: function(v) {
        if (_.isObject(v)) {
          this.vertices.splice(1, 1, v);
          this.vertices[1].command = Commands.line;
        } else {
          const error = new TwoError("Two.Line.right argument is not an object.");
          console.warn(error.name, error.message);
        }
      }
    }
  };

  // src/utils/interpret-svg.js
  var regex2 = {
    path: /[+-]?(?:\d*\.\d+|\d+)(?:[eE][+-]\d+)?/g,
    cssBackgroundImage: /url\(['"]?#([\w\d-_]*)['"]?\)/i,
    unitSuffix: /[a-zA-Z%]*/i
  };
  var alignments = {
    start: "left",
    middle: "center",
    end: "right"
  };
  var reservedAttributesToRemove = [
    "id",
    "class",
    "transform",
    "xmlns",
    "viewBox"
  ];
  var overwriteAttrs = ["x", "y", "width", "height", "href", "xlink:href"];
  function getAlignment(anchor2) {
    return alignments[anchor2];
  }
  function getBaseline(node) {
    const a = node.getAttribute("dominant-baseline");
    const b = node.getAttribute("alignment-baseline");
    return a || b;
  }
  function getTagName(tag) {
    return tag.replace(/svg:/gi, "").toLowerCase();
  }
  function applyTransformsToVector(transforms, vector3) {
    vector3.x += transforms.translateX;
    vector3.y += transforms.translateY;
    vector3.x *= transforms.scaleX;
    vector3.y *= transforms.scaleY;
    if (transforms.rotation !== 0) {
      const l = vector3.length();
      vector3.x = l * Math.cos(transforms.rotation);
      vector3.y = l * Math.sin(transforms.rotation);
    }
  }
  function extractCSSText(text, styles) {
    if (!styles) {
      styles = {};
    }
    const commands = text.split(";");
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i].split(":");
      const name = command[0];
      const value = command[1];
      if (typeof name === "undefined" || typeof value === "undefined") {
        continue;
      }
      const trimmedName = name.replace(/\s/g, "");
      const trimmedValue = value.replace(/\s/g, "");
      styles[trimmedName] = trimmedValue;
    }
    return styles;
  }
  function getSvgStyles(node) {
    const styles = {};
    const attributes = getSvgAttributes(node);
    const length = Math.max(attributes.length, node.style.length);
    for (let i = 0; i < length; i++) {
      const command = node.style[i];
      const attribute = attributes[i];
      if (command) {
        styles[command] = node.style[command];
      }
      if (attribute) {
        styles[attribute] = node.getAttribute(attribute);
      }
    }
    return styles;
  }
  function getSvgAttributes(node) {
    const attributes = node.getAttributeNames();
    for (let i = 0; i < reservedAttributesToRemove.length; i++) {
      const keyword = reservedAttributesToRemove[i];
      const index = Array.prototype.indexOf.call(attributes, keyword);
      if (index >= 0) {
        attributes.splice(index, 1);
      }
    }
    return attributes;
  }
  function applySvgViewBox(node, value) {
    const elements = value.split(/[\s,]/);
    const x = -parseFloat(elements[0]);
    const y = -parseFloat(elements[1]);
    const width = parseFloat(elements[2]);
    const height = parseFloat(elements[3]);
    if (x && y) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if ("translation" in child) {
          child.translation.add(x, y);
        } else if ("x" in child) {
          child.x = x;
        } else if ("y" in child) {
          child.y = y;
        }
      }
    }
    const xExists = typeof node.x === "number";
    const yExists = typeof node.y === "number";
    const widthExists = typeof node.width === "number";
    const heightExists = typeof node.height === "number";
    if (xExists) {
      node.translation.x += node.x;
    }
    if (yExists) {
      node.translation.y += node.y;
    }
    if (widthExists || heightExists) {
      node.scale = new Vector(1, 1);
    }
    if (widthExists) {
      node.scale.x = node.width / width;
    }
    if (heightExists) {
      node.scale.y = node.height / height;
    }
    node.mask = new Rectangle(0, 0, width, height);
    node.mask.origin.set(-width / 2, -height / 2);
    return node;
  }
  function applySvgAttributes(node, elem, parentStyles) {
    const styles = {}, attributes = {}, extracted = {};
    let i, m, key, value, prop, attr;
    let transforms, x, y;
    let id, scene, ref, tagName;
    let ca, cb, cc, error;
    if (node === null) {
      return styles;
    }
    if (root.getComputedStyle) {
      const computedStyles = root.getComputedStyle(node);
      i = computedStyles.length;
      while (i--) {
        key = computedStyles[i];
        value = computedStyles[key];
        if (typeof value !== "undefined") {
          styles[key] = value;
        }
      }
    }
    for (i = 0; i < node.attributes.length; i++) {
      attr = node.attributes[i];
      if (/style/i.test(attr.nodeName)) {
        extractCSSText(attr.value, extracted);
      } else {
        attributes[attr.nodeName] = attr.value;
      }
    }
    if (typeof styles.opacity !== "undefined") {
      styles["stroke-opacity"] = styles.opacity;
      styles["fill-opacity"] = styles.opacity;
      delete styles.opacity;
    }
    if (parentStyles) {
      _.defaults(styles, parentStyles);
    }
    _.extend(styles, extracted, attributes);
    styles.visible = !(typeof styles.display === "undefined" && /none/i.test(styles.display)) || typeof styles.visibility === "undefined" && /hidden/i.test(styles.visibility);
    for (key in styles) {
      value = styles[key];
      switch (key) {
        case "gradientTransform":
          if (/none/i.test(value)) break;
          m = node.gradientTransform && node.gradientTransform.baseVal && node.gradientTransform.baseVal.length > 0 ? node.gradientTransform.baseVal[0].matrix : node.getCTM ? node.getCTM() : null;
          if (m === null) break;
          transforms = decomposeMatrix(m);
          switch (elem._renderer.type) {
            case "linear-gradient":
              applyTransformsToVector(transforms, elem.left);
              applyTransformsToVector(transforms, elem.right);
              break;
            case "radial-gradient":
              elem.center.x += transforms.translateX;
              elem.center.y += transforms.translateY;
              elem.focal.x += transforms.translateX;
              elem.focal.y += transforms.translateY;
              elem.radius *= Math.max(transforms.scaleX, transforms.scaleY);
              break;
          }
          break;
        case "transform":
          if (/none/i.test(value)) break;
          m = node.transform && node.transform.baseVal && node.transform.baseVal.length > 0 ? node.transform.baseVal[0].matrix : node.getCTM ? node.getCTM() : null;
          if (m === null) break;
          if (Constants.AutoCalculateImportedMatrices) {
            transforms = decomposeMatrix(m);
            elem.translation.set(transforms.translateX, transforms.translateY);
            elem.rotation = Math.PI * (transforms.rotation / 180);
            elem.scale = new Vector(transforms.scaleX, transforms.scaleY);
            x = parseFloat((styles.x + "").replace("px"));
            y = parseFloat((styles.y + "").replace("px"));
            if (x) {
              elem.translation.x = x;
            }
            if (y) {
              elem.translation.y = y;
            }
          } else {
            m = node.getCTM();
            elem._matrix.manual = true;
            elem._matrix.set(m.a, m.b, m.c, m.d, m.e, m.f);
          }
          break;
        case "visible":
          if (elem instanceof Group) {
            elem._visible = value;
            break;
          }
          elem.visible = value;
          break;
        case "stroke-linecap":
          if (elem instanceof Group) {
            elem._cap = value;
            break;
          }
          elem.cap = value;
          break;
        case "stroke-linejoin":
          if (elem instanceof Group) {
            elem._join = value;
            break;
          }
          elem.join = value;
          break;
        case "stroke-miterlimit":
          if (elem instanceof Group) {
            elem._miter = value;
            break;
          }
          elem.miter = value;
          break;
        case "stroke-width":
          if (elem instanceof Group) {
            elem._linewidth = parseFloat(value);
            break;
          }
          elem.linewidth = parseFloat(value);
          break;
        case "opacity":
        case "stroke-opacity":
        case "fill-opacity":
          if (elem instanceof Group) {
            elem._opacity = parseFloat(value);
            break;
          }
          elem.opacity = parseFloat(value);
          break;
        case "clip-path":
          if (regex2.cssBackgroundImage.test(value)) {
            id = value.replace(regex2.cssBackgroundImage, "$1");
            if (read.defs.current && read.defs.current.contains(id)) {
              ref = read.defs.current.get(id);
              if (ref && ref.childNodes.length > 0) {
                ref = ref.childNodes[0];
                tagName = getTagName(ref.nodeName);
                elem.mask = read[tagName].call(this, ref, {});
                switch (elem._renderer.type) {
                  case "text":
                  case "path":
                    elem.position.add(elem.mask.position);
                    elem.mask.position.clear();
                    break;
                }
              }
            }
          }
          break;
        case "fill":
        case "stroke":
          prop = (elem instanceof Group ? "_" : "") + key;
          if (regex2.cssBackgroundImage.test(value)) {
            id = value.replace(regex2.cssBackgroundImage, "$1");
            if (read.defs.current && read.defs.current.contains(id)) {
              ref = read.defs.current.get(id);
              if (!ref.object) {
                tagName = getTagName(ref.nodeName);
                ref.object = read[tagName].call(this, ref, {});
              }
              ref = ref.object;
            } else {
              scene = getScene(this);
              ref = scene.getById(id);
            }
            elem[prop] = ref;
          } else {
            elem[prop] = value;
          }
          break;
        case "id":
          elem.id = value;
          break;
        case "class":
        case "className":
          elem.classList = value.split(" ");
          elem._flagClassName = true;
          break;
        case "x":
        case "y":
          ca = elem instanceof Gradient;
          cb = elem instanceof LinearGradient;
          cc = elem instanceof RadialGradient;
          if (ca || cb || cc) {
            break;
          }
          if (value.match("[a-z%]$") && !value.endsWith("px")) {
            error = new TwoError(
              "only pixel values are supported with the " + key + " attribute."
            );
            console.warn(error.name, error.message);
          }
          elem.translation[key] = parseFloat(value);
          break;
        case "font-family":
          if (elem instanceof Text) {
            elem.family = value;
          }
          break;
        case "font-size":
          if (elem instanceof Text) {
            if (value.match("[a-z%]$") && !value.endsWith("px")) {
              error = new TwoError(
                "only pixel values are supported with the " + key + " attribute."
              );
              console.warn(error.name, error.message);
            }
            elem.size = parseFloat(value);
          }
          break;
        case "font-weight":
          if (elem instanceof Text) {
            elem.weight = value;
          }
          break;
        case "font-style":
          if (elem instanceof Text) {
            elem.style = value;
          }
          break;
        case "text-decoration":
          if (elem instanceof Text) {
            elem.decoration = value;
          }
          break;
        case "line-height":
          if (elem instanceof Text) {
            elem.leading = value;
          }
          break;
      }
    }
    if (Object.keys(node.dataset).length) elem.dataset = node.dataset;
    return styles;
  }
  function updateDefsCache(node, defsCache) {
    for (let i = 0, l = node.childNodes.length; i < l; i++) {
      const n = node.childNodes[i];
      if (!n.id) continue;
      const tagName = getTagName(node.nodeName);
      if (tagName === "#text") continue;
      defsCache.add(n.id, n);
    }
  }
  function getScene(node) {
    while (node.parent) {
      node = node.parent;
    }
    return node.scene;
  }
  var read = {
    svg: function(node) {
      const defs = read.defs.current = new Registry();
      const elements = node.getElementsByTagName("defs");
      for (let i = 0; i < elements.length; i++) {
        updateDefsCache(elements[i], defs);
      }
      const svg2 = read.g.call(this, node);
      const viewBox = node.getAttribute("viewBox");
      const x = node.getAttribute("x");
      const y = node.getAttribute("y");
      const width = node.getAttribute("width");
      const height = node.getAttribute("height");
      svg2.defs = defs;
      const viewBoxExists = viewBox !== null;
      const xExists = x !== null;
      const yExists = y !== null;
      const widthExists = width !== null;
      const heightExists = height !== null;
      if (xExists) {
        svg2.x = parseFloat(x.replace(regex2.unitSuffix, ""));
      }
      if (yExists) {
        svg2.y = parseFloat(y.replace(regex2.unitSuffix, ""));
      }
      if (widthExists) {
        svg2.width = parseFloat(width.replace(regex2.unitSuffix, ""));
      }
      if (heightExists) {
        svg2.height = parseFloat(height.replace(regex2.unitSuffix, ""));
      }
      if (viewBoxExists) {
        applySvgViewBox(svg2, viewBox);
      }
      delete read.defs.current;
      return svg2;
    },
    defs: function(node) {
      return null;
    },
    use: function(node, styles) {
      let error;
      const href = node.getAttribute("href") || node.getAttribute("xlink:href");
      if (!href) {
        error = new TwoError("encountered <use /> with no href.");
        console.warn(error.name, error.message);
        return null;
      }
      const id = href.slice(1);
      if (!read.defs.current.contains(id)) {
        error = new TwoError(
          "unable to find element for reference " + href + "."
        );
        console.warn(error.name, error.message);
        return null;
      }
      const template = read.defs.current.get(id);
      const fullNode = template.cloneNode(true);
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        const ca = overwriteAttrs.includes(attr.nodeName);
        const cb = !fullNode.hasAttribute(attr.nodeName);
        if (ca || cb) {
          fullNode.setAttribute(attr.nodeName, attr.value);
        }
      }
      const tagName = getTagName(fullNode.nodeName);
      return read[tagName].call(this, fullNode, styles);
    },
    g: function(node, parentStyles) {
      const group = new Group();
      applySvgAttributes.call(this, node, group, parentStyles);
      this.add(group);
      const styles = getSvgStyles.call(this, node);
      for (let i = 0, l = node.childNodes.length; i < l; i++) {
        const n = node.childNodes[i];
        const tag = n.nodeName;
        if (!tag) return;
        const tagName = getTagName(tag);
        if (tagName in read) {
          const o = read[tagName].call(group, n, styles);
          if (!!o && !o.parent) {
            group.add(o);
          }
        }
      }
      return group;
    },
    polygon: function(node, parentStyles) {
      let points;
      if (typeof node === "string") {
        points = node;
      } else {
        points = node.getAttribute("points");
      }
      const verts = [];
      points.replace(
        /(-?[\d.eE-]+)[,|\s](-?[\d.eE-]+)/g,
        function(match, p1, p2) {
          verts.push(new Anchor(parseFloat(p1), parseFloat(p2)));
        }
      );
      const poly = new Path(verts, true);
      poly.stroke = "none";
      poly.fill = "black";
      applySvgAttributes.call(this, node, poly, parentStyles);
      return poly;
    },
    polyline: function(node, parentStyles) {
      const poly = read.polygon.call(this, node, parentStyles);
      poly.closed = false;
      return poly;
    },
    path: function(node, parentStyles) {
      let path;
      if (typeof node === "string") {
        path = node;
        node = null;
      } else {
        path = node.getAttribute("d");
      }
      let points = [];
      let closed2 = false, relative = false;
      if (path) {
        let coord = new Anchor();
        let control, coords;
        let commands = path.match(/[a-df-z][^a-df-z]*/gi);
        const last = commands.length - 1;
        _.each(commands.slice(0), function(command, i) {
          const items = command.slice(1).trim().match(regex2.path);
          const type = command[0];
          const lower = type.toLowerCase();
          let bin, j, l, ct, times;
          const result = [];
          if (i === 0) {
            commands = [];
          }
          switch (lower) {
            case "h":
            case "v":
              if (items.length > 1) {
                bin = 1;
              }
              break;
            case "m":
            case "l":
            case "t":
              if (items.length > 2) {
                bin = 2;
              }
              break;
            case "s":
            case "q":
              if (items.length > 4) {
                bin = 4;
              }
              break;
            case "c":
              if (items.length > 6) {
                bin = 6;
              }
              break;
            case "a":
              if (items.length > 7) {
                bin = 7;
              }
              break;
          }
          if (bin) {
            for (j = 0, l = items.length, times = 0; j < l; j += bin) {
              ct = type;
              if (times > 0) {
                switch (type) {
                  case "m":
                    ct = "l";
                    break;
                  case "M":
                    ct = "L";
                    break;
                }
              }
              result.push(ct + items.slice(j, j + bin).join(" "));
              times++;
            }
            commands = Array.prototype.concat.apply(commands, result);
          } else {
            commands.push(command);
          }
        });
        _.each(commands, function(command, i) {
          let result, x, y;
          const type = command[0];
          const lower = type.toLowerCase();
          coords = command.slice(1).trim().match(regex2.path);
          relative = type === lower;
          let x1, y1, x2, y2, x3, y3, x4, y4, reflection;
          let a, b;
          let anchor2, rx, ry, xAxisRotation, largeArcFlag, sweepFlag;
          switch (lower) {
            case "z":
              if (i >= last) {
                closed2 = true;
              } else {
                x = coord.x;
                y = coord.y;
                result = new Anchor(
                  x,
                  y,
                  void 0,
                  void 0,
                  void 0,
                  void 0,
                  Commands.close
                );
                for (let j = points.length - 1; j >= 0; j--) {
                  const point = points[j];
                  if (/m/i.test(point.command)) {
                    coord = point;
                    break;
                  }
                }
              }
              break;
            case "m":
            case "l":
              control = void 0;
              x = parseFloat(coords[0]);
              y = parseFloat(coords[1]);
              result = new Anchor(
                x,
                y,
                void 0,
                void 0,
                void 0,
                void 0,
                /m/i.test(lower) ? Commands.move : Commands.line
              );
              if (relative) {
                result.addSelf(coord);
              }
              coord = result;
              break;
            case "h":
            case "v":
              a = /h/i.test(lower) ? "x" : "y";
              b = /x/i.test(a) ? "y" : "x";
              result = new Anchor(
                void 0,
                void 0,
                void 0,
                void 0,
                void 0,
                void 0,
                Commands.line
              );
              result[a] = parseFloat(coords[0]);
              result[b] = coord[b];
              if (relative) {
                result[a] += coord[a];
              }
              coord = result;
              break;
            case "c":
            case "s":
              x1 = coord.x;
              y1 = coord.y;
              if (!control) {
                control = new Vector();
              }
              if (/c/i.test(lower)) {
                x2 = parseFloat(coords[0]);
                y2 = parseFloat(coords[1]);
                x3 = parseFloat(coords[2]);
                y3 = parseFloat(coords[3]);
                x4 = parseFloat(coords[4]);
                y4 = parseFloat(coords[5]);
              } else {
                reflection = getReflection(coord, control, relative);
                x2 = reflection.x;
                y2 = reflection.y;
                x3 = parseFloat(coords[0]);
                y3 = parseFloat(coords[1]);
                x4 = parseFloat(coords[2]);
                y4 = parseFloat(coords[3]);
              }
              if (relative) {
                x2 += x1;
                y2 += y1;
                x3 += x1;
                y3 += y1;
                x4 += x1;
                y4 += y1;
              }
              coord.controls.right.set(x2 - coord.x, y2 - coord.y);
              result = new Anchor(
                x4,
                y4,
                x3 - x4,
                y3 - y4,
                void 0,
                void 0,
                Commands.curve
              );
              coord = result;
              control = result.controls.left;
              break;
            case "t":
            case "q":
              x1 = coord.x;
              y1 = coord.y;
              if (!control) {
                control = new Vector();
              }
              if (/q/i.test(lower)) {
                x2 = parseFloat(coords[0]);
                y2 = parseFloat(coords[1]);
                x3 = parseFloat(coords[0]);
                y3 = parseFloat(coords[1]);
                x4 = parseFloat(coords[2]);
                y4 = parseFloat(coords[3]);
              } else {
                reflection = getReflection(coord, control, relative);
                x2 = reflection.x;
                y2 = reflection.y;
                x3 = reflection.x;
                y3 = reflection.y;
                x4 = parseFloat(coords[0]);
                y4 = parseFloat(coords[1]);
              }
              if (relative) {
                x2 += x1;
                y2 += y1;
                x3 += x1;
                y3 += y1;
                x4 += x1;
                y4 += y1;
              }
              coord.controls.right.set(
                (x2 - coord.x) * 0.33,
                (y2 - coord.y) * 0.33
              );
              result = new Anchor(
                x4,
                y4,
                x3 - x4,
                y3 - y4,
                void 0,
                void 0,
                Commands.curve
              );
              coord = result;
              control = result.controls.left;
              break;
            case "a":
              x1 = coord.x;
              y1 = coord.y;
              rx = parseFloat(coords[0]);
              ry = parseFloat(coords[1]);
              xAxisRotation = parseFloat(coords[2]);
              largeArcFlag = parseFloat(coords[3]);
              sweepFlag = parseFloat(coords[4]);
              x4 = parseFloat(coords[5]);
              y4 = parseFloat(coords[6]);
              if (relative) {
                x4 += x1;
                y4 += y1;
              }
              anchor2 = new Anchor(x4, y4);
              anchor2.command = Commands.arc;
              anchor2.rx = rx;
              anchor2.ry = ry;
              anchor2.xAxisRotation = xAxisRotation;
              anchor2.largeArcFlag = largeArcFlag;
              anchor2.sweepFlag = sweepFlag;
              result = anchor2;
              coord = anchor2;
              control = void 0;
              break;
          }
          if (result) {
            if (Array.isArray(result)) {
              points = points.concat(result);
            } else {
              points.push(result);
            }
          }
        });
      }
      path = new Path(points, closed2, void 0, true);
      path.stroke = "none";
      path.fill = "black";
      const rect = path.getBoundingClientRect(true);
      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      _.each(path.vertices, function(v) {
        v.subSelf(rect.centroid);
      });
      applySvgAttributes.call(this, node, path, parentStyles);
      path.translation.addSelf(rect.centroid);
      return path;
    },
    circle: function(node, parentStyles) {
      const x = parseFloat(node.getAttribute("cx"));
      const y = parseFloat(node.getAttribute("cy"));
      const r = parseFloat(node.getAttribute("r"));
      const circle = new Circle(0, 0, r);
      circle.stroke = "none";
      circle.fill = "black";
      applySvgAttributes.call(this, node, circle, parentStyles);
      circle.translation.x = x;
      circle.translation.y = y;
      return circle;
    },
    ellipse: function(node, parentStyles) {
      const x = parseFloat(node.getAttribute("cx"));
      const y = parseFloat(node.getAttribute("cy"));
      const width = parseFloat(node.getAttribute("rx"));
      const height = parseFloat(node.getAttribute("ry"));
      const ellipse = new Ellipse(0, 0, width, height);
      ellipse.stroke = "none";
      ellipse.fill = "black";
      applySvgAttributes.call(this, node, ellipse, parentStyles);
      ellipse.translation.x = x;
      ellipse.translation.y = y;
      return ellipse;
    },
    rect: function(node, parentStyles) {
      const rx = parseFloat(node.getAttribute("rx"));
      const ry = parseFloat(node.getAttribute("ry"));
      if (!_.isNaN(rx) || !_.isNaN(ry)) {
        return read["rounded-rect"](node);
      }
      const width = parseFloat(node.getAttribute("width"));
      const height = parseFloat(node.getAttribute("height"));
      const w2 = width / 2;
      const h2 = height / 2;
      const rect = new Rectangle(0, 0, width, height);
      rect.stroke = "none";
      rect.fill = "black";
      applySvgAttributes.call(this, node, rect, parentStyles);
      rect.translation.x += w2;
      rect.translation.y += h2;
      return rect;
    },
    "rounded-rect": function(node, parentStyles) {
      const rx = parseFloat(node.getAttribute("rx")) || 0;
      const ry = parseFloat(node.getAttribute("ry")) || 0;
      const width = parseFloat(node.getAttribute("width"));
      const height = parseFloat(node.getAttribute("height"));
      const w2 = width / 2;
      const h2 = height / 2;
      const radius = new Vector(rx, ry);
      const rect = new RoundedRectangle(0, 0, width, height, radius);
      rect.stroke = "none";
      rect.fill = "black";
      applySvgAttributes.call(this, node, rect, parentStyles);
      rect.translation.x += w2;
      rect.translation.y += h2;
      return rect;
    },
    line: function(node, parentStyles) {
      const x1 = parseFloat(node.getAttribute("x1"));
      const y1 = parseFloat(node.getAttribute("y1"));
      const x2 = parseFloat(node.getAttribute("x2"));
      const y2 = parseFloat(node.getAttribute("y2"));
      const line = new Line(x1, y1, x2, y2).noFill();
      applySvgAttributes.call(this, node, line, parentStyles);
      return line;
    },
    lineargradient: function(node, parentStyles) {
      let units = node.getAttribute("gradientUnits");
      let spread = node.getAttribute("spreadMethod");
      if (!units) {
        units = "objectBoundingBox";
      }
      if (!spread) {
        spread = "pad";
      }
      let x1 = parseFloat(node.getAttribute("x1") || 0);
      let y1 = parseFloat(node.getAttribute("y1") || 0);
      let x2 = parseFloat(node.getAttribute("x2") || 0);
      let y2 = parseFloat(node.getAttribute("y2") || 0);
      const ox = (x2 + x1) / 2;
      const oy = (y2 + y1) / 2;
      if (/userSpaceOnUse/i.test(units)) {
        x1 -= ox;
        y1 -= oy;
        x2 -= ox;
        y2 -= oy;
      }
      const stops = [];
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        let offset = child.getAttribute("offset");
        if (/%/gi.test(offset)) {
          offset = parseFloat(offset.replace(/%/gi, "")) / 100;
        }
        offset = parseFloat(offset);
        let color = child.getAttribute("stop-color");
        let opacity = child.getAttribute("stop-opacity");
        let style = child.getAttribute("style");
        let matches;
        if (color === null) {
          matches = style ? style.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false;
          color = matches && matches.length > 1 ? matches[1] : void 0;
        }
        if (opacity === null) {
          matches = style ? style.match(/stop-opacity:\s?([0-9.-]*)/) : false;
          opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
        } else {
          opacity = parseFloat(opacity);
        }
        stops.push(new Stop(offset, color, opacity));
      }
      const gradient = new LinearGradient(x1, y1, x2, y2, stops);
      gradient.spread = spread;
      gradient.units = units;
      applySvgAttributes.call(this, node, gradient, parentStyles);
      return gradient;
    },
    radialgradient: function(node, parentStyles) {
      let units = node.getAttribute("gradientUnits");
      let spread = node.getAttribute("spreadMethod");
      if (!units) {
        units = "objectBoundingBox";
      }
      if (!spread) {
        spread = "pad";
      }
      let cx = parseFloat(node.getAttribute("cx")) || 0;
      let cy = parseFloat(node.getAttribute("cy")) || 0;
      let r = parseFloat(node.getAttribute("r"));
      let fx = parseFloat(node.getAttribute("fx"));
      let fy = parseFloat(node.getAttribute("fy"));
      if (_.isNaN(fx)) {
        fx = cx;
      }
      if (_.isNaN(fy)) {
        fy = cy;
      }
      const ox = Math.abs(cx + fx) / 2;
      const oy = Math.abs(cy + fy) / 2;
      if (/userSpaceOnUse/i.test(units)) {
        cx -= ox;
        cy -= oy;
        fx -= ox;
        fy -= oy;
      }
      const stops = [];
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        let offset = child.getAttribute("offset");
        if (/%/gi.test(offset)) {
          offset = parseFloat(offset.replace(/%/gi, "")) / 100;
        }
        offset = parseFloat(offset);
        let color = child.getAttribute("stop-color");
        let opacity = child.getAttribute("stop-opacity");
        let style = child.getAttribute("style");
        let matches;
        if (color === null) {
          matches = style ? style.match(/stop-color:\s?([#a-fA-F0-9]*)/) : false;
          color = matches && matches.length > 1 ? matches[1] : void 0;
        }
        if (opacity === null) {
          matches = style ? style.match(/stop-opacity:\s?([0-9.-]*)/) : false;
          opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
        } else {
          opacity = parseFloat(opacity);
        }
        stops.push(new Stop(offset, color, opacity));
      }
      const gradient = new RadialGradient(cx, cy, r, stops, fx, fy);
      gradient.spread = spread;
      gradient.units = units;
      applySvgAttributes.call(this, node, gradient, parentStyles);
      return gradient;
    },
    text: function(node, parentStyles) {
      const alignment = getAlignment(node.getAttribute("text-anchor")) || "left";
      const baseline = getBaseline(node) || "baseline";
      let message = "";
      if (node.childNodes.length > 0 && node.childNodes[0].tagName === "TSPAN") {
        message = node.childNodes[0].textContent;
      } else {
        message = node.textContent;
      }
      const text = new Text(message);
      applySvgAttributes.call(this, node, text, parentStyles);
      text.alignment = alignment;
      text.baseline = baseline;
      return text;
    },
    clippath: function(node, parentStyles) {
      if (read.defs.current && !read.defs.current.contains(node.id)) {
        read.defs.current.add(node.id, node);
      }
      return null;
    },
    image: function(node, parentStyles) {
      let error;
      const href = node.getAttribute("href") || node.getAttribute("xlink:href");
      if (!href) {
        error = new TwoError("encountered <image /> with no href.");
        console.warn(error.name, error.message);
        return null;
      }
      const x = parseFloat(node.getAttribute("x")) || 0;
      const y = parseFloat(node.getAttribute("y")) || 0;
      const width = parseFloat(node.getAttribute("width"));
      const height = parseFloat(node.getAttribute("height"));
      const sprite = new Sprite(href, x, y);
      if (!_.isNaN(width)) {
        sprite.width = width;
      }
      if (!_.isNaN(height)) {
        sprite.height = height;
      }
      applySvgAttributes.call(this, node, sprite, parentStyles);
      return sprite;
    }
  };

  // src/utils/xhr.js
  function xhr(path, callback) {
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", path);
    xhr2.onreadystatechange = function() {
      if (xhr2.readyState === 4 && xhr2.status === 200) {
        callback(xhr2.responseText);
      }
    };
    xhr2.send();
    return xhr2;
  }

  // src/effects/image.js
  var Image2 = class _Image extends Rectangle {
    /**
     * @name Two.Image#_flagTexture
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Image#texture} needs updating.
     */
    _flagTexture = false;
    /**
     * @name Two.Image#_flagMode
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Image#mode} needs updating.
     */
    _flagMode = false;
    /**
     * @name Two.Image#_texture
     * @private
     * @see {@link Two.Image#texture}
     */
    _texture = null;
    /**
     * @name Two.Image#_mode
     * @private
     * @see {@link Two.Image#mode}
     */
    _mode = "fill";
    constructor(src, ox, oy, width, height, mode) {
      super(ox, oy, width || 1, height || 1);
      this._renderer.type = "image";
      for (let prop in proto24) {
        Object.defineProperty(this, prop, proto24[prop]);
      }
      this.noStroke();
      this.noFill();
      if (src instanceof Texture) {
        this.texture = src;
      } else if (typeof src === "string") {
        this.texture = new Texture(src);
      }
      if (typeof mode === "string") {
        this.mode = mode;
      }
      this._update();
    }
    /**
     * @name Two.Image.Modes
     * @property {Object} Modes - Different mode types to render an image inspired by Figma.
     * @property {String} Modes.fill - Scale image to fill the bounds while preserving aspect ratio.
     * @property {String} Modes.fit - Scale image to fit within bounds while preserving aspect ratio.
     * @property {String} Modes.crop - Scale image to fill bounds while preserving aspect ratio, cropping excess.
     * @property {String} Modes.tile - Repeat image at original size to fill the bounds.
     * @property {String} Modes.stretch - Stretch image to fill dimensions, ignoring aspect ratio.
     */
    static Modes = {
      fill: "fill",
      fit: "fit",
      crop: "crop",
      tile: "tile",
      stretch: "stretch"
    };
    /**
     * @name Two.Image.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Image}.
     */
    static Properties = ["texture", "mode"];
    /**
     * @name Two.Image.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Image} to create a new instance
     * @returns {Two.Image}
     * @description Create a new {@link Two.Image} from an object notation of a {@link Two.Image}.
     * @nota-bene Works in conjunction with {@link Two.Image#toObject}
     */
    static fromObject(obj) {
      const image = new _Image().copy(obj);
      if ("id" in obj) {
        image.id = obj.id;
      }
      return image;
    }
    /**
     * @name Two.Image#copy
     * @function
     * @param {Two.Image} image - The reference {@link Two.Image}
     * @description Copy the properties of one {@link Two.Image} onto another.
     */
    copy(image) {
      super.copy.call(this, image);
      for (let i = 0; i < _Image.Properties.length; i++) {
        const k = _Image.Properties[i];
        if (k in image) {
          this[k] = image[k];
        }
      }
      return this;
    }
    /**
     * @name Two.Image#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Image}
     * @description Create a new instance of {@link Two.Image} with the same properties of the current image.
     */
    clone(parent) {
      const clone = new _Image(
        this.texture,
        this.translation.x,
        this.translation.y,
        this.width,
        this.height
      );
      if (parent) {
        parent.add(clone);
      }
      return clone;
    }
    /**
     * @name Two.Image#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the image.
     */
    toObject() {
      const object = super.toObject.call(this);
      object.renderer.type = "image";
      object.texture = this.texture.toObject();
      object.mode = this.mode;
      return object;
    }
    /**
     * @name Two.Image#dispose
     * @function
     * @returns {Two.Image}
     * @description Release the image's renderer resources and detach all events.
     * This method disposes the texture (calling dispose() for thorough cleanup) and inherits comprehensive
     * cleanup from the Rectangle/Path hierarchy while preserving the renderer type
     * for potential re-attachment.
     */
    dispose() {
      super.dispose();
      if (this._texture && typeof this._texture.dispose === "function") {
        this._texture.dispose();
      } else if (this._texture && typeof this._texture.unbind === "function") {
        this._texture.unbind();
      }
      return this;
    }
    /**
     * @name Two.Image#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update() {
      const effect = this._texture;
      if (effect) {
        if (this._flagTexture) {
          this.fill = effect;
        }
        if (effect.loaded) {
          const iw = effect.image.width;
          const ih = effect.image.height;
          const rw = this.width;
          const rh = this.height;
          const scaleX = rw / iw;
          const scaleY = rh / ih;
          switch (this._mode) {
            case _Image.Modes.fill: {
              const scale = Math.max(scaleX, scaleY);
              effect.scale = scale;
              effect.offset.x = 0;
              effect.offset.y = 0;
              effect.repeat = "repeat";
              break;
            }
            case _Image.Modes.fit: {
              const scale = Math.min(scaleX, scaleY);
              effect.scale = scale;
              effect.offset.x = 0;
              effect.offset.y = 0;
              effect.repeat = "no-repeat";
              break;
            }
            case _Image.Modes.crop: {
              break;
            }
            case _Image.Modes.tile: {
              effect.offset.x = (iw - rw) / 2;
              effect.offset.y = (ih - rh) / 2;
              effect.repeat = "repeat";
              break;
            }
            case _Image.Modes.stretch:
            default: {
              effect.scale = new Vector(scaleX, scaleY);
              effect.offset.x = 0;
              effect.offset.y = 0;
              effect.repeat = "repeat";
            }
          }
        }
      }
      super._update.call(this);
      return this;
    }
    /**
     * @name Two.Image#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
      super.flagReset.call(this);
      this._flagTexture = this._flagMode = false;
      return this;
    }
  };
  var proto24 = {
    texture: {
      enumerable: true,
      get: function() {
        return this._texture;
      },
      set: function(v) {
        this._texture = v;
        this._flagTexture = true;
      }
    },
    mode: {
      enumerable: true,
      get: function() {
        return this._mode;
      },
      set: function(v) {
        this._mode = v;
        this._flagMode = true;
      }
    }
  };

  // src/renderers/canvas.js
  var emptyArray = [];
  var max4 = Math.max;
  var min4 = Math.min;
  var abs = Math.abs;
  var sin6 = Math.sin;
  var cos6 = Math.cos;
  var acos = Math.acos;
  var sqrt = Math.sqrt;
  var canvas2 = {
    isHidden: /(undefined|none|transparent)/i,
    alignments: {
      left: "start",
      middle: "center",
      right: "end"
    },
    baselines: {
      top: "top",
      middle: "middle",
      bottom: "bottom",
      baseline: "alphabetic"
    },
    getRendererType: function(type) {
      return type in canvas2 ? type : "path";
    },
    group: {
      renderChild: function(child) {
        const prop = canvas2.getRendererType(child._renderer.type);
        canvas2[prop].render.call(child, this.ctx, true, this.clip);
      },
      render: function(ctx) {
        if (!this._visible) {
          return this;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        const matrix = this._matrix.elements;
        const parent = this.parent;
        this._renderer.opacity = this._opacity * (parent && parent._renderer ? parent._renderer.opacity : 1);
        const mask = this._mask;
        const defaultMatrix = isDefaultMatrix(matrix);
        const shouldIsolate = !defaultMatrix || !!mask;
        if (!this._renderer.context) {
          this._renderer.context = {};
        }
        this._renderer.context.ctx = ctx;
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
          const prop = canvas2.getRendererType(mask._renderer.type);
          canvas2[prop].render.call(mask, ctx, true);
        }
        if (this._opacity > 0 && this._scale !== 0) {
          for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            const prop = canvas2.getRendererType(child._renderer.type);
            canvas2[prop].render.call(child, ctx);
          }
        }
        if (shouldIsolate) {
          ctx.restore();
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    path: {
      render: function(ctx, forced, parentClipped) {
        let matrix, stroke, linewidth, fill, opacity, visible, cap, join, miter, closed2, commands, length, last, prev, a, b, c, d, ux, uy, vx, vy, ar, bl, br, cl, x, y, mask, clip, defaultMatrix, isOffset, dashes, po;
        po = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1;
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
        closed2 = this._closed;
        commands = this._renderer.vertices;
        length = commands.length;
        last = length - 1;
        defaultMatrix = isDefaultMatrix(matrix);
        dashes = this.dashes;
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
        if (mask) {
          const prop = canvas2.getRendererType(mask._renderer.type);
          canvas2[prop].render.call(mask, ctx, true);
        }
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            const prop = canvas2.getRendererType(fill._renderer.type);
            canvas2[prop].render.call(fill, ctx, this);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            const prop = canvas2.getRendererType(stroke._renderer.type);
            canvas2[prop].render.call(stroke, ctx, this);
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
          if (!closed2 && cap) {
            ctx.lineCap = cap;
          }
        }
        if (typeof opacity === "number") {
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
              prev = closed2 ? mod(i - 1, length) : max4(i - 1, 0);
              a = commands[prev];
              ax = a.x;
              ay = a.y;
              canvas2.renderSvgArcCommand(
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
              prev = closed2 ? mod(i - 1, length) : Math.max(i - 1, 0);
              a = commands[prev];
              ar = a.controls && a.controls.right || Vector.zero;
              bl = b.controls && b.controls.left || Vector.zero;
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
              if (i >= last && closed2) {
                c = d;
                br = b.controls && b.controls.right || Vector.zero;
                cl = c.controls && c.controls.left || Vector.zero;
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
        if (closed2) {
          ctx.closePath();
        }
        if (!clip && !parentClipped) {
          if (!canvas2.isHidden.test(fill)) {
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
          if (!canvas2.isHidden.test(stroke)) {
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
      }
    },
    points: {
      render: function(ctx, forced, parentClipped) {
        let me, stroke, linewidth, fill, opacity, visible, size, commands, length, b, x, y, defaultMatrix, isOffset, dashes, po;
        po = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1;
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
        commands = this._renderer.collection;
        length = commands.length;
        defaultMatrix = isDefaultMatrix(me);
        dashes = this.dashes;
        size = this._size;
        if (!defaultMatrix) {
          ctx.save();
          ctx.transform(me[0], me[3], me[1], me[4], me[2], me[5]);
        }
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            const prop = canvas2.getRendererType(fill._renderer.type);
            canvas2[prop].render.call(fill, ctx, this);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            const prop = canvas2.getRendererType(stroke._renderer.type);
            canvas2[prop].render.call(stroke, ctx, this);
            ctx.strokeStyle = stroke._renderer.effect;
          }
          if (linewidth) {
            ctx.lineWidth = getEffectiveStrokeWidth(this);
          }
        }
        if (typeof opacity === "number") {
          ctx.globalAlpha = opacity;
        }
        if (dashes && dashes.length > 0) {
          ctx.lineDashOffset = dashes.offset || 0;
          ctx.setLineDash(dashes);
        }
        ctx.beginPath();
        let radius = size * 0.5, m;
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
          if (!canvas2.isHidden.test(fill)) {
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
          if (!canvas2.isHidden.test(stroke)) {
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
        if (dashes && dashes.length > 0) {
          ctx.setLineDash(emptyArray);
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    text: {
      render: function(ctx, forced, parentClipped) {
        const po = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1;
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
        const isOffset = fill._renderer && fill._renderer.offset && stroke._renderer && stroke._renderer.offset;
        const dashes = this.dashes;
        const alignment = canvas2.alignments[this._alignment] || this._alignment;
        const baseline = canvas2.baselines[this._baseline] || this._baseline;
        let a, b, c, d, e, sx, sy, x1, y1, x2, y2;
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
        if (mask) {
          const prop = canvas2.getRendererType(mask._renderer.type);
          canvas2[prop].render.call(mask, ctx, true);
        }
        if (!isOffset) {
          ctx.font = [
            this._style,
            this._weight,
            this._size + "px/" + this._leading + "px",
            this._family
          ].join(" ");
        }
        ctx.textAlign = alignment;
        ctx.textBaseline = baseline;
        ctx.direction = direction;
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            const prop = canvas2.getRendererType(fill._renderer.type);
            canvas2[prop].render.call(fill, ctx, this);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            const prop = canvas2.getRendererType(stroke._renderer.type);
            canvas2[prop].render.call(stroke, ctx, this);
            ctx.strokeStyle = stroke._renderer.effect;
          }
          if (linewidth) {
            ctx.lineWidth = getEffectiveStrokeWidth(this);
          }
        }
        if (typeof opacity === "number") {
          ctx.globalAlpha = opacity;
        }
        if (dashes && dashes.length > 0) {
          ctx.lineDashOffset = dashes.offset || 0;
          ctx.setLineDash(dashes);
        }
        if (!clip && !parentClipped) {
          if (!canvas2.isHidden.test(fill)) {
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
                a + "px/",
                b + "px",
                this._family
              ].join(" ");
              c = fill._renderer.offset.x / fill._renderer.scale.x;
              d = fill._renderer.offset.y / fill._renderer.scale.y;
              ctx.fillText(this.value, c, d);
              ctx.restore();
            } else {
              ctx.fillText(this.value, 0, 0);
            }
          }
          if (!canvas2.isHidden.test(stroke)) {
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
                a + "px/",
                b + "px",
                this._family
              ].join(" ");
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
        if (/(underline|strikethrough)/i.test(decoration)) {
          const metrics = ctx.measureText(this.value);
          let scalar = 1;
          switch (decoration) {
            case "underline":
              y1 = metrics.actualBoundingBoxDescent;
              y2 = metrics.actualBoundingBoxDescent;
              break;
            case "strikethrough":
              y1 = 0;
              y2 = 0;
              scalar = 0.5;
              break;
          }
          switch (baseline) {
            case "top":
              y1 += this._size * scalar;
              y2 += this._size * scalar;
              break;
            case "baseline":
            case "bottom":
              y1 -= this._size * scalar;
              y2 -= this._size * scalar;
              break;
          }
          switch (alignment) {
            case "left":
            case "start":
              x1 = 0;
              x2 = metrics.width;
              break;
            case "right":
            case "end":
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
      }
    },
    "linear-gradient": {
      render: function(ctx, parent) {
        if (!parent) {
          return;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        if (!this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
          let rect;
          let lx = this.left._x;
          let ly = this.left._y;
          let rx = this.right._x;
          let ry = this.right._y;
          if (/objectBoundingBox/i.test(this._units)) {
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
      }
    },
    "radial-gradient": {
      render: function(ctx, parent) {
        if (!parent) {
          return;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        if (!this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
          let rect;
          let cx = this.center._x;
          let cy = this.center._y;
          let fx = this.focal._x;
          let fy = this.focal._y;
          let radius = this._radius;
          if (/objectBoundingBox/i.test(this._units)) {
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
      }
    },
    texture: {
      render: function(ctx) {
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        const image = this.image;
        if (!this._renderer.effect || (this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) {
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
      }
    },
    renderSvgArcCommand: function(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y) {
      xAxisRotation = xAxisRotation * Math.PI / 180;
      rx = abs(rx);
      ry = abs(ry);
      const dx2 = (ax - x) / 2;
      const dy2 = (ay - y) / 2;
      const x1p = cos6(xAxisRotation) * dx2 + sin6(xAxisRotation) * dy2;
      const y1p = -sin6(xAxisRotation) * dx2 + cos6(xAxisRotation) * dy2;
      const x1ps = x1p * x1p;
      const y1ps = y1p * y1p;
      let rxs = rx * rx;
      let rys = ry * ry;
      const cr = x1ps / rxs + y1ps / rys;
      if (cr > 1) {
        const s = sqrt(cr);
        rx = s * rx;
        ry = s * ry;
        rxs = rx * rx;
        rys = ry * ry;
      }
      const dq = rxs * y1ps + rys * x1ps;
      const pq = (rxs * rys - dq) / dq;
      let q = sqrt(max4(0, pq));
      if (largeArcFlag === sweepFlag) q = -q;
      const cxp = q * rx * y1p / ry;
      const cyp = -q * ry * x1p / rx;
      const cx = cos6(xAxisRotation) * cxp - sin6(xAxisRotation) * cyp + (ax + x) / 2;
      const cy = sin6(xAxisRotation) * cxp + cos6(xAxisRotation) * cyp + (ay + y) / 2;
      const startAngle = svgAngle2(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
      const delta = svgAngle2(
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
    }
  };
  var Renderer = class extends Events {
    constructor(params) {
      super();
      const smoothing = params.smoothing !== false;
      this.domElement = params.domElement || document.createElement("canvas");
      this.ctx = this.domElement.getContext("2d");
      this.overdraw = params.overdraw || false;
      if (typeof this.ctx.imageSmoothingEnabled !== "undefined") {
        this.ctx.imageSmoothingEnabled = smoothing;
      }
      this.scene = new Group();
      this.scene.parent = this;
    }
    /**
     * @name Two.CanvasRenderer.Utils
     * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />`.
     */
    static Utils = canvas2;
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
      this.ratio = typeof ratio === "undefined" ? getRatio(this.ctx) : ratio;
      this.domElement.width = width * this.ratio;
      this.domElement.height = height * this.ratio;
      if (this.domElement.style) {
        _.extend(this.domElement.style, {
          width: width + "px",
          height: height + "px"
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
      canvas2.group.render.call(this.scene, this.ctx);
      if (!isOne) {
        this.ctx.restore();
      }
      return this;
    }
  };
  function renderArcEstimate(ctx, ox, oy, rx, ry, startAngle, endAngle, clockwise, xAxisRotation) {
    const delta = endAngle - startAngle;
    const epsilon = Curve.Tolerance.epsilon;
    const samePoints = Math.abs(delta) < epsilon;
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
        const cos7 = Math.cos(xAxisRotation);
        const sin7 = Math.sin(xAxisRotation);
        const tx = x - ox;
        const ty = y - oy;
        x = tx * cos7 - ty * sin7 + ox;
        y = tx * sin7 + ty * cos7 + oy;
      }
      ctx.lineTo(x, y);
    }
  }
  function svgAngle2(ux, uy, vx, vy) {
    const dot = ux * vx + uy * vy;
    const len = sqrt(ux * ux + uy * uy) * sqrt(vx * vx + vy * vy);
    let ang = acos(max4(-1, min4(1, dot / len)));
    if (ux * vy - uy * vx < 0) {
      ang = -ang;
    }
    return ang;
  }
  function isDefaultMatrix(m) {
    return m[0] === 1 && m[3] === 0 && m[1] === 0 && m[4] === 1 && m[2] === 0 && m[5] === 0;
  }

  // src/renderers/svg.js
  var svg = {
    version: 1.1,
    ns: "http://www.w3.org/2000/svg",
    xlink: "http://www.w3.org/1999/xlink",
    alignments: {
      left: "start",
      center: "middle",
      right: "end"
    },
    baselines: {
      top: "hanging",
      middle: "middle",
      bottom: "ideographic",
      baseline: "alphabetic"
    },
    // Create an svg namespaced element.
    createElement: function(name, attrs) {
      const tag = name;
      const elem = document.createElementNS(svg.ns, tag);
      if (tag === "svg") {
        attrs = _.defaults(attrs || {}, {
          version: svg.version
        });
      }
      if (attrs && Object.keys(attrs).length > 0) {
        svg.setAttributes(elem, attrs);
      }
      return elem;
    },
    // Add attributes from an svg element.
    setAttributes: function(elem, attrs) {
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
    removeAttributes: function(elem, attrs) {
      for (let key in attrs) {
        elem.removeAttribute(key);
      }
      return this;
    },
    // Turn a set of vertices into a string for the d property of a path
    // element. It is imperative that the string collation is as fast as
    // possible, because this call will be happening multiple times a
    // second.
    toString: function(points, closed2) {
      let l = points.length, last = l - 1, d, string = "";
      for (let i = 0; i < l; i++) {
        const b = points[i];
        const prev = closed2 ? mod(i - 1, l) : Math.max(i - 1, 0);
        const a = points[prev];
        let command, c;
        let vx, vy, ux, uy, ar, bl, br, cl;
        let rx, ry, xAxisRotation, largeArcFlag, sweepFlag;
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
            command = Commands.arc + " " + rx + " " + ry + " " + xAxisRotation + " " + largeArcFlag + " " + sweepFlag + " " + x + " " + y;
            break;
          case Commands.curve:
            ar = a.controls && a.controls.right || Vector.zero;
            bl = b.controls && b.controls.left || Vector.zero;
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
            command = (i === 0 ? Commands.move : Commands.curve) + " " + vx + " " + vy + " " + ux + " " + uy + " " + x + " " + y;
            break;
          case Commands.move:
            d = b;
            command = Commands.move + " " + x + " " + y;
            break;
          default:
            command = b.command + " " + x + " " + y;
        }
        if (i >= last && closed2) {
          if (b.command === Commands.curve) {
            c = d;
            br = b.controls && b.controls.right || b;
            cl = c.controls && c.controls.left || c;
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
            command += " C " + vx + " " + vy + " " + ux + " " + uy + " " + x + " " + y;
          }
          if (b.command !== Commands.close) {
            command += " Z";
          }
        }
        string += command + " ";
      }
      return string;
    },
    pointsToString: function(points, size) {
      let string = "";
      const r = size * 0.5;
      for (let i = 0; i < points.length; i++) {
        const x = points[i].x;
        const y = points[i].y - r;
        string += Commands.move + " " + x + " " + y + " ";
        string += "a " + r + " " + r + " 0 1 0 0.001 0 Z";
      }
      return string;
    },
    getClip: function(shape, domElement) {
      let clip = shape._renderer.clip;
      if (!clip) {
        clip = shape._renderer.clip = svg.createElement("clipPath", {
          "clip-rule": "nonzero"
        });
      }
      if (clip.parentNode === null) {
        domElement.defs.appendChild(clip);
      }
      return clip;
    },
    getRendererType: function(type) {
      return type in svg ? type : "path";
    },
    defs: {
      update: function(domElement) {
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
      }
    },
    group: {
      // TODO: Can speed up.
      // TODO: How does this effect a f
      appendChild: function(object) {
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
      removeChild: function(object) {
        const elem = object._renderer.elem;
        if (!elem || elem.parentNode != this.elem) {
          return;
        }
        const tag = elem.nodeName;
        if (!tag) {
          return;
        }
        if (object._clip) {
          return;
        }
        this.elem.removeChild(elem);
      },
      orderChild: function(object) {
        this.elem.appendChild(object._renderer.elem);
      },
      renderChild: function(child) {
        const prop = svg.getRendererType(child._renderer.type);
        svg[prop].render.call(child, this);
      },
      render: function(domElement) {
        if (!this._visible && !this._flagVisible || this._opacity === 0 && !this._flagOpacity) {
          return this;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        if (!this._renderer.elem) {
          this._renderer.elem = svg.createElement("g", {
            id: this.id
          });
          domElement.appendChild(this._renderer.elem);
        }
        const flagMatrix = this._matrix.manual || this._flagMatrix;
        const context = {
          domElement,
          elem: this._renderer.elem
        };
        if (flagMatrix) {
          this._renderer.elem.setAttribute(
            "transform",
            "matrix(" + this._matrix.toString() + ")"
          );
        }
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          const prop = svg.getRendererType(child._renderer.type);
          svg[prop].render.call(child, domElement);
        }
        if (this._flagId) {
          this._renderer.elem.setAttribute("id", this._id);
        }
        if (this._flagOpacity) {
          this._renderer.elem.setAttribute("opacity", this._opacity);
        }
        if (this._flagVisible) {
          this._renderer.elem.setAttribute(
            "display",
            this._visible ? "inline" : "none"
          );
        }
        if (this._flagClassName) {
          this._renderer.elem.setAttribute("class", this.classList.join(" "));
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
        if (this._flagMask) {
          if (this._mask) {
            const prop = svg.getRendererType(this._mask._renderer.type);
            svg[prop].render.call(this._mask, domElement);
            this._renderer.elem.setAttribute(
              "clip-path",
              "url(#" + this._mask.id + ")"
            );
          } else {
            this._renderer.elem.removeAttribute("clip-path");
          }
        }
        if (this.dataset) {
          Object.assign(this._renderer.elem.dataset, this.dataset);
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    path: {
      render: function(domElement) {
        if (this._opacity === 0 && !this._flagOpacity) {
          return this;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        const changed = {};
        const flagMatrix = this._matrix.manual || this._flagMatrix;
        if (flagMatrix) {
          changed.transform = "matrix(" + this._matrix.toString() + ")";
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
          changed.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill;
          if (this._renderer.hasFillEffect && typeof this._fill.id === "undefined") {
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
          changed.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke;
          if (this._renderer.hasStrokeEffect && typeof this._stroke.id === "undefined") {
            domElement.defs._flagUpdate = true;
            delete this._renderer.hasStrokeEffect;
          }
        }
        if (this._flagLinewidth) {
          changed["stroke-width"] = getEffectiveStrokeWidth(this);
        }
        if (this._flagOpacity) {
          changed["stroke-opacity"] = this._opacity;
          changed["fill-opacity"] = this._opacity;
        }
        if (this._flagClassName) {
          changed["class"] = this.classList.join(" ");
        }
        if (this._flagVisible) {
          changed.visibility = this._visible ? "visible" : "hidden";
        }
        if (this._flagCap) {
          changed["stroke-linecap"] = this._cap;
        }
        if (this._flagJoin) {
          changed["stroke-linejoin"] = this._join;
        }
        if (this._flagMiter) {
          changed["stroke-miterlimit"] = this._miter;
        }
        if (this.dashes && this.dashes.length > 0) {
          changed["stroke-dasharray"] = this.dashes.join(" ");
          changed["stroke-dashoffset"] = this.dashes.offset || 0;
        }
        if (!this._renderer.elem) {
          changed.id = this._id;
          this._renderer.elem = svg.createElement("path", changed);
          domElement.appendChild(this._renderer.elem);
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (this._flagClip) {
          const clip = svg.getClip(this, domElement);
          const elem = this._renderer.elem;
          if (this._clip) {
            elem.removeAttribute("id");
            clip.setAttribute("id", this.id);
            clip.appendChild(elem);
          } else {
            clip.removeAttribute("id");
            elem.setAttribute("id", this.id);
            this.parent._renderer.elem.appendChild(elem);
          }
        }
        if (this._flagMask) {
          if (this._mask) {
            const prop = svg.getRendererType(this._mask._renderer.type);
            svg[prop].render.call(this._mask, domElement);
            this._renderer.elem.setAttribute(
              "clip-path",
              "url(#" + this._mask.id + ")"
            );
          } else {
            this._renderer.elem.removeAttribute("clip-path");
          }
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    points: {
      render: function(domElement) {
        if (this._opacity === 0 && !this._flagOpacity) {
          return this;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        const changed = {};
        const flagMatrix = this._matrix.manual || this._flagMatrix;
        if (flagMatrix) {
          changed.transform = "matrix(" + this._matrix.toString() + ")";
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
          changed.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill;
          if (this._renderer.hasFillEffect && typeof this._fill.id === "undefined") {
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
          changed.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke;
          if (this._renderer.hasStrokeEffect && typeof this._stroke.id === "undefined") {
            domElement.defs._flagUpdate = true;
            delete this._renderer.hasStrokeEffect;
          }
        }
        if (this._flagLinewidth) {
          changed["stroke-width"] = getEffectiveStrokeWidth(this);
        }
        if (this._flagOpacity) {
          changed["stroke-opacity"] = this._opacity;
          changed["fill-opacity"] = this._opacity;
        }
        if (this._flagClassName) {
          changed["class"] = this.classList.join(" ");
        }
        if (this._flagVisible) {
          changed.visibility = this._visible ? "visible" : "hidden";
        }
        if (this.dashes && this.dashes.length > 0) {
          changed["stroke-dasharray"] = this.dashes.join(" ");
          changed["stroke-dashoffset"] = this.dashes.offset || 0;
        }
        if (!this._renderer.elem) {
          changed.id = this._id;
          this._renderer.elem = svg.createElement("path", changed);
          domElement.appendChild(this._renderer.elem);
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    text: {
      render: function(domElement) {
        this._update();
        const changed = {};
        const flagMatrix = this._matrix.manual || this._flagMatrix;
        if (flagMatrix) {
          changed.transform = "matrix(" + this._matrix.toString() + ")";
        }
        if (this._flagId) {
          changed.id = this._id;
        }
        if (this._flagFamily) {
          changed["font-family"] = this._family;
        }
        if (this._flagSize) {
          changed["font-size"] = this._size;
        }
        if (this._flagLeading) {
          changed["line-height"] = this._leading;
        }
        if (this._flagAlignment) {
          changed["text-anchor"] = svg.alignments[this._alignment] || this._alignment;
        }
        if (this._flagBaseline) {
          changed["dominant-baseline"] = svg.baselines[this._baseline] || this._baseline;
        }
        if (this._flagStyle) {
          changed["font-style"] = this._style;
        }
        if (this._flagWeight) {
          changed["font-weight"] = this._weight;
        }
        if (this._flagDecoration) {
          changed["text-decoration"] = this._decoration;
        }
        if (this._flagDirection) {
          changed["direction"] = this._direction;
        }
        if (this._fill && this._fill._renderer) {
          this._renderer.hasFillEffect = true;
          this._fill._update();
          const prop = svg.getRendererType(this._fill._renderer.type);
          svg[prop].render.call(this._fill, domElement, true);
        }
        if (this._flagFill) {
          changed.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill;
          if (this._renderer.hasFillEffect && typeof this._fill.id === "undefined") {
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
          changed.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke;
          if (this._renderer.hasStrokeEffect && typeof this._stroke.id === "undefined") {
            domElement.defs._flagUpdate = true;
            delete this._renderer.hasStrokeEffect;
          }
        }
        if (this._flagLinewidth) {
          changed["stroke-width"] = getEffectiveStrokeWidth(this);
        }
        if (this._flagOpacity) {
          changed.opacity = this._opacity;
        }
        if (this._flagClassName) {
          changed["class"] = this.classList.join(" ");
        }
        if (this._flagVisible) {
          changed.visibility = this._visible ? "visible" : "hidden";
        }
        if (this.dashes && this.dashes.length > 0) {
          changed["stroke-dasharray"] = this.dashes.join(" ");
          changed["stroke-dashoffset"] = this.dashes.offset || 0;
        }
        if (!this._renderer.elem) {
          changed.id = this._id;
          this._renderer.elem = svg.createElement("text", changed);
          domElement.appendChild(this._renderer.elem);
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (this._flagClip) {
          const clip = svg.getClip(this, domElement);
          const elem = this._renderer.elem;
          if (this._clip) {
            elem.removeAttribute("id");
            clip.setAttribute("id", this.id);
            clip.appendChild(elem);
          } else {
            clip.removeAttribute("id");
            elem.setAttribute("id", this.id);
            this.parent._renderer.elem.appendChild(elem);
          }
        }
        if (this._flagMask) {
          if (this._mask) {
            const prop = svg.getRendererType(this._mask._renderer.type);
            svg[prop].render.call(this._mask, domElement);
            this._renderer.elem.setAttribute(
              "clip-path",
              "url(#" + this._mask.id + ")"
            );
          } else {
            this._renderer.elem.removeAttribute("clip-path");
          }
        }
        if (this._flagValue) {
          this._renderer.elem.textContent = this._value;
        }
        return this.flagReset();
      }
    },
    "linear-gradient": {
      render: function(domElement, silent) {
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
        if (!this._renderer.elem) {
          changed.id = this._id;
          this._renderer.elem = svg.createElement("linearGradient", changed);
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (this._renderer.elem.parentNode === null) {
          domElement.defs.appendChild(this._renderer.elem);
        }
        if (this._flagStops) {
          const lengthChanged = this._renderer.elem.childNodes.length !== this.stops.length;
          if (lengthChanged) {
            while (this._renderer.elem.lastChild) {
              this._renderer.elem.removeChild(this._renderer.elem.lastChild);
            }
          }
          for (let i = 0; i < this.stops.length; i++) {
            const stop = this.stops[i];
            const attrs = {};
            if (stop._flagOffset) {
              attrs.offset = 100 * stop._offset + "%";
            }
            if (stop._flagColor) {
              attrs["stop-color"] = stop._color;
            }
            if (stop._flagOpacity) {
              attrs["stop-opacity"] = stop._opacity;
            }
            if (!stop._renderer.elem) {
              stop._renderer.elem = svg.createElement("stop", attrs);
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
      }
    },
    "radial-gradient": {
      render: function(domElement, silent) {
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
        if (!this._renderer.elem) {
          changed.id = this._id;
          this._renderer.elem = svg.createElement("radialGradient", changed);
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (this._renderer.elem.parentNode === null) {
          domElement.defs.appendChild(this._renderer.elem);
        }
        if (this._flagStops) {
          const lengthChanged = this._renderer.elem.childNodes.length !== this.stops.length;
          if (lengthChanged) {
            while (this._renderer.elem.lastChild) {
              this._renderer.elem.removeChild(this._renderer.elem.lastChild);
            }
          }
          for (let i = 0; i < this.stops.length; i++) {
            const stop = this.stops[i];
            const attrs = {};
            if (stop._flagOffset) {
              attrs.offset = 100 * stop._offset + "%";
            }
            if (stop._flagColor) {
              attrs["stop-color"] = stop._color;
            }
            if (stop._flagOpacity) {
              attrs["stop-opacity"] = stop._opacity;
            }
            if (!stop._renderer.elem) {
              stop._renderer.elem = svg.createElement("stop", attrs);
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
      }
    },
    texture: {
      render: function(domElement, silent) {
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
            case "canvas":
              styles.href = styles["xlink:href"] = image.toDataURL("image/png");
              break;
            case "img":
            case "image":
              styles.href = styles["xlink:href"] = this.src;
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
            switch (this._repeat) {
              case "no-repeat":
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
              styles.preserveAspectRatio = "xMidYMid";
            } else {
              styles.preserveAspectRatio = "none";
            }
            styles.width = changed.width;
            styles.height = changed.height;
          }
        }
        if (this._flagScale || this._flagLoaded) {
          if (!this._renderer.image) {
            this._renderer.image = svg.createElement("image", styles);
          } else {
            svg.setAttributes(this._renderer.image, styles);
          }
        }
        if (!this._renderer.elem) {
          changed.id = this._id;
          changed.patternUnits = "userSpaceOnUse";
          this._renderer.elem = svg.createElement("pattern", changed);
        } else if (Object.keys(changed).length !== 0) {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (this._renderer.elem.parentNode === null) {
          domElement.defs.appendChild(this._renderer.elem);
        }
        if (this._renderer.elem && this._renderer.image && !this._renderer.appended) {
          this._renderer.elem.appendChild(this._renderer.image);
          this._renderer.appended = true;
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    }
  };
  var Renderer2 = class extends Events {
    constructor(params) {
      super();
      this.domElement = params.domElement || svg.createElement("svg");
      this.scene = new Group();
      this.scene.parent = this;
      this.defs = svg.createElement("defs");
      this.defs._flagUpdate = false;
      this.domElement.appendChild(this.defs);
      this.domElement.defs = this.defs;
      this.domElement.style.overflow = "hidden";
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
        width,
        height
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
  };

  // src/utils/shaders.js
  var shaders = {
    create: function(gl, source, type) {
      const shader = gl.createShader(gl[type]);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!compiled) {
        const error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new TwoError("unable to compile shader " + shader + ": " + error);
      }
      return shader;
    },
    types: {
      vertex: "VERTEX_SHADER",
      fragment: "FRAGMENT_SHADER"
    },
    path: {
      vertex: `
      precision mediump float;
      attribute vec2 a_position;

      uniform mat3 u_matrix;
      uniform vec2 u_resolution;
      uniform vec4 u_rect;

      varying vec2 v_textureCoords;

      void main() {
        vec2 rectCoords = (a_position * (u_rect.zw - u_rect.xy)) + u_rect.xy;
        vec2 projected = (u_matrix * vec3(rectCoords, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,
      fragment: `
      precision mediump float;

      uniform sampler2D u_image;
      varying vec2 v_textureCoords;

      void main() {
        vec4 texel = texture2D(u_image, v_textureCoords);
        if (texel.a == 0.0) {
          discard;
        }
        gl_FragColor = texel;
      }
    `
    },
    points: {
      vertex: `
      precision mediump float;
      attribute vec2 a_position;

      uniform float u_size;
      uniform mat3 u_matrix;
      uniform vec2 u_resolution;

      varying vec2 v_textureCoords;

      void main() {
        vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;
        vec2 normal = projected / u_resolution;
        vec2 clipspace = (normal * 2.0) - 1.0;

        gl_PointSize = u_size;
        gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
        v_textureCoords = a_position;
      }
    `,
      fragment: `
      precision mediump float;

      uniform sampler2D u_image;

      void main() {
        vec4 texel = texture2D(u_image, gl_PointCoord);
        if (texel.a == 0.0) {
          discard;
        }
        gl_FragColor = texel;
      }
    `
    }
  };

  // src/renderers/webgl.js
  var multiplyMatrix = Matrix2.Multiply;
  var identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  var transformation = new NumArray(9);
  var CanvasUtils = Renderer.Utils;
  var vector2 = new Vector();
  var quad = new NumArray([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
  var webgl = {
    precision: 0.9,
    isHidden: /(undefined|none|transparent)/i,
    canvas: root.document ? root.document.createElement("canvas") : { getContext: function() {
    } },
    alignments: {
      left: "start",
      middle: "center",
      right: "end"
    },
    matrix: new Matrix2(),
    group: {
      removeChild: function(child, gl) {
        if (child.children) {
          for (let i = 0; i < child.children.length; i++) {
            webgl.group.removeChild(child.children[i], gl);
          }
        }
        if (child._renderer.texture) {
          gl.deleteTexture(child._renderer.texture);
          delete child._renderer.texture;
        }
        if (child._renderer.positionBuffer) {
          gl.deleteBuffer(child._renderer.positionBuffer);
          delete child._renderer.positionBuffer;
        }
      },
      /**
       * @function
       // * @type {(gl: any, programs: any) => any}
       * @param {WebGLContext} gl
       * @param {Object} programs
       */
      render: function(gl, programs) {
        if (!this._visible) {
          return;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        const parent = this.parent;
        const flagParentMatrix = parent._matrix && parent._matrix.manual || parent._flagMatrix;
        const flagMatrix = this._matrix.manual || this._flagMatrix;
        if (flagParentMatrix || flagMatrix) {
          if (!this._renderer.matrix) {
            this._renderer.matrix = new NumArray(9);
          }
          this._matrix.toTransformArray(true, transformation);
          multiplyMatrix(
            transformation,
            parent._renderer.matrix,
            this._renderer.matrix
          );
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
          if (!/renderer/i.test(parent._renderer.type)) {
            this._renderer.scale.x *= parent._renderer.scale.x;
            this._renderer.scale.y *= parent._renderer.scale.y;
          }
          if (flagParentMatrix) {
            this._flagMatrix = true;
          }
        }
        if (this._mask) {
          gl.clear(gl.STENCIL_BUFFER_BIT);
          gl.enable(gl.STENCIL_TEST);
          gl.stencilFunc(gl.ALWAYS, 1, 0);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
          gl.colorMask(false, false, false, false);
          const prop = Renderer.Utils.getRendererType(
            this._mask._renderer.type
          );
          webgl[prop].render.call(this._mask, gl, programs, this);
          gl.stencilFunc(gl.EQUAL, 1, 255);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
          gl.colorMask(true, true, true, true);
        }
        this._flagOpacity = parent._flagOpacity || this._flagOpacity;
        this._renderer.opacity = this._opacity * (parent && parent._renderer ? parent._renderer.opacity : 1);
        let i;
        if (this._flagSubtractions) {
          for (i = 0; i < this.subtractions.length; i++) {
            webgl.group.removeChild(this.subtractions[i], gl);
          }
        }
        for (i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          const prop = Renderer.Utils.getRendererType(child._renderer.type);
          webgl[prop].render.call(child, gl, programs);
        }
        if (this._mask) {
          gl.disable(gl.STENCIL_TEST);
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    path: {
      updateCanvas: function(gl, elem) {
        let prev, a, c, ux, uy, vx, vy, ar, bl, br, cl, x, y;
        let isOffset;
        const commands = elem._renderer.vertices;
        const canvas3 = this.canvas;
        const ctx = this.ctx;
        const ratio = gl.renderer.ratio;
        const scale = vector2.copy(elem._renderer.scale).multiply(ratio);
        const stroke = elem._stroke;
        const linewidth = elem._linewidth;
        const fill = elem._fill;
        const opacity = elem._renderer.opacity || elem._opacity;
        const cap = elem._cap;
        const join = elem._join;
        const miter = elem._miter;
        const closed2 = elem._closed;
        const dashes = elem.dashes;
        const length = commands.length;
        const last = length - 1;
        canvas3.width = Math.max(
          Math.ceil(elem._renderer.rect.width * scale.x),
          1
        );
        canvas3.height = Math.max(
          Math.ceil(elem._renderer.rect.height * scale.y),
          1
        );
        const centroid = elem._renderer.rect.centroid;
        const cx = centroid.x;
        const cy = centroid.y;
        ctx.clearRect(0, 0, canvas3.width, canvas3.height);
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            const prop = Renderer.Utils.getRendererType(
              fill._renderer.type
            );
            webgl[prop].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            const prop = Renderer.Utils.getRendererType(
              stroke._renderer.type
            );
            webgl[prop].render.call(stroke, ctx, elem);
            ctx.strokeStyle = stroke._renderer.effect;
          }
          if (linewidth) {
            ctx.lineWidth = getEffectiveStrokeWidth(elem);
          }
          if (miter) {
            ctx.miterLimit = miter;
          }
          if (join) {
            ctx.lineJoin = join;
          }
          if (!closed2 && cap) {
            ctx.lineCap = cap;
          }
        }
        if (typeof opacity === "number") {
          ctx.globalAlpha = opacity;
        }
        if (dashes && dashes.length > 0) {
          ctx.lineDashOffset = dashes.offset || 0;
          ctx.setLineDash(dashes);
        }
        let d, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, ax, ay;
        ctx.save();
        ctx.scale(scale.x, scale.y);
        ctx.translate(cx, cy);
        ctx.beginPath();
        for (let i = 0; i < commands.length; i++) {
          const b = commands[i];
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
              prev = closed2 ? mod(i - 1, length) : Math.max(i - 1, 0);
              a = commands[prev];
              ax = a.x;
              ay = a.y;
              CanvasUtils.renderSvgArcCommand(
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
              prev = closed2 ? mod(i - 1, length) : Math.max(i - 1, 0);
              a = commands[prev];
              ar = a.controls && a.controls.right || Vector.zero;
              bl = b.controls && b.controls.left || Vector.zero;
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
              if (i >= last && closed2) {
                c = d;
                br = b.controls && b.controls.right || Vector.zero;
                cl = c.controls && c.controls.left || Vector.zero;
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
        if (closed2) {
          ctx.closePath();
        }
        if (!webgl.isHidden.test(fill)) {
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
        if (!webgl.isHidden.test(stroke)) {
          isOffset = stroke._renderer && stroke._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
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
        let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity, width, height;
        vertices.forEach(function(v) {
          const x = v.x, y = v.y, controls = v.controls;
          let a, b, c, d, cl, cr;
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
        if (typeof border === "number") {
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
        rect.centroid.x = -left;
        rect.centroid.y = -top;
      },
      render: function(gl, programs, forcedParent) {
        if (!this._visible || !this._opacity) {
          return this;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        const parent = forcedParent || this.parent;
        const prop = Renderer.Utils.getRendererType(this._renderer.type);
        const program = programs[prop];
        const flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        const flagMatrix = this._matrix.manual || this._flagMatrix;
        const parentChanged = this._renderer.parent !== parent;
        const flagTexture = this._flagVertices || this._flagFill || this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || parent._flagOpacity || this._flagVisible || this._flagCap || this._flagJoin || this._flagMiter || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
        if (flagParentMatrix || flagMatrix || parentChanged) {
          if (!this._renderer.matrix) {
            this._renderer.matrix = new NumArray(9);
          }
          this._matrix.toTransformArray(true, transformation);
          multiplyMatrix(
            transformation,
            parent._renderer.matrix,
            this._renderer.matrix
          );
          if (!(this._renderer.scale instanceof Vector)) {
            this._renderer.scale = new Vector();
          }
          let sx, sy;
          if (this._scale instanceof Vector) {
            sx = this._scale.x * parent._renderer.scale.x;
            sy = this._scale.y * parent._renderer.scale.y;
          } else {
            sx = this._scale * parent._renderer.scale.x;
            sy = this._scale * parent._renderer.scale.y;
          }
          this._renderer.scale.x = sx < 0 ? -sx : sx;
          this._renderer.scale.y = sy < 0 ? -sy : sy;
          if (parentChanged) {
            this._renderer.parent = parent;
          }
        }
        if (this._mask) {
          gl.clear(gl.STENCIL_BUFFER_BIT);
          gl.enable(gl.STENCIL_TEST);
          gl.stencilFunc(gl.ALWAYS, 1, 0);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
          gl.colorMask(false, false, false, false);
          const prop2 = Renderer.Utils.getRendererType(
            this._mask._renderer.type
          );
          webgl[prop2].render.call(this._mask, gl, programs, this);
          gl.stencilFunc(gl.EQUAL, 1, 255);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
          gl.colorMask(true, true, true, true);
        }
        if (flagTexture) {
          if (!this._renderer.rect) {
            this._renderer.rect = {};
          }
          this._renderer.opacity = this._opacity * parent._renderer.opacity;
          webgl.path.getBoundingClientRect(
            this._renderer.vertices,
            this._linewidth,
            this._renderer.rect
          );
          webgl.updateTexture.call(webgl, gl, this);
        } else {
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
              gl.getUniformLocation(program, "u_resolution"),
              programs.resolution.width,
              programs.resolution.height
            );
          }
          programs.current = program;
        }
        if (programs.resolution.flagged) {
          gl.uniform2f(
            gl.getUniformLocation(program, "u_resolution"),
            programs.resolution.width,
            programs.resolution.height
          );
        }
        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);
        const rect = this._renderer.rect;
        gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
        gl.uniform4f(program.rect, rect.left, rect.top, rect.right, rect.bottom);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        if (this._mask) {
          gl.disable(gl.STENCIL_TEST);
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    points: {
      // The canvas is a texture that is a rendering of one vertex
      updateCanvas: function(gl, elem) {
        let isOffset;
        const canvas3 = this.canvas;
        const ctx = this.ctx;
        const ratio = gl.renderer.ratio;
        const stroke = elem._stroke;
        const linewidth = elem._linewidth;
        const fill = elem._fill;
        const opacity = elem._renderer.opacity || elem._opacity;
        const dashes = elem.dashes;
        const size = elem._size * ratio;
        let dimension = size;
        if (!webgl.isHidden.test(stroke)) {
          dimension += linewidth;
        }
        canvas3.width = getPoT(dimension);
        canvas3.height = canvas3.width;
        const aspect = dimension / canvas3.width;
        const cx = canvas3.width / 2;
        const cy = canvas3.height / 2;
        ctx.clearRect(0, 0, canvas3.width, canvas3.height);
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            const prop = Renderer.Utils.getRendererType(
              fill._renderer.type
            );
            webgl[prop].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            const prop = Renderer.Utils.getRendererType(
              stroke._renderer.type
            );
            webgl[prop].render.call(stroke, ctx, elem);
            ctx.strokeStyle = stroke._renderer.effect;
          }
          if (linewidth) {
            ctx.lineWidth = getEffectiveStrokeWidth(elem) / aspect;
          }
        }
        if (typeof opacity === "number") {
          ctx.globalAlpha = opacity;
        }
        if (dashes && dashes.length > 0) {
          ctx.lineDashOffset = dashes.offset || 0;
          ctx.setLineDash(dashes);
        }
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(webgl.precision, webgl.precision);
        ctx.beginPath();
        ctx.arc(0, 0, size / aspect * 0.5, 0, TWO_PI);
        ctx.restore();
        if (closed) {
          ctx.closePath();
        }
        if (!webgl.isHidden.test(fill)) {
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
        if (!webgl.isHidden.test(stroke)) {
          isOffset = stroke._renderer && stroke._renderer.offset;
          if (isOffset) {
            ctx.save();
            ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
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
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        let size = this._size;
        const parent = forcedParent || this.parent;
        const program = programs[this._renderer.type];
        const sizeAttenuation = this._sizeAttenuation;
        const stroke = this._stroke;
        const linewidth = this._linewidth;
        const flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        const flagMatrix = this._matrix.manual || this._flagMatrix;
        const parentChanged = this._renderer.parent !== parent;
        const commands = this._renderer.vertices;
        const length = this._renderer.collection.length;
        const flagVertices = this._flagVertices;
        const flagTexture = this._flagFill || this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || parent._flagOpacity || this._flagVisible || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
        if (flagParentMatrix || flagMatrix || parentChanged) {
          if (!this._renderer.matrix) {
            this._renderer.matrix = new NumArray(9);
          }
          this._matrix.toTransformArray(true, transformation);
          multiplyMatrix(
            transformation,
            parent._renderer.matrix,
            this._renderer.matrix
          );
          if (!(this._renderer.scale instanceof Vector)) {
            this._renderer.scale = new Vector();
          }
          let sx, sy;
          if (this._scale instanceof Vector) {
            sx = this._scale.x * parent._renderer.scale.x;
            sy = this._scale.y * parent._renderer.scale.y;
          } else {
            sx = this._scale * parent._renderer.scale.x;
            sy = this._scale * parent._renderer.scale.y;
          }
          this._renderer.scale.x = sx < 0 ? -sx : sx;
          this._renderer.scale.y = sy < 0 ? -sy : sy;
          if (parentChanged) {
            this._renderer.parent = parent;
          }
        }
        if (flagVertices) {
          const positionBuffer = this._renderer.positionBuffer;
          if (positionBuffer) {
            gl.deleteBuffer(positionBuffer);
          }
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
              gl.getUniformLocation(program, "u_resolution"),
              programs.resolution.width,
              programs.resolution.height
            );
          }
          programs.current = program;
        }
        if (programs.resolution.flagged) {
          gl.uniform2f(
            gl.getUniformLocation(program, "u_resolution"),
            programs.resolution.width,
            programs.resolution.height
          );
        }
        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);
        gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
        gl.uniform1f(program.size, size * programs.resolution.ratio);
        gl.drawArrays(gl.POINTS, 0, length);
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    text: {
      updateCanvas: function(gl, elem) {
        const canvas3 = this.canvas;
        const ctx = this.ctx;
        const ratio = gl.renderer.ratio;
        const scale = vector2.copy(elem._renderer.scale).multiply(ratio);
        const stroke = elem._stroke;
        const linewidth = elem._linewidth;
        const fill = elem._fill;
        const opacity = elem._renderer.opacity || elem._opacity;
        const dashes = elem.dashes;
        const decoration = elem._decoration;
        const direction = elem._direction;
        canvas3.width = Math.max(
          Math.ceil(elem._renderer.rect.width * scale.x),
          1
        );
        canvas3.height = Math.max(
          Math.ceil(elem._renderer.rect.height * scale.y),
          1
        );
        const centroid = elem._renderer.rect.centroid;
        const cx = centroid.x;
        const cy = centroid.y;
        let a, b, c, d, e, sx, sy, x1, y1, x2, y2;
        const isOffset = fill._renderer && fill._renderer.offset && stroke._renderer && stroke._renderer.offset;
        ctx.clearRect(0, 0, canvas3.width, canvas3.height);
        if (!isOffset) {
          ctx.font = [
            elem._style,
            elem._weight,
            elem._size + "px/" + elem._leading + "px",
            elem._family
          ].join(" ");
        }
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.textDirection = direction;
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            const prop = Renderer.Utils.getRendererType(
              fill._renderer.type
            );
            webgl[prop].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            const prop = Renderer.Utils.getRendererType(
              stroke._renderer.type
            );
            webgl[prop].render.call(stroke, ctx, elem);
            ctx.strokeStyle = stroke._renderer.effect;
          }
          if (linewidth) {
            ctx.lineWidth = getEffectiveStrokeWidth(elem);
          }
        }
        if (typeof opacity === "number") {
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
            ctx.translate(-fill._renderer.offset.x, -fill._renderer.offset.y);
            ctx.scale(sx, sy);
            a = elem._size / fill._renderer.scale.y;
            b = elem._leading / fill._renderer.scale.y;
            ctx.font = [
              elem._style,
              elem._weight,
              a + "px/",
              b + "px",
              elem._family
            ].join(" ");
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
            ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
            ctx.scale(sx, sy);
            a = elem._size / stroke._renderer.scale.y;
            b = elem._leading / stroke._renderer.scale.y;
            ctx.font = [
              elem._style,
              elem._weight,
              a + "px/",
              b + "px",
              elem._family
            ].join(" ");
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
        if (/(underline|strikethrough)/i.test(decoration)) {
          const metrics = ctx.measureText(elem.value);
          switch (decoration) {
            case "underline":
              y1 = metrics.actualBoundingBoxDescent;
              y2 = metrics.actualBoundingBoxDescent;
              break;
            case "strikethrough":
              y1 = 0;
              y2 = 0;
              break;
          }
          x1 = -metrics.width / 2;
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
        const ctx = webgl.ctx;
        ctx.font = [
          elem._style,
          elem._weight,
          elem._size + "px/" + elem._leading + "px",
          elem._family
        ].join(" ");
        ctx.textAlign = "center";
        ctx.textBaseline = Renderer.Utils.baselines[elem._baseline] || elem._baseline;
        const metrics = ctx.measureText(elem._value);
        let width = metrics.width;
        let height = 1.15 * (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
        if (this._linewidth && !webgl.isHidden.test(this._stroke)) {
          width += this._linewidth * 2;
          height += this._linewidth * 2;
        }
        const w = width / 2;
        const h = height / 2;
        switch (webgl.alignments[elem._alignment] || elem._alignment) {
          case webgl.alignments.left:
            if (elem.direction === "ltr") {
              rect.left = 0;
              rect.right = width;
            } else {
              rect.left = -width;
              rect.right = 0;
            }
            break;
          case webgl.alignments.right:
            if (elem.direction === "ltr") {
              rect.left = -width;
              rect.right = 0;
            } else {
              rect.left = 0;
              rect.right = width;
            }
            break;
          default:
            rect.left = -w;
            rect.right = w;
        }
        switch (elem._baseline) {
          case "bottom":
            rect.top = -height;
            rect.bottom = 0;
            break;
          case "top":
            rect.top = 0;
            rect.bottom = height;
            break;
          case "baseline":
            rect.top = -h * 1.5;
            rect.bottom = h * 0.5;
            break;
          default:
            rect.top = -h;
            rect.bottom = h;
        }
        rect.width = width;
        rect.height = height;
        if (!rect.centroid) {
          rect.centroid = {};
        }
        rect.centroid.x = w;
        rect.centroid.y = h;
      },
      render: function(gl, programs, forcedParent) {
        if (!this._visible || !this._opacity) {
          return this;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        const parent = forcedParent || this.parent;
        const program = programs[this._renderer.type];
        const flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        const flagMatrix = this._matrix.manual || this._flagMatrix;
        const parentChanged = this._renderer.parent !== parent;
        const flagTexture = this._flagVertices || this._flagFill || this._fill instanceof LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || parent._flagOpacity || this._flagVisible || this._flagScale || this._flagValue || this._flagFamily || this._flagSize || this._flagLeading || this._flagAlignment || this._flagBaseline || this._flagStyle || this._flagWeight || this._flagDecoration || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
        if (flagParentMatrix || flagMatrix || parentChanged) {
          if (!this._renderer.matrix) {
            this._renderer.matrix = new NumArray(9);
          }
          this._matrix.toTransformArray(true, transformation);
          multiplyMatrix(
            transformation,
            parent._renderer.matrix,
            this._renderer.matrix
          );
          if (!(this._renderer.scale instanceof Vector)) {
            this._renderer.scale = new Vector();
          }
          let sx, sy;
          if (this._scale instanceof Vector) {
            sx = this._scale.x * parent._renderer.scale.x;
            sy = this._scale.y * parent._renderer.scale.y;
          } else {
            sx = this._scale * parent._renderer.scale.x;
            sy = this._scale * parent._renderer.scale.y;
          }
          this._renderer.scale.x = sx < 0 ? -sx : sx;
          this._renderer.scale.y = sy < 0 ? -sy : sy;
          if (parentChanged) {
            this._renderer.parent = parent;
          }
        }
        if (this._mask) {
          gl.clear(gl.STENCIL_BUFFER_BIT);
          gl.enable(gl.STENCIL_TEST);
          gl.stencilFunc(gl.ALWAYS, 1, 0);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
          gl.colorMask(false, false, false, false);
          const prop = Renderer.Utils.getRendererType(
            this._mask._renderer.type
          );
          webgl[prop].render.call(this._mask, gl, programs, this);
          gl.stencilFunc(gl.EQUAL, 1, 255);
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
              gl.getUniformLocation(program, "u_resolution"),
              programs.resolution.width,
              programs.resolution.height
            );
          }
          programs.current = program;
        }
        if (programs.resolution.flagged) {
          gl.uniform2f(
            gl.getUniformLocation(program, "u_resolution"),
            programs.resolution.width,
            programs.resolution.height
          );
        }
        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);
        const rect = this._renderer.rect;
        gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
        gl.uniform4f(program.rect, rect.left, rect.top, rect.right, rect.bottom);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        if (this._mask) {
          gl.disable(gl.STENCIL_TEST);
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    "linear-gradient": {
      render: function(ctx, parent) {
        if (!ctx.canvas.getContext("2d") || !parent) {
          return;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        if (!this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
          let rect;
          let lx = this.left._x;
          let ly = this.left._y;
          let rx = this.right._x;
          let ry = this.right._y;
          if (/objectBoundingBox/i.test(this._units)) {
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
      }
    },
    "radial-gradient": {
      render: function(ctx, parent) {
        if (!ctx.canvas.getContext("2d") || !parent) {
          return;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        if (!this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
          let rect;
          let cx = this.center._x;
          let cy = this.center._y;
          let fx = this.focal._x;
          let fy = this.focal._y;
          let radius = this._radius;
          if (/objectBoundingBox/i.test(this._units)) {
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
      }
    },
    texture: {
      render: function(ctx, elem) {
        if (!ctx.canvas.getContext("2d")) {
          return;
        }
        if (_.isFunction(this._renderer.onBeforeRender)) {
          this._renderer.onBeforeRender();
        }
        this._update();
        const image = this.image;
        if ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) {
          this._renderer.effect = ctx.createPattern(image, this._repeat);
        } else if (!this._renderer.effect) {
          return this.flagReset();
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
          let sx, sy;
          if (this._scale instanceof Vector) {
            sx = this._scale.x;
            sy = this._scale.y;
          } else {
            sx = this._scale;
            sy = this._scale;
          }
          this._renderer.scale.x = sx < 0 ? -sx : sx;
          this._renderer.scale.y = sy < 0 ? -sy : sy;
        }
        if (_.isFunction(this._renderer.onAfterRender)) {
          this._renderer.onAfterRender();
        }
        return this.flagReset();
      }
    },
    updateTexture: function(gl, elem) {
      const prop = Renderer.Utils.getRendererType(elem._renderer.type);
      this[prop].updateCanvas.call(webgl, gl, elem);
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
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        this.canvas
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    },
    program: {
      create: function(gl, shaders2) {
        let program, linked, error;
        program = gl.createProgram();
        _.each(shaders2, function(s) {
          gl.attachShader(program, s);
        });
        gl.linkProgram(program);
        linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
          error = gl.getProgramInfoLog(program);
          gl.deleteProgram(program);
          throw new TwoError("unable to link program: " + error);
        }
        return program;
      }
    },
    extensions: {
      init: function(gl) {
        const extensions = {};
        const names = [
          "EXT_texture_filter_anisotropic",
          "WEBGL_compressed_texture_s3tc",
          "OES_texture_float_linear",
          "WEBGL_multisampled_render_to_texture"
        ];
        for (let i = 0; i < names.length; i++) {
          const name = names[i];
          extensions[name] = webgl.extensions.get(gl, name);
        }
        return extensions;
      },
      get: function(gl, name) {
        return gl.getExtension(name) || gl.getExtension(`MOZ_${name}`) || gl.getExtension(`WEBKIT_${name}`);
      }
    },
    TextureRegistry: new Registry()
  };
  webgl.ctx = webgl.canvas.getContext("2d");
  var Renderer3 = class extends Events {
    constructor(params) {
      super();
      let gl, program, vs, fs;
      this.domElement = params.domElement || document.createElement("canvas");
      if (typeof params.offscreenElement !== "undefined") {
        webgl.canvas = params.offscreenElement;
        webgl.ctx = webgl.canvas.getContext("2d");
      }
      this.scene = new Group();
      this.scene.parent = this;
      this._renderer = {
        type: "renderer",
        matrix: new NumArray(identity),
        scale: 1,
        opacity: 1
      };
      this._flagMatrix = true;
      params = _.defaults(params || {}, {
        antialias: false,
        alpha: true,
        premultipliedAlpha: true,
        stencil: true,
        preserveDrawingBuffer: true,
        overdraw: false
      });
      this.overdraw = params.overdraw;
      gl = this.ctx = this.domElement.getContext("webgl", params) || this.domElement.getContext("experimental-webgl", params);
      if (!this.ctx) {
        throw new TwoError(
          "unable to create a webgl context. Try using another renderer."
        );
      }
      vs = shaders.create(gl, shaders.path.vertex, shaders.types.vertex);
      fs = shaders.create(gl, shaders.path.fragment, shaders.types.fragment);
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
      gl.extensions = webgl.extensions.init(gl);
      gl.renderer = this;
      program.position = gl.getAttribLocation(program, "a_position");
      program.matrix = gl.getUniformLocation(program, "u_matrix");
      program.rect = gl.getUniformLocation(program, "u_rect");
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(program.position);
      gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
      vs = shaders.create(gl, shaders.points.vertex, shaders.types.vertex);
      fs = shaders.create(gl, shaders.points.fragment, shaders.types.fragment);
      program = this.programs.points = webgl.program.create(gl, [vs, fs]);
      program.position = gl.getAttribLocation(program, "a_position");
      program.matrix = gl.getUniformLocation(program, "u_matrix");
      program.size = gl.getUniformLocation(program, "u_size");
      gl.enable(gl.BLEND);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.blendEquation(gl.FUNC_ADD);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    }
    /**
     * @name Two.WebGLRenderer.Utils
     * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.
     */
    static Utils = webgl;
    /**
     * @name Two.WebGLRenderer#setSize
     * @function
     * @fires resize
     * @param {Number} width - The new width of the renderer.
     * @param {Number} height - The new height of the renderer.
     * @param {Number} [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
     * @description Change the size of the renderer.
     */
    setSize(width, height, ratio) {
      let w, h;
      const ctx = this.ctx;
      this.width = width;
      this.height = height;
      this.ratio = typeof ratio === "undefined" ? getRatio(ctx) : ratio;
      this.domElement.width = width * this.ratio;
      this.domElement.height = height * this.ratio;
      if (_.isObject(this.domElement.style)) {
        _.extend(this.domElement.style, {
          width: width + "px",
          height: height + "px"
        });
      }
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
    }
    /**
     * @name Two.WebGLRenderer#render
     * @function
     * @description Render the current scene to the `<canvas />`.
     */
    render() {
      const gl = this.ctx;
      if (!this.overdraw) {
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      webgl.group.render.call(this.scene, gl, this.programs);
      this._flagMatrix = false;
      this.programs.resolution.flagged = true;
      return this;
    }
  };

  // src/two.js
  var Utils = _.extend(
    {
      Error: TwoError,
      getRatio,
      read,
      xhr
    },
    _,
    CanvasPolyfill,
    curves_exports,
    math_exports
  );
  var Two = class _Two {
    // Warning: inherit events while overriding static properties
    /**
     * @private
     */
    _events = new Events();
    // Getters and setters aren't enumerable
    get _bound() {
      return this._events._bound;
    }
    set _bound(v) {
      this._events._bound = v;
    }
    addEventListener() {
      return this._events.addEventListener?.apply(this, arguments);
    }
    on() {
      return this._events.addEventListener?.apply(this, arguments);
    }
    bind() {
      return this._events.addEventListener?.apply(this, arguments);
    }
    removeEventListener() {
      return this._events.removeEventListener?.apply(this, arguments);
    }
    off() {
      return this._events.removeEventListener?.apply(this, arguments);
    }
    unbind() {
      return this._events.removeEventListener?.apply(this, arguments);
    }
    dispatchEvent() {
      return this._events.dispatchEvent?.apply(this, arguments);
    }
    trigger() {
      return this._events.dispatchEvent?.apply(this, arguments);
    }
    listen() {
      return this._events.listen?.apply(this, arguments);
    }
    ignore() {
      return this._events.ignore?.apply(this, arguments);
    }
    /**
     * @name Two#type
     * @property {String} - A string representing which type of renderer the instance has instantiated.
     */
    type = "";
    /**
     * @name Two#renderer
     * @property {(Two.SVGRenderer|Two.CanvasRenderer|Two.WebGLRenderer)} - The instantiated rendering class for the instance. For a list of possible rendering types check out Two.Types.
     */
    renderer = null;
    /**
     * @name Two#scene
     * @property {Two.Group} - The base level {@link Two.Group} which houses all objects for the instance. Because it is a {@link Two.Group} transformations can be applied to it that will affect all objects in the instance. This is handy as a makeshift inverted camera.
     */
    scene = null;
    /**
     * @name Two#width
     * @property {Number} - The width of the instance's dom element.
     */
    width = 0;
    /**
     * @name Two#height
     * @property {Number} - The height of the instance's dom element.
     */
    height = 0;
    /**
     * @name Two#frameCount
     * @property {Number} - An integer representing how many frames have elapsed.
     */
    frameCount = 0;
    /**
     * @name Two#timeDelta
     * @property {Number} - A number representing how much time has elapsed since the last frame in milliseconds.
     */
    timeDelta = 0;
    /**
     * @name Two#playing
     * @property {Boolean} - A boolean representing whether or not the instance is being updated through the automatic `requestAnimationFrame`.
     */
    playing = false;
    constructor(options) {
      const params = _.defaults(options || {}, {
        fullscreen: false,
        fitted: false,
        width: 640,
        height: 480,
        type: _Two.Types.svg,
        autostart: false
      });
      _.each(
        params,
        function(v, k) {
          if (/fullscreen/i.test(k) || /autostart/i.test(k)) {
            return;
          }
          this[k] = v;
        },
        this
      );
      if (_.isElement(params.domElement)) {
        const tagName = params.domElement.tagName.toLowerCase();
        if (!/^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(
          this.type + "-" + tagName
        )) {
          this.type = _Two.Types[tagName];
        }
      }
      this.renderer = new _Two[this.type](this);
      this.setPlaying(params.autostart);
      this.frameCount = 0;
      if (params.fullscreen) {
        this.fit = fitToWindow.bind(this);
        this.fit.domElement = window;
        this.fit.attached = true;
        _.extend(document.body.style, {
          overflow: "hidden",
          margin: 0,
          padding: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "fixed"
        });
        _.extend(this.renderer.domElement.style, {
          display: "block",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "fixed"
        });
        dom.bind(this.fit.domElement, "resize", this.fit);
        this.fit();
      } else if (params.fitted) {
        this.fit = fitToParent.bind(this);
        _.extend(this.renderer.domElement.style, {
          display: "block"
        });
      } else if (typeof params.width === "number" && typeof params.height === "number") {
        this.renderer.setSize(params.width, params.height, this.ratio);
        this.width = params.width;
        this.height = params.height;
      }
      this.renderer.bind(Events.Types.resize, updateDimensions.bind(this));
      this.scene = this.renderer.scene;
      _Two.Instances.push(this);
      if (params.autostart) {
        raf.init();
      }
    }
    static NextFrameId = Constants.NextFrameId;
    // Primitive
    /**
     * @name Two.Types
     * @property {Object} - The different rendering types available in the library.
     */
    static Types = Constants.Types;
    /**
     * @name Two.Version
     * @property {String} - The current working version of the library, `$version`.
     */
    static Version = Constants.Version;
    /**
     * @name Two.PublishDate
     * @property {String} - The automatically generated publish date in the build process to verify version release candidates.
     */
    static PublishDate = Constants.PublishDate;
    /**
     * @name Two.Identifier
     * @property {String} - String prefix for all Two.js object's ids. This trickles down to SVG ids.
     */
    static Identifier = Constants.Identifier;
    /**
     * @name Two.Resolution
     * @property {Number} - Default amount of vertices to be used for interpreting Arcs and ArcSegments.
     */
    static Resolution = Constants.Resolution;
    /**
     * @name Two.AutoCalculateImportedMatrices
     * @property {Boolean} - When importing SVGs through the {@link Two#interpret} and {@link Two#load}, this boolean determines whether Two.js infers and then overrides the exact transformation matrix of the reference SVG.
     * @nota-bene `false` copies the exact transformation matrix values, but also sets the path's `matrix.manual = true`.
     */
    static AutoCalculateImportedMatrices = Constants.AutoCalculateImportedMatrices;
    /**
     * @name Two.Instances
     * @property {Two[]} - Registered list of all Two.js instances in the current session.
     */
    static Instances = Constants.Instances;
    /**
     * @function Two.uniqueId
     * @description Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
     * @returns {Number} Ever increasing Number.
     */
    static uniqueId = Constants.uniqueId;
    static Anchor = Anchor;
    static Collection = Collection;
    static Events = Events;
    static Group = Group;
    static Matrix = Matrix2;
    static Path = Path;
    static Registry = Registry;
    static Element = Element;
    static Shape = Shape;
    static Text = Text;
    static Vector = Vector;
    static Gradient = Gradient;
    static Image = Image2;
    static ImageSequence = ImageSequence;
    static LinearGradient = LinearGradient;
    static RadialGradient = RadialGradient;
    static Sprite = Sprite;
    static Stop = Stop;
    static Texture = Texture;
    static ArcSegment = ArcSegment;
    static Circle = Circle;
    static Ellipse = Ellipse;
    static Line = Line;
    static Points = Points;
    static Polygon = Polygon;
    static Rectangle = Rectangle;
    static RoundedRectangle = RoundedRectangle;
    static Star = Star;
    static CanvasRenderer = Renderer;
    static SVGRenderer = Renderer2;
    static WebGLRenderer = Renderer3;
    /**
     * @name Two.Commands
     * @property {Object} - Map of possible path commands. Taken from the SVG specification. Commands include: `move`, `line`, `curve`, `arc`, and `close`.
     */
    static Commands = Commands;
    /**
     * @name Two.Utils
     * @property {Object} Utils - A massive object filled with utility functions and properties.
     * @property {Object} Two.Utils.read - A collection of SVG parsing functions indexed by element name.
     * @property {Function} Two.Utils.read.path - Parse SVG path element or `d` attribute string.
     */
    static Utils = Utils;
    /**
     * @name Two#appendTo
     * @function
     * @param {Element} elem - The DOM element to append the Two.js stage to.
     * @description Shorthand method to append your instance of Two.js to the `document`.
     */
    appendTo(elem) {
      elem.appendChild(this.renderer.domElement);
      if (this.fit) {
        if (this.fit.domElement !== window) {
          this.fit.domElement = elem;
          this.fit.attached = false;
        }
        this.update();
      }
      return this;
    }
    /**
     * @name Two#play
     * @function
     * @fires play
     * @description Call to start an internal animation loop.
     * @nota-bene This function initiates a `requestAnimationFrame` loop.
     */
    play() {
      this.playing = true;
      raf.init();
      return this.trigger(Events.Types.play);
    }
    /**
     * @name Two#pause
     * @function
     * @fires pause
     * @description Call to stop the internal animation loop for a specific instance of Two.js.
     */
    pause() {
      this.playing = false;
      return this.trigger(Events.Types.pause);
    }
    setPlaying(p) {
      this.playing = p;
    }
    /**
     * @name Two#release
     * @function
     * @param {Two.Element} [obj] - Object to release from event listening. If none provided then the root {@link Two.Group} will be used.
     * @returns {Two.Element} The object passed for event deallocation.
     * @description Release a {@link Two.Element}’s events from memory and recurse through its children, effects, and/or vertices.
     */
    release(obj) {
      let i, v, child;
      if (typeof obj === "undefined") {
        return this.release(this.scene);
      }
      if (typeof obj.unbind === "function") {
        obj.unbind();
      }
      if (typeof obj.fill === "object" && typeof obj.fill.unbind === "function") {
        obj.fill.unbind();
      }
      if (typeof obj.stroke === "object" && typeof obj.stroke.unbind === "function") {
        obj.stroke.unbind();
      }
      if (obj.vertices) {
        if (typeof obj.vertices.unbind === "function") {
          try {
            obj.vertices.unbind();
          } catch (e) {
          }
        }
        for (i = 0; i < obj.vertices.length; i++) {
          v = obj.vertices[i];
          if (typeof v.unbind === "function") {
            v.unbind();
          }
          if (v.controls) {
            if (v.controls.left && typeof v.controls.left.unbind === "function") {
              v.controls.left.unbind();
            }
            if (v.controls.right && typeof v.controls.right.unbind === "function") {
              v.controls.right.unbind();
            }
          }
        }
      }
      if (obj.children) {
        for (i = 0; i < obj.children.length; i++) {
          child = obj.children[i];
          this.release(child);
        }
        if (typeof obj.children.unbind === "function") {
          try {
            obj.children.unbind();
          } catch (e) {
          }
        }
      }
      if (obj._renderer) {
        if (obj._renderer.elem && obj._renderer.elem.parentNode) {
          obj._renderer.elem.parentNode.removeChild(obj._renderer.elem);
          delete obj._renderer.elem;
        }
        if (this.type === "WebGLRenderer" && this.renderer.ctx) {
          const gl = this.renderer.ctx;
          if (obj._renderer.texture) {
            gl.deleteTexture(obj._renderer.texture);
            delete obj._renderer.texture;
          }
          if (obj._renderer.positionBuffer) {
            gl.deleteBuffer(obj._renderer.positionBuffer);
            delete obj._renderer.positionBuffer;
          }
          if (obj._renderer.effect) {
            obj._renderer.effect = null;
          }
        }
        if (this.type === "CanvasRenderer" && obj._renderer.context) {
          delete obj._renderer.context;
        }
      }
      return obj;
    }
    /**
     * @name Two#getShapesAtPoint
     * @function
     * @param {Number} x - X coordinate in world space.
     * @param {Number} y - Y coordinate in world space.
     * @param {Object} [options] - Hit test configuration.
     * @param {Boolean} [options.visibleOnly=true] - Limit results to visible shapes.
     * @param {Boolean} [options.includeGroups=false] - Include groups in the hit results.
     * @param {('all'|'deepest')} [options.mode='all'] - Whether to return all intersecting shapes or only the top-most.
     * @param {Boolean} [options.deepest] - Alias for `mode: 'deepest'`.
     * @param {Number} [options.precision] - Segmentation precision for curved geometry.
     * @param {Number} [options.tolerance=0] - Pixel tolerance applied to hit testing.
     * @param {Boolean} [options.fill] - Override fill testing behaviour.
     * @param {Boolean} [options.stroke] - Override stroke testing behaviour.
     * @param {Function} [options.filter] - Predicate to filter shapes from the result set.
     * @returns {Two.Shape[]} Ordered list of shapes under the specified point, front to back.
     * @description Returns shapes underneath the provided coordinates. Coordinates are expected in world space (matching the renderer output).
     * @nota-bene Delegates to {@link Two.Group#getShapesAtPoint} on the root scene.
     */
    getShapesAtPoint(x, y, options) {
      if (this.scene && typeof this.scene.getShapesAtPoint === "function") {
        return this.scene.getShapesAtPoint(x, y, options);
      }
      return [];
    }
    /**
     * @name Two#update
     * @function
     * @fires update
     * @description Update positions and calculations in one pass before rendering. Then render to the canvas.
     * @nota-bene This function is called automatically if using {@link Two#play} or the `autostart` parameter in construction.
     */
    update() {
      const animated = !!this._lastFrame;
      const now = _.performance.now();
      if (animated) {
        this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
      }
      this._lastFrame = now;
      if (this.fit && this.fit.domElement && !this.fit.attached) {
        dom.bind(this.fit.domElement, "resize", this.fit);
        this.fit.attached = true;
        this.fit();
      }
      const width = this.width;
      const height = this.height;
      const renderer = this.renderer;
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize(width, height, this.ratio);
      }
      this.trigger(Events.Types.update, this.frameCount, this.timeDelta);
      return this.render();
    }
    /**
     * @name Two#render
     * @function
     * @fires render
     * @description Render all drawable and visible objects of the scene.
     */
    render() {
      this.renderer.render();
      return this.trigger(Events.Types.render, this.frameCount++);
    }
    // Convenience Methods
    /**
     * @name Two#add
     * @function
     * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects. Alternatively can add objects as individual arguments.
     * @description A shorthand method to add specific Two.js objects to the scene.
     */
    add(objects) {
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      }
      this.scene.add(objects);
      return this;
    }
    /**
     * @name Two#remove
     * @function
     * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects.
     * @description A shorthand method to remove specific Two.js objects from the scene.
     */
    remove(objects) {
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      }
      this.scene.remove(objects);
      return this;
    }
    /**
     * @name Two#clear
     * @function
     * @description Removes all objects from the instance's scene. If you intend to have the browser garbage collect this, don't forget to delete the references in your application as well.
     */
    clear() {
      this.scene.remove(this.scene.children);
      return this;
    }
    /**
     * @name Two#makeLine
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @returns {Two.Line}
     * @description Creates a Two.js line and adds it to the scene.
     */
    makeLine(x1, y1, x2, y2) {
      const line = new Line(x1, y1, x2, y2);
      this.scene.add(line);
      return line;
    }
    /**
     * @name Two#makeArrow
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @returns {Two.Path}
     * @description Creates a Two.js arrow and adds it to the scene.
     */
    makeArrow(x1, y1, x2, y2, size) {
      const headlen = typeof size === "number" ? size : 10;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const vertices = [
        new Anchor(
          x1,
          y1,
          void 0,
          void 0,
          void 0,
          void 0,
          Commands.move
        ),
        new Anchor(
          x2,
          y2,
          void 0,
          void 0,
          void 0,
          void 0,
          Commands.line
        ),
        new Anchor(
          x2 - headlen * Math.cos(angle - Math.PI / 4),
          y2 - headlen * Math.sin(angle - Math.PI / 4),
          void 0,
          void 0,
          void 0,
          void 0,
          Commands.line
        ),
        new Anchor(
          x2,
          y2,
          void 0,
          void 0,
          void 0,
          void 0,
          Commands.move
        ),
        new Anchor(
          x2 - headlen * Math.cos(angle + Math.PI / 4),
          y2 - headlen * Math.sin(angle + Math.PI / 4),
          void 0,
          void 0,
          void 0,
          void 0,
          Commands.line
        )
      ];
      const path = new Path(vertices, false, false, true);
      path.noFill();
      path.cap = "round";
      path.join = "round";
      this.scene.add(path);
      return path;
    }
    /**
     * @name Two#makeRectangle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @returns {Two.Rectangle}
     * @description Creates a Two.js rectangle and adds it to the scene.
     */
    makeRectangle(x, y, width, height) {
      const rect = new Rectangle(x, y, width, height);
      this.scene.add(rect);
      return rect;
    }
    /**
     * @name Two#makeRoundedRectangle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {Number} sides
     * @returns {Two.RoundedRectangle}
     * @description Creates a Two.js rounded rectangle and adds it to the scene.
     */
    makeRoundedRectangle(x, y, width, height, sides) {
      const rect = new RoundedRectangle(x, y, width, height, sides);
      this.scene.add(rect);
      return rect;
    }
    /**
     * @name Two#makeCircle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @param {Number} [resolution=4]
     * @returns {Two.Circle}
     * @description Creates a Two.js circle and adds it to the scene.
     */
    makeCircle(x, y, radius, resolution) {
      const circle = new Circle(x, y, radius, resolution);
      this.scene.add(circle);
      return circle;
    }
    /**
     * @name Two#makeEllipse
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} rx
     * @param {Number} ry
     * @param {Number} [resolution=4]
     * @returns {Two.Ellipse}
     * @description Creates a Two.js ellipse and adds it to the scene.
     */
    makeEllipse(x, y, rx, ry, resolution) {
      const ellipse = new Ellipse(x, y, rx, ry, resolution);
      this.scene.add(ellipse);
      return ellipse;
    }
    /**
     * @name Two#makeStar
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} outerRadius
     * @param {Number} innerRadius
     * @param {Number} sides
     * @returns {Two.Star}
     * @description Creates a Two.js star and adds it to the scene.
     */
    makeStar(x, y, outerRadius, innerRadius, sides) {
      const star = new Star(x, y, outerRadius, innerRadius, sides);
      this.scene.add(star);
      return star;
    }
    /**
     * @name Two#makeCurve
     * @function
     * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points.
     * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
     * @returns {Two.Path} - Where `path.curved` is set to `true`.
     * @description Creates a Two.js path that is curved and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
    makeCurve(points) {
      const l = arguments.length;
      if (!Array.isArray(points)) {
        points = [];
        for (let i = 0; i < l; i += 2) {
          const x = arguments[i];
          if (typeof x !== "number") {
            break;
          }
          const y = arguments[i + 1];
          points.push(new Anchor(x, y));
        }
      }
      const last = arguments[l - 1];
      const curve = new Path(
        points,
        !(typeof last === "boolean" ? last : void 0),
        true
      );
      const rect = curve.getBoundingClientRect();
      curve.center().translation.set(rect.left + rect.width / 2, rect.top + rect.height / 2);
      this.scene.add(curve);
      return curve;
    }
    /**
     * @name Two#makePolygon
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @param {Number} sides
     * @returns {Two.Polygon}
     * @description Creates a Two.js polygon and adds it to the scene.
     */
    makePolygon(x, y, radius, sides) {
      const poly = new Polygon(x, y, radius, sides);
      this.scene.add(poly);
      return poly;
    }
    /**
     * @name Two#makeArcSegment
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} innerRadius
     * @param {Number} outerRadius
     * @param {Number} startAngle
     * @param {Number} endAngle
     * @param {Number} [resolution=Two.Resolution] - The number of vertices that should comprise the arc segment.
     * @returns {Two.ArcSegment}
     */
    makeArcSegment(x, y, innerRadius, outerRadius, startAngle, endAngle, resolution) {
      const arcSegment = new ArcSegment(
        x,
        y,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        resolution
      );
      this.scene.add(arcSegment);
      return arcSegment;
    }
    /**
     * @name Two#makePoints
     * @function
     * @param {Two.Vector[]} [points] - An array of {@link Two.Vector} points
     * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual agrguments. These will be combined into {@link Two.Vector}s for use in the points object.
     * @returns {Two.Points}
     * @description Creates a Two.js points object and adds it to the current scene.
     */
    makePoints(p) {
      const l = arguments.length;
      let vertices = p;
      if (!Array.isArray(p)) {
        vertices = [];
        for (let i = 0; i < l; i += 2) {
          const x = arguments[i];
          if (typeof x !== "number") {
            break;
          }
          const y = arguments[i + 1];
          vertices.push(new Vector(x, y));
        }
      }
      const points = new Points(vertices);
      this.scene.add(points);
      return points;
    }
    /**
     * @name Two#makePath
     * @function
     * @param {Two.Anchor[]} [points] - An array of {@link Two.Anchor} points
     * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into {@link Two.Anchor}s for use in the path.
     * @returns {Two.Path}
     * @description Creates a Two.js path and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
    makePath(p) {
      const l = arguments.length;
      let points = p;
      if (!Array.isArray(p)) {
        points = [];
        for (let i = 0; i < l; i += 2) {
          const x = arguments[i];
          if (typeof x !== "number") {
            break;
          }
          const y = arguments[i + 1];
          points.push(new Anchor(x, y));
        }
      }
      const last = arguments[l - 1];
      const path = new Path(
        points,
        !(typeof last === "boolean" ? last : void 0)
      );
      const rect = path.getBoundingClientRect();
      if (typeof rect.top === "number" && typeof rect.left === "number" && typeof rect.right === "number" && typeof rect.bottom === "number") {
        path.center().translation.set(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        );
      }
      this.scene.add(path);
      return path;
    }
    /**
     * @name Two#makeText
     * @function
     * @param {String} message
     * @param {Number} x
     * @param {Number} y
     * @param {Object} [styles] - An object to describe any of the {@link Two.Text.Properties} including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc..
     * @returns {Two.Text}
     * @description Creates a Two.js text object and adds it to the scene.
     */
    makeText(message, x, y, styles) {
      const text = new Text(message, x, y, styles);
      this.add(text);
      return text;
    }
    /**
     * @name Two#makeLinearGradient
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {...Two.Stop} args - Any number of color stops sometimes referred to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     * @returns {Two.LinearGradient}
     * @description Creates a Two.js linear gradient and adds it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     */
    makeLinearGradient(x1, y1, x2, y2) {
      const stops = Array.prototype.slice.call(arguments, 4);
      const gradient = new LinearGradient(x1, y1, x2, y2, stops);
      this.add(gradient);
      return gradient;
    }
    /**
     * @name Two#makeRadialGradient
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} radius
     * @param {...Two.Stop} args - Any number of color stops sometimes referred to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     * @returns {Two.RadialGradient}
     * @description Creates a Two.js linear-gradient object and adds it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     */
    makeRadialGradient(x1, y1, radius) {
      const stops = Array.prototype.slice.call(arguments, 3);
      const gradient = new RadialGradient(x1, y1, radius, stops);
      this.add(gradient);
      return gradient;
    }
    /**
     * @name Two#makeSprite
     * @function
     * @param {(String|Two.Texture)} src - The URL path to an image or an already created {@link Two.Texture}.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [columns=1]
     * @param {Number} [rows=1]
     * @param {Number} [frameRate=0]
     * @param {Boolean} [autostart=false]
     * @returns {Two.Sprite}
     * @description Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.
     */
    makeSprite(src, x, y, columns, rows, frameRate, autostart) {
      const sprite = new Sprite(src, x, y, columns, rows, frameRate);
      if (autostart) {
        sprite.play();
      }
      this.add(sprite);
      return sprite;
    }
    /**
     * @name Two#makeImage
     * @function
     * @param {(String|Two.Texture)} src - The URL path to an image or an already created {@link Two.Texture}.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {String} [mode="fill"]
     * @returns {Two.Image}
     * @description Creates a Two.js image object and adds it to the scene. Images are scaled to fit the provided width and height.
     */
    makeImage(src, x, y, width, height, mode) {
      const image = new Image2(src, x, y, width, height, mode);
      this.add(image);
      return image;
    }
    /**
     * @name Two#makeImageSequence
     * @function
     * @param {(String[]|Two.Texture[])} src - An array of paths or of {@link Two.Textures}.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [frameRate=0]
     * @param {Boolean} [autostart=false]
     * @returns {Two.ImageSequence}
     * @description Creates a Two.js image sequence object and adds it to the scene.
     */
    makeImageSequence(src, x, y, frameRate, autostart) {
      const imageSequence = new ImageSequence(src, x, y, frameRate);
      if (autostart) {
        imageSequence.play();
      }
      this.add(imageSequence);
      return imageSequence;
    }
    /**
     * @name Two#makeTexture
     * @function
     * @param {(String|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement)} [src] - The URL path to an image or a DOM image-like element.
     * @param {Function} [callback] - Function to be invoked when the image is loaded.
     * @returns {Two.Texture}
     * @description Creates a Two.js texture object.
     */
    makeTexture(src, callback) {
      const texture = new Texture(src, callback);
      return texture;
    }
    /**
     * @name Two#makeGroup
     * @function
     * @param {(Two.Shape[]|...Two.Shape)} [objects] - Two.js objects to be added to the group in the form of an array or as individual arguments.
     * @returns {Two.Group}
     * @description Creates a Two.js group object and adds it to the scene.
     */
    makeGroup(objects) {
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      }
      const group = new Group();
      this.scene.add(group);
      group.add(objects);
      return group;
    }
    /**
     * @name Two#interpret
     * @function
     * @param {SVGElement} svg - The SVG node to be parsed.
     * @param {Boolean} shallow - Don't create a top-most group but append all content directly.
     * @param {Boolean} [add=true] – Automatically add the reconstructed SVG node to scene.
     * @returns {Two.Group}
     * @description Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.
     */
    interpret(svg2, shallow, add) {
      const tag = svg2.tagName.toLowerCase();
      add = typeof add !== "undefined" ? add : true;
      if (!(tag in read)) {
        return null;
      }
      const node = read[tag].call(this, svg2);
      if (add) {
        this.add(shallow && node instanceof Group ? node.children : node);
      } else if (node.parent) {
        node.remove();
      }
      return node;
    }
    /**
     * @name Two#load
     * @function
     * @param {String|SVGElement} pathOrSVGContent - The URL path of an SVG file or an SVG document as text.
     * @param {Function} [callback] - Function to call once loading has completed.
     * @returns {Two.Group}
     * @description Load an SVG file or SVG text and interpret it into Two.js legible objects.
     */
    load(pathOrSVGContent, callback) {
      const group = new Group();
      let elem, i, child;
      const attach = function(data) {
        dom.temp.innerHTML = data;
        for (i = 0; i < dom.temp.children.length; i++) {
          elem = dom.temp.children[i];
          child = this.interpret(elem, false, false);
          if (child !== null) {
            group.add(child);
          }
        }
        if (typeof callback === "function") {
          const svg2 = dom.temp.children.length <= 1 ? dom.temp.children[0] : dom.temp.children;
          callback(group, svg2);
        }
      }.bind(this);
      if (/\.svg$/i.test(pathOrSVGContent)) {
        xhr(pathOrSVGContent, attach);
        return group;
      }
      attach(pathOrSVGContent);
      return group;
    }
  };
  function fitToWindow() {
    const wr = document.body.getBoundingClientRect();
    const width = this.width = wr.width;
    const height = this.height = wr.height;
    this.renderer.setSize(width, height, this.ratio);
  }
  function fitToParent() {
    const parent = this.renderer.domElement.parentElement;
    if (!parent) {
      console.warn("Two.js: Attempting to fit to parent, but no parent found.");
      return;
    }
    const wr = parent.getBoundingClientRect();
    const width = this.width = wr.width;
    const height = this.height = wr.height;
    this.renderer.setSize(width, height, this.ratio);
  }
  function updateDimensions(width, height) {
    this.width = width;
    this.height = height;
    this.trigger(Events.Types.resize, width, height);
  }
  var raf = dom.getRequestAnimationFrame();
  function loop() {
    for (let i = 0; i < Two.Instances.length; i++) {
      const t = Two.Instances[i];
      if (t.playing) {
        t.update();
      }
    }
    Two.NextFrameId = raf(loop);
  }
  raf.init = function() {
    loop();
    raf.init = function() {
    };
  };
  return __toCommonJS(two_exports);
})().default;
(function(){if(typeof exports==='object'&&typeof module!=='undefined'){module.exports=Two}})()