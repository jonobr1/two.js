/*
MIT License

Copyright (c) 2012 - 2021 @jonobr1 / http://jono.fyi

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
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module, temp2) => {
      return cache && cache.get(module) || (temp2 = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp2), temp2);
    };
  })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

  // src/two.js
  var two_exports = {};
  __export(two_exports, {
    default: () => two_default
  });

  // src/utils/path-commands.js
  var Commands = {
    move: "M",
    line: "L",
    curve: "C",
    arc: "A",
    close: "Z"
  };
  var path_commands_default = Commands;

  // src/utils/math.js
  var math_exports = {};
  __export(math_exports, {
    HALF_PI: () => HALF_PI,
    NumArray: () => NumArray,
    TWO_PI: () => TWO_PI,
    decomposeMatrix: () => decomposeMatrix,
    getComputedMatrix: () => getComputedMatrix,
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
  var root_default = root;

  // src/utils/math.js
  var Matrix;
  var TWO_PI = Math.PI * 2;
  var HALF_PI = Math.PI * 0.5;
  var decomposeMatrix = function(matrix3, b, c, d, e, f) {
    var a;
    if (arguments.length <= 1) {
      a = matrix3.a;
      b = matrix3.b;
      c = matrix3.c;
      d = matrix3.d;
      e = matrix3.e;
      f = matrix3.f;
    } else {
      a = matrix3;
    }
    return {
      translateX: e,
      translateY: f,
      scaleX: Math.sqrt(a * a + b * b),
      scaleY: Math.sqrt(c * c + d * d),
      rotation: 180 * Math.atan2(b, a) / Math.PI
    };
  };
  var setMatrix = function(M) {
    Matrix = M;
  };
  var getComputedMatrix = function(object, matrix3) {
    matrix3 = matrix3 && matrix3.identity() || new Matrix();
    var parent = object, matrices = [];
    while (parent && parent._matrix) {
      matrices.push(parent._matrix);
      parent = parent.parent;
    }
    matrices.reverse();
    for (var i = 0; i < matrices.length; i++) {
      var m = matrices[i];
      var e = m.elements;
      matrix3.multiply(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);
    }
    return matrix3;
  };
  var lerp = function(a, b, t) {
    return t * (b - a) + a;
  };
  var pots = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
  var getPoT = function(value) {
    var i = 0;
    while (pots[i] && pots[i] < value) {
      i++;
    }
    return pots[i];
  };
  var mod = function(v, l) {
    while (v < 0) {
      v += l;
    }
    return v % l;
  };
  var NumArray = root_default.Float32Array || Array;
  var floor = Math.floor;
  var toFixed = function(v) {
    return floor(v * 1e6) / 1e6;
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

  // src/utils/underscore.js
  var slice = Array.prototype.slice;
  var isArrayLike = function(collection) {
    if (collection === null || collection === void 0)
      return false;
    var length = collection.length;
    return typeof length == "number" && length >= 0 && length < 4294967296;
  };
  var _ = {
    isNaN: function(obj) {
      return typeof obj === "number" && obj !== +obj;
    },
    isElement: function(obj) {
      return !!(obj && obj.nodeType === 1);
    },
    isObject: function(obj) {
      var type = typeof obj;
      return type === "function" || type === "object" && !!obj;
    },
    extend: function(base) {
      var sources = slice.call(arguments, 1);
      for (var i = 0; i < sources.length; i++) {
        var obj = sources[i];
        for (var k in obj) {
          base[k] = obj[k];
        }
      }
      return base;
    },
    defaults: function(base) {
      var sources = slice.call(arguments, 1);
      for (var i = 0; i < sources.length; i++) {
        var obj = sources[i];
        for (var k in obj) {
          if (base[k] === void 0) {
            base[k] = obj[k];
          }
        }
      }
      return base;
    },
    each: function(obj, iteratee, context) {
      var ctx = context || this;
      var keys = !isArrayLike(obj) && Object.keys(obj);
      var length = (keys || obj).length;
      for (var i = 0; i < length; i++) {
        var k = keys ? keys[i] : i;
        iteratee.call(ctx, obj[k], k, obj);
      }
      return obj;
    },
    performance: root_default.performance && root_default.performance.now ? root_default.performance : Date
  };
  var underscore_default = _;

  // src/events.js
  var Events = {
    on: addEventListener,
    off: removeEventListener,
    trigger: function(name) {
      var scope = this;
      if (!scope._events)
        return scope;
      var args = Array.prototype.slice.call(arguments, 1);
      var events = scope._events[name];
      if (events)
        dispatch(scope, events, args);
      return scope;
    },
    listen: function(obj, name, handler) {
      var bound = this;
      if (obj) {
        var event = function() {
          handler.apply(bound, arguments);
        };
        event.obj = obj;
        event.name = name;
        event.handler = handler;
        obj.on(name, event);
      }
      return bound;
    },
    ignore: function(obj, name, handler) {
      var scope = this;
      obj.off(name, handler);
      return scope;
    },
    Types: {
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
    }
  };
  Events.bind = addEventListener;
  Events.unbind = removeEventListener;
  function addEventListener(name, handler) {
    var scope = this;
    scope._events || (scope._events = {});
    var list = scope._events[name] || (scope._events[name] = []);
    list.push(handler);
    return scope;
  }
  function removeEventListener(name, handler) {
    var scope = this;
    if (!scope._events) {
      return scope;
    }
    if (!name && !handler) {
      scope._events = {};
      return scope;
    }
    var names = name ? [name] : Object.keys(scope._events);
    for (var i = 0, l = names.length; i < l; i++) {
      name = names[i];
      var list = scope._events[name];
      if (list) {
        var events = [];
        if (handler) {
          for (var j = 0, k = list.length; j < k; j++) {
            var ev = list[j];
            ev = ev.handler ? ev.handler : ev;
            if (handler !== ev) {
              events.push(ev);
            }
          }
        }
        scope._events[name] = events;
      }
    }
    return scope;
  }
  function dispatch(obj, events, args) {
    var method;
    switch (args.length) {
      case 0:
        method = function(i2) {
          events[i2].call(obj, args[0]);
        };
        break;
      case 1:
        method = function(i2) {
          events[i2].call(obj, args[0], args[1]);
        };
        break;
      case 2:
        method = function(i2) {
          events[i2].call(obj, args[0], args[1], args[2]);
        };
        break;
      case 3:
        method = function(i2) {
          events[i2].call(obj, args[0], args[1], args[2], args[3]);
        };
        break;
      default:
        method = function(i2) {
          events[i2].apply(obj, args);
        };
    }
    for (var i = 0; i < events.length; i++) {
      method(i);
    }
  }
  var events_default = Events;

  // src/vector.js
  function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  underscore_default.extend(Vector, {
    zero: new Vector(),
    add: function(v1, v2) {
      return new Vector(v1.x + v2.x, v1.y + v2.y);
    },
    sub: function(v1, v2) {
      return new Vector(v1.x - v2.x, v1.y - v2.y);
    },
    subtract: function(v1, v2) {
      return Vector.sub(v1, v2);
    },
    ratioBetween: function(v1, v2) {
      return (v1.x * v2.x + v1.y * v2.y) / (v1.length() * v2.length());
    },
    angleBetween: function(v1, v2) {
      var dx, dy;
      if (arguments.length >= 4) {
        dx = arguments[0] - arguments[2];
        dy = arguments[1] - arguments[3];
        return Math.atan2(dy, dx);
      }
      dx = v1.x - v2.x;
      dy = v1.y - v2.y;
      return Math.atan2(dy, dx);
    },
    distanceBetween: function(v1, v2) {
      return Math.sqrt(Vector.distanceBetweenSquared(v1, v2));
    },
    distanceBetweenSquared: function(v1, v2) {
      var dx = v1.x - v2.x;
      var dy = v1.y - v2.y;
      return dx * dx + dy * dy;
    },
    MakeObservable: function(object) {
      object.bind = object.on = function() {
        if (!this._bound) {
          this._x = this.x;
          this._y = this.y;
          Object.defineProperty(this, "x", xgs);
          Object.defineProperty(this, "y", ygs);
          underscore_default.extend(this, BoundProto);
          this._bound = true;
        }
        events_default.bind.apply(this, arguments);
        return this;
      };
    }
  });
  underscore_default.extend(Vector.prototype, events_default, {
    constructor: Vector,
    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },
    copy: function(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    },
    clear: function() {
      this.x = 0;
      this.y = 0;
      return this;
    },
    clone: function() {
      return new Vector(this.x, this.y);
    },
    add: function(x, y) {
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
    },
    addSelf: function(v) {
      return this.add.apply(this, arguments);
    },
    sub: function(x, y) {
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
    },
    subtract: function() {
      return this.sub.apply(this, arguments);
    },
    subSelf: function(v) {
      return this.sub.apply(this, arguments);
    },
    subtractSelf: function(v) {
      return this.sub.apply(this, arguments);
    },
    multiply: function(x, y) {
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
    },
    multiplySelf: function(v) {
      return this.multiply.apply(this, arguments);
    },
    multiplyScalar: function(s) {
      return this.multiply(s);
    },
    divide: function(x, y) {
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
      if (underscore_default.isNaN(this.x)) {
        this.x = 0;
      }
      if (underscore_default.isNaN(this.y)) {
        this.y = 0;
      }
      return this;
    },
    divideSelf: function(v) {
      return this.divide.apply(this, arguments);
    },
    divideScalar: function(s) {
      return this.divide(s);
    },
    negate: function() {
      return this.multiply(-1);
    },
    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },
    length: function() {
      return Math.sqrt(this.lengthSquared());
    },
    lengthSquared: function() {
      return this.x * this.x + this.y * this.y;
    },
    normalize: function() {
      return this.divideScalar(this.length());
    },
    distanceTo: function(v) {
      return Math.sqrt(this.distanceToSquared(v));
    },
    distanceToSquared: function(v) {
      var dx = this.x - v.x, dy = this.y - v.y;
      return dx * dx + dy * dy;
    },
    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },
    equals: function(v, eps) {
      eps = typeof eps === "undefined" ? 1e-4 : eps;
      return this.distanceTo(v) < eps;
    },
    lerp: function(v, t) {
      var x = (v.x - this.x) * t + this.x;
      var y = (v.y - this.y) * t + this.y;
      return this.set(x, y);
    },
    isZero: function(eps) {
      eps = typeof eps === "undefined" ? 1e-4 : eps;
      return this.length() < eps;
    },
    toString: function() {
      return this.x + ", " + this.y;
    },
    toObject: function() {
      return { x: this.x, y: this.y };
    },
    rotate: function(Number2) {
      var cos7 = Math.cos(Number2);
      var sin7 = Math.sin(Number2);
      this.x = this.x * cos7 - this.y * sin7;
      this.y = this.x * sin7 + this.y * cos7;
      return this;
    }
  });
  var BoundProto = {
    constructor: Vector,
    set: function(x, y) {
      this._x = x;
      this._y = y;
      return this.trigger(events_default.Types.change);
    },
    copy: function(v) {
      this._x = v.x;
      this._y = v.y;
      return this.trigger(events_default.Types.change);
    },
    clear: function() {
      this._x = 0;
      this._y = 0;
      return this.trigger(events_default.Types.change);
    },
    clone: function() {
      return new Vector(this._x, this._y);
    },
    add: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (typeof x === "number") {
          this._x += x;
          this._y += x;
        } else if (x && typeof x.x === "number" && typeof x.y === "number") {
          this._x += x.x;
          this._y += x.y;
        }
      } else {
        this._x += x;
        this._y += y;
      }
      return this.trigger(events_default.Types.change);
    },
    sub: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (typeof x === "number") {
          this._x -= x;
          this._y -= x;
        } else if (x && typeof x.x === "number" && typeof x.y === "number") {
          this._x -= x.x;
          this._y -= x.y;
        }
      } else {
        this._x -= x;
        this._y -= y;
      }
      return this.trigger(events_default.Types.change);
    },
    multiply: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (typeof x === "number") {
          this._x *= x;
          this._y *= x;
        } else if (x && typeof x.x === "number" && typeof x.y === "number") {
          this._x *= x.x;
          this._y *= x.y;
        }
      } else {
        this._x *= x;
        this._y *= y;
      }
      return this.trigger(events_default.Types.change);
    },
    divide: function(x, y) {
      if (arguments.length <= 0) {
        return this;
      } else if (arguments.length <= 1) {
        if (typeof x === "number") {
          this._x /= x;
          this._y /= x;
        } else if (x && typeof x.x === "number" && typeof x.y === "number") {
          this._x /= x.x;
          this._y /= x.y;
        }
      } else {
        this._x /= x;
        this._y /= y;
      }
      if (underscore_default.isNaN(this._x)) {
        this._x = 0;
      }
      if (underscore_default.isNaN(this._y)) {
        this._y = 0;
      }
      return this.trigger(events_default.Types.change);
    },
    dot: function(v) {
      return this._x * v.x + this._y * v.y;
    },
    lengthSquared: function() {
      return this._x * this._x + this._y * this._y;
    },
    distanceToSquared: function(v) {
      var dx = this._x - v.x, dy = this._y - v.y;
      return dx * dx + dy * dy;
    },
    lerp: function(v, t) {
      var x = (v.x - this._x) * t + this._x;
      var y = (v.y - this._y) * t + this._y;
      return this.set(x, y);
    },
    toString: function() {
      return this._x + ", " + this._y;
    },
    toObject: function() {
      return { x: this._x, y: this._y };
    },
    rotate: function(Number2) {
      var cos7 = Math.cos(Number2);
      var sin7 = Math.sin(Number2);
      this._x = this._x * cos7 - this._y * sin7;
      this._y = this._x * sin7 + this._y * cos7;
      return this;
    }
  };
  var xgs = {
    enumerable: true,
    get: function() {
      return this._x;
    },
    set: function(v) {
      this._x = v;
      this.trigger(events_default.Types.change, "x");
    }
  };
  var ygs = {
    enumerable: true,
    get: function() {
      return this._y;
    },
    set: function(v) {
      this._y = v;
      this.trigger(events_default.Types.change, "y");
    }
  };
  Vector.MakeObservable(Vector.prototype);
  var vector_default = Vector;

  // src/anchor.js
  function Anchor(x, y, lx, ly, rx, ry, command) {
    vector_default.call(this, x, y);
    this._broadcast = function() {
      this.trigger(events_default.Types.change);
    }.bind(this);
    this._command = command || path_commands_default.move;
    this._relative = true;
    var ilx = typeof lx === "number";
    var ily = typeof ly === "number";
    var irx = typeof rx === "number";
    var iry = typeof ry === "number";
    if (ilx || ily || irx || iry) {
      Anchor.AppendCurveProperties(this);
    }
    if (ilx) {
      this.controls.left.x = lx;
    }
    if (ily) {
      this.controls.left.y = ly;
    }
    if (irx) {
      this.controls.right.x = rx;
    }
    if (iry) {
      this.controls.right.y = ry;
    }
  }
  underscore_default.extend(Anchor, {
    AppendCurveProperties: function(anchor2) {
      anchor2.relative = true;
      anchor2.controls = {};
      anchor2.controls.left = new vector_default(0, 0);
      anchor2.controls.right = new vector_default(0, 0);
    },
    MakeObservable: function(object) {
      Object.defineProperty(object, "command", {
        enumerable: true,
        get: function() {
          return this._command;
        },
        set: function(c) {
          this._command = c;
          if (this._command === path_commands_default.curve && !underscore_default.isObject(this.controls)) {
            Anchor.AppendCurveProperties(this);
          }
          this.trigger(events_default.Types.change);
        }
      });
      Object.defineProperty(object, "relative", {
        enumerable: true,
        get: function() {
          return this._relative;
        },
        set: function(b) {
          if (this._relative != b) {
            this._relative = !!b;
            this.trigger(events_default.Types.change);
          }
        }
      });
      underscore_default.extend(object, vector_default.prototype, AnchorProto);
      object.bind = object.on = function() {
        var bound = this._bound;
        vector_default.prototype.bind.apply(this, arguments);
        if (!bound) {
          underscore_default.extend(this, AnchorProto);
        }
      };
    }
  });
  var AnchorProto = {
    constructor: Anchor,
    listen: function() {
      if (!underscore_default.isObject(this.controls)) {
        Anchor.AppendCurveProperties(this);
      }
      this.controls.left.bind(events_default.Types.change, this._broadcast);
      this.controls.right.bind(events_default.Types.change, this._broadcast);
      return this;
    },
    ignore: function() {
      this.controls.left.unbind(events_default.Types.change, this._broadcast);
      this.controls.right.unbind(events_default.Types.change, this._broadcast);
      return this;
    },
    copy: function(v) {
      this.x = v.x;
      this.y = v.y;
      if (typeof v.command === "string") {
        this.command = v.command;
      }
      if (underscore_default.isObject(v.controls)) {
        if (!underscore_default.isObject(this.controls)) {
          Anchor.AppendCurveProperties(this);
        }
        this.controls.left.copy(v.controls.left);
        this.controls.right.copy(v.controls.right);
      }
      if (typeof v.relative === "boolean") {
        this.relative = v.relative;
      }
      if (this.command === path_commands_default.arc) {
        this.rx = v.rx;
        this.ry = v.ry;
        this.xAxisRotation = v.xAxisRotation;
        this.largeArcFlag = v.largeArcFlag;
        this.sweepFlag = v.sweepFlag;
      }
      return this;
    },
    clone: function() {
      var controls = this.controls;
      var clone = new Anchor(this.x, this.y, controls && controls.left.x, controls && controls.left.y, controls && controls.right.x, controls && controls.right.y, this.command);
      clone.relative = this._relative;
      return clone;
    },
    toObject: function() {
      var o = {
        x: this.x,
        y: this.y
      };
      if (this._command) {
        o.command = this._command;
      }
      if (this._relative) {
        o.relative = this._relative;
      }
      if (this.controls) {
        o.controls = {
          left: this.controls.left.toObject(),
          right: this.controls.right.toObject()
        };
      }
      return o;
    },
    toString: function() {
      if (!this.controls) {
        return [this._x, this._y].join(", ");
      }
      return [
        this._x,
        this._y,
        this.controls.left.x,
        this.controls.left.y,
        this.controls.right.x,
        this.controls.right.y,
        this._command,
        this._relative ? 1 : 0
      ].join(", ");
    }
  };
  Anchor.MakeObservable(Anchor.prototype);
  var anchor_default = Anchor;

  // src/constants.js
  var count = 0;
  var Constants = {
    nextFrameID: null,
    Types: {
      webgl: "WebGLRenderer",
      svg: "SVGRenderer",
      canvas: "CanvasRenderer"
    },
    Version: "v0.7.14",
    PublishDate: "2021-12-20T18:06:45.412Z",
    Identifier: "two-",
    Resolution: 12,
    AutoCalculateImportedMatrices: true,
    Instances: [],
    uniqueId: function() {
      return count++;
    }
  };
  var constants_default = Constants;

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
    abscissas: [
      [0.5773502691896257],
      [0, 0.7745966692414834],
      [0.33998104358485626, 0.8611363115940526],
      [0, 0.5384693101056831, 0.906179845938664],
      [0.2386191860831969, 0.6612093864662645, 0.932469514203152],
      [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585],
      [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363],
      [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261],
      [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717],
      [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057],
      [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192],
      [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881],
      [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123],
      [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854],
      [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499]
    ],
    weights: [
      [1],
      [0.8888888888888888, 0.5555555555555556],
      [0.6521451548625461, 0.34785484513745385],
      [0.5688888888888889, 0.47862867049936647, 0.23692688505618908],
      [0.46791393457269104, 0.3607615730481386, 0.17132449237917036],
      [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697],
      [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626],
      [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441],
      [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814],
      [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366],
      [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183],
      [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588],
      [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186],
      [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727],
      [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096]
    ]
  };
  var getComponentOnCubicBezier = function(t, a, b, c, d) {
    var k = 1 - t;
    return k * k * k * a + 3 * k * k * t * b + 3 * k * t * t * c + t * t * t * d;
  };
  var subdivide = function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {
    limit = limit || Curve.RecursionLimit;
    var amount = limit + 1;
    if (Math.abs(x1 - x4) < 1e-3 && Math.abs(y1 - y4) < 1e-3) {
      return [new anchor_default(x4, y4)];
    }
    var result = [];
    for (var i = 0; i < amount; i++) {
      var t = i / amount;
      var x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
      var y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
      result.push(new anchor_default(x, y));
    }
    return result;
  };
  var getCurveLength = function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {
    if (x1 === x2 && y1 === y2 && x3 === x4 && y3 === y4) {
      var dx = x4 - x1;
      var dy = y4 - y1;
      return Math.sqrt(dx * dx + dy * dy);
    }
    var ax = 9 * (x2 - x3) + 3 * (x4 - x1), bx = 6 * (x1 + x3) - 12 * x2, cx = 3 * (x2 - x1), ay = 9 * (y2 - y3) + 3 * (y4 - y1), by = 6 * (y1 + y3) - 12 * y2, cy = 3 * (y2 - y1);
    var integrand = function(t) {
      var dx2 = (ax * t + bx) * t + cx, dy2 = (ay * t + by) * t + cy;
      return Math.sqrt(dx2 * dx2 + dy2 * dy2);
    };
    return integrate(integrand, 0, 1, limit || Curve.RecursionLimit);
  };
  var getCurveBoundingBox = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    var tvalues = [];
    var bounds = [[], []];
    var a, b, c, t, t1, t2, b2ac, sqrtb2ac;
    for (var i = 0; i < 2; ++i) {
      if (i == 0) {
        b = 6 * x1 - 12 * x2 + 6 * x3;
        a = -3 * x1 + 9 * x2 - 9 * x3 + 3 * x4;
        c = 3 * x2 - 3 * x1;
      } else {
        b = 6 * y1 - 12 * y2 + 6 * y3;
        a = -3 * y1 + 9 * y2 - 9 * y3 + 3 * y4;
        c = 3 * y2 - 3 * y1;
      }
      if (Math.abs(a) < 1e-12) {
        if (Math.abs(b) < 1e-12) {
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
    var j = tvalues.length;
    var jlen = j;
    var mt;
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
  };
  var integrate = function(f, a, b, n) {
    var x = Curve.abscissas[n - 2], w = Curve.weights[n - 2], A = 0.5 * (b - a), B = A + a, i = 0, m = n + 1 >> 1, sum = n & 1 ? w[i++] * f(B) : 0;
    while (i < m) {
      var Ax = A * x[i];
      sum += w[i++] * (f(B + Ax) + f(B - Ax));
    }
    return A * sum;
  };
  var getCurveFromPoints = function(points, closed2) {
    var l = points.length, last = l - 1;
    for (var i = 0; i < l; i++) {
      var point = points[i];
      if (!underscore_default.isObject(point.controls)) {
        anchor_default.AppendCurveProperties(point);
      }
      var prev = closed2 ? mod(i - 1, l) : Math.max(i - 1, 0);
      var next = closed2 ? mod(i + 1, l) : Math.min(i + 1, last);
      var a = points[prev];
      var b = point;
      var c = points[next];
      getControlPoints(a, b, c);
      b.command = i === 0 ? path_commands_default.move : path_commands_default.curve;
    }
  };
  var getControlPoints = function(a, b, c) {
    var a1 = vector_default.angleBetween(a, b);
    var a2 = vector_default.angleBetween(c, b);
    var d1 = vector_default.distanceBetween(a, b);
    var d2 = vector_default.distanceBetween(c, b);
    var mid = (a1 + a2) / 2;
    if (d1 < 1e-4 || d2 < 1e-4) {
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
  };
  var getReflection = function(a, b, relative) {
    return new vector_default(2 * a.x - (b.x + a.x) - (relative ? a.x : 0), 2 * a.y - (b.y + a.y) - (relative ? a.y : 0));
  };
  var getAnchorsFromArcData = function(center, xAxisRotation, rx, ry, ts, td, ccw) {
    var resolution = constants_default.Resolution;
    var anchors = [];
    for (var i = 0; i < resolution; i++) {
      var pct = (i + 1) / resolution;
      if (ccw) {
        pct = 1 - pct;
      }
      var theta = pct * td + ts;
      var x = rx * Math.cos(theta);
      var y = ry * Math.sin(theta);
      var anchor2 = new anchor_default(x, y);
      anchor_default.AppendCurveProperties(anchor2);
      anchor2.command = path_commands_default.line;
      anchors.push(anchor2);
    }
  };

  // src/utils/get-ratio.js
  var devicePixelRatio = root_default.devicePixelRatio || 1;
  var getBackingStoreRatio = function(ctx) {
    return ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  };
  var getRatio = function(ctx) {
    return devicePixelRatio / getBackingStoreRatio(ctx);
  };
  var get_ratio_default = getRatio;

  // src/matrix.js
  var cos = Math.cos;
  var sin = Math.sin;
  var tan = Math.tan;
  var array = [];
  function Matrix2(a, b, c, d, e, f) {
    this.elements = new NumArray(9);
    var elements = a;
    if (!Array.isArray(elements)) {
      elements = Array.prototype.slice.call(arguments);
    }
    this.identity();
    if (elements.length > 0) {
      this.set(elements);
    }
  }
  setMatrix(Matrix2);
  underscore_default.extend(Matrix2, {
    Identity: [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ],
    Multiply: function(A, B, C) {
      if (B.length <= 3) {
        var x, y, z, e = A;
        var a = B[0] || 0, b = B[1] || 0, c = B[2] || 0;
        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;
        return { x, y, z };
      }
      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];
      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];
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
  });
  underscore_default.extend(Matrix2.prototype, events_default, {
    constructor: Matrix2,
    manual: false,
    set: function(a, b, c, d, e, f, g, h, i) {
      var elements;
      if (typeof b === "undefined") {
        elements = a;
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
      return this.trigger(events_default.Types.change);
    },
    copy: function(m) {
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
      return this.trigger(events_default.Types.change);
    },
    identity: function() {
      this.elements[0] = Matrix2.Identity[0];
      this.elements[1] = Matrix2.Identity[1];
      this.elements[2] = Matrix2.Identity[2];
      this.elements[3] = Matrix2.Identity[3];
      this.elements[4] = Matrix2.Identity[4];
      this.elements[5] = Matrix2.Identity[5];
      this.elements[6] = Matrix2.Identity[6];
      this.elements[7] = Matrix2.Identity[7];
      this.elements[8] = Matrix2.Identity[8];
      return this.trigger(events_default.Types.change);
    },
    multiply: function(a, b, c, d, e, f, g, h, i) {
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
        return this.trigger(events_default.Types.change);
      }
      if (typeof d === "undefined") {
        var x, y, z;
        a = a || 0;
        b = b || 0;
        c = c || 0;
        e = this.elements;
        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;
        return { x, y, z };
      }
      var A = this.elements;
      var B = [a, b, c, d, e, f, g, h, i];
      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];
      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];
      this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
      this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
      this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;
      this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
      this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
      this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;
      this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
      this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
      this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;
      return this.trigger(events_default.Types.change);
    },
    inverse: function(out) {
      var a = this.elements;
      out = out || new Matrix2();
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      var b01 = a22 * a11 - a12 * a21;
      var b11 = -a22 * a10 + a12 * a20;
      var b21 = a21 * a10 - a11 * a20;
      var det = a00 * b01 + a01 * b11 + a02 * b21;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out.elements[0] = b01 * det;
      out.elements[1] = (-a22 * a01 + a02 * a21) * det;
      out.elements[2] = (a12 * a01 - a02 * a11) * det;
      out.elements[3] = b11 * det;
      out.elements[4] = (a22 * a00 - a02 * a20) * det;
      out.elements[5] = (-a12 * a00 + a02 * a10) * det;
      out.elements[6] = b21 * det;
      out.elements[7] = (-a21 * a00 + a01 * a20) * det;
      out.elements[8] = (a11 * a00 - a01 * a10) * det;
      return out;
    },
    scale: function(sx, sy) {
      var l = arguments.length;
      if (l <= 1) {
        sy = sx;
      }
      return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);
    },
    rotate: function(Number2) {
      var c = cos(Number2);
      var s = sin(Number2);
      return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);
    },
    translate: function(x, y) {
      return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);
    },
    skewX: function(Number2) {
      var a = tan(Number2);
      return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);
    },
    skewY: function(Number2) {
      var a = tan(Number2);
      return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);
    },
    toString: function(fullMatrix) {
      array.length = 0;
      this.toTransformArray(fullMatrix, array);
      return array.map(toFixed).join(" ");
    },
    toTransformArray: function(fullMatrix, output) {
      var elements = this.elements;
      var hasOutput = !!output;
      var a = elements[0];
      var b = elements[1];
      var c = elements[2];
      var d = elements[3];
      var e = elements[4];
      var f = elements[5];
      if (fullMatrix) {
        var g = elements[6];
        var h = elements[7];
        var i = elements[8];
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
        return [
          a,
          d,
          g,
          b,
          e,
          h,
          c,
          f,
          i
        ];
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
      ];
    },
    toArray: function(fullMatrix, output) {
      var elements = this.elements;
      var hasOutput = !!output;
      var a = elements[0];
      var b = elements[1];
      var c = elements[2];
      var d = elements[3];
      var e = elements[4];
      var f = elements[5];
      if (fullMatrix) {
        var g = elements[6];
        var h = elements[7];
        var i = elements[8];
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
        return [
          a,
          b,
          c,
          d,
          e,
          f,
          g,
          h,
          i
        ];
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
      return [
        a,
        b,
        c,
        d,
        e,
        f
      ];
    },
    toObject: function() {
      return {
        elements: this.toArray(true),
        manual: !!this.manual
      };
    },
    clone: function() {
      return new Matrix2().copy(this);
    }
  });
  var matrix_default = Matrix2;

  // src/shape.js
  function Shape() {
    this.renderer = {};
    this._renderer.flagMatrix = Shape.FlagMatrix.bind(this);
    this.isShape = true;
    this.id = constants_default.Identifier + constants_default.uniqueId();
    this.classList = [];
    this.matrix = new matrix_default();
    this.translation = new vector_default();
    this.rotation = 0;
    this.scale = 1;
    this.skewX = 0;
    this.skewY = 0;
  }
  underscore_default.extend(Shape, {
    FlagMatrix: function() {
      this._flagMatrix = true;
    },
    MakeObservable: function(object) {
      var translation = {
        enumerable: false,
        get: function() {
          return this._translation;
        },
        set: function(v) {
          if (this._translation) {
            this._translation.unbind(events_default.Types.change, this._renderer.flagMatrix);
          }
          this._translation = v;
          this._translation.bind(events_default.Types.change, this._renderer.flagMatrix);
          Shape.FlagMatrix.call(this);
        }
      };
      Object.defineProperty(object, "translation", translation);
      Object.defineProperty(object, "position", translation);
      Object.defineProperty(object, "rotation", {
        enumerable: true,
        get: function() {
          return this._rotation;
        },
        set: function(v) {
          this._rotation = v;
          this._flagMatrix = true;
        }
      });
      Object.defineProperty(object, "scale", {
        enumerable: true,
        get: function() {
          return this._scale;
        },
        set: function(v) {
          if (this._scale instanceof vector_default) {
            this._scale.unbind(events_default.Types.change, this._renderer.flagMatrix);
          }
          this._scale = v;
          if (this._scale instanceof vector_default) {
            this._scale.bind(events_default.Types.change, this._renderer.flagMatrix);
          }
          this._flagMatrix = true;
          this._flagScale = true;
        }
      });
      Object.defineProperty(object, "skewX", {
        enumerable: true,
        get: function() {
          return this._skewX;
        },
        set: function(v) {
          this._skewX = v;
          this._flagMatrix = true;
        }
      });
      Object.defineProperty(object, "skewY", {
        enumerable: true,
        get: function() {
          return this._skewY;
        },
        set: function(v) {
          this._skewY = v;
          this._flagMatrix = true;
        }
      });
      Object.defineProperty(object, "matrix", {
        enumerable: true,
        get: function() {
          return this._matrix;
        },
        set: function(v) {
          this._matrix = v;
          this._flagMatrix = true;
        }
      });
      Object.defineProperty(object, "id", {
        enumerable: true,
        get: function() {
          return this._id;
        },
        set: function(v) {
          var id = this._id;
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
      });
      Object.defineProperty(object, "className", {
        enumerable: true,
        get: function() {
          return this._className;
        },
        set: function(v) {
          this._flagClassName = this._className !== v;
          if (this._flagClassName) {
            var prev = this._className.split(/\s+?/);
            var dest = v.split(/\s+?/);
            for (var i = 0; i < prev.length; i++) {
              var className = prev[i];
              var index = Array.prototype.indexOf.call(this.classList, className);
              if (index >= 0) {
                this.classList.splice(index, 1);
              }
            }
            this.classList = this.classList.concat(dest);
          }
          this._className = v;
        }
      });
      Object.defineProperty(object, "renderer", {
        enumerable: false,
        get: function() {
          return this._renderer;
        },
        set: function(obj) {
          this._renderer = obj;
        }
      });
    }
  });
  underscore_default.extend(Shape.prototype, events_default, {
    constructor: Shape,
    _flagId: true,
    _flagMatrix: true,
    _flagScale: false,
    _flagClassName: false,
    _id: "",
    _translation: null,
    _rotation: 0,
    _scale: 1,
    _skewX: 0,
    _skewY: 0,
    _className: "",
    addTo: function(group) {
      group.add(this);
      return this;
    },
    clone: function(parent) {
      var clone = new Shape();
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
    },
    _update: function(bubbles) {
      if (!this._matrix.manual && this._flagMatrix) {
        this._matrix.identity().translate(this.translation.x, this.translation.y);
        if (this._scale instanceof vector_default) {
          this._matrix.scale(this._scale.x, this._scale.y);
        } else {
          this._matrix.scale(this._scale);
        }
        this._matrix.rotate(this.rotation);
        this._matrix.skewX(this.skewX);
        this._matrix.skewY(this.skewY);
      }
      if (bubbles) {
        if (this.parent && this.parent._update) {
          this.parent._update();
        }
      }
      return this;
    },
    flagReset: function() {
      this._flagId = this._flagMatrix = this._flagScale = this._flagClassName = false;
      return this;
    }
  });
  Shape.MakeObservable(Shape.prototype);
  var shape_default = Shape;

  // src/collection.js
  function Collection() {
    Array.call(this);
    if (arguments[0] && Array.isArray(arguments[0])) {
      if (arguments[0].length > 0) {
        Array.prototype.push.apply(this, arguments[0]);
      }
    } else if (arguments.length > 0) {
      Array.prototype.push.apply(this, arguments);
    }
  }
  Collection.prototype = new Array();
  underscore_default.extend(Collection.prototype, events_default, {
    constructor: Collection,
    pop: function() {
      var popped = Array.prototype.pop.apply(this, arguments);
      this.trigger(events_default.Types.remove, [popped]);
      return popped;
    },
    shift: function() {
      var shifted = Array.prototype.shift.apply(this, arguments);
      this.trigger(events_default.Types.remove, [shifted]);
      return shifted;
    },
    push: function() {
      var pushed = Array.prototype.push.apply(this, arguments);
      this.trigger(events_default.Types.insert, arguments);
      return pushed;
    },
    unshift: function() {
      var unshifted = Array.prototype.unshift.apply(this, arguments);
      this.trigger(events_default.Types.insert, arguments);
      return unshifted;
    },
    splice: function() {
      var spliced = Array.prototype.splice.apply(this, arguments);
      var inserted;
      this.trigger(events_default.Types.remove, spliced);
      if (arguments.length > 2) {
        inserted = this.slice(arguments[0], arguments[0] + arguments.length - 2);
        this.trigger(events_default.Types.insert, inserted);
        this.trigger(events_default.Types.order);
      }
      return spliced;
    },
    sort: function() {
      Array.prototype.sort.apply(this, arguments);
      this.trigger(events_default.Types.order);
      return this;
    },
    reverse: function() {
      Array.prototype.reverse.apply(this, arguments);
      this.trigger(events_default.Types.order);
      return this;
    },
    indexOf: function() {
      return Array.prototype.indexOf.apply(this, arguments);
    }
  });
  var collection_default = Collection;

  // src/children.js
  function Children(children) {
    collection_default.apply(this, arguments);
    Object.defineProperty(this, "_events", {
      value: {},
      enumerable: false
    });
    this.ids = {};
    this.attach(Array.isArray(children) ? children : Array.prototype.slice.call(arguments));
    this.on(events_default.Types.insert, this.attach);
    this.on(events_default.Types.remove, this.detach);
  }
  Children.prototype = new collection_default();
  underscore_default.extend(Children.prototype, {
    constructor: Children,
    attach: function(children) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child && child.id) {
          this.ids[child.id] = child;
        }
      }
      return this;
    },
    detach: function(children) {
      for (var i = 0; i < children.length; i++) {
        delete this.ids[children[i].id];
      }
      return this;
    }
  });
  var children_default = Children;

  // src/group.js
  var min = Math.min;
  var max = Math.max;
  function Group(children) {
    shape_default.call(this);
    this._renderer.type = "group";
    this.additions = [];
    this.subtractions = [];
    this.children = Array.isArray(children) ? children : Array.prototype.slice.call(arguments);
  }
  underscore_default.extend(Group, {
    Children: children_default,
    InsertChildren: function(children) {
      for (var i = 0; i < children.length; i++) {
        replaceParent.call(this, children[i], this);
      }
    },
    RemoveChildren: function(children) {
      for (var i = 0; i < children.length; i++) {
        replaceParent.call(this, children[i]);
      }
    },
    OrderChildren: function(children) {
      this._flagOrder = true;
    },
    Properties: [
      "fill",
      "stroke",
      "linewidth",
      "cap",
      "join",
      "miter",
      "closed",
      "curved",
      "automatic"
    ],
    MakeObservable: function(object) {
      var properties = Group.Properties;
      Object.defineProperty(object, "visible", {
        enumerable: true,
        get: function() {
          return this._visible;
        },
        set: function(v) {
          this._flagVisible = this._visible !== v || this._flagVisible;
          this._visible = v;
        }
      });
      Object.defineProperty(object, "opacity", {
        enumerable: true,
        get: function() {
          return this._opacity;
        },
        set: function(v) {
          this._flagOpacity = this._opacity !== v || this._flagOpacity;
          this._opacity = v;
        }
      });
      Object.defineProperty(object, "beginning", {
        enumerable: true,
        get: function() {
          return this._beginning;
        },
        set: function(v) {
          this._flagBeginning = this._beginning !== v || this._flagBeginning;
          this._beginning = v;
        }
      });
      Object.defineProperty(object, "ending", {
        enumerable: true,
        get: function() {
          return this._ending;
        },
        set: function(v) {
          this._flagEnding = this._ending !== v || this._flagEnding;
          this._ending = v;
        }
      });
      Object.defineProperty(object, "length", {
        enumerable: true,
        get: function() {
          if (this._flagLength || this._length <= 0) {
            this._length = 0;
            if (!this.children) {
              return this._length;
            }
            for (var i = 0; i < this.children.length; i++) {
              var child = this.children[i];
              this._length += child.length;
            }
          }
          return this._length;
        }
      });
      shape_default.MakeObservable(object);
      Group.MakeGetterSetters(object, properties);
      Object.defineProperty(object, "children", {
        enumerable: true,
        get: function() {
          return this._children;
        },
        set: function(children) {
          var insertChildren = Group.InsertChildren.bind(this);
          var removeChildren = Group.RemoveChildren.bind(this);
          var orderChildren = Group.OrderChildren.bind(this);
          if (this._children) {
            this._children.unbind();
            if (this._children.length > 0) {
              removeChildren(this._children);
            }
          }
          this._children = new children_default(children);
          this._children.bind(events_default.Types.insert, insertChildren);
          this._children.bind(events_default.Types.remove, removeChildren);
          this._children.bind(events_default.Types.order, orderChildren);
          if (children.length > 0) {
            insertChildren(children);
          }
        }
      });
      Object.defineProperty(object, "mask", {
        enumerable: true,
        get: function() {
          return this._mask;
        },
        set: function(v) {
          if (this._mask) {
            this._mask.clip = false;
          }
          this._mask = v;
          this._flagMask = true;
          if (v && !v.clip) {
            v.clip = true;
          }
        }
      });
    },
    MakeGetterSetters: function(group, properties) {
      if (!Array.isArray(properties)) {
        properties = [properties];
      }
      underscore_default.each(properties, function(k) {
        Group.MakeGetterSetter(group, k);
      });
    },
    MakeGetterSetter: function(group, key) {
      var secret = "_" + key;
      Object.defineProperty(group, key, {
        enumerable: true,
        get: function() {
          return this[secret];
        },
        set: function(v) {
          this[secret] = v;
          for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child[key] = v;
          }
        }
      });
    }
  });
  underscore_default.extend(Group.prototype, shape_default.prototype, {
    constructor: Group,
    _flagAdditions: false,
    _flagSubtractions: false,
    _flagOrder: false,
    _flagOpacity: true,
    _flagBeginning: false,
    _flagEnding: false,
    _flagLength: false,
    _flagMask: false,
    _fill: "#fff",
    _stroke: "#000",
    _linewidth: 1,
    _opacity: 1,
    _visible: true,
    _cap: "round",
    _join: "round",
    _miter: 4,
    _closed: true,
    _curved: false,
    _automatic: true,
    _beginning: 0,
    _ending: 1,
    _length: 0,
    _mask: null,
    clone: function(parent) {
      var clone = new Group();
      var children = this.children.map(function(child) {
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
    },
    toObject: function() {
      var result = {
        children: [],
        translation: this.translation.toObject(),
        rotation: this.rotation,
        scale: this.scale instanceof vector_default ? this.scale.toObject() : this.scale,
        opacity: this.opacity,
        className: this.className,
        mask: this.mask ? this.mask.toObject() : null
      };
      if (this.matrix.manual) {
        result.matrix = this.matrix.toObject();
      }
      underscore_default.each(this.children, function(child, i) {
        result.children[i] = child.toObject();
      }, this);
      return result;
    },
    corner: function() {
      var rect = this.getBoundingClientRect(true);
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        child.translation.x -= rect.left;
        child.translation.y -= rect.top;
      }
      if (this.mask) {
        this.mask.translation.x -= rect.left;
        this.mask.translation.y -= rect.top;
      }
      return this;
    },
    center: function() {
      var rect = this.getBoundingClientRect(true);
      var cx = rect.left + rect.width / 2 - this.translation.x;
      var cy = rect.top + rect.height / 2 - this.translation.y;
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
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
    },
    getById: function(id) {
      var found = null;
      function search(node) {
        if (node.id === id) {
          return node;
        } else if (node.children) {
          for (var i = 0; i < node.children.length; i++) {
            found = search(node.children[i]);
            if (found) {
              return found;
            }
          }
        }
        return null;
      }
      return search(this);
    },
    getByClassName: function(className) {
      var found = [];
      function search(node) {
        if (Array.prototype.indexOf.call(node.classList, className) >= 0) {
          found.push(node);
        }
        if (node.children) {
          for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            search(child);
          }
        }
        return found;
      }
      return search(this);
    },
    getByType: function(type) {
      var found = [];
      function search(node) {
        if (node instanceof type) {
          found.push(node);
        }
        if (node.children) {
          for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            search(child);
          }
        }
        return found;
      }
      return search(this);
    },
    add: function(objects) {
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      } else {
        objects = objects.slice();
      }
      for (var i = 0; i < objects.length; i++) {
        var child = objects[i];
        if (!(child && child.id)) {
          continue;
        }
        var index = Array.prototype.indexOf.call(this.children, child);
        if (index >= 0) {
          this.children.splice(index, 1);
        }
        this.children.push(child);
      }
      return this;
    },
    remove: function(objects) {
      var l = arguments.length, grandparent = this.parent;
      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      } else {
        objects = objects.slice();
      }
      for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        if (!object || !this.children.ids[object.id]) {
          continue;
        }
        var index = this.children.indexOf(object);
        if (index >= 0) {
          this.children.splice(index, 1);
        }
      }
      return this;
    },
    getBoundingClientRect: function(shallow) {
      var rect, matrix3, a, b, c, d, tc, lc, rc, bc;
      this._update(true);
      var left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
      var regex3 = /texture|gradient/i;
      matrix3 = shallow ? this._matrix : getComputedMatrix(this);
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (!child.visible || regex3.test(child._renderer.type)) {
          continue;
        }
        rect = child.getBoundingClientRect(shallow);
        tc = typeof rect.top !== "number" || underscore_default.isNaN(rect.top) || !isFinite(rect.top);
        lc = typeof rect.left !== "number" || underscore_default.isNaN(rect.left) || !isFinite(rect.left);
        rc = typeof rect.right !== "number" || underscore_default.isNaN(rect.right) || !isFinite(rect.right);
        bc = typeof rect.bottom !== "number" || underscore_default.isNaN(rect.bottom) || !isFinite(rect.bottom);
        if (tc || lc || rc || bc) {
          continue;
        }
        top = min(rect.top, top);
        left = min(rect.left, left);
        right = max(rect.right, right);
        bottom = max(rect.bottom, bottom);
      }
      if (shallow) {
        a = matrix3.multiply(left, top, 1);
        b = matrix3.multiply(left, bottom, 1);
        c = matrix3.multiply(right, top, 1);
        d = matrix3.multiply(right, bottom, 1);
        top = min(a.y, b.y, c.y, d.y);
        left = min(a.x, b.x, c.x, d.x);
        right = max(a.x, b.x, c.x, d.x);
        bottom = max(a.y, b.y, c.y, d.y);
      }
      return {
        top,
        left,
        right,
        bottom,
        width: right - left,
        height: bottom - top
      };
    },
    noFill: function() {
      this.children.forEach(function(child) {
        child.noFill();
      });
      return this;
    },
    noStroke: function() {
      this.children.forEach(function(child) {
        child.noStroke();
      });
      return this;
    },
    subdivide: function() {
      var args = arguments;
      this.children.forEach(function(child) {
        child.subdivide.apply(child, args);
      });
      return this;
    },
    _update: function() {
      var i, l, child;
      if (this._flagBeginning || this._flagEnding) {
        var beginning = Math.min(this._beginning, this._ending);
        var ending = Math.max(this._beginning, this._ending);
        var length = this.length;
        var sum = 0;
        var bd = beginning * length;
        var ed = ending * length;
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
      return shape_default.prototype._update.apply(this, arguments);
    },
    flagReset: function() {
      if (this._flagAdditions) {
        this.additions.length = 0;
        this._flagAdditions = false;
      }
      if (this._flagSubtractions) {
        this.subtractions.length = 0;
        this._flagSubtractions = false;
      }
      this._flagOrder = this._flagMask = this._flagOpacity = this._flagBeginning = this._flagEnding = false;
      shape_default.prototype.flagReset.call(this);
      return this;
    }
  });
  Group.MakeObservable(Group.prototype);
  function replaceParent(child, newParent) {
    var parent = child.parent;
    var index;
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
  var group_default = Group;

  // src/renderers/canvas.js
  var matrix = new matrix_default();
  var emptyArray = [];
  var max2 = Math.max;
  var min2 = Math.min;
  var abs = Math.abs;
  var sin2 = Math.sin;
  var cos2 = Math.cos;
  var acos = Math.acos;
  var sqrt = Math.sqrt;
  var isDefaultMatrix = function(m) {
    return m[0] == 1 && m[3] == 0 && m[1] == 0 && m[4] == 1 && m[2] == 0 && m[5] == 0;
  };
  var canvas = {
    isHidden: /(undefined|none|transparent)/i,
    alignments: {
      left: "start",
      middle: "center",
      right: "end"
    },
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
    group: {
      renderChild: function(child) {
        canvas[child._renderer.type].render.call(child, this.ctx, true, this.clip);
      },
      render: function(ctx) {
        if (!this._visible) {
          return this;
        }
        this._update();
        var matrix3 = this._matrix.elements;
        var parent = this.parent;
        this._renderer.opacity = this._opacity * (parent && parent._renderer ? parent._renderer.opacity : 1);
        var mask = this._mask;
        var defaultMatrix = isDefaultMatrix(matrix3);
        var shouldIsolate = !defaultMatrix || !!mask;
        if (!this._renderer.context) {
          this._renderer.context = {};
        }
        this._renderer.context.ctx = ctx;
        if (shouldIsolate) {
          ctx.save();
          if (!defaultMatrix) {
            ctx.transform(matrix3[0], matrix3[3], matrix3[1], matrix3[4], matrix3[2], matrix3[5]);
          }
        }
        if (mask) {
          canvas[mask._renderer.type].render.call(mask, ctx, true);
        }
        if (this._opacity > 0 && this._scale !== 0) {
          for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            canvas[child._renderer.type].render.call(child, ctx);
          }
        }
        if (shouldIsolate) {
          ctx.restore();
        }
        return this.flagReset();
      }
    },
    path: {
      render: function(ctx, forced, parentClipped) {
        var matrix3, stroke, linewidth, fill, opacity, visible, cap, join, miter, closed2, commands, length, last, prev, a, b, c, d, ux, uy, vx, vy, ar, bl, br, cl, x, y, mask, clip, defaultMatrix, isOffset, dashes, po;
        po = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1;
        mask = this._mask;
        clip = this._clip;
        opacity = this._opacity * (po || 1);
        visible = this._visible;
        if (!forced && (!visible || clip || opacity === 0)) {
          return this;
        }
        this._update();
        matrix3 = this._matrix.elements;
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
        defaultMatrix = isDefaultMatrix(matrix3);
        dashes = this.dashes;
        if (!defaultMatrix) {
          ctx.save();
          ctx.transform(matrix3[0], matrix3[3], matrix3[1], matrix3[4], matrix3[2], matrix3[5]);
        }
        if (mask) {
          canvas[mask._renderer.type].render.call(mask, ctx, true);
        }
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            canvas[fill._renderer.type].render.call(fill, ctx, this);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            canvas[stroke._renderer.type].render.call(stroke, ctx, this);
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
        for (var i = 0; i < length; i++) {
          b = commands[i];
          x = b.x;
          y = b.y;
          switch (b.command) {
            case path_commands_default.close:
              ctx.closePath();
              break;
            case path_commands_default.arc:
              var rx = b.rx;
              var ry = b.ry;
              var xAxisRotation = b.xAxisRotation;
              var largeArcFlag = b.largeArcFlag;
              var sweepFlag = b.sweepFlag;
              prev = closed2 ? mod(i - 1, length) : max2(i - 1, 0);
              a = commands[prev];
              var ax = a.x;
              var ay = a.y;
              canvas.renderSvgArcCommand(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y);
              break;
            case path_commands_default.curve:
              prev = closed2 ? mod(i - 1, length) : Math.max(i - 1, 0);
              a = commands[prev];
              ar = a.controls && a.controls.right || vector_default.zero;
              bl = b.controls && b.controls.left || vector_default.zero;
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
                br = b.controls && b.controls.right || vector_default.zero;
                cl = c.controls && c.controls.left || vector_default.zero;
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
            case path_commands_default.line:
              ctx.lineTo(x, y);
              break;
            case path_commands_default.move:
              d = b;
              ctx.moveTo(x, y);
              break;
          }
        }
        if (closed2) {
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
              ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
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
        return this.flagReset();
      }
    },
    points: {
      render: function(ctx, forced, parentClipped) {
        var me, stroke, linewidth, fill, opacity, visible, size, commands, length, b, x, y, defaultMatrix, isOffset, dashes, po;
        po = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1;
        opacity = this._opacity * (po || 1);
        visible = this._visible;
        if (!forced && (!visible || opacity === 0)) {
          return this;
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
            canvas[fill._renderer.type].render.call(fill, ctx, this);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            canvas[stroke._renderer.type].render.call(stroke, ctx, this);
            ctx.strokeStyle = stroke._renderer.effect;
          }
          if (linewidth) {
            ctx.lineWidth = linewidth;
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
        var radius = size * 0.5, m;
        if (!this._sizeAttenuation) {
          getComputedMatrix(this, matrix);
          m = matrix.elements;
          m = decomposeMatrix(m[0], m[3], m[1], m[4], m[2], m[5]);
          radius /= Math.max(m.scaleX, m.scaleY);
        }
        for (var i = 0; i < length; i++) {
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
              ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
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
        return this.flagReset();
      }
    },
    text: {
      render: function(ctx, forced, parentClipped) {
        var po = this.parent && this.parent._renderer ? this.parent._renderer.opacity : 1;
        var opacity = this._opacity * po;
        var visible = this._visible;
        var mask = this._mask;
        var clip = this._clip;
        if (!forced && (!visible || clip || opacity === 0)) {
          return this;
        }
        this._update();
        var matrix3 = this._matrix.elements;
        var stroke = this._stroke;
        var linewidth = this._linewidth;
        var fill = this._fill;
        var decoration = this._decoration;
        var defaultMatrix = isDefaultMatrix(matrix3);
        var isOffset = fill._renderer && fill._renderer.offset && stroke._renderer && stroke._renderer.offset;
        var dashes = this.dashes;
        var alignment = canvas.alignments[this._alignment] || this._alignment;
        var baseline = this._baseline;
        var a, b, c, d, e, sx, sy, x1, y1, x2, y2;
        if (!defaultMatrix) {
          ctx.save();
          ctx.transform(matrix3[0], matrix3[3], matrix3[1], matrix3[4], matrix3[2], matrix3[5]);
        }
        if (mask) {
          canvas[mask._renderer.type].render.call(mask, ctx, true);
        }
        if (!isOffset) {
          ctx.font = [this._style, this._weight, this._size + "px/" + this._leading + "px", this._family].join(" ");
        }
        ctx.textAlign = alignment;
        ctx.textBaseline = baseline;
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            canvas[fill._renderer.type].render.call(fill, ctx, this);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            canvas[stroke._renderer.type].render.call(stroke, ctx, this);
            ctx.strokeStyle = stroke._renderer.effect;
          }
          if (linewidth) {
            ctx.lineWidth = linewidth;
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
          if (!canvas.isHidden.test(stroke)) {
            if (stroke._renderer && stroke._renderer.offset) {
              sx = stroke._renderer.scale.x;
              sy = stroke._renderer.scale.y;
              ctx.save();
              ctx.translate(-stroke._renderer.offset.x, -stroke._renderer.offset.y);
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
          var metrics = ctx.measureText(this.value);
          var scalar = 1;
          switch (decoration) {
            case "underline":
              y1 = metrics.actualBoundingBoxAscent;
              y2 = metrics.actualBoundingBoxAscent;
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
        return this.flagReset();
      }
    },
    "linear-gradient": {
      render: function(ctx, parent) {
        if (!parent) {
          return;
        }
        this._update();
        if (!this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
          var rect;
          var lx = this.left._x;
          var ly = this.left._y;
          var rx = this.right._x;
          var ry = this.right._y;
          if (/objectBoundingBox/i.test(this._units)) {
            rect = parent.getBoundingClientRect(true);
            lx = (lx - 0.5) * rect.width;
            ly = (ly - 0.5) * rect.height;
            rx = (rx - 0.5) * rect.width;
            ry = (ry - 0.5) * rect.height;
          }
          this._renderer.effect = ctx.createLinearGradient(lx, ly, rx, ry);
          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.effect.addColorStop(stop._offset, stop._color);
          }
        }
        return this.flagReset();
      }
    },
    "radial-gradient": {
      render: function(ctx, parent) {
        if (!parent) {
          return;
        }
        this._update();
        if (!this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
          var rect;
          var cx = this.center._x;
          var cy = this.center._y;
          var fx = this.focal._x;
          var fy = this.focal._y;
          var radius = this._radius;
          if (/objectBoundingBox/i.test(this._units)) {
            rect = parent.getBoundingClientRect(true);
            cx = cx * rect.width * 0.5;
            cy = cy * rect.height * 0.5;
            fx = fx * rect.width * 0.5;
            fy = fy * rect.height * 0.5;
            radius *= Math.min(rect.width, rect.height) * 0.5;
          }
          this._renderer.effect = ctx.createRadialGradient(cx, cy, 0, fx, fy, radius);
          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.effect.addColorStop(stop._offset, stop._color);
          }
        }
        return this.flagReset();
      }
    },
    texture: {
      render: function(ctx) {
        this._update();
        var image = this.image;
        if (!this._renderer.effect || (this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) {
          this._renderer.effect = ctx.createPattern(this.image, this._repeat);
        }
        if (this._flagOffset || this._flagLoaded || this._flagScale) {
          if (!(this._renderer.offset instanceof vector_default)) {
            this._renderer.offset = new vector_default();
          }
          this._renderer.offset.x = -this._offset.x;
          this._renderer.offset.y = -this._offset.y;
          if (image) {
            this._renderer.offset.x += image.width / 2;
            this._renderer.offset.y += image.height / 2;
            if (this._scale instanceof vector_default) {
              this._renderer.offset.x *= this._scale.x;
              this._renderer.offset.y *= this._scale.y;
            } else {
              this._renderer.offset.x *= this._scale;
              this._renderer.offset.y *= this._scale;
            }
          }
        }
        if (this._flagScale || this._flagLoaded) {
          if (!(this._renderer.scale instanceof vector_default)) {
            this._renderer.scale = new vector_default();
          }
          if (this._scale instanceof vector_default) {
            this._renderer.scale.copy(this._scale);
          } else {
            this._renderer.scale.set(this._scale, this._scale);
          }
        }
        return this.flagReset();
      }
    },
    renderSvgArcCommand: function(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y) {
      xAxisRotation = xAxisRotation * Math.PI / 180;
      rx = abs(rx);
      ry = abs(ry);
      var dx2 = (ax - x) / 2;
      var dy2 = (ay - y) / 2;
      var x1p = cos2(xAxisRotation) * dx2 + sin2(xAxisRotation) * dy2;
      var y1p = -sin2(xAxisRotation) * dx2 + cos2(xAxisRotation) * dy2;
      var rxs = rx * rx;
      var rys = ry * ry;
      var x1ps = x1p * x1p;
      var y1ps = y1p * y1p;
      var cr = x1ps / rxs + y1ps / rys;
      if (cr > 1) {
        var s = sqrt(cr);
        rx = s * rx;
        ry = s * ry;
        rxs = rx * rx;
        rys = ry * ry;
      }
      var dq = rxs * y1ps + rys * x1ps;
      var pq = (rxs * rys - dq) / dq;
      var q = sqrt(max2(0, pq));
      if (largeArcFlag === sweepFlag)
        q = -q;
      var cxp = q * rx * y1p / ry;
      var cyp = -q * ry * x1p / rx;
      var cx = cos2(xAxisRotation) * cxp - sin2(xAxisRotation) * cyp + (ax + x) / 2;
      var cy = sin2(xAxisRotation) * cxp + cos2(xAxisRotation) * cyp + (ay + y) / 2;
      var startAngle = svgAngle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
      var delta = svgAngle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry) % TWO_PI;
      var endAngle = startAngle + delta;
      var clockwise = sweepFlag === 0;
      renderArcEstimate(ctx, cx, cy, rx, ry, startAngle, endAngle, clockwise, xAxisRotation);
    }
  };
  function Renderer(params) {
    var smoothing = params.smoothing !== false;
    this.domElement = params.domElement || document.createElement("canvas");
    this.ctx = this.domElement.getContext("2d");
    this.overdraw = params.overdraw || false;
    if (typeof this.ctx.imageSmoothingEnabled !== "undefined") {
      this.ctx.imageSmoothingEnabled = smoothing;
    }
    this.scene = new group_default();
    this.scene.parent = this;
  }
  underscore_default.extend(Renderer, {
    Utils: canvas
  });
  underscore_default.extend(Renderer.prototype, events_default, {
    constructor: Renderer,
    setSize: function(width, height, ratio) {
      this.width = width;
      this.height = height;
      this.ratio = typeof ratio === "undefined" ? get_ratio_default(this.ctx) : ratio;
      this.domElement.width = width * this.ratio;
      this.domElement.height = height * this.ratio;
      if (this.domElement.style) {
        underscore_default.extend(this.domElement.style, {
          width: width + "px",
          height: height + "px"
        });
      }
      return this.trigger(events_default.Types.resize, width, height, ratio);
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
  function renderArcEstimate(ctx, ox, oy, rx, ry, startAngle, endAngle, clockwise, xAxisRotation) {
    var epsilon = Curve.Tolerance.epsilon;
    var deltaAngle = endAngle - startAngle;
    var samePoints = Math.abs(deltaAngle) < epsilon;
    deltaAngle = mod(deltaAngle, TWO_PI);
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
    for (var i = 0; i < constants_default.Resolution; i++) {
      var t = i / (constants_default.Resolution - 1);
      var angle = startAngle + t * deltaAngle;
      var x = ox + rx * Math.cos(angle);
      var y = oy + ry * Math.sin(angle);
      if (xAxisRotation !== 0) {
        var cos7 = Math.cos(xAxisRotation);
        var sin7 = Math.sin(xAxisRotation);
        var tx = x - ox;
        var ty = y - oy;
        x = tx * cos7 - ty * sin7 + ox;
        y = tx * sin7 + ty * cos7 + oy;
      }
      ctx.lineTo(x, y);
    }
  }
  function svgAngle(ux, uy, vx, vy) {
    var dot = ux * vx + uy * vy;
    var len = sqrt(ux * ux + uy * uy) * sqrt(vx * vx + vy * vy);
    var ang = acos(max2(-1, min2(1, dot / len)));
    if (ux * vy - uy * vx < 0) {
      ang = -ang;
    }
    return ang;
  }
  var canvas_default = Renderer;

  // src/utils/canvas-shim.js
  var CanvasShim = {
    Image: null,
    isHeadless: false,
    shim: function(canvas2, Image) {
      canvas_default.Utils.shim(canvas2);
      if (typeof Image !== "undefined") {
        CanvasShim.Image = Image;
      }
      CanvasShim.isHeadless = true;
      return canvas2;
    }
  };
  var canvas_shim_default = CanvasShim;

  // src/utils/dom.js
  var dom = {
    hasEventListeners: typeof root_default.addEventListener === "function",
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
      var lastTime = 0;
      var vendors = ["ms", "moz", "webkit", "o"];
      var request = root_default.requestAnimationFrame, cancel;
      if (!request) {
        for (var i = 0; i < vendors.length; i++) {
          request = root_default[vendors[i] + "RequestAnimationFrame"] || request;
          cancel = root_default[vendors[i] + "CancelAnimationFrame"] || root_default[vendors[i] + "CancelRequestAnimationFrame"] || cancel;
        }
        request = request || function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = root_default.setTimeout(function() {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      }
      return request;
    }
  };
  var temp = root_default.document ? root_default.document.createElement("div") : {};
  temp.id = "help-two-load";
  Object.defineProperty(dom, "temp", {
    enumerable: true,
    get: function() {
      if (underscore_default.isElement(temp) && !root_default.document.head.contains(temp)) {
        underscore_default.extend(temp.style, {
          display: "none"
        });
        root_default.document.head.appendChild(temp);
      }
      return temp;
    }
  });
  var dom_default = dom;

  // src/utils/error.js
  function TwoError(message) {
    this.name = "Two.js";
    this.message = message;
  }
  TwoError.prototype = new Error();
  underscore_default.extend(TwoError.prototype, {
    constructor: TwoError
  });
  var error_default = TwoError;

  // src/utils/get-set.js
  var defineGetterSetter = function(property) {
    var object = this;
    var secret = "_" + property;
    var flag = "_flag" + property.charAt(0).toUpperCase() + property.slice(1);
    Object.defineProperty(object, property, {
      enumerable: true,
      get: function() {
        return this[secret];
      },
      set: function(v) {
        this[secret] = v;
        this[flag] = true;
      }
    });
  };
  var get_set_default = defineGetterSetter;

  // src/registry.js
  function Registry() {
    this.map = {};
  }
  underscore_default.extend(Registry.prototype, {
    constructor: Registry,
    add: function(id, obj) {
      this.map[id] = obj;
      return this;
    },
    remove: function(id) {
      delete this.map[id];
      return this;
    },
    get: function(id) {
      return this.map[id];
    },
    contains: function(id) {
      return id in this.map;
    }
  });
  var registry_default = Registry;

  // src/effects/stop.js
  function Stop(offset, color, opacity) {
    this.renderer = {};
    this._renderer.type = "stop";
    this.offset = typeof offset === "number" ? offset : Stop.Index <= 0 ? 0 : 1;
    this.opacity = typeof opacity === "number" ? opacity : 1;
    this.color = typeof color === "string" ? color : Stop.Index <= 0 ? "#fff" : "#000";
    Stop.Index = (Stop.Index + 1) % 2;
  }
  underscore_default.extend(Stop, {
    Index: 0,
    Properties: [
      "offset",
      "opacity",
      "color"
    ],
    MakeObservable: function(object) {
      underscore_default.each(Stop.Properties, function(property) {
        var object2 = this;
        var secret = "_" + property;
        var flag = "_flag" + property.charAt(0).toUpperCase() + property.slice(1);
        Object.defineProperty(object2, property, {
          enumerable: true,
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this[flag] = true;
            if (this.parent) {
              this.parent._flagStops = true;
            }
          }
        });
      }, object);
      Object.defineProperty(object, "renderer", {
        enumerable: false,
        get: function() {
          return this._renderer;
        },
        set: function(obj) {
          this._renderer = obj;
        }
      });
    }
  });
  underscore_default.extend(Stop.prototype, events_default, {
    constructor: Stop,
    clone: function() {
      var clone = new Stop();
      underscore_default.each(Stop.Properties, function(property) {
        clone[property] = this[property];
      }, this);
      return clone;
    },
    toObject: function() {
      var result = {};
      underscore_default.each(Stop.Properties, function(k) {
        result[k] = this[k];
      }, this);
      return result;
    },
    flagReset: function() {
      this._flagOffset = this._flagColor = this._flagOpacity = false;
      return this;
    }
  });
  Stop.MakeObservable(Stop.prototype);
  var stop_default = Stop;

  // src/effects/gradient.js
  function Gradient(stops) {
    this.renderer = {};
    this._renderer.type = "gradient";
    this.id = constants_default.Identifier + constants_default.uniqueId();
    this.classList = [];
    this._renderer.flagStops = Gradient.FlagStops.bind(this);
    this._renderer.bindStops = Gradient.BindStops.bind(this);
    this._renderer.unbindStops = Gradient.UnbindStops.bind(this);
    this.spread = "pad";
    this.units = "objectBoundingBox";
    if (stops) {
      this.stops = stops;
    }
  }
  underscore_default.extend(Gradient, {
    Stop: stop_default,
    Properties: [
      "spread",
      "units"
    ],
    MakeObservable: function(object) {
      underscore_default.each(Gradient.Properties, get_set_default, object);
      Object.defineProperty(object, "stops", {
        enumerable: true,
        get: function() {
          return this._stops;
        },
        set: function(stops) {
          var bindStops = this._renderer.bindStops;
          var unbindStops = this._renderer.unbindStops;
          if (this._stops) {
            this._stops.unbind(events_default.Types.insert, bindStops).unbind(events_default.Types.remove, unbindStops);
          }
          this._stops = new collection_default((stops || []).slice(0));
          this._stops.bind(events_default.Types.insert, bindStops).bind(events_default.Types.remove, unbindStops);
          bindStops(this._stops);
        }
      });
      Object.defineProperty(object, "renderer", {
        enumerable: false,
        get: function() {
          return this._renderer;
        },
        set: function(obj) {
          this._renderer = obj;
        }
      });
      Object.defineProperty(object, "id", {
        enumerable: true,
        get: function() {
          return this._id;
        },
        set: function(v) {
          this._id = v;
        }
      });
    },
    FlagStops: function() {
      this._flagStops = true;
    },
    BindStops: function(items) {
      var i = items.length;
      while (i--) {
        items[i].bind(events_default.Types.change, this._renderer.flagStops);
        items[i].parent = this;
      }
      this._renderer.flagStops();
    },
    UnbindStops: function(items) {
      var i = items.length;
      while (i--) {
        items[i].unbind(events_default.Types.change, this._renderer.flagStops);
        delete items[i].parent;
      }
      this._renderer.flagStops();
    }
  });
  underscore_default.extend(Gradient.prototype, events_default, {
    constructor: Gradient,
    _flagId: false,
    _flagStops: false,
    _flagSpread: false,
    _flagUnits: false,
    _id: "",
    _spread: "",
    _units: "",
    clone: function(parent) {
      var stops = this.stops.map(function(s) {
        return s.clone();
      });
      var clone = new Gradient(stops);
      underscore_default.each(Gradient.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var result = {
        stops: this.stops.map(function(s) {
          return s.toObject();
        })
      };
      underscore_default.each(Gradient.Properties, function(k) {
        result[k] = this[k];
      }, this);
      return result;
    },
    _update: function() {
      if (this._flagSpread || this._flagStops) {
        this.trigger(events_default.Types.change);
      }
      return this;
    },
    flagReset: function() {
      this._flagSpread = this._flagUnits = this._flagStops = false;
      return this;
    }
  });
  Gradient.MakeObservable(Gradient.prototype);
  var gradient_default = Gradient;

  // src/effects/linear-gradient.js
  function LinearGradient(x1, y1, x2, y2, stops) {
    gradient_default.call(this, stops);
    this._renderer.type = "linear-gradient";
    var flagEndPoints = LinearGradient.FlagEndPoints.bind(this);
    this.left = new vector_default().bind(events_default.Types.change, flagEndPoints);
    this.right = new vector_default().bind(events_default.Types.change, flagEndPoints);
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
  underscore_default.extend(LinearGradient, {
    Stop: stop_default,
    MakeObservable: function(object) {
      gradient_default.MakeObservable(object);
    },
    FlagEndPoints: function() {
      this._flagEndPoints = true;
    }
  });
  underscore_default.extend(LinearGradient.prototype, gradient_default.prototype, {
    constructor: LinearGradient,
    _flagEndPoints: false,
    clone: function(parent) {
      var stops = this.stops.map(function(stop) {
        return stop.clone();
      });
      var clone = new LinearGradient(this.left._x, this.left._y, this.right._x, this.right._y, stops);
      underscore_default.each(gradient_default.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var result = gradient_default.prototype.toObject.call(this);
      result.left = this.left.toObject();
      result.right = this.right.toObject();
      return result;
    },
    _update: function() {
      if (this._flagEndPoints || this._flagSpread || this._flagStops) {
        this.trigger(events_default.Types.change);
      }
      return this;
    },
    flagReset: function() {
      this._flagEndPoints = false;
      gradient_default.prototype.flagReset.call(this);
      return this;
    }
  });
  LinearGradient.MakeObservable(LinearGradient.prototype);
  var linear_gradient_default = LinearGradient;

  // src/effects/radial-gradient.js
  function RadialGradient(cx, cy, r, stops, fx, fy) {
    gradient_default.call(this, stops);
    this._renderer.type = "radial-gradient";
    this.center = new vector_default().bind(events_default.Types.change, function() {
      this._flagCenter = true;
    }.bind(this));
    this.radius = typeof r === "number" ? r : 20;
    this.focal = new vector_default().bind(events_default.Types.change, function() {
      this._flagFocal = true;
    }.bind(this));
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
  underscore_default.extend(RadialGradient, {
    Stop: stop_default,
    Properties: [
      "radius"
    ],
    MakeObservable: function(object) {
      gradient_default.MakeObservable(object);
      underscore_default.each(RadialGradient.Properties, get_set_default, object);
    }
  });
  underscore_default.extend(RadialGradient.prototype, gradient_default.prototype, {
    constructor: RadialGradient,
    _flagRadius: false,
    _flagCenter: false,
    _flagFocal: false,
    clone: function(parent) {
      var stops = this.stops.map(function(stop) {
        return stop.clone();
      });
      var clone = new RadialGradient(this.center._x, this.center._y, this._radius, stops, this.focal._x, this.focal._y);
      underscore_default.each(gradient_default.Properties.concat(RadialGradient.Properties), function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var result = gradient_default.prototype.toObject.call(this);
      underscore_default.each(RadialGradient.Properties, function(k) {
        result[k] = this[k];
      }, this);
      result.center = this.center.toObject();
      result.focal = this.focal.toObject();
      return result;
    },
    _update: function() {
      if (this._flagRadius || this._flatCenter || this._flagFocal || this._flagSpread || this._flagStops) {
        this.trigger(events_default.Types.change);
      }
      return this;
    },
    flagReset: function() {
      this._flagRadius = this._flagCenter = this._flagFocal = false;
      gradient_default.prototype.flagReset.call(this);
      return this;
    }
  });
  RadialGradient.MakeObservable(RadialGradient.prototype);
  var radial_gradient_default = RadialGradient;

  // src/effects/texture.js
  var anchor;
  var regex = {
    video: /\.(mp4|webm|ogg)$/i,
    image: /\.(jpe?g|png|gif|tiff|webp)$/i,
    effect: /texture|gradient/i
  };
  if (root_default.document) {
    anchor = document.createElement("a");
  }
  function Texture(src, callback) {
    this.renderer = {};
    this._renderer.type = "texture";
    this._renderer.flagOffset = Texture.FlagOffset.bind(this);
    this._renderer.flagScale = Texture.FlagScale.bind(this);
    this.id = constants_default.Identifier + constants_default.uniqueId();
    this.classList = [];
    this.loaded = false;
    this.repeat = "no-repeat";
    this.offset = new vector_default();
    if (typeof callback === "function") {
      var loaded = function() {
        this.unbind(events_default.Types.load, loaded);
        if (typeof callback === "function") {
          callback();
        }
      }.bind(this);
      this.bind(events_default.Types.load, loaded);
    }
    if (typeof src === "string") {
      this.src = src;
    } else if (typeof src === "object") {
      var elemString = Object.prototype.toString.call(src);
      if (elemString === "[object HTMLImageElement]" || elemString === "[object HTMLCanvasElement]" || elemString === "[object HTMLVideoElement]" || elemString === "[object Image]") {
        this.image = src;
      }
    }
    this._update();
  }
  underscore_default.extend(Texture, {
    Properties: [
      "id",
      "src",
      "loaded",
      "repeat"
    ],
    RegularExpressions: regex,
    ImageRegistry: new registry_default(),
    getAbsoluteURL: function(path) {
      if (!anchor) {
        return path;
      }
      anchor.href = path;
      return anchor.href;
    },
    loadHeadlessBuffer: function(texture, loaded) {
      texture.image.onload = loaded;
      texture.image.src = texture.src;
    },
    getTag: function(image) {
      return image && image.nodeName && image.nodeName.toLowerCase() || "img";
    },
    getImage: function(src) {
      var absoluteSrc = Texture.getAbsoluteURL(src);
      if (Texture.ImageRegistry.contains(absoluteSrc)) {
        return Texture.ImageRegistry.get(absoluteSrc);
      }
      var image;
      if (canvas_shim_default.Image) {
        image = new canvas_shim_default.Image();
        canvas_default.Utils.shim(image, "img");
      } else if (root_default.document) {
        if (regex.video.test(absoluteSrc)) {
          image = document.createElement("video");
        } else {
          image = document.createElement("img");
        }
      } else {
        console.warn("Two.js: no prototypical image defined for Two.Texture");
      }
      image.crossOrigin = "anonymous";
      return image;
    },
    Register: {
      canvas: function(texture, callback) {
        texture._src = "#" + texture.id;
        Texture.ImageRegistry.add(texture.src, texture.image);
        if (typeof callback === "function") {
          callback();
        }
      },
      img: function(texture, callback) {
        var image = texture.image;
        var loaded = function(e) {
          if (!canvas_shim_default.isHeadless && image.removeEventListener && typeof image.removeEventListener === "function") {
            image.removeEventListener("load", loaded, false);
            image.removeEventListener("error", error, false);
          }
          if (typeof callback === "function") {
            callback();
          }
        };
        var error = function(e) {
          if (!canvas_shim_default.isHeadless && typeof image.removeEventListener === "function") {
            image.removeEventListener("load", loaded, false);
            image.removeEventListener("error", error, false);
          }
          throw new error_default("unable to load " + texture.src);
        };
        if (typeof image.width === "number" && image.width > 0 && typeof image.height === "number" && image.height > 0) {
          loaded();
        } else if (!canvas_shim_default.isHeadless && typeof image.addEventListener === "function") {
          image.addEventListener("load", loaded, false);
          image.addEventListener("error", error, false);
        }
        texture._src = Texture.getAbsoluteURL(texture._src);
        if (!canvas_shim_default.isHeadless && image && image.getAttribute("two-src")) {
          return;
        }
        if (!canvas_shim_default.isHeadless) {
          image.setAttribute("two-src", texture.src);
        }
        Texture.ImageRegistry.add(texture.src, image);
        if (canvas_shim_default.isHeadless) {
          Texture.loadHeadlessBuffer(texture, loaded);
        } else {
          texture.image.src = texture.src;
        }
      },
      video: function(texture, callback) {
        if (canvas_shim_default.isHeadless) {
          throw new error_default("video textures are not implemented in headless environments.");
        }
        var loaded = function(e) {
          texture.image.removeEventListener("canplaythrough", loaded, false);
          texture.image.removeEventListener("error", error, false);
          texture.image.width = texture.image.videoWidth;
          texture.image.height = texture.image.videoHeight;
          if (typeof callback === "function") {
            callback();
          }
        };
        var error = function(e) {
          texture.image.removeEventListener("canplaythrough", loaded, false);
          texture.image.removeEventListener("error", error, false);
          throw new error_default("unable to load " + texture.src);
        };
        texture._src = Texture.getAbsoluteURL(texture._src);
        if (!texture.image.getAttribute("two-src")) {
          texture.image.setAttribute("two-src", texture.src);
          Texture.ImageRegistry.add(texture.src, texture.image);
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
    },
    load: function(texture, callback) {
      var image = texture.image;
      var tag = Texture.getTag(image);
      if (texture._flagImage) {
        if (/canvas/i.test(tag)) {
          Texture.Register.canvas(texture, callback);
        } else {
          texture._src = !canvas_shim_default.isHeadless && image.getAttribute("two-src") || image.src;
          Texture.Register[tag](texture, callback);
        }
      }
      if (texture._flagSrc) {
        if (!image) {
          image = Texture.getImage(texture.src);
          texture.image = image;
        }
        tag = Texture.getTag(image);
        Texture.Register[tag](texture, callback);
      }
    },
    FlagOffset: function() {
      this._flagOffset = true;
    },
    FlagScale: function() {
      this._flagScale = true;
    },
    MakeObservable: function(object) {
      underscore_default.each(Texture.Properties, get_set_default, object);
      Object.defineProperty(object, "image", {
        enumerable: true,
        get: function() {
          return this._image;
        },
        set: function(image) {
          var tag = Texture.getTag(image);
          var index;
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
      });
      Object.defineProperty(object, "offset", {
        enumerable: true,
        get: function() {
          return this._offset;
        },
        set: function(v) {
          if (this._offset) {
            this._offset.unbind(events_default.Types.change, this._renderer.flagOffset);
          }
          this._offset = v;
          this._offset.bind(events_default.Types.change, this._renderer.flagOffset);
          this._flagOffset = true;
        }
      });
      Object.defineProperty(object, "scale", {
        enumerable: true,
        get: function() {
          return this._scale;
        },
        set: function(v) {
          if (this._scale instanceof vector_default) {
            this._scale.unbind(events_default.Types.change, this._renderer.flagScale);
          }
          this._scale = v;
          if (this._scale instanceof vector_default) {
            this._scale.bind(events_default.Types.change, this._renderer.flagScale);
          }
          this._flagScale = true;
        }
      });
      Object.defineProperty(object, "renderer", {
        enumerable: false,
        get: function() {
          return this._renderer;
        },
        set: function(obj) {
          this._renderer = obj;
        }
      });
    }
  });
  underscore_default.extend(Texture.prototype, events_default, shape_default.prototype, {
    constructor: Texture,
    _flagId: false,
    _flagSrc: false,
    _flagImage: false,
    _flagVideo: false,
    _flagLoaded: false,
    _flagRepeat: false,
    _flagOffset: false,
    _flagScale: false,
    _id: "",
    _src: "",
    _image: null,
    _loaded: false,
    _repeat: "no-repeat",
    _scale: 1,
    _offset: null,
    clone: function() {
      var clone = new Texture(this.src);
      clone.repeat = this.repeat;
      clone.offset.copy(this.origin);
      clone.scale = this.scale;
      return clone;
    },
    toObject: function() {
      return {
        src: this.src,
        repeat: this.repeat,
        origin: this.origin.toObject(),
        scale: typeof this.scale === "number" ? this.scale : this.scale.toObject()
      };
    },
    _update: function() {
      if (this._flagSrc || this._flagImage) {
        this.trigger(events_default.Types.change);
        if (this._flagSrc || this._flagImage) {
          this.loaded = false;
          Texture.load(this, function() {
            this.loaded = true;
            this.trigger(events_default.Types.change).trigger(events_default.Types.load);
          }.bind(this));
        }
      }
      if (this._image && this._image.readyState >= 4) {
        this._flagVideo = true;
      }
      return this;
    },
    flagReset: function() {
      this._flagSrc = this._flagImage = this._flagLoaded = this._flagVideo = this._flagScale = this._flagOffset = false;
      return this;
    }
  });
  Texture.MakeObservable(Texture.prototype);
  var texture_default = Texture;

  // src/path.js
  var min3 = Math.min;
  var max3 = Math.max;
  var ceil = Math.ceil;
  var floor2 = Math.floor;
  function Path(vertices, closed2, curved, manual) {
    shape_default.call(this);
    this._renderer.type = "path";
    this._renderer.flagVertices = Path.FlagVertices.bind(this);
    this._renderer.bindVertices = Path.BindVertices.bind(this);
    this._renderer.unbindVertices = Path.UnbindVertices.bind(this);
    this._renderer.flagFill = Path.FlagFill.bind(this);
    this._renderer.flagStroke = Path.FlagStroke.bind(this);
    this._renderer.vertices = [];
    this._renderer.collection = [];
    this._closed = !!closed2;
    this._curved = !!curved;
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
  underscore_default.extend(Path, {
    Properties: [
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
      "ending"
    ],
    Utils: {
      getCurveLength: getCurveLength2
    },
    FlagVertices: function() {
      this._flagVertices = true;
      this._flagLength = true;
      if (this.parent) {
        this.parent._flagLength = true;
      }
    },
    BindVertices: function(items) {
      var i = items.length;
      while (i--) {
        items[i].bind(events_default.Types.change, this._renderer.flagVertices);
      }
      this._renderer.flagVertices();
    },
    UnbindVertices: function(items) {
      var i = items.length;
      while (i--) {
        items[i].unbind(events_default.Types.change, this._renderer.flagVertices);
      }
      this._renderer.flagVertices();
    },
    FlagFill: function() {
      this._flagFill = true;
    },
    FlagStroke: function() {
      this._flagStroke = true;
    },
    MakeObservable: function(object) {
      shape_default.MakeObservable(object);
      underscore_default.each(Path.Properties.slice(2, 8), get_set_default, object);
      Object.defineProperty(object, "fill", {
        enumerable: true,
        get: function() {
          return this._fill;
        },
        set: function(f) {
          if (this._fill instanceof gradient_default || this._fill instanceof linear_gradient_default || this._fill instanceof radial_gradient_default || this._fill instanceof texture_default) {
            this._fill.unbind(events_default.Types.change, this._renderer.flagFill);
          }
          this._fill = f;
          this._flagFill = true;
          if (this._fill instanceof gradient_default || this._fill instanceof linear_gradient_default || this._fill instanceof radial_gradient_default || this._fill instanceof texture_default) {
            this._fill.bind(events_default.Types.change, this._renderer.flagFill);
          }
        }
      });
      Object.defineProperty(object, "stroke", {
        enumerable: true,
        get: function() {
          return this._stroke;
        },
        set: function(f) {
          if (this._stroke instanceof gradient_default || this._stroke instanceof linear_gradient_default || this._stroke instanceof radial_gradient_default || this._stroke instanceof texture_default) {
            this._stroke.unbind(events_default.Types.change, this._renderer.flagStroke);
          }
          this._stroke = f;
          this._flagStroke = true;
          if (this._stroke instanceof gradient_default || this._stroke instanceof linear_gradient_default || this._stroke instanceof radial_gradient_default || this._stroke instanceof texture_default) {
            this._stroke.bind(events_default.Types.change, this._renderer.flagStroke);
          }
        }
      });
      Object.defineProperty(object, "length", {
        get: function() {
          if (this._flagLength) {
            this._updateLength();
          }
          return this._length;
        }
      });
      Object.defineProperty(object, "closed", {
        enumerable: true,
        get: function() {
          return this._closed;
        },
        set: function(v) {
          this._closed = !!v;
          this._flagVertices = true;
        }
      });
      Object.defineProperty(object, "curved", {
        enumerable: true,
        get: function() {
          return this._curved;
        },
        set: function(v) {
          this._curved = !!v;
          this._flagVertices = true;
        }
      });
      Object.defineProperty(object, "automatic", {
        enumerable: true,
        get: function() {
          return this._automatic;
        },
        set: function(v) {
          if (v === this._automatic) {
            return;
          }
          this._automatic = !!v;
          var method = this._automatic ? "ignore" : "listen";
          underscore_default.each(this.vertices, function(v2) {
            v2[method]();
          });
        }
      });
      Object.defineProperty(object, "beginning", {
        enumerable: true,
        get: function() {
          return this._beginning;
        },
        set: function(v) {
          this._beginning = v;
          this._flagVertices = true;
        }
      });
      Object.defineProperty(object, "ending", {
        enumerable: true,
        get: function() {
          return this._ending;
        },
        set: function(v) {
          this._ending = v;
          this._flagVertices = true;
        }
      });
      Object.defineProperty(object, "vertices", {
        enumerable: true,
        get: function() {
          return this._collection;
        },
        set: function(vertices) {
          var bindVertices = this._renderer.bindVertices;
          var unbindVertices = this._renderer.unbindVertices;
          if (this._collection) {
            this._collection.unbind(events_default.Types.insert, bindVertices).unbind(events_default.Types.remove, unbindVertices);
          }
          if (vertices instanceof collection_default) {
            this._collection = vertices;
          } else {
            this._collection = new collection_default(vertices || []);
          }
          this._collection.bind(events_default.Types.insert, bindVertices).bind(events_default.Types.remove, unbindVertices);
          bindVertices(this._collection);
        }
      });
      Object.defineProperty(object, "mask", {
        enumerable: true,
        get: function() {
          return this._mask;
        },
        set: function(v) {
          if (this._mask) {
            this._mask.clip = false;
          }
          this._mask = v;
          this._flagMask = true;
          if (v && !v.clip) {
            v.clip = true;
          }
        }
      });
      Object.defineProperty(object, "clip", {
        enumerable: true,
        get: function() {
          return this._clip;
        },
        set: function(v) {
          this._clip = v;
          this._flagClip = true;
        }
      });
      Object.defineProperty(object, "dashes", {
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
      });
    }
  });
  underscore_default.extend(Path.prototype, shape_default.prototype, {
    constructor: Path,
    _flagVertices: true,
    _flagLength: true,
    _flagFill: true,
    _flagStroke: true,
    _flagLinewidth: true,
    _flagOpacity: true,
    _flagVisible: true,
    _flagCap: true,
    _flagJoin: true,
    _flagMiter: true,
    _flagMask: false,
    _flagClip: false,
    _length: 0,
    _fill: "#fff",
    _stroke: "#000",
    _linewidth: 1,
    _opacity: 1,
    _visible: true,
    _cap: "round",
    _join: "round",
    _miter: 4,
    _closed: true,
    _curved: false,
    _automatic: true,
    _beginning: 0,
    _ending: 1,
    _mask: null,
    _clip: false,
    _dashes: null,
    clone: function(parent) {
      var clone = new Path();
      for (var j = 0; j < this.vertices.length; j++) {
        clone.vertices.push(this.vertices[j].clone());
      }
      for (var i = 0; i < Path.Properties.length; i++) {
        var k = Path.Properties[i];
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
    },
    toObject: function() {
      var result = {
        vertices: this.vertices.map(function(v) {
          return v.toObject();
        })
      };
      underscore_default.each(Path.Properties, function(k) {
        if (typeof this[k] !== "undefined") {
          if (this[k].toObject) {
            result[k] = this[k].toObject();
          } else {
            result[k] = this[k];
          }
        }
      }, this);
      result.className = this.className;
      result.translation = this.translation.toObject();
      result.rotation = this.rotation;
      result.scale = this.scale instanceof vector_default ? this.scale.toObject() : this.scale;
      result.skewX = this.skewX;
      result.skewY = this.skewY;
      if (this.matrix.manual) {
        result.matrix = this.matrix.toObject();
      }
      return result;
    },
    noFill: function() {
      this.fill = "transparent";
      return this;
    },
    noStroke: function() {
      this.stroke = void 0;
      return this;
    },
    corner: function() {
      var rect = this.getBoundingClientRect(true);
      var hw = rect.width / 2;
      var hh = rect.height / 2;
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      for (var i = 0; i < this.vertices.length; i++) {
        var v = this.vertices[i];
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
    },
    center: function() {
      var rect = this.getBoundingClientRect(true);
      var cx = rect.left + rect.width / 2 - this.translation.x;
      var cy = rect.top + rect.height / 2 - this.translation.y;
      for (var i = 0; i < this.vertices.length; i++) {
        var v = this.vertices[i];
        v.x -= cx;
        v.y -= cy;
      }
      if (this.mask) {
        this.mask.translation.x -= cx;
        this.mask.translation.y -= cy;
      }
      return this;
    },
    remove: function() {
      if (!this.parent) {
        return this;
      }
      this.parent.remove(this);
      return this;
    },
    getBoundingClientRect: function(shallow) {
      var matrix3, border, l, i, v0, v1, c0x, c0y, c1x, c1y, a, b, c, d;
      var left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
      this._update(true);
      matrix3 = shallow ? this._matrix : getComputedMatrix(this);
      border = (this.linewidth || 0) / 2;
      l = this._renderer.vertices.length;
      if (l <= 0) {
        return {
          width: 0,
          height: 0
        };
      }
      for (i = 0; i < l; i++) {
        v1 = this._renderer.vertices[i];
        v0 = this._renderer.vertices[(i + l - 1) % l];
        if (v0.controls && v1.controls) {
          c0x = v0.controls.right.x;
          c0y = v0.controls.right.y;
          if (v0.relative) {
            c0x += v0.x;
            c0y += v0.y;
          }
          c1x = v1.controls.left.x;
          c1y = v1.controls.left.y;
          if (v1.relative) {
            c1x += v1.x;
            c1y += v1.y;
          }
          var bb = getCurveBoundingBox(v0.x, v0.y, c0x, c0y, c1x, c1y, v1.x, v1.y);
          top = min3(bb.min.y - border, top);
          left = min3(bb.min.x - border, left);
          right = max3(bb.max.x + border, right);
          bottom = max3(bb.max.y + border, bottom);
        } else {
          if (i <= 1) {
            top = min3(v0.y - border, top);
            left = min3(v0.x - border, left);
            right = max3(v0.x + border, right);
            bottom = max3(v0.y + border, bottom);
          }
          top = min3(v1.y - border, top);
          left = min3(v1.x - border, left);
          right = max3(v1.x + border, right);
          bottom = max3(v1.y + border, bottom);
        }
      }
      a = matrix3.multiply(left, top, 1);
      b = matrix3.multiply(left, bottom, 1);
      c = matrix3.multiply(right, top, 1);
      d = matrix3.multiply(right, bottom, 1);
      top = min3(a.y, b.y, c.y, d.y);
      left = min3(a.x, b.x, c.x, d.x);
      right = max3(a.x, b.x, c.x, d.x);
      bottom = max3(a.y, b.y, c.y, d.y);
      return {
        top,
        left,
        right,
        bottom,
        width: right - left,
        height: bottom - top
      };
    },
    getPointAt: function(t, obj) {
      var ia, ib, result;
      var x, x1, x2, x3, x4, y, y1, y2, y3, y4, left, right;
      var target = this.length * Math.min(Math.max(t, 0), 1);
      var length = this.vertices.length;
      var last = length - 1;
      var a = null;
      var b = null;
      for (var i = 0, l = this._lengths.length, sum = 0; i < l; i++) {
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
      var t1x = lerp(x1, x2, t);
      var t1y = lerp(y1, y2, t);
      var t2x = lerp(x2, x3, t);
      var t2y = lerp(y2, y3, t);
      var t3x = lerp(x3, x4, t);
      var t3y = lerp(y3, y4, t);
      var brx = lerp(t1x, t2x, t);
      var bry = lerp(t1y, t2y, t);
      var alx = lerp(t2x, t3x, t);
      var aly = lerp(t2y, t3y, t);
      if (underscore_default.isObject(obj)) {
        obj.x = x;
        obj.y = y;
        if (!underscore_default.isObject(obj.controls)) {
          anchor_default.AppendCurveProperties(obj);
        }
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
        obj.t = t;
        return obj;
      }
      result = new anchor_default(x, y, brx - x, bry - y, alx - x, aly - y, this._curved ? path_commands_default.curve : path_commands_default.line);
      result.t = t;
      return result;
    },
    plot: function() {
      if (this.curved) {
        getCurveFromPoints(this._collection, this.closed);
        return this;
      }
      for (var i = 0; i < this._collection.length; i++) {
        this._collection[i].command = i === 0 ? path_commands_default.move : path_commands_default.line;
      }
      return this;
    },
    subdivide: function(limit) {
      this._update();
      var last = this.vertices.length - 1;
      var b = this.vertices[last];
      var closed2 = this._closed || this.vertices[last]._command === path_commands_default.close;
      var points = [];
      underscore_default.each(this.vertices, function(a, i) {
        if (i <= 0 && !closed2) {
          b = a;
          return;
        }
        if (a.command === path_commands_default.move) {
          points.push(new anchor_default(b.x, b.y));
          if (i > 0) {
            points[points.length - 1].command = path_commands_default.line;
          }
          b = a;
          return;
        }
        var verts = getSubdivisions(a, b, limit);
        points = points.concat(verts);
        underscore_default.each(verts, function(v, i2) {
          if (i2 <= 0 && b.command === path_commands_default.move) {
            v.command = path_commands_default.move;
          } else {
            v.command = path_commands_default.line;
          }
        });
        if (i >= last) {
          if (this._closed && this._automatic) {
            b = a;
            verts = getSubdivisions(a, b, limit);
            points = points.concat(verts);
            underscore_default.each(verts, function(v, i2) {
              if (i2 <= 0 && b.command === path_commands_default.move) {
                v.command = path_commands_default.move;
              } else {
                v.command = path_commands_default.line;
              }
            });
          } else if (closed2) {
            points.push(new anchor_default(a.x, a.y));
          }
          points[points.length - 1].command = closed2 ? path_commands_default.close : path_commands_default.line;
        }
        b = a;
      }, this);
      this._automatic = false;
      this._curved = false;
      this.vertices = points;
      return this;
    },
    _updateLength: function(limit, silent) {
      if (!silent) {
        this._update();
      }
      var length = this.vertices.length;
      var last = length - 1;
      var b = this.vertices[last];
      var closed2 = false;
      var sum = 0;
      if (typeof this._lengths === "undefined") {
        this._lengths = [];
      }
      underscore_default.each(this.vertices, function(a, i) {
        if (i <= 0 && !closed2 || a.command === path_commands_default.move) {
          b = a;
          this._lengths[i] = 0;
          return;
        }
        this._lengths[i] = getCurveLength2(a, b, limit);
        sum += this._lengths[i];
        if (i >= last && closed2) {
          b = this.vertices[(i + 1) % length];
          this._lengths[i + 1] = getCurveLength2(a, b, limit);
          sum += this._lengths[i + 1];
        }
        b = a;
      }, this);
      this._length = sum;
      this._flagLength = false;
      return this;
    },
    _update: function() {
      if (this._flagVertices) {
        if (this._automatic) {
          this.plot();
        }
        if (this._flagLength) {
          this._updateLength(void 0, true);
        }
        var l = this._collection.length;
        var closed2 = this._closed;
        var beginning = Math.min(this._beginning, this._ending);
        var ending = Math.max(this._beginning, this._ending);
        var bid = getIdByLength(this, beginning * this._length);
        var eid = getIdByLength(this, ending * this._length);
        var low = ceil(bid);
        var high = floor2(eid);
        var left, right, prev, next, v;
        this._renderer.vertices.length = 0;
        for (var i = 0; i < l; i++) {
          if (this._renderer.collection.length <= i) {
            this._renderer.collection.push(new anchor_default());
          }
          if (i > high && !right) {
            v = this._renderer.collection[i];
            v.copy(this._collection[i]);
            this.getPointAt(ending, v);
            v.command = this._renderer.collection[i].command;
            this._renderer.vertices.push(v);
            right = v;
            prev = this._collection[i - 1];
            if (prev && prev.controls) {
              v.controls.right.clear();
              this._renderer.collection[i - 1].controls.right.clear().lerp(prev.controls.right, v.t);
            }
          } else if (i >= low && i <= high) {
            v = this._renderer.collection[i].copy(this._collection[i]);
            this._renderer.vertices.push(v);
            if (i === high && contains(this, ending)) {
              right = v;
              if (!closed2 && right.controls) {
                right.controls.right.clear();
              }
            } else if (i === low && contains(this, beginning)) {
              left = v;
              left.command = path_commands_default.move;
              if (!closed2 && left.controls) {
                left.controls.left.clear();
              }
            }
          }
        }
        if (low > 0 && !left) {
          i = low - 1;
          v = this._renderer.collection[i];
          v.copy(this._collection[i]);
          this.getPointAt(beginning, v);
          v.command = path_commands_default.move;
          this._renderer.vertices.unshift(v);
          next = this._collection[i + 1];
          if (next && next.controls) {
            v.controls.left.clear();
            this._renderer.collection[i + 1].controls.left.copy(next.controls.left).lerp(vector_default.zero, v.t);
          }
        }
      }
      shape_default.prototype._update.apply(this, arguments);
      return this;
    },
    flagReset: function() {
      this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagCap = this._flagJoin = this._flagMiter = this._flagClip = false;
      shape_default.prototype.flagReset.call(this);
      return this;
    }
  });
  Path.MakeObservable(Path.prototype);
  function contains(path, t) {
    if (t === 0 || t === 1) {
      return true;
    }
    var length = path._length;
    var target = length * t;
    var elapsed = 0;
    for (var i = 0; i < path._lengths.length; i++) {
      var dist = path._lengths[i];
      if (elapsed >= target) {
        return target - elapsed >= 0;
      }
      elapsed += dist;
    }
    return false;
  }
  function getIdByLength(path, target) {
    var total = path._length;
    if (target <= 0) {
      return 0;
    } else if (target >= total) {
      return path._lengths.length - 1;
    }
    for (var i = 0, sum = 0; i < path._lengths.length; i++) {
      if (sum + path._lengths[i] >= target) {
        target -= sum;
        return Math.max(i - 1, 0) + target / path._lengths[i];
      }
      sum += path._lengths[i];
    }
    return -1;
  }
  function getCurveLength2(a, b, limit) {
    var x1, x2, x3, x4, y1, y2, y3, y4;
    var right = b.controls && b.controls.right;
    var left = a.controls && a.controls.left;
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
    var x1, x2, x3, x4, y1, y2, y3, y4;
    var right = b.controls && b.controls.right;
    var left = a.controls && a.controls.left;
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
  var path_default = Path;

  // src/shapes/rectangle.js
  function Rectangle(x, y, width, height) {
    path_default.call(this, [
      new anchor_default(),
      new anchor_default(),
      new anchor_default(),
      new anchor_default()
    ], true, false, true);
    this.width = width;
    this.height = height;
    this.origin = new vector_default();
    this.translation.set(x, y);
    this._update();
  }
  underscore_default.extend(Rectangle, {
    Properties: ["width", "height"],
    MakeObservable: function(object) {
      path_default.MakeObservable(object);
      underscore_default.each(Rectangle.Properties, get_set_default, object);
      Object.defineProperty(object, "origin", {
        enumerable: true,
        get: function() {
          return this._origin;
        },
        set: function(v) {
          if (this._origin) {
            this._origin.unbind(events_default.Types.change, this._renderer.flagVertices);
          }
          this._origin = v;
          this._origin.bind(events_default.Types.change, this._renderer.flagVertices);
          this._renderer.flagVertices();
        }
      });
    }
  });
  underscore_default.extend(Rectangle.prototype, path_default.prototype, {
    constructor: Rectangle,
    _flagWidth: 0,
    _flagHeight: 0,
    _width: 0,
    _height: 0,
    _origin: null,
    _update: function() {
      if (this._flagVertices || this._flagWidth || this._flagHeight) {
        var xr = this._width / 2;
        var yr = this._height / 2;
        if (!this._closed && this.vertices.length === 4) {
          this.vertices.push(new anchor_default());
        }
        this.vertices[0].set(-xr, -yr).sub(this._origin).command = path_commands_default.move;
        this.vertices[1].set(xr, -yr).sub(this._origin).command = path_commands_default.line;
        this.vertices[2].set(xr, yr).sub(this._origin).command = path_commands_default.line;
        this.vertices[3].set(-xr, yr).sub(this._origin).command = path_commands_default.line;
        if (this.vertices[4]) {
          this.vertices[4].set(-xr, -yr).sub(this._origin).command = path_commands_default.line;
        }
      }
      path_default.prototype._update.call(this);
      return this;
    },
    flagReset: function() {
      this._flagWidth = this._flagHeight = false;
      path_default.prototype.flagReset.call(this);
      return this;
    },
    clone: function(parent) {
      var clone = new Rectangle(0, 0, this.width, this.height);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      underscore_default.each(path_default.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var object = path_default.prototype.toObject.call(this);
      object.width = this.width;
      object.height = this.height;
      object.origin = this.origin.toObject();
      return object;
    }
  });
  Rectangle.MakeObservable(Rectangle.prototype);
  var rectangle_default = Rectangle;

  // src/effects/sprite.js
  function Sprite(path, ox, oy, cols, rows, frameRate) {
    path_default.call(this, [
      new anchor_default(),
      new anchor_default(),
      new anchor_default(),
      new anchor_default()
    ], true);
    this.noStroke();
    this.noFill();
    if (path instanceof texture_default) {
      this.texture = path;
    } else if (typeof path === "string") {
      this.texture = new texture_default(path);
    }
    this.origin = new vector_default();
    this._update();
    this.translation.set(ox || 0, oy || 0);
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
  underscore_default.extend(Sprite, {
    Properties: [
      "texture",
      "columns",
      "rows",
      "frameRate",
      "index"
    ],
    MakeObservable: function(obj) {
      rectangle_default.MakeObservable(obj);
      underscore_default.each(Sprite.Properties, get_set_default, obj);
    }
  });
  underscore_default.extend(Sprite.prototype, rectangle_default.prototype, {
    constructor: Sprite,
    _flagTexture: false,
    _flagColumns: false,
    _flagRows: false,
    _flagFrameRate: false,
    flagIndex: false,
    _amount: 1,
    _duration: 0,
    _startTime: 0,
    _playing: false,
    _firstFrame: 0,
    _lastFrame: 0,
    _loop: true,
    _texture: null,
    _columns: 1,
    _rows: 1,
    _frameRate: 0,
    _index: 0,
    _origin: null,
    play: function(firstFrame, lastFrame, onLastFrame) {
      this._playing = true;
      this._firstFrame = 0;
      this._lastFrame = this.amount - 1;
      this._startTime = underscore_default.performance.now();
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
    },
    pause: function() {
      this._playing = false;
      return this;
    },
    stop: function() {
      this._playing = false;
      this._index = 0;
      return this;
    },
    clone: function(parent) {
      var clone = new Sprite(this.texture, this.translation.x, this.translation.y, this.columns, this.rows, this.frameRate);
      if (this.playing) {
        clone.play(this._firstFrame, this._lastFrame);
        clone._loop = this._loop;
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var object = rectangle_default.prototype.toObject.call(this);
      object.texture = this.texture.toObject();
      object.columns = this.columns;
      object.rows = this.rows;
      object.frameRate = this.frameRate;
      object.index = this.index;
      object._firstFrame = this._firstFrame;
      object._lastFrame = this._lastFrame;
      object._loop = this._loop;
      return object;
    },
    _update: function() {
      var effect = this._texture;
      var cols = this._columns;
      var rows = this._rows;
      var width, height, elapsed, amount, duration;
      var index, iw, ih, frames;
      if (this._flagColumns || this._flagRows) {
        this._amount = this._columns * this._rows;
      }
      if (this._flagFrameRate) {
        this._duration = 1e3 * this._amount / this._frameRate;
      }
      if (this._flagTexture) {
        this.fill = this._texture;
      }
      if (this._texture.loaded) {
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
          if (underscore_default.isNaN(this._lastFrame)) {
            this._lastFrame = amount - 1;
          }
          elapsed = underscore_default.performance.now() - this._startTime;
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
        var col = this._index % cols;
        var row = Math.floor(this._index / cols);
        var ox = -width * col + (iw - width) / 2;
        var oy = -height * row + (ih - height) / 2;
        if (ox !== effect.offset.x) {
          effect.offset.x = ox;
        }
        if (oy !== effect.offset.y) {
          effect.offset.y = oy;
        }
      }
      rectangle_default.prototype._update.call(this);
      return this;
    },
    flagReset: function() {
      this._flagTexture = this._flagColumns = this._flagRows = this._flagFrameRate = false;
      rectangle_default.prototype.flagReset.call(this);
      return this;
    }
  });
  Sprite.MakeObservable(Sprite.prototype);
  var sprite_default = Sprite;

  // src/shapes/circle.js
  var cos3 = Math.cos;
  var sin3 = Math.sin;
  function Circle(ox, oy, r, resolution) {
    var amount = resolution ? Math.max(resolution, 2) : 4;
    var points = [];
    for (var i = 0; i < amount; i++) {
      points.push(new anchor_default(0, 0, 0, 0, 0, 0));
    }
    path_default.call(this, points, true, true, true);
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
  underscore_default.extend(Circle, {
    Properties: ["radius"],
    MakeObservable: function(obj) {
      path_default.MakeObservable(obj);
      underscore_default.each(Circle.Properties, get_set_default, obj);
    }
  });
  underscore_default.extend(Circle.prototype, path_default.prototype, {
    constructor: Circle,
    _flagRadius: false,
    _radius: 0,
    _update: function() {
      if (this._flagVertices || this._flagRadius) {
        var length = this.vertices.length;
        if (!this._closed && length > 2) {
          length -= 1;
        }
        var c = 4 / 3 * Math.tan(Math.PI / (length * 2));
        var radius = this._radius;
        var rc = radius * c;
        for (var i = 0; i < this.vertices.length; i++) {
          var pct = i / length;
          var theta = pct * TWO_PI;
          var x = radius * cos3(theta);
          var y = radius * sin3(theta);
          var lx = rc * cos3(theta - HALF_PI);
          var ly = rc * sin3(theta - HALF_PI);
          var rx = rc * cos3(theta + HALF_PI);
          var ry = rc * sin3(theta + HALF_PI);
          var v = this.vertices[i];
          v.command = i === 0 ? path_commands_default.move : path_commands_default.curve;
          v.set(x, y);
          v.controls.left.set(lx, ly);
          v.controls.right.set(rx, ry);
        }
      }
      path_default.prototype._update.call(this);
      return this;
    },
    flagReset: function() {
      this._flagRadius = false;
      path_default.prototype.flagReset.call(this);
      return this;
    },
    clone: function(parent) {
      var clone = new Circle(0, 0, this.radius, this.vertices.length);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      underscore_default.each(path_default.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var object = path_default.prototype.toObject.call(this);
      underscore_default.each(Circle.Properties, function(property) {
        object[property] = this[property];
      }, this);
      return object;
    }
  });
  Circle.MakeObservable(Circle.prototype);
  var circle_default = Circle;

  // src/shapes/ellipse.js
  var cos4 = Math.cos;
  var sin4 = Math.sin;
  function Ellipse(ox, oy, rx, ry, resolution) {
    if (typeof ry !== "number" && typeof rx === "number") {
      ry = rx;
    }
    var amount = resolution ? Math.max(resolution, 2) : 4;
    var points = [];
    for (var i = 0; i < amount; i++) {
      points.push(new anchor_default());
    }
    path_default.call(this, points, true, true, true);
    if (typeof rx === "number") {
      this.width = rx * 2;
    }
    if (typeof ry === "number") {
      this.height = ry * 2;
    }
    this._update();
    this.translation.set(ox, oy);
  }
  underscore_default.extend(Ellipse, {
    Properties: ["width", "height"],
    MakeObservable: function(obj) {
      path_default.MakeObservable(obj);
      underscore_default.each(Ellipse.Properties, get_set_default, obj);
    }
  });
  underscore_default.extend(Ellipse.prototype, path_default.prototype, {
    _flagWidth: false,
    _flagHeight: false,
    _width: 0,
    _height: 0,
    constructor: Ellipse,
    _update: function() {
      if (this._flagVertices || this._flagWidth || this._flagHeight) {
        var length = this.vertices.length;
        if (!this._closed && length > 2) {
          length -= 1;
        }
        var c = 4 / 3 * Math.tan(Math.PI / (this.vertices.length * 2));
        var radiusX = this._width / 2;
        var radiusY = this._height / 2;
        for (var i = 0; i < this.vertices.length; i++) {
          var pct = i / length;
          var theta = pct * TWO_PI;
          var x = radiusX * cos4(theta);
          var y = radiusY * sin4(theta);
          var lx = radiusX * c * cos4(theta - HALF_PI);
          var ly = radiusY * c * sin4(theta - HALF_PI);
          var rx = radiusX * c * cos4(theta + HALF_PI);
          var ry = radiusY * c * sin4(theta + HALF_PI);
          var v = this.vertices[i];
          v.command = i === 0 ? path_commands_default.move : path_commands_default.curve;
          v.set(x, y);
          v.controls.left.set(lx, ly);
          v.controls.right.set(rx, ry);
        }
      }
      path_default.prototype._update.call(this);
      return this;
    },
    flagReset: function() {
      this._flagWidth = this._flagHeight = false;
      path_default.prototype.flagReset.call(this);
      return this;
    },
    clone: function(parent) {
      var rx = this.width / 2;
      var ry = this.height / 2;
      var resolution = this.vertices.length;
      var clone = new Ellipse(0, 0, rx, ry, resolution);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      underscore_default.each(path_default.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var object = path_default.prototype.toObject.call(this);
      underscore_default.each(Ellipse.Properties, function(property) {
        object[property] = this[property];
      }, this);
      return object;
    }
  });
  Ellipse.MakeObservable(Ellipse.prototype);
  var ellipse_default = Ellipse;

  // src/shapes/line.js
  function Line(x1, y1, x2, y2) {
    path_default.call(this, [
      new anchor_default(x1, y1),
      new anchor_default(x2, y2)
    ]);
    this.vertices[0].command = path_commands_default.move;
    this.vertices[1].command = path_commands_default.line;
    this.automatic = false;
  }
  underscore_default.extend(Line.prototype, path_default.prototype, {
    constructor: Line
  });
  path_default.MakeObservable(Line.prototype);
  var line_default = Line;

  // src/shapes/rounded-rectangle.js
  function RoundedRectangle(ox, oy, width, height, radius) {
    if (typeof radius === "undefined" && typeof width === "number" && typeof height === "number") {
      radius = Math.floor(Math.min(width, height) / 12);
    }
    var amount = 10;
    var points = [];
    for (var i = 0; i < amount; i++) {
      points.push(new anchor_default(0, 0, 0, 0, 0, 0, i === 0 ? path_commands_default.move : path_commands_default.curve));
    }
    path_default.call(this, points);
    this.closed = true;
    this.automatic = false;
    this._renderer.flagRadius = RoundedRectangle.FlagRadius.bind(this);
    if (typeof width === "number") {
      this.width = width;
    }
    if (typeof height === "number") {
      this.height = height;
    }
    if (typeof radius === "number") {
      this.radius = radius;
    }
    this._update();
    this.translation.set(ox, oy);
  }
  underscore_default.extend(RoundedRectangle, {
    Properties: ["width", "height"],
    FlagRadius: function() {
      this._flagRadius = true;
    },
    MakeObservable: function(object) {
      path_default.MakeObservable(object);
      underscore_default.each(RoundedRectangle.Properties, get_set_default, object);
      Object.defineProperty(object, "radius", {
        enumerable: true,
        get: function() {
          return this._radius;
        },
        set: function(v) {
          if (this._radius instanceof vector_default) {
            this._radius.unbind(events_default.Types.change, this._renderer.flagRadius);
          }
          this._radius = v;
          if (this._radius instanceof vector_default) {
            this._radius.bind(events_default.Types.change, this._renderer.flagRadius);
          }
          this._flagRadius = true;
        }
      });
    }
  });
  underscore_default.extend(RoundedRectangle.prototype, path_default.prototype, {
    constructor: RoundedRectangle,
    _flagWidth: false,
    _flagHeight: false,
    _flagRadius: false,
    _width: 0,
    _height: 0,
    _radius: 12,
    _update: function() {
      if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagRadius) {
        var width = this._width;
        var height = this._height;
        var rx, ry;
        if (this._radius instanceof vector_default) {
          rx = this._radius.x;
          ry = this._radius.y;
        } else {
          rx = this._radius;
          ry = this._radius;
        }
        var v;
        var w = width / 2;
        var h = height / 2;
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
      path_default.prototype._update.call(this);
      return this;
    },
    flagReset: function() {
      this._flagWidth = this._flagHeight = this._flagRadius = false;
      path_default.prototype.flagReset.call(this);
      return this;
    },
    clone: function(parent) {
      var width = this.width;
      var height = this.height;
      var radius = this.radius;
      var clone = new RoundedRectangle(0, 0, width, height, radius);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      underscore_default.each(path_default.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var object = path_default.prototype.toObject.call(this);
      underscore_default.each(RoundedRectangle.Properties, function(property) {
        object[property] = this[property];
      }, this);
      object.radius = typeof this.radius === "number" ? this.radius : this.radius.toObject();
      return object;
    }
  });
  RoundedRectangle.MakeObservable(RoundedRectangle.prototype);
  var rounded_rectangle_default = RoundedRectangle;

  // src/text.js
  var min4 = Math.min;
  var max4 = Math.max;
  function Text(message, x, y, styles) {
    shape_default.call(this);
    this._renderer.type = "text";
    this._renderer.flagFill = Text.FlagFill.bind(this);
    this._renderer.flagStroke = Text.FlagStroke.bind(this);
    this.value = message;
    if (typeof x === "number") {
      this.translation.x = x;
    }
    if (typeof y === "number") {
      this.translation.y = y;
    }
    this.dashes = [];
    this.dashes.offset = 0;
    if (!underscore_default.isObject(styles)) {
      return this;
    }
    underscore_default.each(Text.Properties, function(property) {
      if (property in styles) {
        this[property] = styles[property];
      }
    }, this);
  }
  underscore_default.extend(Text, {
    Ratio: 0.6,
    Properties: [
      "value",
      "family",
      "size",
      "leading",
      "alignment",
      "linewidth",
      "style",
      "weight",
      "decoration",
      "baseline",
      "opacity",
      "visible",
      "className",
      "fill",
      "stroke"
    ],
    FlagFill: function() {
      this._flagFill = true;
    },
    FlagStroke: function() {
      this._flagStroke = true;
    },
    MakeObservable: function(object) {
      shape_default.MakeObservable(object);
      underscore_default.each(Text.Properties.slice(0, 12), get_set_default, object);
      Object.defineProperty(object, "fill", {
        enumerable: true,
        get: function() {
          return this._fill;
        },
        set: function(f) {
          if (this._fill instanceof gradient_default || this._fill instanceof linear_gradient_default || this._fill instanceof radial_gradient_default || this._fill instanceof texture_default) {
            this._fill.unbind(events_default.Types.change, this._renderer.flagFill);
          }
          this._fill = f;
          this._flagFill = true;
          if (this._fill instanceof gradient_default || this._fill instanceof linear_gradient_default || this._fill instanceof radial_gradient_default || this._fill instanceof texture_default) {
            this._fill.bind(events_default.Types.change, this._renderer.flagFill);
          }
        }
      });
      Object.defineProperty(object, "stroke", {
        enumerable: true,
        get: function() {
          return this._stroke;
        },
        set: function(f) {
          if (this._stroke instanceof gradient_default || this._stroke instanceof linear_gradient_default || this._stroke instanceof radial_gradient_default || this._stroke instanceof texture_default) {
            this._stroke.unbind(events_default.Types.change, this._renderer.flagStroke);
          }
          this._stroke = f;
          this._flagStroke = true;
          if (this._stroke instanceof gradient_default || this._stroke instanceof linear_gradient_default || this._stroke instanceof radial_gradient_default || this._stroke instanceof texture_default) {
            this._stroke.bind(events_default.Types.change, this._renderer.flagStroke);
          }
        }
      });
      Object.defineProperty(object, "mask", {
        enumerable: true,
        get: function() {
          return this._mask;
        },
        set: function(v) {
          if (this._mask) {
            this._mask.clip = false;
          }
          this._mask = v;
          this._flagMask = true;
          if (v && !v.clip) {
            v.clip = true;
          }
        }
      });
      Object.defineProperty(object, "clip", {
        enumerable: true,
        get: function() {
          return this._clip;
        },
        set: function(v) {
          this._clip = v;
          this._flagClip = true;
        }
      });
      Object.defineProperty(object, "dashes", {
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
      });
    }
  });
  underscore_default.extend(Text.prototype, shape_default.prototype, {
    constructor: Text,
    _flagValue: true,
    _flagFamily: true,
    _flagSize: true,
    _flagLeading: true,
    _flagAlignment: true,
    _flagBaseline: true,
    _flagStyle: true,
    _flagWeight: true,
    _flagDecoration: true,
    _flagFill: true,
    _flagStroke: true,
    _flagLinewidth: true,
    _flagOpacity: true,
    _flagClassName: true,
    _flagVisible: true,
    _flagMask: false,
    _flagClip: false,
    _value: "",
    _family: "sans-serif",
    _size: 13,
    _leading: 17,
    _alignment: "center",
    _baseline: "middle",
    _style: "normal",
    _weight: 500,
    _decoration: "none",
    _fill: "#000",
    _stroke: "transparent",
    _linewidth: 1,
    _opacity: 1,
    _className: "",
    _visible: true,
    _mask: null,
    _clip: false,
    _dashes: null,
    remove: function() {
      if (!this.parent) {
        return this;
      }
      this.parent.remove(this);
      return this;
    },
    clone: function(parent) {
      var clone = new Text(this.value);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      underscore_default.each(Text.Properties, function(property) {
        clone[property] = this[property];
      }, this);
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      if (parent) {
        parent.add(clone);
      }
      return clone._update();
    },
    toObject: function() {
      var result = {
        translation: this.translation.toObject(),
        rotation: this.rotation,
        scale: this.scale
      };
      if (this.matrix.manual) {
        result.matrix = this.matrix.toObject();
      }
      underscore_default.each(Text.Properties, function(property) {
        result[property] = this[property];
      }, this);
      return result;
    },
    noFill: function() {
      this.fill = "transparent";
      return this;
    },
    noStroke: function() {
      this.stroke = void 0;
      this.linewidth = void 0;
      return this;
    },
    getBoundingClientRect: function(shallow) {
      var matrix3, a, b, c, d;
      var left, right, top, bottom;
      this._update(true);
      matrix3 = shallow ? this._matrix : getComputedMatrix(this);
      var height = this.leading;
      var width = this.value.length * this.size * Text.Ratio;
      var border = (this._linewidth || 0) / 2;
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
        case "top":
          top = -border;
          bottom = height + border;
          break;
        case "bottom":
          top = -(height + border);
          bottom = border;
          break;
        default:
          top = -(height / 2 + border);
          bottom = height / 2 + border;
      }
      a = matrix3.multiply(left, top, 1);
      b = matrix3.multiply(left, bottom, 1);
      c = matrix3.multiply(right, top, 1);
      d = matrix3.multiply(right, bottom, 1);
      top = min4(a.y, b.y, c.y, d.y);
      left = min4(a.x, b.x, c.x, d.x);
      right = max4(a.x, b.x, c.x, d.x);
      bottom = max4(a.y, b.y, c.y, d.y);
      return {
        top,
        left,
        right,
        bottom,
        width: right - left,
        height: bottom - top
      };
    },
    flagReset: function() {
      this._flagValue = this._flagFamily = this._flagSize = this._flagLeading = this._flagAlignment = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagClip = this._flagDecoration = this._flagClassName = this._flagBaseline = this._flagWeight = this._flagStyle = false;
      shape_default.prototype.flagReset.call(this);
      return this;
    }
  });
  Text.MakeObservable(Text.prototype);
  var text_default = Text;

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
  var getAlignment = function(anchor2) {
    return alignments[anchor2];
  };
  var getBaseline = function(node) {
    var a = node.getAttribute("dominant-baseline");
    var b = node.getAttribute("alignment-baseline");
    return a || b;
  };
  var getTagName = function(tag) {
    return tag.replace(/svg:/ig, "").toLowerCase();
  };
  var applyTransformsToVector = function(transforms, vector) {
    vector.x += transforms.translateX;
    vector.y += transforms.translateY;
    vector.x *= transforms.scaleX;
    vector.y *= transforms.scaleY;
    if (transforms.rotation !== 0) {
      var l = vector.length();
      vector.x = l * Math.cos(transforms.rotation);
      vector.y = l * Math.sin(transforms.rotation);
    }
  };
  var extractCSSText = function(text, styles) {
    var commands, command, name, value;
    if (!styles) {
      styles = {};
    }
    commands = text.split(";");
    for (var i = 0; i < commands.length; i++) {
      command = commands[i].split(":");
      name = command[0];
      value = command[1];
      if (typeof name === "undefined" || typeof value === "undefined") {
        continue;
      }
      styles[name] = value.replace(/\s/, "");
    }
    return styles;
  };
  var getSvgStyles = function(node) {
    var styles = {};
    var attributes = getSvgAttributes(node);
    var length = Math.max(attributes.length, node.style.length);
    for (var i = 0; i < length; i++) {
      var command = node.style[i];
      var attribute = attributes[i];
      if (command) {
        styles[command] = node.style[command];
      }
      if (attribute) {
        styles[attribute] = node.getAttribute(attribute);
      }
    }
    return styles;
  };
  var getSvgAttributes = function(node) {
    var attributes = node.getAttributeNames();
    var keywords = ["id", "class", "transform", "xmlns", "viewBox"];
    for (var i = 0; i < keywords.length; i++) {
      var keyword = keywords[i];
      var index = Array.prototype.indexOf.call(attributes, keyword);
      if (index >= 0) {
        attributes.splice(index, 1);
      }
    }
    return attributes;
  };
  var applySvgViewBox = function(node, value) {
    var elements = value.split(/[\s,]/);
    var x = -parseFloat(elements[0]);
    var y = -parseFloat(elements[1]);
    var width = parseFloat(elements[2]);
    var height = parseFloat(elements[3]);
    if (x && y) {
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        if ("translation" in child) {
          child.translation.add(x, y);
        } else if ("x" in child) {
          child.x = x;
        } else if ("y" in child) {
          child.y = y;
        }
      }
    }
    var xExists = typeof node.x === "number";
    var yExists = typeof node.y === "number";
    var widthExists = typeof node.width === "number";
    var heightExists = typeof node.height === "number";
    if (xExists) {
      node.translation.x += node.x;
    }
    if (yExists) {
      node.translation.y += node.y;
    }
    if (widthExists || heightExists) {
      node.scale = new vector_default(1, 1);
    }
    if (widthExists) {
      node.scale.x = node.width / width;
    }
    if (heightExists) {
      node.scale.y = node.height / height;
    }
    node.mask = new rectangle_default(0, 0, width, height);
    node.mask.origin.set(-width / 2, -height / 2);
    return node;
  };
  var applySvgAttributes = function(node, elem, parentStyles) {
    var styles = {}, attributes = {}, extracted = {}, i, m, key, value, prop, attr;
    var transforms, x, y;
    var id, scene, ref, tagName;
    if (root_default.getComputedStyle) {
      var computedStyles = root_default.getComputedStyle(node);
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
      underscore_default.defaults(styles, parentStyles);
    }
    underscore_default.extend(styles, extracted, attributes);
    styles.visible = !(typeof styles.display === "undefined" && /none/i.test(styles.display)) || typeof styles.visibility === "undefined" && /hidden/i.test(styles.visibility);
    for (key in styles) {
      value = styles[key];
      switch (key) {
        case "gradientTransform":
          if (/none/i.test(value))
            break;
          m = node.gradientTransform && node.gradientTransform.baseVal && node.gradientTransform.baseVal.length > 0 ? node.gradientTransform.baseVal[0].matrix : node.getCTM ? node.getCTM() : null;
          if (m === null)
            break;
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
          if (/none/i.test(value))
            break;
          m = node.transform && node.transform.baseVal && node.transform.baseVal.length > 0 ? node.transform.baseVal[0].matrix : node.getCTM ? node.getCTM() : null;
          if (m === null)
            break;
          if (constants_default.AutoCalculateImportedMatrices) {
            transforms = decomposeMatrix(m);
            elem.translation.set(transforms.translateX, transforms.translateY);
            elem.rotation = Math.PI * (transforms.rotation / 180);
            elem.scale = new vector_default(transforms.scaleX, transforms.scaleY);
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
          if (elem instanceof group_default) {
            elem._visible = value;
            break;
          }
          elem.visible = value;
          break;
        case "stroke-linecap":
          if (elem instanceof group_default) {
            elem._cap = value;
            break;
          }
          elem.cap = value;
          break;
        case "stroke-linejoin":
          if (elem instanceof group_default) {
            elem._join = value;
            break;
          }
          elem.join = value;
          break;
        case "stroke-miterlimit":
          if (elem instanceof group_default) {
            elem._miter = value;
            break;
          }
          elem.miter = value;
          break;
        case "stroke-width":
          if (elem instanceof group_default) {
            elem._linewidth = parseFloat(value);
            break;
          }
          elem.linewidth = parseFloat(value);
          break;
        case "opacity":
        case "stroke-opacity":
        case "fill-opacity":
          if (elem instanceof group_default) {
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
          prop = (elem instanceof group_default ? "_" : "") + key;
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
            elem[prop] = /none/i.test(value) ? "transparent" : value;
          }
          break;
        case "id":
          elem.id = value;
          break;
        case "class":
        case "className":
          elem.classList = value.split(" ");
          break;
        case "x":
        case "y":
          var ca = elem instanceof gradient_default;
          var cb = elem instanceof linear_gradient_default;
          var cc = elem instanceof radial_gradient_default;
          if (ca || cb || cc) {
            break;
          }
          if (value.match("[a-z%]$") && !value.endsWith("px")) {
            var error = new error_default("only pixel values are supported with the " + key + " attribute.");
            console.warn(error.name, error.message);
          }
          elem.translation[key] = parseFloat(value);
          break;
        case "font-family":
          if (elem instanceof text_default) {
            elem.family = value;
          }
          break;
        case "font-size":
          if (elem instanceof text_default) {
            elem.size = value;
          }
          break;
        case "font-weight":
          if (elem instanceof text_default) {
            elem.weight = value;
          }
          break;
        case "font-style":
          if (elem instanceof text_default) {
            elem.style = value;
          }
          break;
        case "text-decoration":
          if (elem instanceof text_default) {
            elem.decoration = value;
          }
          break;
        case "line-height":
          if (elem instanceof text_default) {
            elem.leading = value;
          }
          break;
      }
    }
    if (Object.keys(node.dataset).length)
      elem.dataset = node.dataset;
    return styles;
  };
  var updateDefsCache = function(node, defsCache) {
    for (var i = 0, l = node.childNodes.length; i < l; i++) {
      var n = node.childNodes[i];
      if (!n.id)
        continue;
      var tagName = getTagName(node.nodeName);
      if (tagName === "#text")
        continue;
      defsCache.add(n.id, n);
    }
  };
  var getScene = function(node) {
    while (node.parent) {
      node = node.parent;
    }
    return node.scene;
  };
  var read = {
    svg: function(node) {
      var defs = read.defs.current = new registry_default();
      var elements = node.getElementsByTagName("defs");
      for (var i = 0; i < elements.length; i++) {
        updateDefsCache(elements[i], defs);
      }
      var svg2 = read.g.call(this, node);
      var viewBox = node.getAttribute("viewBox");
      var x = node.getAttribute("x");
      var y = node.getAttribute("y");
      var width = node.getAttribute("width");
      var height = node.getAttribute("height");
      svg2.defs = defs;
      var viewBoxExists = viewBox !== null;
      var xExists = x !== null;
      var yExists = y !== null;
      var widthExists = width !== null;
      var heightExists = height !== null;
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
      var error;
      var href = node.getAttribute("href") || node.getAttribute("xlink:href");
      if (!href) {
        error = new error_default("encountered <use /> with no href.");
        console.warn(error.name, error.message);
        return null;
      }
      var id = href.slice(1);
      if (!read.defs.current.contains(id)) {
        error = new error_default("unable to find element for reference " + href + ".");
        console.warn(error.name, error.message);
        return null;
      }
      var template = read.defs.current.get(id);
      var fullNode = template.cloneNode(true);
      var overwriteAttrs = ["x", "y", "width", "height", "href", "xlink:href"];
      for (var i = 0; i < node.attributes.length; i++) {
        var attr = node.attributes[i];
        var ca = overwriteAttrs.includes(attr.nodeName);
        var cb = !fullNode.hasAttribute(attr.nodeName);
        if (ca || cb) {
          fullNode.setAttribute(attr.nodeName, attr.value);
        }
      }
      var tagName = getTagName(fullNode.nodeName);
      return read[tagName].call(this, fullNode, styles);
    },
    g: function(node, parentStyles) {
      var styles;
      var group = new group_default();
      applySvgAttributes.call(this, node, group, parentStyles);
      this.add(group);
      styles = getSvgStyles.call(this, node);
      for (var i = 0, l = node.childNodes.length; i < l; i++) {
        var n = node.childNodes[i];
        var tag = n.nodeName;
        if (!tag)
          return;
        var tagName = getTagName(tag);
        if (tagName in read) {
          var o = read[tagName].call(group, n, styles);
          if (!!o && !o.parent) {
            group.add(o);
          }
        }
      }
      if (group.classList.length > 0)
        group._flagClassName = true;
      return group;
    },
    polygon: function(node, parentStyles) {
      var points = node.getAttribute("points");
      var verts = [];
      points.replace(/(-?[\d.eE-]+)[,|\s](-?[\d.eE-]+)/g, function(match, p1, p2) {
        verts.push(new anchor_default(parseFloat(p1), parseFloat(p2)));
      });
      var poly = new path_default(verts, true).noStroke();
      poly.fill = "black";
      applySvgAttributes.call(this, node, poly, parentStyles);
      return poly;
    },
    polyline: function(node, parentStyles) {
      var poly = read.polygon.call(this, node, parentStyles);
      poly.closed = false;
      return poly;
    },
    path: function(node, parentStyles) {
      var path = node.getAttribute("d");
      var points = [];
      var closed2 = false, relative = false;
      if (path) {
        var coord = new anchor_default();
        var control, coords;
        var commands = path.match(/[a-df-z][^a-df-z]*/ig);
        var last = commands.length - 1;
        underscore_default.each(commands.slice(0), function(command, i) {
          var items = command.slice(1).trim().match(regex2.path);
          var type = command[0];
          var lower = type.toLowerCase();
          var bin, j, l, ct, times, result = [];
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
        underscore_default.each(commands, function(command, i) {
          var result, x, y;
          var type = command[0];
          var lower = type.toLowerCase();
          coords = command.slice(1).trim().match(regex2.path);
          relative = type === lower;
          var x1, y1, x2, y2, x3, y3, x4, y4, reflection;
          switch (lower) {
            case "z":
              if (i >= last) {
                closed2 = true;
              } else {
                x = coord.x;
                y = coord.y;
                result = new anchor_default(x, y, void 0, void 0, void 0, void 0, path_commands_default.close);
                for (var j = points.length - 1; j >= 0; j--) {
                  var point = points[j];
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
              result = new anchor_default(x, y, void 0, void 0, void 0, void 0, /m/i.test(lower) ? path_commands_default.move : path_commands_default.line);
              if (relative) {
                result.addSelf(coord);
              }
              coord = result;
              break;
            case "h":
            case "v":
              var a = /h/i.test(lower) ? "x" : "y";
              var b = /x/i.test(a) ? "y" : "x";
              result = new anchor_default(void 0, void 0, void 0, void 0, void 0, void 0, path_commands_default.line);
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
                control = new vector_default();
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
              if (!underscore_default.isObject(coord.controls)) {
                anchor_default.AppendCurveProperties(coord);
              }
              coord.controls.right.set(x2 - coord.x, y2 - coord.y);
              result = new anchor_default(x4, y4, x3 - x4, y3 - y4, void 0, void 0, path_commands_default.curve);
              coord = result;
              control = result.controls.left;
              break;
            case "t":
            case "q":
              x1 = coord.x;
              y1 = coord.y;
              if (!control) {
                control = new vector_default();
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
              if (!underscore_default.isObject(coord.controls)) {
                anchor_default.AppendCurveProperties(coord);
              }
              coord.controls.right.set((x2 - coord.x) * 0.33, (y2 - coord.y) * 0.33);
              result = new anchor_default(x4, y4, x3 - x4, y3 - y4, void 0, void 0, path_commands_default.curve);
              coord = result;
              control = result.controls.left;
              break;
            case "a":
              x1 = coord.x;
              y1 = coord.y;
              var rx = parseFloat(coords[0]);
              var ry = parseFloat(coords[1]);
              var xAxisRotation = parseFloat(coords[2]);
              var largeArcFlag = parseFloat(coords[3]);
              var sweepFlag = parseFloat(coords[4]);
              x4 = parseFloat(coords[5]);
              y4 = parseFloat(coords[6]);
              if (relative) {
                x4 += x1;
                y4 += y1;
              }
              var anchor2 = new anchor_default(x4, y4);
              anchor2.command = path_commands_default.arc;
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
      path = new path_default(points, closed2, void 0, true).noStroke();
      path.fill = "black";
      var rect = path.getBoundingClientRect(true);
      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      underscore_default.each(path.vertices, function(v) {
        v.subSelf(rect.centroid);
      });
      applySvgAttributes.call(this, node, path, parentStyles);
      path.translation.addSelf(rect.centroid);
      return path;
    },
    circle: function(node, parentStyles) {
      var x = parseFloat(node.getAttribute("cx"));
      var y = parseFloat(node.getAttribute("cy"));
      var r = parseFloat(node.getAttribute("r"));
      var circle = new circle_default(0, 0, r).noStroke();
      circle.fill = "black";
      applySvgAttributes.call(this, node, circle, parentStyles);
      circle.translation.x = x;
      circle.translation.y = y;
      return circle;
    },
    ellipse: function(node, parentStyles) {
      var x = parseFloat(node.getAttribute("cx"));
      var y = parseFloat(node.getAttribute("cy"));
      var width = parseFloat(node.getAttribute("rx"));
      var height = parseFloat(node.getAttribute("ry"));
      var ellipse = new ellipse_default(0, 0, width, height).noStroke();
      ellipse.fill = "black";
      applySvgAttributes.call(this, node, ellipse, parentStyles);
      ellipse.translation.x = x;
      ellipse.translation.y = y;
      return ellipse;
    },
    rect: function(node, parentStyles) {
      var rx = parseFloat(node.getAttribute("rx"));
      var ry = parseFloat(node.getAttribute("ry"));
      if (!underscore_default.isNaN(rx) || !underscore_default.isNaN(ry)) {
        return read["rounded-rect"](node);
      }
      var width = parseFloat(node.getAttribute("width"));
      var height = parseFloat(node.getAttribute("height"));
      var w2 = width / 2;
      var h2 = height / 2;
      var rect = new rectangle_default(0, 0, width, height).noStroke();
      rect.fill = "black";
      applySvgAttributes.call(this, node, rect, parentStyles);
      rect.translation.x += w2;
      rect.translation.y += h2;
      return rect;
    },
    "rounded-rect": function(node, parentStyles) {
      var rx = parseFloat(node.getAttribute("rx")) || 0;
      var ry = parseFloat(node.getAttribute("ry")) || 0;
      var width = parseFloat(node.getAttribute("width"));
      var height = parseFloat(node.getAttribute("height"));
      var w2 = width / 2;
      var h2 = height / 2;
      var radius = new vector_default(rx, ry);
      var rect = new rounded_rectangle_default(0, 0, width, height, radius).noStroke();
      rect.fill = "black";
      applySvgAttributes.call(this, node, rect, parentStyles);
      rect.translation.x += w2;
      rect.translation.y += h2;
      return rect;
    },
    line: function(node, parentStyles) {
      var x1 = parseFloat(node.getAttribute("x1"));
      var y1 = parseFloat(node.getAttribute("y1"));
      var x2 = parseFloat(node.getAttribute("x2"));
      var y2 = parseFloat(node.getAttribute("y2"));
      var line = new line_default(x1, y1, x2, y2).noFill();
      applySvgAttributes.call(this, node, line, parentStyles);
      return line;
    },
    lineargradient: function(node, parentStyles) {
      var units = node.getAttribute("gradientUnits");
      var spread = node.getAttribute("spreadMethod");
      if (!units) {
        units = "objectBoundingBox";
      }
      if (!spread) {
        spread = "pad";
      }
      var x1 = parseFloat(node.getAttribute("x1") || 0);
      var y1 = parseFloat(node.getAttribute("y1") || 0);
      var x2 = parseFloat(node.getAttribute("x2") || 0);
      var y2 = parseFloat(node.getAttribute("y2") || 0);
      var ox = (x2 + x1) / 2;
      var oy = (y2 + y1) / 2;
      if (/userSpaceOnUse/i.test(units)) {
        x1 -= ox;
        y1 -= oy;
        x2 -= ox;
        y2 -= oy;
      }
      var stops = [];
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        var offset = child.getAttribute("offset");
        if (/%/ig.test(offset)) {
          offset = parseFloat(offset.replace(/%/ig, "")) / 100;
        }
        offset = parseFloat(offset);
        var color = child.getAttribute("stop-color");
        var opacity = child.getAttribute("stop-opacity");
        var style = child.getAttribute("style");
        var matches;
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
        stops.push(new stop_default(offset, color, opacity));
      }
      var gradient = new linear_gradient_default(x1, y1, x2, y2, stops);
      gradient.spread = spread;
      gradient.units = units;
      applySvgAttributes.call(this, node, gradient, parentStyles);
      return gradient;
    },
    radialgradient: function(node, parentStyles) {
      var units = node.getAttribute("gradientUnits");
      var spread = node.getAttribute("spreadMethod");
      if (!units) {
        units = "objectBoundingBox";
      }
      if (!spread) {
        spread = "pad";
      }
      var cx = parseFloat(node.getAttribute("cx")) || 0;
      var cy = parseFloat(node.getAttribute("cy")) || 0;
      var r = parseFloat(node.getAttribute("r"));
      var fx = parseFloat(node.getAttribute("fx"));
      var fy = parseFloat(node.getAttribute("fy"));
      if (underscore_default.isNaN(fx)) {
        fx = cx;
      }
      if (underscore_default.isNaN(fy)) {
        fy = cy;
      }
      var ox = Math.abs(cx + fx) / 2;
      var oy = Math.abs(cy + fy) / 2;
      if (/userSpaceOnUse/i.test(units)) {
        cx -= ox;
        cy -= oy;
        fx -= ox;
        fy -= oy;
      }
      var stops = [];
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        var offset = child.getAttribute("offset");
        if (/%/ig.test(offset)) {
          offset = parseFloat(offset.replace(/%/ig, "")) / 100;
        }
        offset = parseFloat(offset);
        var color = child.getAttribute("stop-color");
        var opacity = child.getAttribute("stop-opacity");
        var style = child.getAttribute("style");
        var matches;
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
        stops.push(new stop_default(offset, color, opacity));
      }
      var gradient = new radial_gradient_default(cx, cy, r, stops, fx, fy);
      applySvgAttributes.call(this, node, gradient, parentStyles);
      return gradient;
    },
    text: function(node, parentStyles) {
      var alignment = getAlignment(node.getAttribute("text-anchor")) || "left";
      var baseline = getBaseline(node) || "baseline";
      var message = node.textContent;
      var text = new text_default(message);
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
      var href = node.getAttribute("href") || node.getAttribute("xlink:href");
      if (!href) {
        var error = new error_default("encountered <image /> with no href.");
        console.warn(error.name, error.message);
        return null;
      }
      var x = parseFloat(node.getAttribute("x")) || 0;
      var y = parseFloat(node.getAttribute("y")) || 0;
      var width = parseFloat(node.getAttribute("width"));
      var height = parseFloat(node.getAttribute("height"));
      var sprite = new sprite_default(href, x, y);
      if (!underscore_default.isNaN(width)) {
        sprite.width = width;
      }
      if (!underscore_default.isNaN(height)) {
        sprite.height = height;
      }
      applySvgAttributes.call(this, node, sprite, parentStyles);
      return sprite;
    }
  };
  var interpret_svg_default = read;

  // src/utils/xhr.js
  function xhr(path, callback) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", path);
    xhr2.onreadystatechange = function() {
      if (xhr2.readyState === 4 && xhr2.status === 200) {
        callback(xhr2.responseText);
      }
    };
    xhr2.send();
    return xhr2;
  }
  var xhr_default = xhr;

  // src/effects/image-sequence.js
  function ImageSequence(paths, ox, oy, frameRate) {
    path_default.call(this, [
      new anchor_default(),
      new anchor_default(),
      new anchor_default(),
      new anchor_default()
    ], true);
    this._renderer.flagTextures = ImageSequence.FlagTextures.bind(this);
    this._renderer.bindTextures = ImageSequence.BindTextures.bind(this);
    this._renderer.unbindTextures = ImageSequence.UnbindTextures.bind(this);
    this.noStroke();
    this.noFill();
    if (Array.isArray(paths)) {
      this.textures = paths.map(ImageSequence.GenerateTexture.bind(this));
    } else {
      this.textures = [ImageSequence.GenerateTexture(paths)];
    }
    this.origin = new vector_default();
    this._update();
    this.translation.set(ox || 0, oy || 0);
    if (typeof frameRate === "number") {
      this.frameRate = frameRate;
    } else {
      this.frameRate = ImageSequence.DefaultFrameRate;
    }
    this.index = 0;
  }
  underscore_default.extend(ImageSequence, {
    Properties: [
      "frameRate",
      "index"
    ],
    DefaultFrameRate: 30,
    FlagTextures: function() {
      this._flagTextures = true;
    },
    BindTextures: function(items) {
      var i = items.length;
      while (i--) {
        items[i].bind(events_default.Types.change, this._renderer.flagTextures);
      }
      this._renderer.flagTextures();
    },
    UnbindTextures: function(items) {
      var i = items.length;
      while (i--) {
        items[i].unbind(events_default.Types.change, this._renderer.flagTextures);
      }
      this._renderer.flagTextures();
    },
    MakeObservable: function(obj) {
      rectangle_default.MakeObservable(obj);
      underscore_default.each(ImageSequence.Properties, get_set_default, obj);
      Object.defineProperty(obj, "textures", {
        enumerable: true,
        get: function() {
          return this._textures;
        },
        set: function(textures) {
          var bindTextures = this._renderer.bindTextures;
          var unbindTextures = this._renderer.unbindTextures;
          if (this._textures) {
            this._textures.unbind(events_default.Types.insert, bindTextures).unbind(events_default.Types.remove, unbindTextures);
          }
          this._textures = new collection_default((textures || []).slice(0));
          this._textures.bind(events_default.Types.insert, bindTextures).bind(events_default.Types.remove, unbindTextures);
          bindTextures(this._textures);
        }
      });
    },
    GenerateTexture: function(obj) {
      if (obj instanceof texture_default) {
        return obj;
      } else if (typeof obj === "string") {
        return new texture_default(obj);
      }
    }
  });
  underscore_default.extend(ImageSequence.prototype, rectangle_default.prototype, {
    constructor: ImageSequence,
    _flagTextures: false,
    _flagFrameRate: false,
    _flagIndex: false,
    _amount: 1,
    _duration: 0,
    _index: 0,
    _startTime: 0,
    _playing: false,
    _firstFrame: 0,
    _lastFrame: 0,
    _loop: true,
    _textures: null,
    _frameRate: 0,
    _origin: null,
    play: function(firstFrame, lastFrame, onLastFrame) {
      this._playing = true;
      this._firstFrame = 0;
      this._lastFrame = this.amount - 1;
      this._startTime = underscore_default.performance.now();
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
    },
    pause: function() {
      this._playing = false;
      return this;
    },
    stop: function() {
      this._playing = false;
      this._index = this._firstFrame;
      return this;
    },
    clone: function(parent) {
      var clone = new ImageSequence(this.textures, this.translation.x, this.translation.y, this.frameRate);
      clone._loop = this._loop;
      if (this._playing) {
        clone.play();
      }
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var object = rectangle_default.prototype.toObject.call(this);
      object.textures = this.textures.map(function(texture) {
        return texture.toObject();
      });
      object.frameRate = this.frameRate;
      object.index = this.index;
      object._firstFrame = this._firstFrame;
      object._lastFrame = this._lastFrame;
      object._loop = this._loop;
      return object;
    },
    _update: function() {
      var effects = this._textures;
      var width, height, elapsed, amount, duration, texture;
      var index, frames;
      if (this._flagTextures) {
        this._amount = effects.length;
      }
      if (this._flagFrameRate) {
        this._duration = 1e3 * this._amount / this._frameRate;
      }
      if (this._playing && this._frameRate > 0) {
        amount = this._amount;
        if (underscore_default.isNaN(this._lastFrame)) {
          this._lastFrame = amount - 1;
        }
        elapsed = underscore_default.performance.now() - this._startTime;
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
          texture = effects[this._index];
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
      } else if (this._flagIndex || !(this.fill instanceof texture_default)) {
        texture = effects[this._index];
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
      rectangle_default.prototype._update.call(this);
      return this;
    },
    flagReset: function() {
      this._flagTextures = this._flagFrameRate = false;
      rectangle_default.prototype.flagReset.call(this);
      return this;
    }
  });
  ImageSequence.MakeObservable(ImageSequence.prototype);
  var image_sequence_default = ImageSequence;

  // src/shapes/arc-segment.js
  function ArcSegment(ox, oy, ir, or, sa, ea, res) {
    var amount = res || constants_default.Resolution * 3;
    var points = [];
    for (var i = 0; i < amount; i++) {
      points.push(new anchor_default());
    }
    path_default.call(this, points, true, false, true);
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
    if (typeof ox === "number") {
      this.translation.x = ox;
    }
    if (typeof oy === "number") {
      this.translation.y = oy;
    }
  }
  underscore_default.extend(ArcSegment, {
    Properties: ["startAngle", "endAngle", "innerRadius", "outerRadius"],
    MakeObservable: function(obj) {
      path_default.MakeObservable(obj);
      underscore_default.each(ArcSegment.Properties, get_set_default, obj);
    }
  });
  underscore_default.extend(ArcSegment.prototype, path_default.prototype, {
    constructor: ArcSegment,
    _flagStartAngle: false,
    _flagEndAngle: false,
    _flagInnerRadius: false,
    _flagOuterRadius: false,
    _startAngle: 0,
    _endAngle: TWO_PI,
    _innerRadius: 0,
    _outerRadius: 0,
    _update: function() {
      if (this._flagVertices || this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius || this._flagOuterRadius) {
        var sa = this._startAngle;
        var ea = this._endAngle;
        var ir = this._innerRadius;
        var or = this._outerRadius;
        var connected = mod(sa, TWO_PI) === mod(ea, TWO_PI);
        var punctured = ir > 0;
        var vertices = this.vertices;
        var length = punctured ? vertices.length / 2 : vertices.length;
        var command, id = 0;
        if (connected) {
          length--;
        } else if (!punctured) {
          length -= 2;
        }
        for (var i = 0, last = length - 1; i < length; i++) {
          var pct = i / last;
          var v = vertices[id];
          var theta = pct * (ea - sa) + sa;
          var step = (ea - sa) / length;
          var x = or * Math.cos(theta);
          var y = or * Math.sin(theta);
          switch (i) {
            case 0:
              command = path_commands_default.move;
              break;
            default:
              command = path_commands_default.curve;
          }
          v.command = command;
          v.x = x;
          v.y = y;
          v.controls.left.clear();
          v.controls.right.clear();
          if (v.command === path_commands_default.curve) {
            var amp = or * step / Math.PI;
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
            vertices[id].command = path_commands_default.close;
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
            command = path_commands_default.curve;
            if (i <= 0) {
              command = connected ? path_commands_default.move : path_commands_default.line;
            }
            v.command = command;
            v.x = x;
            v.y = y;
            v.controls.left.clear();
            v.controls.right.clear();
            if (v.command === path_commands_default.curve) {
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
          vertices[id].command = path_commands_default.line;
        } else if (!connected) {
          vertices[id].command = path_commands_default.line;
          vertices[id].x = 0;
          vertices[id].y = 0;
          id++;
          vertices[id].copy(vertices[0]);
          vertices[id].command = path_commands_default.line;
        }
      }
      path_default.prototype._update.call(this);
      return this;
    },
    flagReset: function() {
      path_default.prototype.flagReset.call(this);
      this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = false;
      return this;
    },
    clone: function(parent) {
      var ir = this.innerRadius;
      var or = this.outerRadius;
      var sa = this.startAngle;
      var ea = this.endAngle;
      var resolution = this.vertices.length;
      var clone = new ArcSegment(0, 0, ir, or, sa, ea, resolution);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      underscore_default.each(path_default.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var object = path_default.prototype.toObject.call(this);
      underscore_default.each(ArcSegment.Properties, function(property) {
        object[property] = this[property];
      }, this);
      return object;
    }
  });
  ArcSegment.MakeObservable(ArcSegment.prototype);
  var arc_segment_default = ArcSegment;

  // src/shapes/points.js
  var ceil2 = Math.ceil;
  var floor3 = Math.floor;
  function Points(vertices) {
    shape_default.call(this);
    this._renderer.type = "points";
    this._renderer.flagVertices = path_default.FlagVertices.bind(this);
    this._renderer.bindVertices = path_default.BindVertices.bind(this);
    this._renderer.unbindVertices = path_default.UnbindVertices.bind(this);
    this._renderer.flagFill = path_default.FlagFill.bind(this);
    this._renderer.flagStroke = path_default.FlagStroke.bind(this);
    this._renderer.vertices = null;
    this._renderer.collection = null;
    this.sizeAttenuation = false;
    this.beginning = 0;
    this.ending = 1;
    this.fill = "#fff";
    this.stroke = "#000";
    this.className = "";
    this.visible = true;
    this.vertices = vertices;
    this.dashes = [];
    this.dashes.offset = 0;
  }
  underscore_default.extend(Points, {
    Properties: [
      "fill",
      "stroke",
      "linewidth",
      "opacity",
      "visible",
      "size",
      "sizeAttenuation",
      "beginning",
      "ending"
    ],
    MakeObservable: function(object) {
      shape_default.MakeObservable(object);
      underscore_default.each(Points.Properties.slice(2, 7), get_set_default, object);
      Object.defineProperty(object, "fill", {
        enumerable: true,
        get: function() {
          return this._fill;
        },
        set: function(f) {
          if (this._fill instanceof gradient_default || this._fill instanceof linear_gradient_default || this._fill instanceof radial_gradient_default || this._fill instanceof texture_default) {
            this._fill.unbind(events_default.Types.change, this._renderer.flagFill);
          }
          this._fill = f;
          this._flagFill = true;
          if (this._fill instanceof gradient_default || this._fill instanceof linear_gradient_default || this._fill instanceof radial_gradient_default || this._fill instanceof texture_default) {
            this._fill.bind(events_default.Types.change, this._renderer.flagFill);
          }
        }
      });
      Object.defineProperty(object, "stroke", {
        enumerable: true,
        get: function() {
          return this._stroke;
        },
        set: function(f) {
          if (this._stroke instanceof gradient_default || this._stroke instanceof linear_gradient_default || this._stroke instanceof radial_gradient_default || this._stroke instanceof texture_default) {
            this._stroke.unbind(events_default.Types.change, this._renderer.flagStroke);
          }
          this._stroke = f;
          this._flagStroke = true;
          if (this._stroke instanceof gradient_default || this._stroke instanceof linear_gradient_default || this._stroke instanceof radial_gradient_default || this._stroke instanceof texture_default) {
            this._stroke.bind(events_default.Types.change, this._renderer.flagStroke);
          }
        }
      });
      Object.defineProperty(object, "length", {
        get: function() {
          if (this._flagLength) {
            this._updateLength();
          }
          return this._length;
        }
      });
      Object.defineProperty(object, "beginning", {
        enumerable: true,
        get: function() {
          return this._beginning;
        },
        set: function(v) {
          this._beginning = v;
          this._flagVertices = true;
        }
      });
      Object.defineProperty(object, "ending", {
        enumerable: true,
        get: function() {
          return this._ending;
        },
        set: function(v) {
          this._ending = v;
          this._flagVertices = true;
        }
      });
      Object.defineProperty(object, "vertices", {
        enumerable: true,
        get: function() {
          return this._collection;
        },
        set: function(vertices) {
          var bindVertices = this._renderer.bindVertices;
          var unbindVertices = this._renderer.unbindVertices;
          if (this._collection) {
            this._collection.unbind(events_default.Types.insert, bindVertices).unbind(events_default.Types.remove, unbindVertices);
          }
          if (vertices instanceof collection_default) {
            this._collection = vertices;
          } else {
            this._collection = new collection_default(vertices || []);
          }
          this._collection.bind(events_default.Types.insert, bindVertices).bind(events_default.Types.remove, unbindVertices);
          bindVertices(this._collection);
        }
      });
      Object.defineProperty(object, "dashes", {
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
      });
    }
  });
  underscore_default.extend(Points.prototype, shape_default.prototype, {
    constructor: Points,
    _flagVertices: true,
    _flagLength: true,
    _flagFill: true,
    _flagStroke: true,
    _flagLinewidth: true,
    _flagOpacity: true,
    _flagVisible: true,
    _flagSize: true,
    _flagSizeAttenuation: true,
    _length: 0,
    _fill: "#fff",
    _stroke: "#000",
    _linewidth: 1,
    _opacity: 1,
    _visible: true,
    _size: 1,
    _sizeAttenuation: false,
    _beginning: 0,
    _ending: 1,
    _dashes: null,
    clone: function(parent) {
      var clone = new Points();
      for (var j = 0; j < this.vertices.length; j++) {
        clone.vertices.push(this.vertices[j].clone());
      }
      for (var i = 0; i < Points.Properties.length; i++) {
        var k = Points.Properties[i];
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
    },
    toObject: function() {
      var result = {
        vertices: this.vertices.map(function(v) {
          return v.toObject();
        })
      };
      underscore_default.each(Points.Properties, function(k) {
        result[k] = this[k];
      }, this);
      result.className = this.className;
      result.translation = this.translation.toObject();
      result.rotation = this.rotation;
      result.scale = this.scale instanceof vector_default ? this.scale.toObject() : this.scale;
      result.skewX = this.skewX;
      result.skewY = this.skewY;
      if (this.matrix.manual) {
        result.matrix = this.matrix.toObject();
      }
      return result;
    },
    noFill: path_default.prototype.noFill,
    noStroke: path_default.prototype.noStroke,
    corner: path_default.prototype.corner,
    center: path_default.prototype.center,
    remove: path_default.prototype.remove,
    getBoundingClientRect: path_default.prototype.getBoundingClientRect,
    subdivide: function(limit) {
      this._update();
      var points = [];
      for (var i = 0; i < this.vertices.length; i++) {
        var a = this.vertices[i];
        var b = this.vertices[i - 1];
        if (!b) {
          continue;
        }
        var x1 = a.x;
        var y1 = a.y;
        var x2 = b.x;
        var y2 = b.y;
        var subdivisions = subdivide(x1, y1, x1, y1, x2, y2, x2, y2, limit);
        points = points.concat(subdivisions);
      }
      this.vertices = points;
      return this;
    },
    _updateLength: path_default.prototype._updateLength,
    _update: function() {
      if (this._flagVertices) {
        if (this._flagLength) {
          this._updateLength(void 0, true);
        }
        var beginning = Math.min(this._beginning, this._ending);
        var ending = Math.max(this._beginning, this._ending);
        var bid = getIdByLength(this, beginning * this._length);
        var eid = getIdByLength(this, ending * this._length);
        var low = ceil2(bid);
        var high = floor3(eid);
        this._renderer.vertices = [];
        this._renderer.collection = [];
        var j = 0, v;
        for (var i = 0; i < this._collection.length; i++) {
          if (i >= low && i <= high) {
            v = this._collection[i];
            this._renderer.collection.push(v);
            this._renderer.vertices[j * 2 + 0] = v.x;
            this._renderer.vertices[j * 2 + 1] = v.y;
            j++;
          }
        }
      }
      shape_default.prototype._update.apply(this, arguments);
      return this;
    },
    flagReset: function() {
      this._flagVertices = this._flagLength = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagSize = this._flagSizeAttenuation = false;
      shape_default.prototype.flagReset.call(this);
      return this;
    }
  });
  Points.MakeObservable(Points.prototype);
  var points_default = Points;

  // src/shapes/polygon.js
  var cos5 = Math.cos;
  var sin5 = Math.sin;
  function Polygon(ox, oy, r, sides) {
    sides = Math.max(sides || 0, 3);
    path_default.call(this);
    this.closed = true;
    this.automatic = false;
    if (typeof r === "number") {
      this.width = r * 2;
    }
    if (typeof r === "number") {
      this.height = r * 2;
    }
    if (typeof sides === "number") {
      this.sides = sides;
    }
    this._update();
    if (typeof ox === "number") {
      this.translation.x = ox;
    }
    if (typeof oy === "number") {
      this.translation.y = oy;
    }
  }
  underscore_default.extend(Polygon, {
    Properties: ["width", "height", "sides"],
    MakeObservable: function(obj) {
      path_default.MakeObservable(obj);
      underscore_default.each(Polygon.Properties, get_set_default, obj);
    }
  });
  underscore_default.extend(Polygon.prototype, path_default.prototype, {
    constructor: Polygon,
    _flagWidth: false,
    _flagHeight: false,
    _flagSides: false,
    _width: 0,
    _height: 0,
    _sides: 0,
    _update: function() {
      if (this._flagVertices || this._flagWidth || this._flagHeight || this._flagSides) {
        var sides = this._sides;
        var amount = sides + 1;
        var length = this.vertices.length;
        if (length > sides) {
          this.vertices.splice(sides - 1, length - sides);
          length = sides;
        }
        for (var i = 0; i < amount; i++) {
          var pct = (i + 0.5) / sides;
          var theta = TWO_PI * pct + Math.PI / 2;
          var x = this._width * cos5(theta) / 2;
          var y = this._height * sin5(theta) / 2;
          if (i >= length) {
            this.vertices.push(new anchor_default(x, y));
          } else {
            this.vertices[i].set(x, y);
          }
          this.vertices[i].command = i === 0 ? path_commands_default.move : path_commands_default.line;
        }
      }
      path_default.prototype._update.call(this);
      return this;
    },
    flagReset: function() {
      this._flagWidth = this._flagHeight = this._flagSides = false;
      path_default.prototype.flagReset.call(this);
      return this;
    },
    clone: function(parent) {
      var clone = new Polygon(0, 0, this.radius, this.sides);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      underscore_default.each(path_default.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var object = path_default.prototype.toObject.call(this);
      underscore_default.each(Polygon.Properties, function(property) {
        object[property] = this[property];
      }, this);
      return object;
    }
  });
  Polygon.MakeObservable(Polygon.prototype);
  var polygon_default = Polygon;

  // src/shapes/star.js
  var cos6 = Math.cos;
  var sin6 = Math.sin;
  function Star(ox, oy, ir, or, sides) {
    if (arguments.length <= 3) {
      or = ir;
      ir = or / 2;
    }
    if (typeof sides !== "number" || sides <= 0) {
      sides = 5;
    }
    path_default.call(this);
    this.closed = true;
    this.automatic = false;
    if (typeof ir === "number") {
      this.innerRadius = ir;
    }
    if (typeof or === "number") {
      this.outerRadius = or;
    }
    if (typeof sides === "number") {
      this.sides = sides;
    }
    this._update();
    if (typeof ox === "number") {
      this.translation.x = ox;
    }
    if (typeof oy === "number") {
      this.translation.y = oy;
    }
  }
  underscore_default.extend(Star, {
    Properties: ["innerRadius", "outerRadius", "sides"],
    MakeObservable: function(obj) {
      path_default.MakeObservable(obj);
      underscore_default.each(Star.Properties, get_set_default, obj);
    }
  });
  underscore_default.extend(Star.prototype, path_default.prototype, {
    constructor: Star,
    _flagInnerRadius: false,
    _flagOuterRadius: false,
    _flagSides: false,
    _innerRadius: 0,
    _outerRadius: 0,
    _sides: 0,
    _update: function() {
      if (this._flagVertices || this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {
        var sides = this._sides * 2;
        var amount = sides + 1;
        var length = this.vertices.length;
        if (length > sides) {
          this.vertices.splice(sides - 1, length - sides);
          length = sides;
        }
        for (var i = 0; i < amount; i++) {
          var pct = (i + 0.5) / sides;
          var theta = TWO_PI * pct;
          var r = (!(i % 2) ? this._innerRadius : this._outerRadius) / 2;
          var x = r * cos6(theta);
          var y = r * sin6(theta);
          if (i >= length) {
            this.vertices.push(new anchor_default(x, y));
          } else {
            this.vertices[i].set(x, y);
          }
          this.vertices[i].command = i === 0 ? path_commands_default.move : path_commands_default.line;
        }
      }
      path_default.prototype._update.call(this);
      return this;
    },
    flagReset: function() {
      this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false;
      path_default.prototype.flagReset.call(this);
      return this;
    },
    clone: function(parent) {
      var ir = this.innerRadius;
      var or = this.outerRadius;
      var sides = this.sides;
      var clone = new Star(0, 0, ir, or, sides);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.skewX = this.skewX;
      clone.skewY = this.skewY;
      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }
      underscore_default.each(path_default.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      if (parent) {
        parent.add(clone);
      }
      return clone;
    },
    toObject: function() {
      var object = path_default.prototype.toObject.call(this);
      underscore_default.each(Star.Properties, function(property) {
        object[property] = this[property];
      }, this);
      return object;
    }
  });
  Star.MakeObservable(Star.prototype);
  var star_default = Star;

  // src/renderers/svg.js
  var matrix2 = new matrix_default();
  var svg = {
    version: 1.1,
    ns: "http://www.w3.org/2000/svg",
    xlink: "http://www.w3.org/1999/xlink",
    alignments: {
      left: "start",
      center: "middle",
      right: "end"
    },
    createElement: function(name, attrs) {
      var tag = name;
      var elem = document.createElementNS(svg.ns, tag);
      if (tag === "svg") {
        attrs = underscore_default.defaults(attrs || {}, {
          version: svg.version
        });
      }
      if (attrs && Object.keys(attrs).length > 0) {
        svg.setAttributes(elem, attrs);
      }
      return elem;
    },
    setAttributes: function(elem, attrs) {
      var keys = Object.keys(attrs);
      for (var i = 0; i < keys.length; i++) {
        if (/href/.test(keys[i])) {
          elem.setAttributeNS(svg.xlink, keys[i], attrs[keys[i]]);
        } else {
          elem.setAttribute(keys[i], attrs[keys[i]]);
        }
      }
      return this;
    },
    removeAttributes: function(elem, attrs) {
      for (var key in attrs) {
        elem.removeAttribute(key);
      }
      return this;
    },
    toString: function(points, closed2) {
      var l = points.length, last = l - 1, d, string = "";
      for (var i = 0; i < l; i++) {
        var b = points[i];
        var command;
        var prev = closed2 ? mod(i - 1, l) : Math.max(i - 1, 0);
        var a = points[prev];
        var vx, vy, ux, uy, ar, bl, br, c, cl;
        var rx, ry, xAxisRotation, largeArcFlag, sweepFlag;
        var x = toFixed(b.x);
        var y = toFixed(b.y);
        switch (b.command) {
          case path_commands_default.close:
            command = path_commands_default.close;
            break;
          case path_commands_default.arc:
            rx = b.rx;
            ry = b.ry;
            xAxisRotation = b.xAxisRotation;
            largeArcFlag = b.largeArcFlag;
            sweepFlag = b.sweepFlag;
            command = path_commands_default.arc + " " + rx + " " + ry + " " + xAxisRotation + " " + largeArcFlag + " " + sweepFlag + " " + x + " " + y;
            break;
          case path_commands_default.curve:
            ar = a.controls && a.controls.right || vector_default.zero;
            bl = b.controls && b.controls.left || vector_default.zero;
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
            command = (i === 0 ? path_commands_default.move : path_commands_default.curve) + " " + vx + " " + vy + " " + ux + " " + uy + " " + x + " " + y;
            break;
          case path_commands_default.move:
            d = b;
            command = path_commands_default.move + " " + x + " " + y;
            break;
          default:
            command = b.command + " " + x + " " + y;
        }
        if (i >= last && closed2) {
          if (b.command === path_commands_default.curve) {
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
          if (b.command !== path_commands_default.close) {
            command += " Z";
          }
        }
        string += command + " ";
      }
      return string;
    },
    pointsToString: function(points, size) {
      var string = "";
      var r = size * 0.5;
      for (var i = 0; i < points.length; i++) {
        var x = points[i].x;
        var y = points[i].y - r;
        string += path_commands_default.move + " " + x + " " + y + " ";
        string += "a " + r + " " + r + " 0 1 0 0.001 0 Z";
      }
      return string;
    },
    getClip: function(shape, domElement) {
      var clip = shape._renderer.clip;
      if (!clip) {
        clip = shape._renderer.clip = svg.createElement("clipPath", {
          "clip-rule": "nonzero"
        });
        domElement.defs.appendChild(clip);
      }
      return clip;
    },
    group: {
      appendChild: function(object) {
        var elem = object._renderer.elem;
        if (!elem) {
          return;
        }
        var tag = elem.nodeName;
        if (!tag || /(radial|linear)gradient/i.test(tag) || object._clip) {
          return;
        }
        this.elem.appendChild(elem);
      },
      removeChild: function(object) {
        var elem = object._renderer.elem;
        if (!elem || elem.parentNode != this.elem) {
          return;
        }
        var tag = elem.nodeName;
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
        svg[child._renderer.type].render.call(child, this);
      },
      render: function(domElement) {
        if (!this._visible && !this._flagVisible || this._opacity === 0 && !this._flagOpacity) {
          return this;
        }
        this._update();
        if (!this._renderer.elem) {
          this._renderer.elem = svg.createElement("g", {
            id: this.id
          });
          domElement.appendChild(this._renderer.elem);
        }
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var context = {
          domElement,
          elem: this._renderer.elem
        };
        if (flagMatrix) {
          this._renderer.elem.setAttribute("transform", "matrix(" + this._matrix.toString() + ")");
        }
        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i];
          svg[child._renderer.type].render.call(child, domElement);
        }
        if (this._flagId) {
          this._renderer.elem.setAttribute("id", this._id);
        }
        if (this._flagOpacity) {
          this._renderer.elem.setAttribute("opacity", this._opacity);
        }
        if (this._flagVisible) {
          this._renderer.elem.setAttribute("display", this._visible ? "inline" : "none");
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
            svg[this._mask._renderer.type].render.call(this._mask, domElement);
            this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")");
          } else {
            this._renderer.elem.removeAttribute("clip-path");
          }
        }
        if (this.dataset) {
          for (var key in this.dataset) {
            this._renderer.elem.setAttribute("data-" + key, this.dataset[key]);
          }
        }
        return this.flagReset();
      }
    },
    path: {
      render: function(domElement) {
        if (this._opacity === 0 && !this._flagOpacity) {
          return this;
        }
        this._update();
        var changed = {};
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        if (flagMatrix) {
          changed.transform = "matrix(" + this._matrix.toString() + ")";
        }
        if (this._flagId) {
          changed.id = this._id;
        }
        if (this._flagVertices) {
          var vertices = svg.toString(this._renderer.vertices, this._closed);
          changed.d = vertices;
        }
        if (this._fill && this._fill._renderer) {
          this._fill._update();
          svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
        }
        if (this._flagFill) {
          changed.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill;
        }
        if (this._stroke && this._stroke._renderer) {
          this._stroke._update();
          svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
        }
        if (this._flagStroke) {
          changed.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke;
        }
        if (this._flagLinewidth) {
          changed["stroke-width"] = this._linewidth;
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
          var clip = svg.getClip(this, domElement);
          var elem = this._renderer.elem;
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
            svg[this._mask._renderer.type].render.call(this._mask, domElement);
            this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")");
          } else {
            this._renderer.elem.removeAttribute("clip-path");
          }
        }
        return this.flagReset();
      }
    },
    points: {
      render: function(domElement) {
        if (this._opacity === 0 && !this._flagOpacity) {
          return this;
        }
        this._update();
        var changed = {};
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        if (flagMatrix) {
          changed.transform = "matrix(" + this._matrix.toString() + ")";
        }
        if (this._flagId) {
          changed.id = this._id;
        }
        if (this._flagVertices || this._flagSize || this._flagSizeAttenuation) {
          var size = this._size;
          if (!this._sizeAttenuation) {
            getComputedMatrix(this, matrix2);
            var me = matrix2.elements;
            var m = decomposeMatrix(me[0], me[3], me[1], me[4], me[2], me[5]);
            size /= Math.max(m.scaleX, m.scaleY);
          }
          var vertices = svg.pointsToString(this._renderer.collection, size);
          changed.d = vertices;
        }
        if (this._fill && this._fill._renderer) {
          this._fill._update();
          svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
        }
        if (this._flagFill) {
          changed.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill;
        }
        if (this._stroke && this._stroke._renderer) {
          this._stroke._update();
          svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
        }
        if (this._flagStroke) {
          changed.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke;
        }
        if (this._flagLinewidth) {
          changed["stroke-width"] = this._linewidth;
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
        return this.flagReset();
      }
    },
    text: {
      render: function(domElement) {
        this._update();
        var changed = {};
        var flagMatrix = this._matrix.manual || this._flagMatrix;
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
          changed["alignment-baseline"] = changed["dominant-baseline"] = this._baseline;
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
        if (this._fill && this._fill._renderer) {
          this._fill._update();
          svg[this._fill._renderer.type].render.call(this._fill, domElement, true);
        }
        if (this._flagFill) {
          changed.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill;
        }
        if (this._stroke && this._stroke._renderer) {
          this._stroke._update();
          svg[this._stroke._renderer.type].render.call(this._stroke, domElement, true);
        }
        if (this._flagStroke) {
          changed.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke;
        }
        if (this._flagLinewidth) {
          changed["stroke-width"] = this._linewidth;
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
          domElement.defs.appendChild(this._renderer.elem);
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (this._flagClip) {
          var clip = svg.getClip(this, domElement);
          var elem = this._renderer.elem;
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
            svg[this._mask._renderer.type].render.call(this._mask, domElement);
            this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")");
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
        if (!silent) {
          this._update();
        }
        var changed = {};
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
          domElement.defs.appendChild(this._renderer.elem);
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (this._flagStops) {
          var lengthChanged = this._renderer.elem.childNodes.length !== this.stops.length;
          if (lengthChanged) {
            while (this._renderer.elem.lastChild) {
              this._renderer.elem.removeChild(this._renderer.elem.lastChild);
            }
          }
          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            var attrs = {};
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
        return this.flagReset();
      }
    },
    "radial-gradient": {
      render: function(domElement, silent) {
        if (!silent) {
          this._update();
        }
        var changed = {};
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
          domElement.defs.appendChild(this._renderer.elem);
        } else {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (this._flagStops) {
          var lengthChanged = this._renderer.elem.childNodes.length !== this.stops.length;
          if (lengthChanged) {
            while (this._renderer.elem.lastChild) {
              this._renderer.elem.removeChild(this._renderer.elem.lastChild);
            }
          }
          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            var attrs = {};
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
        return this.flagReset();
      }
    },
    texture: {
      render: function(domElement, silent) {
        if (!silent) {
          this._update();
        }
        var changed = {};
        var styles = { x: 0, y: 0 };
        var image = this.image;
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
            if (this._scale instanceof vector_default) {
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
            styles.width = changed.width = image.width;
            styles.height = changed.height = image.height;
            switch (this._repeat) {
              case "no-repeat":
                changed.width += 1;
                changed.height += 1;
                break;
            }
            if (this._scale instanceof vector_default) {
              changed.width *= this._scale.x;
              changed.height *= this._scale.y;
            } else {
              changed.width *= this._scale;
              changed.height *= this._scale;
            }
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
          domElement.defs.appendChild(this._renderer.elem);
        } else if (Object.keys(changed).length !== 0) {
          svg.setAttributes(this._renderer.elem, changed);
        }
        if (this._renderer.elem && this._renderer.image && !this._renderer.appended) {
          this._renderer.elem.appendChild(this._renderer.image);
          this._renderer.appended = true;
        }
        return this.flagReset();
      }
    }
  };
  function Renderer2(params) {
    this.domElement = params.domElement || svg.createElement("svg");
    this.scene = new group_default();
    this.scene.parent = this;
    this.defs = svg.createElement("defs");
    this.domElement.appendChild(this.defs);
    this.domElement.defs = this.defs;
    this.domElement.style.overflow = "hidden";
  }
  underscore_default.extend(Renderer2, {
    Utils: svg
  });
  underscore_default.extend(Renderer2.prototype, events_default, {
    constructor: Renderer2,
    setSize: function(width, height) {
      this.width = width;
      this.height = height;
      svg.setAttributes(this.domElement, {
        width,
        height
      });
      return this.trigger(events_default.Types.resize, width, height);
    },
    render: function() {
      svg.group.render.call(this.scene, this.domElement);
      return this;
    }
  });
  var svg_default = Renderer2;

  // src/utils/shaders.js
  var shaders = {
    create: function(gl, source, type) {
      var shader, compiled, error;
      shader = gl.createShader(gl[type]);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!compiled) {
        error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new error_default("unable to compile shader " + shader + ": " + error);
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
  var shaders_default = shaders;

  // src/renderers/webgl.js
  var multiplyMatrix = matrix_default.Multiply;
  var identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  var transformation = new NumArray(9);
  var CanvasUtils = canvas_default.Utils;
  var quad = new NumArray([
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    1
  ]);
  var webgl = {
    precision: 0.9,
    isHidden: /(undefined|none|transparent)/i,
    canvas: root_default.document ? root_default.document.createElement("canvas") : { getContext: function() {
    } },
    alignments: {
      left: "start",
      middle: "center",
      right: "end"
    },
    matrix: new matrix_default(),
    group: {
      removeChild: function(child, gl) {
        if (child.children) {
          for (var i = 0; i < child.children.length; i++) {
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
      render: function(gl, programs) {
        if (!this._visible) {
          return;
        }
        this._update();
        var parent = this.parent;
        var flagParentMatrix = parent._matrix && parent._matrix.manual || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        if (flagParentMatrix || flagMatrix) {
          if (!this._renderer.matrix) {
            this._renderer.matrix = new NumArray(9);
          }
          this._matrix.toTransformArray(true, transformation);
          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          if (!(this._renderer.scale instanceof vector_default)) {
            this._renderer.scale = new vector_default();
          }
          if (this._scale instanceof vector_default) {
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
          webgl[this._mask._renderer.type].render.call(this._mask, gl, programs, this);
          gl.stencilFunc(gl.EQUAL, 1, 255);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
          gl.colorMask(true, true, true, true);
        }
        this._flagOpacity = parent._flagOpacity || this._flagOpacity;
        this._renderer.opacity = this._opacity * (parent && parent._renderer ? parent._renderer.opacity : 1);
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
        var canvas2 = this.canvas;
        var ctx = this.ctx;
        var scale = elem._renderer.scale;
        var stroke = elem._stroke;
        var linewidth = elem._linewidth;
        var fill = elem._fill;
        var opacity = elem._renderer.opacity || elem._opacity;
        var cap = elem._cap;
        var join = elem._join;
        var miter = elem._miter;
        var closed2 = elem._closed;
        var dashes = elem.dashes;
        var length = commands.length;
        var last = length - 1;
        canvas2.width = Math.max(Math.ceil(elem._renderer.rect.width * scale.x), 1);
        canvas2.height = Math.max(Math.ceil(elem._renderer.rect.height * scale.y), 1);
        var centroid = elem._renderer.rect.centroid;
        var cx = centroid.x;
        var cy = centroid.y;
        ctx.clearRect(0, 0, canvas2.width, canvas2.height);
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            webgl[fill._renderer.type].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
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
            case path_commands_default.close:
              ctx.closePath();
              break;
            case path_commands_default.arc:
              var rx = b.rx;
              var ry = b.ry;
              var xAxisRotation = b.xAxisRotation;
              var largeArcFlag = b.largeArcFlag;
              var sweepFlag = b.sweepFlag;
              prev = closed2 ? mod(i - 1, length) : Math.max(i - 1, 0);
              a = commands[prev];
              var ax = a.x;
              var ay = a.y;
              CanvasUtils.renderSvgArcCommand(ctx, ax, ay, rx, ry, largeArcFlag, sweepFlag, xAxisRotation, x, y);
              break;
            case path_commands_default.curve:
              prev = closed2 ? mod(i - 1, length) : Math.max(i - 1, 0);
              a = commands[prev];
              ar = a.controls && a.controls.right || vector_default.zero;
              bl = b.controls && b.controls.left || vector_default.zero;
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
                br = b.controls && b.controls.right || vector_default.zero;
                cl = c.controls && c.controls.left || vector_default.zero;
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
            case path_commands_default.line:
              ctx.lineTo(x, y);
              break;
            case path_commands_default.move:
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
      getBoundingClientRect: function(vertices, border, rect) {
        var left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity, width, height;
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
        this._update();
        var parent = forcedParent || this.parent;
        var program = programs[this._renderer.type];
        var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var parentChanged = this._renderer.parent !== parent;
        var flagTexture = this._flagVertices || this._flagFill || this._fill instanceof linear_gradient_default && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof radial_gradient_default && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof texture_default && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof linear_gradient_default && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof radial_gradient_default && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof texture_default && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || parent._flagOpacity || this._flagVisible || this._flagCap || this._flagJoin || this._flagMiter || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
        if (flagParentMatrix || flagMatrix || parentChanged) {
          if (!this._renderer.matrix) {
            this._renderer.matrix = new NumArray(9);
          }
          this._matrix.toTransformArray(true, transformation);
          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          if (!(this._renderer.scale instanceof vector_default)) {
            this._renderer.scale = new vector_default();
          }
          if (this._scale instanceof vector_default) {
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
          gl.clear(gl.STENCIL_BUFFER_BIT);
          gl.enable(gl.STENCIL_TEST);
          gl.stencilFunc(gl.ALWAYS, 1, 0);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
          gl.colorMask(false, false, false, false);
          webgl[this._mask._renderer.type].render.call(this._mask, gl, programs, this);
          gl.stencilFunc(gl.EQUAL, 1, 255);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
          gl.colorMask(true, true, true, true);
        }
        if (flagTexture) {
          if (!this._renderer.rect) {
            this._renderer.rect = {};
          }
          this._renderer.opacity = this._opacity * parent._renderer.opacity;
          webgl.path.getBoundingClientRect(this._renderer.vertices, this._linewidth, this._renderer.rect);
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
            gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
          }
          programs.current = program;
        }
        if (programs.resolution.flagged) {
          gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
        }
        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);
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
      updateCanvas: function(elem) {
        var isOffset;
        var canvas2 = this.canvas;
        var ctx = this.ctx;
        var stroke = elem._stroke;
        var linewidth = elem._linewidth;
        var fill = elem._fill;
        var opacity = elem._renderer.opacity || elem._opacity;
        var dashes = elem.dashes;
        var size = elem._size;
        var dimension = size;
        if (!webgl.isHidden.test(stroke)) {
          dimension += linewidth;
        }
        canvas2.width = getPoT(dimension);
        canvas2.height = canvas2.width;
        var aspect = dimension / canvas2.width;
        var cx = canvas2.width / 2;
        var cy = canvas2.height / 2;
        ctx.clearRect(0, 0, canvas2.width, canvas2.height);
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            webgl[fill._renderer.type].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
            ctx.strokeStyle = stroke._renderer.effect;
          }
          if (linewidth) {
            ctx.lineWidth = linewidth / aspect;
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
        this._update();
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
        var flagTexture = this._flagFill || this._fill instanceof linear_gradient_default && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof radial_gradient_default && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof texture_default && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof linear_gradient_default && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof radial_gradient_default && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof texture_default && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || parent._flagOpacity || this._flagVisible || this._flagScale || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
        if (flagParentMatrix || flagMatrix || parentChanged) {
          if (!this._renderer.matrix) {
            this._renderer.matrix = new NumArray(9);
          }
          this._matrix.toTransformArray(true, transformation);
          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          if (!(this._renderer.scale instanceof vector_default)) {
            this._renderer.scale = new vector_default();
          }
          if (this._scale instanceof vector_default) {
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
            gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
          }
          programs.current = program;
        }
        if (programs.resolution.flagged) {
          gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
        }
        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);
        gl.uniformMatrix3fv(program.matrix, false, this._renderer.matrix);
        gl.uniform1f(program.size, size * programs.resolution.ratio);
        gl.drawArrays(gl.POINTS, 0, length);
        return this.flagReset();
      }
    },
    text: {
      updateCanvas: function(elem) {
        var canvas2 = this.canvas;
        var ctx = this.ctx;
        var scale = elem._renderer.scale;
        var stroke = elem._stroke;
        var linewidth = elem._linewidth * scale;
        var fill = elem._fill;
        var opacity = elem._renderer.opacity || elem._opacity;
        var dashes = elem.dashes;
        var decoration = elem._decoration;
        canvas2.width = Math.max(Math.ceil(elem._renderer.rect.width * scale.x), 1);
        canvas2.height = Math.max(Math.ceil(elem._renderer.rect.height * scale.y), 1);
        var centroid = elem._renderer.rect.centroid;
        var cx = centroid.x;
        var cy = centroid.y;
        var a, b, c, d, e, sx, sy, x1, y1, x2, y2;
        var isOffset = fill._renderer && fill._renderer.offset && stroke._renderer && stroke._renderer.offset;
        ctx.clearRect(0, 0, canvas2.width, canvas2.height);
        if (!isOffset) {
          ctx.font = [elem._style, elem._weight, elem._size + "px/" + elem._leading + "px", elem._family].join(" ");
        }
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (fill) {
          if (typeof fill === "string") {
            ctx.fillStyle = fill;
          } else {
            webgl[fill._renderer.type].render.call(fill, ctx, elem);
            ctx.fillStyle = fill._renderer.effect;
          }
        }
        if (stroke) {
          if (typeof stroke === "string") {
            ctx.strokeStyle = stroke;
          } else {
            webgl[stroke._renderer.type].render.call(stroke, ctx, elem);
            ctx.strokeStyle = stroke._renderer.effect;
          }
          if (linewidth) {
            ctx.lineWidth = linewidth;
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
          var metrics = ctx.measureText(elem.value);
          switch (decoration) {
            case "underline":
              y1 = metrics.actualBoundingBoxAscent;
              y2 = metrics.actualBoundingBoxAscent;
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
        var ctx = webgl.ctx;
        ctx.font = [elem._style, elem._weight, elem._size + "px/" + elem._leading + "px", elem._family].join(" ");
        ctx.textAlign = "center";
        ctx.textBaseline = elem._baseline;
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
            rect.left = -width;
            rect.right = 0;
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
        this._update();
        var parent = forcedParent || this.parent;
        var program = programs[this._renderer.type];
        var flagParentMatrix = parent._matrix.manual || parent._flagMatrix;
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var parentChanged = this._renderer.parent !== parent;
        var flagTexture = this._flagVertices || this._flagFill || this._fill instanceof linear_gradient_default && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof radial_gradient_default && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof texture_default && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagImage || this._fill._flagVideo || this._fill._flagRepeat || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof linear_gradient_default && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof radial_gradient_default && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof texture_default && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagImage || this._stroke._flagVideo || this._stroke._flagRepeat || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || parent._flagOpacity || this._flagVisible || this._flagScale || this._flagValue || this._flagFamily || this._flagSize || this._flagLeading || this._flagAlignment || this._flagBaseline || this._flagStyle || this._flagWeight || this._flagDecoration || this.dashes && this.dashes.length > 0 || !this._renderer.texture;
        if (flagParentMatrix || flagMatrix || parentChanged) {
          if (!this._renderer.matrix) {
            this._renderer.matrix = new NumArray(9);
          }
          this._matrix.toTransformArray(true, transformation);
          multiplyMatrix(transformation, parent._renderer.matrix, this._renderer.matrix);
          if (!(this._renderer.scale instanceof vector_default)) {
            this._renderer.scale = new vector_default();
          }
          if (this._scale instanceof vector_default) {
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
          gl.clear(gl.STENCIL_BUFFER_BIT);
          gl.enable(gl.STENCIL_TEST);
          gl.stencilFunc(gl.ALWAYS, 1, 0);
          gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
          gl.colorMask(false, false, false, false);
          webgl[this._mask._renderer.type].render.call(this._mask, gl, programs, this);
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
            gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
          }
          programs.current = program;
        }
        if (programs.resolution.flagged) {
          gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), programs.resolution.width, programs.resolution.height);
        }
        gl.bindTexture(gl.TEXTURE_2D, this._renderer.texture);
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
    "linear-gradient": {
      render: function(ctx, parent) {
        if (!ctx.canvas.getContext("2d") || !parent) {
          return;
        }
        this._update();
        if (!this._renderer.effect || this._flagEndPoints || this._flagStops || this._flagUnits) {
          var rect;
          var lx = this.left._x;
          var ly = this.left._y;
          var rx = this.right._x;
          var ry = this.right._y;
          if (/objectBoundingBox/i.test(this._units)) {
            rect = parent.getBoundingClientRect(true);
            lx = (lx - 0.5) * rect.width;
            ly = (ly - 0.5) * rect.height;
            rx = (rx - 0.5) * rect.width;
            ry = (ry - 0.5) * rect.height;
          }
          this._renderer.effect = ctx.createLinearGradient(lx, ly, rx, ry);
          for (var i = 0; i < this.stops.length; i++) {
            var stop = this.stops[i];
            this._renderer.effect.addColorStop(stop._offset, stop._color);
          }
        }
        return this.flagReset();
      }
    },
    "radial-gradient": {
      render: function(ctx, parent) {
        if (!ctx.canvas.getContext("2d") || !parent) {
          return;
        }
        this._update();
        if (!this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops || this._flagUnits) {
          var rect;
          var cx = this.center._x;
          var cy = this.center._y;
          var fx = this.focal._x;
          var fy = this.focal._y;
          var radius = this._radius;
          if (/objectBoundingBox/i.test(this._units)) {
            rect = parent.getBoundingClientRect(true);
            cx = cx * rect.width * 0.5;
            cy = cy * rect.height * 0.5;
            fx = fx * rect.width * 0.5;
            fy = fy * rect.height * 0.5;
            radius *= Math.min(rect.width, rect.height) * 0.5;
          }
          this._renderer.effect = ctx.createRadialGradient(cx, cy, 0, fx, fy, radius);
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
        if (!ctx.canvas.getContext("2d")) {
          return;
        }
        this._update();
        var image = this.image;
        if ((this._flagLoaded || this._flagImage || this._flagVideo || this._flagRepeat) && this.loaded) {
          this._renderer.effect = ctx.createPattern(image, this._repeat);
        } else if (!this._renderer.effect) {
          return this.flagReset();
        }
        if (this._flagOffset || this._flagLoaded || this._flagScale) {
          if (!(this._renderer.offset instanceof vector_default)) {
            this._renderer.offset = new vector_default();
          }
          this._renderer.offset.x = -this._offset.x;
          this._renderer.offset.y = -this._offset.y;
          if (image) {
            this._renderer.offset.x += image.width / 2;
            this._renderer.offset.y += image.height / 2;
            if (this._scale instanceof vector_default) {
              this._renderer.offset.x *= this._scale.x;
              this._renderer.offset.y *= this._scale.y;
            } else {
              this._renderer.offset.x *= this._scale;
              this._renderer.offset.y *= this._scale;
            }
          }
        }
        if (this._flagScale || this._flagLoaded) {
          if (!(this._renderer.scale instanceof vector_default)) {
            this._renderer.scale = new vector_default();
          }
          if (this._scale instanceof vector_default) {
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
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
    },
    program: {
      create: function(gl, shaders2) {
        var program, linked, error;
        program = gl.createProgram();
        underscore_default.each(shaders2, function(s) {
          gl.attachShader(program, s);
        });
        gl.linkProgram(program);
        linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
          error = gl.getProgramInfoLog(program);
          gl.deleteProgram(program);
          throw new error_default("unable to link program: " + error);
        }
        return program;
      }
    },
    TextureRegistry: new registry_default()
  };
  webgl.ctx = webgl.canvas.getContext("2d");
  function Renderer3(params) {
    var gl, program, vs, fs;
    this.domElement = params.domElement || document.createElement("canvas");
    if (typeof params.offscreenElement !== "undefined") {
      webgl.canvas = params.offscreenElement;
      webgl.ctx = webgl.canvas.getContext("2d");
    }
    this.scene = new group_default();
    this.scene.parent = this;
    this._renderer = {
      type: "renderer",
      matrix: new NumArray(identity),
      scale: 1,
      opacity: 1
    };
    this._flagMatrix = true;
    params = underscore_default.defaults(params || {}, {
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
      throw new error_default("unable to create a webgl context. Try using another renderer.");
    }
    vs = shaders_default.create(gl, shaders_default.path.vertex, shaders_default.types.vertex);
    fs = shaders_default.create(gl, shaders_default.path.fragment, shaders_default.types.fragment);
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
    program.position = gl.getAttribLocation(program, "a_position");
    program.matrix = gl.getUniformLocation(program, "u_matrix");
    program.rect = gl.getUniformLocation(program, "u_rect");
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(program.position);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    vs = shaders_default.create(gl, shaders_default.points.vertex, shaders_default.types.vertex);
    fs = shaders_default.create(gl, shaders_default.points.fragment, shaders_default.types.fragment);
    program = this.programs.points = webgl.program.create(gl, [vs, fs]);
    program.position = gl.getAttribLocation(program, "a_position");
    program.matrix = gl.getUniformLocation(program, "u_matrix");
    program.size = gl.getUniformLocation(program, "u_size");
    gl.enable(gl.BLEND);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  }
  underscore_default.extend(Renderer3, {
    Utils: webgl
  });
  underscore_default.extend(Renderer3.prototype, events_default, {
    constructor: Renderer3,
    setSize: function(width, height, ratio) {
      var w, h;
      var ctx = this.ctx;
      this.width = width;
      this.height = height;
      this.ratio = typeof ratio === "undefined" ? get_ratio_default(ctx) : ratio;
      this.domElement.width = width * this.ratio;
      this.domElement.height = height * this.ratio;
      if (underscore_default.isObject(this.domElement.style)) {
        underscore_default.extend(this.domElement.style, {
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
      return this.trigger(events_default.Types.resize, width, height, ratio);
    },
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
  var webgl_default = Renderer3;

  // src/two.js
  function Two(options) {
    var params = underscore_default.defaults(options || {}, {
      fullscreen: false,
      fitted: false,
      width: 640,
      height: 480,
      type: Two.Types.svg,
      autostart: false
    });
    underscore_default.each(params, function(v, k) {
      if (/fullscreen/i.test(k) || /autostart/i.test(k)) {
        return;
      }
      this[k] = v;
    }, this);
    if (underscore_default.isElement(params.domElement)) {
      var tagName = params.domElement.tagName.toLowerCase();
      if (!/^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type + "-" + tagName)) {
        this.type = Two.Types[tagName];
      }
    }
    this.renderer = new Two[this.type](this);
    this.setPlaying(params.autostart);
    this.frameCount = 0;
    if (params.fullscreen) {
      this.fit = fitToWindow.bind(this);
      this.fit.domElement = window;
      this.fit.attached = true;
      underscore_default.extend(document.body.style, {
        overflow: "hidden",
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed"
      });
      underscore_default.extend(this.renderer.domElement.style, {
        display: "block",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed"
      });
      dom_default.bind(this.fit.domElement, "resize", this.fit);
      this.fit();
    } else if (params.fitted) {
      this.fit = fitToParent.bind(this);
      underscore_default.extend(this.renderer.domElement.style, {
        display: "block"
      });
    } else if (!underscore_default.isElement(params.domElement)) {
      this.renderer.setSize(params.width, params.height, this.ratio);
      this.width = params.width;
      this.height = params.height;
    }
    this.renderer.bind(events_default.Types.resize, updateDimensions.bind(this));
    this.scene = this.renderer.scene;
    Two.Instances.push(this);
    if (params.autostart) {
      raf.init();
    }
  }
  underscore_default.extend(Two, constants_default);
  underscore_default.extend(Two.prototype, events_default, {
    constructor: Two,
    type: "",
    renderer: null,
    scene: null,
    width: 0,
    height: 0,
    frameCount: 0,
    timeDelta: 0,
    playing: false,
    appendTo: function(elem) {
      elem.appendChild(this.renderer.domElement);
      if (this.fit) {
        if (this.fit.domElement !== window) {
          this.fit.domElement = elem;
          this.fit.attached = false;
        }
        this.update();
      }
      return this;
    },
    play: function() {
      this.playing = true;
      raf.init();
      return this.trigger(events_default.Types.play);
    },
    pause: function() {
      this.playing = false;
      return this.trigger(events_default.Types.pause);
    },
    setPlaying: function(p) {
      this.playing = p;
    },
    release: function(obj) {
      var i, v, child;
      if (!underscore_default.isObject(obj)) {
        return this.release(this.scene);
      }
      if (typeof obj.unbind === "function") {
        obj.unbind();
      }
      if (obj.vertices) {
        if (typeof obj.vertices.unbind === "function") {
          obj.vertices.unbind();
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
          obj.children.unbind();
        }
      }
      return obj;
    },
    update: function() {
      var animated = !!this._lastFrame;
      var now = underscore_default.performance.now();
      if (animated) {
        this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
      }
      this._lastFrame = now;
      if (this.fit && this.fit.domElement && !this.fit.attached) {
        dom_default.bind(this.fit.domElement, "resize", this.fit);
        this.fit.attached = true;
        this.fit();
      }
      var width = this.width;
      var height = this.height;
      var renderer = this.renderer;
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize(width, height, this.ratio);
      }
      this.trigger(events_default.Types.update, this.frameCount, this.timeDelta);
      return this.render();
    },
    render: function() {
      this.renderer.render();
      return this.trigger(events_default.Types.render, this.frameCount++);
    },
    add: function(o) {
      var objects = o;
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      }
      this.scene.add(objects);
      return this;
    },
    remove: function(o) {
      var objects = o;
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      }
      this.scene.remove(objects);
      return this;
    },
    clear: function() {
      this.scene.remove(this.scene.children);
      return this;
    },
    makeLine: function(x1, y1, x2, y2) {
      var line = new line_default(x1, y1, x2, y2);
      this.scene.add(line);
      return line;
    },
    makeArrow: function(x1, y1, x2, y2, size) {
      var headlen = typeof size === "number" ? size : 10;
      var angle = Math.atan2(y2 - y1, x2 - x1);
      var vertices = [
        new anchor_default(x1, y1, void 0, void 0, void 0, void 0, path_commands_default.move),
        new anchor_default(x2, y2, void 0, void 0, void 0, void 0, path_commands_default.line),
        new anchor_default(x2 - headlen * Math.cos(angle - Math.PI / 4), y2 - headlen * Math.sin(angle - Math.PI / 4), void 0, void 0, void 0, void 0, path_commands_default.line),
        new anchor_default(x2, y2, void 0, void 0, void 0, void 0, path_commands_default.move),
        new anchor_default(x2 - headlen * Math.cos(angle + Math.PI / 4), y2 - headlen * Math.sin(angle + Math.PI / 4), void 0, void 0, void 0, void 0, path_commands_default.line)
      ];
      var path = new path_default(vertices, false, false, true);
      path.noFill();
      path.cap = "round";
      path.join = "round";
      this.scene.add(path);
      return path;
    },
    makeRectangle: function(x, y, width, height) {
      var rect = new rectangle_default(x, y, width, height);
      this.scene.add(rect);
      return rect;
    },
    makeRoundedRectangle: function(x, y, width, height, sides) {
      var rect = new rounded_rectangle_default(x, y, width, height, sides);
      this.scene.add(rect);
      return rect;
    },
    makeCircle: function(x, y, radius, resolution) {
      var circle = new circle_default(x, y, radius, resolution);
      this.scene.add(circle);
      return circle;
    },
    makeEllipse: function(x, y, rx, ry, resolution) {
      var ellipse = new ellipse_default(x, y, rx, ry, resolution);
      this.scene.add(ellipse);
      return ellipse;
    },
    makeStar: function(ox, oy, outerRadius, innerRadius, sides) {
      var star = new star_default(ox, oy, outerRadius, innerRadius, sides);
      this.scene.add(star);
      return star;
    },
    makeCurve: function(p) {
      var l = arguments.length, points = p;
      if (!Array.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i += 2) {
          var x = arguments[i];
          if (typeof x !== "number") {
            break;
          }
          var y = arguments[i + 1];
          points.push(new anchor_default(x, y));
        }
      }
      var last = arguments[l - 1];
      var curve = new path_default(points, !(typeof last === "boolean" ? last : void 0), true);
      var rect = curve.getBoundingClientRect();
      curve.center().translation.set(rect.left + rect.width / 2, rect.top + rect.height / 2);
      this.scene.add(curve);
      return curve;
    },
    makePolygon: function(x, y, radius, sides) {
      var poly = new polygon_default(x, y, radius, sides);
      this.scene.add(poly);
      return poly;
    },
    makeArcSegment: function(ox, oy, ir, or, sa, ea, res) {
      var arcSegment = new arc_segment_default(ox, oy, ir, or, sa, ea, res);
      this.scene.add(arcSegment);
      return arcSegment;
    },
    makePoints: function(p) {
      var l = arguments.length, vertices = p;
      if (!Array.isArray(p)) {
        vertices = [];
        for (var i = 0; i < l; i += 2) {
          var x = arguments[i];
          if (typeof x !== "number") {
            break;
          }
          var y = arguments[i + 1];
          vertices.push(new vector_default(x, y));
        }
      }
      var points = new points_default(vertices);
      this.scene.add(points);
      return points;
    },
    makePath: function(p) {
      var l = arguments.length, points = p;
      if (!Array.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i += 2) {
          var x = arguments[i];
          if (typeof x !== "number") {
            break;
          }
          var y = arguments[i + 1];
          points.push(new anchor_default(x, y));
        }
      }
      var last = arguments[l - 1];
      var path = new path_default(points, !(typeof last === "boolean" ? last : void 0));
      var rect = path.getBoundingClientRect();
      if (typeof rect.top === "number" && typeof rect.left === "number" && typeof rect.right === "number" && typeof rect.bottom === "number") {
        path.center().translation.set(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      this.scene.add(path);
      return path;
    },
    makeText: function(message, x, y, styles) {
      var text = new text_default(message, x, y, styles);
      this.add(text);
      return text;
    },
    makeLinearGradient: function(x1, y1, x2, y2) {
      var stops = Array.prototype.slice.call(arguments, 4);
      var gradient = new linear_gradient_default(x1, y1, x2, y2, stops);
      this.add(gradient);
      return gradient;
    },
    makeRadialGradient: function(x1, y1, r) {
      var stops = Array.prototype.slice.call(arguments, 3);
      var gradient = new radial_gradient_default(x1, y1, r, stops);
      this.add(gradient);
      return gradient;
    },
    makeSprite: function(path, x, y, cols, rows, frameRate, autostart) {
      var sprite = new sprite_default(path, x, y, cols, rows, frameRate);
      if (autostart) {
        sprite.play();
      }
      this.add(sprite);
      return sprite;
    },
    makeImageSequence: function(paths, x, y, frameRate, autostart) {
      var imageSequence = new image_sequence_default(paths, x, y, frameRate);
      if (autostart) {
        imageSequence.play();
      }
      this.add(imageSequence);
      return imageSequence;
    },
    makeTexture: function(path, callback) {
      var texture = new texture_default(path, callback);
      return texture;
    },
    makeGroup: function(o) {
      var objects = o;
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      }
      var group = new group_default();
      this.scene.add(group);
      group.add(objects);
      return group;
    },
    interpret: function(SVGElement, shallow, add) {
      var tag = SVGElement.tagName.toLowerCase();
      add = typeof add !== "undefined" ? add : true;
      if (!(tag in interpret_svg_default)) {
        return null;
      }
      var node = interpret_svg_default[tag].call(this, SVGElement);
      if (add) {
        this.add(shallow && node instanceof group_default ? node.children : node);
      } else if (node.parent) {
        node.remove();
      }
      return node;
    },
    load: function(text, callback) {
      var group = new group_default();
      var elem, i, child;
      var attach = function(data) {
        dom_default.temp.innerHTML = data;
        for (i = 0; i < dom_default.temp.children.length; i++) {
          elem = dom_default.temp.children[i];
          child = this.interpret(elem, false, false);
          if (child !== null) {
            group.add(child);
          }
        }
        if (typeof callback === "function") {
          var svg2 = dom_default.temp.children.length <= 1 ? dom_default.temp.children[0] : dom_default.temp.children;
          callback(group, svg2);
        }
      }.bind(this);
      if (/.*\.svg/ig.test(text)) {
        xhr_default(text, attach);
        return group;
      }
      attach(text);
      return group;
    }
  });
  function fitToWindow() {
    var wr = document.body.getBoundingClientRect();
    var width = this.width = wr.width;
    var height = this.height = wr.height;
    this.renderer.setSize(width, height, this.ratio);
  }
  function fitToParent() {
    var parent = this.renderer.domElement.parentElement;
    if (!parent) {
      console.warn("Two.js: Attempting to fit to parent, but no parent found.");
      return;
    }
    var wr = parent.getBoundingClientRect();
    var width = this.width = wr.width;
    var height = this.height = wr.height;
    this.renderer.setSize(width, height, this.ratio);
  }
  function updateDimensions(width, height) {
    this.width = width;
    this.height = height;
    this.trigger(events_default.Types.resize, width, height);
  }
  var raf = dom_default.getRequestAnimationFrame();
  function loop() {
    for (var i = 0; i < Two.Instances.length; i++) {
      var t = Two.Instances[i];
      if (t.playing) {
        t.update();
      }
    }
    Two.nextFrameID = raf(loop);
  }
  raf.init = function() {
    loop();
    raf.init = function() {
    };
  };
  underscore_default.extend(Two, {
    Anchor: anchor_default,
    Collection: collection_default,
    Events: events_default,
    Group: group_default,
    Matrix: matrix_default,
    Path: path_default,
    Registry: registry_default,
    Shape: shape_default,
    Text: text_default,
    Vector: vector_default,
    Gradient: gradient_default,
    ImageSequence: image_sequence_default,
    LinearGradient: linear_gradient_default,
    RadialGradient: radial_gradient_default,
    Sprite: sprite_default,
    Stop: stop_default,
    Texture: texture_default,
    ArcSegment: arc_segment_default,
    Circle: circle_default,
    Ellipse: ellipse_default,
    Line: line_default,
    Points: points_default,
    Polygon: polygon_default,
    Rectangle: rectangle_default,
    RoundedRectangle: rounded_rectangle_default,
    Star: star_default,
    CanvasRenderer: canvas_default,
    SVGRenderer: svg_default,
    WebGLRenderer: webgl_default,
    Commands: path_commands_default,
    Utils: underscore_default.extend({
      Error: error_default,
      getRatio: get_ratio_default,
      defineGetterSetter: get_set_default,
      read: interpret_svg_default,
      xhr: xhr_default
    }, underscore_default, canvas_shim_default, curves_exports, math_exports)
  });
  var two_default = Two;
  return __toCommonJS(two_exports);
})().default;
