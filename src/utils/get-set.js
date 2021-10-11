/**
 * @name Two.Utils.defineGetterSetter
 * @function
 * @this Two#
 * @param {String} property - The property to add an enumerable getter / setter to.
 * @description Convenience function to setup the flag based getter / setter that most properties are defined as in Two.js.
 */
export function defineGetterSetter(property) {

  const object = this;
  const secret = '_' + property;
  const flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

  Object.defineProperty(object, property, {
    enumerable: true,
    get: function() {
      return this[secret];
    },
    set: function(v) {
      this[secret] = v;
      this[flag] = true;
    }
  });

}
