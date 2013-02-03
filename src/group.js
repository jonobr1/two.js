(function() {

  var Group = Two.Group = function(o) {

    Two.Shape.call(this);

    delete this.stroke;
    delete this.fill;
    delete this.join;
    delete this.miter;
    delete this.opacity;

    this.children = {};

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
        children = this.children,
        grandparent = this.parent,
        ids = [];

      if (!_.isArray(o)) {
        objects = _.map(arguments, function(a) {
          return a;
        });
      }

      // A bubbled up version of 'change' event for the children.

      var broadcast = _.bind(function(id, property, value, closed, curved) {
        this.trigger(Two.Events.change, id, property, value, closed, curved);
      }, this);

      // Add the objects

      _.each(objects, function(object) {

        var id = object.id, parent = object.parent;

        if (_.isUndefined(id)) {
          grandparent.add(object);
          id = object.id;
        }

        if (_.isUndefined(children[id])) {
          // Release object from previous parent.
          if (parent) {
            delete parent.children[id];
          }
          // Add it to this group and update parent-child relationship.
          children[id] = object;
          object.parent = this;
          object.unbind(Two.Events.change)
            .bind(Two.Events.change, broadcast);
          ids.push(id);
        }

      }, this);

      if (ids.length > 0) {
        this.trigger(Two.Events.change, this.id, 'hierarchy', ids);
      }

      return this;

    }

  });

})();