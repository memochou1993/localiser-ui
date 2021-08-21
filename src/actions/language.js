import axios from '@/plugins/axios';

const store = ({
  projectId,
  name,
  locale,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post(`/api/projects/${projectId}/languages`, {
      name,
      locale,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const update = ({
  languageId,
  name,
  locale,
} = {}) => new Promise((resolve, reject) => {
  axios
    .patch(`/api/languages/${languageId}`, {
      name,
      locale,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const destroy = ({
  languageId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .delete(`/api/languages/${languageId}`)
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

export default {
  store,
  update,
  destroy,
};
