import { createApp } from 'vue';
import { Quasar } from 'quasar';
import {
  setInterceptors,
} from '@/plugins/axios';
import quasarConfig from './quasar.config';
import App from './App.vue';
import store from './store';
import router from './router';
import i18n from './plugins/i18n';

setInterceptors(store, router);

createApp(App)
  .use(Quasar, quasarConfig)
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app');
