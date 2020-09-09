import root from './root.js';

var devicePixelRatio = root.devicePixelRatio || 1;

var getBackingStoreRatio = function(ctx) {
  return ctx.webkitBackingStorePixelRatio ||
  ctx.mozBackingStorePixelRatio ||
  ctx.msBackingStorePixelRatio ||
  ctx.oBackingStorePixelRatio ||
  ctx.backingStorePixelRatio || 1;
};

/**
 * @name Utils.getRatio
 * @function
 * @param {CanvasRenderingContext2D} ctx
 * @returns {Number} The ratio of a unit in Two.js to the pixel density of a session's screen.
 * @see [High DPI Rendering](http://www.html5rocks.com/en/tutorials/canvas/hidpi/)
 */
var getRatio = function(ctx) {
  return devicePixelRatio / getBackingStoreRatio(ctx);
};

export default getRatio;
