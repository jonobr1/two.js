import { Vector } from '../vector.js';
import { Rectangle } from '../shapes/rectangle.js';
import { Texture } from './texture.js';

/**
 * @name Two.Image
 * @class
 * @extends Two.Rectangle
 * @param {String|Two.Texture} [path] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the image.
 * @param {Number} [ox=0] - The initial `x` position of the Two.Image.
 * @param {Number} [oy=0] - The initial `y` position of the Two.Image.
 * @param {Number} [width=1] - The width to display the image at.
 * @param {Number} [height=1] - The height to display the image at.
 * @param {String} [mode="fill"] - The fill mode
 * @description A convenient package to display images scaled to fit specific dimensions. Unlike {@link Two.Sprite}, this class scales the image to the provided width and height rather than using the image's native dimensions. By default, images are scaled to 'fit' within the bounds while preserving aspect ratio.
 * @nota-bene Two.Image.fit mode in all renderers is not complete
 */
export class Image extends Rectangle {
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
  _mode = 'fill';

  constructor(path, ox, oy, width, height, mode) {
    super(ox, oy, width || 1, height || 1);

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this.noStroke();
    this.noFill();

    /**
     * @name Two.Image#texture
     * @property {Two.Texture} - The texture to be used as bitmap data to display image in the scene.
     */
    if (path instanceof Texture) {
      this.texture = path;
    } else if (typeof path === 'string') {
      this.texture = new Texture(path);
    }

    if (typeof mode === 'string') {
      this.mode = mode;
    }

    this._update();
  }

  /**
   * @name Two.Image.fill
   * @property {String} - Scale image to fill the bounds while preserving aspect ratio.
   */
  static fill = 'fill';

  /**
   * @name Two.Image.fit
   * @property {String} - Scale image to fit within bounds while preserving aspect ratio.
   */
  static fit = 'fit';

  /**
   * @name Two.Image.crop
   * @property {String} - Scale image to fill bounds while preserving aspect ratio, cropping excess.
   */
  static crop = 'crop';

  /**
   * @name Two.Image.tile
   * @property {String} - Repeat image at original size to fill the bounds.
   */
  static tile = 'tile';

  /**
   * @name Two.Image.stretch
   * @property {String} - Stretch image to fill dimensions, ignoring aspect ratio.
   */
  static stretch = 'stretch';

  /**
   * @name Two.Image.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Image}.
   */
  static Properties = ['texture', 'mode'];

  /**
   * @name Two.Image.fromObject
   * @function
   * @param {Object} obj - Object notation of a {@link Two.Image} to create a new instance
   * @returns {Two.Image}
   * @description Create a new {@link Two.Image} from an object notation of a {@link Two.Image}.
   * @nota-bene Works in conjunction with {@link Two.Image#toObject}
   */
  static fromObject(obj) {
    const image = new Image().copy(obj);

    if ('id' in obj) {
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

    for (let i = 0; i < Image.Properties.length; i++) {
      const k = Image.Properties[i];
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
    const clone = new Image(
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
    // Call parent dispose for inherited cleanup (vertices, fill/stroke effects)
    super.dispose();

    // Dispose texture (more thorough than unbind)
    if (this._texture && typeof this._texture.dispose === 'function') {
      this._texture.dispose();
    } else if (this._texture && typeof this._texture.unbind === 'function') {
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

        // Calculate base scale ratios
        const scaleX = rw / iw;
        const scaleY = rh / ih;

        // Apply scaling based on mode
        switch (this._mode) {
          case Image.fill: {
            // Fill within bounds while preserving aspect ratio
            const scale = Math.max(scaleX, scaleY);
            effect.scale = scale;
            effect.offset.x = 0;
            effect.offset.y = 0;
            effect.repeat = 'repeat';
            break;
          }

          case Image.fit: {
            // Fit within bounds while preserving aspect ratio
            const scale = Math.min(scaleX, scaleY);
            effect.scale = scale; // TODO: For SVG this works `new Vector(scaleX, scaleY);`
            effect.offset.x = 0;
            effect.offset.y = 0;
            effect.repeat = 'no-repeat';
            break;
          }

          case Image.crop: {
            // Allow developer to control everything
            break;
          }

          case Image.tile: {
            // Repeat image from top left corner
            effect.offset.x = (iw - rw) / 2;
            effect.offset.y = (ih - rh) / 2;
            effect.repeat = 'repeat';
            break;
          }

          case Image.stretch:
          default: {
            // Stretch the image texture to whatever the dimensions of the rect are
            effect.scale = new Vector(scaleX, scaleY);
            effect.offset.x = 0;
            effect.offset.y = 0;
            effect.repeat = 'repeat';
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
}

const proto = {
  texture: {
    enumerable: true,
    get: function () {
      return this._texture;
    },
    set: function (v) {
      this._texture = v;
      this._flagTexture = true;
    },
  },
  mode: {
    enumerable: true,
    get: function () {
      return this._mode;
    },
    set: function (v) {
      this._mode = v;
      this._flagMode = true;
    },
  },
};
