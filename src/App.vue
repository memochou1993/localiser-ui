<template>
  <q-layout
    view="hhh lpr fff"
  >
    <TheHeader
      :enable-view-menu="!!token"
      :locale="locale"
      :user-name="user?.name ?? ''"
      :user-role-code="user?.role.code ?? 0"
    />
    <q-page-container>
      <div
        class="row justify-center"
      >
        <div
          class="col-10"
        >
          <router-view
            class="q-my-xl"
          />
        </div>
      </div>
    </q-page-container>
    <TheConfirmation
      v-if="confirmation"
    />
  </q-layout>
</template>

<script>
import {
  computed,
} from 'vue';
import {
  useStore,
} from 'vuex';
import {
  DEFAULT_LOCALE,
  loadMessage,
  setLanguage,
} from '@/plugins/i18n';
import {
  TheConfirmation,
  TheHeader,
} from '@/components';

export default {
  name: 'App',
  components: {
    TheConfirmation,
    TheHeader,
  },
  setup() {
    const store = useStore();
    (async () => {
      await loadMessage(DEFAULT_LOCALE);
      setLanguage(DEFAULT_LOCALE);
      localStorage.setItem('locale', DEFAULT_LOCALE);
      store.commit('setLocale', DEFAULT_LOCALE);
    })();
    const locale = computed(() => store.state.locale);
    const token = computed(() => store.state.token);
    const user = computed(() => store.state.user);
    const confirmation = computed(() => store.state.confirmation);
    return {
      locale,
      token,
      user,
      confirmation,
    };
  },
};
</script>
