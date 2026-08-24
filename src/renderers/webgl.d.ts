declare module 'two.js/src/renderers/webgl' {
  /**
     * @name Two.WebGLRenderer
     * @class

     * @param {Object} parameters - This object is inherited when constructing a new instance of {@link Two}.
     * @param {Element} [parameters.domElement] - The `<canvas />` to draw to. If none given a new one will be constructed.
     * @param {HTMLCanvasElement} [parameters.offscreenElement] - The offscreen two dimensional `<canvas />` to render each element on WebGL texture updates.
     * @param {Boolean} [parameters.antialias] - Determines whether the canvas should clear render with antialias on.
     * @description This class is used by {@link Two} when constructing with `type` of `Two.Types.webgl`. It takes Two.js' scenegraph and renders it to a `<canvas />` through the WebGL api.
     * @see {@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
     */
  export class Renderer extends Events {
    /**
     * @name Two.WebGLRenderer.Utils
     * @property {Object} - A massive object filled with utility functions and properties to render Two.js objects to a `<canvas />` through the WebGL API.
     */
    static Utils: {
      precision: number;
      isHidden: RegExp;
      canvas: any;
      alignments: {
        left: string;
        middle: string;
        right: string;
      };
      matrix: Matrix;
      group: {
        removeChild: (child: any, gl: any) => void;
        /**
                 * @function
                 // * @type {(gl: any, programs: any) => any}
                 * @param {WebGLContext} gl
                 * @param {Object} programs
                 */
        render: (gl: any, programs: any) => any;
      };
      path: {
        updateCanvas: (elem: any) => void;
        getBoundingClientRect: (vertices: any, border: any, rect: any) => void;
        render: (gl: any, programs: any, forcedParent: any) => any;
      };
      points: {
        updateCanvas: (elem: any) => void;
        render: (gl: any, programs: any, forcedParent: any) => any;
      };
      text: {
        updateCanvas: (elem: any) => void;
        getBoundingClientRect: (elem: any, rect: any) => void;
        render: (gl: any, programs: any, forcedParent: any) => any;
      };
      'linear-gradient': {
        render: (ctx: any, parent: any) => any;
      };
      'radial-gradient': {
        render: (ctx: any, parent: any) => any;
      };
      texture: {
        render: (ctx: any, elem: any) => any;
      };
      updateTexture: (gl: any, elem: any) => void;
      program: {
        create: (gl: any, shaders: any) => any;
      };
      TextureRegistry: Registry;
    };
    constructor(params: {
      domElement?: HTMLCanvasElement;
      offscreenElement?: HTMLCanvasElement;
      antialias?: boolean;
      alpha?: boolean;
      premultipliedAlpha?: boolean;
      stencil?: boolean;
      preserveDrawingBuffer?: boolean;
      overdraw?: boolean;
    });
    /**
     * @name Two.WebGLRenderer#domElement
     * @property {Element} - The `<canvas />` associated with the Two.js scene.
     */
    domElement: HTMLCanvasElement;
    /**
     * @name Two.WebGLRenderer#scene
     * @property {Group} - The root group of the scenegraph.
     */
    scene: Group;
    _renderer: {
      type: string;
      matrix: number[];
      scale: number;
      opacity: number;
    };
    _flagMatrix: boolean;
    /**
     * @name Two.WebGLRenderer#overdraw
     * @property {Boolean} - Determines whether the canvas clears the background each draw call.
     * @default true
     */
    overdraw: any;
    ctx: any;
    /**
     * @name Two.WebGLRenderer#programs
     * @property {Object} - Associated WebGL programs to render all elements from the scenegraph.
     */
    programs: {
      current: any;
      buffers: {
        position: any;
      };
      resolution: {
        width: number;
        height: number;
        ratio: number;
        flagged: boolean;
      };
    };
    /**
     * @name Two.WebGLRenderer#setSize
     * @function
     * @fires resize
     * @param {Number} width - The new width of the renderer.
     * @param {Number} height - The new height of the renderer.
     * @param {Number} [ratio] - The new pixel ratio (pixel density) of the renderer. Defaults to calculate the pixel density of the user's screen.
     * @description Change the size of the renderer.
     */
    setSize(width: number, height: number, ratio?: number): any;
    width: number;
    height: number;
    ratio: number;
    /**
     * @name Two.WebGLRenderer#render
     * @function
     * @description Render the current scene to the `<canvas />`.
     */
    render(): Renderer;
  }
  import { Events } from 'two.js/src/events';
  import { Group } from 'two.js/src/group';
  import { Matrix } from 'two.js/src/matrix';
  import { Registry } from 'two.js/src/registry';
}
