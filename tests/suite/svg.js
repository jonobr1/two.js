/**
 * Tests Two.js Svg Rendering Functionality:
 */

(function () {
  QUnit.module('SVGRenderer');

  QUnit.test('Two.makeLine', function (assert) {
    assert.expect(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var line = two.makeLine(0, 0, two.width, two.height);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + line.id);

    assert.equal(
      elem.getAttribute('d'),
      'M 0 0 L 400 400 ',
      'Two.makeLine applies d attribute properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makeRectangle', function (assert) {
    assert.expect(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var rect = two.makeRectangle(two.width / 2, two.height / 2, 100, 100);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + rect.id);

    assert.equal(
      elem.getAttribute('d'),
      'M -50 -50 L 50 -50 L 50 50 L -50 50 Z ',
      'Two.makeRectangle applies d attribute properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makeEllipse', function (assert) {
    assert.expect(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var ellipse = two.makeEllipse(two.width / 2, two.height / 2, 100, 100);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + ellipse.id);

    assert.equal(
      elem.getAttribute('d'),
      'M 100 0 C 100 55.228474 55.228474 100 0 100 C -55.228475 100 -100 55.228474 -100 0 C -100.000001 -55.228475 -55.228475 -100 -0.000001 -100 C 55.228474 -100.000001 100 -55.228475 100 0 Z ',
      'Two.makeEllipse applies d attribute properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makeCircle', function (assert) {
    assert.expect(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var circle = two.makeCircle(two.width / 2, two.height / 2, 50);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + circle.id);

    assert.equal(
      elem.getAttribute('d'),
      'M 50 0 C 50 27.614237 27.614237 50 0 50 C -27.614238 50 -50 27.614237 -50 0 C -50.000001 -27.614238 -27.614238 -50 -0.000001 -50 C 27.614237 -50.000001 50 -27.614238 50 0 Z ',
      'Two.makeCircle applies d attribute properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makePoints', function (assert) {
    assert.expect(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var points = two.makePoints(200, 200, 205, 200, 195, 200);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + points.id);
    assert.equal(
      elem.getAttribute('d'),
      'M 200 199.5 a 0.5 0.5 0 1 0 0.001 0 ZM 205 199.5 a 0.5 0.5 0 1 0 0.001 0 ZM 195 199.5 a 0.5 0.5 0 1 0 0.001 0 Z',
      'Two.makePoints applies d attribute properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makePath', function (assert) {
    assert.expect(2);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var amount = 20;
    var points = [];
    for (var i = 0; i < amount; i++) {
      var pct = i / amount;
      var x = pct * 300 + 50;
      var y = i % 2 ? 25 : 75;
      points.push(new Two.Anchor(x, y));
    }
    var poly = two.makePath(points, true);
    var path = two.makePath();

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + poly.id);
    assert.equal(
      elem.getAttribute('d'),
      'M -142.5 25 L -127.5 -25 L -112.5 25 L -97.5 -25 L -82.5 25 L -67.5 -25 L -52.5 25 L -37.5 -25 L -22.5 25 L -7.5 -25 L 7.5 25 L 22.5 -25 L 37.5 25 L 52.5 -25 L 67.5 25 L 82.5 -25 L 97.5 25 L 112.5 -25 L 127.5 25 L 142.5 -25 ',
      'Two.makePath applies d attribute properly.'
    );

    elem = two.renderer.domElement.querySelector('#' + path.id);
    assert.equal(
      elem.getAttribute('transform'),
      'matrix(1 0 0 1 0 0)',
      'Two.makePath applies transform attribute properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makeCurve', function (assert) {
    assert.expect(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var amount = 20;
    var points = [];
    for (var i = 0; i < amount; i++) {
      var pct = i / amount;
      var x = pct * 300 + 50;
      var y = i % 2 ? 25 : 75;
      points.push(new Two.Anchor(x, y));
    }
    var curve = two.makeCurve(points, true);

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + curve.id);

    assert.equal(
      elem.getAttribute('d'),
      'M -142.5 25 C -142.5 25 -144.726506 -25 -127.5 -25 C -110.273495 -25 -129.726506 24.999999 -112.5 25 C -95.273495 25 -114.726506 -25 -97.5 -25 C -80.273495 -25 -99.726506 24.999999 -82.5 25 C -65.273495 25 -84.726506 -25 -67.5 -25 C -50.273495 -25 -69.726506 24.999999 -52.5 25 C -35.273495 25 -54.726506 -25 -37.5 -25 C -20.273495 -25 -39.726506 24.999999 -22.5 25 C -5.273495 25 -24.726506 -25 -7.5 -25 C 9.726505 -25 -9.726506 24.999999 7.5 25 C 24.726505 25 5.273494 -25 22.5 -25 C 39.726505 -25 20.273494 24.999999 37.5 25 C 54.726505 25 35.273494 -25 52.5 -25 C 69.726505 -25 50.273494 24.999999 67.5 25 C 84.726505 25 65.273494 -25 82.5 -25 C 99.726505 -25 80.273494 24.999999 97.5 25 C 114.726505 25 95.273494 -25 112.5 -25 C 129.726505 -25 110.273494 24.999999 127.5 25 C 144.726505 25 142.5 -25 142.5 -25 ',
      'The d attribute set properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makeLinearGradient', function (assert) {
    assert.expect(8);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var gradient = two.makeLinearGradient(
      0,
      -two.height / 2,
      0,
      two.height / 2,
      new Two.Gradient.Stop(0, 'rgb(255, 100, 100)'),
      new Two.Gradient.Stop(1, 'rgb(100, 100, 255)')
    );

    var rect = two.makeRectangle(
      two.width / 2,
      two.height / 2,
      two.width / 4,
      two.height / 4
    );
    rect.fill = gradient;

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + gradient.id);

    assert.equal(
      elem.tagName,
      'linearGradient',
      'Two.LinearGradient renders as a <linear-gradient /> tag.'
    );
    assert.equal(
      parseFloat(elem.getAttribute('x1')),
      0,
      'The x1 attribute applied properly.'
    );
    assert.equal(
      parseFloat(elem.getAttribute('y1')),
      -200,
      'The y1 attribute applied properly.'
    );
    assert.equal(
      parseFloat(elem.getAttribute('x2')),
      0,
      'The x2 attribute applied properly.'
    );
    assert.equal(
      parseFloat(elem.getAttribute('y2')),
      200,
      'The y2 attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('spreadMethod'),
      'pad',
      'The spreadMethod attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('gradientUnits'),
      'objectBoundingBox',
      'The gradientUnits attribute applied properly.'
    );
    assert.equal(
      elem.innerHTML,
      '<stop offset="0%" stop-color="rgb(255, 100, 100)" stop-opacity="1"></stop><stop offset="100%" stop-color="rgb(100, 100, 255)" stop-opacity="1"></stop>',
      'The innerHTML applied properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makeRadialGradient', function (assert) {
    assert.expect(9);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var gradient = two.makeRadialGradient(
      0,
      0,
      two.width / 2,
      new Two.Gradient.Stop(0, 'rgb(255, 100, 100)'),
      new Two.Gradient.Stop(1, 'rgb(100, 100, 255)')
    );

    var rect = two.makeRectangle(
      two.width / 2,
      two.height / 2,
      two.width / 4,
      two.height / 4
    );
    rect.fill = gradient;

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + gradient.id);

    assert.equal(
      elem.tagName,
      'radialGradient',
      'Two.RadialGradient renders as a <radial-gradient /> tag.'
    );
    assert.equal(
      parseFloat(elem.getAttribute('cx')),
      0,
      'The cx attribute applied properly.'
    );
    assert.equal(
      parseFloat(elem.getAttribute('cy')),
      0,
      'The cy attribute applied properly.'
    );
    assert.equal(
      parseFloat(elem.getAttribute('fx')),
      0,
      'The fx attribute applied properly.'
    );
    assert.equal(
      parseFloat(elem.getAttribute('fy')),
      0,
      'The fy attribute applied properly.'
    );
    assert.equal(
      parseFloat(elem.getAttribute('r')),
      200,
      'The r attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('spreadMethod'),
      'pad',
      'The spreadMethod attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('gradientUnits'),
      'objectBoundingBox',
      'The gradeintUnits attribute applied properly.'
    );
    assert.equal(
      elem.innerHTML,
      '<stop offset="0%" stop-color="rgb(255, 100, 100)" stop-opacity="1"></stop><stop offset="100%" stop-color="rgb(100, 100, 255)" stop-opacity="1"></stop>',
      'The innerHTML applied properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Simple)', function (assert) {
    assert.expect(2);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(path, two.width / 2, two.height / 2, 150, 100);
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      var elem = two.renderer.domElement.querySelector('#' + image.id);
      var id = texture.id;

      assert.equal(
        'url(#' + id + ')',
        elem.getAttribute('fill'),
        'Two.Image applied the correct texture properly.'
      );
      assert.equal(image.mode, 'fit', 'Two.Image uses default fit mode.');
      assert.done();
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();
    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode: fit)', function (assert) {
    assert.expect(2);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      150,
      100,
      'fit'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      var elem = two.renderer.domElement.querySelector('#' + image.id);
      var id = texture.id;

      assert.equal(
        'url(#' + id + ')',
        elem.getAttribute('fill'),
        'Two.Image applied the correct texture properly in fit mode.'
      );
      assert.equal(
        image.mode,
        'fit',
        'Two.Image mode property is set correctly to fit.'
      );
      assert.done();
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();
    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode: fill)', function (assert) {
    assert.expect(2);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      150,
      100,
      'fill'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      var elem = two.renderer.domElement.querySelector('#' + image.id);
      var id = texture.id;

      assert.equal(
        'url(#' + id + ')',
        elem.getAttribute('fill'),
        'Two.Image applied the correct texture properly in fill mode.'
      );
      assert.equal(
        image.mode,
        'fill',
        'Two.Image mode property is set correctly to fill.'
      );
      assert.done();
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();
    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode: crop)', function (assert) {
    assert.expect(2);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      150,
      100,
      'crop'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      var elem = two.renderer.domElement.querySelector('#' + image.id);
      var id = texture.id;

      assert.equal(
        'url(#' + id + ')',
        elem.getAttribute('fill'),
        'Two.Image applied the correct texture properly in crop mode.'
      );
      assert.equal(
        image.mode,
        'crop',
        'Two.Image mode property is set correctly to crop.'
      );
      assert.done();
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();
    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode: tile)', function (assert) {
    assert.expect(2);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      150,
      100,
      'tile'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      var elem = two.renderer.domElement.querySelector('#' + image.id);
      var id = texture.id;

      assert.equal(
        'url(#' + id + ')',
        elem.getAttribute('fill'),
        'Two.Image applied the correct texture properly in tile mode.'
      );
      assert.equal(
        image.mode,
        'tile',
        'Two.Image mode property is set correctly to tile.'
      );
      assert.done();
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();
    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode switching)', function (assert) {
    assert.expect(3);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      150,
      100,
      'fit'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      var elem = two.renderer.domElement.querySelector('#' + image.id);
      var id = texture.id;

      assert.equal(
        'url(#' + id + ')',
        elem.getAttribute('fill'),
        'Two.Image applied the correct texture properly in initial fit mode.'
      );
      assert.equal(
        image.mode,
        'fit',
        'Two.Image initial mode property is set correctly to fit.'
      );

      // Change mode and verify
      image.mode = 'fill';
      two.update();

      assert.equal(
        image.mode,
        'fill',
        'Two.Image mode property changes correctly from fit to fill.'
      );
      assert.done();
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();
    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeSprite (Simple)', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var path = '/tests/images/sequence/00000.png';
    var sprite = two.makeSprite(path, two.width / 2, two.height / 2);
    var texture = sprite.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      var elem = two.renderer.domElement.querySelector('#' + sprite.id);
      var id = texture.id;

      assert.equal(
        'url(#' + id + ')',
        elem.getAttribute('fill'),
        'Two.Sprite applied the correct texture properly.'
      );
      assert.done();
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();
    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImageSequence', function (assert) {
    assert.expect(2);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var paths = [];
    for (var i = 0; i < 30; i++) {
      paths.push('/tests/images/sequence/' + QUnit.Utils.digits(i, 5) + '.png');
    }
    var sequence = two.makeImageSequence(
      paths,
      two.width / 2,
      two.height / 2,
      2
    );
    sequence.index = 3;
    var texture = sequence.textures[sequence.index];

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);

      two.update();

      var elem = two.renderer.domElement.querySelector('#' + sequence.id);
      var id = sequence.textures[sequence.index].id;

      assert.equal(
        'url(#' + id + ')',
        elem.getAttribute('fill'),
        'Two.ImageSequence applied the correct texture properly.'
      );

      sequence.index = 7;
      id = sequence.textures[sequence.index].id;

      two.update();

      assert.equal(
        'url(#' + id + ')',
        elem.getAttribute('fill'),
        'Two.ImageSequence can change index properly.'
      );

      assert.done();
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();

    two.renderer.domElement.style.cursor = 'pointer';
    two.renderer.domElement.addEventListener(
      'click',
      function () {
        if (two.playing) {
          two.pause();
        } else {
          sequence.loop = true;
          sequence.play();
          two.play();
        }
      },
      false
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeSprite', function (assert) {
    assert.expect(2);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var path = '/tests/images/spritesheet.jpg';
    var sprite = two.makeSprite(
      path,
      two.width / 2,
      two.height / 2,
      4,
      4,
      2,
      false
    );
    var texture = sprite.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      assert.ok(true, 'Two.Sprite created properly.');

      sprite.index = 10;
      two.update();

      var elem = texture._renderer.elem;
      var statement = [
        elem.getAttribute('x'),
        elem.getAttribute('y'),
        elem.getAttribute('width'),
        elem.getAttribute('height'),
      ].join(',');

      assert.equal(
        statement,
        '-640,-640,1025,1025',
        'Two.Sprite changed index properly.'
      );
      assert.done();
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();

    two.renderer.domElement.style.cursor = 'pointer';
    two.renderer.domElement.addEventListener(
      'click',
      function () {
        if (two.playing) {
          two.pause();
        } else {
          sprite.loop = true;
          sprite.play();
          two.play();
        }
      },
      false
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makeGroup', function (assert) {
    assert.expect(2);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var group = two.makeGroup();
    group.className = 'hello world';
    two.update();

    var elem = two.renderer.domElement.querySelector('#' + group.id);

    assert.equal(elem.tagName, 'g', 'Two.Group renders as a <g/> tag.');
    assert.equal(
      elem.getAttribute('class'),
      'hello world',
      'The class attribute applied properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.makeText', function (assert) {
    assert.expect(17);

    var two = new Two({
      width: 400,
      height: 400,
    });

    var text = two.makeText('Hello World', two.width / 2, two.height / 2);
    text.fill = '#00aeff';
    text.noStroke();

    text.className = 'hello world';

    two.update();

    var elem = two.renderer.domElement.querySelector('#' + text.id);

    assert.equal(elem.tagName, 'text', 'Two.Text renders as a <text /> tag.');
    assert.equal(
      elem.getAttribute('transform'),
      'matrix(1 0 0 1 200 200)',
      'The transform attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('font-family'),
      'sans-serif',
      'The font-family attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('font-size'),
      '13',
      'The font-size proeprty applied properly'
    );
    assert.equal(
      elem.getAttribute('line-height'),
      '17',
      'The line-height attribute applied properly'
    );
    assert.equal(
      elem.getAttribute('text-anchor'),
      'middle',
      'The text-anchor attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('dominant-baseline'),
      'middle',
      'The dominant-baseline attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('font-style'),
      'normal',
      'The font-style attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('font-weight'),
      '500',
      'The font-weight attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('text-decoration'),
      'none',
      'The text-decoration attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('fill'),
      '#00aeff',
      'The fill attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('stroke-width'),
      '0',
      'The stroke-width attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('opacity'),
      '1',
      'The opacity attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('visibility'),
      'visible',
      'The visibility attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('class'),
      'hello world',
      'The class attribute applied properly.'
    );
    assert.equal(
      elem.getAttribute('direction', 'ltr'),
      'ltr',
      'The direction attribute applied properly.'
    );
    assert.equal(
      elem.innerHTML,
      text.value,
      'The value attribute applied properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Styles', function (assert) {
    assert.expect(9);

    var two = new Two({
      width: 400,
      height: 400,
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
    shape.className = 'pretty';

    shape.closed = false;
    shape.curved = true;

    shape.visible = false;
    shape.visible = true;

    // Update Rendering
    two.update();

    var elem = two.renderer.domElement.querySelector('#' + shape.id);
    var matrix = elem.getAttribute('transform');
    assert.equal(
      matrix.match(/matrix\((.*)\)/)[1],
      shape._matrix.toString(),
      'Two.Shape._matrix gets and sets properly.'
    );

    assert.equal(
      elem.getAttribute('fill'),
      shape.fill,
      'Two.Shape.fill gets and sets properly.'
    );
    assert.equal(
      elem.getAttribute('stroke'),
      shape.stroke,
      'Two.Shape.stroke gets and sets properly.'
    );
    assert.equal(
      elem.getAttribute('stroke-linejoin'),
      shape.join,
      'Two.Shape.join gets and sets properly.'
    );
    assert.equal(
      elem.getAttribute('stroke-linecap'),
      shape.cap,
      'Two.Shape.cap gets and sets properly.'
    );
    assert.equal(
      elem.getAttribute('visibility'),
      'visible',
      'Two.Shape.visible gets and sets properly.'
    );
    assert.equal(
      elem.getAttribute('stroke-miterlimit'),
      shape.miter,
      'Two.Shape.miter gets and sets properly.'
    );
    assert.equal(
      elem.getAttribute('class'),
      shape.className,
      'Two.Shape.className gets and sets properly.'
    );
    assert.ok(
      elem.getAttribute('stroke-opacity') == shape.opacity &&
        elem.getAttribute('fill-opacity') == shape.opacity,
      'Two.Shape.opacity gets and sets properly.'
    );

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });
})();
