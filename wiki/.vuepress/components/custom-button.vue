<template>
  <a ref="link" class="button">
    <span ref="icon" class="icon">
    </span>
    <span ref="label" class="label"> 
    </span>
    <span ref="size" class="size">
    </span>
  </a>
</template>

<script>
  module.exports = {
    name: 'custom-button',
    props: {
      type: {
        type: String,
        default: 'download'
      },
      text: String,
      size: String,
      href: String
    },
    mounted: function() {
      this.$refs.icon.className += this._props.type;
      this.$refs.label.innerHTML = this._props.text;
      this.$refs.link.href = this._props.href;
      if (this._props.size)
        this.$refs.size.innerHTML = this._props.size;


    },
  };
</script>

<style lang="stylus" scoped>
  .button {
    display: inline-block
    background: $greenbg;
    color: $green;
    border: 2px solid $green;
    border-radius: 9999px;
    padding: .5rem 1rem;
    margin: 0 1rem .5rem 0;

    .label {
      font-weight: 600;
    }
  }
  /*once in button list, can use last child to have smarter styling*/
</style>
