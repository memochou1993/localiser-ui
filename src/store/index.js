import Cookie from 'js-cookie';
import { createStore } from 'vuex';
import Confirmation from '@/models/Confirmation';
import * as actions from '@/actions';

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
    reset({
      commit,
    }) {
      Cookie.remove('token');
      commit('setToken', null);
      commit('setUser', null);
    },
    async fetchMe({
      commit,
    }) {
      return new Promise((resolve, reject) => {
        actions.user.fetchMe()
          .then(({ data }) => {
            commit('setUser', data);
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
  modules: {
  },
});
