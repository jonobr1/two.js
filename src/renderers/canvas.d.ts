declare module 'two.js/src/renderers/canvas' {
  /**
     * @name Two.CanvasRenderer
     * @class

     * @param {Object} [parameters] - This object is inherited when constructing a new instance of {@link Two}.
     * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
     * @param {Boolean} [parameters.overdraw] - Determines whether the canvas should clear the background or not. Defaults to `true`.
     * @param {Boolean} [parameters.smoothing=true] - Determines whether the canvas should antialias drawing. Set it to `false` when working with pixel art. `false` can lead to better performance, since it would use a cheaper interpolation algorithm.
     * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.canvas`. It takes Two.js' scenegraph and renders it to a `<canvas />`.
     */
  export class Renderer extends Events {
    /**
     * @name Two.CanvasRenderer.Utils
     * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />`.
     */
    static Utils: {
      isHidden: RegExp;
      alignments: {
        left: string;
        middle: string;
        right: string;
      };
      group: {
        renderChild: (child: any) => void;
        render: (ctx: any) => any;
      };
      path: {
        render: (ctx: any, forced: any, parentClipped: any) => any;
      };
      points: {
        render: (ctx: any, forced: any, parentClipped: any) => any;
      };
      text: {
        render: (ctx: any, forced: any, parentClipped: any) => any;
      };
      'linear-gradient': {
        render: (ctx: any, parent: any) => any;
      };
      'radial-gradient': {
        render: (ctx: any, parent: any) => any;
      };
      texture: {
        render: (ctx: any) => any;
      };
      renderSvgArcCommand: (
        ctx: any,
        ax: any,
        ay: any,
        rx: any,
        ry: any,
        largeArcFlag: any,
        sweepFlag: any,
        xAxisRotation: any,
        x: any,
        y: any
      ) => void;
    };
    constructor(params?: any);
    /**
     * @name Two.CanvasRenderer#domElement
     * @property {Element} - The `<canvas />` associated with the Two.js scene.
     */
    domElement: HTMLElement;
    /**
     * @name Two.CanvasRenderer#ctx
     * @property {Canvas2DContext} - Associated two dimensional context to render on the `<canvas />`.
     */
    ctx: CanvasRenderingContext2D;
    /**
     * @name Two.CanvasRenderer#overdraw
     * @property {Boolean} - Determines whether the canvas clears the background each draw call.
     * @default true
     */
    overdraw: boolean;
    /**
     * @name Two.CanvasRenderer#scene
     * @property {Group} - The root group of the scenegraph.
     */
    scene: Group;
    /**
     * @name Two.CanvasRenderer#setSize
     * @function
     * @fires resize
     * @param {Number} width - The new width of the renderer.
     * @param {Number} height - The new height of the renderer.
     * @param {Number} [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
     * @description Change the size of the renderer.
     */
    setSize(width: number, height: number, ratio?: number): Renderer;
    width: number;
    height: number;
    ratio: number;
    /**
     * @name Two.CanvasRenderer#render
     * @function
     * @description Render the current scene to the `<canvas />`.
     */
    render(): Renderer;
  }
  import { Events } from 'two.js/src/events';
  import { Group } from 'two.js/src/group';
}
