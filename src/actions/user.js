import axios from '@/plugins/axios';

const index = () => new Promise((resolve, reject) => {
  axios
    .get('/api/users')
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const showMe = () => new Promise((resolve, reject) => {
  axios
    .get('/api/users/me')
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  index,
  showMe,
};
