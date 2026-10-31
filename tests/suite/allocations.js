QUnit.module('Allocation Safety');

QUnit.test('Matrix operations preserve numeric overloads and owned results', function (assert) {
  var matrix = new Two.Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  var changes = 0;
  matrix.bind('change', function () { changes++; });
  assert.strictEqual(
    matrix.multiply(9, 8, 7, 6, 5, 4, 3, 2, 1), matrix,
    'Matrix multiplication returns its receiver.'
  );
  assert.deepEqual(Array.from(matrix.elements), [30, 24, 18, 84, 69, 54, 138, 114, 90],
    'All rows and columns are multiplied before being overwritten.');
  assert.strictEqual(changes, 1, 'Matrix multiplication dispatches one change.');

  var first = matrix.multiply(1, 2, 1);
  var saved = first.slice();
  var second = matrix.multiply(2, 3, 1);
  assert.notStrictEqual(first, second, 'Vector products return independent arrays.');
  assert.deepEqual(first, saved, 'Later products preserve retained results.');
  matrix.multiply(2);
  assert.strictEqual(matrix.elements[0], 60, 'Scalar multiplication is unchanged.');
  assert.strictEqual(changes, 2, 'Scalar multiplication dispatches one change.');
});

QUnit.test('Computed matrices preserve hierarchy order and re-entrant change events', function (assert) {
  var root = new Two.Group();
  var child = new Two.Group();
  root.add(child);
  root.matrix.manual = child.matrix.manual = true;
  root.matrix.set([2, 0, 10, 0, 3, 20, 0, 0, 1]);
  child.matrix.set([1, 0, 4, 0, 1, 5, 0, 0, 1]);

  var other = new Two.Group();
  other.matrix.manual = true;
  other.matrix.set([1, 0, 99, 0, 1, 88, 0, 0, 1]);
  var output = new Two.Matrix();
  var nestedOutput = new Two.Matrix();
  var calls = 0;
  output.bind('change', function () {
    calls++;
    Two.Utils.getComputedMatrix(other, nestedOutput);
  });

  assert.strictEqual(Two.Utils.getComputedMatrix(child, output), output,
    'The supplied output is returned.');
  assert.deepEqual(output.multiply(0, 0), [18, 35, 1],
    'Parent transforms are applied before child transforms.');
  assert.deepEqual(nestedOutput.multiply(0, 0), [99, 88, 1],
    'Nested calls use the other hierarchy.');
  assert.strictEqual(calls, 3, 'Identity and both matrix multiplications dispatch change.');

  var first = Two.Utils.getComputedMatrix(child);
  var second = Two.Utils.getComputedMatrix(other);
  assert.notStrictEqual(first, second, 'Default outputs belong to their callers.');
  assert.deepEqual(first.multiply(0, 0), [18, 35, 1], 'Retained matrices remain intact.');

  output.unbind('change');
  calls = 0;
  var error = new Error('matrix listener failed');
  output.bind('change', function () {
    if (++calls === 2) { throw error; }
  });
  assert.throws(function () { Two.Utils.getComputedMatrix(child, output); },
    function (caught) { return caught === error; }, 'Change exceptions propagate.');
  output.unbind('change');
  Two.Utils.getComputedMatrix(other, output);
  assert.deepEqual(output.multiply(0, 0), [99, 88, 1],
    'Failed invocations release their ancestor workspace.');

  var deep = other;
  for (var i = 0; i < 90; i++) {
    var descendant = new Two.Group();
    descendant.matrix.manual = true;
    descendant.matrix.translate(1, 2);
    deep.add(descendant);
    deep = descendant;
  }
  Two.Utils.getComputedMatrix(deep, output);
  assert.deepEqual(output.multiply(0, 0), [189, 268, 1],
    'Hierarchies deeper than the retained workspace limit are supported.');
  Two.Utils.getComputedMatrix(other, output);
  assert.deepEqual(output.multiply(0, 0), [99, 88, 1],
    'Shorter hierarchies do not consume cleared workspace slots.');
});

QUnit.test('Curve bounds preserve extrema, degeneracies, and owned nested results', function (assert) {
  var bounds = Two.Utils.getCurveBoundingBox(0, 0, 0, 100, 100, 100, 100, 0);
  assert.deepEqual(bounds, { min: { x: 0, y: 0 }, max: { x: 100, y: 75 } },
    'Quadratic derivative extrema include the curve peak.');
  var line = Two.Utils.getCurveBoundingBox(2, 3, 2, 3, 10, 15, 10, 15);
  assert.deepEqual(line, { min: { x: 2, y: 3 }, max: { x: 10, y: 15 } },
    'A straight segment includes both endpoints.');
  var point = Two.Utils.getCurveBoundingBox(5, 6, 5, 6, 5, 6, 5, 6);
  assert.deepEqual(point, { min: { x: 5, y: 6 }, max: { x: 5, y: 6 } },
    'A degenerate point has zero extent.');
  point.min.x = -100;
  assert.strictEqual(bounds.min.x, 0, 'Nested bound objects belong to their callers.');

  var controls = [0, 0, 200, -100, -150, 150, 10, 20];
  var extrema = Two.Utils.getCurveBoundingBox.apply(null, controls);
  for (var i = 0; i <= 100; i++) {
    var t = i / 100;
    var x = Two.Utils.getComponentOnCubicBezier(t, 0, 200, -150, 10);
    var y = Two.Utils.getComponentOnCubicBezier(t, 0, -100, 150, 20);
    assert.ok(x >= extrema.min.x - 1e-10 && x <= extrema.max.x + 1e-10 &&
      y >= extrema.min.y - 1e-10 && y <= extrema.max.y + 1e-10,
    'Bounds contain the curve at t=' + t + '.');
  }
});

QUnit.test('Event payloads and scope survive nested dispatch at every arity', function (assert) {
  var emitter = new Two.Events();
  var nested = false;
  var seen = [];
  emitter.bind('sample', function () {
    assert.strictEqual(this, emitter, 'Handlers retain their emitter scope.');
    var args = Array.from(arguments);
    if (!nested) {
      nested = true;
      emitter.trigger('sample', 'nested', undefined, null, 4, 5);
      nested = false;
      assert.deepEqual(Array.from(arguments), args, 'Nested dispatch preserves outer payloads.');
    }
    seen.push(args);
  });
  for (var count = 0; count <= 6; count++) {
    var args = ['sample'];
    for (var i = 0; i < count; i++) { args.push(i); }
    assert.strictEqual(emitter.trigger.apply(emitter, args), emitter,
      'Dispatch returns the emitter.');
    assert.deepEqual(seen.pop(), args.slice(1), 'Payload length ' + count + ' is preserved.');
    assert.deepEqual(seen.pop(), ['nested', undefined, null, 4, 5], 'Nested payload is preserved.');
  }
});

QUnit.test('SVG child-list updates stay isolated across nested render hooks', function (assert) {
  var outer = new Two({ type: Two.Types.svg, autostart: false });
  var inner = new Two({ type: Two.Types.svg, autostart: false });
  var group = outer.makeGroup();
  var a = new Two.Rectangle(10, 10, 10, 10);
  var b = new Two.Circle(30, 30, 5);
  group.add(a, b);
  var otherGroup = inner.makeGroup(new Two.Rectangle(0, 0, 5, 5));
  var hooks = 0;
  a._renderer.onBeforeRender = function () {
    hooks++;
    inner.update();
  };
  try {
    outer.update();
    assert.strictEqual(a._renderer.elem.parentNode, group._renderer.elem,
      'The outer child is appended to its own group.');
    assert.strictEqual(otherGroup.children[0]._renderer.elem.parentNode, otherGroup._renderer.elem,
      'The nested renderer keeps its own DOM context.');
    group.children.reverse();
    outer.update();
    assert.deepEqual(Array.from(group._renderer.elem.children).map(function (node) { return node.id; }),
      [b.id, a.id], 'Ordering changes use the outer context.');
    group.remove(b);
    outer.update();
    assert.strictEqual(b._renderer.elem.parentNode, null, 'Subtractions use the outer context.');
    outer.update();
    assert.strictEqual(hooks, 4, 'Render hooks also run with an unchanged child list.');
  } finally {
    outer.dispose();
    inner.dispose();
  }
});
