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
      this.$router.replace(this._props.src).catch(() => {});
    }
  };
</script>
