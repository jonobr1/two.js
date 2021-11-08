<template>
  <header class="navbar" ref="header" :class="{ 'has-sidebar': hasSidebar }">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <RouterLink
      :to="$localePath"
      class="home-link"
    >
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        ref="navLogo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <span
        v-if="$siteTitle"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </RouterLink>

    <div class="search" ref="search">
    <AlgoliaSearchBox
    v-if="isAlgoliaSearch"
    :options="algolia"
    />
    <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
    </div>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <NavLinks />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'
export default {
  name: 'Navbar',
  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox
  },
  data () {
    return {
      mobileDesktopBreakpoint: 719,
      linksWrapMaxWidth: null,
      searchOpenClass: 'search-open'
    }
  },
  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },
    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },
    hasSidebar () {
      var pathStart = this.$page.path.match(/\/.+?\//);
      pathStart = (pathStart && pathStart.length) ? pathStart[0] : pathStart;
      return (pathStart in this.$site.themeConfig.sidebar && this.$site.themeConfig.sidebar[pathStart].length > 0);
    },
  },
  watch:{
    $route: function(to, from){
      setTimeout(this.handleSearchPosition, 10);
    }
  }, 
  methods: {
    handleSearchPosition() {
      if(document.documentElement.clientWidth > this.mobileDesktopBreakpoint) {
        var content = document.getElementsByClassName("theme-default-content")[0];
        if (content) {
            var searchLeft = content.offsetLeft + parseFloat(window.getComputedStyle(content, null).getPropertyValue('padding-left').replace("px",""));
            this.$refs.search.style.left = searchLeft.toString() + "px";
        }
      } else {
        this.$refs.search.style.left = "0px";
      }
    },
    handleSearchBlur() {
      document.getElementById("app").classList.remove(this.searchOpenClass);
    },
    handleSearchChange(e) {
      console.log(e);
      window.setTimeout(() => {
        //option 1: if input is in focus
        var hasContent = true;
        //option 2: if suggestions has length
        //var hasContent = e.target.nextElementSibling && e.target.nextElementSibling.classList.contains("suggestions");
        //option 2: if input has value
        //var hasContent = e.target.value.length > 0;
        if (hasContent) {
          if (!document.getElementById("app").classList.contains("search-open"))
            document.getElementById("app").classList.add(this.searchOpenClass);
        } else {
          if (document.getElementById("app").classList.contains("search-open"))
            document.getElementById("app").classList.remove("search-open")
        }
      }, 10);
    },
  },
  mounted () {
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < this.mobileDesktopBreakpoint) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0);
      }
      this.handleSearchPosition();
    }
    handleLinksWrapWidth();
    window.addEventListener('resize', handleLinksWrapWidth, false);

    var searchInput = this.$refs.search.getElementsByTagName("input");
    if (searchInput.length) {
      searchInput = searchInput[0];
      searchInput.addEventListener("focus", this.handleSearchChange);
      searchInput.addEventListener("blur", this.handleSearchBlur);
      searchInput.addEventListener("keyup", this.handleSearchChange);
    }

  }
}
function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem
.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
    width 5.343rem
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .search
    position: absolute
    left: 19rem
    top: 0.7rem
    .search-box
      flex 0 0 auto
      vertical-align top
      input
        font-family $fontFamily
        width 22.5rem
        font-size 1rem
        font-weight 600
        background #fff url(/images/search.svg) 0.55rem 0.25rem no-repeat
        padding-left 2.5rem
        &::placeholder
          color #999
        &:focus 
          border-color $orangeBorder
          color $textColor
      ul.suggestions 
        padding 0rem
        top 1.85rem
        width 25rem
        border-color $orangeBorder
        .suggestion
          font-size 1rem
          line-height auto
          font-weight normal
          padding .75rem 1.25rem
          a 
            color $sidebarText
          &.focused 
            background-color $orangebg
            a 
              color $orange
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color transparent
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .external span
      display none
@media (max-width: $MQMobile)
  .sidebar-button
    display: none;
  .navbar
    width 100%
    padding 0
    border-bottom none
    .can-hide
      display none
    .logo
      width 4rem
      margin-left 1rem
    .links
      padding-left 1.5rem
      .nav-link
        padding 0 0.5rem
        font-weight 600
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .search 
      top 3.5rem
      left 0
      background-color #fff
      width 100%
      .search-box
        width 100%
        input 
          height 3rem
          width calc(100% - 3rem)
          background-position 0.5rem 0.75rem
          left 0
          border-radius 0
          border 1px solid #e6e6e6
          border-left none
          border-right none
        ul.suggestions
          width calc(100%-3rem)
          left 0
          border-radius 0
          border-right 0
          border-left 0
  .has-sidebar
    .navbar
      padding-left 4rem
    .home-link
      display none
    .sidebar-button
      display block  
</style>
