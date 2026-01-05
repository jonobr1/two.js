declare module 'two.js/src/element' {
  /**
   * @name Two.Element
   * @class
   * @description The foundational object for the Two.js scenegraph.
   */
  export class Element extends Events {
    static Properties: string[];
    /**
     * @name Two.Element.fromObject
     * @function
     * @param {Object} obj - Object notation of a {@link Two.Element} to create a new instance
     * @returns {Two.Element}
     * @description Create a new {@link Two.Element} from an object notation of a {@link Two.Element}.
     * @nota-bene Works in conjunction with {@link Two.Element#toObject}
     */
    static fromObject(
      obj:
        | object
        | {
            renderer?: { type: string };
            id?: string;
            className?: string;
          }
    ): Element;
    /**
     * @name Two.Element#_flagId
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Element#id} needs updating.
     */
    private _flagId;
    /**
     * @name Two.Element#_flagClassName
     * @private
     * @property {Boolean} - Determines whether the {@link Two.Group#className} need updating.
     */
    private _flagClassName;
    /**
     * @name Two.Element#renderer
     * @property {Object} - Object access to store relevant renderer specific variables. Warning: manipulating this object can create unintended consequences.
     * @nota-bene With the {@link Two.SVGRenderer} you can access the underlying SVG element created via `shape.renderer.elem`.
     */
    renderer: {
      type: 'element' | 'group' | 'path' | 'text' | 'points' | string;
      elem?:
        | SVGGElement
        | SVGPathElement
        | SVGTextElement
        | SVGPatternElement
        | SVGDefsElement
        | SVGGradientElement
        | SVGLinearGradientElement
        | SVGRadialGradientElement
        | SVGImageElement
        | SVGClipPathElement
        | SVGStopElement
        | SVGPatternElement;
      onBeforeRender?: () => void;
      onAfterRender?: () => void;
    };
    /**
     * @name Two.Element#id
     * @property {String} - Session specific unique identifier.
     * @nota-bene In the {@link Two.SVGRenderer} change this to change the underlying SVG element's id too.
     */
    id: string;
    /**
     * @name Two.Element#className
     * @property {String} - A class to be applied to the element to be compatible with CSS styling.
     * @nota-bene Only available for the SVG renderer.
     */
    className: string;
    /**
     * @name Two.Element#classList
     * @property {String[]}
     * @description A list of class strings stored if imported / interpreted  from an SVG element.
     */
    classList: string[];
    /**
     * @name Two.Element#flagReset
     * @function
     * @description Called internally by Two.js's renderer to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset(): Element;
    copy(element: Element): Element;
    toObject(): object;
    /**
     * @name Two.Element#dispose
     * @function
     * @description Release the element's renderer object and detach any events.
     * This cleans up renderer-specific resources and unbinds all event listeners.
     */
    dispose(): Element;
  }
  import { Events } from 'two.js/src/events';
}
