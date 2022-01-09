/**
 * @name Two.Utils.Error
 * @class
 * @description Custom error throwing for Two.js specific identification.
 */
export class TwoError extends Error {

  name = 'Two.js';
  message;

  constructor(message) {
    super();
    this.message = message;
  }

}
