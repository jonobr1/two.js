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

QUnit.test('legacy pages preserve texture query encoding', async function (assert) {
  const frame = document.createElement('iframe');
  frame.hidden = true;

  // Specify the document encoding independently of the test server's headers.
  const html = `<!doctype html>
    <base href="${new URL('../', import.meta.url)}">
    <script type="module">
      import { Texture } from '../src/effects/texture.js';

      const relative = './images/spritesheet.jpg?label=caf\\u00e9';
      const anchor = document.createElement('a');
      anchor.href = relative;
      const first = new Texture(relative);
      const second = new Texture(anchor.href);
      window.textureResult = {
        query: new URL(first.src).search,
        sharedImage: first.image === second.image,
      };
    </script>`;
  const fixture = URL.createObjectURL(
    new Blob([html], { type: 'text/html;charset=windows-1252' })
  );

  try {
    await new window.Promise(function (resolve) {
      frame.onload = resolve;
      frame.src = fixture;
      document.getElementById('qunit-fixture').appendChild(frame);
    });

    const result = frame.contentWindow.textureResult;
    assert.strictEqual(frame.contentDocument.characterSet, 'windows-1252');
    assert.strictEqual(result.query, '?label=caf%E9');
    assert.strictEqual(
      result.sharedImage,
      true,
      'The image registry uses one cache key.'
    );
  } finally {
    frame.remove();
    URL.revokeObjectURL(fixture);
  }
});
