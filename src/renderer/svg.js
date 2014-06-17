(function() {

  // Localize variables
  var mod = Two.Utils.mod;

  var svg = {

    version: 1.1,

    ns: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',

    /**
     * Create an svg namespaced element.
     */
    createElement: function(name, attrs) {
      var tag = name;
      var elem = document.createElementNS(this.ns, tag);
      if (tag === 'svg') {
        attrs = _.defaults(attrs || {}, {
          version: this.version
        });
      }
      if (_.isObject(attrs)) {
        svg.setAttributes(elem, attrs);
      }
      return elem;
    },

    setAttribute: function(v, k) {
      this.setAttribute(k, v);
    },

    /**
     * Add attributes from an svg element.
     */
    setAttributes: function(elem, attrs) {
      _.each(attrs, svg.setAttribute, elem);
      return this;
    },

    removeAttribute: function(v, k) {
      this.removeAttribute(k);
    },

    /**
     * Remove attributes from an svg element.
     */
    removeAttributes: function(elem, attrs) {
      _.each(attrs, svg.removeAttribute, elem);
      return this;
    },

    /**
     * Turn a set of vertices into a string for the d property of a path
     * element. It is imperative that the string collation is as fast as
     * possible, because this call will be happening multiple times a
     * second.
     */
    toString: function(points, closed) {

      var l = points.length,
        last = l - 1,
        d;  // The elusive last Two.Commands.move point

      return _.map(points, function(b, i) {

        var command;
        var prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
        var next = closed ? mod(i + 1, l) : Math.min(i + 1, last);

        var a = points[prev];
        var c = points[next];

        var vx, vy, ux, uy, ar, bl, br, cl;

        var x = b.x.toFixed(3);
        var y = b.y.toFixed(3);

        switch (b._command) {

          case Two.Commands.close:
            command = Two.Commands.close;
            break;

          case Two.Commands.curve:

            ar = (a.controls && a.controls.right) || a;
            bl = (b.controls && b.controls.left) || b;

            if (a._relative) {
              vx = (ar.x + a.x).toFixed(3);
              vy = (ar.y + a.y).toFixed(3);
            } else {
              vx = ar.x.toFixed(3);
              vy = ar.y.toFixed(3);
            }

            if (b._relative) {
              ux = (bl.x + b.x).toFixed(3);
              uy = (bl.y + b.y).toFixed(3);
            } else {
              ux = bl.x.toFixed(3);
              uy = bl.y.toFixed(3);
            }

            command = ((i === 0) ? Two.Commands.move : Two.Commands.curve) +
              ' ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
            break;

          case Two.Commands.move:
            d = b;
            command = Two.Commands.move + ' ' + x + ' ' + y;
            break;

          default:
            command = b._command + ' ' + x + ' ' + y;

        }

        // Add a final point and close it off

        if (i >= last && closed) {

          if (b._command === Two.Commands.curve) {

            // Make sure we close to the most previous Two.Commands.move
            c = d;

            br = (b.controls && b.controls.right) || b;
            cl = (c.controls && c.controls.left) || c;

            if (b._relative) {
              vx = (br.x + b.x).toFixed(3);
              vy = (br.y + b.y).toFixed(3);
            } else {
              vx = br.x.toFixed(3);
              vy = br.y.toFixed(3);
            }

            if (c._relative) {
              ux = (cl.x + c.x).toFixed(3);
              uy = (cl.y + c.y).toFixed(3);
            } else {
              ux = cl.x.toFixed(3);
              uy = cl.y.toFixed(3);
            }

            x = c.x.toFixed(3);
            y = c.y.toFixed(3);

            command +=
              ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
          }

          command += ' Z';

        }

        return command;

      }).join(' ');

    },

    group: {

      // TODO: Can speed up.
      appendChild: function(id) {
        var elem = this.domElement.querySelector('#' + id);
        if (elem) {
          this.elem.appendChild(elem);
        }
      },

      // TODO: Can speed up.
      removeChild: function(id) {
        var elem = this.elem.querySelector('#' + id);
        if (elem) {
          this.elem.removeChild(elem);
        }
      },

      renderChild: function(child) {
        svg[child._renderer.type].render.call(child, this);
      },

      render: function(domElement) {

        this._update();

        if (!this._renderer.elem) {
          this._renderer.elem = svg.createElement('g', {
            id: this.id
          });
          domElement.appendChild(this._renderer.elem);
        }

        // _Update styles for the <g>
        var flagMatrix = this._matrix.manual || this._flagMatrix;
        var context = {
          domElement: domElement,
          elem: this._renderer.elem
        };

        if (flagMatrix) {
          this._renderer.elem.setAttribute('transform', 'matrix(' + this._matrix.toString() + ')');
        }

        for (var id in this.children) {
          svg.group.renderChild.call(domElement, this.children[id]);
        }

        if (this._flagAdditions) {
          _.each(this.additions, svg.group.appendChild, context);
        }

        if (this._flagSubtractions) {
          _.each(this.subtractions, svg.group.removeChild, context);
        }

        return this.flagReset();

      }

    },

    polygon: {

      render: function(domElement) {

        this._update();

        if (!this._renderer.elem) {
          this._renderer.elem = svg.createElement('path', {
            id: this.id
          });
          domElement.appendChild(this._renderer.elem);
        }

        var elem = this._renderer.elem;
        var flagMatrix = this._matrix.manual || this._flagMatrix;

        if (flagMatrix) {
          elem.setAttribute('transform', 'matrix(' + this._matrix.toString() + ')');
        }

        if (this._flagVertices) {
          var vertices = svg.toString(this._vertices, this._closed);
          elem.setAttribute('d', vertices);
        }

        if (this._flagFill) {
          elem.setAttribute('fill', this._fill);
        }

        if (this._flagStroke) {
          elem.setAttribute('stroke', this._stroke);
        }

        if (this._flagLinewidth) {
          elem.setAttribute('stroke-width', this._linewidth);
        }

        if (this._flagOpacity) {
          elem.setAttribute('stroke-opacity', this._opacity);
          elem.setAttribute('fill-opacity', this._opacity);
        }

        if (this._flagVisible) {
          elem.setAttribute('visibility', this._visible ? 'visible' : 'hidden');
        }

        if (this._flagCap) {
          elem.setAttribute('stroke-linecap', this._cap);
        }

        if (this._flagJoin) {
          elem.setAttribute('stroke-linejoin', this._join);
        }

        if (this._flagMiter) {
          elem.setAttribute('stroke-miterlimit', this.miter);
        }

        return this.flagReset();

      }

    }

  };

  /**
   * @class
   */
  var Renderer = Two[Two.Types.svg] = function(params) {

    this.domElement = params.domElement || svg.createElement('svg');

    this.scene = new Two.Group();
    this.scene._renderer.elem = this.domElement;
    this.scene.parent = this;

  };

  _.extend(Renderer, {

    Utils: svg

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

    render: function() {

      svg.group.render.call(this.scene, this.domElement);

      return this;

    }

  });

})();
