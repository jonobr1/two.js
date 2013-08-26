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
    var elem = two.renderer.domElement.querySelector('#two-' + line.id);

    two.render();

    equal(elem.getAttribute('d'), 'M -200.000 -200.000 L 200.000 200.000', 'Two.makeLine applies d attribute properly.');

    addSvgToTest(o, two);

  });

  test('Two.makeRectangle', 1, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100);
    var elem = two.renderer.domElement.querySelector('#two-' + rect.id);

    two.render();

    equal(elem.getAttribute('d'), 'M 50.000 50.000 L -50.000 50.000 L -50.000 -50.000 L 50.000 -50.000 Z', 'Two.makeRectangle applies d attribute properly.');

    addSvgToTest(o, two);

  });

  test('Two.makeEllipse', 1, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var ellipse = two.makeEllipse(two.width / 2, two.height / 2, 100, 100);
    var elem = two.renderer.domElement.querySelector('#two-' + ellipse.id);

    two.render();

    equal(elem.getAttribute('d'), 'M 100.000 0.000 C 100.000 25.257 88.570 52.851 70.711 70.711 C 52.851 88.570 25.257 100.000 0.000 100.000 C -25.257 100.000 -52.851 88.570 -70.711 70.711 C -88.570 52.851 -100.000 25.257 -100.000 0.000 C -100.000 -25.257 -88.570 -52.851 -70.711 -70.711 C -52.851 -88.570 -25.257 -100.000 -0.000 -100.000 C 25.257 -100.000 52.851 -88.570 70.711 -70.711 C 88.570 -52.851 100.000 -25.257 100.000 0.000 Z', 'Two.makeEllipse applies d attribute properly.');

    addSvgToTest(o, two);

  });

  test('Two.makeCircle', 1, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var circle = two.makeCircle(two.width / 2, two.height / 2, 50);
    var elem = two.renderer.domElement.querySelector('#two-' + circle.id);

    two.render();

    equal(elem.getAttribute('d'), 'M 50.000 0.000 C 50.000 12.629 44.285 26.426 35.355 35.355 C 26.426 44.285 12.629 50.000 0.000 50.000 C -12.629 50.000 -26.426 44.285 -35.355 35.355 C -44.285 26.426 -50.000 12.629 -50.000 0.000 C -50.000 -12.629 -44.285 -26.426 -35.355 -35.355 C -26.426 -44.285 -12.629 -50.000 -0.000 -50.000 C 12.629 -50.000 26.426 -44.285 35.355 -35.355 C 44.285 -26.426 50.000 -12.629 50.000 0.000 Z', 'Two.makeCircle applies d attribute properly.');

    addSvgToTest(o, two);

  });

  test('Two.makePolygon', 1, function(o) {

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
    var poly = two.makePolygon(points, true);
    var elem = two.renderer.domElement.querySelector('#two-' + poly.id);

    two.render();

    equal(elem.getAttribute('d'), 'M -142.500 25.000 L -127.500 -25.000 L -112.500 25.000 L -97.500 -25.000 L -82.500 25.000 L -67.500 -25.000 L -52.500 25.000 L -37.500 -25.000 L -22.500 25.000 L -7.500 -25.000 L 7.500 25.000 L 22.500 -25.000 L 37.500 25.000 L 52.500 -25.000 L 67.500 25.000 L 82.500 -25.000 L 97.500 25.000 L 112.500 -25.000 L 127.500 25.000 L 142.500 -25.000', 'Two.makePolygon applies d attribute properly.');

    addSvgToTest(o, two);

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
    var elem = two.renderer.domElement.querySelector('#two-' + curve.id);

    two.render();

    equal(elem.getAttribute('d'), 'M -142.500 25.000 C 50.000 75.000 47.773 25.000 -127.500 -25.000 C 82.227 25.000 62.773 75.000 -112.500 25.000 C 97.227 75.000 77.773 25.000 -97.500 -25.000 C 112.227 25.000 92.773 75.000 -82.500 25.000 C 127.227 75.000 107.773 25.000 -67.500 -25.000 C 142.227 25.000 122.773 75.000 -52.500 25.000 C 157.227 75.000 137.773 25.000 -37.500 -25.000 C 172.227 25.000 152.773 75.000 -22.500 25.000 C 187.227 75.000 167.773 25.000 -7.500 -25.000 C 202.227 25.000 182.773 75.000 7.500 25.000 C 217.227 75.000 197.773 25.000 22.500 -25.000 C 232.227 25.000 212.773 75.000 37.500 25.000 C 247.227 75.000 227.773 25.000 52.500 -25.000 C 262.227 25.000 242.773 75.000 67.500 25.000 C 277.227 75.000 257.773 25.000 82.500 -25.000 C 292.227 25.000 272.773 75.000 97.500 25.000 C 307.227 75.000 287.773 25.000 112.500 -25.000 C 322.227 25.000 302.773 75.000 127.500 25.000 C 337.227 75.000 335.000 25.000 142.500 -25.000', 'Two.makeCurve applies d attribute properly.');

    addSvgToTest(o, two);

  });

  test('Styles', 8, function(o) {

    var two = new Two({
      width: 400,
      height: 400
    });

    var shape = two.makeRectangle(two.width / 2, two.height / 2, 50, 50);
    var elem = two.renderer.domElement.querySelector('#two-' + shape.id);

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
    two.render();

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

    addSvgToTest(o, two);

  });

  function addSvgToTest(o, two) {

    var domElement = document.createElement('li');
    domElement.appendChild(two.renderer.domElement);

    _.delay(function() {
      document.querySelector('#' + o.id + ' ol').appendChild(domElement);
    }, 100);

  }

})();
