(function(Two) {

  /**
   * Constants
   */
  var min = Math.min, max = Math.max;

  var Group = Two.Group = function() {

    Two.Shape.call(this, true);

    this._renderer.type = 'group';

    this.additions = [];
    this.subtractions = [];

    this.children = {};

  };

  _.extend(Group, {

    MakeObservable: function(object) {

      var properties = Two.Polygon.Properties.slice(0);
      var oi = _.indexOf(properties, 'opacity');

      if (oi >= 0) {

        properties.splice(oi, 1);

        Object.defineProperty(object, 'opacity', {

          get: function() {
            return this._opacity;
          },

          set: function(v) {
            this._opacity = v;
            this._flagOpacity = true;
          }

        });

      }

      Two.Shape.MakeObservable(object);
      Group.MakeGetterSetters(object, properties);

      Object.defineProperty(object, 'mask', {
        get: function() {
          return this._mask;
        },
        set: function(v) {
          this._mask = v;
          this._flagMask = true;
          if (!v.clip) {
            v.clip = true;
          }
        }
      });

    },

    MakeGetterSetters: function(group, properties) {

      if (!_.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {
        Group.MakeGetterSetter(group, k);
      });

    },

    MakeGetterSetter: function(group, k) {

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

    }

  });

  _.extend(Group.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    _flagAdditions: false,
    _flagSubtractions: false,
    _flagOpacity: true,

    _flagMask: false,

    // Underlying Properties

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

    _mask: null,

    /**
     * TODO: Group has a gotcha in that it's at the moment required to be bound to
     * an instance of two in order to add elements correctly. This needs to
     * be rethought and fixed.
     */
    clone: function(parent) {

      parent = parent || this.parent;

      var group = new Group();
      parent.add(group);

      var children = _.map(this.children, function(child) {
        return child.clone(group);
      });

      group.translation.copy(this.translation);
      group.rotation = this.rotation;
      group.scale = this.scale;

      return group;

    },

    toObject: function() {

      var result = {
        children: {},
        translation: this.translation.toObject(),
        rotation: this.rotation,
        scale: this.scale
      };

      _.each(this.children, function(child, i) {
        result.children[i] = child.toObject();
      }, this);

      return result;

    },

    /**
     * Anchor all children to the upper left hand corner
     * of the group.
     */
    corner: function() {

      var rect = this.getBoundingClientRect(true),
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
     * Recursively search for id. Returns the first element found.
     * Returns null if none found.
     */
    getById: function (id) {
      var search = function (node, id) {
        if (node.id === id) {
          return node;
        }
        for (var child in node.children) {
          var found = search(node.children[child], id);
          if (found) return found;
        }
      };
      return search(this, id) || null;
    },

    /**
     * Recursively search for classes. Returns an array of matching elements.
     * Empty array if none found.
     */
    getByClassName: function (cl) {
      var found = [];
      var search = function (node, cl) {
        if (node.classList.indexOf(cl) != -1) {
          found.push(node);
        }
        for (var child in node.children) {
          search(node.children[child], cl);
        }
        return found;
      };
      return search(this, cl);
    },

    /**
     * Recursively search for children of a specific type,
     * e.g. Two.Polygon. Pass a reference to this type as the param.
     * Returns an empty array if none found.
     */
    getByType: function(type) {
      var found = [];
      var search = function (node, type) {
        for (var id in node.children) {
          if (node.children[id] instanceof type) {
            found.push(node.children[id]);
          } else if (node.children[id] instanceof Two.Group) {
            search(node.children[id], type);
          }
        }
        return found;
      };
      return search(this, type);
    },

    /**
     * Add objects to the group.
     */
    add: function(objects) {

      var l = arguments.length,
        children = this.children,
        grandparent = this.parent,
        ids = this.additions,
        id, parent, index;

      if (!_.isArray(objects)) {
        objects = _.toArray(arguments);
      }

      // Add the objects

      _.each(objects, function(object) {

        if (!object) {
          return;
        }

        id = object.id;
        parent = object.parent;

        if (_.isUndefined(children[id])) {
          // Release object from previous parent.
          if (parent) {
            delete parent.children[id];
            index = _.indexOf(parent.additions, id);
            if (index >= 0) {
              parent.additions.splice(index, 1);
            }
          }
          // Add it to this group and update parent-child relationship.
          children[id] = object;
          object.parent = this;
          ids.push(id);
          this._flagAdditions = true;
        }

      }, this);

      return this;

    },

    /**
     * Remove objects from the group.
     */
    remove: function(objects) {

      var l = arguments.length,
        children = this.children,
        grandparent = this.parent,
        ids = this.subtractions,
        id, parent, index, grandchildren;

      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }

      if (!_.isArray(objects)) {
        objects = _.toArray(arguments);
      }

      _.each(objects, function(object) {

        id = object.id;
        grandchildren = object.children;
        parent = object.parent;

        if (!(id in children)) {
          return;
        }

        delete children[id];
        delete object.parent;

        index = _.indexOf(parent.additions, id);
        if (index >= 0) {
          parent.additions.splice(index, 1);
        }

        ids.push(id);
        this._flagSubtractions = true;

      }, this);

      return this;

    },

    /**
     * Return an object with top, left, right, bottom, width, and height
     * parameters of the group.
     */
    getBoundingClientRect: function() {
      var rect;

      // TODO: Update this to not __always__ update. Just when it needs to.
      this._update(true);

      // Variables need to be defined here, because of nested nature of groups.
      var left = Infinity, right = -Infinity,
          top = Infinity, bottom = -Infinity;

      _.each(this.children, function(child) {

        rect = child.getBoundingClientRect();

        if (!_.isNumber(rect.top)   || !_.isNumber(rect.left)   ||
            !_.isNumber(rect.right) || !_.isNumber(rect.bottom)) {
          return;
        }

        top = min(rect.top, top);
        left = min(rect.left, left);
        right = max(rect.right, right);
        bottom = max(rect.bottom, bottom);

      }, this);

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
      var args = arguments;
      _.each(this.children, function(child) {
        child.subdivide.apply(child, args);
      });
      return this;
    },

    flagReset: function() {

      if (this._flagAdditions) {
        this.additions.length = 0;
        this._flagAdditions = false;
      }

      if (this._flagSubtractions) {
        this.subtractions.length = 0;
        this._flagSubtractions = false;
      }

      this._flagMask = this._flagOpacity = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Group.MakeObservable(Group.prototype);

})(Two);
