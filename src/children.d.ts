declare module 'two.js/src/children' {
  /**
     * @class
     * @name Two.Group.Children

     * @description A children collection which is accessible both by index and by object `id`.
     */
  export class Children extends Collection<Shape> {
    constructor(children?: Shape[]);
    constructor(...args: Shape[]);
    /**
     * @name Two.Group.Children#ids
     * @property {Object} - Map of all elements in the list keyed by `id`s.
     */
    ids: { [id: string]: Shape };
    /**
     * @function
     * @name Two.Group.Children#attach
     * @param {Shape[]} children - The objects which extend {@link Two.Shape} to be added.
     * @description Adds elements to the `ids` map.
     */
    attach(children: Shape[]): Children;
    /**
     * @function
     * @name Two.Group.Children#detach
     * @param {Shape[]} children - The objects which extend {@link Two.Shape} to be removed.
     * @description Removes elements to the `ids` map.
     */
    detach(children: Shape[]): Children;
  }
  import { Collection } from 'two.js/src/collection';
  import { Shape } from 'two.js/src/shape';
}
