
QUnit.module('Primitives');

QUnit.test('Two.ArcSegment', function(assert) {

  assert.expect(Two.ArcSegment.Properties.length * 4 + 1);

  var innerRadius = 5;
  var outerRadius = 10;
  var startAngle = 0;
  var endAngle = Math.PI / 2;

  var properties = [
    startAngle, endAngle, innerRadius, outerRadius
  ];

  var path = new Two.ArcSegment(0, 0, innerRadius, outerRadius, startAngle, endAngle);
  assert.equal(path.vertices.length, Two.Resolution * 3, 'amount of vertices set correctly.');

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

});

QUnit.test('Two.Circle', function(assert) {

  assert.expect(Two.Circle.Properties.length * 4 + 1);

  var radius = 50;
  var properties = [radius];

  var path = new Two.Circle(0, 0, radius);
  assert.equal(path.vertices.length, 5, 'amount of vertices set correctly.');

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

});

QUnit.test('Two.Ellipse', function(assert) {

  assert.expect(Two.Ellipse.Properties.length * 4 + 1);

  var rx = 50;
  var ry = 75
  var properties = [rx * 2, ry * 2];

  var path = new Two.Ellipse(0, 0, rx, ry);
  assert.equal(path.vertices.length, 5, 'amount of vertices set correctly.');

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

});

QUnit.test('Two.Polygon', function(assert) {

  assert.expect(Two.Polygon.Properties.length * 4);

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

});

QUnit.test('Two.Rectangle', function(assert) {

  assert.expect(Two.Rectangle.Properties.length * 4);

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

});

QUnit.test('Two.RoundedRectangle', function(assert) {

  assert.expect(Two.RoundedRectangle.Properties.length * 4 + 4);

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

});

QUnit.test('Two.Star', function(assert) {

  assert.expect(Two.Star.Properties.length * 4);

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

});
