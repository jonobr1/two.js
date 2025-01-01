---
title: Two.Texture
pageClass: docs
lang: en-US
---

# Two.Texture


<div class="extends">

Extends: [Two.Element](/docs/element/)

</div>


Fundamental to work with bitmap data, a.k.a. pregenerated imagery, in Two.js. Supported formats include jpg, png, gif, and tiff. See [Two.Texture.RegularExpressions](/docs/effects/texture/#regularexpressions) for a full list of supported formats.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  src  | The URL path to an image file or an `<img />` element. |
|  callback  | An optional callback function once the image has been loaded. |



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Texture.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.Texture](/docs/effects/texture/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L188">
    texture.js:188
  </a>

</div>




</div>



<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.Texture.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.Texture



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.Texture](/docs/effects/texture/) to create a new instance |
</div>




<div class="description">

Create a new [Two.Texture](/docs/effects/texture/) from an object notation of a [Two.Texture](/docs/effects/texture/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L194">
    texture.js:194
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.Texture.toObject](/docs/effects/texture/#toobject)
:::


</div>


</div>



<div class="static member ">

## RegularExpressions

<h2 class="longname" aria-hidden="true"><a href="#RegularExpressions"><span class="prefix">Two.Texture.</span><span class="shortname">RegularExpressions</span></a></h2>










<div class="properties">


A map of compatible DOM Elements categorized by media format.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L212">
    texture.js:212
  </a>

</div>




</div>



<div class="static member ">

## ImageRegistry

<h2 class="longname" aria-hidden="true"><a href="#ImageRegistry"><span class="prefix">Two.Texture.</span><span class="shortname">ImageRegistry</span></a></h2>










<div class="properties">


A canonical listing of image data used in a single session of Two.js.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L218">
    texture.js:218
  </a>

</div>



<div class="tags">


::: tip nota-bene
This object is used to cache image data between different textures.
:::


</div>


</div>



<div class="static member ">

## getAbsoluteURL

<h2 class="longname" aria-hidden="true"><a href="#getAbsoluteURL"><span class="prefix">Two.Texture.</span><span class="shortname">getAbsoluteURL</span></a></h2>




<div class="returns">

__Returns__: String


- The serialized absolute path.


</div>







<div class="properties">


Serializes a URL as an absolute path for canonical attribution in [Two.ImageRegistry](/docs/two/#imageregistry).


</div>



<div class="params">

| Argument | Description |
| ---- | ----------- |
|  path  |  |
</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L225">
    texture.js:225
  </a>

</div>




</div>



<div class="static member ">

## loadHeadlessBuffer

<h2 class="longname" aria-hidden="true"><a href="#loadHeadlessBuffer"><span class="prefix">Two.Texture.</span><span class="shortname">loadHeadlessBuffer</span></a></h2>










<div class="properties">


Loads an image as a buffer in headless environments.


</div>



<div class="params">

| Argument | Description |
| ---- | ----------- |
|  texture  | The [Two.Texture](/docs/effects/texture/) to be loaded. |
|  loaded  | The callback function to be triggered once the image is loaded. |
</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L240">
    texture.js:240
  </a>

</div>



<div class="tags">


::: tip nota-bene
- This function uses node's `fs.readFileSync` to spoof the `<img />` loading process in the browser.
:::


</div>


</div>



<div class="static member ">

## getTag

<h2 class="longname" aria-hidden="true"><a href="#getTag"><span class="prefix">Two.Texture.</span><span class="shortname">getTag</span></a></h2>




<div class="returns">

__Returns__: String


- Returns the tag name of an image, video, or canvas node.


</div>







<div class="properties">


Retrieves the tag name of an image, video, or canvas node.


</div>



<div class="params">

| Argument | Description |
| ---- | ----------- |
|  image  | The image to infer the tag name from. |
</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L252">
    texture.js:252
  </a>

</div>




</div>



<div class="static member ">

## getImage

<h2 class="longname" aria-hidden="true"><a href="#getImage"><span class="prefix">Two.Texture.</span><span class="shortname">getImage</span></a></h2>




<div class="returns">

__Returns__: HTMLImageElement


- Returns either a cached version of the image or a new one that is registered in [Two.Texture.ImageRegistry](/docs/effects/texture/#imageregistry).


</div>







<div class="properties">


Convenience function to set [Two.Texture.image](/docs/effects/texture/#image) properties with canonical versions set in [Two.Texture.ImageRegistry](/docs/effects/texture/#imageregistry).


</div>



<div class="params">

| Argument | Description |
| ---- | ----------- |
|  src  | The URL path of the image. |
</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L266">
    texture.js:266
  </a>

</div>




</div>



<div class="static interface ">

## Register

<h2 class="longname" aria-hidden="true"><a href="#Register"><span class="prefix">Two.Text.</span><span class="shortname">Register</span></a></h2>















<div class="description">

A collection of functions to register different types of textures. Used internally by a [Two.Texture](/docs/effects/texture/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L301">
    texture.js:301
  </a>

</div>




</div>



<div class="static function ">

## load

<h2 class="longname" aria-hidden="true"><a href="#load"><span class="prefix">Two.Texture.</span><span class="shortname">load</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  texture  | The texture to load. |
|  callback  | The function to be called once the texture is loaded. |
</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L418">
    texture.js:418
  </a>

</div>




</div>



<div class="static function ">

## FlagOffset

<h2 class="longname" aria-hidden="true"><a href="#FlagOffset"><span class="prefix">Two.Texture.</span><span class="shortname">FlagOffset</span></a></h2>















<div class="description">

Cached method to let renderers know `offset` has been updated on a [Two.Texture](/docs/effects/texture/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L650">
    texture.js:650
  </a>

</div>




</div>



<div class="static function ">

## FlagScale

<h2 class="longname" aria-hidden="true"><a href="#FlagScale"><span class="prefix">Two.Texture.</span><span class="shortname">FlagScale</span></a></h2>















<div class="description">

Cached method to let renderers know `scale` has been updated on a [Two.Texture](/docs/effects/texture/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L659">
    texture.js:659
  </a>

</div>




</div>



<div class="instance member ">

## loaded

<h2 class="longname" aria-hidden="true"><a href="#loaded"><span class="prefix">Two.Texture.</span><span class="shortname">loaded</span></a></h2>










<div class="properties">


Shorthand value to determine if image has been loaded into the texture.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L132">
    texture.js:132
  </a>

</div>




</div>



<div class="instance member ">

## repeat

<h2 class="longname" aria-hidden="true"><a href="#repeat"><span class="prefix">Two.Texture.</span><span class="shortname">repeat</span></a></h2>










<div class="properties">


CSS style declaration to tile [Two.Path](/docs/path/). Valid values include: `'no-repeat'`, `'repeat'`, `'repeat-x'`, `'repeat-y'`.


</div>








<div class="see">

See: [https://www.w3.org/TR/2dcontext/#dom-context-2d-createpattern](https://www.w3.org/TR/2dcontext/#dom-context-2d-createpattern)

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L138">
    texture.js:138
  </a>

</div>




</div>



<div class="instance member ">

## offset

<h2 class="longname" aria-hidden="true"><a href="#offset"><span class="prefix">Two.Texture.</span><span class="shortname">offset</span></a></h2>










<div class="properties">


A two-component vector describing any pixel offset of the texture when applied to a [Two.Path](/docs/path/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L145">
    texture.js:145
  </a>

</div>




</div>



<div class="instance member ">

## src

<h2 class="longname" aria-hidden="true"><a href="#src"><span class="prefix">Two.Texture.</span><span class="shortname">src</span></a></h2>










<div class="properties">


The URL path to the image data.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L161">
    texture.js:161
  </a>

</div>



<div class="tags">


::: tip nota-bene
This property is ultimately serialized in a [Two.Registry](/docs/registry/) to cache retrieval.
:::


</div>


</div>



<div class="instance member ">

## image

<h2 class="longname" aria-hidden="true"><a href="#image"><span class="prefix">Two.Texture.</span><span class="shortname">image</span></a></h2>










<div class="properties">


The corresponding DOM Element of the texture. Can be a `<img />`, `<canvas />`, or `<video />` element. See [Two.Texture.RegularExpressions](/docs/effects/texture/#regularexpressions) for a full list of supported elements.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L176">
    texture.js:176
  </a>

</div>



<div class="tags">


::: tip nota-bene
In headless environments this is a `Canvas.Image` object. See [https://github.com/Automattic/node-canvas](https://github.com/Automattic/node-canvas) for more information on headless image objects.
:::


</div>


</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Texture.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Texture



</div>












<div class="description">

Create a new instance of [Two.Texture](/docs/effects/texture/) with the same properties of the current texture.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L449">
    texture.js:449
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Texture.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  texture  | The reference [Two.Texture](/docs/effects/texture/) |
</div>




<div class="description">

Copy the properties of one [Two.Texture](/docs/effects/texture/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L463">
    texture.js:463
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Texture.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the texture.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/texture.js#L483">
    texture.js:483
  </a>

</div>




</div>


