# Two.Texture


__Extends__: `Two.Shape`


Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See {@link Two.Texture.RegularExpressions} for a full list of supported formats.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `src` | The URL path to an image file or an `<img />` element. |
| `callback` | An optional callback function once the image has been loaded. |



---

## Two.Texture#loaded






Shorthand value to determine if image has been loaded into the texture.











---

## Two.Texture#repeat






CSS style declaration to tile {@link Two.Path}. Valid values include: `'no-repeat'`, `'repeat'`, `'repeat-x'`, `'repeat-y'`.











---

## Two.Texture#offset






A two-component vector describing any pixel offset of the texture when applied to a {@link Two.Path}.











---

## Two.Texture#src






The URL path to the image data.








::: tip nota-bene
This property is ultimately serialized in a {@link Two.Registry} to cache retrieval.
:::




---

## Two.Texture#image






The corresponding DOM Element of the texture. Can be a `<img />`, `<canvas />`, or `<video />` element. See {@link Two.Texture.RegularExpressions} for a full list of supported elements.








::: tip nota-bene
In headless environments this is a `Canvas.Image` object. See {@link https://github.com/Automattic/node-canvas} for more information on headless image objects.
:::




---

## Two.Texture.Properties






A list of properties that are on every {@link Two.Texture}.











---

## Two.Texture.RegularExpressions






A map of compatible DOM Elements categorized by media format.











---

## Two.Texture.ImageRegistry






A canonical listing of image data used in a single session of Two.js.








::: tip nota-bene
This object is used to cache image data between different textures.
:::




---

## Two.Texture.getAbsoluteURL


__Returns__:



+ `String`



- The serialized absolute path.







Serializes a URL as an absolute path for canonical attribution in {@link Two.ImageRegistry}.



| Argument | Description |
| ---- | ----------- |
| `path` |  |








---

## Two.Texture.loadHeadlessBuffer






Loads an image as a buffer in headless environments.



| Argument | Description |
| ---- | ----------- |
| `texture` | The {@link Two.Texture} to be loaded. |
| `loaded` | The callback function to be triggered once the image is loaded. |





::: tip nota-bene
- This function uses node's `fs.readFileSync` to spoof the `<img />` loading process in the browser.
:::




---

## Two.Texture.getImage


__Returns__:



+ `ImageElement`



- Returns either a cached version of the image or a new one that is registered in {@link Two.Texture.ImageRegistry}.







Convenience function to set {@link Two.Texture#image} properties with canonincal versions set in {@link Two.Texture.ImageRegistry}.



| Argument | Description |
| ---- | ----------- |
| `src` | The URL path of the image. |








---

## Two.Register










A collection of functions to register different types of textures. Used internally by a {@link Two.Texture}.





---

## Two.Texture.load








| Argument | Description |
| ---- | ----------- |
| `texture` | The texture to load. |
| `callback` | The function to be called once the texture is loaded. |








---

## Two.Texture.FlagOffset










Cached method to let renderers know `offset` has been updated on a {@link Two.Texture}.





---

## Two.Texture.FlagScale










Cached method to let renderers know `scale` has been updated on a {@link Two.Texture}.





---

## Two.Texture.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.Texture} to any object. Handy if you'd like to extend or inherit the {@link Two.Texture} class on a custom class.





---

## Two.Texture#clone


__Returns__:



+ `Two.Texture`













Create a new instance of {@link Two.Texture} with the same properties of the current texture.





---

## Two.Texture#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the texture.




