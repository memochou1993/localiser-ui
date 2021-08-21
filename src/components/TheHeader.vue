<template>
  <q-header
    class="q-py-xs"
    elevated
  >
    <q-toolbar>
      <q-toolbar-title>
        <router-link
          :to="{ name: 'project.index' }"
          class="text-white q-px-md cursor-pointer underline-none"
          v-text="'Localiser'"
        />
      </q-toolbar-title>
      <TheHeaderLanguageMenu />
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
import TheHeaderLanguageMenu from './TheHeaderLanguageMenu.vue';

export default {
  name: 'TheHeader',
  components: {
    TheHeaderMenu,
    TheHeaderLanguageMenu,
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
