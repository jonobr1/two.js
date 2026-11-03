# SVG loading and untrusted input

`two.load(source, callback, options)` parses SVG into a private document, sanitizes it with DOMPurify, and reconstructs supported Two.js objects. Source markup never enters the page. The returned group is available immediately; URL loading populates it asynchronously. Add the group to the scene when ready.

```js
two.load('/artwork.svg?version=2', function (group, svg) {
  two.add(group);
  two.update();
}, {
  onError: function (error) {
    console.error('Could not import drawing:', error);
  }
});
```

## Drawing format

The importer accepts SVG documents, SVG fragments, multiple top-level SVG elements, or an SVG DOM element. DOM elements are serialized into a new document; the source is not modified. Markup must be well-formed XML. Fragments receive an SVG namespace wrapper. The standard SVG 1.1 public doctype emitted by Illustrator is removed before parsing; custom DTDs and entities are rejected.

Supported content includes groups, paths, polygons, polylines, circles, ellipses, rectangles, lines, text and text spans, linear and radial gradients, gradient stops, clipping paths, images, definitions, and local `<use>` references. Unsupported elements and their contents are removed. Local paint and clipping references must target a supported definition in the imported document. Recursive references fail the import.

Supported inline presentation styles are converted into validated SVG attributes. These include colors, stroke properties, opacity, visibility, display, text properties, and gradient stop properties. SVG `transform`, `gradientTransform`, and `viewBox` attributes remain supported. CSS variables, CSS transforms, stylesheets, animation, filters, patterns, embedded HTML, event attributes, scripts, and external references are outside this drawing format. Styles from the host page are not used to interpret the drawing.

## Images and network requests

By default, only base64 PNG, JPEG, GIF, WebP, and AVIF image data URLs are retained. External images and SVG data URLs are removed. Blob URLs are not supported by this import policy.

Set `{ allowExternalImages: true }` to permit HTTP and HTTPS images, including relative URLs. For fetched SVGs, image URLs resolve relative to the final SVG response URL, including redirects. For inline SVGs, they resolve relative to the page's base URL. This option permits requests to the image origins supplied by the drawing; use it only when those requests are appropriate for your application. Browser CORS restrictions still apply.

SVG source URLs must use HTTP or HTTPS; relative URLs, query strings, fragments, and URLs without a `.svg` suffix are supported. The requested SVG is necessarily fetched even with external images disabled. Successful HTTP responses are parsed and validated as markup; an SVG-specific response MIME type is not required.

## Callbacks and failures

The success callback receives `(group, svg)`. For a single root, `svg` is the sanitized element. For multiple roots it is a stable array of sanitized elements. Empty fragments supply `undefined`. These nodes are detached, belong to a private document, and remain valid across subsequent or reentrant loads. They contain the restricted drawing format, rather than the original source. Changing them after loading does not update the reconstructed scene.

Malformed XML, unsupported source URL protocols, custom DTDs, and circular references fail without adding partial content to the scene. HTTP, network, timeout, and abort failures also call `options.onError(error)` when provided. Inline failures throw when no error callback is provided. Asynchronous failures emit an `error` event on the Two instance when no error callback is provided:

```js
two.bind('error', function (error) {
  console.error(error);
});
```

## Migrating existing integrations

- Move stylesheet-based SVG styling into supported inline presentation styles or attributes. Host styles no longer determine imported values.
- Enable `allowExternalImages` explicitly for drawings that need HTTP(S) images. Prefer embedded raster images when no external requests are intended.
- Consume sanitized callback nodes without relying on a live `HTMLCollection` or an element attached to `document.head`. DOMPurify may remove IDs that collide with DOM properties.
- Correct malformed SVG that previously relied on HTML parser error recovery. Use the documented XML drawing subset for untrusted input.
- Use `two.interpret(svg)` for an existing **trusted** SVG DOM when computed styles from the page are required. This API and programmatic renderer utilities do not sanitize their arguments. They cannot undo scripts, requests, or styling effects caused when an application previously inserted untrusted markup into the page.

The import policy addresses the loading path reported in [issue #797](https://github.com/jonobr1/two.js/issues/797). It does not establish every severity claim in that report. Renderer attribute-setting helpers still accept programmatically supplied attributes; the loader restricts imported attributes before interpretation. Browser XHR remains subject to browser security rules and is not a server-side fetcher.

## Regression tests

```sh
npm ci
npx playwright install --with-deps chromium firefox webkit
npm run test:browser
```

The browser suite includes an executable control for the previous live-DOM injection behavior, inline and fetched hostile SVGs across SVG/Canvas/WebGL renderers, pixel checks, supported drawing features, image policy, failure recovery, callback isolation, and the existing QUnit SVG interpreter tests. All fixtures and test dependencies are served locally. GitHub Actions runs the same suite in Chromium, Firefox, and WebKit.
