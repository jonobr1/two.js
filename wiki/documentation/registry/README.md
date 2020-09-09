# Two.Registry



An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.






---

<div class="instance ">

## Two.Registry.add










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `id` | A unique identifier. |
| `value` | Any type of variable to be registered to the directory. |
</div>




<div class="description">

Adds any value to the directory. Assigned by the `id`.

</div>






</div>



---

<div class="instance ">

## Two.Registry.remove










<div class="params">

| Argument | Description |
| ---- | ----------- |
| `id` | A unique identifier. |
</div>




<div class="description">

Remove any value from the directory by its `id`.

</div>






</div>



---

<div class="instance ">

## Two.Registry.get




<div class="returns">

__Returns__:



The associated value. If unavailable then `undefined` is returned.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `id` | A unique identifier. |
</div>




<div class="description">

Get a registered value by its `id`.

</div>






</div>



---

<div class="instance ">

## Two.Registry.contains




<div class="returns">

__Returns__:



+ `Boolean`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
| `id` | A unique identifier. |
</div>




<div class="description">

Convenience method to see if a value is registered to an `id` already.

</div>






</div>


