declare module 'two.js/extras/jsm/arc' {
  /**
   * @name Two.Arc
   * @class
   * @extends Two.Path
   * @param {Number} [x=0] - The x position of the arc.
   * @param {Number} [y=0] - The y position of the arc.
   * @param {Number} [width=0] - The width, horizontal diameter, of the arc.
   * @param {Number} [height=0] - The height, vertical diameter, of the arc.
   * @param {Number} [startAngle=0] - The starting angle of the arc in radians.
   * @param {Number} [endAngle=6.283] - The ending angle of the arc in radians.
   * @param {Number} [resolution=4] - The number of vertices used to construct the arc.
   */
  export class Arc extends Path {
    static Properties: (
      | 'width'
      | 'height'
      | 'startAngle'
      | 'endAngle'
      | string
    )[];
    constructor(
      x?: number,
      y?: number,
      width?: number,
      height?: number,
      startAngle?: number,
      endAngle?: number,
      resolution?: number
    );
    width: number;
    height: number;
    startAngle: number;
    endAngle: number;
    clone(parent?: Group): Arc;
    protected _update(bubbles?: boolean): Arc;
    flagReset(): Arc;
  }
  import { Path } from 'two.js/src/path';
  import { Group } from 'two.js/src/group';
}
