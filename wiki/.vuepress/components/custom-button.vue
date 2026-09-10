<template>
  <a ref="link" class="button" :class="type" :href="href">
    <span ref="icon" class="icon" :class="type"></span>
    <span ref="label" class="label">
      {{ text }}
    </span>
    {{ ' ' }}
    <span ref="size" class="size">
      {{ displaySize }}
    </span>
  </a>
</template>

<script>
import fileSizes from '@two-file-sizes';

export default {
  name: 'CustomButton',
  props: {
    type: {
      type: String,
      default: 'download',
    },
    text: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    sizeKey: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
  },
  computed: {
    displaySize() {
      if (this.size) {
        return this.size;
      }

      if (this.sizeKey && fileSizes[this.sizeKey]) {
        return fileSizes[this.sizeKey];
      }

      return '';
    },
  },
};
</script>

<style scoped>
a.button {
  background: rgb(242 251 250);
  border: 2px solid var(--two-green);
  border-radius: 9999px;
  color: var(--two-green);
  display: inline-block;
  margin: 0 1rem 0.5rem 0;
  padding: 0.5rem 1rem 0.5rem 2.75rem;
  position: relative;
}

a.button:hover {
  background: rgb(255 245 235);
  border-color: var(--two-orange);
  color: var(--two-orange);
  text-decoration: none;
}

a.button:hover .icon {
  background-color: var(--two-orange);
}

a.button.source {
  bottom: auto;
  left: auto;
  position: fixed;
  right: 1rem;
  top: 6rem;
  z-index: 10;
}

a.button span {
  display: inline-block;
}

.icon {
  background-color: var(--two-green);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  height: 1.5em;
  left: 0.8rem;
  position: absolute;
  top: 0.475rem;
  width: 1.5em;
}

.icon.download {
  mask-image: url(/images/download.svg);
  -webkit-mask-image: url(/images/download.svg);
}

.icon.sponsor {
  mask-image: url(/images/sponsor.svg);
  -webkit-mask-image: url(/images/sponsor.svg);
}

.icon.github {
  mask-image: url(/images/github.svg);
  -webkit-mask-image: url(/images/github.svg);
}

.icon.source {
  mask-image: url(/images/source.svg);
  -webkit-mask-image: url(/images/source.svg);
}

.icon.npm {
  mask-image: url(/images/npm.svg);
  -webkit-mask-image: url(/images/npm.svg);
}

.icon.gpt {
  mask-image: url(/images/gpt.svg);
  -webkit-mask-image: url(/images/gpt.svg);
}

.label {
  font-weight: 600;
}

.size {
  font-weight: 200;
}

@media (max-width: 719px) {
  a.button.source {
    bottom: 1rem;
    padding: 0.5rem 1.25rem;
    right: 0.5rem;
    top: auto;
    width: 0;
  }

  a.button.source .icon.source {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  a.button.source .label {
    display: none;
  }
}
</style>
