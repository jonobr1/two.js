---
title: Two.Anchor
pageClass: docs
lang: en-US
---

# Two.Anchor


<div class="extends">

Extends: [Two.Vector](/docs/vector/)

</div>


An object that holds 3 [Two.Vector](/docs/vector/)s, the anchor point and its corresponding handles: `left` and `right`. In order to properly describe the bezier curve about the point there is also a command property to describe what type of drawing should occur when Two.js renders the anchors.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/anchor.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  x  | The x position of the root anchor point. |
|  y  | The y position of the root anchor point. |
|  ax  | The x position of the left handle point. |
|  ay  | The y position of the left handle point. |
|  bx  | The x position of the right handle point. |
|  by  | The y position of the right handle point. |
|  command  | The command to describe how to render. Applicable commands are [Two.Commands](/docs/two/#commands) |



<div class="static function ">

## fromObject

<h2 class="longname" aria-hidden="true"><a href="#fromObject"><span class="prefix">Two.Anchor.</span><span class="shortname">fromObject</span></a></h2>




<div class="returns">

__Returns__: Two.Anchor



</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  obj  | Object notation of a [Two.Anchor](/docs/anchor/) to create a new instance |
</div>




<div class="description">

Create a new [Two.Anchor](/docs/anchor/) from an object notation of a [Two.Anchor](/docs/anchor/).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/anchor.js#L70">
    anchor.js:70
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.Anchor.toObject](/docs/anchor/#toobject)
:::


</div>


</div>



<div class="instance function ">

## copy

<h2 class="longname" aria-hidden="true"><a href="#copy"><span class="prefix">Two.Anchor.</span><span class="shortname">copy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  v  | The anchor to apply values to. |
</div>




<div class="description">

Copy the properties of one [Two.Anchor](/docs/anchor/) onto another.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/anchor.js#L82">
    anchor.js:82
  </a>

</div>




</div>



<div class="instance function ">

## clone

<h2 class="longname" aria-hidden="true"><a href="#clone"><span class="prefix">Two.Anchor.</span><span class="shortname">clone</span></a></h2>




<div class="returns">

__Returns__: Two.Anchor



</div>












<div class="description">

Create a new [Two.Anchor](/docs/anchor/), set all its values to the current instance and return it for use.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/anchor.js#L128">
    anchor.js:128
  </a>

</div>




</div>



<div class="instance function ">

## toObject

<h2 class="longname" aria-hidden="true"><a href="#toObject"><span class="prefix">Two.Anchor.</span><span class="shortname">toObject</span></a></h2>




<div class="returns">

__Returns__: Object


- An object with properties filled out to mirror [Two.Anchor](/docs/anchor/).


</div>












<div class="description">

Create a JSON compatible plain object of the current instance. Intended for use with storing values in a database.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/anchor.js#L138">
    anchor.js:138
  </a>

</div>



<div class="tags">


::: tip nota-bene
Works in conjunction with [Two.Anchor.fromObject](/docs/anchor/#fromobject)
:::


</div>


</div>



<div class="instance function ">

## toString

<h2 class="longname" aria-hidden="true"><a href="#toString"><span class="prefix">Two.Anchor.</span><span class="shortname">toString</span></a></h2>




<div class="returns">

__Returns__: String


- A String with comma-separated values reflecting the various values on the current instance.


</div>












<div class="description">

Create a string form of the current instance. Intended for use with storing values in a database. This is lighter to store than the JSON compatible [Two.Anchor.toObject](/docs/anchor/#toobject).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/anchor.js#L163">
    anchor.js:163
  </a>

</div>




</div>


