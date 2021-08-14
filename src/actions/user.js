import axios from '@/plugins/axios';

const fetchMe = () => new Promise((resolve, reject) => {
  axios
    .get('/api/users/me')
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const index = () => new Promise((resolve, reject) => {
  axios
    .get('/api/users')
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const update = ({
  userId,
  name,
  email,
  password,
} = {}) => new Promise((resolve, reject) => {
  axios
    .patch(`/api/users/${userId}`, {
      name,
      email,
      password,
    })
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  fetchMe,
  index,
  update,
};
