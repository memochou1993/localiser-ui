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
            { label: 'Profile' },
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
            :user="user"
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
import {
  AppBreadcrumb,
  AppLoading,
  SettingMenu,
} from '@/components';
import * as actions from '@/actions';

const menuItems = [
  {
    name: 'General',
    to: {
      name: 'user.profile',
    },
  },
  {
    name: 'Security',
    to: {
      name: 'user.security',
    },
  },
];

export default {
  name: 'UserSetting',
  components: {
    AppBreadcrumb,
    AppLoading,
    SettingMenu,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      users: null,
    });
    const isLoaded = computed(() => !!state.users);
    (async () => {
      try {
        const { data } = await actions.user.index();
        state.users = data;
      } catch (err) {
        console.debug(err);
      }
    })();
    const user = computed(() => store.state.user);
    const setUser = (u) => store.commit('setUser', u);
    return {
      state,
      menuItems,
      isLoaded,
      user,
      setUser,
    };
  },
};
</script>
