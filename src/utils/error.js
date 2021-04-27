import _ from './underscore.js';
/**
 * @name Two.Utils.Error
 * @class
 * @description Custom error throwing for Two.js specific identification.
 */
function TwoError(message) {
  this.name = 'Two.js';
  this.message = message;
}

TwoError.prototype = new Error();

_.extend(TwoError.prototype, {
  constructor: TwoError
});

export default TwoError;
