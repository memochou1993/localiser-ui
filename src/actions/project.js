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
  description,
  languages,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post('/api/projects', {
      name,
      description,
      languages,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const update = ({
  projectId,
  name,
  description,
  settings,
} = {}) => new Promise((resolve, reject) => {
  axios
    .patch(`/api/projects/${projectId}`, {
      name,
      description,
      settings,
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

const fetchCachedValues = ({
  projectId,
  locale,
} = {}) => new Promise((resolve, reject) => {
  axios
    .get(`/api/projects/${projectId}/cache/values`, {
      params: {
        locale,
      },
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const destroyCachedValues = ({
  projectId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .delete(`/api/projects/${projectId}/cache/values`)
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
  fetchCachedValues,
  destroyCachedValues,
};
