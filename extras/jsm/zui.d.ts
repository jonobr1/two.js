declare module 'two.js/extras/jsm/zui' {
  /**
   * @name Two.ZUI
   * @class
   * @param {Group} group - The scene or group to
   * @param {HTMLElement} [domElement=document.body] - The HTML Element to attach event listeners to.
   */
  export class ZUI {
    static Surface: Surface;
    static Clamp(v: any, min: any, max: any): number;
    static Limit: {
      min: number;
      max: number;
      clone: () => {};
    };
    static TranslateMatrix(m: any, x: any, y: any): any;
    static PositionToScale(pos: any): number;
    static ScaleToPosition(scale: any): number;
    constructor(group: Group, domElement?: HTMLElement);
    limits: {
      scale: {};
      x: {};
      y: {};
    };
    viewport: any;
    viewportOffset: {
      top: number;
      left: number;
      matrix: Matrix;
    };
    surfaceMatrix: Matrix;
    surfaces: any[];
    add(surface: any): ZUI;
    addLimits(min?: number, max?: number): ZUI;
    clientToSurface(): { x: number; y: number; z: number };
    clientToSurface(v: { x?: number; y?: number; z?: number }): {
      x: number;
      y: number;
      z: number;
    };
    clientToSurface(x: number, y: number, z?: number): {
      x: number;
      y: number;
      z: number;
    };
    surfaceToClient(): { x: number; y: number; z: number };
    surfaceToClient(v: { x?: number; y?: number; z?: number }): {
      x: number;
      y: number;
      z: number;
    };
    surfaceToClient(x: number, y: number, z?: number): {
      x: number;
      y: number;
      z: number;
    };
    zoomBy(byF: any, clientX: any, clientY: any): ZUI;
    zoomSet(zoom: any, clientX: any, clientY: any): ZUI;
    zoom: number;
    scale: any;
    translateSurface(x: any, y: any): ZUI;
    updateOffset(): ZUI;
    updateSurface(): ZUI;
    reset(): ZUI;
    fitToLimits(s: any): number;
  }
  import { Matrix } from 'two.js/src/matrix';
  import { Group } from 'two.js/src/group';
  class Surface {
    constructor(object: any);
    object: any;
    limits(
      min: any,
      max: any
    ):
      | Surface
      | {
          min: any;
          max: any;
        };
    min: any;
    max: any;
    apply(px: any, py: any, s: any): Surface;
  }
}
