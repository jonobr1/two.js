(function(Two) {

  var Path = Two.Path;
  var _ = Two.Utils;

  var Line = Two.Line = function(x1, y1, x2, y2) {

    var width = x2 - x1;
    var height = y2 - y1;

    var w2 = width / 2;
    var h2 = height / 2;

    Path.call(this, [
        new Two.Anchor(x1, y1),
        new Two.Anchor(x2, y2)
    ]);

    this.vertices[0].command = Two.Commands.move;
    this.vertices[1].command = Two.Commands.line;

    this.automatic = false;

  };

  _.extend(Line.prototype, Path.prototype);
  Line.prototype.constructor = Line;

  Path.MakeObservable(Line.prototype);

})((typeof global !== 'undefined' ? global : (this || window)).Two);
