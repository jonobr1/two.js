---
pageClass: documentation-class
---

# Two



The entrypoint for Two.js. Instantiate a `new Two` in order to setup a scene to render to. `Two` is also the publicly accessible namespace that all other sub-classes, functions, and utilities attach to.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/two.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `options`  |  |
|  `options.fullscreen`  | Set to `true` to automatically make the stage adapt to the width and height of the parent document. This parameter overrides `width` and `height` parameters if set to `true`. This overrides `options.fitted` as well. |
|  `options.fitted`  | = Set to `true` to automatically make the stage adapt to the width and height of the parent element. This parameter overrides `width` and `height` parameters if set to `true`. |
|  `options.width`  | The width of the stage on construction. This can be set at a later time. |
|  `options.height`  | The height of the stage on construction. This can be set at a later time. |
|  `options.type`  | The type of renderer to setup drawing with. See [Two.Types](/documentation/types) for available options. |
|  `options.autostart`  | Set to `true` to add the instance to draw on `requestAnimationFrame`. This is a convenient substitute for [Two.play](/documentation/play). |
|  `options.domElement`  | The canvas or SVG element to draw into. This overrides the `options.type` argument. |



---

<div class="static member ">

## 
<span class="longname">Two.Utils</span>








<div class="properties">

A massive object filled with utility functions and properties.

</div>








<div class="meta">

  [two.js:1046](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L1046)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.fit</span>













<div class="description">

If `options.fullscreen` or `options.fitted` in construction create this function. It sets the `width` and `height` of the instance to its respective parent `window` or `element` depending on the `options` passed.

</div>



<div class="meta">

  [two.js:105](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L105)

</div>






</div>



---

<div class="instance member ">

## 
<span class="longname">Two.type</span>








<div class="properties">

A string representing which type of renderer the instance has instantiated.

</div>








<div class="meta">

  [two.js:167](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L167)

</div>






</div>



---

<div class="instance member ">

## 
<span class="longname">Two.renderer</span>








<div class="properties">

The instantiated rendering class for the instance. For a list of possible rendering types check out Two.Types.

</div>








<div class="meta">

  [two.js:173](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L173)

</div>






</div>



---

<div class="instance member ">

## 
<span class="longname">Two.scene</span>








<div class="properties">

The base level [Two.Group](/documentation/group) which houses all objects for the instance. Because it is a [Two.Group](/documentation/group) transformations can be applied to it that will affect all objects in the instance. This is handy as a makeshift inverted camera.

</div>








<div class="meta">

  [two.js:179](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L179)

</div>






</div>



---

<div class="instance member ">

## 
<span class="longname">Two.width</span>








<div class="properties">

The width of the instance's dom element.

</div>








<div class="meta">

  [two.js:185](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L185)

</div>






</div>



---

<div class="instance member ">

## 
<span class="longname">Two.height</span>








<div class="properties">

The height of the instance's dom element.

</div>








<div class="meta">

  [two.js:191](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L191)

</div>






</div>



---

<div class="instance member ">

## 
<span class="longname">Two.frameCount</span>








<div class="properties">

An integer representing how many frames have elapsed.

</div>








<div class="meta">

  [two.js:197](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L197)

</div>






</div>



---

<div class="instance member ">

## 
<span class="longname">Two.timeDelta</span>








<div class="properties">

A number representing how much time has elapsed since the last frame in milliseconds.

</div>








<div class="meta">

  [two.js:203](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L203)

</div>






</div>



---

<div class="instance member ">

## 
<span class="longname">Two.playing</span>








<div class="properties">

A boolean representing whether or not the instance is being updated through the automatic `requestAnimationFrame`.

</div>








<div class="meta">

  [two.js:209](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L209)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.appendTo</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `elem`  | The DOM element to append the Two.js stage to. |
</div>




<div class="description">

Shorthand method to append your instance of Two.js to the `document`.

</div>



<div class="meta">

  [two.js:215](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L215)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.play</span>






<div class="fires">

__Triggers__:

+ `Two.Events.Types.event:play event`

</div>








<div class="description">

Call to start an internal animation loop.

</div>



<div class="meta">

  [two.js:237](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L237)

</div>



<div class="tags">


::: tip nota-bene
This function initiates a `requestAnimationFrame` loop.
:::


</div>




</div>



---

<div class="instance function ">

## 
<span class="longname">Two.pause</span>






<div class="fires">

__Triggers__:

+ `Two.Events.Types.event:pause event`

</div>








<div class="description">

Call to stop the internal animation loop for a specific instance of Two.js.

</div>



<div class="meta">

  [two.js:252](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L252)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.release</span>




<div class="returns">

__Returns__:



+ `Object`



The object passed for event deallocation.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `obj`  |  |
</div>




<div class="description">

Release an arbitrary class' events from the Two.js corpus and recurse through its children and or vertices.

</div>



<div class="meta">

  [two.js:269](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L269)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.update</span>






<div class="fires">

__Triggers__:

+ `Two.Events.Types.event:update event`

</div>








<div class="description">

Update positions and calculations in one pass before rendering. Then render to the canvas.

</div>



<div class="meta">

  [two.js:322](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L322)

</div>



<div class="tags">


::: tip nota-bene
This function is called automatically if using [Two.play](/documentation/play) or the `autostart` parameter in construction.
:::


</div>




</div>



---

<div class="instance function ">

## 
<span class="longname">Two.render</span>






<div class="fires">

__Triggers__:

+ `event:render`

</div>








<div class="description">

Render all drawable and visible objects of the scene.

</div>



<div class="meta">

  [two.js:360](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L360)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.add</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `objects`  | An array of Two.js objects. Alternatively can add objects as individual arguments. |
</div>




<div class="description">

A shorthand method to add specific Two.js objects to the scene.

</div>



<div class="meta">

  [two.js:375](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L375)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.remove</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `objects`  | An array of Two.js objects. |
</div>




<div class="description">

A shorthand method to remove specific Two.js objects from the scene.

</div>



<div class="meta">

  [two.js:393](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L393)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.clear</span>













<div class="description">

Removes all objects from the instance's scene. If you intend to have the browser garbage collect this, don't forget to delete the references in your application as well.

</div>



<div class="meta">

  [two.js:412](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L412)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeLine</span>




<div class="returns">

__Returns__:



+ `Two.Line`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x1`  |  |
|  `y1`  |  |
|  `x2`  |  |
|  `y2`  |  |
</div>




<div class="description">

Creates a Two.js line and adds it to the scene.

</div>



<div class="meta">

  [two.js:424](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L424)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeArrow</span>




<div class="returns">

__Returns__:



+ `Two.Path`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x1`  |  |
|  `y1`  |  |
|  `x2`  |  |
|  `y2`  |  |
</div>




<div class="description">

Creates a Two.js arrow and adds it to the scene.

</div>



<div class="meta">

  [two.js:443](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L443)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeRectangle</span>




<div class="returns">

__Returns__:



+ `Two.Rectangle`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
|  `width`  |  |
|  `height`  |  |
</div>




<div class="description">

Creates a Two.js rectangle and adds it to the scene.

</div>



<div class="meta">

  [two.js:488](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L488)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeRoundedRectangle</span>




<div class="returns">

__Returns__:



+ `Two.Rectangle`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
|  `width`  |  |
|  `height`  |  |
|  `sides`  |  |
</div>




<div class="description">

Creates a Two.js rounded rectangle and adds it to the scene.

</div>



<div class="meta">

  [two.js:507](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L507)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeCircle</span>




<div class="returns">

__Returns__:



+ `Two.Circle`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
|  `radius`  |  |
|  `resolution`  |  |
</div>




<div class="description">

Creates a Two.js circle and adds it to the scene.

</div>



<div class="meta">

  [two.js:527](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L527)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeEllipse</span>




<div class="returns">

__Returns__:



+ `Two.Ellipse`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
|  `rx`  |  |
|  `ry`  |  |
|  `resolution`  |  |
</div>




<div class="description">

Creates a Two.js ellipse and adds it to the scene.

</div>



<div class="meta">

  [two.js:546](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L546)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeStar</span>




<div class="returns">

__Returns__:



+ `Two.Star`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
|  `outerRadius`  |  |
|  `innerRadius`  |  |
|  `sides`  |  |
</div>




<div class="description">

Creates a Two.js star and adds it to the scene.

</div>



<div class="meta">

  [two.js:566](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L566)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeCurve</span>




<div class="returns">

__Returns__:



+ `Two.Path`



- Where `path.curved` is set to `true`.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `points`  | An array of [Two.Anchor](/documentation/anchor) points. |
|  | Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into [Two.Anchor](/documentation/anchor)s for use in the path. |
</div>




<div class="description">

Creates a Two.js path that is curved and adds it to the scene.

</div>



<div class="meta">

  [two.js:586](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L586)

</div>



<div class="tags">


::: tip nota-bene
In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
:::


</div>




</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makePolygon</span>




<div class="returns">

__Returns__:



+ `Two.Polygon`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
|  `radius`  |  |
|  `sides`  |  |
</div>




<div class="description">

Creates a Two.js polygon and adds it to the scene.

</div>



<div class="meta">

  [two.js:622](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L622)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeArcSegment</span>




<div class="returns">

__Returns__:



+ `Two.ArcSegment`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x`  |  |
|  `y`  |  |
|  `innerRadius`  |  |
|  `outerRadius`  |  |
|  `startAngle`  |  |
|  `endAngle`  |  |
|  `resolution`  | The number of vertices that should comprise the arc segment. |
</div>






<div class="meta">

  [two.js:641](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L641)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makePoints</span>




<div class="returns">

__Returns__:



+ `Two.Points`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `points`  | An array of [Two.Vector](/documentation/vector) points |
|  | Alternatively you can pass alternating `x` / `y` coordinate values as individual agrguments. These will be combined into [Two.Vector](/documentation/vector)s for use in the points object. |
</div>




<div class="description">

Creates a Two.js points object and adds it to the current scene.

</div>



<div class="meta">

  [two.js:659](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L659)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makePath</span>




<div class="returns">

__Returns__:



+ `Two.Path`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `points`  | An array of [Two.Anchor](/documentation/anchor) points |
|  | Alternatively you can pass alternating `x` / `y` coordinate values as individual arguments. These will be combined into [Two.Anchor](/documentation/anchor)s for use in the path. |
</div>




<div class="description">

Creates a Two.js path and adds it to the scene.

</div>



<div class="meta">

  [two.js:690](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L690)

</div>



<div class="tags">


::: tip nota-bene
In either case of passing an array or passing numbered arguments the last argument is an optional `Boolean` that defines whether the path should be open or closed.
:::


</div>




</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeText</span>




<div class="returns">

__Returns__:



+ `Two.Text`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `message`  |  |
|  `x`  |  |
|  `y`  |  |
|  `styles`  | An object to describe any of the [Two.Text.Properties](/documentation/text/#two-text-properties) including `fill`, `stroke`, `linewidth`, `family`, `alignment`, `leading`, `opacity`, etc.. |
</div>




<div class="description">

Creates a Two.js text object and adds it to the scene.

</div>



<div class="meta">

  [two.js:729](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L729)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeLinearGradient</span>




<div class="returns">

__Returns__:



+ `Two.LinearGradient`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x1`  |  |
|  `y1`  |  |
|  `x2`  |  |
|  `y2`  |  |
|  `stops`  | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |
</div>




<div class="description">

Creates a Two.js linear gradient and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.

</div>



<div class="meta">

  [two.js:745](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L745)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeRadialGradient</span>




<div class="returns">

__Returns__:



+ `Two.RadialGradient`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `x1`  |  |
|  `y1`  |  |
|  `radius`  |  |
|  `stops`  | Any number of color stops sometimes reffered to as ramp stops. If none are supplied then the default black-to-white two stop gradient is applied. |
</div>




<div class="description">

Creates a Two.js linear-gradient object and ads it to the scene. In the case of an effect it's added to an invisible "definitions" group.

</div>



<div class="meta">

  [two.js:767](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L767)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeSprite</span>




<div class="returns">

__Returns__:



+ `Two.Sprite`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `pathOrTexture`  | The URL path to an image or an already created [Two.Texture](/documentation/texture). |
|  `x`  |  |
|  `y`  |  |
|  `columns`  |  |
|  `rows`  |  |
|  `frameRate`  |  |
|  `autostart`  |  |
</div>




<div class="description">

Creates a Two.js sprite object and adds it to the scene. Sprites can be used for still images as well as animations.

</div>



<div class="meta">

  [two.js:788](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L788)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeImageSequence</span>




<div class="returns">

__Returns__:



+ `Two.ImageSequence`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `pathsOrTextures`  | An array of paths or of [Two.Textures](/documentation/textures). |
|  `x`  |  |
|  `y`  |  |
|  `frameRate`  |  |
|  `autostart`  |  |
</div>




<div class="description">

Creates a Two.js image sequence object and adds it to the scene.

</div>



<div class="meta">

  [two.js:813](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L813)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeTexture</span>




<div class="returns">

__Returns__:



+ `Two.Texture`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `pathOrSource`  | The URL path to an image or a DOM image-like element. |
|  `callback`  | Function to be invoked when the image is loaded. |
</div>




<div class="description">

Creates a Two.js texture object.

</div>



<div class="meta">

  [two.js:836](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L836)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.makeGroup</span>




<div class="returns">

__Returns__:



+ `Two.Group`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `objects`  | Two.js objects to be added to the group in the form of an array or as individual arguments. |
</div>




<div class="description">

Creates a Two.js group object and adds it to the scene.

</div>



<div class="meta">

  [two.js:851](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L851)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.interpret</span>




<div class="returns">

__Returns__:



+ `Two.Group`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `SVGElement`  | The SVG node to be parsed. |
|  `shallow`  | Don't create a top-most group but append all content directly. |
|  `add`  | – Automatically add the reconstructed SVG node to scene. |
</div>




<div class="description">

Interpret an SVG Node and add it to this instance's scene. The distinction should be made that this doesn't `import` svg's, it solely interprets them into something compatible for Two.js - this is slightly different than a direct transcription.

</div>



<div class="meta">

  [two.js:873](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L873)

</div>






</div>



---

<div class="instance function ">

## 
<span class="longname">Two.load</span>




<div class="returns">

__Returns__:



+ `Two.Group`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `pathOrSVGContent`  | The URL path of an SVG file or an SVG document as text. |
|  `callback`  | Function to call once loading has completed. |
</div>




<div class="description">

Load an SVG file or SVG text and interpret it into Two.js legible objects.

</div>



<div class="meta">

  [two.js:906](https://github.com/jonobr1/two.js/blob/dev/src/two.js#L906)

</div>






</div>


