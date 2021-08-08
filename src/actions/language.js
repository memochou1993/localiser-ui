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

export default {
  store,
};
