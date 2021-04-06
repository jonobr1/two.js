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

      var answer = {"top":134.01857201755047,"left":134.01857201755047,"right":265.98142798244953,"bottom":265.98142798244953,"width":131.96285596489906,"height":131.96285596489906};;
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

      var answer = {"top":128.13903883099556,"left":128.13903883099556,"right":271.86096116900444,"bottom":271.86096116900444,"width":143.72192233800888,"height":143.72192233800888};
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

      var answer = {"top":129.28932309150696,"left":129.28932309150696,"right":270.71067690849304,"bottom":270.71067690849304,"width":141.42135381698608,"height":141.42135381698608};
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

      var answer = {"top":175.72990523278713,"left":157.11276014745235,"right":242.88723985254765,"bottom":224.27009476721287,"width":85.7744797050953,"height":48.540189534425735};
      var shape = two.makeText('Hello World', 200, 200);
      shape.rotation = Math.PI / 8;
      shape.noStroke().fill = 'rgb(60, 209, 201)';

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      assert.equal(_.isEqual(answer, shape.getBoundingClientRect()), true, 'Two.Text.getBoundingClientRect properly calculates rotated shapes.');

      console.log(JSON.stringify(shape.getBoundingClientRect()));
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

      var answer = {"top":91.19013929367065,"left":145.30973768234253,"right":439.46614122390747,"bottom":385.3465428352356,"width":294.15640354156494,"height":294.15640354156494};

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
