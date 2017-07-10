(function(Two) {

  var _ = Two.Utils;

  var Stop = Two.Stop = function(offset, color, opacity) {

    this._renderer = {};
    this._renderer.type = 'stop';

    this.offset = _.isNumber(offset) ? offset
      : Stop.Index <= 0 ? 0 : 1;

    this.opacity = _.isNumber(opacity) ? opacity : 1;

    this.color = _.isString(color) ? color
      : Stop.Index <= 0 ? '#fff' : '#000';

    Stop.Index = (Stop.Index + 1) % 2;

  };

  _.extend(Stop, {

    Index: 0,

    Properties: [
      'offset',
      'opacity',
      'color'
    ],

    MakeObservable: function(object) {

      _.each(Stop.Properties, function(property) {

        var object = this;
        var secret = '_' + property;
        var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

        Object.defineProperty(object, property, {
          enumerable: true,
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this[flag] = true;
            if (this.parent) {
              this.parent._flagStops = true;
            }
          }
        });

      }, object);

    }

  });

  _.extend(Stop.prototype, Two.Utils.Events, {

    clone: function() {

      var clone = new Stop();

      _.each(Stop.Properties, function(property) {
        clone[property] = this[property];
      }, this);

      return clone;

    },

    toObject: function() {

      var result = {};

      _.each(Stop.Properties, function(k) {
        result[k] = this[k];
      }, this);

      return result;

    },

    flagReset: function() {

      this._flagOffset = this._flagColor = this._flagOpacity = false;

      return this;

    }

  });

  Stop.MakeObservable(Stop.prototype);

  var Gradient = Two.Gradient = function(stops) {

    this._renderer = {};
    this._renderer.type = 'gradient';

    this.id = Two.Identifier + Two.uniqueId();
    this.classList = [];

    this._renderer.flagStops = _.bind(Gradient.FlagStops, this);
    this._renderer.bindStops = _.bind(Gradient.BindStops, this);
    this._renderer.unbindStops = _.bind(Gradient.UnbindStops, this);

    this.spread = 'pad';

    this.stops = stops;

  };

  _.extend(Gradient, {

    Stop: Stop,

    Properties: [
      'spread'
    ],

    MakeObservable: function(object) {

      _.each(Gradient.Properties, Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'stops', {

        enumerable: true,

        get: function() {
          return this._stops;
        },

        set: function(stops) {

          var updateStops = this._renderer.flagStops;
          var bindStops = this._renderer.bindStops;
          var unbindStops = this._renderer.unbindStops;

          // Remove previous listeners
          if (this._stops) {
            this._stops
              .unbind(Two.Events.insert, bindStops)
              .unbind(Two.Events.remove, unbindStops);
          }

          // Create new Collection with copy of Stops
          this._stops = new Two.Utils.Collection((stops || []).slice(0));

          // Listen for Collection changes and bind / unbind
          this._stops
            .bind(Two.Events.insert, bindStops)
            .bind(Two.Events.remove, unbindStops);

          // Bind Initial Stops
          bindStops(this._stops);

        }

      });

    },

    FlagStops: function() {
      this._flagStops = true;
    },

    BindStops: function(items) {

      // This function is called a lot
      // when importing a large SVG
      var i = items.length;
      while(i--) {
        items[i].bind(Two.Events.change, this._renderer.flagStops);
        items[i].parent = this;
      }

      this._renderer.flagStops();

    },

    UnbindStops: function(items) {

      var i = items.length;
      while(i--) {
        items[i].unbind(Two.Events.change, this._renderer.flagStops);
        delete items[i].parent;
      }

      this._renderer.flagStops();

    }

  });

  _.extend(Gradient.prototype, Two.Utils.Events, {

    _flagStops: false,
    _flagSpread: false,

    clone: function(parent) {

      parent = parent || this.parent;

      var stops = _.map(this.stops, function(s) {
        return s.clone();
      });

      var clone = new Gradient(stops);

      _.each(Two.Gradient.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      if (parent) {
        parent.add(clone);
      }

      return clone;

    },

    toObject: function() {

      var result = {
        stops: _.map(this.stops, function(s) {
          return s.toObject();
        })
      };

      _.each(Gradient.Properties, function(k) {
        result[k] = this[k];
      }, this);

      return result;

    },

    _update: function() {

      if (this._flagSpread || this._flagStops) {
        this.trigger(Two.Events.change);
      }

      return this;

    },

    flagReset: function() {

      this._flagSpread = this._flagStops = false;

      return this;

    }

  });

  Gradient.MakeObservable(Gradient.prototype);

})((typeof global !== 'undefined' ? global : this).Two);
