/* eslint-env es6 */
function assert(condition, property, message) {
  if (!condition) {
    const error = new Error(message || property);
    error.property = property;
    throw error;
  }
}

function near(actual, expected, property) {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= 0.002 + 0.00002 * Math.max(Math.abs(actual), Math.abs(expected)), property, `${property}: ${actual} != ${expected}`);
}

function compare(a, b, property) {
  assert(typeof a === typeof b, property);
  if (typeof a === 'number') return near(a, b, property);
  if (a && typeof a === 'object') {
    assert(Object.keys(a).join() === Object.keys(b).join(), property);
    for (const key of Object.keys(a)) compare(a[key], b[key], property);
  } else assert(a === b, property);
}

function snapshot(group) {
  const paths = [];
  function visit(shape) {
    if (shape.children) return shape.children.forEach(visit);
    if (!shape.vertices) return;
    shape._update();
    const vertices = shape.vertices.map((v) => {
      const values = [v.x, v.y, v.controls.left.x, v.controls.left.y, v.controls.right.x, v.controls.right.y, v.rx, v.ry, v.xAxisRotation];
      assert(values.every(Number.isFinite), 'svg-finite-vertices');
      return [v.command, ...values, v.largeArcFlag, v.sweepFlag];
    });
    paths.push({ vertices, matrix: Array.from(shape.worldMatrix.elements), closed: shape.closed, fill: typeof shape.fill === 'string' ? shape.fill : shape.fill._renderer.type });
  }
  visit(group);
  return paths;
}

function svgComparison(Two, left, right, expectedPaths) {
  const instances = [];
  const host = document.createElement('div');
  document.body.appendChild(host);
  try {
    // Both routes use HTML's SVG parsing context; interpret receives a live DOM node.
    host.innerHTML = left;
    const first = new Two({ width: 256, height: 256, autostart: false });
    instances.push(first);
    const interpreted = first.interpret(host.firstElementChild);
    first.update();
    const expected = snapshot(interpreted);
    if (expectedPaths !== undefined) assert(expected.length === expectedPaths, 'svg-path-count');
    const second = new Two({ width: 256, height: 256, autostart: false });
    instances.push(second);
    const loaded = second.load(right);
    second.add(loaded).update();
    compare(snapshot(loaded), expected, 'svg-equivalent-input');
    return { paths: expected.length };
  } finally {
    instances.forEach((two) => two.dispose());
    host.remove();
  }
}

function pathSVG(input, variant) {
  const commands = [['M', input.start], ...input.segments];
  const d = commands.map(([letter, args]) => letter + args.map((n, i) => {
    // Arc flags have a one-character grammar, not the general number grammar.
    if (letter.toUpperCase() === 'A' && (i === 3 || i === 4)) return String(n);
    return variant ? n.toExponential(10) : String(n);
  }).join(variant ? ',\n' : ' ')).join(variant ? '\n' : ' ');
  return `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`;
}

function polylineSVG(points, relative) {
  const d = points.map(([x, y], i) => i === 0 ? `M ${x} ${y}` : relative ? `l ${x - points[i - 1][0]} ${y - points[i - 1][1]}` : `L ${x} ${y}`).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`;
}

function geometry(Two, input) {
  const { points, closed, t, shift, factor } = input;
  function makePath(coordinates) {
    const path = new Two.Path(coordinates.map(([x, y], i) => new Two.Anchor(x, y, 0, 0, 0, 0, i ? 'L' : 'M')), closed, false, true);
    path.stroke = 'none';
    path.linewidth = 0;
    return path;
  }
  const path = makePath(points);
  const scaled = makePath(points.map(([x, y]) => [x * factor, y * factor]));
  try {
    const segments = points.slice(1).map((p, i) => [points[i], p]);
    if (closed) segments.push([points[points.length - 1], points[0]]);
    const lengths = segments.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]));
    const length = lengths.reduce((a, b) => a + b, 0);
    near(path.length, length, 'polyline-length');
    near(scaled.length, length * Math.abs(factor), 'scaled-coordinate-length');
    if (length > 0) {
      let remaining = length * t, index = 0;
      while (index < lengths.length - 1 && (lengths[index] === 0 || remaining > lengths[index])) remaining -= lengths[index++];
      const [a, b] = segments[index];
      const actual = path.getPointAt(t);
      assert(actual, 'polyline-point-exists');
      // getPointAt estimates a Bezier parameter, even for straight segments.
      // Assert geometry and traversal, without imposing constant-speed sampling.
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const distance = Math.hypot(dx, dy);
      if (distance > 0) {
        near(((actual.x - a[0]) * dy - (actual.y - a[1]) * dx) / distance, 0, 'polyline-point-on-segment');
        const projection = ((actual.x - a[0]) * dx + (actual.y - a[1]) * dy) / (distance * distance);
        assert(projection >= -0.0001 && projection <= 1.0001, 'polyline-point-within-segment');
      }
      if (t === 0 || t === 1) {
        const endpoint = t === 0 ? points[0] : (closed ? points[0] : points[points.length - 1]);
        near(actual.x, endpoint[0], 'polyline-endpoint-x');
        near(actual.y, endpoint[1], 'polyline-endpoint-y');
      }
    }
    const before = path.getBoundingClientRect();
    path.translation.set(...shift);
    const after = path.getBoundingClientRect();
    near(after.left, before.left + shift[0], 'translated-bounds-x');
    near(after.top, before.top + shift[1], 'translated-bounds-y');
    near(path.length, length, 'translated-length');
    return { length };
  } finally {
    path.dispose();
    scaled.dispose();
  }
}

function transforms(Two, input) {
  const { point, shift, angle, scale, size } = input;
  const matrix = new Two.Matrix().translate(...shift).rotate(angle).scale(scale);
  const actual = matrix.multiply(point[0], point[1], 1);
  const world = ([x, y]) => [shift[0] + scale * (x * Math.cos(angle) - y * Math.sin(angle)), shift[1] + scale * (x * Math.sin(angle) + y * Math.cos(angle))];
  const expected = world(point);
  near(actual[0], expected[0], 'matrix-forward-x');
  near(actual[1], expected[1], 'matrix-forward-y');
  const inverse = matrix.inverse();
  assert(inverse, 'invertible-matrix');
  const restored = inverse.multiply(actual[0], actual[1], 1);
  near(restored[0], point[0], 'matrix-inverse-x');
  near(restored[1], point[1], 'matrix-inverse-y');
  compare(Array.from(Two.Matrix.fromObject(matrix.toObject()).elements), Array.from(matrix.elements), 'matrix-object-roundtrip');
  const two = new Two({ width: 256, height: 256, autostart: false });
  let copy;
  try {
    const rectangle = new Two.Rectangle(shift[0], shift[1], size, size * 2);
    const circle = new Two.Circle(shift[0], shift[1], size);
    for (const shape of [rectangle, circle]) {
      shape.rotation = angle;
      shape.scale = scale;
      shape.stroke = 'none';
      shape.linewidth = 0;
      two.add(shape);
    }
    two.update();
    assert(rectangle.contains(...world([0, 0])), 'rectangle-interior-hit');
    assert(circle.contains(...world([0, 0])), 'circle-interior-hit');
    assert(!rectangle.contains(...world([size * 3, 0])), 'rectangle-exterior-miss');
    assert(!circle.contains(...world([size * 3, 0])), 'circle-exterior-miss');
    const hits = two.getShapesAtPoint(...shift);
    assert(hits.includes(rectangle) && hits.includes(circle), 'scene-hit-membership');
    rectangle.visible = false;
    assert(!rectangle.contains(...shift), 'hidden-rectangle-miss');
    assert(rectangle.contains(...shift, { ignoreVisibility: true }), 'visibility-override');
    copy = Two.Rectangle.fromObject(rectangle.toObject());
    near(copy.width, rectangle.width, 'rectangle-width-roundtrip');
    near(copy.height, rectangle.height, 'rectangle-height-roundtrip');
    near(copy.translation.x, rectangle.translation.x, 'rectangle-position-roundtrip');
    return { size, scale };
  } finally {
    if (copy) copy.dispose();
    two.dispose();
  }
}

export function execute(Two, input, selfTest = false) {
  try {
    if (selfTest) {
      if (input.target === 'hang') { while (input.target === 'hang') { /* supervised externally */ } }
      if (input.target === 'failure') assert(input.number < 7, 'injected-failure');
      if (input.target === 'unhandled') Promise.reject(new Error('Injected unhandled rejection'));
      return { ok: true };
    }
    let observations;
    switch (input.target) {
      case 'svg-path': observations = svgComparison(Two, pathSVG(input, false), pathSVG(input, true), 1); break;
      case 'svg-polyline': observations = svgComparison(Two, polylineSVG(input.points, false), polylineSVG(input.points, true), 1); break;
      case 'svg-fixture': observations = svgComparison(Two, input.svg, input.svg, input.expectedPaths); break;
      case 'geometry': observations = geometry(Two, input); break;
      case 'transforms': observations = transforms(Two, input); break;
      default: throw new Error('Unknown target: ' + input.target);
    }
    assert(Two.Instances.length === 0, 'instance-cleanup');
    return { ok: true, observations };
  } catch (error) {
    return { ok: false, category: error.property ? 'assertion' : 'exception', property: error.property || input.target, message: error.stack || String(error) };
  }
}
