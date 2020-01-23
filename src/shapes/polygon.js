import Commands from '../utils/path-commands';
import defineGetterSetter from '../utils/get-set';
import _ from '../utils/dash';

import Path from '../path';
import Anchor from '../anchor';

var TWO_PI = Math.PI * 2, cos = Math.cos, sin = Math.sin;

/**
 * @name Two.Polygon
 * @class
 * @extends Two.Path
 * @param {Number} [x=0] - The x position of the polygon.
 * @param {Number} [y=0] - The y position of the polygon.
 * @param {Number} radius - The radius value of the polygon.
 * @param {Number} [sides=12] - The number of vertices used to construct the polygon.
 */
var Polygon = function(ox, oy, r, sides) {

  sides = Math.max(sides || 0, 3);

  Path.call(this);

  this.closed = true;
  this.automatic = false;

  /**
   * @name Two.Polygon#width
   * @property {Number} - The size of the width of the polygon.
   */
  this.width = r * 2;
  /**
   * @name Two.Polygon#height
   * @property {Number} - The size of the height of the polygon.
   */
  this.height = r * 2;
  /**
   * @name Two.Polygon#sides
   * @property {Number} - The amount of sides the polyogn has.
   */
  this.sides = sides;

  this._update();
  this.translation.set(ox, oy);

};

_.extend(Polygon, {

  /**
   * @name Two.Polygon.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Polygon}.
   */
  Properties: ['width', 'height', 'sides'],

  /**
   * @name Two.Polygon.MakeObservable
   * @function
   * @param {Object} object - The object to make observable.
   * @description Convenience function to apply observable qualities of a {@link Two.Polygon} to any object. Handy if you'd like to extend the {@link Two.Polygon} class on a custom class.
   */
  MakeObservable: function(obj) {

    Path.MakeObservable(obj);
    _.each(Polygon.Properties, defineGetterSetter, obj);

  }

});

_.extend(Polygon.prototype, Path.prototype, {

  /**
   * @name Two.Polygon#_flagWidth
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Polygon#width} needs updating.
   */
  _flagWidth: false,
  /**
   * @name Two.Polygon#_flagHeight
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Polygon#height} needs updating.
   */
  _flagHeight: false,
  /**
   * @name Two.Polygon#_flagSides
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Polygon#sides} needs updating.
   */
  _flagSides: false,

  /**
   * @name Two.Polygon#_width
   * @private
   * @see {@link Two.Polygon#width}
   */
  _width: 0,
  /**
   * @name Two.Polygon#_height
   * @private
   * @see {@link Two.Polygon#height}
   */
  _height: 0,
  /**
   * @name Two.Polygon#_sides
   * @private
   * @see {@link Two.Polygon#sides}
   */
  _sides: 0,

  constructor: Polygon,

  /**
   * @name Two.Polygon#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update: function() {

    if (this._flagWidth || this._flagHeight || this._flagSides) {

      var sides = this._sides;
      var amount = sides + 1;
      var length = this.vertices.length;

      if (length > sides) {
        this.vertices.splice(sides - 1, length - sides);
        length = sides;
      }

      for (var i = 0; i < amount; i++) {

        var pct = (i + 0.5) / sides;
        var theta = TWO_PI * pct + Math.PI / 2;
        var x = this._width * cos(theta) / 2;
        var y = this._height * sin(theta) / 2;

        if (i >= length) {
          this.vertices.push(new Anchor(x, y));
        } else {
          this.vertices[i].set(x, y);
        }

        this.vertices[i].command = i === 0
          ? Commands.move : Commands.line;

      }

    }

    Path.prototype._update.call(this);
    return this;

  },

  /**
   * @name Two.Polygon#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset: function() {

    this._flagWidth = this._flagHeight = this._flagSides = false;
    Path.prototype.flagReset.call(this);

    return this;

  },

  /**
   * @name Two.Polygon#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Polygon}
   * @description Create a new instance of {@link Two.Polygon} with the same properties of the current path.
   */
  clone: function(parent) {

    var clone = new Polygon(0, 0, this.radius, this.sides);

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;

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
   * @name Two.Polygon#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the path.
   */
  toObject: function() {

    var object = Path.prototype.toObject.call(this);

    _.each(Polygon.Properties, function(property) {
      object[property] = this[property];
    }, this);

    return object;

  }

});

Polygon.MakeObservable(Polygon.prototype);

export default Polygon;