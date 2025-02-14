/**
 * Tests Two.js Core Classes Functionality:
 * + Two.Utils ( Underscore Methods )
 * + Two.Events
 * + Two.Vector
 * + Two.Matrix
 * + Two.Collection
 * + Two.Shape
 * + Two.Registry
 * + Two.Texture
 * + Two
 */

QUnit.module('Core');

QUnit.test('Two.Events', function (assert) {
  assert.expect(1);

  var item = new Two.Events();

  item.bind('change', function (message) {
    assert.equal(message, 'hello', 'Bound Two.Events successfully.');
  });
  item.trigger('change', 'hello');
  item.unbind('change');
  item.trigger('change');
});

QUnit.test('Two.Vector', function (assert) {
  assert.expect(48);

  var vector = new Two.Anchor();

  assert.equal(vector.x, 0, 'x property defaults to 0.');
  assert.equal(vector.y, 0, 'y property defaults to 0.');

  vector.x = 5;
  vector.y = 5;

  assert.equal(vector.x, 5, 'x property can be set properly.');
  assert.equal(vector.y, 5, 'y property can be set properly.');

  vector.set(10, 10);
  assert.equal(vector.x, 10, 'Two.Vector.set applies x value properly.');
  assert.equal(vector.y, 10, 'Two.Vector.set applies y value properly.');

  vector.copy({ x: 20, y: 20 });
  assert.equal(vector.x, 20, 'Two.Vector.copy applies x value properly.');
  assert.equal(vector.y, 20, 'Two.Vector.copy applies y value properly.');

  vector.clear();
  assert.equal(vector.x, 0, 'Two.Vector.clear applies x value properly.');
  assert.equal(vector.y, 0, 'Two.Vector.clear applies y value properly.');

  vector.set(10, 10);
  var clone = vector.clone();
  assert.ok(
    clone instanceof Two.Vector,
    'Two.Vector.clone returns an instance of Two.Vector.'
  );
  assert.equal(clone.x, vector.x, 'Two.Vector.clone applies x value properly.');
  assert.equal(clone.y, vector.y, 'Two.Vector.clone applies y value properly.');

  vector.add({ x: 5, y: 5 });
  assert.equal(vector.x, 15, 'Two.Vector.add applies x value properly.');
  assert.equal(vector.y, 15, 'Two.Vector.add applies y value properly.');

  vector.addSelf({ x: 5, y: 5 });
  assert.equal(vector.x, 20, 'Two.Vector.addSelf applies x value properly.');
  assert.equal(vector.y, 20, 'Two.Vector.addSelf applies y value properly.');

  vector.sub({ x: 15, y: 15 });
  assert.equal(vector.x, 5, 'Two.Vector.sub applies x value properly.');
  assert.equal(vector.y, 5, 'Two.Vector.sub applies y value properly.');

  vector.subSelf({ x: 5, y: 5 });
  assert.equal(vector.x, 0, 'Two.Vector.subSelf applies x value properly.');
  assert.equal(vector.y, 0, 'Two.Vector.subSelf applies y value properly.');

  vector.set(2.5, 2.5);
  vector.multiplySelf({ x: 2, y: 2 });
  assert.equal(
    vector.x,
    5,
    'Two.Vector.multiplySelf applies x value properly.'
  );
  assert.equal(
    vector.y,
    5,
    'Two.Vector.multiplySelf applies y value properly.'
  );

  vector.multiplyScalar(2);
  assert.equal(
    vector.x,
    10,
    'Two.Vector.multiplyScalar applies x value properly.'
  );
  assert.equal(
    vector.y,
    10,
    'Two.Vector.multiplyScalar applies y value properly.'
  );

  vector.divideScalar(2);
  assert.equal(
    vector.x,
    5,
    'Two.Vector.divideScalar applies x value properly.'
  );
  assert.equal(
    vector.y,
    5,
    'Two.Vector.divideScalar applies y value properly.'
  );

  vector.divideScalar();
  assert.equal(
    vector.x,
    5,
    'Two.Vector.divideScalar applies x value properly.'
  );
  assert.equal(
    vector.y,
    5,
    'Two.Vector.divideScalar applies y value properly.'
  );

  vector.set(1, -1);
  vector.negate();
  assert.equal(vector.x, -1, 'Two.Vector.negate applies x value properly.');
  assert.equal(vector.y, 1, 'Two.Vector.negate applies y value properly.');

  assert.equal(
    vector.dot({ x: 5, y: 5 }),
    0,
    'Two.Vector.dot returns correct result.'
  );

  vector.set(5, 5);
  assert.equal(
    vector.lengthSquared(),
    50,
    'Two.Vector.lengthSquared returns correct result.'
  );
  assert.equal(
    vector.length(),
    Math.sqrt(50),
    'Two.Vector.length returns correct result.'
  );

  vector.normalize();
  assert.equal(
    vector.x,
    5 / Math.sqrt(50),
    'Two.Vector.normalize applies x value properly.'
  );
  assert.equal(
    vector.y,
    5 / Math.sqrt(50),
    'Two.Vector.normalize applies y value properly.'
  );

  vector.set(0, 0);
  clone.set(5, 5);
  assert.equal(
    vector.distanceToSquared(clone),
    50,
    'Two.Vector.distanceToSquared returns correct result.'
  );
  assert.equal(
    vector.distanceTo(clone),
    Math.sqrt(50),
    'Two.Vector.distanceTo, returns correct result.'
  );

  vector.set(1, 1).setLength(5);
  assert.equal(
    vector.x,
    5 / Math.sqrt(2),
    'Two.Vector.setLength applies x value properly.'
  );
  assert.equal(
    vector.y,
    5 / Math.sqrt(2),
    'Two.Vector.setLength applies x value properly.'
  );

  vector.set(1, 1);
  assert.equal(
    vector.equals({ x: 1, y: 1 }),
    true,
    'Two.Vector.equals returns correct result.'
  );

  vector.lerp({ x: 5, y: 5 }, 0.5);
  assert.equal(
    vector.x,
    (5 - 1) * 0.5 + 1,
    'Two.Vector.lerp applies x value properly.'
  );
  assert.equal(
    vector.y,
    (5 - 1) * 0.5 + 1,
    'Two.Vector.lerp applies y value properly.'
  );

  vector.clear();
  assert.equal(
    vector.isZero(),
    true,
    'Two.Vector.isZero returns correct result.'
  );

  vector.set(9, 3);
  vector.rotate(Math.PI / 2);
  assert.equal(
    vector.equals({ x: -2.9999999999999996, y: 9 }),
    true,
    'Two.Vector.rotate applies x, y properly.'
  );
  vector.rotate(Math.PI / 2);
  assert.equal(
    vector.equals({ x: -9, y: -2.999999999999999 }),
    true,
    'Two.Vector.rotate applies x, y properly.'
  );
  vector.rotate(Math.PI / 2);
  assert.equal(
    vector.equals({ x: 2.9999999999999987, y: -9 }),
    true,
    'Two.Vector.rotate applies x, y properly.'
  );
  vector.rotate(Math.PI / 2);
  assert.equal(
    vector.equals({ x: 9, y: 2.9999999999999982 }),
    true,
    'Two.Vector.rotate applies x, y properly.'
  );
});

QUnit.test('Bound Two.Vector', function (assert) {
  assert.expect(45);

  var vector = new Two.Anchor();
  vector.bind(Two.Events.Types.change, function () {});

  assert.equal(vector._bound, true, 'Vector is bound.');
  assert.equal(vector.x, 0, 'x property defaults to 0.');
  assert.equal(vector.y, 0, 'y property defaults to 0.');

  vector.x = 5;
  vector.y = 5;

  assert.equal(vector.x, 5, 'x property can be set properly.');
  assert.equal(vector.y, 5, 'y property can be set properly.');

  vector.set(10, 10);
  assert.equal(vector.x, 10, 'Two.Vector.set applies x value properly.');
  assert.equal(vector.y, 10, 'Two.Vector.set applies y value properly.');

  vector.copy({ x: 20, y: 20 });
  assert.equal(vector.x, 20, 'Two.Vector.copy applies x value properly.');
  assert.equal(vector.y, 20, 'Two.Vector.copy applies y value properly.');

  vector.clear();
  assert.equal(vector.x, 0, 'Two.Vector.clear applies x value properly.');
  assert.equal(vector.y, 0, 'Two.Vector.clear applies y value properly.');

  vector.set(10, 10);
  var clone = vector.clone();
  assert.ok(
    clone instanceof Two.Vector,
    'Two.Vector.clone returns an instance of Two.Vector.'
  );
  assert.equal(clone.x, vector.x, 'Two.Vector.clone applies x value properly.');
  assert.equal(clone.y, vector.y, 'Two.Vector.clone applies y value properly.');

  vector.add({ x: 5, y: 5 });
  assert.equal(vector.x, 15, 'Two.Vector.add applies x value properly.');
  assert.equal(vector.y, 15, 'Two.Vector.add applies y value properly.');

  vector.addSelf({ x: 5, y: 5 });
  assert.equal(vector.x, 20, 'Two.Vector.addSelf applies x value properly.');
  assert.equal(vector.y, 20, 'Two.Vector.addSelf applies y value properly.');

  vector.sub({ x: 15, y: 15 });
  assert.equal(vector.x, 5, 'Two.Vector.sub applies x value properly.');
  assert.equal(vector.y, 5, 'Two.Vector.sub applies y value properly.');

  vector.subSelf({ x: 5, y: 5 });
  assert.equal(vector.x, 0, 'Two.Vector.subSelf applies x value properly.');
  assert.equal(vector.y, 0, 'Two.Vector.subSelf applies y value properly.');

  vector.set(2.5, 2.5);
  vector.multiplySelf({ x: 2, y: 2 });
  assert.equal(
    vector.x,
    5,
    'Two.Vector.multiplySelf applies x value properly.'
  );
  assert.equal(
    vector.y,
    5,
    'Two.Vector.multiplySelf applies y value properly.'
  );

  vector.multiplyScalar(2);
  assert.equal(
    vector.x,
    10,
    'Two.Vector.multiplyScalar applies x value properly.'
  );
  assert.equal(
    vector.y,
    10,
    'Two.Vector.multiplyScalar applies y value properly.'
  );

  vector.divideScalar(2);
  assert.equal(
    vector.x,
    5,
    'Two.Vector.divideScalar applies x value properly.'
  );
  assert.equal(
    vector.y,
    5,
    'Two.Vector.divideScalar applies y value properly.'
  );

  vector.divideScalar();
  assert.equal(
    vector.x,
    5,
    'Two.Vector.divideScalar applies x value properly.'
  );
  assert.equal(
    vector.y,
    5,
    'Two.Vector.divideScalar applies y value properly.'
  );

  vector.set(1, -1);
  vector.negate();
  assert.equal(vector.x, -1, 'Two.Vector.negate applies x value properly.');
  assert.equal(vector.y, 1, 'Two.Vector.negate applies y value properly.');

  assert.equal(
    vector.dot({ x: 5, y: 5 }),
    0,
    'Two.Vector.dot returns correct result.'
  );

  vector.set(5, 5);
  assert.equal(
    vector.lengthSquared(),
    50,
    'Two.Vector.lengthSquared returns correct result.'
  );
  assert.equal(
    vector.length(),
    Math.sqrt(50),
    'Two.Vector.length returns correct result.'
  );

  vector.normalize();
  assert.equal(
    vector.x,
    5 / Math.sqrt(50),
    'Two.Vector.normalize applies x value properly.'
  );
  assert.equal(
    vector.y,
    5 / Math.sqrt(50),
    'Two.Vector.normalize applies y value properly.'
  );

  vector.set(0, 0);
  clone.set(5, 5);
  assert.equal(
    vector.distanceToSquared(clone),
    50,
    'Two.Vector.distanceToSquared returns correct result.'
  );
  assert.equal(
    vector.distanceTo(clone),
    Math.sqrt(50),
    'Two.Vector.distanceTo, returns correct result.'
  );

  vector.set(1, 1).setLength(5);
  assert.equal(
    vector.x,
    5 / Math.sqrt(2),
    'Two.Vector.setLength applies x value properly.'
  );
  assert.equal(
    vector.y,
    5 / Math.sqrt(2),
    'Two.Vector.setLength applies x value properly.'
  );

  vector.set(1, 1);
  assert.equal(
    vector.equals({ x: 1, y: 1 }),
    true,
    'Two.Vector.equals returns correct result.'
  );

  vector.lerp({ x: 5, y: 5 }, 0.5);
  assert.equal(
    vector.x,
    (5 - 1) * 0.5 + 1,
    'Two.Vector.lerp applies x value properly.'
  );
  assert.equal(
    vector.y,
    (5 - 1) * 0.5 + 1,
    'Two.Vector.lerp applies y value properly.'
  );

  vector.clear();
  assert.equal(
    vector.isZero(),
    true,
    'Two.Vector.isZero returns correct result.'
  );
});

QUnit.test('Two.Matrix', function (assert) {
  assert.expect(12);

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

  assert.equal(check, true, 'Two.Matrix.set applies elements properly.');

  matrix.identity();
  var identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  check = true;

  for (var i = 0; i < matrix.elements.length; i++) {
    var a = matrix.elements[i];
    var b = identity[i];
    if (a !== b) {
      check = false;
      break;
    }
  }

  assert.equal(check, true, 'Two.Matrix.identity applies elements properly.');

  matrix.set(1, 2, 3, 4, 5, 6, 7, 8, 9);
  matrix.multiply(9, 8, 7, 6, 5, 4, 3, 2, 1);

  var result = [30, 24, 18, 84, 69, 54, 138, 114, 90];

  check = true;

  for (var i = 0; i < matrix.elements.length; i++) {
    var a = matrix.elements[i];
    var b = result[i];
    if (a !== b) {
      check = false;
      break;
    }
  }

  assert.equal(
    check,
    true,
    'Two.Matrix.multiply applies elements properly when multiplied by another matrix.'
  );

  matrix.set(1, 2, 3, 4, 5, 6, 7, 8, 9);
  var vector = matrix.multiply(9, 8, 7);

  result = [46, 118, 190];

  check = true;

  assert.deepEqual(
    vector,
    result,
    'Two.Matrix.multiply applies elements properly when multipled by a vector.'
  );

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

  assert.equal(
    check,
    true,
    'Two.Matrix.multiply applies elements properly when multiplied by a scalar.'
  );

  matrix.set(1, 2, 3, 4, 5, 6, 7, 8, 9);

  assert.deepEqual(
    matrix.toTransformArray(),
    [1, 4, 2, 5, 3, 6],
    'Two.Matrix.toTransformArray returns correct result for 6 digit transformation.'
  );
  assert.deepEqual(
    matrix.toTransformArray(true),
    [1, 4, 7, 2, 5, 8, 3, 6, 9],
    'Two.Matrix.toTransformArray returns correct result for 9 digit transformation.'
  );
  assert.deepEqual(
    matrix.toArray(),
    [1, 2, 3, 4, 5, 6],
    'Two.Matrix.toArray returns correct result for 6 digit transformation.'
  );
  assert.deepEqual(
    matrix.toArray(true),
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    'Two.Matrix.toArray returns correct result for 9 digit transformation.'
  );
  assert.equal(
    matrix.toString(),
    '1 4 2 5 3 6',
    'Two.Matrix.toString returns correct result for 6 digit transformation.'
  );

  var clone = matrix.clone();
  assert.ok(
    clone instanceof Two.Matrix,
    'Two.Matrix.clone returns instance of Two.Matrix.'
  );
  assert.deepEqual(
    clone.elements,
    matrix.elements,
    'Two.Matrix.clone applies elements properly.'
  );
});

QUnit.test('Two.Collection', function (assert) {
  assert.expect(19);

  var poly = new Two.Path([new Two.Anchor(0, 0)]);
  var vector = new Two.Anchor(150, 150);
  var vertices = poly.vertices;
  var removed;

  assert.equal(
    vertices instanceof Two.Collection,
    true,
    'Polyon.vertices is an instance of Two.Collection'
  );

  assert.equal(
    vertices[0].equals(new Two.Anchor(0, 0)),
    true,
    'Two.Collection created with correct items'
  );

  vertices.push(vector);
  assert.equal(
    vertices.length,
    2,
    'Two.Collection.push added one item to the end of vertices collection'
  );

  removed = vertices.pop();
  assert.equal(
    vertices.length,
    1,
    'Two.Collection.pop removed one item from the end of the vertices collection'
  );
  assert.equal(
    removed.equals(vector),
    true,
    'Two.Collection.push removed the correct item'
  );

  // Clear removed to reuse
  removed = null;

  vertices.unshift(vector);
  assert.equal(
    vertices.length,
    2,
    'Two.Collection.unshift added one item to the front of the vertices collection'
  );

  removed = vertices.shift();
  assert.equal(
    vertices.length,
    1,
    'Two.Collection.shift removed one item from the front of the vertices collection'
  );
  assert.equal(
    removed.equals(vector),
    true,
    'Two.Collection.shift removed the correct item'
  );

  // Clear removed to reuse
  removed = null;

  vertices.push(
    new Two.Anchor(1, 1),
    new Two.Anchor(2, 2),
    new Two.Anchor(3, 3),
    new Two.Anchor(4, 4)
  );

  assert.equal(
    vertices.length,
    5,
    'Two.Collection.push adds several items to the end of vertices collection'
  );

  removed = vertices.splice(2, 1, vector);
  assert.equal(
    vertices.length,
    5,
    'Two.Collection.splice adds and removes items from the vertices collection'
  );
  assert.equal(
    removed[0].equals(new Two.Anchor(2, 2)),
    true,
    'Two.Collection.splice remove the correct items from the vertices collection'
  );
  assert.equal(
    vertices[2].equals(vector),
    true,
    'Two.Collection.splice inserts correct item to the middle of the vertices collection'
  );

  var a = new Two.Collection('a', 'b', 'c', 'd', 'e');
  assert.equal(
    a.slice(1, 2)[0],
    'b',
    'Two.Collection.slice does correct beginning / end index selection.'
  );

  a.splice(0, 0, 'z');

  assert.equal(
    a[0],
    'z',
    'Two.Collection.splice correctly inserts properties.'
  );

  var children = new Two.Group.Children('a', 'b', 'c', 'd', 'e');

  var result = children.map(function (v) {
    return v;
  });

  assert.equal(
    result.length,
    5,
    'Two.Collection.map correctly iterates through the necessary items.'
  );

  const emptyCollection = new Two.Collection();

  assert.equal(
    emptyCollection.length,
    0,
    'Two.Collection correctly enumerates properties.'
  );

  assert.equal(
    Object.keys(emptyCollection).length,
    0,
    'Two.Collection correctly Object.keys an empty collection.'
  );

  const included = emptyCollection.filter(() => true);
  console.log(
    included.length,
    0,
    'Two.Collection.filter correctly iterates over items.'
  );

  emptyCollection.push(5, 10, 432, 90);

  assert.equal(
    Object.keys(emptyCollection).length,
    4,
    'Two.Collection correctly Object.keys a populated list collection.'
  );

  assert.equal(
    emptyCollection.find((v) => v === 5),
    5,
    'Two.Collection.find correctly iterates over items.'
  );
});

QUnit.test('Two.Children', function (assert) {
  assert.expect(3);

  var group = new Two.Group();
  var shape = new Two.Shape();

  group.add(shape);
  shape._update(true);

  assert.equal(
    shape.id in group.children.ids,
    true,
    'Two.Children properly adds child elements to list.'
  );

  group.remove(shape);
  group._update(true);
  assert.equal(
    shape.id in group.children.ids,
    false,
    'Two.Children properly removes child element from list.'
  );

  group.add(shape);
  shape.id = 'custom';
  shape._update(true);
  assert.equal(
    shape.id in group.children.ids,
    true,
    'Two.Children properly updates ids map when child id changes.'
  );

  // Check to be able to add and remove masks freely without errors

  group.mask = new Two.Rectangle(0, 0, 10, 10);
  group.mask = null;
});

QUnit.test('Two.Shape', function (assert) {
  assert.expect(13);

  var shape = new Two.Shape();
  assert.equal(
    shape.translation.toString(),
    '0, 0',
    'Two.Shape.translation constructed properly.'
  );
  assert.equal(shape.scale, 1, 'Two.Shape.scale constructed properly.');
  assert.equal(shape.rotation, 0, 'Two.Shape.rotation constructed properly.');

  shape.translation.x = 50;
  shape.translation.y = 25;
  shape._update();

  assert.equal(
    shape._matrix.toString(),
    '1 0 0 1 50 25',
    'Two.Shape.translation binds properly.'
  );

  shape.translation = new Two.Anchor(25, 50);
  shape._update();

  assert.equal(
    shape._matrix.toString(),
    '1 0 0 1 25 50',
    'Two.Shape.translation binds properly.'
  );

  shape.translation.x = 0;
  shape.translation.y = 0;
  shape._update();

  assert.equal(
    shape._matrix.toString(),
    '1 0 0 1 0 0',
    'Two.Shape.translation binds properly.'
  );

  shape.scale = 3;
  shape._update();

  assert.equal(
    shape._matrix.toString(),
    '3 0 0 3 0 0',
    'Two.Shape.scale uniform scale works properly.'
  );

  shape.scale = new Two.Anchor(1, 2);
  shape._update();

  assert.equal(
    shape._matrix.toString(),
    '1 0 0 2 0 0',
    'Two.Shape.scale 2 dimension scale works properly.'
  );

  shape.scale.x = 2;
  shape.scale.y = 1;
  shape._update();

  assert.equal(
    shape._matrix.toString(),
    '2 0 0 1 0 0',
    'Two.Shape.scale 2 dimension scale binds properly for event listening.'
  );

  var s = shape.scale;
  shape.scale = 10;
  s.x = 5;
  shape._update();

  assert.equal(
    shape._matrix.toString(),
    '10 0 0 10 0 0',
    'Two.Shape.scale 2 dimension scale unbinds properly.'
  );

  shape.rotation = 3.14;
  shape._update();

  assert.equal(
    shape._matrix.toString(),
    '-9.999988 0.015926 -0.015927 -9.999988 0 0',
    'Two.Shape.rotation works properly.'
  );

  assert.equal(
    shape.worldMatrix.toString(),
    '-9.999988 0.015926 -0.015927 -9.999988 0 0',
    'Two.Shape.worldMatrix locally updates properly.'
  );

  var scene = new Two.Group();

  scene.add(shape);

  scene.position.x = 100;

  scene._update();

  assert.equal(
    shape.worldMatrix.toString(),
    '-9.999988 0.015926 -0.015927 -9.999988 100 0',
    'Two.Shape.worldMatrix properly calculates world matrix.'
  );
});

QUnit.test('Children adding and removing', function (assert) {
  assert.expect(28);

  var group1 = new Two.Group();
  var group2 = new Two.Group();
  var group3 = new Two.Group();

  var poly1 = new Two.Path([new Two.Anchor(0, 0)]);
  var poly2 = new Two.Path([new Two.Anchor(0, 0)]);
  var poly3 = new Two.Path([new Two.Anchor(0, 0)]);
  var poly4 = new Two.Path([new Two.Anchor(0, 0)]);
  var poly5 = new Two.Path([new Two.Anchor(0, 0)]);

  poly1.addTo(group1);
  assert.equal(
    poly1,
    group1.children[0],
    'Can add objects to group (via object)'
  );
  assert.equal(group1, poly1.parent, 'Can add objects to group (via object)');
  assert.ok(
    ~poly1.parent.additions.indexOf(poly1),
    'Can add objects to group (via object)'
  );
  assert.equal(group1.children.length, 1, 'Correct childrens length');

  group2.add(poly2);
  assert.equal(
    poly2,
    group2.children[0],
    'Can add objects to group (via group)'
  );
  assert.equal(group2, poly2.parent, 'Can add objects to group (via group)');
  assert.ok(
    ~poly2.parent.additions.indexOf(poly2),
    'Can add objects to group (via group)'
  );
  assert.equal(group2.children.length, 1, 'Correct childrens length');

  group1.add(poly2);
  assert.equal(poly2, group1.children[1], 'Can reassign objects to group');
  assert.equal(group1, poly2.parent, 'Can reassign objects to group');
  assert.ok(
    ~poly2.parent.additions.indexOf(poly2),
    'Can reassign objects to group'
  );
  assert.ok(!~group2.additions.indexOf(poly2), 'Can reassign objects to group');
  assert.equal(group1.children.length, 2, 'Correct childrens length');
  assert.equal(group2.children.length, 0, 'Correct childrens length');

  group3.add(group1);
  assert.equal(group1, group3.children[0], 'Can add groups to group');
  assert.equal(group3, group1.parent, 'Can add groups to group');
  assert.ok(~group3.additions.indexOf(group1), 'Can add groups to group');
  assert.equal(group3.children.length, 1, 'Correct childrens length');

  group1.add(poly3);
  group1.add(poly4);
  group1.add(poly5);
  assert.equal(group1.children.length, 5, 'Correct childrens length');

  group3.add(group1.children);
  assert.equal(
    group3.children.length,
    6,
    'Can reassign children to another group'
  );
  assert.equal(
    group1.children.length,
    0,
    'Can reassign children to another group'
  );
  assert.equal(
    group1.additions.length,
    0,
    'Can reassign children to another group'
  );
  assert.equal(poly5.parent, group3, 'Can reassign children to another group');
  assert.ok(
    ~poly5.parent.additions.indexOf(poly5),
    'Can reassign children to another group'
  );

  group3.remove(poly4);
  assert.equal(group3.children.length, 5, 'Can remove objects from group');
  assert.equal(group3.additions.length, 5, 'Can remove objects from group');
  assert.equal(poly4.parent, null, 'Can remove objects from group');

  group3.add(void 0);
  assert.ok(true, 'Can safely add undefined stuff to group');
});

QUnit.test('Two.Registry', function (assert) {
  assert.expect(4);

  var registry = new Two.Registry();
  var id = 'foo';
  var val = 'bar';

  registry.add(id, val);
  assert.equal(
    registry.get(id),
    val,
    'Two.Registry registers key values properly.'
  );
  assert.equal(
    registry.contains(id),
    true,
    'Two.Registry.contains found registered value properly.'
  );

  registry.remove(id);
  assert.equal(
    registry.map[id],
    undefined,
    'Two.Registry removes key values properly.'
  );
  assert.equal(
    registry.contains(id),
    false,
    'Two.Registry.contains did not find removed id.'
  );
});

QUnit.test('Two.Texture', function (assert) {
  assert.expect(7);
  assert.done = assert.async(2);

  // Test Image Loading to Texture
  var root = '/tests/images/sequence/';
  var path = [root, '00000.png'].join('');

  var ta = new Two.Texture(path, function () {
    assert.ok(true, 'Two.Texture callback on load triggered properly.');
    tc._update();
    assert.equal(
      ta.image,
      tc.image,
      'Two.Texture applies image properties properly after undefined.'
    );
    assert.ok(
      tc.loaded,
      'Two.Texture applies loaded property correctly on undefined source images.'
    );
    assert.done();
  });
  ta.image.id = 'first-original-image';

  var image = document.createElement('img');
  var onload = function () {
    var tb = new Two.Texture(image);
    var absolutePath = [
      window.location.protocol,
      '//',
      window.location.host,
      path,
    ].join('');

    assert.equal(
      tb.src,
      absolutePath,
      'Two.Texture takes in image and applies path properly.'
    );
    assert.equal(
      tb.image,
      ta.image,
      'Two.Texture takes in image and applies registered image tag properly.'
    );
    assert.equal(
      tb.loaded,
      true,
      'Two.Texture takes in image and applies loaded property properly.'
    );
    assert.done();

    image.onload = null;
  };
  image.onload = onload;
  image.src = path;
  image.id = 'second-same-image-as-first';

  var tc = new Two.Texture();
  assert.ok(
    true,
    'Two.Texture able to be constructed without any parameters properly.'
  );

  tc.src = path;
});

QUnit.test('Two', function (assert) {
  assert.expect(8);

  var selector = QUnit.Utils.getSelector(assert.test);
  var elem = document.querySelector(selector);
  elem.id = assert.test.id + '-container';

  var two = new Two().appendTo(elem);
  assert.equal(
    two.renderer.domElement.parentElement.id,
    elem.id,
    'Two appends to the correct element when `appendTo` invoked.'
  );

  two.update();
  assert.equal(two.frameCount, 1, 'Two increments frameCount correctly.');

  two.play();
  assert.ok(two.playing, 'Two.Utils.setPlaying applied correctly.');
  assert.ok(
    typeof Two.nextFrameID === 'number',
    'requestAnimationFrame runs correctly.'
  );

  two.pause();
  assert.ok(!two.playing, 'Two.pause correctly stops updating.');

  var rectangle = two.makeRectangle(two.width / 2, two.height / 2, 10, 10);

  assert.equal(two.scene.children.length, 1, 'Adds children correctly.');

  two.remove(rectangle);
  assert.equal(two.scene.children.length, 0, 'Removes children correctly');

  two.add(rectangle);
  two.clear();
  assert.equal(two.scene.children.length, 0, 'Clears children correctly');
});

QUnit.test('Two.Path Object Conversion', function (assert) {
  assert.expect(9);

  // Create an original path with some properties
  var path = new Two.Path([new Two.Anchor(0, 0), new Two.Anchor(100, 100)]);
  path.fill = '#ff0000';
  path.stroke = '#00ff00';
  path.linewidth = 5;
  path.opacity = 0.5;
  path.visible = true;
  path.cap = 'round';
  path.join = 'miter';
  path.miter = 10;
  path.id = 'my-path';

  // Convert to object
  var obj = path.toObject();

  // Test object has expected properties
  assert.equal(typeof obj, 'object', 'Two.Path.toObject creates an object');
  assert.equal(obj.vertices.length, 2, 'Two.Path.toObject preserves vertices');
  assert.equal(obj.fill, '#ff0000', 'Two.Path.toObject preserves fill');
  assert.equal(obj.id, 'my-path', 'Two.Path.toObject preserves id');

  // Create new path from object
  var newPath = Two.Path.fromObject(obj);

  // Test new path matches original
  assert.equal(newPath.fill, path.fill, 'Two.Path.fromObject preserves fill');
  assert.equal(
    newPath.stroke,
    path.stroke,
    'Two.Path.fromObject preserves stroke'
  );
  assert.equal(
    newPath.vertices.length,
    path.vertices.length,
    'Two.Path.fromObject preserves vertices length'
  );
  assert.equal(newPath.id, path.id, 'Two.Path.fromObject preserves id');

  // Test copy method
  var copiedPath = new Two.Path().copy(path);
  assert.deepEqual(
    { ...copiedPath.toObject(), id: path.id },
    obj,
    'Two.Path.copy creates identical path'
  );
});

QUnit.test('Two.Group Object Conversion', function (assert) {
  assert.expect(6);

  // Create original group with children
  var group = new Two.Group();
  var circle = new Two.Circle(0, 0, 50);
  var rect = new Two.Rectangle(100, 100, 50, 50);
  group.add(circle, rect);
  group.id = 'my-group';

  // Convert to object
  var obj = group.toObject();

  // Test object has expected properties
  assert.equal(typeof obj, 'object', 'Two.Group.toObject creates an object');
  assert.equal(obj.children.length, 2, 'Two.Group.toObject preserves children');
  assert.equal(obj.id, 'my-group', 'Two.Group.toObject preserves id');

  // Create new group from object
  var newGroup = Two.Group.fromObject(obj);

  // Test new group matches original
  assert.equal(
    newGroup.children.length,
    group.children.length,
    'Two.Group.fromObject preserves children length'
  );
  assert.equal(newGroup.id, group.id, 'Two.Group.fromObject preserves id');

  // Test child types are preserved
  assert.ok(
    newGroup.children[0] instanceof Two.Circle,
    'Two.Group.fromObject preserves child types'
  );

  // TODO: Implement
  // // Test copy method
  // var copiedGroup = new Two.Group().copy(group);
  // copiedGroup._update();
  // assert.deepEqual(
  //   copiedGroup.toObject(),
  //   group.toObject(),
  //   'Two.Group.copy creates identical group'
  // );
});

QUnit.test('Two.Group.getBoundingClientRect(shallow)', function (assert) {
  assert.expect(6);

  const group = new Two.Group();

  for (let i = 0; i < 3; i++) {
    const x = i * 100;
    const width = 100;
    const height = 50;
    const child = new Two.Rectangle(x, 0, width, height);
    group.add(child);
  }

  const rect = group.getBoundingClientRect(true);
  assert.equal(
    rect.top,
    -25.5,
    'Two.Group.getBoundingClientRect(shallow) correctly calculates top property.'
  );
  assert.equal(
    rect.bottom,
    25.5,
    'Two.Group.getBoundingClientRect(shallow) correctly calculates bottom property.'
  );
  assert.equal(
    rect.left,
    -50.5,
    'Two.Group.getBoundingClientRect(shallow) correctly calculates left property.'
  );
  assert.equal(
    rect.right,
    250.5,
    'Two.Group.getBoundingClientRect(shallow) correctly calculates right property.'
  );
  assert.equal(
    rect.width,
    301,
    'Two.Group.getBoundingClientRect(shallow) correctly calculates width property.'
  );
  assert.equal(
    rect.height,
    51,
    'Two.Group.getBoundingClientRect(shallow) correctly calculates height property.'
  );
});

QUnit.test('Two.Text Object Conversion', function (assert) {
  assert.expect(9);

  var text = new Two.Text('Hello, World!', 100, 100);
  text.fill = '#ff0000';
  text.stroke = '#00ff00';
  text.size = 20;
  text.id = 'my-text';

  var obj = text.toObject();

  assert.equal(typeof obj, 'object', 'Two.Text.toObject creates an object');
  assert.equal(obj.value, 'Hello, World!', 'Two.Text.toObject preserves value');
  assert.equal(obj.fill, '#ff0000', 'Two.Text.toObject preserves fill');
  assert.equal(obj.stroke, '#00ff00', 'Two.Text.toObject preserves stroke');
  assert.equal(obj.size, 20, 'Two.Text.toObject preserves size');
  assert.equal(obj.id, 'my-text', 'Two.Text.toObject preserves id');

  var newText = Two.Text.fromObject(obj);

  assert.equal(
    newText.value,
    text.value,
    'Two.Text.fromObject preserves value'
  );
  assert.equal(newText.fill, text.fill, 'Two.Text.fromObject preserves fill');

  var copiedText = new Two.Text().copy(text);
  assert.deepEqual(
    { ...copiedText.toObject(), id: text.id },
    text.toObject(),
    'Two.Text.copy creates identical text'
  );
});
