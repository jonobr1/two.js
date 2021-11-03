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

  var sourceFile = path.resolve(__dirname, '../', file);
  var outputDir = path.resolve(__dirname,
    '../wiki/documentation/', file.replace('jsm/', '').replace('src/', '').replace('.js', '/')
  );
  var outputFile = path.join(outputDir, '/README.md');

  var citations = compiler.explainSync({
      files: sourceFile,
      cache: false
  });

  citations.slice(0).forEach(function(object) {

    var a = object.undocumented;
    var b = /package:undefined/i.test(object.longname);
    var c = /Two\.Utils\.Events\.(bind|unbind)/i.test(object.memberof);
    var d = /(private|protected)/i.test(object.access);

    if (a || b || c || d) {

      // Remove private / hidden / incomplete documented citations
      citations.splice(citations.indexOf(object), 1);

    } else {

      expandLink(object, 'description');
      _.each(object.params, expandParam, object);
      _.each(object.returns, expandParam, object);
      _.each(object.properties, expandParam, object);
      _.each(object.tags, expandTag, object);
      object.see = _.map(object.see, expandSee, object);

      var sn;
      sn = object.longname.replace(/\#/ig, '.');
      var snList = sn.split('.');
      var snIndex = (snList.length > 2) ? 2 : 1;
      object.shortname = snList.slice(snIndex).join('.');
      object.prefixname = sn.replace(object.shortname, "");
      
      // name and href for augments property
      var an;

      if (Array.isArray(object.augments) && object.augments.length > 0) {
        an = object.augments[object.augments.length - 1].split('.');
      } else if (typeof object.augments === 'string') {
        an = object.augments.split('.');
      }

      if (an) {
        object.augmentsHref = getHref(an.slice(1).join('.'));
      }

    }

  });

  var citationsByScope = {
    instance: [],
    static: []
  };

  _.each(citations, function(citation) {
    if (/#/i.test(citation.longname)) {
      citationsByScope.instance.push(citation);
    } else {
      citationsByScope.static.push(citation);
    }
  });

  // citationsByScope.instance.sort(sortByFunctionThenAlphabetical);
  // citationsByScope.static.sort(sortByFunctionThenAlphabetical);

  citations = citationsByScope.static.concat(citationsByScope.instance);

  // console.log(
  //   citations.map(function(a) {
  //     return a.scope + '-' + a.longname;
  //   })
  // );

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile.replace('README.md', 'docs.json'),
    JSON.stringify(citations));

  fs.writeFileSync(outputFile, template({
    root: getRoot(citations),
    citations: citations
  }));

  console.log('Generated', outputFile);

});

function getHref(name) {

  name = name.toLowerCase();

  for (var i = 0; i < sourceFiles.length; i++) {

    var sf = sourceFiles[i];
    if (sf.includes(name)) {
      return transform(sf);
    }

  }

  return null;

  function transform(str) {
    var path = str.replace('src/', '').replace('jsm/', '').replace('.js', '');
    return `/documentation/${path}/`;
  }

}

function getRoot(citations) {
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

function expandSee(see) {
  return expandLink({ text: see }, 'text').text;
}

function expandTag(tag) {
  switch (tag.title) {
    case 'overloaded':
      this.overloaded = true;
      delete tag.title;
      delete tag.originalTitle;
      delete tag.text;
      break;
    default:
      expandLink(tag, 'text');
  }
}

function expandParam(param) {
  expandLink(param, 'description');
}

function expandLink(object, property) {

  var value = object[property];
  var shouldRecurse = false;

  if (value) {

    var regex = /\{@link ([\w\d:/?\-.#]*)\}/i;
    var link = value.match(regex);

    if (link && link.length > 1) {

      var name = link[1];

      if (/http/i.test(name)) {

        object[property] = value.replace(regex, '[$1]($1)');
        shouldRecurse = true;

      } else {

        var fragments = name.split(/[.#]/i);

        var directory = fragments[1] || '';
        var hash = fragments.length > 2 ? fragments.join('-') : '';

        object[property] = value.replace(regex, [
          '[',
          fragments.join('.'),
          ']',
          '(/documentation/',
          directory.toLowerCase(),
          hash ? '/#' + hash.toLowerCase() : '',
          ')'
        ].join(''));
        shouldRecurse = true;

      }

    }

  }

  if (shouldRecurse) {
    expandLink(object, property);
  }

  return object;

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
