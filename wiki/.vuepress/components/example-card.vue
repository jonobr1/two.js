<template>
  <div class="example">

    <h2 ref="h2">{{ title }}</h2>

    <a class="cover" :href="href" target="_blank" rel="noopener noreferrer">
      <span class="thumb" role="img" :style="{ backgroundImage: `url(${src || '/images/thumbnail.svg'})` }"></span>
      <div class="title">
        <span class="type" :class="platform"></span> {{ title }}
      </div>
    </a>

    <ul class="tags">
      <li v-for="tag in tagList" :key="tag.id" class="tag" :class="tag.color">
        {{ tag.name }}
      </li>
    </ul>

  </div>
</template>

<script>

  var LISTED_TAGS = [];

  module.exports = {
    name: 'example-card',
    data() {
      return {
        platforms: [
          'internet','codepen', 'codesandbox', 'glitch', 'jsfiddle',
          'observable'
        ],
        colors: [
          'red', 'blue', 'yellow', 'green', 'orange', 'purple'
        ]
      }
    },
    props: {
      title: String,
      href: String,
      src: String,
      tags: String
    },
    computed: {
      platform() {

        for (var i = 0; i < this.platforms.length; i++) {

          var platform = this.platforms[i];

          if (this._props.href.includes(platform)) {
            return platform;
          }

        }

        return this.platforms[0];

      },
      tagList() {

        var tags = [];
        var names = this._props.tags.replace(/\s/ig, '').split(',');

        for (var i = 0; i < names.length; i++) {

          var name = names[i];
          var color;
          var tagIndex = LISTED_TAGS.indexOf(name);

          if (tagIndex < 0) {
            tagIndex = LISTED_TAGS.length;
            LISTED_TAGS.push(name);
          }

          color = this.colors[tagIndex % this.colors.length];

          tags.push({
            id: tagIndex,
            name,
            color
          });

        }

        return tags;

      }
    },
    mounted() {

      var { h2 } = this.$refs;

      if (!this.$page.headers) {
        this.$page.headers = [];
      }

      var mainHeader = convertHeader(h2)

      this.$page.headers.push(mainHeader);

      var $tags = this.$el.querySelector('ul.tags');

      for (var i = 0; i < this.tagList.length; i++) {

        var { name } = this.tagList[i];
        var elem = $tags.children[i];
        var header = generateHeaderAtLevel(elem, 3);

        header.title = `${this.title} > ${header.title}`;
        header.slug = `${mainHeader.slug}`;
        elem.id = header.slug;

        this.$page.headers.push(header);

      }

    }
  };

  function convertHeader(elem) {

    var level = parseInt(elem.tagName.replace('h', ''))
    var title = elem.textContent;
    var slug = title.trim().toLowerCase().replace(/\s/gi, '-');

    elem.id = slug;

    return {
      level, title, slug
    };

  }

  function generateHeaderAtLevel(elem, level) {

    var title = elem.textContent.toLowerCase();
    var slug = title.trim().replace(/\s/gi, '-');

    return {
      level, title, slug
    };

  }

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
  &.internet
    background-image: url(/images/internet.svg)
@media (max-width: $MQMobile)
  .thumb
    height 240px

ul.tags
  list-style: none;
  .tag
    border-radius 0.2rem
    padding 0rem 0.75rem
    font-size .625rem
    line-height 1.25rem
    font-weight 400
    color $textColor
    margin 0 .15rem .25rem 0
    display inline-block
    cursor default
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
