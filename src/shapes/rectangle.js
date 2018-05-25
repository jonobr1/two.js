(function(Two) {

  var Path = Two.Path;
  var _ = Two.Utils;

  var Rectangle = Two.Rectangle = function(x, y, width, height) {

    Path.call(this, [
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor(),
      new Two.Anchor()
    ], true, false, true);

    this.width = width;
    this.height = height;
    this._update();

    this.translation.set(x, y);

  };

  _.extend(Rectangle, {

    Properties: ['width', 'height'],

    MakeObservable: function(obj) {
      Path.MakeObservable(obj);
      _.each(Rectangle.Properties, Two.Utils.defineProperty, obj);
    }

  });

  _.extend(Rectangle.prototype, Path.prototype, {

    _width: 0,
    _height: 0,

    _flagWidth: 0,
    _flagHeight: 0,

    constructor: Rectangle,

    _update: function() {

      if (this._flagWidth || this._flagHeight) {

        var xr = this._width / 2;
        var yr = this._height / 2;

        this.vertices[0].set(-xr, -yr).command = Two.Commands.move;
        this.vertices[1].set(xr, -yr).command = Two.Commands.line;
        this.vertices[2].set(xr, yr).command = Two.Commands.line;
        this.vertices[3].set(-xr, yr).command = Two.Commands.line;
        // FYI: Two.Sprite and Two.ImageSequence have 4 verts
        if (this.vertices[4]) {
          this.vertices[4].set(-xr, -yr).command = Two.Commands.line;
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

      parent = parent || this.parent;

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
