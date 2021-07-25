import axios from 'axios';
import store from '@/store';

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

client.defaults.headers.common.Authorization = `Bearer ${Buffer.from(store.state.token, 'base64').toString()}`;

export default client;
