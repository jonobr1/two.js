/**
 * Tests Two.js Utilities related to getBoundingClientRect methods:
 * + polygon._matrix transformations
 * + Two.getComputedMatrix
 */

(function() {

  QUnit.module('getBoundingClientRect');

  QUnit.test('Two.Path.getBoundingClientRect', function(assert) {

    assert.expect(5);
    // assert.done = assert.async(4);

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var answer = {"top":134.17185349699037,"left":134.17185349699037,"right":265.82814650300963,"bottom":265.82814650300963,"width":131.65629300601927,"height":131.65629300601927};
      var shape = two.makeRectangle(200, 200, 100, 100);
      shape.rotation = Math.PI / 8;
      shape.noStroke().fill = 'rgb(60, 209, 201)';

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(shape.getBoundingClientRect());

      assert.equal(a1, a2, true, 'Two.Path.getBoundingClientRect properly calculates rotated shapes.');

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var answer = {"top":129.67185362539465,"left":129.67185362539465,"right":270.32814637460535,"bottom":270.32814637460535,"width":140.6562927492107,"height":140.6562927492107};
      var shape = two.makeRectangle(200, 200, 50, 50);
      shape.rotation = Math.PI / 8;
      shape.fill = 'rgb(60, 209, 201)';
      shape.stroke = '#ccc';
      shape.linewidth = 5;
      shape.scale = 2;

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(shape.getBoundingClientRect());

      assert.equal(a1, a2, true, 'Two.Path.getBoundingClientRect properly calculates scaled shapes.');

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var answer = {"top":150,"left":150,"right":250,"bottom":250,"width":100,"height":100};
      var shape = two.makeCircle(200, 200, 50);
      shape.fill = 'rgb(60, 209, 201)';
      shape.linewidth = 0;

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(shape.getBoundingClientRect());

      assert.equal(a1, a2, true, 'Two.Path.getBoundingClientRect properly calculates circles.');

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var answer = {"top":150.00000085571355,"left":150.00000085571355,"right":249.99999914428645,"bottom":249.99999914428645,"width":99.9999982885729,"height":99.9999982885729};
      var shape = two.makeCircle(200, 200, 50);
      shape.fill = 'rgb(60, 209, 201)';
      shape.linewidth = 0;
      shape.rotation = Math.PI / 4;

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      var a1 = JSON.stringify(answer);
      var a2 = JSON.stringify(shape.getBoundingClientRect());

      assert.equal(a1, a2, true, 'Two.Path.getBoundingClientRect properly calculates rotated circles (projected).');

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var answer = {"top":182.75222946912982,"left":167.23314124921308,"right":232.76685875078692,"bottom":217.24777053087018,"width":65.53371750157385,"height":34.49554106174037};
      var shape = two.makeText('Hello World', 200, 200);
      shape.rotation = Math.PI / 8;
      shape.noStroke().fill = 'rgb(60, 209, 201)';

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      assert.equal(_.isEqual(answer, shape.getBoundingClientRect()), true, 'Two.Text.getBoundingClientRect properly calculates rotated shapes.');

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);

    })();

  });

  QUnit.test('Two.getComputedMatrix', function(assert) {

    assert.expect(1);
    // assert.done = assert.async(1);

    (function() {

      var two = new Two({
        width: 400,
        height: 400
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

      var answer = {"top":92.846993444976,"left":146.96659183364787,"right":437.80928707260216,"bottom":383.6896886839303,"width":290.8426952389543,"height":290.8426952389543};

      var bBox = group.getBoundingClientRect();
      var rect = two.makeRectangle(
        bBox.left + bBox.width / 2, bBox.top + bBox.height / 2,
        bBox.width, bBox.height
      );
      rect.noFill().stroke = 'orangered';

      var bBoxClose = shape.getBoundingClientRect();
      var rectClose = two.makeRectangle(
        bBoxClose.left + bBoxClose.width / 2,
        bBoxClose.top + bBoxClose.height / 2,
        bBoxClose.width, bBoxClose.height
      );
      rectClose.noFill().stroke = 'green';

      two.update();

      assert.equal(_.isEqual(answer, bBox) && _.isEqual(answer, bBoxClose), true, 'Two.Path.getBoundingClientRect properly calculates nested shapes / groups.');

      QUnit.Utils.addElemToTest(assert.test, [two.renderer.domElement]);

    })();

  });

})();
