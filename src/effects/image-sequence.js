import { Collection } from '../collection.js';
import { Events } from '../events.js';
import { lerp } from '../utils/math.js';
import { _ } from '../utils/underscore.js';

import { Vector } from '../vector.js';
import { Rectangle } from '../shapes/rectangle.js';
import { Texture } from './texture.js';

/**
 * @name Two.ImageSequence
 * @class
 * @extends Two.Rectangle
 * @param {String|String[]|Two.Texture|Two.Texture[]} [paths] - A list of URLs or {@link Two.Texture}s.
 * @param {Number} [ox=0] - The initial `x` position of the Two.ImageSequence.
 * @param {Number} [oy=0] - The initial `y` position of the Two.ImageSequence.
 * @param {Number} [frameRate=30] - The frame rate at which the images should playback at.
 * @description A convenient package to display still or animated images organized as a series of still images.
 */
export class ImageSequence extends Rectangle {
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

  constructor(paths, ox, oy, frameRate) {
    super(ox, oy, 0, 0);

    this._renderer.type = 'image-sequence';

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this._renderer.flagTextures = FlagTextures.bind(this);
    this._renderer.bindTextures = BindTextures.bind(this);
    this._renderer.unbindTextures = UnbindTextures.bind(this);

    this.noStroke();
    this.noFill();

    /**
     * @name Two.ImageSequence#textures
     * @property {Two.Texture[]} - A list of textures to be used as frames for animating the {@link Two.ImageSequence}.
     */
    if (Array.isArray(paths)) {
      this.textures = paths.map(GenerateTexture.bind(this));
    } else if (typeof paths === 'string') {
      // If just a single path convert into a single Two.Texture
      this.textures = [GenerateTexture(paths)];
    }

    this.origin = new Vector();

    this._update();

    /**
     * @name Two.ImageSequence#frameRate
     * @property {Number} - The number of frames to animate against per second.
     */
    if (typeof frameRate === 'number') {
      this.frameRate = frameRate;
    } else {
      this.frameRate = ImageSequence.DefaultFrameRate;
    }

    /**
     * @name Two.ImageSequence#index
     * @property {Number} - The index of the current tile of the sprite to display. Defaults to `0`.
     */
    this.index = 0;
  }

  /**
   * @name Two.ImageSequence.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.ImageSequence}.
   */
  static Properties = [
    'textures',
    'frameRate',
    'index',
    'firstFrame',
    'lastFrame',
    'loop',
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
    const sequence = new ImageSequence().copy(obj);

    if ('id' in obj) {
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

    for (let i = 0; i < ImageSequence.Properties.length; i++) {
      const k = ImageSequence.Properties[i];
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

    if (typeof firstFrame === 'number') {
      this._firstFrame = firstFrame;
    }
    if (typeof lastFrame === 'number') {
      this._lastFrame = lastFrame;
    }
    if (typeof onLastFrame === 'function') {
      this._onLastFrame = onLastFrame;
    } else {
      delete this._onLastFrame;
    }

    if (this._index !== this._firstFrame) {
      this._startTime -=
        (1000 * Math.abs(this._index - this._firstFrame)) / this._frameRate;
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
    const clone = new ImageSequence(
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
    object.renderer.type = 'image-sequence';
    object.textures = this.textures.map(function (texture) {
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
    // Call parent dispose to preserve renderer type and unbind events
    super.dispose();

    // Stop animation if playing
    if (this._playing) {
      this._playing = false;
    }

    // Clear animation callbacks
    this._onLastFrame = null;

    // Unbind textures collection events
    if (this.textures && typeof this.textures.unbind === 'function') {
      try {
        this.textures.unbind();
      } catch (e) {
        // Ignore unbind errors for incomplete Collection objects
      }
    }

    // Dispose individual textures (more thorough than unbind)
    if (this.textures) {
      for (let i = 0; i < this.textures.length; i++) {
        const texture = this.textures[i];
        if (typeof texture.dispose === 'function') {
          texture.dispose();
        } else if (typeof texture.unbind === 'function') {
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
        this._duration = (1000 * this._amount) / this._frameRate;
      }

      if (this._playing && this._frameRate > 0) {
        amount = this._amount;

        if (_.isNaN(this._lastFrame)) {
          this._lastFrame = amount - 1;
        }

        // TODO: Offload perf logic to instance of `Two`.
        elapsed = _.performance.now() - this._startTime;
        frames = this._lastFrame + 1;
        duration = (1000 * (frames - this._firstFrame)) / this._frameRate;

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
              this._onLastFrame(); // Shortcut for chainable sprite animations
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
}

const proto = {
  frameRate: {
    enumerable: true,
    get: function () {
      return this._frameRate;
    },
    set: function (v) {
      this._frameRate = v;
      this._flagFrameRate = true;
    },
  },
  index: {
    enumerable: true,
    get: function () {
      return this._index;
    },
    set: function (v) {
      this._index = v;
      this._flagIndex = true;
    },
  },
  textures: {
    enumerable: true,
    get: function () {
      return this._textures;
    },
    set: function (textures) {
      const bindTextures = this._renderer.bindTextures;
      const unbindTextures = this._renderer.unbindTextures;

      // Remove previous listeners
      if (this._textures) {
        this._textures
          .unbind(Events.Types.insert, bindTextures)
          .unbind(Events.Types.remove, unbindTextures);
      }

      // Create new Collection with copy of vertices
      this._textures = new Collection((textures || []).slice(0));

      // Listen for Collection changes and bind / unbind
      this._textures
        .bind(Events.Types.insert, bindTextures)
        .bind(Events.Types.remove, unbindTextures);

      // Bind Initial Textures
      bindTextures(this._textures);
    },
  },
  firstFrame: {
    enumerable: true,
    get: function () {
      return this._firstFrame;
    },
    set: function (v) {
      this._firstFrame = v;
    },
  },
  lastFrame: {
    enumerable: true,
    get: function () {
      return this._lastFrame;
    },
    set: function (v) {
      this._lastFrame = v;
    },
  },
  loop: {
    enumerable: true,
    get: function () {
      return this._loop;
    },
    set: function (v) {
      this._loop = !!v;
    },
  },
};

/**
 * @name FlagTextures
 * @private
 * @function
 * @description Cached method to let renderers know textures have been updated on a {@link Two.ImageSequence}.
 */
function FlagTextures() {
  this._flagTextures = true;
}

/**
 * @name BindTextures
 * @private
 * @function
 * @description Cached method to let {@link Two.ImageSequence} know textures have been added to the instance.
 */
function BindTextures(items) {
  let i = items.length;
  while (i--) {
    items[i].bind(Events.Types.change, this._renderer.flagTextures);
  }

  this._renderer.flagTextures();
}

/**
 * @name UnbindTextures
 * @private
 * @function
 * @description Cached method to let {@link Two.ImageSequence} know textures have been removed from the instance.
 */
function UnbindTextures(items) {
  let i = items.length;
  while (i--) {
    items[i].unbind(Events.Types.change, this._renderer.flagTextures);
  }

  this._renderer.flagTextures();
}

/**
 * @name GenerateTexture
 * @private
 * @property {Function} - Shorthand function to prepare source image material into readable format by {@link Two.ImageSequence}.
 * @param {String|Two.Texture} textureOrString - The texture or string to create a {@link Two.Texture} from.
 * @description Function used internally by {@link Two.ImageSequence} to parse arguments and return {@link Two.Texture}s.
 * @returns {Two.Texture}
 */
function GenerateTexture(obj) {
  if (obj instanceof Texture) {
    return obj;
  } else if (typeof obj === 'string') {
    return new Texture(obj);
  }
}
