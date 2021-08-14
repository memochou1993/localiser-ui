import axios from '@/plugins/axios';

const index = ({
  projectId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .get(`/api/projects/${projectId}/keys`)
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const store = ({
  projectId,
  name,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post(`/api/projects/${projectId}/keys`, {
      name,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const update = ({
  keyId,
  name,
} = {}) => new Promise((resolve, reject) => {
  axios
    .patch(`/api/keys/${keyId}`, {
      name,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const destroy = ({
  keyId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .delete(`/api/keys/${keyId}`)
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

export default {
  index,
  store,
  update,
  destroy,
};
