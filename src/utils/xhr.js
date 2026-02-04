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
  // Note: Allow file: protocol for local testing/development
  try {
    const url = new URL(path, window.location.href);
    // Block only dangerous protocols (javascript:, vbscript:, etc.)
    // Allow http:, https:, data:, file:, and relative URLs
    const blockedProtocols = ['javascript:', 'vbscript:'];
    if (blockedProtocols.some((blocked) => url.protocol === blocked)) {
      const error = new TwoError(
        `Blocked dangerous URL protocol: ${url.protocol}`,
      );
      console.error('XHR blocked:', error);
      throw error;
    }
  } catch (error) {
    // If URL parsing fails, it might be a relative URL - allow it
    if (error instanceof TypeError) {
      // Relative URLs can't be parsed without a base, but they're safe
      // The browser will handle relative URL resolution
    } else {
      console.error('Invalid URL:', error);
      throw error;
    }
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
