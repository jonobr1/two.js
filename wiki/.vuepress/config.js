var fs = require('fs');
var path = require('path');
var sourceFiles = require('../../utils/source-files');

var fileSizes = getJSON('../../utils/file-sizes.json');

for (var i = 0; i < sourceFiles.length; i++) {
  var name = sourceFiles[i];
  sourceFiles[i] = name.replace('src/', '').replace('.js', '/');
}

function getJSON(filepath) {
  var file = fs.readFileSync(path.resolve(__dirname, filepath));
  return JSON.parse(file);
}

module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.gif' }]
  ],
  themeConfig: {
    repo: 'jonobr1/two.js',
    repoLabel: 'Github',
    docsDir: 'wiki',
    docsBranch: 'dev',
    editLinks: true,
    editLinkText: 'See a typo? Help us improve it.',
    smoothScroll: true,
    nav: [],
    lastUpdated: 'Last Updated',
    activeHeaderLinks: false,
    searchPlaceholder: 'Search...',
    developmentSize: fileSizes.development,
    productionSize: fileSizes.production,
    nav: [
      {
        text: 'Overview', link: '/'
      },
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
      },
      {
        text: 'Sponsors', link: '/sponsor'
      }
    ],
    sidebar: {
      '/change-log/': ['/change-log/'],
      '/documentation/': sourceFiles
    },
    markdown: {
      lineNumbers: true
    },
    plugins: ['@vuepress/medium-zoom', '@vuepress/nprogress']
  }
};
