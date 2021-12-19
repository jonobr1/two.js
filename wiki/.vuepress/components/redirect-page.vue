<template>
  <div></div>
</template>

<script>
  module.exports = {
    name: 'redirect-page',
    props: {
      src: String
    },
    mounted: function() {
      if (/^https:\/\//i.test(this._props.src)) {
        window.location.href = this._props.src;
      } else {
        this.$router.replace(this._props.src).catch(() => {});
      }
    }
  };
</script>
