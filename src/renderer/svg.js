(function() {

  /**
   * Scope specific variables
   */
  var OBJECT_COUNT = 0;

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  var svg = {

    version: 1.1,

    ns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',

    /**
     * Create an svg namespaced element.
     */
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

    /**
     * Add attributes from an svg element.
     */
    setAttributes: function(elem, attrs) {
      _.each(attrs, function(v, k) {
        this.setAttribute(k, v);
      }, elem);
      return this;
    },

    /**
     * Remove attributes from an svg element.
     */
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

      var l = points.length,
        last = l - 1;

      if (!curved) {
        return _.map(points, function(v, i) {
          var command;
          if (i <= 0) {
            command = 'M';
          } else {
            command = 'L';
          }
          command += ' ' + v.x.toFixed(3) + ' ' + v.y.toFixed(3);
          if (i >= last && closed) {
            command += ' Z';
          }
          return command;
        }).join(' ');
      }

      var curve = getCurveFromPoints(points, closed);

      return _.map(curve, function(b, i) {

        var command;
        var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
        var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

        var a = curve[prev];
        var c = curve[next];

        var vx = a.v.x.toFixed(3);
        var vy = a.v.y.toFixed(3);

        var ux = b.u.x.toFixed(3);
        var uy = b.u.y.toFixed(3);

        var x = b.x.toFixed(3);
        var y = b.y.toFixed(3);

        if (i <= 0) {
          command = 'M ' + x + ' ' + y;
        } else {
          command = 'C '
            + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
        }

        // Add a final point and close it off

        if (i >= last && closed) {

          vx = b.v.x.toFixed(3);
          vy = b.v.y.toFixed(3);

          ux = c.u.x.toFixed(3);
          uy = c.u.y.toFixed(3);

          x = c.x.toFixed(3);
          y = c.y.toFixed(3);

          command += 
            ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;

          command += ' Z';
        }

        return command;

      }).join(' ');

    }

  };

  /**
   * @class
   */
  var Renderer = Two[Two.Types.svg] = function() {

    this.domElement = svg.createElement('svg');
    this.elements = [];
    this.commands = [];

    this.domElement.style.visibility = 'hidden';

    this.unveil = _.once(_.bind(function() {
      this.domElement.style.visibility = 'visible';
    }, this));

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

        var elem, tag, styles, isGroup = object instanceof Two.Group;

        if (_.isUndefined(object.id)) {
          object.id = generateId();
        }

        // Generate an SVG equivalent element here.

        if (isGroup) {
          tag = 'g';
          if (_.isUndefined(object.parent)) { // For the "scene".
            object.parent = this;
            object.unbind(Two.Events.change)
              .bind(Two.Events.change, _.bind(this.update, this));
          }
          styles = getStyles(object);
          // Remove unnecessary fluff from group
          delete styles.stroke;
          delete styles.fill;
          delete styles['fill-opacity'];
          delete styles['stroke-opacity'];
          delete styles['stroke-linecap'];
          delete styles['stroke-linejoin'];
          delete styles['stroke-miterlimit'];
          delete styles['stroke-width'];
        } else {
          tag = 'path';
          styles = getStyles(object);
        }

        elem = svg.createElement(tag, styles);

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

      this.unveil();

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
          case Two.Properties.demotion:
            _.each(value, function(j) {
              elem.removeChild(elements[j]);
            });
            break;
          default:
            setStyles(elem, property, value, closed, curved);
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
      cap = o.cap,
      join = o.join,
      miter = o.miter,
      curved = o.curved,
      closed = o.closed,
      vertices = o.vertices;

    if (id) {
      styles.id = Renderer.Identifier + id;
    }
    if (translation && _.isNumber(scale) && _.isNumber(rotation)) {
      // styles.transform = 'translate(' + translation.x + ',' + translation.y
      //   + ') scale(' + scale + ') rotate(' + rotation + ')'
      styles.transform = 'matrix(' + o._matrix.toString() + ')';
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
    // if (visible) {
    styles.visibility = visible ? 'visible' : 'hidden';
    // }
    if (cap) {
      styles['stroke-linecap'] = cap;
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

  function setStyles(elem, property, value, closed, curved) {

    switch (property) {

      case 'matrix':
        property = 'transform';
        value = 'matrix(' + value.toString() + ')';
        break;
      case 'visible':
        property = 'visibility';
        value = value ? 'visible' : 'hidden';
        break;
      case 'cap':
        property = 'stroke-linecap';
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
          'stroke-opacity': value,
          'fill-opacity': value
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