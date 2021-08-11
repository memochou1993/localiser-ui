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
            { label: 'Projects', to: { name: 'project.index' } },
            { label: state.project.name, to: { name: 'project.show' } },
            { label: 'Settings' },
          ]"
        />
      </div>
      <div
        class="row"
      >
        <div
          class="col-12 col-sm-4 col-md-3"
        >
          <ProjectSettingMenu
            class="q-mr-sm-xl q-mb-lg"
          />
        </div>
        <div
          class="col-12 col-sm-8 col-md-9"
        >
          <router-view
            :on-update-project="(p) => state.project = p"
            :project="state.project"
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
  useRoute,
  useRouter,
} from 'vue-router';
import * as actions from '@/actions';
import {
  AppBreadcrumb,
  AppLoading,
  ProjectSettingMenu,
} from '@/components';

export default {
  name: 'ProjectSetting',
  components: {
    AppBreadcrumb,
    AppLoading,
    ProjectSettingMenu,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      project: null,
      users: [],
    });
    const isLoaded = computed(() => !!state.project);
    const { projectId } = route.params;
    (async () => {
      try {
        const { data } = await actions.project.show({ projectId });
        state.project = data;
      } catch (err) {
        console.debug(err);
        return router.push({ name: 'project.index' });
      }
      try {
        const { data } = await actions.user.index();
        state.users = data;
      } catch (err) {
        console.debug(err);
      }
      return null;
    })();
    return {
      state,
      isLoaded,
    };
  },
};
</script>
