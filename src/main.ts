import { createApp } from 'vue';
import VueClipboard from 'vue3-clipboard';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './locales/i18n';

import AnimatedFilter from './modules/AnimatedFilter.js';

// Icons
require('vue-ionicons/ionicons.css');

// Multiselect
require('@vueform/multiselect/themes/default.css');

const app = createApp(App);
app.directive('AnimatedFilter', AnimatedFilter);
app.use(store);
app.use(router);
app.use(i18n);
app.use(VueClipboard, { autoSetContainer: true });
app.mount('#app');
