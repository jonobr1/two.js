/**
 * @name Utils.Error
 * @class
 * @description Custom error throwing for Two.js specific identification.
 */
var TwoError = function(message) {
  this.name = 'Two.js';
  this.message = message;
};


TwoError.prototype = new Error();
TwoError.prototype.constructor = TwoError;

export default TwoError;