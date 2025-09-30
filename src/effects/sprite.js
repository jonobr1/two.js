import { lerp } from '../utils/math.js';
import { _ } from '../utils/underscore.js';

import { Vector } from '../vector.js';
import { Rectangle } from '../shapes/rectangle.js';
import { Texture } from './texture.js';

/**
 * @name Two.Sprite
 * @class
 * @extends Two.Rectangle
 * @param {String|Two.Texture} [path] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the sprite.
 * @param {Number} [ox=0] - The initial `x` position of the Two.Sprite.
 * @param {Number} [oy=0] - The initial `y` position of the Two.Sprite.
 * @param {Number} [cols=1] - The number of columns the sprite contains.
 * @param {Number} [rows=1] - The number of rows the sprite contains.
 * @param {Number} [frameRate=0] - The frame rate at which the partitions of the image should playback at.
 * @description A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.
 */
export class Sprite extends Rectangle {
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

  constructor(path, ox, oy, cols, rows, frameRate) {
    super(ox, oy, 0, 0);

    this._renderer.type = 'sprite';

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this.noStroke();
    this.noFill();

    /**
     * @name Two.Sprite#texture
     * @property {Two.Texture} - The texture to be used as bitmap data to display image in the scene.
     */
    if (path instanceof Texture) {
      this.texture = path;
    } else if (typeof path === 'string') {
      this.texture = new Texture(path);
    }

    this.origin = new Vector();

    this._update();

    /**
     * @name Two.Sprite#columns
     * @property {Number} - The number of columns to split the texture into. Defaults to `1`.
     */
    if (typeof cols === 'number') {
      this.columns = cols;
    }

    /**
     * @name Two.Sprite#rows
     * @property {Number} - The number of rows to split the texture into. Defaults to `1`.
     */
    if (typeof rows === 'number') {
      this.rows = rows;
    }

    /**
     * @name Two.Sprite#frameRate
     * @property {Number} - The number of frames to animate against per second. Defaults to `0` for non-animated sprites.
     */
    if (typeof frameRate === 'number') {
      this.frameRate = frameRate;
    }

    /**
     * @name Two.Sprite#index
     * @property {Number} - The index of the current tile of the sprite to display. Defaults to `0`.
     */
    this.index = 0;
  }

  /**
   * @name Two.Sprite.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Sprite}.
   */
  static Properties = [
    'texture',
    'columns',
    'rows',
    'frameRate',
    'index',
    'firstFrame',
    'lastFrame',
    'loop',
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
    const sprite = new Sprite().copy(obj);

    if ('id' in obj) {
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

    for (let i = 0; i < Sprite.Properties.length; i++) {
      const k = Sprite.Properties[i];
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
    const clone = new Sprite(
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
    object.renderer.type = 'sprite';
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
    // Call parent dispose for inherited cleanup (vertices, fill/stroke effects)
    super.dispose();

    // Stop animation if playing
    if (this._playing) {
      this._playing = false;
    }

    // Clear animation callbacks
    this._onLastFrame = null;

    // Reset timing properties
    this._startTime = 0;

    // Dispose texture (more thorough than unbind)
    if (this._texture && typeof this._texture.dispose === 'function') {
      this._texture.dispose();
    } else if (this._texture && typeof this._texture.unbind === 'function') {
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
        this._duration = (1000 * this._amount) / this._frameRate;
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
            if (index >= this._lastFrame - 1 && this._onLastFrame) {
              this._onLastFrame(); // Shortcut for chainable sprite animations
            }
          }
        }

        const col = this._index % cols;
        const row = Math.floor(this._index / cols);

        const ox = -width * col + (iw - width) / 2;
        const oy = -height * row + (ih - height) / 2;

        // TODO: Improve performance
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
    this._flagTexture =
      this._flagColumns =
      this._flagRows =
      this._flagFrameRate =
        false;

    super.flagReset.call(this);

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
  columns: {
    enumerable: true,
    get: function () {
      return this._columns;
    },
    set: function (v) {
      this._columns = v;
      this._flagColumns = true;
    },
  },
  rows: {
    enumerable: true,
    get: function () {
      return this._rows;
    },
    set: function (v) {
      this._rows = v;
      this._flagRows = true;
    },
  },
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
