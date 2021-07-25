<template>
  <q-layout
    view="hhh lpr fff"
  >
    <q-header>
      <q-toolbar>
        <q-btn
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
      class="bg-primary"
      show-if-above
    >
      <q-list>
        <q-item
          class="text-caption text-white"
          clickable
          href="https://github.com/quasarframework/"
          tag="a"
        >
          <q-item-section
            avatar
          >
            <q-icon
              name="mdi-file-table-outline"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label
              class="text-body2"
            >
              Projects
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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

export default {
  name: 'LayoutDefault',
  setup() {
    const store = useStore();
    const state = reactive({
      drawer: true,
    });
    const isAuthenticated = computed(() => !!store.state.token);
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
