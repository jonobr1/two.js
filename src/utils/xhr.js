/**
 * @name Two.Utils.xhr
 * @function
 * @param {String} path
 * @param {Function} callback
 * @param {Function} [onError] - Called for HTTP, network, timeout, or abort failures.
 * @returns {XMLHttpRequest} The constructed and called XHR request.
 * @description Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method.
 */
export function xhr(path, callback, onError) {

  const xhr = new XMLHttpRequest();
  xhr.open('GET', path);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(xhr.responseText, xhr);
    } else {
      fail();
    }
  };
  xhr.onerror = xhr.onabort = xhr.ontimeout = fail;

  function fail() {
    if (typeof onError === 'function') {
      onError(new Error('Unable to load SVG resource: HTTP ' + xhr.status));
    }
  }

  xhr.send();
  return xhr;

}
