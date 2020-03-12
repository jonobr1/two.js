/*
MIT License

Copyright (c) 2012 - 2020 jonobr1 / http://jonobr1.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('two.js')) :
  typeof define === 'function' && define.amd ? define(['two.js'], factory) :
  (global = global || self, global.ZUI = factory(global.Two));
}(this, (function (Two) { 'use strict';

  Two = Two && Object.prototype.hasOwnProperty.call(Two, 'default') ? Two['default'] : Two;

  var extend = function(base, obj) {
    for (var k in obj) {
      base[k] = obj[k];
    }
    return base;
  };

  var Surface = function(object) {
    this.object = object;
  };

  extend(Surface.prototype, {

    limits: function(min, max) {

      var min_exists = typeof min !== 'undefined';
      var max_exists = typeof max !== 'undefined';

      if (!max_exists && !min_exists) {
        return { min: this.min, max: this.max };
      }

      this.min = min_exists ? min : this.min;
      this.max = max_exists ? max : this.max;

      return this;

    },

    apply: function(px, py, s) {
      this.object.translation.set(px, py);
      this.object.scale = s;
      return this;
    }

  });

  var ZUI = function(group, domElement) {

    this.limits = {
      scale: ZUI.Limit.clone(),
      x: ZUI.Limit.clone(),
      y: ZUI.Limit.clone()
    };

    this.viewport = domElement || document.body;
    this.viewportOffset = {
      matrix: new Two.Matrix()
    };

    this.surfaceMatrix = new Two.Matrix();

    this.surfaces = [];
    this.reset();
    this.updateSurface();

    this.add(new Surface(group));

  };

  extend(ZUI, {

    Surface: Surface,

    Clamp: function(v, min, max) {
      return Math.min(Math.max(v, min), max);
    },

    Limit: {
      min: -Infinity,
      max: Infinity,
      clone: function() {
        var result = {};
        for (var k in this) {
          result[k] = this[k];
        }
        return result;
      }
    },

    TranslateMatrix: function(m, x, y) {
      m.elements[2] += x;
      m.elements[5] += y;
      return m;
    },

    PositionToScale: function(pos) {
      return Math.exp(pos);
    },

    ScaleToPosition: function(scale) {
      return Math.log(scale);
    }

  });

  extend(ZUI.prototype, {

    constructor: ZUI,

    add: function(surface) {
      this.surfaces.push(surface);
      var limits = surface.limits();
      this.addLimits(limits.min, limits.max);
      return this;
    },

    addLimits: function(min, max, type) {

      type = type || 'scale';

      if (typeof min !== 'undefined') {
        if (this.limits[type].min) {
          this.limits[type].min = Math.max(min, this.limits[type].min);
        } else {
          this.limits[type].min = min;
        }
      }

      if (typeof max === 'undefined') {
        return this;
      }

      if (this.limits[type].max) {
        this.limits[type].max = Math.min(max, this.limits[type].max);
      } else {
        this.limits[type].max = max;
      }

      return this;

    },

    /**
     * Conversion Functions
     */

    clientToSurface: function(x, y) {
      this.updateOffset();
      var m = this.surfaceMatrix.inverse();
      var n = this.viewportOffset.matrix.inverse().multiply(x, y, 1);
      return m.multiply.apply(m, [n.x, n.y, n.z]);
    },

    surfaceToClient: function(v) {
      this.updateOffset();
      var vo = this.viewportOffset.matrix.clone();
      var sm = this.surfaceMatrix.multiply.apply(this.surfaceMatrix, [v.x, v.y, v.z]);
      return vo.multiply.apply(vo, [sm.x, sm.y, sm.z]);
    },

    /**
     *
     */

    zoomBy: function(byF, clientX, clientY) {
      var s = ZUI.PositionToScale(this.zoom + byF);
      this.zoomSet(s, clientX, clientY);
      return this;
    },

    zoomSet: function(zoom, clientX, clientY) {

      var newScale = this.fitToLimits(zoom);
      this.zoom = ZUI.ScaleToPosition(newScale);

      if (newScale === this.scale) {
        return this;
      }

      var sf = this.clientToSurface(clientX, clientY);
      var scaleBy = newScale / this.scale;

      this.surfaceMatrix.scale(scaleBy);
      this.scale = newScale;

      var c = this.surfaceToClient(sf);
      var dx = clientX - c.x;
      var dy = clientY - c.y;
      this.translateSurface(dx, dy);

      return this;

    },

    translateSurface: function(x, y) {
      ZUI.TranslateMatrix(this.surfaceMatrix, x, y);
      this.updateSurface();
      return this;
    },

    updateOffset: function() {

      var rect = this.viewport.getBoundingClientRect();
      extend(this.viewportOffset, rect);

      this.viewportOffset.left -= document.body.scrollLeft;
      this.viewportOffset.top -= document.body.scrollTop;

      this.viewportOffset.matrix
        .identity()
        .translate(this.viewportOffset.left, this.viewportOffset.top);

      return this;

    },

    updateSurface: function() {

      var e = this.surfaceMatrix.elements;
      for (var i = 0; i < this.surfaces.length; i++) {
        this.surfaces[i].apply(e[2], e[5], e[0]);
      }

      return this;

    },

    reset: function() {
      this.zoom = 0;
      this.scale = 1.0;
      this.surfaceMatrix.identity();
      return this;
    },

    fitToLimits: function(s) {
      return ZUI.Clamp(s, this.limits.scale.min, this.limits.scale.max);
    }

  });

  return ZUI;

})));
