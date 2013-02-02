(function() {

  var Group = Two.Group = function(o) {

    Two.Shape.call(this);

    delete this.stroke;
    delete this.fill;
    delete this.join;
    delete this.miter;
    delete this.opacity;

    this.children = [];

    var l = arguments.length, objects = o;
    if (!_.isArray(o)) {
      this.add(_.map(arguments, function(a) {
        return a;
      }));
    }

  };

  _.extend(Group, {

  });

  _.extend(Group.prototype, Two.Shape.prototype, {

    add: function(o) {

      var l = arguments.length,
        objects = o,
        children = this.children;

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      _.each(objects, function(object) {

        if (_.indexOf(children, object) < 0) {
          children.push(object);
          if (!object.id) {
            this.renderer.add(object);
          }
          this.domElement.appendChild(object.domElement);
        }

      }, this);

      return this;

    }

  });

})();