/**
 * @name Utils.xhr
 * @function
 * @param {String} path
 * @param {Function} callback
 * @returns {XMLHttpRequest} The constructed and called XHR request.
 * @description Canonical method to initiate `GET` requests in the browser. Mainly used by {@link Two#load} method.
 */
var xhr = function(path, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', path);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };

  xhr.send();
  return xhr;

};

export default xhr;
