import CanvasRenderer from '../renderers/canvas';

var CanvasShim = {

  Image: null,

  isHeadless: false,

  /**
   * @name Utils.shim
   * @function
   * @param {canvas} canvas - The instanced `Canvas` object provided by `node-canvas`.
   * @param {Image} [Image] - The prototypical `Image` object provided by `node-canvas`. This is only necessary to pass if you're going to load bitmap imagery.
   * @returns {canvas} Returns the instanced canvas object you passed from with additional attributes needed for Two.js.
   * @description Convenience method for defining all the dependencies from the npm package `node-canvas`. See [node-canvas]{@link https://github.com/Automattic/node-canvas} for additional information on setting up HTML5 `<canvas />` drawing in a node.js environment.
   */
  shim: function(canvas, Image) {
    CanvasRenderer.Utils.shim(canvas);
    if (typeof Image !== 'undefined') {
      CanvasShim.Image = Image;
    }
    CanvasShim.isHeadless = true;
    return canvas;
  }

};

export default CanvasShim;