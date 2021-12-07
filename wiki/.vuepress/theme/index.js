module.exports = function() {
  return {
    extend: '@vuepress/theme-default',
    plugins: {
      '@vuepress/search': false,
      '@vuepress/google-analytics': {
        ga: 'UA-40550435-1'
      },
      'vuepress-plugin-sitemap': {
        hostname: 'https://two.js.org',
        exclude: ['/404.html']
      }
    }
  };
};
