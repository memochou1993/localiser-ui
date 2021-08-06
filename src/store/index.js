import Cookie from 'js-cookie';
import { createStore } from 'vuex';

export default createStore({
  state: {
    token: Cookie.get('token') || null,
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  mutations: {
    setToken(state, v) {
      state.token = v;
    },
  },
  actions: {
  },
  modules: {
  },
});
