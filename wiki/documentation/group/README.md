---
pageClass: documentation-class
---

# Two.Group


<div class="extends">

__Extends__: [Two.Shape](/documentation/shape/)

</div>


This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  `children`  | A list of objects that inherit [Two.Shape](/documentation/shape). For instance, the array could be a [Two.Path](/documentation/path), [Two.Text](/documentation/text), and [Two.RoundedRectangle](/documentation/roundedrectangle). |



---

<div class="static function ">

## InsertChildren
<span class="longname">Two.Group.InsertChildren</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `children`  | The objects to be inserted. |
</div>




<div class="description">

Cached method to let renderers know children have been added to a [Two.Group](/documentation/group).

</div>



<div class="meta">

  [group.js:55](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L55)

</div>






</div>



---

<div class="static function ">

## RemoveChildren
<span class="longname">Two.Group.RemoveChildren</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `children`  | The objects to be removed. |
</div>




<div class="description">

Cached method to let renderers know children have been removed from a [Two.Group](/documentation/group).

</div>



<div class="meta">

  [group.js:67](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L67)

</div>






</div>



---

<div class="static function ">

## OrderChildren
<span class="longname">Two.Group.OrderChildren</span>













<div class="description">

Cached method to let renderers know order has been updated on a [Two.Group](/documentation/group).

</div>



<div class="meta">

  [group.js:79](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L79)

</div>






</div>



---

<div class="static member ">

## Properties
<span class="longname">Two.Group.Properties</span>








<div class="properties">

A list of properties that are on every [Two.Group](/documentation/group).

</div>








<div class="meta">

  [group.js:88](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L88)

</div>






</div>



---

<div class="static function ">

## MakeObservable
<span class="longname">Two.Group.MakeObservable</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `object`  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Group](/documentation/group) to any object. Handy if you'd like to extend the [Two.Group](/documentation/group) class on a custom class.

</div>



<div class="meta">

  [group.js:105](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L105)

</div>






</div>



---

<div class="static function ">

## MakeGetterSetters
<span class="longname">Two.Group.MakeGetterSetters</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `group`  | The group to apply getters and setters. |
|  `properties`  | A key / value object containing properties to inherit. |
</div>




<div class="description">

Convenience method to apply getter / setter logic on an array of properties. Used in [Two.Group.MakeObservable](/documentation/group/#two-group-makeobservable).

</div>



<div class="meta">

  [group.js:252](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L252)

</div>






</div>



---

<div class="static function ">

## MakeGetterSetter
<span class="longname">Two.Group.MakeGetterSetter</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `group`  | The group to apply getters and setters. |
|  `key`  | The key which will become a property on the group. |
</div>




<div class="description">

Convenience method to apply getter / setter logic specific to how `Two.Group`s trickle down styles to their children. Used in [Two.Group.MakeObservable](/documentation/group/#two-group-makeobservable).

</div>



<div class="meta">

  [group.js:271](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L271)

</div>






</div>



---

<div class="instance member ">

## additions
<span class="longname">Two.Group.additions</span>








<div class="properties">



</div>






<div class="description">

An automatically updated list of children that need to be appended to the renderer's scenegraph.

</div>



<div class="meta">

  [group.js:27](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L27)

</div>






</div>



---

<div class="instance member ">

## subtractions
<span class="longname">Two.Group.subtractions</span>








<div class="properties">



</div>






<div class="description">

An automatically updated list of children that need to be removed from the renderer's scenegraph.

</div>



<div class="meta">

  [group.js:34](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L34)

</div>






</div>



---

<div class="instance member ">

## children
<span class="longname">Two.Group.children</span>








<div class="properties">



</div>






<div class="description">

A list of all the children in the scenegraph.

</div>



<div class="meta">

  [group.js:41](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L41)

</div>



<div class="tags">


::: tip nota-bene
Ther order of this list indicates the order each element is rendered to the screen.
:::


</div>




</div>



---

<div class="instance member ">

## fill
<span class="longname">Two.Group.fill</span>








<div class="properties">

The value of what all child shapes should be filled in with.

</div>








<div class="meta">

  [group.js:376](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L376)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>


</div>



---

<div class="instance member ">

## stroke
<span class="longname">Two.Group.stroke</span>








<div class="properties">

The value of what all child shapes should be outlined in with.

</div>








<div class="meta">

  [group.js:383](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L383)

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>


</div>



---

<div class="instance member ">

## linewidth
<span class="longname">Two.Group.linewidth</span>








<div class="properties">

The thickness in pixels of the stroke for all child shapes.

</div>








<div class="meta">

  [group.js:390](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L390)

</div>






</div>



---

<div class="instance member ">

## opacity
<span class="longname">Two.Group.opacity</span>








<div class="properties">

The opaqueness of all child shapes.

</div>








<div class="meta">

  [group.js:396](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L396)

</div>



<div class="tags">


::: tip nota-bene
Becomes multiplied by the individual child's opacity property.
:::


</div>




</div>



---

<div class="instance member ">

## visible
<span class="longname">Two.Group.visible</span>








<div class="properties">

Display the path or not.

</div>








<div class="meta">

  [group.js:403](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L403)

</div>



<div class="tags">


::: tip nota-bene
For [Two.CanvasRenderer](/documentation/canvasrenderer) and [Two.WebGLRenderer](/documentation/webglrenderer) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>




</div>



---

<div class="instance member ">

## cap
<span class="longname">Two.Group.cap</span>








<div class="properties">



</div>








<div class="meta">

  [group.js:410](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L410)

</div>





<div class="see">

[https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty)

</div>


</div>



---

<div class="instance member ">

## join
<span class="longname">Two.Group.join</span>








<div class="properties">



</div>








<div class="meta">

  [group.js:417](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L417)

</div>





<div class="see">

[https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty)

</div>


</div>



---

<div class="instance member ">

## miter
<span class="longname">Two.Group.miter</span>








<div class="properties">



</div>








<div class="meta">

  [group.js:424](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L424)

</div>





<div class="see">

[https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty)

</div>


</div>



---

<div class="instance member ">

## closed
<span class="longname">Two.Group.closed</span>








<div class="properties">

Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.

</div>








<div class="meta">

  [group.js:431](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L431)

</div>






</div>



---

<div class="instance member ">

## curved
<span class="longname">Two.Group.curved</span>








<div class="properties">

When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.

</div>








<div class="meta">

  [group.js:437](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L437)

</div>






</div>



---

<div class="instance member ">

## automatic
<span class="longname">Two.Group.automatic</span>








<div class="properties">

Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.

</div>








<div class="meta">

  [group.js:443](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L443)

</div>






</div>



---

<div class="instance member ">

## beginning
<span class="longname">Two.Group.beginning</span>








<div class="properties">

Number between zero and one to state the beginning of where the path is rendered.

</div>






<div class="description">

[Two.Group.beginning](/documentation/group/#two-group-beginning) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.

</div>



<div class="meta">

  [group.js:449](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L449)

</div>



<div class="tags">


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.ending](/documentation/group/#two-group-ending).
:::


</div>




</div>



---

<div class="instance member ">

## ending
<span class="longname">Two.Group.ending</span>








<div class="properties">

Number between zero and one to state the ending of where the path is rendered.

</div>






<div class="description">

[Two.Group.ending](/documentation/group/#two-group-ending) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.

</div>



<div class="meta">

  [group.js:457](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L457)

</div>



<div class="tags">


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.beginning](/documentation/group/#two-group-beginning).
:::


</div>




</div>



---

<div class="instance member ">

## length
<span class="longname">Two.Group.length</span>








<div class="properties">

The sum of distances between all child lengths.

</div>








<div class="meta">

  [group.js:465](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L465)

</div>






</div>



---

<div class="instance member ">

## mask
<span class="longname">Two.Group.mask</span>








<div class="properties">

The Two.js object to clip from a group's rendering.

</div>








<div class="meta">

  [group.js:471](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L471)

</div>






</div>



---

<div class="instance function ">

## clone
<span class="longname">Two.Group.clone</span>




<div class="returns">

__Returns__:



+ `Two.Group`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `parent`  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Group](/documentation/group) with the same properties of the current group.

</div>



<div class="meta">

  [group.js:477](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L477)

</div>






</div>



---

<div class="instance function ">

## toObject
<span class="longname">Two.Group.toObject</span>




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the group.

</div>



<div class="meta">

  [group.js:522](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L522)

</div>






</div>



---

<div class="instance function ">

## corner
<span class="longname">Two.Group.corner</span>













<div class="description">

Orient the children of the group to the upper left-hand corner of that group.

</div>



<div class="meta">

  [group.js:552](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L552)

</div>






</div>



---

<div class="instance function ">

## center
<span class="longname">Two.Group.center</span>













<div class="description">

Orient the children of the group to the center of that group.

</div>



<div class="meta">

  [group.js:571](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L571)

</div>






</div>



---

<div class="instance function ">

## getById
<span class="longname">Two.Group.getById</span>




<div class="returns">

__Returns__:



+ `Two.Shape`



- Or `null` if nothing is found.


</div>










<div class="description">

Recursively search for id. Returns the first element found.

</div>



<div class="meta">

  [group.js:594](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L594)

</div>






</div>



---

<div class="instance function ">

## getByClassName
<span class="longname">Two.Group.getByClassName</span>




<div class="returns">

__Returns__:



+ `Array.<Two.Shape>`



- Or empty array if nothing is found.


</div>










<div class="description">

Recursively search for classes. Returns an array of matching elements.

</div>



<div class="meta">

  [group.js:618](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L618)

</div>






</div>



---

<div class="instance function ">

## getByType
<span class="longname">Two.Group.getByType</span>




<div class="returns">

__Returns__:



+ `Array.<Two.Shape>`



- Empty array if nothing is found.


</div>










<div class="description">

Recursively search for children of a specific type, e.g. [Two.Path](/documentation/path). Pass a reference to this type as the param. Returns an array of matching elements.

</div>



<div class="meta">

  [group.js:641](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L641)

</div>






</div>



---

<div class="instance function ">

## add
<span class="longname">Two.Group.add</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `objects`  | An array of objects to be added. Can be also be supplied as individual arguments. |
</div>




<div class="description">

Add objects to the group.

</div>



<div class="meta">

  [group.js:664](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L664)

</div>






</div>



---

<div class="instance function ">

## add
<span class="longname">Two.Group.add</span>










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `objects`  | An array of objects to be removed. Can be also removed as individual arguments. |
</div>




<div class="description">

Remove objects from the group.

</div>



<div class="meta">

  [group.js:698](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L698)

</div>






</div>



---

<div class="instance function ">

## getBoundingClientRect
<span class="longname">Two.Group.getBoundingClientRect</span>




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

Return an object with top, left, right, bottom, width, and height parameters of the group.

</div>



<div class="meta">

  [group.js:741](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L741)

</div>






</div>



---

<div class="instance function ">

## noFill
<span class="longname">Two.Group.noFill</span>













<div class="description">

Apply `noFill` method to all child shapes.

</div>



<div class="meta">

  [group.js:813](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L813)

</div>






</div>



---

<div class="instance function ">

## noStroke
<span class="longname">Two.Group.noStroke</span>













<div class="description">

Apply `noStroke` method to all child shapes.

</div>



<div class="meta">

  [group.js:825](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L825)

</div>






</div>



---

<div class="instance function ">

## subdivide
<span class="longname">Two.Group.subdivide</span>













<div class="description">

Apply `subdivide` method to all child shapes.

</div>



<div class="meta">

  [group.js:837](https://github.com/jonobr1/two.js/blob/dev/src/group.js#L837)

</div>






</div>


