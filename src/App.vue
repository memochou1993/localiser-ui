<template>
  <q-layout
    view="hhh lpr fff"
  >
    <TheHeader
      :is-menu-enabled="isAuthenticated"
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
  TheHeader,
} from '@/components';

export default {
  name: 'App',
  components: {
    TheHeader,
  },
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    return {
      isAuthenticated,
    };
  },
};
</script>
