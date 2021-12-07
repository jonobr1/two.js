<template>
  <a ref="link" class="button" :class="type" :href="href">
    <span ref="icon" class="icon" :class="type"></span>
    <span ref="label" class="label">
      {{ text }}
    </span>
    <span ref="size" class="size">
      {{ size }}
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
  a.button {
    display: inline-block
    background: tint($green, 95);
    color: $green;
    border: 2px solid $green;
    border-radius: 9999px;
    padding: .5rem 1rem .5rem 2.75rem;
    margin: 0 1rem .5rem 0;
    position: relative;

    span {
      display: inline-block;
    }

    &.source {
      position: fixed;
      top: 6rem;
      right: 1rem;
      left: auto;
      bottom: auto;
      z-index: 10;
    }

    &:hover {
      background: tint($orange, 92);
      color: $orange;
      border: 2px solid $orange;
      text-decoration: none;

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
      &.source {
        mask-image: url(/images/source.svg);
        -webkit-mask-image: url(/images/source.svg);
      }
    }

    .label {
      font-weight: 600;
    }

    .size {
      font-weight: 200;
    }
  }

  @media (max-width: $MQMobile) {

    a.button.source {
      bottom: 1rem;
      right: 0.5rem;
      top: auto;
      left: auto;
      width: 0;
      padding: 0.5rem 1.25rem;
      span.icon.source {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      span.label {
        display: none;
      }
    }

  }

</style>
