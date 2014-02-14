/**
 * Tests Two.js Utilities related to getBoundingClientRect methods:
 * + polygon._matrix transformations
 * + Two.getComputedMatrix
 */

(function() {

  module('getBoundingClientRect');

  test('Two.Polygon.getBoundingClientRect', 4, function(o) {

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var answer = {"top":134.17185348272324,"left":134.17185348272324,"right":265.82814651727676,"bottom":265.82814651727676,"width":131.65629303455353,"height":131.65629303455353};
      var shape = two.makeRectangle(200, 200, 100, 100);
      shape.rotation = Math.PI / 8;
      shape.noStroke().fill = 'rgb(60, 209, 201)';

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      equal(_.isEqual(answer, shape.getBoundingClientRect()), true, 'Two.Polygon.getBoundingClientRect properly calculates rotated shapes.');

      QUnit.Utils.addElemToTest(o, [two.renderer.domElement]);

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var answer = {"top":132.17185348272324,"left":132.17185348272324,"right":267.82814651727676,"bottom":267.82814651727676,"width":135.65629303455353,"height":135.65629303455353};
      var shape = two.makeRectangle(200, 200, 50, 50);
      shape.rotation = Math.PI / 8;
      shape.fill = 'rgb(60, 209, 201)';
      shape.stroke = '#ccc';
      shape.linewidth = 5;
      shape.scale = 2;

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      equal(_.isEqual(answer, shape.getBoundingClientRect()), true, 'Two.Polygon.getBoundingClientRect properly calculates scaled shapes.');

      QUnit.Utils.addElemToTest(o, [two.renderer.domElement]);

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var answer = {"top":150,"left":150,"right":250,"bottom":250,"width":100,"height":100};
      var shape = two.makeCircle(200, 200, 50, 50);
      shape.fill = 'rgb(60, 209, 201)';
      shape.linewidth = 0;

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      equal(_.isEqual(answer, shape.getBoundingClientRect()), true, 'Two.Polygon.getBoundingClientRect properly calculates circles.');

      QUnit.Utils.addElemToTest(o, [two.renderer.domElement]);

    })();

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var answer = {"top":150.00000085571355,"left":150.00000085571355,"right":249.99999914428645,"bottom":249.99999914428645,"width":99.9999982885729,"height":99.9999982885729};
      var shape = two.makeCircle(200, 200, 50, 50);
      shape.fill = 'rgb(60, 209, 201)';
      shape.linewidth = 0;
      shape.rotation = Math.PI / 4;

      var box = two.makeRectangle(answer.left + answer.width / 2, answer.top + answer.height / 2, answer.width, answer.height);
      box.noFill();

      two.update();

      equal(_.isEqual(answer, shape.getBoundingClientRect()), true, 'Two.Polygon.getBoundingClientRect properly calculates rotated circles (projected).');

      QUnit.Utils.addElemToTest(o, [two.renderer.domElement]);

    })();

  });

  test('Two.getComputedMatrix', 1, function(o) {

    (function() {

      var two = new Two({
        width: 400,
        height: 400
      });

      var parentGroup = two.makeGroup();
      parentGroup.scale = 2;
      parentGroup.translation.set(two.width / 2, two.height / 2);
      parentGroup.rotation = Math.PI/8;

      var group = two.makeGroup();
      group.scale = 2;
      group.translation.set(50, 0);
      group.rotation = Math.PI/8;

      var shape = two.makeRectangle(0, 0, 50, 50);
      shape.fill = 'black';

      parentGroup.add(group);
      group.add(shape);

      var answer = {"top":96.34699320793152,"left":150.4665915966034,"right":434.3092873096466,"bottom":380.18968892097473,"width":283.8426957130432,"height":283.8426957130432};

      var bBox = group.getBoundingClientRect();
      var rect = two.makeRectangle(bBox.left + bBox.width/2, bBox.top + bBox.height/2, bBox.width, bBox.height);
      rect.noFill().stroke = 'orangered';

      var bBoxClose = shape.getBoundingClientRect();
      var rectClose = two.makeRectangle(0, 0, bBoxClose.width, bBoxClose.height);
      rectClose.noFill().stroke = 'green';

      two.update();

      equal(_.isEqual(answer, bBox) && _.isEqual(answer, bBoxClose), true, 'Two.Polygon.getBoundingClientRect properly calculates nested shapes / groups.');

      QUnit.Utils.addElemToTest(o, [two.renderer.domElement]);

    })();

  });

})();
