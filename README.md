<svg version="1.1" style="visibility: visible;" width="285" height="80"><g transform="matrix(1 0 0 1 0 0)" visibility="hidden"><g id="two-10" transform="matrix(1.759 0 0 1.759 142.5 40)" visibility="hidden"><g id="two-3" transform="matrix(1 0 0 1 -58.52 0)" visibility="hidden"><path id="two-1" transform="matrix(1 0 0 1 0 0)" stroke="rgb(255,64,64)" fill="rgba(255,64,64,0.33)" fill-opacity="1" stroke-opacity="1" visibility="visible" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1" stroke-width="1" d="M 22.000 5.500 L -22.000 5.500 L -22.000 -5.500 L 22.000 -5.500 Z"></path><path id="two-2" transform="matrix(1 0 0 1 0 0)" stroke="rgb(255,64,64)" fill="rgba(255,64,64,0.33)" fill-opacity="1" stroke-opacity="1" visibility="visible" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1" stroke-width="1" d="M 5.500 22.000 L -5.500 22.000 L -5.500 -22.000 L 5.500 -22.000 Z"></path></g><g id="two-6" transform="matrix(1 0 0 1 0 0)" visibility="hidden"><path id="two-4" transform="matrix(1 0 0 1 -11 0)" stroke="rgb(255,128,0)" fill="rgba(255,128,0,0.33)" fill-opacity="1" stroke-opacity="1" visibility="visible" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1" stroke-width="1" d="M 0.000 20.000 L 22.000 -20.000 L -22.000 -20.000 Z"></path><path id="two-5" transform="matrix(1 0 0 1 11 0)" stroke="rgb(255,128,0)" fill="rgba(255,128,0,0.33)" fill-opacity="1" stroke-opacity="1" visibility="visible" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1" stroke-width="1" d="M 0.000 20.000 L 22.000 -20.000 L -22.000 -20.000 Z"></path></g><g id="two-9" transform="matrix(1 0 0 1 58.52 0)" visibility="hidden"><path id="two-7" transform="matrix(1 0 0 1 0 0)" stroke="rgb(0,191,168)" fill="rgba(0,191,168,0.33)" fill-opacity="1" stroke-opacity="1" visibility="visible" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1" stroke-width="1" d="M 22.000 0.000 C 22.000 5.557 19.485 11.627 15.556 15.556 C 11.627 19.485 5.557 22.000 0.000 22.000 C -5.557 22.000 -11.627 19.485 -15.556 15.556 C -19.485 11.627 -22.000 5.557 -22.000 0.000 C -22.000 -5.557 -19.485 -11.627 -15.556 -15.556 C -11.627 -19.485 -5.557 -22.000 -0.000 -22.000 C 5.557 -22.000 11.627 -19.485 15.556 -15.556 C 19.485 -11.627 22.000 -5.557 22.000 0.000 Z"></path><path id="two-8" transform="matrix(1 0 0 1 0 0)" stroke="rgb(0,191,168)" fill="rgba(0,191,168,0.33)" fill-opacity="1" stroke-opacity="1" visibility="visible" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1" stroke-width="1" d="M 5.500 0.000 C 5.500 1.389 4.871 2.907 3.889 3.889 C 2.907 4.871 1.389 5.500 0.000 5.500 C -1.389 5.500 -2.907 4.871 -3.889 3.889 C -4.871 2.907 -5.500 1.389 -5.500 0.000 C -5.500 -1.389 -4.871 -2.907 -3.889 -3.889 C -2.907 -4.871 -1.389 -5.500 -0.000 -5.500 C 1.389 -5.500 2.907 -4.871 3.889 -3.889 C 4.871 -2.907 5.500 -1.389 5.500 0.000 Z"></path></g></g></g></svg>

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