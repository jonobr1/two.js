<template>

<span class="tag" :class="colorClass"> {{ tag }} </span>

</template>

<script>

  var tags = [];

  module.exports = {
    name: 'example-tag',
    props: {
      tag: String
    },
    data() {
      return {
        colorOptions: ["red","orange","yellow","green","blue","purple","grey"]
      }
    },
    computed: {
      colorClass() {

        var tag = this._props.tag;
        var index = tags.indexOf(tag);

        if (index < 0) {
          index = tags.length;
          tags.push(tag);
        }

        return this.colorOptions[index % this.colorOptions.length];

      }
    }
  };
</script>

<style lang="stylus" scoped>
.tag
  border-radius 0.25rem
  padding 0.35rem 0.75rem
  font-size .625rem
  line-height 1.25rem
  font-weight 400
  color $textColor
  margin 0 .15rem .35rem 0
  display inline-block
  &.grey
    background tint($grey, 70)
  &.red
    background tint($red, 70)
  &.orange
    background tint($orange, 70)
  &.yellow
    background tint($yellow, 70)
  &.green
    background tint($green, 70)
  &.blue
    background tint($blue, 70)
  &.purple
    background tint($purple, 70)
</style>
