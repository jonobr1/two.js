import { Events } from './events.js';
import { _ } from './utils/underscore.js';
import { getEffectFromObject } from './utils/shape.js';
import { boundsContains } from './utils/hit-test.js';

import { Shape } from './shape.js';
import { Children } from './children.js';
import { Path } from './path.js';
import { ArcSegment } from './shapes/arc-segment.js';
import { Circle } from './shapes/circle.js';
import { Ellipse } from './shapes/ellipse.js';
import { Points } from './shapes/points.js';
import { Polygon } from './shapes/polygon.js';
import { Rectangle } from './shapes/rectangle.js';
import { RoundedRectangle } from './shapes/rounded-rectangle.js';
import { Star } from './shapes/star.js';
import { Text } from './text.js';
import { Element } from './element.js';
import { ImageSequence } from './effects/image-sequence.js';
import { Sprite } from './effects/sprite.js';

// Constants

const min = Math.min,
  max = Math.max;

const cache = {
  getShapesAtPoint: {
    results: [],
    hitOptions: {},
    context: {
      x: 0,
      y: 0,
      visibleOnly: true,
      results: null,
    },
    single: [],
    output: [],
    empty: [],
  },
};

/**
 * @name Two.Group
 * @class
 * @extends Two.Shape
 * @param {Two.Shape[]} [children] - A list of objects that inherit {@link Two.Shape}. For instance, the array could be a {@link Two.Path}, {@link Two.Text}, and {@link Two.RoundedRectangle}.
 * @description This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.
 * @nota-bene The {@link Two#scene} is an instance of `Two.Group`.
 */
export class Group extends Shape {
  /**
   * @name Two.Group#_flagAdditions
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#additions} needs updating.
   */
  _flagAdditions = false;

  /**
   * @name Two.Group#_flagSubtractions
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#subtractions} needs updating.
   */
  _flagSubtractions = false;

  /**
   * @name Two.Group#_flagOrder
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#order} needs updating.
   */
  _flagOrder = false;

  /**
   * @name Two.Group#_flagVisible
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#visible} needs updating.
   */

  /**
   * @name Two.Group#_flagOpacity
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#opacity} needs updating.
   */
  _flagOpacity = true;

  /**
   * @name Two.Group#_flagBeginning
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#beginning} needs updating.
   */
  _flagBeginning = false;

  /**
   * @name Two.Group#_flagEnding
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#ending} needs updating.
   */
  _flagEnding = false;

  /**
   * @name Two.Group#_flagLength
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#length} needs updating.
   */
  _flagLength = false;

  /**
   * @name Two.Group#_flagMask
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#mask} needs updating.
   */
  _flagMask = false;

  // Underlying Properties

  /**
   * @name Two.Group#fill
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what all child shapes should be filled in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  _fill = '#fff';

  /**
   * @name Two.Group#stroke
   * @property {(String|Two.Gradient|Two.Texture)} - The value of what all child shapes should be outlined in with.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
   */
  _stroke = '#000';

  /**
   * @name Two.Group#linewidth
   * @property {Number} - The thickness in pixels of the stroke for all child shapes.
   */
  _linewidth = 1.0;

  /**
   * @name Two.Group#opacity
   * @property {Number} - The opaqueness of all child shapes.
   * @nota-bene Becomes multiplied by the individual child's opacity property.
   */
  _opacity = 1.0;

  /**
   * @name Two.Group#visible
   * @property {Boolean} - Display the path or not.
   * @nota-bene For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
   */
  _visible = true;

  /**
   * @name Two.Group#cap
   * @property {String}
   * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
   */
  _cap = 'round';

  /**
   * @name Two.Group#join
   * @property {String}
   * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
   */
  _join = 'round';

  /**
   * @name Two.Group#miter
   * @property {String}
   * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
   */
  _miter = 4;

  /**
   * @name Two.Group#closed
   * @property {Boolean} - Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.
   */
  _closed = true;

  /**
   * @name Two.Group#curved
   * @property {Boolean} - When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
   */
  _curved = false;

  /**
   * @name Two.Group#automatic
   * @property {Boolean} - Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.
   */
  _automatic = true;

  /**
   * @name Two.Group#beginning
   * @property {Number} - Number between zero and one to state the beginning of where the path is rendered.
   * @description {@link Two.Group#beginning} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
   * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#ending}.
   */
  _beginning = 0;

  /**
   * @name Two.Group#ending
   * @property {Number} - Number between zero and one to state the ending of where the path is rendered.
   * @description {@link Two.Group#ending} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
   * @nota-bene This is great for animating in and out stroked paths in conjunction with {@link Two.Group#beginning}.
   */
  _ending = 1.0;

  /**
   * @name Two.Group#length
   * @property {Number} - The sum of distances between all child lengths.
   */
  _length = 0;

  /**
   * @name Two.Group#mask
   * @property {Two.Shape} - The Two.js object to clip from a group's rendering.
   */
  _mask = null;

  /**
   * @name Two.Group#_strokeAttenuation
   * @private
   * @see {@link Two.Group#strokeAttenuation}
   */
  _strokeAttenuation = true;

  constructor(children) {
    super();

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }

    //

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
     * @name Two.Group#children
     * @property {Two.Group.Children}
     * @description A list of all the children in the scenegraph.
     * @nota-bene Ther order of this list indicates the order each element is rendered to the screen.
     */
    this.children = Array.isArray(children)
      ? children
      : Array.prototype.slice.call(arguments);
  }

  static Children = Children;

  /**
   * @name Two.Group.InsertChildren
   * @function
   * @param {Two.Shape[]} children - The objects to be inserted.
   * @description Cached method to let renderers know children have been added to a {@link Two.Group}.
   */
  static InsertChildren(children) {
    for (let i = 0; i < children.length; i++) {
      replaceParent.call(this, children[i], this);
    }
  }

  /**
   * @name Two.Group.RemoveChildren
   * @function
   * @param {Two.Shape[]} children - The objects to be removed.
   * @description Cached method to let renderers know children have been removed from a {@link Two.Group}.
   */
  static RemoveChildren(children) {
    for (let i = 0; i < children.length; i++) {
      replaceParent.call(this, children[i]);
    }
  }

  /**
   * @name Two.Group.OrderChildren
   * @function
   * @description Cached method to let renderers know order has been updated on a {@link Two.Group}.
   */
  static OrderChildren(children) {
    this._flagOrder = true;
  }

  /**
   * @name Two.Group.Properties
   * @property {String[]} - A list of properties that are on every {@link Two.Group}.
   */
  static Properties = [
    'fill',
    'stroke',
    'linewidth',
    'cap',
    'join',
    'miter',

    'closed',
    'curved',
    'automatic',
  ];

  static fromObject(obj) {
    const group = new Group();

    for (let i = 0; i < Group.Properties.length; i++) {
      const k = Group.Properties[i];
      if (k in obj) {
        if (/(fill|stroke)/i.test(k)) {
          group[k] =
            typeof obj[k] === 'string' ? obj[k] : getEffectFromObject(obj[k]);
        } else {
          group[k] = obj[k];
        }
      }
    }

    if ('mask' in obj) {
      group.mask = getShapeFromObject(obj.mask);
    }
    if ('id' in obj) {
      group.id = obj.id;
    }

    group.children = obj.children.map(getShapeFromObject);

    return group;

    function getShapeFromObject(child) {
      // All of the types of children Two.Group supports
      if (child && child.renderer) {
        switch (child.renderer.type) {
          case 'arc-segment':
            return ArcSegment.fromObject(child);
          case 'circle':
            return Circle.fromObject(child);
          case 'element':
            return Element.fromObject(child);
          case 'ellipse':
            return Ellipse.fromObject(child);
          case 'group':
            return Group.fromObject(child);
          case 'image':
            return Image.fromObject(child);
          case 'image-sequence':
            return ImageSequence.fromObject(child);
          case 'path':
            return Path.fromObject(child);
          case 'points':
            return Points.fromObject(child);
          case 'polygon':
            return Polygon.fromObject(child);
          case 'rectangle':
            return Rectangle.fromObject(child);
          case 'rounded-rectangle':
            return RoundedRectangle.fromObject(child);
          case 'shape':
            return Shape.fromObject(child);
          case 'sprite':
            return Sprite.fromObject(child);
          case 'star':
            return Star.fromObject(child);
          case 'text':
            return Text.fromObject(child);
        }
      }
      // Commonly null for empty set
      // properties like fill and stroke
      return child;
    }
  }

  static IsVisible(element, visibleOnly) {
    if (!visibleOnly) {
      return true;
    }

    let current = element;
    while (current) {
      if (typeof current.visible === 'boolean' && !current.visible) {
        return false;
      }
      if (typeof current.opacity === 'number' && current.opacity <= 0) {
        return false;
      }
      current = current.parent;
    }

    return true;
  }

  static VisitForHitTest(
    group,
    context,
    includeGroups,
    filter,
    hitOptions,
    tolerance,
    stopOnFirst
  ) {
    const children = group && group.children;
    if (!children) {
      return false;
    }

    const results = context.results;
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];

      if (!child) {
        continue;
      }

      if (!Group.IsVisible(child, context.visibleOnly)) {
        continue;
      }

      const rect =
        typeof child.getBoundingClientRect === 'function'
          ? child.getBoundingClientRect()
          : null;

      if (rect && !boundsContains(rect, context.x, context.y, tolerance)) {
        continue;
      }

      if (child instanceof Group) {
        if (
          includeGroups &&
          (!filter || filter(child)) &&
          typeof child.contains === 'function' &&
          child.contains(context.x, context.y, hitOptions)
        ) {
          results.push(child);
          if (stopOnFirst) {
            return true;
          }
        }
        if (
          Group.VisitForHitTest(
            child,
            context,
            includeGroups,
            filter,
            hitOptions,
            tolerance,
            stopOnFirst
          )
        ) {
          return true;
        }
        continue;
      }

      if (!(child instanceof Shape)) {
        continue;
      }

      if (filter && !filter(child)) {
        continue;
      }

      if (typeof child.contains !== 'function') {
        continue;
      }

      if (child.contains(context.x, context.y, hitOptions)) {
        results.push(child);
        if (stopOnFirst) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * @name Two.Group#copy
   * @function
   * @param {Two.Group} [group] - The reference {@link Two.Group}
   * @returns {Two.Group}
   * @description Copy the properties of one {@link Two.Group} onto another.
   */
  copy(group) {
    super.copy.call(this, group);
    console.warn(
      'Two.js: attempting to copy group. Two.Group.children copying not supported.'
    );
    for (let i = 0; i < Group.Properties.length; i++) {
      const k = Group.Properties[i];
      if (k in group) {
        this[k] = group[k];
      }
    }
    return this;
  }

  /**
   * @name Two.Group#clone
   * @function
   * @param {Two.Group} [parent] - The parent group or scene to add the clone to.
   * @returns {Two.Group}
   * @description Create a new instance of {@link Two.Group} with the same properties of the current group.
   */
  clone(parent) {
    // /**
    //  * TODO: Group has a gotcha in that it's at the moment required to be bound to
    //  * an instance of two in order to add elements correctly. This needs to
    //  * be rethought and fixed.
    //  */

    const clone = new Group();
    const children = this.children.map(function (child) {
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
  }

  /**
   * @name Two.Group#toObject
   * @function
   * @returns {Object}
   * @description Return a JSON compatible plain object that represents the group.
   */
  toObject() {
    const result = super.toObject.call(this);

    result.renderer.type = 'group';
    result.children = [];
    result.opacity = this.opacity;
    result.className = this.className;
    result.mask = this.mask ? this.mask.toObject() : null;

    _.each(
      this.children,
      (child, i) => {
        result.children[i] = child.toObject();
      },
      this
    );

    return result;
  }

  /**
   * @name Two.Group#dispose
   * @function
   * @returns {Two.Group}
   * @description Release the group's renderer resources and detach all events.
   * This method recursively disposes all child objects, unbinds the children
   * collection events, and preserves the renderer type for potential re-attachment
   * to a new renderer.
   */
  dispose() {
    // Call parent dispose to preserve renderer type and unbind events
    super.dispose();

    // Recursively dispose all children
    if (this.children) {
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        if (typeof child.dispose === 'function') {
          child.dispose();
        }
      }
    }

    // Unbind children collection events
    if (this.children && typeof this.children.unbind === 'function') {
      try {
        this.children.unbind();
      } catch (e) {
        // Ignore unbind errors for incomplete Collection objects
      }
    }

    return this;
  }

  /**
   * @name Two.Group#getShapesAtPoint
   * @function
   * @param {Number} x - X coordinate in world space.
   * @param {Number} y - Y coordinate in world space.
   * @param {Object} [options] - Hit test configuration.
   * @param {Boolean} [options.visibleOnly=true] - Limit results to visible shapes.
   * @param {Boolean} [options.includeGroups=false] - Include groups in the hit results.
   * @param {('all'|'deepest')} [options.mode='all'] - Whether to return all intersecting shapes or only the top-most.
   * @param {Boolean} [options.deepest] - Alias for `mode: 'deepest'`.
   * @param {Number} [options.precision] - Segmentation precision for curved geometry.
   * @param {Number} [options.tolerance=0] - Pixel tolerance applied to hit testing.
   * @param {Boolean} [options.fill] - Override fill testing behaviour.
   * @param {Boolean} [options.stroke] - Override stroke testing behaviour.
   * @param {Function} [options.filter] - Predicate to filter shapes from the result set.
   * @returns {Shape[]} Ordered list of intersecting shapes, front to back.
   * @description Traverse the group hierarchy and return shapes that contain the specified point.
   * @nota-bene Expects *world-space coordinates* – the same pixel-space you get from the renderer (e.g., mouse `clientX`/`clientY` adjusted for the canvas’s offset and pixel ratio).
   */
  getShapesAtPoint(x, y, options) {
    const opts = options || {};
    const { results, hitOptions, context, single, empty } =
      cache.getShapesAtPoint;

    results.length = 0;

    const mode = opts.mode === 'deepest' || opts.deepest ? 'deepest' : 'all';
    const visibleOnly = opts.visibleOnly !== false;
    const includeGroups = !!opts.includeGroups;
    const filter = typeof opts.filter === 'function' ? opts.filter : null;
    const tolerance = typeof opts.tolerance === 'number' ? opts.tolerance : 0;

    if (typeof opts.precision === 'number') {
      hitOptions.precision = opts.precision;
    } else {
      delete hitOptions.precision;
    }
    if (typeof opts.fill !== 'undefined') {
      hitOptions.fill = opts.fill;
    } else {
      delete hitOptions.fill;
    }
    if (typeof opts.stroke !== 'undefined') {
      hitOptions.stroke = opts.stroke;
    } else {
      delete hitOptions.stroke;
    }
    hitOptions.tolerance = tolerance;
    hitOptions.ignoreVisibility = !visibleOnly;

    const stopOnFirst = mode === 'deepest';
    context.x = x;
    context.y = y;
    context.visibleOnly = visibleOnly;
    context.results = results;

    Group.VisitForHitTest(
      this,
      context,
      includeGroups,
      filter,
      hitOptions,
      tolerance,
      stopOnFirst
    );

    if (stopOnFirst) {
      if (results.length > 0) {
        const first = results[0];
        results.length = 0;
        single[0] = first;
        single.length = 1;
        return single;
      }
      empty.length = 0;
      return empty;
    }

    const hits = results.slice();
    results.length = 0;
    return hits;
  }

  /**
   * @name Two.Group#corner
   * @function
   * @description Orient the children of the group to the upper left-hand corner of that group.
   */
  corner() {
    const rect = this.getBoundingClientRect(true);

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      child.translation.x -= rect.left;
      child.translation.y -= rect.top;
    }

    if (this.mask) {
      this.mask.translation.x -= rect.left;
      this.mask.translation.y -= rect.top;
    }

    return this;
  }

  /**
   * @name Two.Group#center
   * @function
   * @description Orient the children of the group to the center of that group.
   */
  center() {
    const rect = this.getBoundingClientRect(true);
    const cx = rect.left + rect.width / 2 - this.translation.x;
    const cy = rect.top + rect.height / 2 - this.translation.y;

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.isShape) {
        child.translation.x -= cx;
        child.translation.y -= cy;
      }
    }

    if (this.mask) {
      this.mask.translation.x -= cx;
      this.mask.translation.y -= cy;
    }

    return this;
  }

  /**
   * @name Two.Group#getById
   * @function
   * @description Recursively search for id. Returns the first element found.
   * @returns {Two.Shape} - Or `null` if nothing is found.
   */
  getById(id) {
    let found = null;
    function search(node) {
      if (node.id === id) {
        return node;
      } else if (node.children) {
        if (node.children.ids[id]) {
          return node.children.ids[id];
        }
        for (let i = 0; i < node.children.length; i++) {
          found = search(node.children[i]);
          if (found) {
            return found;
          }
        }
      }
      return null;
    }
    return search(this);
  }

  /**
   * @name Two.Group#getByClassName
   * @function
   * @description Recursively search for classes. Returns an array of matching elements.
   * @returns {Two.Shape[]} - Or empty array if nothing is found.
   */
  getByClassName(className) {
    const found = [];
    function search(node) {
      if (Array.prototype.indexOf.call(node.classList, className) >= 0) {
        found.push(node);
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          search(child);
        }
      }
      return found;
    }
    return search(this);
  }

  /**
   * @name Two.Group#getByType
   * @function
   * @description Recursively search for children of a specific type, e.g. {@link Two.Path}. Pass a reference to this type as the param. Returns an array of matching elements.
   * @returns {Two.Shape[]} - Empty array if nothing is found.
   */
  getByType(type) {
    const found = [];
    function search(node) {
      if (node instanceof type) {
        found.push(node);
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          search(child);
        }
      }
      return found;
    }
    return search(this);
  }

  /**
   * @name Two.Group#add
   * @function
   * @param {Two.Shape[]|...Two.Shape} objects - An array of objects to be added. Can also be supplied as individual arguments.
   * @description Add objects to the group.
   */
  add(objects) {
    // Allow to pass multiple objects either as array or as multiple arguments
    // If it's an array also create copy of it in case we're getting passed
    // a childrens array directly.
    if (!(objects instanceof Array)) {
      objects = Array.prototype.slice.call(arguments);
    } else {
      objects = objects.slice();
    }

    // Add the objects
    for (let i = 0; i < objects.length; i++) {
      const child = objects[i];
      if (!(child && child.id)) {
        continue;
      }
      const index = Array.prototype.indexOf.call(this.children, child);
      if (index >= 0) {
        this.children.splice(index, 1);
      }
      this.children.push(child);
    }

    return this;
  }

  /**
   * @name Two.Group#remove
   * @function
   * @param {Two.Shape[]|...Two.Shape} [objects=self] - An array of objects to be removed. Can be also removed as individual arguments. If no arguments are passed, then it removes itself from its parent.
   * @description Remove objects from the group.
   */
  remove(objects) {
    const l = arguments.length,
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
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      if (!object || !this.children.ids[object.id]) {
        continue;
      }
      const index = this.children.indexOf(object);
      if (index >= 0) {
        this.children.splice(index, 1);
      }
    }

    return this;
  }

  /**
   * @name Two.Group#getBoundingClientRect
   * @function
   * @param {Boolean} [shallow=false] - Describes whether to calculate off local matrix or world matrix.
   * @returns {Object} - Returns object with top, left, right, bottom, width, height attributes.
   * @description Return an object with top, left, right, bottom, width, and height parameters of the group.
   */
  getBoundingClientRect(shallow) {
    let rect, matrix, tc, lc, rc, bc;

    // TODO: Update this to not __always__ update. Just when it needs to.
    this._update(true);

    // Variables need to be defined here, because of nested nature of groups.
    let left = Infinity,
      right = -Infinity,
      top = Infinity,
      bottom = -Infinity;

    const regex = /texture|gradient/i;

    matrix = shallow ? this.matrix : this.worldMatrix;

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      if (!child.visible || regex.test(child._renderer.type)) {
        continue;
      }

      rect = child.getBoundingClientRect(shallow);

      tc =
        typeof rect.top !== 'number' ||
        _.isNaN(rect.top) ||
        !isFinite(rect.top);
      lc =
        typeof rect.left !== 'number' ||
        _.isNaN(rect.left) ||
        !isFinite(rect.left);
      rc =
        typeof rect.right !== 'number' ||
        _.isNaN(rect.right) ||
        !isFinite(rect.right);
      bc =
        typeof rect.bottom !== 'number' ||
        _.isNaN(rect.bottom) ||
        !isFinite(rect.bottom);

      if (tc || lc || rc || bc) {
        continue;
      }

      if (shallow) {
        const [ax, ay] = matrix.multiply(rect.left, rect.top);
        const [bx, by] = matrix.multiply(rect.right, rect.top);
        const [cx, cy] = matrix.multiply(rect.left, rect.bottom);
        const [dx, dy] = matrix.multiply(rect.right, rect.bottom);

        top = min(ay, by, cy, dy, top);
        left = min(ax, bx, cx, dx, left);
        right = max(ax, bx, cx, dx, right);
        bottom = max(ay, by, cy, dy, bottom);
      } else {
        top = min(rect.top, top);
        left = min(rect.left, left);
        right = max(rect.right, right);
        bottom = max(rect.bottom, bottom);
      }
    }

    return {
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      width: right - left,
      height: bottom - top,
    };
  }

  /**
   * @name Two.Group#noFill
   * @function
   * @description Apply `noFill` method to all child shapes.
   */
  noFill() {
    this.children.forEach(function (child) {
      child.noFill();
    });
    return this;
  }

  /**
   * @name Two.Group#noStroke
   * @function
   * @description Apply `noStroke` method to all child shapes.
   */
  noStroke() {
    this.children.forEach(function (child) {
      child.noStroke();
    });
    return this;
  }

  /**
   * @name Two.Group#subdivide
   * @function
   * @description Apply `subdivide` method to all child shapes.
   */
  subdivide() {
    const args = arguments;
    this.children.forEach(function (child) {
      child.subdivide.apply(child, args);
    });
    return this;
  }

  /**
   * @name Two.Group#_update
   * @function
   * @private
   * @param {Boolean} [bubbles=false] - Force the parent to `_update` as well.
   * @description This is called before rendering happens by the renderer. This applies all changes necessary so that rendering is up-to-date but not updated more than it needs to be.
   * @nota-bene Try not to call this method more than once a frame.
   */
  _update() {
    let i, l, child;

    if (this._flagBeginning || this._flagEnding) {
      const beginning = Math.min(this._beginning, this._ending);
      const ending = Math.max(this._beginning, this._ending);
      const length = this.length;
      let sum = 0;

      const bd = beginning * length;
      const ed = ending * length;

      for (i = 0; i < this.children.length; i++) {
        child = this.children[i];
        l = child.length;

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

    return super._update.apply(this, arguments);
  }

  /**
   * @name Two.Group#flagReset
   * @function
   * @private
   * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    if (this._flagAdditions) {
      this.additions.length = 0;
      this._flagAdditions = false;
    }

    if (this._flagSubtractions) {
      this.subtractions.length = 0;
      this._flagSubtractions = false;
    }

    this._flagOrder =
      this._flagMask =
      this._flagOpacity =
      this._flagBeginning =
      this._flagEnding =
        false;

    super.flagReset.call(this);

    return this;
  }
}

const proto = {
  visible: {
    enumerable: true,
    get: function () {
      return this._visible;
    },
    set: function (v) {
      this._flagVisible = this._visible !== v || this._flagVisible;
      this._visible = v;
    },
  },
  opacity: {
    enumerable: true,
    get: function () {
      return this._opacity;
    },
    set: function (v) {
      this._flagOpacity = this._opacity !== v || this._flagOpacity;
      this._opacity = v;
    },
  },
  beginning: {
    enumerable: true,
    get: function () {
      return this._beginning;
    },
    set: function (v) {
      this._flagBeginning = this._beginning !== v || this._flagBeginning;
      this._beginning = v;
    },
  },
  ending: {
    enumerable: true,
    get: function () {
      return this._ending;
    },
    set: function (v) {
      this._flagEnding = this._ending !== v || this._flagEnding;
      this._ending = v;
    },
  },
  length: {
    enumerable: true,
    get: function () {
      if (this._flagLength || this._length <= 0) {
        this._length = 0;
        if (!this.children) {
          return this._length;
        }
        for (let i = 0; i < this.children.length; i++) {
          const child = this.children[i];
          this._length += child.length;
        }
      }
      return this._length;
    },
  },
  fill: {
    enumerable: true,
    get: function () {
      return this._fill;
    },
    set: function (v) {
      this._fill = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.fill = v;
      }
    },
  },
  stroke: {
    enumerable: true,
    get: function () {
      return this._stroke;
    },
    set: function (v) {
      this._stroke = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.stroke = v;
      }
    },
  },
  linewidth: {
    enumerable: true,
    get: function () {
      return this._linewidth;
    },
    set: function (v) {
      this._linewidth = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.linewidth = v;
      }
    },
  },
  join: {
    enumerable: true,
    get: function () {
      return this._join;
    },
    set: function (v) {
      this._join = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.join = v;
      }
    },
  },
  miter: {
    enumerable: true,
    get: function () {
      return this._miter;
    },
    set: function (v) {
      this._miter = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.miter = v;
      }
    },
  },
  cap: {
    enumerable: true,
    get: function () {
      return this._cap;
    },
    set: function (v) {
      this._cap = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.cap = v;
      }
    },
  },
  closed: {
    enumerable: true,
    get: function () {
      return this._closed;
    },
    set: function (v) {
      this._closed = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.closed = v;
      }
    },
  },
  curved: {
    enumerable: true,
    get: function () {
      return this._curved;
    },
    set: function (v) {
      this._curved = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.curved = v;
      }
    },
  },
  automatic: {
    enumerable: true,
    get: function () {
      return this._automatic;
    },
    set: function (v) {
      this._automatic = v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        child.automatic = v;
      }
    },
  },
  children: {
    enumerable: true,
    get: function () {
      return this._children;
    },
    set: function (children) {
      const insertChildren = Group.InsertChildren.bind(this);
      const removeChildren = Group.RemoveChildren.bind(this);
      const orderChildren = Group.OrderChildren.bind(this);

      if (this._children) {
        this._children.unbind();
        if (this._children.length > 0) {
          removeChildren(this._children);
        }
      }

      this._children = new Children(children);
      this._children.bind(Events.Types.insert, insertChildren);
      this._children.bind(Events.Types.remove, removeChildren);
      this._children.bind(Events.Types.order, orderChildren);

      if (children.length > 0) {
        insertChildren(children);
      }
    },
  },
  mask: {
    enumerable: true,
    get: function () {
      return this._mask;
    },
    set: function (v) {
      this._mask = v;
      this._flagMask = true;
      if (_.isObject(v) && !v.clip) {
        v.clip = true;
      }
    },
  },

  /**
   * @name Two.Group#strokeAttenuation
   * @property {Boolean} - When set to `true`, stroke width scales with transformations (default behavior). When `false`, stroke width remains constant in screen space for all child shapes.
   * @description When `strokeAttenuation` is `false`, this property is applied to all child shapes, making their stroke widths automatically adjust to compensate for the group's world transform scale, maintaining constant visual thickness regardless of zoom level. When `true` (default), stroke widths scale normally with transformations.
   */
  strokeAttenuation: {
    enumerable: true,
    get: function () {
      return this._strokeAttenuation;
    },
    set: function (v) {
      this._strokeAttenuation = !!v;
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        if (child.strokeAttenuation !== undefined) {
          child.strokeAttenuation = v;
        }
      }
    },
  },
};

// /**
//  * Helper function used to sync parent-child relationship within the
//  * `Two.Group.children` object.
//  *
//  * Set the parent of the passed object to another object
//  * and updates parent-child relationships
//  * Calling with one arguments will simply remove the parenting
//  */
function replaceParent(child, newParent) {
  const parent = child.parent;
  let index;

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
