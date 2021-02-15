import Commands from '../utils/path-commands.js';
import defineGetterSetter from '../utils/get-set.js';
import _ from '../utils/underscore.js';

import Path from '../path.js';
import Anchor from '../anchor.js';

var TWO_PI = Math.PI * 2, HALF_PI = Math.PI / 2;
var cos = Math.cos, sin = Math.sin;

/**
 * @name Two.Ellipse
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the ellipse.
 * @param {Number} [y=0] - The y position of the ellipse.
 * @param {Number} rx - The radius value of the ellipse in the x direction.
 * @param {Number} ry - The radius value of the ellipse in the y direction.
 * @param {Number} [resolution=4] - The number of vertices used to construct the ellipse.
 */
var Ellipse = function(ox, oy, rx, ry, resolution) {

  if (typeof ry !== 'number') {
    ry = rx;
  }

  // At least 2 vertices are required for proper circlage
  var amount = resolution ? Math.max(resolution, 2) : 4;

  var points = [];
  for (var i = 0; i < amount; i++) {
    points.push(new Anchor());
  }

  Path.call(this, points, true, true, true);

  /**
   * @name Two.Ellipse#width
   * @property {Number} - The width of the ellipse.
   */
  this.width = rx * 2;
  /**
   * @name Two.Ellipse#height
   * @property {Number} - The height of the ellipse.
   */
  this.height = ry * 2;

  this._update();
  this.translation.set(ox, oy);

};

_.extend(Ellipse, {

  /**
   * @name Two.Ellipse.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Ellipse}.
   */
  Properties: ['width', 'height'],

  /**
   * @name Two.Ellipse.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Ellipse} to any object. Handy if you'd like to extend the {@link Two.Ellipse} class on a custom class.
   */
  MakeObservable: function(obj) {

    Path.MakeObservable(obj);
    _.each(Ellipse.Properties, defineGetterSetter, obj);

  }

});

_.extend(Ellipse.prototype, Path.prototype, {

  /**
   * @name Two.Ellipse#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Ellipse#width} needs updating.
   */
  _flagWidth: false,
  /**
   * @name Two.Ellipse#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Ellipse#height} needs updating.
   */
  _flagHeight: false,

  /**
   * @name Two.Polygon#_width
   * @private
   * @see {@link Two.Ellipse#width}
   */
  _width: 0,
  /**
   * @name Two.Polygon#_height
   * @private
   * @see {@link Two.Ellipse#height}
   */
  _height: 0,

  constructor: Ellipse,

  /**
   * @name Two.Ellipse#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagWidth || this._flagHeight) {
      // Coefficient for approximating circular arcs with Bezier curves
      var c = (4 / 3) * Math.tan(Math.PI / (this.vertices.length * 2));
      var radiusX = this._width / 2;
      var radiusY = this._height / 2;

      for (var i = 0, numVertices = this.vertices.length; i < numVertices; i++) {
        var pct = i / numVertices;
        var theta = pct * TWO_PI;

        var x = radiusX * cos(theta);
        var y = radiusY * sin(theta);

        var lx = radiusX * c * cos(theta - HALF_PI);
        var ly = radiusY * c * sin(theta - HALF_PI);

        var rx = radiusX * c * cos(theta + HALF_PI);
        var ry = radiusY * c * sin(theta + HALF_PI);

        var v = this.vertices[i];

        v.command = Commands.curve;
        v.set(x, y);
        v.controls.left.set(lx, ly);
        v.controls.right.set(rx, ry);
      }
    }

    Path.prototype._update.call(this);
    return this;

  },

  /**
   * @name Two.Ellipse#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagWidth = this._flagHeight = false;

    Path.prototype.flagReset.call(this);
    return this;

  },

  /**
   * @name Two.Ellipse#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Polygon}
   * @description Create a new instance of {@link Two.Polygon} with the same properties of the current path.
   */
  clone: function(parent) {

    var rx = this.width / 2;
    var ry = this.height / 2;
    var resolution = this.vertices.length;
    var clone = new Ellipse(0, 0, rx, ry, resolution);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    _.each(Path.Properties, function(k) {
      clone[k] = this[k];
    }, this);

    if (parent) {
      parent.add(clone);
    }

    return clone;

  },

  /**
   * @name Two.Ellipse#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(Ellipse.Properties, function(property) {
      object[property] = this[property];
    }, this);

    return object;

  }

});

Ellipse.MakeObservable(Ellipse.prototype);

export default Ellipse;