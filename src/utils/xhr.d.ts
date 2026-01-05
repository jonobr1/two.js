declare module 'two.js/src/utils/xhr' {
  /**
   * @name Two.Utils.xhr
   * @function
   * @param {String} path
   * @param {Function} callback
   * @returns {XMLHttpRequest} The constructed and called XHR request.
   * @description Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method.
   */
  export function xhr(
    path: string,
    callback: (resp: XMLHttpRequestResponseType) => void
  ): XMLHttpRequest;
}
