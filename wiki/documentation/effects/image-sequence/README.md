# Two.ImageSequence


__Extends__: `Two.Rectangle`


A convenient package to display still or animated images organized as a series of still images.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `paths` | A list of URLs or [Two.Texture](/documentation/texture)s. |
| `ox` | The initial `x` position of the Two.ImageSequence. |
| `oy` | The initial `y` position of the Two.ImageSequence. |
| `frameRate` | The frame rate at which the images should playback at. |



---

<div class="static">

## Two.ImageSequence.Properties






A list of properties that are on every [Two.ImageSequence](/documentation/imagesequence).









</div>



---

<div class="static">

## Two.ImageSequence.DefaultFrameRate






default frame rate that [Two.ImageSequence.frameRate](/documentation/imagesequence#two-imagesequence-framerate) is set to when instantiated.









</div>



---

<div class="static">

## Two.ImageSequence.FlagTextures










Cached method to let renderers know textures have been updated on a [Two.ImageSequence](/documentation/imagesequence).



</div>



---

<div class="static">

## Two.ImageSequence.BindTextures










Cached method to let [Two.ImageSequence](/documentation/imagesequence) know textures have been added to the instance.



</div>



---

<div class="static">

## Two.ImageSequence.UnbindVertices










Cached method to let [Two.ImageSequence](/documentation/imagesequence) know textures have been removed from the instance.



</div>



---

<div class="static">

## Two.ImageSequence.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.ImageSequence](/documentation/imagesequence) to any object. Handy if you'd like to extend or inherit the [Two.ImageSequence](/documentation/imagesequence) class on a custom class.



</div>



---

<div class="static">

## Two.ImageSequence.GenerateTexture


__Returns__:



+ `Two.Texture`









Shorthand function to prepare source image material into readable format by [Two.ImageSequence](/documentation/imagesequence).



| Argument | Description |
| ---- | ----------- |
| `textureOrString` | The texture or string to create a [Two.Texture](/documentation/texture) from. |


Function used internally by [Two.ImageSequence](/documentation/imagesequence) to parse arguments and return [Two.Texture](/documentation/texture)s.



</div>



---

<div class="instance">

## Two.ImageSequence.textures






A list of textures to be used as frames for animating the [Two.ImageSequence](/documentation/imagesequence).









</div>



---

<div class="instance">

## Two.ImageSequence.frameRate






The number of frames to animate against per second.









</div>



---

<div class="instance">

## Two.ImageSequence.index






The index of the current tile of the sprite to display. Defaults to `0`.









</div>



---

<div class="instance">

## Two.ImageSequence.play








| Argument | Description |
| ---- | ----------- |
| `firstFrame` | The index of the frame to start the animation with. |
| `lastFrame` | The index of the frame to end the animation with. Defaults to the last item in the [Two.ImageSequence.textures](/documentation/imagesequence#two-imagesequence-textures). |
| `onLastFrame` | Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped. |


Initiate animation playback of a [Two.ImageSequence](/documentation/imagesequence).



</div>



---

<div class="instance">

## Two.ImageSequence.pause










Halt animation playback of a [Two.ImageSequence](/documentation/imagesequence).



</div>



---

<div class="instance">

## Two.ImageSequence.stop










Halt animation playback of a [Two.ImageSequence](/documentation/imagesequence) and set the current frame back to the first frame.



</div>



---

<div class="instance">

## Two.ImageSequence.clone


__Returns__:



+ `Two.ImageSequence`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of [Two.ImageSequence](/documentation/imagesequence) with the same properties of the current image sequence.



</div>



---

<div class="instance">

## Two.ImageSequence.toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.



</div>


