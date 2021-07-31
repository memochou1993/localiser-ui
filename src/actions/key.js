import axios from '@/plugins/axios';

const index = (projectId, payload) => new Promise((resolve, reject) => {
  axios.get(`/api/projects/${projectId}/keys`, payload).then(({ data }) => resolve(data)).catch((err) => reject(err));
});

export default {
  index,
};
