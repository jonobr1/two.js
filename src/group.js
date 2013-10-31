(function() {

  /**
   * Constants
   */
  var min = Math.min, max = Math.max;

  var Group = Two.Group = function(o) {

    Two.Shape.call(this, true);

    Group.MakeGetterSetter(this, Two.Shape.Properties);

    this.children = {};

  };

  _.extend(Group, {

    MakeGetterSetter: function(group, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {

        var secret = '_' + k;

        Object.defineProperty(group, k, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            _.each(this.children, function(child) { // Trickle down styles
              child[k] = v;
            });
          }
        });

      });

    }

  });

  _.extend(Group.prototype, Two.Shape.prototype, {

    /**
     * Group has a gotcha in that it's at the moment required to be bound to
     * an instance of two in order to add elements correctly. This needs to
     * be rethought and fixed.
     */
    clone: function(parent) {

      var parent = parent || this.parent;

      var children = _.map(this.children, function(child) {
        return child.clone();
      });

      var group = new Group();
      parent.add(group);
      group.add(children);

      group.translation.copy(this.translation);
      group.rotation = this.rotation;
      group.scale = this.scale;

      return group;

    },

    /**
     * Anchor all children to the upper left hand corner
     * of the group.
     */
    corner: function() {

      var rect = this.getBoundingClientRect(true);
      var corner = { x: rect.left, y: rect.top };

      _.each(this.children, function(child) {
        child.translation.subSelf(corner);
      });

      return this;

    },

    /**
     * Anchors all children around the center of the group,
     * effectively placing the shape around the unit circle.
     */
    center: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.children, function(child) {
        child.translation.subSelf(rect.centroid);
      });

      // this.translation.copy(rect.centroid);

      return this;

    },

    /**
     * Add an object to the group.
     */
    add: function(o) {

      var l = arguments.length,
        objects = o,
        children = this.children,
        grandparent = this.parent,
        ids = [];

      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      // Add the objects

      _.each(objects, function(object) {
        if (!object) {
          return;
        }
        var id = object.id, parent = object.parent;

        if (_.isUndefined(children[id])) {
          // Release object from previous parent.
          if (parent) {
            delete parent.children[id];
          }
          // Add it to this group and update parent-child relationship.
          children[id] = object;
          object.parent = this;
          ids.push(id);
        }

      }, this);

      return this;

    },

    /**
     * Remove an object from the group.
     */
    remove: function(o) {

      var l = arguments.length,
        objects = o,
        children = this.children,
        grandparent = this.parent,
        ids = [];

      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }

      if (!_.isArray(o)) {
        objects = _.toArray(arguments);
      }

      _.each(objects, function(object) {

        var id = object.id, grandchildren = object.children;

        if (!(id in children)) {
          return;
        }

        delete children[id];
        delete object.parent;

        ids.push(id);

      });

      return this;

    },

    /**
     * Return an object with top, left, right, bottom, width, and height
     * parameters of the group.
     */
    getBoundingClientRect: function(shallow) {

      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(this.children, function(child) {

        var rect = child.getBoundingClientRect(true);

        if (!_.isNumber(rect.top) || !_.isNumber(rect.left)
          || !_.isNumber(rect.right) || !_.isNumber(rect.bottom)) {
          return;
        }

        top = min(rect.top, top);
        left = min(rect.left, left);
        right = max(rect.right, right);
        bottom = max(rect.bottom, bottom);

      }, this);

      var matrix = !!shallow ? this._matrix : Two.Utils.getComputedMatrix(this);

      var a = matrix.multiply(left, top, 1);
      var b = matrix.multiply(right, top, 1);
      var c = matrix.multiply(right, bottom, 1);
      var d = matrix.multiply(left, bottom, 1);

      top = min(a.y, b.y, c.y, d.y);
      left = min(a.x, b.x, c.x, d.x);
      right = max(a.x, b.x, c.x, d.x);
      bottom = max(a.y, b.y, c.y, d.y);

      return {
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        width: right - left,
        height: bottom - top
      };

    },

    /**
     * Trickle down of noFill
     */
    noFill: function() {
      _.each(this.children, function(child) {
        child.noFill();
      });
      return this;
    },

    /**
     * Trickle down of noStroke
     */
    noStroke: function() {
      _.each(this.children, function(child) {
        child.noStroke();
      });
      return this;
    },

    /**
     * Trickle down subdivide
     */
    subdivide: function() {
      _.each(this.children, function(child) {
        child.subdivide();
      });
      return this;
    }

  });

})();
