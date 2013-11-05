(function() {

  /**
   * Constants
   */
  var min = Math.min, max = Math.max;

  // Localized variables
  var secret, parent, children, group, rect, corner, l, objects, grandparent,
    ids, id, left, right, top, bottom, matrix, a, b, c, d;

  var Group = Two.Group = function(o) {

    Two.Shape.call(this, true);

    this.children = {};

  };

  _.extend(Group, {

    MakeGetterSetter: function(group, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {

        secret = '_' + k;

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
     * Underlying Properties
     */

    _fill: '#fff',
    _stroke: '#000',
    _linewidth: 1.0,
    _opacity: 1.0,
    _visible: true,

    _cap: 'round',
    _join: 'round',
    _miter: 4,

    _closed: true,
    _curved: false,
    _automatic: true,
    _beginning: 0,
    _ending: 1.0,

    /**
     * Group has a gotcha in that it's at the moment required to be bound to
     * an instance of two in order to add elements correctly. This needs to
     * be rethought and fixed.
     */
    clone: function(parent) {

      parent = parent || this.parent;

      children = _.map(this.children, function(child) {
        return child.clone();
      });

      group = new Group();
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

      rect = this.getBoundingClientRect(true);
      corner = { x: rect.left, y: rect.top };

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

      rect = this.getBoundingClientRect(true);

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

      l = arguments.length,
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

        id = object.id, parent = object.parent;

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

      l = arguments.length,
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

        id = object.id, grandchildren = object.children;

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

      left = Infinity, right = -Infinity;
      top = Infinity, bottom = -Infinity;

      _.each(this.children, function(child) {

        rect = child.getBoundingClientRect(true);

        if (!_.isNumber(rect.top) || !_.isNumber(rect.left)
          || !_.isNumber(rect.right) || !_.isNumber(rect.bottom)) {
          return;
        }

        top = min(rect.top, top);
        left = min(rect.left, left);
        right = max(rect.right, right);
        bottom = max(rect.bottom, bottom);

      }, this);

      matrix = !!shallow ? this._matrix : Two.Utils.getComputedMatrix(this);

      a = matrix.multiply(left, top, 1);
      b = matrix.multiply(right, top, 1);
      c = matrix.multiply(right, bottom, 1);
      d = matrix.multiply(left, bottom, 1);

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

  Group.MakeGetterSetter(Group.prototype, Two.Polygon.Properties);
  Two.Shape.MakeGetterSetter(Group.prototype);

})();
