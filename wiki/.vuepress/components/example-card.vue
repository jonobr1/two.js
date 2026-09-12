<template>
  <article class="example">
    <h2 :id="slug">{{ title }}</h2>

    <a class="cover" :href="href" target="_blank" rel="noopener noreferrer">
      <span
        class="thumb"
        role="img"
        :style="{ backgroundImage: `url(${src || '/images/thumbnail.svg'})` }"
      ></span>
      <div class="title">
        <span class="type" :class="platform"></span> {{ title }}
      </div>
    </a>

    <ul class="tags">
      <li v-for="tag in tagList" :key="tag.id" class="tag" :class="tag.color">
        {{ tag.name }}
      </li>
    </ul>
  </article>
</template>

<script>
var LISTED_TAGS = [];

export default {
  name: 'ExampleCard',
  data() {
    return {
      platforms: [
        'internet',
        'codepen',
        'codesandbox',
        'glitch',
        'jsfiddle',
        'observable',
      ],
      colors: ['red', 'blue', 'yellow', 'green', 'orange', 'purple'],
    };
  },
  props: {
    title: String,
    href: String,
    src: String,
    tags: String,
  },
  computed: {
    slug() {
      return slugify(this.title);
    },
    platform() {
      for (var i = 0; i < this.platforms.length; i++) {
        var platform = this.platforms[i];

        if (this.href && this.href.includes(platform)) {
          return platform;
        }
      }

      return this.platforms[0];
    },
    tagList() {
      var tags = [];
      var names = (this.tags || '').replace(/\s/gi, '').split(',');

      for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var color;
        var tagIndex = LISTED_TAGS.indexOf(name);

        if (!name) {
          continue;
        }

        if (tagIndex < 0) {
          tagIndex = LISTED_TAGS.length;
          LISTED_TAGS.push(name);
        }

        color = this.colors[tagIndex % this.colors.length];

        tags.push({
          id: tagIndex,
          name: name,
          color: color,
        });
      }

      return tags;
    },
  },
};

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['".]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
</script>

<style scoped>
.thumb {
  background-position: center;
  background-size: cover;
  display: block;
  height: 15vh;
  min-height: 120px;
  width: 100%;
}

.title {
  border: 1px solid #ccc;
  border-bottom: 0;
  color: var(--two-text);
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 0.7rem 0.5rem 2.7rem;
  position: relative;
}

.title:hover {
  color: var(--two-text);
}

.type {
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  height: 1rem;
  left: 0.5rem;
  position: absolute;
  top: 0.7rem;
  width: 2rem;
}

.type.codepen {
  background-image: url(/images/codepen.svg);
}

.type.codesandbox {
  background-image: url(/images/codesandbox.svg);
}

.type.glitch {
  background-image: url(/images/glitch.svg);
}

.type.jsfiddle {
  background-image: url(/images/jsfiddle.svg);
}

.type.observable {
  background-image: url(/images/observable.svg);
}

.type.internet {
  background-image: url(/images/internet.svg);
}

ul.tags {
  list-style: none;
}

.tag {
  border-radius: 0.2rem;
  color: var(--two-text);
  cursor: default;
  display: inline-block;
  font-size: 0.625rem;
  font-weight: 400;
  line-height: 1.25rem;
  margin: 0 0.15rem 0.25rem 0;
  padding: 0 0.75rem;
}

.tag.grey {
  background: rgb(244 244 244);
}

.tag.red {
  background: rgb(255 198 198);
}

.tag.orange {
  background: rgb(255 222 189);
}

.tag.yellow {
  background: rgb(255 251 177);
}

.tag.green {
  background: rgb(203 245 237);
}

.tag.blue {
  background: rgb(179 241 255);
}

.tag.purple {
  background: rgb(230 218 255);
}

@media (max-width: 719px) {
  .thumb {
    height: 240px;
  }
}
</style>
