<template>
  <a
    class="version"
    target="_blank"
    rel="noopener noreferrer"
    :href="'https://github.com/jonobr1/two.js/releases/tag/' + v"
  >
    {{ v }}
  </a>
</template>

<script>
export default {
  name: 'VersionLink',
  props: {
    v: String,
  },
};
</script>

<style scoped>
.version {
  display: inline-block;
  font-size: 1.25rem;
}

.version::after {
  content: "↗";
  font-size: 0.9rem;
  margin-left: 0.35rem;
}
</style>
