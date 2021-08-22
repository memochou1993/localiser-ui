<template>
  <q-layout
    view="hhh lpr fff"
  >
    <TheHeader
      :enable-view-menu="!!token"
      :locale="locale"
      :on-change-language="(l) => changeLanguage(l)"
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
  useRouter,
} from 'vue-router';
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
    const router = useRouter();
    (async () => {
      await loadMessage(DEFAULT_LOCALE);
      setLanguage(DEFAULT_LOCALE);
      localStorage.setItem('locale', DEFAULT_LOCALE);
      store.commit('setLocale', DEFAULT_LOCALE);
    })();
    const changeLanguage = async (locale) => {
      if (localStorage.getItem('locale') !== locale) {
        localStorage.setItem('locale', locale);
        router.go(0);
      }
    };
    const locale = computed(() => store.state.locale);
    const token = computed(() => store.state.token);
    const user = computed(() => store.state.user);
    const confirmation = computed(() => store.state.confirmation);
    return {
      locale,
      token,
      user,
      confirmation,
      changeLanguage,
    };
  },
};
</script>
