declare module 'two.js/src/utils/math' {
  export interface DecomposedMatrix {
    translateX: number;
    translateY: number;
    scaleX: number;
    scaleY: number;
    skewX: number;
    skewY: number;
    rotation: number;
  }
  /**
   * @name Two.Utils.decomposeMatrix
   * @function
   * @param {Matrix} matrix - The matrix to decompose.
   * @returns {Object} An object containing relevant skew values.
   * @description Decompose a 2D 3x3 Matrix to find the skew.
   */
  export function decomposeMatrix(matrix: Matrix): DecomposedMatrix;
  export function decomposeMatrix(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): DecomposedMatrix;
  /**
   * @name Two.Utils.getComputedMatrix
   * @function
   * @param {Shape} object - The Two.js object that has a matrix property to calculate from.
   * @param {Matrix} [matrix] - The matrix to apply calculated transformations to if available.
   * @returns {Matrix} The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.
   * @description Method to get the world space transformation of a given object in a Two.js scene.
   */
  export function getComputedMatrix(object: Shape, matrix?: Matrix): Matrix;
  export function getPoT(value: number | string): number;
  export function setMatrix(matrix: Matrix): void;
  /**
   * @name Two.Utils.lerp
   * @function
   * @param {Number} a - Start value.
   * @param {Number} b - End value.
   * @param {Number} t - Zero-to-one value describing percentage between a and b.
   * @returns {Number}
   * @description Linear interpolation between two values `a` and `b` by an amount `t`.
   */
  export function lerp(a: number, b: number, t: number): number;
  /**
   * @name Two.Utils.mod
   * @function
   * @param {Number} v - The value to modulo
   * @param {Number} l - The value to modulo by
   * @returns {Number}
   * @description Modulo with added functionality to handle negative values in a positive manner.
   */
  export function mod(v: number, l: number): number;
  export const NumArray: Float32Array | number[];
  /**
   * @name Two.Utils.toFixed
   * @function
   * @param {Number} v - Any float
   * @returns {Number} That float trimmed to the third decimal place.
   * @description A pretty fast toFixed(3) alternative.
   * @see {@link http://jsperf.com/parsefloat-tofixed-vs-math-round/18}
   */
  export function toFixed(v: number): number;
  export const TWO_PI: number;
  export const HALF_PI: number;
  /**
   * @name Two.Utils.getEffectiveStrokeWidth
   * @function
   * @param {Path|Group} object - The object to calculate effective stroke width for
   * @param {Matrix} [worldMatrix] - The world transformation matrix. If not provided, will be calculated.
   * @returns {Number} The effective stroke width adjusted for strokeAttenuation setting
   * @description Calculate effective stroke width, compensating for world scale if strokeAttenuation is false
   */
  export function getEffectiveStrokeWidth(
    object: Path | Group,
    worldMatrix?: Matrix
  ): number;
  import { Matrix } from 'two.js/src/matrix';
  import { Shape, ShapeHitTestOptions } from 'two.js/src/shape';
  import { Path } from 'two.js/src/path';
  import { Group } from 'two.js/src/group';
}
