---
title: Two.Image
pageClass: docs
lang: en-US
---

# Two.Image


<div class="extends">

Extends: [Two.Rectangle](/docs/shapes/rectangle/)

</div>


A convenient package to display images scaled to fit specific dimensions. Unlike [Two.Sprite](/docs/effects/sprite/), this class scales the image to the provided width and height rather than using the image's native dimensions. By default, images are scaled to 'fill' within the bounds while preserving aspect ratio.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  path  | The URL path or [Two.Texture](/docs/effects/texture/) to be used as the bitmap data displayed on the image. |
|  ox  | The initial `x` position of the Two.Image. |
|  oy  | The initial `y` position of the Two.Image. |
|  width  | The width to display the image at. |
|  height  | The height to display the image at. |
|  mode  | The fill mode |



<div class="static member ">

## Modes

<h2 class="longname" aria-hidden="true"><a href="#Modes"><span class="prefix">Two.Image.</span><span class="shortname">Modes</span></a></h2>










<div class="properties">


Different mode types to render an image inspired by Figma.



__Modes.fill__: Scale image to fill the bounds while preserving aspect ratio.



__Modes.fit__: Scale image to fit within bounds while preserving aspect ratio.



__Modes.crop__: Scale image to fill bounds while preserving aspect ratio, cropping excess.



__Modes.tile__: Repeat image at original size to fill the bounds.



__Modes.stretch__: Stretch image to fill dimensions, ignoring aspect ratio.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image.js#L76">
    image.js:76
  </a>

</div>




</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Image.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.Image](/docs/effects/image/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image.js#L93">
    image.js:93
  </a>

</div>




</div>



<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.Image.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.Image



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.Image](/docs/effects/image/) to create a new instance |
</div>




<div class="description">

Create a new [Two.Image](/docs/effects/image/) from an object notation of a [Two.Image](/docs/effects/image/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image.js#L99">
    image.js:99
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.Image.toObject](/docs/effects/image/#toobject)
:::


</div>


</div>



<div class="instance member ">

## texture

<h2 class="longname" aria-hidden="true"><a href="#texture"><span class="prefix">Two.Image.</span><span class="shortname">texture</span></a></h2>










<div class="properties">


The texture to be used as bitmap data to display image in the scene.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image.js#L59">
    image.js:59
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Image.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  image  | The reference [Two.Image](/docs/effects/image/) |
</div>




<div class="description">

Copy the properties of one [Two.Image](/docs/effects/image/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image.js#L117">
    image.js:117
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Image.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Image



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Image](/docs/effects/image/) with the same properties of the current image.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image.js#L136">
    image.js:136
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Image.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the image.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image.js#L159">
    image.js:159
  </a>

</div>




</div>



<div class="instance function ">

## dispose

<h2 class="longname" aria-hidden="true"><a href="#dispose"><span class="prefix">Two.Image.</span><span class="shortname">dispose</span></a></h2>




<div class="returns">

__Returns__: Two.Image



</div>












<div class="description">

Release the image's renderer resources and detach all events.
This method disposes the texture (calling dispose() for thorough cleanup) and inherits comprehensive
cleanup from the Rectangle/Path hierarchy while preserving the renderer type
for potential re-attachment.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/effects/image.js#L173">
    image.js:173
  </a>

</div>




</div>


