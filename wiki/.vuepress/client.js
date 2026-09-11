import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
} from 'vue';
import { defineClientConfig, useRoute } from 'vuepress/client';
import CarbonAds from './components/carbon-ads.vue';
import CustomButton from './components/custom-button.vue';
import ExampleCard from './components/example-card.vue';
import InlineEditor from './components/inline-editor.vue';
import RedirectPage from './components/redirect-page.vue';
import VersionLink from './components/version-link.vue';

const NavbarState = defineComponent({
  name: 'NavbarState',
  setup() {
    const route = useRoute();
    const searchOpenClass = 'search-open';
    const mobileBreakpoint = 719;
    const fallbackOffset = 148;
    const buffer = 50;
    let animationFrame;

    const updateSearchPosition = () => {
      animationFrame = undefined;

      const search = document.querySelector('.search-box');

      if (!search) {
        return;
      }

      if (document.documentElement.clientWidth <= mobileBreakpoint) {
        search.style.left = '0px';
        return;
      }

      const content = document.querySelector('[vp-content]');
      const logo = document.querySelector('.vp-site-logo');
      const navbarItems = document.querySelector('.vp-navbar-items');
      let offset = fallbackOffset;

      if (content) {
        const contentStyle = window.getComputedStyle(content);
        offset =
          content.getBoundingClientRect().left +
          Number.parseFloat(contentStyle.paddingLeft || '0');
      }

      if (logo && navbarItems) {
        const logoRight = logo.getBoundingClientRect().right;
        const navbarItemsLeft = navbarItems.getBoundingClientRect().left;
        const searchWidth = search.getBoundingClientRect().width;

        if (
          offset + searchWidth > navbarItemsLeft - buffer ||
          offset < logoRight + buffer
        ) {
          offset = fallbackOffset;
        }
      }

      search.style.left = `${offset}px`;
    };

    const queueSearchPosition = () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(updateSearchPosition);
    };

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
      window.addEventListener('resize', queueSearchPosition);
      queueSearchPosition();

      document.fonts?.ready.then(queueSearchPosition);
    });

    watch(
      () => route.path,
      () => nextTick(queueSearchPosition),
    );

    onBeforeUnmount(() => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      window.removeEventListener('resize', queueSearchPosition);

      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }

      document.getElementById('app')?.classList.remove(searchOpenClass);
    });

    return () => null;
  },
});

export default defineClientConfig({
  rootComponents: [NavbarState],
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
