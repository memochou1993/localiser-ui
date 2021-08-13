import { createApp } from 'vue';
import { Quasar, Notify } from 'quasar';
import iconSet from 'quasar/icon-set/mdi-v4';
import App from './App.vue';
import router from './router';
import store from './store';
import '@quasar/extras/mdi-v4/mdi-v4.css';
import './styles/quasar.sass';

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
  .mount('#app');
