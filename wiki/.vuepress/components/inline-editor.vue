<template>
<pre data-lang="js">// Import Two.js from a CDN
  
import Two from 'https://cdn.skypack.dev/two.js@latest';

// Make an instance of two and place it on the page.
// `container` is an element that is provided in this sandbox.
var params = { fitted: true };
var two = new Two(params).appendTo(document.body);


// two has convenience methods to create shapes.
var radius = 50;
var x = two.width * 0.5;
var y = two.height * 0.5 - radius * 2;
var circle = two.makeCircle(x, y, radius);

y = two.height * 0.5 + radius * 2;
var width = 100;
var height = 100;
var rect = two.makeRectangle(x, y, width, height);

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

</pre>

</template>

<script>

  module.exports = {
    name: 'inline-editor',
    props: {

    },
    mounted: function() {

    },
    beforeDestroyed: function() {

    }
  };

</script>

<style lang="stylus" scoped>

</style>
