declare module 'two.js/src/renderers/svg' {
  /**
     * @name Two.SVGRenderer
     * @class

     * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param {Element} [parameters.domElement] - The `<svg />` to draw to. If none given a new one will be constructed.
     * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.
     */
  export class Renderer extends Events {
    /**
     * @name Two.SVGRenderer.Utils
     * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.
     */
    static Utils: {
      version: number;
      ns: string;
      xlink: string;
      alignments: {
        left: string;
        center: string;
        right: string;
      };
      createElement: (name: any, attrs: any) => SVGElement;
      setAttributes: (elem: any, attrs: any) => any;
      removeAttributes: (elem: any, attrs: any) => any;
      toString: (points: any, closed: any) => string;
      pointsToString: (points: any, size: any) => string;
      getClip: (shape: any, domElement: any) => any;
      group: {
        appendChild: (object: any) => void;
        removeChild: (object: any) => void;
        orderChild: (object: any) => void;
        renderChild: (child: any) => void;
        render: (domElement: any) => any;
      };
      path: {
        render: (domElement: any) => any;
      };
      points: {
        render: (domElement: any) => any;
      };
      text: {
        render: (domElement: any) => any;
      };
      'linear-gradient': {
        render: (domElement: any, silent: any) => any;
      };
      'radial-gradient': {
        render: (domElement: any, silent: any) => any;
      };
      texture: {
        render: (domElement: any, silent: any) => any;
      };
    };
    constructor(params?: any);
    /**
     * @name Two.SVGRenderer#domElement
     * @property {Element} - The `<svg />` associated with the Two.js scene.
     */
    domElement: any;
    /**
     * @name Two.SVGRenderer#scene
     * @property {Group} - The root group of the scenegraph.
     */
    scene: Group;
    /**
     * @name Two.SVGRenderer#defs
     * @property {SVGDefsElement} - The `<defs />` to apply gradients, patterns, and bitmap imagery.
     */
    defs: SVGDefsElement;
    /**
     * @name Two.SVGRenderer#setSize
     * @function
     * @param {Number} width - The new width of the renderer.
     * @param {Number} height - The new height of the renderer.
     * @description Change the size of the renderer.
     * @nota-bene Triggers a `Two.Events.resize`.
     */
    setSize(width: number, height: number): any;
    width: number;
    height: number;
    /**
     * @name Two.SVGRenderer#render
     * @function
     * @description Render the current scene to the `<svg />`.
     */
    render(): Renderer;
  }
  import { Events } from 'two.js/src/events';
  import { Group } from 'two.js/src/group';
}
