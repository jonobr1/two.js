---
pageClass: documentation-class
---

# Two.Text


<div class="extends">

__Extends__: [Two.Shape](/documentation/shape/)

</div>


This is a primitive class for creating drawable text that can be added to the scenegraph.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/text.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `message`  | The String to be rendered to the scene. |
|  `x`  | The position in the x direction for the object. |
|  `y`  | The position in the y direction for the object. |
|  `styles`  | An object where styles are applied. Attribute must exist in Two.Text.Properties. |



---

<div class="static member ">

## Ratio
<span class="longname">Two.Text.Ratio</span>








<div class="properties">

Approximate aspect ratio of a typeface's character width to height.

</div>








<div class="meta">

  [text.js:73](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L73)

</div>






</div>



---

<div class="static member ">

## Properties
<span class="longname">Two.Text.Properties</span>








<div class="properties">

A list of properties that are on every [Two.Text](/documentation/text).

</div>








<div class="meta">

  [text.js:79](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L79)

</div>






</div>



---

<div class="static function ">

## FlagFill
<span class="longname">Two.Text.FlagFill</span>













<div class="description">

Cached method to let renderers know the fill property have been updated on a [Two.Text](/documentation/text).

</div>



<div class="meta">

  [text.js:89](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L89)

</div>






</div>



---

<div class="static function ">

## FlagStroke
<span class="longname">Two.Text.FlagStroke</span>













<div class="description">

Cached method to let renderers know the stroke property have been updated on a [Two.Text](/documentation/text).

</div>



<div class="meta">

  [text.js:98](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L98)

</div>






</div>



---

<div class="instance member ">

## dashes
<span class="longname">Two.Text.dashes</span>








<div class="properties">

Array of numbers. Odd indices represent dash length. Even indices represent dash space.

</div>






<div class="description">

A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.

</div>



<div class="meta">

  [text.js:43](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L43)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) for more information on the SVG stroke-dasharray attribute.

</div>


</div>



---

<div class="instance member ">

## dashes.offset
<span class="longname">Two.Text.dashes.offset</span>








<div class="properties">

A number in pixels to offset [Two.Text.dashes](/documentation/text/#two-text-dashes) display.

</div>








<div class="meta">

  [text.js:51](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L51)

</div>






</div>



---

<div class="instance member ">

## value
<span class="longname">Two.Text.value</span>








<div class="properties">

The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.

</div>








<div class="meta">

  [text.js:341](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L341)

</div>






</div>



---

<div class="instance member ">

## family
<span class="longname">Two.Text.family</span>








<div class="properties">

The font family Two.js should attempt to regsiter for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.

</div>








<div class="meta">

  [text.js:347](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L347)

</div>






</div>



---

<div class="instance member ">

## size
<span class="longname">Two.Text.size</span>








<div class="properties">

The font size in Two.js point space. Defaults to `13`.

</div>








<div class="meta">

  [text.js:353](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L353)

</div>






</div>



---

<div class="instance member ">

## leading
<span class="longname">Two.Text.leading</span>








<div class="properties">

The height between lines measured from base to base in Two.js point space. Defaults to `17`.

</div>








<div class="meta">

  [text.js:359](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L359)

</div>






</div>



---

<div class="instance member ">

## alignment
<span class="longname">Two.Text.alignment</span>








<div class="properties">

Alignment of text in relation to [Two.Text.translation](/documentation/text/#two-text-translation)'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.

</div>








<div class="meta">

  [text.js:365](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L365)

</div>






</div>



---

<div class="instance member ">

## baseline
<span class="longname">Two.Text.baseline</span>








<div class="properties">

The vertical aligment of the text in relation to [Two.Text.translation](/documentation/text/#two-text-translation)'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.

</div>








<div class="meta">

  [text.js:371](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L371)

</div>






</div>



---

<div class="instance member ">

## style
<span class="longname">Two.Text.style</span>








<div class="properties">

The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.

</div>








<div class="meta">

  [text.js:377](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L377)

</div>






</div>



---

<div class="instance member ">

## weight
<span class="longname">Two.Text.weight</span>








<div class="properties">

A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.

</div>








<div class="meta">

  [text.js:383](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L383)

</div>






</div>



---

<div class="instance member ">

## decoration
<span class="longname">Two.Text.decoration</span>








<div class="properties">

String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.

</div>








<div class="meta">

  [text.js:389](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L389)

</div>






</div>



---

<div class="instance member ">

## fill
<span class="longname">Two.Text.fill</span>








<div class="properties">

The value of what the text object should be filled in with.

</div>








<div class="meta">

  [text.js:395](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L395)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>


</div>



---

<div class="instance member ">

## stroke
<span class="longname">Two.Text.stroke</span>








<div class="properties">

The value of what the text object should be filled in with.

</div>








<div class="meta">

  [text.js:402](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L402)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>


</div>



---

<div class="instance member ">

## linewidth
<span class="longname">Two.Text.linewidth</span>








<div class="properties">

The thickness in pixels of the stroke.

</div>








<div class="meta">

  [text.js:409](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L409)

</div>






</div>



---

<div class="instance member ">

## opacity
<span class="longname">Two.Text.opacity</span>








<div class="properties">

The opaqueness of the text object.

</div>








<div class="meta">

  [text.js:415](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L415)

</div>



<div class="tags">


::: tip nota-bene
Can be used in conjunction with CSS Colors that have an alpha value.
:::


</div>




</div>



---

<div class="instance member ">

## className
<span class="longname">Two.Text.className</span>








<div class="properties">

A class to be applied to the element to be compatible with CSS styling. Only available for the [Two.SvgRenderer](/documentation/svgrenderer).

</div>








<div class="meta">

  [text.js:422](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L422)

</div>






</div>



---

<div class="instance member ">

## visible
<span class="longname">Two.Text.visible</span>








<div class="properties">

Display the text object or not.

</div>








<div class="meta">

  [text.js:428](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L428)

</div>



<div class="tags">


::: tip nota-bene
For [Two.CanvasRenderer](/documentation/canvasrenderer) and [Two.WebGLRenderer](/documentation/webglrenderer) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>




</div>



---

<div class="instance member ">

## mask
<span class="longname">Two.Text.mask</span>








<div class="properties">

The shape whose alpha property becomes a clipping area for the text.

</div>








<div class="meta">

  [text.js:435](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L435)

</div>



<div class="tags">


::: tip nota-bene
This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
:::


</div>




</div>



---

<div class="instance member ">

## clip
<span class="longname">Two.Text.clip</span>








<div class="properties">

Object to define clipping area.

</div>








<div class="meta">

  [text.js:442](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L442)

</div>



<div class="tags">


::: tip nota-bene
This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
:::


</div>




</div>



---

<div class="instance function ">

## remove
<span class="longname">Two.Text.remove</span>













<div class="description">

Remove self from the scene / parent.

</div>



<div class="meta">

  [text.js:456](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L456)

</div>






</div>



---

<div class="instance function ">

## clone
<span class="longname">Two.Text.clone</span>




<div class="returns">

__Returns__:



+ `Two.Text`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `parent`  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Text](/documentation/text) with the same properties of the current text object.

</div>



<div class="meta">

  [text.js:473](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L473)

</div>






</div>



---

<div class="instance function ">

## toObject
<span class="longname">Two.Text.toObject</span>




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the text object.

</div>



<div class="meta">

  [text.js:503](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L503)

</div>






</div>



---

<div class="instance function ">

## noFill
<span class="longname">Two.Text.noFill</span>













<div class="description">

Short hand method to set fill to `transparent`.

</div>



<div class="meta">

  [text.js:529](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L529)

</div>






</div>



---

<div class="instance function ">

## noStroke
<span class="longname">Two.Text.noStroke</span>













<div class="description">

Short hand method to set stroke to `transparent`.

</div>



<div class="meta">

  [text.js:539](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L539)

</div>






</div>



---

<div class="instance function ">

## getBoundingClientRect
<span class="longname">Two.Text.getBoundingClientRect</span>




<div class="returns">

__Returns__:



+ `Object`



- Returns object with top, left, right, bottom, width, height attributes.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `shallow`  | Describes whether to calculate off local matrix or world matrix. |
</div>




<div class="description">

Return an object with top, left, right, bottom, width, and height parameters of the text object.

</div>



<div class="meta">

  [text.js:554](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L554)

</div>






</div>


