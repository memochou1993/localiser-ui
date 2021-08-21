import axios from '@/plugins/axios';

const fetchMe = () => new Promise((resolve, reject) => {
  axios
    .get('/api/user')
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const index = () => new Promise((resolve, reject) => {
  axios
    .get('/api/users')
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const store = ({
  name,
  email,
  password,
  role,
} = {}) => new Promise((resolve, reject) => {
  axios
    .post('/api/users', {
      name,
      email,
      password,
      role,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const update = ({
  userId,
  name,
  email,
  password,
  role,
} = {}) => new Promise((resolve, reject) => {
  axios
    .patch(`/api/users/${userId}`, {
      name,
      email,
      ...password && { password },
      role,
    })
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

const destroy = ({
  userId,
} = {}) => new Promise((resolve, reject) => {
  axios
    .delete(`/api/users/${userId}`)
    .then(({ data }) => resolve(data))
    .catch((e) => reject(e));
});

export default {
  fetchMe,
  index,
  store,
  update,
  destroy,
};
