(function() {

  /**
   * Constants
   */

  var min = Math.min, max = Math.max, round = Math.round;

  var Polygon = Two.Polygon = function(vertices, closed, curved) {

    Two.Shape.call(this);

    // Further getter setters for Polygon for closed and curved properties

    // Add additional logic for watching the vertices.

    closed = !!closed;
    curved = !!curved;
    
    var beginning = 0.0;
    var ending = 1.0;
    var strokeChanged = false;
    var verticesChanged = false;
    var verticesCollection = new Two.Utils.Collection();
    var renderedVertices = vertices.slice(0);

    var updateVertices = _.debounce(_.bind(function(property) { // Call only once a frame.

      var l, ia, ib, last;

      if (strokeChanged || verticesChanged) {

        l = verticesCollection.length;
        last = l - 1;

        ia = round((beginning) * last);
        ib = round((ending) * last);

        renderedVertices.length = 0;

        for (var i = ia; i < ib + 1; i++) {
          var v = verticesCollection[i];
          renderedVertices.push(new Two.Vector(v.x, v.y));
        }

      }


      this.trigger(Two.Events.change,
        this.id, 'vertices', renderedVertices, closed, curved, strokeChanged);

      strokeChanged = false;
      verticesChanged = false;
      
    }, this), 0);

    Object.defineProperty(this, 'closed', {
      get: function() {
        return closed;
      },
      set: function(v) {
        closed = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'curved', {
      get: function() {
        return curved;
      },
      set: function(v) {
        curved = !!v;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'beginning', {
      get: function() {
        return beginning;
      },
      set: function(v) {
        beginning = min(max(v, 0.0), 1.0);
        strokeChanged = true;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'ending', {
      get: function() {
        return ending;
      },
      set: function(v) {
        ending = min(max(v, 0.0), 1);
        strokeChanged = true;
        updateVertices();
      }
    });

    Object.defineProperty(this, 'vertices', {
      get: function() {
        return verticesCollection;
      },
      set: function(vertices) {
        var polygon = this,
            bindVerts = function(items) {
          
              _.each(items, function(v) {

                v.bind(Two.Events.change, updateVertices);

              }, polygon);

              verticesChanged = true; // Update rendered Vertices
              updateVertices();

            },
            unbindVerts = function(items) {
          
              _.each(items, function(v) {

                v.unbind(Two.Events.change, updateVertices);

              }, polygon);

              verticesChanged = true; // Update rendered Vertices
              updateVertices();

            };

        // Remove previous listeners
        if(verticesCollection) {
          verticesCollection.off();
        }

        // Create new Collection with copy of vertices
        verticesCollection = new Two.Utils.Collection(vertices.slice(0));

        // Listen for Collection changes and bind / unbind
        verticesCollection.on("inserted", bindVerts);
        verticesCollection.on("removed",  unbindVerts);
        
        // Bind Initial Vertices 
        verticesChanged = true;
        bindVerts(verticesCollection);

      }
    });

    this.vertices = vertices;    

  };

  _.extend(Polygon.prototype, Two.Shape.prototype, {

    clone: function() {

      var points = _.map(this.vertices, function(v) {
        return new Two.Vector(v.x, v.y);
      });

      var clone = new Polygon(points, this.closed, this.curved);

      _.each(Two.Shape.Properties, function(k) {
        clone[k] = this[k];
      }, this);

      clone.translation.copy(this.translation);
      clone.rotation = this.rotation;
      clone.scale = this.scale;

      return clone;

    },

    /**
     * Orient the vertices of the shape to the upper lefthand
     * corner of the polygon.
     */
    corner: function() {

      var rect = this.getBoundingClientRect(true);
      var corner = { x: rect.left, y: rect.top };

      _.each(this.vertices, function(v) {
        v.subSelf(corner);
      });

      return this;

    },

    /**
     * Orient the vertices of the shape to the center of the
     * polygon.
     */
    center: function() {

      var rect = this.getBoundingClientRect(true);

      rect.centroid = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      _.each(this.vertices, function(v) {
        v.subSelf(rect.centroid);
      });

      // this.translation.addSelf(rect.centroid);

      return this;

    },

    /**
     * Remove self from the scene / parent.
     */
    remove: function() {

      if (!this.parent) {
        return this;
      }

      this.parent.remove(this);

      return this;

    },

    /**
     * TODO: Make a shallow and a deep request.
     */
    getBoundingClientRect: function(shallow) {

      var border = this.linewidth;
      var left = Infinity, right = -Infinity,
        top = Infinity, bottom = -Infinity;

      _.each(this.vertices, function(v) {
        var x = v.x, y = v.y;
        top = Math.min(y, top);
        left = Math.min(x, left);
        right = Math.max(x, right);
        bottom = Math.max(y, bottom);
      });

      // Expand borders

      top -= border;
      left -= border;
      right += border;
      bottom += border;

      var matrix = !!shallow ? this._matrix : Two.Utils.getComputedMatrix(this);

      var ul = matrix.multiply(left, top, 1);
      var ll = matrix.multiply(right, bottom, 1);

      return {
        top: ul.y,
        left: ul.x,
        right: ll.x,
        bottom: ll.y,
        width: ll.x - ul.x,
        height: ll.y - ul.y
      };

    }

  });


})();
