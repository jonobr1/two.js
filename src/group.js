(function(Two) {

  // Constants

  var min = Math.min, max = Math.max;
  var _ = Two.Utils;

  /**
   * @class
   * @name Two.Group.Children
   * @extends Two.Utils.Collection
   * @description A children collection which is accesible both by index and by object `id`.
   */
  var Children = function() {

    Two.Utils.Collection.apply(this, arguments);

    Object.defineProperty(this, '_events', {
      value : {},
      enumerable: false
    });

    /**
     * @name Two.Group.Children#ids
     * @property {Object} - Map of all elements in the list keyed by `id`s.
     */
    this.ids = {};

    this.on(Two.Events.insert, this.attach);
    this.on(Two.Events.remove, this.detach);
    Children.prototype.attach.apply(this, arguments);

  };

  Children.prototype = new Two.Utils.Collection();

  _.extend(Children.prototype, {

    constructor: Children,

    /**
     * @function
     * @name Two.Group.Children#attach
     * @param {Two.Shape[]}
     * @description Adds elements to the `ids` map.
     */
    attach: function(children) {
      for (var i = 0; i < children.length; i++) {
        this.ids[children[i].id] = children[i];
      }
      return this;
    },

    /**
     * @function
     * @name Two.Group.Children#detach
     * @param {Two.Shape[]}
     * @description Removes elements to the `ids` map.
     */
    detach: function(children) {
      for (var i = 0; i < children.length; i++) {
        delete this.ids[children[i].id];
      }
      return this;
    }

  });

  /**
   * @class
   * @name Two.Group
   */
  var Group = Two.Group = function(children) {

    Two.Shape.call(this, true);

    this._renderer.type = 'group';

    /**
     * @name Two.Group#additions
     * @property {Two.Shape[]}
     * @description An automatically updated list of children that need to be appended to the renderer's scenegraph.
     */
    this.additions = [];

    /**
     * @name Two.Group#subtractions
     * @property {Two.Shape[]}
     * @description An automatically updated list of children that need to be removed from the renderer's scenegraph.
     */
    this.subtractions = [];

    /**
     * @name Two.Group#additions
     * @property {Two.Group.Children[]}
     * @description A list of all the children in the scenegraph.
     * @nota-bene Ther order of this list indicates the order each element is rendered to the screen.
     */
    this.children = Array.isArray(children) ? children : Array.prototype.slice.call(arguments);

  };

  _.extend(Group, {

    Children: Children,

    /**
     * @name Two.Group.InsertChildren
     * @function
     * @description Cached method to let renderers know children have been added to a {@link Two.Group}.
     */
    InsertChildren: function(children) {
      for (var i = 0; i < children.length; i++) {
        replaceParent.call(this, children[i], this);
      }
    },

    /**
     * @name Two.Group.RemoveChildren
     * @function
     * @description Cached method to let renderers know children have been removed from a {@link Two.Group}.
     */
    RemoveChildren: function(children) {
      for (var i = 0; i < children.length; i++) {
        replaceParent.call(this, children[i]);
      }
    },

    /**
     * @name Two.Group.OrderChildren
     * @function
     * @description Cached method to let renderers know order has been updated on a {@link Two.Group}.
     */
    OrderChildren: function(children) {
      this._flagOrder = true;
    },

    /**
     * @name Two.Group.Properties
     * @property {String[]} - A list of properties that are on every {@link Two.Group}.
     */
    Properties: [
      'fill',
      'stroke',
      'linewidth',
      'visible',
      'cap',
      'join',
      'miter',

      'closed',
      'curved',
      'automatic'
    ],

    /**
     * @name Two.Group.MakeObservable
     * @function
     * @param {Object} object - The object to make observable.
     * @description Convenience function to apply observable qualities of a {@link Two.Group} to any object. Handy if you'd like to extend the {@link Two.Group} class on a custom class.
     */
    MakeObservable: function(object) {

      var properties = Two.Group.Properties;

      Object.defineProperty(object, 'opacity', {

        enumerable: true,

        get: function() {
          return this._opacity;
        },

        set: function(v) {
          this._flagOpacity = this._opacity !== v;
          this._opacity = v;
        }

      });

      Object.defineProperty(object, 'beginning', {

        enumerable: true,

        get: function() {
          return this._beginning;
        },

        set: function(v) {
          this._flagBeginning = this._beginning !== v;
          this._beginning = v;
        }

      });

      Object.defineProperty(object, 'ending', {

        enumerable: true,

        get: function() {
          return this._ending;
        },

        set: function(v) {
          this._flagEnding = this._ending !== v;
          this._ending = v;
        }

      });

      Object.defineProperty(object, 'length', {

        enumerable: true,

        get: function() {
          if (this._flagLength || this._length <= 0) {
            this._length = 0;
            if (!this.children) {
              return this._length;
            }
            for (var i = 0; i < this.children.length; i++) {
              var child = this.children[i];
              this._length += child.length;
            }
          }
          return this._length;
        }

      });

      Two.Shape.MakeObservable(object);
      Group.MakeGetterSetters(object, properties);

      Object.defineProperty(object, 'children', {

        enumerable: true,

        get: function() {
          return this._children;
        },

        set: function(children) {

          var insertChildren = _.bind(Group.InsertChildren, this);
          var removeChildren = _.bind(Group.RemoveChildren, this);
          var orderChildren = _.bind(Group.OrderChildren, this);

          if (this._children) {
            this._children.unbind();
          }

          this._children = new Children(children);
          this._children.bind(Two.Events.insert, insertChildren);
          this._children.bind(Two.Events.remove, removeChildren);
          this._children.bind(Two.Events.order, orderChildren);

        }

      });

      Object.defineProperty(object, 'mask', {

        enumerable: true,

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

    /**
     * @name Two.Group.MakeGetterSetters
     * @function
     * @param {Two.Group} group - The group to apply getters and setters.
     * @param {Object} properties - A key / value object containing properties to inherit.
     */
    MakeGetterSetters: function(group, properties) {

      if (!Array.isArray(properties)) {
        properties = [properties];
      }

      _.each(properties, function(k) {
        Group.MakeGetterSetter(group, k);
      });

    },

    /**
     * @name Two.Group.MakeGetterSetter
     * @function
     * @param {Two.Group} group - The group to apply getters and setters.
     * @param {String} key - The key which will become a property on the group.
     */
    MakeGetterSetter: function(group, key) {

      var secret = '_' + key;

      Object.defineProperty(group, key, {

        enumerable: true,

        get: function() {
          return this[secret];
        },

        set: function(v) {
          this[secret] = v;
          // Trickle down styles
          for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child[key] = v;
          }
        }

      });

    }

  });

  _.extend(Group.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    /**
     * @name Two.Group#_flagAdditions
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#additions} need updating.
     */
    _flagAdditions: false,

    /**
     * @name Two.Group#_flagSubtractions
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#subtractions} need updating.
     */
    _flagSubtractions: false,

    /**
     * @name Two.Group#_flagOrder
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#order} need updating.
     */
    _flagOrder: false,

    /**
     * @name Two.Group#_flagOpacity
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#opacity} need updating.
     */
    _flagOpacity: true,

    /**
     * @name Two.Group#_flagBeginning
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#beginning} need updating.
     */
    _flagBeginning: false,

    /**
     * @name Two.Group#_flagEnding
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#ending} need updating.
     */
    _flagEnding: false,

    /**
     * @name Two.Group#_flagLength
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#length} need updating.
     */
    _flagLength: false,

    /**
     * @name Two.Group#_flagMask
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#mask} need updating.
     */
    _flagMask: false,

    // Underlying Properties

    /**
     * @name Two.Group#fill
     * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what all child shapes should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
     */
    _fill: '#fff',

    /**
     * @name Two.Group#stroke
     * @property {(CssColor|Two.Gradient|Two.Texture)} - The value of what all child shapes should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS Colors.
     */
    _stroke: '#000',

    /**
     * @name Two.Group#linewidth
     * @property {Number} - The thickness in pixels of the stroke for all child shapes.
     */
    _linewidth: 1.0,

    /**
     * @name Two.Group#opacity
     * @property {Number} - The opaqueness of all child shapes.
     * @nota-bene Becomes multiplied by the individual child's opacity property.
     */
    _opacity: 1.0,

    /**
     * @name Two.Group#visible
     * @property {Boolean} - Display the path or not.
     * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
     */
    _visible: true,

    /**
     * @name Two.Group#cap
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
     */
    _cap: 'round',

    /**
     * @name Two.Group#join
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
     */
    _join: 'round',

    /**
     * @name Two.Group#miter
     * @property {String}
     * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
     */
    _miter: 4,

    /**
     * @name Two.Group#closed
     * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.
     */
    _closed: true,

    /**
     * @name Two.Group#curved
     * @property {Boolean} - When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
     */
    _curved: false,

    /**
     * @name Two.Group#automatic
     * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
     */
    _automatic: true,

    /**
     * @name Two.Group#beginning
     * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
     * @description {@link Two.Group#beginning} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#ending}.
     */
    _beginning: 0,

    /**
     * @name Two.Group#ending
     * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
     * @description {@link Two.Group#ending} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
     * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#beginning}.
     */
    _ending: 1.0,

    /**
     * @name Two.Group#length
     * @property {Number} - The sum of distances between all child lengths.
     */
    _length: 0,

    /**
     * @name Two.Group#mask
     * @property {Two.Shape} - The Two.js object to clip from a group's rendering.
     */
    _mask: null,

    constructor: Group,

    /**
     * @name Two.Group#clone
     * @function
     * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
     * @returns {Two.Group}
     * @description Create a new instance of {@link Two.Group} with the same properties of the current group.
     */
    clone: function(parent) {

      // /**
      //  * TODO: Group has a gotcha in that it's at the moment required to be bound to
      //  * an instance of two in order to add elements correctly. This needs to
      //  * be rethought and fixed.
      //  */

      var clone = new Group();
      var children = this.children.map(function(child) {
        return child.clone();
      });

      clone.add(children);

      clone.opacity = this.opacity;

      if (this.mask) {
        clone.mask = this.mask;
      }

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;
      clone.className = this.className;

      if (this.matrix.manual) {
        clone.matrix.copy(this.matrix);
      }

      if (parent) {
        parent.add(clone);
      }

      return clone._update();

    },

    /**
     * @name Two.Group#toObject
     * @function
     * @returns {Object}
     * @description Return a JSON compatible plain object that represents the group.
     */
    toObject: function() {

      var result = {
        children: [],
        translation: this.translation.toObject(),
        rotation: this.rotation,
        scale: this.scale instanceof Two.Vector ? this.scale.toObject() : this.scale,
        opacity: this.opacity,
        className: this.className,
        mask: (this.mask ? this.mask.toObject() : null)
      };

      if (this.matrix.manual) {
        result.matrix = this.matrix.toObject();
      }

      _.each(this.children, function(child, i) {
        result.children[i] = child.toObject();
      }, this);

      return result;

    },

    /**
     * @name Two.Group#corner
     * @function
     * @description Orient the children of the group to the upper left-hand corner of that group.
     */
    corner: function() {

      var rect = this.getBoundingClientRect(true);
      var corner = { x: rect.left, y: rect.top };

      this.children.forEach(function(child) {
        child.translation.sub(corner);
      });

      return this;

    },

    /**
     * @name Two.Group#center
     * @function
     * @description Orient the children of the group to the center of that group.
     */
    center: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2 - this.translation.x,
        y: rect.top + rect.height / 2 - this.translation.y
      };

      this.children.forEach(function(child) {
        if (child.isShape) {
          child.translation.sub(rect.centroid);
        }
      });

      return this;

    },

    /**
     * @name Two.Group#getById
     * @function
     * @description Recursively search for id. Returns the first element found.
     * @returns {Two.Shape} - Or `null` if nothing is found.
     */
    getById: function (id) {
      var found = null;
      function search(node) {
        if (node.id === id) {
          return node;
        } else if (node.children) {
          for (var i = 0; i < node.children.length; i++) {
            found = search(node.children[i], id);
            if (found) {
              return found;
            }
          }
        }
        return null;
      }
      return search(this);
    },

    /**
     * @name Two.Group#getByClassName
     * @function
     * @description Recursively search for classes. Returns an array of matching elements.
     * @returns {Two.Shape[]} - Or empty array if nothing is found.
     */
    getByClassName: function(className) {
      var found = [];
      function search(node) {
        if (Array.prototype.indexOf.call(node.classList, className) >= 0) {
          found.push(node);
        }
        if (node.children) {
          for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            search(child, className);
          }
        }
        return found;
      }
      return search(this);
    },

    /**
     * @name Two.Group#getByType
     * @function
     * @description Recursively search for children of a specific type, e.g. {@link Two.Path}. Pass a reference to this type as the param. Returns an array of matching elements.
     * @returns {Two.Shape[]} - Empty array if nothing is found.
     */
    getByType: function(type) {
      var found = [];
      function search(node) {
        if (node instanceof type) {
          found.push(node);
        }
        if (node.children) {
          for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            search(child);
          }
        }
        return found;
      }
      return search(this, type);
    },

    /**
     * @name Two.Group#add
     * @function
     * @param {Two.Shape[]} objects - An array of objects to be added. Can be also added as individual arguments.
     * @description Add objects to the group.
     */
    add: function(objects) {

      // Allow to pass multiple objects either as array or as multiple arguments
      // If it's an array also create copy of it in case we're getting passed
      // a childrens array directly.
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      } else {
        objects = objects.slice();
      }

      // Add the objects
      for (var i = 0; i < objects.length; i++) {
        var child = objects[i];
        if (!(child && child.id)) {
          continue;
        }
        var index = Array.prototype.indexOf.call(this.children, child);
        if (index >= 0) {
          this.children.splice(index, 1);
        }
        this.children.push(child);
      }

      return this;

    },

    /**
     * @name Two.Group#add
     * @function
     * @param {Two.Shape[]} objects - An array of objects to be removed. Can be also removed as individual arguments.
     * @description Remove objects from the group.
     */
    remove: function(objects) {

      var l = arguments.length,
        grandparent = this.parent;

      // Allow to call remove without arguments
      // This will detach the object from its own parent.
      if (l <= 0 && grandparent) {
        grandparent.remove(this);
        return this;
      }

      // Allow to pass multiple objects either as array or as multiple arguments
      // If it's an array also create copy of it in case we're getting passed
      // a childrens array directly.
      if (!(objects instanceof Array)) {
        objects = Array.prototype.slice.call(arguments);
      } else {
        objects = objects.slice();
      }

      // Remove the objects
      for (var i = 0; i < objects.length; i++) {
        if (!objects[i] || !(this.children.ids[objects[i].id])) continue;
        this.children.splice(Array.prototype.indexOf.call(this.children, objects[i]), 1);
      }

      return this;

    },

    /**
     * @name Two.Group#getBoundingClientRect
     * @function
     * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
     * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
     * @description Return an object with top, left, right, bottom, width, and height parameters of the group.
     */
    getBoundingClientRect: function(shallow) {
      var rect;

      // TODO: Update this to not __always__ update. Just when it needs to.
      this._update(true);

      // Variables need to be defined here, because of nested nature of groups.
      var left = Infinity, right = -Infinity,
          top = Infinity, bottom = -Infinity;

      var regex = Two.Texture.RegularExpressions.effect;

      for (var i = 0; i < this.children.length; i++) {

        var child = this.children[i];

        if (!child.visible || regex.test(child._renderer.type)) {
          continue;
        }

        rect = child.getBoundingClientRect(shallow);

        if (typeof rect.top !== 'number'   || typeof rect.left !== 'number' ||
            typeof rect.right !== 'number' || typeof rect.bottom !== 'number') {
          continue;
        }

        top = min(rect.top, top);
        left = min(rect.left, left);
        right = max(rect.right, right);
        bottom = max(rect.bottom, bottom);

      }

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
     * @name Two.Group#noFill
     * @function
     * @description Apply `noFill` method to all child shapes.
     */
    noFill: function() {
      this.children.forEach(function(child) {
        child.noFill();
      });
      return this;
    },

    /**
     * @name Two.Group#noStroke
     * @function
     * @description Apply `noStroke` method to all child shapes.
     */
    noStroke: function() {
      this.children.forEach(function(child) {
        child.noStroke();
      });
      return this;
    },

    /**
     * @name Two.Group#subdivide
     * @function
     * @description Apply `subdivide` method to all child shapes.
     */
    subdivide: function() {
      var args = arguments;
      this.children.forEach(function(child) {
        child.subdivide.apply(child, args);
      });
      return this;
    },

    /**
     * @name Two.Group#_update
     * @function
     * @private
     * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
     * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
     * @nota-bene Try not to call this method more than once a frame.
     */
    _update: function() {

      if (this._flagBeginning || this._flagEnding) {

        var beginning = Math.min(this._beginning, this._ending);
        var ending = Math.max(this._beginning, this._ending);
        var length = this.length;
        var sum = 0;

        var bd = beginning * length;
        var ed = ending * length;
        var distance = (ed - bd);

        for (var i = 0; i < this.children.length; i++) {

          var child = this.children[i];
          var l = child.length;

          if (bd > sum + l) {
            child.beginning = 1;
            child.ending = 1;
          } else if (ed < sum) {
            child.beginning = 0;
            child.ending = 0;
          } else if (bd > sum && bd < sum + l) {
            child.beginning = (bd - sum) / l;
            child.ending = 1;
          } else if (ed > sum && ed < sum + l) {
            child.beginning = 0;
            child.ending = (ed - sum) / l;
          } else {
            child.beginning = 0;
            child.ending = 1;
          }

          sum += l;

        }

      }

      return Two.Shape.prototype._update.apply(this, arguments);

    },

    /**
     * @name Two.Group#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset: function() {

      if (this._flagAdditions) {
        this.additions.length = 0;
        this._flagAdditions = false;
      }

      if (this._flagSubtractions) {
        this.subtractions.length = 0;
        this._flagSubtractions = false;
      }

      this._flagOrder = this._flagMask = this._flagOpacity =
        this._flagBeginning = this._flagEnding = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Group.MakeObservable(Group.prototype);

  // /**
  //  * Helper function used to sync parent-child relationship within the
  //  * `Two.Group.children` object.
  //  *
  //  * Set the parent of the passed object to another object
  //  * and updates parent-child relationships
  //  * Calling with one arguments will simply remove the parenting
  //  */
  function replaceParent(child, newParent) {

    var parent = child.parent;
    var index;

    if (parent === newParent) {
      add();
      return;
    }

    if (parent && parent.children.ids[child.id]) {

      index = Array.prototype.indexOf.call(parent.children, child);
      parent.children.splice(index, 1);

      splice();

    }

    if (newParent) {
      add();
      return;
    }

    splice();

    if (parent._flagAdditions && parent.additions.length === 0) {
      parent._flagAdditions = false;
    }
    if (parent._flagSubtractions && parent.subtractions.length === 0) {
      parent._flagSubtractions = false;
    }

    delete child.parent;

    function add() {

      if (newParent.subtractions.length > 0) {
        index = Array.prototype.indexOf.call(newParent.subtractions, child);

        if (index >= 0) {
          newParent.subtractions.splice(index, 1);
        }
      }

      if (newParent.additions.length > 0) {
        index = Array.prototype.indexOf.call(newParent.additions, child);

        if (index >= 0) {
          newParent.additions.splice(index, 1);
        }
      }

      child.parent = newParent;
      newParent.additions.push(child);
      newParent._flagAdditions = true;

    }

    function splice() {

      index = Array.prototype.indexOf.call(parent.additions, child);

      if (index >= 0) {
        parent.additions.splice(index, 1);
      }

      index = Array.prototype.indexOf.call(parent.subtractions, child);

      if (index < 0) {
        parent.subtractions.push(child);
        parent._flagSubtractions = true;
      }

    }

  }

})((typeof global !== 'undefined' ? global : (this || self || window)).Two);
