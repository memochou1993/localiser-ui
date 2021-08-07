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
            { label: state.project.name, to: { name: 'key.index' } },
            { label: 'Settings' },
          ]"
        />
      </div>
      <div
        class="row"
      >
        <div
          class="col-12 col-md-3"
        >
          <ProjectSettingMenu
            class="q-mr-md-xl q-mb-lg"
          />
        </div>
        <div
          class="col-12 col-md-9"
        >
          <router-view
            :project="state.project"
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
    const state = reactive({
      project: null,
    });
    const isLoaded = computed(() => !!state.project);
    const { projectId } = route.params;
    (async () => {
      try {
        const { data } = await actions.project.show({ projectId });
        state.project = data;
      } catch (err) {
        console.debug(err);
      }
    })();
    return {
      state,
      isLoaded,
    };
  },
};
</script>
