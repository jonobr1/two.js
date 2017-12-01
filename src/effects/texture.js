(function(Two) {

  var _ = Two.Utils;
  var anchor;
  var regex = {
    video: /\.(mp4|webm)$/i,
    image: /\.(jpe?g|png|gif|tiff)$/i
  };

  if (this.document) {
    anchor = document.createElement('a');
  }

  var Texture = Two.Texture = function(src, callback) {

    this._renderer = {};
    this._renderer.type = 'texture';
    this._renderer.flagOffset = _.bind(Texture.FlagOffset, this);
    this._renderer.flagScale = _.bind(Texture.FlagScale, this);

    this.id = Two.Identifier + Two.uniqueId();
    this.classList = [];

    this.offset = new Two.Vector();

    if (_.isFunction(callback)) {
      var loaded = _.bind(function() {
        this.unbind(Two.Events.load, loaded);
        if (_.isFunction(callback)) {
          callback();
        }
      }, this);
      this.bind(Two.Events.load, loaded);
    }

    if (_.isString(src)) {
      this.src = src;
    } else if (_.isElement(src)) {
      this.image = src;
    }

    this._update();

  };

  _.extend(Texture, {

    Properties: [
      'src',
      'loaded',
      'repeat'
    ],

    ImageRegistry: new Two.Registry(),

    getAbsoluteURL: function(path) {
      if (!anchor) {
        // TODO: Fix for headless environment
        return path;
      }
      anchor.href = path;
      return anchor.href;
    },

    getImage: function(src) {

      var absoluteSrc = Texture.getAbsoluteURL(src);

      if (Texture.ImageRegistry.contains(absoluteSrc)) {
        return Texture.ImageRegistry.get(absoluteSrc);
      }

      var image;

      if (regex.video.test(absoluteSrc)) {
        image = document.createElement('video');
      } else {
        image = document.createElement('img');
      }

      image.crossOrigin = 'anonymous';

      return image;

    },

    Register: {
      canvas: function(texture, callback) {
        texture._src = '#' + texture.id;
        Texture.ImageRegistry.add(texture.src, texture.image);
        if (_.isFunction(callback)) {
          callback();
        }
      },
      img: function(texture, callback) {

        var loaded = function(e) {
          texture.image.removeEventListener('load', loaded, false);
          texture.image.removeEventListener('error', error, false);
          if (_.isFunction(callback)) {
            callback();
          }
        };
        var error = function(e) {
          texture.image.removeEventListener('load', loaded, false);
          texture.image.removeEventListener('error', error, false);
          throw new Two.Utils.Error('unable to load ' + texture.src);
        };

        if (_.isNumber(texture.image.width) && texture.image.width > 0
          && _.isNumber(texture.image.height) && texture.image.height > 0) {
            loaded();
        } else {
          texture.image.addEventListener('load', loaded, false);
          texture.image.addEventListener('error', error, false);
        }

        texture._src = Texture.getAbsoluteURL(texture._src);

        if (texture.image && texture.image.getAttribute('two-src')) {
          return;
        }

        texture.image.setAttribute('two-src', texture.src);
        Texture.ImageRegistry.add(texture.src, texture.image);
        texture.image.src = texture.src;

      },
      video: function(texture, callback) {

        var loaded = function(e) {
          texture.image.removeEventListener('load', loaded, false);
          texture.image.removeEventListener('error', error, false);
          texture.image.width = texture.image.videoWidth;
          texture.image.height = texture.image.videoHeight;
          texture.image.play();
          if (_.isFunction(callback)) {
            callback();
          }
        };
        var error = function(e) {
          texture.image.removeEventListener('load', loaded, false);
          texture.image.removeEventListener('error', error, false);
          throw new Two.Utils.Error('unable to load ' + texture.src);
        };

        texture._src = Texture.getAbsoluteURL(texture._src);
        texture.image.addEventListener('canplaythrough', loaded, false);
        texture.image.addEventListener('error', error, false);

        if (texture.image && texture.image.getAttribute('two-src')) {
          return;
        }

        texture.image.setAttribute('two-src', texture.src);
        Texture.ImageRegistry.add(texture.src, texture.image);
        texture.image.src = texture.src;
        texture.image.loop = true;
        texture.image.load();

      }
    },

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

    FlagOffset: function() {
      this._flagOffset = true;
    },

    FlagScale: function() {
      this._flagScale = true;
    },

    MakeObservable: function(object) {

      _.each(Texture.Properties, Two.Utils.defineProperty, object);

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
            this._offset.unbind(Two.Events.change, this._renderer.flagOffset);
          }
          this._offset = v;
          this._offset.bind(Two.Events.change, this._renderer.flagOffset);
          this._flagOffset = true;
        }
      });

      Object.defineProperty(object, 'scale', {
        enumerable: true,
        get: function() {
          return this._scale;
        },
        set: function(v) {

          if (this._scale instanceof Two.Vector) {
            this._scale.unbind(Two.Events.change, this._renderer.flagScale);
          }

          this._scale = v;

          if (this._scale instanceof Two.Vector) {
            this._scale.bind(Two.Events.change, this._renderer.flagScale);
          }

          this._flagScale = true;

        }
      });

    }

  });

  _.extend(Texture.prototype, Two.Utils.Events, Two.Shape.prototype, {

    _flagSrc: false,
    _flagImage: false,
    _flagVideo: false,
    _flagLoaded: false,
    _flagRepeat: false,

    _flagOffset: false,
    _flagScale: false,

    _src: '',
    _image: null,
    _loaded: false,
    _repeat: 'no-repeat',

    _scale: 1,
    _offset: null,

    clone: function() {
      return new Texture(this.src);
    },

    toObject: function() {
      return {
        src: this.src,
        image: this.image
      }
    },

    _update: function() {

      if (this._flagSrc || this._flagImage || this._flagVideo) {

        this.trigger(Two.Events.change);

        if (this._flagSrc || this._flagImage) {
          this.loaded = false;
          Texture.load(this, _.bind(function() {
            this.loaded = true;
            this
              .trigger(Two.Events.change)
              .trigger(Two.Events.load);
          }, this));
        }

      }

      if (this._image && this._image.readyState >= 4) {
        this._flagVideo = true;
      }

      return this;

    },

    flagReset: function() {

      this._flagSrc = this._flagImage = this._flagLoaded
        = this._flagVideo = this._flagScale = this._flagOffset = false;

      return this;

    }

  });

  Texture.MakeObservable(Texture.prototype);

})((typeof global !== 'undefined' ? global : this).Two);
