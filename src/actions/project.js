import axios from '@/plugins/axios';

const index = (payload) => new Promise((resolve, reject) => {
  axios.get('/api/projects', payload).then(({ data }) => resolve(data)).catch((err) => reject(err));
});

const show = (id, payload) => new Promise((resolve, reject) => {
  axios.get(`/api/projects/${id}`, payload).then(({ data }) => resolve(data)).catch((err) => reject(err));
});

export default {
  index,
  show,
};
