<template>

<span class="tag" :class="colorClass"> {{ tag }} </span>

</template>

<script>
  module.exports = {
    name: 'example-tag',
    props: {
      tag: String
    },
    data() {
      return {
        colorOptions: ["grey", "red","orange","yellow","green","blue","purple"]
      }
    },
    computed: {
      colorClass() {
        //compute tag color
        var num = this.colorOptions.length;

        for (var i = 0; i < this._props.tag.length; i++) {
          num += this._props.tag.charCodeAt(i) * (i+1);
          num += i;
        }

        var index = num % this.colorOptions.length;
        return this.colorOptions[index]
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


