import { Events } from './events.js';

/**
 * @name Two.Collection
 * @class
 * @extends Two.Events
 * @description An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.
 */

export class Collection extends Array {

  // Warning: Multiple inheritance hack
  /**
   * @private
   */
  _events = new Events();

  // Getters and setters aren't enumerable
  get _bound() {
    return this._events._bound;
  }
  set _bound(v) {
    this._events._bound = v;
  }

  addEventListener() {
    return this._events.addEventListener.apply(this, arguments);
  }
  on() {
    return this._events.on.apply(this, arguments);
  }
  bind() {
    return this._events.bind.apply(this, arguments);
  }
  removeEventListener() {
    return this._events.removeEventListener.apply(this, arguments);
  }
  off() {
    return this._events.off.apply(this, arguments);
  }
  unbind() {
    return this._events.unbind.apply(this, arguments);
  }
  dispatchEvent() {
    return this._events.dispatchEvent.apply(this, arguments);
  }
  trigger() {
    return this._events.trigger.apply(this, arguments);
  }
  listen() {
    return this._events.listen.apply(this, arguments);
  }
  ignore() {
    return this._events.ignore.apply(this, arguments);
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
