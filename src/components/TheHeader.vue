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
      <TheHeaderLanguageMenu
        :on-change-language="onChangeLanguage"
      />
      <TheHeaderViewMenu
        v-if="enableViewMenu"
        :locale="locale"
        :user-name="userName"
        :user-role-code="userRoleCode"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import TheHeaderViewMenu from './TheHeaderViewMenu.vue';
import TheHeaderLanguageMenu from './TheHeaderLanguageMenu.vue';

export default {
  name: 'TheHeader',
  components: {
    TheHeaderViewMenu,
    TheHeaderLanguageMenu,
  },
  props: {
    enableViewMenu: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: String,
      required: true,
    },
    onChangeLanguage: {
      type: Function,
      default: () => {},
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
