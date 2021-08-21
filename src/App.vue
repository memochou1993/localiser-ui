<template>
  <q-layout
    view="hhh lpr fff"
  >
    <TheHeader
      :enable-menu="!!token"
      :user-name="user ? user.name : ''"
      :user-role-code="user ? user.role.code: 0"
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
    const token = computed(() => store.state.token);
    const user = computed(() => store.state.user);
    const confirmation = computed(() => store.state.confirmation);
    return {
      token,
      user,
      confirmation,
    };
  },
};
</script>
