/**
 * Tests Two.js WebGl Rendering Functionality:
 */

(function () {
  QUnit.module('WebGLRenderer');

  var getRatio = function (v) {
    return Math.round(window.devicePixelRatio);
  };
  var deviceRatio = getRatio(document.createElement('canvas').getContext('2d'));
  var suffix = '@' + deviceRatio + 'x.png';

  QUnit.test('Two.makeLine', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
    }).appendTo(document.body);

    two.makeLine(0, 0, two.width, two.height);

    two.update();

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/line' + suffix,
      two.renderer,
      'Two.makeLine renders properly.'
    );
  });

  QUnit.test('Two.makeRectangle', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
    });

    two.makeRectangle(two.width / 2, two.height / 2, 100, 100);

    two.update();

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/rectangle' + suffix,
      two.renderer,
      'Two.makeRectangle renders properly.'
    );
  });

  QUnit.test('Two.makeEllipse', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
    });

    two.makeEllipse(two.width / 2, two.height / 2, 100, 100);

    two.update();

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/ellipse' + suffix,
      two.renderer,
      'Two.makeEllipse renders properly.'
    );
  });

  QUnit.test('Two.makeCircle', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
    });

    two.makeCircle(two.width / 2, two.height / 2, 50);

    two.update();

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/circle' + suffix,
      two.renderer,
      'Two.makeCircle renders properly.'
    );
  });

  QUnit.test('Two.makePoints', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: 1,
    });

    var points = two.makePoints(200, 200, 220, 200, 180, 200);
    points.size = 10;
    points.noStroke();
    points.fill = '#00AEFF';

    two.update();

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/points' + suffix,
      two.renderer,
      'Two.makePoints renders properly.'
    );
  });

  QUnit.test('Two.makePath', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
    });

    var amount = 20;
    var points = [];
    for (var i = 0; i < amount; i++) {
      var pct = i / amount;
      var x = pct * 300 + 50;
      var y = i % 2 ? 25 : 75;
      points.push(new Two.Anchor(x, y));
    }
    two.makePath(points, true);

    two.update();

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/polygon' + suffix,
      two.renderer,
      'Two.makePath renders properly.'
    );
  });

  QUnit.test('Two.makeCurve', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
    });

    var amount = 20;
    var points = [];
    for (var i = 0; i < amount; i++) {
      var pct = i / amount;
      var x = pct * 300 + 50;
      var y = i % 2 ? 25 : 75;
      points.push(new Two.Anchor(x, y));
    }
    two.makeCurve(points, true);

    two.update();

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/curve' + suffix,
      two.renderer,
      'Two.makeCurve renders properly.'
    );
  });

  QUnit.test('Two.makeLinearGradient', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
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

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/linear-gradient' + suffix,
      two.renderer,
      'Two.makeLinearGradient renders properly.'
    );
  });

  QUnit.test('Two.makeRadialGradient', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
    });

    var gradient = two.makeRadialGradient(
      0.5,
      0.5,
      2,
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

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/radial-gradient' + suffix,
      two.renderer,
      'Two.makeLinearGradient renders properly.'
    );
  });

  QUnit.test('two.makeImage (Simple)', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 200,
      height: 100,
      ratio: deviceRatio,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(path, two.width / 2, two.height / 2, 200, 100);
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/image-fill' + suffix,
        two.renderer,
        'Two.makeImage renders properly with default fill mode.'
      );
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode: fit)', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 200,
      height: 100,
      ratio: deviceRatio,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      200,
      100,
      'fit'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/image-fit' + suffix,
        two.renderer,
        'Two.makeImage renders properly in fit mode.'
      );
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode: fill)', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 200,
      height: 100,
      ratio: deviceRatio,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      200,
      100,
      'fill'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/image-fill' + suffix,
        two.renderer,
        'Two.makeImage renders properly in fill mode.'
      );
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode: crop)', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 200,
      height: 100,
      ratio: deviceRatio,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      200,
      100,
      'crop'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/image-crop' + suffix,
        two.renderer,
        'Two.makeImage renders properly in crop mode.'
      );
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode: tile)', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 200,
      height: 100,
      ratio: deviceRatio,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      200,
      100,
      'tile'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/image-tile' + suffix,
        two.renderer,
        'Two.makeImage renders properly in tile mode.'
      );
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode: stretch)', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 200,
      height: 100,
      ratio: deviceRatio,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      200,
      100,
      'stretch'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/image-stretch' + suffix,
        two.renderer,
        'Two.makeImage renders properly in stretch mode.'
      );
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeImage (Mode switching)', function (assert) {
    assert.expect(2);
    assert.done = assert.async(2);

    var two = new Two({
      type: Two.Types.webgl,
      width: 200,
      height: 100,
      ratio: deviceRatio,
    });

    var path = '/tests/images/spritesheet.jpg';
    var image = two.makeImage(
      path,
      two.width / 2,
      two.height / 2,
      200,
      100,
      'fit'
    );
    var texture = image.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/image-fit' + suffix,
        two.renderer,
        'Two.makeImage renders properly in initial fit mode.',
        function () {
          image.mode = 'fill';
          two.update();

          QUnit.Utils.compare.call(
            assert,
            './images/canvas/image-fill' + suffix,
            two.renderer,
            'Two.Image changes mode properly from fit to fill.'
          );
        }
      );
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('two.makeSprite (Simple)', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
    });

    var path = '/tests/images/sequence/00000.png';
    var sprite = two.makeSprite(path, two.width / 2, two.height / 2);
    var texture = sprite.texture;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/sprite-simple' + suffix,
        two.renderer,
        'Two.makeSprite renders properly.'
      );
    };

    texture.bind(Two.Events.Types.load, loaded);
    texture._update();
  });

  QUnit.test('two.makeImageSequence', function (assert) {
    assert.expect(2);
    assert.done = assert.async(2);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
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

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/image-sequence-1' + suffix,
        two.renderer,
        'Two.ImageSequence applied the correct texture properly.',
        function () {
          sequence.index = 7;
          texture = sequence.textures[sequence.index];
          texture._flagImage = true;

          texture.bind(Two.Events.Types.load, function () {
            texture.unbind(Two.Events.Types.load);

            two.update();

            QUnit.Utils.compare.call(
              assert,
              './images/canvas/image-sequence-2' + suffix,
              two.renderer,
              'Two.ImageSequence can change index properly.'
            );
          });

          texture._update();
        }
      );
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
  });

  QUnit.test('two.makeSprite', function (assert) {
    assert.expect(2);
    assert.done = assert.async(2);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
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
    sprite.index = 3;

    var loaded = function () {
      texture.unbind(Two.Events.Types.load, loaded);
      two.update();

      QUnit.Utils.compare.call(
        assert,
        './images/canvas/image-sequence-1' + suffix,
        two.renderer,
        'Two.makeSprite renders properly.',
        function () {
          sprite.index = 7;
          two.update();

          QUnit.Utils.compare.call(
            assert,
            './images/canvas/image-sequence-2' + suffix,
            two.renderer,
            'Two.Sprite changed index properly.'
          );
        }
      );
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
  });

  QUnit.test('Two.makeText', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
    });

    var text = two.makeText('Hello World', two.width / 2, two.height / 2);
    text.fill = '#00aeff';
    text.noStroke();

    two.update();

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/text' + suffix,
      two.renderer,
      'Two.makeText renders properly.'
    );
  });

  QUnit.test('Styles', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400,
      ratio: deviceRatio,
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

    QUnit.Utils.compare.call(
      assert,
      './images/canvas/styles' + suffix,
      two.renderer,
      'Styles render properly.'
    );
  });
})();
