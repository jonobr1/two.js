<template>
  <div class="search-box">
    <input
      ref="input"
      aria-label="Search"
      :value="query"
      :class="{ 'focused': focused }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @input="query = $event.target.value"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
    >
    <ul
      v-if="showSuggestions"
      class="suggestions"
      :class="{ 'align-right': alignRight }"
      @mouseleave="unfocus"
    >
      <li
        v-for="(s, i) in suggestions"
        :key="i"
        class="suggestion"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a
          :href="s.path"
          @click.prevent
        >
          <span class="page-title">{{ s.title || s.path }}</span>
          <span
            v-if="s.header"
            class="header"
            :class="{ 'is-tag' : s.isTag }"
          ><span class="chevron">&gt;</span> {{ s.header.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import matchQuery from './match-query'

export default {
  name: 'SearchBox',

  data () {
    return {
      query: '',
      focused: false,
      focusIndex: 0,
      placeholder: undefined,
      searchOpenClass: 'search-open'
    }
  },

  computed: {
    showSuggestions () {
      return (
        this.focused
        && this.suggestions
        && this.suggestions.length
      )
    },

    suggestions () {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }

      const { pages } = this.$site
      const max = this.$site.themeConfig.searchMaxSuggestions || 10
      const localePath = this.$localePath
      const res = []
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break
        const p = pages[i]
        // filter out results that do not match current locale
        if (this.getPageLocalePath(p) !== localePath) {
          continue
        }

        // filter out results that do not match searchable paths
        if (!this.isSearchable(p)) {
          continue
        }

        if (matchQuery(query, p)) {
          res.push(p)
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break
            const h = p.headers[j]
            if (h.title && matchQuery(query, p, h.title)) {
              var obj = Object.assign({}, p, {
                path: p.path + '#' + h.slug,
                header: h
              });

              if (h.title.startsWith("#")) {
                obj = this.formatTagSuggestion(obj);
              }

              res.push(obj);
            }
          }
        }
      }
      return res
    },
    // make suggestions align right when there are not enough items
    alignRight () {
      const navCount = (this.$site.themeConfig.nav || []).length
      const repo = this.$site.repo ? 1 : 0
      return navCount + repo <= 2
    }
  },

  mounted () {
    this.placeholder = this.$site.themeConfig.searchPlaceholder || ''
    document.addEventListener('keydown', this.onHotkey)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.onHotkey)
  },

  methods: {
    getPageLocalePath (page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },

    isSearchable (page) {
      let searchPaths = null

      // all paths searchables
      if (searchPaths === null) { return true }

      searchPaths = Array.isArray(searchPaths) ? searchPaths : new Array(searchPaths)

      return searchPaths.filter(path => {
        return page.path.match(path)
      }).length > 0
    },

    formatTagSuggestion(s) {
      var lastParent = null;
      for (var i = 0; i < s.headers.length; i++) {
        var header = s.headers[i];
        if (header.level == s.header.level - 1) {
          //set last eligible parent heading
          lastParent = header
        } else if (header.level == s.header.level && header.slug == s.header.slug) {
          //stop here
          break;
        }
      }

      if (lastParent) {
        s.path = s.regularPath + "#" + lastParent.slug;
        s.title = lastParent.title;
        s.isTag = true;
      }

      return s;
    },

    onHotkey (event) {
      if (event.srcElement === document.body && [].includes(event.key)) {
        this.$refs.input.focus()
        event.preventDefault()
      }
    },

    onFocus () {
      this.focused = true
      document.getElementById("app").classList.add(this.searchOpenClass)

    },

    onBlur () {
      this.focused = false
      document.getElementById("app").classList.remove(this.searchOpenClass);
    },

    onUp () {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },

    onDown () {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },

    go (i) {
      if (!this.showSuggestions) {
        return
      }
      this.$router.push(this.suggestions[i].path).catch(() => {});
      this.query = ''
      this.focusIndex = 0
      this.$refs.input.blur()
    },

    focus (i) {
      this.focusIndex = i
    },

    unfocus () {
      this.focusIndex = -1
    }
  }
}
</script>

<style lang="stylus">
.search-box
  display inline-block
  position relative
  margin-right 1rem
  input
    cursor text
    max-width 22.5rem
    width 33.3vw
    height 2rem
    color lighten($textColor, 25%)
    display inline-block
    border 1px solid darken($borderColor, 10%)
    border-radius 2rem
    font-family $fontFamily
    font-size 1rem
    font-weight 600
    line-height 2rem
    padding 0 0.5rem 0 2rem
    outline none
    transition all .2s ease
    background-size 1rem
    background #fff url(/images/search.svg) 0.55rem 0.25rem no-repeat
    padding-left 2.5rem
    &:focus
      cursor auto
      border-color tint($accentColor, 50)
      color $textColor
    &::placeholder
      color #999
  .suggestions
    background #fff
    width 100%
    position absolute
    top 1.85rem
    border 1px solid tint($accentColor, 50)
    border-radius 6px
    padding 0rem
    list-style-type none
    &.align-right
      right 0
  .suggestion
    padding .75rem 1.25rem
    border-radius 4px
    cursor pointer
    font-size 1rem
    line-height auto
    font-weight normal
    a
      white-space normal
      color $sidebarText
      .page-title
        font-weight 600
      .header
        font-size 0.9em
        margin-left 0.25em
      .is-tag
        .chevron
          display none
    &.focused
      background-color tint($orange, 92)
      a
        color $accentColor

// Match IE11
@media all and (-ms-high-contrast: none)
  .search-box input
    height 2rem

@media (max-width: $MQMobile)
  .search-box
    margin-right 0
    width 100%
    input
      height 3rem
      width 100vw
      max-width 100vw
      background-position 0.5rem 0.75rem
      left 0
      border-radius 0
      border 1px solid #e6e6e6
      border-left none
      border-right none
    ul.suggestions
      left 0
      right 0
      border-radius 0
      border-right 0
      border-left 0
</style>
