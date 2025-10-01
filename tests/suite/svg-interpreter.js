/**
 * Tests Two.js Utilities related to Svg Interpretation:
 * + two.load()
 * + two.interpret()
 * + polygon.subdivide()
 */

(function () {
  QUnit.module('SvgInterpreter');

  QUnit.test('Two.load', function (assert) {
    assert.expect(1);
    assert.done = assert.async(1);

    var two = new Two({
      width: 400,
      height: 400,
    });

    two.load('./images/interpretation/D.svg', function (scene, svg) {
      const shape = scene.children[0];
      shape.center();

      var answer = {
        children: [
          {
            vertices: [
              {
                x: -77.9515,
                y: 150,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                rx: 0,
                ry: 0,
                xAxisRotation: 0,
                largeArcFlag: 0,
                sweepFlag: 1,
              },
              {
                x: -77.8935,
                y: -150,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 77.899, y: 0 } },
                rx: 0,
                ry: 0,
                xAxisRotation: 0,
                largeArcFlag: 0,
                sweepFlag: 1,
              },
              {
                x: 77.9515,
                y: -81.117,
                command: 'C',
                relative: true,
                controls: { left: { x: 0, y: -67.354 }, right: { x: 0, y: 0 } },
                rx: 0,
                ry: 0,
                xAxisRotation: 0,
                largeArcFlag: 0,
                sweepFlag: 1,
              },
              {
                x: 77.9515,
                y: 73.965,
                command: 'C',
                relative: true,
                controls: {
                  left: { x: 0, y: -75.976 },
                  right: { x: -0.001, y: 75.976 },
                },
                rx: 0,
                ry: 0,
                xAxisRotation: 0,
                largeArcFlag: 0,
                sweepFlag: 1,
              },
              {
                x: -77.9515,
                y: 150,
                command: 'C',
                relative: true,
                controls: { left: { x: 77.957, y: 0 }, right: { x: 0, y: 0 } },
                rx: 0,
                ry: 0,
                xAxisRotation: 0,
                largeArcFlag: 0,
                sweepFlag: 1,
              },
            ],
            fill: 'none',
            stroke: '#333333',
            linewidth: 10,
            opacity: 1,
            visible: true,
            cap: 'round',
            join: 'round',
            miter: '10',
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: -3.54003907432e-6, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
          },
        ],
        translation: { x: 200, y: 200 },
        rotation: 0,
        scale: { x: 1, y: 1 },
        opacity: 1,
        className: '',
        mask: {
          vertices: [
            {
              x: 0,
              y: 0,
              command: 'M',
              relative: true,
              controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              rx: 0,
              ry: 0,
              xAxisRotation: 0,
              largeArcFlag: 0,
              sweepFlag: 1,
            },
            {
              x: 400,
              y: 0,
              command: 'L',
              relative: true,
              controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              rx: 0,
              ry: 0,
              xAxisRotation: 0,
              largeArcFlag: 0,
              sweepFlag: 1,
            },
            {
              x: 400,
              y: 400,
              command: 'L',
              relative: true,
              controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              rx: 0,
              ry: 0,
              xAxisRotation: 0,
              largeArcFlag: 0,
              sweepFlag: 1,
            },
            {
              x: 0,
              y: 400,
              command: 'L',
              relative: true,
              controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              rx: 0,
              ry: 0,
              xAxisRotation: 0,
              largeArcFlag: 0,
              sweepFlag: 1,
            },
          ],
          fill: '#fff',
          stroke: '#000',
          linewidth: 1,
          opacity: 1,
          visible: true,
          cap: 'butt',
          join: 'miter',
          miter: 4,
          closed: true,
          curved: false,
          automatic: false,
          beginning: 0,
          ending: 1,
          className: '',
          translation: { x: -200.0005035400391, y: -200 },
          rotation: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
          width: 400,
          height: 400,
          origin: { x: -200, y: -200 },
        },
      };
      shape.translation.set(two.width / 2, two.height / 2);
      two.add(shape).update();

      assert.ok(
        QUnit.Utils.shapeEquals(answer, shape),
        'Two.load loads SVG files properly.'
      );

      assert.done();

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
    });
  });

  QUnit.test('Two.interpret', function (assert) {
    assert.expect(10);
    assert.done = assert.async(10);

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get('./images/interpretation/D.svg', function (resp) {
        var answer = {
          children: [
            {
              vertices: [
                {
                  x: -77.9515,
                  y: 150,
                  command: 'M',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: -77.8935,
                  y: -150,
                  command: 'L',
                  relative: true,
                  controls: {
                    left: { x: 0, y: 0 },
                    right: { x: 77.899, y: 0 },
                  },
                },
                {
                  x: 77.9515,
                  y: -81.117,
                  command: 'C',
                  relative: true,
                  controls: {
                    left: { x: 0, y: -67.354 },
                    right: { x: 0, y: 0 },
                  },
                },
                {
                  x: 77.9515,
                  y: 73.965,
                  command: 'C',
                  relative: true,
                  controls: {
                    left: { x: 0, y: -75.976 },
                    right: { x: -0.001, y: 75.976 },
                  },
                },
                {
                  x: -77.9515,
                  y: 150,
                  command: 'C',
                  relative: true,
                  controls: {
                    left: { x: 77.957, y: 0 },
                    right: { x: 0, y: 0 },
                  },
                },
              ],
              fill: 'none',
              stroke: '#333333',
              linewidth: 10,
              opacity: 1,
              visible: true,
              cap: 'round',
              join: 'round',
              miter: '10',
              closed: true,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 200.0005, y: 200 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            },
          ],
          translation: { x: 0, y: 0 },
          rotation: 0,
          scale: { x: 1, y: 1 },
          opacity: 1,
          className: '',
          mask: {
            vertices: [
              {
                x: 0,
                y: 0,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 0,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 0,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
            ],
            fill: '#fff',
            stroke: '#000',
            linewidth: 1,
            opacity: 1,
            visible: true,
            cap: 'butt',
            join: 'miter',
            miter: 4,
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            width: 400,
            height: 400,
            origin: { x: -200, y: -200 },
          },
        };
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg);

        two.update();

        assert.ok(
          QUnit.Utils.shapeEquals(answer, shape),
          'Two.interpret imports <path> properly.'
        );
        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get('./images/interpretation/K.svg', function (resp) {
        var answer = {
          children: [
            {
              vertices: [
                {
                  x: 416.146,
                  y: 350,
                  command: 'M',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 415.862,
                  y: 650,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
              ],
              fill: 'none',
              stroke: '#333333',
              linewidth: 10,
              opacity: 1,
              visible: true,
              cap: 'round',
              join: 'round',
              miter: '10',
              closed: false,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: -300, y: -300 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            },
            {
              vertices: [
                {
                  x: 570.858,
                  y: 350,
                  command: 'M',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 415.961,
                  y: 544.669,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
              ],
              fill: 'none',
              stroke: '#333333',
              linewidth: 10,
              opacity: 1,
              visible: true,
              cap: 'round',
              join: 'round',
              miter: '10',
              closed: false,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: -300, y: -300 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            },
            {
              vertices: [
                {
                  x: 469.29,
                  y: 477.828,
                  command: 'M',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 584.138,
                  y: 650,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
              ],
              fill: 'none',
              stroke: '#333333',
              linewidth: 10,
              opacity: 1,
              visible: true,
              cap: 'round',
              join: 'round',
              miter: '10',
              closed: false,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: -300, y: -300 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            },
          ],
          translation: { x: 0, y: 0 },
          rotation: 0,
          scale: { x: 1, y: 1 },
          opacity: 1,
          className: '',
          mask: {
            vertices: [
              {
                x: 0,
                y: 0,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 0,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 0,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
            ],
            fill: '#fff',
            stroke: '#000',
            linewidth: 1,
            opacity: 1,
            visible: true,
            cap: 'butt',
            join: 'miter',
            miter: 4,
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            width: 400,
            height: 400,
            origin: { x: -200, y: -200 },
          },
        };
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg);

        two.update();

        assert.ok(
          QUnit.Utils.shapeEquals(answer, shape),
          'Two.interpret imports <line> properly.'
        );
        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get('./images/interpretation/circle.svg', function (resp) {
        var answer = {
          children: [
            {
              vertices: [
                {
                  x: 100,
                  y: 0,
                  command: 'M',
                  relative: true,
                  controls: {
                    left: { x: 3.381768755491e-15, y: -55.2284749831 },
                    right: { x: 3.381768755491e-15, y: 55.2284749831 },
                  },
                },
                {
                  x: 6.123233995737e-15,
                  y: 100,
                  command: 'C',
                  relative: true,
                  controls: {
                    left: { x: 55.2284749831, y: 0 },
                    right: { x: -55.2284749831, y: 6.763537510982e-15 },
                  },
                },
                {
                  x: -100,
                  y: 1.224646799147e-14,
                  command: 'C',
                  relative: true,
                  controls: {
                    left: { x: 3.381768755491e-15, y: 55.2284749831 },
                    right: { x: -1.014530626647e-14, y: -55.2284749831 },
                  },
                },
                {
                  x: -1.836970198721e-14,
                  y: -100,
                  command: 'C',
                  relative: true,
                  controls: {
                    left: { x: -55.2284749831, y: 6.763537510982e-15 },
                    right: { x: 55.2284749831, y: -1.352707502196e-14 },
                  },
                },
              ],
              fill: '#EF4142',
              stroke: '#00AEEF',
              linewidth: 25,
              opacity: 1,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: '10',
              closed: true,
              curved: true,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 200, y: 200 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
              radius: 100,
            },
          ],
          translation: { x: 0, y: 0 },
          rotation: 0,
          scale: { x: 1, y: 1 },
          opacity: 1,
          className: '',
          mask: {
            vertices: [
              {
                x: 0,
                y: 0,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 0,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 0,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
            ],
            fill: '#fff',
            stroke: '#000',
            linewidth: 1,
            opacity: 1,
            visible: true,
            cap: 'butt',
            join: 'miter',
            miter: 4,
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            width: 400,
            height: 400,
            origin: { x: -200, y: -200 },
          },
        };
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg);

        two.update();

        assert.ok(
          QUnit.Utils.shapeEquals(answer, shape),
          'Two.interpret imports <circle> properly.'
        );
        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get('./images/interpretation/rect.svg', function (resp) {
        var answer = {
          children: [
            {
              vertices: [
                {
                  x: -100,
                  y: -100,
                  command: 'M',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 100,
                  y: -100,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 100,
                  y: 100,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: -100,
                  y: 100,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
              ],
              fill: '#F7941E',
              linewidth: 1,
              opacity: 1,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: 4,
              closed: true,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 200, y: 200 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
              width: 200,
              height: 200,
              origin: { x: 0, y: 0 },
            },
          ],
          translation: { x: 0, y: 0 },
          rotation: 0,
          scale: { x: 1, y: 1 },
          opacity: 1,
          className: '',
          mask: {
            vertices: [
              {
                x: 0,
                y: 0,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 0,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 0,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
            ],
            fill: '#fff',
            stroke: '#000',
            linewidth: 1,
            opacity: 1,
            visible: true,
            cap: 'butt',
            join: 'miter',
            miter: 4,
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            width: 400,
            height: 400,
            origin: { x: -200, y: -200 },
          },
        };
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg);

        two.update();

        assert.ok(
          QUnit.Utils.shapeEquals(answer, shape),
          'Two.interpret imports <rect> properly.'
        );
        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get('./images/interpretation/ellipse.svg', function (resp) {
        var answer = {
          children: [
            {
              vertices: [
                {
                  x: 150,
                  y: 0,
                  command: 'M',
                  relative: true,
                  controls: {
                    left: { x: 5.072653133236e-15, y: -42.469040408 },
                    right: { x: 5.072653133236e-15, y: 42.469040408 },
                  },
                },
                {
                  x: 9.184850993605e-15,
                  y: 76.897,
                  command: 'C',
                  relative: true,
                  controls: {
                    left: { x: 82.842712475, y: 0 },
                    right: { x: -82.842712475, y: 5.20095743982e-15 },
                  },
                },
                {
                  x: -150,
                  y: 9.417166491403e-15,
                  command: 'C',
                  relative: true,
                  controls: {
                    left: { x: 5.072653133236e-15, y: 42.469040408 },
                    right: { x: -1.521795939971e-14, y: -42.469040408 },
                  },
                },
                {
                  x: -2.755455298082e-14,
                  y: -76.897,
                  command: 'C',
                  relative: true,
                  controls: {
                    left: { x: -82.842712475, y: 5.20095743982e-15 },
                    right: { x: 82.842712475, y: -1.040191487964e-14 },
                  },
                },
              ],
              fill: '#92278F',
              linewidth: 1,
              opacity: 0.5,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: 4,
              closed: true,
              curved: true,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 200, y: 200 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
              width: 300,
              height: 153.794,
            },
          ],
          translation: { x: 0, y: 0 },
          rotation: 0,
          scale: { x: 1, y: 1 },
          opacity: 1,
          className: '',
          mask: {
            vertices: [
              {
                x: 0,
                y: 0,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 0,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 0,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
            ],
            fill: '#fff',
            stroke: '#000',
            linewidth: 1,
            opacity: 1,
            visible: true,
            cap: 'butt',
            join: 'miter',
            miter: 4,
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            width: 400,
            height: 400,
            origin: { x: -200, y: -200 },
          },
        };
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg);

        two.update();

        assert.ok(
          QUnit.Utils.shapeEquals(answer, shape),
          'Two.interpret imports <ellipse> properly.'
        );
        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get('./images/interpretation/polyline.svg', function (resp) {
        var answer = {
          children: [
            {
              vertices: [
                { x: 20.079, y: 104.42, command: 'M', relative: true },
                { x: 47.352, y: 104.42, command: 'L', relative: true },
                { x: 47.352, y: 90.785, command: 'L', relative: true },
                { x: 74.625, y: 90.785, command: 'L', relative: true },
                { x: 74.625, y: 104.42, command: 'L', relative: true },
                { x: 101.897, y: 104.42, command: 'L', relative: true },
                { x: 101.897, y: 70.33, command: 'L', relative: true },
                { x: 129.17, y: 70.33, command: 'L', relative: true },
                { x: 129.17, y: 104.42, command: 'L', relative: true },
                { x: 156.442, y: 104.42, command: 'L', relative: true },
                { x: 156.442, y: 49.875, command: 'L', relative: true },
                { x: 183.715, y: 49.875, command: 'L', relative: true },
                { x: 183.715, y: 104.42, command: 'L', relative: true },
                { x: 210.988, y: 104.42, command: 'L', relative: true },
                { x: 210.988, y: 29.42, command: 'L', relative: true },
                { x: 238.26, y: 29.42, command: 'L', relative: true },
                { x: 238.26, y: 104.42, command: 'L', relative: true },
                { x: 265.534, y: 104.42, command: 'L', relative: true },
                { x: 265.534, y: 8.965, command: 'L', relative: true },
                { x: 292.805, y: 8.965, command: 'L', relative: true },
                { x: 292.805, y: 104.42, command: 'L', relative: true },
                { x: 320.079, y: 104.42, command: 'L', relative: true },
              ],
              fill: 'none',
              stroke: '#0000FF',
              linewidth: 10,
              opacity: 1,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: 4,
              closed: false,
              curved: false,
              automatic: true,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 29.921, y: 143.307 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            },
          ],
          translation: { x: 0, y: 0 },
          rotation: 0,
          scale: { x: 1, y: 1 },
          opacity: 1,
          className: '',
          mask: {
            vertices: [
              {
                x: 0,
                y: 0,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 0,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 0,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
            ],
            fill: '#fff',
            stroke: '#000',
            linewidth: 1,
            opacity: 1,
            visible: true,
            cap: 'butt',
            join: 'miter',
            miter: 4,
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            width: 400,
            height: 400,
            origin: { x: -200, y: -200 },
          },
        };
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg);

        two.update();

        assert.ok(
          QUnit.Utils.shapeEquals(answer, shape),
          'Two.interpret imports <polyline> properly.'
        );
        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get('./images/interpretation/polygon.svg', function (resp) {
        var answer = {
          children: [
            {
              vertices: [
                { x: 99.212, y: 21.26, command: 'M', relative: true },
                { x: 107.433, y: 45.638, command: 'L', relative: true },
                { x: 132.945, y: 45.638, command: 'L', relative: true },
                { x: 112.536, y: 60.945, command: 'L', relative: true },
                { x: 119.905, y: 85.323, command: 'L', relative: true },
                { x: 99.212, y: 70.867, command: 'L', relative: true },
                { x: 78.52, y: 85.323, command: 'L', relative: true },
                { x: 85.89, y: 60.945, command: 'L', relative: true },
                { x: 65.48, y: 45.638, command: 'L', relative: true },
                { x: 90.992, y: 45.638, command: 'L', relative: true },
              ],
              fill: '#FF0000',
              linewidth: 1,
              opacity: 1,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: 4,
              closed: true,
              curved: false,
              automatic: true,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 29.921, y: 143.307 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            },
            {
              vertices: [
                { x: 240.945, y: 21.26, command: 'M', relative: true },
                { x: 271.559, y: 38.977, command: 'L', relative: true },
                { x: 271.559, y: 74.41, command: 'L', relative: true },
                { x: 240.945, y: 92.126, command: 'L', relative: true },
                { x: 210.331, y: 74.438, command: 'L', relative: true },
                { x: 210.331, y: 38.977, command: 'L', relative: true },
              ],
              fill: '#00FF00',
              linewidth: 1,
              opacity: 1,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: 4,
              closed: true,
              curved: false,
              automatic: true,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 29.921, y: 143.307 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            },
          ],
          translation: { x: 0, y: 0 },
          rotation: 0,
          scale: { x: 1, y: 1 },
          opacity: 1,
          className: '',
          mask: {
            vertices: [
              {
                x: 0,
                y: 0,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 0,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 0,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
            ],
            fill: '#fff',
            stroke: '#000',
            linewidth: 1,
            opacity: 1,
            visible: true,
            cap: 'butt',
            join: 'miter',
            miter: 4,
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            width: 400,
            height: 400,
            origin: { x: -200, y: -200 },
          },
        };
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg);

        two.update();

        assert.ok(
          QUnit.Utils.shapeEquals(answer, shape),
          'Two.interpret imports <polygon> properly.'
        );
        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get(
        './images/interpretation/linear-gradient.svg',
        function (resp) {
          var answer = {
            children: [
              {
                vertices: [
                  {
                    x: -100,
                    y: -100,
                    command: 'M',
                    relative: true,
                    controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                  },
                  {
                    x: 100,
                    y: -100,
                    command: 'L',
                    relative: true,
                    controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                  },
                  {
                    x: 100,
                    y: 100,
                    command: 'L',
                    relative: true,
                    controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                  },
                  {
                    x: -100,
                    y: 100,
                    command: 'L',
                    relative: true,
                    controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                  },
                ],
                fill: {
                  stops: [
                    { offset: 0, opacity: 1, color: '#000000' },
                    { offset: 0.33, opacity: 1, color: '#FFF200' },
                    { offset: 0.66, opacity: 1, color: '#EC008C' },
                    { offset: 1, opacity: 1, color: '#00AEEF' },
                  ],
                  spread: 'pad',
                  left: { x: -100, y: 0 },
                  right: { x: 100, y: 0 },
                },
                linewidth: 1,
                opacity: 1,
                visible: true,
                cap: 'butt',
                join: 'miter',
                miter: 4,
                closed: true,
                curved: false,
                automatic: false,
                beginning: 0,
                ending: 1,
                className: '',
                translation: { x: 200, y: 200 },
                rotation: 0,
                scale: 1,
                skewX: 0,
                skewY: 0,
                width: 200,
                height: 200,
                origin: { x: 0, y: 0 },
              },
            ],
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            opacity: 1,
            className: '',
            mask: {
              vertices: [
                {
                  x: 0,
                  y: 0,
                  command: 'M',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 400,
                  y: 0,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 400,
                  y: 400,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 0,
                  y: 400,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
              ],
              fill: '#fff',
              stroke: '#000',
              linewidth: 1,
              opacity: 1,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: 4,
              closed: true,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 0, y: 0 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
              width: 400,
              height: 400,
              origin: { x: -200, y: -200 },
            },
          };
          var svg = QUnit.Utils.textToDOM(resp)[0];
          var shape = two.interpret(svg);

          two.update();

          assert.ok(
            QUnit.Utils.shapeEquals(answer, shape),
            'Two.interpret imports <linear-gradient> properly.'
          );
          assert.done();

          QUnit.Utils.addElemToTest(assert.test, [
            two.renderer.domElement,
            svg,
          ]);
        }
      );
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get(
        './images/interpretation/radial-gradient.svg',
        function (resp) {
          var answer = {
            children: [
              {
                stops: [
                  { offset: 0, opacity: 1, color: '#000000' },
                  { offset: 0.33, opacity: 1, color: '#FFF200' },
                  { offset: 0.66, opacity: 1, color: '#EC008C' },
                  { offset: 1, opacity: 1, color: '#00AEEF' },
                ],
                spread: 'pad',
                radius: 100,
                center: { x: 0, y: 0 },
                focal: { x: 0, y: 0 },
              },
              {
                vertices: [
                  {
                    x: -100,
                    y: -100,
                    command: 'M',
                    relative: true,
                    controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                  },
                  {
                    x: 100,
                    y: -100,
                    command: 'L',
                    relative: true,
                    controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                  },
                  {
                    x: 100,
                    y: 100,
                    command: 'L',
                    relative: true,
                    controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                  },
                  {
                    x: -100,
                    y: 100,
                    command: 'L',
                    relative: true,
                    controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                  },
                ],
                fill: {
                  stops: [
                    { offset: 0, opacity: 1, color: '#000000' },
                    { offset: 0.33, opacity: 1, color: '#FFF200' },
                    { offset: 0.66, opacity: 1, color: '#EC008C' },
                    { offset: 1, opacity: 1, color: '#00AEEF' },
                  ],
                  spread: 'pad',
                  radius: 100,
                  center: { x: 0, y: 0 },
                  focal: { x: 0, y: 0 },
                },
                linewidth: 1,
                opacity: 1,
                visible: true,
                cap: 'butt',
                join: 'miter',
                miter: 4,
                closed: true,
                curved: false,
                automatic: false,
                beginning: 0,
                ending: 1,
                className: '',
                translation: { x: 200, y: 200 },
                rotation: 0,
                scale: 1,
                skewX: 0,
                skewY: 0,
                width: 200,
                height: 200,
                origin: { x: 0, y: 0 },
              },
            ],
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            opacity: 1,
            className: '',
            mask: {
              vertices: [
                {
                  x: 0,
                  y: 0,
                  command: 'M',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 400,
                  y: 0,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 400,
                  y: 400,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 0,
                  y: 400,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
              ],
              fill: '#fff',
              stroke: '#000',
              linewidth: 1,
              opacity: 1,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: 4,
              closed: true,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 0, y: 0 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
              width: 400,
              height: 400,
              origin: { x: -200, y: -200 },
            },
          };
          var svg = QUnit.Utils.textToDOM(resp)[0];
          var shape = two.interpret(svg);

          two.update();

          assert.ok(
            QUnit.Utils.shapeEquals(answer, shape),
            'Two.interpret imports <radial-gradient> properly.'
          );
          assert.done();

          QUnit.Utils.addElemToTest(assert.test, [
            two.renderer.domElement,
            svg,
          ]);
        }
      );
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
        type: Two.Types.canvas, //The font-size problem only occurs in canvas renderer
      });

      QUnit.Utils.get('./images/interpretation/text.svg', function (resp) {
        var svg = QUnit.Utils.textToDOM(resp)[0];
        const shape = two.interpret(svg);
        two.update();

        assert.equal(
          shape.children[1].size,
          144,
          'Font size is extracted correctly'
        );

        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();
  });

  QUnit.test('Two.subdivide', function (assert) {
    assert.expect(3);
    assert.done = assert.async(3);

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get('./images/interpretation/D.svg', function (resp) {
        var answer = {
          children: [
            {
              vertices: [
                { x: -77.9515, y: 150, command: 'M', relative: true },
                { x: -77.9515, y: 150, command: 'M', relative: true },
                {
                  x: -77.9509215347,
                  y: 147.0079381233,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.9492805821,
                  y: 138.5202523916,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.9467188072,
                  y: 125.2696926521,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.943377875,
                  y: 107.9890087523,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.9393994504,
                  y: 87.4109505394,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.9349251985,
                  y: 64.2682678608,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.930096784,
                  y: 39.2937105638,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.9250558722,
                  y: 13.2200284958,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.9199441278,
                  y: -13.2200284958,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.914903216,
                  y: -39.2937105638,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.9100748015,
                  y: -64.2682678608,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.9056005496,
                  y: -87.4109505394,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.901622125,
                  y: -107.9890087523,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.8982811928,
                  y: -125.2696926521,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.8957194179,
                  y: -138.5202523916,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -77.8940784653,
                  y: -147.0079381233,
                  command: 'L',
                  relative: true,
                },
                { x: -77.8935, y: -150, command: 'L', relative: true },
                {
                  x: -64.1620045797,
                  y: -149.9710411154,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -50.5247823122,
                  y: -149.8318168125,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -37.077082129,
                  y: -149.5038056178,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -23.9141529615,
                  y: -148.9084860574,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -11.1312437411,
                  y: -147.9673366578,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 1.1763966009,
                  y: -146.6018359455,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 12.9135191329,
                  y: -144.7334624466,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 23.9848749237,
                  y: -142.2836946876,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 34.2952150417,
                  y: -139.1740111948,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 43.7492905557,
                  y: -135.3258904946,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 52.2518525341,
                  y: -130.6608111134,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 59.7076520456,
                  y: -125.1002515774,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 66.0214401588,
                  y: -118.5656904132,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 71.0979679422,
                  y: -110.978606147,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 74.8419864645,
                  y: -102.2604773051,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 77.1582467942,
                  y: -92.332782414,
                  command: 'L',
                  relative: true,
                },
                { x: 77.9515, y: -81.117, command: 'L', relative: true },
                { x: 77.9515, y: -80.3125688988, command: 'L', relative: true },
                { x: 77.9515, y: -77.9662293914, command: 'L', relative: true },
                { x: 77.9515, y: -74.1784121718, command: 'L', relative: true },
                { x: 77.9515, y: -69.0495479341, command: 'L', relative: true },
                { x: 77.9515, y: -62.6800673723, command: 'L', relative: true },
                { x: 77.9515, y: -55.1704011805, command: 'L', relative: true },
                { x: 77.9515, y: -46.6209800529, command: 'L', relative: true },
                { x: 77.9515, y: -37.1322346835, command: 'L', relative: true },
                { x: 77.9515, y: -26.8045957663, command: 'L', relative: true },
                { x: 77.9515, y: -15.7384939955, command: 'L', relative: true },
                { x: 77.9515, y: -4.0343600651, command: 'L', relative: true },
                { x: 77.9515, y: 8.2073753308, command: 'L', relative: true },
                { x: 77.9515, y: 20.8862814981, command: 'L', relative: true },
                { x: 77.9515, y: 33.9019277427, command: 'L', relative: true },
                { x: 77.9515, y: 47.1538833706, command: 'L', relative: true },
                { x: 77.9515, y: 60.5417176878, command: 'L', relative: true },
                { x: 77.9515, y: 73.965, command: 'L', relative: true },
                {
                  x: 77.1580786688,
                  y: 86.5999039284,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 74.84161724,
                  y: 97.751317932,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 71.0972901486,
                  y: 107.5118835742,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 66.0202718298,
                  y: 115.9742424181,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 59.7057367189,
                  y: 123.2310360269,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 52.248859251,
                  y: 129.3749059638,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 43.7448138612,
                  y: 134.498493792,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 34.2887749847,
                  y: 138.6944410747,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 23.9759170568,
                  y: 142.0553893751,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 12.9014145125,
                  y: 144.6739802565,
                  command: 'L',
                  relative: true,
                },
                {
                  x: 1.1604417871,
                  y: 146.6428552819,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -11.1518266843,
                  y: 148.0546560147,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -23.9402164665,
                  y: 149.0020240179,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -37.1095531244,
                  y: 149.5776008549,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -50.5646622227,
                  y: 149.8740280887,
                  command: 'L',
                  relative: true,
                },
                {
                  x: -64.2103693263,
                  y: 149.9839472827,
                  command: 'L',
                  relative: true,
                },
                { x: -77.9515, y: 150, command: 'Z', relative: true },
              ],
              fill: 'none',
              stroke: '#333333',
              linewidth: 10,
              opacity: 1,
              visible: true,
              cap: 'round',
              join: 'round',
              miter: '10',
              closed: true,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 200.0005, y: 200 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            },
          ],
          translation: { x: 0, y: 0 },
          rotation: 0,
          scale: { x: 1, y: 1 },
          opacity: 1,
          className: '',
          mask: {
            vertices: [
              {
                x: 0,
                y: 0,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 0,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 0,
                y: 400,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
            ],
            fill: '#fff',
            stroke: '#000',
            linewidth: 1,
            opacity: 1,
            visible: true,
            cap: 'butt',
            join: 'miter',
            miter: 4,
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            width: 400,
            height: 400,
            origin: { x: -200, y: -200 },
          },
        };

        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg).subdivide();
        var group = two.makeGroup();

        group.translation.copy(shape.children[0].translation);

        _.each(shape.children[0].vertices, function (v) {
          var circle = new Two.Circle(v.x, v.y, 3);
          circle.noStroke().fill = 'red';
          group.add(circle);
        });

        two.update();

        assert.ok(
          QUnit.Utils.shapeEquals(answer, shape),
          'Two.subdivide subdivides curveTo and lineTo properly.'
        );
        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get(
        './images/interpretation/compound-path.svg',
        function (resp) {
          var answer = {
            children: [
              {
                vertices: [
                  { x: 20, y: -100, command: 'M', relative: true },
                  { x: -120, y: 0, command: 'M', relative: true },
                  {
                    x: -119.5422332587,
                    y: 9.6307494403,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -118.1968695298,
                    y: 19.0024730307,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -116.0058135559,
                    y: 28.0732660289,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -113.0109700794,
                    y: 36.8012236922,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -109.2542438429,
                    y: 45.1444412782,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -104.7775395888,
                    y: 53.0610140444,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -99.62276205984122,
                    y: 60.509037248117224,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -93.83181599837168,
                    y: 67.44660614695705,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -87.44660614695705,
                    y: 73.83181599837165,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -80.50903724811725,
                    y: 79.62276205984124,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -73.06101404437207,
                    y: 84.77753958884591,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -65.1444412782414,
                    y: 89.25424384286586,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -56.80122369224507,
                    y: 93.01097007938122,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -48.073266028902914,
                    y: 96.00581355587218,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -39.00247303073479,
                    y: 98.19686952981885,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -29.63074944026054,
                    y: 99.54223325870142,
                    command: 'L',
                    relative: true,
                  },
                  { x: -20, y: 100, command: 'L', relative: true },
                  {
                    x: -20,
                    y: 98.00529208223082,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -20,
                    y: 92.34683492774272,
                    command: 'L',
                    relative: true,
                  },
                  { x: -20, y: 83.5131284347649, command: 'L', relative: true },
                  {
                    x: -19.999999999999996,
                    y: 71.99267250152656,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -19.999999999999996,
                    y: 58.273967026256855,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -19.999999999999996,
                    y: 42.845511907185006,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -19.999999999999996,
                    y: 26.1958070425402,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -20,
                    y: 8.813352330551599,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -19.999999999999996,
                    y: -8.813352330551593,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -20.000000000000004,
                    y: -26.195807042540203,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -20,
                    y: -42.84551190718503,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -20,
                    y: -58.273967026256884,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -20,
                    y: -71.99267250152656,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -20,
                    y: -83.51312843476491,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -20,
                    y: -92.34683492774272,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -20.000000000000004,
                    y: -98.00529208223082,
                    command: 'L',
                    relative: true,
                  },
                  { x: -20, y: -100, command: 'L', relative: true },
                  {
                    x: -29.630749440260534,
                    y: -99.54223325870142,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -39.002473030734784,
                    y: -98.19686952981884,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -48.07326602890291,
                    y: -96.00581355587217,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -56.80122369224506,
                    y: -93.01097007938124,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -65.14444127824139,
                    y: -89.25424384286585,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -73.06101404437206,
                    y: -84.77753958884591,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -80.50903724811724,
                    y: -79.62276205984124,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -87.44660614695707,
                    y: -73.83181599837168,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -93.83181599837167,
                    y: -67.44660614695705,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -99.62276205984124,
                    y: -60.50903724811725,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -104.77753958884591,
                    y: -53.06101404437207,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -109.25424384286588,
                    y: -45.1444412782414,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -113.01097007938124,
                    y: -36.801223692245074,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -116.00581355587218,
                    y: -28.07326602890292,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -118.19686952981884,
                    y: -19.00247303073479,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: -119.5422332587014,
                    y: -9.630749440260539,
                    command: 'L',
                    relative: true,
                  },
                  { x: -120, y: 0, command: 'L', relative: true },
                  { x: -120, y: 0, command: 'L', relative: true },
                  { x: 20, y: -100, command: 'M', relative: true },
                  {
                    x: 20,
                    y: -98.00529208223082,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 20,
                    y: -92.34683492774272,
                    command: 'L',
                    relative: true,
                  },
                  { x: 20, y: -83.5131284347649, command: 'L', relative: true },
                  {
                    x: 19.999999999999996,
                    y: -71.99267250152656,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 19.999999999999996,
                    y: -58.273967026256855,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 19.999999999999996,
                    y: -42.845511907185006,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 19.999999999999996,
                    y: -26.1958070425402,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 20,
                    y: -8.813352330551599,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 19.999999999999996,
                    y: 8.813352330551593,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 20.000000000000004,
                    y: 26.195807042540203,
                    command: 'L',
                    relative: true,
                  },
                  { x: 20, y: 42.84551190718503, command: 'L', relative: true },
                  {
                    x: 20,
                    y: 58.273967026256884,
                    command: 'L',
                    relative: true,
                  },
                  { x: 20, y: 71.99267250152656, command: 'L', relative: true },
                  { x: 20, y: 83.51312843476491, command: 'L', relative: true },
                  { x: 20, y: 92.34683492774272, command: 'L', relative: true },
                  {
                    x: 20.000000000000004,
                    y: 98.00529208223082,
                    command: 'L',
                    relative: true,
                  },
                  { x: 20, y: 100, command: 'L', relative: true },
                  {
                    x: 29.630749440260534,
                    y: 99.5422332587014,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 39.00247303073478,
                    y: 98.19686952981884,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 48.07326602890291,
                    y: 96.00581355587217,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 56.80122369224505,
                    y: 93.01097007938122,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 65.14444127824139,
                    y: 89.25424384286583,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 73.06101404437206,
                    y: 84.77753958884591,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 80.50903724811722,
                    y: 79.62276205984122,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 87.44660614695705,
                    y: 73.83181599837167,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 93.83181599837167,
                    y: 67.44660614695704,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 99.62276205984124,
                    y: 60.50903724811724,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 104.77753958884591,
                    y: 53.06101404437206,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 109.25424384286588,
                    y: 45.14444127824139,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 113.01097007938124,
                    y: 36.80122369224507,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 116.00581355587218,
                    y: 28.07326602890291,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 118.19686952981884,
                    y: 19.002473030734784,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 119.5422332587014,
                    y: 9.630749440260534,
                    command: 'L',
                    relative: true,
                  },
                  { x: 120, y: 0, command: 'L', relative: true },
                  {
                    x: 119.5422332587014,
                    y: -9.63074944026053,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 118.19686952981884,
                    y: -19.00247303073478,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 116.00581355587218,
                    y: -28.07326602890291,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 113.01097007938121,
                    y: -36.80122369224505,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 109.25424384286585,
                    y: -45.14444127824139,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 104.77753958884588,
                    y: -53.061014044372065,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 99.62276205984122,
                    y: -60.509037248117224,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 93.83181599837167,
                    y: -67.44660614695705,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 87.44660614695704,
                    y: -73.83181599837165,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 80.50903724811724,
                    y: -79.62276205984124,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 73.06101404437206,
                    y: -84.77753958884591,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 65.14444127824139,
                    y: -89.25424384286586,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 56.80122369224507,
                    y: -93.01097007938122,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 48.073266028902914,
                    y: -96.00581355587218,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 39.00247303073479,
                    y: -98.19686952981885,
                    command: 'L',
                    relative: true,
                  },
                  {
                    x: 29.630749440260537,
                    y: -99.54223325870142,
                    command: 'L',
                    relative: true,
                  },
                  { x: 20, y: -100, command: 'Z', relative: true },
                ],
                fill: '#2BB673',
                linewidth: 1,
                opacity: 1,
                visible: true,
                cap: 'butt',
                join: 'miter',
                miter: 4,
                closed: true,
                curved: false,
                automatic: false,
                beginning: 0,
                ending: 1,
                className: '',
                translation: { x: 200, y: 200 },
                rotation: 0,
                scale: 1,
                skewX: 0,
                skewY: 0,
              },
            ],
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            opacity: 1,
            className: '',
            mask: {
              vertices: [
                {
                  x: 0,
                  y: 0,
                  command: 'M',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 400,
                  y: 0,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 400,
                  y: 400,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
                {
                  x: 0,
                  y: 400,
                  command: 'L',
                  relative: true,
                  controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
                },
              ],
              fill: '#fff',
              stroke: '#000',
              linewidth: 1,
              opacity: 1,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: 4,
              closed: true,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 0, y: 0 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
              width: 400,
              height: 400,
              origin: { x: -200, y: -200 },
            },
          };
          var svg = QUnit.Utils.textToDOM(resp)[0];
          var shape = two.interpret(svg).subdivide();
          var group = two.makeGroup();

          group.translation.copy(shape.children[0].translation);

          _.each(shape.children[0].vertices, function (v) {
            var circle = new Two.Circle(v.x, v.y, 3);
            circle.noStroke().fill = 'red';
            group.add(circle);
          });

          two.update();

          assert.ok(
            QUnit.Utils.shapeEquals(answer, shape),
            'Two.subdivide subdivides moveTo properly.'
          );
          assert.done();

          QUnit.Utils.addElemToTest(assert.test, [
            two.renderer.domElement,
            svg,
          ]);
        }
      );
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      QUnit.Utils.get('./images/interpretation/donut.svg', function (resp) {
        var answer = {
          children: [
            {
              vertices: [
                { x: 0, y: 62.155, command: 'M', relative: true },
                { x: 0, y: -121.338, command: 'M', relative: true },
                {
                  x: -47.230171875,
                  y: -111.802640625,
                  command: 'L',
                  relative: true,
                },
                { x: -85.798875, y: -85.798875, command: 'L', relative: true },
                {
                  x: -111.802640625,
                  y: -47.230171875,
                  command: 'L',
                  relative: true,
                },
                { x: -121.338, y: 0, command: 'L', relative: true },
                {
                  x: -111.802640625,
                  y: 47.230171875,
                  command: 'L',
                  relative: true,
                },
                { x: -85.798875, y: 85.798875, command: 'L', relative: true },
                {
                  x: -47.230171875,
                  y: 111.802640625,
                  command: 'L',
                  relative: true,
                },
                { x: 0, y: 121.338, command: 'L', relative: true },
                {
                  x: 47.230171875,
                  y: 111.802640625,
                  command: 'L',
                  relative: true,
                },
                { x: 85.798875, y: 85.798875, command: 'L', relative: true },
                {
                  x: 111.802640625,
                  y: 47.230171875,
                  command: 'L',
                  relative: true,
                },
                { x: 121.338, y: 0, command: 'L', relative: true },
                {
                  x: 111.802640625,
                  y: -47.230171875,
                  command: 'L',
                  relative: true,
                },
                { x: 85.798875, y: -85.798875, command: 'L', relative: true },
                {
                  x: 47.230171875,
                  y: -111.802640625,
                  command: 'L',
                  relative: true,
                },
                { x: 0, y: -121.338, command: 'L', relative: true },
                { x: 0, y: -121.338, command: 'L', relative: true },
                { x: 0, y: 62.155, command: 'M', relative: true },
                {
                  x: -24.193421875,
                  y: 57.270515625,
                  command: 'L',
                  relative: true,
                },
                { x: -43.950125, y: 43.950125, command: 'L', relative: true },
                {
                  x: -57.270515625,
                  y: 24.193421875,
                  command: 'L',
                  relative: true,
                },
                { x: -62.155, y: 0, command: 'L', relative: true },
                {
                  x: -57.270515625,
                  y: -24.193421875,
                  command: 'L',
                  relative: true,
                },
                { x: -43.950125, y: -43.950125, command: 'L', relative: true },
                {
                  x: -24.193421875,
                  y: -57.270515625,
                  command: 'L',
                  relative: true,
                },
                { x: 0, y: -62.155, command: 'L', relative: true },
                {
                  x: 24.193421875,
                  y: -57.270515625,
                  command: 'L',
                  relative: true,
                },
                { x: 43.950125, y: -43.950125, command: 'L', relative: true },
                {
                  x: 57.270515625,
                  y: -24.193421875,
                  command: 'L',
                  relative: true,
                },
                { x: 62.155, y: 0, command: 'L', relative: true },
                {
                  x: 57.270515625,
                  y: 24.193421875,
                  command: 'L',
                  relative: true,
                },
                { x: 43.950125, y: 43.950125, command: 'L', relative: true },
                {
                  x: 24.193421875,
                  y: 57.270515625,
                  command: 'L',
                  relative: true,
                },
                { x: 0, y: 62.155, command: 'Z', relative: true },
              ],
              fill: 'black',
              linewidth: 1,
              opacity: 1,
              visible: true,
              cap: 'butt',
              join: 'miter',
              miter: 4,
              closed: true,
              curved: false,
              automatic: false,
              beginning: 0,
              ending: 1,
              className: '',
              translation: { x: 200, y: 200.16 },
              rotation: 0,
              scale: 1,
              skewX: 0,
              skewY: 0,
            },
          ],
          translation: { x: 0, y: 0 },
          rotation: 0,
          scale: 1,
          opacity: 1,
          className: '',
          mask: {
            vertices: [
              {
                x: 0,
                y: 0,
                command: 'M',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 0,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 400,
                y: 400.32,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
              {
                x: 0,
                y: 400.32,
                command: 'L',
                relative: true,
                controls: { left: { x: 0, y: 0 }, right: { x: 0, y: 0 } },
              },
            ],
            fill: '#fff',
            stroke: '#000',
            linewidth: 1,
            opacity: 1,
            visible: true,
            cap: 'butt',
            join: 'miter',
            miter: 4,
            closed: true,
            curved: false,
            automatic: false,
            beginning: 0,
            ending: 1,
            className: '',
            translation: { x: 0, y: 0 },
            rotation: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
            width: 400,
            height: 400.32,
            origin: { x: -200, y: -200.16 },
          },
        };
        var svg = QUnit.Utils.textToDOM(resp)[0];
        var shape = two.interpret(svg).subdivide(3);
        var group = two.makeGroup();

        group.translation.copy(shape.children[0].translation);

        _.each(shape.children[0].vertices, function (v) {
          var circle = new Two.Circle(v.x, v.y, 3);
          circle.noStroke().fill = 'red';
          group.add(circle);
        });

        two.update();

        assert.ok(
          QUnit.Utils.shapeEquals(answer, shape),
          'Two.subdivide subdivides holes properly.'
        );
        assert.done();

        QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement, svg]);
      });
    })();
  });
})();
