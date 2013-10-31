(function() {

  var zero = new Two.Vector();

  var Shape = Two.Shape = function(limited) {

    this.id = Two.uniqueId();

    // Define matrix properties which all inherited
    // objects of Shape have.

    this._matrix = new Two.Matrix();

    this.translation = new Two.Vector();
    this.translation.bind(this, '_flagMatrix');
    this.rotation = 0;
    this.scale = 1;

    if (!!limited) {
      return this;
    }

    // Style properties

    // Shape.MakeGetterSetter(this, Shape.Properties);

    this.fill = '#fff';
    this.stroke = '#000';
    this.linewidth = 1.0;
    this.opacity = 1.0;
    this.visible = true;

    this.cap = 'round';
    this.join = 'round';
    this.miter = 4; // Default of Adobe Illustrator

  };

  _.extend(Shape.prototype, {

    // Flags

    _flagMatrix: true,

    // Underlying Properties

    _rotation: 0,
    _scale: 1,

    addTo: function(group) {
      group.add(this);
      return this;
    },

    noFill: function() {
      this.fill = 'transparent';
      return this;
    },

    noStroke: function() {
      this.stroke = 'transparent';
      return this;
    },

    clone: function() {
      var clone = new Shape();
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      _.each(Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);
      return clone.update();
    },

    /**
     * To be called before render that calculates and collates all information
     * to be as up-to-date as possible for the render. Called once a frame.
     */
    update: function() {

      if (!this._matrix.manual && this._flagMatrix) {

        this._matrix
          .identity()
          .translate(this.translation.x, this.translation.y)
          .scale(this.scale)
          .rotate(this.rotation);

      }

      // Reset Flags

      this._flagMatrix = false;

      return this;

    }

  });

  Object.defineProperty(Shape.prototype, 'rotation', {
    get: function() {
      return this._rotation;
    },
    set: function(v) {
      this._rotation = v;
      this._flagMatrix = true;
    }
  });

  Object.defineProperty(Shape.prototype, 'scale', {
    get: function() {
      return this._scale;
    },
    set: function(v) {
      this._scale = v;
      this._flagMatrix = true;
    }
  });

})();
