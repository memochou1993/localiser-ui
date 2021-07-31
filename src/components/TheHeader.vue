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
      <TheMenu
        v-if="showMenu"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import TheMenu from './TheMenu.vue';

export default {
  name: 'TheHeader',
  components: {
    TheMenu,
  },
  props: {
    showMenu: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      //
    };
  },
};
</script>
