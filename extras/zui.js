(function(Two) {

  var _ = Two.Utils;

  var Surface = function(object) {

    this.object = object;

  };

  _.extend(Surface.prototype, {

    limits: function(min, max) {

      var min_exists = !_.isUndefined(min);
      var max_exists = !_.isUndefined(max);

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

  var ZUI = Two.ZUI = function(group, domElement) {

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

  _.extend(ZUI, {

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

  _.extend(ZUI.prototype, {

    constructor: ZUI,

    add: function(surface) {
      this.surfaces.push(surface);
      var limits = surface.limits();
      this.addLimits(limits.min, limits.max);
      return this;
    },

    addLimits: function(min, max, type) {

      var type = type || 'scale';

      if (!_.isUndefined(min)) {
        if (this.limits[type].min) {
          this.limits[type].min = Math.max(min, this.limits[type].min);
        } else {
          this.limits[type].min = min;
        }
      }

      if (_.isUndefined(max)) {
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
      return m.multiply.apply(m, _.toArray(n));
    },

    surfaceToClient: function(v) {
      this.updateOffset();
      var vo = this.viewportOffset.matrix.clone();
      var sm = this.surfaceMatrix.multiply.apply(this.surfaceMatrix, _.toArray(v));
      return vo.multiply.apply(vo, _.toArray(sm));
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
      _.extend(this.viewportOffset, rect);

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

})((typeof global !== 'undefined' ? global : (this || window)).Two);
