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
        v-if="enableMenu"
        :user-name="userName"
        :user-role-code="userRoleCode"
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
    enableMenu: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      required: true,
    },
    userRoleCode: {
      type: Number,
      default: 0,
    },
  },
};
</script>
