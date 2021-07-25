import Cookie from 'js-cookie';
import { createStore } from 'vuex';

export default createStore({
  state: {
    token: Cookie.get('token') || '',
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
