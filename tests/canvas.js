/**
 * Tests Two.js Canvas Rendering Functionality:
 */

(function() {

  module('CanvasRenderer');

  asyncTest('Two.makeLine', 1, function(o) {

    var two = new Two({
      type: Two.Types.canvas,
      width: 400,
      height: 400
    });

    var line = two.makeLine(0, 0, two.width, two.height);

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/line.png', two.renderer, 'Two.makeLine renders properly.');

    });

  });

  asyncTest('Two.makeRectangle', 1, function(o) {

    var two = new Two({
      type: Two.Types.canvas,
      width: 400,
      height: 400
    });

    var rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100);

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/rectangle.png', two.renderer, 'Two.makeRectangle renders properly.');

    });

  });

  asyncTest('Two.makeEllipse', 1, function(o) {

    var two = new Two({
      type: Two.Types.canvas,
      width: 400,
      height: 400
    });

    var ellipse = two.makeEllipse(two.width / 2, two.height / 2, 100, 100);

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/ellipse.png', two.renderer, 'Two.makeEllipse renders properly.');

    });

  });


  asyncTest('Two.makeCircle', 1, function(o) {

    var two = new Two({
      type: Two.Types.canvas,
      width: 400,
      height: 400
    });

    var circle = two.makeCircle(two.width / 2, two.height / 2, 50);

    _.defer(function() {

      two.render();

      compare.call(o, './images/canvas/circle.png', two.renderer, 'Two.makeCircle renders properly.');

    });

  });

  asyncTest('Two.makePolygon', 1, function(o) {

    var two = new Two({
      type: Two.Types.canvas,
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

      compare.call(o, './images/canvas/polygon.png', two.renderer, 'Two.makePolygon renders properly.');

    });

  });

  asyncTest('Two.makeCurve', 1, function(o) {

    var two = new Two({
      type: Two.Types.canvas,
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

      compare.call(o, './images/canvas/curve.png', two.renderer, 'Two.makeCurve renders properly.');

    });

  });

  asyncTest('Styles', 1, function(o) {

    var two = new Two({
      type: Two.Types.canvas,
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

      compare.call(o, './images/canvas/styles.png', two.renderer, 'Styles render properly.');

    });

  });

  test('DOM Event', 4,function(o){
    var two = new Two({
      width: 400,
      height: 400,
      type: Two.Types.canvas
    });
    var path = [
      new Two.Vector(0,0),
      new Two.Vector(100,25),
      new Two.Vector(0,50),
      new Two.Vector(50,25),
      new Two.Vector(0,0)
    ];
    var fnSpy = this.spy;

    var polygon  = two.makePolygon(path, true);

    var makeAndTriggerSpy = function(event){
      var spy = fnSpy();
      polygon.on(event.type, spy);
      fireEvent(two.renderer.domElement, event);
      return spy;
    };

    var mousedownSpy = makeAndTriggerSpy({'type':'mousedown', 'pageX':62,'pageY':22});
    var mouseupSpy = makeAndTriggerSpy({'type':'mouseup', 'pageX':62,'pageY':22});

    var mousedownSpyFalse = makeAndTriggerSpy({'type':'mousedown', 'pageX':600,'pageY':600});
    var mouseupSpyFalse = makeAndTriggerSpy({'type':'mouseup', 'pageX':5,'pageY':25});

    ok(mousedownSpy.called);
    ok(mouseupSpy.called);
    ok(mousedownSpyFalse.notCalled);
    ok(mouseupSpyFalse.notCalled);

  });

  /**
   * Utility functions
   */

  function compare(path, renderer, message, callback) {

    var _this = this;

    getFile(path, function(reference) {

      renderer.domElement.toBlob(function(data) {

        resemble(reference).compareTo(data).onComplete(function(data) {

          var pct = parseFloat(data.misMatchPercentage);

          ok(pct <= 0, message);
          start();

          var img = document.createElement('img');
          img.src = path;
          img.title = 'Reference Image';

          var domElement = document.createElement('li');
          renderer.domElement.title = 'Computed Image';

          domElement.appendChild(img);
          domElement.appendChild(renderer.domElement);

          _.delay(function() {
            document.querySelector('#' + _this.id + ' ol').appendChild(domElement);
          }, 100);

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

  function fireEvent(element,event){
    var evt, out;
    if (document.createEventObject){
      evt = document.createEventObject();
      evt = _.extend(evt, event);
      out = element.fireEvent('on'+event.type,evt);
    }else{
      evt = document.createEvent("HTMLEvents");
      evt.initEvent(event.type, true, true );
      evt = _.extend(evt, event);
      out = !element.dispatchEvent(evt);
    }
    return out;
  }

})();
