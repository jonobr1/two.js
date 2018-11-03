// https://npmjs.org/package/node-minify

var path = require('path');
var compressor = require('node-minify');
var _ = require('underscore');
var fs = require('fs');
var moment = require('moment');

var files = [
  path.resolve(__dirname, './start-comment.js'),
  path.resolve(__dirname, '../LICENSE'),
  path.resolve(__dirname, './end-comment.js'),
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
      var source = fs.readFileSync(path.resolve(__dirname, '../build/two.js'), {
        encoding: 'utf-8'
      });
      var template = _.template(source);
      source = template({
        publishDate: moment().format()
      });
      fs.writeFileSync(path.resolve(__dirname, '../build/two.js'), source, {
        encoding: 'utf-8'
      });

      // Minified
      compressor.minify({
        compressor: 'gcc',
        input: path.resolve(__dirname, '../build/two.js'),
        output: path.resolve(__dirname, '../build/two.min.js'),
        callback: function(e) {
          if (!e) {
            console.log('minified complete');
          } else {
            console.log('unable to minify', e);
          }
        }
      });

      compressor.minify({
        compressor: 'no-compress',
        input: [
          path.resolve(__dirname, '../build/two.js'),
          path.resolve(__dirname, './exports.js')
        ],
        output: path.resolve(__dirname, '../build/two.module.js'),
        callback: function(e) {
          if (!e) {
            console.log('module complete');
          } else {
            console.log('unable to create module', e);
          }
        }
      });

    } else {

      console.log('unable to concatenate', e);
    }

  }

});
