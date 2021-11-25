---
title: Two.Sprite
pageClass: docs
lang: en-US
---

# Two.Sprite


<div class="extends">

Extends: [Two.Rectangle](/docs/shapes/rectangle/)

</div>


A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  path  | The URL path or [Two.Texture](/docs/effects/texture/) to be used as the bitmap data displayed on the sprite. |
|  ox  | The initial `x` position of the Two.Sprite. |
|  oy  | The initial `y` position of the Two.Sprite. |
|  cols  | The number of columns the sprite contains. |
|  rows  | The number of rows the sprite contains. |
|  frameRate  | The frame rate at which the partitions of the image should playback at. |



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Sprite.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">

A list of properties that are on every [Two.Sprite](/docs/effects/sprite/).

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L86">
    sprite.js:86
  </a>

</div>




</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><a href="#MakeObservable"><span class="prefix">Two.Sprite.</span><span class="shortname">MakeObservable</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Sprite](/docs/effects/sprite/) to any object. Handy if you'd like to extend or inherit the [Two.Sprite](/docs/effects/sprite/) class on a custom class.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L94">
    sprite.js:94
  </a>

</div>




</div>



<div class="instance member ">

## texture

<h2 class="longname" aria-hidden="true"><a href="#texture"><span class="prefix">Two.Sprite.</span><span class="shortname">texture</span></a></h2>










<div class="properties">

The texture to be used as bitmap data to display image in the scene.

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L37">
    sprite.js:37
  </a>

</div>




</div>



<div class="instance member ">

## columns

<h2 class="longname" aria-hidden="true"><a href="#columns"><span class="prefix">Two.Sprite.</span><span class="shortname">columns</span></a></h2>










<div class="properties">

The number of columns to split the texture into. Defaults to `1`.

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L52">
    sprite.js:52
  </a>

</div>




</div>



<div class="instance member ">

## rows

<h2 class="longname" aria-hidden="true"><a href="#rows"><span class="prefix">Two.Sprite.</span><span class="shortname">rows</span></a></h2>










<div class="properties">

The number of rows to split the texture into. Defaults to `1`.

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L60">
    sprite.js:60
  </a>

</div>




</div>



<div class="instance member ">

## frameRate

<h2 class="longname" aria-hidden="true"><a href="#frameRate"><span class="prefix">Two.Sprite.</span><span class="shortname">frameRate</span></a></h2>










<div class="properties">

The number of frames to animate against per second. Defaults to `0` for non-animated sprites.

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L68">
    sprite.js:68
  </a>

</div>




</div>



<div class="instance member ">

## index

<h2 class="longname" aria-hidden="true"><a href="#index"><span class="prefix">Two.Sprite.</span><span class="shortname">index</span></a></h2>










<div class="properties">

The index of the current tile of the sprite to display. Defaults to `0`.

</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L76">
    sprite.js:76
  </a>

</div>




</div>



<div class="instance function ">

## play

<h2 class="longname" aria-hidden="true"><a href="#play"><span class="prefix">Two.Sprite.</span><span class="shortname">play</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  firstFrame  | The index of the frame to start the animation with. |
|  lastFrame  | The index of the frame to end the animation with. Defaults to the last item in the [Two.Sprite.textures](/docs/effects/sprite/#textures). |
|  onLastFrame  | Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped. |
</div>




<div class="description">

Initiate animation playback of a [Two.Sprite](/docs/effects/sprite/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L243">
    sprite.js:243
  </a>

</div>




</div>



<div class="instance function ">

## pause

<h2 class="longname" aria-hidden="true"><a href="#pause"><span class="prefix">Two.Sprite.</span><span class="shortname">pause</span></a></h2>















<div class="description">

Halt animation playback of a [Two.Sprite](/docs/effects/sprite/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L279">
    sprite.js:279
  </a>

</div>




</div>



<div class="instance function ">

## stop

<h2 class="longname" aria-hidden="true"><a href="#stop"><span class="prefix">Two.Sprite.</span><span class="shortname">stop</span></a></h2>















<div class="description">

Halt animation playback of a [Two.Sprite](/docs/effects/sprite/) and set the current frame back to the first frame.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L291">
    sprite.js:291
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Sprite.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Sprite



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Sprite](/docs/effects/sprite/) with the same properties of the current sprite.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L305">
    sprite.js:305
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Sprite.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/sprite.js#L332">
    sprite.js:332
  </a>

</div>




</div>


