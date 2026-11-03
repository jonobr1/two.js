import {
  buildPathHitParts,
  pointInPolygons,
  distanceToSegments,
} from '../../src/utils/hit-test.js';

QUnit.module('Hit Geometry');

QUnit.test('Cubic hit geometry supports absolute and relative controls', function (assert) {
  [true, false].forEach(function (relative) {
    var path = {
      vertices: [
        { x: 0, y: 0, command: 'M', _relative: relative,
          controls: { right: { x: 0, y: 100 } } },
        { x: 100, y: 0, command: 'C', _relative: relative,
          controls: { left: { x: relative ? 0 : 100, y: 100 } } },
      ],
      closed: true,
    };
    [1, 3, 8, 16].forEach(function (precision) {
      var parts = buildPathHitParts(path, precision);
      assert.ok(pointInPolygons(parts.polygons, 50, 30),
        'The filled arch contains an interior point at precision ' + precision + '.');
      assert.notOk(pointInPolygons(parts.polygons, 50, 90),
        'The filled arch excludes a point above the curve.');
      assert.ok(distanceToSegments(parts.segments, 50, 75) < 10,
        'The stroke follows the curve apex.');
    });
  });
});

QUnit.test('Arc hit geometry preserves sweep, degenerate radii, and result ownership', function (assert) {
  [0, 1].forEach(function (sweep) {
    var path = {
      vertices: [
        { x: 0, y: 0, command: 'M' },
        { x: 100, y: 0, command: 'A', rx: 50, ry: 50,
          xAxisRotation: 0, largeArcFlag: 0, sweepFlag: sweep },
      ],
      closed: true,
    };
    var first = buildPathHitParts(path, 8);
    var y = sweep ? -20 : 20;
    assert.ok(pointInPolygons(first.polygons, 50, y), 'Sweep selects the filled semicircle.');
    assert.notOk(pointInPolygons(first.polygons, 50, -y), 'The other semicircle is excluded.');
    var saved = JSON.stringify(first);
    path.vertices[1].ry = 0;
    var second = buildPathHitParts(path, 8);
    assert.strictEqual(JSON.stringify(first), saved, 'Later builds preserve retained geometry.');
    assert.strictEqual(second.segments.length, 2, 'Zero radius falls back to a closing line.');
    assert.strictEqual(distanceToSegments(second.segments, 50, 10), 10,
      'The degenerate arc retains straight-line stroke distance.');
  });
});
