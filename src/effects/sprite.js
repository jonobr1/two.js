(function(Two) {

  var _ = Two.Utils;
  var Path = Two.Path;
  var Rectangle = Two.Rectangle;

  var Sprite = Two.Sprite = function(path, ox, oy, cols, rows, frameRate) {

    Path.call(this, [
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor()
    ], true);

    this.noStroke();
    this.noFill();

    if (path instanceof Two.Texture) {
      this.texture = path;
    } else if (_.isString(path)) {
      this.texture = new Two.Texture(path);
    }

    this._update();
    this.translation.set(ox || 0, oy || 0);

    if (_.isNumber(cols)) {
      this.columns = cols;
    }
    if (_.isNumber(rows)) {
      this.rows = rows;
    }
    if (_.isNumber(frameRate)) {
      this.frameRate = frameRate;
    }

  };

  _.extend(Sprite, {

    Properties: [
      'texture', 'columns', 'rows', 'frameRate', 'index'
    ],

    MakeObservable: function(obj) {

      Rectangle.MakeObservable(obj);
      _.each(Sprite.Properties, Two.Utils.defineProperty, obj);

    }

  })

  _.extend(Sprite.prototype, Rectangle.prototype, {

    _flagTexture: false,
    _flagColumns: false,
    _flagRows: false,
    _flagFrameRate: false,
    flagIndex: false,

    // Private variables
    _amount: 1,
    _duration: 0,
    _startTime: 0,
    _playing: false,
    _firstFrame: 0,
    _lastFrame: 0,
    _loop: true,

    // Exposed through getter-setter
    _texture: null,
    _columns: 1,
    _rows: 1,
    _frameRate: 0,
    _index: 0,

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

    pause: function() {

      this._playing = false;
      return this;

    },

    stop: function() {

      this._playing = false;
      this._index = 0;

      return this;

    },

    clone: function(parent) {

      parent = parent || this.parent;

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

    flagReset: function() {

      this._flagTexture = this._flagColumns = this._flagRows
        = this._flagFrameRate = false;

      Rectangle.prototype.flagReset.call(this);

      return this;
    }


  });

  Sprite.MakeObservable(Sprite.prototype);

})((typeof global !== 'undefined' ? global : this).Two);
