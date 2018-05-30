var path = require('path');
var compiler = require('jsdoc-api');

compiler.renderSync({
  files: [
    path.resolve(__dirname, '../src/two.js'),
    path.resolve(__dirname, '../src/registry.js'),
    path.resolve(__dirname, '../src/vector.js'),
    path.resolve(__dirname, '../src/anchor.js'),
    path.resolve(__dirname, '../src/matrix.js'),
    // path.resolve(__dirname, '../src/renderer/svg.js'),
    // path.resolve(__dirname, '../src/renderer/canvas.js'),
    // path.resolve(__dirname, '../src/renderer/webgl.js'),
    path.resolve(__dirname, '../src/shape.js'),
    path.resolve(__dirname, '../src/path.js'),
    // path.resolve(__dirname, '../src/shapes/line.js'),
    // path.resolve(__dirname, '../src/shapes/rectangle.js'),
    // path.resolve(__dirname, '../src/shapes/ellipse.js'),
    // path.resolve(__dirname, '../src/shapes/circle.js'),
    // path.resolve(__dirname, '../src/shapes/polygon.js'),
    // path.resolve(__dirname, '../src/shapes/arc-segment.js'),
    // path.resolve(__dirname, '../src/shapes/star.js'),
    // path.resolve(__dirname, '../src/shapes/rounded-rectangle.js'),
    path.resolve(__dirname, '../src/text.js'),
    // path.resolve(__dirname, '../src/effects/gradient.js'),
    // path.resolve(__dirname, '../src/effects/linear-gradient.js'),
    // path.resolve(__dirname, '../src/effects/radial-gradient.js'),
    // path.resolve(__dirname, '../src/effects/texture.js'),
    // path.resolve(__dirname, '../src/effects/sprite.js'),
    // path.resolve(__dirname, '../src/effects/image-sequence.js'),
    path.resolve(__dirname, '../src/group.js')
  ],
  destination: path.resolve(__dirname, '../documentation')
});

console.log('Two.js Documentation rendered');
