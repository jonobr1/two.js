/**
 * Tests Two.js WebGl Rendering Functionality:
 */

(function() {

  module('WebGlRenderer');

  var deviceRatio = Two[Two.Types.canvas].Utils.getRatio(document.createElement('canvas').getContext('2d'));
  var suffix = '@' + deviceRatio + 'x.png';

  asyncTest('Two.makeLine', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      autostart: true
    }).appendTo(document.body);

    var line = two.makeLine(0, 0, two.width, two.height);

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/line' + suffix, two.renderer, 'Two.makeLine renders properly.');

    });

  });

  asyncTest('Two.makeRectangle', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100);

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/rectangle' + suffix, two.renderer, 'Two.makeRectangle renders properly.');

    });

  });

  asyncTest('Two.makeEllipse', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var ellipse = two.makeEllipse(two.width / 2, two.height / 2, 100, 100);

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/ellipse' + suffix, two.renderer, 'Two.makeEllipse renders properly.');

    });

  });


  asyncTest('Two.makeCircle', 1, function(o) {

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    });

    var circle = two.makeCircle(two.width / 2, two.height / 2, 50);

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/circle' + suffix, two.renderer, 'Two.makeCircle renders properly.');

    });

  });

  asyncTest('Two.makePolygon', 1, function(o) {

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
    var poly = two.makePolygon(points, true);

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/polygon' + suffix, two.renderer, 'Two.makePolygon renders properly.');

    });

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

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/curve' + suffix, two.renderer, 'Two.makeCurve renders properly.');

    });

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

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/styles' + suffix, two.renderer, 'Styles render properly.');

    });

  });

  /**
   * Utility functions
   */

  function compare(path, renderer, message, callback) {

    var _this = this;

    getFile(path, function(reference) {

      var data = renderer.domElement.toDataURL('image/png');
      resemble(reference).compareTo(data).onComplete(function(data) {

        var pct = parseFloat(data.misMatchPercentage);

        ok(pct <= 1, message);
        start();

        var img = document.createElement('img');
        img.src = path;
        img.title = 'Reference Image';
        img.width = img.height = 400;

        var domElement = document.createElement('li');
        renderer.domElement.title = 'Computed Image';

        domElement.appendChild(img);
        domElement.appendChild(renderer.domElement);

        _.delay(function() {
          document.querySelector('#' + _this.id + ' ol').appendChild(domElement);
        }, 100);

      });

    });

  }

  function getFile(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);

    if (window.URL) {
      xhr.responseType = 'blob';
    } else {
      xhr.responseType = 'arraybuffer';
    }

    xhr.onload = function(e) {

      if (window.URL) {
        callback(this.response);
      } else {
        //-- Safari doesn't support responseType blob, so create a blob from arraybuffer
        callback(new Blob([this.response], { "type" : 'image/png' }));
      }

    };
    xhr.send();
  }

})();
