<template>
  <q-layout
    view="hhh lpr fff"
  >
    <q-header
      class="q-py-xs"
      elevated
    >
      <q-toolbar>
        <q-toolbar-title>
          <span
            class="q-px-md"
            v-text="'Localiser'"
          />
        </q-toolbar-title>
        <TheMenu />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view
        class="q-my-xl"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import TheMenu from '@/components/TheMenu.vue';

export default {
  name: 'App',
  components: {
    TheMenu,
  },
  setup() {
    return {
      //
    };
  },
};
</script>
