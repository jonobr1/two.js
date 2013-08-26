(function() {

  /**
   * An object that holds 3 `Two.Vector`s, the anchor point and its
   * corresponding handles: `u` and `v`. 
   */
  var Point = Two.Point = function(x, y, ux, uy, vx, vy, command) {

    Two.Vector.call(this, x, y);

    Object.defineProperty(this, 'command', {

      get: function() {
        return this._command;
      },

      set: function(c) {
        this._command = c;
        return this.trigger(Two.Events.change);
      }

    });

    this.command = Two.Commands.move;

    this.u = new Two.Vector(_.isNumber(ux) ? ux : x, _.isNumber(uy) ? uy : y);
    this.v = new Two.Vector(_.isNumber(vx) ? vx : x, _.isNumber(vy) ? vy : y);

  };

})();