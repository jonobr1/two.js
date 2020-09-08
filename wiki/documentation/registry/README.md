# Two.Registry



An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.






---

<div class="instance ">

## Two.Registry.add










| Argument | Description |
| ---- | ----------- |
| `id` | A unique identifier. |
| `value` | Any type of variable to be registered to the directory. |


Adds any value to the directory. Assigned by the `id`.



</div>



---

<div class="instance ">

## Two.Registry.remove










| Argument | Description |
| ---- | ----------- |
| `id` | A unique identifier. |


Remove any value from the directory by its `id`.



</div>



---

<div class="instance ">

## Two.Registry.get




__Returns__:



The associated value. If unavailable then `undefined` is returned.









| Argument | Description |
| ---- | ----------- |
| `id` | A unique identifier. |


Get a registered value by its `id`.



</div>



---

<div class="instance ">

## Two.Registry.contains




__Returns__:



+ `Boolean`











| Argument | Description |
| ---- | ----------- |
| `id` | A unique identifier. |


Convenience method to see if a value is registered to an `id` already.



</div>


