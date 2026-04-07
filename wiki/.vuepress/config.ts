import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
const isProduction = process.env.NODE_ENV === 'production';
const root = { text: 'Base', children: [] as SidebarLink[] };
const effects = { text: 'Effects', children: [] as SidebarLink[] };
const renderers = { text: 'Renderers', children: [] as SidebarLink[] };
const shapes = { text: 'Shapes', children: [] as SidebarLink[] };
const extras = { text: 'Extras', children: [] as SidebarLink[] };
const sidebarForDocs = [root, effects, renderers, shapes, extras];
const changelogSidebar = [
  createSidebarLink('/changelog/', getReadmePath('/changelog/')),
];

for (let i = 0; i < sourceFiles.length; i++) {
  const file = sourceFiles[i];
  let name = file
    .replace('jsm/', '')
    .replace('extras', '/extras')
    .replace('src/', '/')
    .replace('.js', '/');

  name = `/docs${name}`;
  const sidebarLink = createSidebarLink(name, getReadmePath(name));

  if (name.includes('effects')) {
    effects.children.push(sidebarLink);
  } else if (name.includes('renderers')) {
    renderers.children.push(sidebarLink);
  } else if (name.includes('shapes')) {
    shapes.children.push(sidebarLink);
  } else if (name.includes('extras')) {
    extras.children.push(sidebarLink);
  } else {
    root.children.push(sidebarLink);
  }
}

const redirectConfig = {
  '/projects/': '/examples/',
  '/docs/': '/docs/two/',
  '/change-log/': '/changelog/',
  '/donate/': 'https://github.com/sponsors/jonobr1',
};

const twoDocsPlugin = () => ({
  name: 'two-docs-plugin',
  alias: {
    '@two-file-sizes': path.resolve(projectRoot, 'utils/file-sizes.json'),
  },
  extendsPage(page) {
    if (!Array.isArray(page.headers)) {
      page.headers = [];
    }

    if (page.path !== '/examples/') {
      return;
    }

    const headers = parseExampleCards(page.content).map((card) => ({
      level: 2,
      title: card.title,
      slug: slugify(card.title),
      children: [],
    }));

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

if (isProduction) {
  head.push([
    'script',
    {
      async: '',
      src: `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`,
    },
  ]);
  head.push([
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`,
  ]);
}

export default defineUserConfig({
  lang: 'en-US',
  title: 'Two.js',
  description: 'A renderer agnostic two-dimensional drawing api for the web.',
  head,
  theme: defaultTheme({
    hostname: 'https://two.js.org',
    colorMode: 'light',
    colorModeSwitch: false,
    repo: 'jonobr1/two.js',
    repoLabel: 'GitHub',
    logo: '/images/logo.svg',
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
    },
    themePlugins: {
      activeHeaderLinks: false,
      prismjs: {
        lineNumbers: true,
        preloadLanguages: ['bash', 'javascript', 'jsdoc', 'markdown', 'yaml'],
      },
      sitemap: {
        excludePaths: ['/404.html'],
      },
    },
  }),
  plugins: [
    twoDocsPlugin(),
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
      getExtraFields: (page) => {
        if (page.path !== '/examples/') {
          return [];
        }

        const cards = parseExampleCards(page.content);
        return cards.flatMap((card) => [card.title, ...card.tags]);
      },
    }),
  ],
  bundler: viteBundler({
    viteOptions: {
      build: {
        cssMinify: 'esbuild',
      },
    },
  }),
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

function createSidebarLink(routePath: string, readmePath: string): SidebarLink {
  const source = fs.readFileSync(readmePath, 'utf8');
  return {
    text: getFrontmatterTitle(source) || routePath,
    link: routePath,
    children: parseMarkdownHeaders(source),
  };
}

function getReadmePath(routePath: string) {
  return path.resolve(
    projectRoot,
    'wiki',
    routePath.replace(/^\//, '').replace(/\/$/, ''),
    'README.md'
  );
}

function getFrontmatterTitle(source: string) {
  const frontmatterMatch = source.match(
    /^---\s*\n[\s\S]*?\ntitle:\s*(.+?)\n[\s\S]*?\n---/m
  );

  if (!frontmatterMatch) {
    return '';
  }

  return frontmatterMatch[1].trim().replace(/^['"]|['"]$/g, '');
}

function parseMarkdownHeaders(source: string) {
  const headers: SidebarLink[] = [];
  const content = source.replace(/^---[\s\S]*?\n---\s*\n?/, '');
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let lastLevelTwo: SidebarLink | null = null;
  let match = regex.exec(content);

  while (match) {
    const level = match[1].length;
    const text = stripMarkdown(match[2]);
    const header = {
      text,
      link: `#${slugify(text)}`,
      children: [],
    };

    if (level === 2) {
      headers.push(header);
      lastLevelTwo = header;
    } else if (lastLevelTwo) {
      lastLevelTwo.children.push(header);
    } else {
      headers.push(header);
    }

    match = regex.exec(content);
  }

  return headers;
}

function getAttribute(attributes: string, name: string) {
  const match = attributes.match(new RegExp(`${name}="([^"]*)"`, 'i'));
  return match ? match[1] : '';
}

function stripMarkdown(value: string) {
  return value
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_~]/g, '')
    .trim();
}

function slugify(value: string) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['".]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type SidebarLink = {
  text: string;
  link: string;
  children: SidebarLink[];
};
