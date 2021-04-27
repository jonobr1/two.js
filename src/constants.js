var count = 0;

var Constants = {

  /**
   * @name Two.nextFrameID
   * @property {Number}
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
  Version: '<%= version %>',

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
   * @name Two.AutoCalculateImportedMatrices
   * @property {Boolean} - When importing SVGs through the {@link two#interpret} and {@link two#load}, this boolean determines whether Two.js infers and then overrides the exact transformation matrix of the reference SVG.
   * @nota-bene `false` copies the exact transformation matrix values, but also sets the path's `matrix.manual = true`.
   */
  AutoCalculateImportedMatrices: true,

  /**
   * @name Two.Instances
   * @property {Two[]} - Registered list of all Two.js instances in the current session.
   */
  Instances: [],

  /**
   * @function Two.uniqueId
   * @description Simple method to access an incrementing value. Used for `id` allocation on all Two.js objects.
   * @returns {Number} Ever increasing Number.
   */
  uniqueId: function() {
    return count++;
  }

};

export default Constants;
