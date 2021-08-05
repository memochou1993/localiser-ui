<template>
  <div
    class="row justify-center"
  >
    <div
      class="col-10"
    >
      <q-card
        class="q-pa-md shadow-4"
      >
        <q-card-section
          class="q-pb-none"
        >
          <span
            v-if="isLoaded"
            class="text-h6 text-weight-regular q-mb-md"
            v-text="'My Projects'"
          />
          <AppSkeleton
            v-else
            width="25%"
          />
        </q-card-section>
        <q-card-section
          class="q-py-none"
        >
          <div
            v-if="isLoaded"
            class="row justify-between items-center"
          >
            <div
              class="row justify-between items-center q-pt-md"
            >
              <q-btn
                color="grey-8"
                label="Create"
                no-caps
                outline
                @click="state.createForm = true"
              />
            </div>
            <div
              class="row justify-between items-center q-pt-md"
            >
              <AppFilter
                @onUpdate="(keyword) => state.keyword = keyword"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <ProjectList
            v-if="isLoaded"
            :projects="projects.filter(filter)"
          />
          <AppSkeleton
            v-else
            :count="5"
          />
        </q-card-section>
      </q-card>
    </div>
    <ProjectEditor
      v-if="state.createForm"
      @onSubmit="createProject"
      @onClose="state.createForm = false"
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
    const store = useStore();
    const state = reactive({
      createForm: false,
      keyword: '',
    });
    const projects = computed(() => store.state.projects);
    const isLoaded = computed(() => !!projects.value);
    if (!projects.value) {
      (async () => {
        try {
          const { data } = await actions.project.index();
          store.commit('setProjects', data);
        } catch (err) {
          console.debug(err);
        }
      })();
    }
    const createProject = async ({ name }) => {
      try {
        const { data } = await actions.project.store({
          name,
        });
        const project = { ...data, languages: [] };
        store.commit('setProjects', projects.value.concat(project));
      } catch (err) {
        console.debug(err);
      }
    };
    const filter = (v) => v.name.toLowerCase().includes(state.keyword.toLowerCase());
    return {
      state,
      projects,
      isLoaded,
      createProject,
      filter,
    };
  },
};
</script>
