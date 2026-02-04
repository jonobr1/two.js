// eslint-disable-next-line no-redeclare
/* global console, window, URL, XMLHttpRequest */

import { TwoError } from './error';

/**
 * @name Two.Utils.xhr
 * @function
 * @param {String} path
 * @param {Function} callback
 * @returns {XMLHttpRequest} The constructed and called XHR request.
 * @description Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method. Validates URL protocols for security.
 */
export function xhr(path, callback) {
  // Validate URL protocol for security
  try {
    const url = new URL(path, window.location.href);
    // Only allow http:, https:, and data: protocols
    if (!['http:', 'https:', 'data:'].includes(url.protocol)) {
      const error = new TwoError(
        `Unsupported URL protocol: ${url.protocol}. Only http:, https:, and data: are allowed.`,
      );
      throw error;
    }
  } catch (error) {
    console.error('Invalid URL:', error);
    throw error;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', path);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Note: Content-Type validation is intentionally not enforced here
        // because some servers don't set correct content-type headers.
        // The sanitization in load() will catch any malicious content.
        callback(xhr.responseText);
      } else {
        console.error(
          `Failed to load resource: ${xhr.status} ${xhr.statusText}`,
        );
      }
    }
  };

  xhr.send();
  return xhr;
}
