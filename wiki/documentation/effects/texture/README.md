# Two.Texture


<div class="extends">

__Extends__: `Two.Shape`

</div>


Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See [Two.Texture.RegularExpressions](/documentation/texture#two-texture-regularexpressions) for a full list of supported formats.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `src` | The URL path to an image file or an `<img />` element. |
| `callback` | An optional callback function once the image has been loaded. |



---

<div class="static ">

## Two.Texture.Properties








<div class="properties">

A list of properties that are on every [Two.Texture](/documentation/texture).

</div>











</div>



---

<div class="static ">

## Two.Texture.RegularExpressions








<div class="properties">

A map of compatible DOM Elements categorized by media format.

</div>











</div>



---

<div class="static ">

## Two.Texture.ImageRegistry








<div class="properties">

A canonical listing of image data used in a single session of Two.js.

</div>








<div class="tags">


::: tip nota-bene
This object is used to cache image data between different textures.
:::


</div>




</div>



---

<div class="static ">

## Two.Texture.getAbsoluteURL




<div class="returns">

__Returns__:



+ `String`



- The serialized absolute path.


</div>





<div class="properties">

Serializes a URL as an absolute path for canonical attribution in [Two.ImageRegistry](/documentation/imageregistry).

</div>



<div class="params">

| Argument | Description |
| ---- | ----------- |
| `path` |  |
</div>









</div>



---

<div class="static ">

## Two.Texture.loadHeadlessBuffer








<div class="properties">

Loads an image as a buffer in headless environments.

</div>



<div class="params">

| Argument | Description |
| ---- | ----------- |
| `texture` | The [Two.Texture](/documentation/texture) to be loaded. |
| `loaded` | The callback function to be triggered once the image is loaded. |
</div>






<div class="tags">


::: tip nota-bene
- This function uses node's `fs.readFileSync` to spoof the `<img />` loading process in the browser.
:::


</div>




</div>



---

<div class="static ">

## Two.Texture.getTag




<div class="returns">

__Returns__:



+ `String`



- Returns the tag name of an image, video, or canvas node.


</div>





<div class="properties">

Retrieves the tag name of an image, video, or canvas node.

</div>



<div class="params">

| Argument | Description |
| ---- | ----------- |
| `` | The image to infer the tag name from. |
</div>









</div>



---

<div class="static ">

## Two.Texture.getImage




<div class="returns">

__Returns__:



+ `ImageElement`



- Returns either a cached version of the image or a new one that is registered in [Two.Texture.ImageRegistry](/documentation/texture#two-texture-imageregistry).


</div>





<div class="properties">

Convenience function to set [Two.Texture.image](/documentation/texture#two-texture-image) properties with canonincal versions set in [Two.Texture.ImageRegistry](/documentation/texture#two-texture-imageregistry).

</div>



<div class="params">

| Argument | Description |
| ---- | ----------- |
| `src` | The URL path of the image. |
</div>









</div>



---

<div class="static ">

## Two.Register













<div class="description">

A collection of functions to register different types of textures. Used internally by a [Two.Texture](/documentation/texture).

</div>






</div>



---

<div class="static ">

## Two.Texture.load










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `texture` | The texture to load. |
| `callback` | The function to be called once the texture is loaded. |
</div>









</div>



---

<div class="static ">

## Two.Texture.FlagOffset













<div class="description">

Cached method to let renderers know `offset` has been updated on a [Two.Texture](/documentation/texture).

</div>






</div>



---

<div class="static ">

## Two.Texture.FlagScale













<div class="description">

Cached method to let renderers know `scale` has been updated on a [Two.Texture](/documentation/texture).

</div>






</div>



---

<div class="static ">

## Two.Texture.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Texture](/documentation/texture) to any object. Handy if you'd like to extend or inherit the [Two.Texture](/documentation/texture) class on a custom class.

</div>






</div>



---

<div class="instance ">

## Two.Texture.loaded








<div class="properties">

Shorthand value to determine if image has been loaded into the texture.

</div>











</div>



---

<div class="instance ">

## Two.Texture.repeat








<div class="properties">

CSS style declaration to tile [Two.Path](/documentation/path). Valid values include: `'no-repeat'`, `'repeat'`, `'repeat-x'`, `'repeat-y'`.

</div>










<div class="see">

[https://www.w3.org/TR/2dcontext/#dom-context-2d-createpattern](https://www.w3.org/TR/2dcontext/#dom-context-2d-createpattern)

</div>


</div>



---

<div class="instance ">

## Two.Texture.offset








<div class="properties">

A two-component vector describing any pixel offset of the texture when applied to a [Two.Path](/documentation/path).

</div>











</div>



---

<div class="instance ">

## Two.Texture.src








<div class="properties">

The URL path to the image data.

</div>








<div class="tags">


::: tip nota-bene
This property is ultimately serialized in a [Two.Registry](/documentation/registry) to cache retrieval.
:::


</div>




</div>



---

<div class="instance ">

## Two.Texture.image








<div class="properties">

The corresponding DOM Element of the texture. Can be a `<img />`, `<canvas />`, or `<video />` element. See [Two.Texture.RegularExpressions](/documentation/texture#two-texture-regularexpressions) for a full list of supported elements.

</div>








<div class="tags">


::: tip nota-bene
In headless environments this is a `Canvas.Image` object. See [https://github.com/Automattic/node-canvas](https://github.com/Automattic/node-canvas) for more information on headless image objects.
:::


</div>




</div>



---

<div class="instance ">

## Two.Texture.clone




<div class="returns">

__Returns__:



+ `Two.Texture`




</div>










<div class="description">

Create a new instance of [Two.Texture](/documentation/texture) with the same properties of the current texture.

</div>






</div>



---

<div class="instance ">

## Two.Texture.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the texture.

</div>






</div>


