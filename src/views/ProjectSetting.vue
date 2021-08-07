<template>
  <div>
    <template
      v-if="isLoaded"
    >
      <q-breadcrumbs
        active-color="info"
        class="q-mb-lg"
      >
        <q-breadcrumbs-el
          :to="{ name: 'project.index' }"
          label="Projects"
        />
        <q-breadcrumbs-el
          :to="{ name: 'key.index', projectId: state.project.id }"
          :label="state.project.name"
        />
        <q-breadcrumbs-el
          :label="'Settings'"
        />
      </q-breadcrumbs>
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
    <template
      v-else
    >
      <AppSkeleton
        :count="8"
      />
    </template>
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
  AppSkeleton,
  ProjectSettingMenu,
} from '@/components';

export default {
  name: 'ProjectSetting',
  components: {
    AppSkeleton,
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
