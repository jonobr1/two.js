---
title: Two.js • Homepage
lang: en-US
---

# Two.js

A two-dimensional drawing api geared towards modern web browsers. It is renderer agnostic enabling the same api to draw in multiple contexts: svg, canvas, and webgl.

<div>
<custom-button text="Github" type="github" href="https://github.com/jonobr1/two.js" />
<custom-button text="Sponsor" type="sponsor" href="https://github.com/sponsors/jonobr1" />
</div>

<carbon-ads />

## Download

<h3 class="visible"><a href="#download">Download</a></h3>

<div>
<custom-button text="Development" type="download" href="https://raw.githubusercontent.com/jonobr1/two.js/dev/build/two.js" :size="$themeConfig.developmentSize" />
<custom-button text="Production" type="download" href="https://raw.githubusercontent.com/jonobr1/two.js/dev/build/two.min.js" :size="$themeConfig.productionSize" />
</div>

::: tip
Prior to v0.7.0-alpha.1 Two.js requires Underscore.js and Backbone.js Events. If you're already loading these files elsewhere then you can build the project yourself and get the file size even smaller. For more information on custom builds check out the source on github.
:::

Node.js Version with npm:
```
npm install --save two.js@latest
```

## Overview

<h3 class="visible"><a href="#overview">Overview</a></h3>

* #### Focus on Vector Shapes
  Two.js is deeply inspired by flat [motion graphics](http://en.wikipedia.org/wiki/Motion_graphics). As a result, two.js aims to make the creation and animation of flat shapes easier and more concise.

* #### Scenegraph
  At its core two.js relies on a [scenegraph](http://en.wikipedia.org/wiki/Scene_graph). This means that when you draw or create an object (a Two.Path or Two.Group), two actually stores and remembers that. After you make the object you can apply any number of operations to it — e.g: rotation, position, scale, etc..

* #### Animation Loop
  Two.js has a built in animation loop. It is simple in nature and can be automated or paired with another animation library. For more information check out the [examples](/examples/).

* #### SVG Interpreter
  Two.js features a [Scalable Vector Graphics](http://en.wikipedia.org/wiki/Scalable_Vector_Graphics) Interpreter. This means developers and designers alike can create SVG elements in commercial applications like [Adobe Illustrator](http://www.adobe.com/products/illustrator) and bring them into your two.js scene. For more information check out the [examples](/examples/).

* #### Friends with Bitmap Imagery
  Despite its early focus on easing vector shape creation and animation, Two.js offers many easy-to-use features to handle and render bitmap images. Easily load single images, sprite sheets, and image sequences with just a few method calls.

## Basic Usage

<h3 class="visible"><a href="#basic-usage">Basic Usage</a></h3>

In order to start any of these demos you'll want to [download](#download) two.js and add it to your HTML document. Once downloaded add this tag to the `<head>` of your document: `<script src="./path-to-two/two.js"></script>`. When you visit the page, you should be able to open up the console and type `Two`. If this returns a function (and not an error) then you're ready to begin!

## Drawing Your First Shapes

<h3 class="visible"><a href="#drawing-your-first-shapes">Drawing Your First Shapes</a></h3>

Before we get into all the fancy animating it's good to get a feel for how to make shapes in two.js. In order to do this we need to have an instance of two. This sets up a dom element that contains either an svg or canvas element to add to the webpage. The two object has a scene which holds all shapes as well as methods for creating shapes.

::: tip
For a list of all properties and construction parameters check out the [documentation](./docs/).
:::

<inline-editor scripts="https://cdn.jsdelivr.net/npm/two.js@latest/build/two.js">
// Make an instance of two and place it on the page.
var params = { fullscreen: true };
var elem = document.body;
var two = new Two(params).appendTo(elem);

// Two.js has convenient methods to make shapes and insert them into the scene.
var radius = 50;
var x = two.width * 0.5;
var y = two.height * 0.5 - radius * 1.25;
var circle = two.makeCircle(x, y, radius);

y = two.height * 0.5 + radius * 1.25;
var width = 100;
var height = 100;
var rect = two.makeRectangle(x, y, width, height);

// The object returned has many stylable properties:
circle.fill = '#FF8000';
// And accepts all valid CSS color:
circle.stroke = 'orangered';
circle.linewidth = 5;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();

// Don’t forget to tell two to draw everything to the screen
two.update();

</inline-editor>

## Shapes and Groups

<h3 class="visible"><a href="#shapes-and-groups">Shapes and Groups</a></h3>

Adding shapes to groups makes managing multiple shapes easier and more sane. Group's provide an easy way to move your content through `position`, `rotation`, and `scale`. These operations emit from the coordinate space `(0, 0)`. In the example below we can see that the initial orientation of the circle and rectangle changed from the first example. These shapes are oriented around `(0, 0)`, which allows us to transform the group around the centeroid of the shapes. In addition Group's styling operations trickle down and apply to each shape.

<inline-editor scripts="https://cdn.jsdelivr.net/npm/two.js@latest/build/two.js">
var params = { fullscreen: true }
var elem = document.body;
var two = new Two(params).appendTo(elem);

var circle = two.makeCircle(-70, 0, 50);
var rect = two.makeRectangle(70, 0, 100, 100);
circle.fill = '#FF8000';
circle.stroke = 'orangered';
rect.fill = 'rgba(0, 200, 255, 0.75)';
rect.stroke = '#1C75BC';

// Groups can take an array of shapes and/or groups.
var group = two.makeGroup(circle, rect);

// And have position, rotation, scale like all shapes.
group.position.set(two.width / 2, two.height / 2);
group.rotation = Math.PI;
group.scale = 0.75;

// You can also set the same properties a shape have.
group.linewidth = 7;

two.update();

</inline-editor>

## Adding Motion

<h3 class="visible"><a href="#adding-motion">Adding Motion</a></h3>

Finally, let's add some motion to our shapes. So far the examples use `two.update();` to draw content to the screen. The instance of two.js has two particular methods for animation. The first is `two.play();` which calls `two.update();` at 60 frames-per-second. This rate, however, will slowdown if there's too much content to render per frame.

The second method is `two.bind();` This method takes a string as its first parameter indicating what event to listen to and a function as its second argument delineating what to do when the event described in the first parameter happens. To sync a function with the animation loop simply invoke `two.bind('update', referenceToFunction);` as outlined below:

<inline-editor scripts="https://cdn.jsdelivr.net/npm/two.js@latest/build/two.js">
var params = { fullscreen: true };
var elem = document.body;
var two = new Two(params).appendTo(elem);

var circle = two.makeCircle(-70, 0, 50);
var rect = two.makeRectangle(70, 0, 100, 100);
circle.fill = '#FF8000';
rect.fill = 'rgba(0, 200, 255, 0.75)';

var cx = two.width * 0.5;
var cy = two.height * 0.5;
var group = two.makeGroup(circle, rect);
group.position.set(cx, cy);
group.scale = 0;
group.noStroke();

// Bind a function to scale and rotate the group to the animation loop.
two.bind('update', update);
// Finally, start the animation loop
two.play();

function update(frameCount) {
  // This code is called every time two.update() is called.
  if (group.scale > 0.9999) {
    group.scale = group.rotation = 0;
  }
  var t = (1 - group.scale) * 0.125;
  group.scale += t;
  group.rotation += t * 4 * Math.PI;
}

</inline-editor>

### Next Steps

Now that you got a quick glimpse into some of the functionality two.js offers, check out the [official](/examples/#official-examples) and [community](/examples/#community-examples) examples to see what else you can do. These examples range from showing off specific features of the library to using the library in other environments, like [React](/examples/#react) and [Angular](/examples/#angular).

Looking for more information on a specific property? Then head over to the [documentation](/docs/two/) which outlines all of the library's public features.

Haven't found what you're looking for? Then ask a question on our [GitHub](https://github.com/jonobr1/two.js/issues/new?assignees=&labels=question&template=question.md&title=%5BQuestion%5D) page.

---

<br />

#### Project Credits

Two.js is dependency free, but its creation would not have been possible without these great contributions to the JavaScript ecosystem:

<div class="inspiration">

+ [Three.js](http://threejs.org/)
+ [Vuepress](https://vuepress.vuejs.org/)
+ [Underscore.js](https://underscorejs.org/)
+ [Backbone.js](https://backbonejs.org/)
+ [QUnit](https://qunitjs.com/)
+ [Resemble.js](https://github.com/rsmbl/Resemble.js)
+ [Canvas2Blob](https://github.com/blueimp/JavaScript-Canvas-to-Blob)
+ [jsdoc](https://jsdoc.app/)
+ [ESLint](https://eslint.org/)
+ [rollup.js](https://rollupjs.org/)

</div>

<div class="project-footnote">

Two.js is a project by [Jono](http://jono.fyi/) and numerous [contributors](https://github.com/jonobr1/two.js/graphs/contributors)

Site design by [Yuin](https://yuinchien.com/) • Site development in collaboration with [Tonia](https://toniab.com/)

Published under the [MIT License](https://github.com/jonobr1/two.js/blob/dev/LICENSE) © 2012 – {{ 1900 + new Date().getYear() }}

</div>

---
