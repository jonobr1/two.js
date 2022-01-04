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
   * @name Two.Element#_renderer
   * @private
   * @property {Object} - Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
   * @nota-bene With the {@link Two.SvgRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
   */
  _renderer = {};

  /**
   * @name Two.Element#_id
   * @private
   * @see {@link Two.Element#id}
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

}

const proto = {
  renderer: {
    enumerable: false,
    get: function() {
      return this._renderer;
    },
    set: function(obj) {
      this._renderer = obj;
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
      this._flagClassName = this._className !== v;
      if (this._flagClassName) {
        const prev = this._className.split(/\s+?/);
        const dest = v.split(/\s+?/);
        for (let i = 0; i < prev.length; i++) {
          const className = prev[i];
          const index = Array.prototype.indexOf.call(this.classList, className);
          if (index >= 0) {
            this.classList.splice(index, 1);
          }
        }
        this.classList = this.classList.concat(dest);
      }
      this._className = v;
    }
  }
};
