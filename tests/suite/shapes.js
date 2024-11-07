QUnit.module('Primitives');

QUnit.test('Two.Points', function (assert) {
  var props = Two.Points.Properties.slice(0, 7);

  assert.expect(props.length + 13);

  var two = new Two();
  var points = new Two.Points();
  two.add(points);
  two.update();

  points = new Two.Points([
    new Two.Anchor(0, 0),
    new Two.Anchor(100, 100),
    new Two.Anchor(200, 200),
    new Two.Anchor(300, 300),
  ]);

  assert.equal(points.vertices.length, 4, 'Amount of vertices set correctly.');

  points.fill = 'red';
  assert.equal(points.fill, 'red', 'Can get property fill correctly.');
  assert.equal(points._fill, 'red', 'Can set property fill correctly.');

  points.stroke = 'red';
  assert.equal(points.stroke, 'red', 'Can get property stroke correctly.');
  assert.equal(points._stroke, 'red', 'Can set property stroke correctly.');

  points.size = 6;
  assert.equal(points.size, 6, 'Can get property size correctly.');
  assert.equal(points._size, 6, 'Can set property size correctly.');

  points.sizeAttenuation = true;
  assert.equal(
    points.sizeAttenuation,
    true,
    'Can get property sizeAttenuation correctly.'
  );
  assert.equal(
    points._sizeAttenuation,
    true,
    'Can set property sizeAttenuation correctly.'
  );

  points.dashes = [2, 2];
  assert.equal(
    points.dashes.length === 2 &&
      points.dashes[0] === 2 &&
      points.dashes[1] === 2,
    true,
    'Can get property dashes correctly.'
  );
  assert.equal(
    points._dashes.length === 2 &&
      points._dashes[0] === 2 &&
      points._dashes[1] === 2,
    true,
    'Can set property dashes correctly.'
  );

  points.className = 'ui-points';
  assert.equal(
    points.className,
    'ui-points',
    'Can get property className correctly.'
  );
  assert.equal(
    points._className,
    'ui-points',
    'Can set property className correctly.'
  );

  points._update();
  points.flagReset();

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    assert.equal(
      points['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      false,
      'Reset flag ' + prop + ' correctly.'
    );
  }

  points.beginning = 0.5;
  points.ending = 0.5;
  two.add(points);
  two.update();
});

QUnit.test('Two.Points Object Conversion', function (assert) {
  assert.expect(7);

  var point = new Two.Points(new Two.Anchor(50, 50));
  point.id = 'my-point';

  var obj = point.toObject();

  assert.equal(typeof obj, 'object', 'Two.Points.toObject creates an object');
  assert.equal(obj.vertices[0].x, 50, 'Two.Points.toObject preserves x');
  assert.equal(obj.vertices[0].y, 50, 'Two.Points.toObject preserves y');
  assert.equal(obj.id, 'my-point', 'Two.Points.toObject preserves id');

  var newPoint = Two.Points.fromObject(obj);

  assert.equal(
    newPoint.vertices[0].x,
    point.vertices[0].x,
    'Two.Points.fromObject preserves x'
  );
  assert.equal(
    newPoint.vertices[0].y,
    point.vertices[0].y,
    'Two.Points.fromObject preserves y'
  );

  var copiedPoint = new Two.Points().copy(point);
  assert.deepEqual(
    { ...copiedPoint.toObject(), id: point.id },
    point.toObject(),
    'Two.Points.copy creates identical point'
  );
});

QUnit.test('Two.ArcSegment', function (assert) {
  assert.expect(Two.ArcSegment.Properties.length * 4 + 2);

  var innerRadius = 5;
  var outerRadius = 10;
  var startAngle = 0;
  var endAngle = Math.PI / 2;

  var properties = [startAngle, endAngle, innerRadius, outerRadius];

  var path = new Two.ArcSegment(
    0,
    0,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  );
  assert.equal(
    path.vertices.length,
    Two.Resolution * 3,
    'Amount of vertices set correctly.'
  );

  for (var i = 0; i < Two.ArcSegment.Properties.length; i++) {
    var prop = Two.ArcSegment.Properties[i];
    assert.equal(
      path[prop],
      properties[i],
      'Can get property ' + prop + ' correctly.'
    );
    path[prop] = properties[i] * 2;
    assert.equal(
      path[prop],
      properties[i] * 2,
      'Can set property ' + prop + ' correctly.'
    );
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      true,
      'Set ' + prop + "'s property flag correctly."
    );
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.ArcSegment.Properties.length; i++) {
    var prop = Two.ArcSegment.Properties[i];
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      false,
      'Reset flag ' + prop + ' correctly.'
    );
  }

  path.closed = false;
  path._update();

  assert.equal(
    path.vertices[0].equals(path.vertices[path.vertices.length - 1]),
    true,
    'Circle has standardized vertex generation when shape is not closed'
  );
});

QUnit.test('Two.ArcSegment Object Conversion', function (assert) {
  assert.expect(11);

  // Create original arc segment
  var innerRadius = 5;
  var outerRadius = 10;
  var startAngle = 0;
  var endAngle = Math.PI / 2;
  var arcSegment = new Two.ArcSegment(
    0,
    0,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  );
  arcSegment.fill = '#0000ff';
  arcSegment.stroke = '#ff00ff';
  arcSegment.linewidth = 3;
  arcSegment.id = 'my-arcSegment';

  // Convert to object
  var obj = arcSegment.toObject();

  // Test object has expected properties
  assert.equal(
    typeof obj,
    'object',
    'Two.ArcSegment.toObject creates an object'
  );
  assert.equal(
    obj.innerRadius,
    innerRadius,
    'Two.ArcSegment.toObject preserves innerRadius'
  );
  assert.equal(
    obj.outerRadius,
    outerRadius,
    'Two.ArcSegment.toObject preserves outerRadius'
  );
  assert.equal(
    obj.startAngle,
    startAngle,
    'Two.ArcSegment.toObject preserves startAngle'
  );
  assert.equal(
    obj.endAngle,
    endAngle,
    'Two.ArcSegment.toObject preserves endAngle'
  );
  assert.equal(obj.fill, '#0000ff', 'Two.ArcSegment.toObject preserves fill');
  assert.equal(obj.id, 'my-arcSegment', 'Two.ArcSegment.toObject preserves id');

  // Create new arc segment from object
  var newArcSegment = Two.ArcSegment.fromObject(obj);

  // Test new circle matches original
  assert.equal(
    newArcSegment.radius,
    arcSegment.radius,
    'Two.ArcSegment.fromObject preserves radius'
  );
  assert.equal(
    newArcSegment.fill,
    arcSegment.fill,
    'Two.ArcSegment.fromObject preserves fill'
  );
  assert.equal(
    newArcSegment.id,
    arcSegment.id,
    'Two.ArcSegment.fromObject preserves id'
  );

  // Test copy method
  var copiedArcSegment = new Two.ArcSegment().copy(arcSegment);
  assert.deepEqual(
    { ...copiedArcSegment.toObject(), id: arcSegment.id },
    arcSegment.toObject(),
    'Two.ArcSegment.copy creates identical arcSegment'
  );
});

QUnit.test('Two.Circle', function (assert) {
  assert.expect(Two.Circle.Properties.length * 4 + 2);

  var radius = 50;
  var properties = [radius];

  var path = new Two.Circle(0, 0, radius);
  assert.equal(path.vertices.length, 4, 'Amount of vertices set correctly.');

  for (var i = 0; i < Two.Circle.Properties.length; i++) {
    var prop = Two.Circle.Properties[i];
    assert.equal(
      path[prop],
      properties[i],
      'Can get property ' + prop + ' correctly.'
    );
    path[prop] = properties[i] * 2;
    assert.equal(
      path[prop],
      properties[i] * 2,
      'Can set property ' + prop + ' correctly.'
    );
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      true,
      'Set ' + prop + "'s property flag correctly."
    );
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Circle.Properties.length; i++) {
    var prop = Two.Circle.Properties[i];
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      false,
      'Reset flag ' + prop + ' correctly.'
    );
  }

  path.closed = false;
  path._update();

  assert.equal(
    path.vertices[0].equals(path.vertices[path.vertices.length - 1]),
    true,
    'Circle has standardized vertex generation when shape is not closed'
  );
});

QUnit.test('Two.Circle Object Conversion', function (assert) {
  assert.expect(8);

  // Create original circle
  var circle = new Two.Circle(100, 100, 50);
  circle.fill = '#0000ff';
  circle.stroke = '#ff00ff';
  circle.linewidth = 3;
  circle.id = 'my-circle';

  // Convert to object
  var obj = circle.toObject();

  // Test object has expected properties
  assert.equal(typeof obj, 'object', 'Two.Circle.toObject creates an object');
  assert.equal(obj.radius, 50, 'Two.Circle.toObject preserves radius');
  assert.equal(obj.fill, '#0000ff', 'Two.Circle.toObject preserves fill');
  assert.equal(obj.id, 'my-circle', 'Two.Circle.toObject preserves id');

  // Create new circle from object
  var newCircle = Two.Circle.fromObject(obj);

  // Test new circle matches original
  assert.equal(
    newCircle.radius,
    circle.radius,
    'Two.Circle.fromObject preserves radius'
  );
  assert.equal(
    newCircle.fill,
    circle.fill,
    'Two.Circle.fromObject preserves fill'
  );
  assert.equal(newCircle.id, circle.id, 'Two.Circle.fromObject preserves id');

  // Test copy method
  var copiedCircle = new Two.Circle().copy(circle);
  assert.deepEqual(
    { ...copiedCircle.toObject(), id: circle.id },
    circle.toObject(),
    'Two.Circle.copy creates identical circle'
  );
});

QUnit.test('Two.Ellipse', function (assert) {
  assert.expect(Two.Ellipse.Properties.length * 4 + 2);

  var rx = 50;
  var ry = 75;
  var properties = [rx * 2, ry * 2];

  var path = new Two.Ellipse(0, 0, rx, ry);
  assert.equal(path.vertices.length, 4, 'Amount of vertices set correctly.');

  for (var i = 0; i < Two.Ellipse.Properties.length; i++) {
    var prop = Two.Ellipse.Properties[i];
    assert.equal(
      path[prop],
      properties[i],
      'Can get property ' + prop + ' correctly.'
    );
    path[prop] = properties[i] * 2;
    assert.equal(
      path[prop],
      properties[i] * 2,
      'Can set property ' + prop + ' correctly.'
    );
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      true,
      'Set ' + prop + "'s property flag correctly."
    );
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Ellipse.Properties.length; i++) {
    var prop = Two.Ellipse.Properties[i];
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      false,
      'Reset flag ' + prop + ' correctly.'
    );
  }

  path.closed = false;
  path._update();

  assert.equal(
    path.vertices[0].equals(path.vertices[path.vertices.length - 1]),
    true,
    'Ellipse has standardized vertex generation when shape is not closed'
  );
});

QUnit.test('Two.Polygon', function (assert) {
  assert.expect(Two.Polygon.Properties.length * 4 + 1);

  var radius = 50;
  var sides = 5;
  var properties = [radius * 2, radius * 2, sides];

  var path = new Two.Polygon(0, 0, radius, sides);

  for (var i = 0; i < Two.Polygon.Properties.length; i++) {
    var prop = Two.Polygon.Properties[i];
    assert.equal(
      path[prop],
      properties[i],
      'Can get property ' + prop + ' correctly.'
    );
    path[prop] = properties[i] * 2;
    assert.equal(
      path[prop],
      properties[i] * 2,
      'Can set property ' + prop + ' correctly.'
    );
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      true,
      'Set ' + prop + "'s property flag correctly."
    );
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Polygon.Properties.length; i++) {
    var prop = Two.Polygon.Properties[i];
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      false,
      'Reset flag ' + prop + ' correctly.'
    );
  }

  path.closed = false;
  path._update();

  assert.equal(
    path.vertices[0].equals(path.vertices[path.vertices.length - 1]),
    true,
    'Polygon has standardized vertex generation when shape is not closed'
  );
});

QUnit.test('Two.Rectangle', function (assert) {
  assert.expect(Two.Rectangle.Properties.length * 4 + 1);

  var width = 50;
  var height = 75;
  var properties = [width, height];

  var path = new Two.Rectangle(0, 0, width, height);

  for (var i = 0; i < Two.Rectangle.Properties.length; i++) {
    var prop = Two.Rectangle.Properties[i];
    assert.equal(
      path[prop],
      properties[i],
      'Can get property ' + prop + ' correctly.'
    );
    path[prop] = properties[i] * 2;
    assert.equal(
      path[prop],
      properties[i] * 2,
      'Can set property ' + prop + ' correctly.'
    );
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      true,
      'Set ' + prop + "'s property flag correctly."
    );
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Rectangle.Properties.length; i++) {
    var prop = Two.Rectangle.Properties[i];
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      false,
      'Reset flag ' + prop + ' correctly.'
    );
  }

  path.closed = false;
  path._update();

  assert.equal(
    path.vertices[0].equals(path.vertices[path.vertices.length - 1]),
    true,
    'Rectangle has standardized vertex generation when shape is not closed'
  );
});

QUnit.test('Two.RoundedRectangle', function (assert) {
  assert.expect(Two.RoundedRectangle.Properties.length * 4 + 3);

  var width = 50;
  var height = 75;
  var radius = 8;
  var properties = [width, height, radius];

  var path = new Two.RoundedRectangle(0, 0, width, height, radius);

  for (var i = 0; i < Two.RoundedRectangle.Properties.length; i++) {
    var prop = Two.RoundedRectangle.Properties[i];
    assert.equal(
      path[prop],
      properties[i],
      'Can get property ' + prop + ' correctly.'
    );
    path[prop] = properties[i] * 2;
    assert.equal(
      path[prop],
      properties[i] * 2,
      'Can set property ' + prop + ' correctly.'
    );
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      true,
      'Set ' + prop + "'s property flag correctly."
    );
  }

  radius = new Two.Anchor(4, 6);
  path.radius = radius.clone();
  assert.equal(
    radius.equals(path.radius),
    true,
    'Can get and set radius as a vector correctly.'
  );

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.RoundedRectangle.Properties.length; i++) {
    var prop = Two.RoundedRectangle.Properties[i];
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      false,
      'Reset flag ' + prop + ' correctly.'
    );
  }

  assert.equal(path._flagRadius, false, 'Reset flag radius correctly.');

  path.closed = false;
  path._update();

  assert.equal(
    path.vertices[0].equals(path.vertices[path.vertices.length - 1]),
    true,
    'RoundedRectangle has standardized vertex generation when shape is not closed'
  );
});

QUnit.test('Two.Star', function (assert) {
  assert.expect(Two.Star.Properties.length * 4 + 1);

  var innerRadius = 50;
  var outerRadius = 75;
  var sides = 5;
  var properties = [innerRadius, outerRadius, sides];

  var path = new Two.Star(0, 0, innerRadius, outerRadius, sides);

  for (var i = 0; i < Two.Star.Properties.length; i++) {
    var prop = Two.Star.Properties[i];
    assert.equal(
      path[prop],
      properties[i],
      'Can get property ' + prop + ' correctly.'
    );
    path[prop] = properties[i] * 2;
    assert.equal(
      path[prop],
      properties[i] * 2,
      'Can set property ' + prop + ' correctly.'
    );
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      true,
      'Set ' + prop + "'s property flag correctly."
    );
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Star.Properties.length; i++) {
    var prop = Two.Star.Properties[i];
    assert.equal(
      path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)],
      false,
      'Reset flag ' + prop + ' correctly.'
    );
  }

  path.closed = false;
  path._update();

  assert.equal(
    path.vertices[0].equals(path.vertices[path.vertices.length - 1]),
    true,
    'Star has standardized vertex generation when shape is not closed'
  );
});
