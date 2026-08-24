declare module 'two.js/src/events' {
  /**
   * @name Two.Events
   * @class
   * @description Object inherited by many Two.js objects in order to facilitate custom events.
   */
  export class Events {
    /**
     * @name Two.Events.Types
     * @property {Object} - Object of different types of Two.js specific events.
     */
    static Types: {
      play: 'play';
      pause: 'pause';
      update: 'update';
      render: 'render';
      resize: 'resize';
      change: 'change';
      remove: 'remove';
      insert: 'insert';
      order: 'order';
      load: 'load';
    };
    static Methods: (
      | 'addEventListener'
      | 'on'
      | 'removeEventListener'
      | 'off'
      | 'unbind'
      | 'dispatchEvent'
      | 'trigger'
      | 'listen'
      | 'ignore'
    )[];
    private _events: {};
    private _bound: boolean;
    /**
     * @name Two.Events#addEventListener
     * @function
     * @param {String} [name] - The name of the event to bind a function to.
     * @param {Function} [handler] - The function to be invoked when the event is dispatched.
     * @description Call to add a listener to a specific event name.
     */
    addEventListener(name?: string, handler?: Function): Events;
    /**
     * @name Two.Events#on
     * @function
     * @description Alias for {@link Two.Events#addEventListener}.
     */
    on(name?: string, handler?: Function): Events;
    /**
     * @name Two.Events#bind
     * @function
     * @description Alias for {@link Two.Events#addEventListener}.
     */
    bind(name?: string, handler?: Function): Events;
    /**
     * @name Two.Events#removeEventListener
     * @function
     * @param {String} [name] - The name of the event intended to be removed.
     * @param {Function} [handler] - The handler intended to be removed.
     * @description Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the object are removed.
     */
    removeEventListener(name?: string, handler?: Function): Events;
    /**
     * @name Two.Events#off
     * @function
     * @description Alias for {@link Two.Events#removeEventListener}.
     */
    off(name?: string, handler?: Function): Events;
    /**
     * @name Two.Events#unbind
     * @function
     * @description Alias for {@link Two.Events#removeEventListener}.
     */
    unbind(name?: string, handler?: Function): Events;
    /**
     * @name Two.Events#dispatchEvent
     * @function
     * @param {String} name - The name of the event to dispatch.
     * @param args - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
     * @description Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
     */
    dispatchEvent(name: string, ...args: any[]): Events;
    trigger(...args: any[]): any;
    listen(obj: any, name: string, handler: Function): Events;
    ignore(obj: any, name: string, handler: Function): Events;
  }
}
