---
title: Two.Polygon
pageClass: docs
lang: en-US
---

# Two.Polygon


<div class="extends">

Extends: [Two.Path](/docs/path/)

</div>





<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  x  | The x position of the polygon. |
|  y  | The y position of the polygon. |
|  radius  | The radius value of the polygon. |
|  sides  | The number of vertices used to construct the polygon. |



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.Polygon.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.Polygon](/docs/shapes/polygon/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js#L117">
    polygon.js:117
  </a>

</div>




</div>



<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.Polygon.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.Polygon



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.Polygon](/docs/shapes/polygon/) to create a new instance |
</div>




<div class="description">

Create a new [Two.Polygon](/docs/shapes/polygon/) from an object notation of a [Two.Polygon](/docs/shapes/polygon/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js#L123">
    polygon.js:123
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.Polygon.toObject](/docs/shapes/polygon/#toobject)
:::


</div>


</div>



<div class="instance member ">

## radius

<h2 class="longname" aria-hidden="true"><a href="#radius"><span class="prefix">Two.Polygon.</span><span class="shortname">radius</span></a></h2>










<div class="properties">


The radius value of the polygon.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js#L78">
    polygon.js:78
  </a>

</div>



<div class="tags">


::: tip nota-bene
This property is tied to [Two.Polygon.width](/docs/shapes/polygon/#width) and [Two.Polygon.height](/docs/shapes/polygon/#height). When you set `radius`, it affects `width` and `height`. Likewise, if you set `width` or `height` it will change the `radius`.
:::


</div>


</div>



<div class="instance member ">

## width

<h2 class="longname" aria-hidden="true"><a href="#width"><span class="prefix">Two.Polygon.</span><span class="shortname">width</span></a></h2>










<div class="properties">


The size of the width of the polygon.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js#L87">
    polygon.js:87
  </a>

</div>



<div class="tags">


::: tip nota-bene
This property is tied to [Two.Polygon.radius](/docs/shapes/polygon/#radius). When you set `radius`, it affects the `width`. Likewise, if you set `width` it will change the `radius`.
:::


</div>


</div>



<div class="instance member ">

## height

<h2 class="longname" aria-hidden="true"><a href="#height"><span class="prefix">Two.Polygon.</span><span class="shortname">height</span></a></h2>










<div class="properties">


The size of the height of the polygon.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js#L93">
    polygon.js:93
  </a>

</div>



<div class="tags">


::: tip nota-bene
This property is tied to [Two.Polygon.radius](/docs/shapes/polygon/#radius). When you set `radius`, it affects the `height`. Likewise, if you set `height` it will change the `radius`.
:::


</div>


</div>



<div class="instance member ">

## sides

<h2 class="longname" aria-hidden="true"><a href="#sides"><span class="prefix">Two.Polygon.</span><span class="shortname">sides</span></a></h2>










<div class="properties">


The amount of sides the polyogn has.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js#L99">
    polygon.js:99
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Polygon.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  polygon  | The reference [Two.Polygon](/docs/shapes/polygon/) |
</div>




<div class="description">

Copy the properties of one [Two.Polygon](/docs/shapes/polygon/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js#L141">
    polygon.js:141
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Polygon.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Polygon



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.Polygon](/docs/shapes/polygon/) with the same properties of the current path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js#L217">
    polygon.js:217
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Polygon.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/polygon.js#L251">
    polygon.js:251
  </a>

</div>




</div>


