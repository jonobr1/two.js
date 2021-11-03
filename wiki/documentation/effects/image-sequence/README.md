---
pageClass: documentation-class
---

# Two.ImageSequence


<div class="extends">

__Extends__: `Two.Rectangle`

</div>


A convenient package to display still or animated images organized as a series of still images.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L13)

</div>



## Constructor


| Argument | Description |
| ---- | ----------- |
|  `paths`  | A list of URLs or [Two.Texture](/documentation/texture)s. |
|  `ox`  | The initial `x` position of the Two.ImageSequence. |
|  `oy`  | The initial `y` position of the Two.ImageSequence. |
|  `frameRate`  | The frame rate at which the images should playback at. |



---

<div class="static member ">

### Two.ImageSequence.Properties








<div class="properties">

A list of properties that are on every [Two.ImageSequence](/documentation/imagesequence).

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L77)

</div>






</div>



---

<div class="static member ">

### Two.ImageSequence.DefaultFrameRate








<div class="properties">

default frame rate that [Two.ImageSequence.frameRate](/documentation/imagesequence/#two-imagesequence-framerate) is set to when instantiated.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L86)

</div>






</div>



---

<div class="static function ">

### Two.ImageSequence.FlagTextures













<div class="description">

Cached method to let renderers know textures have been updated on a [Two.ImageSequence](/documentation/imagesequence).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L92)

</div>






</div>



---

<div class="static function ">

### Two.ImageSequence.BindTextures













<div class="description">

Cached method to let [Two.ImageSequence](/documentation/imagesequence) know textures have been added to the instance.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L101)

</div>






</div>



---

<div class="static function ">

### Two.ImageSequence.UnbindVertices













<div class="description">

Cached method to let [Two.ImageSequence](/documentation/imagesequence) know textures have been removed from the instance.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L117)

</div>






</div>



---

<div class="static function ">

### Two.ImageSequence.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `object`  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.ImageSequence](/documentation/imagesequence) to any object. Handy if you'd like to extend or inherit the [Two.ImageSequence](/documentation/imagesequence) class on a custom class.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L133)

</div>






</div>



---

<div class="static member ">

### Two.ImageSequence.GenerateTexture




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

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L181)

</div>






</div>



---

<div class="instance member ">

### Two.ImageSequence.textures








<div class="properties">

A list of textures to be used as frames for animating the [Two.ImageSequence](/documentation/imagesequence).

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L41)

</div>






</div>



---

<div class="instance member ">

### Two.ImageSequence.frameRate








<div class="properties">

The number of frames to animate against per second.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L57)

</div>






</div>



---

<div class="instance member ">

### Two.ImageSequence.index








<div class="properties">

The index of the current tile of the sprite to display. Defaults to `0`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L67)

</div>






</div>



---

<div class="instance function ">

### Two.ImageSequence.play










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

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L304)

</div>






</div>



---

<div class="instance function ">

### Two.ImageSequence.pause













<div class="description">

Halt animation playback of a [Two.ImageSequence](/documentation/imagesequence).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L340)

</div>






</div>



---

<div class="instance function ">

### Two.ImageSequence.stop













<div class="description">

Halt animation playback of a [Two.ImageSequence](/documentation/imagesequence) and set the current frame back to the first frame.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L352)

</div>






</div>



---

<div class="instance function ">

### Two.ImageSequence.clone




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

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L366)

</div>






</div>



---

<div class="instance function ">

### Two.ImageSequence.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the path.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/effects/image-sequence.js#L392)

</div>






</div>


