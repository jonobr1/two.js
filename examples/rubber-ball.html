<!doctype html>
<html>
  <head>
    <title>Two.js: Rubber Ball</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="image_src" href="../images/logo.gif" />
    <link rel="shortcut icon" type="image/gif" href="../images/favicon.gif">
    <script src="../third-party/url.js"></script>
    <script src="../third-party/jquery.js"></script>
    <script src="../third-party/two.js"></script>
    <style>
      * { margin: 0; padding: 0; cursor: none; }
      body { background: #fcb215; } 
    </style>
  </head>
  <body>
    <div class="scripts">
      <script>

        $(function() {

          var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
          var two = new Two({
            type: Two.Types[type],
            fullscreen: true,
            autostart: true
          }).appendTo(document.body);

          Two.Resoultion = 32;

          var delta = new Two.Vector();
          var mouse = new Two.Vector();
          var drag = 0.33;
          var radius = 50;

          var shadow = two.makeCircle(two.width / 2, two.height / 2, radius);
          shadow.noStroke().fill = 'rgba(0, 0, 0, 0.2)';
          shadow.offset = new Two.Vector(- radius / 2, radius * 2);
          shadow.scale = 0.85;

          var ball = two.makeCircle(two.width / 2, two.height / 2, radius);
          ball.noStroke().fill = 'white';

          _.each(ball.vertices, function(v) {
            v.origin = new Two.Vector().copy(v);
          });

          var $window = $(window)
            .bind('mousemove', function(e) {
              mouse.x = e.clientX;
              mouse.y = e.clientY;
              shadow.offset.x = 5 * radius * (mouse.x - two.width / 2) / two.width;
              shadow.offset.y = 5 * radius * (mouse.y - two.height / 2) / two.height;
            })
            .bind('touchstart', function() {
              e.preventDefault();
              return false;
            })
            .bind('touchmove', function(e) {
              e.preventDefault();
              var touch = e.originalEvent.changedTouches[0];
              mouse.x = touch.pageX;
              mouse.y = touch.pageY;
              shadow.offset.x = 5 * radius * (mouse.x - two.width / 2) / two.width;
              shadow.offset.y = 5 * radius * (mouse.y - two.height / 2) / two.height;
              return false;
            });

          two.bind('update', function() {

            delta.copy(mouse).subSelf(ball.translation);

            _.each(ball.vertices, function(v, i) {

              var dist = v.origin.distanceTo(delta);
              var pct = dist / radius;

              var x = delta.x * pct;
              var y = delta.y * pct;

              var destx = v.origin.x - x;
              var desty = v.origin.y - y;

              v.x += (destx - v.x) * drag;
              v.y += (desty - v.y) * drag;

              shadow.vertices[i].copy(v);

            });

            ball.translation.addSelf(delta);

            shadow.translation.copy(ball.translation);
            shadow.translation.addSelf(shadow.offset);

          });

      });

      </script>
    </div>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-40550435-1', 'github.com');
      ga('send', 'pageview');

    </script>
  </body>
</html>