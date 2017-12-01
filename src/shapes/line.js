(function(Two) {

  var Path = Two.Path;
  var _ = Two.Utils;

  var Line = Two.Line = function(x1, y1, x2, y2) {

    var width = x2 - x1;
    var height = y2 - y1;

    var w2 = width / 2;
    var h2 = height / 2;

    Path.call(this, [
        new Two.Anchor(- w2, - h2),
        new Two.Anchor(w2, h2)
    ]);

    this.translation.set(x1 + w2, y1 + h2);

  };

  _.extend(Line.prototype, Path.prototype);

  Path.MakeObservable(Line.prototype);

})((typeof global !== 'undefined' ? global : this).Two);
