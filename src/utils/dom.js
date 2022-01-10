import { root } from './root.js';
import { _ } from './underscore.js';

export const dom = {

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

    const vendors = ['ms', 'moz', 'webkit', 'o'];

    let lastTime = 0;
    let request = root.requestAnimationFrame;

    if (!request) {

      for (let i = 0; i < vendors.length; i++) {
        request = root[vendors[i] + 'RequestAnimationFrame'] || request;
      }

      request = request || fallbackRequest;

    }

    function fallbackRequest(callback, element) {

      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = root.setTimeout(nextRequest, timeToCall);
      lastTime = currTime + timeToCall;

      function nextRequest() {
        callback(currTime + timeToCall);
      }

      return id;

    }

    return request;

  }

};

const temp = (root.document ? root.document.createElement('div') : {});
temp.id = 'help-two-load';

Object.defineProperty(dom, 'temp', {
  enumerable: true,
  get: function() {
    if (_.isElement(temp) && !root.document.head.contains(temp)) {
      temp.style.display = 'none';
      root.document.head.appendChild(temp);
    }
    return temp;
  }
});
