<template>
  <div></div>
</template>

<script>
export default {
  name: 'RedirectPage',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  mounted() {
    if (/^https?:\/\//i.test(this.src)) {
      window.location.replace(this.src);
    } else if (this.src) {
      this.$router.replace(this.src);
    }
  },
};
</script>
