import { root } from './root.js';

const slice = Array.prototype.slice;

function isArrayLike(collection) {
  if (collection === null || collection === undefined) return false;
  const length = collection.length;
  // Arrays cannot hold more than 2^32 - 1 items
  return typeof length == 'number' && length >= 0 && length < 4294967296;
}

export const _ = {
  isNaN: function (obj) {
    return typeof obj === 'number' && obj !== +obj;
  },
  isElement: function (obj) {
    return !!(obj && obj.nodeType === 1);
  },
  isObject: function (obj) {
    const type = typeof obj;
    return type === 'function' || (type === 'object' && !!obj);
  },
  isFunction: function (obj) {
    return typeof obj === 'function';
  },
  extend: function (base) {
    const sources = slice.call(arguments, 1);
    for (let i = 0; i < sources.length; i++) {
      const obj = sources[i];
      for (let k in obj) {
        base[k] = obj[k];
      }
    }
    return base;
  },
  defaults: function (base) {
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
  each: function (obj, iteratee, context) {
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
  performance:
    root.performance && root.performance.now ? root.performance : Date,
};
