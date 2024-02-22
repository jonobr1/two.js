---
title: Two.Text
pageClass: docs
lang: en-US
---

# Two.Text


<div class="extends">

Extends: [Two.Shape](/docs/shape/)

</div>


This is a primitive class for creating drawable text that can be added to the scenegraph.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/text.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  message  | The String to be rendered to the scene. |
|  x  | The position in the x direction for the object. |
|  y  | The position in the y direction for the object. |
|  styles  | An object where styles are applied. Attribute must exist in Two.Text.Properties. |



<div class="static member ">

## Ratio

<h2 class="longname" aria-hidden="true"><a href="#Ratio"><span class="prefix">Two.Text.</span><span class="shortname">Ratio</span></a></h2>










<div class="properties">


Approximate aspect ratio of a typeface's character width to height.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L316">
    text.js:316
  </a>

</div>




</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Text.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.Text](/docs/text/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L322">
    text.js:322
  </a>

</div>




</div>



<div class="static function ">

## Measure

<h2 class="longname" aria-hidden="true"><a href="#Measure"><span class="prefix">Two.</span><span class="shortname">Measure</span></a></h2>




<div class="returns">

__Returns__: Object


- The width and height of the [Two.Text](/docs/text/) instance.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  text  | The instance of [Two.Text](/docs/text/) to measure. |
</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L332">
    text.js:332
  </a>

</div>




</div>



<div class="instance member ">

## value

<h2 class="longname" aria-hidden="true"><a href="#value"><span class="prefix">Two.Text.</span><span class="shortname">value</span></a></h2>










<div class="properties">


The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L152">
    text.js:152
  </a>

</div>




</div>



<div class="instance member ">

## family

<h2 class="longname" aria-hidden="true"><a href="#family"><span class="prefix">Two.Text.</span><span class="shortname">family</span></a></h2>










<div class="properties">


The font family Two.js should attempt to register for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L158">
    text.js:158
  </a>

</div>




</div>



<div class="instance member ">

## size

<h2 class="longname" aria-hidden="true"><a href="#size"><span class="prefix">Two.Text.</span><span class="shortname">size</span></a></h2>










<div class="properties">


The font size in Two.js point space. Defaults to `13`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L164">
    text.js:164
  </a>

</div>




</div>



<div class="instance member ">

## leading

<h2 class="longname" aria-hidden="true"><a href="#leading"><span class="prefix">Two.Text.</span><span class="shortname">leading</span></a></h2>










<div class="properties">


The height between lines measured from base to base in Two.js point space. Defaults to `17`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L170">
    text.js:170
  </a>

</div>




</div>



<div class="instance member ">

## alignment

<h2 class="longname" aria-hidden="true"><a href="#alignment"><span class="prefix">Two.Text.</span><span class="shortname">alignment</span></a></h2>










<div class="properties">


Alignment of text in relation to [Two.Text.translation](/docs/text/#translation)'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L176">
    text.js:176
  </a>

</div>




</div>



<div class="instance member ">

## baseline

<h2 class="longname" aria-hidden="true"><a href="#baseline"><span class="prefix">Two.Text.</span><span class="shortname">baseline</span></a></h2>










<div class="properties">


The vertical aligment of the text in relation to [Two.Text.translation](/docs/text/#translation)'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L182">
    text.js:182
  </a>

</div>



<div class="tags">


::: tip nota-bene
In headless environments where the canvas is based on [https://github.com/Automattic/node-canvas](https://github.com/Automattic/node-canvas), `baseline` seems to be the only valid property.
:::


</div>


</div>



<div class="instance member ">

## style

<h2 class="longname" aria-hidden="true"><a href="#style"><span class="prefix">Two.Text.</span><span class="shortname">style</span></a></h2>










<div class="properties">


The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L189">
    text.js:189
  </a>

</div>




</div>



<div class="instance member ">

## weight

<h2 class="longname" aria-hidden="true"><a href="#weight"><span class="prefix">Two.Text.</span><span class="shortname">weight</span></a></h2>










<div class="properties">


A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L195">
    text.js:195
  </a>

</div>




</div>



<div class="instance member ">

## decoration

<h2 class="longname" aria-hidden="true"><a href="#decoration"><span class="prefix">Two.Text.</span><span class="shortname">decoration</span></a></h2>










<div class="properties">


String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L201">
    text.js:201
  </a>

</div>




</div>



<div class="instance member ">

## direction

<h2 class="longname" aria-hidden="true"><a href="#direction"><span class="prefix">Two.Text.</span><span class="shortname">direction</span></a></h2>










<div class="properties">


String to determine what direction the text should run. Possibly values are `'ltr'` for left-to-right and `'rtl'` for right-to-left. Defaults to `'ltr'`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L207">
    text.js:207
  </a>

</div>




</div>



<div class="instance member ">

## fill

<h2 class="longname" aria-hidden="true"><a href="#fill"><span class="prefix">Two.Text.</span><span class="shortname">fill</span></a></h2>










<div class="properties">


The value of what the text object should be filled in with.


</div>








<div class="see">

See: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L213">
    text.js:213
  </a>

</div>




</div>



<div class="instance member ">

## stroke

<h2 class="longname" aria-hidden="true"><a href="#stroke"><span class="prefix">Two.Text.</span><span class="shortname">stroke</span></a></h2>










<div class="properties">


The value of what the text object should be filled in with.


</div>








<div class="see">

See: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L220">
    text.js:220
  </a>

</div>




</div>



<div class="instance member ">

## linewidth

<h2 class="longname" aria-hidden="true"><a href="#linewidth"><span class="prefix">Two.Text.</span><span class="shortname">linewidth</span></a></h2>










<div class="properties">


The thickness in pixels of the stroke.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L227">
    text.js:227
  </a>

</div>




</div>



<div class="instance member ">

## opacity

<h2 class="longname" aria-hidden="true"><a href="#opacity"><span class="prefix">Two.Text.</span><span class="shortname">opacity</span></a></h2>










<div class="properties">


The opaqueness of the text object.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L233">
    text.js:233
  </a>

</div>



<div class="tags">


::: tip nota-bene
Can be used in conjunction with CSS Colors that have an alpha value.
:::


</div>


</div>



<div class="instance member ">

## visible

<h2 class="longname" aria-hidden="true"><a href="#visible"><span class="prefix">Two.Text.</span><span class="shortname">visible</span></a></h2>










<div class="properties">


Display the text object or not.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L240">
    text.js:240
  </a>

</div>



<div class="tags">


::: tip nota-bene
For [Two.CanvasRenderer](/docs/renderers/canvas/) and [Two.WebGLRenderer](/docs/renderers/webgl/) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>


</div>



<div class="instance member ">

## mask

<h2 class="longname" aria-hidden="true"><a href="#mask"><span class="prefix">Two.Text.</span><span class="shortname">mask</span></a></h2>










<div class="properties">


The shape whose alpha property becomes a clipping area for the text.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L247">
    text.js:247
  </a>

</div>



<div class="tags">


::: tip nota-bene
This property is currently not working because of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
:::


</div>


</div>



<div class="instance member ">

## clip

<h2 class="longname" aria-hidden="true"><a href="#clip"><span class="prefix">Two.Text.</span><span class="shortname">clip</span></a></h2>










<div class="properties">


Object to define clipping area.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L254">
    text.js:254
  </a>

</div>



<div class="tags">


::: tip nota-bene
This property is currently not working because of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
:::


</div>


</div>



<div class="instance member ">

## dashes

<h2 class="longname" aria-hidden="true"><a href="#dashes"><span class="prefix">Two.Text.</span><span class="shortname">dashes</span></a></h2>










<div class="properties">


Array of numbers. Odd indices represent dash length. Even indices represent dash space.


</div>






<div class="description">

A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.

</div>



<div class="see">

See: [https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) for more information on the SVG stroke-dasharray attribute.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L289">
    text.js:289
  </a>

</div>




</div>



<div class="instance member ">

## dashes.offset

<h2 class="longname" aria-hidden="true"><a href="#dashes.offset"><span class="prefix">Two.Text.</span><span class="shortname">dashes.offset</span></a></h2>










<div class="properties">


A number in pixels to offset [Two.Text.dashes](/docs/text/#dashes) display.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L297">
    text.js:297
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Text.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Text



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Text](/docs/text/) with the same properties of the current text object.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L360">
    text.js:360
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Text.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the text object.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L391">
    text.js:391
  </a>

</div>




</div>



<div class="instance function ">

## noFill

<h2 class="longname" aria-hidden="true"><a href="#noFill"><span class="prefix">Two.Text.</span><span class="shortname">noFill</span></a></h2>















<div class="description">

Short hand method to set fill to `none`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L418">
    text.js:418
  </a>

</div>




</div>



<div class="instance function ">

## noStroke

<h2 class="longname" aria-hidden="true"><a href="#noStroke"><span class="prefix">Two.Text.</span><span class="shortname">noStroke</span></a></h2>















<div class="description">

Short hand method to set stroke to `none`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L428">
    text.js:428
  </a>

</div>




</div>



<div class="instance function ">

## getBoundingClientRect

<h2 class="longname" aria-hidden="true"><a href="#getBoundingClientRect"><span class="prefix">Two.Text.</span><span class="shortname">getBoundingClientRect</span></a></h2>




<div class="returns">

__Returns__: Object


- Returns object with top, left, right, bottom, width, height attributes.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  shallow  | Describes whether to calculate off local matrix or world matrix. |
</div>




<div class="description">

Return an object with top, left, right, bottom, width, and height parameters of the text object.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/text.js#L443">
    text.js:443
  </a>

</div>




</div>


