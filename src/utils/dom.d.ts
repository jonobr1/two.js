declare module 'two.js/src/utils/dom' {
  export const dom: {
    hasEventListeners: boolean;
    bind(elem: Element, event: string, func: EventListener, bool?: boolean): typeof dom;
    unbind(elem: Element, event: string, func: EventListener, bool?: boolean): typeof dom;
    getRequestAnimationFrame(): typeof requestAnimationFrame;
  };
}
