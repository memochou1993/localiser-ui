import axios from '@/plugins/axios';

const store = ({
  keyId,
  languageId,
  text,
}) => new Promise((resolve, reject) => {
  axios.post(`/api/keys/${keyId}/values`, {
    language_id: languageId,
    text,
  }).then(({ data }) => resolve(data)).catch((err) => reject(err));
});

export default {
  store,
};
