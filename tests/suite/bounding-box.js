/**
 * Tests Two.js Utilities related to getBoundingClientRect methods:
 * + polygon._matrix transformations
 * + Two.getComputedMatrix
 */

(function () {
  QUnit.module('getBoundingClientRect');

  QUnit.test('Two.Path.getBoundingClientRect', function (assert) {
    assert.expect(5);
    // assert.done = assert.async(4);

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      var answer = {
        top: 134.671853,
        left: 134.671853,
        right: 265.328146,
        bottom: 265.328146,
        width: 130.656293,
        height: 130.656293,
      };
      var shape = two.makeRectangle(200, 200, 100, 100);
      shape.rotation = Math.PI / 8;
      shape.noStroke().fill = 'rgb(60, 209, 201)';

      var box = two.makeRectangle(
        answer.left + answer.width / 2,
        answer.top + answer.height / 2,
        answer.width,
        answer.height
      );
      box.noFill();

      two.update();

      var rect = shape.getBoundingClientRect();
      for (let prop in rect) {
        var value = rect[prop];
        rect[prop] = Two.Utils.toFixed(value);
      }
      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(rect);

      assert.equal(
        a1,
        a2,
        true,
        'Two.Path.getBoundingClientRect properly calculates rotated shapes.'
      );

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      var answer = {
        top: 129.671853,
        left: 129.671853,
        right: 270.328146,
        bottom: 270.328146,
        width: 140.656293,
        height: 140.656293,
      };
      var shape = two.makeRectangle(200, 200, 50, 50);
      shape.rotation = Math.PI / 8;
      shape.fill = 'rgb(60, 209, 201)';
      shape.stroke = '#ccc';
      shape.linewidth = 5;
      shape.scale = 2;

      var box = two.makeRectangle(
        answer.left + answer.width / 2,
        answer.top + answer.height / 2,
        answer.width,
        answer.height
      );
      box.noFill();

      two.update();

      var rect = shape.getBoundingClientRect();
      for (let prop in rect) {
        var value = rect[prop];
        rect[prop] = Two.Utils.toFixed(value);
      }
      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(rect);

      assert.equal(
        a1,
        a2,
        true,
        'Two.Path.getBoundingClientRect properly calculates scaled shapes.'
      );

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      var answer = {
        top: 150,
        left: 150,
        right: 250,
        bottom: 250,
        width: 100,
        height: 100,
      };
      var shape = two.makeCircle(200, 200, 50);
      shape.fill = 'rgb(60, 209, 201)';
      shape.linewidth = 0;

      var box = two.makeRectangle(
        answer.left + answer.width / 2,
        answer.top + answer.height / 2,
        answer.width,
        answer.height
      );
      box.noFill();

      two.update();

      var rect = shape.getBoundingClientRect();
      for (let prop in rect) {
        var value = rect[prop];
        rect[prop] = Two.Utils.toFixed(value);
      }
      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(rect);

      assert.equal(
        a1,
        a2,
        true,
        'Two.Path.getBoundingClientRect properly calculates circles.'
      );

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      var answer = {
        top: 150,
        left: 150,
        right: 249.999999,
        bottom: 249.999999,
        width: 99.999998,
        height: 99.999998,
      };
      var shape = two.makeCircle(200, 200, 50);
      shape.fill = 'rgb(60, 209, 201)';
      shape.linewidth = 0;
      shape.rotation = Math.PI / 4;

      var box = two.makeRectangle(
        answer.left + answer.width / 2,
        answer.top + answer.height / 2,
        answer.width,
        answer.height
      );
      box.noFill();

      two.update();

      var rect = shape.getBoundingClientRect();
      for (let prop in rect) {
        var value = rect[prop];
        rect[prop] = Two.Utils.toFixed(value);
      }
      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(rect);

      assert.equal(
        a1,
        a2,
        true,
        'Two.Path.getBoundingClientRect properly calculates rotated circles (projected).'
      );

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);
    })();

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      var answer = {
        top: 182.752229,
        left: 167.233141,
        right: 232.766858,
        bottom: 217.24777,
        width: 65.533717,
        height: 34.495541,
      };
      var shape = two.makeText('Hello World', 200, 200);
      shape.rotation = Math.PI / 8;
      shape.noStroke().fill = 'rgb(60, 209, 201)';

      var box = two.makeRectangle(
        answer.left + answer.width / 2,
        answer.top + answer.height / 2,
        answer.width,
        answer.height
      );
      box.noFill();

      two.update();

      var rect = shape.getBoundingClientRect();
      for (let prop in rect) {
        var value = rect[prop];
        rect[prop] = Two.Utils.toFixed(value);
      }
      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(rect);

      assert.equal(
        a1,
        a2,
        true,
        'Two.Text.getBoundingClientRect properly calculates rotated shapes.'
      );

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);
    })();
  });

  QUnit.test('Two.getComputedMatrix', function (assert) {
    assert.expect(2);
    // assert.done = assert.async(1);

    (function () {
      var two = new Two({
        width: 400,
        height: 400,
      });

      two.renderer.domElement.style.border = '1px solid blue';

      var parentGroup = two.makeGroup();
      parentGroup.scale = 2;
      parentGroup.translation.set(two.width / 2, two.height / 2);
      parentGroup.rotation = Math.PI / 8;

      var group = two.makeGroup();
      group.scale = 2;
      group.translation.set(50, 0);
      group.rotation = Math.PI / 8;

      var shape = two.makeRectangle(0, 0, 50, 50);
      shape.fill = 'black';
      shape.stroke = 'yellow';
      shape.linewidth = 2;

      parentGroup.add(group);
      group.add(shape);

      var answer = {
        top: 95.846993,
        left: 149.966591,
        right: 434.809287,
        bottom: 380.689688,
        width: 284.842695,
        height: 284.842695,
      };

      var bBox = group.getBoundingClientRect();
      var rect = two.makeRectangle(
        bBox.left + bBox.width / 2,
        bBox.top + bBox.height / 2,
        bBox.width,
        bBox.height
      );
      rect.noFill().stroke = 'orangered';

      var bBoxClose = shape.getBoundingClientRect();
      var rectClose = two.makeRectangle(
        bBoxClose.left + bBoxClose.width / 2,
        bBoxClose.top + bBoxClose.height / 2,
        bBoxClose.width,
        bBoxClose.height
      );
      rectClose.noFill().stroke = 'green';

      two.update();

      for (var prop in bBox) {
        bBox[prop] = Two.Utils.toFixed(bBox[prop]);
        bBoxClose[prop] = Two.Utils.toFixed(bBoxClose[prop]);
      }

      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(bBox);
      var a3 = JSON.stringify(bBoxClose);

      assert.equal(
        a1,
        a2,
        true,
        'Two.Path.getBoundingClientRect properly calculates parent’s Two.Group.getBoundingClientRect.'
      );
      assert.equal(
        a1,
        a3,
        true,
        'Two.Path.getBoundingClientRect properly calculates child’s Two.Group.getBoundingClientRect.'
      );

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);
    })();
  });
})();
