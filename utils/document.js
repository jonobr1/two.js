var path = require('path');
var compiler = require('jsdoc-api');

var explanation = compiler.explainSync({
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
      // path.resolve(__dirname, '../src/path.js'),
      // path.resolve(__dirname, '../src/shapes/line.js'),
      // path.resolve(__dirname, '../src/shapes/rectangle.js'),
      // path.resolve(__dirname, '../src/shapes/ellipse.js'),
      // path.resolve(__dirname, '../src/shapes/circle.js'),
      // path.resolve(__dirname, '../src/shapes/polygon.js'),
      // path.resolve(__dirname, '../src/shapes/arc-segment.js'),
      // path.resolve(__dirname, '../src/shapes/star.js'),
      // path.resolve(__dirname, '../src/shapes/rounded-rectangle.js'),
      // path.resolve(__dirname, '../src/text.js'),
      // path.resolve(__dirname, '../src/effects/gradient.js'),
      // path.resolve(__dirname, '../src/effects/linear-gradient.js'),
      // path.resolve(__dirname, '../src/effects/radial-gradient.js'),
      // path.resolve(__dirname, '../src/effects/texture.js'),
      // path.resolve(__dirname, '../src/effects/sprite.js'),
      // path.resolve(__dirname, '../src/effects/image-sequence.js'),
      // path.resolve(__dirname, '../src/group.js')
    ],
    cache: false,
    configure: path.resolve(__dirname, '../jsdoc-conf.json')
});

explanation.slice(0).forEach(function(object) {
  var a = object.undocumented;
  var b = /package\:undefined/i.test(object.longname);
  var c = /Two\.Utils\.Events\.(bind|unbind)/i.test(object.memberof)
  if (a || b || c) {
    explanation.splice(explanation.indexOf(object), 1);
  }
});

// For all @kinds
// ID = example.longname
// example.description
// example.augments
// example.params
// example.access ( don't show 'private' access documentation objects )

// use the meta information in conjunction with the folder structure to
// create the right navigation environment.

// example.meta.path // Replace with github URL based on tagged version
// example.meta.filename
// example.meta.lineno
// example.meta.columnno
// example.memberof // Use to map and identify what goes to what

// Overload Methods
// ----------------
// Check tags for special "overloaded" tag. If it exists then make the value
// of the ID's longname an array instead of just the object. If the array
// already exists then continue to append onto the array.

explanation.forEach(function(item) {
  // if (/^Two\.Vector\#add$/i.test(item.longname)) {
  //   console.log(item);
  // }
  console.log(item.longname, item.memberof);
});

// console.log(explanation[0]);
