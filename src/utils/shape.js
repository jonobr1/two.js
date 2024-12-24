import { Texture } from '../effects/texture.js';
import { subdivide, getCurveLength as gcl } from './curves.js';
import { Gradient } from '../effects/gradient.js';
import { LinearGradient } from '../effects/linear-gradient.js';
import { RadialGradient } from '../effects/radial-gradient.js';

/**
 * @private
 * @param {Two.Path} path - The path to analyze against.
 * @param {Number} t -
 * @returns {Number}
 * @description
 */
function contains(path, t) {
  if (t === 0 || t === 1) {
    return true;
  }

  const length = path._length;
  const target = length * t;
  let elapsed = 0;

  for (let i = 0; i < path._lengths.length; i++) {
    const dist = path._lengths[i];
    if (elapsed >= target) {
      return target - elapsed >= 0;
    }
    elapsed += dist;
  }

  return false;
}

/**
 * @private
 * @param {Two.Path} path - The path to analyze against.
 * @param {Number} target - The target length at which to find an anchor.
 * @returns {Number}
 * @description Return the id of an anchor based on a target length.
 */
function getIdByLength(path, target) {
  const total = path._length;

  if (target <= 0) {
    return 0;
  } else if (target >= total) {
    return path._lengths.length - 1;
  }

  for (let i = 0, sum = 0; i < path._lengths.length; i++) {
    if (sum + path._lengths[i] >= target) {
      target -= sum;
      return Math.max(i - 1, 0) + target / path._lengths[i];
    }

    sum += path._lengths[i];
  }

  return -1;
}

function getCurveLength(a, b, limit) {
  // TODO: DRYness
  let x1, x2, x3, x4, y1, y2, y3, y4;

  const right = b.controls && b.controls.right;
  const left = a.controls && a.controls.left;

  x1 = b.x;
  y1 = b.y;
  x2 = (right || b).x;
  y2 = (right || b).y;
  x3 = (left || a).x;
  y3 = (left || a).y;
  x4 = a.x;
  y4 = a.y;

  if (right && b._relative) {
    x2 += b.x;
    y2 += b.y;
  }

  if (left && a._relative) {
    x3 += a.x;
    y3 += a.y;
  }

  return gcl(x1, y1, x2, y2, x3, y3, x4, y4, limit);
}

function getSubdivisions(a, b, limit) {
  // TODO: DRYness
  let x1, x2, x3, x4, y1, y2, y3, y4;

  const right = b.controls && b.controls.right;
  const left = a.controls && a.controls.left;

  x1 = b.x;
  y1 = b.y;
  x2 = (right || b).x;
  y2 = (right || b).y;
  x3 = (left || a).x;
  y3 = (left || a).y;
  x4 = a.x;
  y4 = a.y;

  if (right && b._relative) {
    x2 += b.x;
    y2 += b.y;
  }

  if (left && a._relative) {
    x3 += a.x;
    y3 += a.y;
  }

  return subdivide(x1, y1, x2, y2, x3, y3, x4, y4, limit);
}

function getEffectFromObject(obj) {
  switch (obj.renderer.type) {
    case 'texture':
      return Texture.fromObject(obj);
    case 'gradient':
      return Gradient.fromObject(obj);
    case 'linear-gradient':
      return LinearGradient.fromObject(obj);
    case 'radial-gradient':
      return RadialGradient.fromObject(obj);
  }
  return obj;
}

export {
  contains,
  getEffectFromObject,
  getIdByLength,
  getCurveLength,
  getSubdivisions,
};
