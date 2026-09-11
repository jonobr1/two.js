import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { redirectPlugin } from '@vuepress/plugin-redirect';
import { searchPlugin } from '@vuepress/plugin-search';
import { defaultTheme } from '@vuepress/theme-default';
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';

const require = createRequire(import.meta.url);
const sourceFiles = require('../../utils/source-files');

const configDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(configDir, '../..');
const gaMeasurementId = 'G-SWY5MWPRFR';
const root = { text: 'Base', children: [] as string[] };
const effects = { text: 'Effects', children: [] as string[] };
const renderers = { text: 'Renderers', children: [] as string[] };
const shapes = { text: 'Shapes', children: [] as string[] };
const extras = { text: 'Extras', children: [] as string[] };
const sidebarForDocs = [root, effects, renderers, shapes, extras];
const changelogSidebar = ['/changelog/'];

for (let i = 0; i < sourceFiles.length; i++) {
  const file = sourceFiles[i];
  let name = file
    .replace('jsm/', '')
    .replace('extras', '/extras')
    .replace('src/', '/')
    .replace('.js', '/');

  name = `/docs${name}`;

  if (name.includes('effects')) {
    effects.children.push(name);
  } else if (name.includes('renderers')) {
    renderers.children.push(name);
  } else if (name.includes('shapes')) {
    shapes.children.push(name);
  } else if (name.includes('extras')) {
    extras.children.push(name);
  } else {
    root.children.push(name);
  }
}

const redirectConfig = {
  '/projects/': '/examples/',
  '/docs/': '/docs/two/',
  '/change-log/': '/changelog/',
};

const twoDocsPlugin = () => ({
  name: 'two-docs-plugin',
  alias: {
    '@two-file-sizes': path.resolve(projectRoot, 'utils/file-sizes.json'),
    '@theme/VPPageMeta.vue': path.resolve(
      configDir,
      'components/vp-page-meta.vue',
    ),
  },
  extendsPage(page) {
    if (!Array.isArray(page.headers)) {
      page.headers = [];
    }

    if (page.path !== '/examples/') {
      return;
    }

    const headers = parseExampleCards(page.content).flatMap((card) => {
      const slug = slugify(card.title);

      return [
        {
          level: 2,
          title: card.title,
          slug,
          children: [],
        },
        ...card.tags.map((tag) => ({
          level: 3,
          title: `${card.title} > ${tag}`,
          slug,
          children: [],
        })),
      ];
    });

    page.headers = headers;
    page.data = { ...page.data, headers };
    page.routeMeta = { ...page.routeMeta, headers };
  },
});

const head = [
  ['link', { rel: 'icon', href: '/images/favicon.gif' }],
  [
    'link',
    { rel: 'stylesheet', href: 'https://use.typekit.net/edp1hux.css' },
  ],
  [
    'meta',
    {
      name: 'google-site-verification',
      content: 'eNzLpThZ5XFyxVRedxqW7JxwibqK83DLO-Pqx9rTIDo',
    },
  ],
  ['meta', { property: 'og:title', content: 'Two.js' }],
  [
    'meta',
    {
      property: 'og:description',
      content: 'A renderer agnostic two-dimensional drawing api for the web.',
    },
  ],
  ['meta', { property: 'og:url', content: 'https://two.js.org/' }],
  ['meta', { property: 'og:type', content: 'website' }],
  [
    'meta',
    {
      property: 'og:image',
      content: 'https://two.js.org/images/thumbnail.jpg',
    },
  ],
  ['meta', { name: 'twitter:card', content: 'summary' }],
  ['meta', { name: 'twitter:site', content: '@jonofyi' }],
  ['meta', { name: 'twitter:title', content: 'Two.js' }],
  [
    'meta',
    {
      name: 'twitter:description',
      content: 'A renderer agnostic two-dimensional drawing api for the web.',
    },
  ],
  [
    'meta',
    {
      name: 'twitter:image',
      content: 'https://two.js.org/images/thumbnail.jpg',
    },
  ],
  [
    'script',
    {
      type: 'text/javascript',
      src: 'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.0/beautify.min.js',
      async: '',
    },
  ],
] as [string, Record<string, string>, string?][];

export default defineUserConfig({
  lang: 'en-US',
  title: 'Two.js',
  description: 'A renderer agnostic two-dimensional drawing api for the web.',
  head,
  theme: defaultTheme({
    hostname: 'https://two.js.org',
    colorMode: 'light',
    colorModeSwitch: false,
    docsRepo: 'https://github.com/jonobr1/two.js',
    home: '/',
    logo: '/images/logo.svg',
    externalLinkIcon: false,
    docsDir: 'wiki',
    docsBranch: 'dev',
    editLink: true,
    editLinkText: 'See a typo? Help us improve it.',
    lastUpdated: true,
    lastUpdatedText: 'Last Updated',
    contributors: false,
    navbar: [
      {
        text: 'Docs',
        link: '/docs/two/',
      },
      {
        text: 'Examples',
        link: '/examples/',
      },
      {
        text: 'Changelog',
        link: '/changelog/',
      },
    ],
    sidebar: {
      '/changelog/': changelogSidebar,
      '/docs/': sidebarForDocs,
      '/': false,
    },
    themePlugins: {
      activeHeaderLinks: false,
      backToTop: false,
      copyCode: false,
      prismjs: {
        lineNumbers: false,
        preloadLanguages: ['bash', 'javascript', 'jsdoc', 'markdown', 'yaml'],
      },
      sitemap: {
        excludePaths: ['/404.html'],
      },
    },
  }),
  plugins: [
    twoDocsPlugin(),
    googleAnalyticsPlugin({
      id: gaMeasurementId,
    }),
    redirectPlugin({
      config: redirectConfig,
    }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
      maxSuggestions: 10,
    }),
  ],
  bundler: viteBundler(),
});

function parseExampleCards(source: string) {
  const cards: { title: string; tags: string[] }[] = [];
  const regex = /<example-card([\s\S]*?)\/>/g;

  let match = regex.exec(source);

  while (match) {
    const attributes = match[1];
    const title = getAttribute(attributes, 'title');
    const tags = getAttribute(attributes, 'tags')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (title) {
      cards.push({ title, tags });
    }

    match = regex.exec(source);
  }

  return cards;
}

function getAttribute(attributes: string, name: string) {
  const match = attributes.match(new RegExp(`${name}="([^"]*)"`, 'i'));
  return match ? match[1] : '';
}

function slugify(value: string) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['".]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
