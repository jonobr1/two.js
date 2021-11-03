---
pageClass: documentation-class
---

# Two.Events



Object inherited by many Two.js objects in order to facilitate custom events.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/events.js#L1)

</div>







---

<div class="static member ">

### Two.Events.Types








<div class="properties">

Object of different types of Two.js specific events.

</div>








<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/events.js#L73)

</div>






</div>



---

<div class="static function ">

### Two.Events.bind













<div class="description">

Alias for [Two.Events.on](/documentation/events/#two-events-on).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/events.js#L93)

</div>






</div>



---

<div class="static function ">

### Two.Events.unbind













<div class="description">

Alias for [Two.Events.off](/documentation/events/#two-events-off).

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/events.js#L100)

</div>






</div>



---

<div class="instance function ">

### Two.Events.on










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `name`  | The name of the event to bind a function to. |
|  `handler`  | The function to be invoked when the event is dispatched. |
</div>




<div class="description">

Call to add a listener to a specific event name.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/events.js#L8)

</div>






</div>



---

<div class="instance function ">

### Two.Events.off










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `name`  | The name of the event intended to be removed. |
|  `handler`  | The handler intended to be reomved. |
</div>




<div class="description">

Call to remove listeners from a specific event. If only `name` is passed then all the handlers attached to that `name` will be removed. If no arguments are passed then all handlers for every event on the obejct are removed.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/events.js#L17)

</div>






</div>



---

<div class="instance function ">

### Two.Events.trigger










<div class="params">

| Argument | Description |
| ---- | ----------- |
|  `name`  | The name of the event to dispatch. |
|  `arguments`  | Anything can be passed after the name and those will be passed on to handlers attached to the event in the order they are passed. |
</div>




<div class="description">

Call to trigger a custom event. Any additional arguments passed after the name will be passed along to the attached handlers.

</div>



<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/events.js#L26)

</div>






</div>


