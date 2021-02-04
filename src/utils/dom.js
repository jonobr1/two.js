import root from './root.js';
import _ from './underscore.js';

var dom = {

  hasEventListeners: typeof root.addEventListener === 'function',

  bind: function(elem, event, func, bool) {
    if (this.hasEventListeners) {
      elem.addEventListener(event, func, !!bool);
    } else {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },

  unbind: function(elem, event, func, bool) {
    if (dom.hasEventListeners) {
      elem.removeEventListeners(event, func, !!bool);
    } else {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },

  getRequestAnimationFrame: function() {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var request = root.requestAnimationFrame, cancel;

    if(!request) {
      for (var i = 0; i < vendors.length; i++) {
        request = root[vendors[i] + 'RequestAnimationFrame'] || request;
        cancel = root[vendors[i] + 'CancelAnimationFrame']
          || root[vendors[i] + 'CancelRequestAnimationFrame'] || cancel;
      }

      request = request || function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = root.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    return request;

  }

};

var temp = (root.document ? root.document.createElement('div') : {});
temp.id = 'help-two-load';

Object.defineProperty(dom, 'temp', {
  enumerable: true,
  get: function() {
    if (_.isElement(temp) && !root.document.head.contains(temp)) {
      _.extend(temp.style, {
        display: 'none'
      });
      root.document.head.appendChild(temp);
    }
    return temp;
  }
});

export default dom;
