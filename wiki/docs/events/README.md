---
title: Two.Events
pageClass: docs
lang: en-US
---

# Two.Events



Object inherited by many Two.js objects in order to facilitate custom events.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/events.js" />
</div>


<carbon-ads />






<div class="static member ">

## Types

<h2 class="longname" aria-hidden="true"><a href="#Types"><span class="prefix">Two.Events.</span><span class="shortname">Types</span></a></h2>










<div class="properties">


Object of different types of Two.js specific events.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/events.js#L167">
    events.js:167
  </a>

</div>




</div>



<div class="instance function ">

## addEventListener

<h2 class="longname" aria-hidden="true"><a href="#addEventListener"><span class="prefix">Two.Events.</span><span class="shortname">addEventListener</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  name  | The name of the event to bind a function to. |
|  handler  | The function to be invoked when the event is dispatched. |
</div>




<div class="description">

Call to add a listener to a specific event name.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/events.js#L13">
    events.js:13
  </a>

</div>




</div>



<div class="instance function ">

## on

<h2 class="longname" aria-hidden="true"><a href="#on"><span class="prefix">Two.Events.</span><span class="shortname">on</span></a></h2>















<div class="description">

Alias for [Two.Events.addEventListener](/docs/events/#addeventlistener).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/events.js#L30">
    events.js:30
  </a>

</div>




</div>



<div class="instance function ">

## bind

<h2 class="longname" aria-hidden="true"><a href="#bind"><span class="prefix">Two.Events.</span><span class="shortname">bind</span></a></h2>















<div class="description">

Alias for [Two.Events.addEventListener](/docs/events/#addeventlistener).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/events.js#L38">
    events.js:38
  </a>

</div>




</div>



<div class="instance function ">

## removeEventListener

<h2 class="longname" aria-hidden="true"><a href="#removeEventListener"><span class="prefix">Two.Events.</span><span class="shortname">removeEventListener</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  name  | The name of the event intended to be removed. |
|  handler  | The handler intended to be reomved. |
</div>




<div class="description">

Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/events.js#L47">
    events.js:47
  </a>

</div>




</div>



<div class="instance function ">

## off

<h2 class="longname" aria-hidden="true"><a href="#off"><span class="prefix">Two.Events.</span><span class="shortname">off</span></a></h2>















<div class="description">

Alias for [Two.Events.removeEventListener](/docs/events/#removeeventlistener).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/events.js#L90">
    events.js:90
  </a>

</div>




</div>



<div class="instance function ">

## unbind

<h2 class="longname" aria-hidden="true"><a href="#unbind"><span class="prefix">Two.Events.</span><span class="shortname">unbind</span></a></h2>















<div class="description">

Alias for [Two.Events.removeEventListener](/docs/events/#removeeventlistener).

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/events.js#L98">
    events.js:98
  </a>

</div>




</div>



<div class="instance function ">

## dispatchEvent

<h2 class="longname" aria-hidden="true"><a href="#dispatchEvent"><span class="prefix">Two.Events.</span><span class="shortname">dispatchEvent</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  name  | The name of the event to dispatch. |
|  args  | Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed. |
</div>




<div class="description">

Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/events.js#L107">
    events.js:107
  </a>

</div>




</div>


