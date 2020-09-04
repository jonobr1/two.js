# Two.Texture


__Extends__: `Two.Shape`


Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See [Two.Texture.RegularExpressions](/documentation/texture#two-texture-regularexpressions) for a full list of supported formats.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `src` | The URL path to an image file or an `<img />` element. |
| `callback` | An optional callback function once the image has been loaded. |



---

<div class="instance">

## Two.Texture.loaded






Shorthand value to determine if image has been loaded into the texture.









</div>



---

<div class="instance">

## Two.Texture.repeat






CSS style declaration to tile [Two.Path](/documentation/path). Valid values include: `'no-repeat'`, `'repeat'`, `'repeat-x'`, `'repeat-y'`.









</div>



---

<div class="instance">

## Two.Texture.offset






A two-component vector describing any pixel offset of the texture when applied to a [Two.Path](/documentation/path).









</div>



---

<div class="instance">

## Two.Texture.src






The URL path to the image data.








::: tip nota-bene
This property is ultimately serialized in a [Two.Registry](/documentation/registry) to cache retrieval.
:::


</div>



---

<div class="instance">

## Two.Texture.image






The corresponding DOM Element of the texture. Can be a `<img />`, `<canvas />`, or `<video />` element. See [Two.Texture.RegularExpressions](/documentation/texture#two-texture-regularexpressions) for a full list of supported elements.








::: tip nota-bene
In headless environments this is a `Canvas.Image` object. See [https://github.com/Automattic/node-canvas](https://github.com/Automattic/node-canvas) for more information on headless image objects.
:::


</div>



---

<div class="static">

## Two.Texture.Properties






A list of properties that are on every [Two.Texture](/documentation/texture).









</div>



---

<div class="static">

## Two.Texture.RegularExpressions






A map of compatible DOM Elements categorized by media format.









</div>



---

<div class="static">

## Two.Texture.ImageRegistry






A canonical listing of image data used in a single session of Two.js.








::: tip nota-bene
This object is used to cache image data between different textures.
:::


</div>



---

<div class="static">

## Two.Texture.getAbsoluteURL


__Returns__:



+ `String`



- The serialized absolute path.







Serializes a URL as an absolute path for canonical attribution in [Two.ImageRegistry](/documentation/imageregistry).



| Argument | Description |
| ---- | ----------- |
| `path` |  |






</div>



---

<div class="static">

## Two.Texture.loadHeadlessBuffer






Loads an image as a buffer in headless environments.



| Argument | Description |
| ---- | ----------- |
| `texture` | The [Two.Texture](/documentation/texture) to be loaded. |
| `loaded` | The callback function to be triggered once the image is loaded. |





::: tip nota-bene
- This function uses node's `fs.readFileSync` to spoof the `<img />` loading process in the browser.
:::


</div>



---

<div class="static">

## Two.Texture.getTag


__Returns__:



+ `String`



- Returns the tag name of an image, video, or canvas node.







Retrieves the tag name of an image, video, or canvas node.



| Argument | Description |
| ---- | ----------- |
| `` | The image to infer the tag name from. |






</div>



---

<div class="static">

## Two.Texture.getImage


__Returns__:



+ `ImageElement`



- Returns either a cached version of the image or a new one that is registered in [Two.Texture.ImageRegistry](/documentation/texture#two-texture-imageregistry).







Convenience function to set [Two.Texture.image](/documentation/texture#two-texture-image) properties with canonincal versions set in [Two.Texture.ImageRegistry](/documentation/texture#two-texture-imageregistry).



| Argument | Description |
| ---- | ----------- |
| `src` | The URL path of the image. |






</div>



---

<div class="static">

## Two.Register










A collection of functions to register different types of textures. Used internally by a [Two.Texture](/documentation/texture).



</div>



---

<div class="static">

## Two.Texture.load








| Argument | Description |
| ---- | ----------- |
| `texture` | The texture to load. |
| `callback` | The function to be called once the texture is loaded. |






</div>



---

<div class="static">

## Two.Texture.FlagOffset










Cached method to let renderers know `offset` has been updated on a [Two.Texture](/documentation/texture).



</div>



---

<div class="static">

## Two.Texture.FlagScale










Cached method to let renderers know `scale` has been updated on a [Two.Texture](/documentation/texture).



</div>



---

<div class="static">

## Two.Texture.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.Texture](/documentation/texture) to any object. Handy if you'd like to extend or inherit the [Two.Texture](/documentation/texture) class on a custom class.



</div>



---

<div class="instance">

## Two.Texture.clone


__Returns__:



+ `Two.Texture`













Create a new instance of [Two.Texture](/documentation/texture) with the same properties of the current texture.



</div>



---

<div class="instance">

## Two.Texture.toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the texture.



</div>


