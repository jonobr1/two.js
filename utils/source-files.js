var sourceFiles = [
  'src/two.js',
  'src/registry.js',
  'src/vector.js',
  'src/anchor.js',
  'src/matrix.js',
  'src/renderers/svg.js',
  'src/renderers/canvas.js',
  'src/renderers/webgl.js',
  'src/shape.js',
  'src/path.js',
  'src/shapes/line.js',
  'src/shapes/rectangle.js',
  'src/shapes/ellipse.js',
  'src/shapes/circle.js',
  'src/shapes/points.js',
  'src/shapes/polygon.js',
  'src/shapes/arc-segment.js',
  'src/shapes/star.js',
  'src/shapes/rounded-rectangle.js',
  'src/text.js',
  'src/effects/stop.js',
  'src/effects/gradient.js',
  'src/effects/linear-gradient.js',
  'src/effects/radial-gradient.js',
  'src/effects/texture.js',
  'src/effects/sprite.js',
  'src/effects/image-sequence.js',
  'src/group.js'
];

if (typeof module != 'undefined' && module.exports) {
  module.exports = sourceFiles;
} else if (typeof define === 'function' && define.amd) {
  define('source-files', [], function() {
    return sourceFiles;
  });
}
