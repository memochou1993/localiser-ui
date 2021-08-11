import axios from '@/plugins/axios';

const index = () => new Promise((resolve, reject) => {
  axios
    .get('/api/users')
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  index,
};
