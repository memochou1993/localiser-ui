<template>
  <q-layout
    view="hhh lpr fff"
  >
    <TheHeader />
    <q-page-container>
      <router-view
        class="q-my-xl"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
  },
  setup() {
    return {
      //
    };
  },
};
</script>
