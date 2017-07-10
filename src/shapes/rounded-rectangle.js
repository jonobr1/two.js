(function(Two) {

  var Path = Two.Path;
  var _ = Two.Utils;

  var RoundedRectangle = Two.RoundedRectangle = function(ox, oy, width, height, radius) {

    if (!_.isNumber(radius)) {
      radius = Math.floor(Math.min(width, height) / 12);
    }

    var amount = 10;

    var points = _.map(_.range(amount), function(i) {
      return new Two.Anchor(0, 0, 0, 0, 0, 0,
        i === 0 ? Two.Commands.move : Two.Commands.curve);
    });

    points[points.length - 1].command = Two.Commands.close;

    Path.call(this, points, false, false, true);

    this.width = width;
    this.height = height;
    this.radius = radius;

    this._update();
    this.translation.set(ox, oy);

  };

  _.extend(RoundedRectangle, {

    Properties: ['width', 'height', 'radius'],

    MakeObservable: function(obj) {

      Path.MakeObservable(obj);
      _.each(RoundedRectangle.Properties, Two.Utils.defineProperty, obj);

    }

  });

  _.extend(RoundedRectangle.prototype, Path.prototype, {

    _width: 0,
    _height: 0,
    _radius: 0,

    _flagWidth: false,
    _flagHeight: false,
    _flagRadius: false,

    _update: function() {

      if (this._flagWidth || this._flagHeight || this._flagRadius) {

        var width = this._width;
        var height = this._height;
        var radius = Math.min(Math.max(this._radius, 0),
          Math.min(width, height));

        var v;
        var w = width / 2;
        var h = height / 2;

        v = this.vertices[0];
        v.x = - (w - radius);
        v.y = - h;

        // Upper Right Corner

        v = this.vertices[1];
        v.x = (w - radius);
        v.y = - h;
        v.controls.left.clear();
        v.controls.right.x = radius;
        v.controls.right.y = 0;

        v = this.vertices[2];
        v.x = w;
        v.y = - (h - radius);
        v.controls.right.clear();
        v.controls.left.clear();

        // Bottom Right Corner

        v = this.vertices[3];
        v.x = w;
        v.y = (h - radius);
        v.controls.left.clear();
        v.controls.right.x = 0;
        v.controls.right.y = radius;

        v = this.vertices[4];
        v.x = (w - radius);
        v.y = h;
        v.controls.right.clear();
        v.controls.left.clear();

        // Bottom Left Corner

        v = this.vertices[5];
        v.x = - (w - radius);
        v.y = h;
        v.controls.left.clear();
        v.controls.right.x = - radius;
        v.controls.right.y = 0;

        v = this.vertices[6];
        v.x = - w;
        v.y = (h - radius);
        v.controls.left.clear();
        v.controls.right.clear();

        // Upper Left Corner

        v = this.vertices[7];
        v.x = - w;
        v.y = - (h - radius);
        v.controls.left.clear();
        v.controls.right.x = 0;
        v.controls.right.y = - radius;

        v = this.vertices[8];
        v.x = - (w - radius);
        v.y = - h;
        v.controls.left.clear();
        v.controls.right.clear();

        v = this.vertices[9];
        v.copy(this.vertices[8]);

      }

      Path.prototype._update.call(this);

      return this;

    },

    flagReset: function() {

      this._flagWidth = this._flagHeight = this._flagRadius = false;
      Path.prototype.flagReset.call(this);

      return this;

    }

  });

  RoundedRectangle.MakeObservable(RoundedRectangle.prototype);

})((typeof global !== 'undefined' ? global : this).Two);
