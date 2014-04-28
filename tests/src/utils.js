
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

      xhr.onreadystatechange = function(e) {

        if (xhr.readyState != 4 || xhr.status != 200) {
          return;
        }

        callback(xhr.response);

      };

      xhr.open('GET', path, true);
      xhr.send();

    },

    /**
     * Ajax get request to get blob.
     */
    getImageBlob: function(path, callback) {

      var xhr = new XMLHttpRequest();

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

          // Safari doesn't support responseType blob,
          // so create a blob from arraybuffer
          callback(new Blob([this.response], { "type" : 'image/png' }));

        }

      };

      xhr.open('GET', path, true);
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