/**
 * two.js
 * a two-dimensional drawing api meant for modern browsers. It is renderer 
 * agnostic enabling the same api for rendering in multiple contexts: webgl, 
 * canvas2d, and svg.
 *
 * Copyright (c) 2012 - 2013 jonobr1
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */


//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      rand = Math.floor(Math.random() * (index + 1));
      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, val, context) {
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      if (a === void 0) return 1;
      if (b === void 0) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj)                                     return [];
    if (_.isArray(obj))                           return slice.call(obj);
    if (_.isArguments(obj))                       return slice.call(obj);
    if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    // The `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) isSorted = true;
    _.reduce(initial, function (memo, value, index) {
      if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1), true);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        result = func.apply(context, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var result = {};
    each(_.flatten(slice.call(arguments, 1)), function(key) {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults(settings || {}, _.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n_.escape(" + unescape(code) + ")+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n(" + unescape(code) + ")+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n;__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __p='';" +
      "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
      source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' +
      source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);
var Backbone = Backbone || {};

(function() {

  var array = [];
  var slice = array.slice;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(obj, events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `events` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== (ev.callback._callback || ev.callback)) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(this, events, args);
      if (allEvents) triggerEvents(this, allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(object, events, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = object._listenerId || (object._listenerId = _.uniqueId('l'));
      listeners[id] = object;
      object.on(events, callback || this, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(object, events, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (object) {
        object.off(events, callback, this);
        if (!events && !callback) delete listeners[object._listenerId];
      } else {
        for (var id in listeners) {
          listeners[id].off(null, null, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

})();
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = 
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());
/*
 * Tessellation is a revised JavaScript port of poly2tri optimized for
 * use with two.js.
 *
 * @author jonobr1 / http://jonobr1.com
 *
 * poly2tri Copyright (c) 2009-2010, poly2tri Contributors
 * http://code.google.com/p/poly2tri/
 * All rights reserved.
 *
 */

(function() {

  // Export closured variables.

  var root = this;
  previousTessellation = root.tessellation,
  tessellation = root.tessellation = {
    noConflict: function() {
      root.tessellation = previousTessellation;
      return this;
    }
  };


  /**
   * Utility functions for Vectors.
   */

  /**
   * Compare two Two.Vectors component-wise.
   * @param   a   Two.Vector object.
   * @param   b   Two.Vector object.
   * @return <code>-1</code> if <code>a &lt; b</code>, <code>1</code> if
   *     <code>a &gt; b</code>, <code>0</code> otherwise.
   */
  tessellation.cmp = function(a, b) {
    if (a.y == b.y) {
      return a.x - b.x;
    } else {
      return a.y - b.y;
    }
  };

  /**
   * Test two Two.Vector objects for equality.
   * @param   a   Two.Vector object.
   * @param   b   Two.Vector object.
   * @return <code>True</code> if <code>a == b</code>, <code>false</code> otherwise.
   */
  tessellation.equals = function(a, b) {
    return a.x == b.x && a.y == b.y;
  };


  /**
   * Edge
   */
  tessellation.Edge = function() {

    this.p = null;
    this.q = null;

    if (arguments.length == 2) {
      if (arguments[0].y > arguments[1].y) {
        this.q = arguments[0];
        this.p = arguments[1];
      } else if (arguments[0].y == arguments[1].y) {
        if (arguments[0].x > arguments[1].x) {
          this.q = arguments[0];
          this.p = arguments[1];
        } else if (arguments[0].x == arguments[1].x) {
          alert('Invalid tessellation.edge constructor call: repeated points!');
        } else {
          this.p = arguments[0];
          this.q = arguments[1];
        }
      } else {
        this.p = arguments[0];
        this.q = arguments[1];
      }
    } else {
      alert('Invalid tessellation.Edge constructor call!');
    }

    if (this.p && !_.isArray(this.p.edges)) {
      this.p.edges = [];
    }
    if (this.q && !_.isArray(this.q.edges)) {
      this.q.edges = [];
    }

    this.q.edges.push(this);
  };

  /**
   * Triangle<br>
   * Triangle-based data structures are known to have better performance than
   * quad-edge structures.
   * See: J. Shewchuk, "Triangle: Engineering a 2D Quality Mesh Generator and
   * Delaunay Triangulator", "Triangulations in CGAL"
   * 
   * @param   p1  Two.Vector object.
   * @param   p2  Two.Vector object.
   * @param   p3  Two.Vector object.
   */
  tessellation.Triangle = function(p1, p2, p3) {
    // Triangle points
    this.points = [ null, null, null ];
    // Neighbor list
    this.neighbors = [ null, null, null ];
    // Has this triangle been marked as an interior triangle?
    this.interior = false;
    // Flags to determine if an edge is a Constrained edge
    this.constrained_edge = [ false, false, false ];
    // Flags to determine if an edge is a Delauney edge
    this.delaunay_edge = [ false, false, false ];

    if (arguments.length == 3) {
      this.points[0] = p1;
      this.points[1] = p2;
      this.points[2] = p3;
    }
  };

  tessellation.Triangle.prototype.GetPoint = function(index) {
    return this.points[index];
  };

  tessellation.Triangle.prototype.GetNeighbor = function(index) {
    return this.neighbors[index];
  };

  /**
   * Test if this Triangle contains the Two.Vector objects given as parameters as its
   * vertices.
   * @return <code>True</code> if the Two.Vector objects are of the Triangle's vertices,
   *     <code>false</code> otherwise.
   */
  tessellation.Triangle.prototype.ContainsP = function() {
    var back = true;
    for (var aidx=0; aidx < arguments.length; ++aidx) {
      back = back && (arguments[aidx].equals(this.points[0]) ||
              arguments[aidx].equals(this.points[1]) ||
              arguments[aidx].equals(this.points[2])
      );
    }
    return back;
  };

  /**
   * Test if this Triangle contains the Edge objects given as parameters as its
   * bounding edges.
   * @return <code>True</code> if the Edge objects are of the Triangle's bounding
   *     edges, <code>false</code> otherwise.
   */
  tessellation.Triangle.prototype.ContainsE = function() {
    var back = true;
    for (var aidx=0; aidx < arguments.length; ++aidx) {
      back = back && this.ContainsP(arguments[aidx].p, arguments[aidx].q);
    }
    return back;
  };

  tessellation.Triangle.prototype.IsInterior = function() {
    if (arguments.length == 0) {
      return this.interior;
    } else {
      this.interior = arguments[0];
      return this.interior;
    }
  };

  /**
   * Update neighbor pointers.<br>
   * This method takes either 3 parameters (<code>p1</code>, <code>p2</code> and
   * <code>t</code>) or 1 parameter (<code>t</code>).
   * @param   p1  Two.Vector object.
   * @param   p2  Two.Vector object.
   * @param   t   Triangle object.
   */
  tessellation.Triangle.prototype.MarkNeighbor = function() {
    var t;
    if (arguments.length == 3) {
      var p1 = arguments[0];
      var p2 = arguments[1];
      t = arguments[2];

      if ((p1.equals(this.points[2]) && p2.equals(this.points[1])) || (p1.equals(this.points[1]) && p2.equals(this.points[2]))) this.neighbors[0] = t;
      else if ((p1.equals(this.points[0]) && p2.equals(this.points[2])) || (p1.equals(this.points[2]) && p2.equals(this.points[0]))) this.neighbors[1] = t;
      else if ((p1.equals(this.points[0]) && p2.equals(this.points[1])) || (p1.equals(this.points[1]) && p2.equals(this.points[0]))) this.neighbors[2] = t;
      else alert('Invalid tessellation.Triangle.MarkNeighbor call (1)!');
    } else if (arguments.length == 1) {
      // exhaustive search to update neighbor pointers
      t = arguments[0];
      if (t.ContainsP(this.points[1], this.points[2])) {
        this.neighbors[0] = t;
        t.MarkNeighbor(this.points[1], this.points[2], this);
      } else if (t.ContainsP(this.points[0], this.points[2])) {
        this.neighbors[1] = t;
        t.MarkNeighbor(this.points[0], this.points[2], this);
      } else if (t.ContainsP(this.points[0], this.points[1])) {
        this.neighbors[2] = t;
        t.MarkNeighbor(this.points[0], this.points[1], this);
      }
    } else {
      alert('Invalid tessellation.Triangle.MarkNeighbor call! (2)');
    }
  };

  tessellation.Triangle.prototype.ClearNeigbors = function() {
    this.neighbors[0] = null;
    this.neighbors[1] = null;
    this.neighbors[2] = null;
  };

  tessellation.Triangle.prototype.ClearDelunayEdges = function() {
    this.delaunay_edge[0] = false;
    this.delaunay_edge[1] = false;
    this.delaunay_edge[2] = false;
  };

  /**
   * Return the Two.Vector clockwise to the given Two.Vector.
   */
  tessellation.Triangle.prototype.PointCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.points[2];
    } else if (p.equals(this.points[1])) {
      return this.points[0];
    } else if (p.equals(this.points[2])) {
      return this.points[1];
    } else {
      return null;
    }
  };

  /**
   * Return the Two.Vector counter-clockwise to the given Two.Vector.
   */
  tessellation.Triangle.prototype.PointCCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.points[1];
    } else if (p.equals(this.points[1])) {
      return this.points[2];
    } else if (p.equals(this.points[2])) {
      return this.points[0];
    } else {
      return null;
    }
  };

  /**
   * Return the neighbor clockwise to given Two.Vector.
   */
  tessellation.Triangle.prototype.NeighborCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.neighbors[1];
    } else if (p.equals(this.points[1])) {
      return this.neighbors[2];
    } else {
      return this.neighbors[0];
    }
  };

  /**
   * Return the neighbor counter-clockwise to given Two.Vector.
   */
  tessellation.Triangle.prototype.NeighborCCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.neighbors[2];
    } else if (p.equals(this.points[1])) {
      return this.neighbors[0];
    } else {
      return this.neighbors[1];
    }
  };

  tessellation.Triangle.prototype.GetConstrainedEdgeCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.constrained_edge[1];
    } else if (p.equals(this.points[1])) {
      return this.constrained_edge[2];
    } else {
      return this.constrained_edge[0];
    }
  };

  tessellation.Triangle.prototype.GetConstrainedEdgeCCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.constrained_edge[2];
    } else if (p.equals(this.points[1])) {
      return this.constrained_edge[0];
    } else {
      return this.constrained_edge[1];
    }
  };

  tessellation.Triangle.prototype.SetConstrainedEdgeCW = function(p, ce) {
    if (p.equals(this.points[0])) {
      this.constrained_edge[1] = ce;
    } else if (p.equals(this.points[1])) {
      this.constrained_edge[2] = ce;
    } else {
      this.constrained_edge[0] = ce;
    }
  };

  tessellation.Triangle.prototype.SetConstrainedEdgeCCW = function(p, ce) {
    if (p.equals(this.points[0])) {
      this.constrained_edge[2] = ce;
    } else if (p.equals(this.points[1])) {
      this.constrained_edge[0] = ce;
    } else {
      this.constrained_edge[1] = ce;
    }
  };

  tessellation.Triangle.prototype.GetDelaunayEdgeCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.delaunay_edge[1];
    } else if (p.equals(this.points[1])) {
      return this.delaunay_edge[2];
    } else {
      return this.delaunay_edge[0];
    }
  };

  tessellation.Triangle.prototype.GetDelaunayEdgeCCW = function(p) {
    if (p.equals(this.points[0])) {
      return this.delaunay_edge[2];
    } else if (p.equals(this.points[1])) {
      return this.delaunay_edge[0];
    } else {
      return this.delaunay_edge[1];
    }
  };

  tessellation.Triangle.prototype.SetDelaunayEdgeCW = function(p, e) {
    if (p.equals(this.points[0])) {
      this.delaunay_edge[1] = e;
    } else if (p.equals(this.points[1])) {
      this.delaunay_edge[2] = e;
    } else {
      this.delaunay_edge[0] = e;
    }
  };

  tessellation.Triangle.prototype.SetDelaunayEdgeCCW = function(p, e) {
    if (p.equals(this.points[0])) {
      this.delaunay_edge[2] = e;
    } else if (p.equals(this.points[1])) {
      this.delaunay_edge[0] = e;
    } else {
      this.delaunay_edge[1] = e;
    }
  };

  /**
   * The neighbor across to given point.
   */
  tessellation.Triangle.prototype.NeighborAcross = function(p) {
    if (p.equals(this.points[0])) {
      return this.neighbors[0];
    } else if (p.equals(this.points[1])) {
      return this.neighbors[1];
    } else {
      return this.neighbors[2];
    }
  };

  tessellation.Triangle.prototype.OppositePoint = function(t, p) {
    var cw = t.PointCW(p);
    return this.PointCW(cw);
  };

  /**
   * Legalize triangle by rotating clockwise.<br>
   * This method takes either 1 parameter (then the triangle is rotated around
   * points(0)) or 2 parameters (then the triangle is rotated around the first
   * parameter).
   */
  tessellation.Triangle.prototype.Legalize = function() {
    if (arguments.length == 1) {
      this.Legalize(this.points[0], arguments[0]);
    } else if (arguments.length == 2) {
      var opoint = arguments[0];
      var npoint = arguments[1];

      if (opoint.equals(this.points[0])) {
        this.points[1] = this.points[0];
        this.points[0] = this.points[2];
        this.points[2] = npoint;
      } else if (opoint.equals(this.points[1])) {
        this.points[2] = this.points[1];
        this.points[1] = this.points[0];
        this.points[0] = npoint;
      } else if (opoint.equals(this.points[2])) {
        this.points[0] = this.points[2];
        this.points[2] = this.points[1];
        this.points[1] = npoint;
      } else {
        alert('Invalid tessellation.Triangle.Legalize call!');
      }
    } else {
      alert('Invalid tessellation.Triangle.Legalize call!');
    }
  };

  tessellation.Triangle.prototype.Index = function(p) {
    if (p.equals(this.points[0])) return 0;
    else if (p.equals(this.points[1])) return 1;
    else if (p.equals(this.points[2])) return 2;
    else return -1;
  };

  tessellation.Triangle.prototype.EdgeIndex = function(p1, p2) {
    if (p1.equals(this.points[0])) {
      if (p2.equals(this.points[1])) {
        return 2;
      } else if (p2.equals(this.points[2])) {
        return 1;
      }
    } else if (p1.equals(this.points[1])) {
      if (p2.equals(this.points[2])) {
        return 0;
      } else if (p2.equals(this.points[0])) {
        return 2;
      }
    } else if (p1.equals(this.points[2])) {
      if (p2.equals(this.points[0])) {
        return 1;
      } else if (p2.equals(this.points[1])) {
        return 0;
      }
    }
    return -1;
  };

  /**
   * Mark an edge of this triangle as constrained.<br>
   * This method takes either 1 parameter (an edge index or an Edge instance) or
   * 2 parameters (two Two.Vector instances defining the edge of the triangle).
   */
  tessellation.Triangle.prototype.MarkConstrainedEdge = function() {
    if (arguments.length == 1) {
      if (typeof(arguments[0]) == 'number') {
        this.constrained_edge[arguments[0]] = true;
      } else {
        this.MarkConstrainedEdge(arguments[0].p, arguments[0].q);
      }
    } else if (arguments.length == 2) {
      var p = arguments[0];
      var q = arguments[1];
      if ((q.equals(this.points[0]) && p.equals(this.points[1])) || (q.equals(this.points[1]) && p.equals(this.points[0]))) {
        this.constrained_edge[2] = true;
      } else if ((q.equals(this.points[0]) && p.equals(this.points[2])) || (q.equals(this.points[2]) && p.equals(this.points[0]))) {
        this.constrained_edge[1] = true;
      } else if ((q.equals(this.points[1]) && p.equals(this.points[2])) || (q.equals(this.points[2]) && p.equals(this.points[1]))) {
        this.constrained_edge[0] = true;
      }
    } else {
      alert('Invalid tessellation.Triangle.MarkConstrainedEdge call!');
    }
  };

  /**
   * Utils
   */
  tessellation.PI_3div4 = 3 * Math.PI / 4;
  tessellation.PI_2 = Math.PI / 2;
  tessellation.EPSILON = 1e-12;

  /* 
   * Inital triangle factor, seed triangle will extend 30% of
   * PointSet width to both left and right.
   */
  tessellation.kAlpha = 0.3;

  tessellation.Orientation = {
    "CW"      : 1,
    "CCW"     : -1,
    "COLLINEAR" : 0
  };

  /**
   * Forumla to calculate signed area<br>
   * Positive if CCW<br>
   * Negative if CW<br>
   * 0 if collinear<br>
   * <pre>
   * A[P1,P2,P3]  =  (x1*y2 - y1*x2) + (x2*y3 - y2*x3) + (x3*y1 - y3*x1)
   *        =  (x1-x3)*(y2-y3) - (y1-y3)*(x2-x3)
   * </pre>
   */
  tessellation.Orient2d = function(pa, pb, pc) {
    var detleft = (pa.x - pc.x) * (pb.y - pc.y);
    var detright = (pa.y - pc.y) * (pb.x - pc.x);
    var val = detleft - detright;
    if (val > -(tessellation.EPSILON) && val < (tessellation.EPSILON)) {
      return tessellation.Orientation.COLLINEAR;
    } else if (val > 0) {
      return tessellation.Orientation.CCW;
    } else {
      return tessellation.Orientation.CW;
    }
  };

  tessellation.InScanArea = function(pa, pb, pc, pd) {
    var pdx = pd.x;
    var pdy = pd.y;
    var adx = pa.x - pdx;
    var ady = pa.y - pdy;
    var bdx = pb.x - pdx;
    var bdy = pb.y - pdy;

    var adxbdy = adx * bdy;
    var bdxady = bdx * ady;
    var oabd = adxbdy - bdxady;

    if (oabd <= (tessellation.EPSILON)) {
      return false;
    }

    var cdx = pc.x - pdx;
    var cdy = pc.y - pdy;

    var cdxady = cdx * ady;
    var adxcdy = adx * cdy;
    var ocad = cdxady - adxcdy;

    if (ocad <= (tessellation.EPSILON)) {
      return false;
    }

    return true;
  };

  tessellation.Node = function() {
    this.point = null; // Point
    this.triangle = null; // Triangle

    this.next = null; // Node
    this.prev = null; // Node

    this.value = 0.0; // double

    if (arguments.length == 1) {
      this.point = arguments[0];
      this.value = this.point.x;
    } else if (arguments.length == 2) {
      this.point = arguments[0];
      this.triangle = arguments[1];
      this.value = this.point.x;
    } else {
      alert('Invalid tessellation.Node constructor call!');
    }
  };

  /**
   * Advancing Front
   */
  tessellation.AdvancingFront = function(head, tail) {
    this.head = head; // Node
    this.tail = tail; // Node
    this.search_node = head; // Node
  };

  tessellation.AdvancingFront.prototype.search = function() {
    return this.search_node;
  };

  tessellation.AdvancingFront.prototype.set_search = function(node) {
    this.search_node = node;
  };

  tessellation.AdvancingFront.prototype.FindSearchNode = function(x) {
    return this.search_node;
  };

  tessellation.AdvancingFront.prototype.LocateNode = function(x) {
    var node = this.search_node;

    if (x < node.value) {
      while ((node = node.prev) != null) {
        if (x >= node.value) {
          this.search_node = node;
          return node;
        }
      }
    } else {
      while ((node = node.next) != null) {
        if (x < node.value) {
          this.search_node = node.prev;
          return node.prev;
        }
      }
    }
    return null;
  };

  tessellation.AdvancingFront.prototype.LocatePoint = function(point) {
    var px = point.x;
    var node = this.FindSearchNode(px);
    var nx = node.point.x;

    if (px == nx) {
      // We might have two nodes with same x value for a short time
      if (node.prev && point.equals(node.prev.point)) {
        node = node.prev;
      } else if (node.next && point.equals(node.next.point)) {
        node = node.next;
      } else if (point.equals(node.point)) {
        // do nothing
      } else {
        alert('Invalid tessellation.AdvancingFront.LocatePoint call!');
        return null;
      }
    } else if (px < nx) {
      while ((node = node.prev) != null) {
        if (point.equals(node.point)) break;
      }
    } else {
      while ((node = node.next) != null) {
        if (point.equals(node.point)) break;
      }
    }

    if (node != null) this.search_node = node;
    return node;
  };

  /**
   * Basin
   */
  tessellation.Basin = function() {
    this.left_node = null; // Node
    this.bottom_node = null; // Node
    this.right_node = null; // Node
    this.width = 0.0; // number
    this.left_highest = false;
  };

  tessellation.Basin.prototype.Clear = function() {
    this.left_node = null;
    this.bottom_node = null;
    this.right_node = null;
    this.width = 0.0;
    this.left_highest = false;
  };

  /**
   * EdgeEvent
   */
  tessellation.EdgeEvent = function() {
    this.constrained_edge = null; // Edge
    this.right = false;
  };

  /**
   * SweepContext
   */
  tessellation.SweepContext = function(polyline) {
    this.triangles = [];
    this.map = [];
    this.points = polyline;
    this.edges = [];

    // Advancing front
    this.front = null; // AdvancingFront
    // head point used with advancing front
    this.head = null; // Point
    // tail point used with advancing front
    this.tail = null; // Point

    this.af_head = null; // Node
    this.af_middle_ = null; // Node
    this.af_tail = null; // Node

    this.basin = new tessellation.Basin();
    this.edge_event = new tessellation.EdgeEvent();

    this.InitEdges(this.points);
  };

  tessellation.SweepContext.prototype.AddHole = function(polyline) {
    this.InitEdges(polyline);
    for (var i in polyline) {
      this.points.push(polyline[i]);
    }
  };

  tessellation.SweepContext.prototype.point_count = function() {
    return this.points.length;
  };

  tessellation.SweepContext.prototype.GetTriangles = function() {
    return this.triangles;
  };

  tessellation.SweepContext.prototype.GetMap = function() {
    return this.map;
  };

  tessellation.SweepContext.prototype.InitTriangulation = function() {
    var xmax = this.points[0].x;
    var xmin = this.points[0].x;
    var ymax = this.points[0].y;
    var ymin = this.points[0].y;

    // Calculate bounds
    for (var i in this.points) {
      var p = this.points[i];
      if (p.x > xmax) xmax = p.x;
      if (p.x < xmin) xmin = p.x;
      if (p.y > ymax) ymax = p.y;
      if (p.y < ymin) ymin = p.y;
    }

    var dx = tessellation.kAlpha * (xmax - xmin);
    var dy = tessellation.kAlpha * (ymax - ymin);
    this.head = new Two.Vector(xmax + dx, ymin - dy);
    this.tail = new Two.Vector(xmin - dy, ymin - dy);

    // Sort points along y-axis
    this.points.sort(tessellation.cmp);
  };

  tessellation.SweepContext.prototype.InitEdges = function(polyline) {
    for (var i=0; i < polyline.length; ++i) {
      this.edges.push(new tessellation.Edge(polyline[i], polyline[(i+1) % polyline.length]));
    }
  };

  tessellation.SweepContext.prototype.GetPoint = function(index) {
    return this.points[index];
  };

  tessellation.SweepContext.prototype.AddToMap = function(triangle) {
    this.map.push(triangle);
  };

  tessellation.SweepContext.prototype.LocateNode = function(point) {
    return this.front.LocateNode(point.x);
  };

  tessellation.SweepContext.prototype.CreateAdvancingFront = function() {
    var head;
    var middle;
    var tail;
    // Initial triangle
    var triangle = new tessellation.Triangle(this.points[0], this.tail, this.head);

    this.map.push(triangle);

    head = new tessellation.Node(triangle.GetPoint(1), triangle);
    middle = new tessellation.Node(triangle.GetPoint(0), triangle);
    tail = new tessellation.Node(triangle.GetPoint(2));

    this.front = new tessellation.AdvancingFront(head, tail);

    head.next = middle;
    middle.next = tail;
    middle.prev = head;
    tail.prev = middle;
  };

  tessellation.SweepContext.prototype.RemoveNode = function(node) {
    // do nothing
  };

  tessellation.SweepContext.prototype.MapTriangleToNodes = function(t) {
    for (var i=0; i<3; ++i) {
      if (t.GetNeighbor(i) == null) {
        var n = this.front.LocatePoint(t.PointCW(t.GetPoint(i)));
        if (n != null) {
          n.triangle = t;
        }
      }
    }
  };

  tessellation.SweepContext.prototype.RemoveFromMap = function(triangle) {
    for (var i in this.map) {
      if (this.map[i] == triangle) {
        delete this.map[i];
        break;
      }
    }
  };

  tessellation.SweepContext.prototype.MeshClean = function(triangle) {
    if (triangle != null && !triangle.IsInterior()) {
      triangle.IsInterior(true);
      this.triangles.push(triangle);
      for (var i=0; i<3; ++i) {
        if (!triangle.constrained_edge[i]) {
          this.MeshClean(triangle.GetNeighbor(i));
        }
      }
    }
  };

  /**
   * sweep
   */
  tessellation.sweep = {};

  /**
   * Triangulate simple polygon with holes.
   * @param   tcx SweepContext object.
   */
  tessellation.sweep.Triangulate = function(tcx) {
    tcx.InitTriangulation();
    tcx.CreateAdvancingFront();
    // Sweep points; build mesh
    tessellation.sweep.SweepPoints(tcx);
    // Clean up
    tessellation.sweep.FinalizationPolygon(tcx);
  };

  tessellation.sweep.SweepPoints = function(tcx) {
    for (var i=1; i < tcx.point_count(); ++i) {
      var point = tcx.GetPoint(i);
      var node = tessellation.sweep.PointEvent(tcx, point);
      for (var j=0; j < point.edges.length; ++j) {
        tessellation.sweep.EdgeEvent(tcx, point.edges[j], node);
      }
    }
  };

  tessellation.sweep.FinalizationPolygon = function(tcx) {
    // Get an Internal triangle to start with
    var t = tcx.front.head.next.triangle;
    var p = tcx.front.head.next.point;
    while (!t.GetConstrainedEdgeCW(p)) {
      t = t.NeighborCCW(p);
    }

    // Collect interior triangles constrained by edges
    tcx.MeshClean(t);
  };

  /**
   * Find closes node to the left of the new Two.Vector and
   * create a new triangle. If needed new holes and basins
   * will be filled to.
   */
  tessellation.sweep.PointEvent = function(tcx, point) {
    var node = tcx.LocateNode(point);
    var new_node = tessellation.sweep.NewFrontTriangle(tcx, point, node);

    // Only need to check +epsilon since Two.Vector never have smaller
    // x value than node due to how we fetch nodes from the front
    if (point.x <= node.point.x + (tessellation.EPSILON)) {
      tessellation.sweep.Fill(tcx, node);
    }

    //tcx.AddNode(new_node);

    tessellation.sweep.FillAdvancingFront(tcx, new_node);
    return new_node;
  };

  tessellation.sweep.EdgeEvent = function() {
    var tcx;
    if (arguments.length == 3) {
      tcx = arguments[0];
      var edge = arguments[1];
      var node = arguments[2];

      tcx.edge_event.constrained_edge = edge;
      tcx.edge_event.right = (edge.p.x > edge.q.x);

      if (tessellation.sweep.IsEdgeSideOfTriangle(node.triangle, edge.p, edge.q)) {
        return;
      }

      // For now we will do all needed filling
      // TODO: integrate with flip process might give some better performance
      //     but for now this avoid the issue with cases that needs both flips and fills
      tessellation.sweep.FillEdgeEvent(tcx, edge, node);
      tessellation.sweep.EdgeEvent(tcx, edge.p, edge.q, node.triangle, edge.q);
    } else if (arguments.length == 5) {
      tcx = arguments[0];
      var ep = arguments[1];
      var eq = arguments[2];
      var triangle = arguments[3];
      var point = arguments[4];

      if (tessellation.sweep.IsEdgeSideOfTriangle(triangle, ep, eq)) {
        return;
      }

      var p1 = triangle.PointCCW(point);
      var o1 = tessellation.Orient2d(eq, p1, ep);
      if (o1 == tessellation.Orientation.COLLINEAR) {
        alert('tessellation.sweep.EdgeEvent: Collinear not supported!');
        return;
      }

      var p2 = triangle.PointCW(point);
      var o2 = tessellation.Orient2d(eq, p2, ep);
      if (o2 == tessellation.Orientation.COLLINEAR) {
        alert('tessellation.sweep.EdgeEvent: Collinear not supported!');
        return;
      }

      if (o1 == o2) {
        // Need to decide if we are rotating CW or CCW to get to a triangle
        // that will cross edge
        if (o1 == tessellation.Orientation.CW) {
          triangle = triangle.NeighborCCW(point);
        } else {
          triangle = triangle.NeighborCW(point);
        }
        tessellation.sweep.EdgeEvent(tcx, ep, eq, triangle, point);
      } else {
        // This triangle crosses constraint so lets flippin start!
        tessellation.sweep.FlipEdgeEvent(tcx, ep, eq, triangle, point);
      }
    } else {
      alert('Invalid tessellation.sweep.EdgeEvent call!');
    }
  };

  tessellation.sweep.IsEdgeSideOfTriangle = function(triangle, ep, eq) {
    var index = triangle.EdgeIndex(ep, eq);
    if (index != -1) {
      triangle.MarkConstrainedEdge(index);
      var t = triangle.GetNeighbor(index);
      if (t != null) {
        t.MarkConstrainedEdge(ep, eq);
      }
      return true;
    }
    return false;
  };

  tessellation.sweep.NewFrontTriangle = function(tcx, point, node) {
    var triangle = new tessellation.Triangle(point, node.point, node.next.point);

    triangle.MarkNeighbor(node.triangle);
    tcx.AddToMap(triangle);

    var new_node = new tessellation.Node(point);
    new_node.next = node.next;
    new_node.prev = node;
    node.next.prev = new_node;
    node.next = new_node;

    if (!tessellation.sweep.Legalize(tcx, triangle)) {
      tcx.MapTriangleToNodes(triangle);
    }

    return new_node;
  };

  /**
   * Adds a triangle to the advancing front to fill a hole.
   * @param tcx
   * @param node - middle node, that is the bottom of the hole
   */
  tessellation.sweep.Fill = function(tcx, node) {
    var triangle = new tessellation.Triangle(node.prev.point, node.point, node.next.point);

    // TODO: should copy the constrained_edge value from neighbor triangles
    //     for now constrained_edge values are copied during the legalize
    triangle.MarkNeighbor(node.prev.triangle);
    triangle.MarkNeighbor(node.triangle);

    tcx.AddToMap(triangle);

    // Update the advancing front
    node.prev.next = node.next;
    node.next.prev = node.prev;


    // If it was legalized the triangle has already been mapped
    if (!tessellation.sweep.Legalize(tcx, triangle)) {
      tcx.MapTriangleToNodes(triangle);
    }

    //tcx.RemoveNode(node);
  };

  /**
   * Fills holes in the Advancing Front
   */
  tessellation.sweep.FillAdvancingFront = function(tcx, n) {
    // Fill right holes
    var node = n.next;
    var angle;

    while (node.next != null) {
      angle = tessellation.sweep.HoleAngle(node);
      if (angle > tessellation.PI_2 || angle < -(tessellation.PI_2)) break;
      tessellation.sweep.Fill(tcx, node);
      node = node.next;
    }

    // Fill left holes
    node = n.prev;

    while (node.prev != null) {
      angle = tessellation.sweep.HoleAngle(node);
      if (angle > tessellation.PI_2 || angle < -(tessellation.PI_2)) break;
      tessellation.sweep.Fill(tcx, node);
      node = node.prev;
    }

    // Fill right basins
    if (n.next != null && n.next.next != null) {
      angle = tessellation.sweep.BasinAngle(n);
      if (angle < tessellation.PI_3div4) {
        tessellation.sweep.FillBasin(tcx, n);
      }
    }
  };

  tessellation.sweep.BasinAngle = function(node) {
    var ax = node.point.x - node.next.next.point.x;
    var ay = node.point.y - node.next.next.point.y;
    return Math.atan2(ay, ax);
  };

  /**
   *
   * @param node - middle node
   * @return the angle between 3 front nodes
   */
  tessellation.sweep.HoleAngle = function(node) {
  /* Complex plane
   * ab = cosA +i*sinA
   * ab = (ax + ay*i)(bx + by*i) = (ax*bx + ay*by) + i(ax*by-ay*bx)
   * atan2(y,x) computes the principal value of the argument function
   * applied to the complex number x+iy
   * Where x = ax*bx + ay*by
   *     y = ax*by - ay*bx
   */
  var ax = node.next.point.x - node.point.x;
  var ay = node.next.point.y - node.point.y;
  var bx = node.prev.point.x - node.point.x;
  var by = node.prev.point.y - node.point.y;
  return Math.atan2(ax * by - ay * bx, ax * bx + ay * by);
  };

  /**
   * Returns true if triangle was legalized
   */
  tessellation.sweep.Legalize = function(tcx, t) {
    // To legalize a triangle we start by finding if any of the three edges
    // violate the Delaunay condition
    for (var i=0; i < 3; ++i) {
      if (t.delaunay_edge[i]) continue;

      var ot = t.GetNeighbor(i);
      if (ot != null) {
        var p = t.GetPoint(i);
        var op = ot.OppositePoint(t, p);
        var oi = ot.Index(op);

        // If this is a Constrained Edge or a Delaunay Edge(only during recursive legalization)
        // then we should not try to legalize
        if (ot.constrained_edge[oi] || ot.delaunay_edge[oi]) {
          t.constrained_edge[i] = ot.constrained_edge[oi];
          continue;
        }

        var inside = tessellation.sweep.Incircle(p, t.PointCCW(p), t.PointCW(p), op);
        if (inside) {
          // Lets mark this shared edge as Delaunay
          t.delaunay_edge[i] = true;
          ot.delaunay_edge[oi] = true;

          // Lets rotate shared edge one vertex CW to legalize it
          tessellation.sweep.RotateTrianglePair(t, p, ot, op);

          // We now got one valid Delaunay Edge shared by two triangles
          // This gives us 4 new edges to check for Delaunay

          // Make sure that triangle to node mapping is done only one time for a specific triangle
          var not_legalized = !tessellation.sweep.Legalize(tcx, t);
          if (not_legalized) {
            tcx.MapTriangleToNodes(t);
          }

          not_legalized = !tessellation.sweep.Legalize(tcx, ot);
          if (not_legalized) tcx.MapTriangleToNodes(ot);

          // Reset the Delaunay edges, since they only are valid Delaunay edges
          // until we add a new triangle or Two.Vector.
          // XXX: need to think about this. Can these edges be tried after we
          //    return to previous recursive level?
          t.delaunay_edge[i] = false;
          ot.delaunay_edge[oi] = false;

          // If triangle have been legalized no need to check the other edges since
          // the recursive legalization will handles those so we can end here.
          return true;
        }
      }
    }
    return false;
  };

  /**
   * <b>Requirement</b>:<br>
   * 1. a,b and c form a triangle.<br>
   * 2. a and d is know to be on opposite side of bc<br>
   * <pre>
   *        a
   *        +
   *         / \
   *        /   \
   *      b/     \c
   *      +-------+
   *       /  d  \
   *      /       \
   * </pre>
   * <b>Fact</b>: d has to be in area B to have a chance to be inside the circle formed by
   *  a,b and c<br>
   *  d is outside B if orient2d(a,b,d) or orient2d(c,a,d) is CW<br>
   *  This preknowledge gives us a way to optimize the incircle test
   * @param pa - triangle Two.Vector, opposite d
   * @param pb - triangle Two.Vector
   * @param pc - triangle Two.Vector
   * @param pd - Two.Vector opposite a
   * @return true if d is inside circle, false if on circle edge
   */
  tessellation.sweep.Incircle = function(pa, pb, pc, pd) {
    var adx = pa.x - pd.x;
    var ady = pa.y - pd.y;
    var bdx = pb.x - pd.x;
    var bdy = pb.y - pd.y;

    var adxbdy = adx * bdy;
    var bdxady = bdx * ady;
    var oabd = adxbdy - bdxady;

    if (oabd <= 0) return false;

    var cdx = pc.x - pd.x;
    var cdy = pc.y - pd.y;

    var cdxady = cdx * ady;
    var adxcdy = adx * cdy;
    var ocad = cdxady - adxcdy;

    if (ocad <= 0) return false;

    var bdxcdy = bdx * cdy;
    var cdxbdy = cdx * bdy;

    var alift = adx * adx + ady * ady;
    var blift = bdx * bdx + bdy * bdy;
    var clift = cdx * cdx + cdy * cdy;

    var det = alift * (bdxcdy - cdxbdy) + blift * ocad + clift * oabd;
    return det > 0;
  };

  /**
   * Rotates a triangle pair one vertex CW
   *<pre>
   *     n2          n2
   *  P +-----+       P +-----+
   *  | t  /|         |\  t |
   *  | / |         | \ |
   *  n1|  /  |n3     n1|  \  |n3
   *  | /   |    after CW   |   \ |
   *  |/ oT |         | oT \|
   *  +-----+ oP        +-----+
   *     n4          n4
   * </pre>
   */
  tessellation.sweep.RotateTrianglePair = function(t, p, ot, op) {
    var n1; var n2; var n3; var n4;
    n1 = t.NeighborCCW(p);
    n2 = t.NeighborCW(p);
    n3 = ot.NeighborCCW(op);
    n4 = ot.NeighborCW(op);

    var ce1; var ce2; var ce3; var ce4;
    ce1 = t.GetConstrainedEdgeCCW(p);
    ce2 = t.GetConstrainedEdgeCW(p);
    ce3 = ot.GetConstrainedEdgeCCW(op);
    ce4 = ot.GetConstrainedEdgeCW(op);

    var de1; var de2; var de3; var de4;
    de1 = t.GetDelaunayEdgeCCW(p);
    de2 = t.GetDelaunayEdgeCW(p);
    de3 = ot.GetDelaunayEdgeCCW(op);
    de4 = ot.GetDelaunayEdgeCW(op);

    t.Legalize(p, op);
    ot.Legalize(op, p);

    // Remap delaunay_edge
    ot.SetDelaunayEdgeCCW(p, de1);
    t.SetDelaunayEdgeCW(p, de2);
    t.SetDelaunayEdgeCCW(op, de3);
    ot.SetDelaunayEdgeCW(op, de4);

    // Remap constrained_edge
    ot.SetConstrainedEdgeCCW(p, ce1);
    t.SetConstrainedEdgeCW(p, ce2);
    t.SetConstrainedEdgeCCW(op, ce3);
    ot.SetConstrainedEdgeCW(op, ce4);

    // Remap neighbors
    // XXX: might optimize the markNeighbor by keeping track of
    //    what side should be assigned to what neighbor after the
    //    rotation. Now mark neighbor does lots of testing to find
    //    the right side.
    t.ClearNeigbors();
    ot.ClearNeigbors();
    if (n1) ot.MarkNeighbor(n1);
    if (n2) t.MarkNeighbor(n2);
    if (n3) t.MarkNeighbor(n3);
    if (n4) ot.MarkNeighbor(n4);
    t.MarkNeighbor(ot);
  };

  /**
   * Fills a basin that has formed on the Advancing Front to the right
   * of given node.<br>
   * First we decide a left,bottom and right node that forms the
   * boundaries of the basin. Then we do a reqursive fill.
   *
   * @param tcx
   * @param node - starting node, this or next node will be left node
   */
  tessellation.sweep.FillBasin = function(tcx, node) {
    if (tessellation.Orient2d(node.point, node.next.point, node.next.next.point) == tessellation.Orientation.CCW) {
      tcx.basin.left_node = node.next.next;
    } else {
      tcx.basin.left_node = node.next;
    }

    // Find the bottom and right node
    tcx.basin.bottom_node = tcx.basin.left_node;
    while (tcx.basin.bottom_node.next != null && tcx.basin.bottom_node.point.y >= tcx.basin.bottom_node.next.point.y) {
      tcx.basin.bottom_node = tcx.basin.bottom_node.next;
    }
    if (tcx.basin.bottom_node == tcx.basin.left_node) {
      // No valid basin
      return;
    }

    tcx.basin.right_node = tcx.basin.bottom_node;
    while (tcx.basin.right_node.next != null && tcx.basin.right_node.point.y < tcx.basin.right_node.next.point.y) {
      tcx.basin.right_node = tcx.basin.right_node.next;
    }
    if (tcx.basin.right_node == tcx.basin.bottom_node) {
      // No valid basins
      return;
    }

    tcx.basin.width = tcx.basin.right_node.point.x - tcx.basin.left_node.point.x;
    tcx.basin.left_highest = tcx.basin.left_node.point.y > tcx.basin.right_node.point.y;

    tessellation.sweep.FillBasinReq(tcx, tcx.basin.bottom_node);
  };

  /**
   * Recursive algorithm to fill a Basin with triangles
   *
   * @param tcx
   * @param node - bottom_node
   */
  tessellation.sweep.FillBasinReq = function(tcx, node) {
    // if shallow stop filling
    if (tessellation.sweep.IsShallow(tcx, node)) {
      return;
    }

    tessellation.sweep.Fill(tcx, node);

    var o;
    if (node.prev == tcx.basin.left_node && node.next == tcx.basin.right_node) {
      return;
    } else if (node.prev == tcx.basin.left_node) {
      o = tessellation.Orient2d(node.point, node.next.point, node.next.next.point);
      if (o == tessellation.Orientation.CW) {
        return;
      }
      node = node.next;
    } else if (node.next == tcx.basin.right_node) {
      o = tessellation.Orient2d(node.point, node.prev.point, node.prev.prev.point);
      if (o == tessellation.Orientation.CCW) {
        return;
      }
      node = node.prev;
    } else {
      // Continue with the neighbor node with lowest Y value
      if (node.prev.point.y < node.next.point.y) {
        node = node.prev;
      } else {
        node = node.next;
      }
    }

    tessellation.sweep.FillBasinReq(tcx, node);
  };

  tessellation.sweep.IsShallow = function(tcx, node) {
    var height;
    if (tcx.basin.left_highest) {
      height = tcx.basin.left_node.point.y - node.point.y;
    } else {
      height = tcx.basin.right_node.point.y - node.point.y;
    }

    // if shallow stop filling
    if (tcx.basin.width > height) {
      return true;
    }
    return false;
  };

  tessellation.sweep.FillEdgeEvent = function(tcx, edge, node) {
    if (tcx.edge_event.right) {
      tessellation.sweep.FillRightAboveEdgeEvent(tcx, edge, node);
    } else {
      tessellation.sweep.FillLeftAboveEdgeEvent(tcx, edge, node);
    }
  };

  tessellation.sweep.FillRightAboveEdgeEvent = function(tcx, edge, node) {
    while (node.next.point.x < edge.p.x) {
      // Check if next node is below the edge
      if (tessellation.Orient2d(edge.q, node.next.point, edge.p) == tessellation.Orientation.CCW) {
        tessellation.sweep.FillRightBelowEdgeEvent(tcx, edge, node);
      } else {
        node = node.next;
      }
    }
  };

  tessellation.sweep.FillRightBelowEdgeEvent = function(tcx, edge, node) {
    if (node.point.x < edge.p.x) {
      if (tessellation.Orient2d(node.point, node.next.point, node.next.next.point) == tessellation.Orientation.CCW) {
        // Concave
        tessellation.sweep.FillRightConcaveEdgeEvent(tcx, edge, node);
      } else{
        // Convex
        tessellation.sweep.FillRightConvexEdgeEvent(tcx, edge, node);
        // Retry this one
        tessellation.sweep.FillRightBelowEdgeEvent(tcx, edge, node);
      }
    }
  };

  tessellation.sweep.FillRightConcaveEdgeEvent = function(tcx, edge, node) {
    tessellation.sweep.Fill(tcx, node.next);
    if (node.next.point != edge.p) {
      // Next above or below edge?
      if (tessellation.Orient2d(edge.q, node.next.point, edge.p) == tessellation.Orientation.CCW) {
        // Below
        if (tessellation.Orient2d(node.point, node.next.point, node.next.next.point) == tessellation.Orientation.CCW) {
          // Next is concave
          tessellation.sweep.FillRightConcaveEdgeEvent(tcx, edge, node);
        } else {
        // Next is convex
        }
      }
    }
  };

  tessellation.sweep.FillRightConvexEdgeEvent = function(tcx, edge, node) {
    // Next concave or convex?
    if (tessellation.Orient2d(node.next.point, node.next.next.point, node.next.next.next.point) == tessellation.Orientation.CCW) {
      // Concave
      tessellation.sweep.FillRightConcaveEdgeEvent(tcx, edge, node.next);
    } else {
      // Convex
      // Next above or below edge?
      if (tessellation.Orient2d(edge.q, node.next.next.point, edge.p) == tessellation.Orientation.CCW) {
        // Below
        tessellation.sweep.FillRightConvexEdgeEvent(tcx, edge, node.next);
      } else {
        // Above
      }
    }
  };

  tessellation.sweep.FillLeftAboveEdgeEvent = function(tcx, edge, node) {
    while (node.prev.point.x > edge.p.x) {
      // Check if next node is below the edge
      if (tessellation.Orient2d(edge.q, node.prev.point, edge.p) == tessellation.Orientation.CW) {
        tessellation.sweep.FillLeftBelowEdgeEvent(tcx, edge, node);
      } else {
        node = node.prev;
      }
    }
  };

  tessellation.sweep.FillLeftBelowEdgeEvent = function(tcx, edge, node) {
    if (node.point.x > edge.p.x) {
      if (tessellation.Orient2d(node.point, node.prev.point, node.prev.prev.point) == tessellation.Orientation.CW) {
        // Concave
        tessellation.sweep.FillLeftConcaveEdgeEvent(tcx, edge, node);
      } else {
        // Convex
        tessellation.sweep.FillLeftConvexEdgeEvent(tcx, edge, node);
        // Retry this one
        tessellation.sweep.FillLeftBelowEdgeEvent(tcx, edge, node);
      }
    }
  };

  tessellation.sweep.FillLeftConvexEdgeEvent = function(tcx, edge, node) {
    // Next concave or convex?
    if (tessellation.Orient2d(node.prev.point, node.prev.prev.point, node.prev.prev.prev.point) == tessellation.Orientation.CW) {
      // Concave
      tessellation.sweep.FillLeftConcaveEdgeEvent(tcx, edge, node.prev);
    } else {
      // Convex
      // Next above or below edge?
      if (tessellation.Orient2d(edge.q, node.prev.prev.point, edge.p) == tessellation.Orientation.CW) {
        // Below
        tessellation.sweep.FillLeftConvexEdgeEvent(tcx, edge, node.prev);
      } else {
        // Above
      }
    }
  };

  tessellation.sweep.FillLeftConcaveEdgeEvent = function(tcx, edge, node) {
    tessellation.sweep.Fill(tcx, node.prev);
    if (node.prev.point != edge.p) {
      // Next above or below edge?
      if (tessellation.Orient2d(edge.q, node.prev.point, edge.p) == tessellation.Orientation.CW) {
        // Below
        if (tessellation.Orient2d(node.point, node.prev.point, node.prev.prev.point) == tessellation.Orientation.CW) {
          // Next is concave
          tessellation.sweep.FillLeftConcaveEdgeEvent(tcx, edge, node);
        } else {
          // Next is convex
        }
      }
    }
  };

  tessellation.sweep.FlipEdgeEvent = function(tcx, ep, eq, t, p) {
    var ot = t.NeighborAcross(p);
    if (ot == null) {
      // If we want to integrate the fillEdgeEvent do it here
      // With current implementation we should never get here
      alert('[BUG:FIXME] FLIP failed due to missing triangle!');
      return;
    }
    var op = ot.OppositePoint(t, p);

    if (tessellation.InScanArea(p, t.PointCCW(p), t.PointCW(p), op)) {
      // Lets rotate shared edge one vertex CW
      tessellation.sweep.RotateTrianglePair(t, p, ot, op);
      tcx.MapTriangleToNodes(t);
      tcx.MapTriangleToNodes(ot);

      if (p == eq && op == ep) {
        if (eq == tcx.edge_event.constrained_edge.q && ep == tcx.edge_event.constrained_edge.p) {
          t.MarkConstrainedEdge(ep, eq);
          ot.MarkConstrainedEdge(ep, eq);
          tessellation.sweep.Legalize(tcx, t);
          tessellation.sweep.Legalize(tcx, ot);
        } else {
          // XXX: I think one of the triangles should be legalized here?
        }
      } else {
        var o = tessellation.Orient2d(eq, op, ep);
        t = tessellation.sweep.NextFlipTriangle(tcx, o, t, ot, p, op);
        tessellation.sweep.FlipEdgeEvent(tcx, ep, eq, t, p);
      }
    } else {
      var newP = tessellation.sweep.NextFlipPoint(ep, eq, ot, op);
      tessellation.sweep.FlipScanEdgeEvent(tcx, ep, eq, t, ot, newP);
      tessellation.sweep.EdgeEvent(tcx, ep, eq, t, p);
    }
  };

  tessellation.sweep.NextFlipTriangle = function(tcx, o, t, ot, p, op) {
    var edge_index;
    if (o == tessellation.Orientation.CCW) {
      // ot is not crossing edge after flip
      edge_index = ot.EdgeIndex(p, op);
      ot.delaunay_edge[edge_index] = true;
      tessellation.sweep.Legalize(tcx, ot);
      ot.ClearDelunayEdges();
      return t;
    }

    // t is not crossing edge after flip
    edge_index = t.EdgeIndex(p, op);

    t.delaunay_edge[edge_index] = true;
    tessellation.sweep.Legalize(tcx, t);
    t.ClearDelunayEdges();
    return ot;
  };

  tessellation.sweep.NextFlipPoint = function(ep, eq, ot, op) {
    var o2d = tessellation.Orient2d(eq, op, ep);
    if (o2d == tessellation.Orientation.CW) {
      // Right
      return ot.PointCCW(op);
    } else if (o2d == tessellation.Orientation.CCW) {
      // Left
      return ot.PointCW(op);
    } else {
      alert("[Unsupported] tessellation.sweep.NextFlipPoint: opposing point on constrained edge!");
      return undefined;
    }
  };

  tessellation.sweep.FlipScanEdgeEvent = function(tcx, ep, eq, flip_triangle, t, p) {
    var ot = t.NeighborAcross(p);

    if (ot == null) {
      // If we want to integrate the fillEdgeEvent do it here
      // With current implementation we should never get here
      alert('[BUG:FIXME] FLIP failed due to missing triangle');
      return;
    }
    var op = ot.OppositePoint(t, p);

    if (tessellation.InScanArea(eq, flip_triangle.PointCCW(eq), flip_triangle.PointCW(eq), op)) {
      // flip with new edge op.eq
      tessellation.sweep.FlipEdgeEvent(tcx, eq, op, ot, op);
      // TODO: Actually I just figured out that it should be possible to
      //     improve this by getting the next ot and op before the the above
      //     flip and continue the flipScanEdgeEvent here
      // set new ot and op here and loop back to inScanArea test
      // also need to set a new flip_triangle first
      // Turns out at first glance that this is somewhat complicated
      // so it will have to wait.
    } else {
      var newP = tessellation.sweep.NextFlipPoint(ep, eq, ot, op);
      tessellation.sweep.FlipScanEdgeEvent(tcx, ep, eq, flip_triangle, ot, newP);
    }
  };

})();

(function() {

  var root = this;
  var previousTwo = root.Two || {};

  /**
   * Constants
   */

  var sin = Math.sin,
    cos = Math.cos,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,
    round = Math.round,
    abs = Math.abs,
    PI = Math.PI,
    TWO_PI = PI * 2,
    HALF_PI = PI / 2,
    pow = Math.pow;

  /**
   * Cross browser dom events.
   */
  var dom = {

    hasEventListeners: _.isFunction(root.addEventListener),

    bind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.addEventListener(event, func, !!bool);
      } else {
        elem.attachEvent('on' + event, func);
      }
      return this;
    },

    unbind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.removeEventListeners(event, func, !!bool);
      } else {
        elem.detachEvent('on' + event, func);
      }
      return this;
    }

  };

  /**
   * @class
   */
  var Two = root.Two = function(options) {

    // Determine what Renderer to use and setup a scene.

    var params = _.defaults(options || {}, {
      fullscreen: false,
      width: 640,
      height: 480,
      type: Two.Types.svg,
      autostart: false
    });

    this.type = params.type;
    this.renderer = new Two[this.type](this);
    this.playing = params.autostart;
    this.frameCount = 0;

    if (params.fullscreen) {

      var fitted = _.bind(fitToWindow, this);
      _.extend(document.body.style, {
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      dom.bind(window, 'resize', fitted);
      fitted();


    } else {

      this.renderer.setSize(params.width, params.height);
      this.width = params.width;
      this.height = params.height;

    }

    this.scene = new Two.Group();
    this.renderer.add(this.scene);

    Two.Instances.push(this);

  };

  _.extend(Two, {

    /**
     * Primitive
     */

    Array: root.Float32Array || Array,

    Types: {
      webgl: 'WebGLRenderer',
      svg: 'SVGRenderer',
      canvas: 'CanvasRenderer'
    },

    Properties: {
      hierarchy: 'hierarchy'
    },

    Events: {
      play: 'play',
      pause: 'pause',
      update: 'update',
      render: 'render',
      resize: 'resize',
      change: 'change'
    },

    Resolution: 8,

    Instances: [],

    noConflict: function() {
      root.Two = previousTwo;
      return this;
    },

    Utils: {

      Curve: {

        CollinearityEpsilon: pow(10, -30),

        RecursionLimit: 32,

        CuspLimit: 2,

        Tolerance: {
          distance: 0.25,
          angle: 0,
          epsilon: 0.01
        }

      },

      /**
       * Given 2 points (a, b) and corresponding control point for each
       * return an array of points that represent an Adaptive Subdivision
       * of Bezier Curves. Founded in the online article:
       *
       * http://www.antigrain.com/research/adaptive_bezier/index.html
       *
       * Where level represents how many levels deep the function has
       * already recursed.
       *
       */
      subdivide: function(x1, y1, x2, y2, x3, y3, x4, y4, level) {

        // Constants
        var epsilon = Two.Utils.Curve.CollinearityEpsilon,
          limit = Two.Utils.Curve.RecursionLimit,
          cuspLimit = Two.Utils.Curve.CuspLimit,
          tolerance = Two.Utils.Curve.Tolerance;

        var level = level || 0;

        var x12 = (x1 + x2) / 2,
            y12 = (y1 + y2) / 2,
            x23 = (x2 + x3) / 2,
            y23 = (y2 + y3) / 2,
            x34 = (x3 + x4) / 2,
            y34 = (y3 + y4) / 2,
            x123  = (x12 + x23) / 2,
            y123  = (y12 + y23) / 2,
            x234  = (x23 + x34) / 2,
            y234  = (y23 + y34) / 2,
            x1234 = (x123 + x234) / 2,
            y1234 = (y123 + y234) / 2;

        if (level > 0) {

          // Try to approximate the full cubic curve by a single straight line.
          var dx = x4 - x1;
          var dy = y4 - y1;

          var d2 = abs(((x2 - x4) * dy - (y2 - y4) * dx));
          var d3 = abs(((x3 - x4) * dy - (y3 - y4) * dx));

          var da1, da2;

          if (d2 > epsilon && d3 > epsilon) {

            if ((d2 + d3) * (d2 + d3) <= tolerance.distance * (dx * dx + dy * dy)) {

              if (tolerance.angle < tolerance.epsilon) {
                return [new Two.Vector(x1234, y1234)];
              }

              var a23 = atan2(y3 - y2, x3 - x2);
              da1 = abs(a23 - atan2(y2 - y1, x2 - x1));
              da2 = abs(atan2(y4 - y3, x4 - x3) - a23);

              if (da1 >= PI) da1 = TWO_PI - da1;
              if (da2 >= PI) da2 = TWO_PI - da2;

              if (da1 + da2 < tolerance.angle) {
                return [new Two.Vector(x1234, y1234)];
              }

              if (cuspLimit !== 0) {

                if (da1 > cuspLimit) {
                  return [new Two.Vector(x2, y2)];
                }

                if (da2 > cuspLimit) {
                  return [new Two.Vector(x3, y3)];
                }

              }

            }

          }

        } else {

          if (d2 > epsilon) {

            if (d2 * d2 <= tolerance.distance * (dx * dx + dy * dy)) {

              if (tolerance.angle < tolerance.epsilon) {
                return [new Two.Vector(x1234, y1234)];
              }

              da1 = abs(atan2(y3 - y2, x3 - x2) - atan2(y2 - y1, x2 - x1));
              if (da1 >= PI) da1 = TWO_PI - da1;

              if (da1 < tolerance.angle) {
                return [
                  new Two.Vector(x2, y2),
                  new Two.Vector(x3, y3)
                ];
              }

              if (cuspLimit !== 0) {

                if (da1 > cuspLimit) {
                  return [new Two.Vector(x2, y2)];
                }

              }

            } else if (d3 > epsilon) {

              if (d3 * d3 <= tolerance.distance * (dx * dx + dy * dy)) {

                if (tolerance.angle < tolerance.epsilon) {
                  return [new Two.Vector(x1234, y1234)];
                }

                da1 = abs(atan2(y4 - y3, x4 - x3) - atan2(y3 - y2, x3 - x2));
                if (da1 >= PI) da1 = TWO_PI - da1;

                if (da1 < tolerance.angle) {
                  return [
                    new Two.Vector(x2, y2),
                    new Two.Vector(x3, y3)
                  ];
                }

                if (cuspLimit !== 0) {

                  if (da1 > cuspLimit) {
                    return [new Two.Vector2(x3, y3)];
                  }

                }

              }

            } else {

              dx = x1234 - (x1 + x4) / 2;
              dy = y1234 - (y1 + y4) / 2;
              if (dx * dx + dy * dy <= tolerance.distance) {
                return [new Two.Vector(x1234, y1234)];
              }

            }

          }

        }

        return Two.Utils.subdivide(
          x1, y1, x12, y12, x123, y123, x1234, y1234, level + 1
        ).concat(Two.Utils.subdivide(
          x1234, y1234, x234, y234, x34, y34, x4, y4, level + 1
        ));

      },

      /**
       * Creates a set of points that have u, v values for anchor positions
       */
      getCurveFromPoints: function(points, closed) {

        var curve = [], l = points.length, last = l - 1;

        for (var i = 0; i < l; i++) {

          var p = points[i];
          var point = { x: p.x, y: p.y };
          curve.push(point);

          var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

          var a = points[prev];
          var b = point;
          var c = points[next];
          getControlPoints(a, b, c);

          if (!b.u.x && !b.u.y) {
            b.u.x = b.x;
            b.u.y = b.y;
          }

          if (!b.v.x && !b.v.y) {
            b.v.x = b.x;
            b.v.y = b.y;
          }

        }

        return curve;

      },

      /**
       * Given three coordinates return the control points for the middle, b,
       * vertex.
       */
      getControlPoints: function(a, b, c) {

        var a1 = angleBetween(a, b);
        var a2 = angleBetween(c, b);

        var d1 = distanceBetween(a, b);
        var d2 = distanceBetween(c, b);

        var mid = (a1 + a2) / 2;

        // So we know which angle corresponds to which side.

        var u, v;

        if (d1 < 0.0001 || d2 < 0.0001) {
          b.u = { x: b.x, y: b.y };
          b.v = { x: b.x, y: b.y };
          return b;
        }

        d1 *= 0.33; // Why 0.33?
        d2 *= 0.33;

        if (a2 < a1) {
          mid += HALF_PI;
        } else {
          mid -= HALF_PI;
        }

        u = {
          x: b.x + cos(mid) * d1,
          y: b.y + sin(mid) * d1
        };

        mid -= PI;

        v = {
          x: b.x + cos(mid) * d2,
          y: b.y + sin(mid) * d2
        };

        b.u = u;
        b.v = v;

        return b;

      },

      angleBetween: function(A, B) {

        var dx = A.x - B.x;
        var dy = A.y - B.y;

        return atan2(dy, dx);

      },

      distanceBetweenSquared: function(p1, p2) {

        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;

        return dx * dx + dy * dy;

      },

      distanceBetween: function(p1, p2) {

        return sqrt(distanceBetweenSquared(p1, p2));

      },

      mod: function(v, l) {

        while (v < 0) {
          v += l;
        }

        return v % l;

      },

      // Custom Error Throwing for Two.js

      Error: function(message) {
        this.name = 'two.js';
        this.message = message;
      }

    }

  });

  Two.Utils.Error.prototype = new Error();
  Two.Utils.Error.prototype.constructor = Two.Utils.Error;

  // Localize utils

  var distanceBetween = Two.Utils.distanceBetween,
    distanceBetweenSquared = Two.Utils.distanceBetweenSquared,
    angleBetween = Two.Utils.angleBetween,
    getControlPoints = Two.Utils.getControlPoints,
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  _.extend(Two.prototype, Backbone.Events, {

    appendTo: function(elem) {

      elem.appendChild(this.renderer.domElement);
      return this;

    },

    play: function() {

      this.playing = true;

      return this.trigger(Two.Events.play);

    },

    pause: function() {

      this.playing = false;

      return this.trigger(Two.Events.pause);

    },

    /**
     * Update positions and calculations in one pass before rendering.
     */
    update: function() {

      this.frameCount++;

      var width = this.width;
      var height = this.height;
      var renderer = this.renderer;

      // Update width / height for the renderer
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize(width, height);
      }

      return this.trigger(Two.Events.update, this.frameCount);

    },

    /**
     * Render all drawable - visible objects of the scene.
     */
    render: function() {

      this.renderer.render();

      return this.trigger(Two.Events.render, this.frameCount);

    },

    /**
     * Convenience Methods
     */

    add: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      this.scene.add(objects);
      return this;

    },

    makeLine: function(x1, y1, x2, y2) {

      var width = x2 - x1;
      var height = y2 - y1;

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Vector(- w2, - h2),
        new Two.Vector(w2, h2)
      ];

      // Center line and translate to desired position.

      var line = new Two.Polygon(points).noFill();
      line.translation.set(x1 + w2, y1 + h2);

      this.scene.add(line);
      return line;

    },

    makeRectangle: function(x, y, width, height) {

      var w2 = width / 2;
      var h2 = height / 2;

      var points = [
        new Two.Vector(w2, h2),
        new Two.Vector(-w2, h2),
        new Two.Vector(-w2, -h2),
        new Two.Vector(w2, -h2)
      ];

      var rect = new Two.Polygon(points, true);
      rect.translation.set(x, y);

      this.scene.add(rect);
      return rect;

    },

    makeCircle: function(ox, oy, r) {

      return this.makeEllipse(ox, oy, r, r);

    },

    makeEllipse: function(ox, oy, width, height) {

      var amount = Two.Resolution;

      var points = _.map(_.range(amount), function(i) {
        var pct = i / amount;
        var theta = pct * TWO_PI;
        var x = width * cos(theta);
        var y = height * sin(theta);
        return new Two.Vector(x, y);
      }, this);

      var ellipse = new Two.Polygon(points, true, true);
      ellipse.translation.set(ox, oy);

      this.scene.add(ellipse);

      return ellipse;

    },

    makeCurve: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Vector(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined), true);
      var rect = poly.getBoundingClientRect();

      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      _.each(poly.vertices, function(v) {
        v.x -= cx;
        v.y -= cy;
      });

      poly.translation.set(cx, cy);

      this.scene.add(poly);

      return poly;

    },

    /**
     * Convenience method to make and draw a Two.Polygon.
     */
    makePolygon: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Vector(x, y));
        }
      }

      var last = arguments[l - 1];
      var poly = new Two.Polygon(points, !(_.isBoolean(last) ? last : undefined));
      var rect = poly.getBoundingClientRect();

      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      _.each(poly.vertices, function(v) {
        v.x -= cx;
        v.y -= cy;
      });

      poly.translation.set(cx, cy);

      this.scene.add(poly);

      return poly;

    },

    makeGroup: function(o) {

      var objects = o;
      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      var group = new Two.Group();
      this.scene.add(group);
      group.add(objects);

      return group;

    }

    // Utility Functions will go here.

  });

  function fitToWindow() {

    var wr = document.body.getBoundingClientRect();

    var width = this.width = wr.width;
    var height = this.height = wr.height;

    this.renderer.setSize(width, height);
    this.trigger(Two.Events.resize, width, height);

  }

  // Request Animation Frame

  (function() {

    _.each(Two.Instances, function(t) {

      if (t.playing) {
        t.update().render();
      }

    });

    requestAnimationFrame(arguments.callee);

  })();

})();
(function() {

  var Vector = Two.Vector = function(x, y) {

    var x = x || 0;
    var y = y || 0;

    Object.defineProperty(this, 'x', {
      get: function() {
        return x;
      },
      set: function(v) {
        x = v;
        this.trigger('change', 'x');
      }
    });

    Object.defineProperty(this, 'y', {
      get: function() {
        return y;
      },
      set: function(v) {
        y = v;
        this.trigger('change', 'y');
      }
    });

  };

  _.extend(Vector, {

  });

  _.extend(Vector.prototype, Backbone.Events, {

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

    add: function(v1, v2) {
      this.x = v1.x + v2.x;
      this.y = v1.y + v2.y;
      return this;
    },

    addSelf: function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    },

    sub: function(v1, v2) {
      this.x = v1.x - v2.x;
      this.y = v1.y - v2.y;
      return this;
    },

    subSelf: function(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    },

    multiplySelf: function(v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    },

    multiplyScalar: function(s) {
      this.x *= s;
      this.y *= s;
      return this;
    },

    divideScalar: function(s) {
      if (s) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }
      return this;
    },

    negate: function() {
      return this.multiplyScalar(-1);
    },

    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },

    lengthSquared: function() {
      return this.x * this.x + this.y * this.y;
    },

    length: function() {
      return Math.sqrt(this.lengthSquared());
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

    equals: function(v) {
      return (this.distanceTo(v) < 0.0001 /* almost same position */);
    },

    lerp: function(v, t) {
      var x = (v.x - this.x) * t + this.x;
      var y = (v.y - this.y) * t + this.y;
      return this.set(x, y);
    },

    isZero: function() {
      return (this.length() < 0.0001 /* almost zero */ );
    }

  });

})();
(function() {

  /**
   * Constants
   */
  var range = _.range(6),
    cos = Math.cos, sin = Math.sin, tan = Math.tan;

  /**
   * Two.Matrix contains an array of elements that represent
   * the two dimensional 3 x 3 matrix as illustrated below:
   *
   * =====
   * a b c
   * d e f
   * g h i  // this row is not really used in 2d transformations
   * =====
   *
   * String order is for transform strings: a, d, b, e, c, f
   *
   * @class
   */
  var Matrix = Two.Matrix = function(a, b, c, d, e, f) {

    this.elements = new Two.Array(9);

    var elements = a;
    if (!_.isArray(elements)) {
      elements = _.toArray(arguments);
    }

    // initialize the elements with default values.

    this.identity().set(elements);

  };

  _.extend(Matrix, {

    Identity: [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ],

    /**
     * Multiply two matrix 3x3 arrays
     */
    Multiply: function(A, B) {

      var A0 = A[0], A1 = A[1], A2 = A[2];
      var A3 = A[3], A4 = A[4], A5 = A[5];
      var A6 = A[6], A7 = A[7], A8 = A[8];

      var B0 = B[0], B1 = B[1], B2 = B[2];
      var B3 = B[3], B4 = B[4], B5 = B[5];
      var B6 = B[6], B7 = B[7], B8 = B[8];

      return [
        A0 * B0 + A1 * B3 + A2 * B6,
        A0 * B1 + A1 * B4 + A2 * B7,
        A0 * B2 + A1 * B5 + A2 * B8,
        A3 * B0 + A4 * B3 + A5 * B6,
        A3 * B1 + A4 * B4 + A5 * B7,
        A3 * B2 + A4 * B5 + A5 * B8,
        A6 * B0 + A7 * B3 + A8 * B6,
        A6 * B1 + A7 * B4 + A8 * B7,
        A6 * B2 + A7 * B5 + A8 * B8
      ];
    }

  });

  _.extend(Matrix.prototype, {

    /**
     * Takes an array of elements or the arguments list itself to
     * set and update the current matrix's elements. Only updates
     * specified values.
     */
    set: function(a, b, c, d, e, f) {

      var elements = a, l = arguments.length;
      if (!_.isArray(elements)) {
        elements = _.toArray(arguments);
      }

      _.each(elements, function(v, i) {
        if (_.isNumber(v)) {
          this.elements[i] = v;
        }
      }, this);

      return this;

    },

    /**
     * Turn matrix to identity, like resetting.
     */
    identity: function() {

      this.set(Matrix.Identity);

      return this;

    },

    /**
     * Multiply scalar or multiply by another matrix.
     */
    multiply: function(a, b, c, d, e, f, g, h, i) {

      var elements = arguments, l = elements.length;

      // Multiply scalar

      if (l <= 1) {

        _.each(this.elements, function(v, i) {
          this.elements[i] = v * a;
        }, this);

        return this;

      }

      if (l <= 3) { // Multiply Vector

        var x, y, z;
        var a = a || 0, b = b || 0, c = c || 0;
        var e = this.elements;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        var x = e[0] * a + e[1] * b + e[2] * c;
        var y = e[3] * a + e[4] * b + e[5] * c;
        var z = e[6] * a + e[7] * b + e[8] * c;

        return { x: x, y: y, z: z };

      }

      // Multiple matrix

      var A = this.elements;
      var B = elements;

      A0 = A[0], A1 = A[1], A2 = A[2];
      A3 = A[3], A4 = A[4], A5 = A[5];
      A6 = A[6], A7 = A[7], A8 = A[8];

      B0 = B[0], B1 = B[1], B2 = B[2];
      B3 = B[3], B4 = B[4], B5 = B[5];
      B6 = B[6], B7 = B[7], B8 = B[8];

      this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6;
      this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7;
      this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8;

      this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6;
      this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7;
      this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8;

      this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6;
      this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7;
      this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8;

      return this;

    },

    /**
     * Set a scalar onto the matrix.
     */
    scale: function(sx, sy) {

      var l = arguments.length;
      if (l <= 1) {
        sy = sx;
      }

      return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);

    },

    /**
     * Rotate the matrix.
     */
    rotate: function(radians) {

      var c = cos(radians);
      var s = sin(radians);

      return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);

    },

    /**
     * Translate the matrix.
     */
    translate: function(x, y) {

      return this.multiply(1, 0, x, 0, 1, y, 0, 0, 1);

    },

    /*
     * Skew the matrix by an angle in the x axis direction.
     */
    skewX: function(radians) {

      var a = tan(radians);

      return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);

    },

    /*
     * Skew the matrix by an angle in the y axis direction.
     */
    skewY: function(radians) {

      var a = tan(radians);

      return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);

    },

    /**
     * Create a transform string to be used with rendering apis.
     */
    toString: function() {

      return this.toArray().join(' ');

    },

    /**
     * Create a transform array to be used with rendering apis.
     */
    toArray: function(fullMatrix) {

      var elements = this.elements;

      var a = parseFloat(elements[0].toFixed(3));
      var b = parseFloat(elements[1].toFixed(3));
      var c = parseFloat(elements[2].toFixed(3));
      var d = parseFloat(elements[3].toFixed(3));
      var e = parseFloat(elements[4].toFixed(3));
      var f = parseFloat(elements[5].toFixed(3));

      if (!!fullMatrix) {

        var g = parseFloat(elements[6].toFixed(3));
        var h = parseFloat(elements[7].toFixed(3));
        var i = parseFloat(elements[8].toFixed(3));

        return [
          a, d, g, b, e, h, c, f, i
        ];
      }

      return [
        a, d, b, e, c, f  // Specific format see LN:19
      ];

    },

    /**
     * Clone the current matrix.
     */
    clone: function() {

      return new Two.Matrix(this.elements.slice(0));

    }

  });

})();
(function() {

  /**
   * Scope specific variables
   */
  var OBJECT_COUNT = 0;

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  var svg = {

    version: 1.1,

    ns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',

    /**
     * Create an svg namespaced element.
     */
    createElement: function(name, attrs) {
      var tag = name.toLowerCase();
      var elem = document.createElementNS(this.ns, tag);
      if (tag === 'svg') {
        attrs = _.defaults(attrs || {}, {
          version: this.version
        });
      }
      if (_.isObject(attrs)) {
        this.setAttributes(elem, attrs);
      }
      return elem;
    },

    /**
     * Add attributes from an svg element.
     */
    setAttributes: function(elem, attrs) {
      _.each(attrs, function(v, k) {
        this.setAttribute(k, v);
      }, elem);
      return this;
    },

    /**
     * Remove attributes from an svg element.
     */
    removeAttributes: function(elem, attrs) {
      _.each(attrs, function(a) {
        this.removeAttribute(a);
      }, elem);
      return this;
    },

    /**
     * Turn a set of vertices into a string for the d property of a path
     * element. It is imperative that the string collation is as fast as
     * possible, because this call will be happening multiple times a 
     * second.
     */
    toString: function(points, closed, curved) {

      var l = points.length,
        last = l - 1;

      if (!curved) {
        return _.map(points, function(v, i) {
          var command;
          if (i <= 0) {
            command = 'M';
          } else {
            command = 'L';
          }
          command += ' ' + v.x.toFixed(3) + ' ' + v.y.toFixed(3);
          if (i >= last && closed) {
            command += ' Z';
          }
          return command;
        }).join(' ');
      }

      var curve = getCurveFromPoints(points, closed);

      return _.map(curve, function(b, i) {

        var command;
        var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
        var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

        var a = curve[prev];
        var c = curve[next];

        var vx = a.v.x.toFixed(3);
        var vy = a.v.y.toFixed(3);

        var ux = b.u.x.toFixed(3);
        var uy = b.u.y.toFixed(3);

        var x = b.x.toFixed(3);
        var y = b.y.toFixed(3);

        if (i <= 0) {
          command = 'M ' + x + ' ' + y;
        } else {
          command = 'C '
            + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
        }

        // Add a final point and close it off

        if (i >= last && closed) {

          vx = b.v.x.toFixed(3);
          vy = b.v.y.toFixed(3);

          ux = c.u.x.toFixed(3);
          uy = c.u.y.toFixed(3);

          x = c.x.toFixed(3);
          y = c.y.toFixed(3);

          command += 
            ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;

          command += ' Z';
        }

        return command;

      }).join(' ');

    }

  };

  /**
   * @class
   */
  var Renderer = Two[Two.Types.svg] = function() {

    this.domElement = svg.createElement('svg');
    this.elements = [];
    this.commands = [];

    this.domElement.style.visibility = 'hidden';

    this.unveil = _.once(_.bind(function() {
      this.domElement.style.visibility = 'visible';
    }, this));

  };

  _.extend(Renderer, {

    Identifier: 'two-'

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height) {

      this.width = width;
      this.height = height;

      svg.setAttributes(this.domElement, {
        width: width,
        height: height
      });

      return this;

    },

    /**
     * Add an object or objects to the renderer.
     */
    add: function(o) {

      var l = arguments.length,
        objects = o,
        elements = this.elements,
        domElement = this.domElement;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        var elem, tag, styles, isGroup = object instanceof Two.Group;

        if (_.isUndefined(object.id)) {
          object.id = generateId();
        }

        // Generate an SVG equivalent element here.

        if (isGroup) {
          tag = 'g';
          if (_.isUndefined(object.parent)) { // For the "scene".
            object.parent = this;
            object.unbind(Two.Events.change)
              .bind(Two.Events.change, _.bind(this.update, this));
          }
          styles = getStyles(object);
          // Remove unnecessary fluff from group
          delete styles.stroke;
          delete styles.fill;
          delete styles['fill-opacity'];
          delete styles['stroke-opacity'];
          delete styles['stroke-linecap'];
          delete styles['stroke-linejoin'];
          delete styles['stroke-miterlimit'];
          delete styles['stroke-width'];
        } else {
          tag = 'path';
          styles = getStyles(object);
        }

        elem = svg.createElement(tag, styles);

        domElement.appendChild(elem);
        elements.push(elem);

      }, this);

      return this;

    },

    update: function(id, property, value) {

      this.commands.push(arguments);

      return this;

    },

    render: function() {

      this.unveil();

      var elements = this.elements,
        selector = Renderer.Identifier;

      _.each(this.commands, function(command) {

        var i = command[0],
          property = command[1],
          value = command[2],
          closed = command[3],  // Only exists for "d/vertices" property
          curved = command[4],
          elem = elements[i];

        switch (property) {

          case Two.Properties.hierarchy:
            _.each(value, function(j) {
              elem.appendChild(elements[j]);
            });
            break;
          default:
            setStyles(elem, property, value, closed, curved);
        }

      }, this);

      this.commands.length = 0;

      return this;

    }

  });

  function getStyles(o) {

    var styles = {},
      id = o.id,
      translation = o.translation,
      rotation = o.rotation,
      scale = o.scale,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = Renderer.Identifier + id;
    }
    if (translation && _.isNumber(scale) && _.isNumber(rotation)) {
      styles.transform = 'translate(' + translation.x + ',' + translation.y
        + ') scale(' + scale + ') rotate(' + rotation + ')'
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (opacity) {
      styles['stroke-opacity'] = styles['fill-opacity'] = opacity;
    }
    // if (visible) {
    styles.visibility = visible ? 'visible' : 'hidden';
    // }
    if (cap) {
      styles['stroke-linecap'] = cap;
    }
    if (join) {
      styles['stroke-linejoin'] = join;
    }
    if (miter) {
      styles['stroke-miterlimit'] = miter;
    }
    if (linewidth) {
      styles['stroke-width'] = linewidth;
    }
    if (vertices) {
      styles.d = svg.toString(vertices, closed, curved);
    }

    return styles;

  }

  function setStyles(elem, property, value, closed, curved) {

    switch (property) {

      case 'matrix':
        property = 'transform';
        value = 'matrix(' + value.toString() + ')';
        break;
      case 'visible':
        property = 'visibility';
        value = value ? 'visible' : 'hidden';
        break;
      case 'cap':
        property = 'stroke-linecap';
        break;
      case 'join':
        property = 'stroke-linejoin';
        break;
      case 'miter':
        property = 'stroke-miterlimit';
        break;
      case 'linewidth':
        property = 'stroke-width';
        break;
      case 'vertices':
        property = 'd';
        value = svg.toString(value, closed, curved);
        break;
      case 'opacity':
        svg.setAttributes(elem, {
          'stroke-opacity': opacity,
          'fill-opacity': opacity
        });
        return;

    }

    elem.setAttribute(property, value);

  }

  function generateId() {
    var count = OBJECT_COUNT;
    OBJECT_COUNT++;
    return count;
  }

})();
(function() {

  /**
   * Constants
   */
  var OBJECT_COUNT = 0;

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  /**
   * A canvas specific representation of Two.Group
   */
  var Group = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

    this.children = {};

  };

  _.extend(Group.prototype, {

    appendChild: function(elem) {

      var parent = elem.parent;
      var id = elem.id;

      if (!_.isUndefined(parent)) {
        delete parent.children[id];
      }

      this.children[id] = elem;
      elem.parent = this;

      return this;

    },

    render: function(ctx) {

      var matrix = this.matrix;

      ctx.save();
      ctx.transform(
        matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

      _.each(this.children, function(child) {
        child.render(ctx);
      });

      ctx.restore();

      return this;

    }

  });

  /**
   * A canvas specific representation of a drawable element.
   */
  var Element = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

  };

  _.extend(Element.prototype, {

    render: function(ctx) {

      var matrix = this.matrix,
        stroke = this.stroke,
        linewidth = this.linewidth,
        fill = this.fill,
        opacity = this.opacity,
        visible = this.visible,
        cap = this.cap,
        join = this.join,
        miter = this.miter,
        curved = this.curved,
        closed = this.closed,
        commands = this.commands,
        length = commands.length,
        last = length - 1;

      if (!visible) {
        return this;
      }

      // Transform

      ctx.save();

      if (matrix) {
        ctx.transform(
          matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
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

        var x = b.x.toFixed(3), y = b.y.toFixed(3);

        if (curved) {

          var prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

          var a = commands[prev];
          var c = commands[next];

          var vx = a.v.x.toFixed(3);
          var vy = a.v.y.toFixed(3);

          var ux = b.u.x.toFixed(3);
          var uy = b.u.y.toFixed(3);

          if (i <= 0) {

            ctx.moveTo(x, y);

          } else {

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            // Add a final point and close it off

            if (i >= last && closed) {

              vx = b.v.x.toFixed(3);
              vy = b.v.y.toFixed(3);

              ux = c.u.x.toFixed(3);
              uy = c.u.y.toFixed(3);

              x = c.x.toFixed(3);
              y = c.y.toFixed(3);

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

          }

        } else {

          if (i <= 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

        }
      });

      // Loose ends

      if (closed && !curved) {
        ctx.closePath();
      }

      ctx.fill();
      ctx.stroke();

      ctx.restore();

    }

  });

  var canvas = {

    /**
     * Turn a set of vertices into a string for drawing in a canvas.
     */
    toArray: function(points, curved, closed) {

      var l = points.length,
        last = l - 1;

      if (!curved) {
        return _.map(points, function(v, i) {
          return { x: v.x, y: v.y };
        });
      }

      return getCurveFromPoints(points, closed);

    }

  };

  var Renderer = Two[Two.Types.canvas] = function() {

    this.domElement = document.createElement('canvas');
    this.ctx = this.domElement.getContext('2d');

    this.elements = [];

    // Everything drawn on the canvas needs to come from the stage.
    this.stage = null;

  };

  _.extend(Renderer, {

    

  });

  _.extend(Renderer, {

    Group: Group,

    Element: Element,

    getStyles: getStyles,

    setStyles: setStyles

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height) {

      this.width = this.domElement.width = width;
      this.height = this.domElement.height = height;

      _.extend(this.domElement.style, {
        width: this.width + 'px',
        height: this.height + 'px'
      });

      return this;

    },

    add: function(o) {

      var proto = Object.getPrototypeOf(this);
        constructor = proto.constructor;

      var l = arguments.length,
        objects = o,
        elements = this.elements,
        domElement = this.domElement,

        // For extensibility with WebGlRenderer

        Group = constructor.Group,
        Element = constructor.Element,
        getStyles = constructor.getStyles;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        var elem, tag, styles, isGroup = object instanceof Two.Group,
          isStage = _.isNull(this.stage);

        if (_.isUndefined(object.id)) {
          object.id = generateId();
        }

        // Generate an element, a JavaScript object, that holds all the
        // necessary information to draw to the canvas successfully.

        if (isGroup) {
          // Kind of represents a matrix, save and restore set.
          styles = getStyles.call(this, object);
          delete styles.stroke;
          delete styles.fill;
          delete styles.opacity;
          delete styles.cap;
          delete styles.join;
          delete styles.miter;
          delete styles.linewidth;
          elem = new Group(styles);
          if (isStage) { // Set the stage

            this.stage = elem;
            this.stage.object = object; // Reference for BoundingBox calc.

            object.parent = this;
            object.unbind(Two.Events.change)
              .bind(Two.Events.change, _.bind(this.update, this));

          }
        } else {
          // Has styles and draw commands.
          elem = new Element(getStyles.call(this, object));
        }

        elements.push(elem);
        if (!isStage) {
          this.stage.appendChild(elem);
        }

      }, this);

      return this;

    },

    update: function(id, property, value) {

      var proto = Object.getPrototypeOf(this);
      var constructor = proto.constructor;

      var elements = this.elements;
      var elem = elements[id];

      switch (property) {
        case Two.Properties.hierarchy:
          _.each(value, function(j) {
            elem.appendChild(elements[j]);
          });
          break;
        default:
          constructor.setStyles.call(this, elem, property, value);
      }

      return this;

    },

    render: function() {

      if (_.isNull(this.stage)) {
        return this;
      }

      // TODO: Test performance between these two

      // var rect = this.stage.object.getBoundingClientRect();
      // this.ctx.clearRect(rect.left, rect.top, rect.width, rect.height);

      this.ctx.clearRect(0, 0, this.width, this.height);

      this.stage.render(this.ctx);

      return this;

    }

  });

  function resetTransform(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function getStyles(o) {

    var styles = {},
      id = o.id,
      matrix = o._matrix,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = id;
    }
    if (_.isObject(matrix)) {
      styles.matrix = matrix.toArray();
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (_.isNumber(opacity)) {
      styles.opacity = opacity;
    }
    if (cap) {
      styles.cap = cap;
    }
    if (join) {
      styles.join = join;
    }
    if (miter) {
      styles.miter = miter;
    }
    if (linewidth) {
      styles.linewidth = linewidth;
    }
    if (vertices) {
      styles.commands = canvas.toArray(vertices, curved, closed);
    }
    styles.visible = !!visible;
    styles.curved = !!curved;
    styles.closed = !!closed;

    return styles;

  }

  function setStyles(elem, property, value) {

    switch (property) {

      case 'matrix':
        property = 'matrix';
        value = value.toArray();
        break;
      case 'vertices':
        property = 'commands';
        value = canvas.toArray(value, elem.curved, elem.closed);
        break;

    }

    elem[property] = value;

  }

  function generateId() {
    var count = OBJECT_COUNT;
    OBJECT_COUNT++;
    return count;
  }

})();
(function() {

  // Localize variables
  var CanvasRenderer = Two[Two.Types.canvas],
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod,
    multiplyMatrix = Two.Matrix.Multiply;

  /**
   * CSS Color interpretation from
   * https://github.com/brehaut/color-js/blob/master/color.js
   * Copyright (c) 2008-2010, Andrew Brehaut, Tim Baumann, Matt Wilson
   * All rights reserved.
   */

  // css_colors maps color names onto their hex values
  // these names are defined by W3C
  var css_colors = {aliceblue:'#F0F8FF',antiquewhite:'#FAEBD7',aqua:'#00FFFF',aquamarine:'#7FFFD4',azure:'#F0FFFF',beige:'#F5F5DC',bisque:'#FFE4C4',black:'#000000',blanchedalmond:'#FFEBCD',blue:'#0000FF',blueviolet:'#8A2BE2',brown:'#A52A2A',burlywood:'#DEB887',cadetblue:'#5F9EA0',chartreuse:'#7FFF00',chocolate:'#D2691E',coral:'#FF7F50',cornflowerblue:'#6495ED',cornsilk:'#FFF8DC',crimson:'#DC143C',cyan:'#00FFFF',darkblue:'#00008B',darkcyan:'#008B8B',darkgoldenrod:'#B8860B',darkgray:'#A9A9A9',darkgrey:'#A9A9A9',darkgreen:'#006400',darkkhaki:'#BDB76B',darkmagenta:'#8B008B',darkolivegreen:'#556B2F',darkorange:'#FF8C00',darkorchid:'#9932CC',darkred:'#8B0000',darksalmon:'#E9967A',darkseagreen:'#8FBC8F',darkslateblue:'#483D8B',darkslategray:'#2F4F4F',darkslategrey:'#2F4F4F',darkturquoise:'#00CED1',darkviolet:'#9400D3',deeppink:'#FF1493',deepskyblue:'#00BFFF',dimgray:'#696969',dimgrey:'#696969',dodgerblue:'#1E90FF',firebrick:'#B22222',floralwhite:'#FFFAF0',forestgreen:'#228B22',fuchsia:'#FF00FF',gainsboro:'#DCDCDC',ghostwhite:'#F8F8FF',gold:'#FFD700',goldenrod:'#DAA520',gray:'#808080',grey:'#808080',green:'#008000',greenyellow:'#ADFF2F',honeydew:'#F0FFF0',hotpink:'#FF69B4',indianred:'#CD5C5C',indigo:'#4B0082',ivory:'#FFFFF0',khaki:'#F0E68C',lavender:'#E6E6FA',lavenderblush:'#FFF0F5',lawngreen:'#7CFC00',lemonchiffon:'#FFFACD',lightblue:'#ADD8E6',lightcoral:'#F08080',lightcyan:'#E0FFFF',lightgoldenrodyellow:'#FAFAD2',lightgray:'#D3D3D3',lightgrey:'#D3D3D3',lightgreen:'#90EE90',lightpink:'#FFB6C1',lightsalmon:'#FFA07A',lightseagreen:'#20B2AA',lightskyblue:'#87CEFA',lightslategray:'#778899',lightslategrey:'#778899',lightsteelblue:'#B0C4DE',lightyellow:'#FFFFE0',lime:'#00FF00',limegreen:'#32CD32',linen:'#FAF0E6',magenta:'#FF00FF',maroon:'#800000',mediumaquamarine:'#66CDAA',mediumblue:'#0000CD',mediumorchid:'#BA55D3',mediumpurple:'#9370D8',mediumseagreen:'#3CB371',mediumslateblue:'#7B68EE',mediumspringgreen:'#00FA9A',mediumturquoise:'#48D1CC',mediumvioletred:'#C71585',midnightblue:'#191970',mintcream:'#F5FFFA',mistyrose:'#FFE4E1',moccasin:'#FFE4B5',navajowhite:'#FFDEAD',navy:'#000080',oldlace:'#FDF5E6',olive:'#808000',olivedrab:'#6B8E23',orange:'#FFA500',orangered:'#FF4500',orchid:'#DA70D6',palegoldenrod:'#EEE8AA',palegreen:'#98FB98',paleturquoise:'#AFEEEE',palevioletred:'#D87093',papayawhip:'#FFEFD5',peachpuff:'#FFDAB9',peru:'#CD853F',pink:'#FFC0CB',plum:'#DDA0DD',powderblue:'#B0E0E6',purple:'#800080',red:'#FF0000',rosybrown:'#BC8F8F',royalblue:'#4169E1',saddlebrown:'#8B4513',salmon:'#FA8072',sandybrown:'#F4A460',seagreen:'#2E8B57',seashell:'#FFF5EE',sienna:'#A0522D',silver:'#C0C0C0',skyblue:'#87CEEB',slateblue:'#6A5ACD',slategray:'#708090',slategrey:'#708090',snow:'#FFFAFA',springgreen:'#00FF7F',transparent:'#000',steelblue:'#4682B4',tan:'#D2B48C',teal:'#008080',thistle:'#D8BFD8',tomato:'#FF6347',turquoise:'#40E0D0',violet:'#EE82EE',wheat:'#F5DEB3',white:'#FFFFFF',whitesmoke:'#F5F5F5',yellow:'#FFFF00',yellowgreen:'#9ACD32"'};

  // CSS value regexes, according to http://www.w3.org/TR/css3-values/
  var css_integer = '(?:\\+|-)?\\d+';
  var css_float = '(?:\\+|-)?\\d*\\.\\d+';
  var css_number = '(?:' + css_integer + ')|(?:' + css_float + ')';
  css_integer = '(' + css_integer + ')';
  css_float = '(' + css_float + ')';
  css_number = '(' + css_number + ')';
  var css_percentage = css_number + '%';
  var css_whitespace = '\\s*?';

  // http://www.w3.org/TR/2003/CR-css3-color-20030514/
  var hsl_hsla_regex = new RegExp([
    '^hsl(a?)\\(', css_number, ',', css_percentage, ',', css_percentage, '(,', css_number, ')?\\)$'
  ].join(css_whitespace) );
  var rgb_rgba_integer_regex = new RegExp([
    '^rgb(a?)\\(', css_integer, ',', css_integer, ',', css_integer, '(,', css_number, ')?\\)$'
  ].join(css_whitespace) );
  var rgb_rgba_percentage_regex = new RegExp([
    '^rgb(a?)\\(', css_percentage, ',', css_percentage, ',', css_percentage, '(,', css_number, ')?\\)$'
  ].join(css_whitespace) );
  var remove_comma_regex = /^,\s*/;

  var hslToRgb = function(h, s, l, a) {

    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {

      function hue2rgb(p, q, t){
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1 / 6) return p + (q - p) * 6 * t;
        if(t < 1 / 2) return q;
        if(t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
    }

    var alpha = _.isUndefined(a) || _.isNull(a) ? 1.0 : a.replace(remove_comma_regex, '');

    return {
      r: hue2rgb(p, q, h + 1 / 3),
      g: hue2rgb(p, q, h),
      b: hue2rgb(p, q, h - 1 / 3),
      a: alpha
    };
  }

  var stringParsers = [
    // CSS RGB(A) literal
    function(css) {

      css = trim(css);

      var withInteger = match(rgb_rgba_integer_regex, 255);
      if (withInteger) {
        return withInteger;
      }

      return match(rgb_rgba_percentage_regex, 100);

      function match(regex, max_value) {

        var colorGroups = css.match(regex);

        if (!colorGroups || (!!colorGroups[1] + !!colorGroups[5] === 1)) {
          return;
        }

        var alpha = _.isUndefined(colorGroups[5]) ? 1.0 : colorGroups[5].replace(remove_comma_regex, '');

        return {
          r: Math.min(1, Math.max(0, colorGroups[2] / max_value)),
          g: Math.min(1, Math.max(0, colorGroups[3] / max_value)),
          b: Math.min(1, Math.max(0, colorGroups[4] / max_value)),
          a: Math.min(1, Math.max(alpha, 0))
        };

      }

    },

    function(css) {

      var lower = css.toLowerCase();
      if (lower in css_colors) {
        css = css_colors[lower];
      }

      if (!css.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)) {
        return;
      }

      css = css.replace(/^#/, '');
      var bytes = css.length / 3;
      var max = Math.pow(16, bytes) - 1;

      return {
        r: parseInt(css.slice(0, bytes), 16) / max,
        g: parseInt(css.slice(bytes * 1,bytes * 2), 16) / max,
        b: parseInt(css.slice(bytes * 2), 16) / max,
        a: 1.0
      };

    },

    // css HSL(A) literal
    function(css) {

      var colorGroups = trim(css).match(hsl_hsla_regex);

      // if there is an "a" after "hsl", there must be a fourth parameter and the other way round
      if (!colorGroups || (!!colorGroups[1] + !!colorGroups[5] === 1)) {
        return null;
      }

      var h = ((colorGroups[2] % 360 + 360) % 360) / 360;
      var s = Math.max(0, Math.min(parseInt(colorGroups[3], 10) / 100, 1));
      var l = Math.max(0, Math.min(parseInt(colorGroups[4], 10) / 100, 1));

      return hslToRgb(h, s, l, colorGroups[5]);

    }

  ];

  var Group = function(styles) {

    CanvasRenderer.Group.call(this, styles);

  };

  _.extend(Group.prototype, CanvasRenderer.Group.prototype, {

    appendChild: function() {

      CanvasRenderer.Group.prototype.appendChild.apply(this, arguments);

      this.updateMatrix();

      return this;

    },

    updateMatrix: function(parentMatrix) {

      var matrix = parentMatrix || this.parent && this.parent.matrix;

      if (!matrix) {
        return this;
      }

      this._matrix = multiplyMatrix(this.matrix, matrix);

      _.each(this.children, function(child) {
        child.updateMatrix(this._matrix);
      }, this)

      return this;

    },

    render: function(gl, position, matrix, color) {

      // Apply matrices here somehow...

      _.each(this.children, function(child) {
        child.render(gl, position, matrix, color);
      });

    }

  });

  var Element = function(styles) {

    CanvasRenderer.Element.call(this, styles);

  };

  _.extend(Element.prototype, CanvasRenderer.Element.prototype, {

    updateMatrix: function(parentMatrix) {

      var matrix = parentMatrix || this.parent && this.parent.matrix

      if (!matrix) {
        return this;
      }

      this._matrix = multiplyMatrix(this.matrix, matrix);

      return this;

    },

    render: function(gl, position, matrix, color) {

      if (!this.visible || !this.fillBuffer || !this.strokeBuffer) {
        return this;
      }

      // Fill

      if (this.fill.a > 0) {

        gl.bindBuffer(gl.ARRAY_BUFFER, this.fillBuffer);

        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix3fv(matrix, false, this._matrix);
        gl.uniform4f(color, this.fill.r, this.fill.g, this.fill.b, this.fill.a);// * this.opacity);
        gl.drawArrays(gl.TRIANGLES, 0, this.triangleAmount);

      }

      // Stroke

      if (this.linewidth <= 0 || this.stroke.a <= 0) {
        return this;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, this.strokeBuffer);

      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniformMatrix3fv(matrix, false, this._matrix);
      gl.uniform4f(color, this.stroke.r, this.stroke.g, this.stroke.b, this.stroke.a);// * this.opacity);
      gl.lineWidth(this.linewidth);
      gl.drawArrays(gl.LINES, 0, this.vertexAmount);

      return this;

    }

  });

  var webgl = {

    updateBuffer: function(gl, elem, positionLocation) {

      // Handle Fill

      if (_.isObject(elem.fillBuffer)) {
        gl.deleteBuffer(elem.fillBuffer);
      }

      elem.fillBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.fillBuffer);
      gl.enableVertexAttribArray(positionLocation);

      gl.bufferData(gl.ARRAY_BUFFER, elem.triangles, gl.STATIC_DRAW);

      // Handle Stroke

      if (_.isObject(elem.strokeBuffer)) {
        gl.deleteBuffer(elem.strokeBuffer);
      }

      elem.strokeBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, elem.strokeBuffer);
      gl.enableVertexAttribArray(positionLocation);

      gl.bufferData(gl.ARRAY_BUFFER, elem.vertices, gl.STATIC_DRAW);

    },

    /**
     * Interpret a css color string and return an object of normalized
     * r, g, b color values.
     */
    interpret: function(v) {

      for (var i = 0, l = stringParsers.length; i < l; i++) {
        var color = stringParsers[i](v);
        if (color) {
          return color;
        }
      }

      /**
       * Default to invisible black if can't find a color.
       */
      return {
        r: 0, g: 0, b: 0, a: 0
      };

    },

    /**
     * Takes an array of vertices and converts them into a subdvided array
     * of vertices that express the hull of a given shape accurately for the
     * webgl renderer.
     */
    toArray: function(points, curved, closed) {

      if (!curved) {
        return points;
      }

      // If curved, then subdivide the path and update the points.

      var curve = getCurveFromPoints(points, closed);
      var length = curve.length;
      var last = length - 1;
      var divided = [];

      _.each(curve, function(p, i) {

        if (closed || !closed && i < last) {
          var q = curve[(i + 1) % length];
          var subdivision = Two.Utils.subdivide(
            p.x, p.y, p.v.x, p.v.y, q.u.x, q.u.y, q.x, q.y);
          divided = divided.concat(subdivision);
        }

      });

      return divided;

    },

    /**
     * Takes an array of vertices and converts them into an array of
     * triangles and array of outline verts ready to be fed to the webgl
     * renderer.
     */
    tessellate: function(points, curved, closed, reuseTriangles, reuseVertices) {

      // Tesselate the points.

      var triangulation = new tessellation.SweepContext(points);
      tessellation.sweep.Triangulate(triangulation);

      var triangleAmount = triangulation.triangles.length * 3 * 2;

      // Return the triangles array.
      var triangles = (!!reuseTriangles && triangleAmount <= reuseTriangles.length) ? reuseTriangles : new Two.Array(triangleAmount);
      _.each(triangulation.triangles, function(tri, i) {

        var points = tri.points;
        var a = points[0];
        var b = points[1];
        var c = points[2];
        var index = i * 6;

        triangles[index + 0] = a.x;
        triangles[index + 1] = a.y;
        triangles[index + 2] = b.x;
        triangles[index + 3] = b.y;
        triangles[index + 4] = c.x;
        triangles[index + 5] = c.y;

      });

      var vertexAmount = triangulation.edges.length * 4;

      var vertices = (!!reuseVertices && vertexAmount <= reuseVertices.length) ? reuseVertices : new Two.Array(vertexAmount);
      _.each(triangulation.edges, function(edge, i) {
        var p = edge.p, q = edge.q;
        var index = i * 4;
        vertices[index] = p.x;
        vertices[index + 1] = p.y;
        vertices[index + 2] = q.x;
        vertices[index + 3] = q.y;
      });

      return {
        triangles: triangles,
        vertices: vertices,
        triangleAmount: triangleAmount / 2,
        vertexAmount: vertexAmount / 2
      };

    },

    program: {

      create: function(gl, shaders) {

        var program = gl.createProgram();
        _.each(shaders, function(s) {
          gl.attachShader(program, s);
        });

        gl.linkProgram(program);
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
          error = gl.getProgramInfoLog(program);
          throw new Two.Utils.Error('unable to link program: ' + error);
          gl.deleteProgram(program);
          return null;
        }

        return program;

      }

    },

    shaders: {

      create: function(gl, source, type) {

        var shader = gl.createShader(gl[type]);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
          var error = gl.getShaderInfoLog(shader);
          throw new Two.Utils.Error('unable to compile shader ' + shader + ': ' + error);
          gl.deleteShader(shader);
          return null;
        }

        return shader;

      },

      types: {
        vertex: 'VERTEX_SHADER',
        fragment: 'FRAGMENT_SHADER'
      },

      vertex: [
        'attribute vec2 position;',
        'uniform mat3 matrix;',
        'uniform vec2 resolution;',
        '',
        'void main() {',
        '   vec2 projected = (matrix * vec3(position, 1)).xy;',
        '   vec2 normal = projected / resolution;',
        '   vec2 clipspace = (normal * 2.0) - 1.0;',
        '',
        '   gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);',
        '}'
      ].join('\n'),

      fragment: [
        'precision mediump float;',
        '',
        'uniform vec4 color;',
        '',
        'void main() {',
        '  gl_FragColor = color;',
        '}'
      ].join('\n')

    }

  };

  /**
   * Webgl Renderer inherits from the Canvas 2d Renderer
   * with additional modifications.
   */
  var Renderer = Two[Two.Types.webgl] = function() {

    this.domElement = document.createElement('canvas');

    this.elements = [];

    // Everything drawn on the canvas needs to come from the stage.
    this.stage = null;

    // http://games.greggman.com/game/webgl-and-alpha/
    // http://www.khronos.org/registry/webgl/specs/latest/#5.2
    var params = {
      antialias: true,
      premultipliedAlpha: false
    };

    this.ctx = this.domElement.getContext('webgl', params)
      || this.domElement.getContext('experimental-webgl', params);

    if (!this.ctx) {
      throw new Two.Utils.Error('unable to create a webgl context. Try using another renderer.');
    }

    // Compile Base Shaders to draw in pixel space.
    var vs = webgl.shaders.create(
      this.ctx, webgl.shaders.vertex, webgl.shaders.types.vertex);
    var fs = webgl.shaders.create(
      this.ctx, webgl.shaders.fragment, webgl.shaders.types.fragment);

    this.program = webgl.program.create(this.ctx, [vs, fs]);
    this.ctx.useProgram(this.program);

    // Create and bind the drawing buffer

    // look up where the vertex data needs to go.
    this.positionLocation = this.ctx.getAttribLocation(this.program, 'position');
    this.colorLocation = this.ctx.getUniformLocation(this.program, 'color');
    this.matrixLocation = this.ctx.getUniformLocation(this.program, 'matrix');

    // Setup some initial statements of the gl context
    this.ctx.enable(this.ctx.BLEND);
    this.ctx.disable(this.ctx.DEPTH_TEST);
    this.ctx.blendFunc(this.ctx.ONE, this.ctx.SRC_ALPHA);

  };

  _.extend(Renderer, {

    Group: Group,

    Element: Element,

    getStyles: getStyles,

    setStyles: setStyles

  });

  _.extend(Renderer.prototype, Backbone.Events, CanvasRenderer.prototype, {

    setSize: function(width, height) {

      CanvasRenderer.prototype.setSize.apply(this, arguments);

      this.ctx.viewport(0, 0, width, height);

      var resolutionLocation = this.ctx.getUniformLocation(
        this.program, 'resolution');
      this.ctx.uniform2f(resolutionLocation, width, height);

      return this;

    },

    render: function() {

      if (_.isNull(this.stage)) {
        return this;
      }

      // Draw a green rectangle

      var gl = this.ctx,
        program = this.program;

      gl.clear(gl.COLOR_BUFFER_BIT);

      this.stage.render(gl, this.positionLocation, this.matrixLocation, this.colorLocation);

      return this;

    }

  });

  function getStyles(o) {

    var styles = {},
      id = o.id,
      matrix = o._matrix,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = id;
    }
    if (_.isObject(matrix)) {
      styles.matrix = styles._matrix = matrix.toArray(true);
    }
    if (stroke) {
      styles.stroke = webgl.interpret(stroke); // Interpret color
    }
    if (fill) {
      styles.fill = webgl.interpret(fill); // Interpret color
    }
    if (_.isNumber(opacity)) {
      styles.opacity = opacity;
    }
    if (cap) {
      styles.cap = cap;
    }
    if (join) {
      styles.join = join;
    }
    if (miter) {
      styles.miter = miter;
    }
    if (linewidth) {
      styles.linewidth = linewidth;
    }
    if (vertices) {

      var vertices = webgl.toArray(vertices, curved, closed);
      var t = webgl.tessellate(vertices, curved, closed);

      styles.triangles = t.triangles;
      styles.vertices = t.vertices;
      styles.vertexAmount = t.vertexAmount;
      styles.triangleAmount = t.triangleAmount;

    }
    styles.visible = !!visible;
    styles.curved = !!curved;
    styles.closed = !!closed;

    return styles;

  }

  function setStyles(elem, property, value) {

    switch (property) {

      case 'matrix':
        property = 'matrix';
        value = value.toArray(true);
        break;
      case 'stroke':
        // interpret color
        value = webgl.interpret(value);
        break;
      case 'fill':
        // interpret color
        value = webgl.interpret(value);
        break;
      case 'vertices':
        property = 'triangles';
        var vertices = webgl.toArray(value, elem.curved, elem.closed);
        var t = webgl.tessellate(vertices, elem.curved, elem.closed, elem.triangles, elem.vertices);
        value = t.triangles;
        elem.vertices = t.vertices;
        elem.vertexAmount = t.vertexAmount;
        elem.triangleAmount = t.triangleAmount;
        break;
    }

    elem[property] = value;

    // Try moving this to switch statement
    if (property === 'triangles') {
      webgl.updateBuffer(this.ctx, elem, this.positionLocation);
    }
    if (property === 'matrix') {
      elem.updateMatrix();
    }

  }

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

})();
(function() {

  var Shape = Two.Shape = function(limited) {

    // Define matrix properties which all inherited
    // objects of Shape have.

    this._matrix = new Two.Matrix();

    var updateMatrix = _.debounce(_.bind(function() {
      var transform = this._matrix
        .identity()
        .translate(this.translation.x, this.translation.y)
        .scale(this.scale)
        .rotate(this.rotation);
      this.trigger(Two.Events.change, this.id, 'matrix', transform);
    }, this), 0);

    this._rotation = 'rotation';

    Object.defineProperty(this, 'rotation', {
      get: function() {
        return this._rotation;
      },
      set: function(v) {
        this._rotation = v;
        updateMatrix();
      }
    });

    this._scale = 'scale';

    Object.defineProperty(this, 'scale', {
      get: function() {
        return this._scale;
      },
      set: function(v) {
        this._scale = v;
        updateMatrix();
      }
    });

    this.translation = new Two.Vector();
    this.rotation = 0.0;
    this.scale = 1.0;

    this.translation.bind(Two.Events.change, updateMatrix);

    if (!!limited) {
      return this;
    }

    // Style properties

    Shape.MakeGetterSetter(this, Shape.Properties);

    this.fill = '#fff';
    this.stroke = '#000';
    this.linewidth = 1.0;
    this.opacity = 1.0;
    this.visible = true;

    this.cap = 'round';
    this.join = 'round';
    this.miter = 'round';

  };

  _.extend(Shape, {

    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'opacity',
      'visible',
      'cap',
      'join',
      'miter'
    ],

    MakeGetterSetter: function(shape, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {

        var secret = '_' + k;

        Object.defineProperty(shape, k, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this.trigger(Two.Events.change, this.id, k, v, this);
          }
        });

      });

    }

  });

  _.extend(Shape.prototype, Backbone.Events, {

    addTo: function(group) {
      group.add(this);
      return this;
    },

    noFill: function() {
      this.fill = 'none';
      return this;
    },

    noStroke: function() {
      this.stroke = 'none';
      return this;
    },

    clone: function() {
      var clone = new Shape();
      clone.translation.copy(this.translation);
      _.each(Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      return this;
    }

  });

})();
(function() {

  var Group = Two.Group = function(o) {

    Two.Shape.call(this, true);

    delete this.stroke;
    delete this.fill;
    delete this.linewidth;
    delete this.opacity;

    delete this.cap;
    delete this.join;
    delete this.miter;

    Group.MakeGetterSetter(this, Two.Shape.Properties);

    this.children = {};

  };

  _.extend(Group, {

    MakeGetterSetter: function(group, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {

        var secret = '_' + k;

        Object.defineProperty(group, k, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            _.each(this.children, function(child) { // Trickle down styles
              child[k] = v;
            });
          }
        });

      });

    }

  });

  _.extend(Group.prototype, Two.Shape.prototype, {

    /**
     * Add an object to the group.
     */
    add: function(o) {

      var l = arguments.length,
        objects = o,
        children = this.children,
        grandparent = this.parent,
        ids = [];

      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      // A bubbled up version of 'change' event for the children.

      var broadcast = _.bind(function(id, property, value, closed, curved) {
        this.trigger(Two.Events.change, id, property, value, closed, curved);
      }, this);

      // Add the objects

      _.each(objects, function(object) {

        var id = object.id, parent = object.parent;

        if (_.isUndefined(id)) {
          grandparent.add(object);
          id = object.id;
        }

        if (_.isUndefined(children[id])) {
          // Release object from previous parent.
          if (parent) {
            delete parent.children[id];
          }
          // Add it to this group and update parent-child relationship.
          children[id] = object;
          object.parent = this;
          object.unbind(Two.Events.change)
            .bind(Two.Events.change, broadcast);
          ids.push(id);
        }

      }, this);

      if (ids.length > 0) {
        this.trigger(Two.Events.change, this.id, 'hierarchy', ids);
      }

      return this;

    },

    /**
     * Return an object with top, left, right, bottom, width, and height
     * parameters of the group.
     */
    getBoundingClientRect: function() {

      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(this.children, function(child) {

        var rect = child.getBoundingClientRect();

        top = Math.min(rect.top, top);
        left = Math.min(rect.left, left);
        right = Math.max(rect.right, right);
        bottom = Math.max(rect.bottom, bottom);

      }, this);

      var ul = this._matrix.multiply(left, top, 1);
      var ll = this._matrix.multiply(right, bottom, 1);

      return {
        top: ul.y,
        left: ul.x,
        right: ll.x,
        bottom: ll.y,
        width: ll.x - ul.x,
        height: ll.y - ul.y
      };

    },

    /**
     * Trickle down of noFill
     */
    noFill: function() {
      _.each(this.children, function(child) {
        child.noFill();
      });
      return this;
    },

    /**
     * Trickle down of noStroke
     */
    noStroke: function() {
      _.each(this.children, function(child) {
        child.noStroke();
      });
      return this;
    }

  });

})();
(function() {

  /**
   * Constants
   */

  var min = Math.min, max = Math.max, round = Math.round;

  var Polygon = Two.Polygon = function(vertices, closed, curved) {

    Two.Shape.call(this);

    // Further getter setters for Polygon for closed and curved properties

    // Add additional logic for watching the vertices.

    var closed = !!closed;
    var curved = !!curved;
    var beginning = 0.0;
    var ending = 1.0;
    var strokeChanged = false;
    var renderedVertices = vertices.slice(0);

    var updateVertices = _.debounce(_.bind(function(property) { // Call only once a frame.

      var l, ia, ib, last;

      if (strokeChanged) {

        l = this.vertices.length;
        last = l - 1;

        ia = round((beginning) * last);
        ib = round((ending) * last);

        renderedVertices.length = 0;

        for (var i = ia; i < ib + 1; i++) {
          var v = this.vertices[i];
          renderedVertices.push(new Two.Vector(v.x, v.y));
        }

        strokeChanged = false;

      }

      this.trigger(Two.Events.change,
        this.id, 'vertices', renderedVertices, this.closed, this.curved);

    }, this), 0);

    Object.defineProperty(this, 'closed', {
      get: function() {
        return closed;
      },
      set: function(v) {
        closed = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'curved', {
      get: function() {
        return curved;
      },
      set: function(v) {
        curved = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'beginning', {
      get: function() {
        return beginning;
      },
      set: function(v) {
        beginning = min(max(v, 0.0), 1.0);
        strokeChanged = true;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'ending', {
      get: function() {
        return ending;
      },
      set: function(v) {
        ending = min(max(v, 0.0), 1);
        strokeChanged = true;
        updateVertices();
      }
    });

    // At the moment cannot alter the array itself, just it's points.

    this.vertices = vertices.slice(0);

    _.each(this.vertices, function(v) {

      v.bind(Two.Events.change, updateVertices);

    }, this);

    updateVertices();

  };

  _.extend(Polygon, {

  });

  _.extend(Polygon.prototype, Two.Shape.prototype, {

    clone: function() {

      var points = _.map(this.vertices, function(v) {
        return new Two.Vector(v.x, v.y);
      });

      var clone = new Polygon(points, this.closed, this.curved);

      _.each(Two.Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      return clone;

    },

    getBoundingClientRect: function() {

      var border = this.linewidth;
      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(this.vertices, function(v) {
        var x = v.x, y = v.y;
        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);
      });

      // Expand borders

      top -= border;
      left -= border;
      right += border;
      bottom += border;

      var ul = this._matrix.multiply(left, top, 1);
      var ll = this._matrix.multiply(right, bottom, 1);

      return {
        top: ul.y,
        left: ul.x,
        right: ll.x,
        bottom: ll.y,
        width: ll.x - ul.x,
        height: ll.y - ul.y
      };

    }

  });

})();