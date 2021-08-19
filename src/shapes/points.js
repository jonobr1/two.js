import { NumArray } from '../utils/math.js';
import defineGetterSetter from '../utils/get-set.js';
import _ from '../utils/underscore.js';

import Collection from '../collection.js';
import Events from '../events.js';
import Vector from '../vector.js';
import Shape from '../shape.js';
import Path, { getIdByLength } from '../path.js';

import Gradient from '../effects/gradient.js';
import LinearGradient from '../effects/linear-gradient.js';
import RadialGradient from '../effects/radial-gradient.js';
import Texture from '../effects/texture.js';

var ceil = Math.ceil;
var floor = Math.floor;

function Points(vertices) {

  Shape.call(this);

  this._renderer.type = 'points';
  this._renderer.flagVertices = Path.FlagVertices.bind(this);
  this._renderer.bindVertices = Path.BindVertices.bind(this);
  this._renderer.unbindVertices = Path.UnbindVertices.bind(this);

  this._renderer.flagFill = Path.FlagFill.bind(this);
  this._renderer.flagStroke = Path.FlagStroke.bind(this);
  this._renderer.vertices = null;
  this._renderer.collection = null;

  this.vertices = vertices;

  this.dashes = [];
  this.dashes.offset = 0;

}

_.extend(Points, {

  Properties: [
    'fill',
    'stroke',
    'linewidth',
    'opacity',
    'visible',
    'size',
    'sizeAttenuation',

    'beginning',
    'ending'
  ],

  MakeObservable: function(object) {

    Shape.MakeObservable(object);

    _.each(Points.Properties.slice(2, 7), defineGetterSetter, object);

    Object.defineProperty(object, 'fill', {
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
    });

    Object.defineProperty(object, 'stroke', {
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
    });

    /**
     * @name Two.Points#length
     * @property {Number} - The sum of distances between all {@link Two.Points#vertices}.
     */
    Object.defineProperty(object, 'length', {
      get: function() {
        if (this._flagLength) {
          this._updateLength();
        }
        return this._length;
      }
    });

    Object.defineProperty(object, 'beginning', {
      enumerable: true,
      get: function() {
        return this._beginning;
      },
      set: function(v) {
        this._beginning = v;
        this._flagVertices = true;
      }
    });

    Object.defineProperty(object, 'ending', {
      enumerable: true,
      get: function() {
        return this._ending;
      },
      set: function(v) {
        this._ending = v;
        this._flagVertices = true;
      }
    });

    Object.defineProperty(object, 'vertices', {

      enumerable: true,

      get: function() {
        return this._collection;
      },

      set: function(vertices) {

        var bindVertices = this._renderer.bindVertices;
        var unbindVertices = this._renderer.unbindVertices;

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

    });

    Object.defineProperty(object, 'dashes', {
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
    });

  }

});

_.extend(Points.prototype, Shape.prototype, {

  constructor: Points,

  _flagVertices: true,
  _flagLength: true,
  _flagFill: true,
  _flagStroke: true,
  _flagLinewidth: true,
  _flagOpacity: true,
  _flagVisible: true,
  _flagSize: true,
  _flagSizeAttenuation: true,

  _length: 0,
  _fill: '#fff',
  _stroke: '#000',
  _linewidth: 1,
  _opacity: 1.0,
  _visible: true,
  _size: 1,
  _sizeAttenuation: false,
  _beginning: 0,
  _ending: 1.0,
  _dashes: null,

  clone: function(parent) {

    var clone = new Points();

    for (var j = 0; j < this.vertices.length; j++) {
      clone.vertices.push(this.vertices[j].clone());
    }

    for (var i = 0; i < Points.Properties.length; i++) {
      var k = Points.Properties[i];
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

  },

  toObject: function() {

    var result = {
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

  },

  noFill: Path.prototype.noFill,

  noStroke: Path.prototype.noStroke,

  corner: Path.prototype.corner,

  center: Path.prototype.center,

  remove: Path.prototype.remove,

  getBoundingClientRect: Path.prototype.getBoundingClientRect,

  getPointAt: Path.prototype.getPointAt,

  subdivide: Path.prototype.subdivide,

  _updateLength: Path.prototype._updateLength,

  _update: function() {

    if (this._flagVertices) {

      if (this._flagLength) {
        this._updateLength(undefined, true);
      }

      var beginning = Math.min(this._beginning, this._ending);
      var ending = Math.max(this._beginning, this._ending);

      var bid = getIdByLength(this, beginning * this._length);
      var eid = getIdByLength(this, ending * this._length);

      var low = ceil(bid);
      var high = floor(eid);

      var v;

      this._renderer.vertices = new NumArray((high - low + 1) * 2);
      this._renderer.collection = [];

      for (var i = low; i <= high; i++) {

        var j = i - low;

        v = this._collection[i];
        this._renderer.collection.push(v);
        this._renderer.vertices[j * 2 + 0] = v.x;
        this._renderer.vertices[j * 2 + 1] = v.y;

      }

    }

    Shape.prototype._update.apply(this, arguments);

    return this;

  }

});

Points.MakeObservable(Points.prototype);

export default Points;
