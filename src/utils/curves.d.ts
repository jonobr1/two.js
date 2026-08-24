declare module 'two.js/src/utils/curves' {
  export interface Curve {
    CollinearityEpsilon: number;
    RecursionLimit: number;
    CuspLimit: number;
    Tolerance: {
      distance: number;
      angle: number;
      epsilon: number;
    };
    abscissas: number[][];
    weights: number[][];
  }
  /**
   * @name Two.Utils.getComponentOnCubicBezier
   * @function
   * @param {Number} t - Zero-to-one value describing what percentage to calculate.
   * @param {Number} a - The first point's component value.
   * @param {Number} b - The first point's bezier component value.
   * @param {Number} c - The second point's bezier component value.
   * @param {Number} d - The second point's component value.
   * @returns {Number} The coordinate value for a specific component along a cubic bezier curve by `t`.
   */
  export function getComponentOnCubicBezier(
    t: number,
    a: number,
    b: number,
    c: number,
    d: number
  ): number;
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
  export function subdivide(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
    limit?: number
  ): Anchor[];
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
  export function getCurveLength(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
    limit?: number
  ): number;
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
  export function getCurveBoundingBox(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): any;
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
  export function integrate(
    f: Function,
    a: number,
    b: number,
    n: number
  ): number;
  /**
   * @name Two.Utils.getCurveFromPoints
   * @function
   * @param {Anchor[]} points
   * @param {Boolean} closed
   * @description Sets the bezier handles on {@link Anchor}s in the `points` list with estimated values to create a catmull-rom like curve. Used by {@link Two.Path#plot}.
   */
  export function getCurveFromPoints(points: Anchor[], closed: boolean): void;
  /**
   * @name Two.Utils.getControlPoints
   * @function
   * @param {Anchor} a
   * @param {Anchor} b
   * @param {Anchor} c
   * @returns {Anchor} Returns the passed middle point `b`.
   * @description Given three coordinates set the control points for the middle, b, vertex based on its position with the adjacent points.
   */
  export function getControlPoints(a: Anchor, b: Anchor, c: Anchor): Anchor;
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
  export function getReflection(
    a: Vector,
    b: Vector,
    relative?: boolean
  ): Vector;
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
  export function getAnchorsFromArcData(
    center: Vector,
    xAxisRotation: number,
    rx: number,
    ry: number,
    ts: number,
    td: number,
    ccw?: boolean
  ): void;
  import { Anchor } from 'two.js/src/anchor';
  import { Vector } from 'two.js/src/vector';
}
