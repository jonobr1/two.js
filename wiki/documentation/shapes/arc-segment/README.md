# Two.ArcSegment


__Extends__: `Two.Path`





### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | The x position of the arc segment. |
| `y` | The y position of the arc segment. |
| `innerRadius` | The inner radius value of the arc segment. |
| `outerRadius` | The outer radius value of the arc segment. |
| `startAngle` | The start angle of the arc segment in radians. |
| `endAngle` | The end angle of the arc segment in radians. |
| `resolution` | The number of vertices used to construct the arc segment. |



---

## Two.ArcSegment#innerRadius






The size of the inner radius of the arc segment.











---

## Two.ArcSegment#outerRadius






The size of the outer radius of the arc segment.











---

## Two.ArcSegment#startRadius






The angle of one side for the arc segment.











---

## Two.ArcSegment#endAngle






The angle of the other side for the arc segment.











---

## Two.ArcSegment.Properties






A list of properties that are on every {@link Two.ArcSegment}.











---

## Two.ArcSegment.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.ArcSegment} to any object. Handy if you'd like to extend the {@link Two.ArcSegment} class on a custom class.





---

## Two.ArcSegment#clone


__Returns__:



+ `Two.ArcSegment`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of {@link Two.ArcSegment} with the same properties of the current path.





---

## Two.ArcSegment#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.




