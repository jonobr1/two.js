# Two.ImageSequence


__Extends__: `Two.Rectangle`


A convenient package to display still or animated images organized as a series of still images.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `paths` | A list of URLs or {@link Two.Texture}s. |
| `ox` | The initial `x` position of the Two.ImageSequence. |
| `oy` | The initial `y` position of the Two.ImageSequence. |
| `frameRate` | The frame rate at which the images should playback at. |



---

## Two.ImageSequence#textures






A list of textures to be used as frames for animating the {@link Two.ImageSequence}.











---

## Two.ImageSequence#frameRate






The number of frames to animate against per second.











---

## Two.ImageSequence#index






The index of the current tile of the sprite to display. Defaults to `0`.











---

## Two.ImageSequence.Properties






A list of properties that are on every {@link Two.ImageSequence}.











---

## Two.ImageSequence.DefaultFrameRate






default frame rate that {@link Two.ImageSequence#frameRate} is set to when instantiated.











---

## Two.ImageSequence.FlagTextures










Cached method to let renderers know textures have been updated on a {@link Two.ImageSequence}.





---

## Two.ImageSequence.BindTextures










Cached method to let {@link Two.ImageSequence} know textures have been added to the instance.





---

## Two.ImageSequence.UnbindVertices










Cached method to let {@link Two.ImageSequence} know textures have been removed from the instance.





---

## Two.ImageSequence.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.ImageSequence} to any object. Handy if you'd like to extend or inherit the {@link Two.ImageSequence} class on a custom class.





---

## Two.ImageSequence.GenerateTexture


__Returns__:



+ `Two.Texture`









Shorthand function to prepare source image material into readable format by {@link Two.ImageSequence}.



| Argument | Description |
| ---- | ----------- |
| `textureOrString` | The texture or string to create a {@link Two.Texture} from. |


Function used internally by {@link Two.ImageSequence} to parse arguments and return {@link Two.Texture}s.





---

## Two.ImageSequence#play








| Argument | Description |
| ---- | ----------- |
| `firstFrame` | The index of the frame to start the animation with. |
| `lastFrame` | The index of the frame to end the animation with. Defaults to the last item in the {@link Two.ImageSequence#textures}. |
| `onLastFrame` | Optional callback function to be triggered after playing the last frame. This fires multiple times when the image sequence is looped. |


Initiate animation playback of a {@link Two.ImageSequence}.





---

## Two.ImageSequence#pause










Halt animation playback of a {@link Two.ImageSequence}.





---

## Two.ImageSequence#stop










Halt animation playback of a {@link Two.ImageSequence} and set the current frame back to the first frame.





---

## Two.ImageSequence#clone


__Returns__:



+ `Two.ImageSequence`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of {@link Two.ImageSequence} with the same properties of the current image sequence.





---

## Two.ImageSequence#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.




