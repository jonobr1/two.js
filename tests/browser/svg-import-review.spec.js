/* eslint-env node, es6 */
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/tests/browser/import.html');
});

test('blank fragments synchronously return empty groups without making requests', async ({ page }) => {
  const requests = [];
  page.on('request', (request) => requests.push(request.url()));
  const results = await page.evaluate(() => {
    const two = new Two();
    return ['', ' ', '\t\n\r', '\uFEFF  '].map((input) => {
      let calls = 0;
      let callbackGroup;
      let source;
      const group = two.load(input, (loaded, svg) => {
        calls++;
        callbackGroup = loaded;
        source = svg;
      });
      return { calls, sameGroup: callbackGroup === group,
        children: group.children.length, emptySource: source === undefined };
    });
  });
  expect(results).toEqual(Array(4).fill({ calls: 1, sameGroup: true, children: 0, emptySource: true }));
  expect(requests).toEqual([]);
});

for (const renderer of ['svg', 'canvas', 'webgl']) {
  test(`${renderer}: text and delegated shape readers preserve presentation styles`, async ({ page }) => {
    const result = await page.evaluate((renderer) => {
      const two = new Two({ type: Two.Types[renderer], width: 100, height: 100 });
      const group = two.load('<svg xmlns="http://www.w3.org/2000/svg">'
        + '<text id="attribute-text" font-style="italic">Attribute</text>'
        + '<text id="inline-text" style="font-style:italic">Inline</text>'
        + '<g fill="red" font-style="italic" visibility="hidden"><svg>'
        + '<g><rect id="nested-shape" width="10" height="10"/></g>'
        + '<text id="inherited-text">Inherited</text></svg></g>'
        + '<g fill="red" stroke="blue" stroke-width="2"><rect id="rounded-shape" rx="2" width="10" height="10"/></g>'
        + '</svg>');
      two.add(group).update();
      const rounded = group.getById('rounded-shape');
      return {
        text: ['attribute-text', 'inline-text', 'inherited-text'].map((id) => group.getById(id).style),
        nested: [group.getById('nested-shape').fill, group.getById('nested-shape').visible],
        rounded: [rounded.fill, rounded.stroke, rounded.linewidth],
      };
    }, renderer);
    expect(result).toEqual({ text: ['italic', 'italic', 'italic'], nested: ['red', false], rounded: ['red', 'blue', 2] });
  });

  test(`${renderer}: imported color keywords and opacity paint the intended pixels`, async ({ page }) => {
    const pixels = await page.evaluate(async (renderer) => {
      const cases = [
        '<svg color="red"><rect width="40" height="40" fill="currentColor"/></svg>',
        '<svg fill="red"><rect width="40" height="40" fill="inherit"/></svg>',
        '<svg color="red" fill="currentColor"><g color="blue"><rect width="40" height="40"/></g></svg>',
        '<svg color="red"><g color="inherit"><svg><rect width="40" height="40" fill="currentColor"/></svg></g></svg>',
        '<svg><rect width="40" height="40" fill="inherit"/></svg>',
        '<svg><g fill-opacity="0.5"><rect width="40" height="40" fill="red"/></g></svg>',
        '<svg><g fill-opacity="0.5"><g><rect width="40" height="40" fill="red"/></g></g></svg>',
        '<svg><g fill-opacity="0.5"><rect width="40" height="40" fill="red" fill-opacity="1"/></g></svg>',
        '<svg><g opacity="0.5" fill-opacity="0.5"><rect width="40" height="40" fill="red"/></g></svg>',
        '<svg><g stroke-opacity="0.5"><g><line x1="0" y1="20" x2="40" y2="20" stroke="red" stroke-width="10"/></g></g></svg>',
        '<svg color="red"><defs><linearGradient id="keyword-paint" x1="0" x2="1" stop-color="currentColor"><stop offset="0" stop-color="currentColor"/><stop offset="1" stop-color="inherit"/></linearGradient></defs><rect width="40" height="40" fill="url(#keyword-paint)"/></svg>',
        '<svg><defs><rect id="keyword-template" width="40" height="40" fill="currentColor"/></defs><use href="#keyword-template" color="red"/></svg>',
      ];
      const results = [];
      for (const markup of cases) {
        const two = new Two({ type: Two.Types[renderer], width: 40, height: 40, ratio: 1 });
        two.add(two.load(markup));
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
        results.push(Array.from(context.getImageData(20, 20, 1, 1).data));
        two.dispose();
      }
      return results;
    }, renderer);
    const colors = [[255, 0, 0], [255, 0, 0], [0, 0, 255], [255, 0, 0], [0, 0, 0],
      [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0], [255, 0, 0]];
    const alphas = [255, 255, 255, 255, 255, 128, 128, 255, 64, 128, 255, 255];
    pixels.forEach((pixel, index) => {
      // GPU gradient sampling can round an 8-bit color channel by one level.
      colors[index].forEach((channel, i) => {
        expect(Math.abs(pixel[i] - channel), `color for case ${index}`).toBeLessThanOrEqual(1);
      });
      expect(Math.abs(pixel[3] - alphas[index]), `alpha for case ${index}`).toBeLessThanOrEqual(1);
    });
  });
}

test('manual matrices preserve normalized shape bounds under translation, scale and nesting', async ({ page }) => {
  const bounds = await page.evaluate(() => {
    Two.AutoCalculateImportedMatrices = false;
    const two = new Two();
    const shapes = [
      '<rect x="4" y="6" width="10" height="8"',
      '<rect x="4" y="6" width="10" height="8" rx="2"',
      '<path d="M4 6H14V14H4Z"',
      '<circle cx="9" cy="10" r="4"',
      '<ellipse cx="9" cy="10" rx="5" ry="4"',
    ];
    const bounds = shapes.map((shape) => {
      const group = two.load('<g transform="translate(7 9)">' + shape
        + ' id="geometry" stroke="none" stroke-width="0" transform="translate(10 20) scale(2 3)"/></g>');
      two.add(group);
      const rect = group.getById('geometry').getBoundingClientRect();
      return [rect.left, rect.top, rect.width, rect.height];
    });
    const skewed = two.load('<g transform="translate(7 9)"><rect id="skewed" x="4" y="6" width="10" height="8" stroke-width="0" transform="matrix(2 1 0.5 3 10 20)"/></g>');
    two.add(skewed);
    const rect = skewed.getById('skewed').getBoundingClientRect();
    bounds.push([rect.left, rect.top, rect.width, rect.height]);
    return bounds;
  });
  const expected = [[25, 47, 20, 24], [25, 47, 20, 24], [25, 47, 20, 24], [27, 47, 16, 24], [25, 47, 20, 24], [28, 51, 24, 34]];
  bounds.forEach((rect, i) => rect.forEach((value, j) => expect(value).toBeCloseTo(expected[i][j], 4)));
});
