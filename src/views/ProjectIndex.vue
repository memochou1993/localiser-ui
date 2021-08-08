<template>
  <div>
    <template
      v-if="isLoaded"
    >
      <div
        class="q-my-sm"
      >
        <span
          class="text-h6 text-weight-regular"
          v-text="'My Projects'"
        />
      </div>
      <div
        class="row justify-between items-end"
      >
        <div
          class="row justify-between items-end q-my-sm"
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
          class="row justify-between items-end q-my-sm"
        >
          <AppFilter
            :on-input="(v) => state.keyword = v"
          />
        </div>
      </div>
      <div
        class="q-my-sm"
      >
        <ProjectList
          v-if="isLoaded"
          :projects="state.projects.filter(filter)"
        />
      </div>
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
      } catch (err) {
        console.debug(err);
      }
    })();
    const filter = (p) => {
      const keyword = state.keyword.toLowerCase();
      return p.name.toLowerCase().includes(keyword);
    };
    const createProject = async ({ name, languages }) => {
      try {
        const { data } = await actions.project.store({
          name,
          languages,
        });
        const project = { ...data, languages };
        state.projects.unshift(project);
      } catch (err) {
        console.debug(err);
      }
    };
    return {
      state,
      isLoaded,
      filter,
      createProject,
    };
  },
};
</script>
