# Two.js

A two-dimensional drawing api geared towards modern web browsers. It is renderer agnostic enabling the same api to draw in multiple contexts: svg, canvas, and webgl.

## Download

[Development Version](https://raw.githubusercontent.com/jonobr1/two.js/master/build/two.js): Uncompressed with comments about {{ $themeConfig.developmentSize }}.

[Production Version](https://raw.githubusercontent.com/jonobr1/two.js/master/build/two.min.js): Minified using [Rollup](https://rollupjs.org/) about {{ $themeConfig.productionSize }}.

::: tip
Prior to v0.7.0-alpha.1 Two.js requires Underscore.js and Backbone.js Events. If you're already loading these files elsewhere then you can build the project yourself and get the file size even smaller. For more information on custom builds check out the source on github.
:::

Node.js Version with `npm`:
```bash
npm install --save two.js@latest
```

## Overview
#### Focus on Vector Shapes
Two.js is deeply inspired by flat [motion graphics](http://en.wikipedia.org/wiki/Motion_graphics). As a result, two.js aims to make the creation and animation of flat shapes easier and more concise.

#### Scenegraph
At its core two.js relies on a [scenegraph](http://en.wikipedia.org/wiki/Scene_graph). This means that when you draw or create an object (a Two.Path or Two.Group), two actually stores and remembers that. After you make the object you can apply any number of operations to it — e.g: rotation, translation, scale, etc..

#### Animation Loop
Two.js has a built in animation loop. It is simple in nature and can be automated or paired with another animation library. For more information check out the [examples](./examples/).

#### SVG Interpreter
Two.js features a [Scalable Vector Graphics](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) Interpreter. This means developers and designers alike can create SVG elements in commercial applications like [Adobe Illustrator](http://www.adobe.com/products/illustrator) and bring them into your two.js scene. For more information check out the [examples](./examples/).

## Basic Usage
In order to start any of these demos you'll want to [download](#download) two.js and add it to your HTML document. Once downloaded add this tag to the `<head>` of your document: `<script src="./path-to-two/two.js"></script>`. When you visit the page, you should be able to open up the console and type `Two`. If this returns a function (and not an error) then you're ready to begin!

## Drawing Your First Shapes
Before we get into all the fancy animating it's good to get a feel for how to make shapes in two.js. In order to do this we need to have an instance of two. This sets up a dom element that contains either an svg or canvas element to add to the webpage. The two object has a scene which holds all shapes as well as methods for creating shapes.

::: tip
For a list of all properties and construction parameters check out the [documentation](./documentation/).
:::

<inline-editor>
```
// Make an instance of two and place it on the page.
var elem = document.getElementById('draw-shapes');
var params = { width: 285, height: 200 };
var two = new Two(params).appendTo(elem);

// two has convenience methods to create shapes.
var circle = two.makeCircle(72, 100, 50);
var rect = two.makeRectangle(213, 100, 100, 100);

// The object returned has many stylable properties:
circle.fill = '#FF8000';
circle.stroke = 'orangered'; // Accepts all valid css color
circle.linewidth = 5;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();

// Don't forget to tell two to render everything
// to the screen
two.update();
```
</inline-editor>
