export const CanvasPolyfill = {
  /**
   * @param {Image}
   */
  Image: null,

  /**
   * @param {Boolean}
   */
  isHeadless: false,

  /**
   *
   * @param {canvas} elem - An element to spoof as a `<canvas />`.
   * @param {String} [name] - An optional tag and node name to spoof. Defaults to `'canvas'`.
   * @returns {canvas} - The same `elem` passed in the first argument with updated attributes needed to be used by Two.js.
   * @description Adds attributes invoked by Two.js in order to execute and run correctly. This is used by headless environments.
   */
  shim: function (elem, name) {
    elem.tagName = elem.nodeName = name || 'canvas';
    elem.nodeType = 1;
    elem.getAttribute = function (prop) {
      return this[prop];
    };
    elem.setAttribute = function (prop, val) {
      this[prop] = val;
      return this;
    };
    return elem;
  },

  /**
   * @name Two.Utils.polyfill
   * @function
   * @param {canvas} canvas - The instanced `Canvas` object provided by `node-canvas`.
   * @param {Image} [Image] - The prototypical `Image` object provided by `node-canvas`. This is only necessary to pass if you're going to load bitmap imagery.
   * @returns {canvas} Returns the instanced canvas object you passed from with additional attributes needed for Two.js.
   * @description Convenience method for defining all the dependencies from the npm package `node-canvas`. See [node-canvas](https://github.com/Automattic/node-canvas) for additional information on setting up HTML5 `<canvas />` drawing in a node.js environment.
   */
  polyfill: function (canvas, Image) {
    CanvasPolyfill.shim(canvas);
    if (typeof Image !== 'undefined') {
      CanvasPolyfill.Image = Image;
    }
    CanvasPolyfill.isHeadless = true;
    return canvas;
  },
};
