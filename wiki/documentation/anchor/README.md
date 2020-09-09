# Two.Anchor


<div class="extends">

__Extends__: `Two.Vector`

</div>


An object that holds 3 [Two.Vector](/documentation/vector)s, the anchor point and its corresponding handles: `left` and `right`. In order to properly describe the bezier curve about the point there is also a command property to describe what type of drawing should occur when Two.js renders the anchors.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | The x position of the root anchor point. |
| `y` | The y position of the root anchor point. |
| `lx` | The x position of the left handle point. |
| `ly` | The y position of the left handle point. |
| `rx` | The x position of the right handle point. |
| `ry` | The y position of the right handle point. |
| `command` | The command to describe how to render. Applicable commands are [Two.Commands](/documentation/commands) |



---

<div class="static ">

## Two.Anchor.AppendCurveProperties










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `anchor` | The instance to append the `control`object to. |
</div>




<div class="description">

Adds the `controls` property as an object with `left` and `right` properties to access the bezier control handles that define how the curve is drawn. It also sets the `relative` property to `true` making vectors in the `controls` object relative to their corresponding root anchor point.

</div>






</div>



---

<div class="static ">

## Two.Anchor.MakeObservable










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |
</div>




<div class="description">

Convenience function to apply observable qualities of a [Two.Anchor](/documentation/anchor) to any object. Handy if you'd like to extend the [Two.Anchor](/documentation/anchor) class on a custom class.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.controls








<div class="properties">



</div>






<div class="description">

An plain object that holds the controls handles for a [Two.Anchor](/documentation/anchor).

</div>






</div>



---

<div class="instance ">

## Two.Anchor.controls.left








<div class="properties">



</div>






<div class="description">

The "left" control point to define handles on a bezier curve.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.controls.right








<div class="properties">



</div>






<div class="description">

The "left" control point to define handles on a bezier curve.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.command








<div class="properties">



</div>






<div class="description">

A draw command associated with the anchor point.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.relative








<div class="properties">



</div>






<div class="description">

A boolean to render control points relative to the root anchor point or in global coordinate-space to the rest of the scene.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.listen













<div class="description">

Convenience method used mainly by [Two.Path.vertices](/documentation/path#two-path-vertices) to listen and propagate changes from control points up to their respective anchors and further if necessary.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.ignore













<div class="description">

Convenience method used mainly by [Two.Path.vertices](/documentation/path#two-path-vertices) to ignore changes from a specific anchor's control points.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.copy










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `v` | The anchor to apply values to. |
</div>




<div class="description">

Copy the properties of one [Two.Anchor](/documentation/anchor) onto another.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.clone




<div class="returns">

__Returns__:



+ `Two.Anchor`




</div>










<div class="description">

Create a new [Two.Anchor](/documentation/anchor), set all its values to the current instance and return it for use.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.toObject




<div class="returns">

__Returns__:



+ `Object`



- An object with properties filled out to mirror [Two.Anchor](/documentation/anchor).


</div>










<div class="description">

Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.

</div>






</div>



---

<div class="instance ">

## Two.Anchor.toString




<div class="returns">

__Returns__:



+ `String`



- A String with comma-separated values reflecting the various values on the current instance.


</div>










<div class="description">

Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible [Two.Anchor.toObject](/documentation/anchor#two-anchor-toobject).

</div>






</div>


