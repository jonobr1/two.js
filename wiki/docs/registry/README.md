---
title: Two.Registry
pageClass: docs
lang: en-US
---

# Two.Registry



An arbitrary class to manage a directory of things. Mainly used for keeping tabs of textures in Two.js.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/registry.js" />
</div>


<carbon-ads />






<div class="instance function ">

## add

<h2 class="longname" aria-hidden="true"><a href="#add"><span class="prefix">Two.Registry.</span><span class="shortname">add</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  id  | A unique identifier. |
|  obj  | Any type of variable to be registered to the directory. |
</div>




<div class="description">

Adds any value to the directory. Assigned by the `id`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/registry.js#L12">
    registry.js:12
  </a>

</div>




</div>



<div class="instance function ">

## remove

<h2 class="longname" aria-hidden="true"><a href="#remove"><span class="prefix">Two.Registry.</span><span class="shortname">remove</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  id  | A unique identifier. |
</div>




<div class="description">

Remove any value from the directory by its `id`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/registry.js#L24">
    registry.js:24
  </a>

</div>




</div>



<div class="instance function ">

## get

<h2 class="longname" aria-hidden="true"><a href="#get"><span class="prefix">Two.Registry.</span><span class="shortname">get</span></a></h2>




<div class="returns">

__Returns__: Object


The associated value. If unavailable then `undefined` is returned.


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  id  | A unique identifier. |
</div>




<div class="description">

Get a registered value by its `id`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/registry.js#L35">
    registry.js:35
  </a>

</div>




</div>



<div class="instance function ">

## contains

<h2 class="longname" aria-hidden="true"><a href="#contains"><span class="prefix">Two.Registry.</span><span class="shortname">contains</span></a></h2>




<div class="returns">

__Returns__: Boolean



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  id  | A unique identifier. |
</div>




<div class="description">

Convenience method to see if a value is registered to an `id` already.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/registry.js#L46">
    registry.js:46
  </a>

</div>




</div>


