import { Events } from './events.js';
import { Constants } from './constants.js';

/**
 * @name Two.Element
 * @class
 * @extends Two.Events
 * @description The foundational object for the Two.js scenegraph.
 */
export class Element extends Events {
  /**
   * @name Two.Element#_flagId
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Element#id} needs updating.
   */
  _flagId = false;

  /**
   * @name Two.Element#_flagClassName
   * @private
   * @property {Boolean} - Determines whether the {@link Two.Group#className} need updating.
   */
  _flagClassName = false;

  /**
   * @name Two.Element#renderer
   * @property {Object} - Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
   * @nota-bene With the {@link Two.SVGRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
   */
  _renderer = {};

  /**
   * @name Two.Element#id
   * @property {String} - Session specific unique identifier.
   * @nota-bene In the {@link Two.SVGRenderer} change this to change the underlying SVG element's id too.
   */
  _id = Constants.Identifier + Constants.uniqueId();

  /**
   * @name Two.Element#className
   * @property {String} - A class to be applied to the element to be compatible with CSS styling.
   * @nota-bene Only rendered to DOM in the SVG renderer.
   */
  _className = '';

  /**
   * @name Two.Element#classList
   * @property {String[]}
   * @description A list of class strings stored if imported / interpreted  from an SVG element.
   */
  classList = [];

  constructor() {
    super();

    for (let prop in proto) {
      Object.defineProperty(this, prop, proto[prop]);
    }
  }

  static Properties = ['renderer', 'id', 'className'];

  /**
   * @name Two.Element.fromObject
   * @function
   * @param {Object} obj - Object notation of a {@link Two.Element} to create a new instance
   * @returns {Two.Element}
   * @description Create a new {@link Two.Element} from an object notation of a {@link Two.Element}.
   * @nota-bene Works in conjunction with {@link Two.Element#toObject}
   */
  static fromObject(obj) {
    const elem = new Element().copy(obj);
    if ('id' in obj) {
      elem.id = obj.id;
    }
    return elem;
  }

  /**
   * @name Two.Element#flagReset
   * @function
   * @description Called internally by Two.js's renderer to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    this._flagId = this._flagClassName = false;
    return this;
  }

  copy(element) {
    // Explicitly do not copy the id
    // of an object to keep uniqueness
    if (element.renderer && typeof element.renderer.type === 'string') {
      this.renderer.type = element.renderer.type;
    }
    if (typeof element.className === 'string') {
      this.className = element.className;
    }
    return this;
  }

  toObject() {
    return {
      renderer: { type: this.renderer.type },
      id: this.id,
      className: this.className,
    };
  }

  /**
   * @name Two.Element#dispose
   * @function
   * @description Release the element's renderer object and detach any events.
   * This cleans up renderer-specific resources and unbinds all event listeners.
   */
  dispose() {
    // Preserve the renderer type for potential re-attachment
    const rendererType = this._renderer.type;

    // Clear renderer object but preserve type
    this._renderer = { type: rendererType };

    // Unbind all events
    if (typeof this.unbind === 'function') {
      this.unbind();
    }

    return this;
  }
}

const proto = {
  renderer: {
    enumerable: false,
    get: function () {
      return this._renderer;
    },
  },
  id: {
    enumerable: true,
    get: function () {
      return this._id;
    },
    set: function (v) {
      const id = this._id;
      if (v === this._id) {
        return;
      }
      this._id = v;
      this._flagId = true;
      if (this.parent) {
        delete this.parent.children.ids[id];
        this.parent.children.ids[this._id] = this;
      }
    },
  },
  className: {
    enumerable: true,
    get: function () {
      return this._className;
    },
    set: function (v) {
      if (this._className !== v) {
        this._flagClassName = true;
        this.classList = v.split(/\s+?/);
        this._className = v;
      }
    },
  },
};
