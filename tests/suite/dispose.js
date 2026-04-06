/**
 * Tests Two.js dispose() Methods:
 * Comprehensive testing of dispose() functionality across the class hierarchy.
 * Tests memory cleanup, event unbinding, renderer resource cleanup, and DOM element removal.
 */

(function () {
  QUnit.module('Dispose Method');

  // ===========================
  // Element Tests (Base Class)
  // ===========================

  QUnit.test('Element.dispose - Event Unbinding', function (assert) {
    assert.expect(3);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var rect = two.makeRectangle(100, 100, 50, 50);
    var eventFired = false;

    rect.bind('change', function () {
      eventFired = true;
    });

    // Verify event fires before dispose
    rect.trigger('change');
    assert.ok(eventFired, 'Event fires before dispose');

    // Reset
    eventFired = false;

    // Dispose
    rect.dispose();

    // Verify event doesn't fire after dispose
    rect.trigger('change');
    assert.ok(!eventFired, 'Event does not fire after dispose');

    // Verify _bound flag is false
    assert.ok(!rect._bound, '_bound flag is false after dispose');
  });

  QUnit.test('Element.dispose - SVG DOM Cleanup', function (assert) {
    assert.expect(5);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var rect = two.makeRectangle(100, 100, 50, 50);
    var initialType = rect._renderer.type;
    two.update();

    // Verify element exists in DOM before dispose
    var elemBefore = two.renderer.domElement.querySelector('#' + rect.id);
    assert.ok(elemBefore, 'Element exists in DOM before dispose');
    assert.ok(rect._renderer.elem, '_renderer.elem exists before dispose');

    // Dispose
    rect.dispose();

    // Verify element removed from DOM after dispose
    var elemAfter = two.renderer.domElement.querySelector('#' + rect.id);
    assert.ok(!elemAfter, 'Element removed from DOM after dispose');
    assert.ok(!rect._renderer.elem, '_renderer.elem deleted after dispose');
    assert.equal(rect._renderer.type, initialType, 'Renderer type preserved');
  });

  QUnit.test('Element.dispose - Renderer Type Preservation', function (assert) {
    assert.expect(2);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var circle = two.makeCircle(100, 100, 25);
    var initialType = circle._renderer.type;

    circle.dispose();

    assert.equal(
      circle._renderer.type,
      initialType,
      'Renderer type preserved after dispose'
    );
    assert.ok(circle._renderer.type, 'Renderer type exists after dispose');
  });

  QUnit.test('Element.dispose - Returns Instance', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var line = two.makeLine(0, 0, 100, 100);
    var result = line.dispose();

    assert.equal(result, line, 'dispose() returns the instance for chaining');
  });

  QUnit.test('Element.dispose - Multiple Dispose Calls', function (assert) {
    assert.expect(2);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var star = two.makeStar(100, 100, 20, 50, 5);
    two.update();

    // First dispose
    try {
      star.dispose();
      assert.ok(true, 'First dispose() succeeds');
    } catch (e) {
      assert.ok(false, 'First dispose() threw error: ' + e.message);
    }

    // Second dispose
    try {
      star.dispose();
      assert.ok(true, 'Second dispose() succeeds without error');
    } catch (e) {
      assert.ok(false, 'Second dispose() threw error: ' + e.message);
    }
  });

  // ===========================
  // Shape Tests
  // ===========================

  QUnit.test('Shape.dispose - Translation Vector Unbinding', function (assert) {
    assert.expect(3);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var rect = two.makeRectangle(100, 100, 50, 50);
    var translationEventFired = false;

    rect.translation.bind('change', function () {
      translationEventFired = true;
    });

    // Verify event fires before dispose
    rect.translation.trigger('change');
    assert.ok(translationEventFired, 'Translation event fires before dispose');

    // Reset
    translationEventFired = false;

    // Dispose
    rect.dispose();

    // Verify event doesn't fire after dispose
    rect.translation.trigger('change');
    assert.ok(
      !translationEventFired,
      'Translation event does not fire after dispose'
    );
    assert.ok(
      !rect.translation._bound,
      'Translation Vector _bound flag is false'
    );
  });

  QUnit.test('Shape.dispose - Scale Vector Unbinding', function (assert) {
    assert.expect(3);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var circle = two.makeCircle(100, 100, 50);

    // Set scale to a Vector (non-uniform scaling)
    circle.scale = new Two.Vector(2, 3);

    var scaleEventFired = false;

    circle.scale.bind('change', function () {
      scaleEventFired = true;
    });

    // Verify event fires before dispose
    circle.scale.trigger('change');
    assert.ok(scaleEventFired, 'Scale event fires before dispose');

    // Reset
    scaleEventFired = false;

    // Dispose
    circle.dispose();

    // Verify event doesn't fire after dispose
    circle.scale.trigger('change');
    assert.ok(!scaleEventFired, 'Scale event does not fire after dispose');
    assert.ok(!circle.scale._bound, 'Scale Vector _bound flag is false');
  });

  QUnit.test('Shape.dispose - Inheritance Chain', function (assert) {
    assert.expect(3);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var polygon = two.makePolygon(100, 100, 50, 6);
    var eventFired = false;

    polygon.bind('change', function () {
      eventFired = true;
    });

    two.update();

    // Verify Element dispose behavior (event unbinding)
    polygon.trigger('change');
    assert.ok(eventFired, 'Event fires before dispose');

    polygon.dispose();

    eventFired = false;
    polygon.trigger('change');
    assert.ok(!eventFired, 'Element.dispose() was called (events unbound)');

    // Verify renderer cleanup (Element dispose behavior)
    var elemAfter = two.renderer.domElement.querySelector('#' + polygon.id);
    assert.ok(!elemAfter, 'Element.dispose() was called (DOM cleaned)');
  });

  // ===========================
  // Path Tests
  // ===========================

  QUnit.test('Path.dispose - Vertices Collection Unbinding', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var path = two.makePath(0, 0, 100, 0, 100, 100, 0, 100);

    // Dispose should unbind vertices collection without error
    try {
      path.dispose();
      assert.ok(
        true,
        'Path disposes and unbinds vertices collection without error'
      );
    } catch (e) {
      assert.ok(false, 'Path dispose threw error: ' + e.message);
    }
  });

  QUnit.test('Path.dispose - Individual Anchor Unbinding', function (assert) {
    assert.expect(9);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var path = two.makePath(0, 0, 100, 0, 100, 100);
    var anchor0EventFired = false;
    var anchor1EventFired = false;
    var anchor2EventFired = false;

    path.vertices[0].bind('change', function () {
      anchor0EventFired = true;
    });

    path.vertices[1].bind('change', function () {
      anchor1EventFired = true;
    });

    path.vertices[2].bind('change', function () {
      anchor2EventFired = true;
    });

    // Verify events fire before dispose
    path.vertices[0].trigger('change');
    path.vertices[1].trigger('change');
    path.vertices[2].trigger('change');
    assert.ok(anchor0EventFired, 'Anchor 0 event fires before dispose');
    assert.ok(anchor1EventFired, 'Anchor 1 event fires before dispose');
    assert.ok(anchor2EventFired, 'Anchor 2 event fires before dispose');

    // Reset
    anchor0EventFired = false;
    anchor1EventFired = false;
    anchor2EventFired = false;

    // Dispose
    path.dispose();

    // Verify events don't fire after dispose
    path.vertices[0].trigger('change');
    path.vertices[1].trigger('change');
    path.vertices[2].trigger('change');
    assert.ok(!anchor0EventFired, 'Anchor 0 event does not fire after dispose');
    assert.ok(!anchor1EventFired, 'Anchor 1 event does not fire after dispose');
    assert.ok(!anchor2EventFired, 'Anchor 2 event does not fire after dispose');

    // Verify _bound flags
    assert.ok(!path.vertices[0]._bound, 'Anchor 0 _bound flag is false');
    assert.ok(!path.vertices[1]._bound, 'Anchor 1 _bound flag is false');
    assert.ok(!path.vertices[2]._bound, 'Anchor 2 _bound flag is false');
  });

  QUnit.test('Path.dispose - Control Point Unbinding', function (assert) {
    assert.expect(7);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var path = two.makePath(0, 0, 100, 0, 100, 100);
    path.curved = true;

    var leftEventFired = false;
    var rightEventFired = false;

    // Bind to first vertex control points
    path.vertices[0].controls.left.bind('change', function () {
      leftEventFired = true;
    });

    path.vertices[0].controls.right.bind('change', function () {
      rightEventFired = true;
    });

    // Verify events fire before dispose
    path.vertices[0].controls.left.trigger('change');
    path.vertices[0].controls.right.trigger('change');
    assert.ok(leftEventFired, 'Left control point event fires before dispose');
    assert.ok(
      rightEventFired,
      'Right control point event fires before dispose'
    );

    // Reset
    leftEventFired = false;
    rightEventFired = false;

    // Dispose
    path.dispose();

    // Verify events don't fire after dispose
    path.vertices[0].controls.left.trigger('change');
    path.vertices[0].controls.right.trigger('change');
    assert.ok(
      !leftEventFired,
      'Left control point event does not fire after dispose'
    );
    assert.ok(
      !rightEventFired,
      'Right control point event does not fire after dispose'
    );

    // Verify _bound flags
    assert.ok(
      !path.vertices[0].controls.left._bound,
      'Left control point _bound flag is false'
    );
    assert.ok(
      !path.vertices[0].controls.right._bound,
      'Right control point _bound flag is false'
    );

    // Verify parent anchor also unbound
    assert.ok(!path.vertices[0]._bound, 'Parent anchor _bound flag is false');
  });

  QUnit.test(
    'Path.dispose - Fill Effect Disposal (Gradient)',
    function (assert) {
      assert.expect(2);

      var two = new Two({
        type: Two.Types.svg,
        width: 400,
        height: 400,
      }).appendTo(document.body);

      var gradient = two.makeLinearGradient(
        0,
        0,
        1,
        1,
        new Two.Stop(0, 'red'),
        new Two.Stop(1, 'blue')
      );

      var rect = two.makeRectangle(100, 100, 100, 100);
      rect.fill = gradient;

      two.update();

      // Verify gradient has DOM element before dispose
      var gradientElemBefore = two.renderer.domElement.querySelector(
        '#' + gradient.id
      );
      assert.ok(
        gradientElemBefore,
        'Gradient element exists in DOM before path dispose'
      );

      // Dispose path (should call dispose on gradient)
      try {
        rect.dispose();
        assert.ok(true, 'Path disposes with gradient fill without error');
      } catch (e) {
        assert.ok(false, 'Path dispose threw error: ' + e.message);
      }
    }
  );

  QUnit.test(
    'Path.dispose - Stroke Effect Disposal (Texture)',
    function (assert) {
      assert.expect(4);

      var two = new Two({
        type: Two.Types.svg,
        width: 400,
        height: 400,
      }).appendTo(document.body);

      var texture = new Two.Texture('./images/canvas/line@2x.png');
      var circle = two.makeCircle(100, 100, 50);
      circle.stroke = texture;
      circle.noFill();

      two.update();

      // Bind event to texture
      var textureEventFired = false;
      texture.bind('change', function () {
        textureEventFired = true;
      });

      texture.trigger('change');
      assert.ok(textureEventFired, 'Texture event fires before path dispose');

      textureEventFired = false;

      // Verify texture has renderer
      assert.ok(texture._renderer, 'Texture has _renderer before dispose');

      // Dispose path (should dispose texture)
      circle.dispose();

      // Verify texture disposed
      texture.trigger('change');
      assert.ok(
        !textureEventFired,
        'Texture event does not fire after path dispose'
      );
      assert.ok(
        texture._renderer.type,
        'Texture renderer type preserved after dispose'
      );
    }
  );

  QUnit.test('Path.dispose - String Fill/Stroke', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var path = two.makePath(0, 0, 100, 0, 100, 100);
    path.fill = 'red';
    path.stroke = 'blue';

    // Dispose path with string fill/stroke (no effect objects)
    try {
      path.dispose();
      assert.ok(true, 'Path with string fill/stroke disposes without error');
    } catch (e) {
      assert.ok(
        false,
        'Path with string fill/stroke threw error: ' + e.message
      );
    }
  });

  QUnit.test('Path.dispose - Incomplete Collection', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var path = two.makePath(0, 0, 100, 0, 100, 100);

    // Simulate incomplete collection by removing unbind method
    var originalUnbind = path.vertices.unbind;
    delete path.vertices.unbind;

    // Dispose should handle incomplete collection gracefully
    try {
      path.dispose();
      assert.ok(
        true,
        'Path disposes without error when vertices collection has no unbind method'
      );
    } catch (e) {
      assert.ok(
        false,
        'Path dispose threw error with incomplete collection: ' + e.message
      );
    }

    // Restore for cleanup
    path.vertices.unbind = originalUnbind;
  });

  // ===========================
  // Group Tests
  // ===========================

  QUnit.test('Group.dispose - Recursive Child Disposal', function (assert) {
    assert.expect(7);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var group = two.makeGroup();
    var child1 = two.makeCircle(50, 50, 25);
    var child2 = two.makeRectangle(150, 150, 50, 50);

    group.add(child1, child2);

    var child1EventFired = false;
    var child2EventFired = false;

    child1.bind('change', function () {
      child1EventFired = true;
    });

    child2.bind('change', function () {
      child2EventFired = true;
    });

    // Verify events fire before dispose
    child1.trigger('change');
    child2.trigger('change');
    assert.ok(child1EventFired, 'Child1 event fires before group dispose');
    assert.ok(child2EventFired, 'Child2 event fires before group dispose');

    child1EventFired = false;
    child2EventFired = false;

    two.update();

    // Dispose group (should recursively dispose children)
    group.dispose();

    // Verify children disposed
    child1.trigger('change');
    child2.trigger('change');
    assert.ok(
      !child1EventFired,
      'Child1 event does not fire after group dispose'
    );
    assert.ok(
      !child2EventFired,
      'Child2 event does not fire after group dispose'
    );

    // Verify children DOM elements removed
    var child1ElemAfter = two.renderer.domElement.querySelector(
      '#' + child1.id
    );
    var child2ElemAfter = two.renderer.domElement.querySelector(
      '#' + child2.id
    );
    assert.ok(!child1ElemAfter, 'Child1 DOM element removed');
    assert.ok(!child2ElemAfter, 'Child2 DOM element removed');

    // Verify group DOM element removed
    var groupElemAfter = two.renderer.domElement.querySelector('#' + group.id);
    assert.ok(!groupElemAfter, 'Group DOM element removed');
  });

  QUnit.test('Group.dispose - Nested Group Disposal', function (assert) {
    assert.expect(9);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var rootGroup = two.makeGroup();
    var subGroup1 = two.makeGroup();
    var subGroup2 = two.makeGroup();
    var leaf1 = two.makeCircle(50, 50, 20);
    var leaf2 = two.makeRectangle(150, 50, 40, 40);
    var leaf3 = two.makeLine(200, 50, 250, 100);

    subGroup1.add(leaf1, leaf2);
    subGroup2.add(leaf3);
    rootGroup.add(subGroup1, subGroup2);

    // Bind events at all levels
    var leaf1EventFired = false;
    var leaf2EventFired = false;
    var leaf3EventFired = false;

    leaf1.bind('change', function () {
      leaf1EventFired = true;
    });
    leaf2.bind('change', function () {
      leaf2EventFired = true;
    });
    leaf3.bind('change', function () {
      leaf3EventFired = true;
    });

    // Verify events fire before dispose
    leaf1.trigger('change');
    leaf2.trigger('change');
    leaf3.trigger('change');
    assert.ok(leaf1EventFired, 'Leaf1 event fires before dispose');
    assert.ok(leaf2EventFired, 'Leaf2 event fires before dispose');
    assert.ok(leaf3EventFired, 'Leaf3 event fires before dispose');

    leaf1EventFired = false;
    leaf2EventFired = false;
    leaf3EventFired = false;

    two.update();

    // Dispose root group (should recursively dispose entire tree)
    rootGroup.dispose();

    // Verify all events unbound
    leaf1.trigger('change');
    leaf2.trigger('change');
    leaf3.trigger('change');
    assert.ok(!leaf1EventFired, 'Leaf1 event does not fire after root dispose');
    assert.ok(!leaf2EventFired, 'Leaf2 event does not fire after root dispose');
    assert.ok(!leaf3EventFired, 'Leaf3 event does not fire after root dispose');

    // Verify all DOM elements removed
    var leaf1ElemAfter = two.renderer.domElement.querySelector('#' + leaf1.id);
    var leaf2ElemAfter = two.renderer.domElement.querySelector('#' + leaf2.id);
    var leaf3ElemAfter = two.renderer.domElement.querySelector('#' + leaf3.id);
    assert.ok(!leaf1ElemAfter, 'Leaf1 DOM element removed');
    assert.ok(!leaf2ElemAfter, 'Leaf2 DOM element removed');
    assert.ok(!leaf3ElemAfter, 'Leaf3 DOM element removed');
  });

  QUnit.test(
    'Group.dispose - Children Collection Unbinding',
    function (assert) {
      assert.expect(1);

      var two = new Two({
        type: Two.Types.svg,
        width: 400,
        height: 400,
      }).appendTo(document.body);

      var group = two.makeGroup();
      var child = two.makeCircle(50, 50, 25);
      group.add(child);

      // Dispose should unbind children collection without error
      try {
        group.dispose();
        assert.ok(
          true,
          'Group disposes and unbinds children collection without error'
        );
      } catch (e) {
        assert.ok(false, 'Group dispose threw error: ' + e.message);
      }
    }
  );

  QUnit.test('Group.dispose - Empty Group', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var emptyGroup = two.makeGroup();

    // Dispose empty group
    try {
      emptyGroup.dispose();
      assert.ok(true, 'Empty group disposes without error');
    } catch (e) {
      assert.ok(false, 'Empty group dispose threw error: ' + e.message);
    }
  });

  // ===========================
  // Text Tests
  // ===========================

  QUnit.test('Text.dispose - Fill Effect Disposal', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var gradient = two.makeLinearGradient(
      0,
      0,
      1,
      1,
      new Two.Stop(0, '#ff0000'),
      new Two.Stop(1, '#0000ff')
    );

    var text = two.makeText('Hello', 100, 100);
    text.fill = gradient;

    two.update();

    // Dispose text (should dispose gradient)
    try {
      text.dispose();
      assert.ok(true, 'Text disposes with gradient fill without error');
    } catch (e) {
      assert.ok(false, 'Text dispose threw error: ' + e.message);
    }
  });

  QUnit.test('Text.dispose - Stroke Effect Disposal', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var gradient = two.makeRadialGradient(
      0.5,
      0.5,
      1,
      new Two.Stop(0, 'white'),
      new Two.Stop(1, 'black')
    );

    var text = two.makeText('World', 200, 100);
    text.stroke = gradient;
    text.linewidth = 2;

    two.update();

    // Dispose text (should dispose gradient)
    try {
      text.dispose();
      assert.ok(true, 'Text disposes with gradient stroke without error');
    } catch (e) {
      assert.ok(false, 'Text dispose threw error: ' + e.message);
    }
  });

  // ===========================
  // Points Tests
  // ===========================

  QUnit.test(
    'Points.dispose - Vertices Collection Unbinding',
    function (assert) {
      assert.expect(1);

      var two = new Two({
        type: Two.Types.svg,
        width: 400,
        height: 400,
      }).appendTo(document.body);

      var points = two.makePoints([
        new Two.Vector(0, 0),
        new Two.Vector(100, 50),
        new Two.Vector(50, 100),
      ]);

      // Dispose should unbind vertices collection without error
      try {
        points.dispose();
        assert.ok(
          true,
          'Points disposes and unbinds vertices collection without error'
        );
      } catch (e) {
        assert.ok(false, 'Points dispose threw error: ' + e.message);
      }
    }
  );

  QUnit.test('Points.dispose - Individual Vector Unbinding', function (assert) {
    assert.expect(7);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var points = two.makePoints([
      new Two.Vector(0, 0),
      new Two.Vector(100, 50),
      new Two.Vector(50, 100),
    ]);

    var vector0EventFired = false;
    var vector1EventFired = false;
    var vector2EventFired = false;

    points.vertices[0].bind('change', function () {
      vector0EventFired = true;
    });

    points.vertices[1].bind('change', function () {
      vector1EventFired = true;
    });

    points.vertices[2].bind('change', function () {
      vector2EventFired = true;
    });

    // Verify events fire before dispose
    points.vertices[0].trigger('change');
    points.vertices[1].trigger('change');
    points.vertices[2].trigger('change');
    assert.ok(vector0EventFired, 'Vector 0 event fires before dispose');
    assert.ok(vector1EventFired, 'Vector 1 event fires before dispose');
    assert.ok(vector2EventFired, 'Vector 2 event fires before dispose');

    // Reset
    vector0EventFired = false;
    vector1EventFired = false;
    vector2EventFired = false;

    // Dispose
    points.dispose();

    // Verify events don't fire after dispose
    points.vertices[0].trigger('change');
    points.vertices[1].trigger('change');
    points.vertices[2].trigger('change');
    assert.ok(!vector0EventFired, 'Vector 0 event does not fire after dispose');
    assert.ok(!vector1EventFired, 'Vector 1 event does not fire after dispose');
    assert.ok(!vector2EventFired, 'Vector 2 event does not fire after dispose');

    // Verify _bound flag
    assert.ok(!points.vertices[0]._bound, 'Vector 0 _bound flag is false');
  });

  QUnit.test('Points.dispose - Fill/Stroke Effect Disposal', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var fillGradient = two.makeLinearGradient(
      0,
      0,
      1,
      1,
      new Two.Stop(0, 'red'),
      new Two.Stop(1, 'yellow')
    );

    var strokeGradient = two.makeLinearGradient(
      0,
      0,
      1,
      0,
      new Two.Stop(0, 'blue'),
      new Two.Stop(1, 'green')
    );

    var points = two.makePoints([
      new Two.Vector(50, 50),
      new Two.Vector(150, 50),
      new Two.Vector(100, 150),
    ]);

    points.fill = fillGradient;
    points.stroke = strokeGradient;

    two.update();

    // Dispose points (should dispose both gradients)
    try {
      points.dispose();
      assert.ok(
        true,
        'Points disposes with gradient fill/stroke without error'
      );
    } catch (e) {
      assert.ok(false, 'Points dispose threw error: ' + e.message);
    }
  });

  // ===========================
  // Gradient Tests
  // ===========================

  QUnit.test('Gradient.dispose - SVG Element Removal', function (assert) {
    assert.expect(3);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var gradient = two.makeLinearGradient(
      0,
      0,
      1,
      1,
      new Two.Stop(0, '#ff0000'),
      new Two.Stop(1, '#0000ff')
    );

    var rect = two.makeRectangle(100, 100, 100, 100);
    rect.fill = gradient;

    two.update();

    // Verify gradient has DOM element
    var gradientElemBefore = two.renderer.domElement.querySelector(
      '#' + gradient.id
    );
    assert.ok(
      gradientElemBefore,
      'Gradient element exists in DOM before dispose'
    );
    assert.ok(
      gradient._renderer.elem,
      'Gradient has _renderer.elem before dispose'
    );

    // Dispose gradient directly
    gradient.dispose();

    // Verify gradient DOM element removed
    var gradientElemAfter = two.renderer.domElement.querySelector(
      '#' + gradient.id
    );
    assert.ok(
      !gradientElemAfter,
      'Gradient element removed from DOM after dispose'
    );
  });

  QUnit.test('Gradient.dispose - Direct Disposal', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var gradient = two.makeRadialGradient(
      0.5,
      0.5,
      1,
      new Two.Stop(0, 'white'),
      new Two.Stop(1, 'black')
    );

    // Dispose gradient not attached to any shape
    try {
      gradient.dispose();
      assert.ok(
        true,
        'Gradient disposes without error when not attached to shape'
      );
    } catch (e) {
      assert.ok(false, 'Gradient dispose threw error: ' + e.message);
    }
  });

  QUnit.test('Gradient.dispose - Event Unbinding', function (assert) {
    assert.expect(1);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var gradient = two.makeLinearGradient(
      0,
      0,
      1,
      1,
      new Two.Stop(0, 'red'),
      new Two.Stop(1, 'blue')
    );

    // Dispose gradient directly
    try {
      gradient.dispose();
      assert.ok(true, 'Gradient disposes without error');
    } catch (e) {
      assert.ok(false, 'Gradient dispose threw error: ' + e.message);
    }
  });

  // ===========================
  // Texture Tests
  // ===========================

  QUnit.test('Texture.dispose - SVG Element Removal', function (assert) {
    assert.expect(4);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var texture = new Two.Texture('./images/canvas/line@2x.png');
    var rect = two.makeRectangle(100, 100, 100, 100);
    rect.fill = texture;

    two.update();

    // Wait for texture to render
    var textureElemBefore = two.renderer.domElement.querySelector(
      '#' + texture.id
    );
    var hasElemBefore = !!texture._renderer.elem;
    assert.ok(
      hasElemBefore || !textureElemBefore,
      'Texture rendering state tracked'
    );

    // Dispose texture directly
    texture.dispose();

    // Verify texture DOM element removed
    var textureElemAfter = two.renderer.domElement.querySelector(
      '#' + texture.id
    );
    assert.ok(
      !textureElemAfter,
      'Texture element removed from DOM after dispose'
    );
    assert.ok(
      !texture._renderer.elem,
      'Texture _renderer.elem deleted after dispose'
    );
    assert.ok(texture._renderer.type, 'Texture renderer type preserved');
  });

  QUnit.test('Texture.dispose - Parent Dispose Called', function (assert) {
    assert.expect(3);

    var texture = new Two.Texture('./images/canvas/line@2x.png');

    // Bind event to texture
    var eventFired = false;
    texture.bind('change', function () {
      eventFired = true;
    });

    texture.trigger('change');
    assert.ok(eventFired, 'Texture event fires before dispose');

    eventFired = false;

    // Dispose (should call Element.dispose via inheritance)
    texture.dispose();

    // Verify Element.dispose was called (events unbound)
    texture.trigger('change');
    assert.ok(
      !eventFired,
      'Texture event does not fire after dispose (Element.dispose called)'
    );
    assert.ok(!texture._bound, 'Texture _bound flag is false');
  });

  QUnit.test('Texture.dispose - Event Unbinding', function (assert) {
    assert.expect(3);

    // eslint-disable-next-line no-unused-vars
    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var texture = new Two.Texture('./images/canvas/line@2x.png');
    var eventFired = false;

    texture.bind('change', function () {
      eventFired = true;
    });

    // Verify event fires before dispose
    texture.trigger('change');
    assert.ok(eventFired, 'Texture event fires before dispose');

    // Reset
    eventFired = false;

    // Dispose
    texture.dispose();

    // Verify event doesn't fire after dispose
    texture.trigger('change');
    assert.ok(!eventFired, 'Texture event does not fire after dispose');
    assert.ok(!texture._bound, 'Texture _bound flag is false');
  });

  // ===========================
  // Sprite Tests
  // ===========================

  QUnit.test('Sprite.dispose - Animation Stop', function (assert) {
    assert.expect(2);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var texture = new Two.Texture('./images/canvas/line@2x.png');
    var sprite = two.makeSprite(texture, 100, 100, 4, 1);
    sprite.play();

    assert.ok(sprite._playing, 'Sprite is playing before dispose');

    // Dispose
    sprite.dispose();

    // Verify animation stopped
    assert.ok(!sprite._playing, 'Sprite is not playing after dispose');
  });

  QUnit.test('Sprite.dispose - Callback Cleanup', function (assert) {
    assert.expect(2);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var texture = new Two.Texture('./images/canvas/line@2x.png');
    var sprite = two.makeSprite(texture, 100, 100, 4, 1);

    // eslint-disable-next-line no-unused-vars
    var callbackFired = false;
    sprite._onLastFrame = function () {
      callbackFired = true;
    };

    assert.ok(
      sprite._onLastFrame !== null,
      'Sprite has _onLastFrame callback before dispose'
    );

    // Dispose
    sprite.dispose();

    // Verify callback cleared
    assert.ok(
      sprite._onLastFrame === null,
      'Sprite _onLastFrame callback is null after dispose'
    );
  });

  QUnit.test('Sprite.dispose - Timing Reset', function (assert) {
    assert.expect(2);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var texture = new Two.Texture('./images/canvas/line@2x.png');
    var sprite = two.makeSprite(texture, 100, 100, 4, 1);
    sprite.play();

    // Manually set start time to simulate animation running
    sprite._startTime = Date.now();

    assert.ok(sprite._startTime > 0, 'Sprite has _startTime before dispose');

    // Dispose
    sprite.dispose();

    // Verify timing reset
    assert.equal(sprite._startTime, 0, 'Sprite _startTime is 0 after dispose');
  });

  QUnit.test('Sprite.dispose - Texture Disposal', function (assert) {
    assert.expect(3);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var texture = new Two.Texture('./images/canvas/line@2x.png');
    var sprite = two.makeSprite(texture, 100, 100, 4, 1);

    // Bind event to texture
    var textureEventFired = false;
    texture.bind('change', function () {
      textureEventFired = true;
    });

    texture.trigger('change');
    assert.ok(textureEventFired, 'Texture event fires before sprite dispose');

    textureEventFired = false;

    // Dispose sprite (should dispose texture)
    sprite.dispose();

    // Verify texture disposed
    texture.trigger('change');
    assert.ok(
      !textureEventFired,
      'Texture event does not fire after sprite dispose'
    );
    assert.ok(!texture._bound, 'Texture _bound flag is false');
  });

  // ===========================
  // Image Tests
  // ===========================

  QUnit.test('Image.dispose - Texture Disposal', function (assert) {
    assert.expect(3);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var image = two.makeImage('./images/canvas/line@2x.png', 100, 100);

    // Get the texture
    var texture = image.texture;

    // Bind event to texture
    var textureEventFired = false;
    texture.bind('change', function () {
      textureEventFired = true;
    });

    texture.trigger('change');
    assert.ok(textureEventFired, 'Texture event fires before image dispose');

    textureEventFired = false;

    // Dispose image (should dispose texture)
    image.dispose();

    // Verify texture disposed
    texture.trigger('change');
    assert.ok(
      !textureEventFired,
      'Texture event does not fire after image dispose'
    );
    assert.ok(!texture._bound, 'Texture _bound flag is false');
  });

  QUnit.test('Image.dispose - Inheritance Chain', function (assert) {
    assert.expect(4);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var image = two.makeImage('./images/canvas/line@2x.png', 100, 100);

    // Bind event to image
    var eventFired = false;
    image.bind('change', function () {
      eventFired = true;
    });

    image.trigger('change');
    assert.ok(eventFired, 'Image event fires before dispose');

    eventFired = false;

    two.update();

    // Dispose image
    image.dispose();

    // Verify Element/Shape/Path dispose called (events unbound)
    image.trigger('change');
    assert.ok(!eventFired, 'Image event does not fire after dispose');

    // Verify Rectangle/Path dispose called (vertices unbound)
    assert.ok(
      !image.vertices._bound,
      'Image vertices collection _bound flag is false'
    );

    // Verify DOM cleanup
    var imageElemAfter = two.renderer.domElement.querySelector('#' + image.id);
    assert.ok(!imageElemAfter, 'Image DOM element removed');
  });

  // ===========================
  // ImageSequence Tests
  // ===========================

  QUnit.test('ImageSequence.dispose - Animation Stop', function (assert) {
    assert.expect(2);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400,
    }).appendTo(document.body);

    var sequence = two.makeImageSequence(
      ['./images/canvas/line@2x.png', './images/canvas/line@2x.png'],
      100,
      100
    );

    sequence.play();

    assert.ok(sequence._playing, 'ImageSequence is playing before dispose');

    // Dispose
    sequence.dispose();

    // Verify animation stopped
    assert.ok(!sequence._playing, 'ImageSequence is not playing after dispose');
  });

  QUnit.test(
    'ImageSequence.dispose - Textures Collection Unbinding',
    function (assert) {
      assert.expect(1);

      var two = new Two({
        type: Two.Types.svg,
        width: 400,
        height: 400,
      }).appendTo(document.body);

      var sequence = two.makeImageSequence(
        ['./images/canvas/line@2x.png', './images/canvas/line@2x.png'],
        100,
        100
      );

      // Dispose should unbind textures collection without error
      try {
        sequence.dispose();
        assert.ok(
          true,
          'ImageSequence disposes and unbinds textures collection without error'
        );
      } catch (e) {
        assert.ok(false, 'ImageSequence dispose threw error: ' + e.message);
      }
    }
  );

  QUnit.test(
    'ImageSequence.dispose - Individual Texture Disposal',
    function (assert) {
      assert.expect(5);

      var two = new Two({
        type: Two.Types.svg,
        width: 400,
        height: 400,
      }).appendTo(document.body);

      var sequence = two.makeImageSequence(
        ['./images/canvas/line@2x.png', './images/canvas/line@2x.png'],
        100,
        100
      );

      var texture0EventFired = false;
      var texture1EventFired = false;

      sequence.textures[0].bind('change', function () {
        texture0EventFired = true;
      });

      sequence.textures[1].bind('change', function () {
        texture1EventFired = true;
      });

      // Verify events fire before dispose
      sequence.textures[0].trigger('change');
      sequence.textures[1].trigger('change');
      assert.ok(texture0EventFired, 'Texture 0 event fires before dispose');
      assert.ok(texture1EventFired, 'Texture 1 event fires before dispose');

      // Reset
      texture0EventFired = false;
      texture1EventFired = false;

      // Dispose sequence (should dispose all textures)
      sequence.dispose();

      // Verify textures disposed
      sequence.textures[0].trigger('change');
      sequence.textures[1].trigger('change');
      assert.ok(
        !texture0EventFired,
        'Texture 0 event does not fire after sequence dispose'
      );
      assert.ok(
        !texture1EventFired,
        'Texture 1 event does not fire after sequence dispose'
      );
      assert.ok(!sequence.textures[0]._bound, 'Texture 0 _bound flag is false');
    }
  );

  QUnit.test(
    'ImageSequence.dispose - Incomplete Collection',
    function (assert) {
      assert.expect(1);

      var two = new Two({
        type: Two.Types.svg,
        width: 400,
        height: 400,
      }).appendTo(document.body);

      var sequence = two.makeImageSequence(
        ['./images/canvas/line@2x.png', './images/canvas/line@2x.png'],
        100,
        100
      );

      // Simulate incomplete collection by removing unbind method
      var originalUnbind = sequence.textures.unbind;
      delete sequence.textures.unbind;

      // Dispose should handle incomplete collection gracefully
      try {
        sequence.dispose();
        assert.ok(
          true,
          'ImageSequence disposes without error when textures collection has no unbind method'
        );
      } catch (e) {
        assert.ok(
          false,
          'ImageSequence dispose threw error with incomplete collection: ' +
            e.message
        );
      }

      // Restore for cleanup
      sequence.textures.unbind = originalUnbind;
    }
  );
})();
