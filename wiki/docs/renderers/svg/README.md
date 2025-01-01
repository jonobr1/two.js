---
title: Two.SVGRenderer
pageClass: docs
lang: en-US
---

# Two.SVGRenderer


<div class="extends">

Extends: [Two.Events](/docs/events/)

</div>


This class is used by [Two]() when constructing with `type` of `Two.Types.svg` (the default type). It takes Two.js' scenegraph and renders it to a `<svg />`.


<div class="meta">
  <custom-button text="Source" type="source" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/svg.js" />
</div>


<carbon-ads />


### Constructor


| Argument | Description |
| ---- | ----------- |
|  parameters  | This object is inherited when constructing a new instance of [Two](). |
|  parameters.domElement  | The `<svg />` to draw to. If none given a new one will be constructed. |



<div class="static member ">

## Utils

<h2 class="longname" aria-hidden="true"><a href="#Utils"><span class="prefix">Two.SVGRenderer.</span><span class="shortname">Utils</span></a></h2>










<div class="properties">


A massive object filled with utility functions and properties to render Two.js objects to a `<svg />`.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/svg.js#L1160">
    svg.js:1160
  </a>

</div>




</div>



<div class="instance member ">

## domElement

<h2 class="longname" aria-hidden="true"><a href="#domElement"><span class="prefix">Two.SVGRenderer.</span><span class="shortname">domElement</span></a></h2>










<div class="properties">


The `<svg />` associated with the Two.js scene.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/svg.js#L1136">
    svg.js:1136
  </a>

</div>




</div>



<div class="instance member ">

## scene

<h2 class="longname" aria-hidden="true"><a href="#scene"><span class="prefix">Two.SVGRenderer.</span><span class="shortname">scene</span></a></h2>










<div class="properties">


The root group of the scenegraph.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/svg.js#L1142">
    svg.js:1142
  </a>

</div>




</div>



<div class="instance member ">

## defs

<h2 class="longname" aria-hidden="true"><a href="#defs"><span class="prefix">Two.SVGRenderer.</span><span class="shortname">defs</span></a></h2>










<div class="properties">


The `<defs />` to apply gradients, patterns, and bitmap imagery.


</div>










<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/svg.js#L1149">
    svg.js:1149
  </a>

</div>




</div>



<div class="instance function ">

## setSize

<h2 class="longname" aria-hidden="true"><a href="#setSize"><span class="prefix">Two.SVGRenderer.</span><span class="shortname">setSize</span></a></h2>












<div class="params">

| Argument | Description |
| ---- | ----------- |
|  width  | The new width of the renderer. |
|  height  | The new height of the renderer. |
</div>




<div class="description">

Change the size of the renderer.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/svg.js#L1166">
    svg.js:1166
  </a>

</div>



<div class="tags">


::: tip nota-bene
Triggers a `Two.Events.resize`.
:::


</div>


</div>



<div class="instance function ">

## render

<h2 class="longname" aria-hidden="true"><a href="#render"><span class="prefix">Two.SVGRenderer.</span><span class="shortname">render</span></a></h2>















<div class="description">

Render the current scene to the `<svg />`.

</div>





<div class="meta">

  <a class="lineno" target="_blank" rel="noopener noreferrer" href="https://github.com/jonobr1/two.js/blob/main/src/renderers/svg.js#L1186">
    svg.js:1186
  </a>

</div>




</div>


