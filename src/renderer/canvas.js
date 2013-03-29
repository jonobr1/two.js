(function() {

  /**
   * Constants
   */

  // Localize variables
  var getCurveFromPoints = Two.Utils.getCurveFromPoints,
    mod = Two.Utils.mod;

  /**
   * A canvas specific representation of Two.Group
   */
  var Group = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

    this.children = {};

  };

  _.extend(Group.prototype, {

    appendChild: function(elem) {

      var parent = elem.parent;
      var id = elem.id;

      if (!_.isUndefined(parent)) {
        delete parent.children[id];
      }

      this.children[id] = elem;
      elem.parent = this;

      return this;

    },

    removeChild: function(elem) {

      delete this.children[elem.id];

      return this;

    },

    render: function(ctx) {

      var matrix = this.matrix;

      ctx.save();
      ctx.transform(
        matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

      _.each(this.children, function(child) {
        child.render(ctx);
      });

      ctx.restore();

      return this;

    }

  });

  /**
   * A canvas specific representation of a drawable element.
   */
  var Element = function(styles) {

    _.each(styles, function(v, k) {
      this[k] = v;
    }, this);

  };

  _.extend(Element.prototype, {

    render: function(ctx) {

      var matrix = this.matrix,
        stroke = this.stroke,
        linewidth = this.linewidth,
        fill = this.fill,
        opacity = this.opacity,
        visible = this.visible,
        cap = this.cap,
        join = this.join,
        miter = this.miter,
        curved = this.curved,
        closed = this.closed,
        commands = this.commands,
        length = commands.length,
        last = length - 1;

      if (!visible) {
        return this;
      }

      // Transform

      ctx.save();

      if (matrix) {
        ctx.transform(
          matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
      }

      // Styles

      if (fill) {
        ctx.fillStyle = fill;
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
      }
      if (linewidth) {
        ctx.lineWidth = linewidth;
      }
      if (miter) {
        ctx.miterLimit = miter;
      }
      if (join) {
        ctx.lineJoin = join;
      }
      if (cap) {
        ctx.lineCap = cap;
      }
      if (_.isNumber(opacity)) {
        ctx.globalAlpha = opacity;
      }

      ctx.beginPath();
      _.each(commands, function(b, i) {

        var x = b.x.toFixed(3), y = b.y.toFixed(3);

        if (curved) {

          var prev = closed ? mod(i - 1, length) : Math.max(i - 1, 0);
          var next = closed ? mod(i + 1, length) : Math.min(i + 1, last);

          var a = commands[prev];
          var c = commands[next];

          var vx = a.v.x.toFixed(3);
          var vy = a.v.y.toFixed(3);

          var ux = b.u.x.toFixed(3);
          var uy = b.u.y.toFixed(3);

          if (i <= 0) {

            ctx.moveTo(x, y);

          } else {

            ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            // Add a final point and close it off

            if (i >= last && closed) {

              vx = b.v.x.toFixed(3);
              vy = b.v.y.toFixed(3);

              ux = c.u.x.toFixed(3);
              uy = c.u.y.toFixed(3);

              x = c.x.toFixed(3);
              y = c.y.toFixed(3);

              ctx.bezierCurveTo(vx, vy, ux, uy, x, y);

            }

          }

        } else {

          if (i <= 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

        }
      });

      // Loose ends

      if (closed && !curved) {
        ctx.closePath();
      }

      ctx.fill();
      ctx.stroke();

      ctx.restore();

    }

  });

  var canvas = {

    /**
     * Turn a set of vertices into a string for drawing in a canvas.
     */
    toArray: function(points, curved, closed) {

      var l = points.length,
        last = l - 1;

      if (!curved) {
        return _.map(points, function(v, i) {
          return { x: v.x, y: v.y };
        });
      }

      return getCurveFromPoints(points, closed);

    }

  };

  var Renderer = Two[Two.Types.canvas] = function() {

    this.count = 0;
    this.domElement = document.createElement('canvas');
    this.ctx = this.domElement.getContext('2d');

    this.elements = [];

    // Everything drawn on the canvas needs to come from the stage.
    this.stage = null;

  };

  _.extend(Renderer, {

    

  });

  _.extend(Renderer, {

    Group: Group,

    Element: Element,

    getStyles: getStyles,

    setStyles: setStyles,

    Utils: canvas

  });

  _.extend(Renderer.prototype, Backbone.Events, {

    setSize: function(width, height) {

      this.width = this.domElement.width = width;
      this.height = this.domElement.height = height;

      _.extend(this.domElement.style, {
        width: this.width + 'px',
        height: this.height + 'px'
      });

      return this;

    },

    add: function(o) {

      var proto = Object.getPrototypeOf(this);
        constructor = proto.constructor;

      var l = arguments.length,
        objects = o,
        elements = this.elements,
        domElement = this.domElement,

        // For extensibility with WebGlRenderer

        Group = constructor.Group,
        Element = constructor.Element,
        getStyles = constructor.getStyles;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        var elem, tag, styles, isGroup = object instanceof Two.Group,
          isStage = _.isNull(this.stage);

        if (_.isUndefined(object.id)) {
          object.id = generateId.call(this);
        }

        // Generate an element, a JavaScript object, that holds all the
        // necessary information to draw to the canvas successfully.

        if (isGroup) {
          // Kind of represents a matrix, save and restore set.
          styles = getStyles.call(this, object);
          delete styles.stroke;
          delete styles.fill;
          delete styles.opacity;
          delete styles.cap;
          delete styles.join;
          delete styles.miter;
          delete styles.linewidth;
          elem = new Group(styles);
          if (isStage) { // Set the stage

            this.stage = elem;
            this.stage.object = object; // Reference for BoundingBox calc.

            object.parent = this;
            object.unbind(Two.Events.change)
              .bind(Two.Events.change, _.bind(this.update, this));

          }
        } else {
          // Has styles and draw commands.
          elem = new Element(getStyles.call(this, object));
        }

        elements.push(elem);
        if (!isStage) {
          this.stage.appendChild(elem);
        }

      }, this);

      return this;

    },

    update: function(id, property, value, closed, curved, strokeChanged) {

      var proto = Object.getPrototypeOf(this);
      var constructor = proto.constructor;

      var elements = this.elements;
      var elem = elements[id];

      switch (property) {
        case Two.Properties.hierarchy:
          _.each(value, function(j) {
            elem.appendChild(elements[j]);
          });
          break;
        case Two.Properties.demotion:
          _.each(value, function(j) {
            elem.removeChild(elements[j]);
            this.elements[j] = null;
          }, this);
        default:
          constructor.setStyles.call(this, elem, property, value, closed, curved, strokeChanged);
      }

      return this;

    },

    render: function() {

      if (_.isNull(this.stage)) {
        return this;
      }

      // TODO: Test performance between these two

      // var rect = this.stage.object.getBoundingClientRect();
      // this.ctx.clearRect(rect.left, rect.top, rect.width, rect.height);

      this.ctx.clearRect(0, 0, this.width, this.height);

      this.stage.render(this.ctx);

      return this;

    }

  });

  function resetTransform(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function getStyles(o) {

    var styles = {},
      id = o.id,
      matrix = o._matrix,
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
      styles.id = id;
    }
    if (_.isObject(matrix)) {
      styles.matrix = matrix.toArray();
    }
    if (stroke) {
      styles.stroke = stroke;
    }
    if (fill) {
      styles.fill = fill;
    }
    if (_.isNumber(opacity)) {
      styles.opacity = opacity;
    }
    if (cap) {
      styles.cap = cap;
    }
    if (join) {
      styles.join = join;
    }
    if (miter) {
      styles.miter = miter;
    }
    if (linewidth) {
      styles.linewidth = linewidth;
    }
    if (vertices) {
      styles.commands = canvas.toArray(vertices, curved, closed);
    }
    styles.visible = !!visible;
    styles.curved = !!curved;
    styles.closed = !!closed;

    return styles;

  }

  function setStyles(elem, property, value, closed, curved) {

    switch (property) {

      case 'matrix':
        property = 'matrix';
        value = value.toArray();
        break;
      case 'vertices':
        property = 'commands';
        elem.curved = curved;
        elem.closed = closed;
        value = canvas.toArray(value, elem.curved, elem.closed);
        break;

    }

    elem[property] = value;

  }

  function generateId() {
    var count = this.count;
    this.count++;
    return count;
  }

})();