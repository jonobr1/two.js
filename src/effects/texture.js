(function(Two, _, Backbone, requestAnimationFrame) {

  var Texture = Two.Texture = function(reference) {

    var isPath = _.isString(reference);

    var isElement = _.isElement(reference)
      && /(img|canvas)/i.test(reference.tagName);

    var isShape = reference instanceof Two.Group
      || reference instanceof Two.Path;

    if (isPath) {
      this.key = reference;
    } else if (isElement || isShape) {
      this.bitmap = reference;
    }

  };

  _.extend(Texture, {

    /**
     * A canonical map of all bitmap data.
     */
    Registry: {

    },

    registerKey: function(key) {

      var bitmap = Texture.Registry[key];

      if (!!bitmap) {
        // Add an event listener for changes?
        return bitmap;
      }

      // Otherwise we have a path and need to get the image ourselves.

    },

    registerBitmap: function(bitmap) {

      for (var key in Texture.Registry) {
        if (bitmap === Texture.Registry[key]) {
          return key;
        }
      }

      key = bitmap.id = bitmap.id || Two.Identifier + Two.uniqueId();
      Texture.Registry[key] = bitmap;

      return key;

    },

    MakeObservable: function(obj) {

      Two.Shape.MakeObservable(obj);

      Object.defineProperty(obj, 'key', {

        get: function() {
          return this._key;
        },

        set: function(v) {
          this._key = v;
          this._flagKey = true;
        }

      });

      Object.defineProperty(obj, 'bitmap', {

        get: function() {
          return this._bitmap;
        },

        set: function(v) {
          this._bitmap = v;
          this._flagBitmap = true;
        }

      });

    }

  });

  _.extend(Texture.prototype, Two.Shape.prototype, {

    Registry: Texture.Registry

    _flagKey: false,
    _flagBitmap: false,
    _flagTexture: false,

    _update: function() {

      Two.Shape.prototype._update.call(this);

      return this;

    },

    update: function() {

      this._flagTexture = true;
      return this;

    },

    flagReset: function() {

      Two.Shape.prototype.flagReset.call(this);

      this._flagKey = this._flagBitmap = false;

      return this;

    }

  });

  Texture.MakeObservable(Texture.prototype);

})(
  Two,
  typeof require === 'function' ? require('underscore') : _,
  typeof require === 'function' ? require('backbone') : Backbone,
  typeof require === 'function' ? require('requestAnimationFrame') : requestAnimationFrame
);
