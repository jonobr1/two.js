(function(Two) {

  var _ = Two.Utils;
  var Path = Two.Path;
  var Rectangle = Two.Rectangle;

  /**
   * @name Two.Sprite
   * @class
   * @extends Two.Rectangle
   * @param {String|Two.Texture} [path] - The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the sprite.
   * @param {Number} [ox=0] - The initial `x` position of the Two.Sprite.
   * @param {Number} [oy=0] - The initial `y` position of the Two.Sprite.
   * @param {Integer} [cols=1] - The number of columns the sprite contains.
   * @param {Integer} [rows=1] - The number of rows the sprite contains.
   * @param {Integer} [frameRate=0] - The frame rate at which the partitions of the image should playback at.
   * @description A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas]{@link https://en.wikipedia.org/wiki/Texture_atlas} on Wikipedia..
   */
  var Sprite = Two.Sprite = function(path, ox, oy, cols, rows, frameRate) {

    // Not using default constructor of Rectangle due to odd `beginning` / `ending` behavior.
    // See: https://github.com/jonobr1/two.js/issues/383
    Path.call(this, [
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor()
    ], true);

    this.noStroke();
    this.noFill();

    /**
     * @name Two.Sprite#texture
     * @property {Two.Texture} - The texture to be used as bitmap data to display image in the scene.
     */
    if (path instanceof Two.Texture) {
      this.texture = path;
    } else if (_.isString(path)) {
      this.texture = new Two.Texture(path);
    }

    this.origin = new Two.Vector();

    this._update();
    this.translation.set(ox || 0, oy || 0);

    /**
     * @name Two.Sprite#columns
     * @property {Integer} - The number of columns to split the texture into. Defaults to `1`.
     */
    if (_.isNumber(cols)) {
      this.columns = cols;
    }

    /**
     * @name Two.Sprite#rows
     * @property {Integer} - The number of rows to split the texture into. Defaults to `1`.
     */
    if (_.isNumber(rows)) {
      this.rows = rows;
    }

    /**
     * @name Two.Sprite#frameRate
     * @property {Integer} - The number of frames to animate against per second. Defaults to `0` for non-animated sprites.
     */
    if (_.isNumber(frameRate)) {
      this.frameRate = frameRate;
    }

    /**
     * @name Two.Sprite#index
     * @property {Integer} - The index of the current tile of the sprite to display. Defaults to `0`.
     */
    this.index = 0;

  };

  _.extend(Sprite, {

    /**
     * @name Two.Sprite.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Sprite}.
     */
    Properties: [
      'texture', 'columns', 'rows', 'frameRate', 'index'
    ],

    /**
     * @name Two.Sprite.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a {@link Two.Sprite} to any object. Handy if you'd like to extend or inherit the {@link Two.Sprite} class on a custom class.
     */
    MakeObservable: function(obj) {

      Rectangle.MakeObservable(obj);
      _.each(Sprite.Properties, Two.Utils.defineProperty, obj);

    }

  })

  _.extend(Sprite.prototype, Rectangle.prototype, {

    /**
     * @name Two.Sprite#_flagTexture
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#texture} needs updating.
     */
    _flagTexture: false,

    /**
     * @name Two.Sprite#_flagColumns
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#columns} need updating.
     */
    _flagColumns: false,

    /**
     * @name Two.Sprite#_flagRows
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#rows} need updating.
     */
    _flagRows: false,

    /**
     * @name Two.Sprite#_flagFrameRate
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#flagFrameRate} needs updating.
     */
    _flagFrameRate: false,

    /**
     * @name Two.Sprite#_flagIndex
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Sprite#index} needs updating.
     */
    flagIndex: false,

    // Private variables

    /**
     * @name Two.Sprite#_amount
     * @private
     * @property {Integer} - Number of frames for a given {@link Two.Sprite}.
     */
    _amount: 1,

    /**
     * @name Two.Sprite#_duration
     * @private
     * @property {Number} - Number of milliseconds a {@link Two.Sprite}.
     */
    _duration: 0,

    /**
     * @name Two.Sprite#_startTime
     * @private
     * @property {Milliseconds} - Epoch time in milliseconds of when the {@link Two.Sprite} started.
     */
    _startTime: 0,

    /**
     * @name Two.Sprite#_playing
     * @private
     * @property {Boolean} - Dictates whether the {@link Two.Sprite} is animating or not.
     */
    _playing: false,

    /**
     * @name Two.Sprite#_firstFrame
     * @private
     * @property {Integer} - The frame the {@link Two.Sprite} should start with.
     */
    _firstFrame: 0,

    /**
     * @name Two.Sprite#_lastFrame
     * @private
     * @property {Integer} - The frame the {@link Two.Sprite} should end with.
     */
    _lastFrame: 0,

    /**
     * @name Two.Sprite#_playing
     * @private
     * @property {Boolean} - Dictates whether the {@link Two.Sprite} should loop or not.
     */
    _loop: true,

    // Exposed through getter-setter

    /**
     * @name Two.Sprite#_texture
     * @private
     * @see {@link Two.Sprite#texture}
     */
    _texture: null,

    /**
     * @name Two.Sprite#_columns
     * @private
     * @see {@link Two.Sprite#columns}
     */
    _columns: 1,

    /**
     * @name Two.Sprite#_rows
     * @private
     * @see {@link Two.Sprite#rows}
     */
    _rows: 1,

    /**
     * @name Two.Sprite#_frameRate
     * @private
     * @see {@link Two.Sprite#frameRate}
     */
    _frameRate: 0,

    /**
     * @name Two.Sprite#_index
     * @private
     * @property {Integer} - The current frame the {@link Two.Sprite} is currently displaying.
     */
    _index: 0,

    /**
     * @name Two.Sprite#_origin
     * @private
     * @see {@link Two.Sprite#origin}
     */
    _origin: null,

    constructor: Sprite,

    /**
     * @name Two.Sprite#play
     * @function
     * @param {Integer} [firstFrame=0] - The index of the frame to start the animation with.
     * @param {Integer} [lastFrame] - The index of the frame to end the animation with. Defaults to the last item in the {@link Two.Sprite#textures}.
     * @param {Function} [onLastFrame] - Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped.
     * @description Initiate animation playback of a {@link Two.Sprite}.
     */
    play: function(firstFrame, lastFrame, onLastFrame) {

      this._playing = true;
      this._firstFrame = 0;
      this._lastFrame = this.amount - 1;
      this._startTime = _.performance.now();

      if (_.isNumber(firstFrame)) {
        this._firstFrame = firstFrame;
      }
      if (_.isNumber(lastFrame)) {
        this._lastFrame = lastFrame;
      }
      if (_.isFunction(onLastFrame)) {
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
     * @name Two.Sprite#pause
     * @function
     * @description Halt animation playback of a {@link Two.Sprite}.
     */
    pause: function() {

      this._playing = false;
      return this;

    },

    /**
     * @name Two.Sprite#stop
     * @function
     * @description Halt animation playback of a {@link Two.Sprite} and set the current frame back to the first frame.
     */
    stop: function() {

      this._playing = false;
      this._index = 0;

      return this;

    },

    /**
     * @name Two.Sprite#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Sprite}
     * @description Create a new instance of {@link Two.Sprite} with the same properties of the current sprite.
     */
    clone: function(parent) {

      var clone = new Sprite(
        this.texture, this.translation.x, this.translation.y,
        this.columns, this.rows, this.frameRate
      );

      if (this.playing) {
        clone.play(this._firstFrame, this._lastFrame);
        clone._loop = this._loop;
      }

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    /**
     * @name Two.Sprite#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update: function() {

      var effect = this._texture;
      var cols = this._columns;
      var rows = this._rows;

      var width, height, elapsed, amount, duration;
      var index, iw, ih, isRange, frames;

      if (this._flagColumns || this._flagRows) {
        this._amount = this._columns * this._rows;
      }

      if (this._flagFrameRate) {
        this._duration = 1000 * this._amount / this._frameRate;
      }

      if (this._flagTexture) {
        this.fill = this._texture;
      }

      if (this._texture.loaded) {

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
            if (index >= this._lastFrame - 1 && this._onLastFrame) {
              this._onLastFrame();  // Shortcut for chainable sprite animations
            }
          }

        }

        var col = this._index % cols;
        var row = Math.floor(this._index / cols);

        var ox = - width * col + (iw - width) / 2;
        var oy = - height * row + (ih - height) / 2;

        // TODO: Improve performance
        if (ox !== effect.offset.x) {
          effect.offset.x = ox;
        }
        if (oy !== effect.offset.y) {
          effect.offset.y = oy;
        }

      }

      Rectangle.prototype._update.call(this);

      return this;

    },

    /**
     * @name Two.Sprite#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset: function() {

      this._flagTexture = this._flagColumns = this._flagRows
        = this._flagFrameRate = false;

      Rectangle.prototype.flagReset.call(this);

      return this;
    }


  });

  Sprite.MakeObservable(Sprite.prototype);

})((typeof global !== 'undefined' ? global : (this || self || window)).Two);
