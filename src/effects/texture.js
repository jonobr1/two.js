import { root } from '../utils/root.js';
import { Events } from '../events.js';
import { Element } from '../element.js';
import { TwoError } from '../utils/error.js';
import { CanvasPolyfill } from '../utils/canvas-polyfill.js';

import { Vector } from '../vector.js';
import { Registry } from '../registry.js';

let anchor;
const regex = {
  video: /\.(mp4|webm|ogg)$/i,
  image: /\.(jpe?g|png|gif|tiff|webp)$/i,
  effect: /texture|gradient/i,
};

if (root.document) {
  anchor = document.createElement('a');
}

/**
 * @name Two.Texture
 * @class
 * @extends Two.Element
 * @param {String|HTMLImageElement} [src] - The URL path to an image file or an `<img />` element.
 * @param {Function} [callback] - An optional callback function once the image has been loaded.
 * @description Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See {@link Two.Texture.RegularExpressions} for a full list of supported formats.
 */
export class Texture extends Element {
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
  _src = '';

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
  _repeat = 'no-repeat';

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

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this._renderer.type = 'texture';
    this._renderer.flagOffset = FlagOffset.bind(this);
    this._renderer.flagScale = FlagScale.bind(this);

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
      const loaded = function () {
        this.unbind(Events.Types.load, loaded);
        if (typeof callback === 'function') {
          callback();
        }
      }.bind(this);
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
      const elemString = Object.prototype.toString.call(src);
      if (
        elemString === '[object HTMLImageElement]' ||
        elemString === '[object HTMLCanvasElement]' ||
        elemString === '[object HTMLVideoElement]' ||
        elemString === '[object Image]'
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
  }

  /**
   * @name Two.Texture.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Texture}.
   */
  static Properties = ['src', 'loaded', 'repeat', 'scale', 'offset', 'image'];

  /**
   * @name Two.Texture.fromObject
   * @function
   * @param {Object} obj - Object notation of a {@link Two.Texture} to create a new instance
   * @returns {Two.Texture}
   * @description Create a new {@link Two.Texture} from an object notation of a {@link Two.Texture}.
   * @nota-bene Works in conjunction with {@link Two.Texture#toObject}
   */
  fromObject(obj) {
    const texture = new Texture().copy(obj);

    if ('id' in obj) {
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
      // TODO: Fix for headless environments
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
    return (
      (image && image.nodeName && image.nodeName.toLowerCase()) ||
      // Headless environments
      'img'
    );
  }

  /**
   * @name Two.Texture.getImage
   * @property {Function} - Convenience function to set {@link Two.Texture#image} properties with canonical versions set in {@link Two.Texture.ImageRegistry}.
   * @param {String} src - The URL path of the image.
   * @returns {HTMLImageElement} - Returns either a cached version of the image or a new one that is registered in {@link Two.Texture.ImageRegistry}.
   */
  static getImage(src) {
    const absoluteSrc = Texture.getAbsoluteURL(src);

    if (Texture.ImageRegistry.contains(absoluteSrc)) {
      return Texture.ImageRegistry.get(absoluteSrc);
    }

    let image;

    if (CanvasPolyfill.Image) {
      // TODO: Fix for headless environments
      image = new CanvasPolyfill.Image();
      CanvasPolyfill.shim(image, 'img');
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
    image.referrerPolicy = 'no-referrer';

    return image;
  }

  /**
   * @name Two.Texture.Register
   * @interface
   * @description A collection of functions to register different types of textures. Used internally by a {@link Two.Texture}.
   */
  static Register = {
    canvas: function (texture, callback) {
      texture._src = '#' + texture.id;
      Texture.ImageRegistry.add(texture.src, texture.image);
      if (typeof callback === 'function') {
        callback();
      }
    },
    img: function (texture, callback) {
      const image = texture.image;

      const loaded = function (e) {
        if (
          !CanvasPolyfill.isHeadless &&
          image.removeEventListener &&
          typeof image.removeEventListener === 'function'
        ) {
          image.removeEventListener('load', loaded, false);
          image.removeEventListener('error', error, false);
        }
        if (typeof callback === 'function') {
          callback();
        }
      };
      const error = function (e) {
        if (
          !CanvasPolyfill.isHeadless &&
          typeof image.removeEventListener === 'function'
        ) {
          image.removeEventListener('load', loaded, false);
          image.removeEventListener('error', error, false);
        }
        throw new TwoError('unable to load ' + texture.src);
      };

      if (
        typeof image.width === 'number' &&
        image.width > 0 &&
        typeof image.height === 'number' &&
        image.height > 0
      ) {
        loaded();
      } else if (
        !CanvasPolyfill.isHeadless &&
        typeof image.addEventListener === 'function'
      ) {
        image.addEventListener('load', loaded, false);
        image.addEventListener('error', error, false);
      }

      texture._src = Texture.getAbsoluteURL(texture._src);

      if (
        !CanvasPolyfill.isHeadless &&
        image &&
        image.getAttribute('two-src')
      ) {
        return;
      }

      if (!CanvasPolyfill.isHeadless) {
        image.setAttribute('two-src', texture.src);
      }

      Texture.ImageRegistry.add(texture.src, image);

      if (CanvasPolyfill.isHeadless) {
        Texture.loadHeadlessBuffer(texture, loaded);
      } else {
        texture.image.src = texture.src;
      }
    },
    video: function (texture, callback) {
      if (CanvasPolyfill.isHeadless) {
        throw new TwoError(
          'video textures are not implemented in headless environments.'
        );
      }

      const loaded = function (e) {
        texture.image.removeEventListener('canplaythrough', loaded, false);
        texture.image.removeEventListener('error', error, false);
        texture.image.width = texture.image.videoWidth;
        texture.image.height = texture.image.videoHeight;
        if (typeof callback === 'function') {
          callback();
        }
      };
      const error = function (e) {
        texture.image.removeEventListener('canplaythrough', loaded, false);
        texture.image.removeEventListener('error', error, false);
        throw new TwoError('unable to load ' + texture.src);
      };

      texture._src = Texture.getAbsoluteURL(texture._src);

      if (!texture.image.getAttribute('two-src')) {
        texture.image.setAttribute('two-src', texture.src);
        Texture.ImageRegistry.add(texture.src, texture.image);
      }

      if (texture.image.readyState >= 4) {
        loaded();
      } else {
        texture.image.addEventListener('canplaythrough', loaded, false);
        texture.image.addEventListener('error', error, false);
        texture.image.src = texture.src;
        texture.image.load();
      }
    },
  };

  /**
   * @name Two.Texture.load
   * @function
   * @param {Two.Texture} texture - The texture to load.
   * @param {Function} callback - The function to be called once the texture is loaded.
   */
  static load(texture, callback) {
    let image = texture.image;
    let tag = Texture.getTag(image);

    if (texture._flagImage) {
      if (/canvas/i.test(tag)) {
        Texture.Register.canvas(texture, callback);
      } else {
        texture._src =
          (!CanvasPolyfill.isHeadless && image.getAttribute('two-src')) ||
          image.src;
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
  }

  /**
   * @name Two.Texture#clone
   * @function
   * @returns {Two.Texture}
   * @description Create a new instance of {@link Two.Texture} with the same properties of the current texture.
   */
  clone() {
    const clone = new Texture(this.src);
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
    this.offset =
      typeof texture.offset === 'number' || texture.offset instanceof Vector
        ? texture.offset
        : new Vector().copy(texture.offset);
    this.scale =
      typeof texture.scale === 'number' || texture.scale instanceof Vector
        ? texture.scale
        : new Vector().copy(texture.scale);
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

    result.renderer.type = 'texture';
    result.src = this.src;
    result.repeat = this.repeat;
    result.offset = this.offset.toObject();
    result.scale =
      typeof this.scale === 'number' ? this.scale : this.scale.toObject();

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
        Texture.load(
          this,
          function () {
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
    this._flagSrc =
      this._flagImage =
      this._flagLoaded =
      this._flagRepeat =
      this._flagVideo =
      this._flagScale =
      this._flagOffset =
        false;

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

    // Remove gradient from SVG document
    if ('elem' in this._renderer) {
      const elem = this._renderer.elem;
      elem.parentNode.removeChild(elem);
    }
    // Deallocate textures from the graphics card
    if ('effect' in this._renderer) {
      this._renderer.effect = null;
    }
    return this;
  }
}

const proto = {
  src: {
    enumerable: true,
    get: function () {
      return this._src;
    },
    set: function (v) {
      this._src = v;
      this._flagSrc = true;
    },
  },
  loaded: {
    enumerable: true,
    get: function () {
      return this._loaded;
    },
    set: function (v) {
      this._loaded = v;
      this._flagLoaded = true;
    },
  },
  repeat: {
    enumerable: true,
    get: function () {
      return this._repeat;
    },
    set: function (v) {
      this._repeat = v;
      this._flagRepeat = true;
    },
  },

  image: {
    enumerable: true,
    get: function () {
      return this._image;
    },
    set: function (image) {
      const tag = Texture.getTag(image);
      let index;

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
    },
  },

  offset: {
    enumerable: true,
    get: function () {
      return this._offset;
    },
    set: function (v) {
      if (this._offset) {
        this._offset.unbind(Events.Types.change, this._renderer.flagOffset);
      }
      this._offset = v;
      this._offset.bind(Events.Types.change, this._renderer.flagOffset);
      this._flagOffset = true;
    },
  },

  scale: {
    enumerable: true,
    get: function () {
      return this._scale;
    },
    set: function (v) {
      if (this._scale instanceof Vector) {
        this._scale.unbind(Events.Types.change, this._renderer.flagScale);
      }

      this._scale = v;

      if (this._scale instanceof Vector) {
        this._scale.bind(Events.Types.change, this._renderer.flagScale);
      }

      this._flagScale = true;
    },
  },
};

/**
 * @name Two.Texture.FlagOffset
 * @function
 * @description Cached method to let renderers know `offset` has been updated on a {@link Two.Texture}.
 */
function FlagOffset() {
  this._flagOffset = true;
}

/**
 * @name Two.Texture.FlagScale
 * @function
 * @description Cached method to let renderers know `scale` has been updated on a {@link Two.Texture}.
 */
function FlagScale() {
  this._flagScale = true;
}
