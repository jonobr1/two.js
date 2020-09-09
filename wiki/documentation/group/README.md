# Two.Group


<div class="extends">

__Extends__: `Two.Shape`

</div>


This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `children` | A list of objects that inherit [Two.Shape](/documentation/shape). For instance, the array could be a [Two.Path](/documentation/path), [Two.Text](/documentation/text), and [Two.RoundedRectangle](/documentation/roundedrectangle). |



---

<div class="static ">

## Two.Group.InsertChildren










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `children` | The objects to be inserted. |
</div>




<div class="description">

Cached method to let renderers know children have been added to a [Two.Group](/documentation/group).

</div>






</div>



---

<div class="static ">

## Two.Group.RemoveChildren










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `children` | The objects to be removed. |
</div>




<div class="description">

Cached method to let renderers know children have been removed from a [Two.Group](/documentation/group).

</div>






</div>



---

<div class="static ">

## Two.Group.OrderChildren













<div class="description">

Cached method to let renderers know order has been updated on a [Two.Group](/documentation/group).

</div>






</div>



---

<div class="static ">

## Two.Group.Properties








<div class="properties">

A list of properties that are on every [Two.Group](/documentation/group).

</div>











</div>



---

<div class="static ">

## Two.Group.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Group](/documentation/group) to any object. Handy if you'd like to extend the [Two.Group](/documentation/group) class on a custom class.

</div>






</div>



---

<div class="static ">

## Two.Group.MakeGetterSetters










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `group` | The group to apply getters and setters. |
| `properties` | A key / value object containing properties to inherit. |
</div>




<div class="description">

Convenience method to apply getter / setter logic on an array of properties. Used in [Two.Group.MakeObservable](/documentation/group#two-group-makeobservable).

</div>






</div>



---

<div class="static ">

## Two.Group.MakeGetterSetter










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `group` | The group to apply getters and setters. |
| `key` | The key which will become a property on the group. |
</div>




<div class="description">

Convenience method to apply getter / setter logic specific to how `Two.Group`s trickle down styles to their children. Used in [Two.Group.MakeObservable](/documentation/group#two-group-makeobservable).

</div>






</div>



---

<div class="instance ">

## Two.Group.additions








<div class="properties">



</div>






<div class="description">

An automatically updated list of children that need to be appended to the renderer's scenegraph.

</div>






</div>



---

<div class="instance ">

## Two.Group.subtractions








<div class="properties">



</div>






<div class="description">

An automatically updated list of children that need to be removed from the renderer's scenegraph.

</div>






</div>



---

<div class="instance ">

## Two.Group.additions








<div class="properties">



</div>






<div class="description">

A list of all the children in the scenegraph.

</div>



<div class="tags">


::: tip nota-bene
Ther order of this list indicates the order each element is rendered to the screen.
:::


</div>




</div>



---

<div class="instance ">

## Two.Group.fill








<div class="properties">

The value of what all child shapes should be filled in with.

</div>










<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS Colors.

</div>


</div>



---

<div class="instance ">

## Two.Group.stroke








<div class="properties">

The value of what all child shapes should be outlined in with.

</div>










<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS Colors.

</div>


</div>



---

<div class="instance ">

## Two.Group.linewidth








<div class="properties">

The thickness in pixels of the stroke for all child shapes.

</div>











</div>



---

<div class="instance ">

## Two.Group.opacity








<div class="properties">

The opaqueness of all child shapes.

</div>








<div class="tags">


::: tip nota-bene
Becomes multiplied by the individual child's opacity property.
:::


</div>




</div>



---

<div class="instance ">

## Two.Group.visible








<div class="properties">

Display the path or not.

</div>








<div class="tags">


::: tip nota-bene
For [Two.CanvasRenderer](/documentation/canvasrenderer) and [Two.WebGLRenderer](/documentation/webglrenderer) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>




</div>



---

<div class="instance ">

## Two.Group.cap








<div class="properties">



</div>










<div class="see">

[https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty)

</div>


</div>



---

<div class="instance ">

## Two.Group.join








<div class="properties">



</div>










<div class="see">

[https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty)

</div>


</div>



---

<div class="instance ">

## Two.Group.miter








<div class="properties">



</div>










<div class="see">

[https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty)

</div>


</div>



---

<div class="instance ">

## Two.Group.closed








<div class="properties">

Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.

</div>











</div>



---

<div class="instance ">

## Two.Group.curved








<div class="properties">

When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.

</div>











</div>



---

<div class="instance ">

## Two.Group.automatic








<div class="properties">

Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.

</div>











</div>



---

<div class="instance ">

## Two.Group.beginning








<div class="properties">

Number between zero and one to state the beginning of where the path is rendered.

</div>






<div class="description">

[Two.Group.beginning](/documentation/group#two-group-beginning) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.

</div>



<div class="tags">


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.ending](/documentation/group#two-group-ending).
:::


</div>




</div>



---

<div class="instance ">

## Two.Group.ending








<div class="properties">

Number between zero and one to state the ending of where the path is rendered.

</div>






<div class="description">

[Two.Group.ending](/documentation/group#two-group-ending) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.

</div>



<div class="tags">


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.beginning](/documentation/group#two-group-beginning).
:::


</div>




</div>



---

<div class="instance ">

## Two.Group.length








<div class="properties">

The sum of distances between all child lengths.

</div>











</div>



---

<div class="instance ">

## Two.Group.mask








<div class="properties">

The Two.js object to clip from a group's rendering.

</div>











</div>



---

<div class="instance ">

## Two.Group.clone




<div class="returns">

__Returns__:



+ `Two.Group`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Group](/documentation/group) with the same properties of the current group.

</div>






</div>



---

<div class="instance ">

## Two.Group.toObject




<div class="returns">

__Returns__:



+ `Object`




</div>










<div class="description">

Return a JSON compatible plain object that represents the group.

</div>






</div>



---

<div class="instance ">

## Two.Group.corner













<div class="description">

Orient the children of the group to the upper left-hand corner of that group.

</div>






</div>



---

<div class="instance ">

## Two.Group.center













<div class="description">

Orient the children of the group to the center of that group.

</div>






</div>



---

<div class="instance ">

## Two.Group.getById




<div class="returns">

__Returns__:



+ `Two.Shape`



- Or `null` if nothing is found.


</div>










<div class="description">

Recursively search for id. Returns the first element found.

</div>






</div>



---

<div class="instance ">

## Two.Group.getByClassName




<div class="returns">

__Returns__:



+ `Array.<Two.Shape>`



- Or empty array if nothing is found.


</div>










<div class="description">

Recursively search for classes. Returns an array of matching elements.

</div>






</div>



---

<div class="instance ">

## Two.Group.getByType




<div class="returns">

__Returns__:



+ `Array.<Two.Shape>`



- Empty array if nothing is found.


</div>










<div class="description">

Recursively search for children of a specific type, e.g. [Two.Path](/documentation/path). Pass a reference to this type as the param. Returns an array of matching elements.

</div>






</div>



---

<div class="instance ">

## Two.Group.add










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `objects` | An array of objects to be added. Can be also be supplied as individual arguments. |
</div>




<div class="description">

Add objects to the group.

</div>






</div>



---

<div class="instance ">

## Two.Group.add










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `objects` | An array of objects to be removed. Can be also removed as individual arguments. |
</div>




<div class="description">

Remove objects from the group.

</div>






</div>



---

<div class="instance ">

## Two.Group.getBoundingClientRect




<div class="returns">

__Returns__:



+ `Object`



- Returns object with top, left, right, bottom, width, height attributes.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `shallow` | Describes whether to calculate off local matrix or world matrix. |
</div>




<div class="description">

Return an object with top, left, right, bottom, width, and height parameters of the group.

</div>






</div>



---

<div class="instance ">

## Two.Group.noFill













<div class="description">

Apply `noFill` method to all child shapes.

</div>






</div>



---

<div class="instance ">

## Two.Group.noStroke













<div class="description">

Apply `noStroke` method to all child shapes.

</div>






</div>



---

<div class="instance ">

## Two.Group.subdivide













<div class="description">

Apply `subdivide` method to all child shapes.

</div>






</div>


