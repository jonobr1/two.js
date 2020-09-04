# Two.Text


__Extends__: `Two.Shape`


This is a primitive class for creating drawable text that can be added to the scenegraph.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `message` | The String to be rendered to the scene. |
| `x` | The position in the x direction for the object. |
| `y` | The position in the y direction for the object. |
| `styles` | An object where styles are applied. Attribute must exist in Two.Text.Properties. |



---

<div class="instance">

## Two.Text.dashes






Array of numbers. Odd indices represent dash length. Even indices represent dash space.





A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.



</div>



---

<div class="instance">

## Two.Text.dashes.offset






A number in pixels to offset [Two.Text.dashes](/documentation/text#two-text-dashes) display.









</div>



---

<div class="static">

## Two.Text.Ratio






Approximate aspect ratio of a typeface's character width to height.









</div>



---

<div class="static">

## Two.Text.Properties






A list of properties that are on every [Two.Text](/documentation/text).









</div>



---

<div class="static">

## Two.Text.FlagFill










Cached method to let renderers know the fill property have been updated on a [Two.Text](/documentation/text).



</div>



---

<div class="static">

## Two.Text.FlagStroke










Cached method to let renderers know the stroke property have been updated on a [Two.Text](/documentation/text).



</div>



---

<div class="instance">

## Two.Text.value






The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.









</div>



---

<div class="instance">

## Two.Text.family






The font family Two.js should attempt to regsiter for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.









</div>



---

<div class="instance">

## Two.Text.size






The font size in Two.js point space. Defaults to `13`.









</div>



---

<div class="instance">

## Two.Text.leading






The height between lines measured from base to base in Two.js point space. Defaults to `17`.









</div>



---

<div class="instance">

## Two.Text.alignment






Alignment of text in relation to [Two.Text.translation](/documentation/text#two-text-translation)'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.









</div>



---

<div class="instance">

## Two.Text.baseline






The vertical aligment of the text in relation to [Two.Text.translation](/documentation/text#two-text-translation)'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.









</div>



---

<div class="instance">

## Two.Text.style






The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.









</div>



---

<div class="instance">

## Two.Text.weight






A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.









</div>



---

<div class="instance">

## Two.Text.decoration






String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.









</div>



---

<div class="instance">

## Two.Text.fill






The value of what the text object should be filled in with.









</div>



---

<div class="instance">

## Two.Text.stroke






The value of what the text object should be filled in with.









</div>



---

<div class="instance">

## Two.Text.linewidth






The thickness in pixels of the stroke.









</div>



---

<div class="instance">

## Two.Text.opacity






The opaqueness of the text object.








::: tip nota-bene
Can be used in conjunction with CSS Colors that have an alpha value.
:::


</div>



---

<div class="instance">

## Two.Text.className






A class to be applied to the element to be compatible with CSS styling. Only available for the [Two.SvgRenderer](/documentation/svgrenderer).









</div>



---

<div class="instance">

## Two.Text.visible






Display the text object or not.








::: tip nota-bene
For [Two.CanvasRenderer](/documentation/canvasrenderer) and [Two.WebGLRenderer](/documentation/webglrenderer) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>



---

<div class="instance">

## Two.Text.clip






Object to define clipping area.








::: tip nota-bene
This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
:::


</div>



---

<div class="instance">

## Two.Text.remove










Remove self from the scene / parent.



</div>



---

<div class="instance">

## Two.Text.clone


__Returns__:



+ `Two.Text`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of [Two.Text](/documentation/text) with the same properties of the current text object.



</div>



---

<div class="instance">

## Two.Text.toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the text object.



</div>



---

<div class="instance">

## Two.Text.noFill










Short hand method to set fill to `transparent`.



</div>



---

<div class="instance">

## Two.Text.noStroke










Short hand method to set stroke to `transparent`.



</div>



---

<div class="instance">

## Two.Text.getBoundingClientRect


__Returns__:



+ `Object`



- Returns object with top, left, right, bottom, width, height attributes.









| Argument | Description |
| ---- | ----------- |
| `shallow` | Describes whether to calculate off local matrix or world matrix. |


Return an object with top, left, right, bottom, width, and height parameters of the text object.



</div>


