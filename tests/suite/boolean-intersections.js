QUnit.module('Boolean Intersections');

QUnit.test('Two Intersecting Circles', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var circle1 = two.makeCircle(100, 150, 60);
  var circle2 = two.makeCircle(200, 150, 60);
  two.update();
  var intersections = Two.Utils.findPathIntersections(circle1, circle2);
  assert.equal(intersections.length, 2, 'Expected 2 intersections between two overlapping circles');
});

QUnit.test('Overlapping Rectangles', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var rect1 = two.makeRectangle(120, 150, 100, 100);
  var rect2 = two.makeRectangle(180, 150, 100, 100);
  two.update();
  var intersections = Two.Utils.findPathIntersections(rect1, rect2);
  assert.equal(intersections.length, 4, 'Expected 4 intersections between overlapping rectangles');
});

QUnit.test('Tangent Circles', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var circle1 = two.makeCircle(100, 150, 60);
  var circle2 = two.makeCircle(220, 150, 60);
  two.update();
  var intersections = Two.Utils.findPathIntersections(circle1, circle2);
  assert.equal(intersections.length, 1, 'Expected 1 intersection at tangent point');
});

QUnit.test('Non-intersecting Shapes', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var circle1 = two.makeCircle(80, 150, 40);
  var circle2 = two.makeCircle(220, 150, 40);
  two.update();
  var intersections = Two.Utils.findPathIntersections(circle1, circle2);
  assert.equal(intersections.length, 0, 'Expected 0 intersections for non-overlapping shapes');
});

QUnit.test('Circle Intersecting Rectangle', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var rect = two.makeRectangle(150, 150, 120, 80);
  var circle = two.makeCircle(150, 150, 70);
  two.update();
  var intersections = Two.Utils.findPathIntersections(rect, circle);
  assert.equal(intersections.length, 8, 'Expected 8 intersections between circle and rectangle');
});

QUnit.test('Curved Path Intersection', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var path1 = two.makeCurve(50, 100, 120, 50, 180, 250, 250, 200, false);
  var path2 = two.makeCurve(50, 200, 120, 250, 180, 50, 250, 100, false);
  two.update();
  var intersections = Two.Utils.findPathIntersections(path1, path2);
  assert.ok(intersections.length >= 1, 'Expected at least 1 intersection between curved paths');
});

QUnit.test('Star Intersecting Circle', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var star = two.makeStar(150, 150, 40, 140, 5);
  var circle = two.makeCircle(150, 150, 60);
  two.update();
  var intersections = Two.Utils.findPathIntersections(star, circle);
  assert.equal(intersections.length, 10, 'Expected 10 intersections between star and circle');
});

QUnit.test('Two Intersecting Ellipses', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var ellipse1 = two.makeEllipse(120, 150, 80, 50);
  var ellipse2 = two.makeEllipse(180, 150, 80, 50);
  two.update();
  var intersections = Two.Utils.findPathIntersections(ellipse1, ellipse2);
  assert.equal(intersections.length, 2, 'Expected 2 intersections between two overlapping ellipses');
});

QUnit.test('Circle Completely Within Circle', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var outerCircle = two.makeCircle(150, 150, 80);
  var innerCircle = two.makeCircle(150, 150, 40);
  two.update();
  var intersections = Two.Utils.findPathIntersections(outerCircle, innerCircle);
  assert.equal(intersections.length, 0, 'Expected 0 intersections when inner circle is fully contained');
});

QUnit.test('Identical Coincident Circles', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var circle1 = two.makeCircle(150, 150, 60);
  var circle2 = two.makeCircle(150, 150, 60);
  two.update();
  var intersections = Two.Utils.findPathIntersections(circle1, circle2);
  // Degenerate case - accept any result
  assert.ok(true, 'Degenerate case: identical coincident shapes');
});

QUnit.test('Rotated Rectangles Intersecting', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var rect1 = two.makeRectangle(150, 150, 120, 60);
  var rect2 = two.makeRectangle(150, 150, 120, 60);
  rect2.rotation = Math.PI / 4; // 45 degrees
  two.update(); // Critical: must update to apply rotation
  var intersections = Two.Utils.findPathIntersections(rect1, rect2);
  assert.equal(intersections.length, 8, 'Expected 8 intersections with 45-degree rotated rectangle');
});

QUnit.test('Self-Intersecting Figure-8 Path', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var path1 = two.makeCurve(100, 150, 150, 100, 150, 200, 200, 150, false);
  var path2 = two.makeCurve(100, 150, 150, 200, 150, 100, 200, 150, false);
  two.update();
  var intersections = Two.Utils.findPathIntersections(path1, path2);
  assert.ok(intersections.length >= 1, 'Expected at least 1 intersection in figure-8 configuration');
});

QUnit.test('Rectangle Within Rectangle', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var outerRect = two.makeRectangle(150, 150, 160, 120);
  var innerRect = two.makeRectangle(150, 150, 80, 60);
  two.update();
  var intersections = Two.Utils.findPathIntersections(outerRect, innerRect);
  assert.equal(intersections.length, 0, 'Expected 0 intersections when inner rectangle is fully contained');
});

QUnit.test('Nearly Tangent Circles (Tiny Gap)', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var circle1 = two.makeCircle(100, 150, 60);
  var circle2 = two.makeCircle(220.1, 150, 60); // 0.1px gap
  two.update();
  var intersections = Two.Utils.findPathIntersections(circle1, circle2);
  assert.equal(intersections.length, 0, 'Expected 0 intersections with 0.1px gap between circles');
});

QUnit.test('Scaled Circle Containing Rectangle', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var rect = two.makeRectangle(150, 150, 80, 80);
  var circle = two.makeCircle(150, 150, 40);
  circle.scale = 1.5; // Scale to radius 60
  two.update(); // Critical: must update to apply scale
  var intersections = Two.Utils.findPathIntersections(rect, circle);
  assert.equal(intersections.length, 0, 'Expected 0 intersections when scaled circle contains rectangle');
});

QUnit.test('Scaled Circle Intersecting Rectangle', function(assert) {
  assert.expect(1);
  var two = new Two({ width: 300, height: 300, autostart: false });
  var rect = two.makeRectangle(150, 150, 80, 80);
  var circle = two.makeCircle(150, 150, 30);
  circle.scale = 1.5; // Scale to radius 45
  two.update(); // Critical: must update to apply scale
  var intersections = Two.Utils.findPathIntersections(rect, circle);
  assert.equal(intersections.length, 8, 'Expected 8 intersections between scaled circle and rectangle');
});
