import { mod, HALF_PI } from './math.js';
import { Commands } from './path-commands.js';

import { Anchor } from '../anchor.js';
import { Vector } from '../vector.js';
import { Constants } from '../constants.js';

/**
 * @name Two.Utils.Curve
 * @property {Object} - Additional utility constant variables related to curve math and calculations.
 */
const Curve = {
  CollinearityEpsilon: Math.pow(10, -30),

  RecursionLimit: 16,

  CuspLimit: 0,

  Tolerance: {
    distance: 0.25,
    angle: 0,
    epsilon: Number.EPSILON,
  },

  // Lookup tables for abscissas and weights with values for n = 2 .. 16.
  // As values are symmetric, only store half of them and adapt algorithm
  // to factor in symmetry.
  abscissas: [
    [0.5773502691896],
    [0, 0.7745966692415],
    [0.3399810435849, 0.8611363115941],
    [0, 0.5384693101057, 0.9061798459387],
    [0.2386191860832, 0.6612093864663, 0.9324695142032],
    [0, 0.4058451513774, 0.7415311855994, 0.9491079123428],
    [0.1834346424956, 0.5255324099163, 0.7966664774136, 0.9602898564975],
    [0, 0.3242534234038, 0.6133714327006, 0.8360311073266, 0.9681602395076],
    [
      0.1488743389816, 0.4333953941292, 0.679409568299, 0.865063366689,
      0.9739065285172,
    ],
    [
      0, 0.2695431559523, 0.5190961292068, 0.730152005574, 0.8870625997681,
      0.9782286581461,
    ],
    [
      0.1252334085115, 0.3678314989982, 0.5873179542866, 0.7699026741943,
      0.9041172563705, 0.9815606342467,
    ],
    [
      0, 0.2304583159551, 0.4484927510364, 0.6423493394403, 0.8015780907333,
      0.917598399223, 0.9841830547186,
    ],
    [
      0.1080549487073, 0.3191123689279, 0.5152486363582, 0.6872929048117,
      0.8272013150698, 0.9284348836636, 0.9862838086968,
    ],
    [
      0, 0.2011940939974, 0.3941513470776, 0.5709721726085, 0.7244177313602,
      0.8482065834104, 0.9372733924007, 0.9879925180205,
    ],
    [
      0.0950125098376, 0.2816035507793, 0.4580167776572, 0.6178762444026,
      0.755404408355, 0.8656312023878, 0.9445750230732, 0.9894009349916,
    ],
  ],

  weights: [
    [1],
    [0.8888888888889, 0.5555555555556],
    [0.6521451548625, 0.3478548451375],
    [0.5688888888889, 0.4786286704994, 0.2369268850562],
    [0.4679139345727, 0.3607615730481, 0.1713244923792],
    [0.4179591836735, 0.3818300505051, 0.2797053914893, 0.1294849661689],
    [0.3626837833784, 0.3137066458779, 0.2223810344534, 0.1012285362904],
    [
      0.3302393550013, 0.31234707704, 0.2606106964029, 0.1806481606949,
      0.0812743883616,
    ],
    [
      0.2955242247148, 0.26926671931, 0.219086362516, 0.1494513491506,
      0.0666713443087,
    ],
    [
      0.2729250867779, 0.2628045445102, 0.233193764592, 0.1862902109277,
      0.1255803694649, 0.0556685671162,
    ],
    [
      0.2491470458134, 0.2334925365384, 0.2031674267231, 0.1600783285433,
      0.1069393259953, 0.0471753363865,
    ],
    [
      0.2325515532309, 0.2262831802629, 0.2078160475369, 0.1781459807619,
      0.1388735102198, 0.0921214998377, 0.0404840047653,
    ],
    [
      0.2152638534632, 0.2051984637213, 0.1855383974779, 0.1572031671582,
      0.1215185706879, 0.0801580871598, 0.0351194603318,
    ],
    [
      0.2025782419256, 0.1984314853271, 0.1861610000156, 0.166269205817,
      0.1395706779262, 0.1071592204672, 0.0703660474881, 0.0307532419961,
    ],
    [
      0.1894506104551, 0.1826034150449, 0.169156519395, 0.1495959888166,
      0.1246289712555, 0.0951585116825, 0.0622535239386, 0.0271524594118,
    ],
  ],
};

/**
 * @name Two.Utils.getComponentOnCubicBezier
 * @function
 * @param {Number} t - Zero-to-one value describing what percentage to calculate.
 * @param {Number} a - The firt point's component value.
 * @param {Number} b - The first point's bezier component value.
 * @param {Number} c - The second point's bezier component value.
 * @param {Number} d - The second point's component value.
 * @returns {Number} The coordinate value for a specific component along a cubic bezier curve by `t`.
 */
function getComponentOnCubicBezier(t, a, b, c, d) {
  const k = 1 - t;
  return k * k * k * a + 3 * k * k * t * b + 3 * k * t * t * c + t * t * t * d;
}

/**
 * @name Two.Utils.subdivide
 * @function
 * @param {Number} x1 - x position of first anchor point.
 * @param {Number} y1 - y position of first anchor point.
 * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
 * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
 * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
 * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
 * @param {Number} x4 - x position of second anchor point.
 * @param {Number} y4 - y position of second anchor point.
 * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
 * @returns {Anchor[]} A list of anchor points ordered in between `x1`, `y1` and `x4`, `y4`
 * @description Given 2 points (a, b) and corresponding control point for each return an array of points that represent points plotted along the curve. The number of returned points is determined by `limit`.
 */
function subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit) {
  limit = limit || Curve.RecursionLimit;
  const amount = limit + 1;

  // TODO: Abstract 0.001 to a limiting variable
  // Don't recurse if the end points are identical
  if (Math.abs(x1 - x4) < 0.001 && Math.abs(y1 - y4) < 0.001) {
    return [new Anchor(x4, y4)];
  }

  const result = [];

  for (let i = 0; i < amount; i++) {
    const t = i / amount;
    const x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
    const y = getComponentOnCubicBezier(t, y1, y2, y3, y4);
    result.push(new Anchor(x, y));
  }

  return result;
}

/**
 * @name Two.Utils.getCurveLength
 * @function
 * @param {Number} x1 - x position of first anchor point.
 * @param {Number} y1 - y position of first anchor point.
 * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
 * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
 * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
 * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
 * @param {Number} x4 - x position of second anchor point.
 * @param {Number} y4 - y position of second anchor point.
 * @param {Number} [limit=Two.Utils.Curve.RecursionLimit] - The amount of vertices to create by subdividing.
 * @returns {Number} The length of a curve.
 * @description Given 2 points (a, b) and corresponding control point for each, return a float that represents the length of the curve using Gauss-Legendre algorithm. Limit iterations of calculation by `limit`.
 */
function getCurveLength(x1, y1, x2, y2, x3, y3, x4, y4, limit) {
  // TODO: Better / fuzzier equality check
  // Linear calculation
  if (x1 === x2 && y1 === y2 && x3 === x4 && y3 === y4) {
    const dx = x4 - x1;
    const dy = y4 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Calculate the coefficients of a Bezier derivative.
  const ax = 9 * (x2 - x3) + 3 * (x4 - x1),
    bx = 6 * (x1 + x3) - 12 * x2,
    cx = 3 * (x2 - x1),
    ay = 9 * (y2 - y3) + 3 * (y4 - y1),
    by = 6 * (y1 + y3) - 12 * y2,
    cy = 3 * (y2 - y1);

  function integrand(t) {
    // Calculate quadratic equations of derivatives for x and y
    const dx = (ax * t + bx) * t + cx,
      dy = (ay * t + by) * t + cy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  return integrate(integrand, 0, 1, limit || Curve.RecursionLimit);
}

/**
 * @name Two.Utils.getCurveBoundingBox
 * @function
 * @param {Number} x1 - x position of first anchor point.
 * @param {Number} y1 - y position of first anchor point.
 * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
 * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
 * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
 * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
 * @param {Number} x4 - x position of second anchor point.
 * @param {Number} y4 - y position of second anchor point.
 * @returns {Object} Object contains min and max `x` / `y` bounds.
 * @see {@link https://github.com/adobe-webplatform/Snap.svg/blob/master/src/path.js#L856}
 */
function getCurveBoundingBox(x1, y1, x2, y2, x3, y3, x4, y4) {
  const tvalues = [];
  const bounds = [[], []];
  let a, b, c, t, t1, t2, b2ac, sqrtb2ac;

  for (let i = 0; i < 2; ++i) {
    if (i === 0) {
      b = 6 * x1 - 12 * x2 + 6 * x3;
      a = -3 * x1 + 9 * x2 - 9 * x3 + 3 * x4;
      c = 3 * x2 - 3 * x1;
    } else {
      b = 6 * y1 - 12 * y2 + 6 * y3;
      a = -3 * y1 + 9 * y2 - 9 * y3 + 3 * y4;
      c = 3 * y2 - 3 * y1;
    }
    if (Math.abs(a) < 0.001) {
      if (Math.abs(b) < 0.001) {
        continue;
      }
      t = -c / b;
      if (0 < t && t < 1) {
        tvalues.push(t);
      }
      continue;
    }
    b2ac = b * b - 4 * c * a;
    sqrtb2ac = Math.sqrt(b2ac);
    if (b2ac < 0) {
      continue;
    }
    t1 = (-b + sqrtb2ac) / (2 * a);
    if (0 < t1 && t1 < 1) {
      tvalues.push(t1);
    }
    t2 = (-b - sqrtb2ac) / (2 * a);
    if (0 < t2 && t2 < 1) {
      tvalues.push(t2);
    }
  }

  let j = tvalues.length;
  let jlen = j;
  let mt;

  while (j--) {
    t = tvalues[j];
    mt = 1 - t;
    bounds[0][j] =
      mt * mt * mt * x1 +
      3 * mt * mt * t * x2 +
      3 * mt * t * t * x3 +
      t * t * t * x4;
    bounds[1][j] =
      mt * mt * mt * y1 +
      3 * mt * mt * t * y2 +
      3 * mt * t * t * y3 +
      t * t * t * y4;
  }

  bounds[0][jlen] = x1;
  bounds[1][jlen] = y1;
  bounds[0][jlen + 1] = x4;
  bounds[1][jlen + 1] = y4;
  bounds[0].length = bounds[1].length = jlen + 2;

  return {
    min: { x: Math.min.apply(0, bounds[0]), y: Math.min.apply(0, bounds[1]) },
    max: { x: Math.max.apply(0, bounds[0]), y: Math.max.apply(0, bounds[1]) },
  };
}

/**
 * @name Two.Utils.integrate
 * @function
 * @param {Function} f
 * @param {Number} a
 * @param {Number} b
 * @param {Number} n
 * @description Integration for `getCurveLength` calculations.
 * @see [Paper.js](@link https://github.com/paperjs/paper.js/blob/master/src/util/Numerical.js#L101)
 */
function integrate(f, a, b, n) {
  let x = Curve.abscissas[n - 2],
    w = Curve.weights[n - 2],
    A = 0.5 * (b - a),
    B = A + a,
    i = 0,
    m = (n + 1) >> 1,
    sum = n & 1 ? w[i++] * f(B) : 0; // Handle odd n
  while (i < m) {
    const Ax = A * x[i];
    sum += w[i++] * (f(B + Ax) + f(B - Ax));
  }
  return A * sum;
}

/**
 * @name Two.Utils.getCurveFromPoints
 * @function
 * @param {Anchor[]} points
 * @param {Boolean} closed
 * @description Sets the bezier handles on {@link Anchor}s in the `points` list with estimated values to create a catmull-rom like curve. Used by {@link Two.Path#plot}.
 */
function getCurveFromPoints(points, closed) {
  const l = points.length,
    last = l - 1;

  for (let i = 0; i < l; i++) {
    const point = points[i];

    const prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
    const next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

    const a = points[prev];
    const b = point;
    const c = points[next];
    getControlPoints(a, b, c);

    b.command = i === 0 ? Commands.move : Commands.curve;
  }
}

/**
 * @name Two.Utils.getControlPoints
 * @function
 * @param {Anchor} a
 * @param {Anchor} b
 * @param {Anchor} c
 * @returns {Anchor} Returns the passed middle point `b`.
 * @description Given three coordinates set the control points for the middle, b, vertex based on its position with the adjacent points.
 */
function getControlPoints(a, b, c) {
  const a1 = Vector.angleBetween(a, b);
  const a2 = Vector.angleBetween(c, b);

  let d1 = Vector.distanceBetween(a, b);
  let d2 = Vector.distanceBetween(c, b);

  let mid = (a1 + a2) / 2;

  // TODO: Issue 73
  if (d1 < 0.001 || d2 < 0.001) {
    if (typeof b.relative === 'boolean' && !b.relative) {
      b.controls.left.copy(b);
      b.controls.right.copy(b);
    }
    return b;
  }

  d1 *= 0.33; // Why 0.33?
  d2 *= 0.33;

  if (a2 < a1) {
    mid += HALF_PI;
  } else {
    mid -= HALF_PI;
  }

  b.controls.left.x = Math.cos(mid) * d1;
  b.controls.left.y = Math.sin(mid) * d1;

  mid -= Math.PI;

  b.controls.right.x = Math.cos(mid) * d2;
  b.controls.right.y = Math.sin(mid) * d2;

  if (typeof b.relative === 'boolean' && !b.relative) {
    b.controls.left.x += b.x;
    b.controls.left.y += b.y;
    b.controls.right.x += b.x;
    b.controls.right.y += b.y;
  }

  return b;
}

/**
 * @name Two.Utils.getReflection
 * @function
 * @param {Vector} a
 * @param {Vector} b
 * @param {Boolean} [relative=false]
 * @returns {Vector} New {@link Vector} that represents the reflection point.
 * @description Get the reflection of a point `b` about point `a`. Where `a` is in absolute space and `b` is relative to `a`.
 * @see {@link http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes}
 */
function getReflection(a, b, relative) {
  return new Vector(
    2 * a.x - (b.x + a.x) - (relative ? a.x : 0),
    2 * a.y - (b.y + a.y) - (relative ? a.y : 0)
  );
}

/**
 * @name Two.Utils.getAnchorsFromArcData
 * @function
 * @param {Vector} center
 * @param {Number} xAxisRotation
 * @param {Number} rx - x radius
 * @param {Number} ry - y radius
 * @param {Number} ts
 * @param {Number} td
 * @param {Boolean} [ccw=false] - Set path traversal to counter-clockwise
 */
function getAnchorsFromArcData(center, xAxisRotation, rx, ry, ts, td, ccw) {
  const resolution = Constants.Resolution;
  const anchors = [];

  for (let i = 0; i < resolution; i++) {
    let pct = (i + 1) / resolution;
    if (ccw) {
      pct = 1 - pct;
    }

    const theta = pct * td + ts;
    const x = rx * Math.cos(theta);
    const y = ry * Math.sin(theta);

    // x += center.x;
    // y += center.y;

    const anchor = new Anchor(x, y);
    anchor.command = Commands.line;

    // TODO: Calculate control points here...

    anchors.push(anchor);
  }
}

export {
  Curve,
  getComponentOnCubicBezier,
  subdivide,
  getCurveLength,
  getCurveBoundingBox,
  integrate,
  getCurveFromPoints,
  getControlPoints,
  getReflection,
  getAnchorsFromArcData,
};
