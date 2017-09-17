/**
 * Tests Two.js WebGl Rendering Functionality:
 */

(function() {

  QUnit.module('WebGLRenderer');

  var getRatio = function (v) { return Math.round(Two.Utils.getRatio(v)) };
  var deviceRatio = getRatio(document.createElement('canvas').getContext('2d'));
  var suffix = '@' + deviceRatio + 'x.png';

  QUnit.test('Two.makeLine', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
    }).appendTo(document.body);

    var line = two.makeLine(0, 0, two.width, two.height);

    two.update();

    QUnit.Utils.compare.call(assert, './images/canvas/line' + suffix, two.renderer, 'Two.makeLine renders properly.');

  });

  QUnit.test('Two.makeRectangle', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
    });

    var rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100);

    two.update();

    QUnit.Utils.compare.call(assert, './images/canvas/rectangle' + suffix, two.renderer, 'Two.makeRectangle renders properly.');

  });

  QUnit.test('Two.makeEllipse', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
    });

    var ellipse = two.makeEllipse(two.width / 2, two.height / 2, 100, 100);

    two.update();

    QUnit.Utils.compare.call(assert, './images/canvas/ellipse' + suffix, two.renderer, 'Two.makeEllipse renders properly.');

  });


  QUnit.test('Two.makeCircle', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
    });

    var circle = two.makeCircle(two.width / 2, two.height / 2, 50);

    two.update();

    QUnit.Utils.compare.call(assert, './images/canvas/circle' + suffix, two.renderer, 'Two.makeCircle renders properly.');

  });

  QUnit.test('Two.makePath', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
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

    QUnit.Utils.compare.call(assert, './images/canvas/polygon' + suffix, two.renderer, 'Two.makePath renders properly.');

  });

  QUnit.test('Two.makeCurve', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
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

    QUnit.Utils.compare.call(assert, './images/canvas/curve' + suffix, two.renderer, 'Two.makeCurve renders properly.');

  });

  QUnit.test('Two.makeLinearGradient', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
    });

    var gradient = two.makeLinearGradient(0, - two.height / 2, 0, two.height / 2,
      new Two.Gradient.Stop(0, 'rgb(255, 100, 100)'), new Two.Gradient.Stop(1, 'rgb(100, 100, 255)'));

    var rect = two.makeRectangle(two.width / 2, two.height / 2, two.width / 4, two.height / 4);
    rect.fill = gradient;

    two.update();

    QUnit.Utils.compare.call(assert, './images/canvas/linear-gradient' + suffix, two.renderer, 'Two.makeLinearGradient renders properly.');

  });

  QUnit.test('Two.makeRadialGradient', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
    });

    var gradient = two.makeRadialGradient(0, 0, two.height / 2,
      new Two.Gradient.Stop(0, 'rgb(255, 100, 100)'), new Two.Gradient.Stop(1, 'rgb(100, 100, 255)'));

    var rect = two.makeRectangle(two.width / 2, two.height / 2, two.width / 4, two.height / 4);
    rect.fill = gradient;

    two.update();

    QUnit.Utils.compare.call(assert, './images/canvas/radial-gradient' + suffix, two.renderer, 'Two.makeLinearGradient renders properly.');

  });

  QUnit.test('Two.makeText', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
    });

    var text = two.makeText('Hello World', two.width / 2, two.height / 2);
    text.fill = '#00aeff';
    text.noStroke();

    two.update();

    QUnit.Utils.compare.call(assert, './images/canvas/text' + suffix, two.renderer, 'Two.makeText renders properly.');

  });

  QUnit.test('Styles', function(assert) {

    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio
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

    QUnit.Utils.compare.call(assert, './images/canvas/styles' + suffix, two.renderer, 'Styles render properly.');

  });

})();
