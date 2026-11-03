QUnit.module('Hit Testing');

QUnit.test('Hit query results belong to the caller', function (assert) {
  var group = new Two.Group();
  var a = new Two.Rectangle(10, 10, 10, 10);
  var b = new Two.Rectangle(40, 40, 10, 10);
  group.add(a, b);

  ['all', 'deepest'].forEach(function (mode) {
    var first = group.getShapesAtPoint(10, 10, { mode: mode });
    var second = group.getShapesAtPoint(40, 40, { mode: mode });
    assert.notStrictEqual(first, second, mode + ' returns independent arrays.');
    assert.deepEqual(first, [a], mode + ' preserves a retained result.');
    second.push(a);
    assert.deepEqual(
      group.getShapesAtPoint(40, 40, { mode: mode }),
      [b],
      mode + ' is unaffected by caller mutations.'
    );

    var empty = group.getShapesAtPoint(-100, -100, { mode: mode });
    empty.push(a);
    assert.deepEqual(
      group.getShapesAtPoint(-100, -100, { mode: mode }),
      [],
      mode + ' returns independent empty arrays.'
    );
    assert.deepEqual(empty, [a], mode + ' preserves caller-owned empty results.');
  });
});

QUnit.test('Hit queries isolate nested calls and recover after exceptions', function (assert) {
  var group = new Two.Group();
  var a = new Two.Rectangle(10, 10, 10, 10);
  var b = new Two.Rectangle(40, 40, 10, 10);
  group.add(a, b);
  var other = new Two.Group(new Two.Rectangle(80, 80, 10, 10));

  ['all', 'deepest'].forEach(function (mode) {
    var nested;
    var hits = group.getShapesAtPoint(10, 10, {
      mode: mode,
      filter: function () {
        nested = group.getShapesAtPoint(40, 40, {
          mode: 'deepest',
          filter: function () {
            assert.strictEqual(
              other.getShapesAtPoint(80, 80).length,
              1,
              'A third query can run on another group.'
            );
            return true;
          },
        });
        return true;
      },
    });
    assert.deepEqual(hits, [a], mode + ' preserves outer coordinates and results.');
    assert.deepEqual(nested, [b], mode + ' preserves the nested result.');
  });

  var error = new Error('filter failed');
  assert.throws(function () {
    group.getShapesAtPoint(10, 10, {
      filter: function () {
        group.getShapesAtPoint(40, 40);
        throw error;
      },
    });
  }, function (caught) { return caught === error; }, 'Filter exceptions propagate.');
  assert.deepEqual(group.getShapesAtPoint(40, 40), [b], 'The next query recovers.');
});

QUnit.test('Hit query options reset between calls and survive nested calls', function (assert) {
  var group = new Two.Group();
  var shape = new Two.Rectangle(10, 10, 10, 10);
  group.add(shape);
  var observed = [];
  shape.contains = function (x, y, options) {
    observed.push({
      precision: options.precision,
      fill: options.fill,
      stroke: options.stroke,
      tolerance: options.tolerance,
      ignoreVisibility: options.ignoreVisibility,
    });
    return true;
  };
  var options = { precision: 3, fill: false, stroke: true, tolerance: 2, visibleOnly: false };
  group.getShapesAtPoint(10, 10, options);
  var original = observed[0];
  observed.length = 0;
  group.getShapesAtPoint(10, 10, {
    precision: 3, fill: false, stroke: true, tolerance: 2, visibleOnly: false,
    filter: function () {
      group.getShapesAtPoint(10, 10);
      return true;
    },
  });
  assert.deepEqual(observed[1], original, 'Nested defaults leave outer options intact.');
  observed.length = 0;
  group.getShapesAtPoint(10, 10);
  assert.deepEqual(observed[0], {
    precision: undefined, fill: undefined, stroke: undefined,
    tolerance: 0, ignoreVisibility: false,
  }, 'Optional values do not leak into later queries.');
  assert.strictEqual(options.precision, 3, 'Caller options are not reset.');
});

QUnit.test('Shape.contains evaluates fill and stroke geometry', function (assert) {
  assert.expect(8);

  var two = new Two({ width: 400, height: 400, autostart: false });

  var circle = new Two.Circle(100, 100, 20);
  two.add(circle);
  two.update();

  assert.ok(circle.contains(100, 100), 'Circle contains its center point.');
  assert.notOk(circle.contains(140, 100), 'Circle excludes distant point.');

  var line = new Two.Line(0, 0, 100, 0);
  line.linewidth = 12;
  two.add(line);
  two.update();

  assert.ok(line.contains(50, 4), 'Line stroke hit succeeds within tolerance.');
  assert.notOk(line.contains(50, 40), 'Line stroke rejects far point.');

  var rect = new Two.Rectangle(150, 150, 40, 40);
  rect.rotation = Math.PI / 4;
  two.add(rect);
  two.update();

  assert.ok(rect.contains(150, 150), 'Rotated rectangle contains its center.');
  assert.notOk(rect.contains(200, 150), 'Rotated rectangle excludes outside point.');

  var invisible = new Two.Circle(200, 200, 10);
  invisible.visible = false;
  two.add(invisible);
  two.update();

  assert.notOk(
    invisible.contains(200, 200),
    'Invisible shapes bypass contains unless ignoreVisibility is set.'
  );
  assert.ok(
    invisible.contains(200, 200, { ignoreVisibility: true }),
    'ignoreVisibility option bypasses visibility check.'
  );
});

QUnit.test('Two#getShapesAtPoint respects options', function (assert) {
  assert.expect(6);

  var two = new Two({ width: 400, height: 400, autostart: false });

  var circle = new Two.Circle(100, 100, 20);
  two.add(circle);

  var line = new Two.Line(0, 0, 100, 0);
  line.linewidth = 12;
  two.add(line);

  var rect = new Two.Rectangle(150, 150, 40, 40);
  rect.rotation = Math.PI / 4;
  two.add(rect);

  var hidden = new Two.Circle(200, 200, 10);
  hidden.visible = false;
  two.add(hidden);

  two.update();

  var circleHits = two.getShapesAtPoint(100, 100);
  assert.ok(circleHits.indexOf(circle) > -1, 'Circle reported at its center.');

  var sceneHits = two.scene.getShapesAtPoint(100, 100);
  assert.ok(
    sceneHits.indexOf(circle) > -1,
    'Scene group reports circle at its center.'
  );

  var deepest = two.getShapesAtPoint(50, 4, { mode: 'deepest' });
  assert.deepEqual(deepest, [line], 'Deepest mode returns top-most shape only.');

  var visibleHits = two.getShapesAtPoint(200, 200);
  assert.strictEqual(
    visibleHits.indexOf(hidden),
    -1,
    'Hidden shapes excluded when visibleOnly is true.'
  );

  var allHits = two.getShapesAtPoint(200, 200, { visibleOnly: false });
  assert.ok(
    allHits.indexOf(hidden) > -1,
    'Hidden shapes included when visibleOnly is false.'
  );

  var sceneAll = two.scene.getShapesAtPoint(200, 200, {
    visibleOnly: false,
  });
  assert.ok(
    sceneAll.indexOf(hidden) > -1,
    'Scene group honours visibleOnly option.'
  );
});
