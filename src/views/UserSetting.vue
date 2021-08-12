<template>
  <div>
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
        <UserSettingMenu
          class="q-mr-sm-xl q-mb-lg"
        />
      </div>
      <div
        class="col-12 col-sm-8 col-md-9"
      >
        <router-view
          v-if="user"
          :on-update-user="setUser"
          :user="user"
          :users="state.users"
        />
      </div>
    </div>
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
  UserSettingMenu,
} from '@/components';
import * as actions from '@/actions';

export default {
  name: 'ProjectSetting',
  components: {
    AppBreadcrumb,
    UserSettingMenu,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      users: [],
    });
    (async () => {
      try {
        const { data } = await actions.user.index();
        state.users = data;
      } catch (err) {
        console.debug(err);
      }
    })();
    const user = computed(() => store.state.user);
    const setUser = store.commit('setUser');
    return {
      state,
      user,
      setUser,
    };
  },
};
</script>
