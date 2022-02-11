---
title: Two.Collection
pageClass: docs
lang: en-US
---

# Two.Collection


<div class="extends">

Extends: [Two.Events](/docs/events/)

</div>


An `Array` like object with additional event propagation on actions. `pop`, `shift`, and `splice` trigger `removed` events. `push`, `unshift`, and `splice` with more than 2 arguments trigger 'inserted'. Finally, `sort` and `reverse` trigger `order` events.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/collection.js" />
</div>


<carbon-ads />





