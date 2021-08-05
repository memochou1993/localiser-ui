<template>
  <q-layout
    view="hhh lpr fff"
  >
    <TheHeader
      :enabled="isAuthenticated"
    />
    <q-page-container>
      <router-view
        class="layout q-my-xl"
      />
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

<style lang="sass" scoped>
.layout
  height: calc(100vh - 58px - 96px)
</style>
