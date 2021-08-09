import root from './root.js';

var Matrix;
var TWO_PI = Math.PI * 2;
var HALF_PI = Math.PI * 0.5;

/**
 * @name Two.Utils.decomposeMatrix
 * @function
 * @param {Two.Matrix} matrix - The matrix to decompose.
 * @returns {Object} An object containing relevant skew values.
 * @description Decompose a 2D 3x3 Matrix to find the skew.
 */
var decomposeMatrix = function(matrix) {

  // TODO: Include skewX, skewY
  // https://math.stackexchange.com/questions/237369/given-this-transformation-matrix-how-do-i-decompose-it-into-translation-rotati/417813
  // https://stackoverflow.com/questions/45159314/decompose-2d-transformation-matrix

  return {
      translateX: matrix.e,
      translateY: matrix.f,
      scaleX: Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b),
      scaleY: Math.sqrt(matrix.c * matrix.c + matrix.d * matrix.d),
      rotation: 180 * Math.atan2(matrix.b, matrix.a) / Math.PI
  };

};

var setMatrix = function(M) {
  Matrix = M;
};

/**
 * @name Two.Utils.getComputedMatrix
 * @function
 * @param {Two.Shape} object - The Two.js object that has a matrix property to calculate from.
 * @param {Two.Matrix} [matrix] - The matrix to apply calculated transformations to if available.
 * @returns {Two.Matrix} The computed matrix of a nested object. If no `matrix` was passed in arguments then a `new Two.Matrix` is returned.
 * @description Method to get the world space transformation of a given object in a Two.js scene.
 */
var getComputedMatrix = function(object, matrix) {

  matrix = (matrix && matrix.identity()) || new Matrix();
  var parent = object, matrices = [];

  while (parent && parent._matrix) {
    matrices.push(parent._matrix);
    parent = parent.parent;
  }

  matrices.reverse();

  for (var i = 0; i < matrices.length; i++) {

    var m = matrices[i];
    var e = m.elements;
    matrix.multiply(
      e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9]);

  }

  return matrix;

};

/**
 * @name Two.Utils.lerp
 * @function
 * @param {Number} a - Start value.
 * @param {Number} b - End value.
 * @param {Number} t - Zero-to-one value describing percentage between a and b.
 * @returns {Number}
 * @description Linear interpolation between two values `a` and `b` by an amount `t`.
 */
var lerp = function(a, b, t) {
  return t * (b - a) + a;
};

/**
 * @name Two.Utils.getPoT
 * @param {Number} value - The number to find the nearest power-of-two value
 * @returns {Number}
 * @description Rounds a number up to the nearest power-of-two value.
 * @see {@link https://en.wikipedia.org/wiki/Power_of_two}
 */
var pots = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
var getPoT = function(value) {
  var i = 0;
  while (pots[i] && pots[i] < value) {
    i++;
  }
  return pots[i];
};

/**
 * @name Two.Utils.mod
 * @function
 * @param {Number} v - The value to modulo
 * @param {Number} l - The value to modulo by
 * @returns {Number}
 * @description Modulo with added functionality to handle negative values in a positive manner.
 */
var mod = function(v, l) {

  while (v < 0) {
    v += l;
  }

  return v % l;

};

var NumArray = root.Float32Array || Array;
var floor = Math.floor;

/**
* @name Two.Utils.toFixed
* @function
* @param {Number} v - Any float
* @returns {Number} That float trimmed to the third decimal place.
* @description A pretty fast toFixed(3) alternative.
* @see {@link http://jsperf.com/parsefloat-tofixed-vs-math-round/18}
*/
var toFixed = function(v) {
  return floor(v * 1000000) / 1000000;
};


export {
  decomposeMatrix, getComputedMatrix, getPoT, setMatrix, lerp, mod, NumArray,
  toFixed, TWO_PI, HALF_PI
};
