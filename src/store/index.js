import Cookie from 'js-cookie';
import { createStore } from 'vuex';
import Confirmation from '@/models/Confirmation';
import * as actions from '@/actions';
import {
  User,
} from '@/models';

export default createStore({
  state: {
    locale: '',
    token: Cookie.get('token') || null,
    user: null,
    confirmation: null,
  },
  getters: {
    //
  },
  mutations: {
    setLocale(state, v) {
      state.locale = v;
    },
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
    reset(state) {
      Cookie.remove('token');
      state.token = null;
      state.user = null;
    },
  },
  actions: {
    async fetchMe({
      commit,
    }) {
      const { data } = await actions.user.fetchMe();
      commit('setUser', Object.assign(new User(), data));
    },
  },
});
