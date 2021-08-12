import Cookie from 'js-cookie';
import { createStore } from 'vuex';
import Confirmation from '@/models/Confirmation';

export default createStore({
  state: {
    token: Cookie.get('token') || null,
    user: null,
    confirmation: null,
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
    setUser(state, v) {
      state.user = v;
    },
    setConfirmation(state, {
      title,
      content,
      action,
      callback,
    }) {
      state.confirmation = new Confirmation({
        title,
        content,
        action,
        callback,
      });
    },
    resetConfirmation(state) {
      state.confirmation = null;
    },
  },
  actions: {
  },
  modules: {
  },
});
