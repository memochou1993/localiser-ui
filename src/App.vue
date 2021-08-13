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
    (async () => {
      try {
        const { data } = await actions.user.fetchMe();
        store.commit('setUser', data);
      } catch (err) {
        console.debug(err);
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
