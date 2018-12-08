(this || window).Two = (function(previousTwo) {

  var root = typeof window != 'undefined' ? window : typeof global != 'undefined' ? global : null;
  var toString = Object.prototype.toString;
  /**
   * @name _
   * @interface
   * @private
   * @description A collection of useful functions borrowed and repurposed from Underscore.js.
   * @see {@link http://underscorejs.org/}
   */
  var _ = {
    // http://underscorejs.org/ • 1.8.3
    _indexAmount: 0,
    natural: {
      slice: Array.prototype.slice,
      indexOf: Array.prototype.indexOf,
      keys: Object.keys,
      bind: Function.prototype.bind,
      create: Object.create
    },
    identity: function(value) {
      return value;
    },
    isArguments: function(obj) {
      return toString.call(obj) === '[object Arguments]';
    },
    isFunction: function(obj) {
      return toString.call(obj) === '[object Function]';
    },
    isString: function(obj) {
      return toString.call(obj) === '[object String]';
    },
    isNumber: function(obj) {
      return toString.call(obj) === '[object Number]';
    },
    isDate: function(obj) {
      return toString.call(obj) === '[object Date]';
    },
    isRegExp: function(obj) {
      return toString.call(obj) === '[object RegExp]';
    },
    isError: function(obj) {
      return toString.call(obj) === '[object Error]';
    },
    isFinite: function(obj) {
      return isFinite(obj) && !isNaN(parseFloat(obj));
    },
    isNaN: function(obj) {
      return _.isNumber(obj) && obj !== +obj;
    },
    isBoolean: function(obj) {
      return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    },
    isNull: function(obj) {
      return obj === null;
    },
    isUndefined: function(obj) {
      return obj === void 0;
    },
    isEmpty: function(obj) {
      if (obj == null) return true;
      if (isArrayLike && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
      return _.keys(obj).length === 0;
    },
    isElement: function(obj) {
      return !!(obj && obj.nodeType === 1);
    },
    isArray: Array.isArray || function(obj) {
      return toString.call(obj) === '[object Array]';
    },
    isObject: function(obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    },
    toArray: function(obj) {
      if (!obj) {
        return [];
      }
      if (_.isArray(obj)) {
        return slice.call(obj);
      }
      if (isArrayLike(obj)) {
        return _.map(obj, _.identity);
      }
      return _.values(obj);
    },
    range: function(start, stop, step) {
      if (stop == null) {
        stop = start || 0;
        start = 0;
      }
      step = step || 1;

      var length = Math.max(Math.ceil((stop - start) / step), 0);
      var range = Array(length);

      for (var idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
      }

      return range;
    },
    indexOf: function(list, item) {
      if (!!_.natural.indexOf) {
        return _.natural.indexOf.call(list, item);
      }
      for (var i = 0; i < list.length; i++) {
        if (list[i] === item) {
          return i;
        }
      }
      return -1;
    },
    has: function(obj, key) {
      return obj != null && hasOwnProperty.call(obj, key);
    },
    bind: function(func, ctx) {
      var natural = _.natural.bind;
      if (natural && func.bind === natural) {
        return natural.apply(func, slice.call(arguments, 1));
      }
      var args = slice.call(arguments, 2);
      return function() {
        func.apply(ctx, args);
      };
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
    keys: function(obj) {
      if (!_.isObject(obj)) {
        return [];
      }
      if (_.natural.keys) {
        return _.natural.keys(obj);
      }
      var keys = [];
      for (var k in obj) {
        if (_.has(obj, k)) {
          keys.push(k);
        }
      }
      return keys;
    },
    values: function(obj) {
      var keys = _.keys(obj);
      var values = [];
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        values.push(obj[k]);
      }
      return values;
    },
    each: function(obj, iteratee, context) {
      var ctx = context || this;
      var keys = !isArrayLike(obj) && _.keys(obj);
      var length = (keys || obj).length;
      for (var i = 0; i < length; i++) {
        var k = keys ? keys[i] : i;
        iteratee.call(ctx, obj[k], k, obj);
      }
      return obj;
    },
    map: function(obj, iteratee, context) {
      var ctx = context || this;
      var keys = !isArrayLike(obj) && _.keys(obj);
      var length = (keys || obj).length;
      var result = [];
      for (var i = 0; i < length; i++) {
        var k = keys ? keys[i] : i;
        result[i] = iteratee.call(ctx, obj[k], k, obj);
      }
      return result;
    },
    once: function(func) {
      var init = false;
      return function() {
        if (!!init) {
          return func;
        }
        init = true;
        return func.apply(this, arguments);
      }
    },
    after: function(times, func) {
      return function() {
        while (--times < 1) {
          return func.apply(this, arguments);
        }
      }
    },
    uniqueId: function(prefix) {
      var id = ++_._indexAmount + '';
      return prefix ? prefix + id : id;
    }
  };

  // Constants

  var sin = Math.sin,
    cos = Math.cos,
    acos = Math.acos,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,
    round = Math.round,
    abs = Math.abs,
    PI = Math.PI,
    TWO_PI = PI * 2,
    HALF_PI = PI / 2,
    pow = Math.pow,
    min = Math.min,
    max = Math.max;

  // Localized variables

  var count = 0;
  var slice = _.natural.slice;
  var perf = ((root.performance && root.performance.now) ? root.performance : Date);
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = function(obj) {
    return obj == null ? void 0 : obj['length'];
  };
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Cross browser dom events.

  var dom = {

    temp: (root.document ? root.document.createElement('div') : {}),

    hasEventListeners: _.isFunction(root.addEventListener),

    bind: function(elem, event, func, bool) {
      if (this.hasEventListeners) {
        elem.addEventListener(event, func, !!bool);
      } else {
        elem.attachEvent('on' + event, func);
      }
      return dom;
    },

    unbind: function(elem, event, func, bool) {
      if (dom.hasEventListeners) {
        elem.removeEventListeners(event, func, !!bool);
      } else {
        elem.detachEvent('on' + event, func);
      }
      return dom;
    },

    getRequestAnimationFrame: function() {

      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      var request = root.requestAnimationFrame, cancel;

      if(!request) {
        for (var i = 0; i < vendors.length; i++) {
          request = root[vendors[i] + 'RequestAnimationFrame'] || request;
          cancel = root[vendors[i] + 'CancelAnimationFrame']
            || root[vendors[i] + 'CancelRequestAnimationFrame'] || cancel;
        }

        request = request || function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = root.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
        // cancel = cancel || function(id) {
        //   clearTimeout(id);
        // };
      }

      request.init = _.once(loop);

      return request;

    }

  };

  /**
   * @name Two
   * @class
   * @global
   * @param {Object} [options]
   * @param {Boolean} [options.fullscreen=false] - Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`.
   * @param {Number} [options.width=640] - The width of the stage on construction. This can be set at a later time.
   * @param {Number} [options.height=480] - The height of the stage on construction. This can be set at a later time.
   * @param {String} [options.type=Two.Types.svg] - The type of renderer to setup drawing with. See [`Two.Types`]{@link  Two.Types} for available options.
   * @param {Boolean} [options.autostart=false] - Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for {@link Two#play}.
   * @description The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.
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

    _.each(params, function(v, k) {
      if (/fullscreen/i.test(k) || /autostart/i.test(k)) {
        return;
      }
      this[k] = v;
    }, this);

    // Specified domElement overrides type declaration only if the element does not support declared renderer type.
    if (_.isElement(params.domElement)) {
      var tagName = params.domElement.tagName.toLowerCase();
      // TODO: Reconsider this if statement's logic.
      if (!/^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type+'-'+tagName)) {
        this.type = Two.Types[tagName];
      }
    }

    this.renderer = new Two[this.type](this);
    Two.Utils.setPlaying.call(this, params.autostart);
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
      _.extend(this.renderer.domElement.style, {
        display: 'block',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed'
      });
      dom.bind(root, 'resize', fitted);
      fitted();


    } else if (!_.isElement(params.domElement)) {

      this.renderer.setSize(params.width, params.height, this.ratio);
      this.width = params.width;
      this.height = params.height;

    }

    this.renderer.bind(Two.Events.resize, _.bind(updateDimensions, this));
    this.scene = this.renderer.scene;

    Two.Instances.push(this);
    if (params.autostart) {
      raf.init();
    }

  };

  _.extend(Two, {

    // Access to root in other files.

    /**
     * @name Two.root
     * @description The root of the session context. In the browser this is the `window` variable. This varies in headless environments.
     */
    root: root,

    /**
     * @name Two.nextFrameID
     * @property {Integer}
     * @description The id of the next requestAnimationFrame function.
     */
    nextFrameID: null,

    // Primitive

    /**
     * @name Two.Array
     * @description A simple polyfill for Float32Array.
     */
    Array: root.Float32Array || Array,

    /**
     * @name Two.Types
     * @property {Object} - The different rendering types availabe in the library.
     */
    Types: {
      webgl: 'WebGLRenderer',
      svg: 'SVGRenderer',
      canvas: 'CanvasRenderer'
    },

    /**
     * @name Two.Version
     * @property {String} - The current working version of the library.
     */
    Version: 'v0.7.0-beta.3',

    /**
     * @name Two.PublishDate
     * @property {String} - The automatically generated publish date in the build process to verify version release candidates.
     */
    PublishDate: '<%= publishDate %>',

    /**
     * @name Two.Identifier
     * @property {String} - String prefix for all Two.js object's ids. This trickles down to SVG ids.
     */
    Identifier: 'two-',

    /**
     * @name Two.Events
     * @property {Object} - Map of possible events in Two.js.
     */
    Events: {
      play: 'play',
      pause: 'pause',
      update: 'update',
      render: 'render',
      resize: 'resize',
      change: 'change',
      remove: 'remove',
      insert: 'insert',
      order: 'order',
      load: 'load'
    },

    /**
     * @name Two.Commands
     * @property {Object} - Map of possible path commands. Taken from the SVG specification.
     */
    Commands: {
      move: 'M',
      line: 'L',
      curve: 'C',
      arc: 'A',
      close: 'Z'
    },

    /**
     * @name Two.Resolution
     * @property {Number} - Default amount of vertices to be used for interpreting Arcs and ArcSegments.
     */
    Resolution: 12,

    /**
     * @name Two.Instances
     * @property {Array} - Registered list of all Two.js instances in the current session.
     */
    Instances: [],

    /**
     * @function Two.noConflict
     * @description A function to revert the global namespaced `Two` variable to its previous incarnation.
     * @returns {Two} Returns access to the top-level Two.js library for local use.
     */
    noConflict: function() {
      root.Two = previousTwo;
      return Two;
    },

    /**
     * @function Two.uniqueId
     * @description Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
     * @returns {Number} Ever increasing integer.
     */
    uniqueId: function() {
      var id = count;
      count++;
      return id;
    },

    /**
     * @name Two.Utils
     * @interface
     * @implements {_}
     * @description A hodgepodge of handy functions, math, and properties are stored here.
     */
    Utils: _.extend(_, {

      /**
       * @name Two.Utils.performance
       * @property {Date} - A special `Date` like object to get the current millis of the session. Used internally to calculate time between frames.
       * e.g: `Two.Utils.performance.now() // milliseconds since epoch`
       */
      performance: perf,

      /**
       * @name Two.Utils.defineProperty
       * @function
       * @this Two#
       * @param {String} property - The property to add an enumerable getter / setter to.
       * @description Convenience function to setup the flag based getter / setter that most properties are defined as in Two.js.
       */
      defineProperty: function(property) {

        var object = this;
        var secret = '_' + property;
        var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

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

      },

      Image: null,

      isHeadless: false,

      /**
       * @name Two.Utils.shim
       * @function
       * @param {canvas} canvas - The instanced `Canvas` object provided by `node-canvas`.
       * @param {Image} [Image] - The prototypical `Image` object provided by `node-canvas`. This is only necessary to pass if you're going to load bitmap imagery.
       * @returns {canvas} Returns the instanced canvas object you passed from with additional attributes needed for Two.js.
       * @description Convenience method for defining all the dependencies from the npm package `node-canvas`. See [node-canvas]{@link https://github.com/Automattic/node-canvas} for additional information on setting up HTML5 `<canvas />` drawing in a node.js environment.
       */
      shim: function(canvas, Image) {
        Two.CanvasRenderer.Utils.shim(canvas);
        if (!_.isUndefined(Image)) {
          Two.Utils.Image = Image;
        }
        Two.Utils.isHeadless = true;
        return canvas;
      },

      /**
       * @name Two.Utils.release
       * @function
       * @param {Object} obj
       * @returns {Object} The object passed for event deallocation.
       * @description Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.
       */
      release: function(obj) {

        if (!_.isObject(obj)) {
          return;
        }

        if (_.isFunction(obj.unbind)) {
          obj.unbind();
        }

        if (obj.vertices) {
          if (_.isFunction(obj.vertices.unbind)) {
            obj.vertices.unbind();
          }
          _.each(obj.vertices, function(v) {
            if (_.isFunction(v.unbind)) {
              v.unbind();
            }
          });
        }

        if (obj.children) {
          _.each(obj.children, function(obj) {
            Two.Utils.release(obj);
          });
        }

        return obj;

      },

      /**
       * @name Two.Utils.xhr
       * @function
       * @param {String} path
       * @param {Function} callback
       * @returns {XMLHttpRequest} The constructed and called XHR request.
       * @description Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method.
       */
      xhr: function(path, callback) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', path);

        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
          }
        };

        xhr.send();
        return xhr;

      },

      /**
       * @name Two.Utils.Curve
       * @property {Object} - Additional utility constant variables related to curve math and calculations.
       */
      Curve: {

        CollinearityEpsilon: pow(10, -30),

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
          [  0.5773502691896257645091488],
          [0,0.7745966692414833770358531],
          [  0.3399810435848562648026658,0.8611363115940525752239465],
          [0,0.5384693101056830910363144,0.9061798459386639927976269],
          [  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
          [0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
          [  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
          [0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
          [  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
          [0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
          [  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
          [0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
          [  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
          [0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
          [  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
        ],

        weights: [
          [1],
          [0.8888888888888888888888889,0.5555555555555555555555556],
          [0.6521451548625461426269361,0.3478548451374538573730639],
          [0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
          [0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
          [0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
          [0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
          [0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
          [0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
          [0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
          [0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
          [0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
          [0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
          [0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
          [0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
        ]

      },

      devicePixelRatio: root.devicePixelRatio || 1,

      getBackingStoreRatio: function(ctx) {
        return ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;
      },

      /**
       * @name Two.Utils.getRatio
       * @function
       * @param {Canvas.context2D} ctx
       * @returns {Number} The ratio of a unit in Two.js to the pixel density of a session's screen.
       * @see [High DPI Rendering]{@link http://www.html5rocks.com/en/tutorials/canvas/hidpi/}
       */
      getRatio: function(ctx) {
        return Two.Utils.devicePixelRatio / getBackingStoreRatio(ctx);
      },

      /**
       * @name Two.Utils.setPlaying
       * @function
       * @this Two#
       * @returns {Two} The instance called with for potential chaining.
       * @description Internal convenience method to properly defer play calling until after all objects have been updated with their newest styles.
       */
      setPlaying: function(b) {

        this.playing = !!b;
        return this;

      },

      /**
       * @name Two.Utils.getComputedMatrix
       * @function
       * @param {Two.Shape} object - The Two.js object that has a matrix property to calculate from.
       * @param {Two.Matrix} [matrix] - The matrix to apply calculated transformations to if available.
       * @returns {Two.Matrix} The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.
       * @description Method to get the world space transformation of a given object in a Two.js scene.
       */
      getComputedMatrix: function(object, matrix) {

        matrix = (matrix && matrix.identity()) || new Two.Matrix();
        var parent = object, matrices = [];

        while (parent && parent._matrix) {
          matrices.push(parent._matrix);
          parent = parent.parent;
        }

        matrices.reverse();

        for (var i = 0; i < matrices.length; i++) {

          var m = matrices[i];
          var e = m.elements;
          matrix.multiply(
            e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);

        }

        return matrix;

      },

      /**
       * @name Two.Utils.deltaTransformPoint
       * @function
       * @param {Two.Matrix} matrix
       * @param {Number} x
       * @param {Number} y
       * @returns {Two.Vector}
       * @description Used by {@link Two.Utils.decomposeMatrix}
       */
      deltaTransformPoint: function(matrix, x, y) {

        var dx = x * matrix.a + y * matrix.c + 0;
        var dy = x * matrix.b + y * matrix.d + 0;

        return new Two.Vector(dx, dy);

      },

      /**
       * @name Two.Utils.decomposeMatrix
       * @function
       * @param {Two.Matrix} matrix - The matrix to decompose.
       * @returns {Object} An object containing relevant skew values.
       * @description Decompose a 2D 3x3 Matrix to find the skew.
       * @see {@link https://gist.github.com/2052247}
       */
      decomposeMatrix: function(matrix) {

        // calculate delta transform point
        var px = Two.Utils.deltaTransformPoint(matrix, 0, 1);
        var py = Two.Utils.deltaTransformPoint(matrix, 1, 0);

        // calculate skew
        var skewX = ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
        var skewY = ((180 / Math.PI) * Math.atan2(py.y, py.x));

        return {
            translateX: matrix.e,
            translateY: matrix.f,
            scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
            scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
            skewX: skewX,
            skewY: skewY,
            rotation: skewX // rotation is the same as skew x
        };

      },

      /**
       * @name Two.Utils.extractCSSText
       * @function
       * @param {String} text - The CSS text body to be parsed and extracted.
       * @param {Object} [styles] - The styles object to apply CSS key values to.
       * @returns {Object} styles
       * @description Parse CSS text body and apply them as key value pairs to a JavaScript object.
       */
      extractCSSText: function(text, styles) {

        var commands, command, name, value;

        if (!styles) {
          styles = {};
        }

        commands = text.split(';');

        for (var i = 0; i < commands.length; i++) {
          command = commands[i].split(':');
          name = command[0];
          value = command[1];
          if (_.isUndefined(name) || _.isUndefined(value)) {
            continue;
          }
          styles[name] = value.replace(/\s/, '');
        }

        return styles;

      },

      /**
       * @name Two.Utils.getSvgStyles
       * @function
       * @param {SvgNode} node - The SVG node to parse.
       * @returns {Object} styles
       * @description Get the CSS comands from the `style` attribute of an SVG node and apply them as key value pairs to a JavaScript object.
       */
      getSvgStyles: function(node) {

        var styles = {};

        for (var i = 0; i < node.style.length; i++) {
          var command = node.style[i];
          styles[command] = node.style[command];
        }

        return styles;

      },

      /**
       * @name Two.Utils.applySvgViewBox
       * @function
       * @param {Two.Shape} node - The Two.js object to apply viewbox matrix to
       * @param {String} value - The viewBox value from the SVG attribute
       * @returns {Two.Shape} node
       @ @description
       */
      applySvgViewBox: function(node, value) {

        var elements = value.split(/\s/);

        var x = parseFloat(elements[0]);
        var y = parseFloat(elements[1]);
        var width = parseFloat(elements[2]);
        var height = parseFloat(elements[3]);

        var s = Math.min(this.width / width, this.height / height);

        node.translation.x -= x * s;
        node.translation.y -= y * s;
        node.scale = s;

        return node;

      },

      /**
       * @name Two.Utils.applySvgAttributes
       * @function
       * @param {SvgNode} node - An SVG Node to extrapolate attributes from.
       * @param {Two.Shape} elem - The Two.js object to apply extrapolated attributes to.
       * @returns {Two.Shape} The Two.js object passed now with applied attributes.
       * @description This function iterates through an SVG Node's properties and stores ones of interest. It tries to resolve styles applied via CSS as well.
       * @TODO Reverse calculate `Two.Gradient`s for fill / stroke of any given path.
       */
      applySvgAttributes: function(node, elem, parentStyles) {

        var  styles = {}, attributes = {}, extracted = {}, i, key, value, attr;

        // Not available in non browser environments
        if (root.getComputedStyle) {
          // Convert CSSStyleDeclaration to a normal object
          var computedStyles = root.getComputedStyle(node);
          i = computedStyles.length;

          while (i--) {
            key = computedStyles[i];
            value = computedStyles[key];
            // Gecko returns undefined for unset properties
            // Webkit returns the default value
            if (!_.isUndefined(value)) {
              styles[key] = value;
            }
          }
        }

        // Convert NodeMap to a normal object
        for (i = 0; i < node.attributes.length; i++) {
          attr = node.attributes[i];
          if (/style/i.test(attr.nodeName)) {
            Two.Utils.extractCSSText(attr.value, extracted);
          } else {
            attributes[attr.nodeName] = attr.value;
          }
        }

        // Getting the correct opacity is a bit tricky, since SVG path elements don't
        // support opacity as an attribute, but you can apply it via CSS.
        // So we take the opacity and set (stroke/fill)-opacity to the same value.
        if (!_.isUndefined(styles.opacity)) {
          styles['stroke-opacity'] = styles.opacity;
          styles['fill-opacity'] = styles.opacity;
          delete styles.opacity;
        }

        // Merge attributes and applied styles (attributes take precedence)
        if (parentStyles) {
          _.defaults(styles, parentStyles);
        }
        _.extend(styles, attributes, extracted);

        // Similarly visibility is influenced by the value of both display and visibility.
        // Calculate a unified value here which defaults to `true`.
        styles.visible = !(_.isUndefined(styles.display) && /none/i.test(styles.display))
          || (_.isUndefined(styles.visibility) && /hidden/i.test(styles.visibility));

        // Now iterate the whole thing
        for (key in styles) {
          value = styles[key];

          switch (key) {
            case 'transform':
              // TODO: Check this out https://github.com/paperjs/paper.js/blob/develop/src/svg/SvgImport.js#L315
              if (/none/i.test(value)) break;
              var m = (node.transform && node.transform.baseVal && node.transform.baseVal.length > 0)
                ? node.transform.baseVal[0].matrix
                : (node.getCTM ? node.getCTM() : null);

              // Might happen when transform string is empty or not valid.
              if (_.isNull(m)) break;

              // // Option 1: edit the underlying matrix and don't force an auto calc.
              // var m = node.getCTM();
              // elem._matrix.manual = true;
              // elem._matrix.set(m.a, m.b, m.c, m.d, m.e, m.f);

              // Option 2: Decompose and infer Two.js related properties.
              var transforms = Two.Utils.decomposeMatrix(m);

              elem.translation.set(transforms.translateX, transforms.translateY);
              elem.rotation = transforms.rotation;
              elem.scale = new Two.Vector(transforms.scaleX, transforms.scaleY);

              var x = parseFloat((styles.x + '').replace('px'));
              var y = parseFloat((styles.y + '').replace('px'));

              // Override based on attributes.
              if (x) {
                elem.translation.x = x;
              }

              if (y) {
                elem.translation.y = y;
              }

              break;
            case 'viewBox':
              Two.Utils.applySvgViewBox.call(this, elem, value);
              break;
            case 'visible':
              elem.visible = value;
              break;
            case 'stroke-linecap':
              elem.cap = value;
              break;
            case 'stroke-linejoin':
              elem.join = value;
              break;
            case 'stroke-miterlimit':
              elem.miter = value;
              break;
            case 'stroke-width':
              elem.linewidth = parseFloat(value);
              break;
            case 'opacity':
            case 'stroke-opacity':
            case 'fill-opacity':
              // Only apply styles to rendered shapes
              // in the scene.
              if (!(elem instanceof Two.Group)) {
                elem.opacity = parseFloat(value);
              }
              break;
            case 'fill':
            case 'stroke':
              if (/url\(\#.*\)/i.test(value)) {
                elem[key] = this.getById(
                  value.replace(/url\(\#(.*)\)/i, '$1'));
              } else {
                elem[key] = (/none/i.test(value)) ? 'transparent' : value;
              }
              break;
            case 'id':
              elem.id = value;
              break;
            case 'class':
            case 'className':
              elem.classList = value.split(' ');
              break;
          }
        }

        return styles;

      },

      /**
       * @name Two.Utils.read
       * @property {Object} read - A map of functions to read any number of SVG node types and create Two.js equivalents of them. Primarily used by the {@link Two#interpret} method.
       */
      read: {

        svg: function(node) {

          var svg = Two.Utils.read.g.call(this, node);
          var viewBox = node.getAttribute('viewBox');
          // Two.Utils.applySvgViewBox(svg, viewBox);

          return svg;

        },

        g: function(node) {

          var styles, attrs;
          var group = new Two.Group();

          // Switched up order to inherit more specific styles
          styles = Two.Utils.getSvgStyles.call(this, node);

          for (var i = 0, l = node.childNodes.length; i < l; i++) {
            var n = node.childNodes[i];
            var tag = n.nodeName;
            if (!tag) return;

            var tagName = tag.replace(/svg\:/ig, '').toLowerCase();

            if (tagName in Two.Utils.read) {
              var o = Two.Utils.read[tagName].call(group, n, styles);
              group.add(o);
            }
          }

          return group;

        },

        polygon: function(node, parentStyles) {

          var points = node.getAttribute('points');

          var verts = [];
          points.replace(/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g, function(match, p1, p2) {
            verts.push(new Two.Anchor(parseFloat(p1), parseFloat(p2)));
          });

          var poly = new Two.Path(verts, true).noStroke();
          poly.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, poly, parentStyles);

          return poly;

        },

        polyline: function(node, parentStyles) {
          var poly = Two.Utils.read.polygon.call(this, node, parentStyles);
          poly.closed = false;
          return poly;
        },

        path: function(node, parentStyles) {

          var path = node.getAttribute('d');

          // Create a Two.Path from the paths.

          var coord = new Two.Anchor();
          var control, coords;
          var closed = false, relative = false;
          var commands = path.match(/[a-df-z][^a-df-z]*/ig);
          var last = commands.length - 1;

          // Split up polybeziers

          _.each(commands.slice(0), function(command, i) {

            var number, fid, lid, numbers, first, s;
            var j, k, ct, l, times;

            var type = command[0];
            var lower = type.toLowerCase();
            var items = command.slice(1).trim().split(/[\s,]+|(?=\s?[+\-])/);
            var pre, post, result = [], bin;
            var hasDoubleDecimals = false;

            // Handle double decimal values e.g: 48.6037.71.8
            // Like: https://m.abcsofchinese.com/images/svg/亼ji2.svg
            for (j = 0; j < items.length; j++) {

              number = items[j];
              fid = number.indexOf('.');
              lid = number.lastIndexOf('.');

              if (fid !== lid) {

                numbers = number.split('.');
                first = numbers[0] + '.' + numbers[1];

                items.splice(j, 1, first);

                for (s = 2; s < numbers.length; s++) {
                  items.splice(j + s - 1, 0, '0.' + numbers[s]);
                }

                hasDoubleDecimals = true;

              }

            }

            if (hasDoubleDecimals) {
              command = type + items.join(',');
            }

            if (i <= 0) {
              commands = [];
            }

            switch (lower) {
              case 'h':
              case 'v':
                if (items.length > 1) {
                  bin = 1;
                }
                break;
              case 'm':
              case 'l':
              case 't':
                if (items.length > 2) {
                  bin = 2;
                }
                break;
              case 's':
              case 'q':
                if (items.length > 4) {
                  bin = 4;
                }
                break;
              case 'c':
                if (items.length > 6) {
                  bin = 6;
                }
                break;
              case 'a':
                if (items.length > 7) {
                  bin = 7;
                }
                break;
            }

            // This means we have a polybezier.
            if (bin) {

              for (j = 0, l = items.length, times = 0; j < l; j+=bin) {

                ct = type;
                if (times > 0) {

                  switch (type) {
                    case 'm':
                      ct = 'l';
                      break;
                    case 'M':
                      ct = 'L';
                      break;
                  }

                }

                result.push(ct + items.slice(j, j + bin).join(' '));
                times++;

              }

              commands = Array.prototype.concat.apply(commands, result);

            } else {

              commands.push(command);

            }

          });

          // Create the vertices for our Two.Path

          var points = [];
          _.each(commands, function(command, i) {

            var result, x, y;
            var type = command[0];
            var lower = type.toLowerCase();

            coords = command.slice(1).trim();
            coords = coords.replace(/(-?\d+(?:\.\d*)?)[eE]([+\-]?\d+)/g, function(match, n1, n2) {
              return parseFloat(n1) * pow(10, n2);
            });
            coords = coords.split(/[\s,]+|(?=\s?[+\-])/);
            relative = type === lower;

            var x1, y1, x2, y2, x3, y3, x4, y4, reflection;

            switch (lower) {

              case 'z':
                if (i >= last) {
                  closed = true;
                } else {
                  x = coord.x;
                  y = coord.y;
                  result = new Two.Anchor(
                    x, y,
                    undefined, undefined,
                    undefined, undefined,
                    Two.Commands.close
                  );
                  // Make coord be the last `m` command
                  for (var i = points.length - 1; i >= 0; i--) {
                    var point = points[i];
                    if (/m/i.test(point.command)) {
                      coord = point;
                      break;
                    }
                  }
                }
                break;

              case 'm':
              case 'l':

                control = undefined;

                x = parseFloat(coords[0]);
                y = parseFloat(coords[1]);

                result = new Two.Anchor(
                  x, y,
                  undefined, undefined,
                  undefined, undefined,
                  /m/i.test(lower) ? Two.Commands.move : Two.Commands.line
                );

                if (relative) {
                  result.addSelf(coord);
                }

                // result.controls.left.copy(result);
                // result.controls.right.copy(result);

                coord = result;
                break;

              case 'h':
              case 'v':

                var a = /h/i.test(lower) ? 'x' : 'y';
                var b = /x/i.test(a) ? 'y' : 'x';

                result = new Two.Anchor(
                  undefined, undefined,
                  undefined, undefined,
                  undefined, undefined,
                  Two.Commands.line
                );
                result[a] = parseFloat(coords[0]);
                result[b] = coord[b];

                if (relative) {
                  result[a] += coord[a];
                }

                // result.controls.left.copy(result);
                // result.controls.right.copy(result);

                coord = result;
                break;

              case 'c':
              case 's':

                x1 = coord.x;
                y1 = coord.y;

                if (!control) {
                  control = new Two.Vector();//.copy(coord);
                }

                if (/c/i.test(lower)) {

                  x2 = parseFloat(coords[0]);
                  y2 = parseFloat(coords[1]);
                  x3 = parseFloat(coords[2]);
                  y3 = parseFloat(coords[3]);
                  x4 = parseFloat(coords[4]);
                  y4 = parseFloat(coords[5]);

                } else {

                  // Calculate reflection control point for proper x2, y2
                  // inclusion.

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

                if (!_.isObject(coord.controls)) {
                  Two.Anchor.AppendCurveProperties(coord);
                }

                coord.controls.right.set(x2 - coord.x, y2 - coord.y);
                result = new Two.Anchor(
                  x4, y4,
                  x3 - x4, y3 - y4,
                  undefined, undefined,
                  Two.Commands.curve
                );

                coord = result;
                control = result.controls.left;

                break;

              case 't':
              case 'q':

                x1 = coord.x;
                y1 = coord.y;

                if (!control) {
                  control = new Two.Vector();//.copy(coord);
                }

                if (control.isZero()) {
                  x2 = x1;
                  y2 = y1;
                } else {
                  x2 = control.x;
                  y2 = control.y;
                }

                if (/q/i.test(lower)) {

                  x3 = parseFloat(coords[0]);
                  y3 = parseFloat(coords[1]);
                  x4 = parseFloat(coords[2]);
                  y4 = parseFloat(coords[3]);

                } else {

                  reflection = getReflection(coord, control, relative);

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

                if (!_.isObject(coord.controls)) {
                  Two.Anchor.AppendCurveProperties(coord);
                }

                coord.controls.right.set(x2 - coord.x, y2 - coord.y);
                result = new Two.Anchor(
                  x4, y4,
                  x3 - x4, y3 - y4,
                  undefined, undefined,
                  Two.Commands.curve
                );

                coord = result;
                control = result.controls.left;

                break;

              case 'a':

                x1 = coord.x;
                y1 = coord.y;

                var rx = parseFloat(coords[0]);
                var ry = parseFloat(coords[1]);
                var xAxisRotation = parseFloat(coords[2]);// * PI / 180;
                var largeArcFlag = parseFloat(coords[3]);
                var sweepFlag = parseFloat(coords[4]);

                x4 = parseFloat(coords[5]);
                y4 = parseFloat(coords[6]);

                if (relative) {
                  x4 += x1;
                  y4 += y1;
                }

                var anchor = new Two.Anchor(x4, y4);
                anchor.command = Two.Commands.arc;
                anchor.rx = rx;
                anchor.ry = ry;
                anchor.xAxisRotation = xAxisRotation;
                anchor.largeArcFlag = largeArcFlag;
                anchor.sweepFlag = sweepFlag;

                result = anchor;

                coord = anchor;
                control = undefined;

                break;

            }

            if (result) {
              if (_.isArray(result)) {
                points = points.concat(result);
              } else {
                points.push(result);
              }
            }

          });

          if (points.length <= 1) {
            return;
          }

          var path = new Two.Path(points, closed, undefined, true).noStroke();
          path.fill = 'black';

          var rect = path.getBoundingClientRect(true);

          // Center objects to stay consistent
          // with the rest of the Two.js API.
          rect.centroid = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };

          _.each(path.vertices, function(v) {
            v.subSelf(rect.centroid);
          });

          path.translation.addSelf(rect.centroid);

          Two.Utils.applySvgAttributes.call(this, node, path, parentStyles);

          return path;

        },

        circle: function(node, parentStyles) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var r = parseFloat(node.getAttribute('r'));

          var circle = new Two.Circle(x, y, r).noStroke();
          circle.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, circle, parentStyles);

          return circle;

        },

        ellipse: function(node, parentStyles) {

          var x = parseFloat(node.getAttribute('cx'));
          var y = parseFloat(node.getAttribute('cy'));
          var width = parseFloat(node.getAttribute('rx'));
          var height = parseFloat(node.getAttribute('ry'));

          var ellipse = new Two.Ellipse(x, y, width, height).noStroke();
          ellipse.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, ellipse, parentStyles);

          return ellipse;

        },

        rect: function(node, parentStyles) {

          var rx = parseFloat(node.getAttribute('rx'));
          var ry = parseFloat(node.getAttribute('ry'));

          if (!_.isNaN(rx) || !_.isNaN(ry)) {
            return Two.Utils.read['rounded-rect'](node);
          }

          var x = parseFloat(node.getAttribute('x')) || 0;
          var y = parseFloat(node.getAttribute('y')) || 0;
          var width = parseFloat(node.getAttribute('width'));
          var height = parseFloat(node.getAttribute('height'));

          var w2 = width / 2;
          var h2 = height / 2;

          var rect = new Two.Rectangle(x + w2, y + h2, width, height)
            .noStroke();
          rect.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, rect, parentStyles);

          return rect;

        },

        'rounded-rect': function(node, parentStyles) {

          var x = parseFloat(node.getAttribute('x')) || 0;
          var y = parseFloat(node.getAttribute('y')) || 0;
          var rx = parseFloat(node.getAttribute('rx')) || 0;
          var ry = parseFloat(node.getAttribute('ry')) || 0;

          var width = parseFloat(node.getAttribute('width'));
          var height = parseFloat(node.getAttribute('height'));

          var w2 = width / 2;
          var h2 = height / 2;
          var radius = new Two.Vector(rx, ry);

          var rect = new Two.RoundedRectangle(x + w2, y + h2, width, height, radius)
            .noStroke();
          rect.fill = 'black';

          Two.Utils.applySvgAttributes.call(this, node, rect, parentStyles);

          return rect;

        },

        line: function(node, parentStyles) {

          var x1 = parseFloat(node.getAttribute('x1'));
          var y1 = parseFloat(node.getAttribute('y1'));
          var x2 = parseFloat(node.getAttribute('x2'));
          var y2 = parseFloat(node.getAttribute('y2'));

          var line = new Two.Line(x1, y1, x2, y2).noFill();

          Two.Utils.applySvgAttributes.call(this, node, line, parentStyles);

          return line;

        },

        lineargradient: function(node, parentStyles) {

          var x1 = parseFloat(node.getAttribute('x1'));
          var y1 = parseFloat(node.getAttribute('y1'));
          var x2 = parseFloat(node.getAttribute('x2'));
          var y2 = parseFloat(node.getAttribute('y2'));

          var ox = (x2 + x1) / 2;
          var oy = (y2 + y1) / 2;

          var stops = [];
          for (var i = 0; i < node.children.length; i++) {

            var child = node.children[i];

            var offset = parseFloat(child.getAttribute('offset'));
            var color = child.getAttribute('stop-color');
            var opacity = child.getAttribute('stop-opacity');
            var style = child.getAttribute('style');

            if (_.isNull(color)) {
              var matches = style ? style.match(/stop\-color\:\s?([\#a-fA-F0-9]*)/) : false;
              color = matches && matches.length > 1 ? matches[1] : undefined;
            }

            if (_.isNull(opacity)) {
              var matches = style ? style.match(/stop\-opacity\:\s?([0-9\.\-]*)/) : false;
              opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
            }

            stops.push(new Two.Gradient.Stop(offset, color, opacity));

          }

          var gradient = new Two.LinearGradient(x1 - ox, y1 - oy, x2 - ox,
            y2 - oy, stops);

          Two.Utils.applySvgAttributes.call(this, node, gradient, parentStyles);

          return gradient;

        },

        radialgradient: function(node, parentStyles) {

          var cx = parseFloat(node.getAttribute('cx')) || 0;
          var cy = parseFloat(node.getAttribute('cy')) || 0;
          var r = parseFloat(node.getAttribute('r'));

          var fx = parseFloat(node.getAttribute('fx'));
          var fy = parseFloat(node.getAttribute('fy'));

          if (_.isNaN(fx)) {
            fx = cx;
          }

          if (_.isNaN(fy)) {
            fy = cy;
          }

          var ox = abs(cx + fx) / 2;
          var oy = abs(cy + fy) / 2;

          var stops = [];
          for (var i = 0; i < node.children.length; i++) {

            var child = node.children[i];

            var offset = parseFloat(child.getAttribute('offset'));
            var color = child.getAttribute('stop-color');
            var opacity = child.getAttribute('stop-opacity');
            var style = child.getAttribute('style');

            if (_.isNull(color)) {
              var matches = style ? style.match(/stop\-color\:\s?([\#a-fA-F0-9]*)/) : false;
              color = matches && matches.length > 1 ? matches[1] : undefined;
            }

            if (_.isNull(opacity)) {
              var matches = style ? style.match(/stop\-opacity\:\s?([0-9\.\-]*)/) : false;
              opacity = matches && matches.length > 1 ? parseFloat(matches[1]) : 1;
            }

            stops.push(new Two.Gradient.Stop(offset, color, opacity));

          }

          var gradient = new Two.RadialGradient(cx - ox, cy - oy, r,
            stops, fx - ox, fy - oy);

          Two.Utils.applySvgAttributes.call(this, node, gradient, parentStyles);

          return gradient;

        }

      },

      /**
       * @name Two.Utils.subdivide
       * @function
       * @param {Number} x1 - x position of first anchor point.
       * @param {Number} y1 - y position of first anchor point.
       * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
       * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
       * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
       * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
       * @param {Number} x4 - x position of second anchor point.
       * @param {Number} y4 - y position of second anchor point.
       * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
       * @returns {Two.Anchor[]} A list of anchor points ordered in between `x1`, `y1` and `x4`, `y4`
       * @description Given 2 points (a, b) and corresponding control point for each return an array of points that represent points plotted along the curve. The number of returned points is determined by `limit`.
       */
      subdivide: function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {

        limit = limit || Two.Utils.Curve.RecursionLimit;
        var amount = limit + 1;

        // TODO: Abstract 0.001 to a limiting variable
        // Don't recurse if the end points are identical
        if (abs(x1 - x4) < 0.001 && abs(y1 - y4) < 0.001) {
          return [new Two.Anchor(x4, y4)];
        }

        var result = [];

        for (var i = 0; i < amount; i++) {
          var t = i / amount;
          var x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
          var y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
          result.push(new Two.Anchor(x, y));
        }

        return result;

      },

      /**
       * @name Two.Utils.getComponentOnCubicBezier
       * @function
       * @param {Number} t - Zero-to-one value describing what percentage to calculate.
       * @param {Number} a - The firt point's component value.
       * @param {Number} b - The first point's bezier component value.
       * @param {Number} c - The second point's bezier component value.
       * @param {Number} d - The second point's component value.
       * @returns {Number} The coordinate value for a specific component along a cubic bezier curve by `t`.
       */
      getComponentOnCubicBezier: function(t, a, b, c, d) {
        var k = 1 - t;
        return (k * k * k * a) + (3 * k * k * t * b) + (3 * k * t * t * c) +
           (t * t * t * d);
      },

      /**
       * @name Two.Utils.getCurveLength
       * @function
       * @param {Number} x1 - x position of first anchor point.
       * @param {Number} y1 - y position of first anchor point.
       * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
       * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
       * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
       * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
       * @param {Number} x4 - x position of second anchor point.
       * @param {Number} y4 - y position of second anchor point.
       * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
       * @returns {Number} The length of a curve.
       * @description Given 2 points (a, b) and corresponding control point for each, return a float that represents the length of the curve using Gauss-Legendre algorithm. Limit iterations of calculation by `limit`.
       */
      getCurveLength: function(x1, y1, x2, y2, x3, y3, x4, y4, limit) {

        // TODO: Better / fuzzier equality check
        // Linear calculation
        if (x1 === x2 && y1 === y2 && x3 === x4 && y3 === y4) {
          var dx = x4 - x1;
          var dy = y4 - y1;
          return sqrt(dx * dx + dy * dy);
        }

        // Calculate the coefficients of a Bezier derivative.
        var ax = 9 * (x2 - x3) + 3 * (x4 - x1),
          bx = 6 * (x1 + x3) - 12 * x2,
          cx = 3 * (x2 - x1),

          ay = 9 * (y2 - y3) + 3 * (y4 - y1),
          by = 6 * (y1 + y3) - 12 * y2,
          cy = 3 * (y2 - y1);

        var integrand = function(t) {
          // Calculate quadratic equations of derivatives for x and y
          var dx = (ax * t + bx) * t + cx,
            dy = (ay * t + by) * t + cy;
          return sqrt(dx * dx + dy * dy);
        };

        return integrate(
          integrand, 0, 1, limit || Two.Utils.Curve.RecursionLimit
        );

      },

      /**
       * @name Two.Utils.getCurveBoundingBox
       * @function
       * @param {Number} x1 - x position of first anchor point.
       * @param {Number} y1 - y position of first anchor point.
       * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
       * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
       * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
       * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
       * @param {Number} x4 - x position of second anchor point.
       * @param {Number} y4 - y position of second anchor point.
       * @returns {Object} Object contains min and max `x` / `y` bounds.
       * @see {@link https://github.com/adobe-webplatform/Snap.svg/blob/master/src/path.js#L856}
       */
      getCurveBoundingBox: function(x1, y1, x2, y2, x3, y3, x4, y4) {

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
            if (abs(a) < 1e-12) {
              if (abs(b) < 1e-12) {
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

        var x, y, j = tvalues.length;
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

      },

      /**
       * @name Two.Utils.integrate
       * @function
       * @param {Function} f
       * @param {Number} a
       * @param {Number} b
       * @param {Integer} n
       * @description Integration for `getCurveLength` calculations.
       * @see [Paper.js]{@link https://github.com/paperjs/paper.js/blob/master/src/util/Numerical.js#L101}
       */
      integrate: function(f, a, b, n) {
        var x = Two.Utils.Curve.abscissas[n - 2],
          w = Two.Utils.Curve.weights[n - 2],
          A = 0.5 * (b - a),
          B = A + a,
          i = 0,
          m = (n + 1) >> 1,
          sum = n & 1 ? w[i++] * f(B) : 0; // Handle odd n
        while (i < m) {
          var Ax = A * x[i];
          sum += w[i++] * (f(B + Ax) + f(B - Ax));
        }
        return A * sum;
      },

      /**
       * @name Two.Utils.getCurveFromPoints
       * @function
       * @param {Two.Anchor[]} points
       * @param {Boolean} closed
       * @description Sets the bezier handles on `Two.Anchor`s in the `points` list with estimated values to create a catmull-rom like curve. Used by {@link Two.Path#plot}.
       */
      getCurveFromPoints: function(points, closed) {

        var l = points.length, last = l - 1;

        for (var i = 0; i < l; i++) {

          var point = points[i];

          if (!_.isObject(point.controls)) {
            Two.Anchor.AppendCurveProperties(point);
          }

          var prev = closed ? mod(i - 1, l) : max(i - 1, 0);
          var next = closed ? mod(i + 1, l) : min(i + 1, last);

          var a = points[prev];
          var b = point;
          var c = points[next];
          getControlPoints(a, b, c);

          b.command = i === 0 ? Two.Commands.move : Two.Commands.curve;

        }

      },

      /**
       * @name Two.Utils.getControlPoints
       * @function
       * @param {Two.Anchor} a
       * @param {Two.Anchor} b
       * @param {Two.Anchor} c
       * @returns {Two.Anchor} Returns the passed middle point `b`.
       * @description Given three coordinates set the control points for the middle, b, vertex based on its position with the adjacent points.
       */
      getControlPoints: function(a, b, c) {

        var a1 = Two.Vector.angleBetween(a, b);
        var a2 = Two.Vector.angleBetween(c, b);

        var d1 = Two.Vector.distanceBetween(a, b);
        var d2 = Two.Vector.distanceBetween(c, b);

        var mid = (a1 + a2) / 2;

        // TODO: Issue 73
        if (d1 < 0.0001 || d2 < 0.0001) {
          if (_.isBoolean(b.relative) && !b.relative) {
            b.controls.left.copy(b);
            b.controls.right.copy(b);
          }
          return b;
        }

        d1 *= 0.33; // Why 0.33?
        d2 *= 0.33;

        if (a2 < a1) {
          mid += HALF_PI;
        } else {
          mid -= HALF_PI;
        }

        b.controls.left.x = cos(mid) * d1;
        b.controls.left.y = sin(mid) * d1;

        mid -= PI;

        b.controls.right.x = cos(mid) * d2;
        b.controls.right.y = sin(mid) * d2;

        if (_.isBoolean(b.relative) && !b.relative) {
          b.controls.left.x += b.x;
          b.controls.left.y += b.y;
          b.controls.right.x += b.x;
          b.controls.right.y += b.y;
        }

        return b;

      },

      /**
       * @name Two.Utils.getReflection
       * @function
       * @param {Two.Vector} a
       * @param {Two.Vector} b
       * @param {Boolean} [relative=false]
       * @returns {Two.Vector} New `Two.Vector` that represents the reflection point.
       * @description Get the reflection of a point `b` about point `a`. Where `a` is in absolute space and `b` is relative to `a`.
       * @see {@link http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes}
       */
      getReflection: function(a, b, relative) {

        return new Two.Vector(
          2 * a.x - (b.x + a.x) - (relative ? a.x : 0),
          2 * a.y - (b.y + a.y) - (relative ? a.y : 0)
        );

      },

      /**
       * @name Two.Utils.getAnchorsFromArcData
       * @function
       * @param {Two.Vector} center
       * @param {Radians} xAxisRotation
       * @param {Number} rx - x radius
       * @param {Number} ry - y radius
       * @param {Radians} ts
       * @param {Radians} td
       * @param {Boolean} [ccw=false] - Set path traversal to counter-clockwise
       */
      getAnchorsFromArcData: function(center, xAxisRotation, rx, ry, ts, td, ccw) {

        var matrix = new Two.Matrix()
          .translate(center.x, center.y)
          .rotate(xAxisRotation);

        var l = Two.Resolution;

        return _.map(_.range(l), function(i) {

          var pct = (i + 1) / l;
          if (!!ccw) {
            pct = 1 - pct;
          }

          var theta = pct * td + ts;
          var x = rx * Math.cos(theta);
          var y = ry * Math.sin(theta);

          // x += center.x;
          // y += center.y;

          var anchor = new Two.Anchor(x, y);
          Two.Anchor.AppendCurveProperties(anchor);
          anchor.command = Two.Commands.line;

          // TODO: Calculate control points here...

          return anchor;

        });

      },

      /**
       * @name Two.Utils.lerp
       * @function
       * @param {Number} a - Start value.
       * @param {Number} b - End value.
       * @param {Number} t - Zero-to-one value describing percentage between a and b.
       * @returns {Number}
       * @description Linear interpolation between two values `a` and `b` by an amount `t`.
       */
      lerp: function(a, b, t) {
        return t * (b - a) + a;
      },

      /**
       * @name Two.Utils.toFixed
       * @function
       * @param {Number} v - Any float
       * @returns {Number} That float trimmed to the third decimal place.
       * @description A pretty fast toFixed(3) alternative.
       * @see {@link http://jsperf.com/parsefloat-tofixed-vs-math-round/18}
       */
      toFixed: function(v) {
        return Math.floor(v * 1000) / 1000;
      },

      /**
       * @name Two.Utils.mod
       * @param {Number} v - The value to modulo
       * @param {Number} l - The value to modulo by
       * @returns {Number}
       * @description Modulo with added functionality to handle negative values in a positive manner.
       */
      mod: function(v, l) {

        while (v < 0) {
          v += l;
        }

        return v % l;

      },

      /**
       * @name Two.Utils.Collection
       * @class
       * @extends Two.Utils.Events
       * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
       */
      Collection: function() {

        Array.call(this);

        if (arguments.length > 1) {
          Array.prototype.push.apply(this, arguments);
        } else if (arguments[0] && Array.isArray(arguments[0])) {
          Array.prototype.push.apply(this, arguments[0]);
        }

      },

      /**
       * @name Two.Utils.Error
       * @class
       * @description Custom error throwing for Two.js specific identification.
       */
      Error: function(message) {
        this.name = 'two.js';
        this.message = message;
      },

      /**
       * @name Two.Utils.Events
       * @interface
       * @description Object inherited by many Two.js objects in order to facilitate custom events.
       */
      Events: {

        /**
         * @name Two.Utils.Events.on
         * @function
         * @param {String} name - The name of the event to bind a function to.
         * @param {Function} handler - The function to be invoked when the event is dispatched.
         * @description Call to add a listener to a specific event name.
         */
        on: function(name, handler) {

          this._events || (this._events = {});
          var list = this._events[name] || (this._events[name] = []);

          list.push(handler);

          return this;

        },

        /**
         * @name Two.Utils.Events.off
         * @function
         * @param {String} [name] - The name of the event intended to be removed.
         * @param {Function} [handler] - The handler intended to be reomved.
         * @description Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.
         */
        off: function(name, handler) {

          if (!this._events) {
            return this;
          }
          if (!name && !handler) {
            this._events = {};
            return this;
          }

          var names = name ? [name] : _.keys(this._events);
          for (var i = 0, l = names.length; i < l; i++) {

            var name = names[i];
            var list = this._events[name];

            if (!!list) {
              var events = [];
              if (handler) {
                for (var j = 0, k = list.length; j < k; j++) {
                  var ev = list[j];
                  ev = ev.handler ? ev.handler : ev;
                  if (handler && handler !== ev) {
                    events.push(ev);
                  }
                }
              }
              this._events[name] = events;
            }
          }

          return this;
        },

        /**
         * @name Two.Utils.Events.trigger
         * @function
         * @param {String} name - The name of the event to dispatch.
         * @param arguments - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
         * @description Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
         */
        trigger: function(name) {
          if (!this._events) return this;
          var args = slice.call(arguments, 1);
          var events = this._events[name];
          if (events) trigger(this, events, args);
          return this;
        },

        listen: function(obj, name, handler) {

          var bound = this;

          if (obj) {

            var event = function () {
              handler.apply(bound, arguments);
            };

            // Add references about the object that assigned this listener
            event.obj = obj;
            event.name = name;
            event.handler = handler;

            obj.on(name, ev);

          }

          return this;

        },

        ignore: function(obj, name, handler) {

          obj.off(name, handler);
          return this;

        }

      }

    })

  });

  /**
   * @name Two.Utils.Events.bind
   * @borrows Two.Utils.Events.on as Two.Utils.Events.bind
   */
  Two.Utils.Events.bind = Two.Utils.Events.on;

  /**
   * @name Two.Utils.Events.unbind
   * @borrows Two.Utils.Events.off as Two.Utils.Events.unbind
   */
  Two.Utils.Events.unbind = Two.Utils.Events.off;

  var trigger = function(obj, events, args) {
    var method;
    switch (args.length) {
    case 0:
      method = function(i) {
        events[i].call(obj, args[0]);
      };
      break;
    case 1:
      method = function(i) {
        events[i].call(obj, args[0], args[1]);
      };
      break;
    case 2:
      method = function(i) {
        events[i].call(obj, args[0], args[1], args[2]);
      };
      break;
    case 3:
      method = function(i) {
        events[i].call(obj, args[0], args[1], args[2], args[3]);
      };
      break;
    default:
      method = function(i) {
        events[i].apply(obj, args);
      };
    }
    for (var i = 0; i < events.length; i++) {
      method(i);
    }
  };

  Two.Utils.Error.prototype = new Error();
  Two.Utils.Error.prototype.constructor = Two.Utils.Error;

  Two.Utils.Collection.prototype = new Array();
  Two.Utils.Collection.prototype.constructor = Two.Utils.Collection;

  _.extend(Two.Utils.Collection.prototype, Two.Utils.Events, {

    pop: function() {
      var popped = Array.prototype.pop.apply(this, arguments);
      this.trigger(Two.Events.remove, [popped]);
      return popped;
    },

    shift: function() {
      var shifted = Array.prototype.shift.apply(this, arguments);
      this.trigger(Two.Events.remove, [shifted]);
      return shifted;
    },

    push: function() {
      var pushed = Array.prototype.push.apply(this, arguments);
      this.trigger(Two.Events.insert, arguments);
      return pushed;
    },

    unshift: function() {
      var unshifted = Array.prototype.unshift.apply(this, arguments);
      this.trigger(Two.Events.insert, arguments);
      return unshifted;
    },

    splice: function() {
      var spliced = Array.prototype.splice.apply(this, arguments);
      var inserted;

      this.trigger(Two.Events.remove, spliced);

      if (arguments.length > 2) {
        inserted = this.slice(arguments[0], arguments[0] + arguments.length - 2);
        this.trigger(Two.Events.insert, inserted);
        this.trigger(Two.Events.order);
      }
      return spliced;
    },

    sort: function() {
      Array.prototype.sort.apply(this, arguments);
      this.trigger(Two.Events.order);
      return this;
    },

    reverse: function() {
      Array.prototype.reverse.apply(this, arguments);
      this.trigger(Two.Events.order);
      return this;
    }

  });

  // Localize utils

  var getAnchorsFromArcData = Two.Utils.getAnchorsFromArcData,
    getControlPoints = Two.Utils.getControlPoints,
    getCurveFromPoints = Two.Utils.getCurveFromPoints,
    solveSegmentIntersection = Two.Utils.solveSegmentIntersection,
    decoupleShapes = Two.Utils.decoupleShapes,
    mod = Two.Utils.mod,
    getBackingStoreRatio = Two.Utils.getBackingStoreRatio,
    getComponentOnCubicBezier = Two.Utils.getComponentOnCubicBezier,
    getCurveLength = Two.Utils.getCurveLength,
    integrate = Two.Utils.integrate,
    getReflection = Two.Utils.getReflection;

  _.extend(Two.prototype, Two.Utils.Events, {

    constructor: Two,

    /**
     * @name Two#appendTo
     * @function
     * @param {Element} elem - The DOM element to append the Two.js stage to.
     * @description Shorthand method to append your instance of Two.js to the `document`.
     */
    appendTo: function(elem) {

      elem.appendChild(this.renderer.domElement);
      return this;

    },

    /**
     * @name Two#play
     * @function
     * @fires `Two.Events.play` event
     * @description Call to start an internal animation loop.
     * @nota-bene This function initiates a `requestAnimationFrame` loop.
     */
    play: function() {

      Two.Utils.setPlaying.call(this, true);
      raf.init();
      return this.trigger(Two.Events.play);

    },

    /**
     * @name Two#pause
     * @function
     * @fires `Two.Events.pause` event
     * @description Call to stop the internal animation loop for a specific instance of Two.js.
     */
    pause: function() {

      this.playing = false;
      return this.trigger(Two.Events.pause);

    },

    /**
     * @name Two#update
     * @fires `Two.Events.update` event
     * @description Update positions and calculations in one pass before rendering. Then render to the canvas.
     * @nota-bene This function is called automatically if using {@link Two#play} or the `autostart` parameter in construction.
     */
    update: function() {

      var animated = !!this._lastFrame;
      var now = perf.now();

      if (animated) {
        this.timeDelta = parseFloat((now - this._lastFrame).toFixed(3));
      }
      this._lastFrame = now;

      var width = this.width;
      var height = this.height;
      var renderer = this.renderer;

      // Update width / height for the renderer
      if (width !== renderer.width || height !== renderer.height) {
        renderer.setSize(width, height, this.ratio);
      }

      this.trigger(Two.Events.update, this.frameCount, this.timeDelta);

      return this.render();

    },

    /**
     * @name Two#render
     * @fires `Two.Events.render` event
     * @description Render all drawable and visible objects of the scene.
     */
    render: function() {

      this.renderer.render();
      return this.trigger(Two.Events.render, this.frameCount++);

    },

    // Convenience Methods

    /**
     * @name Two#add
     * @function
     * @param {(Two.Shape[]|...Two.Shape)}} [objects] - An array of Two.js objects. Alternatively can add objects as individual arguments.
     * @description A shorthand method to add specific Two.js objects to the scene.
     */
    add: function(o) {

      var objects = o;
      if (!(objects instanceof Array)) {
        objects = _.toArray(arguments);
      }

      this.scene.add(objects);
      return this;

    },

    /**
     * @name Two#remove
     * @function
     * @param {(Two.Shape[]|...Two.Shape)} [objects] - An array of Two.js objects.
     * @description A shorthand method to remove specific Two.js objects from the scene.
     */
    remove: function(o) {

      var objects = o;
      if (!(objects instanceof Array)) {
        objects = _.toArray(arguments);
      }

      this.scene.remove(objects);

      return this;

    },

    /**
     * @name Two#clear
     * @function
     * @description Remove all all Two.js objects from the scene.
     */
    clear: function() {

      this.scene.remove(this.scene.children);
      return this;

    },

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
    makeLine: function(x1, y1, x2, y2) {

      var line = new Two.Line(x1, y1, x2, y2);
      this.scene.add(line);

      return line;

    },

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
    makeRectangle: function(x, y, width, height) {

      var rect = new Two.Rectangle(x, y, width, height);
      this.scene.add(rect);

      return rect;

    },

    /**
     * @name Two#makeRoundedRectangle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {Number} sides
     * @returns {Two.Rectangle}
     * @description Creates a Two.js rounded rectangle and adds it to the scene.
     */
    makeRoundedRectangle: function(x, y, width, height, sides) {

      var rect = new Two.RoundedRectangle(x, y, width, height, sides);
      this.scene.add(rect);

      return rect;

    },

    /**
     * @name Two#makeCircle
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @returns {Two.Circle}
     * @description Creates a Two.js circle and adds it to the scene.
     */
    makeCircle: function(x, y, radius) {

      var circle = new Two.Circle(x, y, radius);
      this.scene.add(circle);

      return circle;

    },

    /**
     * @name Two#makeEllipse
     * @function
     * @param {Number} x
     * @param {Number} y
     * @param {Number} rx
     * @param {Number} ry
     * @returns {Two.Ellipse}
     * @description Creates a Two.js ellipse and adds it to the scene.
     */
    makeEllipse: function(x, y, rx, ry) {

      var ellipse = new Two.Ellipse(x, y, rx, ry);
      this.scene.add(ellipse);

      return ellipse;

    },

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
    makeStar: function(ox, oy, outerRadius, innerRadius, sides) {

      var star = new Two.Star(ox, oy, outerRadius, innerRadius, sides);
      this.scene.add(star);

      return star;

    },

    /**
     * @name Two#makeCurve
     * @function
     * @param {Two.Anchor[]} [points] - An array of `Two.Anchor` points.
     * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into `Two.Anchor`s for use in the path.
     * @returns {Two.Path} - Where `path.curved` is set to `true`.
     * @description Creates a Two.js path that is curved and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
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
          points.push(new Two.Anchor(x, y));
        }
      }

      var last = arguments[l - 1];
      var curve = new Two.Path(points, !(_.isBoolean(last) ? last : undefined), true);
      var rect = curve.getBoundingClientRect();
      curve.center().translation
        .set(rect.left + rect.width / 2, rect.top + rect.height / 2);

      this.scene.add(curve);

      return curve;

    },

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
    makePolygon: function(x, y, radius, sides) {

      var poly = new Two.Polygon(x, y, radius, sides);
      this.scene.add(poly);

      return poly;

    },

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
     */
    makeArcSegment: function(ox, oy, ir, or, sa, ea, res) {
      var arcSegment = new Two.ArcSegment(ox, oy, ir, or, sa, ea, res);
      this.scene.add(arcSegment);
      return arcSegment;
    },

    /**
     * @name Two#makePath
     * @function
     * @param {Two.Anchor[]} [points] - An array of `Two.Anchor` points.
     * @param {...Number} - Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into `Two.Anchor`s for use in the path.
     * @returns {Two.Path}
     * @description Creates a Two.js path and adds it to the scene.
     * @nota-bene In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
     */
    makePath: function(p) {

      var l = arguments.length, points = p;
      if (!_.isArray(p)) {
        points = [];
        for (var i = 0; i < l; i+=2) {
          var x = arguments[i];
          if (!_.isNumber(x)) {
            break;
          }
          var y = arguments[i + 1];
          points.push(new Two.Anchor(x, y));
        }
      }

      var last = arguments[l - 1];
      var path = new Two.Path(points, !(_.isBoolean(last) ? last : undefined));
      var rect = path.getBoundingClientRect();
      path.center().translation
        .set(rect.left + rect.width / 2, rect.top + rect.height / 2);

      this.scene.add(path);

      return path;

    },

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
    makeText: function(message, x, y, styles) {
      var text = new Two.Text(message, x, y, styles);
      this.add(text);
      return text;
    },

    /**
     * @name Two#makeLinearGradient
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {...Two.Stop} [stops] - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     * @returns {Two.LinearGradient}
     * @description Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     */
    makeLinearGradient: function(x1, y1, x2, y2 /* stops */) {

      var stops = slice.call(arguments, 4);
      var gradient = new Two.LinearGradient(x1, y1, x2, y2, stops);

      this.add(gradient);

      return gradient;

    },

    /**
     * @name Two#makeRadialGradient
     * @function
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} radius
     * @param {...Two.Stop} [stops] - Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied.
     * @returns {Two.RadialGradient}
     * @description Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.
     */
    makeRadialGradient: function(x1, y1, r /* stops */) {

      var stops = slice.call(arguments, 3);
      var gradient = new Two.RadialGradient(x1, y1, r, stops);

      this.add(gradient);

      return gradient;

    },

    /**
     * @name Two#makeSprite
     * @function
     * @param {(String|Two.Texture)} pathOrTexture - The URL path to an image or an already created `Two.Texture`.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [columns=1]
     * @param {Number} [rows=1]
     * @param {Integer} [frameRate=0]
     * @param {Boolean} [autostart=false]
     * @returns {Two.Sprite}
     * @description Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.
     */
    makeSprite: function(path, x, y, cols, rows, frameRate, autostart) {

      var sprite = new Two.Sprite(path, x, y, cols, rows, frameRate);
      if (!!autostart) {
        sprite.play();
      }
      this.add(sprite);

      return sprite;

    },

    /**
     * @name Two#makeImageSequence
     * @function
     * @param {(String[]|Two.Texture[])} pathsOrTextures - An array of paths or of `Two.Textures`.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} [frameRate=0]
     * @param {Boolean} [autostart=false]
     * @returns {Two.ImageSequence}
     * @description Creates a Two.js image sequence object and adds it to the scene.
     */
    makeImageSequence: function(paths, x, y, frameRate, autostart) {

      var imageSequence = new Two.ImageSequence(paths, x, y, frameRate);
      if (!!autostart) {
        imageSequence.play();
      }
      this.add(imageSequence);

      return imageSequence;

    },

    /**
     * @name Two#makeTexture
     * @function
     * @param {(String|Image|Canvas|Video)} [pathOrSource] - The URL path to an image or a DOM image-like element.
     * @param {Function} [callback] - Function to be invoked when the image is loaded.
     * @returns {Two.Texture}
     * @description Creates a Two.js texture object.
     */
    makeTexture: function(path, callback) {

      var texture = new Two.Texture(path, callback);
      return texture;

    },

    /**
     * @name Two#makeGroup
     * @function
     * @param {(Two.Shape[]|...Two.Shape)} [objects] - Two.js objects to be added to the group in the form of an array or as individual arguments.
     * @returns {Two.Group}
     * @description Creates a Two.js group object and adds it to the scene.
     */
    makeGroup: function(o) {

      var objects = o;
      if (!(objects instanceof Array)) {
        objects = _.toArray(arguments);
      }

      var group = new Two.Group();
      this.scene.add(group);
      group.add(objects);

      return group;

    },

    /**
     * @name Two#interpret
     * @function
     * @param {SvgNode} svgNode - The SVG node to be parsed.
     * @param {Boolean} shallow - Don't create a top-most group but append all content directly.
     * @param {Boolean} add – Automatically add the reconstructed SVG node to scene.
     * @returns {Two.Group}
     * @description Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js — this is slightly different than a direct transcription.
     */
    interpret: function(svgNode, shallow, add) {

      var tag = svgNode.tagName.toLowerCase(),
          add = (typeof add !== 'undefined') ? add : true;

      if (!(tag in Two.Utils.read)) {
        return null;
      }

      var node = Two.Utils.read[tag].call(this, svgNode);

      if (!!add) {
        this.add(shallow && node instanceof Two.Group ? node.children : node);
      }

      return node;

    },

    /**
     * @name Two#load
     * @function
     * @param {String} pathOrSVGContent - The URL path of an SVG file or an SVG document as text.
     * @param {Function} callback - Function to call once loading has completed.
     * @returns {Two.Group}
     * @description Load an SVG file or SVG text and interpret it into Two.js legible objects.
     */
    load: function(text, callback) {

      var group = new Two.Group();
      var elem, i, j;

      var attach = _.bind(function(data) {

        dom.temp.innerHTML = data;

        for (i = 0; i < dom.temp.children.length; i++) {
          elem = dom.temp.children[i];
          if (/svg/i.test(elem.nodeName)) {
            // Two.Utils.applySvgViewBox.call(this, group, elem.getAttribute('viewBox'));
            for (j = 0; j < elem.children.length; j++) {
              group.add(this.interpret(elem.children[j]));
            }
          } else {
            group.add(this.interpret(elem));
          }
        }

        if (_.isFunction(callback)) {
          var svg = dom.temp.children.length <= 1
            ? dom.temp.children[0] : dom.temp.children;
          callback(group, svg);
        }

      }, this);

      if (/.*\.svg$/ig.test(text)) {

        Two.Utils.xhr(text, attach);

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

  function updateDimensions(width, height) {
    this.width = width;
    this.height = height;
    this.trigger(Two.Events.resize, width, height);
  }

  // Request Animation Frame

  var raf = dom.getRequestAnimationFrame();

  function loop() {

    for (var i = 0; i < Two.Instances.length; i++) {
      var t = Two.Instances[i];
      if (t.playing) {
        t.update();
      }
    }

    Two.nextFrameID = raf(loop);

  }

  if (typeof define === 'function' && define.amd) {
    define('two', [], function() {
      return Two;
    });
  } else if (typeof module != 'undefined' && module.exports) {
    module.exports = Two;
  }

  return Two;

})((typeof global !== 'undefined' ? global : (this || window)).Two);
