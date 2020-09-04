# Two.Group.Children


__Extends__: `Two.Utils.Collection`


A children collection which is accesible both by index and by object `id`.






---

<div class="instance">

## Two.Group.Children.ids






Map of all elements in the list keyed by `id`s.









</div>



---

<div class="instance">

## Two.Group.Children.attach








| Argument | Description |
| ---- | ----------- |
| `` |  |


Adds elements to the `ids` map.



</div>



---

<div class="instance">

## Two.Group.Children.detach








| Argument | Description |
| ---- | ----------- |
| `` |  |


Removes elements to the `ids` map.



</div>



---

<div class="static">

## Two.Group














</div>



---

<div class="instance">

## Two.Group.additions












An automatically updated list of children that need to be appended to the renderer's scenegraph.



</div>



---

<div class="instance">

## Two.Group.subtractions












An automatically updated list of children that need to be removed from the renderer's scenegraph.



</div>



---

<div class="instance">

## Two.Group.additions












A list of all the children in the scenegraph.


::: tip nota-bene
Ther order of this list indicates the order each element is rendered to the screen.
:::


</div>



---

<div class="static">

## Two.Group.InsertChildren










Cached method to let renderers know children have been added to a [Two.Group](/documentation/group).



</div>



---

<div class="static">

## Two.Group.RemoveChildren










Cached method to let renderers know children have been removed from a [Two.Group](/documentation/group).



</div>



---

<div class="static">

## Two.Group.OrderChildren










Cached method to let renderers know order has been updated on a [Two.Group](/documentation/group).



</div>



---

<div class="static">

## Two.Group.Properties






A list of properties that are on every [Two.Group](/documentation/group).









</div>



---

<div class="static">

## Two.Group.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a [Two.Group](/documentation/group) to any object. Handy if you'd like to extend the {@link Two.Group} class on a custom class.



</div>



---

<div class="static">

## Two.Group.MakeGetterSetters








| Argument | Description |
| ---- | ----------- |
| `group` | The group to apply getters and setters. |
| `properties` | A key / value object containing properties to inherit. |






</div>



---

<div class="static">

## Two.Group.MakeGetterSetter








| Argument | Description |
| ---- | ----------- |
| `group` | The group to apply getters and setters. |
| `key` | The key which will become a property on the group. |






</div>



---

<div class="instance">

## Two.Group.fill






The value of what all child shapes should be filled in with.









</div>



---

<div class="instance">

## Two.Group.stroke






The value of what all child shapes should be outlined in with.









</div>



---

<div class="instance">

## Two.Group.linewidth






The thickness in pixels of the stroke for all child shapes.









</div>



---

<div class="instance">

## Two.Group.opacity






The opaqueness of all child shapes.








::: tip nota-bene
Becomes multiplied by the individual child's opacity property.
:::


</div>



---

<div class="instance">

## Two.Group.visible






Display the path or not.








::: tip nota-bene
For [Two.CanvasRenderer](/documentation/canvasrenderer) and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::


</div>



---

<div class="instance">

## Two.Group.cap
















</div>



---

<div class="instance">

## Two.Group.join
















</div>



---

<div class="instance">

## Two.Group.miter
















</div>



---

<div class="instance">

## Two.Group.closed






Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.









</div>



---

<div class="instance">

## Two.Group.curved






When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.









</div>



---

<div class="instance">

## Two.Group.automatic






Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.









</div>



---

<div class="instance">

## Two.Group.beginning






Number between zero and one to state the beginning of where the path is rendered.





[Two.Group.beginning](/documentation/group#two-group-beginning) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.ending](/documentation/group#two-group-ending).
:::


</div>



---

<div class="instance">

## Two.Group.ending






Number between zero and one to state the ending of where the path is rendered.





[Two.Group.ending](/documentation/group#two-group-ending) is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with [Two.Group.beginning](/documentation/group#two-group-beginning).
:::


</div>



---

<div class="instance">

## Two.Group.length






The sum of distances between all child lengths.









</div>



---

<div class="instance">

## Two.Group.mask






The Two.js object to clip from a group's rendering.









</div>



---

<div class="instance">

## Two.Group.clone


__Returns__:



+ `Two.Group`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of [Two.Group](/documentation/group) with the same properties of the current group.



</div>



---

<div class="instance">

## Two.Group.toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the group.



</div>



---

<div class="instance">

## Two.Group.corner










Orient the children of the group to the upper left-hand corner of that group.



</div>



---

<div class="instance">

## Two.Group.center










Orient the children of the group to the center of that group.



</div>



---

<div class="instance">

## Two.Group.getById


__Returns__:



+ `Two.Shape`



- Or `null` if nothing is found.











Recursively search for id. Returns the first element found.



</div>



---

<div class="instance">

## Two.Group.getByClassName


__Returns__:



+ `Array.<Two.Shape>`



- Or empty array if nothing is found.











Recursively search for classes. Returns an array of matching elements.



</div>



---

<div class="instance">

## Two.Group.getByType


__Returns__:



+ `Array.<Two.Shape>`



- Empty array if nothing is found.











Recursively search for children of a specific type, e.g. [Two.Path](/documentation/path). Pass a reference to this type as the param. Returns an array of matching elements.



</div>



---

<div class="instance">

## Two.Group.add








| Argument | Description |
| ---- | ----------- |
| `objects` | An array of objects to be added. Can be also added as individual arguments. |


Add objects to the group.



</div>



---

<div class="instance">

## Two.Group.add








| Argument | Description |
| ---- | ----------- |
| `objects` | An array of objects to be removed. Can be also removed as individual arguments. |


Remove objects from the group.



</div>



---

<div class="instance">

## Two.Group.getBoundingClientRect


__Returns__:



+ `Object`



- Returns object with top, left, right, bottom, width, height attributes.









| Argument | Description |
| ---- | ----------- |
| `shallow` | Describes whether to calculate off local matrix or world matrix. |


Return an object with top, left, right, bottom, width, and height parameters of the group.



</div>



---

<div class="instance">

## Two.Group.noFill










Apply `noFill` method to all child shapes.



</div>



---

<div class="instance">

## Two.Group.noStroke










Apply `noStroke` method to all child shapes.



</div>



---

<div class="instance">

## Two.Group.subdivide










Apply `subdivide` method to all child shapes.



</div>


