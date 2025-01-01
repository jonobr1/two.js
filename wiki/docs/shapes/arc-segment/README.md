---
title: Two.ArcSegment
pageClass: docs
lang: en-US
---

# Two.ArcSegment


<div class="extends">

Extends: [Two.Path](/docs/path/)

</div>





<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  x  | The x position of the arc segment. |
|  y  | The y position of the arc segment. |
|  innerRadius  | The inner radius value of the arc segment. |
|  outerRadius  | The outer radius value of the arc segment. |
|  startAngle  | The start angle of the arc segment in Number. |
|  endAngle  | The end angle of the arc segment in Number. |
|  resolution  | The number of vertices used to construct the arc segment. |



<div class="static member ">

## Properties

<h2 class="longname" aria-hidden="true"><a href="#Properties"><span class="prefix">Two.ArcSegment.</span><span class="shortname">Properties</span></a></h2>










<div class="properties">


A list of properties that are on every [Two.ArcSegment](/docs/shapes/arc-segment/).


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js#L128">
    arc-segment.js:128
  </a>

</div>




</div>



<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.ArcSegment.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.ArcSegment



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.ArcSegment](/docs/shapes/arc-segment/) to create a new instance |
</div>




<div class="description">

Create a new [Two.ArcSegment](/docs/shapes/arc-segment/) from an object notation of a [Two.ArcSegment](/docs/shapes/arc-segment/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js#L134">
    arc-segment.js:134
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.ArcSegment.toObject](/docs/shapes/arc-segment/#toobject)
:::


</div>


</div>



<div class="instance member ">

## innerRadius

<h2 class="longname" aria-hidden="true"><a href="#innerRadius"><span class="prefix">Two.ArcSegment.</span><span class="shortname">innerRadius</span></a></h2>










<div class="properties">


The size of the inner radius of the arc segment.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js#L86">
    arc-segment.js:86
  </a>

</div>




</div>



<div class="instance member ">

## outerRadius

<h2 class="longname" aria-hidden="true"><a href="#outerRadius"><span class="prefix">Two.ArcSegment.</span><span class="shortname">outerRadius</span></a></h2>










<div class="properties">


The size of the outer radius of the arc segment.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js#L94">
    arc-segment.js:94
  </a>

</div>




</div>



<div class="instance member ">

## startAngle

<h2 class="longname" aria-hidden="true"><a href="#startAngle"><span class="prefix">Two.ArcSegment.</span><span class="shortname">startAngle</span></a></h2>










<div class="properties">


The angle of one side for the arc segment.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js#L102">
    arc-segment.js:102
  </a>

</div>




</div>



<div class="instance member ">

## endAngle

<h2 class="longname" aria-hidden="true"><a href="#endAngle"><span class="prefix">Two.ArcSegment.</span><span class="shortname">endAngle</span></a></h2>










<div class="properties">


The angle of the other side for the arc segment.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js#L110">
    arc-segment.js:110
  </a>

</div>




</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.ArcSegment.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  arcSegment  | The reference [Two.ArcSegment](/docs/shapes/arc-segment/) |
</div>




<div class="description">

Copy the properties of one [Two.ArcSegment](/docs/shapes/arc-segment/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js#L152">
    arc-segment.js:152
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.ArcSegment.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.ArcSegment



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  parent  | The parent group or scene to add the clone to. |
</div>




<div class="description">

Create a new instance of [Two.ArcSegment](/docs/shapes/arc-segment/) with the same properties of the current path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js#L337">
    arc-segment.js:337
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.ArcSegment.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object



</div>












<div class="description">

Return a JSON compatible plain object that represents the path.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/shapes/arc-segment.js#L375">
    arc-segment.js:375
  </a>

</div>




</div>


