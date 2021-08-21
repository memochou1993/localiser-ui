import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import iconSet from 'quasar/icon-set/mdi-v4';
import {
  setInterceptors,
} from '@/plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';
import '@quasar/extras/mdi-v4/mdi-v4.css';
import './styles/quasar.sass';

setInterceptors(store, router);

createApp(App)
  .use(Quasar, {
    config: {
      screen: {
        bodyClasses: true,
      },
    },
    plugins: {
      Notify,
    },
    iconSet,
  })
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app');
