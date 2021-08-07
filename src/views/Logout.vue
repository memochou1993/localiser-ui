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
import * as actions from '@/actions';

export default {
  name: 'Logout',
  setup() {
    const store = useStore();
    const router = useRouter();
    (async () => {
      try {
        await actions.token.destroy();
      } catch (err) {
        console.debug(err);
      } finally {
        Cookie.remove('token');
        store.commit('setToken', null);
        store.commit('setProjects', null);
        await router.push({ name: 'login' });
      }
    })();
  },
};
</script>
