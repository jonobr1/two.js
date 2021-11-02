---
pageClass: documentation-class
---

# Two.Collection


<div class="extends">

__Extends__: `Two.Events`

</div>


An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.


<div class="meta">

  [Source Code](https://github.com/jonobr1/two.js/blob/dev/src/collection.js#L4)

</div>






