---
pageClass: docs
---

# Two.Group


<div class="extends">

Extends: [Two.Shape](/docs/shape/)

</div>


This is the primary class for grouping objects that are then drawn in Two.js. In Illustrator this is a group, in After Effects it would be a Null Object. Whichever the case, the `Two.Group` contains a transformation matrix and commands to style its children, but it by itself doesn't render to the screen.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js" />
</div>



### Constructor


| Argument | Description |
| ---- | ----------- |
|  children  | A list of objects that inherit [Two.Shape](/docs/shape). For instance, the array could be a [Two.Path](/docs/path), [Two.Text](/docs/text), and [Two.RoundedRectangle](/docs/roundedrectangle). |



<div class="static function ">

## InsertChildren

<h2 class="longname" aria-hidden="true"><a href="#InsertChildren"><span class="prefix">Two.Group.</span><span class="shortname">InsertChildren</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  children  | The objects to be inserted. |
</div>




<div class="description">

Cached method to let renderers know children have been added to a [Two.Group](/docs/group).

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L55">
    group.js:55
  </a>

</div>






</div>



<div class="static function ">

## RemoveChildren

<h2 class="longname" aria-hidden="true"><a href="#RemoveChildren"><span class="prefix">Two.Group.</span><span class="shortname">RemoveChildren</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  children  | The objects to be removed. |
</div>




<div class="description">

Cached method to let renderers know children have been removed from a [Two.Group](/docs/group).

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L67">
    group.js:67
  </a>

</div>






</div>



<div class="static function ">

## OrderChildren

<h2 class="longname" aria-hidden="true"><a href="#OrderChildren"><span class="prefix">Two.Group.</span><span class="shortname">OrderChildren</span></a></h2>















<div class="description">

Cached method to let renderers know order has been updated on a [Two.Group](/docs/group).

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L79">
    group.js:79
  </a>

</div>






</div>



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Group.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">

A list of properties that are on every [Two.Group](/docs/group).

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L88">
    group.js:88
  </a>

</div>






</div>



<div class="static function ">

## MakeObservable

<h2 class="longname" aria-hidden="true"><a href="#MakeObservable"><span class="prefix">Two.Group.</span><span class="shortname">MakeObservable</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  object  | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Group](/docs/group) to any object. Handy if you'd like to extend the [Two.Group](/docs/group) class on a custom class.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L105">
    group.js:105
  </a>

</div>






</div>



<div class="static function ">

## MakeGetterSetters

<h2 class="longname" aria-hidden="true"><a href="#MakeGetterSetters"><span class="prefix">Two.Group.</span><span class="shortname">MakeGetterSetters</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  group  | The group to apply getters and setters. |
|  properties  | A key / value object containing properties to inherit. |
</div>




<div class="description">

Convenience method to apply getter / setter logic on an array of properties. Used in [Two.Group.MakeObservable](/docs/group/#two-group-makeobservable).

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L252">
    group.js:252
  </a>

</div>






</div>



<div class="static function ">

## MakeGetterSetter

<h2 class="longname" aria-hidden="true"><a href="#MakeGetterSetter"><span class="prefix">Two.Group.</span><span class="shortname">MakeGetterSetter</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  group  | The group to apply getters and setters. |
|  key  | The key which will become a property on the group. |
</div>




<div class="description">

Convenience method to apply getter / setter logic specific to how `Two.Group`s trickle down styles to their children. Used in [Two.Group.MakeObservable](/docs/group/#two-group-makeobservable).

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L271">
    group.js:271
  </a>

</div>






</div>



<div class="instance member ">

## additions

<h2 class="longname" aria-hidden="true"><a href="#additions"><span class="prefix">Two.Group.</span><span class="shortname">additions</span></a></h2>










<div class="properties">



</div>






<div class="description">

An automatically updated list of children that need to be appended to the renderer's scenegraph.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L27">
    group.js:27
  </a>

</div>






</div>



<div class="instance member ">

## subtractions

<h2 class="longname" aria-hidden="true"><a href="#subtractions"><span class="prefix">Two.Group.</span><span class="shortname">subtractions</span></a></h2>










<div class="properties">



</div>






<div class="description">

An automatically updated list of children that need to be removed from the renderer's scenegraph.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L34">
    group.js:34
  </a>

</div>






</div>



<div class="instance member ">

## children

<h2 class="longname" aria-hidden="true"><a href="#children"><span class="prefix">Two.Group.</span><span class="shortname">children</span></a></h2>










<div class="properties">



</div>






<div class="description">

A list of all the children in the scenegraph.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L41">
    group.js:41
  </a>

</div>



<div class="tags">


::: tip nota-bene
Ther order of this list indicates the order each element is rendered to the screen.
:::


</div>




</div>



<div class="instance member ">

## fill

<h2 class="longname" aria-hidden="true"><a href="#fill"><span class="prefix">Two.Group.</span><span class="shortname">fill</span></a></h2>










<div class="properties">

The value of what all child shapes should be filled in with.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L376">
    group.js:376
  </a>

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>


</div>



<div class="instance member ">

## stroke

<h2 class="longname" aria-hidden="true"><a href="#stroke"><span class="prefix">Two.Group.</span><span class="shortname">stroke</span></a></h2>










<div class="properties">

The value of what all child shapes should be outlined in with.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L383">
    group.js:383
  </a>

</div>





<div class="see">

[https://developer.mozilla.org/en-US/docs/Web/CSS/color_value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information on CSS's colors as `String`.

</div>


</div>



<div class="instance member ">

## linewidth

<h2 class="longname" aria-hidden="true"><a href="#linewidth"><span class="prefix">Two.Group.</span><span class="shortname">linewidth</span></a></h2>










<div class="properties">

The thickness in pixels of the stroke for all child shapes.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L390">
    group.js:390
  </a>

</div>






</div>



<div class="instance member ">

## opacity

<h2 class="longname" aria-hidden="true"><a href="#opacity"><span class="prefix">Two.Group.</span><span class="shortname">opacity</span></a></h2>










<div class="properties">

The opaqueness of all child shapes.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L396">
    group.js:396
  </a>

</div>



<div class="tags">


::: tip nota-bene
Becomes multiplied by the individual child's opacity property.
:::


</div>




</div>



<div class="instance member ">

## visible

<h2 class="longname" aria-hidden="true"><a href="#visible"><span class="prefix">Two.Group.</span><span class="shortname">visible</span></a></h2>










<div class="properties">

Display the path or not.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L403">
    group.js:403
  </a>

</div>



<div class="tags">


::: tip nota-bene
For [Two.CanvasRenderer](/docs/canvasrenderer) and [Two.WebGLRenderer](/docs/webglrenderer) when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>




</div>



<div class="instance member ">

## cap

<h2 class="longname" aria-hidden="true"><a href="#cap"><span class="prefix">Two.Group.</span><span class="shortname">cap</span></a></h2>










<div class="properties">



</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L410">
    group.js:410
  </a>

</div>





<div class="see">

[https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty)

</div>


</div>



<div class="instance member ">

## join

<h2 class="longname" aria-hidden="true"><a href="#join"><span class="prefix">Two.Group.</span><span class="shortname">join</span></a></h2>










<div class="properties">



</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L417">
    group.js:417
  </a>

</div>





<div class="see">

[https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty)

</div>


</div>



<div class="instance member ">

## miter

<h2 class="longname" aria-hidden="true"><a href="#miter"><span class="prefix">Two.Group.</span><span class="shortname">miter</span></a></h2>










<div class="properties">



</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L424">
    group.js:424
  </a>

</div>





<div class="see">

[https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty](https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty)

</div>


</div>



<div class="instance member ">

## closed

<h2 class="longname" aria-hidden="true"><a href="#closed"><span class="prefix">Two.Group.</span><span class="shortname">closed</span></a></h2>










<div class="properties">

Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L431">
    group.js:431
  </a>

</div>






</div>



<div class="instance member ">

## curved

<h2 class="longname" aria-hidden="true"><a href="#curved"><span class="prefix">Two.Group.</span><span class="shortname">curved</span></a></h2>










<div class="properties">

When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L437">
    group.js:437
  </a>

</div>






</div>



<div class="instance member ">

## automatic

<h2 class="longname" aria-hidden="true"><a href="#automatic"><span class="prefix">Two.Group.</span><span class="shortname">automatic</span></a></h2>










<div class="properties">

Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L443">
    group.js:443
  </a>

</div>






</div>



<div class="instance member ">

## beginning

<h2 class="longname" aria-hidden="true"><a href="#beginning"><span class="prefix">Two.Group.</span><span class="shortname">beginning</span></a></h2>










<div class="properties">

Number between zero and one to state the beginning of where the path is rendered.

</div>






<div class="description">

[Two.Group.beginning](/docs/group/#two-group-beginning) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L449">
    group.js:449
  </a>

</div>



<div class="tags">


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.ending](/docs/group/#two-group-ending).
:::


</div>




</div>



<div class="instance member ">

## ending

<h2 class="longname" aria-hidden="true"><a href="#ending"><span class="prefix">Two.Group.</span><span class="shortname">ending</span></a></h2>










<div class="properties">

Number between zero and one to state the ending of where the path is rendered.

</div>






<div class="description">

[Two.Group.ending](/docs/group/#two-group-ending) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L457">
    group.js:457
  </a>

</div>



<div class="tags">


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.beginning](/docs/group/#two-group-beginning).
:::


</div>




</div>



<div class="instance member ">

## length

<h2 class="longname" aria-hidden="true"><a href="#length"><span class="prefix">Two.Group.</span><span class="shortname">length</span></a></h2>










<div class="properties">

The sum of distances between all child lengths.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L465">
    group.js:465
  </a>

</div>






</div>



<div class="instance member ">

## mask

<h2 class="longname" aria-hidden="true"><a href="#mask"><span class="prefix">Two.Group.</span><span class="shortname">mask</span></a></h2>










<div class="properties">

The Two.js object to clip from a group's rendering.

</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L471">
    group.js:471
  </a>

</div>






</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Group.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Group



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Group](/docs/group) with the same properties of the current group.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L477">
    group.js:477
  </a>

</div>






</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Group.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the group.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L522">
    group.js:522
  </a>

</div>






</div>



<div class="instance function ">

## corner

<h2 class="longname" aria-hidden="true"><a href="#corner"><span class="prefix">Two.Group.</span><span class="shortname">corner</span></a></h2>















<div class="description">

Orient the children of the group to the upper left-hand corner of that group.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L552">
    group.js:552
  </a>

</div>






</div>



<div class="instance function ">

## center

<h2 class="longname" aria-hidden="true"><a href="#center"><span class="prefix">Two.Group.</span><span class="shortname">center</span></a></h2>















<div class="description">

Orient the children of the group to the center of that group.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L571">
    group.js:571
  </a>

</div>






</div>



<div class="instance function ">

## getById

<h2 class="longname" aria-hidden="true"><a href="#getById"><span class="prefix">Two.Group.</span><span class="shortname">getById</span></a></h2>




<div class="returns">

__Returns__: Two.Shape


- Or `null` if nothing is found.


</div>












<div class="description">

Recursively search for id. Returns the first element found.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L594">
    group.js:594
  </a>

</div>






</div>



<div class="instance function ">

## getByClassName

<h2 class="longname" aria-hidden="true"><a href="#getByClassName"><span class="prefix">Two.Group.</span><span class="shortname">getByClassName</span></a></h2>




<div class="returns">

__Returns__: Array.<Two.Shape>


- Or empty array if nothing is found.


</div>












<div class="description">

Recursively search for classes. Returns an array of matching elements.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L618">
    group.js:618
  </a>

</div>






</div>



<div class="instance function ">

## getByType

<h2 class="longname" aria-hidden="true"><a href="#getByType"><span class="prefix">Two.Group.</span><span class="shortname">getByType</span></a></h2>




<div class="returns">

__Returns__: Array.<Two.Shape>


- Empty array if nothing is found.


</div>












<div class="description">

Recursively search for children of a specific type, e.g. [Two.Path](/docs/path). Pass a reference to this type as the param. Returns an array of matching elements.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L641">
    group.js:641
  </a>

</div>






</div>



<div class="instance function ">

## add

<h2 class="longname" aria-hidden="true"><a href="#add"><span class="prefix">Two.Group.</span><span class="shortname">add</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  objects  | An array of objects to be added. Can be also be supplied as individual arguments. |
</div>




<div class="description">

Add objects to the group.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L664">
    group.js:664
  </a>

</div>






</div>



<div class="instance function ">

## add

<h2 class="longname" aria-hidden="true"><a href="#add"><span class="prefix">Two.Group.</span><span class="shortname">add</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  objects  | An array of objects to be removed. Can be also removed as individual arguments. |
</div>




<div class="description">

Remove objects from the group.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L698">
    group.js:698
  </a>

</div>






</div>



<div class="instance function ">

## getBoundingClientRect

<h2 class="longname" aria-hidden="true"><a href="#getBoundingClientRect"><span class="prefix">Two.Group.</span><span class="shortname">getBoundingClientRect</span></a></h2>




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

Return an object with top, left, right, bottom, width, and height parameters of the group.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L741">
    group.js:741
  </a>

</div>






</div>



<div class="instance function ">

## noFill

<h2 class="longname" aria-hidden="true"><a href="#noFill"><span class="prefix">Two.Group.</span><span class="shortname">noFill</span></a></h2>















<div class="description">

Apply `noFill` method to all child shapes.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L813">
    group.js:813
  </a>

</div>






</div>



<div class="instance function ">

## noStroke

<h2 class="longname" aria-hidden="true"><a href="#noStroke"><span class="prefix">Two.Group.</span><span class="shortname">noStroke</span></a></h2>















<div class="description">

Apply `noStroke` method to all child shapes.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L825">
    group.js:825
  </a>

</div>






</div>



<div class="instance function ">

## subdivide

<h2 class="longname" aria-hidden="true"><a href="#subdivide"><span class="prefix">Two.Group.</span><span class="shortname">subdivide</span></a></h2>















<div class="description">

Apply `subdivide` method to all child shapes.

</div>



<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/dev/src/group.js#L837">
    group.js:837
  </a>

</div>






</div>


