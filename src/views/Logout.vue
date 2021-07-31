<template>
  <div />
</template>

<script>
import Cookie from 'js-cookie';
import {
  useStore,
} from 'vuex';
import {
  useRouter,
} from 'vue-router';
import {
  token,
} from '@/actions';

export default {
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();
    (async () => {
      try {
        await token.destroy();
      } catch (err) {
        console.debug(err);
      } finally {
        Cookie.remove('token');
        store.commit('setToken', null);
        store.commit('setProjects', null);
        router.push({ name: 'login' });
      }
    })();
  },
};
</script>
