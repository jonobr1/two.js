<template>
  <aside class="sidebar">

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

    <slot name="top" />

    <SidebarLinks
      :depth="0"
      :items="items"
    />
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'
export default {
  name: 'Sidebar',
  components: { SidebarLinks, NavLinks },
  props: ['items']
}
</script>

<style lang="stylus">
.sidebar
  transition transform 0.35s ease-in-out
  .arrow
    display: none;
  .home-link
    display none
  ul
    padding 0
    margin 0
    list-style-type none
  .sidebar-heading
    color $sidebarText
    font-size 1rem
    transition color .2s
    &:hover
      color $orange
    &.open
      color $orange
      &:hover
        color $red
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
      transition color .2s
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight 600
      transition color .2s
    & > li:not(:first-child)
      margin-top 0rem
  a.sidebar-link
    font-size 1em
    line-height 1.7
    font-weight 600
    color $sidebarText
    transition color .2s
    &:hover
      color $orange
      border-bottom none
    &.active
      color $orange
      border-left-color transparent
      border-bottom none
      font-weight 600
      &:hover
        color: $red
.sidebar-mask
  transition opacity 0.35s ease-in-out
  background-color rgba(0,0,0,.5)
  z-index -1
  opacity 0

@media (max-width: $MQMobile)
  .sidebar
    padding-top 0
    z-index 30
    .home-link
      display block
      padding 1.1rem 1rem
      border-bottom 1px solid #eee
      line-height 1rem
      .logo
        width 4rem
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
  .sidebar-open .sidebar-mask
    opacity 1
    z-index 25
</style>
