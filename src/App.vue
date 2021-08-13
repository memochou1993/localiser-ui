<template>
  <q-layout
    view="hhh lpr fff"
  >
    <TheHeader
      :enable-menu="isAuthenticated"
      :user-name="user ? user.name : ''"
    />
    <q-page-container>
      <div
        class="row justify-center"
      >
        <div
          class="col-10"
        >
          <router-view
            class="q-my-xl"
          />
        </div>
      </div>
    </q-page-container>
    <TheConfirmation
      v-if="confirmation"
    />
  </q-layout>
</template>

<script>
import {
  computed,
} from 'vue';
import {
  useStore,
} from 'vuex';
import {
  useRouter,
} from 'vue-router';
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  TheConfirmation,
  TheHeader,
} from '@/components';

export default {
  name: 'App',
  components: {
    TheConfirmation,
    TheHeader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const q = useQuasar();
    (async () => {
      if (!store.getters.isAuthenticated) {
        return;
      }
      try {
        const { data } = await actions.user.fetchMe();
        store.commit('setUser', data);
      } catch (err) {
        console.debug(err);
        await router.push({ name: 'logout' });
        q.notify({
          color: 'negative',
          group: false,
          message: 'Token expired.',
          timeout: 1000,
        });
      }
    })();
    const user = computed(() => store.state.user);
    const confirmation = computed(() => store.state.confirmation);
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    return {
      user,
      confirmation,
      isAuthenticated,
    };
  },
};
</script>
