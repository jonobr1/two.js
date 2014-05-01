<!doctype html>
<html>
  <head>
    <title>Two.js: Dynamic Vertices</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <link rel="image_src" href="../images/logo.gif" />
    <link rel="shortcut icon" type="image/gif" href="../images/favicon.gif">
    <script src="../third-party/url.js"></script>
    <script src="../third-party/jquery.js"></script>
    <script src="../third-party/two.js"></script>
  </head>
  <body>
    <div class="scripts">
      <script>

        $(function() {

          createGrid();

          var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
          var two = new Two({
            type: Two.Types[type],
            fullscreen: true,
            autostart: true
          }).appendTo(document.body);

          var x, y, line, mouse = new Two.Vector(), randomness = 2;

          var drag = function(e) {
            x = e.clientX;
            y = e.clientY;
            if (!line) {
              var v1 = makePoint(mouse);
              var v2 = makePoint(x, y);
              line = two.makeCurve([v1, v2], true);
              line.noFill().stroke = '#333';
              line.linewidth = 10;
              _.each(line.vertices, function(v) {
                v.addSelf(line.translation);
              });
              line.translation.clear();
            } else {
              var v1 = makePoint(x, y);
              line.vertices.push(v1);
            }
            mouse.set(x, y);
          };

          var dragEnd = function(e) {
            $(window)
              .unbind('mousemove', drag)
              .unbind('mouseup', dragEnd);
          };

          var touchDrag = function(e) {
            e.preventDefault();
            var touch = e.originalEvent.changedTouches[0];
            drag({
              clientX: touch.pageX,
              clientY: touch.pageY
            });
            return false;
          };

          var touchEnd = function(e) {
            e.preventDefault();
            $(window)
              .unbind('touchmove', touchDrag)
              .unbind('touchend', touchEnd);
            return false;
          };

          $(window)
            .bind('mousedown', function(e) {
              mouse.set(e.clientX, e.clientY);
              line = null;
              $(window)
                .bind('mousemove', drag)
                .bind('mouseup', dragEnd);
            })
            .bind('touchstart', function(e) {
              e.preventDefault();
              var touch = e.originalEvent.changedTouches[0];
              mouse.set(touch.pageX, touch.pageY);
              line = null;
              $(window)
                .bind('touchmove', touchDrag)
                .bind('touchend', touchEnd);
              return false;
            });

          two.bind('update', function(frameCount, timeDelta) {
            _.each(two.scene.children, function(child) {
              _.each(child.vertices, function(v) {
                if (!v.position) {
                  return;
                }
                v.x = v.position.x + (Math.random() * randomness - randomness / 2);
                v.y = v.position.y + (Math.random() * randomness - randomness / 2);
              });
            });
          });

          function makePoint(x, y) {

            if (arguments.length <= 1) {
              y = x.y;
              x = x.x;
            }

            var v = new Two.Vector(x, y);
            v.position = new Two.Vector().copy(v);

            return v;

          }

          function createGrid(s) {

            var size = s || 30;
            var two = new Two({
              type: Two.Types.canvas,
              width: size,
              height: size
            });

            var a = two.makeLine(two.width / 2, 0, two.width / 2, two.height);
            var b = two.makeLine(0, two.height / 2, two.width, two.height / 2);
            a.stroke = b.stroke = '#6dcff6';

            two.update();

            _.defer(function() {
              $(document.body).css({
                background: 'url(' + two.renderer.domElement.toDataURL('image/png') + ') 0 0 repeat',
                backgroundSize: size + 'px ' + size + 'px'
              });
            });

          }

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