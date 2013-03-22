/**
 * Tests Two.js Core Classes Functionality:
 * + Two.Vector
 * + Two.Matrix
 */

module('Core');

test('Two.Vector', 44, function() {

  var vector = new Two.Vector();

  equal(vector.x, 0, 'x property defaults to 0.');
  equal(vector.y, 0, 'y property defaults to 0.');

  vector.x = 5;
  vector.y = 5;

  equal(vector.x, 5, 'x property can be set properly.');
  equal(vector.y, 5, 'y property can be set properly.');

  vector.set(10, 10);
  equal(vector.x, 10, 'Two.Vector.set applies x value properly.');
  equal(vector.y, 10, 'Two.Vector.set applies y value properly.');

  vector.copy({ x: 20, y: 20 });
  equal(vector.x, 20, 'Two.Vector.copy applies x value properly.');
  equal(vector.y, 20, 'Two.Vector.copy applies y value properly.');

  vector.clear();
  equal(vector.x, 0, 'Two.Vector.clear applies x value properly.');
  equal(vector.y, 0, 'Two.Vector.clear applies y value properly.');

  vector.set(10, 10);
  var clone = vector.clone();
  ok(clone instanceof Two.Vector, 'Two.Vector.clone returns an instance of Two.Vector.');
  equal(clone.x, vector.x, 'Two.Vector.clone applies x value properly.');
  equal(clone.y, vector.y, 'Two.Vector.clone applies y value properly.');

  vector.add({ x: 5, y: 5 }, { x: 10, y: 10 });
  equal(vector.x, 15, 'Two.Vector.add applies x value properly.');
  equal(vector.y, 15, 'Two.Vector.add applies y value properly.');

  vector.addSelf({ x: 5, y: 5 });
  equal(vector.x, 20, 'Two.Vector.addSelf applies x value properly.');
  equal(vector.y, 20, 'Two.Vector.addSelf applies y value properly.');

  vector.sub({ x: 10, y: 10 }, { x: 5, y: 5 });
  equal(vector.x, 5, 'Two.Vector.sub applies x value properly.');
  equal(vector.y, 5, 'Two.Vector.sub applies y value properly.');

  vector.subSelf({ x: 5, y: 5 });
  equal(vector.x, 0, 'Two.Vector.subSelf applies x value properly.');
  equal(vector.y, 0, 'Two.Vector.subSelf applies y value properly.');

  vector.set(2.5, 2.5);
  vector.multiplySelf({ x: 2, y: 2 });
  equal(vector.x, 5, 'Two.Vector.multiplySelf applies x value properly.');
  equal(vector.y, 5, 'Two.Vector.multiplySelf applies y value properly.');

  vector.multiplyScalar(2);
  equal(vector.x, 10, 'Two.Vector.multiplyScalar applies x value properly.');
  equal(vector.y, 10, 'Two.Vector.multiplyScalar applies y value properly.');

  vector.divideScalar(2);
  equal(vector.x, 5, 'Two.Vector.divideScalar applies x value properly.');
  equal(vector.y, 5, 'Two.Vector.divideScalar applies y value properly.');

  vector.divideScalar();
  equal(vector.x, 0, 'Two.Vector.divideScalar applies x value properly.');
  equal(vector.y, 0, 'Two.Vector.divideScalar applies y value properly.');

  vector.set(1, -1);
  vector.negate();
  equal(vector.x, -1, 'Two.Vector.negate applies x value properly.');
  equal(vector.y, 1, 'Two.Vector.negate applies y value properly.');

  equal(vector.dot({ x: 5, y: 5 }), 0, 'Two.Vector.dot returns correct result.');

  vector.set(5, 5);
  equal(vector.lengthSquared(), 50, 'Two.Vector.lengthSquared returns correct result.');
  equal(vector.length(), Math.sqrt(50), 'Two.Vector.length returns correct result.');

  vector.normalize();
  equal(vector.x, 5 / Math.sqrt(50), 'Two.Vector.normalize applies x value properly.');
  equal(vector.y, 5 / Math.sqrt(50), 'Two.Vector.normalize applies y value properly.');

  vector.set(0, 0);
  clone.set(5, 5);
  equal(vector.distanceToSquared(clone), 50, 'Two.Vector.distanceToSquared returns correct result.');
  equal(vector.distanceTo(clone), Math.sqrt(50), 'Two.Vector.distanceTo, returns correct result.');

  vector.set(1, 1).setLength(5);
  equal(vector.x, 5 / Math.sqrt(2), 'Two.Vector.setLength applies x value properly.');
  equal(vector.y, 5 / Math.sqrt(2), 'Two.Vector.setLength applies x value properly.');

  vector.set(1, 1);
  equal(vector.equals({ x: 1, y: 1 }), true, 'Two.Vector.equals returns correct result.');

  vector.lerp({ x: 5, y: 5 }, 0.5);
  equal(vector.x, (5 - 1) * 0.5 + 1, 'Two.Vector.lerp applies x value properly.');
  equal(vector.y, (5 - 1) * 0.5 + 1, 'Two.Vector.lerp applies y value properly.');

  vector.clear();
  equal(vector.isZero(), true, 'Two.Vector.isZero returns correct result.');

});

test('Two.Matrix', 10, function() {

  var matrix = new Two.Matrix();
  var check = true;

  matrix.set(0, 0, 0, 0, 0, 0, 0, 0, 0);

  for (var i = 0; i < matrix.elements.length; i++) {
    var el = matrix.elements[i];
    if (el !== 0) {
      check = false;
      break;
    }
  }

  equal(check, true, 'Two.Matrix.set applies elements properly.');

  matrix.identity();
  var identity = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];

  check = true;

  for (var i = 0; i < matrix.elements.length; i++) {
    var a = matrix.elements[i];
    var b = identity[i];
    if (a !== b) {
      check = false;
      break;
    }
  }

  equal(check, true, 'Two.Matrix.identity applies elements properly.');

  matrix.set(1, 2, 3, 4, 5, 6, 7, 8, 9);
  matrix.multiply(9, 8, 7, 6, 5, 4, 3, 2, 1);

  var result = [
    30, 24, 18,
    84, 69, 54,
    138, 114, 90
  ];

  check = true;

  for (var i = 0; i < matrix.elements.length; i++) {
    var a = matrix.elements[i];
    var b = result[i];
    if (a !== b) {
      check = false;
      break;
    }
  }

  equal(check, true, 'Two.Matrix.multiply applies elements properly when multiplied by another matrix.');

  matrix.set(1, 2, 3, 4, 5, 6, 7, 8, 9);
  var vector = matrix.multiply(9, 8, 7);

  result = { x: 46, y: 118, z: 190 };

  check = true;

  deepEqual(vector, result, 'Two.Matrix.multiply applies elements properly when multipled by a vector.');

  matrix.set(1, 1, 1, 1, 1, 1, 1, 1, 1);
  matrix.multiply(9);

  check = true;

  for (var i = 0; i < matrix.elements.length; i++) {
    var el = matrix.elements[i];
    if (el !== 9) {
      check = false;
      break;
    }
  }

  equal(check, true, 'Two.Matrix.multiply applies elements properly when multiplied by a scalar.');

  matrix.set(1, 2, 3, 4, 5, 6, 7, 8, 9);

  deepEqual(matrix.toArray(), [1, 4, 2, 5, 3, 6], 'Two.Matrix.toArray returns correct result for 6 digit transformation.');
  deepEqual(matrix.toArray(true), [1, 4, 7, 2, 5, 8, 3, 6, 9], 'Two.Matrix.toArray returns correct result for 9 digit transformation.');
  equal(matrix.toString(), '1 4 2 5 3 6', 'Two.Matrix.toString returns correct result for 6 digit transformation.');

  var clone = matrix.clone();
  ok(clone instanceof Two.Matrix, 'Two.Matrix.clone returns instance of Two.Matrix.');
  deepEqual(clone.elements, matrix.elements, 'Two.Matrix.clone applies elements properly.');

});