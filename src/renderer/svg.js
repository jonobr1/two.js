(function() {

  /**
   * Scope specific variables
   */
  var OBJECT_COUNT = 0;

  var svg = {

    version: 1.1,

    ns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',

    createElement: function(name, attrs) {
      var tag = name.toLowerCase();
      var elem = document.createElementNS(this.ns, tag);
      if (tag === 'svg') {
        attrs = _.defaults(attrs || {}, {
          version: this.version
        });
      }
      if (_.isObject(attrs)) {
        this.setAttributes(elem, attrs);
      }
      return elem;
    },

    setAttributes: function(elem, attrs) {
      _.each(attrs, function(v, k) {
        this.setAttribute(k, v);
      }, elem);
      return this;
    },

    removeAttributes: function(elem, attrs) {
      _.each(attrs, function(a) {
        this.removeAttribute(a);
      }, elem);
      return this;
    },

    toString: function(points, closed, curved) {

      var length = points.length,
        last = length - 1;

      if (!curved) {
        return _.map(points, function(v, i) {
          var command;
          if (i <= 0) {
            command = 'M';
          } else {
            command = 'L';
          }
          command += ' ' + v.x + ' ' + v.y;
          if (i >= last && closed) {
            command += ' Z';
          }
          return command;
        }).join(' ');
      }

      // TODO: Curved lines
      return '';

    },

    catmull: function() {

    }

  };

  /**
   * @class
   */
  var Renderer = Two[Two.types.svg] = function() {

    this.domElement = svg.createElement('svg');
    this.children = [];

  };

  _.extend(Renderer, {

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height) {

      this.width = width;
      this.height = height;

      svg.setAttributes(this.domElement, {
        width: width,
        height: height
      });

      return this;

    },

    /**
     * Add an object or objects to the renderer.
     */
    add: function(object) {

      var objects = _.isArray(object) ? object : arguments;
      var domElement = this.domElement;
      var children = this.children;

      _.each(objects, function(object) {

        var elem, tag;

        if (_.isUndefined(object.id)) {
          object.id = generateId();
        }

        // Generate an SVG equivalent element here.

        if (object instanceof Two.Group) {
          tag = 'g';
          object.renderer = this;
        } else {
          tag = 'path'
        }

        elem = object.domElement = svg.createElement(tag, getStyles(object));

        domElement.appendChild(elem);
        children.push(object);

      }, this);

      return this;

    },

    render: function() {

      _.each(this.children, function(c) {

        svg.setAttributes(c.domElement, getStyles(c));

      });

    }

  });

  function getStyles(o) {

    var styles = {},
      id = o.id,
      translation = o.translation,
      rotation = o.rotation,
      scale = o.scale,
      stroke = o.stroke,
      linewidth = o.linewidth,
      fill = o.fill,
      opacity = o.opacity,
      visible = o.visible,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (o.id) {
      styles.id = o.id;
    }
    if (translation && _.isNumber(scale) && _.isNumber(rotation)) {
      styles.transform = 'translate(' + translation.x + ',' + translation.y
        + ') scale(' + scale + ') rotate(' + rotation + ')'
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (opacity) {
      styles['stroke-opacity'] = styles['fill-opacity'] = opacity;
    }
    if (visible) {
      styles.visibility = visible;
    }
    if (join) {
      styles['stroke-linejoin'] = join;
    }
    if (miter) {
      styles['stroke-miterlimit'] = miter;
    }
    if (linewidth) {
      styles['stroke-width'] = linewidth;
    }
    if (vertices) {
      styles.d = svg.toString(vertices, closed, curved);
    }

    return styles;

  }

  function generateId() {
    OBJECT_COUNT++;
    return 'two-' + Two.types.svg.toLowerCase() + '-' + OBJECT_COUNT;
  }

})();