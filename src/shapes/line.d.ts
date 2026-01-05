declare module 'two.js/src/shapes/line' {
  /**
     * @name Two.Line
     * @class

     * @param {Number} [x1=0] - The x position of the first vertex on the line.
     * @param {Number} [y1=0] - The y position of the first vertex on the line.
     * @param {Number} [x2=0] - The x position of the second vertex on the line.
     * @param {Number} [y2=0] - The y position of the second vertex on the line.
     */
  export class Line extends Path {
    static Properties: ('left' | 'right' | string)[];
    constructor(x1?: number, y1?: number, x2?: number, y2?: number);

    /**
     * @name Two.Line#left
     * @property {Anchor} - the first vertex on the line.
     */
    left: Anchor;

    /**
     * @name Two.Line#right
     * @property {Anchor} - the second vertex on the line.
     */
    right: Anchor;
  }
  import { Path } from 'two.js/src/path';
  import { Anchor } from 'two.js/src/anchor';
}
