var rollup = require('rollup');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var terser = require('rollup-plugin-terser').terser;

var publishDateString = (new Date()).toISOString();

var outputOptions = { name: 'Two' };

async function generateOutput(bundle, outputName, outputOptions) {

  var base = { name: outputName };
  var result = await bundle.generate(Object.assign(base, outputOptions));
  var output = result.output;
  let code = output[0].code;

  var template = _.template(code);
  return template({
    publishDate: publishDateString
  });

}

async function buildModule(inputPath, name, outputDirectory, inputOptions, outputOptions) {

  var format;
  var encodingType = { encoding: 'utf-8' };
  var bundle = await rollup
    .rollup(Object.assign({ input: inputPath }, inputOptions));

  var license = await fs.promises.readFile(path.resolve(__dirname, '../LICENSE'), encodingType);
  var licenseComment = ['/*', license.trim(), '*/'].join('\n');

  format = { format: 'umd' };
  var umdOutput = await generateOutput(bundle, name, Object.assign(format, outputOptions));

  format.plugins = [terser()];
  var minifiedOutput = await generateOutput(bundle, name, Object.assign(format, outputOptions));

  format = { format: 'esm' }
  var esmOutput = await generateOutput(bundle, name, Object.assign(format, outputOptions));

  var moduleName = path.parse(inputPath).name;
  fs.promises.mkdir(outputDirectory, { recursive: true });

  return Promise.all([
    fs.promises.writeFile(path.join(outputDirectory, moduleName + '.js'), [licenseComment, umdOutput].join('\n')),
    fs.promises.writeFile(path.join(outputDirectory, moduleName + '.module.js'), [licenseComment, esmOutput].join('\n')),
    fs.promises.writeFile(path.join(outputDirectory, moduleName + '.min.js'), [licenseComment, minifiedOutput].join('\n'))
  ]);

}

function publishModule() {

  var stats, result = {};

  stats = fs.statSync(path.resolve(__dirname, '../build/two.js'));
  result.development = formatFileSize(stats.size);

  stats = fs.statSync(path.resolve(__dirname, '../build/two.min.js'));
  result.production = formatFileSize(stats.size);

  var contents = JSON.stringify(result);
  var outputPath = path.resolve(__dirname, './file-sizes.json');

  return fs.promises.writeFile(outputPath, contents);

}

function formatFileSize(v) {
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  var iterations = 0;
  while (v > 1000) {
    v *= 0.001;
    iterations++;
  }
  return [Math.round(v), sizes[iterations]].join('');
}

async function build() {

  var startTime, elasped;

  startTime = Date.now();
  await buildModule('src/two.js', 'Two', 'build/');
  elapsed = Date.now() - startTime;
  console.log('Built and minified Two.js:', elapsed / 1000, 'seconds');

  elapsed = Date.now() - startTime;
  await publishModule();
  console.log('Published additional statistics to wiki:', elapsed / 1000, 'seconds');

}

build();
