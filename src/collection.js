import Events from './events.js';
import _ from './utils/underscore.js';

/**
 * @name Two.Collection
 * @class
 * @extends Two.Events
 * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
 */

class Collection extends Array {

  _events;
  _bound = false;

  constructor() {

    super();
    Events.call(this);

    if (arguments[0] && Array.isArray(arguments[0])) {
      if (arguments[0].length > 0) {
        this.push.apply(this, arguments[0]);
      }
    } else if (arguments.length > 0) {
      this.push.apply(this, arguments);
    }

  }

  pop() {
    var popped = super.pop.apply(this, arguments);
    this.trigger(Events.Types.remove, [popped]);
    return popped;
  }

  shift() {
    var shifted = super.shift.apply(this, arguments);
    this.trigger(Events.Types.remove, [shifted]);
    return shifted;
  },

  push() {
    var pushed = super.push.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return pushed;
  },

  unshift() {
    var unshifted = super.unshift.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return unshifted;
  },

  splice() {
    var spliced = super.splice.apply(this, arguments);
    var inserted;

    this.trigger(Events.Types.remove, spliced);

    if (arguments.length > 2) {
      inserted = this.slice(arguments[0], arguments[0] + arguments.length - 2);
      this.trigger(Events.Types.insert, inserted);
      this.trigger(Events.Types.order);
    }
    return spliced;
  },

  sort() {
    super.sort.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  },

  reverse() {
    super.reverse.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  },

  indexOf() {
    return super.indexOf.apply(this, arguments);
  }

}

Object.assign(Collection.prototype, Events.prototype);

export default Collection;
