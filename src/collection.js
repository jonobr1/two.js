import Events from './events.js';
import _ from './utils/underscore.js';

/**
 * @name Two.Collection
 * @class
 * @extends Two.Events
 * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
 */
function Collection() {

  Array.call(this);

  if (arguments[0] && Array.isArray(arguments[0])) {
    Array.prototype.push.apply(this, arguments[0]);
  } else if (arguments.length > 0) {
    Array.prototype.push.apply(this, arguments);
  }

}

Collection.prototype = new Array();

_.extend(Collection.prototype, Events, {

  constructor: Collection,

  pop: function() {
    var popped = Array.prototype.pop.apply(this, arguments);
    this.trigger(Events.Types.remove, [popped]);
    return popped;
  },

  shift: function() {
    var shifted = Array.prototype.shift.apply(this, arguments);
    this.trigger(Events.Types.remove, [shifted]);
    return shifted;
  },

  push: function() {
    var pushed = Array.prototype.push.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return pushed;
  },

  unshift: function() {
    var unshifted = Array.prototype.unshift.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return unshifted;
  },

  splice: function() {
    var spliced = Array.prototype.splice.apply(this, arguments);
    var inserted;

    this.trigger(Events.Types.remove, spliced);

    if (arguments.length > 2) {
      inserted = this.slice(arguments[0], arguments[0] + arguments.length - 2);
      this.trigger(Events.Types.insert, inserted);
      this.trigger(Events.Types.order);
    }
    return spliced;
  },

  sort: function() {
    Array.prototype.sort.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  },

  reverse: function() {
    Array.prototype.reverse.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  },

  indexOf: function() {
    return Array.prototype.indexOf.apply(this, arguments);
  }

});

export default Collection;
