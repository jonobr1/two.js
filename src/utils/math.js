import { root } from './root.js';

let Matrix;
const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;

/**
 * @name Two.Utils.decomposeMatrix
 * @function
 * @param {Two.Matrix} matrix - The matrix to decompose.
 * @returns {Object} An object containing relevant skew values.
 * @description Decompose a 2D 3x3 Matrix to find the skew.
 */
function decomposeMatrix(matrix, b, c, d, e, f) {

  // TODO: Include skewX, skewY
  // https://math.stackexchange.com/questions/237369/given-this-transformation-matrix-how-do-i-decompose-it-into-translation-rotati/417813
  // https://stackoverflow.com/questions/45159314/decompose-2d-transformation-matrix

  let a;

  if (arguments.length <= 1) {
    a = matrix.a;
    b = matrix.b;
    c = matrix.c;
    d = matrix.d;
    e = matrix.e;
    f = matrix.f;
  } else {
    a = matrix;
  }

  return {
    translateX: e,
    translateY: f,
    scaleX: Math.sqrt(a * a + b * b),
    scaleY: Math.sqrt(c * c + d * d),
    rotation: 180 * Math.atan2(b, a) / Math.PI
  };

}

function setMatrix(matrix) {
  Matrix = matrix;
}

/**
 * @name Two.Utils.getComputedMatrix
 * @function
 * @param {Two.Shape} object - The Two.js object that has a matrix property to calculate from.
 * @param {Two.Matrix} [matrix] - The matrix to apply calculated transformations to if available.
 * @returns {Two.Matrix} The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.
 * @description Method to get the world space transformation of a given object in a Two.js scene.
 */
function getComputedMatrix(object, matrix) {

  matrix = (matrix && matrix.identity()) || new Matrix();
  let parent = object;
  const matrices = [];

  while (parent && parent._matrix) {
    matrices.push(parent._matrix);
    parent = parent.parent;
  }

  matrices.reverse();

  for (let i = 0; i < matrices.length; i++) {

    const m = matrices[i];
    const e = m.elements;
    matrix.multiply(
      e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);

  }

  return matrix;

}

/**
 * @name Two.Utils.lerp
 * @function
 * @param {Number} a - Start value.
 * @param {Number} b - End value.
 * @param {Number} t - Zero-to-one value describing percentage between a and b.
 * @returns {Number}
 * @description Linear interpolation between two values `a` and `b` by an amount `t`.
 */
function lerp(a, b, t) {
  return t * (b - a) + a;
}

/**
 * @name Two.Utils.getPoT
 * @param {Number} value - The number to find the nearest power-of-two value
 * @returns {Number}
 * @description Rounds a number up to the nearest power-of-two value.
 * @see {@link https://en.wikipedia.org/wiki/Power_of_two}
 */
const pots = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
function getPoT(value) {
  let i = 0;
  while (pots[i] && pots[i] < value) {
    i++;
  }
  return pots[i];
}

/**
 * @name Two.Utils.mod
 * @function
 * @param {Number} v - The value to modulo
 * @param {Number} l - The value to modulo by
 * @returns {Number}
 * @description Modulo with added functionality to handle negative values in a positive manner.
 */
function mod(v, l) {

  while (v < 0) {
    v += l;
  }

  return v % l;

}

const NumArray = root.Float32Array || Array;
const floor = Math.floor;

/**
* @name Two.Utils.toFixed
* @function
* @param {Number} v - Any float
* @returns {Number} That float trimmed to the third decimal place.
* @description A pretty fast toFixed(3) alternative.
* @see {@link http://jsperf.com/parsefloat-tofixed-vs-math-round/18}
*/
function toFixed(v) {
  return floor(v * 1000000) / 1000000;
}

/**
 * @name Two.Utils.getEffectiveStrokeWidth
 * @function
 * @param {Two.Path|Two.Group} object - The object to calculate effective stroke width for.
 * @param {Two.Matrix} [worldMatrix] - The world transformation matrix. If not provided, will be calculated.
 * @returns {Number} The effective stroke width. If `object.strokeAttenuation` is true, returns the original linewidth (scales with transforms). If false, returns the linewidth compensated for world scale to maintain constant screen-space width.
 * @description Calculates the effective stroke width for an object. If `strokeAttenuation` is true, returns the original linewidth (which scales with transforms). If `strokeAttenuation` is false, compensates for world scale so the stroke width remains constant in screen space.
 */
function getEffectiveStrokeWidth(object, worldMatrix) {
  const linewidth = object._linewidth;
  
  // If strokeAttenuation is true (default), return original linewidth (scales with transforms)
  if (object.strokeAttenuation) {
    return linewidth;
  }
  
  // Calculate world matrix if not provided
  if (!worldMatrix) {
    worldMatrix = object.worldMatrix || getComputedMatrix(object);
  }
  
  // Decompose matrix to get scale
  const decomposed = decomposeMatrix(
    worldMatrix.elements[0],
    worldMatrix.elements[3], 
    worldMatrix.elements[1],
    worldMatrix.elements[4],
    worldMatrix.elements[2],
    worldMatrix.elements[5]
  );
  
  // Use the larger of the two scale factors to maintain uniform appearance
  const scale = Math.max(Math.abs(decomposed.scaleX), Math.abs(decomposed.scaleY));
  
  // Compensate for scale to maintain constant screen-space width
  return scale > 0 ? linewidth / scale : linewidth;
}


export {
  decomposeMatrix, getComputedMatrix, getPoT, setMatrix, lerp, mod, NumArray,
  toFixed, getEffectiveStrokeWidth, TWO_PI, HALF_PI
};
