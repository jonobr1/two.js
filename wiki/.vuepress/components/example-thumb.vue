<template>
<a class="cover" :href="link" target="_blank" rel="noopener noreferrer">
  <div class="thumb" :title="alt" :style="{ backgroundImage: 'url(' + quotedImagePath + ')' }"></div>
  <div class="title"><span class="type" :class="host"></span>{{ name }}</div>
</a>
</template>

<script>
  module.exports = {
    name: 'example-thumb',
    data() {
      return {
        hostOptions: ["codepen"]
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
    height 120px
    background-size cover
  .title 
    font-size: 1rem;
    font-weight: 600;
    padding: .5rem .7rem;
    border: 1px solid #ccc;
    border-bottom: 0;
    color: $textColor;
    &:hover 
      color: $textColor;
  .type
    background-repeat no-repeat
    background-position center
    background-size 100%
    display inline-block
    width 1rem
    height 1rem
    margin-right .5rem
    vertical-align middle
    &.codepen 
      background-image url(/images/codepen.svg)

@media (max-width: $MQMobile)
  .thumb
    height 240px
</style>


