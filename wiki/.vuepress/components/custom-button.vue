<template>
  <a ref="link" class="button" :href="href">
    <span ref="icon" class="icon" :class="type">
    </span>
    <span ref="label" class="label"> {{ text }}
    </span>
    <span ref="size" class="size"> {{ size }}
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
  };
</script>

<style lang="stylus" scoped>
  .button {
    display: inline-block
    background: $greenbg;
    color: $green;
    border: 2px solid $green;
    border-radius: 9999px;
    padding: .5rem 1rem .5rem 2.75rem;
    margin: 0 1rem .5rem 0;
    position: relative;
    
    &:hover {
      background: $orangebg;
      color: $orange;
      border-color: $orange;

      .icon {
        background-color: $orange;  
      }
    }
    
    .icon {
      width: 1.5em;
      height: 1.5em;
      background-color: $green;
      background-position: center;
      background-size: 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: .475rem;
      left: .8rem;

      &.download {
        mask-image: url(/images/download.svg);
        -webkit-mask-image: url(/images/download.svg);
      }
      &.sponsor {
        mask-image: url(/images/sponsor.svg);
        -webkit-mask-image: url(/images/sponsor.svg);
      }
      &.github {
        mask-image: url(/images/github.svg);
        -webkit-mask-image: url(/images/github.svg);
      }
    }

    .label {
      font-weight: 600;
    }
  }

</style>
