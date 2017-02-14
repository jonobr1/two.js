(function(Two) {

  var _ = Two.Utils;

  var Texture = Two.Texture = function(src) {

    this._renderer = {};
    this._renderer.type = 'texture';

    this.id = Two.Identifier + Two.uniqueId();
    this.classList = [];

    if (_.isString(src)) {
      this.src = src;
    } else if (_.isElement(src)) {
      this.image = src;
    }

  };

  _.extend(Texture, {

    Properties: [
      'src',
      'image',
      'loaded'
    ],

    ImageRegistry: new Two.Registry(),

    getImage: function(src) {

      if (Texture.ImageRegistry.contains(src)) {
        return Texture.ImageRegistry.get(src);
      }

      var image = document.createElement('img'); // TODO: What's the Node.js way?
      image.crossOrigin = 'anonymous';

      return image;

    },

    Register: {
      canvas: function(texture, callback) {
        texture._src = '#' + texture.id;
        Texture.ImageRegistry.add(texture.path, texture.image);
        if (_.isFunction(callback)) {
          callback();
        }
      },
      image: function(texture, callback) {
        var loaded = function(e) {
          Texture.ImageRegistry.add(texture.path, texture.image);
          texture.image.removeEventListener('load', loaded, false);
          if (_.isFunction(callback)) {
            callback();
          }
        };
        var error = function(e) {
          throw new Two.Utils.Error('unable to load ' + texture.src);
        };
        texture.image.addEventListener('load', loaded, false);
        texture.image.addEventListener('error', error, false);
        texture.image.src = texture.src;
      }
    },

    load: function(texture, callback) {

      var src = texture.src;
      var image = texture.image;

      if (texture._flagImage) {
        if (/canvas/i.test(image.nodeName)) {
          Texture.Register.canvas(texture, callback)
        } else {
          texture._src = image.src;
          Texture.Register.image(texture, callback);
        }
      }

      if (texture._flagSrc) {
        if (!image) {
          texture.image = Texture.getImage(texture.src);
        }
        Texture.Register.image(texture, callback);
      }

    },

    MakeObservable: function(object) {

      _.each(Texture.Properties, Two.Utils.defineProperty, object);

    }

  });

  _.extend(Texture.prototype, Two.Utils.Events, {

    _flagSrc: false,
    _flagImage: false,
    _flagLoaded: false,

    src: '',
    image: null,
    loaded: false,

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

      if (this._flagSrc || this._flagImage) {
        this.trigger(Two.Events.change);
        this.loaded = false;
        Texture.load(this, _.bind(function() {
          this.loaded = true;
          this.trigger(Two.Events.change);
        }, this));
      }

      return this;

    },

    flagReset: function() {

      this._flagSrc = this._flagImage = this._flagLoaded = false;
      return this;

    }

  });

  Texture.MakeObservable(Texture.prototype);

})(this.Two);