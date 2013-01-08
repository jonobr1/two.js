two.js
======

__This is considered alpha grade__. two.js is a two-dimensional drawing api built on top of [three.js](http://threejs.org) meant for modern browsers. Because it's in two-dimensions two handles the canvas, renderer, scene, and camera for you.

## Things to do before making documentation site:
+ Standardize `getter` and `setter` functions.
+ ~~Make logo~~
+ ~~Add `Two.Arc`~~
+ ~~Add `Two.Group`~~
+ ~~Figure out how spline / curves are going to be handled~~
  + ~~Still need to figure out how morph works with this.~~
  + ~~How to do animate-in-out of lines a la [motion graphics](http://www.redgiantsoftware.com/products/all/trapcode-3d-stroke/).~~
+ ~~Figure out build procedure~~
+ More examples
+ ~~Way to do unit tests? I'm thinking still image comparisons...~~
  + __Started__: Just need to do 'em now.
+ ~~How do we deal with tweens? Morph targets are able to throw this logic onto the GPU, but I'm not sure if it makes sense to include `TWEEN` into `Two`.~~
  + __Won't fix__: Decided to use morph targets and let people use their own animation on top.
+ Is motion blur a possibility? Check out http://www.cse.yorku.ca/~shuryork/MotionBlurTest.html
+ Documentation / Tutorials