import { Events } from './events.js';

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
   * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
   */
  _renderer = {};

  /**
   * @name Two.Element#id
   * @property {String} - Session specific unique identifier.
   * @nota-bene In the {@link Two.SvgRenderer} change this to change the underlying SVG element's id too.
   */
  _id = '';

  /**
   * @name Two.Element#className
   * @property {String} - A class to be applied to the element to be compatible with CSS styling.
   * @nota-bene Only available for the SVG renderer.
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

  /**
   * @name Two.Element#flagReset
   * @function
   * @description Called internally by Two.js's renderer to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
   */
  flagReset() {
    this._flagId = this._flagClassName = false;
  }

}

const proto = {
  renderer: {
    enumerable: false,
    get: function() {
      return this._renderer;
    }
  },
  id: {
    enumerable: true,
    get: function() {
      return this._id;
    },
    set: function(v) {
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
    }
  },
  className: {
    enumerable: true,
    get: function() {
      return this._className;
    },
    set: function(v) {
      if (this._className !== v) {
        this._flagClassName = true;
        this.classList = v.split(/\s+?/);
        this._className = v;
      }
    }
  }
};
