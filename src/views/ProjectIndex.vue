<template>
  <div>
    <template
      v-if="isLoaded"
    >
      <div
        class="text-h6 text-weight-regular my-12"
        v-text="'My Projects'"
      />
      <div
        class="row justify-between items-center"
      >
        <div
          class="row justify-between items-center my-12"
        >
          <q-btn
            class="q-mr-sm"
            color="red-4"
            dense
            icon="mdi-plus"
            round
            @click="state.enableCreateForm = true"
          />
        </div>
        <div
          class="row justify-between items-center my-12"
        >
          <AppFilter
            :on-input="(v) => state.keyword = v"
          />
        </div>
      </div>
      <ProjectList
        v-if="isLoaded"
        :needle="state.keyword"
        :projects="state.projects"
        class="my-12"
      />
      <ProjectEditor
        v-if="state.enableCreateForm"
        :projects="state.projects"
        :on-close="() => state.enableCreateForm = false"
        :on-submit="createProject"
      />
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
  AppFilter,
  AppLoading,
  ProjectEditor,
  ProjectList,
} from '@/components';

export default {
  name: 'ProjectIndex',
  components: {
    AppFilter,
    AppLoading,
    ProjectEditor,
    ProjectList,
  },
  setup() {
    const state = reactive({
      projects: null,
      enableCreateForm: false,
      keyword: '',
    });
    const isLoaded = computed(() => !!state.projects);
    (async () => {
      try {
        const { data } = await actions.project.index();
        state.projects = data;
      } catch (e) {
        console.debug(e);
      }
    })();
    const createProject = async ({
      name,
      languages,
    }) => {
      try {
        const { data } = await actions.project.store({
          name,
          languages,
        });
        const project = { ...data, languages };
        state.projects.unshift(project);
      } catch (e) {
        console.debug(e);
      }
    };
    return {
      state,
      isLoaded,
      createProject,
    };
  },
};
</script>
