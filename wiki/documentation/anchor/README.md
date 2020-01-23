# Two.Anchor


__Extends__: `Two.Vector`


An object that holds 3 {@link Two.Vector}s, the anchor point and its corresponding handles: `left` and `right`. In order to properly describe the bezier curve about the point there is also a command property to describe what type of drawing should occur when Two.js renders the anchors.


### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | The x position of the root anchor point. |
| `y` | The y position of the root anchor point. |
| `lx` | The x position of the left handle point. |
| `ly` | The y position of the left handle point. |
| `rx` | The x position of the right handle point. |
| `ry` | The y position of the right handle point. |
| `command` | The command to describe how to render. Applicable commands are {@link Two.Commands} |



---

## Two.Anchor.AppendCurveProperties








| Argument | Description |
| ---- | ----------- |
| `anchor` | The instance to append the `control`object to. |


Adds the `controls` property as an object with `left` and `right` properties to access the bezier control handles that define how the curve is drawn. It also sets the `relative` property to `true` making vectors in the `controls` object relative to their corresponding root anchor point.





---

## Two.Anchor#controls












An plain object that holds the controls handles for a {@link Two.Anchor}.





---

## Two.Anchor#controls#left












The "left" control point to define handles on a bezier curve.





---

## Two.Anchor#controls#right












The "left" control point to define handles on a bezier curve.





---

## Two.Anchor.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.Anchor} to any object. Handy if you'd like to extend the {@link Two.Anchor} class on a custom class.





---

## Two.Anchor#command












A draw command associated with the anchor point.





---

## Two.Anchor#relative












A boolean to render control points relative to the root anchor point or in global coordinate-space to the rest of the scene.





---

## Two.Anchor#listen










Convenience method used mainly by {@link Two.Path#vertices} to listen and propagate changes from control points up to their respective anchors and further if necessary.





---

## Two.Anchor#ignore










Convenience method used mainly by {@link Two.Path#vertices} to ignore changes from a specific anchor's control points.





---

## Two.Anchor#copy








| Argument | Description |
| ---- | ----------- |
| `v` | The anchor to apply values to. |


Copy the properties of one {@link Two.Anchor} onto another.





---

## Two.Anchor#clone


__Returns__:



+ `Two.Anchor`













Create a new {@link Two.Anchor}, set all its values to the current instance and return it for use.





---

## Two.Anchor#toObject


__Returns__:



+ `Object`



- An object with properties filled out to mirror {@link Two.Anchor}.











Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.





---

## Two.Anchor#toString


__Returns__:



+ `String`



- A String with comma-separated values reflecting the various values on the current instance.











Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible {@link Two.Anchor#toObject}.




