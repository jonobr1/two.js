declare module 'two.js/src/utils/canvas-polyfill' {
  export interface CanvasPolyfill {
    Image: any;
    isHeadless: boolean;
    shim(canvas: any, name?: string): any;
    polyfill(
      canvas: any,
      Image?: new (width?: number, height?: number) => HTMLImageElement
    ): any;
  }
}
