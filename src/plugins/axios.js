/* eslint-disable no-param-reassign */
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export const setInterceptors = (store, router) => {
  client.interceptors.request.use((config) => {
    const { token } = store.state;
    const decoded = Buffer.from(token || '', 'base64').toString();
    if (decoded) {
      config.headers.Authorization = `Bearer ${decoded}`;
    }
    return config;
  });
  client.interceptors.response.use(
    (res) => res,
    async (e) => {
      if (e?.response?.status === 401) {
        await store.commit('reset');
        await router.push({ name: 'login' });
      }
      return Promise.reject(e);
    },
  );
};

export default client;
