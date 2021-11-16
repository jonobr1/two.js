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
      <SearchBox v-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
    </div>

    <div
      class="links"
      ref="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <NavLinks />
    </div>
  </header>
</template>

<script>
import SearchBox from '../../plugins/search/SearchBox.vue'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'
export default {
  name: 'Navbar',
  components: {
    SidebarButton,
    NavLinks,
    SearchBox
  },
  data () {
    return {
      mobileDesktopBreakpoint: 719,
      linksWrapMaxWidth: null
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
      if (!this.$refs.search && !this.$refs.navLogo && !this.refs.links) {
        return;
      }
      if(document.documentElement.clientWidth > this.mobileDesktopBreakpoint) {
        var buffer = 50;
        var offset = 148;
        var content = document.getElementsByClassName("theme-default-content")[0];
        if (content) //align with content
            offset = content.offsetLeft + parseFloat(window.getComputedStyle(content, null).getPropertyValue('padding-left').replace("px",""));
        if (offset + this.$refs.search.offsetWidth > this.$refs.links.offsetLeft + buffer
          || offset < this.$refs.navLogo.offsetLeft + this.$refs.navLogo.offsetWidth + buffer)
          offset = 148; //align with logo

        this.$refs.search.style.left = offset.toString() + "px";

      } else {
        this.$refs.search.style.left = "0px";
      }
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

      if (document.body.clientWidth < (959 + this.$refs.links.clientWidth)) {
        //question: how to access $MQNarrow
        //todo: recalculate and override the width and left of the search
      }
    }
    handleLinksWrapWidth();
    window.addEventListener('resize', handleLinksWrapWidth, false);
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
$navbar-vertical-padding = 0rem
$navbar-horizontal-padding = 1.5rem
.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  .repo-link
    display none
  a, span, img
    display inline-block
  .home-link 
    padding: .7rem 0;
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
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color transparent
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    height 100%
    display flex
    .external span
      display none
  .nav-links 
    .nav-item 
      height 100%
      line-height 3.5rem
      a 
        font-size 1rem
        color $textColor
        height 100%
        line-height 3.5rem
        border-top 2px solid $white
        transition color .2s, border-color .2s
        &:hover 
          border-bottom none
          border-top-color $orange
          color $orange
        &.router-link-active 
          border-bottom none
          border-top-color $orange
          color $orange
          &:hover 
            border-bottom none
            border-top-color $red
            color $red
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
  .has-sidebar
    .navbar
      padding-left 4rem
    .home-link
      display none
    .sidebar-button
      display block
</style>
