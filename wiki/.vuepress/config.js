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

  name = `/documentation${name}`;

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
    ['link', { rel: 'stylesheet', href: 'https://use.typekit.net/edp1hux.css' }]
  ],
  themeConfig: {
    //repo: 'jonobr1/two.js',
    //repoLabel: 'Github',
    logo: '/images/logo.svg',
    docsDir: 'wiki',
    docsBranch: 'dev',
    editLinks: true,
    editLinkText: 'See a typo? Help us improve it.',
    smoothScroll: true,
    lastUpdated: 'Last Updated',
    activeHeaderLinks: false,
    searchPlaceholder: 'Search...',
    developmentSize: fileSizes.development,
    productionSize: fileSizes.production,
    nav: [
      // {
      //   text: 'Overview', link: '/'
      // },
      {
        text: 'Examples', link: '/examples/'
      },
      // {
      //   text: 'Projects', link: '/projects/'
      // },
      {
        text: 'Documentation', link: '/documentation/two/'
      },
      {
        text: 'Change Log', link: '/change-log/'
      }
      // {
      //   text: 'Sponsors', link: '/sponsor'
      // }
    ],
    sidebar: {
      '/change-log/': ['/change-log/'],
      '/documentation/': sidebarForDocs
    },
    markdown: {
      lineNumbers: true
    },
    plugins: ['@vuepress/nprogress']
  }
};
