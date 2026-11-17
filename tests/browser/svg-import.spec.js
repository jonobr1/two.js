/* eslint-env node, es6 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const hostile = fs.readFileSync(path.join(__dirname, 'fixtures/hostile.svg'), 'utf8');
const drawing = fs.readFileSync(path.join(__dirname, 'fixtures/drawing.svg'), 'utf8');

test.beforeEach(async ({ page }) => {
  await page.goto('/tests/browser/import.html');
});

test('positive control detects the previous live-DOM injection behavior', async ({ page }) => {
  const request = page.waitForRequest('**/forbidden-control');
  await page.evaluate(() => {
    const container = document.createElement('div');
    document.head.appendChild(container);
    container.innerHTML = '<style>#host-marker{display:none}</style>'
      + '<img src="/forbidden-control" onerror="window.svgExecuted=true">';
  });
  await request;
  await expect.poll(() => page.evaluate(() => window.svgExecuted)).toBe(true);
  await expect(page.locator('#host-marker')).toBeHidden();
});

for (const renderer of ['svg', 'canvas', 'webgl']) {
  for (const source of ['inline', 'url']) {
    test(`${renderer}: ${source} import cannot execute, mutate the host or fetch resources`, async ({ page }) => {
      const requests = [];
      const errors = [];
      page.on('request', (request) => requests.push(new URL(request.url()).pathname));
      page.on('pageerror', (error) => errors.push(error.message));
      const result = await page.evaluate(({ renderer, source, hostile }) => new Promise((resolve, reject) => {
        const two = new Two({ type: Two.Types[renderer], width: 100, height: 100 });
        document.body.appendChild(two.renderer.domElement);
        two.load(source === 'inline' ? hostile : '/tests/browser/fixtures/hostile.svg?test=1#svg', (group, svg) => {
          two.add(group).update();
          const detached = !svg.isConnected && svg.ownerDocument !== document;
          const active = svg.querySelectorAll('script, style, foreignObject, image, [style], [onload], [onmouseover]').length;
          const safe = group.getById('safe');
          // Exercise the public callback boundary as well as renderer output.
          document.body.appendChild(svg);
          resolve({ detached, active, fill: safe.fill, text: svg.querySelector('text').textContent });
        }, { onError: (error) => reject(error.message) });
      }), { renderer, source, hostile });
      expect(result).toEqual({
        detached: true, active: 0, fill: 'rgb(0, 128, 0)',
        text: '<img src=x onerror=alert(1)>',
      });
      // Give load/error events and stylesheet/resource side effects a turn.
      await page.waitForTimeout(100);
      expect(await page.evaluate(() => !!window.svgExecuted)).toBe(false);
      await expect(page.locator('#host-marker')).toBeVisible();
      expect(requests).toEqual(source === 'url' ? ['/tests/browser/fixtures/hostile.svg'] : []);
      expect(errors).toEqual([]);
    });
  }

  test(`${renderer}: drawings retain geometry, inheritance, paint, references and text`, async ({ page }) => {
    const result = await page.evaluate(({ renderer, drawing }) => {
      const two = new Two({ type: Two.Types[renderer], width: 100, height: 100 });
      const group = two.load(drawing);
      two.add(group).update();
      const find = (id) => group.getById(id);
      const translated = find('translated');
      return {
        transform: [translated.translation.x, translated.translation.y, translated.scale.x || translated.scale],
        gradient: find('gradient').fill instanceof Two.LinearGradient,
        stop: find('gradient').fill.stops[0].opacity,
        radial: find('radial-shape').fill instanceof Two.RadialGradient,
        clipped: !!find('clipped').mask,
        hidden: find('hidden-shape').visible,
        shown: find('shown').visible,
        inheritedFill: find('hidden-shape').fill,
        label: [find('label').value, find('label').size],
        use: [find('template').width, find('template').translation.x, find('template').translation.y],
        viewBox: !!group.children[0].mask,
      };
    }, { renderer, drawing });
    expect(result).toEqual({
      transform: [10, 20, 2], gradient: true, stop: 0.5, radial: true,
      clipped: true, hidden: false, shown: true, inheritedFill: 'purple',
      label: ['Hello <svg>', 12], use: [8, 34, 43], viewBox: true,
    });
  });

  test(`${renderer}: imported output paints the expected color`, async ({ page }) => {
    const pixels = await page.evaluate(async (renderer) => {
      const two = new Two({ type: Two.Types[renderer], width: 40, height: 40, ratio: 1 });
      two.add(two.load('<svg xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="40" height="40" fill="rgb(255,0,0)"/></svg>'));
      two.update();
      let image = two.renderer.domElement;
      if (renderer === 'svg') {
        const svg = new XMLSerializer().serializeToString(image);
        image = new Image();
        image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        await image.decode();
      }
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 40;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, 40, 40);
      return Array.from(context.getImageData(20, 20, 1, 1).data);
    }, renderer);
    expect(pixels).toEqual([255, 0, 0, 255]);
  });
}

test('fragments, DOM input, repeated and reentrant callbacks own stable detached nodes', async ({ page }) => {
  const result = await page.evaluate(() => {
    const two = new Two();
    let first;
    let second;
    let multiple;
    const outer = two.load('<rect id="first" width="10" height="10"/>', (group, svg) => {
      first = svg;
      two.load('<circle id="second" r="5"/>', (group, svg) => { second = svg; });
    });
    const fragments = two.load('<rect width="1" height="1"/><circle r="1"/>', (group, svg) => { multiple = svg; });
    two.load('<path d="M0 0L1 1"/>');
    const input = new DOMParser().parseFromString('<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" onclick="alert(1)"/></svg>', 'image/svg+xml').documentElement;
    let dom;
    two.load(input, (group, svg) => { dom = svg; });
    return {
      ids: [first.id, second.id],
      counts: [outer.children.length, fragments.children.length, multiple.length],
      detached: !first.isConnected && !second.isConnected && !dom.isConnected,
      separate: first.ownerDocument !== second.ownerDocument,
      sanitized: !dom.querySelector('[onclick]'),
      unchanged: input.querySelector('rect').hasAttribute('onclick'),
      scene: two.scene.children.length,
      temp: !!document.getElementById('help-two-load'),
    };
  });
  expect(result).toEqual({ ids: ['first', 'second'], counts: [1, 2, 2], detached: true,
    separate: true, sanitized: true, unchanged: true, scene: 0, temp: false });
});

test('invalid input and recursive references fail atomically and definitions recover', async ({ page }) => {
  const result = await page.evaluate(() => {
    const two = new Two();
    const inputs = [
      '<svg><rect></svg>',
      '<!DOCTYPE svg [<!ENTITY x "test">]><svg xmlns="http://www.w3.org/2000/svg"/>',
      '<svg xmlns="http://www.w3.org/2000/svg"><defs><g id="loop"><use href="#loop"/></g></defs><use href="#loop"/></svg>',
      'javascript:alert(1)',
      'data:image/svg+xml,<svg/>',
    ];
    const failures = inputs.map((input) => {
      let failed = false;
      const group = two.load(input, () => { throw new Error('Success must not be called'); }, { onError: () => { failed = true; } });
      return failed && group.children.length === 0;
    });
    let thrown = false;
    try { two.load('<svg><rect></svg>'); } catch (_error) { thrown = true; }
    const valid = two.load('<svg xmlns="http://www.w3.org/2000/svg"><defs><rect id="ok" width="1" height="1"/></defs><use href="#ok"/></svg>');
    const unknown = two.load('<svg xmlns="http://www.w3.org/2000/svg"><use href="#__proto__"/><use href="#constructor"/></svg>');
    return { failures, thrown, valid: !!valid.getById('ok'), unknown: unknown.children[0].children.length, scene: two.scene.children.length };
  });
  expect(result).toEqual({ failures: [true, true, true, true, true], thrown: true, valid: true, unknown: 0, scene: 0 });
});

test('HTTP and network errors have one failure callback and no success callback', async ({ page }) => {
  await page.route('**/network.svg', (route) => route.abort());
  await page.route('**/bad.svg', (route) => route.fulfill({ body: '<svg><rect></svg>' }));
  const result = await page.evaluate(async () => {
    const two = new Two();
    const failures = await Promise.all(['/missing.svg', '/network.svg', '/bad.svg'].map((url) => new Promise((resolve, reject) => {
      const group = two.load(url, () => reject('Unexpected success'), { onError: (error) => resolve({ empty: group.children.length === 0, message: !!error.message }) });
    })));
    const event = await new Promise((resolve) => {
      two.bind('error', (error) => resolve(!!error.message));
      two.load('/missing.svg');
    });
    return { failures, event };
  });
  expect(result).toEqual({ failures: Array(3).fill({ empty: true, message: true }), event: true });
});

test('external image policy is opt-in and relative to the SVG response URL', async ({ page }) => {
  const requests = [];
  page.on('request', (request) => requests.push(new URL(request.url()).pathname));
  await page.route('**/assets/picture.png', (route) => route.fulfill({ contentType: 'image/png', body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jWZkAAAAASUVORK5CYII=', 'base64') }));
  await page.route('**/assets/drawing.svg', (route) => route.fulfill({ body: '<svg xmlns="http://www.w3.org/2000/svg"><defs><image id="picture" href="picture.png" width="1" height="1"/></defs><use href="#picture"/></svg>' }));
  const result = await page.evaluate(async () => {
    const two = new Two();
    const load = (options) => new Promise((resolve, reject) => two.load('/assets/drawing.svg', (group, svg) => resolve({ group, svg }), { ...options, onError: reject }));
    const blocked = await load({});
    const allowed = await load({ allowExternalImages: true });
    return { blocked: blocked.svg.querySelectorAll('image').length, src: allowed.group.getById('picture').texture.src };
  });
  expect(result.blocked).toBe(0);
  expect(result.src).toBe('http://127.0.0.1:8081/assets/picture.png');
  await expect.poll(() => requests.filter((url) => url === '/assets/picture.png').length).toBe(1);
});

test('embedded raster images survive while active and non-HTTP image URLs are rejected', async ({ page }) => {
  const requests = [];
  page.on('request', (request) => {
    if (/^https?:/.test(request.url())) requests.push(request.url());
  });
  const result = await page.evaluate(() => {
    const two = new Two();
    const pixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jWZkAAAAASUVORK5CYII=';
    const urls = [pixel, 'JaVaScRiPt:alert(1)', 'java&#x09;script:alert(1)',
      'data:image/svg+xml;base64,PHN2Zy8+', 'blob:https://example.invalid/x',
      'file:///tmp/pixel.png', 'ftp://example.invalid/pixel.png'];
    let callback;
    two.load('<svg xmlns="http://www.w3.org/2000/svg">' + urls.map((href) =>
      '<image width="1" height="1" href="' + href + '"/>').join('') + '</svg>',
    (group, svg) => { callback = svg; }, { allowExternalImages: true });
    return Array.from(callback.querySelectorAll('image')).map((image) => image.getAttribute('href'));
  });
  expect(result).toHaveLength(1);
  expect(result[0]).toMatch(/^data:image\/png;base64,/);
  expect(requests).toEqual([]);
});

test('local references cannot resolve against host-page IDs or prior imports', async ({ page }) => {
  const result = await page.evaluate(() => {
    const two = new Two();
    two.makeLinearGradient(0, 0, 10, 10).id = 'host-paint';
    document.body.insertAdjacentHTML('beforeend', '<svg><defs><linearGradient id="host-gradient"/></defs><rect id="host-shape"/></svg>');
    let source;
    const group = two.load('<svg xmlns="http://www.w3.org/2000/svg"><rect id="local-rect" width="10" height="10" fill="url(#host-paint)" stroke="url(#host-gradient)"/><use href="#host-shape"/></svg>',
      (group, svg) => { source = svg; });
    return { fill: group.getById('local-rect').fill,
      sourceFill: source.querySelector('rect').getAttribute('fill'),
      sourceStroke: source.querySelector('rect').getAttribute('stroke'),
      href: source.querySelector('use').getAttribute('href'),
      children: group.children[0].children.length };
  });
  expect(result).toEqual({ fill: '#000', sourceFill: null, sourceStroke: null, href: null, children: 1 });
});

test('manual imported matrices preserve complete local transforms', async ({ page }) => {
  const result = await page.evaluate(() => {
    Two.AutoCalculateImportedMatrices = false;
    const two = new Two();
    const group = two.load('<g transform="translate(10 20) scale(2 3)"><rect width="10" height="10"/></g>');
    const shape = group.children[0];
    return { manual: shape.matrix.manual, elements: Array.from(shape.matrix.elements) };
  });
  expect(result).toEqual({ manual: true, elements: [2, 0, 10, 0, 3, 20, 0, 0, 1] });
});

test('existing trusted-DOM interpreter and DOM helper regressions', async ({ page }) => {
  await page.goto('/tests/browser/interpreter.html');
  await page.waitForFunction(() => window.testResult, null, { timeout: 30000 });
  const result = await page.evaluate(() => window.testResult);
  expect(result.failures).toEqual([]);
  expect(result.counts.failed).toBe(0);
  expect(result.counts.passed).toBeGreaterThan(0);
});
