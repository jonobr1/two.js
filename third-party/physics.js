/**
 * Physics
 * A requirified port of Traer Physics from Processing to JavaScript.
 * Copyright (C) 2012 jonobr1
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

(function() {

var root = this, previousShortcut = root.Physics;

common = (function () {

  /**
   * Pulled only what's needed from:
   * 
   * Underscore.js 1.3.3
   * (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
   * http://documentcloud.github.com/underscore
   */

  var breaker = {};
  var ArrayProto = Array.prototype;
  var ObjProto = Object.prototype;
  var hasOwnProperty = ObjProto.hasOwnProperty;
  var slice = ArrayProto.slice;
  var nativeForEach = ArrayProto.forEach;
  var nativeIndexOf      = ArrayProto.indexOf;
  var toString = ObjProto.toString;

  var has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  var each = function(obj, iterator, context) {

    if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
          obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
          for (var i = 0, l = obj.length; i < l; i++) {
            if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
          }
        } else {
          for (var key in obj) {
            if (_.has(obj, key)) {
              if (iterator.call(context, obj[key], key, obj) === breaker) return;
            }
          }
        }

  };

  var identity = function(value) {
    return value;
  };

  var sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  return {

    has: has,

    each: each,

    extend: function(obj) {
      each(slice.call(arguments, 1), function(source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      });
      return obj;
    },

    indexOf: function(array, item, isSorted) {
      if (array == null) return -1;
      var i, l;
      if (isSorted) {
        i = sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
      if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
      for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
      return -1;
    },

    sortedIndex: sortedIndex,

    identity: identity,

    isNumber: function(obj) {
      return toString.call(obj) == '[object Number]';
    },

    isFunction: function(obj) {
      return toString.call(obj) == '[object Function]' || typeof obj == 'function';
    },

    isUndefined: function(obj) {
      return obj === void 0;
    },

    isNull: function(obj) {
      return obj === null;
    }

  }

})();


Vector = (function (_) {

  /**
   * A two dimensional vector.
   */
  var Vector = function(x, y) {

    this.x = x || 0;
    this.y = y || 0;

  };

  _.extend(Vector.prototype, {

    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    copy: function(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    },

    clear: function() {
      this.x = 0;
      this.y = 0;
      return this;
    },

    clone: function() {
      return new Vector(this.x, this.y);
    },

    add: function(v1, v2) {
      this.x = v1.x + v2.x;
      this.y = v1.y + v2.y;
      return this;
    },

    addSelf: function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    },

    sub: function(v1, v2) {
      this.x = v1.x - v2.x;
      this.y = v1.y - v2.y;
      return this;
    },

    subSelf: function(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    },

    multiplySelf: function(v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    },

    multiplyScalar: function(s) {
      this.x *= s;
      this.y *= s;
      return this;
    },

    divideScalar: function(s) {
      if (s) {
        this.x /= s;
        this.y /= s;
      } else {
        this.set(0, 0);
      }
      return this;
    },

    negate: function() {
      return this.multiplyScalar(-1);
    },

    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },

    lengthSquared: function() {
      return this.x * this.x + this.y * this.y;
    },

    length: function() {
      return Math.sqrt(this.lengthSquared());
    },

    normalize: function() {
      return this.divideScalar(this.length());
    },

    distanceTo: function(v) {
      return Math.sqrt(this.distanceToSquared(v));
    },

    distanceToSquared: function(v) {
      var dx = this.x - v.x, dy = this.y - v.y;
      return dx * dx + dy * dy;
    },

    setLength: function(l) {
      return this.normalize().multiplyScalar(l);
    },

    equals: function(v) {
      return (this.distanceTo(v) < 0.0001 /* almost same position */);
    },

    lerp: function(v, t) {
      var x = (v.x - this.x) * t + this.x;
      var y = (v.y - this.y) * t + this.y;
      return this.set(x, y);
    },

    isZero: function() {
      return (this.length() < 0.0001 /* almost zero */ );
    }

  });

  return Vector;

})(common);


root.Physics = Physics = (function (ParticleSystem, raf, _) {

  var instances = [];

  /**
   * Extended singleton instance of ParticleSystem with convenience methods for
   * Request Animation Frame.
   * @class
   */
  var Physics = function() {

    var _this = this;

    this.playing = false;

    ParticleSystem.apply(this, arguments);

    this.animations = [];

    this.equilibriumCallbacks = [];

    instances.push(this);

  };

  _.extend(Physics, ParticleSystem, {

    superclass: ParticleSystem

  });

  _.extend(Physics.prototype, ParticleSystem.prototype, {

    /**
     * Play the animation loop. Doesn't affect whether in equilibrium or not.
     */
    play: function() {

      if (this.playing) {
        return this;
      }

      this.playing = true;
      this.__equilibrium = false;

      return this;

    },

    /**
     * Pause the animation loop. Doesn't affect whether in equilibrium or not.
     */
    pause: function() {

      this.playing = false;
      return this;

    },

    /**
     * Toggle between playing and pausing the simulation.
     */
    toggle: function() {

      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }

      return this;

    },

    onUpdate: function(func) {

      if (_.indexOf(this.animations, func) >= 0 || !_.isFunction(func)) {
        return this;
      }

      this.animations.push(func);

      return this;

    },

    onEquilibrium: function(func) {

      if (_.indexOf(this.equilibriumCallbacks, func) >= 0 || !_.isFunction(func)) {
        return this;
      }

      this.equilibriumCallbacks.push(func);

      return this;

    },

    /**
     * Call update after values in the system have changed and this will fire
     * it's own Request Animation Frame to update until things have settled
     * to equilibrium — at which point the system will stop updating.
     */
    update: function() {

      if (this.__optimized && this.__equilibrium) {
        return this;
      }

      var i;

      this.tick();

      for (i = 0; i < this.animations.length; i++) {
        this.animations[i]();
      }

      if (this.__optimized && this.__equilibrium){

        for (i = 0; i < this.equilibriumCallbacks.length; i++) {
          this.equilibriumCallbacks[i]();
        }

      }

      return this;

    }

  });

  function loop() {

    raf(loop);

    for (var i = 0; i < instances.length; i++) {
      var system = instances[i];
      if (system.playing) {
        system.update();
      }
    }

  }

  loop();

  return Physics;

})(ParticleSystem = (function (Vector, Particle, Spring, Attraction, Integrator, _) {

  /**
   * traer.js
   * A particle-based physics engine ported from Jeff Traer's Processing
   * library to JavaScript. This version is intended for use with the
   * HTML5 canvas element. It is dependent on Three.js' Vector2 class,
   * but can be overridden with any Vector2 class with the methods included.
   *
   * @author Jeffrey Traer Bernstein <jeff TA traer TOD cc> (original Java library)
   * @author Adam Saponara <saponara TA gmail TOD com> (JavaScript port)
   * @author Jono Brandel <http://jonobr1.com/> (requirified/optimization port)
   * 
   * @version 0.3
   * @date March 25, 2012
   */

  /**
   * The whole kit and kaboodle.
   *
   * @class
   */
  var ParticleSystem = function() {

    this.__equilibriumCriteria = { particles: true, springs: true, attractions: true };
    this.__equilibrium = false; // are we at equilibrium?
    this.__optimized = false;

    this.particles = [];
    this.springs = [];
    this.attractions = [];
    this.forces = [];
    this.integrator = new Integrator(this);
    this.hasDeadParticles = false;

    var args = arguments.length;

    if (args === 1) {
      this.gravity = new Vector(0, arguments[0]);
      this.drag = ParticleSystem.DEFAULT_DRAG;
    } else if (args === 2) {
      this.gravity = new Vector(0, arguments[0]);
      this.drag = arguments[1];
    } else if (args === 3) {
      this.gravity = new Vector(arguments[0], arguments[1]);
      this.drag = arguments[3];
    } else {
      this.gravity = new Vector(0, ParticleSystem.DEFAULT_GRAVITY);
      this.drag = ParticleSystem.DEFAULT_DRAG;
    }

  };

  _.extend(ParticleSystem, {

    DEFAULT_GRAVITY: 0,

    DEFAULT_DRAG: 0.001,

    Attraction: Attraction,

    Integrator: Integrator,

    Particle: Particle,

    Spring: Spring,

    Vector: Vector

  });

  _.extend(ParticleSystem.prototype, {

    /**
     * Set whether to optimize the simulation. This enables the check of whether
     * particles are moving. 
     */
    optimize: function(b) {
      this.__optimized = !!b;
      return this;
    },

    /**
     * Set the gravity of the ParticleSystem.
     */
    setGravity: function(x, y) {
      this.gravity.set(x, y);
      return this;
    },

    /**
    * Sets the criteria for equilibrium
    */
    setEquilibriumCriteria: function(particles, springs, attractions) {
      this.__equilibriumCriteria.particles = !!particles;
      this.__equilibriumCriteria.springs = !!springs;
      this.__equilibriumCriteria.attractions = !!attractions;
    },

    /**
     * Update the integrator
     */
    tick: function() {
      this.integrator.step(arguments.length === 0 ? 1 : arguments[0]);
      if (this.__optimized) {
        this.__equilibrium = !this.needsUpdate();
      }
      return this;
    },

    /**
     * Checks all springs and attractions to see if the contained particles are
     * inert / resting and returns a boolean.
     */
    needsUpdate: function() {

      var i = 0;

      if (this.__equilibriumCriteria.particles) {
        for (i = 0, l = this.particles.length; i < l; i++) {
          if (!this.particles[i].resting()) {
            return true;
          }
        }
      }

      if (this.__equilibriumCriteria.springs) {
        for (i = 0, l = this.springs.length; i < l; i++) {
          if (!this.springs[i].resting()) {
            return true;
          }
        }
      }

      if (this.__equilibriumCriteria.attractions) {
        for (i = 0, l = this.attractions.length; i < l; i++) {
          if (!this.attractions[i].resting()) {
            return true;
          }
        }
      }

      return false;

    },

    /**
     * Add a particle to the ParticleSystem.
     */
    addParticle: function(p) {

      this.particles.push(p);
      return this;

    },

    /**
     * Add a spring to the ParticleSystem.
     */
    addSpring: function(s) {

      this.springs.push(s);
      return this;

    },

    /**
     * Add an attraction to the ParticleSystem.
     */
    addAttraction: function(a) {

      this.attractions.push(a);
      return this;

    },

    /**
     * Makes and then adds Particle to ParticleSystem.
     */
    makeParticle: function(m, x, y) {

      var mass = _.isNumber(m) ? m : 1.0;
      var x = x || 0;
      var y = y || 0;

      var p = new Particle(mass);
      p.position.set(x, y);
      this.addParticle(p);
      return p;

    },

    /**
     * Makes and then adds Spring to ParticleSystem.
     */
    makeSpring: function(a, b, k, d, l) {

      var spring = new Spring(a, b, k, d, l);
      this.addSpring(spring);
      return spring;

    },

    /**
     * Makes and then adds Attraction to ParticleSystem.
     */
    makeAttraction: function(a, b, k, d) {

      var attraction = new Attraction(a, b, k, d);
      this.addAttraction(attraction);
      return attraction;

    },

    /**
     * Wipe the ParticleSystem clean.
     */
    clear: function() {

      this.particles.length = 0;
      this.springs.length = 0;
      this.attractions.length = 0;

    },

    /**
     * Calculate and apply forces.
     */
    applyForces: function() {

      var i, p;

      if (!this.gravity.isZero()) {

        for (i = 0; i < this.particles.length; i++) {
          this.particles[i].force.addSelf(this.gravity);
        }

      }

      var t = new Vector();

      for (i = 0; i < this.particles.length; i++) {

        p = this.particles[i];
        t.set(p.velocity.x * -1 * this.drag, p.velocity.y * -1 * this.drag);
        p.force.addSelf(t);

      }

      for (i = 0; i < this.springs.length; i++) {
        this.springs[i].update();
      }

      for (i = 0; i < this.attractions.length; i++) {
        this.attractions[i].update();
      }

      for (i = 0; i < this.forces.length; i++) {
        this.forces[i].update();
      }

      return this;

    },

    /**
     * Clear all particles in the system.
     */
    clearForces: function() {
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].clear();
      }
      return this;
    }

  });

  return ParticleSystem;

})(Vector,
Particle = (function (Vector, _) {

  var Particle = function(mass) {

    this.position = new Vector();
    this.velocity = new Vector();
    this.force = new Vector();
    this.mass = mass;
    this.fixed = false;
    this.age = 0;
    this.dead = false;

  };

  _.extend(Particle.prototype, {

    /**
     * Get the distance between two particles.
     */
    distanceTo: function(p) {
      return this.position.distanceTo(p.position);
    },

    /**
     * Make the particle fixed in 2D space.
     */
    makeFixed: function() {
      this.fixed = true;
      this.velocity.clear();
      return this;
    },

    /**
     * Reset a particle.
     */
    reset: function() {

      this.age = 0;
      this.dead = false;
      this.position.clear();
      this.velocity.clear();
      this.force.clear();
      this.mass = 1.0;

      return this;
    },

    /**
     * Returns a boolean describing whether the particle is in movement.
     */
    resting: function() {
      return this.fixed || this.velocity.isZero() && this.force.isZero();
    }

  });

  return Particle;

})(Vector,
common),
Spring = (function (Vector, _) {

  var Spring = function(a, b, k, d, l) {

    this.constant = k;
    this.damping = d;
    this.length = l;
    this.a = a;
    this.b = b;
    this.on = true;

  };

  _.extend(Spring.prototype, {

    /**
     * Returns the distance between particle a and particle b
     * in 2D space.
     */
    currentLength: function() {
      return this.a.position.distanceTo(this.b.position);
    },

    /**
     * Update spring logic.
     */
    update: function() {

      var a = this.a;
      var b = this.b;
      if (!(this.on && (!a.fixed || !b.fixed))) return this;

      var a2b = new Vector().sub(a.position, b.position);
      var d = a2b.length();

      if (d === 0) {
        a2b.clear();
      } else {
        a2b.divideScalar(d);  // Essentially normalize
      }

      var fspring = -1 * (d - this.length) * this.constant;

      var va2b = new Vector().sub(a.velocity, b.velocity);

      var fdamping = -1 * this.damping * va2b.dot(a2b);

      var fr = fspring + fdamping;

      a2b.multiplyScalar(fr);

      if (!a.fixed) {
        a.force.addSelf(a2b);
      }
      if (!b.fixed) {
        b.force.subSelf(a2b);
      }

      return this;

    },

    /**
     * Returns a boolean describing whether the spring is resting or not.
     * Convenient for knowing whether or not the spring needs another update
     * tick.
     */
    resting: function() {

      var a = this.a;
      var b = this.b;
      var l = this.length;

      return !this.on || (a.fixed && b.fixed)
        || (a.fixed && (l === 0 ? b.position.equals(a.position) : b.position.distanceTo(a.position) <= l) && b.resting())
        || (b.fixed && (l === 0 ? a.position.equals(b.position) : a.position.distanceTo(b.position) <= l) && a.resting());

    }

  });

  return Spring;

})(Vector,
common),
Attraction = (function (Vector, _) {

  var Attraction = function(a, b, k, d) {

    this.a = a;
    this.b = b;
    this.constant = k;
    this.on = true;
    this.distanceMin = d;
    this.distanceMinSquared = d * d;

  };

  _.extend(Attraction.prototype, {

    update: function() {

     var a = this.a, b = this.b;
     if (!this.on || (a.fixed && b.fixed)) {
       return;
     }

     var a2bx = a.position.x - b.position.x;
     var a2by = a.position.y - b.position.y;

     var a2b = new Vector().sub(a.position, b.position);

     var a2bdistanceSquared = Math.max(a2b.lengthSquared(), this.distanceMinSquared);

     var force = (this.constant * a.mass * b.mass) / a2bdistanceSquared;

     var length = Math.sqrt(a2bdistanceSquared);

     if (force === 0 || length === 0) {
       a2b.clear();
     } else {
       a2b.divideScalar(length).multiplyScalar(force);
     }

     if (!a.fixed) {
       a.force.subSelf(a2b);
     }
     if (!b.fixed) {
       b.force.addSelf(a2b);
     }

     return this;

    },

    /**
     * Returns a boolean describing whether the spring is resting or not.
     * Convenient for knowing whether or not the spring needs another update
     * tick.
     *
     * TODO: Test
     */
    resting: function() {

      var a = this.a;
      var b = this.b;
      var l = this.distanceMin;

      return !this.on || (a.fixed && b.fixed)
        || (a.fixed && b.position.distanceTo(a.position) <= l && b.resting())
        || (b.fixed && a.position.distanceTo(b.position) <= l && a.resting());

    }

  });

  return Attraction;

})(Vector,
common),
Integrator = (function (Vector, _) {

  /**
   * Runge Kutta Integrator
   * http://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods
   * 
   * @class
   */
  var Integrator = function(s) {
    this.s = s;
    this.originalPositions = [];
    this.originalVelocities = [];
    this.k1Forces = [];
    this.k1Velocities = [];
    this.k2Forces = [];
    this.k2Velocities = [];
    this.k3Forces = [];
    this.k3Velocities = [];
    this.k4Forces = [];
    this.k4Velocities = [];
  };

  _.extend(Integrator.prototype, {

    allocateParticles: function() {

      while (this.s.particles.length > this.originalPositions.length) {
        this.originalPositions.push(new Vector());
        this.originalVelocities.push(new Vector());
        this.k1Forces.push(new Vector());
        this.k1Velocities.push(new Vector());
        this.k2Forces.push(new Vector());
        this.k2Velocities.push(new Vector());
        this.k3Forces.push(new Vector());
        this.k3Velocities.push(new Vector());
        this.k4Forces.push(new Vector());
        this.k4Velocities.push(new Vector());
      }

      return this;

    },

    step: function(dt) {

      var s = this.s;
      var p, x, y, i;

      var op, k1v, k2v, k3v, k4v, ov, k1f, k2f, k3f, k4f;

      this.allocateParticles();

      for (i = 0; i < s.particles.length; i++) {

        p = s.particles[i];

        if (!p.fixed) {
          this.originalPositions[i].copy(p.position);
          this.originalVelocities[i].copy(p.velocity);
        }

        p.force.clear();

      }

      // K1

      s.applyForces();

      for (i = 0; i < s.particles.length; i++) {

        p = s.particles[i];

        if (!p.fixed) {
          this.k1Forces[i].copy(p.force);
          this.k1Velocities[i].copy(p.velocity);
        }

        p.force.clear();

      }

      // K2

      for (i = 0; i < s.particles.length; i++) {

        p = s.particles[i];

        if (!p.fixed) {

          op = this.originalPositions[i];
          k1v = this.k1Velocities[i];
          x = op.x + k1v.x * 0.5 * dt;
          y = op.y + k1v.y * 0.5 * dt;
          p.position.set(x, y);

          ov = this.originalVelocities[i];
          k1f = this.k1Forces[i];
          x = ov.x + k1f.x * 0.5 * dt / p.mass;
          y = ov.y + k1f.y * 0.5 * dt / p.mass;
          p.velocity.set(x, y);

        }

      }

      s.applyForces();

      for (i = 0; i < s.particles.length; i++) {

        p = s.particles[i];

        if (!p.fixed) {
          this.k2Forces[i].copy(p.force);
          this.k2Velocities[i].copy(p.velocity);
        }

        p.force.clear();

      }

      // K3

      for (i = 0; i < s.particles.length; i++) {

        p = s.particles[i];

        if (!p.fixed) {

          op = this.originalPositions[i];
          k2v = this.k2Velocities[i];
          p.position.set(op.x + k2v.x * 0.5 * dt, op.y + k2v.y * 0.5 * dt);

          ov = this.originalVelocities[i];
          k2f = this.k2Forces[i];
          p.velocity.set(ov.x + k2f.x * 0.5 * dt / p.mass, ov.y + k2f.y * 0.5 * dt / p.mass);

        }

      }

      s.applyForces();

      for (i = 0; i < s.particles.length; i++) {

        p = s.particles[i];

        if (!p.fixed) {
          this.k3Forces[i].copy(p.force);
          this.k3Velocities[i].copy(p.velocity);
        }

        p.force.clear();

      }

      // K4

      for (i = 0; i < s.particles.length; i++) {

        p = s.particles[i];

        if (!p.fixed) {

          op = this.originalPositions[i];
          k3v = this.k3Velocities[i];
          p.position.set(op.x + k3v.x * dt, op.y + k3v.y * dt);

          ov = this.originalVelocities[i];
          k3f = this.k3Forces[i];
          p.velocity.set(ov.x + k3f.x * dt / p.mass, ov.y + k3f.y * dt / p.mass);

        }

      }

      s.applyForces();

      for (i = 0; i < s.particles.length; i++) {

        p = s.particles[i];

        if (!p.fixed) {
          this.k4Forces[i].copy(p.force);
          this.k4Velocities[i].copy(p.velocity);
        }

      }

      // TOTAL

      for (i = 0; i < s.particles.length; i++) {

        p = s.particles[i];

        p.age += dt;

        if (!p.fixed) {

          op = this.originalPositions[i];
          k1v = this.k1Velocities[i];
          k2v = this.k2Velocities[i];
          k3v = this.k3Velocities[i];
          k4v = this.k4Velocities[i];

          x = op.x + dt / 6.0 * (k1v.x + 2.0 * k2v.x + 2.0 * k3v.x + k4v.x);
          y = op.y + dt / 6.0 * (k1v.y + 2.0 * k2v.y + 2.0 * k3v.y + k4v.y);

          p.position.set(x, y);

          ov = this.originalVelocities[i];
          k1f = this.k1Forces[i];
          k2f = this.k2Forces[i];
          k3f = this.k3Forces[i];
          k4f = this.k4Forces[i];

          x = ov.x + dt / (6.0 * p.mass) * (k1f.x + 2.0 * k2f.x + 2.0 * k3f.x + k4f.x);
          y = ov.y + dt / (6.0 * p.mass) * (k1f.y + 2.0 * k2f.y + 2.0 * k3f.y + k4f.y);

          p.velocity.set(x, y);

        }

      }

      return this;

    }

  });

  return Integrator;

})(Vector,
common),
common),
requestAnimationFrame = (function () {

  /*
   * Requirified version of Paul Irish's request animation frame.
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
})(),
common);

})();