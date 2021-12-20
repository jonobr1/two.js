import { subdivide } from '../utils/curves.js';
import { getIdByLength } from '../utils/shape.js';
import { _ } from '../utils/underscore.js';

import { Collection } from '../collection.js';
import { Events } from '../events.js';
import { Vector } from '../vector.js';
import { Shape } from '../shape.js';
import {
  Path,
  FlagVertices, BindVertices, UnbindVertices, FlagFill, FlagStroke
} from '../path.js';

import { Gradient } from '../effects/gradient.js';
import { LinearGradient } from '../effects/linear-gradient.js';
import { RadialGradient } from '../effects/radial-gradient.js';
import { Texture } from '../effects/texture.js';

const ceil = Math.ceil,
      floor = Math.floor;

/**
 * @name Two.Points
 * @class
 * @extends Two.Shape
 * @param {Two.Vector[]} [vertices] - A list of {@link Two.Vector}s that represent the order and coordinates to construct a rendered set of points.
 * @description This is a primary primitive class for quickly and easily drawing points in Two.js. Unless specified methods return their instance of `Two.Points` for the purpose of chaining.
 */
export class Points extends Shape {

  _flagVertices = true;
  _flagLength = true;
  _flagFill = true;
  _flagStroke = true;
  _flagLinewidth = true;
  _flagOpacity = true;
  _flagVisible = true;
  _flagSize = true;
  _flagSizeAttenuation = true;

  _length = 0;
  _fill = '#fff';
  _stroke = '#000';
  _linewidth = 1;
  _opacity = 1.0;
  _visible = true;
  _size = 1;
  _sizeAttenuation = false;
  _beginning = 0;
  _ending = 1.0;
  _dashes = null;

  constructor(vertices) {

    super();

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    this._renderer.type = 'points';
    this._renderer.flagVertices = FlagVertices.bind(this);
    this._renderer.bindVertices = BindVertices.bind(this);
    this._renderer.unbindVertices = UnbindVertices.bind(this);

    this._renderer.flagFill = FlagFill.bind(this);
    this._renderer.flagStroke = FlagStroke.bind(this);
    this._renderer.vertices = null;
    this._renderer.collection = null;

    /**
     * @name Two.Points#sizeAttenuation
     * @property {Boolean} - Boolean dictating whether Two.js should scale the size of the points based on its matrix hierarcy.
     * @description Set to `true` if you'd like the size of the points to be relative to the scale of its parents; `false` to disregard. Default is `false`.
     */
    this.sizeAttenuation = false;

    /**
     * @name Two.Points#beginning
     * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
     * @description {@link Two.Points#beginning} is a percentage value that represents at what percentage into the path should the renderer start drawing.
     */
    this.beginning = 0;

    /**
     * @name Two.Points#ending
     * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
     * @description {@link Two.Points#ending} is a percentage value that represents at what percentage into the path should the renderer start drawing.
     */
    this.ending = 1;

    // Style properties

    /**
     * @name Two.Points#fill
     * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    this.fill = '#fff';

    /**
     * @name Two.Points#stroke
     * @property {(String|Two.Gradient|Two.Texture)} - The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    this.stroke = '#000';

    /**
     * @name Two.Points#className
     * @property {String} - A class to be applied to the element to be compatible with CSS styling.
     * @nota-bene Only available for the SVG renderer.
     */
    this.className = '';

    /**
     * @name Two.Points#visible
     * @property {Boolean} - Display the points or not.
     * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
     */
    this.visible = true;

    /**
     * @name Two.Points#vertices
     * @property {Two.Vector[]} - An ordered list of vector points for rendering points.
     * @description A list of {@link Two.Vector} objects that consist of which coordinates to draw points at.
     * @nota-bene The array when manipulating is actually a {@link Two.Collection}.
     */
    this.vertices = vertices;

    /**
     * @name Two.Points#dashes
     * @property {Number[]} - Array of numbers. Odd indices represent dash length. Even indices represent dash space.
     * @description A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
     */
    this.dashes = [];

    /**
     * @name Two.Points#dashes#offset
     * @property {Number} - A number in pixels to offset {@link Two.Points#dashes} display.
     */
    this.dashes.offset = 0;

  }

  static Properties = [
    'fill',
    'stroke',
    'linewidth',
    'opacity',
    'visible',
    'size',
    'sizeAttenuation',
    'beginning',
    'ending'
  ];

  /**
   * @name Two.Points#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Points}
   * @description Create a new instance of {@link Two.Points} with the same properties of the current path.
   */
  clone(parent) {

    const clone = new Points();

    for (let j = 0; j < this.vertices.length; j++) {
      clone.vertices.push(this.vertices[j].clone());
    }

    for (let i = 0; i < Points.Properties.length; i++) {
      const k = Points.Properties[i];
      clone[k] = this[k];
    }

    clone.className = this.className;

    clone.translation.copy(this.translation);
    clone.rotation = this.rotation;
    clone.scale = this.scale;
    clone.skewX = this.skewX;
    clone.skewY = this.skewY;

    if (this.matrix.manual) {
      clone.matrix.copy(this.matrix);
    }

    if (parent) {
      parent.add(clone);
    }

    return clone._update();

  }

  /**
   * @name Two.Points#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the points object.
   */
  toObject() {

    const result = {
      vertices: this.vertices.map(function(v) {
        return v.toObject();
      })
    };

    _.each(Points.Properties, function(k) {
      result[k] = this[k];
    }, this);

    result.className = this.className;

    result.translation = this.translation.toObject();
    result.rotation = this.rotation;
    result.scale = this.scale instanceof Vector ? this.scale.toObject() : this.scale;
    result.skewX = this.skewX;
    result.skewY = this.skewY;

    if (this.matrix.manual) {
      result.matrix = this.matrix.toObject();
    }

    return result;

  }

  /**
   * @name Two.Points#noFill
   * @function
   * @description Short hand method to set fill to `transparent`.
   */
  noFill = Path.prototype.noFill;

  /**
   * @name Two.Points#noStroke
   * @function
   * @description Short hand method to set stroke to `transparent`.
   */
  noStroke = Path.prototype.noStroke;

  /**
   * @name Two.Points#corner
   * @function
   * @description Orient the vertices of the shape to the upper left-hand corner of the points object.
   */
  corner = Path.prototype.corner;

  /**
   * @name Two.Points#center
   * @function
   * @description Orient the vertices of the shape to the center of the points object.
   */
  center = Path.prototype.center;

  /**
   * @name Two.Points#getBoundingClientRect
   * @function
   * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
   * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
   * @description Return an object with top, left, right, bottom, width, and height parameters of the path.
   */
  getBoundingClientRect = Path.prototype.getBoundingClientRect;

  /**
   * @name Two.Points#subdivide
   * @function
   * @param {Number} limit - How many times to recurse subdivisions.
   * @description Insert a {@link Two.Vector} at the midpoint between every item in {@link Two.Points#vertices}.
   */
  subdivide(limit) {
    // TODO: DRYness (function below)
    this._update();
    let points = [];
    for (let i = 0; i < this.vertices.length; i++) {

      const a = this.vertices[i];
      const b = this.vertices[i - 1];

      if (!b) {
        continue;
      }

      const x1 = a.x;
      const y1 = a.y;
      const x2 = b.x;
      const y2 = b.y;
      const subdivisions = subdivide(x1, y1, x1, y1, x2, y2, x2, y2, limit);

      points = points.concat(subdivisions);

    }

    this.vertices = points;
    return this;

  }

  /**
   * @name Two.Points#_updateLength
   * @function
   * @private
   * @param {Number} [limit] -
   * @param {Boolean} [silent=false] - If set to `true` then the points object isn't updated before calculation. Useful for internal use.
   * @description Recalculate the {@link Two.Points#length} value.
   */
  _updateLength = Path.prototype._updateLength;

  /**
   * @name Two.Points#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update() {

    if (this._flagVertices) {

      if (this._flagLength) {
        this._updateLength(undefined, true);
      }

      const beginning = Math.min(this._beginning, this._ending);
      const ending = Math.max(this._beginning, this._ending);

      const bid = getIdByLength(this, beginning * this._length);
      const eid = getIdByLength(this, ending * this._length);

      const low = ceil(bid);
      const high = floor(eid);

      let j = 0, v;

      this._renderer.vertices = [];
      this._renderer.collection = [];

      for (let i = 0; i < this._collection.length; i++) {

        if (i >= low && i <= high) {
          v = this._collection[i];
          this._renderer.collection.push(v);
          this._renderer.vertices[j * 2 + 0] = v.x;
          this._renderer.vertices[j * 2 + 1] = v.y;
          j++;
        }

      }

    }

    super._update.apply(this, arguments);

    return this;

  }

  /**
   * @name Two.Points#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {

    this._flagVertices = this._flagLength = this._flagFill =  this._flagStroke =
      this._flagLinewidth = this._flagOpacity = this._flagVisible =
      this._flagSize = this._flagSizeAttenuation = false;

    super.flagReset.call(this);

    return this;

  }

}

const proto = {

  linewidth: {
    enumerable: true,
    get: function() {
      return this._linewidth;
    },
    set: function(v) {
      this._linewidth = v;
      this._flagLinewidth = true;
    }
  },
  opacity: {
    enumerable: true,
    get: function() {
      return this._opacity;
    },
    set: function(v) {
      this._opacity = v;
      this._flagOpacity = true;
    }
  },
  visible: {
    enumerable: true,
    get: function() {
      return this._visible;
    },
    set: function(v) {
      this._visible = v;
      this._flagVisible = true;
    }
  },
  size: {
    enumerable: true,
    get: function() {
      return this._size;
    },
    set: function(v) {
      this._size = v;
      this._flagSize = true;
    }
  },
  sizeAttenuation: {
    enumerable: true,
    get: function() {
      return this._sizeAttenuation;
    },
    set: function(v) {
      this._sizeAttenuation = v;
      this._flagSizeAttenuation = true;
    }
  },

  fill: {
    enumerable: true,
    get: function() {
      return this._fill;
    },
    set: function(f) {

      if (this._fill instanceof Gradient
        || this._fill instanceof LinearGradient
        || this._fill instanceof RadialGradient
        || this._fill instanceof Texture) {
        this._fill.unbind(Events.Types.change, this._renderer.flagFill);
      }

      this._fill = f;
      this._flagFill = true;

      if (this._fill instanceof Gradient
        || this._fill instanceof LinearGradient
        || this._fill instanceof RadialGradient
        || this._fill instanceof Texture) {
        this._fill.bind(Events.Types.change, this._renderer.flagFill);
      }

    }
  },

  stroke: {
    enumerable: true,
    get: function() {
      return this._stroke;
    },
    set: function(f) {

      if (this._stroke instanceof Gradient
        || this._stroke instanceof LinearGradient
        || this._stroke instanceof RadialGradient
        || this._stroke instanceof Texture) {
        this._stroke.unbind(Events.Types.change, this._renderer.flagStroke);
      }

      this._stroke = f;
      this._flagStroke = true;

      if (this._stroke instanceof Gradient
        || this._stroke instanceof LinearGradient
        || this._stroke instanceof RadialGradient
        || this._stroke instanceof Texture) {
        this._stroke.bind(Events.Types.change, this._renderer.flagStroke);
      }

    }
  },

  /**
   * @name Two.Points#length
   * @property {Number} - The sum of distances between all {@link Two.Points#vertices}.
   */
  length: {
    get: function() {
      if (this._flagLength) {
        this._updateLength();
      }
      return this._length;
    }
  },

  beginning: {
    enumerable: true,
    get: function() {
      return this._beginning;
    },
    set: function(v) {
      this._beginning = v;
      this._flagVertices = true;
    }
  },

  ending: {
    enumerable: true,
    get: function() {
      return this._ending;
    },
    set: function(v) {
      this._ending = v;
      this._flagVertices = true;
    }
  },

  vertices: {

    enumerable: true,

    get: function() {
      return this._collection;
    },

    set: function(vertices) {

      const bindVertices = this._renderer.bindVertices;
      const unbindVertices = this._renderer.unbindVertices;

      // Remove previous listeners
      if (this._collection) {
        this._collection
          .unbind(Events.Types.insert, bindVertices)
          .unbind(Events.Types.remove, unbindVertices);
      }

      // Create new Collection with copy of vertices
      if (vertices instanceof Collection) {
        this._collection = vertices;
      } else {
        this._collection = new Collection(vertices || []);
      }


      // Listen for Collection changes and bind / unbind
      this._collection
        .bind(Events.Types.insert, bindVertices)
        .bind(Events.Types.remove, unbindVertices);

      // Bind Initial Vertices
      bindVertices(this._collection);

    }

  },

  dashes: {
    enumerable: true,
    get: function() {
      return this._dashes;
    },
    set: function(v) {
      if(typeof v.offset !== 'number') {
        v.offset = (this.dashes && this._dashes.offset) || 0;
      }
      this._dashes = v;
    }
  }

};
