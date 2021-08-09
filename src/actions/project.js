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
  languages,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post('/api/projects', {
      name,
      languages,
    })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const update = ({
  projectId,
  name,
} = {}) => new Promise((resolve, reject) => {
  axios
    .patch(`/api/projects/${projectId}`, {
      name,
    })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const destroy = ({
  projectId,
  name,
} = {}) => new Promise((resolve, reject) => {
  axios
    .delete(`/api/projects/${projectId}`, {
      name,
    })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  index,
  show,
  store,
  update,
  destroy,
};
