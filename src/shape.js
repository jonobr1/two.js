(function() {

  var Shape = Two.Shape = function(limited) {

    // Define matrix properties which all inherited
    // objects of Shape have.

    this._matrix = new Two.Matrix();

    var updateMatrix = _.debounce(_.bind(function() {
      var transform = this._matrix
        .identity()
        .translate(this.translation.x, this.translation.y)
        .scale(this.scale)
        .rotate(this.rotation);
      this.trigger(Two.Events.change, this.id, 'matrix', transform, this.scale);
    }, this), 0);

    this._rotation = 'rotation';

    Object.defineProperty(this, 'rotation', {
      get: function() {
        return this._rotation;
      },
      set: function(v) {
        this._rotation = v;
        updateMatrix();
      }
    });

    this._scale = 'scale';

    Object.defineProperty(this, 'scale', {
      get: function() {
        return this._scale;
      },
      set: function(v) {
        this._scale = v;
        updateMatrix();
      }
    });

    this.translation = new Two.Vector();
    this.rotation = 0.0;
    this.scale = 1.0;

    this.translation.bind(Two.Events.change, updateMatrix);

    if (!!limited) {
      return this;
    }

    // Style properties

    Shape.MakeGetterSetter(this, Shape.Properties);

    this.fill = '#fff';
    this.stroke = '#000';
    this.linewidth = 1.0;
    this.opacity = 1.0;
    this.visible = true;

    this.cap = 'round';
    this.join = 'round';
    this.miter = 1;

  };

  _.extend(Shape, {

    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'opacity',
      'visible',
      'cap',
      'join',
      'miter'
    ],

    MakeGetterSetter: function(shape, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {

        var secret = '_' + k;

        Object.defineProperty(shape, k, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this.trigger(Two.Events.change, this.id, k, v, this);
          }
        });

      });

    }

  });

  _.extend(Shape.prototype, Backbone.Events, {

    addTo: function(group) {
      group.add(this);
      return this;
    },

    noFill: function() {
      this.fill = 'rgba(0,0,0,0)';
      return this;
    },

    noStroke: function() {
      this.stroke = 'rgba(0,0,0,0)';
      return this;
    },

    clone: function() {
      var clone = new Shape();
      clone.translation.copy(this.translation);
      _.each(Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      return this;
    }

  });

})();