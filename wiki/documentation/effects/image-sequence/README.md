---
pageClass: documentation-class
---

# Two.ImageSequence


<div class="extends">

__Extends__: [Two.Rectangle](/documentation/shapes/rectangle/)

</div>


A convenient package to display still or animated images organized as a series of still images.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `paths`  | A list of URLs or [Two.Texture](/documentation/texture)s. |
|  `ox`  | The initial `x` position of the Two.ImageSequence. |
|  `oy`  | The initial `y` position of the Two.ImageSequence. |
|  `frameRate`  | The frame rate at which the images should playback at. |



---

<div class="static member ">

## Properties
<span class="longname">Two.ImageSequence.Properties</span>








<div class="properties">

A list of properties that are on every [Two.ImageSequence](/documentation/imagesequence).

</div>








<div class="meta">

  [image-sequence.js:77](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L77)

</div>






</div>



---

<div class="static member ">

## DefaultFrameRate
<span class="longname">Two.ImageSequence.DefaultFrameRate</span>








<div class="properties">

default frame rate that [Two.ImageSequence.frameRate](/documentation/imagesequence/#two-imagesequence-framerate) is set to when instantiated.

</div>








<div class="meta">

  [image-sequence.js:86](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L86)

</div>






</div>



---

<div class="static function ">

## FlagTextures
<span class="longname">Two.ImageSequence.FlagTextures</span>













<div class="description">

Cached method to let renderers know textures have been updated on a [Two.ImageSequence](/documentation/imagesequence).

</div>



<div class="meta">

  [image-sequence.js:92](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L92)

</div>






</div>



---

<div class="static function ">

## BindTextures
<span class="longname">Two.ImageSequence.BindTextures</span>













<div class="description">

Cached method to let [Two.ImageSequence](/documentation/imagesequence) know textures have been added to the instance.

</div>



<div class="meta">

  [image-sequence.js:101](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L101)

</div>






</div>



---

<div class="static function ">

## UnbindVertices
<span class="longname">Two.ImageSequence.UnbindVertices</span>













<div class="description">

Cached method to let [Two.ImageSequence](/documentation/imagesequence) know textures have been removed from the instance.

</div>



<div class="meta">

  [image-sequence.js:117](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L117)

</div>






</div>



---

<div class="static function ">

## MakeObservable
<span class="longname">Two.ImageSequence.MakeObservable</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `object`  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.ImageSequence](/documentation/imagesequence) to any object. Handy if you'd like to extend or inherit the [Two.ImageSequence](/documentation/imagesequence) class on a custom class.

</div>



<div class="meta">

  [image-sequence.js:133](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L133)

</div>






</div>



---

<div class="static member ">

## GenerateTexture
<span class="longname">Two.ImageSequence.GenerateTexture</span>




<div class="returns">

__Returns__:



+ `Two.Texture`




</div>





<div class="properties">

Shorthand function to prepare source image material into readable format by [Two.ImageSequence](/documentation/imagesequence).

</div>



<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `textureOrString`  | The texture or string to create a [Two.Texture](/documentation/texture) from. |
</div>




<div class="description">

Function used internally by [Two.ImageSequence](/documentation/imagesequence) to parse arguments and return [Two.Texture](/documentation/texture)s.

</div>



<div class="meta">

  [image-sequence.js:181](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L181)

</div>






</div>



---

<div class="instance member ">

## textures
<span class="longname">Two.ImageSequence.textures</span>








<div class="properties">

A list of textures to be used as frames for animating the [Two.ImageSequence](/documentation/imagesequence).

</div>








<div class="meta">

  [image-sequence.js:41](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L41)

</div>






</div>



---

<div class="instance member ">

## frameRate
<span class="longname">Two.ImageSequence.frameRate</span>








<div class="properties">

The number of frames to animate against per second.

</div>








<div class="meta">

  [image-sequence.js:57](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L57)

</div>






</div>



---

<div class="instance member ">

## index
<span class="longname">Two.ImageSequence.index</span>








<div class="properties">

The index of the current tile of the sprite to display. Defaults to `0`.

</div>








<div class="meta">

  [image-sequence.js:67](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L67)

</div>






</div>



---

<div class="instance function ">

## play
<span class="longname">Two.ImageSequence.play</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `firstFrame`  | The index of the frame to start the animation with. |
|  `lastFrame`  | The index of the frame to end the animation with. Defaults to the last item in the [Two.ImageSequence.textures](/documentation/imagesequence/#two-imagesequence-textures). |
|  `onLastFrame`  | Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped. |
</div>




<div class="description">

Initiate animation playback of a [Two.ImageSequence](/documentation/imagesequence).

</div>



<div class="meta">

  [image-sequence.js:304](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L304)

</div>






</div>



---

<div class="instance function ">

## pause
<span class="longname">Two.ImageSequence.pause</span>













<div class="description">

Halt animation playback of a [Two.ImageSequence](/documentation/imagesequence).

</div>



<div class="meta">

  [image-sequence.js:340](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L340)

</div>






</div>



---

<div class="instance function ">

## stop
<span class="longname">Two.ImageSequence.stop</span>













<div class="description">

Halt animation playback of a [Two.ImageSequence](/documentation/imagesequence) and set the current frame back to the first frame.

</div>



<div class="meta">

  [image-sequence.js:352](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L352)

</div>






</div>



---

<div class="instance function ">

## clone
<span class="longname">Two.ImageSequence.clone</span>




<div class="returns">

__Returns__:



+ `Two.ImageSequence`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `parent`  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.ImageSequence](/documentation/imagesequence) with the same properties of the current image sequence.

</div>



<div class="meta">

  [image-sequence.js:366](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L366)

</div>






</div>



---

<div class="instance function ">

## toObject
<span class="longname">Two.ImageSequence.toObject</span>




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the path.

</div>



<div class="meta">

  [image-sequence.js:392](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L392)

</div>






</div>


