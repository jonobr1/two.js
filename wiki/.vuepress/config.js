var sourceFiles = require('../../utils/source-files');

for (var i = 0; i < sourceFiles.length; i++) {
  var name = sourceFiles[i];
  sourceFiles[i] = name.replace('src/', '').replace('.js', '/');
}

module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.gif' }]
  ],
  themeConfig: {
    repo: 'jonobr1/two.js',
    repoLabel: 'Github',
    docsDir: 'wiki',
    docsBranch: 'jsdocs',
    editLinks: true,
    editLinkText: 'See a typo? Help us improve it.',
    smoothScroll: true,
    nav: [],
    lastUpdated: 'Last Updated',
    activeHeaderLinks: false,
    searchPlaceholder: 'Search...',
    nav: [
      {
        text: 'Overview', link: '/'
      },
      // {
      //   text: 'Examples', link: '/examples/'
      // },
      // {
      //   text: 'Projects', link: '/projects/'
      // },
      {
        text: 'Change Log', link: '/change-log/'
      },
      {
        text: 'Documentation', link: '/documentation/two/'
      },
      // {
      //   text: 'Sponsors', link: '/sponsor'
      // }
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
