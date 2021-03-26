/**
 * @name Utils.Events
 * @interface
 * @description Object inherited by many Two.js objects in order to facilitate custom events.
 */
var Events = {

  /**
   * @name Utils.Events.on
   * @function
   * @param {String} [name] - The name of the event to bind a function to.
   * @param {Function} [handler] - The function to be invoked when the event is dispatched.
   * @description Call to add a listener to a specific event name.
   */
  on: addEventListener,

  /**
   * @name Utils.Events.off
   * @function
   * @param {String} [name] - The name of the event intended to be removed.
   * @param {Function} [handler] - The handler intended to be reomved.
   * @description Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.
   */
  off: removeEventListener,

  /**
   * @name Utils.Events.trigger
   * @function
   * @param {String} name - The name of the event to dispatch.
   * @param arguments - Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed.
   * @description Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.
   */
  trigger: function(name) {
    var scope = this;
    if (!scope._events) return scope;
    var args = Array.prototype.slice.call(arguments, 1);
    var events = scope._events[name];
    if (events) dispatch(scope, events, args);
    return scope;
  },

  listen: function(obj, name, handler) {

    var bound = this;

    if (obj) {

      var event = function () {
        handler.apply(bound, arguments);
      };

      // Add references about the object that assigned this listener
      event.obj = obj;
      event.name = name;
      event.handler = handler;

      obj.on(name, event);

    }

    return bound;

  },

  ignore: function(obj, name, handler) {

    var scope = this;
    obj.off(name, handler);
    return scope;

  },

  Types: {
    play: 'play',
    pause: 'pause',
    update: 'update',
    render: 'render',
    resize: 'resize',
    change: 'change',
    remove: 'remove',
    insert: 'insert',
    order: 'order',
    load: 'load'
  }

};


/**
 * @name Two.Events.bind
 * @function
 * @description Alias for {@link Two.Events.on}.
 */
Events.bind = addEventListener;

/**
 * @name Two.Events.unbind
 * @function
 * @description Alias for {@link Two.Events.off}.
 */
Events.unbind = removeEventListener;

/**
 * @returns {Events} - Returns an instance of self for the purpose of chaining.
 */
function addEventListener(name, handler) {

  var scope = this;

  scope._events || (scope._events = {});
  var list = scope._events[name] || (scope._events[name] = []);

  list.push(handler);

  return scope;

}

/**
 * @returns {Events} - Returns an instance of self for the purpose of chaining.
 */
function removeEventListener(name, handler) {

  var scope = this;

  if (!scope._events) {
    return scope;
  }
  if (!name && !handler) {
    scope._events = {};
    return scope;
  }

  var names = name ? [name] : Object.keys(scope._events);
  for (var i = 0, l = names.length; i < l; i++) {

    name = names[i];
    var list = scope._events[name];

    if (list) {
      var events = [];
      if (handler) {
        for (var j = 0, k = list.length; j < k; j++) {
          var ev = list[j];
          ev = ev.handler ? ev.handler : ev;
          if (handler && handler !== ev) {
            events.push(ev);
          }
        }
      }
      scope._events[name] = events;
    }
  }

  return scope;
}

function dispatch(obj, events, args) {
  var method;
  switch (args.length) {
  case 0:
    method = function(i) {
      events[i].call(obj, args[0]);
    };
    break;
  case 1:
    method = function(i) {
      events[i].call(obj, args[0], args[1]);
    };
    break;
  case 2:
    method = function(i) {
      events[i].call(obj, args[0], args[1], args[2]);
    };
    break;
  case 3:
    method = function(i) {
      events[i].call(obj, args[0], args[1], args[2], args[3]);
    };
    break;
  default:
    method = function(i) {
      events[i].apply(obj, args);
    };
  }
  for (var i = 0; i < events.length; i++) {
    method(i);
  }
}

export default Events;
