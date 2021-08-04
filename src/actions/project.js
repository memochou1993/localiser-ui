import axios from '@/plugins/axios';

const index = () => new Promise((resolve, reject) => {
  axios
    .get('/api/projects')
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const show = ({
  projectId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .get(`/api/projects/${projectId}`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const store = ({
  name,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post('/api/projects', {
      name,
    })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  index,
  show,
  store,
};
