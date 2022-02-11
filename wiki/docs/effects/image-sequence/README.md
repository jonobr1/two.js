---
title: Two.ImageSequence
pageClass: docs
lang: en-US
---

# Two.ImageSequence


<div class="extends">

Extends: [Two.Rectangle](/docs/shapes/rectangle/)

</div>


A convenient package to display still or animated images organized as a series of still images.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  paths  | A list of URLs or [Two.Texture](/docs/effects/texture/)s. |
|  ox  | The initial `x` position of the Two.ImageSequence. |
|  oy  | The initial `y` position of the Two.ImageSequence. |
|  frameRate  | The frame rate at which the images should playback at. |



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.ImageSequence.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.ImageSequence](/docs/effects/image-sequence/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L172">
    image-sequence.js:172
  </a>

</div>




</div>



<div class="static member ">

## DefaultFrameRate

<h2 class="longname" aria-hidden="true"><a href="#DefaultFrameRate"><span class="prefix">Two.ImageSequence.</span><span class="shortname">DefaultFrameRate</span></a></h2>










<div class="properties">


default frame rate that [Two.ImageSequence.frameRate](/docs/effects/image-sequence/#framerate) is set to when instantiated.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L182">
    image-sequence.js:182
  </a>

</div>




</div>



<div class="instance member ">

## textures

<h2 class="longname" aria-hidden="true"><a href="#textures"><span class="prefix">Two.ImageSequence.</span><span class="shortname">textures</span></a></h2>










<div class="properties">


A list of textures to be used as frames for animating the [Two.ImageSequence](/docs/effects/image-sequence/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L139">
    image-sequence.js:139
  </a>

</div>




</div>



<div class="instance member ">

## frameRate

<h2 class="longname" aria-hidden="true"><a href="#frameRate"><span class="prefix">Two.ImageSequence.</span><span class="shortname">frameRate</span></a></h2>










<div class="properties">


The number of frames to animate against per second.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L154">
    image-sequence.js:154
  </a>

</div>




</div>



<div class="instance member ">

## index

<h2 class="longname" aria-hidden="true"><a href="#index"><span class="prefix">Two.ImageSequence.</span><span class="shortname">index</span></a></h2>










<div class="properties">


The index of the current tile of the sprite to display. Defaults to `0`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L164">
    image-sequence.js:164
  </a>

</div>




</div>



<div class="instance function ">

## play

<h2 class="longname" aria-hidden="true"><a href="#play"><span class="prefix">Two.ImageSequence.</span><span class="shortname">play</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  firstFrame  | The index of the frame to start the animation with. |
|  lastFrame  | The index of the frame to end the animation with. Defaults to the last item in the [Two.ImageSequence.textures](/docs/effects/image-sequence/#textures). |
|  onLastFrame  | Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped. |
</div>




<div class="description">

Initiate animation playback of a [Two.ImageSequence](/docs/effects/image-sequence/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L188">
    image-sequence.js:188
  </a>

</div>




</div>



<div class="instance function ">

## pause

<h2 class="longname" aria-hidden="true"><a href="#pause"><span class="prefix">Two.ImageSequence.</span><span class="shortname">pause</span></a></h2>















<div class="description">

Halt animation playback of a [Two.ImageSequence](/docs/effects/image-sequence/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L224">
    image-sequence.js:224
  </a>

</div>




</div>



<div class="instance function ">

## stop

<h2 class="longname" aria-hidden="true"><a href="#stop"><span class="prefix">Two.ImageSequence.</span><span class="shortname">stop</span></a></h2>















<div class="description">

Halt animation playback of a [Two.ImageSequence](/docs/effects/image-sequence/) and set the current frame back to the first frame.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L236">
    image-sequence.js:236
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.ImageSequence.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.ImageSequence



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.ImageSequence](/docs/effects/image-sequence/) with the same properties of the current image sequence.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L250">
    image-sequence.js:250
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.ImageSequence.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image-sequence.js#L276">
    image-sequence.js:276
  </a>

</div>




</div>


