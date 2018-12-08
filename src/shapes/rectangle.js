(function(Two) {

  var Path = Two.Path;
  var _ = Two.Utils;

  var Rectangle = Two.Rectangle = function(x, y, width, height) {

    Path.call(this, [
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor()
      // new Two.Anchor() // TODO: Figure out how to handle this for `beginning` / `ending` animations
    ], true, false, true);

    this.width = width;
    this.height = height;

    this.origin = new Two.Vector();
    this.translation.set(x, y);

    this._update();

  };

  _.extend(Rectangle, {

    Properties: ['width', 'height'],

    MakeObservable: function(object) {

      Path.MakeObservable(object);
      _.each(Rectangle.Properties, Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'origin', {
        enumerable: true,
        get: function() {
          return this._origin;
        },
        set: function(v) {
          if (this._origin) {
            this._origin.unbind(Two.Events.change, this._renderer.flagVertices);
          }
          this._origin = v;
          this._origin.bind(Two.Events.change, this._renderer.flagVertices);
          this._renderer.flagVertices();
        }
      });

    }

  });

  _.extend(Rectangle.prototype, Path.prototype, {

    _width: 0,
    _height: 0,

    _flagWidth: 0,
    _flagHeight: 0,

    _origin: null,

    constructor: Rectangle,

    _update: function() {

      if (this._flagWidth || this._flagHeight) {

        var xr = this._width / 2;
        var yr = this._height / 2;

        this.vertices[0].set(-xr, -yr).add(this._origin).command = Two.Commands.move;
        this.vertices[1].set(xr, -yr).add(this._origin).command = Two.Commands.line;
        this.vertices[2].set(xr, yr).add(this._origin).command = Two.Commands.line;
        this.vertices[3].set(-xr, yr).add(this._origin).command = Two.Commands.line;
        // FYI: Two.Sprite and Two.ImageSequence have 4 verts
        if (this.vertices[4]) {
          this.vertices[4].set(-xr, -yr).add(this._origin).command = Two.Commands.line;
        }

      }

      Path.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = false;
      Path.prototype.flagReset.call(this);

      return this;

    },

    clone: function(parent) {

      var clone = new Rectangle(0, 0, this.width, this.height);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Path.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    }

  });

  Rectangle.MakeObservable(Rectangle.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
