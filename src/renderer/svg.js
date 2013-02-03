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

    /**
     * Turn a set of vertices into a string for the d property of a path
     * element. It is imperative that the string collation is as fast as
     * possible, because this call will be happening multiple times a 
     * second.
     */
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
  var Renderer = Two[Two.Types.svg] = function(two) {

    this.two = two;

    this.domElement = svg.createElement('svg');
    this.elements = [];
    this.commands = [];

  };

  _.extend(Renderer, {

    Identifier: 'two-'

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
    add: function(o) {

      var l = arguments.length,
        objects = o,
        elements = this.elements,
        domElement = this.domElement;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        var elem, tag;

        if (_.isUndefined(object.id)) {
          object.id = generateId();
        }

        // Generate an SVG equivalent element here.

        if (object instanceof Two.Group) {
          tag = 'g';
          if (_.isUndefined(object.parent)) { // For the "scene".
            object.parent = this;
            object.unbind(Two.Events.change)
              .bind(Two.Events.change, _.bind(this.update, this));
          }
        } else {
          tag = 'path'
        }

        elem = object.domElement = svg.createElement(tag, getStyles(object));

        domElement.appendChild(elem);
        elements.push(elem);

      }, this);

      return this;

    },

    update: function(id, property, value) {

      this.commands.push(arguments);

      return this;

    },

    render: function() {

      var elements = this.elements,
        selector = Renderer.Identifier;

      _.each(this.commands, function(command) {

        var i = command[0],
          property = command[1],
          value = command[2],
          closed = command[3],  // Only exists for "d/vertices" property
          curved = command[4],
          elem = elements[i];

        switch (property) {

          case Two.Properties.hierarchy:
            _.each(value, function(j) {
              elem.appendChild(elements[j]);
            });
            break;
          default:
            css(elem, property, value, closed, curved);
        }

      }, this);

      this.commands.length = 0;

      return this;

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
      styles.id = Renderer.Identifier + o.id;
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

  function css(elem, property, value, closed, curved) {

    switch (property) {

      case 'rotation':
        property = 'transform';
        value = 'translate(' + closed.translation.x + ',' + closed.translation.y
          + ') scale(' + closed.scale + ') rotate(' + value + ')';
        break;
      case 'scale':
        property = 'transform';
        value = 'translate(' + closed.translation.x + ',' + closed.translation.y
          + ') scale(' + value + ') rotate(' + closed.rotation + ')';
        break;
      case 'translation':
        // property = 'transform';
        // value = 'translate(' + translation.x + ',' + translation.y
        //   + ') scale(' + scale + ') rotate(' + rotation + ')';
        break;
      case 'visible':
        property = 'stroke-linejoin';
        break;
      case 'join':
        property = 'stroke-linejoin';
        break;
      case 'miter':
        property = 'stroke-miterlimit';
        break;
      case 'linewidth':
        property = 'stroke-width';
        break;
      case 'vertices':
        property = 'd';
        value = svg.toString(value, closed, curved);
        break;
      case 'opacity':
        svg.setAttributes(elem, {
          'stroke-opacity': opacity,
          'fill-opacity': opacity
        });
        return;

    }

    elem.setAttribute(property, value);

  }

  function generateId() {
    var count = OBJECT_COUNT;
    OBJECT_COUNT++;
    return count;
  }

})();