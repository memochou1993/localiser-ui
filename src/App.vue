<template>
  <q-layout
    view="hhh lpr fff"
  >
    <q-header
      class="q-py-xs"
      elevated
    >
      <q-toolbar>
        <q-toolbar-title
          v-text="'Localiser'"
        />
        <TheMenu />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TheMenu from '@/components/TheMenu.vue';

export default {
  name: 'LayoutDefault',
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
