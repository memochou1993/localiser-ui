import axios from '@/plugins/axios';

const index = ({
  projectId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .get(`/api/projects/${projectId}/keys`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  index,
};
