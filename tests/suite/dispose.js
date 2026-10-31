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

  ['attached', 'detached', 'group'].forEach(function (mode) {
    QUnit.test('Element.dispose - WebGL Resources (' + mode + ')', function (assert) {
      var canvas = document.createElement('canvas');
      var gl = canvas.getContext('webgl');
      if (!gl) {
        assert.ok(true, 'WebGL is unavailable in this browser');
        return;
      }
      var two = new Two({ type: Two.Types.webgl, domElement: canvas, width: 100, height: 100 });
      var other;
      var originalDeleteTexture = gl.deleteTexture;
      var originalDeleteBuffer = gl.deleteBuffer;
      var deletedTextures = [];
      var deletedBuffers = [];
      try {
        var rect = two.makeRectangle(25, 25, 20, 20);
        var text = two.makeText('Test', 50, 50);
        var points = two.makePoints(10, 10, 20, 20);
        var elements = [rect, text, points];
        var group = two.makeGroup(two.makeGroup(elements));
        var sibling = two.makeCircle(75, 75, 10);
        two.update();
        var textures = elements.map(function (element) {
          assert.ok(gl.isTexture(element._renderer.texture), 'Element has an allocated texture');
          return element._renderer.texture;
        });
        var buffer = points._renderer.positionBuffer;
        var sharedBuffer = two.renderer.programs.buffers.position;
        assert.ok(gl.isBuffer(buffer), 'Points have an allocated vertex buffer');
        gl.deleteTexture = function (texture) {
          deletedTextures.push(texture);
          originalDeleteTexture.call(gl, texture);
        };
        gl.deleteBuffer = function (buffer) {
          deletedBuffers.push(buffer);
          originalDeleteBuffer.call(gl, buffer);
        };
        if (mode === 'detached') {
          group.remove();
          other = new Two({ type: Two.Types.canvas, width: 100, height: 100 });
          other.add(group);
        }
        var dispose = function () {
          if (mode === 'group') {
            group.dispose();
          } else {
            elements.forEach(function (element) {
              assert.strictEqual(element.dispose(), element, 'Disposal returns the element');
            });
          }
        };
        dispose();
        dispose();
        elements.forEach(function (element, index) {
          assert.notOk(gl.isTexture(textures[index]), 'Element texture is deleted');
          assert.equal(deletedTextures.filter(function (texture) {
            return texture === textures[index];
          }).length, 1, 'Texture deletion is called exactly once');
          assert.notOk(element._renderer.texture, 'Texture handle is released');
          assert.notOk(element._renderer.gl, 'Allocating context is released');
          assert.ok(element._renderer.type, 'Element renderer type is preserved');
        });
        assert.deepEqual(deletedBuffers, [buffer], 'Points buffer deletion is called exactly once');
        assert.notOk(gl.isBuffer(buffer), 'Points buffer is deleted');
        assert.notOk(points._renderer.positionBuffer, 'Buffer handle is released');
        assert.ok(gl.isBuffer(sharedBuffer), 'Shared renderer buffer remains usable');
        assert.ok(gl.isTexture(sibling._renderer.texture), 'Sibling texture remains usable');
        assert.equal(gl.getError(), gl.NO_ERROR, 'Disposal produces no WebGL errors');
      } finally {
        gl.deleteTexture = originalDeleteTexture;
        gl.deleteBuffer = originalDeleteBuffer;
        if (other) {
          other.dispose();
        }
        two.dispose();
      }
    });
  });

  QUnit.test('Element.dispose - Canvas Caches', function (assert) {
    var two = new Two({ type: Two.Types.canvas, width: 100, height: 100 });
    try {
      var gradient = two.makeLinearGradient(0, 0, 20, 20,
        new Two.Stop(0, 'red'), new Two.Stop(1, 'blue'));
      var rect = two.makeRectangle(25, 25, 20, 20);
      rect.fill = gradient;
      var group = two.makeGroup(rect);
      two.update();
      assert.strictEqual(group._renderer.context.ctx, two.renderer.ctx, 'Group caches the Canvas context');
      assert.ok(gradient._renderer.effect, 'Gradient caches a Canvas effect');
      assert.strictEqual(group.dispose(), group, 'Group disposal returns the instance');
      assert.strictEqual(group.dispose(), group, 'Repeated disposal is safe');
      assert.notOk(group._renderer.context, 'Group context cache is released');
      assert.notOk(gradient._renderer.effect, 'Gradient effect cache is released');
      assert.equal(group._renderer.type, 'group', 'Group type is preserved');
      assert.equal(rect._renderer.type, 'rectangle', 'Shape type is preserved');
      assert.equal(gradient._renderer.type, 'linear-gradient', 'Effect type is preserved');
      assert.strictEqual(two.renderer.domElement.getContext('2d'), two.renderer.ctx, 'Canvas context remains usable');
    } finally {
      two.dispose();
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

  _.each(['LinearGradient', 'RadialGradient'], function (kind) {
    QUnit.test(kind + '.dispose - Repeated SVG disposal', function (assert) {
      var two = new Two({ type: Two.Types.svg, width: 100, height: 100 });
      var gradient = new Two[kind]();
      gradient.stops = [new Two.Stop(0, 'red'), new Two.Stop(1, 'blue')];
      gradient.spread = 'reflect';
      gradient.units = 'userSpaceOnUse';
      if (kind === 'LinearGradient') {
        gradient.left.set(10, 20);
        gradient.right.set(70, 80);
      } else {
        gradient.center.set(30, 40);
        gradient.focal.set(35, 45);
        gradient.radius = 20;
      }
      var rect = two.makeRectangle(50, 50, 80, 80);
      rect.fill = gradient;
      two.update();

      var elem = gradient._renderer.elem;
      function attributes(node) {
        var result = {};
        _.each(node.attributes, function (attribute) {
          result[attribute.name] = attribute.value;
        });
        return result;
      }
      var originalAttributes = attributes(elem);
      assert.ok(elem.parentNode, 'The rendered gradient is attached');
      assert.equal(elem.childNodes.length, 2, 'Both color stops are rendered');
      assert.strictEqual(gradient.dispose(), gradient, 'Disposal returns the gradient');
      assert.notOk(elem.parentNode, 'Disposal detaches the SVG element');
      assert.notOk(gradient._renderer.elem, 'Disposal clears the cached SVG element');
      assert.strictEqual(gradient.dispose(), gradient, 'Repeated disposal is safe');

      two.update();
      var replacement = gradient._renderer.elem;
      assert.notStrictEqual(replacement, elem, 'Rendering recreates the gradient element');
      assert.ok(replacement.parentNode, 'Rendering attaches the new gradient');
      assert.equal(replacement.childNodes.length, 2, 'Rendering preserves the color stops');
      assert.equal(replacement.firstChild.getAttribute('stop-color'), 'red', 'Stop attributes are recreated');
      assert.equal(replacement.lastChild.getAttribute('offset'), '100%', 'Stop offsets are recreated');
      assert.equal(replacement.getAttribute('spreadMethod'), gradient.spread, 'Spread is recreated');
      assert.equal(replacement.getAttribute('gradientUnits'), gradient.units, 'Units are recreated');
      assert.deepEqual(attributes(replacement), originalAttributes, 'All gradient coordinates and attributes are preserved');
      gradient.stops[0].color = 'green';
      two.update();
      assert.equal(replacement.firstChild.getAttribute('stop-color'), 'green', 'Stop changes still render after reuse');
      gradient.dispose();
    });

    QUnit.test(kind + '.dispose - Already detached SVG element', function (assert) {
      var two = new Two({ type: Two.Types.svg, width: 100, height: 100 });
      var gradient = new Two[kind]();
      gradient.stops = [new Two.Stop(0, 'red'), new Two.Stop(1, 'blue')];
      two.makeRectangle(50, 50, 80, 80).fill = gradient;
      two.update();

      var elem = gradient._renderer.elem;
      assert.ok(elem.parentNode, 'The rendered gradient is attached');
      elem.parentNode.removeChild(elem);
      assert.strictEqual(gradient.dispose(), gradient, 'An already detached gradient can be disposed');
    });

    _.each(['Path', 'Text', 'Points'], function (shapeKind) {
      QUnit.test(shapeKind + '.dispose - Identical ' + kind + ' fill and stroke', function (assert) {
        var two = new Two({ type: Two.Types.svg, width: 100, height: 100 });
        var gradient = new Two[kind]();
        gradient.stops = [new Two.Stop(0, 'red'), new Two.Stop(1, 'blue')];
        var shape;
        if (shapeKind === 'Text') {
          shape = two.makeText('Gradient', 50, 50);
        } else if (shapeKind === 'Points') {
          shape = two.makePoints([new Two.Vector(50, 50)]);
        } else {
          shape = two.makeRectangle(50, 50, 80, 80);
        }
        shape.fill = shape.stroke = gradient;
        two.update();

        var elem = gradient._renderer.elem;
        assert.ok(elem.parentNode, 'The shared fill and stroke is rendered');
        assert.strictEqual(shape.dispose(), shape, 'Shape disposal completes');
        assert.notOk(elem.parentNode, 'Shape disposal detaches the gradient');
        assert.strictEqual(shape.dispose(), shape, 'Shape disposal remains repeatable');
      });
    });
  });

  _.each(['LinearGradient', 'RadialGradient', 'Texture'], function (kind) {
    function makeEffect() {
      if (kind === 'Texture') {
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 2;
        canvas.getContext('2d').fillRect(0, 0, 2, 2);
        return new Two.Texture(canvas);
      }
      var gradient = new Two[kind]();
      gradient.stops = [new Two.Stop(0, 'red'), new Two.Stop(1, 'blue')];
      return gradient;
    }

    _.each(['Path', 'Text', 'Points'], function (shapeKind) {
      QUnit.test(shapeKind + '.dispose - Dispose identical ' + kind + ' only once', function (assert) {
        var effect = makeEffect();
        var calls = 0;
        var dispose = effect.dispose;
        effect.dispose = function () {
          calls++;
          return dispose.call(this);
        };
        var shape = new Two[shapeKind]();
        shape.fill = shape.stroke = effect;
        shape.dispose();
        shape.dispose();
        assert.equal(calls, 1, 'Identical assignments and repeated shape disposal release the effect once');
      });
    });

    QUnit.test(kind + ' shared across Path, Text, and Points survives partial disposal', function (assert) {
      var two = new Two({ type: Two.Types.svg, width: 100, height: 100 });
      var effect = makeEffect();
      var path = two.makeRectangle(20, 20, 20, 20);
      var text = two.makeText('Shared', 50, 50);
      var points = two.makePoints([new Two.Vector(70, 70)]);
      path.fill = path.stroke = effect;
      text.stroke = effect;
      points.fill = effect;
      two.update();
      var elem = effect._renderer.elem;
      var changes = 0;
      effect.bind('change', function () { changes++; });

      path.remove().dispose();
      assert.ok(elem.parentNode, 'Disposing the first shape preserves the shared SVG resource');
      path._flagFill = path._flagStroke = text._flagStroke = points._flagFill = false;
      effect.trigger('change');
      assert.notOk(path._flagFill || path._flagStroke, 'Disposed shape listeners are detached');
      assert.ok(text._flagStroke && points._flagFill, 'Both surviving shapes still receive changes');
      assert.equal(changes, 1, 'External listeners survive partial disposal');
      text.remove().dispose();
      path.dispose();
      assert.ok(elem.parentNode, 'Repeated disposal does not release another shape\'s assignment');
      two.update();
      assert.strictEqual(effect._renderer.elem, elem, 'Survivor renders with the original resource');
      points.remove().dispose();
      assert.notOk(elem.parentNode, 'Last shape disposal removes the SVG resource');
      assert.notOk(effect._renderer.elem, 'Last shape disposal clears the renderer reference');
      effect.trigger('change');
      assert.equal(changes, 1, 'Last shape disposal performs parent event cleanup');
      two.dispose();
    });

    QUnit.test(kind + ' assignments outside the scene and replacements', function (assert) {
      var effect = makeEffect();
      var first = new Two.Path();
      var second = new Two.Text();
      var calls = 0;
      var dispose = effect.dispose;
      effect.dispose = function () { calls++; return dispose.call(this); };
      first.fill = first.stroke = effect;
      second.fill = effect;
      first.fill = effect;
      first.fill = '#fff';
      first.dispose();
      assert.equal(calls, 0, 'Unrendered shape assignments retain the shared effect');
      second.fill = '#000';
      assert.equal(calls, 0, 'Replacement does not destroy the previous effect');
      second.fill = effect;
      second.dispose();
      assert.equal(calls, 1, 'Reassignment is tracked without stale references');
    });
  });

  _.each(['Image', 'Sprite', 'ImageSequence'], function (kind) {
    QUnit.test(kind + '.dispose - Shared textures', function (assert) {
      var canvas = document.createElement('canvas');
      canvas.width = canvas.height = 4;
      var texture = new Two.Texture(canvas);
      var image = new Two[kind](kind === 'ImageSequence' ? [texture, texture] : texture);
      var path = new Two.Path();
      path.stroke = texture;
      var calls = 0;
      var dispose = texture.dispose;
      texture.dispose = function () { calls++; return dispose.call(this); };
      image.dispose();
      image.dispose();
      assert.equal(calls, 0, 'Image disposal preserves another shape\'s texture');
      path._flagStroke = false;
      texture.trigger('change');
      assert.ok(path._flagStroke, 'Survivor still receives texture changes');
      path.dispose();
      assert.equal(calls, 1, 'The last assignment disposes a texture once');
    });
  });

  QUnit.test('ImageSequence.dispose - Texture collection edits', function (assert) {
    var first = new Two.Texture();
    var second = new Two.Texture();
    var calls = [0, 0];
    first.dispose = function () { calls[0]++; return this; };
    second.dispose = function () { calls[1]++; return this; };
    var sequence = new Two.ImageSequence([first, second, first]);
    sequence.textures.pop();
    sequence.textures.shift();
    sequence.textures.push(first);
    sequence.textures = [second];
    sequence.noFill();
    sequence.dispose();
    sequence.dispose();
    assert.deepEqual(calls, [0, 1], 'Only textures still assigned at disposal are released, once');
    var path = new Two.Path();
    path.fill = first;
    path.dispose();
    assert.deepEqual(calls, [1, 1], 'Removed textures have no stale sequence references');
  });

  _.each(['release', 'dispose'], function (method) {
    QUnit.test('Two.' + method + ' preserves effects shared with another instance', function (assert) {
      var first = new Two({ type: Two.Types.canvas, width: 100, height: 100 });
      var second = new Two({ type: Two.Types.canvas, width: 100, height: 100 });
      var gradient = new Two.LinearGradient(0, 0, 1, 1, [
        new Two.Stop(0, 'red'), new Two.Stop(1, 'blue'),
      ]);
      var a = first.makeRectangle(50, 50, 50, 50);
      var b = second.makeRectangle(50, 50, 50, 50);
      a.fill = b.fill = gradient;
      first[method]();
      a._flagFill = b._flagFill = false;
      gradient.trigger('change');
      assert.notOk(a._flagFill, 'Released shape listeners are detached');
      assert.ok(b._flagFill, 'Other instance still receives changes');
      second.update();
      assert.ok(gradient._renderer.effect, 'Other instance still renders the gradient');
      b.remove().dispose();
      assert.notOk(gradient._renderer.effect, 'No stale reference prevents final disposal');
      first.dispose();
      second.dispose();
    });
  });

  _.each(['LinearGradient', 'RadialGradient'], function (kind) {
    _.each([Two.Types.canvas, Two.Types.webgl], function (type) {
      QUnit.test(kind + '.dispose - Reuse in ' + type, function (assert) {
        var two = new Two({ type: type, width: 40, height: 40, ratio: 1 });
        var gradient = kind === 'LinearGradient'
          ? two.makeLinearGradient(0, 0, 1, 1, new Two.Stop(0, 'red'), new Two.Stop(1, 'blue'))
          : two.makeRadialGradient(0.5, 0.5, 0.5, new Two.Stop(0, 'red'), new Two.Stop(1, 'blue'));
        var rect = two.makeRectangle(20, 20, 40, 40);
        rect.fill = gradient;
        rect.noStroke();
        two.update();
        var canvas = two.renderer.domElement;
        var before = canvas.toDataURL();
        gradient.dispose();
        gradient.dispose();
        two.update();
        assert.equal(canvas.toDataURL(), before, 'Recreated resources preserve rendered pixels');
        gradient.stops[0].color = 'lime';
        two.update();
        assert.notEqual(canvas.toDataURL(), before, 'Stop edits still change the rendered pixels');
        rect.remove().dispose();
        two.dispose();
      });
    });

    QUnit.test(kind + '.dispose - Parent cleanup and change tracking after reuse', function (assert) {
      var gradient = new Two[kind]();
      gradient.stops = [new Two.Stop(0, 'red')];
      var changes = 0;
      gradient.bind('change', function () { changes++; });
      gradient._renderer.effect = {};
      var type = gradient._renderer.type;
      gradient.dispose();
      gradient.dispose();
      gradient.trigger('change');
      assert.equal(changes, 0, 'Parent cleanup removes external listeners');
      assert.notOk(gradient._renderer.effect, 'Cached effects are cleared');
      assert.equal(gradient._renderer.type, type, 'Renderer type is preserved');
      gradient.flagReset();
      gradient.stops.push(new Two.Stop(1, 'blue'));
      assert.ok(gradient._flagStops, 'Collection callbacks survive cleanup');
      gradient.flagReset();
      gradient.stops[0].color = 'green';
      assert.ok(gradient._flagStops, 'Stop callbacks survive cleanup');
      gradient.flagReset();
      if (kind === 'LinearGradient') {
        gradient.left = new Two.Vector(2, 3);
        gradient.flagReset();
        gradient.left.x = 4;
        assert.ok(gradient._flagEndPoints, 'Replaced endpoint vectors remain observable');
      } else {
        gradient.center = new Two.Vector(2, 3);
        gradient.flagReset();
        gradient.center.x = 4;
        assert.ok(gradient._flagCenter, 'Replaced center vectors remain observable');
      }
    });
  });

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

    new Two({
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

  // ===========================
  // Two Instance Tests
  // ===========================

  function afterFrames(count, callback) {
    requestAnimationFrame(function () {
      if (count > 1) {
        afterFrames(count - 1, callback);
      } else {
        callback();
      }
    });
  }

  QUnit.test('Two.dispose - Instance Registry', function (assert) {
    assert.expect(3);

    var count = Two.Instances.length;

    for (var i = 0; i < 5; i++) {
      new Two({
        type: Two.Types.svg,
        width: 100,
        height: 100,
      })
        .appendTo(document.body)
        .dispose();
    }

    assert.equal(
      Two.Instances.length,
      count,
      'Repeated construction and disposal does not grow Two.Instances'
    );

    var two = new Two({ width: 100, height: 100 });
    assert.ok(Two.Instances.indexOf(two) >= 0, 'Instance is registered');

    two.dispose();
    assert.equal(
      Two.Instances.indexOf(two),
      -1,
      'Instance is removed from Two.Instances'
    );
  });

  QUnit.test('Two.dispose - Renderer Element', function (assert) {
    assert.expect(3);

    var two = new Two({
      type: Two.Types.canvas,
      width: 100,
      height: 100,
    }).appendTo(document.body);
    var elem = two.renderer.domElement;

    assert.equal(elem.parentNode, document.body, 'Element is in the document');
    two.dispose();
    assert.equal(elem.parentNode, null, 'Created element is removed');

    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    new Two({ domElement: canvas, width: 100, height: 100 }).dispose();
    assert.equal(
      canvas.parentNode,
      document.body,
      'Element passed in as options.domElement stays in the document'
    );
    document.body.removeChild(canvas);
  });

  QUnit.test('Two.dispose - Fitted Resize Listener', function (assert) {
    assert.expect(2);

    var parent = document.createElement('div');
    parent.style.width = '200px';
    parent.style.height = '100px';
    document.body.appendChild(parent);

    // A passed in element stays in the parent, so fitting could still work
    var canvas = document.createElement('canvas');
    var two = new Two({ fitted: true, domElement: canvas }).appendTo(parent);
    var fits = 0;
    two.renderer.setSize = function () {
      fits++;
    };

    parent.dispatchEvent(new Event('resize'));
    assert.equal(fits, 1, 'Resize fits the instance to its parent');

    two.dispose();
    parent.dispatchEvent(new Event('resize'));
    assert.equal(fits, 1, 'Resize listener is detached');

    document.body.removeChild(parent);
  });

  QUnit.test('Two.dispose - Fullscreen', function (assert) {
    assert.expect(5);

    var style = document.body.style;
    var overflow = style.overflow;
    var position = style.position;

    var two = new Two({ fullscreen: true }).appendTo(document.body);
    var fits = 0;
    two.renderer.setSize = function () {
      fits++;
    };

    assert.equal(style.position, 'fixed', 'Fullscreen changes body styles');

    window.dispatchEvent(new Event('resize'));
    assert.equal(fits, 1, 'Resize fits the instance to the window');

    two.dispose();
    window.dispatchEvent(new Event('resize'));
    assert.equal(fits, 1, 'Resize listener is detached');
    assert.equal(style.overflow, overflow, 'Body overflow is restored');
    assert.equal(style.position, position, 'Body position is restored');
  });

  ['update', 'render'].forEach(function (event) {
    QUnit.test('Two.dispose - Registry Mutation During ' + event, function (assert) {
      var done = assert.async();
      var a = new Two({ width: 10, height: 10 });
      var b = new Two({ width: 10, height: 10 });
      var c = new Two({ width: 10, height: 10 });
      var d = new Two({ width: 10, height: 10 });
      b.setPlaying(true);
      c.setPlaying(true);
      d.setPlaying(true);

      a.bind(event, function () {
        var bFrame = b.frameCount;
        var cFrame = c.frameCount;
        var dFrame = d.frameCount;
        a.dispose();
        c.dispose();

        afterFrames(1, function () {
          assert.equal(b.frameCount, bFrame + 1, 'Following instance renders this frame');
          assert.equal(c.frameCount, cFrame, 'Instance disposed before its turn does not render');
          assert.equal(d.frameCount, dFrame + 1, 'Later instance renders exactly once');
          b.dispose();
          d.dispose();
          done();
        });
      });
      a.play();
    });
  });

  [false, true].forEach(function (reverse) {
    QUnit.test('Two.dispose - Fullscreen Ownership ' + (reverse ? 'Newest First' : 'Oldest First'), function (assert) {
      var style = document.body.style;
      var keys = ['overflow', 'margin', 'padding', 'top', 'left', 'right', 'bottom', 'position'];
      var original = {};
      keys.forEach(function (key) {
        original[key] = style[key];
      });
      var a = new Two({ fullscreen: true });
      var b = new Two({ fullscreen: true });
      var first = reverse ? b : a;
      var last = reverse ? a : b;

      first.dispose();
      first.dispose();
      assert.equal(style.position, 'fixed', 'Remaining owner keeps fullscreen positioning');
      assert.equal(style.overflow, 'hidden', 'Remaining owner keeps fullscreen overflow');
      last.dispose();
      keys.forEach(function (key) {
        assert.equal(style[key], original[key], 'Last owner restores ' + key);
      });

      // A later fullscreen lifetime must take a fresh snapshot.
      style.overflow = 'scroll';
      new Two({ fullscreen: true }).dispose();
      assert.equal(style.overflow, 'scroll', 'New owner saves current styles');
      keys.forEach(function (key) {
        style[key] = original[key];
      });
    });
  });

  QUnit.test('Two.dispose - SVG Disposal During Update', function (assert) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    document.body.appendChild(svg);
    var two = new Two({ domElement: svg, width: 100, height: 100 });
    var rect = two.makeRectangle(50, 50, 20, 20);
    two.update();
    assert.ok(svg.querySelector('#' + rect.id), 'Scene rendered before disposal');
    var frame = two.frameCount;
    two.bind('update', function () {
      two.dispose();
    });
    two.update();
    two.update();
    two.render();
    two.play();
    two.setPlaying(true);
    assert.equal(svg.querySelector('#' + rect.id), null, 'Released scene is not recreated');
    assert.equal(two.frameCount, frame, 'Disposed update does not render');
    assert.notOk(two.playing, 'Disposed instance cannot resume playing');
    assert.equal(svg.parentNode, document.body, 'Caller-owned SVG stays attached');
    document.body.removeChild(svg);
  });

  QUnit.test('Two.dispose - Repeated and Recursive Disposal', function (assert) {
    var two = new Two({ width: 10, height: 10 });
    var pauses = 0;
    two.bind('pause', function () {
      pauses++;
      if (pauses === 1) {
        two.dispose();
        two.play();
      }
    });
    assert.strictEqual(two.dispose(), two, 'Disposal returns the instance');
    assert.strictEqual(two.dispose(), two, 'Repeated disposal returns the instance');
    assert.equal(pauses, 1, 'Recursive and repeated disposal only pause once');
    assert.notOk(two.playing, 'A pause listener cannot restart a disposed instance');
  });

  [false, true].forEach(function (duringUpdate) {
    QUnit.test('Two.dispose - WebGL Resources' + (duringUpdate ? ' During Update' : ''), function (assert) {
      var canvas = document.createElement('canvas');
      var gl = canvas.getContext('webgl');
      if (!gl) {
        assert.ok(true, 'WebGL is unavailable in this browser');
        return;
      }
      document.body.appendChild(canvas);
      var allocations = { Buffer: [], Program: [], Shader: [], Texture: [] };
      var originals = {};
      Object.keys(allocations).forEach(function (kind) {
        var name = 'create' + kind;
        originals[name] = gl[name];
        gl[name] = function () {
          var resource = originals[name].apply(gl, arguments);
          allocations[kind].push(resource);
          return resource;
        };
      });
      var two;
      try {
        two = new Two({ type: Two.Types.webgl, domElement: canvas, width: 100, height: 100 });
        var rect = two.makeRectangle(50, 50, 20, 20);
        two.makePoints(10, 10, 20, 20);
        two.makeText('Test', 50, 50);
        two.update();
        assert.ok(rect._renderer.texture, 'Scene has allocated textures');
        assert.ok(allocations.Buffer.length > 1, 'Renderer and points buffers allocated');
        assert.equal(allocations.Program.length, 2, 'Both shader programs allocated');
        assert.equal(allocations.Shader.length, 4, 'All shaders allocated');
        if (duringUpdate) {
          two.bind('update', function () {
            two.dispose();
          });
          two.update();
        } else {
          two.dispose();
        }
        var textureCount = allocations.Texture.length;
        two.dispose();
        two.update();
        two.render();
        two.renderer.render();
        Object.keys(allocations).forEach(function (kind) {
          allocations[kind].forEach(function (resource) {
            assert.notOk(gl['is' + kind](resource), kind + ' is deleted');
          });
        });
        assert.equal(allocations.Texture.length, textureCount, 'Rendering after disposal allocates no textures');
        assert.notOk(gl.renderer, 'Context no longer retains renderer');
        assert.equal(canvas.parentNode, document.body, 'Caller-owned canvas stays attached');
        assert.strictEqual(canvas.getContext('webgl'), gl, 'Caller-owned context is preserved');
        assert.notOk(gl.isContextLost(), 'Context remains usable');
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        assert.ok(gl.isBuffer(buffer), 'Caller can allocate resources after disposal');
        gl.deleteBuffer(buffer);
        assert.equal(gl.getError(), gl.NO_ERROR, 'Teardown produces no WebGL errors');
      } finally {
        if (two) {
          two.dispose();
        }
        Object.keys(originals).forEach(function (name) {
          gl[name] = originals[name];
        });
        document.body.removeChild(canvas);
      }
    });
  });

  QUnit.test('Two.dispose - Animation Loop', function (assert) {
    assert.expect(5);
    var done = assert.async();

    var a = new Two({ width: 10, height: 10, autostart: true });
    var b = new Two({ width: 10, height: 10, autostart: true });

    afterFrames(2, function () {
      a.dispose();
      var frameCount = b.frameCount;

      afterFrames(2, function () {
        assert.ok(
          b.frameCount > frameCount,
          'Remaining instance keeps updating'
        );
        assert.notEqual(Two.NextFrameId, null, 'Loop runs while one plays');

        b.dispose();

        afterFrames(2, function () {
          assert.equal(
            Two.NextFrameId,
            null,
            'Loop sleeps when no instance is playing'
          );

          var c = new Two({ width: 10, height: 10 });
          c.play();
          frameCount = c.frameCount;

          afterFrames(2, function () {
            assert.ok(c.frameCount > frameCount, 'Two#play wakes the loop');
            assert.notEqual(Two.NextFrameId, null, 'Loop runs again');
            c.dispose();
            done();
          });
        });
      });
    });
  });
})();
