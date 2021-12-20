const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const gzip = require('gzip-size');

const publishDateString = (new Date()).toISOString();
const config = getJSON(path.resolve(__dirname, '../package.json'));
const paths = {
  entry: path.resolve(__dirname, '../src/two.js'),
  umd: path.resolve(__dirname, '../build/two.js'),
  esm: path.resolve(__dirname, '../build/two.module.js'),
  min: path.resolve(__dirname, '../build/two.min.js'),
  license: path.resolve(__dirname, '../LICENSE')
};

async function buildModules() {

  esbuild.buildSync({
    entryPoints: [paths.entry],
    outfile: paths.umd,
    bundle: true,
    format: 'iife',
    globalName: 'Two'
  });

  esbuild.buildSync({
    entryPoints: [paths.entry],
    outfile: paths.esm,
    bundle: true,
    target: 'es6',
    format: 'esm'
  });

  esbuild.buildSync({
    entryPoints: [paths.entry],
    outfile: paths.min,
    bundle: true,
    minify: true,
    format: 'iife',
    globalName: 'Two'
  });

  const license = await fs.promises.readFile(paths.license, { encoding: 'utf-8' });
  const licenseComment = ['/*', license.trim(), '*/'].join('\n');

  const umdOutput = await fs.promises.readFile(paths.umd);
  const esmOutput = await fs.promises.readFile(paths.esm);
  const minOutput = await fs.promises.readFile(paths.min);

  return Promise.all([
    fs.promises.writeFile(paths.umd, [licenseComment, template(umdOutput, true)].join('\n')),
    fs.promises.writeFile(paths.esm, [licenseComment, template(esmOutput, false)].join('\n')),
    fs.promises.writeFile(paths.min, [licenseComment, template(minOutput, true)].join('\n'))
  ]);

}

function template(buffer, isExposed) {
  const code = buffer.toString();
  const generate = _.template(code);
  let result = generate({
    version: config.version,
    publishDate: publishDateString
  });
  if (isExposed) {
    result = result.replace(/\}\)\(\)\;/, '})().default;');
  }
  return result;
}

function publishModule() {

  let size;
  const result = {};

  size = getFileSize(path.resolve(__dirname, '../build/two.js'));
  result.development = formatFileSize(size);

  size = getFileSize(path.resolve(__dirname, '../build/two.min.js'));
  result.production = formatFileSize(size);

  const contents = JSON.stringify(result);
  const outputPath = path.resolve(__dirname, './file-sizes.json');

  return fs.promises.writeFile(outputPath, contents);

}

function getFileSize(filepath) {
  const file = fs.readFileSync(filepath);
  return gzip.sync(file);
}

function formatFileSize(v) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  let iterations = 0;
  while (v > 1000) {
    v *= 0.001;
    iterations++;
  }
  return [Math.round(v), sizes[iterations]].join('');
}

async function build() {

  let startTime, elapsed;

  startTime = Date.now();
  buildModules();
  elapsed = Date.now() - startTime;
  console.log('Built and minified Two.js:', elapsed / 1000, 'seconds');

  elapsed = Date.now() - startTime;
  await publishModule();
  console.log('Published additional statistics to wiki:', elapsed / 1000, 'seconds');

}

function getJSON(filepath) {
  const buffer = fs.readFileSync(filepath);
  return JSON.parse(buffer);
}

build();
