
QUnit.module('Primitives');

QUnit.test('Two.Points', function(assert) {

  var props = Two.Points.Properties.slice(0, 7);

  assert.expect(props.length + 13);

  var points = new Two.Points([
    new Two.Vector(0, 0),
    new Two.Vector(100, 100),
    new Two.Vector(200, 200),
    new Two.Vector(300, 300)
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
  assert.equal(points.sizeAttenuation, true, 'Can get property sizeAttenuation correctly.');
  assert.equal(points._sizeAttenuation, true, 'Can set property sizeAttenuation correctly.');

  var dashes = [2, 2];
  points.dashes = [2, 2];
  assert.equal(points.dashes.length === 2 && points.dashes[0] === 2 && points.dashes[1] === 2, true, 'Can get property dashes correctly.');
  assert.equal(points._dashes.length === 2 && points._dashes[0] === 2 && points._dashes[1] === 2, true, 'Can set property dashes correctly.');

  points.className = 'ui-points';
  assert.equal(points.className, 'ui-points', 'Can get property className correctly.');
  assert.equal(points._className, 'ui-points', 'Can set property className correctly.');

  points._update();
  points.flagReset();

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    assert.equal(points['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], false, 'Reset flag ' + prop + ' correctly.');
  }

});

QUnit.test('Two.ArcSegment', function(assert) {

  assert.expect(Two.ArcSegment.Properties.length * 4 + 2);

  var innerRadius = 5;
  var outerRadius = 10;
  var startAngle = 0;
  var endAngle = Math.PI / 2;

  var properties = [
    startAngle, endAngle, innerRadius, outerRadius
  ];

  var path = new Two.ArcSegment(0, 0, innerRadius, outerRadius, startAngle, endAngle);
  assert.equal(path.vertices.length, Two.Resolution * 3, 'Amount of vertices set correctly.');

  for (var i = 0; i < Two.ArcSegment.Properties.length; i++) {
    var prop = Two.ArcSegment.Properties[i];
    assert.equal(path[prop], properties[i], 'Can get property ' + prop + ' correctly.');
    path[prop] = properties[i] * 2;
    assert.equal(path[prop], properties[i] * 2, 'Can set property ' + prop + ' correctly.');
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], true, 'Set ' + prop + '\'s property flag correctly.');
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.ArcSegment.Properties.length; i++) {
    var prop = Two.ArcSegment.Properties[i];
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], false, 'Reset flag ' + prop + ' correctly.');
  }

  path.closed = false;
  path._update();

  assert.equal(path.vertices[0].equals(path.vertices[path.vertices.length - 1]), true, 'Circle has standardized vertex generation when shape is not closed');

});

QUnit.test('Two.Circle', function(assert) {

  assert.expect(Two.Circle.Properties.length * 4 + 2);

  var radius = 50;
  var properties = [radius];

  var path = new Two.Circle(0, 0, radius);
  assert.equal(path.vertices.length, 4, 'Amount of vertices set correctly.');

  for (var i = 0; i < Two.Circle.Properties.length; i++) {
    var prop = Two.Circle.Properties[i];
    assert.equal(path[prop], properties[i], 'Can get property ' + prop + ' correctly.');
    path[prop] = properties[i] * 2;
    assert.equal(path[prop], properties[i] * 2, 'Can set property ' + prop + ' correctly.');
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], true, 'Set ' + prop + '\'s property flag correctly.');
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Circle.Properties.length; i++) {
    var prop = Two.Circle.Properties[i];
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], false, 'Reset flag ' + prop + ' correctly.');
  }

  path.closed = false;
  path._update();

  assert.equal(path.vertices[0].equals(path.vertices[path.vertices.length - 1]), true, 'Circle has standardized vertex generation when shape is not closed');

});

QUnit.test('Two.Ellipse', function(assert) {

  assert.expect(Two.Ellipse.Properties.length * 4 + 2);

  var rx = 50;
  var ry = 75;
  var properties = [rx * 2, ry * 2];

  var path = new Two.Ellipse(0, 0, rx, ry);
  assert.equal(path.vertices.length, 4, 'Amount of vertices set correctly.');

  for (var i = 0; i < Two.Ellipse.Properties.length; i++) {
    var prop = Two.Ellipse.Properties[i];
    assert.equal(path[prop], properties[i], 'Can get property ' + prop + ' correctly.');
    path[prop] = properties[i] * 2;
    assert.equal(path[prop], properties[i] * 2, 'Can set property ' + prop + ' correctly.');
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], true, 'Set ' + prop + '\'s property flag correctly.');
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Ellipse.Properties.length; i++) {
    var prop = Two.Ellipse.Properties[i];
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], false, 'Reset flag ' + prop + ' correctly.');
  }

  path.closed = false;
  path._update();

  assert.equal(path.vertices[0].equals(path.vertices[path.vertices.length - 1]), true, 'Ellipse has standardized vertex generation when shape is not closed');

});

QUnit.test('Two.Polygon', function(assert) {

  assert.expect(Two.Polygon.Properties.length * 4 + 1);

  var radius = 50;
  var sides = 5;
  var properties = [radius * 2, radius * 2, sides];

  var path = new Two.Polygon(0, 0, radius, sides);

  for (var i = 0; i < Two.Polygon.Properties.length; i++) {
    var prop = Two.Polygon.Properties[i];
    assert.equal(path[prop], properties[i], 'Can get property ' + prop + ' correctly.');
    path[prop] = properties[i] * 2;
    assert.equal(path[prop], properties[i] * 2, 'Can set property ' + prop + ' correctly.');
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], true, 'Set ' + prop + '\'s property flag correctly.');
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Polygon.Properties.length; i++) {
    var prop = Two.Polygon.Properties[i];
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], false, 'Reset flag ' + prop + ' correctly.');
  }

  path.closed = false;
  path._update();

  assert.equal(path.vertices[0].equals(path.vertices[path.vertices.length - 1]), true, 'Polygon has standardized vertex generation when shape is not closed');

});

QUnit.test('Two.Rectangle', function(assert) {

  assert.expect(Two.Rectangle.Properties.length * 4 + 1);

  var width = 50;
  var height = 75;
  var properties = [width, height];

  var path = new Two.Rectangle(0, 0, width, height);

  for (var i = 0; i < Two.Rectangle.Properties.length; i++) {
    var prop = Two.Rectangle.Properties[i];
    assert.equal(path[prop], properties[i], 'Can get property ' + prop + ' correctly.');
    path[prop] = properties[i] * 2;
    assert.equal(path[prop], properties[i] * 2, 'Can set property ' + prop + ' correctly.');
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], true, 'Set ' + prop + '\'s property flag correctly.');
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Rectangle.Properties.length; i++) {
    var prop = Two.Rectangle.Properties[i];
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], false, 'Reset flag ' + prop + ' correctly.');
  }

  path.closed = false;
  path._update();

  assert.equal(path.vertices[0].equals(path.vertices[path.vertices.length - 1]), true, 'Rectangle has standardized vertex generation when shape is not closed');

});

QUnit.test('Two.RoundedRectangle', function(assert) {

  assert.expect(Two.RoundedRectangle.Properties.length * 4 + 5);

  var width = 50;
  var height = 75;
  var radius = 8;
  var properties = [width, height];

  var path = new Two.RoundedRectangle(0, 0, width, height, radius);

  for (var i = 0; i < Two.RoundedRectangle.Properties.length; i++) {
    var prop = Two.RoundedRectangle.Properties[i];
    assert.equal(path[prop], properties[i], 'Can get property ' + prop + ' correctly.');
    path[prop] = properties[i] * 2;
    assert.equal(path[prop], properties[i] * 2, 'Can set property ' + prop + ' correctly.');
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], true, 'Set ' + prop + '\'s property flag correctly.');
  }

  assert.equal(path.radius, radius, 'Can get property radius correctly.');
  path.radius = radius * 2;
  assert.equal(path.radius, radius * 2, 'Can set property radius correctly.');
  assert.equal(path._flagRadius, true, 'Set radius\' flag correctly.');

  // TODO: Test Vector based radius.

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.RoundedRectangle.Properties.length; i++) {
    var prop = Two.RoundedRectangle.Properties[i];
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], false, 'Reset flag ' + prop + ' correctly.');
  }

  assert.equal(path._flagRadius, false, 'Reset flag radius correctly.');

  path.closed = false;
  path._update();

  assert.equal(path.vertices[0].equals(path.vertices[path.vertices.length - 1]), true, 'RoundedRectangle has standardized vertex generation when shape is not closed');

});

QUnit.test('Two.Star', function(assert) {

  assert.expect(Two.Star.Properties.length * 4 + 1);

  var innerRadius = 50;
  var outerRadius = 75;
  var sides = 5;
  var properties = [innerRadius, outerRadius, sides];

  var path = new Two.Star(0, 0, innerRadius, outerRadius, sides);

  for (var i = 0; i < Two.Star.Properties.length; i++) {
    var prop = Two.Star.Properties[i];
    assert.equal(path[prop], properties[i], 'Can get property ' + prop + ' correctly.');
    path[prop] = properties[i] * 2;
    assert.equal(path[prop], properties[i] * 2, 'Can set property ' + prop + ' correctly.');
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], true, 'Set ' + prop + '\'s property flag correctly.');
  }

  path._update();
  path.flagReset();

  for (var i = 0; i < Two.Star.Properties.length; i++) {
    var prop = Two.Star.Properties[i];
    assert.equal(path['_flag' + prop.charAt(0).toUpperCase() + prop.slice(1)], false, 'Reset flag ' + prop + ' correctly.');
  }

  path.closed = false;
  path._update();

  assert.equal(path.vertices[0].equals(path.vertices[path.vertices.length - 1]), true, 'Star has standardized vertex generation when shape is not closed');

});
