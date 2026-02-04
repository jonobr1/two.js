// eslint-disable-next-line no-redeclare
/* global DOMParser, XMLSerializer */

/**
 * @name Two.Utils.SVGSecurity
 * @module SVGSecurity
 * @description Security utilities for sanitizing SVG content to prevent XSS attacks.
 * Provides three security modes: strict (full sanitization), permissive (attribute validation),
 * and unsafe (no sanitization - for trusted content only).
 */

// Dangerous SVG elements that can execute scripts or load external content
const DANGEROUS_ELEMENTS = [
  'script',
  'object',
  'embed',
  'iframe',
  'foreignObject',
  'use',
  'a',
  'animate',
  'animateMotion',
  'animateTransform',
  'set',
];

// Whitelist of safe SVG attributes (used in strict mode)
const SAFE_SVG_ATTRIBUTES = [
  // Geometry attributes
  'x',
  'y',
  'width',
  'height',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'd',
  'points',
  'x1',
  'y1',
  'x2',
  'y2',

  // Presentation attributes
  'fill',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-miterlimit',
  'opacity',
  'fill-opacity',
  'stroke-opacity',
  'transform',
  'transform-origin',

  // Text attributes
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'text-anchor',
  'dominant-baseline',
  'text-decoration',
  'alignment-baseline',
  'baseline-shift',

  // Filter and effect attributes
  'filter',
  'mask',
  'clip-path',
  'clip-rule',

  // Gradient attributes
  'offset',
  'stop-color',
  'stop-opacity',
  'gradientUnits',
  'gradientTransform',
  'spreadMethod',

  // Pattern attributes
  'patternUnits',
  'patternTransform',
  'patternContentUnits',

  // General attributes
  'id',
  'class',
  'style',
  'viewBox',
  'preserveAspectRatio',
  'visibility',
  'display',
  'overflow',

  // Link attributes (will be value-validated separately)
  'href',
  'xlink:href',

  // Namespace attributes
  'xmlns',
  'xmlns:xlink',
  'version',
];

/**
 * @name isUnsafeAttributeValue
 * @function
 * @param {String} attrName - The attribute name
 * @param {*} value - The attribute value to validate
 * @returns {Boolean} True if the value is unsafe
 * @description Checks if an attribute value contains dangerous patterns like javascript: URLs
 */
export function isUnsafeAttributeValue(attrName, value) {
  if (typeof value !== 'string') {
    return false;
  }

  // Block javascript: protocol
  if (/^\s*javascript:/i.test(value)) {
    return true;
  }

  // Block data: URLs with script content
  if (/^\s*data:.*script/i.test(value)) {
    return true;
  }

  // Block vbscript: protocol
  if (/^\s*vbscript:/i.test(value)) {
    return true;
  }

  return false;
}

/**
 * @name sanitizeAttributes
 * @function
 * @param {Element} element - The DOM element to sanitize
 * @param {Object} options - Sanitization options
 * @description Removes dangerous attributes and validates attribute values
 */
function sanitizeAttributes(element, options) {
  const allowedAttrs = [
    ...SAFE_SVG_ATTRIBUTES,
    ...(options.customAllowedAttrs || []),
  ];
  const attrs = Array.from(element.attributes);

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const attrName = attr.name.toLowerCase();

    // Remove event handlers (on* attributes)
    if (attrName.startsWith('on')) {
      if (options.onViolation) {
        options.onViolation('attribute', attrName, element);
      }
      element.removeAttribute(attr.name);
      continue;
    }

    // Check whitelist (only in strict mode)
    if (options.mode === 'strict' && !allowedAttrs.includes(attrName)) {
      if (options.onViolation) {
        options.onViolation('attribute', attrName, element);
      }
      element.removeAttribute(attr.name);
      continue;
    }

    // Validate attribute values (in both strict and permissive modes)
    if (isUnsafeAttributeValue(attrName, attr.value)) {
      if (options.onViolation) {
        options.onViolation('value', `${attrName}="${attr.value}"`, element);
      }
      element.removeAttribute(attr.name);
    }
  }
}

/**
 * @name sanitizeNode
 * @function
 * @param {Node} node - The DOM node to sanitize
 * @param {Object} options - Sanitization options
 * @description Recursively sanitizes a DOM node and its children
 */
function sanitizeNode(node, options) {
  // Only process element nodes
  if (node.nodeType === 1) {
    const tagName = node.tagName.toLowerCase();

    // Remove dangerous elements
    if (
      DANGEROUS_ELEMENTS.includes(tagName) &&
      !options.allowDangerousElements
    ) {
      if (options.onViolation) {
        options.onViolation('element', tagName, node);
      }
      node.remove();
      return;
    }

    // Sanitize attributes
    sanitizeAttributes(node, options);
  }

  // Recursively sanitize children
  const children = Array.from(node.childNodes);
  for (let i = 0; i < children.length; i++) {
    sanitizeNode(children[i], options);
  }
}

/**
 * @name sanitizeSVG
 * @function
 * @param {String} svgString - The SVG content to sanitize
 * @param {Object} options - Sanitization options
 * @param {String} options.mode - Security mode: 'strict' (full sanitization), 'permissive' (default - attribute validation only), 'unsafe' (no sanitization)
 * @param {Boolean} options.allowDangerousElements - Allow script, foreignObject, etc. (default: false)
 * @param {Array} options.customAllowedAttrs - Additional attributes to whitelist
 * @param {Function} options.onViolation - Callback for security violations: (type, value, element) => {}
 * @returns {String} Sanitized SVG string
 * @description Main sanitization function that parses, sanitizes, and serializes SVG content
 */
export function sanitizeSVG(svgString, options = {}) {
  const {
    mode = 'permissive',
    allowDangerousElements = false,
    customAllowedAttrs = [],
    onViolation = null,
  } = options;

  // Unsafe mode - no sanitization (for trusted content only)
  if (mode === 'unsafe') {
    return svgString;
  }

  // Use DOMParser to safely parse SVG
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  // Check for parsing errors
  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    throw new Error('Invalid SVG: ' + parserError.textContent);
  }

  // Sanitize the document
  const sanitizeOptions = {
    mode,
    allowDangerousElements,
    customAllowedAttrs,
    onViolation,
  };
  sanitizeNode(doc.documentElement, sanitizeOptions);

  // Serialize back to string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
}
