(function(Two, _, Backbone, requestAnimationFrame) {

  var Path = Two.Path;

  var Rectangle = Two.Rectangle = function(x, y, width, height) {

    var w2 = width / 2;
    var h2 = height / 2;

    Path.call(this, [
      new Two.Anchor(-w2, -h2),
      new Two.Anchor(w2, -h2),
      new Two.Anchor(w2, h2),
      new Two.Anchor(-w2, h2)
    ], true);

    this.translation.set(x, y);

  };

  _.extend(Rectangle.prototype, Path.prototype);

  Path.MakeObservable(Rectangle.prototype);

})(
  this.Two,
  typeof require === 'function' && !(typeof define === 'function' && define.amd) ? require('underscore') : this._,
  typeof require === 'function' && !(typeof define === 'function' && define.amd) ? require('backbone') : this.Backbone,
  typeof require === 'function' && !(typeof define === 'function' && define.amd) ? require('requestAnimationFrame') : this.requestAnimationFrame
);
