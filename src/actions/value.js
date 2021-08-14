import axios from '@/plugins/axios';

const store = ({
  keyId,
  languageId,
  text,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post(`/api/keys/${keyId}/values`, {
      language_id: languageId,
      text,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const update = ({
  valueId,
  text,
} = {}) => new Promise((resolve, reject) => {
  axios
    .patch(`/api/values/${valueId}`, {
      text,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

export default {
  store,
  update,
};
