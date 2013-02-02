(function() {

  var Shape = Two.Shape = function() {

    this.translation = new Two.Vector();
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

  _.extend(Shape.prototype, {

  })

})();