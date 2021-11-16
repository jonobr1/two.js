import root from './root.js';

var slice = Array.prototype.slice;

var isArrayLike = function(collection) {
  if (collection === null || collection === undefined) return false;
  var length = collection.length;
  // Arrays cannot hold more than 2^32 - 1 items
  return (typeof length == 'number' && length >= 0 && length < 4294967296);
};

var _ = {
  isNaN: function(obj) {
    return typeof obj === 'number' && obj !== +obj;
  },
  isElement: function(obj) {
    return !!(obj && obj.nodeType === 1);
  },
  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
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
  /**
   * @name Two.Utils.performance
   * @property {Date} - A special `Date` like object to get the current millis of the session. Used internally to calculate time between frames.
   * e.g: `Utils.performance.now() // milliseconds since epoch`
   */
  performance: ((root.performance && root.performance.now) ? root.performance : Date),
};

export default _;
