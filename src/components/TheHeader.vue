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
      <TheHeaderMenu
        v-if="enabled"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import TheHeaderMenu from './TheHeaderMenu.vue';

export default {
  name: 'TheHeader',
  components: {
    TheHeaderMenu,
  },
  props: {
    enabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
