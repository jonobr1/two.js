(function(Two) {

  var _ = Two.Utils;
  var Path = Two.Path;
  var Rectangle = Two.Rectangle;

  /**
   * @name Two.ImageSequence
   * @class
   * @extends Two.Rectangle
   * @param {String|String[]|Two.Texture|Two.Texture[]} paths - A list of URLs or {@link Two.Texture}s.
   * @param {Number} [ox=0] - The initial `x` position of the Two.ImageSequence.
   * @param {Number} [oy=0] - The initial `y` position of the Two.ImageSequence.
   * @param {Integer} [frameRate=30] - The frame rate at which the images should playback at.
   * @description A convenient package to display still or animated images organized as a series of still images.
   */
  var ImageSequence = Two.ImageSequence = function(paths, ox, oy, frameRate) {

    // Not using default constructor of Rectangle due to odd `beginning` / `ending` behavior.
    // See: https://github.com/jonobr1/two.js/issues/383
    Path.call(this, [
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor()
    ], true);

    this._renderer.flagTextures = _.bind(ImageSequence.FlagTextures, this);
    this._renderer.bindTextures = _.bind(ImageSequence.BindTextures, this);
    this._renderer.unbindTextures = _.bind(ImageSequence.UnbindTextures, this);

    this.noStroke();
    this.noFill();

    /**
     * @name Two.ImageSequence#textures
     * @property {Two.Texture[]} - A list of textures to be used as frames for animating the {@link Two.ImageSequence}.
     */
    if (Array.isArray(paths)) {
      this.textures = paths.map(ImageSequence.GenerateTexture.bind(this));
    } else {
      // If just a single path convert into a single Two.Texture
      this.textures = [ImageSequence.GenerateTexture(paths)];
    }

    this.origin = new Two.Vector();

    this._update();
    this.translation.set(ox || 0, oy || 0);

    /**
     * @name Two.ImageSequence#frameRate
     * @property {Integer} - The number of frames to animate against per second.
     */
    if (typeof frameRate === 'number') {
      this.frameRate = frameRate;
    } else {
      this.frameRate = ImageSequence.DefaultFrameRate;
    }

    /**
     * @name Two.ImageSequence#index
     * @property {Integer} - The index of the current tile of the sprite to display. Defaults to `0`.
     */
    this.index = 0;

  };

  _.extend(ImageSequence, {

    /**
     * @name Two.ImageSequence.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.ImageSequence}.
     */
    Properties: [
      'frameRate',
      'index'
    ],

    /**
     * @name Two.ImageSequence.DefaultFrameRate
     * @property The default frame rate that {@link Two.ImageSequence#frameRate} is set to when instantiated.
     */
    DefaultFrameRate: 30,

    /**
     * @name Two.ImageSequence.FlagTextures
     * @function
     * @description Cached method to let renderers know textures have been updated on a {@link Two.ImageSequence}.
     */
    FlagTextures: function() {
      this._flagTextures = true;
    },

    /**
     * @name Two.ImageSequence.BindTextures
     * @function
     * @description Cached method to let {@link Two.ImageSequence} know textures have been added to the instance.
     */
    BindTextures: function(items) {

      var i = items.length;
      while (i--) {
        items[i].bind(Two.Events.change, this._renderer.flagTextures);
      }

      this._renderer.flagTextures();

    },

    /**
     * @name Two.ImageSequence.UnbindVertices
     * @function
     * @description Cached method to let {@link Two.ImageSequence} know textures have been removed from the instance.
     */
    UnbindTextures: function(items) {

      var i = items.length;
      while (i--) {
        items[i].unbind(Two.Events.change, this._renderer.flagTextures);
      }

      this._renderer.flagTextures();

    },

    /**
     * @name Two.ImageSequence.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a {@link Two.ImageSequence} to any object. Handy if you'd like to extend or inherit the {@link Two.ImageSequence} class on a custom class.
     */
    MakeObservable: function(obj) {

      Rectangle.MakeObservable(obj);
      _.each(ImageSequence.Properties, Two.Utils.defineProperty, obj);

      Object.defineProperty(obj, 'textures', {

        enumerable: true,

        get: function() {
          return this._textures;
        },

        set: function(textures) {

          var updateTextures = this._renderer.flagTextures;
          var bindTextures = this._renderer.bindTextures;
          var unbindTextures = this._renderer.unbindTextures;

          // Remove previous listeners
          if (this._textures) {
            this._textures
              .unbind(Two.Events.insert, bindTextures)
              .unbind(Two.Events.remove, unbindTextures);
          }

          // Create new Collection with copy of vertices
          this._textures = new Two.Utils.Collection((textures || []).slice(0));

          // Listen for Collection changes and bind / unbind
          this._textures
            .bind(Two.Events.insert, bindTextures)
            .bind(Two.Events.remove, unbindTextures);

          // Bind Initial Textures
          bindTextures(this._textures);

        }

      });

    },

    /**
     * @name Two.ImageSequence.GenerateTexture
     * @property {Function} - Shorthand function to prepare source image material into readable format by {@link Two.ImageSequence}.
     * @param {String|Two.Texture} textureOrString - The texture or string to create a {@link Two.Texture} from.
     * @description Function used internally by {@link Two.ImageSequence} to parse arguments and return {@link Two.Texture}s.
     * @returns {Two.Texture}
     */
    GenerateTexture: function(obj) {
      if (obj instanceof Two.Texture) {
        return obj;
      } else if (typeof obj === 'string') {
        return new Two.Texture(obj);
      }
    }

  });

  _.extend(ImageSequence.prototype, Rectangle.prototype, {

    /**
     * @name Two.ImageSequence#_flagTextures
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ImageSequence#textures} need updating.
     */
    _flagTextures: false,

    /**
     * @name Two.ImageSequence#_flagFrameRate
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ImageSequence#frameRate} needs updating.
     */
    _flagFrameRate: false,

    /**
     * @name Two.ImageSequence#_flagIndex
     * @private
     * @property {Boolean} - Determines whether the {@link Two.ImageSequence#index} needs updating.
     */
    _flagIndex: false,

    // Private variables

    /**
     * @name Two.ImageSequence#_amount
     * @private
     * @property {Integer} - Number of frames for a given {@link Two.ImageSequence}.
     */
    _amount: 1,

    /**
     * @name Two.ImageSequence#_duration
     * @private
     * @property {Number} - Number of milliseconds a {@link Two.ImageSequence}.
     */
    _duration: 0,

    /**
     * @name Two.ImageSequence#_index
     * @private
     * @property {Integer} - The current frame the {@link Two.ImageSequence} is currently displaying.
     */
    _index: 0,

    /**
     * @name Two.ImageSequence#_startTime
     * @private
     * @property {Milliseconds} - Epoch time in milliseconds of when the {@link Two.ImageSequence} started.
     */
    _startTime: 0,

    /**
     * @name Two.ImageSequence#_playing
     * @private
     * @property {Boolean} - Dictates whether the {@link Two.ImageSequence} is animating or not.
     */
    _playing: false,

    /**
     * @name Two.ImageSequence#_firstFrame
     * @private
     * @property {Integer} - The frame the {@link Two.ImageSequence} should start with.
     */
    _firstFrame: 0,

    /**
     * @name Two.ImageSequence#_lastFrame
     * @private
     * @property {Integer} - The frame the {@link Two.ImageSequence} should end with.
     */
    _lastFrame: 0,

    /**
     * @name Two.ImageSequence#_playing
     * @private
     * @property {Boolean} - Dictates whether the {@link Two.ImageSequence} should loop or not.
     */
    _loop: true,

    // Exposed through getter-setter

    /**
     * @name Two.ImageSequence#_textures
     * @private
     * @see {@link Two.ImageSequence#textures}
     */
    _textures: null,

    /**
     * @name Two.ImageSequence#_frameRate
     * @private
     * @see {@link Two.ImageSequence#frameRate}
     */
    _frameRate: 0,

    /**
     * @name Two.ImageSequence#_origin
     * @private
     * @see {@link Two.ImageSequence#origin}
     */
    _origin: null,

    constructor: ImageSequence,

    /**
     * @name Two.ImageSequence#play
     * @function
     * @param {Integer} [firstFrame=0] - The index of the frame to start the animation with.
     * @param {Integer} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.ImageSequence#textures}.
     * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped.
     * @description Initiate animation playback of a {@link Two.ImageSequence}.
     */
    play: function(firstFrame, lastFrame, onLastFrame) {

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
        this._startTime -= 1000 * Math.abs(this._index - this._firstFrame)
          / this._frameRate;
      }

      return this;

    },

    /**
     * @name Two.ImageSequence#pause
     * @function
     * @description Halt animation playback of a {@link Two.ImageSequence}.
     */
    pause: function() {

      this._playing = false;
      return this;

    },

    /**
     * @name Two.ImageSequence#stop
     * @function
     * @description Halt animation playback of a {@link Two.ImageSequence} and set the current frame back to the first frame.
     */
    stop: function() {

      this._playing = false;
      this._index = this._firstFrame;

      return this;

    },

    /**
     * @name Two.ImageSequence#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.ImageSequence}
     * @description Create a new instance of {@link Two.ImageSequence} with the same properties of the current image sequence.
     */
    clone: function(parent) {

      var clone = new ImageSequence(this.textures, this.translation.x,
        this.translation.y, this.frameRate);

      clone._loop = this._loop;

      if (this._playing) {
        clone.play();
      }

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    /**
     * @name Two.ImageSequence#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the path.
     */
    toObject: function() {
      var object = Rectangle.prototype.toObject.call(this);
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

    /**
     * @name Two.ImageSequence#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update: function() {

      var effects = this._textures;
      var width, height, elapsed, amount, duration, texture;
      var index, frames;

      if (this._flagTextures) {
        this._amount = effects.length;
      }

      if (this._flagFrameRate) {
        this._duration = 1000 * this._amount / this._frameRate;
      }

      if (this._playing && this._frameRate > 0) {

        amount = this._amount;

        if (_.isNaN(this._lastFrame)) {
          this._lastFrame = amount - 1;
        }

        // TODO: Offload perf logic to instance of `Two`.
        elapsed = _.performance.now() - this._startTime;
        frames = this._lastFrame + 1;
        duration = 1000 * (frames - this._firstFrame) / this._frameRate;

        if (this._loop) {
          elapsed = elapsed % duration;
        } else {
          elapsed = Math.min(elapsed, duration);
        }

        index = _.lerp(this._firstFrame, frames, elapsed / duration);
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
              this._onLastFrame();  // Shortcut for chainable sprite animations
            }

          }

        }

      } else if (this._flagIndex || !(this.fill instanceof Two.Texture)) {

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

      Rectangle.prototype._update.call(this);

      return this;

    },

    /**
     * @name Two.ImageSequence#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset: function() {

      this._flagTextures = this._flagFrameRate = false;
      Rectangle.prototype.flagReset.call(this);

      return this;

    }

  });

  ImageSequence.MakeObservable(ImageSequence.prototype);

})((typeof global !== 'undefined' ? global : (this || self || window)).Two);
