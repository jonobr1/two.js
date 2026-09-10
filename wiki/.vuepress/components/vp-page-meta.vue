<script setup lang="ts">
import { computed } from 'vue';
import { useContributors, useLastUpdated } from '@vuepress/plugin-git/client';
import { useData } from '@theme/useData';
import { useEditLink } from '@theme/useEditLink';
import VPAutoLink from '@theme/VPAutoLink.vue';

const { frontmatter, lang, themeLocale } = useData();
const contributors = useContributors(
  () =>
    frontmatter.value.contributors ?? themeLocale.value.contributors ?? true,
);
const editLink = useEditLink();
const lastUpdated = useLastUpdated(
  () => frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true,
);
const formattedLastUpdated = computed(() => {
  if (!lastUpdated.value) {
    return '';
  }

  return new Intl.DateTimeFormat(lang.value, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(lastUpdated.value.date);
});
</script>

<template>
  <footer class="vp-page-meta">
    <div v-if="editLink" class="vp-meta-item edit-link">
      <VPAutoLink class="label" :config="editLink" />
    </div>

    <div class="vp-meta-item git-info">
      <div v-if="lastUpdated" class="vp-meta-item last-updated">
        <span class="meta-item-label"
          >{{ themeLocale.lastUpdatedText ?? lastUpdated.locale }}:
        </span>
        <time
          class="meta-item-info"
          :datetime="lastUpdated.iso"
          data-allow-mismatch
          >{{ formattedLastUpdated }}</time
        >
      </div>

      <div v-if="contributors.length" class="vp-meta-item contributors">
        <span class="meta-item-label"
          >{{ themeLocale.contributorsText }}:
        </span>
        <span class="meta-item-info">
          <template v-for="(contributor, index) in contributors" :key="index">
            <span class="contributor" :title="`email: ${contributor.email}`">
              {{ contributor.name }}
            </span>
            <template v-if="index !== contributors.length - 1">, </template>
          </template>
        </span>
      </div>
    </div>
  </footer>
</template>
