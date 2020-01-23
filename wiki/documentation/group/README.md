# Two.Group


__Extends__: `Two.Shape`


This is a container object for two.js — it can hold shapes as well as other groups. At a technical level it can be considered an empty transformation matrix. It is recommended to use `two.makeGroup()` in order to add groups to your instance of two, but it's not necessary. Unless specified methods return their instance of `Two.Group` for the purpose of chaining.






---

## Two.Group#additions












An automatically updated list of children that need to be appended to the renderer's scenegraph.





---

## Two.Group#subtractions












An automatically updated list of children that need to be removed from the renderer's scenegraph.





---

## Two.Group#additions












A list of all the children in the scenegraph.


::: tip nota-bene
Ther order of this list indicates the order each element is rendered to the screen.
:::




---

## Two.Group.Children










A children collection which is accesible both by index and by object `id`.





---

## Two.Group.Children#ids






Map of all elements in the list keyed by `id`s.











---

## Two.Group.Children#attach








| Argument | Description |
| ---- | ----------- |
| `` |  |


Adds elements to the `ids` map.





---

## Two.Group.Children#detach








| Argument | Description |
| ---- | ----------- |
| `` |  |


Removes elements to the `ids` map.





---

## Two.Group.InsertChildren










Cached method to let renderers know children have been added to a {@link Two.Group}.





---

## Two.Group.RemoveChildren










Cached method to let renderers know children have been removed from a {@link Two.Group}.





---

## Two.Group.OrderChildren










Cached method to let renderers know order has been updated on a {@link Two.Group}.





---

## Two.Group.Properties






A list of properties that are on every {@link Two.Group}.











---

## Two.Group.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.Group} to any object. Handy if you'd like to extend the {@link Two.Group} class on a custom class.





---

## Two.Group.MakeGetterSetters








| Argument | Description |
| ---- | ----------- |
| `group` | The group to apply getters and setters. |
| `properties` | A key / value object containing properties to inherit. |








---

## Two.Group.MakeGetterSetter








| Argument | Description |
| ---- | ----------- |
| `group` | The group to apply getters and setters. |
| `key` | The key which will become a property on the group. |








---

## Two.Group#fill






The value of what all child shapes should be filled in with.











---

## Two.Group#stroke






The value of what all child shapes should be outlined in with.











---

## Two.Group#linewidth






The thickness in pixels of the stroke for all child shapes.











---

## Two.Group#opacity






The opaqueness of all child shapes.








::: tip nota-bene
Becomes multiplied by the individual child's opacity property.
:::




---

## Two.Group#visible






Display the path or not.








::: tip nota-bene
For {@link Two.CanvasRenderer} and {@link Two.WebGLRenderer} when set to false all updating is disabled improving performance dramatically with many objects in the scene.
:::




---

## Two.Group#cap


















---

## Two.Group#join


















---

## Two.Group#miter


















---

## Two.Group#closed






Determines whether a final line is drawn between the final point in the `vertices` array and the first point of all child shapes.











---

## Two.Group#curved






When the child's path is `automatic = true` this boolean determines whether the lines between the points are curved or not.











---

## Two.Group#automatic






Determines whether or not Two.js should calculate curves, lines, and commands automatically for you or to let the developer manipulate them for themselves.











---

## Two.Group#beginning






Number between zero and one to state the beginning of where the path is rendered.





{@link Two.Group#beginning} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with {@link Two.Group#ending}.
:::




---

## Two.Group#ending






Number between zero and one to state the ending of where the path is rendered.





{@link Two.Group#ending} is a percentage value that represents at what percentage into all child shapes should the renderer start drawing.


::: tip nota-bene
This is great for animating in and out stroked paths in conjunction with {@link Two.Group#beginning}.
:::




---

## Two.Group#length






The sum of distances between all child lengths.











---

## Two.Group#mask






The Two.js object to clip from a group's rendering.











---

## Two.Group#clone


__Returns__:



+ `Two.Group`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of {@link Two.Group} with the same properties of the current group.





---

## Two.Group#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the group.





---

## Two.Group#corner










Orient the children of the group to the upper left-hand corner of that group.





---

## Two.Group#center










Orient the children of the group to the center of that group.





---

## Two.Group#getById


__Returns__:



+ `Two.Shape`



- Or `null` if nothing is found.











Recursively search for id. Returns the first element found.





---

## Two.Group#getByClassName


__Returns__:



+ `Array.<Two.Shape>`



- Or empty array if nothing is found.











Recursively search for classes. Returns an array of matching elements.





---

## Two.Group#getByType


__Returns__:



+ `Array.<Two.Shape>`



- Empty array if nothing is found.











Recursively search for children of a specific type, e.g. {@link Two.Path}. Pass a reference to this type as the param. Returns an array of matching elements.





---

## Two.Group#add








| Argument | Description |
| ---- | ----------- |
| `objects` | An array of objects to be added. Can be also added as individual arguments. |


Add objects to the group.





---

## Two.Group#add








| Argument | Description |
| ---- | ----------- |
| `objects` | An array of objects to be removed. Can be also removed as individual arguments. |


Remove objects from the group.





---

## Two.Group#getBoundingClientRect


__Returns__:



+ `Object`



- Returns object with top, left, right, bottom, width, height attributes.









| Argument | Description |
| ---- | ----------- |
| `shallow` | Describes whether to calculate off local matrix or world matrix. |


Return an object with top, left, right, bottom, width, and height parameters of the group.





---

## Two.Group#noFill










Apply `noFill` method to all child shapes.





---

## Two.Group#noStroke










Apply `noStroke` method to all child shapes.





---

## Two.Group#subdivide










Apply `subdivide` method to all child shapes.




