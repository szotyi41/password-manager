import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './locales/i18n';

import AnimatedFilter from './modules/AnimatedFilter.js';

// Icons
require('vue-ionicons/ionicons.css');

const app = createApp(App);
app.directive('AnimatedFilter', AnimatedFilter);
app.use(store);
app.use(router);
app.use(i18n);
app.mount('#app');