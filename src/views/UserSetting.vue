<template>
  <div>
    <template
      v-if="isLoaded"
    >
      <div
        class="q-mb-lg"
      >
        <AppBreadcrumb
          :breadcrumbs="[
            { label: t('__ViewTitleSettings') },
          ]"
        />
      </div>
      <div
        class="row"
      >
        <div
          class="col-12 col-sm-4 col-md-3"
        >
          <SettingMenu
            :items="menuItems"
            class="q-mr-sm-xl q-mb-lg"
          />
        </div>
        <div
          class="col-12 col-sm-8 col-md-9"
        >
          <router-view
            :on-update-user="setUser"
            :on-update-users="(data) => state.users = data"
            :user="me"
            :users="state.users"
          />
        </div>
      </div>
    </template>
    <AppLoading
      v-else
    />
  </div>
</template>

<script>
import {
  computed,
  reactive,
} from 'vue';
import {
  useStore,
} from 'vuex';
import { useI18n } from 'vue-i18n/index';
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  AppBreadcrumb,
  AppLoading,
  SettingMenu,
} from '@/components';

export default {
  name: 'UserSetting',
  components: {
    AppBreadcrumb,
    AppLoading,
    SettingMenu,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const q = useQuasar();
    const state = reactive({
      users: null,
    });
    const menuItems = computed(() => [
      { name: t('__TitleGeneral'), to: { name: 'user.profile' } },
      { name: t('__TitleSecurity'), to: { name: 'user.security' } },
    ]);
    const isLoaded = computed(() => !!state.users);
    (async () => {
      try {
        const { data } = await actions.user.index();
        state.users = data;
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText,
          timeout: 1000,
        });
      }
    })();
    const me = computed(() => store.state.user);
    const setUser = (u) => store.commit('setUser', u);
    return {
      t,
      state,
      menuItems,
      isLoaded,
      me,
      setUser,
    };
  },
};
</script>
