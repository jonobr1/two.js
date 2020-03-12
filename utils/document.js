var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var compiler = require('jsdoc-api');
var sourceFiles = require('./source-files');

var template = _.template(
  fs.readFileSync(
    path.resolve(__dirname, './documentation.template'),
    { encoding: 'utf8' }
  )
);

_.each(sourceFiles, function(file) {

  var sourceFile = path.resolve(__dirname, '../' + file);
  var outputDir = path.resolve(__dirname,
    '../' + file.replace('src/', 'wiki/documentation/').replace('.js', '/')
  );
  var outputFile = path.join(outputDir, '/README.md');

  var citations = compiler.explainSync({
      files: sourceFile,
      cache: false,
      configure: path.resolve(__dirname, '../jsdoc-conf.json')
  });

  citations.slice(0).forEach(function(object) {
    var a = object.undocumented;
    var b = /package:undefined/i.test(object.longname);
    var c = /Two\.Utils\.Events\.(bind|unbind)/i.test(object.memberof);
    var d = /(private|protected)/i.test(object.access);
    if (a || b || c || d) {
      citations.splice(citations.indexOf(object), 1);
    }
  });


  // fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile.replace('README.md', 'docs.json'), JSON.stringify(citations));
  fs.writeFileSync(outputFile, template({
    root: getRoot(citations),
    citations: citations
  }));
  console.log('Generated', outputFile);

});

function getRoot(citations) {
  var result = null;
  var list = citations.slice(0);
  for (var i = 0; i < list.length; i++) {
    var citation = list[i];
    if (/class/i.test(citation.kind)) {
      var index = _.indexOf(citations, citation);
      citations.splice(index, 1);
      return citation;
    }
  }
  return null;
}

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

// citations.forEach(function(item) {
//   // if (/^Two\.Vector\#add$/i.test(item.longname)) {
//   //   console.log(item);
//   // }
//   console.log(item.longname, item.memberof);
// });

// console.log(citations[0]);
