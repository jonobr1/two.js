import { Texture } from '../../src/effects/texture.js';

QUnit.module('Texture URL');

QUnit.test('browser URLs match anchor resolution', function (assert) {
  [
    './images/spritesheet.jpg',
    '/images/spritesheet.jpg',
    'https://example.com/image.png?size=2#top',
    'data:image/png;base64,AA==',
    'http://[bad',
  ].forEach(function (path) {
    var anchor = document.createElement('a');
    anchor.href = path;
    assert.strictEqual(Texture.getAbsoluteURL(path), anchor.href, path);
  });
});

QUnit.test('equivalent texture URLs use the same image', function (assert) {
  var relative = './images/spritesheet.jpg';
  var absolute = new URL(relative, document.baseURI).href;
  var first = new Texture(relative);
  var second = new Texture(absolute);
  assert.strictEqual(first.image, second.image, 'The image registry uses one cache key.');
});
