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
          :user="user"
          :on-update-user="() => {}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
} from 'vue';
import {
  useStore,
} from 'vuex';
import {
  AppBreadcrumb,
  UserSettingMenu,
} from '@/components';

export default {
  name: 'ProjectSetting',
  components: {
    AppBreadcrumb,
    UserSettingMenu,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    return {
      user,
    };
  },
};
</script>
