/**
 * Tests Two.js WebGl Rendering Functionality:
 */

(function() {

  module('WebGLRenderer');

  var getRatio = Two.Utils.getRatio;
  var deviceRatio = getRatio(document.createElement('canvas').getContext('2d'));
  var suffix = '@' + deviceRatio + 'x.png';

  asyncTest('Two.makeLine', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      autostart: true
    }).appendTo(document.body);

    var line = two.makeLine(0, 0, two.width, two.height);

    two.update();

    QUnit.Utils.compare.call(o, './images/canvas/line' + suffix, two.renderer, 'Two.makeLine renders properly.');

  });

  asyncTest('Two.makeRectangle', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100);

    two.update();

    QUnit.Utils.compare.call(o, './images/canvas/rectangle' + suffix, two.renderer, 'Two.makeRectangle renders properly.');

  });

  asyncTest('Two.makeEllipse', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var ellipse = two.makeEllipse(two.width / 2, two.height / 2, 100, 100);

    two.update();

    QUnit.Utils.compare.call(o, './images/canvas/ellipse' + suffix, two.renderer, 'Two.makeEllipse renders properly.');

  });


  asyncTest('Two.makeCircle', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var circle = two.makeCircle(two.width / 2, two.height / 2, 50);

    two.update();

    QUnit.Utils.compare.call(o, './images/canvas/circle' + suffix, two.renderer, 'Two.makeCircle renders properly.');

  });

  asyncTest('Two.makePath', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var amount = 20;
    var phi = 6;
    var points = _.map(_.range(amount), function(i) {
      var pct = i / amount;
      var x = pct * 300 + 50;
      var y = i % 2 ? 25 : 75;
      return new Two.Vector(x, y);
    });
    var poly = two.makePath(points, true);

    two.update();

    QUnit.Utils.compare.call(o, './images/canvas/polygon' + suffix, two.renderer, 'Two.makePath renders properly.');

  });

  asyncTest('Two.makeCurve', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var amount = 20;
    var phi = 6;
    var points = _.map(_.range(amount), function(i) {
      var pct = i / amount;
      var x = pct * 300 + 50;
      var y = i % 2 ? 25 : 75;
      return new Two.Vector(x, y);
    });
    var poly = two.makeCurve(points, true);

    two.update();

    QUnit.Utils.compare.call(o, './images/canvas/curve' + suffix, two.renderer, 'Two.makeCurve renders properly.');

  });

  asyncTest('Two.makeLinearGradient', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var gradient = two.makeLinearGradient(0, - two.height / 2, 0, two.height / 2,
      new Two.Gradient.Stop(0, 'rgb(255, 100, 100)'), new Two.Gradient.Stop(1, 'rgb(100, 100, 255)'));

    var rect = two.makeRectangle(two.width / 2, two.height / 2, two.width / 4, two.height / 4);
    rect.fill = gradient;

    two.update();

    QUnit.Utils.compare.call(o, './images/canvas/linear-gradient' + suffix, two.renderer, 'Two.makeLinearGradient renders properly.');

  });

  asyncTest('Two.makeRadialGradient', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var gradient = two.makeRadialGradient(0, 0, two.height / 2,
      new Two.Gradient.Stop(0, 'rgb(255, 100, 100)'), new Two.Gradient.Stop(1, 'rgb(100, 100, 255)'));

    var rect = two.makeRectangle(two.width / 2, two.height / 2, two.width / 4, two.height / 4);
    rect.fill = gradient;

    two.update();

    QUnit.Utils.compare.call(o, './images/canvas/radial-gradient' + suffix, two.renderer, 'Two.makeLinearGradient renders properly.');

  });

  asyncTest('Styles', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var shape = two.makeRectangle(two.width / 2, two.height / 2, 50, 50);

    shape.rotation = Math.PI / 2;
    shape.scale = 0.5;

    shape.fill = 'lightcoral';
    shape.stroke = '#333';
    shape.linewidth = 10;
    shape.opacity = 0.5;
    shape.join = 'miter';
    shape.cap = 'butt';
    shape.miter = 10;

    shape.closed = false;
    shape.curved = true;

    shape.visible = false;
    shape.visible = true;

    two.update();

    QUnit.Utils.compare.call(o, './images/canvas/styles' + suffix, two.renderer, 'Styles render properly.');

  });

})();
