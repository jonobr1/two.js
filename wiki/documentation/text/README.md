# Two.Text


<div class="extends">

__Extends__: `Two.Shape`

</div>


This is a primitive class for creating drawable text that can be added to the scenegraph.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L13)

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

## Two.Text.Ratio








<div class="properties">

Approximate aspect ratio of a typeface's character width to height.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L70)

</div>






</div>



---

<div class="static member ">

## Two.Text.Properties








<div class="properties">

A list of properties that are on every [Two.Text](/documentation/text).

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L76)

</div>






</div>



---

<div class="static function ">

## Two.Text.FlagFill













<div class="description">

Cached method to let renderers know the fill property have been updated on a [Two.Text](/documentation/text).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L86)

</div>






</div>



---

<div class="static function ">

## Two.Text.FlagStroke













<div class="description">

Cached method to let renderers know the stroke property have been updated on a [Two.Text](/documentation/text).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L95)

</div>






</div>



---

<div class="instance member ">

## Two.Text.dashes








<div class="properties">

Array of numbers. Odd indices represent dash length. Even indices represent dash space.

</div>






<div class="description">

A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L40)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) for more information on the SVG stroke-dasharray attribute.

</div>


</div>



---

<div class="instance member ">

## Two.Text.dashes.offset








<div class="properties">

A number in pixels to offset [Two.Text.dashes](/documentation/text#two-text-dashes) display.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L48)

</div>






</div>



---

<div class="instance member ">

## Two.Text.value








<div class="properties">

The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L311)

</div>






</div>



---

<div class="instance member ">

## Two.Text.family








<div class="properties">

The font family Two.js should attempt to regsiter for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L317)

</div>






</div>



---

<div class="instance member ">

## Two.Text.size








<div class="properties">

The font size in Two.js point space. Defaults to `13`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L323)

</div>






</div>



---

<div class="instance member ">

## Two.Text.leading








<div class="properties">

The height between lines measured from base to base in Two.js point space. Defaults to `17`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L329)

</div>






</div>



---

<div class="instance member ">

## Two.Text.alignment








<div class="properties">

Alignment of text in relation to [Two.Text.translation](/documentation/text#two-text-translation)'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L335)

</div>






</div>



---

<div class="instance member ">

## Two.Text.baseline








<div class="properties">

The vertical aligment of the text in relation to [Two.Text.translation](/documentation/text#two-text-translation)'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L341)

</div>






</div>



---

<div class="instance member ">

## Two.Text.style








<div class="properties">

The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L347)

</div>






</div>



---

<div class="instance member ">

## Two.Text.weight








<div class="properties">

A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L353)

</div>






</div>



---

<div class="instance member ">

## Two.Text.decoration








<div class="properties">

String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L359)

</div>






</div>



---

<div class="instance member ">

## Two.Text.fill








<div class="properties">

The value of what the text object should be filled in with.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L365)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS Colors.

</div>


</div>



---

<div class="instance member ">

## Two.Text.stroke








<div class="properties">

The value of what the text object should be filled in with.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L372)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS Colors.

</div>


</div>



---

<div class="instance member ">

## Two.Text.linewidth








<div class="properties">

The thickness in pixels of the stroke.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L379)

</div>






</div>



---

<div class="instance member ">

## Two.Text.opacity








<div class="properties">

The opaqueness of the text object.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L385)

</div>



<div class="tags">


::: tip nota-bene
Can be used in conjunction with CSS Colors that have an alpha value.
:::


</div>




</div>



---

<div class="instance member ">

## Two.Text.className








<div class="properties">

A class to be applied to the element to be compatible with CSS styling. Only available for the [Two.SvgRenderer](/documentation/svgrenderer).

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L392)

</div>






</div>



---

<div class="instance member ">

## Two.Text.visible








<div class="properties">

Display the text object or not.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L398)

</div>



<div class="tags">


::: tip nota-bene
For [Two.CanvasRenderer](/documentation/canvasrenderer) and [Two.WebGLRenderer](/documentation/webglrenderer) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>




</div>



---

<div class="instance member ">

## Two.Text.clip








<div class="properties">

Object to define clipping area.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L405)

</div>



<div class="tags">


::: tip nota-bene
This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
:::


</div>




</div>



---

<div class="instance function ">

## Two.Text.remove













<div class="description">

Remove self from the scene / parent.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L421)

</div>






</div>



---

<div class="instance function ">

## Two.Text.clone




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

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L438)

</div>






</div>



---

<div class="instance function ">

## Two.Text.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the text object.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L468)

</div>






</div>



---

<div class="instance function ">

## Two.Text.noFill













<div class="description">

Short hand method to set fill to `transparent`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L494)

</div>






</div>



---

<div class="instance function ">

## Two.Text.noStroke













<div class="description">

Short hand method to set stroke to `transparent`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L504)

</div>






</div>



---

<div class="instance function ">

## Two.Text.getBoundingClientRect




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

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/text.js#L519)

</div>






</div>


