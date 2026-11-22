import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Texture } from '../src/effects/texture.js';
import { CanvasPolyfill } from '../src/utils/canvas-polyfill.js';

test('headless texture paths remain unchanged and use the image cache', () => {
  class ImageMock {
    set src(value) {
      this._src = value;
      queueMicrotask(() => this.onload?.());
    }
    get src() {
      return this._src;
    }
  }
  CanvasPolyfill.Image = ImageMock;
  CanvasPolyfill.isHeadless = true;
  for (const path of ['./image.png', '/tmp/image.png', 'https://example.com/a.png']) {
    assert.equal(Texture.getAbsoluteURL(path), path);
  }
  const first = new Texture('./image.png');
  const second = new Texture('./image.png');
  assert.equal(first.image, second.image);
  assert.equal(first.image.src, './image.png');
});
