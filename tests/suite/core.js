/**
 * Tests Two.js Core Classes Functionality:
 * + Two.Vector
 * + Two.Matrix
 */

module('Core');

test('Two.Utils', 11 * 11 + 18, function() {

  var types = {
    arguments: arguments,
    number: 1,
    nan: NaN,
    null: null,
    func: Two.Utils.identity,
    obj: {},
    array: [],
    elem: document.createElement('div'),
    date: new Date(),
    regex: new RegExp(),
    bool: false
  };
  var funcs = {
    arguments: Two.Utils.isArguments,
    number: Two.Utils.isNumber,
    nan: Two.Utils.isNaN,
    null: Two.Utils.isNull,
    'undefined': Two.Utils.isUndefined,
    func: Two.Utils.isFunction,
    obj: Two.Utils.isObject,
    array: Two.Utils.isArray,
    elem: Two.Utils.isElement,
    date: Two.Utils.isDate,
    regex: Two.Utils.isRegExp,
    bool: Two.Utils.isBoolean
  };
  var exceptions = {
    numbernan: true,
    objfunc: true,
    objarray: true,
    objelem: true,
    objdate: true,
    objregex: true
  };
  var keys = ['number', 'nan', 'null', 'undefined', 'func', 'obj',
    'array', 'elem', 'date', 'regex', 'bool'];

  for (var i = 0; i < keys.length; i++) {
    var a = keys[i];
    var func = funcs[a];
    for (var j = 0; j < keys.length; j++) {
      var b = keys[j];
      var type = types[b];
      equal(func(type), exceptions[a + b] || i === j, keys[i] + ' is ' + keys[j]);
    }
  }

  equal(Two.Utils.identity(5), 5, 'identity returns passed value.');
  equal(Two.Utils.isArray(Two.Utils.toArray({})), true, 'turned {} to array.');
  equal(JSON.stringify(Two.Utils.range(0, 5)), '[0,1,2,3,4]', 'created 0-5 range successfully.');
  equal(Two.Utils.indexOf(['a', 'b', 'c'], 'b'), 1, 'indexed correctly.');
  equal(Two.Utils.has({ hello: 'foo' }, 'hello'), true, 'Object has property.');
  equal(Two.Utils.bind(function() {
    return this.attr;
  }, { attr: 'Two.js' })(), 'Two.js', 'Bound function properly.');
  equal(JSON.stringify(Two.Utils.extend({ a: 'b' }, { a: 'a', b: 'c' })), '{"a":"a","b":"c"}', 'Object extends properties successfully.');
  equal(JSON.stringify(Two.Utils.defaults({ a: 'b' }, { a: 'a', b: 'c' })), '{"a":"b","b":"c"}', 'Object defaults properties successfully.')
  equal(JSON.stringify(Two.Utils.keys({ a: 0, b: 1, c: 2 })), '["a","b","c"]', 'Two.Utils.keys successfully retrieves keys.');
  equal(JSON.stringify(Two.Utils.values({ a: 0, b: 1, c: 2 })), '[0,1,2]', 'Two.Utils.values successfully retrieves keys.');

  var obj = { a: 0, b: 1, c: 2, d: 3 };
  Two.Utils.each(obj, function(v, k) {
    equal(v, obj[k], 'Two.Utils.each');
  });
  var map = Two.Utils.map(obj, function(v, k) {
    return k;
  });
  equal(JSON.stringify(map), '["a","b","c","d"]', 'Two.Utils.map');

  var once = Two.Utils.once(function() {
    equal(true, true, 'This test should only run once.');
  });
  var after = Two.Utils.after(5, function() {
    equal(true, true, 'This test should only run after 5 invocations.');
  });

  var i = 0;
  while (i < 5) {
    once();
    after();
    i++;
  }

  equal(Two.Utils.uniqueId('hello-'), 'hello-1', 'uniqueId is unique-ish with proper prefixing.');

});

test('Two.Utils.Events', 1, function() {

  var Item = function() {};
  Two.Utils.extend(Item.prototype, Two.Utils.Events);

  var item = new Item();

  item.bind('change', function(message) {
    equal(message, 'hello', 'Bound Two.Utils.Events successfully.');
  });
  item.trigger('change', 'hello');
  item.unbind('change');
  item.trigger('change');

});

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

test('Bound Two.Vector', 45, function() {

  var vector = new Two.Vector();
  vector.bind(Two.Events.change, _.identity);

  equal(vector._bound, true, 'Vector is bound.');
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

test('Two.Utils.Collection', 14, function() {

  var poly = new Two.Path([new Two.Vector(0, 0)]);
  var vector = new Two.Vector(150, 150);
  var vertices = poly.vertices;
  var removed;

  equal(vertices instanceof Two.Utils.Collection, true, 'Polyon.vertices is an instance of Two.Utils.Collection');

  equal(vertices[0].equals(new Two.Vector(0, 0)), true, 'Two.Utils.Collection created with correct items');

  vertices.push(vector);
  equal(vertices.length, 2, 'Two.Utils.Collection.push added one item to the end of vertices collection');

  removed = vertices.pop();
  equal(vertices.length, 1, 'Two.Utils.Collection.pop removed one item from the end of the vertices collection');
  equal(removed.equals(vector), true, 'Two.Utils.Collection.push removed the correct item');

  // Clear removed to reuse
  removed = null;

  vertices.unshift(vector);
  equal(vertices.length, 2, 'Two.Utils.Collection.unshift added one item to the front of the vertices collection');

  removed = vertices.shift();
  equal(vertices.length, 1, 'Two.Utils.Collection.shift removed one item from the front of the vertices collection');
  equal(removed.equals(vector), true, 'Two.Utils.Collection.shift removed the correct item');

  // Clear removed to reuse
  removed = null;

  vertices.push(
    new Two.Vector(1, 1),
    new Two.Vector(2, 2),
    new Two.Vector(3, 3),
    new Two.Vector(4, 4)
  );

  equal(vertices.length, 5, 'Two.Utils.Collection.push adds several items to the end of vertices collection');

  removed = vertices.splice(2, 1, vector);
  equal(vertices.length, 5, 'Two.Utils.Collection.splice adds and removes items from the vertices collection');
  equal(removed[0].equals(new Two.Vector(2, 2)), true, 'Two.Utils.Collection.splice remove the correct items from the vertices collection');
  equal(vertices[2].equals(vector), true, 'Two.Utils.Collection.splice inserts correct item to the middle of the vertices collection');

  var a = new Two.Utils.Collection('a', 'b', 'c', 'd', 'e');
  equal(a.slice(1, 2)[0], 'b', 'Two.Utils.Collection.slice does correct beginning / end index selection.');

  a.splice(0, 0, 'z');

  equal(a[0], 'z', 'Two.Utils.Collection.splice correctly inserts properties.');

});

test('Two.Shape', 11, function() {

  var shape = new Two.Shape();
  equal(shape.translation.toString(), '0, 0', 'Two.Shape.translation constructed properly.');
  equal(shape.scale, 1, 'Two.Shape.scale constructed properly.');
  equal(shape.rotation, 0, 'Two.Shape.rotation constructed properly.');

  shape.translation.x = 50;
  shape.translation.y = 25;
  shape._update();

  equal(shape._matrix.toString(), '1 0 0 1 50 25', 'Two.Shape.translation binds properly.');

  shape.translation = new Two.Vector(25, 50);
  shape._update();

  equal(shape._matrix.toString(), '1 0 0 1 25 50', 'Two.Shape.translation binds properly.');

  shape.translation.x = 0;
  shape.translation.y = 0;
  shape._update();

  equal(shape._matrix.toString(), '1 0 0 1 0 0', 'Two.Shape.translation binds properly.');

  shape.scale = 3;
  shape._update();

  equal(shape._matrix.toString(), '3 0 0 3 0 0', 'Two.Shape.scale uniform scale works properly.');

  shape.scale = new Two.Vector(1, 2);
  shape._update();

  equal(shape._matrix.toString(), '1 0 0 2 0 0', 'Two.Shape.scale 2 dimension scale works properly.');

  shape.scale.x = 2;
  shape.scale.y = 1;
  shape._update();

  equal(shape._matrix.toString(), '2 0 0 1 0 0', 'Two.Shape.scale 2 dimension scale binds properly for event listening.');

  var s = shape.scale;
  shape.scale = 10;
  s.x = 5;
  shape._update();

  equal(shape._matrix.toString(), '10 0 0 10 0 0', 'Two.Shape.scale 2 dimension scale unbinds properly.');

  shape.rotation = 3.14;
  shape._update();

  equal(shape._matrix.toString(), '-10 0.016 -0.016 -10 0 0', 'Two.Shape.rotation works properly.');

});

test('Children adding and removing', 28, function() {

  var group1 = new Two.Group();
  var group2 = new Two.Group();
  var group3 = new Two.Group();
  var group4 = new Two.Group();
  var group5 = new Two.Group();

  var poly1 = new Two.Path([new Two.Vector(0, 0)]);
  var poly2 = new Two.Path([new Two.Vector(0, 0)]);
  var poly3 = new Two.Path([new Two.Vector(0, 0)]);
  var poly4 = new Two.Path([new Two.Vector(0, 0)]);
  var poly5 = new Two.Path([new Two.Vector(0, 0)]);


  poly1.addTo(group1);
  equal(poly1, group1.children[0], 'Can add objects to group (via object)');
  equal(group1, poly1.parent, 'Can add objects to group (via object)');
  ok(~poly1.parent.additions.indexOf(poly1), 'Can add objects to group (via object)');
  equal(group1.children.length, 1, 'Correct childrens length');

  group2.add(poly2);
  equal(poly2, group2.children[0], 'Can add objects to group (via group)');
  equal(group2, poly2.parent, 'Can add objects to group (via group)');
  ok(~poly2.parent.additions.indexOf(poly2), 'Can add objects to group (via group)');
  equal(group2.children.length, 1, 'Correct childrens length');


  group1.add(poly2);
  equal(poly2, group1.children[1], 'Can reassign objects to group');
  equal(group1, poly2.parent, 'Can reassign objects to group');
  ok(~poly2.parent.additions.indexOf(poly2), 'Can reassign objects to group');
  ok(!~group2.additions.indexOf(poly2), 'Can reassign objects to group');
  equal(group1.children.length, 2, 'Correct childrens length');
  equal(group2.children.length, 0, 'Correct childrens length');


  group3.add(group1);
  equal(group1, group3.children[0], 'Can add groups to group');
  equal(group3, group1.parent, 'Can add groups to group');
  ok(~group3.additions.indexOf(group1), 'Can add groups to group');
  equal(group3.children.length, 1, 'Correct childrens length');


  group1.add(poly3);
  group1.add(poly4);
  group1.add(poly5);
  equal(group1.children.length, 5, 'Correct childrens length');

  group3.add(group1.children);
  equal(group3.children.length, 6, 'Can reassign children to another group');
  equal(group1.children.length, 0, 'Can reassign children to another group');
  equal(group1.additions.length, 0, 'Can reassign children to another group');
  equal(poly5.parent, group3, 'Can reassign children to another group');
  ok(~poly5.parent.additions.indexOf(poly5), 'Can reassign children to another group');


  group3.remove(poly4);
  equal(group3.children.length, 5, 'Can remove objects from group');
  equal(group3.additions.length, 5, 'Can remove objects from group');
  equal(poly4.parent, null, 'Can remove objects from group');

  group3.add(void 0);
  ok(true, 'Can safely add undefined stuff to group');
});
