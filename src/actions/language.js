import axios from '@/plugins/axios';

const store = ({
  projectId,
  name,
  code,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post(`/api/projects/${projectId}/languages`, {
      name,
      code,
    })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const update = ({
  languageId,
  name,
  code,
} = {}) => new Promise((resolve, reject) => {
  axios
    .patch(`/api/languages/${languageId}`, {
      name,
      code,
    })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const destroy = ({
  languageId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .delete(`/api/languages/${languageId}`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  store,
  update,
  destroy,
};
