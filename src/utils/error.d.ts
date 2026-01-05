declare module 'two.js/src/utils/error' {
  /**
   * @name Two.Utils.Error
   * @class
   * @description Custom error throwing for Two.js specific identification.
   */
  export class TwoError extends Error {
    constructor(message: string);
  }
}
