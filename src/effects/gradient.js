(function(Two, _, Backbone, requestAnimationFrame) {

  var Stop = Two.Stop = function(offset, color, opacity) {

    this._renderer = {};

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

        var secret = '_' + property;
        var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

        Object.defineProperty(object, property, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this[flag] = true;
            this.trigger(Two.Events.change);  // Unique to Gradient.Stop
          }
        });


      });

    }

  });

  _.extend(Stop.prototype, Backbone.Events, {

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

    Two.Shape.call(this);

    this._renderer.type = 'gradient';

    this.spread = 'pad';

    this.stops = stops;

  };

  _.extend(Gradient, {

    Stop: Stop,

    Properties: [
      'spread'
    ],

    MakeObservable: function(object) {

      Two.Shape.MakeObservable(object);

      _.each(Gradient.Properties, Two.Utils.defineProperty, object);

      Object.defineProperty(object, 'stops', {

        get: function() {
          return this._stops;
        },

        set: function(stops) {

          var updateStops = _.bind(Gradient.FlagStops, this);

          var bindStops = _.bind(function(items) {

            // This function is called a lot
            // when importing a large SVG
            var i = items.length;
            while(i--) {
              items[i].bind(Two.Events.change, updateStops);
            }

            updateStops();

          }, this);

          var unbindStops = _.bind(function(items) {

            _.each(items, function(v) {
              v.unbind(Two.Events.change, updateStops);
            }, this);

            updateStops();

          }, this);

          // Remove previous listeners
          if (this._stops) {
            this._stops.unbind();
          }

          // Create new Collection with copy of Stops
          this._stops = new Two.Utils.Collection((stops || []).slice(0));

          // Listen for Collection changes and bind / unbind
          this._stops.bind(Two.Events.insert, bindStops);
          this._stops.bind(Two.Events.remove, unbindStops);

          // Bind Initial Stops
          bindStops(this._stops);

        }

      });

    },

    FlagStops: function() {
      this._flagStops = true;
    }

  });

  _.extend(Gradient.prototype, Two.Shape.prototype, {

    clone: function(parent) {

      parent = parent || this.parent;

      var stops = _.map(this.stops, function(s) {
        return s.clone();
      });

      var clone = new Gradient(stops);

      _.each(Two.Gradient.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      parent.add(clone);

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

    flagReset: function() {

      this._flagSpread = this._flagStops = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Gradient.MakeObservable(Gradient.prototype);

})(
  Two,
  typeof require === 'function' ? require('underscore') : _,
  typeof require === 'function' ? require('backbone') : Backbone,
  typeof require === 'function' ? require('requestAnimationFrame') : requestAnimationFrame
);
