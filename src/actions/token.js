import axios from '@/plugins/axios';

const fetch = ({
  email,
  password,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post('/api/tokens', {
      email,
      password,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const destroy = () => new Promise((resolve, reject) => {
  axios
    .delete('/api/tokens')
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

export default {
  fetch,
  destroy,
};
