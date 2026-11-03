/* global performance */
(function () {
  var names = ['matrix', 'curve-bounds', 'world-matrix', 'path-hit', 'hit-query',
    'svg', 'canvas', 'webgl'];

  function create(name) {
    if (names.indexOf(name) < 0) { throw new Error('Unknown workload: ' + name); }
    var frame = 0;
    var checksum = 0;
    var matrix = new Two.Matrix();
    var output = new Two.Matrix();
    var group = new Two.Group();
    var leaf = group;
    var shapes = [];
    var two;
    var i;

    if (name === 'world-matrix') {
      for (i = 0; i < 20; i++) {
        var child = new Two.Group();
        child.matrix.manual = true;
        child.matrix.translate(i / 10, i / 20).rotate(0.01);
        leaf.add(child);
        leaf = child;
      }
    }
    if (name === 'path-hit' || name === 'hit-query') {
      for (i = 0; i < 40; i++) {
        var circle = new Two.Circle(100 + i % 4, 100 + i % 5, 30 + i % 3);
        group.add(circle);
        shapes.push(circle);
      }
    }
    if (name === 'svg' || name === 'canvas' || name === 'webgl') {
      two = new Two({type: Two.Types[name], width: 640, height: 480, autostart: false});
      two.appendTo(document.getElementById('scene'));
      for (i = 0; i < 20; i++) {
        var nested = new Two.Group();
        nested.translation.set((i % 5) * 120 + 60, Math.floor(i / 5) * 110 + 55);
        two.add(nested);
        for (var j = 0; j < 10; j++) {
          var shape = j % 2 ? new Two.Circle(j - 5, j - 5, 10 + j) :
            new Two.Rectangle(j - 5, j - 5, 15 + j, 20 + j);
          shape.fill = j % 2 ? '#06c' : '#c60';
          nested.add(shape);
          shapes.push(shape);
        }
        nested.add(new Two.Text('Two.js', 0, 25));
      }
      two.update();
    }

    return {
      step: function () {
        frame++;
        var i;
        switch (name) {
          case 'matrix':
            for (i = 0; i < 500; i++) {
              matrix.identity().translate(i, frame % 10).rotate(0.1).scale(1.01);
              checksum += matrix.elements[0];
            }
            break;
          case 'curve-bounds':
            for (i = 0; i < 500; i++) {
              var bounds = Two.Utils.getCurveBoundingBox(0, 0, 100 + i, -100,
                -50, 100 + frame % 10, 10, 20);
              checksum += bounds.max.x;
            }
            break;
          case 'world-matrix':
            for (i = 0; i < 50; i++) {
              Two.Utils.getComputedMatrix(leaf, output);
              checksum += output.elements[2];
            }
            break;
          case 'path-hit':
            for (i = 0; i < shapes.length; i++) {
              checksum += shapes[i].contains(100 + frame % 10, 100) ? 1 : 0;
            }
            break;
          case 'hit-query':
            for (i = 0; i < 5; i++) {
              checksum += group.getShapesAtPoint(100 + frame % 10, 100).length;
            }
            break;
          default:
            for (i = 0; i < shapes.length; i++) {
              shapes[i].rotation = (frame + i) / 100;
            }
            // Exercise geometry updates as well as already-rasterized frames.
            shapes[frame % shapes.length].scale = 1 + frame % 10 / 100;
            two.update();
            checksum += two.frameCount;
        }
      },
      checksum: function () { return checksum; },
      dispose: function () {
        if (two) {
          var element = two.renderer.domElement;
          two.dispose();
          element.remove();
        }
        group.dispose();
      },
    };
  }

  window.AllocationBenchmark = { names: names, create: create };
  var select = document.getElementById('workload');
  names.forEach(function (name) {
    var option = document.createElement('option');
    option.value = option.textContent = name;
    select.appendChild(option);
  });
  document.getElementById('run').onclick = function () {
    var scenario = create(select.value);
    try {
      var timings = [];
      for (var i = 0; i < 100; i++) { scenario.step(); }
      for (i = 0; i < 300; i++) {
        var start = performance.now();
        scenario.step();
        timings.push(performance.now() - start);
      }
      timings.sort(function (a, b) { return a - b; });
      document.getElementById('results').textContent = JSON.stringify({
        workload: select.value, samples: timings.length,
        p50Milliseconds: timings[149], p95Milliseconds: timings[284],
        checksum: scenario.checksum(),
      }, null, 2);
    } finally {
      scenario.dispose();
    }
  };
})();
