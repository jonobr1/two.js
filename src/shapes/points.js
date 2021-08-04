import Commands from '../utils/path-commands.js';
import defineGetterSetter from '../utils/get-set.js';
import _ from '../utils/underscore.js';

import Collection from '../collection.js';
import Events from '../events.js';
import Vector from '../vector.js';
import Shape from '../shape.js';
import Path, { contains, getIdByLength } from '../path.js';

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
  this._renderer.vertices = [];
  this._renderer.collection = [];

  this.vertices = vertices;

}

_.extend(Points, {

  Properties: [
    'fill',
    'stroke',
    'linewidth',
    'opacity',
    'visible',
    'size',

    'beginning',
    'ending'
  ],

  MakeObservable: function(object) {

    Shape.MakeObservable(object);

    _.each(Points.Properties.slice(2, 6), defineGetterSetter, object);

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

  _length: 0,
  _fill: '#fff',
  _stroke: '#000',
  _linewidth: 1,
  _opacity: 1.0,
  _visible: true,
  _size: 1,
  _beginning: 0,
  _ending: 1,

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

      var l = this._collection.length;

      var beginning = Math.min(this._beginning, this._ending);
      var ending = Math.max(this._beginning, this._ending);

      var bid = getIdByLength(this, beginning * this._length);
      var eid = getIdByLength(this, ending * this._length);

      var low = ceil(bid);
      var high = floor(eid);

      var left, right, prev, next, v;

      this._renderer.vertices.length = 0;

      for (var i = 0; i < l; i++) {

        if (this._renderer.collection.length <= i) {
          this._renderer.collection.push(new Vector());
        }

        if (i > high && !right) {

          v = this._renderer.collection[i];
          v.copy(this._collection[i]);
          this.getPointAt(ending, v);
          v.command = this._renderer.collection[i].command;
          this._renderer.vertices.push(v);

          right = v;
          prev = this._collection[i - 1];

        } else if (i >= low && i <= high) {

          v = this._renderer.collection[i]
            .copy(this._collection[i]);
          this._renderer.vertices.push(v);

          if (i === high && contains(this, ending)) {
            right = v;
          } else if (i === low && contains(this, beginning)) {
            left = v;
            left.command = Commands.move;
          }

        }

      }

      // Prepend the trimmed point if necessary.
      if (low > 0 && !left) {

        i = low - 1;

        v = this._renderer.collection[i];
        v.copy(this._collection[i]);
        this.getPointAt(beginning, v);
        v.command = Commands.move;
        this._renderer.vertices.unshift(v);

        left = v;
        next = this._collection[i + 1];

      }

    }

    Shape.prototype._update.apply(this, arguments);

    return this;

  }

});

Points.MakeObservable(Points.prototype);

export default Points;
