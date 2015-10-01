/**
 * Tests Two.js Svg Rendering Functionality:
 */

(function() {

  module('SvgRenderer');

  test('Two.makeLine', 1, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var line = two.makeLine(0, 0, two.width, two.height);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + line.id);

    equal(elem.getAttribute('d'), 'M -200 -200 L 200 200 ', 'Two.makeLine applies d attribute properly.');

    QUnit.Utils.addInstanceToTest(o, two);

  });

  test('Two.makeRectangle', 1, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + rect.id);

    equal(elem.getAttribute('d'), 'M -50 -50 L 50 -50 L 50 50 L -50 50 Z ', 'Two.makeRectangle applies d attribute properly.');

    QUnit.Utils.addInstanceToTest(o, two);

  });

  test('Two.makeEllipse', 1, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var ellipse = two.makeEllipse(two.width / 2, two.height / 2, 100, 100);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + ellipse.id);

    equal(elem.getAttribute('d'), 'M 100 0 C 100 25.257 88.57 52.851 70.71 70.71 C 52.851 88.57 25.257 100 0 100 C -25.258 100 -52.852 88.57 -70.711 70.71 C -88.571 52.851 -100 25.257 -100 0 C -100 -25.258 -88.571 -52.852 -70.711 -70.711 C -52.852 -88.571 -25.258 -100 -0.001 -100 C 25.257 -100 52.851 -88.571 70.71 -70.711 C 88.57 -52.852 100 -25.258 100 0 Z ', 'Two.makeEllipse applies d attribute properly.');

    QUnit.Utils.addInstanceToTest(o, two);

  });

  test('Two.makeCircle', 1, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var circle = two.makeCircle(two.width / 2, two.height / 2, 50);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + circle.id);

    equal(elem.getAttribute('d'), 'M 50 0 C 50 12.628 44.285 26.425 35.355 35.355 C 26.425 44.285 12.628 50 0 50 C -12.629 50 -26.426 44.285 -35.356 35.355 C -44.286 26.425 -50 12.628 -50 0 C -50 -12.629 -44.286 -26.426 -35.356 -35.356 C -26.426 -44.286 -12.629 -50 -0.001 -50 C 12.628 -50 26.425 -44.286 35.355 -35.356 C 44.285 -26.426 50 -12.629 50 0 Z ', 'Two.makeCircle applies d attribute properly.');

    QUnit.Utils.addInstanceToTest(o, two);

  });

  test('Two.makePath', 1, function(o) {

    var two = new Two({
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

    var elem = two.renderer.domElement.querySelector('#' + poly.id);

    equal(elem.getAttribute('d'), 'M -142.5 25 L -127.5 -25 L -112.5 25 L -97.5 -25 L -82.5 25 L -67.5 -25 L -52.5 25 L -37.5 -25 L -22.5 25 L -7.5 -25 L 7.5 25 L 22.5 -25 L 37.5 25 L 52.5 -25 L 67.5 25 L 82.5 -25 L 97.5 25 L 112.5 -25 L 127.5 25 L 142.5 -25 ', 'Two.makePath applies d attribute properly.');

    QUnit.Utils.addInstanceToTest(o, two);

  });

  test('Two.makeCurve', 1, function(o) {

    var two = new Two({
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
    var curve = two.makeCurve(points, true);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + curve.id);

    equal(elem.getAttribute('d'), 'M -142.5 25 C -142.5 25 -144.727 -25 -127.5 -25 C -110.274 -25 -129.727 24.999 -112.5 25 C -95.274 25 -114.727 -25 -97.5 -25 C -80.274 -25 -99.727 24.999 -82.5 25 C -65.274 25 -84.727 -25 -67.5 -25 C -50.274 -25 -69.727 24.999 -52.5 25 C -35.274 25 -54.727 -25 -37.5 -25 C -20.274 -25 -39.727 24.999 -22.5 25 C -5.274 25 -24.727 -25 -7.5 -25 C 9.726 -25 -9.727 24.999 7.5 25 C 24.726 25 5.273 -25 22.5 -25 C 39.726 -25 20.273 24.999 37.5 25 C 54.726 25 35.273 -25 52.5 -25 C 69.726 -25 50.273 24.999 67.5 25 C 84.726 25 65.273 -25 82.5 -25 C 99.726 -25 80.273 24.999 97.5 25 C 114.726 25 95.273 -25 112.5 -25 C 129.726 -25 110.273 24.999 127.5 25 C 144.726 25 142.5 -25 142.5 -25 ');

    QUnit.Utils.addInstanceToTest(o, two);

  });

  test('Two.makeLinearGradient', 7, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var gradient = two.makeLinearGradient(0, - two.height / 2, 0, two.height / 2,
      new Two.Gradient.Stop(0, 'rgb(255, 100, 100)'), new Two.Gradient.Stop(1, 'rgb(100, 100, 255)'));

    var rect = two.makeRectangle(two.width / 2, two.height / 2, two.width / 4, two.height / 4);
    rect.fill = gradient;

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + gradient.id);

    equal(parseFloat(elem.getAttribute('x1')), 0);
    equal(parseFloat(elem.getAttribute('y1')), -200);
    equal(parseFloat(elem.getAttribute('x2')), 0);
    equal(parseFloat(elem.getAttribute('y2')), 200);
    equal(elem.getAttribute('spreadMethod'), 'pad');
    equal(elem.getAttribute('gradientUnits'), 'userSpaceOnUse');
    equal(elem.innerHTML, '<stop offset="0%" stop-color="rgb(255, 100, 100)" stop-opacity="1"></stop><stop offset="100%" stop-color="rgb(100, 100, 255)" stop-opacity="1"></stop>');

    QUnit.Utils.addInstanceToTest(o, two);

  });


  test('Two.makeRadialGradient', 8, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var gradient = two.makeRadialGradient(0, 0, two.width / 2,
      new Two.Gradient.Stop(0, 'rgb(255, 100, 100)'), new Two.Gradient.Stop(1, 'rgb(100, 100, 255)'));

    var rect = two.makeRectangle(two.width / 2, two.height / 2, two.width / 4, two.height / 4);
    rect.fill = gradient;

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + gradient.id);

    equal(parseFloat(elem.getAttribute('cx')), 0);
    equal(parseFloat(elem.getAttribute('cy')), 0);
    equal(parseFloat(elem.getAttribute('fx')), 0);
    equal(parseFloat(elem.getAttribute('fy')), 0);
    equal(parseFloat(elem.getAttribute('r')), 200);
    equal(elem.getAttribute('spreadMethod'), 'pad');
    equal(elem.getAttribute('gradientUnits'), 'userSpaceOnUse');
    equal(elem.innerHTML, '<stop offset="0%" stop-color="rgb(255, 100, 100)" stop-opacity="1"></stop><stop offset="100%" stop-color="rgb(100, 100, 255)" stop-opacity="1"></stop>');

    QUnit.Utils.addInstanceToTest(o, two);

  });


  test('Styles', 8, function(o) {

    var two = new Two({
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

    // Update Rendering
    two.update();

    var elem = two.renderer.domElement.querySelector('#' + shape.id);
    var matrix = elem.getAttribute('transform');
    equal(matrix.match(/matrix\((.*)\)/)[1], shape._matrix.toString(), 'Two.Shape._matrix gets and sets proplery.');

    equal(elem.getAttribute('fill'), shape.fill, 'Two.Shape.fill gets and sets properly.');
    equal(elem.getAttribute('stroke'), shape.stroke, 'Two.Shape.stroke gets and sets properly.');
    equal(elem.getAttribute('stroke-linejoin'), shape.join, 'Two.Shape.join gets and sets properly.');
    equal(elem.getAttribute('stroke-linecap'), shape.cap, 'Two.Shape.cap gets and sets properly.');
    equal(elem.getAttribute('visibility'), 'visible', 'Two.Shape.visible gets and sets properly.');
    equal(elem.getAttribute('stroke-miterlimit'), shape.miter, 'Two.Shape.miter gets and sets properly.');
    ok(elem.getAttribute('stroke-opacity') == shape.opacity
      && elem.getAttribute('fill-opacity') == shape.opacity, 'Two.Shape.opacity gets and sets properly.');

    QUnit.Utils.addInstanceToTest(o, two);

  });

})();
