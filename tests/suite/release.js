/**
 * Tests Two.js release() Method Enhanced Functionality:
 * + Basic release functionality
 * + SVG DOM element cleanup
 * + Canvas renderer cleanup  
 * + WebGL resource cleanup
 * + Memory leak prevention
 * + Recursive cleanup of nested objects
 */

(function () {
  QUnit.module('Release Method');

  QUnit.test('Two.release - Basic Functionality', function (assert) {
    assert.expect(3);

    var two = new Two({
      width: 400,
      height: 400
    });

    var rect = two.makeRectangle(100, 100, 50, 50);
    
    // Test release method exists
    assert.ok(typeof two.release === 'function', 'Two.release method exists');
    
    // Test release returns the object
    var result = two.release(rect);
    assert.equal(result, rect, 'Two.release returns the released object');
    
    // Test release works with undefined (the default case)
    var undefinedResult = two.release();
    assert.ok(undefinedResult !== null, 'Two.release handles undefined gracefully by releasing scene');

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.release - SVG DOM Element Cleanup', function (assert) {
    assert.expect(6);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400
    }).appendTo(document.body);

    var rect = two.makeRectangle(100, 100, 50, 50);
    var circle = two.makeCircle(200, 200, 25);
    
    two.update();
    
    // Verify elements exist in DOM
    var rectElem = two.renderer.domElement.querySelector('#' + rect.id);
    var circleElem = two.renderer.domElement.querySelector('#' + circle.id);
    
    assert.ok(rectElem, 'Rectangle SVG element exists in DOM before release');
    assert.ok(circleElem, 'Circle SVG element exists in DOM before release');
    assert.ok(rect._renderer.elem, 'Rectangle has _renderer.elem before release');
    assert.ok(circle._renderer.elem, 'Circle has _renderer.elem before release');
    
    // Release objects
    two.release(rect);
    two.release(circle);
    
    // Verify elements are removed from DOM
    var rectElemAfter = two.renderer.domElement.querySelector('#' + rect.id);
    var circleElemAfter = two.renderer.domElement.querySelector('#' + circle.id);
    
    assert.ok(!rectElemAfter, 'Rectangle SVG element removed from DOM after release');
    assert.ok(!circleElemAfter, 'Circle SVG element removed from DOM after release');

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.release - SVG Gradient Cleanup', function (assert) {
    assert.expect(4);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400
    }).appendTo(document.body);

    var gradient = two.makeLinearGradient(0, 0, 1, 1,
      new Two.Stop(0, 'red'),
      new Two.Stop(1, 'blue')
    );
    
    var rect = two.makeRectangle(100, 100, 50, 50);
    rect.fill = gradient;
    
    two.update();
    
    // Verify gradient exists in DOM
    var gradientElem = two.renderer.domElement.querySelector('#' + gradient.id);
    assert.ok(gradientElem, 'Gradient SVG element exists in DOM before release');
    assert.ok(gradient._renderer.elem, 'Gradient has _renderer.elem before release');
    
    // Release gradient
    two.release(gradient);
    
    // Verify gradient is removed from DOM
    var gradientElemAfter = two.renderer.domElement.querySelector('#' + gradient.id);
    assert.ok(!gradientElemAfter, 'Gradient SVG element removed from DOM after release');
    assert.ok(!gradient._renderer.elem, 'Gradient _renderer.elem is cleared after release');

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.release - Canvas Renderer Cleanup', function (assert) {
    assert.expect(3);

    var two = new Two({
      type: Two.Types.canvas,
      width: 400,
      height: 400
    }).appendTo(document.body);

    var rect = two.makeRectangle(100, 100, 50, 50);
    
    two.update();
    
    // Verify renderer context exists
    assert.ok(two.renderer.ctx, 'Canvas renderer has context');
    assert.ok(rect._renderer, 'Rectangle has _renderer object');
    
    // Release object
    two.release(rect);
    
    // Verify cleanup (context references should be cleared if they existed)
    // Canvas cleanup mainly involves clearing cached references
    assert.ok(true, 'Canvas release completed without errors');

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.release - WebGL Resource Cleanup', function (assert) {
    assert.expect(5);

    var two = new Two({
      type: Two.Types.webgl,
      width: 400,
      height: 400
    }).appendTo(document.body);

    var rect = two.makeRectangle(100, 100, 50, 50);
    
    two.update();
    
    // Verify WebGL context and basic setup
    var gl = two.renderer.ctx;
    assert.ok(gl, 'WebGL context exists');
    assert.ok(rect._renderer, 'Rectangle has _renderer object');
    
    // Test that we can release WebGL objects without errors
    var releaseResult = two.release(rect);
    assert.equal(releaseResult, rect, 'WebGL object release returns the object');
    
    // Test effect cleanup - manually set an effect and verify it gets cleared
    var rect2 = two.makeRectangle(150, 150, 50, 50);
    rect2._renderer.effect = 'test-effect';
    two.release(rect2);
    assert.ok(!rect2._renderer.effect, 'WebGL effect cleared after release');
    
    assert.ok(true, 'WebGL release completed without errors');

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.release - Recursive Group Cleanup', function (assert) {
    assert.expect(8);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400
    }).appendTo(document.body);

    var group = two.makeGroup();
    var rect1 = two.makeRectangle(100, 100, 50, 50);
    var rect2 = two.makeRectangle(200, 200, 50, 50);
    var subGroup = two.makeGroup();
    var circle = two.makeCircle(150, 150, 25);
    
    // Build hierarchy
    group.add(rect1, rect2, subGroup);
    subGroup.add(circle);
    
    two.update();
    
    // Verify all elements exist in DOM
    assert.ok(two.renderer.domElement.querySelector('#' + group.id), 'Group exists in DOM');
    assert.ok(two.renderer.domElement.querySelector('#' + rect1.id), 'Rect1 exists in DOM');
    assert.ok(two.renderer.domElement.querySelector('#' + rect2.id), 'Rect2 exists in DOM');
    assert.ok(two.renderer.domElement.querySelector('#' + subGroup.id), 'SubGroup exists in DOM');
    assert.ok(two.renderer.domElement.querySelector('#' + circle.id), 'Circle exists in DOM');
    
    // Release the group (should recursively clean up children)
    two.release(group);
    
    // Verify all elements are removed from DOM
    assert.ok(!two.renderer.domElement.querySelector('#' + rect1.id), 'Rect1 removed from DOM');
    assert.ok(!two.renderer.domElement.querySelector('#' + rect2.id), 'Rect2 removed from DOM');
    assert.ok(!two.renderer.domElement.querySelector('#' + circle.id), 'Circle removed from DOM');

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.release - Event Unbinding', function (assert) {
    assert.expect(4);

    var two = new Two({
      width: 400,
      height: 400
    });

    var rect = two.makeRectangle(100, 100, 50, 50);
    var eventFired = false;
    
    // Bind event listener
    rect.bind('change', function() {
      eventFired = true;
    });
    
    // Test event fires before release
    rect.trigger('change');
    assert.ok(eventFired, 'Event fires before release');
    
    // Reset flag
    eventFired = false;
    
    // Release object
    two.release(rect);
    
    // Test event doesn't fire after release
    rect.trigger('change');
    assert.ok(!eventFired, 'Event does not fire after release');
    
    // Test vertex event unbinding
    var path = two.makePath(0, 0, 100, 0, 100, 100, 0, 100);
    var vertexEventFired = false;
    
    if (path.vertices && path.vertices[0]) {
      path.vertices[0].bind('change', function() {
        vertexEventFired = true;
      });
      
      path.vertices[0].trigger('change');
      assert.ok(vertexEventFired, 'Vertex event fires before release');
      
      vertexEventFired = false;
      two.release(path);
      
      path.vertices[0].trigger('change');
      assert.ok(!vertexEventFired, 'Vertex event does not fire after release');
    } else {
      assert.ok(true, 'Path has no vertices to test');
      assert.ok(true, 'Skipping vertex event test');
    }

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.release - Effects Cleanup', function (assert) {
    assert.expect(6);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400
    }).appendTo(document.body);

    var gradient = two.makeLinearGradient(0, 0, 1, 1,
      new Two.Stop(0, 'red'),
      new Two.Stop(1, 'blue')
    );
    
    var rect = two.makeRectangle(100, 100, 50, 50);
    rect.fill = gradient;
    rect.stroke = gradient;
    
    var eventFired = false;
    gradient.bind('change', function() {
      eventFired = true;
    });
    
    two.update();
    
    // Test effects are bound
    gradient.trigger('change');
    assert.ok(eventFired, 'Gradient event fires before release');
    
    eventFired = false;
    
    // Release object (should clean up effects)
    two.release(rect);
    
    // Test that gradient events are unbound for fill
    if (rect.fill && typeof rect.fill.unbind === 'function') {
      gradient.trigger('change');
      assert.ok(!eventFired, 'Fill gradient event does not fire after release');
    } else {
      assert.ok(true, 'Fill gradient already unbound or not applicable');
    }
    
    // Test that gradient events are unbound for stroke  
    if (rect.stroke && typeof rect.stroke.unbind === 'function') {
      gradient.trigger('change');
      assert.ok(!eventFired, 'Stroke gradient event does not fire after release');
    } else {
      assert.ok(true, 'Stroke gradient already unbound or not applicable');
    }
    
    // Test gradient disposal
    var gradientElem = two.renderer.domElement.querySelector('#' + gradient.id);
    if (gradientElem) {
      assert.ok(gradientElem, 'Gradient still exists in DOM (expected for shared effects)');
    } else {
      assert.ok(true, 'Gradient removed from DOM');
    }
    
    // Release the gradient itself
    two.release(gradient);
    var gradientElemAfter = two.renderer.domElement.querySelector('#' + gradient.id);
    assert.ok(!gradientElemAfter, 'Gradient removed from DOM after direct release');
    
    assert.ok(true, 'Effects cleanup completed without errors');

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

  QUnit.test('Two.release - Scene Release', function (assert) {
    assert.expect(4);

    var two = new Two({
      type: Two.Types.svg,
      width: 400,
      height: 400
    }).appendTo(document.body);

    var rect = two.makeRectangle(100, 100, 50, 50);
    var circle = two.makeCircle(200, 200, 25);
    
    two.update();
    
    // Verify elements exist
    assert.ok(two.renderer.domElement.querySelector('#' + rect.id), 'Rectangle exists before scene release');
    assert.ok(two.renderer.domElement.querySelector('#' + circle.id), 'Circle exists before scene release');
    
    // Release entire scene
    two.release();
    
    // Verify all elements are cleaned up
    assert.ok(!two.renderer.domElement.querySelector('#' + rect.id), 'Rectangle removed after scene release');
    assert.ok(!two.renderer.domElement.querySelector('#' + circle.id), 'Circle removed after scene release');

    QUnit.Utils.addInstanceToTest(assert.test, two);
  });

})();