<h1 id="masthead" style="display: block; width: 285px; height: 80px; background: url(http://jonobr1.github.io/two.js/images/logo.gif) center center no-repeat; overflow: hidden; text-indent: -9999px;">two.js</h1>

A two-dimensional drawing api meant for modern browsers. It is renderer agnostic enabling the same api to render in multiple contexts: webgl, canvas2d, and svg.

[Home](http://jonobr1.github.com/two.js) • [Examples](http://jonobr1.github.com/two.js/#examples) • [Documentation](http://jonobr1.github.com/two.js/#documentation) • [Help](https://github.com/jonobr1/two.js/issues?labels=question)

## Usage
Download the [minified library](https://raw.github.com/jonobr1/two.js/master/build/two.min.js) and include it in your html. Alternatively see [how to build the library yourself](https://github.com/jonobr1/two.js#custom-build).

```html
<script src="js/two.min.js"></script>
```

Here is boilerplate html in order to draw a spinning rectangle in two.js:

```html
<!doctype html>
<html>
  <head>
    <script src="js/two.min.js"></script>
  </head>
  <body>
    <script>
      var two = new Two({
        fullscreen: true,
        autostart: true
      }).appendTo(document.body);
      var rect = two.makeRectangle(two.width / 2, two.height / 2, 50 ,50);
      two.bind('update', function() {
        rect.rotation += 0.001;
      });
    </script>
  </body>
</html>
```

## Custom Build
Two.js uses [nodejs](http://nodejs.org/) in order to build source files. You'll first want to install that. Next you'll want to install [node-minify](https://npmjs.org/package/node-minify):

```
cd two.js/utils
npm install node-minify
```

Then open up `./utils/build.js` in the text editor of your choice. You'll see an array at the top called `files`. This is the list and order of source files that get compiled to the built source. Feel free to add, subtract, or modify based on your needs.

If you're making an application and you're only using one renderer (i.e: svg context) then it is highly recommended to remove canvas and webgl renderers from your build in order to drastically decrease your file size.

Finally, build the project:

```
node two.js/utils/build
```

## Change Log

Nightly
+ Added `remove` and `clear` methods to `two` instance
+ Fixed svg interpretation for `webgl` context
+ Added matrix property to all `Two.Shape`'s for advanced transformations
+ Remove execution path dependency on utils/build.js [@masonbiler](https://github.com/masonbiler)
+ Added `timeDelta` property to every `two` instance
+ Added gruntfile, package.json for more integration with `npm`, and dependency free build (`build/two.clean.js`) [@iros](https://github.com/iros)
+ Crossbrowser compatability with `noStroke` and `noFill` commands

May 3, 2013 [v0.2.0](https://github.com/jonobr1/two.js/tree/v0.2.0)
+ First alpha release

Jan 29, 2013 [v0.1.0-alpha](https://github.com/jonobr1/two.js/tree/v0.1.0-alpha)
+ Proof of Concept built from Three.js