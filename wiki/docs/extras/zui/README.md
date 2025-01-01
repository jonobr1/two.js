---
title: Two.ZUI
pageClass: docs
lang: en-US
---

# Two.ZUI



[Two.ZUI](/docs/two/#zui) is an extra class to turn your Two.js scene into a Google Maps or Adobe Illustrator style interface. See [https://codepen.io/jonobr1/pen/PobMKwb](https://codepen.io/jonobr1/pen/PobMKwb) for example usage.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  group  | The scene or group to |
|  domElement  | The HTML Element to attach event listeners to. |



<div class="instance function ">

## addLimits

<h2 class="longname" aria-hidden="true"><a href="#addLimits"><span class="prefix">Two.ZUI.</span><span class="shortname">addLimits</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  min  | The minimum scale the ZUI can zoom out to. |
|  max  | The maximum scale the ZUI can zoom in to. |
</div>








<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js#L101">
    zui.js:101
  </a>

</div>




</div>



<div class="instance function overloaded">

## clientToSurface

<h2 class="longname" aria-hidden="true"><a href="#clientToSurface"><span class="prefix">Two.ZUI.</span><span class="shortname">clientToSurface</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__: Object


- An object with x, y, and z components


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  a  |  |
</div>




<div class="description">

Convert an x, y coordinate in the user’s space to the object's projected space. Optionally pass a z property on the object to apply depth.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js#L129">
    zui.js:129
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance member overloaded">

## clientToSurface

<h2 class="longname" aria-hidden="true"><a href="#clientToSurface"><span class="prefix">Two.ZUI.</span><span class="shortname">clientToSurface</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__: Object


- An object with x, y, and z components


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  a  | The x component of position to be transformed. |
|  b  | The y component of position to be transformed. |
|  c  | The optional z component of position to be transformed. |
</div>




<div class="description">

Convert an x, y coordinate in the user’s space to the object's projected space. Optionally pass a z property on the object to apply depth.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js#L138">
    zui.js:138
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance function overloaded">

## surfaceToClient

<h2 class="longname" aria-hidden="true"><a href="#surfaceToClient"><span class="prefix">Two.ZUI.</span><span class="shortname">surfaceToClient</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__: Object


- An object with x, y, and z components


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  a  |  |
</div>




<div class="description">

Convert an x, y coordinate in projected space to the user’s space. Optionally pass a z property on the object to apply depth.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js#L166">
    zui.js:166
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance member overloaded">

## surfaceToClient

<h2 class="longname" aria-hidden="true"><a href="#surfaceToClient"><span class="prefix">Two.ZUI.</span><span class="shortname">surfaceToClient</span></a></h2>


<div class="overloaded-label">

_Overloaded_

</div>



<div class="returns">

__Returns__: Object


- An object with x, y, and z components


</div>









<div class="params">

| Argument | Description |
| ---- | ----------- |
|  a  | The x component of position to be transformed. |
|  b  | The y component of position to be transformed. |
|  c  | The optional z component of position to be transformed. |
</div>




<div class="description">

Convert an x, y coordinate in projected space to the user’s space. Optionally pass a z property on the object to apply depth.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js#L175">
    zui.js:175
  </a>

</div>



<div class="tags">



</div>


</div>



<div class="instance function ">

## zoomBy

<h2 class="longname" aria-hidden="true"><a href="#zoomBy"><span class="prefix">Two.ZUI.</span><span class="shortname">zoomBy</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  byF  | The factor to scale by. |
|  clientX  | The x position of the user's input. |
|  clientY  | The y position of the user's input. |
</div>




<div class="description">

A function to zoom by an incremental amount and a position. Typically used for pinch-and-zoom or mousewheel effects.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js#L203">
    zui.js:203
  </a>

</div>




</div>



<div class="instance function ">

## zoomSet

<h2 class="longname" aria-hidden="true"><a href="#zoomSet"><span class="prefix">Two.ZUI.</span><span class="shortname">zoomSet</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  zoom  | The level of the zoom. |
|  clientX  | The x position of the user's input. |
|  clientY  | The y position of the user's input. |
</div>




<div class="description">

A function to set the zoom amount and the origin position. This is used internally by {@Two.ZUI#zoomBy}.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js#L217">
    zui.js:217
  </a>

</div>




</div>



<div class="instance function ">

## translateSurface

<h2 class="longname" aria-hidden="true"><a href="#translateSurface"><span class="prefix">Two.ZUI.</span><span class="shortname">translateSurface</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  x  | The x amount to pan. |
|  y  | The y amount to pan. |
</div>




<div class="description">

Set the position of the ZUI by an incremental translation amount.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js#L247">
    zui.js:247
  </a>

</div>




</div>



<div class="instance function ">

## reset

<h2 class="longname" aria-hidden="true"><a href="#reset"><span class="prefix">Two.ZUI.</span><span class="shortname">reset</span></a></h2>















<div class="description">

Reset the zoom and scale factors to their original instantiated state.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/extras/jsm/zui.js#L282">
    zui.js:282
  </a>

</div>




</div>


