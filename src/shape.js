(function(Two) {

  var Shape = Two.Shape = function() {

    // Private object for renderer specific variables.
    this._renderer = {};

    this.id = Two.Identifier + Two.uniqueId();
    this.classList = [];

    // Define matrix properties which all inherited
    // objects of Shape have.

    this._matrix = new Two.Matrix();

    this.translation = new Two.Vector();
    this.translation.bind(Two.Events.change, _.bind(Shape.FlagMatrix, this));
    this.rotation = 0;
    this.scale = 1;

  };

  _.extend(Shape, Backbone.Events, {

    FlagMatrix: function() {
      this._flagMatrix = true;
    },

    MakeObservable: function(object) {

      Object.defineProperty(object, 'rotation', {
        get: function() {
          return this._rotation;
        },
        set: function(v) {
          this._rotation = v;
          this._flagMatrix = true;
        }
      });

      Object.defineProperty(object, 'scale', {
        get: function() {
          return this._scale;
        },
        set: function(v) {
          this._scale = v;
          this._flagMatrix = true;
          this._flagScale = true;
        }
      });

    }

  });

  _.extend(Shape.prototype, {

    // Flags

    _flagMatrix: true,

    // _flagMask: false,
    // _flagClip: false,

    // Underlying Properties

    _rotation: 0,
    _scale: 1,

    // _mask: null,
    // _clip: false,

    addTo: function(group) {
      group.add(this);
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
      return clone._update();
    },

    /**
     * Set the parent of this object to another object
     * and updates parent-child relationships
     * Calling with no arguments will simply remove the parenting
     */
    replaceParent: function(newParent) {
        var id = this.id, index;
        // Release object from previous parent.
        if (this.parent) {
          delete this.parent.children[id];
          index = _.indexOf(parent.additions, id);
          if (index >= 0) {
            this.parent.additions.splice(index, 1);
          }
          this.parent.subtractions.push(id);
          this._flagSubtractions = true;
        }

        if (newParent) {
          // Add it to this group and update parent-child relationship.
          newParent.children[id] = this;
          this.parent = newParent;
          newParent.additions.push(id);
          newParent._flagAdditions = true;
        } else {
          delete this.parent;
        }
        return this;
    },

    /**
     * To be called before render that calculates and collates all information
     * to be as up-to-date as possible for the render. Called once a frame.
     */
    _update: function(deep) {

      if (!this._matrix.manual && this._flagMatrix) {
        this._matrix
          .identity()
          .translate(this.translation.x, this.translation.y)
          .scale(this.scale)
          .rotate(this.rotation);

      }

      if (deep) {
        // Bubble up to parents mainly for `getBoundingClientRect` method.
        if (this.parent && this.parent._update) {
          this.parent._update();
        }
      }

      return this;

    },

    flagReset: function() {

      this._flagMatrix = this._flagScale = false;

      return this;

    }

  });

  Shape.MakeObservable(Shape.prototype);

})(Two);
