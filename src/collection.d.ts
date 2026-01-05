declare module 'two.js/src/collection' {
  /**
     * @name Two.Collection
     * @class

     * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
     */
  export class Collection<T = any> extends Array<T> {
    constructor(...args: any[]);
    /**
     * @private
     */
    private _events;
    private set _bound(arg: boolean);
    private get _bound(): boolean;
    addEventListener(...args: any[]): any;
    on(...args: any[]): any;
    bind(...args: any[]): any;
    removeEventListener(...args: any[]): any;
    off(...args: any[]): any;
    unbind(...args: any[]): any;
    dispatchEvent(...args: any[]): any;
    trigger(...args: any[]): any;
    listen(...args: any[]): any;
    ignore(...args: any[]): any;
  }
}
