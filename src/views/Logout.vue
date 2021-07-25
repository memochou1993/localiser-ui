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
    Cookie.remove('token');
    store.commit('setToken', '');
    (async () => {
      try {
        await token.destroy();
      } catch (err) {
        console.debug(err);
      }
    })();
    router.push({ name: 'login' });
  },
};
</script>
