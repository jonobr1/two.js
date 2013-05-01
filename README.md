![two.js](http://jonobr1.github.io/two.js/images/logo.gif)

A two-dimensional drawing api meant for modern browsers. It is renderer agnostic enabling the same api to render in multiple contexts: webgl, canvas2d, and svg.

[Home](http://jonobr1.github.com/two.js) • [Examples](http://jonobr1.github.com/two.js/#examples) • [Documentation](http://jonobr1.github.com/two.js/#documentation) • [Help](http://stackoverflow.com/questions/tagged/two.js)

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
cd two.js/utils
node build
```

## Change Log

2013 05 01 v0.2.0
+ First alpha release

Jan 29, 2013 [v0.1.0-alpha](https://github.com/jonobr1/two.js/tree/v0.1.0-alpha)
+ Proof of Concept built from Three.js