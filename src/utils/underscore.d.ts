declare module 'two.js/src/utils/underscore' {
  export interface _ {
    isNaN(obj: any): boolean;
    isElement(obj: any): boolean;
    isObject(obj: any): boolean;
    extend(base: any, ...args: any[]): any;
    defaults(base: any, ...args: any[]): any;
    each(obj: any, iteratee: any, context: any): any;
    performance: { now: () => number };
  }
}
