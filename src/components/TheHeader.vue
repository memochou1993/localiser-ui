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
      <TheHeaderMenuLanguage
        :on-change-language="onChangeLanguage"
      />
      <TheHeaderMenuPage
        v-if="enablePageMenu"
        :user-name="userName"
        :user-role-code="userRoleCode"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import TheHeaderMenuLanguage from './TheHeaderMenuLanguage.vue';
import TheHeaderMenuPage from './TheHeaderMenuPage.vue';

export default {
  name: 'TheHeader',
  components: {
    TheHeaderMenuLanguage,
    TheHeaderMenuPage,
  },
  props: {
    enablePageMenu: {
      type: Boolean,
      default: false,
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
