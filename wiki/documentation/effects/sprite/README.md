# Two.Sprite


<div class="extends">

__Extends__: `Two.Rectangle`

</div>


A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `path` | The URL path or [Two.Texture](/documentation/texture) to be used as the bitmap data displayed on the sprite. |
| `ox` | The initial `x` position of the Two.Sprite. |
| `oy` | The initial `y` position of the Two.Sprite. |
| `cols` | The number of columns the sprite contains. |
| `rows` | The number of rows the sprite contains. |
| `frameRate` | The frame rate at which the partitions of the image should playback at. |



---

<div class="static ">

## Two.Sprite.Properties








<div class="properties">

A list of properties that are on every [Two.Sprite](/documentation/sprite).

</div>











</div>



---

<div class="static ">

## Two.Sprite.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Sprite](/documentation/sprite) to any object. Handy if you'd like to extend or inherit the [Two.Sprite](/documentation/sprite) class on a custom class.

</div>






</div>



---

<div class="instance ">

## Two.Sprite.texture








<div class="properties">

The texture to be used as bitmap data to display image in the scene.

</div>











</div>



---

<div class="instance ">

## Two.Sprite.columns








<div class="properties">

The number of columns to split the texture into. Defaults to `1`.

</div>











</div>



---

<div class="instance ">

## Two.Sprite.rows








<div class="properties">

The number of rows to split the texture into. Defaults to `1`.

</div>











</div>



---

<div class="instance ">

## Two.Sprite.frameRate








<div class="properties">

The number of frames to animate against per second. Defaults to `0` for non-animated sprites.

</div>











</div>



---

<div class="instance ">

## Two.Sprite.index








<div class="properties">

The index of the current tile of the sprite to display. Defaults to `0`.

</div>











</div>



---

<div class="instance ">

## Two.Sprite.play










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `firstFrame` | The index of the frame to start the animation with. |
| `lastFrame` | The index of the frame to end the animation with. Defaults to the last item in the [Two.Sprite.textures](/documentation/sprite#two-sprite-textures). |
| `onLastFrame` | Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped. |
</div>




<div class="description">

Initiate animation playback of a [Two.Sprite](/documentation/sprite).

</div>






</div>



---

<div class="instance ">

## Two.Sprite.pause













<div class="description">

Halt animation playback of a [Two.Sprite](/documentation/sprite).

</div>






</div>



---

<div class="instance ">

## Two.Sprite.stop













<div class="description">

Halt animation playback of a [Two.Sprite](/documentation/sprite) and set the current frame back to the first frame.

</div>






</div>



---

<div class="instance ">

## Two.Sprite.clone




<div class="returns">

__Returns__:



+ `Two.Sprite`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Sprite](/documentation/sprite) with the same properties of the current sprite.

</div>






</div>



---

<div class="instance ">

## Two.Sprite.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the path.

</div>






</div>


