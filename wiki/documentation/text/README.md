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

## Two.Text#dashes






Array of numbers. Odd indices represent dash length. Even indices represent dash space.





A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.





---

## Two.Text#dashes#offset






A number in pixels to offset {@link Two.Text#dashes} display.











---

## Two.Text.Ratio






Approximate aspect ratio of a typeface's character width to height.











---

## Two.Text.Properties






A list of properties that are on every {@link Two.Text}.











---

## Two.Text.FlagFill










Cached method to let renderers know the fill property have been updated on a {@link Two.Text}.





---

## Two.Text.FlagStroke










Cached method to let renderers know the stroke property have been updated on a {@link Two.Text}.





---

## Two.Text#value






The characters to be rendered to the the screen. Referred to in the documentation sometimes as the `message`.











---

## Two.Text#family






The font family Two.js should attempt to regsiter for rendering. The default value is `'sans-serif'`. Comma separated font names can be supplied as a "stack", similar to the CSS implementation of `font-family`.











---

## Two.Text#size






The font size in Two.js point space. Defaults to `13`.











---

## Two.Text#leading






The height between lines measured from base to base in Two.js point space. Defaults to `17`.











---

## Two.Text#alignment






Alignment of text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'left'`, `'center'`, `'right'`. Defaults to `'center'`.











---

## Two.Text#baseline






The vertical aligment of the text in relation to {@link Two.Text#translation}'s coordinates. Possible values include `'top'`, `'middle'`, `'bottom'`, and `'baseline'`. Defaults to `'baseline'`.











---

## Two.Text#style






The font's style. Possible values include '`normal`', `'italic'`. Defaults to `'normal'`.











---

## Two.Text#weight






A number at intervals of 100 to describe the font's weight. This compatibility varies with the typeface's variant weights. Larger values are bolder. Smaller values are thinner. Defaults to `'500'`.











---

## Two.Text#decoration






String to delineate whether text should be decorated with for instance an `'underline'`. Defaults to `'none'`.











---

## Two.Text#fill






The value of what the text object should be filled in with.











---

## Two.Text#stroke






The value of what the text object should be filled in with.











---

## Two.Text#linewidth






The thickness in pixels of the stroke.











---

## Two.Text#opacity






The opaqueness of the text object.








::: tip nota-bene
Can be used in conjunction with CSS Colors that have an alpha value.
:::




---

## Two.Text#className






A class to be applied to the element to be compatible with CSS styling. Only available for the {@link Two.SvgRenderer}.











---

## Two.Text#visible






Display the text object or not.








::: tip nota-bene
For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::




---

## Two.Text#clip






Object to define clipping area.








::: tip nota-bene
This property is currently not working becuase of SVG spec issues found here {@link https://code.google.com/p/chromium/issues/detail?id=370951}.
:::




---

## Two.Text#remove










Remove self from the scene / parent.





---

## Two.Text#clone


__Returns__:



+ `Two.Text`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of {@link Two.Text} with the same properties of the current text object.





---

## Two.Text#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the text object.





---

## Two.Text#noFill










Short hand method to set fill to `transparent`.





---

## Two.Text#noStroke










Short hand method to set stroke to `transparent`.





---

## Two.Text#getBoundingClientRect


__Returns__:



+ `Object`



- Returns object with top, left, right, bottom, width, height attributes.









| Argument | Description |
| ---- | ----------- |
| `shallow` | Describes whether to calculate off local matrix or world matrix. |


Return an object with top, left, right, bottom, width, and height parameters of the text object.




