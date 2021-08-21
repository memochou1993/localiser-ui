import { Notify } from 'quasar';
import iconSet from 'quasar/icon-set/mdi-v4';
import '@quasar/extras/mdi-v4/mdi-v4.css';
import './styles/quasar.sass';

export default {
  config: {
    screen: {
      bodyClasses: true,
    },
  },
  plugins: {
    Notify,
  },
  iconSet,
};
