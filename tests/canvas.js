/**
 * Tests Two.js Canvas Rendering Functionality:
 */

(function() {

  module('CanvasRenderer');

  var two = new Two({
    fullscreen: false,
    width: 400,
    height: 400,
    autostart: true,
    type: Two.Types.canvas
  }).appendTo(document.body);

  two.renderer.domElement.style.background = '#efefef';

  asyncTest('Two.makeLine', 1, function() {

    var line = two.makeLine(0, 0, two.width, two.height);

    compare('./images/canvas/line.png', 'Two.makeLine renders appropriately.');

  });

  asyncTest('Two.makeRectangle', 1, function() {

    var rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100);

    compare('./images/canvas/rectangle.png', 'Two.makeRectangle renders appropriately.');

  //   $.get('./images/canvas/line.txt', function(data) {
  //     equal(data, two.renderer.domElement.toDataURL('image/png'), 'Two.makeLine renders properly.');
  //     start();
  //   });

  });

  // test('Two.makeEllipse', 1, function() {

  //   var ellipse = two.makeEllipse(two.width / 2, two.height / 2, 100, 100);
  //   var elem = document.querySelector('#two-' + ellipse.id);

  //   equal(elem.getAttribute('d'), 'M 100.000 0.000 C 100.000 25.257 88.570 52.851 70.711 70.711 C 52.851 88.570 25.257 100.000 0.000 100.000 C -25.257 100.000 -52.851 88.570 -70.711 70.711 C -88.570 52.851 -100.000 25.257 -100.000 0.000 C -100.000 -25.257 -88.570 -52.851 -70.711 -70.711 C -52.851 -88.570 -25.257 -100.000 -0.000 -100.000 C 25.257 -100.000 52.851 -88.570 70.711 -70.711 C 88.570 -52.851 100.000 -25.257 100.000 0.000 Z', 'Two.makeEllipse applies d attribute properly.');

  // });

  // test('Two.makeCircle', 1, function() {

  //   var circle = two.makeCircle(two.width / 2, two.height / 2, 50);
  //   var elem = document.querySelector('#two-' + circle.id);

  //   equal(elem.getAttribute('d'), 'M 50.000 0.000 C 50.000 12.629 44.285 26.426 35.355 35.355 C 26.426 44.285 12.629 50.000 0.000 50.000 C -12.629 50.000 -26.426 44.285 -35.355 35.355 C -44.285 26.426 -50.000 12.629 -50.000 0.000 C -50.000 -12.629 -44.285 -26.426 -35.355 -35.355 C -26.426 -44.285 -12.629 -50.000 -0.000 -50.000 C 12.629 -50.000 26.426 -44.285 35.355 -35.355 C 44.285 -26.426 50.000 -12.629 50.000 0.000 Z', 'Two.makeCircle applies d attribute properly.');

  // });

  // test('Two.makePolygon', 1, function() {

  //   var amount = 20;
  //   var phi = 6;
  //   var points = _.map(_.range(amount), function(i) {
  //     var pct = i / amount;
  //     var x = pct * 300 + 50;
  //     var y = i % 2 ? 25 : 75;
  //     return new Two.Vector(x, y);
  //   });
  //   var poly = two.makePolygon(points, true);
  //   var elem = document.querySelector('#two-' + poly.id);

  //   equal(elem.getAttribute('d'), 'M -142.500 25.000 L -127.500 -25.000 L -112.500 25.000 L -97.500 -25.000 L -82.500 25.000 L -67.500 -25.000 L -52.500 25.000 L -37.500 -25.000 L -22.500 25.000 L -7.500 -25.000 L 7.500 25.000 L 22.500 -25.000 L 37.500 25.000 L 52.500 -25.000 L 67.500 25.000 L 82.500 -25.000 L 97.500 25.000 L 112.500 -25.000 L 127.500 25.000 L 142.500 -25.000', 'Two.makePolygon applies d attribute properly.');

  // });

  // test('Two.makeCurve', 1, function() {

  //   var amount = 20;
  //   var phi = 6;
  //   var points = _.map(_.range(amount), function(i) {
  //     var pct = i / amount;
  //     var x = pct * 300 + 50;
  //     var y = i % 2 ? 375 : 325;
  //     return new Two.Vector(x, y);
  //   });
  //   var curve = two.makeCurve(points, true);
  //   var elem = document.querySelector('#two-' + curve.id);

  //   equal(elem.getAttribute('d'), 'M -142.500 -25.000 C -142.500 -25.000 -144.727 25.000 -127.500 25.000 C -110.273 25.000 -129.727 -25.000 -112.500 -25.000 C -95.273 -25.000 -114.727 25.000 -97.500 25.000 C -80.273 25.000 -99.727 -25.000 -82.500 -25.000 C -65.273 -25.000 -84.727 25.000 -67.500 25.000 C -50.273 25.000 -69.727 -25.000 -52.500 -25.000 C -35.273 -25.000 -54.727 25.000 -37.500 25.000 C -20.273 25.000 -39.727 -25.000 -22.500 -25.000 C -5.273 -25.000 -24.727 25.000 -7.500 25.000 C 9.727 25.000 -9.727 -25.000 7.500 -25.000 C 24.727 -25.000 5.273 25.000 22.500 25.000 C 39.727 25.000 20.273 -25.000 37.500 -25.000 C 54.727 -25.000 35.273 25.000 52.500 25.000 C 69.727 25.000 50.273 -25.000 67.500 -25.000 C 84.727 -25.000 65.273 25.000 82.500 25.000 C 99.727 25.000 80.273 -25.000 97.500 -25.000 C 114.727 -25.000 95.273 25.000 112.500 25.000 C 129.727 25.000 110.273 -25.000 127.500 -25.000 C 144.727 -25.000 142.500 25.000 142.500 25.000', 'Two.makeCurve applies d attribute properly.');

  // });

  // asyncTest('Styles', 8, function() {

  //   var shape = two.makeRectangle(two.width / 2, two.height / 2, 50, 50);
  //   var elem = document.querySelector('#two-' + shape.id);

  //   shape.rotation = Math.PI / 2;
  //   shape.scale = 0.5;

  //   shape.fill = 'lightcoral';
  //   shape.stroke = '#333';
  //   shape.linewidth = 10;
  //   shape.opacity = 0.5;
  //   shape.join = 'miter';
  //   shape.cap = 'butt';
  //   shape.miter = 10;

  //   shape.closed = false;
  //   shape.curved = true;

  //   shape.visible = false;
  //   shape.visible = true;

  //   _.defer(function() {

  //     // Update Rendering
  //     two.update().render();

  //     var matrix = elem.getAttribute('transform');
  //     equal(matrix.match(/matrix\((.*)\)/)[1], shape._matrix.toString(), 'Two.Shape._matrix gets and sets proplery.');

  //     equal(elem.getAttribute('fill'), shape.fill, 'Two.Shape.fill gets and sets properly.');
  //     equal(elem.getAttribute('stroke'), shape.stroke, 'Two.Shape.stroke gets and sets properly.');
  //     equal(elem.getAttribute('stroke-linejoin'), shape.join, 'Two.Shape.join gets and sets properly.');
  //     equal(elem.getAttribute('stroke-linecap'), shape.cap, 'Two.Shape.cap gets and sets properly.');
  //     equal(elem.getAttribute('visibility'), 'visible', 'Two.Shape.visible gets and sets properly.');
  //     equal(elem.getAttribute('stroke-miterlimit'), shape.miter, 'Two.Shape.miter gets and sets properly.');
  //     ok(elem.getAttribute('stroke-opacity') == shape.opacity
  //       && elem.getAttribute('fill-opacity') == shape.opacity, 'Two.Shape.opacity gets and sets properly.');

  //     start();

  //   });

  // });

  /**
   * Utility functions
   */

  function compare(path, message) {

    getFile(path, function(reference) {

      two.renderer.domElement.toBlob(function(data) {

        resemble(reference).compareTo(data).onComplete(function(data) {

          var pct = parseFloat(data.misMatchPercentage);
          console.log(pct, data);
          ok(pct < 0.01, message);
          start();

        });

      }, 'image/png');

    });

  }

  function getFile(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      callback(this.response);
    };
    xhr.send();
  }

})();
