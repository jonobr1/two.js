/**
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * And modified to work with node.js
 */

(function() {

  var root = this;
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !root.requestAnimationFrame; ++x) {
    root.requestAnimationFrame = root[vendors[x]+'RequestAnimationFrame'];
    root.cancelAnimationFrame =
      root[vendors[x]+'CancelAnimationFrame'] || root[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!root.requestAnimationFrame)
    root.requestAnimationFrame = raf;

  if (!root.cancelAnimationFrame)
    root.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = root.requestAnimationFrame;
    }
    exports.requestAnimationFrame = root.requestAnimationFrame;
  } else {
    root.requestAnimationFrame = root.requestAnimationFrame;
  }

  if (typeof define === 'function' && define.amd) {
    define('requestAnimationFrame', [], function() {
      return root.requestAnimationFrame;
    });
  }

  function raf(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = root.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  }

})();
