import Cookie from 'js-cookie';
import { createStore } from 'vuex';

export default createStore({
  state: {
    token: Cookie.get('token') || null,
    projects: null,
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
    setProjects(state, v) {
      state.projects = v;
    },
    unshiftProjects(state, v) {
      state.projects.unshift(v);
    },
  },
  actions: {
  },
  modules: {
  },
});
