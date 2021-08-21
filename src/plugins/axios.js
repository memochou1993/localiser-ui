/* eslint-disable no-param-reassign */
import axios from 'axios';
import store from '@/store';
import router from '@/router';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

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
      await store.dispatch('reset');
      await router.push({ name: 'login' });
    }
    return Promise.reject(e);
  },
);

export default client;
