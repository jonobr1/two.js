declare module 'two.js/src/utils/device-pixel-ratio' {
  /**
   * @name Two.Utils.getRatio
   * @function
   * @param {CanvasRenderingContext2D} ctx
   * @returns {Number} The ratio of a unit in Two.js to the pixel density of a session's screen.
   * @see [High DPI Rendering](http://www.html5rocks.com/en/tutorials/canvas/hidpi/)
   */
  export function getRatio(ctx: CanvasRenderingContext2D): number;
}
