# Two.Sprite


__Extends__: `Two.Rectangle`


A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas]{@link https://en.wikipedia.org/wiki/Texture_atlas} on Wikipedia..


### Constructor


| Argument | Description |
| ---- | ----------- |
| `path` | The URL path or {@link Two.Texture} to be used as the bitmap data displayed on the sprite. |
| `ox` | The initial `x` position of the Two.Sprite. |
| `oy` | The initial `y` position of the Two.Sprite. |
| `cols` | The number of columns the sprite contains. |
| `rows` | The number of rows the sprite contains. |
| `frameRate` | The frame rate at which the partitions of the image should playback at. |



---

## Two.Sprite#texture






The texture to be used as bitmap data to display image in the scene.











---

## Two.Sprite#columns






The number of columns to split the texture into. Defaults to `1`.











---

## Two.Sprite#rows






The number of rows to split the texture into. Defaults to `1`.











---

## Two.Sprite#frameRate






The number of frames to animate against per second. Defaults to `0` for non-animated sprites.











---

## Two.Sprite#index






The index of the current tile of the sprite to display. Defaults to `0`.











---

## Two.Sprite.Properties






A list of properties that are on every {@link Two.Sprite}.











---

## Two.Sprite.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.Sprite} to any object. Handy if you'd like to extend or inherit the {@link Two.Sprite} class on a custom class.





---

## Two.Sprite#play








| Argument | Description |
| ---- | ----------- |
| `firstFrame` | The index of the frame to start the animation with. |
| `lastFrame` | The index of the frame to end the animation with. Defaults to the last item in the {@link Two.Sprite#textures}. |
| `onLastFrame` | Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped. |


Initiate animation playback of a {@link Two.Sprite}.





---

## Two.Sprite#pause










Halt animation playback of a {@link Two.Sprite}.





---

## Two.Sprite#stop










Halt animation playback of a {@link Two.Sprite} and set the current frame back to the first frame.





---

## Two.Sprite#clone


__Returns__:



+ `Two.Sprite`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of {@link Two.Sprite} with the same properties of the current sprite.





---

## Two.Sprite#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.




