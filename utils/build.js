// https://npmjs.org/package/node-minify

var path = require('path');
var compressor = require('node-minify');

var files = [
  path.resolve(__dirname, '../LICENSE'),
  path.resolve(__dirname, '../src/two.js'),
  path.resolve(__dirname, '../src/registry.js'),
  path.resolve(__dirname, '../src/vector.js'),
  path.resolve(__dirname, '../src/anchor.js'),
  path.resolve(__dirname, '../src/matrix.js'),
  path.resolve(__dirname, '../src/renderer/svg.js'),
  path.resolve(__dirname, '../src/renderer/canvas.js'),
  path.resolve(__dirname, '../src/renderer/webgl.js'),
  path.resolve(__dirname, '../src/shape.js'),
  path.resolve(__dirname, '../src/path.js'),
  path.resolve(__dirname, '../src/shapes/line.js'),
  path.resolve(__dirname, '../src/shapes/rectangle.js'),
  path.resolve(__dirname, '../src/shapes/ellipse.js'),
  path.resolve(__dirname, '../src/shapes/circle.js'),
  path.resolve(__dirname, '../src/shapes/polygon.js'),
  path.resolve(__dirname, '../src/shapes/arc-segment.js'),
  path.resolve(__dirname, '../src/shapes/star.js'),
  path.resolve(__dirname, '../src/shapes/rounded-rectangle.js'),
  path.resolve(__dirname, '../src/text.js'),
  path.resolve(__dirname, '../src/effects/gradient.js'),
  path.resolve(__dirname, '../src/effects/linear-gradient.js'),
  path.resolve(__dirname, '../src/effects/radial-gradient.js'),
  path.resolve(__dirname, '../src/effects/texture.js'),
  path.resolve(__dirname, '../src/effects/sprite.js'),
  path.resolve(__dirname, '../src/effects/image-sequence.js'),
  path.resolve(__dirname, '../src/group.js')
];

// Concatenated
compressor.minify({
  compressor: 'no-compress',
  input: files,
  output: path.resolve(__dirname, '../build/two.js'),
  callback: function(e) {
    if (!e) {
      console.log('concatenation complete');
    } else {
      console.log('unable to concatenate', e);
    }
  }
});

// Minified
compressor.minify({
  compressor: 'gcc',
  input: files,
  output: path.resolve(__dirname, '../build/two.min.js'),
  callback: function(e){
    if (!e) {
      console.log('minified complete');
    } else {
      console.log('unable to minify', e);
    }
  }
});
