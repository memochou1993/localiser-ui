import axios from '@/plugins/axios';

const index = () => new Promise((resolve, reject) => {
  axios
    .get('/api/users')
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const fetchMe = () => new Promise((resolve, reject) => {
  axios
    .get('/api/users/me')
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const updateMe = ({
  userId,
  name,
  email,
} = {}) => new Promise((resolve, reject) => {
  axios
    .patch('/api/users/me', {
      userId,
      name,
      email,
    })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  index,
  fetchMe,
  updateMe,
};
