# Two



The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `options` |  |
| `options.fullscreen` | Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. |
| `options.width` | The width of the stage on construction. This can be set at a later time. |
| `options.height` | The height of the stage on construction. This can be set at a later time. |
| `options.type` | The type of renderer to setup drawing with. See [Two.Types](/documentation/types) for available options. |
| `options.autostart` | Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for [Two.play](/documentation/play). |



---

<div class="static ">

## Two.Commands








<div class="properties">

Map of possible path commands. Taken from the SVG specification.

</div>











</div>



---

<div class="instance ">

## Two.appendTo










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `elem` | The DOM element to append the Two.js stage to. |
</div>




<div class="description">

Shorthand method to append your instance of Two.js to the `document`.

</div>






</div>



---

<div class="instance ">

## Two.play






<div class="fires">

__Triggers__:

+ `Two.Events.Types.event:play event`

</div>








<div class="description">

Call to start an internal animation loop.

</div>



<div class="tags">


::: tip nota-bene
This function initiates a `requestAnimationFrame` loop.
:::


</div>




</div>



---

<div class="instance ">

## Two.pause






<div class="fires">

__Triggers__:

+ `Two.Events.Types.event:pause event`

</div>








<div class="description">

Call to stop the internal animation loop for a specific instance of Two.js.

</div>






</div>



---

<div class="instance ">

## Two.release




<div class="returns">

__Returns__:



+ `Object`



The object passed for event deallocation.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `obj` |  |
</div>




<div class="description">

Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.

</div>






</div>



---

<div class="instance ">

## Two.update






<div class="fires">

__Triggers__:

+ `Two.Events.Types.event:update event`

</div>








<div class="description">

Update positions and calculations in one pass before rendering. Then render to the canvas.

</div>



<div class="tags">


::: tip nota-bene
This function is called automatically if using [Two.play](/documentation/play) or the `autostart` parameter in construction.
:::


</div>




</div>



---

<div class="instance ">

## Two.render






<div class="fires">

__Triggers__:

+ `event:render`

</div>








<div class="description">

Render all drawable and visible objects of the scene.

</div>






</div>



---

<div class="instance ">

## Two.add










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `objects` | An array of Two.js objects. Alternatively can add objects as individual arguments. |
</div>




<div class="description">

A shorthand method to add specific Two.js objects to the scene.

</div>






</div>



---

<div class="instance ">

## Two.remove










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `objects` | An array of Two.js objects. |
</div>




<div class="description">

A shorthand method to remove specific Two.js objects from the scene.

</div>






</div>



---

<div class="instance ">

## Two.clear













<div class="description">

Remove all all Two.js objects from the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeLine




<div class="returns">

__Returns__:



+ `Two.Line`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x1` |  |
| `y1` |  |
| `x2` |  |
| `y2` |  |
</div>




<div class="description">

Creates a Two.js line and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeArrow




<div class="returns">

__Returns__:



+ `Two.Path`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x1` |  |
| `y1` |  |
| `x2` |  |
| `y2` |  |
</div>




<div class="description">

Creates a Two.js arrow and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeRectangle




<div class="returns">

__Returns__:



+ `Two.Rectangle`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `width` |  |
| `height` |  |
</div>




<div class="description">

Creates a Two.js rectangle and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeRoundedRectangle




<div class="returns">

__Returns__:



+ `Two.Rectangle`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `width` |  |
| `height` |  |
| `sides` |  |
</div>




<div class="description">

Creates a Two.js rounded rectangle and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeCircle




<div class="returns">

__Returns__:



+ `Two.Circle`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `radius` |  |
| `resolution` |  |
</div>




<div class="description">

Creates a Two.js circle and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeEllipse




<div class="returns">

__Returns__:



+ `Two.Ellipse`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `rx` |  |
| `ry` |  |
| `resolution` |  |
</div>




<div class="description">

Creates a Two.js ellipse and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeStar




<div class="returns">

__Returns__:



+ `Two.Star`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `outerRadius` |  |
| `innerRadius` |  |
| `sides` |  |
</div>




<div class="description">

Creates a Two.js star and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeCurve




<div class="returns">

__Returns__:



+ `Two.Path`



- Where `path.curved` is set to `true`.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `points` | An array of [Two.Anchor](/documentation/anchor) points. |
| `` | Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into [Two.Anchor](/documentation/anchor)s for use in the path. |
</div>




<div class="description">

Creates a Two.js path that is curved and adds it to the scene.

</div>



<div class="tags">


::: tip nota-bene
In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
:::


</div>




</div>



---

<div class="instance ">

## Two.makePolygon




<div class="returns">

__Returns__:



+ `Two.Polygon`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `radius` |  |
| `sides` |  |
</div>




<div class="description">

Creates a Two.js polygon and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeArcSegment










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x` |  |
| `y` |  |
| `innerRadius` |  |
| `outerRadius` |  |
| `startAngle` |  |
| `endAngle` |  |
| `resolution` | The number of vertices that should comprise the arc segment. |
</div>









</div>



---

<div class="instance ">

## Two.makePath




<div class="returns">

__Returns__:



+ `Two.Path`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `points` | An array of [Two.Anchor](/documentation/anchor) points. |
| `` | Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into [Two.Anchor](/documentation/anchor)s for use in the path. |
</div>




<div class="description">

Creates a Two.js path and adds it to the scene.

</div>



<div class="tags">


::: tip nota-bene
In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
:::


</div>




</div>



---

<div class="instance ">

## Two.makeText




<div class="returns">

__Returns__:



+ `Two.Text`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `message` |  |
| `x` |  |
| `y` |  |
| `styles` | An object to describe any of the [Two.Text.Properties](/documentation/text#two-text-properties) including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc.. |
</div>




<div class="description">

Creates a Two.js text object and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeLinearGradient




<div class="returns">

__Returns__:



+ `Two.LinearGradient`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x1` |  |
| `y1` |  |
| `x2` |  |
| `y2` |  |
| `stops` | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |
</div>




<div class="description">

Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.

</div>






</div>



---

<div class="instance ">

## Two.makeRadialGradient




<div class="returns">

__Returns__:



+ `Two.RadialGradient`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `x1` |  |
| `y1` |  |
| `radius` |  |
| `stops` | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |
</div>




<div class="description">

Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.

</div>






</div>



---

<div class="instance ">

## Two.makeSprite




<div class="returns">

__Returns__:



+ `Two.Sprite`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `pathOrTexture` | The URL path to an image or an already created [Two.Texture](/documentation/texture). |
| `x` |  |
| `y` |  |
| `columns` |  |
| `rows` |  |
| `frameRate` |  |
| `autostart` |  |
</div>




<div class="description">

Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.

</div>






</div>



---

<div class="instance ">

## Two.makeImageSequence




<div class="returns">

__Returns__:



+ `Two.ImageSequence`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `pathsOrTextures` | An array of paths or of [Two.Textures](/documentation/textures). |
| `x` |  |
| `y` |  |
| `frameRate` |  |
| `autostart` |  |
</div>




<div class="description">

Creates a Two.js image sequence object and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.makeTexture




<div class="returns">

__Returns__:



+ `Two.Texture`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `pathOrSource` | The URL path to an image or a DOM image-like element. |
| `callback` | Function to be invoked when the image is loaded. |
</div>




<div class="description">

Creates a Two.js texture object.

</div>






</div>



---

<div class="instance ">

## Two.makeGroup




<div class="returns">

__Returns__:



+ `Two.Group`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `objects` | Two.js objects to be added to the group in the form of an array or as individual arguments. |
</div>




<div class="description">

Creates a Two.js group object and adds it to the scene.

</div>






</div>



---

<div class="instance ">

## Two.interpret




<div class="returns">

__Returns__:



+ `Two.Group`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `svgNode` | The SVG node to be parsed. |
| `shallow` | Don't create a top-most group but append all content directly. |
| `add` | – Automatically add the reconstructed SVG node to scene. |
</div>




<div class="description">

Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.

</div>






</div>



---

<div class="instance ">

## Two.load




<div class="returns">

__Returns__:



+ `Two.Group`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `pathOrSVGContent` | The URL path of an SVG file or an SVG document as text. |
| `callback` | Function to call once loading has completed. |
</div>




<div class="description">

Load an SVG file or SVG text and interpret it into Two.js legible objects.

</div>






</div>


