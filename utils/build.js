// https://npmjs.org/package/node-minify

var path = require('path');
var compressor = require('node-minify');

var files = [
  path.resolve(__dirname, '../license.txt'),
  path.resolve(__dirname, '../third-party/underscore.js'),
  path.resolve(__dirname, '../third-party/events.js'),
  path.resolve(__dirname, '../third-party/requestAnimationFrame.js'),
  path.resolve(__dirname, '../src/two.js'),
  path.resolve(__dirname, '../src/vector.js'),
  path.resolve(__dirname, '../src/anchor.js'),
  path.resolve(__dirname, '../src/matrix.js'),
  path.resolve(__dirname, '../src/renderer/svg.js'),
  path.resolve(__dirname, '../src/renderer/canvas.js'),
  path.resolve(__dirname, '../src/renderer/webgl.js'),
  path.resolve(__dirname, '../src/shape.js'),
  path.resolve(__dirname, '../src/polygon.js'),
  path.resolve(__dirname, '../src/group.js')
];

new compressor.minify({
  type: 'no-compress',
  fileIn: [files[0]].concat(files.slice(4)),
  fileOut: path.resolve(__dirname, '../build/two.clean.js'),
  callback: function(e) {
    if (!e) {
      console.log('clean complete');
    } else {
      console.log('unable to concatenate clean', e);
    }
  }
});

// Concatenated
new compressor.minify({
  type: 'no-compress',
  fileIn: files,
  fileOut: path.resolve(__dirname, '../build/two.js'),
  callback: function(e) {
    if (!e) {
      console.log('concatenation complete');
    } else {
      console.log('unable to concatenate', e);
    }
  }
});

// Minified
new compressor.minify({
  type: 'gcc',
  fileIn: files,
  fileOut: path.resolve(__dirname, '../build/two.min.js'),
  callback: function(e){
    if (!e) {
      console.log('minified complete');
    } else {
      console.log('unable to minify', e);
    }
  }
});
