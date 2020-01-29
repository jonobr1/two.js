import root from '../utils/root.js';
import Events from '../events.js';
import TwoError from '../utils/error.js';
import defineGetterSetter from '../utils/get-set.js';
import CanvasShim from '../utils/canvas-shim.js';
import _ from '../utils/underdash.js';

import Vector from '../vector.js';
import Shape from '../shape.js';
import Registry from '../registry.js';

import CanvasRenderer from '../renderers/canvas.js';

import Globals from '../globals.js';

var anchor;
var regex = {
  video: /\.(mp4|webm|ogg)$/i,
  image: /\.(jpe?g|png|gif|tiff|webp)$/i,
  effect: /texture|gradient/i
};

if (root.document) {
  anchor = document.createElement('a');
}

/**
 * @name Two.Texture
 * @class
 * @extends Two.Shape
 * @param {String|ImageElement} [src] - The URL path to an image file or an `<img />` element.
 * @param {Function} [callback] - An optional callback function once the image has been loaded.
 * @description Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See {@link Two.Texture.RegularExpressions} for a full list of supported formats.
 */
var Texture = function(src, callback) {

  this._renderer = {};
  this._renderer.type = 'texture';
  this._renderer.flagOffset = Texture.FlagOffset.bind(this);
  this._renderer.flagScale = Texture.FlagScale.bind(this);

  this.id = Globals.Identifier + Globals.uniqueId();
  this.classList = [];

  /**
   * @name Two.Texture#loaded
   * @property {Boolean} - Shorthand value to determine if image has been loaded into the texture.
   */
  this.loaded = false;

  /**
   * @name Two.Texture#repeat
   * @property {String} - CSS style declaration to tile {@link Two.Path}. Valid values include: `'no-repeat'`, `'repeat'`, `'repeat-x'`, `'repeat-y'`.
   * @see {@link https://www.w3.org/TR/2dcontext/#dom-context-2d-createpattern}
   */
  this.repeat = 'no-repeat';

  /**
   * @name Two.Texture#offset
   * @property {Two.Vector} - A two-component vector describing any pixel offset of the texture when applied to a {@link Two.Path}.
   */
  this.offset = new Vector();

  if (typeof callback === 'function') {
    var loaded = (function() {
      this.unbind(Events.Types.load, loaded);
      if (typeof callback === 'function') {
        callback();
      }
    }).bind(this);
    this.bind(Events.Types.load, loaded);
  }

  /**
   * @name Two.Texture#src
   * @property {String} - The URL path to the image data.
   * @nota-bene This property is ultimately serialized in a {@link Two.Registry} to cache retrieval.
   */
  if (typeof src === 'string') {
    this.src = src;
  } else if (typeof src === 'object') {
    var elemString = Object.prototype.toString.call(src);
    if (
      elemString === '[object HTMLImageElement]' ||
      elemString === '[object HTMLCanvasElement]' ||
      elemString === '[object HTMLVideoElement]'
    ) {
      /**
       * @name Two.Texture#image
       * @property {Element} - The corresponding DOM Element of the texture. Can be a `<img />`, `<canvas />`, or `<video />` element. See {@link Two.Texture.RegularExpressions} for a full list of supported elements.
       * @nota-bene In headless environments this is a `Canvas.Image` object. See {@link https://github.com/Automattic/node-canvas} for more information on headless image objects.
       */
      this.image = src;
    }
  }

  this._update();

};

_.extend(Texture, {

  /**
   * @name Two.Texture.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Texture}.
   */
  Properties: [
    'src',
    'loaded',
    'repeat'
  ],

  /**
   * @name Two.Texture.RegularExpressions
   * @property {Object} - A map of compatible DOM Elements categorized by media format.
   */
  RegularExpressions: regex,

  /**
   * @name Two.Texture.ImageRegistry
   * @property {Two.Registry} - A canonical listing of image data used in a single session of Two.js.
   * @nota-bene This object is used to cache image data between different textures.
   */
  ImageRegistry: new Registry(),

  /**
   * @name Two.Texture.getAbsoluteURL
   * @property {Function} - Serializes a URL as an absolute path for canonical attribution in {@link Two.ImageRegistry}.
   * @param {String} path
   * @returns {String} - The serialized absolute path.
   */
  getAbsoluteURL: function(path) {
    if (!anchor) {
      // TODO: Fix for headless environments
      return path;
    }
    anchor.href = path;
    return anchor.href;
  },

  /**
   * @name Two.Texture.loadHeadlessBuffer
   * @property {Function} - Loads an image as a buffer in headless environments.
   * @param {Two.Texture} texture - The {@link Two.Texture} to be loaded.
   * @param {Function} loaded - The callback function to be triggered once the image is loaded.
   * @nota-bene - This function uses node's `fs.readFileSync` to spoof the `<img />` loading process in the browser.
   */
  loadHeadlessBuffer: new Function('texture', 'loaded', [
    'var fs = require("fs");',
    'var buffer = fs.readFileSync(texture.src);',

    'texture.image.src = buffer;',
    'loaded();'
  ].join('\n')),

  /**
   * @name Two.Texture.getImage
   * @property {Function} - Convenience function to set {@link Two.Texture#image} properties with canonincal versions set in {@link Two.Texture.ImageRegistry}.
   * @param {String} src - The URL path of the image.
   * @returns {ImageElement} - Returns either a cached version of the image or a new one that is registered in {@link Two.Texture.ImageRegistry}.
   */
  getImage: function(src) {

    var absoluteSrc = Texture.getAbsoluteURL(src);

    if (Texture.ImageRegistry.contains(absoluteSrc)) {
      return Texture.ImageRegistry.get(absoluteSrc);
    }

    var image;

    if (CanvasShim.Image) {

      // TODO: Fix for headless environments
      image = new CanvasShim.Image();
      CanvasRenderer.Utils.shim(image, 'img');

    } else if (root.document) {

      if (regex.video.test(absoluteSrc)) {
        image = document.createElement('video');
      } else {
        image = document.createElement('img');
      }

    } else {

      console.warn('Two.js: no prototypical image defined for Two.Texture');

    }

    image.crossOrigin = 'anonymous';

    return image;

  },

  /**
   * @name Two.Register
   * @interface
   * @description A collection of functions to register different types of textures. Used internally by a {@link Two.Texture}.
   */
  Register: {
    canvas: function(texture, callback) {
      texture._src = '#' + texture.id;
      Texture.ImageRegistry.add(texture.src, texture.image);
      if (typeof callback === 'function') {
        callback();
      }
    },
    img: function(texture, callback) {

      var loaded = function(e) {
        if (typeof texture.image.removeEventListener === 'function') {
          texture.image.removeEventListener('load', loaded, false);
          texture.image.removeEventListener('error', error, false);
        }
        if (typeof callback === 'function') {
          callback();
        }
      };
      var error = function(e) {
        if (typeof texture.image.removeEventListener === 'function') {
          texture.image.removeEventListener('load', loaded, false);
          texture.image.removeEventListener('error', error, false);
        }
        throw new TwoError('unable to load ' + texture.src);
      };

      if (typeof texture.image.width === 'number' && texture.image.width > 0
        && typeof texture.image.height === 'number' && texture.image.height > 0) {
          loaded();
      } else if (typeof texture.image.addEventListener === 'function') {
        texture.image.addEventListener('load', loaded, false);
        texture.image.addEventListener('error', error, false);
      }

      texture._src = Texture.getAbsoluteURL(texture._src);

      if (texture.image && texture.image.getAttribute('two-src')) {
        return;
      }

      texture.image.setAttribute('two-src', texture.src);
      Texture.ImageRegistry.add(texture.src, texture.image);

      if (CanvasShim.isHeadless) {

        Texture.loadHeadlessBuffer(texture, loaded);

      } else {

        texture.image.src = texture.src;

      }

    },
    video: function(texture, callback) {

      var loaded = function(e) {
        texture.image.removeEventListener('canplaythrough', loaded, false);
        texture.image.removeEventListener('error', error, false);
        texture.image.width = texture.image.videoWidth;
        texture.image.height = texture.image.videoHeight;
        texture.image.play();
        if (typeof callback === 'function') {
          callback();
        }
      };
      var error = function(e) {
        texture.image.removeEventListener('canplaythrough', loaded, false);
        texture.image.removeEventListener('error', error, false);
        throw new TwoError('unable to load ' + texture.src);
      };

      texture._src = Texture.getAbsoluteURL(texture._src);
      texture.image.addEventListener('canplaythrough', loaded, false);
      texture.image.addEventListener('error', error, false);

      if (texture.image && texture.image.getAttribute('two-src')) {
        return;
      }

      if (CanvasShim.isHeadless) {
        throw new TwoError('video textures are not implemented in headless environments.');
      }

      texture.image.setAttribute('two-src', texture.src);
      Texture.ImageRegistry.add(texture.src, texture.image);
      texture.image.src = texture.src;
      texture.image.loop = true;
      texture.image.load();

    }
  },

  /**
   * @name Two.Texture.load
   * @function
   * @param {Two.Texture} texture - The texture to load.
   * @param {Function} callback - The function to be called once the texture is loaded.
   */
  load: function(texture, callback) {

    var src = texture.src;
    var image = texture.image;
    var tag = image && image.nodeName.toLowerCase();

    if (texture._flagImage) {
      if (/canvas/i.test(tag)) {
        Texture.Register.canvas(texture, callback);
      } else {
        texture._src = image.getAttribute('two-src') || image.src;
        Texture.Register[tag](texture, callback);
      }
    }

    if (texture._flagSrc) {
      if (!image) {
        texture.image = Texture.getImage(texture.src);
      }
      tag = texture.image.nodeName.toLowerCase();
      Texture.Register[tag](texture, callback);
    }

  },

  /**
   * @name Two.Texture.FlagOffset
   * @function
   * @description Cached method to let renderers know `offset` has been updated on a {@link Two.Texture}.
   */
  FlagOffset: function() {
    this._flagOffset = true;
  },

  /**
   * @name Two.Texture.FlagScale
   * @function
   * @description Cached method to let renderers know `scale` has been updated on a {@link Two.Texture}.
   */
  FlagScale: function() {
    this._flagScale = true;
  },

  /**
   * @name Two.Texture.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Texture} to any object. Handy if you'd like to extend or inherit the {@link Two.Texture} class on a custom class.
   */
  MakeObservable: function(object) {

    _.each(Texture.Properties, defineGetterSetter, object);

    Object.defineProperty(object, 'image', {
      enumerable: true,
      get: function() {
        return this._image;
      },
      set: function(image) {

        var tag = image && image.nodeName.toLowerCase();
        var index;

        switch (tag) {
          case 'canvas':
            index = '#' + image.id;
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

    Object.defineProperty(object, 'offset', {
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
    });

    Object.defineProperty(object, 'scale', {
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
    });

  }

});

_.extend(Texture.prototype, Events, Shape.prototype, {

  /**
   * @name Two.Texture#_flagSrc
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#src} needs updating.
   */
  _flagSrc: false,

  /**
   * @name Two.Texture#_flagImage
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#image} needs updating.
   */
  _flagImage: false,

  /**
   * @name Two.Texture#_flagVideo
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#video} needs updating.
   */
  _flagVideo: false,

  /**
   * @name Two.Texture#_flagLoaded
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#loaded} needs updating.
   */
  _flagLoaded: false,

  /**
   * @name Two.Texture#_flagRepeat
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#repeat} needs updating.
   */
  _flagRepeat: false,

  /**
   * @name Two.Texture#_flagOffset
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#offset} needs updating.
   */
  _flagOffset: false,

  /**
   * @name Two.Texture#_flagScale
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Texture#scale} needs updating.
   */
  _flagScale: false,

  /**
   * @name Two.Texture#_src
   * @private
   * @see {@link Two.Texture#src}
   */
  _src: '',

  /**
   * @name Two.Texture#_image
   * @private
   * @see {@link Two.Texture#image}
   */
  _image: null,

  /**
   * @name Two.Texture#_loaded
   * @private
   * @see {@link Two.Texture#loaded}
   */
  _loaded: false,

  /**
   * @name Two.Texture#_repeat
   * @private
   * @see {@link Two.Texture#repeat}
   */
  _repeat: 'no-repeat',

  /**
   * @name Two.Texture#_scale
   * @private
   * @see {@link Two.Texture#scale}
   */
  _scale: 1,

  /**
   * @name Two.Texture#_offset
   * @private
   * @see {@link Two.Texture#offset}
   */
  _offset: null,

  constructor: Texture,

  /**
   * @name Two.Texture#clone
   * @function
   * @returns {Two.Texture}
   * @description Create a new instance of {@link Two.Texture} with the same properties of the current texture.
   */
  clone: function() {
    var clone = new Texture(this.src);
    clone.repeat = this.repeat;
    clone.offset.copy(this.origin);
    clone.scale = this.scale;
    return clone;
  },

  /**
   * @name Two.Texture#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the texture.
   */
  toObject: function() {
    return {
      src: this.src,
      // image: this.image,
      repeat: this.repeat,
      origin: this.origin.toObject(),
      scale: typeof this.scale === 'number' ? this.scale : this.scale.toObject()
    };
  },

  /**
   * @name Two.Texture#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagSrc || this._flagImage) {

      this.trigger(Events.Types.change);

      if (this._flagSrc || this._flagImage) {
        this.loaded = false;
        Texture.load(this,(function() {
          this.loaded = true;
          this
            .trigger(Events.Types.change)
            .trigger(Events.Types.load);
        }).bind(this));
      }

    }

    if (this._image && this._image.readyState >= 4) {
      this._flagVideo = true;
    }

    return this;

  },

  /**
   * @name Two.Texture#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagSrc = this._flagImage = this._flagLoaded
      = this._flagVideo = this._flagScale = this._flagOffset = false;

    return this;

  }

});

Texture.MakeObservable(Texture.prototype);

export default Texture;