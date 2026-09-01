import { defineClientConfig } from 'vuepress/client';
import CarbonAds from './components/carbon-ads.vue';
import CustomButton from './components/custom-button.vue';
import ExampleCard from './components/example-card.vue';
import InlineEditor from './components/inline-editor.vue';
import RedirectPage from './components/redirect-page.vue';
import VersionLink from './components/version-link.vue';

export default defineClientConfig({
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
