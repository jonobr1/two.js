var fs = require('fs');
var path = require('path');

var sourceFiles = require('../../utils/source-files');
var fileSizes = getJSON('../../utils/file-sizes.json');

var root = { title: 'Base', children: [] };
var effects = { title: 'Effects', children: [] };
var renderers = { title: 'Renderers', children: [] };
var shapes = { title: 'Shapes', children: [] };
var extras = { title: 'Extras', children: [] };

var sidebarForDocs = [root, effects, renderers, shapes, extras];

for (var i = 0; i < sourceFiles.length; i++) {

  // var name = sourceFiles[i].replace(/.*\/([a-zA-Z\-]*)\.js$/i, '$1');
  var name = sourceFiles[i]
    .replace('jsm/', '')
    .replace('extras', '/extras')
    .replace('src/', '/').replace('.js', '/');

  name = `/docs${name}`;

  if (name.match('effects')) {
    effects.children.push(name);
  } else if (name.match('renderers')) {
    renderers.children.push(name);
  } else if (name.match('shapes')) {
    shapes.children.push(name);
  } else if (name.match('extras')) {
    extras.children.push(name);
  } else {
    root.children.push(name);
  }

}

function getJSON(filepath) {
  var file = fs.readFileSync(path.resolve(__dirname, filepath));
  return JSON.parse(file);
}

module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.gif' }],
    ['link', { rel: 'stylesheet', href: 'https://use.typekit.net/edp1hux.css' }],
    ['meta', { name: 'google-site-verification', content: 'eNzLpThZ5XFyxVRedxqW7JxwibqK83DLO-Pqx9rTIDo' }],
    ['meta', { property: 'og:title', content: 'Two.js' }],
    ['meta', { property: 'og:description', content: 'A renderer agnostic two-dimensional drawing api for the web.' }],
    ['meta', { property: 'og:url', content: 'https://two.js.org/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://two.js.org/images/thumbnail.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:site', content: '@jonofyi' }],
    ['meta', { name: 'twitter:title', content: 'Two.js' }],
    ['meta', { name: 'twitter:description', content: 'A renderer agnostic two-dimensional drawing api for the web.' }],
    ['meta', { name: 'twitter:image', content: 'https://two.js.org/images/thumbnail.jpg' }],
    ['script', { type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.0/beautify.min.js', async: '' }]
  ],
  description: 'A renderer agnostic two-dimensional drawing api for the web.',
  themeConfig: {
    repo: 'jonobr1/two.js',
    repoLabel: 'GitHub',
    logo: '/images/logo.svg',
    docsDir: 'wiki',
    docsBranch: 'dev',
    editLinks: true,
    editLinkText: 'See a typo? Help us improve it.',
    smoothScroll: true,
    lastUpdated: 'Last Updated',
    activeHeaderLinks: false,
    searchPlaceholder: 'Search',
    searchMaxSuggestions: 10,
    developmentSize: fileSizes.development,
    productionSize: fileSizes.production,
    nav: [
      {
        text: 'Docs', link: '/docs/two/'
      },
      {
        text: 'Examples', link: '/examples/'
      },
      {
        text: 'Changelog', link: '/changelog/'
      }
    ],
    sidebar: {
      '/changelog/': ['/changelog/'],
      '/docs/': sidebarForDocs
    },
    markdown: {
      lineNumbers: true
    }
  }
};
