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
            { label: 'System' },
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
            :on-update-users="(data) => state.users = data"
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
import * as actions from '@/actions';
import {
  AppBreadcrumb,
  AppLoading,
  SettingMenu,
} from '@/components';

const menuItems = [
  {
    name: 'Users',
    to: {
      name: 'system.users',
    },
  },
];

export default {
  name: 'SystemSetting',
  components: {
    AppBreadcrumb,
    AppLoading,
    SettingMenu,
  },
  setup() {
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
    return {
      state,
      menuItems,
      isLoaded,
    };
  },
};
</script>
