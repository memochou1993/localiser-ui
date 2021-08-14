<template>
  <div />
</template>

<script>
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
      } catch (e) {
        console.debug(e);
      } finally {
        await store.dispatch('reset');
        await router.push({ name: 'login' });
      }
    })();
  },
};
</script>
