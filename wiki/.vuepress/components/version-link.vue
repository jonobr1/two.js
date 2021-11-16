<template>
  <a class="version" target="_blank" rel="noopener noreferrer" :href="'https://github.com/jonobr1/two.js/releases/tag/' + v ">{{ v }}<OutboundLink /></a>
</template>

<script>
  module.exports = {
    name: 'version-link',
    props: {
      v: String
    },
  };
</script>

<style lang="stylus" scoped>
    .version {
        font-size: 1.25rem;
    }
</style>
