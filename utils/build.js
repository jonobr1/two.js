const rollup = require('rollup');
const fs = require('fs').promises;
const path = require('path');
const _ = require('underscore');
const terser = require('rollup-plugin-terser').terser;

const publishDateString = (new Date()).toISOString();

const outputOptions = {name: 'Two'};

async function generateOutput(bundle, outputName, outputOptions) {
  const output = (await bundle.generate(Object.assign({name: outputName}, outputOptions))).output;
  let code = output[0].code;

  const template = _.template(code);
  return template({
    publishDate: publishDateString
  });
}

async function buildModule(inputPath, name, outputDirectory, inputOptions, outputOptions) {
  const bundle = await rollup.rollup(Object.assign({input: inputPath}, inputOptions));

  const license = await fs.readFile(path.resolve(__dirname, '../LICENSE'), {encoding: 'utf-8'});
  const licenseComment = '/*\n' + license.trim() + '\n*/\n';

  const umdOutput = await generateOutput(bundle, name, Object.assign({format: 'umd'}, outputOptions));
  const esmOutput = await generateOutput(bundle, name, Object.assign({format: 'esm'}, outputOptions));
  const minifiedOutput = await generateOutput(bundle, name, Object.assign({format: 'umd', plugins: [terser()]}, outputOptions));

  const moduleName = path.parse(inputPath).name;
  await fs.mkdir(outputDirectory, {recursive: true});

  await Promise.all([
    fs.writeFile(path.join(outputDirectory, moduleName + '.js'), licenseComment + umdOutput),
    fs.writeFile(path.join(outputDirectory, moduleName + '.module.js'), licenseComment + esmOutput),
    fs.writeFile(path.join(outputDirectory, moduleName + '.min.js'), licenseComment + minifiedOutput)
  ]);
}

async function build() {
  await buildModule('src/two.js', 'Two', 'build/');

  await buildModule('extras/zui.js', 'ZUI', 'build/extras/', {
    external: ['two.js']
  }, {
    globals: {
      'two.js': 'Two'
    }
  });
}

build();