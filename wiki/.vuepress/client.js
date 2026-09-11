import { defineClientConfig } from 'vuepress/client';
import { defineComponent, onBeforeUnmount, onMounted } from 'vue';
import CarbonAds from './components/carbon-ads.vue';
import CustomButton from './components/custom-button.vue';
import ExampleCard from './components/example-card.vue';
import InlineEditor from './components/inline-editor.vue';
import RedirectPage from './components/redirect-page.vue';
import VersionLink from './components/version-link.vue';

const SearchState = defineComponent({
  name: 'SearchState',
  setup() {
    const searchOpenClass = 'search-open';

    const isSearchInput = (target) =>
      target instanceof HTMLInputElement && target.closest('.search-box');

    const onFocusIn = ({ target }) => {
      if (isSearchInput(target)) {
        document.getElementById('app')?.classList.add(searchOpenClass);
      }
    };

    const onFocusOut = ({ target }) => {
      if (isSearchInput(target)) {
        document.getElementById('app')?.classList.remove(searchOpenClass);
      }
    };

    onMounted(() => {
      document.addEventListener('focusin', onFocusIn);
      document.addEventListener('focusout', onFocusOut);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      document.getElementById('app')?.classList.remove(searchOpenClass);
    });

    return () => null;
  },
});

export default defineClientConfig({
  rootComponents: [SearchState],
  enhance({ app }) {
    app.component('CarbonAds', CarbonAds);
    app.component('carbon-ads', CarbonAds);
    app.component('CustomButton', CustomButton);
    app.component('custom-button', CustomButton);
    app.component('ExampleCard', ExampleCard);
    app.component('example-card', ExampleCard);
    app.component('InlineEditor', InlineEditor);
    app.component('inline-editor', InlineEditor);
    app.component('RedirectPage', RedirectPage);
    app.component('redirect-page', RedirectPage);
    app.component('VersionLink', VersionLink);
    app.component('version-link', VersionLink);
  },
});
