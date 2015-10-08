(function(Two, _, Backbone, requestAnimationFrame) {

  Two.Text = function(message, x, y, styles) {

    Two.Shape.call(this);

    this._renderer.type = 'text';

    if (!_.isEmpty(message)) {
      this.value = message;
    }

    if (_.isNumber(x)) {
        this.translation.x = x;
    }
    if (_.isNumber(y)) {
        this.translation.y = y;
    }

    if (!_.isObject(styles)) {
      return this;
    }

    _.each(Two.Text.Properties, function(property) {

      if (property in styles) {
        this[property] = styles[property];
      }

    }, this);

  };

  _.extend(Two.Text, {

    Properties: [
      'value', 'family', 'size', 'leading', 'alignment', 'fill', 'stroke',
      'linewidth', 'style', 'weight', 'opacity', 'visible'],

    MakeObservable: function(object) {

      Two.Shape.MakeObservable(object);

      _.each(Two.Text.Properties, function(property) {

        var secret = '_' + property;
        var flag = '_flag' + property.charAt(0).toUpperCase() + property.slice(1);

        Object.defineProperty(object, property, {
          get: function() {
            return this[secret];
          },
          set: function(v) {
            this[secret] = v;
            this[flag] = true;
          }
        });

      });

      Object.defineProperty(object, 'clip', {
        get: function() {
          return this._clip;
        },
        set: function(v) {
          this._clip = v;
          this._flagClip = true;
        }
      });

    }

  });

  _.extend(Two.Text.prototype, Two.Shape.prototype, {

    // Flags
    // http://en.wikipedia.org/wiki/Flag

    _flagValue: true,
    _flagFamily: true,
    _flagSize: true,
    _flagLeading: true,
    _flagAlignment: true,
    _flagStyle: true,
    _flagWeight: true,

    _flagFill: true,
    _flagStroke: true,
    _flagLinewidth: true,
    _flagOpacity: true,
    _flagVisible: true,

    _flagClip: false,

    // Underlying Properties

    _value: '',
    _family: 'sans-serif',
    _size: 13,
    _leading: 17,
    _alignment: 'middle',
    _style: 'normal',
    _weight: 500,

    _fill: '#000',
    _stroke: 'transparent',
    _linewith: 1,
    _opacity: 1,
    _visible: true,

    _clip: false,

    clone: function(parent) {

      var parent = parent || this.parent;

      var clone = new Two.Text(this.value);
      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      _.each(Two.Text.Properties, function(property) {
        clone[property] = this[property];
      }, this);

      parent.add(clone);

      return clone;

    },

    toObject: function() {

      var result = {
        translation: this.translation.toObject(),
        rotation: this.rotation,
        scale: this.scale
      };

      _.each(Two.Text.Properties, function(property) {
        result[property] = this[property];
      }, this);

      return result;

    },

    noStroke: function() {
      this.stroke = 'transparent';
      return this;
    },

    noFill: function() {
      this.fill = 'transparent';
      return this;
    },

    getBoundingClientRect: function() {

      // TODO

    },

    flagReset: function() {

      this._flagValue = this._flagFamily = this._flagSize =
        this._flagLeading = this._flagAlignment = this._flagFill =
        this._flagStroke = this._flagLinewidth = this._flagOpaicty =
        this._flagVisible = this._flagClip = false;

      Two.Shape.prototype.flagReset.call(this);

      return this;

    }

  });

  Two.Text.MakeObservable(Two.Text.prototype);

})(
  Two,
  typeof require === 'function' ? require('underscore') : _,
  typeof require === 'function' ? require('backbone') : Backbone,
  typeof require === 'function' ? require('requestAnimationFrame') : requestAnimationFrame
);
