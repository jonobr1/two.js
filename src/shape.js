(function() {

  var properties = [
    'rotation',
    'scale',
    'fill',
    'stroke',
    'linewidth',
    'opacity',
    'visible',
    'join',
    'miter'
  ];

  var Shape = Two.Shape = function() {

    makeGetterSetter(this);

    this.translation = new Two.Vector();  // TODO
    this.rotation = 0.0;
    this.scale = 1.0;

    this.fill = '#fff';
    this.stroke = '#000';
    this.linewidth = 1.0;
    this.opacity = 1.0;
    this.visible = true;

    this.join = 'round';
    this.miter = 'round';

  };

  _.extend(Shape, {

  });

  _.extend(Shape.prototype, Backbone.Events, {

  });

  function makeGetterSetter(shape) {

    _.each(properties, function(k) {

      var secret = '__' + k;

      shape[secret];

      Object.defineProperty(shape, k, {
        get: function() {
          return this[secret];
        },
        set: function(v) {
          this[secret] = v;
          this.trigger('change', this.id, k, v, this);
        }
      });

    });

  }

})();