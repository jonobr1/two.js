declare module 'two.js/src/utils/shape' {
  /**
   * @private
   * @param {Path} path - The path to analyze against.
   * @param {Number} t -
   * @returns {Number}
   * @description
   */
  export function contains(path: Path, t: number): number;
  /**
   * @private
   * @param {Path} path - The path to analyze against.
   * @param {Number} target - The target length at which to find an anchor.
   * @returns {Number}
   * @description Return the id of an anchor based on a target length.
   */
  export function getIdByLength(path: Path, target: number): number;
  export function getCurveLength(a: any, b: any, limit: any): number;
  export function getSubdivisions(
    a: any,
    b: any,
    limit: any
  ): import('two.js/src/anchor').Anchor[];
  import { Path } from 'two.js/src/path';
}
