var count = 0;

var Constants = {

  /**
   * @name Two.nextFrameID
   * @property {Integer}
   * @description The id of the next requestAnimationFrame function.
   */
  nextFrameID: null,

  // Primitive

  /**
   * @name Two.Types
   * @property {Object} - The different rendering types available in the library.
   */
  Types: {
    webgl: 'WebGLRenderer',
    svg: 'SVGRenderer',
    canvas: 'CanvasRenderer'
  },

  /**
   * @name Two.Version
   * @property {String} - The current working version of the library.
   */
  Version: 'v0.8.0-dev',

  /**
   * @name Two.PublishDate
   * @property {String} - The automatically generated publish date in the build process to verify version release candidates.
   */
  PublishDate: '<%= publishDate %>',

  /**
   * @name Two.Identifier
   * @property {String} - String prefix for all Two.js object's ids. This trickles down to SVG ids.
   */
  Identifier: 'two-',

  /**
   * @name Two.Resolution
   * @property {Number} - Default amount of vertices to be used for interpreting Arcs and ArcSegments.
   */
  Resolution: 12,

  /**
   * @name Two.Instances
   * @property {Two[]} - Registered list of all Two.js instances in the current session.
   */
  Instances: [],

  /**
   * @function Two.uniqueId
   * @description Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
   * @returns {Number} Ever increasing integer.
   */
  uniqueId: function() {
    return count++;
  }

};

export default Constants;
