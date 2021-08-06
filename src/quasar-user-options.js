import './styles/quasar.sass';
import iconSet from 'quasar/icon-set/mdi-v4';
import '@quasar/extras/mdi-v4/mdi-v4.css';

export default {
  config: {
    screen: {
      bodyClasses: true,
    },
  },
  plugins: {
  },
  iconSet,
};
