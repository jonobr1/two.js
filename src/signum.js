$(function() {

  var $container = $('#introduction');

  var two = new Two({
    width: 285,
    height: 80,
    type: Two.Types.svg
  }).appendTo($container[0]);

  var width = 44, height = 64;
  var half_width = width / 2;
  var quart_width = half_width / 2;
  var half_height = height / 2;
  var quart_height = half_height / 2;

  var t = makeT(255, 64, 64);
  t.scale = 0;
  t.translation.x = - width * 1.33;

  var w = makeW(255, 128, 0);
  w.scale = 0;
  w.translation.x = 0;

  var o = makeO(0, 191, 168);
  o.scale = 0;
  o.translation.x = width * 1.33;

  var group = two.makeGroup(t, w, o);
  group.translation.set(two.width / 2, two.height / 2);
  group.scale = 3 * (285 / 486);

  t.scale = w.scale = o.scale = 0;

  two
    .bind('update', function(frames) {

      var tScale = t.scale;

      if (tScale >= 1.0 - 0.0001) {
        two.pause();
        return;
      }

      var s = tScale + (1.0 - tScale) * 0.2;
      t.scale = s;
      w.scale = s;
      o.scale = s;

    });

    _.defer(_.bind(two.play, two));

    function makeT(r, g, b) {

      var a = two.makeRectangle(0, 0, width, quart_width);
      var c = two.makeRectangle(0, 0, quart_width, width);
      var rgb = r +',' + g + ',' + b;

      a.fill = c.fill = 'rgba(' + rgb + ',' + 0.33 + ')';
      a.stroke = c.stroke = 'rgb(' + rgb + ')';
      a.linewidth = c.linewidth = 1;

      return two.makeGroup(a, c);

    }

    function makeW(r, g, b) {

      var x1 = 0, y1 = height * 0.3125;
      var x2 = half_width, y2 = - y1;
      var x3 = - x2, y3 = y2;

      var a = two.makePath(x1, y1, x2, y2, x3, y3);
      var c = two.makePath(x1, y1, x2, y2, x3, y3);

      a.translation.x = - width * 0.25;
      c.translation.set(a.translation.x + half_width, a.translation.y);

      var rgb = Math.round(r) +',' + Math.round(g) + ',' + Math.round(b);

      a.fill = c.fill = 'rgba(' + rgb + ',' + 0.33 + ')';
      a.stroke = c.stroke = 'rgb(' + rgb + ')';
      a.linewidth = c.linewidth = 1;

      return two.makeGroup(a, c);

    }

    function makeO(r, g, b) {

      var a = two.makeCircle(0, 0, half_width);
      var c = two.makeCircle(0, 0, width * 0.125);
      var rgb = Math.round(r) +',' + Math.round(g) + ',' + Math.round(b);

      a.fill = c.fill = 'rgba(' + rgb + ',' + 0.33 + ')';
      a.stroke = c.stroke = 'rgb(' + rgb + ')';
      a.linewidth = c.linewidth = 1;

      return two.makeGroup(a, c);

    }

});
