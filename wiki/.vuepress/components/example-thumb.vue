<template>
<a class="cover" :href="link" target="_blank" rel="noopener noreferrer">
  <span class="thumb" role="img" :aria-label="alt" :style="{ backgroundImage: 'url(' + quotedImagePath + ')' }"></span>
  <div class="title"><span class="type" :class="host"></span>{{ name }}</div>
</a>
</template>

<script>
  module.exports = {
    name: 'example-thumb',
    data() {
      return {
        hostOptions: ["codepen","codesandbox","glitch","jsfiddle","observable"]
      }
    },
    props: {
      link: String,
      alt: String,
      image: String,
      name: String
    },
    computed: {
      quotedImagePath() {
        return "'" + this._props.image + "'"
      },
      host() {
        for (var i = 0; i < this.hostOptions.length; i++) {
          if (this._props.link.includes(this.hostOptions[i]))
            return this.hostOptions[i]
        }
        return this.hostOptions[0] //default
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .thumb
    display block
    width 100%
    height 15vh
    min-height 120px
    background-size cover
    background-position center
  .title
    font-size 1rem
    font-weight 600
    padding .5rem .7rem .5rem 2.7rem
    border 1px solid #ccc
    border-bottom 0
    color $textColor
    position relative
    &:hover
      color $textColor
  .type
    background-repeat no-repeat
    background-position center
    height 1rem
    display inline-block
    position absolute
    width 2rem
    left .5rem
    top .7rem
    &.codepen
      background-image url(/images/codepen.svg)
    &.codesandbox
      background-image url(/images/codesandbox.svg)
    &.glitch
      background-image url(/images/glitch.svg)
    &.jsfiddle
      background-image url(/images/jsfiddle.svg)
    &.observable
      background-image url(/images/observable.svg)
@media (max-width: $MQMobile)
  .thumb
    height 240px
</style>
