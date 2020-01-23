const rollup = require('rollup');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const terser = require('rollup-plugin-terser').terser;

const publishDateString = (new Date()).toISOString();

const inputOptions = {input: 'src/two.js'};
const outputOptions = {name: 'Two'};

async function generateOutput(bundle, additionalOptions) {
  const output = (await bundle.generate(Object.assign({}, outputOptions, additionalOptions))).output;
  let code = output[0].code;

  const template = _.template(code);
  return template({
    publishDate: publishDateString
  });
}

async function build() {
  const bundle = await(rollup.rollup(inputOptions));

  const license = fs.readFileSync(path.resolve(__dirname, '../LICENSE'), {encoding: 'utf-8'});
  const licenseComment = '/*\n' + license.trim() + '\n*/\n';

  const umdOutput = await generateOutput(bundle, {format: 'umd'});
  const esmOutput = await generateOutput(bundle, {format: 'esm'});
  const minifiedOutput = await generateOutput(bundle, {format: 'umd', plugins: [terser()]});

  fs.writeFileSync('build/two.js', licenseComment + umdOutput);
  fs.writeFileSync('build/two.module.js', licenseComment + esmOutput);
  fs.writeFileSync('build/two.min.js', licenseComment + minifiedOutput);
}

build();