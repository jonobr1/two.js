
/**
 * Convenience properties and methods for QUnit testing within two.js
 */

(function() {

  var root = this;
  var QU = root.QUnit || {};
  var TEMP = document.createElement('div');
  var Tolerance = 0.001;

  var Utils = root.Utils = QU.Utils = {

    /**
     * Add a DOM Element to your current unit test.
     */
    addElemToTest: function(test, elem) {

      // Skip for headless
      if (window.URL) return;

      var domElement = document.createElement('li');

      if (_.isArray(elem)) {
        _.each(elem, function(el) {
          domElement.appendChild(el);
        });
      } else {
        domElement.appendChild(elem);
      }

      _.delay(function() {
        document.querySelector('#' + test.id + ' ol').appendChild(domElement);
      }, 100);

    },

    /**
     * Add an instance of Two.js to your current unit test.
     */
    addInstanceToTest: function(test, two) {

      var elem;

      if (_.isArray(two)) {
        elem = _.map(two, function(t) {
          return t.renderer.domElement;
        });
      } else {
        elem = two.renderer.domElement;
      }

      Utils.addElemToTest(test, elem);

    },

    get: function(path, callback) {

      var xhr = new XMLHttpRequest();
      xhr.open('GET', path, true);

      xhr.onreadystatechange = function(e) {

        if (xhr.readyState != 4 || xhr.status != 200) {
          return;
        }

        callback(xhr.response);

      };

      xhr.send();

    },

    /**
     * Ajax get request to get blob.
     */
    getImageBlob: function(path, callback) {

      var xhr = new XMLHttpRequest();
      xhr.open('GET', path, true);

      if (window.URL) {
        xhr.responseType = 'blob';
      } else {
        xhr.responseType = 'arraybuffer';
      }

      xhr.onreadystatechange = function(e) {

        if (xhr.readyState != 4 || xhr.status != 200) {
          return;
        }

        if (window.URL) {

          callback(this.response);

        } else {
          var blob;
          var mimeString = 'image/png';

          // Some older Webkits don't support responseType blob,
          // So create a blob from arraybuffer


          try {
              blob = new Blob([this.response], {type: mimeString});
          } catch (e) {
              // The BlobBuilder API has been deprecated in favour of Blob, but older
              // browsers don't know about the Blob constructor
              // IE10 also supports BlobBuilder, but since the `Blob` constructor
              // also works, there's no need to add `MSBlobBuilder`.
              var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;
              var bb = new BlobBuilder();
              bb.append(this.response);
              blob = bb.getBlob(mimeString);
          }

          callback(blob);

        }

      };


      xhr.send();

    },

    /**
     * Compare a specific instance of two to an image in the context of a
     * specific test.
     */
    compare: function(path, renderer, message, callback) {

      var _this = this;

      QUnit.Utils.getImageBlob(path, function(reference) {

        var data = renderer.domElement.toDataURL('image/png');
        resemble(reference).compareTo(data).onComplete(function(data) {

          var pct = parseFloat(data.misMatchPercentage);

          ok(pct <= 1, message);
          start();

          var img = document.createElement('img');
          img.src = path;
          img.title = 'Reference Image';
          img.width = img.height = 400;

          var domElement = document.createElement('li');
          renderer.domElement.title = 'Computed Image';

          domElement.appendChild(img);
          domElement.appendChild(renderer.domElement);

          _.delay(function() {
            document.querySelector('#' + _this.id + ' ol').appendChild(domElement);
          }, 100);

        });

      });

    },

    textToDOM: function(str) {

      TEMP.innerHTML = str;
      return _.map(TEMP.children, function(child) {
        return child;
      });

    },

    /**
     * Deep equality between an answer, a, and an object in question, q.
     */
    shapeEquals: function(a, q) {

      for (var i in a) {

        var check, isElse = false;

        if (_.isArray(a[i])) {
          check = Utils.shapeEquals(a[i], _.toArray(q[i]));
        } else if (_.isObject(a[i])) {
          check = Utils.shapeEquals(a[i], q[i]);
        } else if (_.isNumber(a[i])) {
          check = Math.abs(a[i] - q[i]) <= Tolerance; // Fuzzy checking
        } else {
          check = q[i] === a[i];
        }

        if (!check) {
          return false;
        }

      }

      return true;

    }

  };

})();
