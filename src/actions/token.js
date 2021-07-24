import axios from '@/plugins/axios';

const fetch = (payload) => new Promise((resolve, reject) => {
  axios.post('/api/tokens', payload).then(({ data }) => resolve(data)).catch((err) => reject(err));
});

export default {
  fetch,
};
