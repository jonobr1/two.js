# Two.Rectangle


__Extends__: `Two.Path`





### Constructor


| Argument | Description |
| ---- | ----------- |
| `x` | The x position of the rectangle. |
| `y` | The y position of the rectangle. |
| `width` | The width value of the rectangle. |
| `height` | The width value of the rectangle. |



---

## Two.Rectangle#width






The size of the width of the rectangle.











---

## Two.Rectangle#height






The size of the height of the rectangle.











---

## Two.Rectangle#origin






A two-component vector describing the origin offset to draw the rectangle. Default is `0, 0`.











---

## Two.Rectangle.Properties






A list of properties that are on every {@link Two.Rectangle}.











---

## Two.Rectangle.MakeObservable








| Argument | Description |
| ---- | ----------- |
| `object` | The object to make observable. |


Convenience function to apply observable qualities of a {@link Two.Rectangle} to any object. Handy if you'd like to extend the {@link Two.Rectangle} class on a custom class.





---

## Two.Rectangle#clone


__Returns__:



+ `Two.Rectangle`











| Argument | Description |
| ---- | ----------- |
| `parent` | The parent group or scene to add the clone to. |


Create a new instance of {@link Two.Rectangle} with the same properties of the current path.





---

## Two.Rectangle#toObject


__Returns__:



+ `Object`













Return a JSON compatible plain object that represents the path.




