var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var compiler = require('jsdoc-api');
var sourceFiles = require('./source-files');

var directory = [];

var template = _.template(
  fs.readFileSync(
    path.resolve(__dirname, './docs.template'),
    { encoding: 'utf8' }
  )
);

preprocess();

function preprocess() {

  _.each(sourceFiles, function(file) {

    var sourceFile = path.resolve(__dirname, '../', file);
    var pivotDir = ['/docs/', file.replace('jsm/', '')
      .replace('src/', '').replace('.js', '/')].join('');

    var citations = compiler.explainSync({
      files: sourceFile,
      cache: false
    });

    var root = getRoot(citations);

    directory.push({ name: root.longname, dir: pivotDir });

  });

  process();

}

function process() {

  _.each(sourceFiles, function(file) {

    var sourceFile = path.resolve(__dirname, '../', file);
    var pivotDir = ['/docs/', file.replace('jsm/', '')
      .replace('src/', '').replace('.js', '/')].join('');

    var outputDir = path.resolve(__dirname, '../wiki' + pivotDir);
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
        sn = object.longname.replace(/#/ig, '.');
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

    fs.mkdirSync(outputDir + '/', { recursive: true });
    fs.writeFileSync(outputFile.replace('README.md', 'docs.json'),
      JSON.stringify(citations));

    fs.writeFileSync(outputFile, template({
      root: getRoot(citations, true),
      citations: citations
    }));

    console.log('Generated', outputFile);

  });

}

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
    return `/docs/${path}/`;
  }

}



function getRoot(citations, shouldSplice) {
  var list = citations.slice(0);
  for (var i = 0; i < list.length; i++) {
    var citation = list[i];
    if (/class/i.test(citation.kind)) {
      var index = _.indexOf(citations, citation);
      if (!!shouldSplice) {
        citations.splice(index, 1);
      }
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
        var longname = name.replace(/#/i, '.');

        var dir = getDirectoryMatch(longname);
        var hash = fragments.length > 2 ? fragments.slice(2).join('-') : '';
        var href = [
          '[',
          fragments.join('.'),
          ']',
          '(',
          dir,
          hash ? '#' + hash.toLowerCase() : '',
          ')'
        ].join('');

        object[property] = value.replace(regex, href);
        shouldRecurse = true;

      }

    }

  }

  if (shouldRecurse) {
    expandLink(object, property);
  }

  return object;

}

function getDirectoryMatch(str) {
  var index = -1;
  for (var i = 0; i < directory.length; i++) {
    var { name } = directory[i];
    if (str.includes(name)) {
      index = i;
    }
  }
  if (i < 0) {
    return null;
  }
  return directory[index].dir;
}
