<template>
  <div
    class="row justify-center"
  >
    <div
      class="col-10"
    >
      <div
        class="q-my-sm"
      >
        <span
          v-if="isLoaded"
          class="text-h6 text-weight-regular"
          v-text="'My Projects'"
        />
        <AppSkeleton
          v-else
          width="25%"
        />
      </div>
      <div
        v-if="isLoaded"
        class="row justify-between items-end"
      >
        <div
          class="row justify-between items-end q-my-sm"
        >
          <q-btn
            class="q-px-sm"
            color="grey-8"
            dense
            label="Create"
            no-caps
            outline
            @click="state.createForm = true"
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
        <AppSkeleton
          v-else
          :count="5"
        />
      </div>
    </div>
    <ProjectEditor
      v-if="state.createForm"
      :projects="state.projects"
      :on-close="() => state.createForm = false"
      :on-submit="createProject"
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
  AppSkeleton,
  ProjectEditor,
  ProjectList,
} from '@/components';

export default {
  name: 'ProjectIndex',
  components: {
    AppFilter,
    AppSkeleton,
    ProjectEditor,
    ProjectList,
  },
  setup() {
    const state = reactive({
      projects: null,
      createForm: false,
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
