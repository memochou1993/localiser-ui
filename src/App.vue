<template>
  <q-layout
    view="lhr lpr lfr"
  >
    <TheDrawer
      v-if="false"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TheDrawer from '@/components/TheDrawer.vue';

export default {
  name: 'LayoutDefault',
  components: {
    TheDrawer,
  },
};
</script>
