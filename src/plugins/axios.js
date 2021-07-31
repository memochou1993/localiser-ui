/* eslint-disable no-param-reassign */
import axios from 'axios';
import store from '@/store';

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

export default client;
