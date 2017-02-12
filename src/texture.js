(function(Two) {

  var _ = Two.Utils;

  var Texture = Two.Texture = function(src) {

    this._renderer = {};

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

    ImageRegistry: {},

    getImage: function(src) {

      if (src in Texture.ImageRegistry) {
        return Texture.ImageRegistry[src];
      }

      return document.createElement('img'); // TODO: What's the Node.js way?

    },

    Register: {
      canvas: function(texture, callback) {
        // TODO: Check to see if `texture.image` already exists in registry.
        texture.path = '#' + texture.id;
        register(texture);
        if (_.isFunction(callback)) {
          callback();
        }
      },
      image: function(texture, callback) {
        // TODO: Check to see if `texture.image` already exists in registry.
        var loaded = function(e) {
          if (_.isFunction(callback)) {
            callback();
          }
        };
        texture.image.addEventListener('load', loaded, false);
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

  _.extend(Texture.prototype, {

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
        this.loaded = false;
        Texture.load(this, _.bind(function() {
          this.loaded = true;
        }, this));
      }

      return this;

    },

    flagReset: function() {

      this._flagSrc = this._flagImage = this._flagLoaded = false;
      return this;

    }

  });

  function register(texture) {
    Texture.ImageRegistry[texture.path] = texture.image;
    // TODO: Also add an array version?
  }

  Texture.MakeObservable(Texture.prototype);

})();