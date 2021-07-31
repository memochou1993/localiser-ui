<template>
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
</template>

<script>
import TheMenu from '@/components/TheMenu.vue';

export default {
  name: 'TheHeader',
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
