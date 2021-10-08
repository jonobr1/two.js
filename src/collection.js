import Events from './events.js';

/**
 * @name Two.Collection
 * @class
 * @extends Two.Events
 * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
 */

class Collection extends Array {

  // Warning: Multiple inheritance hack
  #events = new Events();

  // Getters and setters aren't enumerable
  get _events() {
    return this.#events._events;
  }
  set _events(v) {
    this.#events._events = v;
  }
  get _bound() {
    return this.#events._bound;
  }
  set _bound(v) {
    this.#events._bound = v;
  }

  get addEventListener() {
    return this.#events.addEventListener;
  }
  get on() {
    return this.#events.on;
  }
  get bind() {
    return this.#events.bind;
  }
  get removeEventListener() {
    return this.#events.removeEventListener;
  }
  get off() {
    return this.#events.off;
  }
  get unbind() {
    return this.#events.unbind;
  }
  get dispatchEvent() {
    return this.#events.dispatchEvent;
  }
  get trigger() {
    return this.#events.trigger;
  }
  get listen() {
    return this.#events.listen;
  }
  get ignore() {
    return this.#events.ignore;
  }

  constructor() {

    super();

    if (arguments[0] && Array.isArray(arguments[0])) {
      if (arguments[0].length > 0) {
        this.push.apply(this, arguments[0]);
      }
    } else if (arguments.length > 0) {
      this.push.apply(this, arguments);
    }

  }

  pop() {
    const popped = super.pop.apply(this, arguments);
    this.trigger(Events.Types.remove, [popped]);
    return popped;
  }

  shift() {
    const shifted = super.shift.apply(this, arguments);
    this.trigger(Events.Types.remove, [shifted]);
    return shifted;
  }

  push() {
    const pushed = super.push.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return pushed;
  }

  unshift() {
    const unshifted = super.unshift.apply(this, arguments);
    this.trigger(Events.Types.insert, arguments);
    return unshifted;
  }

  splice() {
    const spliced = super.splice.apply(this, arguments);
    this.trigger(Events.Types.remove, spliced);
    if (arguments.length > 2) {
      const inserted = this.slice(arguments[0], arguments[0] + arguments.length - 2);
      this.trigger(Events.Types.insert, inserted);
      this.trigger(Events.Types.order);
    }
    return spliced;
  }

  sort() {
    super.sort.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  }

  reverse() {
    super.reverse.apply(this, arguments);
    this.trigger(Events.Types.order);
    return this;
  }

  indexOf() {
    return super.indexOf.apply(this, arguments);
  }

}

export default Collection;
