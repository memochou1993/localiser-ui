<template>
  <q-layout
    view="hhh lpr fff"
  >
    <q-header
      elevated
    >
      <q-toolbar>
        <q-btn
          v-if="isAuthenticated"
          dense
          flat
          icon="mdi-menu"
          round
          @click="toggleDrawer"
        />
        <q-toolbar-title>
          Localiser
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-if="isAuthenticated"
      v-model="state.drawer"
      :width="240"
      show-if-above
    >
      <TheMenu />
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  computed,
  reactive,
} from 'vue';
import {
  useStore,
} from 'vuex';
import TheMenu from '@/components/TheMenu.vue';

export default {
  name: 'LayoutDefault',
  components: {
    TheMenu,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      drawer: false,
    });
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const toggleDrawer = () => {
      state.drawer = !state.drawer;
    };
    return {
      state,
      isAuthenticated,
      toggleDrawer,
    };
  },
};
</script>
