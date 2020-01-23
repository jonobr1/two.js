# Two.js

A two-dimensional drawing api geared towards modern web browsers. It is renderer agnostic enabling the same api to draw in multiple contexts: svg, canvas, and webgl.

## Download

[Development Version](https://raw.githubusercontent.com/jonobr1/two.js/master/build/two.js): Uncompressed with comments about `128kb`.

[Production Version](https://raw.githubusercontent.com/jonobr1/two.js/master/build/two.min.js): Minified using Closure Compiler about `50kb`.

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
Two.js has a built in animation loop. It is simple in nature and can be automated or paired with another animation library. For more information check out the [examples](../examples).

#### SVG Interpreter
Two.js features a [Scalable Vector Graphics](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) Interpreter. This means developers and designers alike can create SVG elements in commercial applications like [Adobe Illustrator](http://www.adobe.com/products/illustrator) and bring them into your two.js scene. For more information check out the [examples](../examples).
