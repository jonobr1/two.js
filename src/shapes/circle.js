import Commands from '../utils/path-commands.js';
import defineGetterSetter from '../utils/get-set.js';
import _ from '../utils/underscore.js';

import Path from '../path.js';
import Anchor from '../anchor.js';

var TWO_PI = Math.PI * 2, HALF_PI = Math.PI / 2;
var cos = Math.cos, sin = Math.sin;

/**
 * @name Two.Circle
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the circle.
 * @param {Number} [y=0] - The y position of the circle.
 * @param {Number} radius - The radius value of the circle.
 * @param {Number} [resolution=4] - The number of vertices used to construct the circle.
 */
function Circle(ox, oy, r, resolution) {

  // At least 2 vertices are required for proper circlage
  var amount = resolution ? Math.max(resolution, 2) : 4;

  var points = [];
  for (var i = 0; i < amount; i++) {
    points.push(new Anchor());
  }

  Path.call(this, points, true, true, true);

  /**
   * @name Two.Circle#radius
   * @property {Number} - The size of the radius of the circle.
   */
  this.radius = r;

  this._update();

  if (typeof ox === 'number') {
    this.translation.x = ox;
  }
  if (typeof oy === 'number') {
    this.translation.y = oy;
  }

}

_.extend(Circle, {

  /**
   * @name Two.Circle.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Circle}.
   */
  Properties: ['radius'],

  /**
   * @name Two.Circle.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Circle} to any object. Handy if you'd like to extend the {@link Two.Circle} class on a custom class.
   */
  MakeObservable: function(obj) {

    Path.MakeObservable(obj);
    _.each(Circle.Properties, defineGetterSetter, obj);

  }

});

_.extend(Circle.prototype, Path.prototype, {

  constructor: Circle,

  /**
   * @name Two.Circle#_flagRadius
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Circle#radius} needs updating.
   */
  _flagRadius: false,

  /**
   * @name Two.Circle#_radius
   * @private
   * @see {@link Two.Circle#radius}
   */
  _radius: 0,

  /**
   * @name Two.Circle#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagRadius) {
      // Coefficient for approximating circular arcs with Bezier curves
      var c = (4 / 3) * Math.tan(Math.PI / (this.vertices.length * 2));

      var radius = this._radius;
      var rc = radius * c;

      for (var i = 0, numVertices = this.vertices.length; i < numVertices; i++) {
        var pct = i / numVertices;
        var theta = pct * TWO_PI;

        var x = radius * cos(theta);
        var y = radius * sin(theta);

        var lx = rc * cos(theta - HALF_PI);
        var ly = rc * sin(theta - HALF_PI);

        var rx = rc * cos(theta + HALF_PI);
        var ry = rc * sin(theta + HALF_PI);

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
   * @name Two.Circle#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagRadius = false;

    Path.prototype.flagReset.call(this);
    return this;

  },

  /**
   * @name Two.Circle#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Circle}
   * @description Create a new instance of {@link Two.Circle} with the same properties of the current path.
   */
  clone: function(parent) {

    var clone = new Circle(0, 0, this.radius, this.vertices.length);

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
   * @name Two.Circle#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(Circle.Properties, function(property) {
      object[property] = this[property];
    }, this);

    return object;

  }

});

Circle.MakeObservable(Circle.prototype);

export default Circle;
