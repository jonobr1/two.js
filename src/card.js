(function() {

  var root = this;
  var previousCard = root.Card || {};

  var Card = root.Card = function(type, message) {

    var scope = this;

    this.two = new Two({
      type: Two.Types.canvas
    });

    _.extend(this.two.renderer.domElement.style, {
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    });

    this._resize = function() {

      var width = scope.two.width = window.innerWidth;
      var height = scope.two.height = window.innerHeight;

      scope.two.renderer.setSize(width, height, scope.two.ratio);
      scope.two.trigger(Two.Events.resize, width, height);

    };
    window.addEventListener('resize', this._resize, false);

    this.type = type;
    this.message = message;
    this.two.bind('update', function() {

      for (var i = 0; i < scope.elements.length; i++) {

        var shape = scope.elements[i];
        if (!shape.velocity) {
          continue;
        }

        shape.rotation += shape.velocity;

      }

    });

  };

  _.extend(Card, {

    Colors: {
      red: 'rgb(255, 64, 64)',
      orange: 'rgb(255, 128, 0)',
      blue: 'rgb(0, 200, 255)',
      green: 'rgb(0, 191, 168)',
      purple: 'rgb(153, 102, 255)',
      yellow: 'rgb(255, 244, 95)',
      list: ['red', 'orange', 'blue', 'green', 'yellow', 'purple']
    }

  });

  _.extend(Card.prototype, {

    padding: 100,
    duration: 500,
    amount: 20,

    appendTo: function(elem) {
      this.two.appendTo(elem);
      this._resize();
      return this;
    },

    update: function() {

      var scope = this;
      var two = this.two;
      var padding = this.padding;
      var styles = {
        family: 'proxima-nova, sans-serif',
        size: 50,
        leading: 50,
        weight: 900,
        fill: '#333'
      };

      /**
       * Setup the background based on the type.
       * e.g: Colors and shapes based on + / -
       */
      switch (this.type) {
        case 'positive':
          this.elements = _.map(_.range(this.amount), function(i) {

            var ox = Math.random() * two.width;
            var oy = Math.random() * two.height;

            var or = Math.random() * this.padding + this.padding / 2;
            var ir = or / 2;
            var sides = Math.floor(Math.random() * 4) + 4;

            var color = Card.Colors[
              Card.Colors.list[Math.floor(Math.random() * Card.Colors.list.length)]
            ];

            var shape = two.makeStar(ox, oy, or, ir, sides);
            shape.scale = 0;
            shape.fill = color;
            shape.stroke = color;
            shape.linewidth = 8;
            shape.velocity = 2 * (Math.random() - 0.5) / 10;
            shape.join = 'round';

            var delay = Math.random() * this.duration;

            var show = new TWEEN.Tween(shape)
              .to({ scale: 1 }, this.duration)
              .delay(delay)
              .easing(TWEEN.Easing.Elastic.Out);
            var hide = new TWEEN.Tween(shape)
              .to({ scale: 0 }, this.duration)
              .delay(delay)
              .easing(TWEEN.Easing.Elastic.In);

            shape.show = function(callback) {
              show
                .onComplete(function() {
                  if (_.isFunction(callback)) {
                    callback();
                  }
                })
                .start();
            };
            shape.hide = function(callback) {
              hide
                .onComplete(function() {
                  if (_.isFunction(callback)) {
                    callback();
                  }
                })
                .start();
            };

            return shape;

          }, this);
          break;
        case 'negative':
          // TODO:
          break;
      }

      var next = function() {

        if (!next.completed && next.index >= intertitles.length) {
          next.completed = true;
          var complete = _.after(scope.elements.length, scope.onComplete);
          _.each(scope.elements, function(shape) {
            shape.hide(function() {
              Two.Utils.release(shape);
              two.remove(shape);
              complete();
            });
          });
          return;
        }

        intertitles[next.index].start();
        next.index++;

      };
      next.index = 0;
      next.completed = false;

      var intertitles = _.map(this.message.split('\n'), function(message) {

        var x = two.width / 2;
        var y = two.height / 2;
        var text = two.makeText(message, x, y + padding, styles);

        text.opacity = 0;

        var a = new TWEEN.Tween(text.translation)
          .to({ y: y }, this.duration)
          .easing(TWEEN.Easing.Circular.Out)
          .onUpdate(function(t) {
            text.opacity = t;
          })
          .onComplete(function() {
            b.start();
          });

        var b = new TWEEN.Tween(text.translation)
          .to({ y: y - padding }, this.duration)
          .delay(this.duration * 2)
          .easing(TWEEN.Easing.Circular.In)
          .onUpdate(function(t) {
            text.opacity = 1 - t;
          })
          .onComplete(function() {
            two.remove(text);
            Two.Utils.release(text);
            next();
          });

        text.start = function() {
          a.start();
        };

        return text;

      }, this);

      two.play();
      next();
      _.each(this.elements, function(shape) {
        shape.show();
      });

      return this;

    },

    onComplete: _.identity

  });

})();
