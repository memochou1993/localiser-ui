<template>
  <q-layout
    view="hhh lpr fff"
  >
    <TheHeader
      :enable-page-menu="!!token"
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
            v-slot="{ Component }"
          >
            <transition
              mode="in-out"
            >
              <component
                :is="Component"
                v-if="locale"
                class="q-my-xl"
              />
            </transition>
          </router-view>
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
import i18n, {
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
    const setLocale = (locale) => {
      setLanguage(locale);
      store.commit('setLocale', locale);
    };
    (async () => {
      await loadMessage(DEFAULT_LOCALE);
      setLocale(DEFAULT_LOCALE);
    })();
    const changeLanguage = async (locale) => {
      if (!i18n.global.availableLocales.includes(locale)) {
        await loadMessage(locale);
      }
      if (store.state.locale !== locale) {
        setLocale(locale);
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
