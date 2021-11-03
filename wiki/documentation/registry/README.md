---
pageClass: documentation-class
---

# Two.Registry



An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/registry.js#L3)

</div>







---

<div class="instance function ">

### Two.Registry.add










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `id`  | A unique identifier. |
|  `value`  | Any type of variable to be registered to the directory. |
</div>




<div class="description">

Adds any value to the directory. Assigned by the `id`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/registry.js#L18)

</div>






</div>



---

<div class="instance function ">

### Two.Registry.remove










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `id`  | A unique identifier. |
</div>




<div class="description">

Remove any value from the directory by its `id`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/registry.js#L30)

</div>






</div>



---

<div class="instance function ">

### Two.Registry.get




<div class="returns">

__Returns__:



+ `Object`



The associated value. If unavailable then `undefined` is returned.


</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `id`  | A unique identifier. |
</div>




<div class="description">

Get a registered value by its `id`.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/registry.js#L41)

</div>






</div>



---

<div class="instance function ">

### Two.Registry.contains




<div class="returns">

__Returns__:



+ `Boolean`




</div>







<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `id`  | A unique identifier. |
</div>




<div class="description">

Convenience method to see if a value is registered to an `id` already.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/registry.js#L52)

</div>






</div>


