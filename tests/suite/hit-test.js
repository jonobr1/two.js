QUnit.module('Hit Testing');

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
  assert.expect(4);

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
});
