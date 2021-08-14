import axios from '@/plugins/axios';

const index = () => new Promise((resolve, reject) => {
  axios
    .get('/api/projects')
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const fetch = ({
  projectId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .get(`/api/projects/${projectId}`)
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
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
    .catch((e) => reject(e));
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
    .catch((e) => reject(e));
});

const destroy = ({
  projectId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .delete(`/api/projects/${projectId}`)
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const attachUser = ({
  projectId,
  users,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post(`/api/projects/${projectId}/users`, {
      users,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const detachUser = ({
  projectId,
  userId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .delete(`/api/projects/${projectId}/users/${userId}`)
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

export default {
  index,
  fetch,
  store,
  update,
  destroy,
  attachUser,
  detachUser,
};
