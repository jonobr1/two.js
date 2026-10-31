/* eslint-env es6 */
import createDOMPurify from 'dompurify';
import { root } from './root.js';
import { TwoError } from './error.js';

const namespace = 'http://www.w3.org/2000/svg';
const documents = new WeakSet();
let purifier;

// This is the drawing format understood by the interpreter, not arbitrary SVG.
const tags = [
  'svg', 'g', 'defs', 'use', 'path', 'polygon', 'polyline', 'circle',
  'ellipse', 'rect', 'line', 'linearGradient', 'radialGradient', 'stop',
  'clipPath', 'text', 'tspan', 'image', 'title', 'desc', '#text',
];
const presentation = [
  'fill', 'stroke', 'color', 'opacity', 'fill-opacity', 'stroke-opacity',
  'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
  'stroke-dasharray', 'stroke-dashoffset', 'display', 'visibility',
  'clip-path', 'font-family', 'font-size', 'font-weight', 'font-style',
  'text-decoration', 'line-height', 'text-anchor', 'dominant-baseline',
  'alignment-baseline', 'stop-color', 'stop-opacity',
];
const attributes = [
  'id', 'class', 'xmlns', 'xmlns:xlink', 'href', 'xlink:href', 'style',
  'x', 'y', 'x1', 'x2', 'y1', 'y2', 'width', 'height', 'cx', 'cy', 'r',
  'rx', 'ry', 'fx', 'fy', 'd', 'points', 'transform', 'viewBox',
  'gradientUnits', 'gradientTransform', 'spreadMethod', 'offset',
  ...presentation,
];
const fragment = /^#[\w.-]+$/;
const paintReference = /^url\(\s*['"]?(#[\w.-]+)['"]?\s*\)$/i;
const raster = /^data:image\/(?:png|jpeg|gif|webp|avif);base64,[a-z\d+/=\s]+$/i;

export function isSvgImport(node) {
  return documents.has(node.ownerDocument);
}

function drawingValue(name, value) {
  value = value.trim();
  if (name === 'clip-path') {
    return value === 'none' || paintReference.test(value);
  }
  if (/^(fill|stroke|color|stop-color)$/.test(name)) {
    if (paintReference.test(value)) {
      return name === 'fill' || name === 'stroke';
    }
    // A finite color grammar excludes CSS variables, escaped URLs and imports.
    return /^(?:none|inherit|currentColor|[a-z]+|#[a-f\d]+|(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\([-\w\s,.%+/]+\))$/i.test(value);
  }
  // Other supported presentation properties cannot introduce URL functions.
  return /^[-\w\s.,%+'"]+$/.test(value);
}

function imageURL(value, options, baseURL) {
  if (raster.test(value)) {
    return value;
  }
  if (options.allowExternalImages === true) {
    try {
      const url = new root.URL(value, baseURL);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return url.href;
      }
    } catch (_error) {
      // Invalid resource URLs are discarded, never handed to Texture.
    }
  }
  return null;
}

/**
 * Parse and sanitize into a private document. No source node enters the page.
 * DOMPurify handles markup security; the second pass restricts drawing values
 * and resources to the interpreter's smaller, non-interactive format.
 */
export function parseSvg(input, options, baseURL) {
  if (!root.DOMParser || !root.document) {
    throw new TwoError('SVG loading requires a browser DOM.');
  }
  if (input && input.nodeType === 1) {
    input = new root.XMLSerializer().serializeToString(input);
  }
  if (typeof input !== 'string') {
    throw new TwoError('Invalid SVG content.');
  }
  // Illustrator commonly emits the standard SVG 1.1 declaration. Remove this
  // exact inert declaration before parsing; custom DTDs/entities are rejected.
  input = input.replace(/<!DOCTYPE\s+svg\s+PUBLIC\s+"-\/\/W3C\/\/DTD SVG 1\.1\/\/EN"\s+"https?:\/\/www\.w3\.org\/Graphics\/SVG\/1\.1\/DTD\/svg11\.dtd"\s*>/g, '');
  if (/<!DOCTYPE/i.test(input)) throw new TwoError('SVG DTDs are not supported.');

  const parser = new root.DOMParser();
  let document = parser.parseFromString(input, 'image/svg+xml');
  let svg = document.documentElement;
  const wrapped = svg.localName !== 'svg' || svg.namespaceURI !== namespace;
  if (wrapped) {
    // Preserve SVG fragments and multiple roots without HTML error recovery.
    document = parser.parseFromString(
      '<svg xmlns="' + namespace + '" xmlns:xlink="http://www.w3.org/1999/xlink">'
      + input + '</svg>', 'image/svg+xml'
    );
    svg = document.documentElement;
  }
  if (document.getElementsByTagNameNS('*', 'parsererror').length) {
    throw new TwoError('Invalid SVG content.');
  }

  purifier = purifier || createDOMPurify(root);
  if (!purifier.isSupported) {
    throw new TwoError('SVG sanitization is unavailable.');
  }
  purifier.sanitize(svg, {
    IN_PLACE: true,
    ALLOWED_TAGS: tags,
    ALLOWED_ATTR: attributes,
    ALLOWED_NAMESPACES: [namespace],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
    KEEP_CONTENT: false,
  });

  for (const node of [svg, ...svg.querySelectorAll('*')]) {
    // Turn supported inline CSS into validated presentation attributes. Never
    // attach a stylesheet or retain arbitrary CSS in the callback document.
    for (const name of presentation) {
      const value = node.style.getPropertyValue(name);
      if (value) {
        node.setAttribute(name, value);
      }
      if (node.hasAttribute(name)
        && !drawingValue(name, node.getAttribute(name))) {
        node.removeAttribute(name);
      }
    }
    node.removeAttribute('style');

    if (node.localName === 'image') {
      const href = node.getAttribute('href') || node.getAttribute('xlink:href');
      const url = href && imageURL(href, options, baseURL);
      if (!url) {
        node.remove();
        continue;
      }
      node.setAttribute('href', url);
      node.removeAttribute('xlink:href');
    } else {
      for (const name of ['href', 'xlink:href']) {
        const value = node.getAttribute(name);
        if (value && (node.localName !== 'use' || !fragment.test(value))) {
          node.removeAttribute(name);
        }
      }
    }
  }

  // Browser defaults previously came from getComputedStyle in the live page.
  if (!svg.hasAttribute('fill')) svg.setAttribute('fill', '#000');
  if (!svg.hasAttribute('stroke')) svg.setAttribute('stroke', 'none');

  const ids = new Map();
  for (const node of [svg, ...svg.querySelectorAll('[id]')]) {
    if (node.id && !ids.has(node.id)) ids.set(node.id, node);
  }
  for (const node of [svg, ...svg.querySelectorAll('*')]) {
    for (const name of ['fill', 'stroke', 'clip-path']) {
      const match = paintReference.exec(node.getAttribute(name) || '');
      if (!match) continue;
      const target = ids.get(match[1].slice(1));
      const valid = target && (name === 'clip-path'
        ? target.localName === 'clipPath'
        : /^(linearGradient|radialGradient)$/.test(target.localName));
      if (valid) {
        node.setAttribute(name, 'url(' + match[1] + ')');
      } else {
        node.removeAttribute(name);
      }
    }
    if (node.localName === 'use') {
      const href = node.getAttribute('href') || node.getAttribute('xlink:href');
      // Missing references must not resolve against host-page IDs if the
      // sanitized callback tree is later inserted by the application.
      if (!href || !ids.has(href.slice(1))) {
        node.removeAttribute('href');
        node.removeAttribute('xlink:href');
      }
    }
  }

  // Import only the sanitized tree, excluding processing instructions and
  // document-level nodes. Each call owns its callback nodes and definitions.
  const isolated = root.document.implementation.createDocument(namespace, null);
  const result = isolated.importNode(svg, true);
  documents.add(isolated);
  return { svg: result, wrapped };
}

export function getSvgImportStyles(node, parentStyles) {
  const styles = {};
  for (const name of presentation) {
    // These apply to the group itself, rather than inheriting to each child.
    if (/^(display|opacity|clip-path)$/.test(name)) continue;
    if (node.hasAttribute(name)) {
      styles[name] = node.getAttribute(name);
    } else if (parentStyles && name in parentStyles) {
      styles[name] = parentStyles[name];
    }
  }
  return styles;
}
