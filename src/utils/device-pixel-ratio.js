import { root } from './root.js';

const devicePixelRatio = root.devicePixelRatio || 1;

function getBackingStoreRatio(ctx) {
  return ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
}

/**
 * @name Two.Utils.getRatio
 * @function
 * @param {CanvasRenderingContext2D} ctx
 * @returns {Number} The ratio of a unit in Two.js to the pixel density of a session's screen.
 * @see [High DPI Rendering](http://www.html5rocks.com/en/tutorials/canvas/hidpi/)
 */
function getRatio(ctx) {
  return devicePixelRatio / getBackingStoreRatio(ctx);
}

export { getRatio };
