two.js
======

__This is considered pre-alpha grade__. two.js is a two-dimensional drawing api built on top of Three.js meant for modern browsers. Because it's in two-dimensions two handles the canvas, renderer, scene, and camera for you.

## Things to do before making documentation site:
+ Add `TWO.Arc`
+ Figure out how spline / curves are going to be handled
+ Figure out build procedure
+ More examples
+ Way to do unit tests? I'm thinking still image comparisons...
+ How do we deal with tweens? Morph targets are able to throw this logic onto the GPU, but I'm not sure if it makes sense to include `TWEEN` into `TWO`.
+ Is motion blur a possibility? Check out http://www.cse.yorku.ca/~shuryork/MotionBlurTest.html