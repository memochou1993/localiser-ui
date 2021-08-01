<template>
  <div
    class="row justify-center"
  >
    <div
      class="col-10 col-sm-8"
    >
      <q-card
        class="q-pa-md"
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
          class="q-pa-md"
        >
          <ProjectList
            v-if="isLoaded"
            :projects="projects"
          />
          <AppSkeleton
            v-else
            :count="5"
          />
        </q-card-section>
      </q-card>
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
  project,
} from '@/actions';
import {
  AppSkeleton,
  ProjectList,
} from '@/components';

export default {
  name: 'Projects',
  components: {
    AppSkeleton,
    ProjectList,
  },
  setup() {
    const store = useStore();
    const projects = computed(() => store.state.projects);
    const isLoaded = computed(() => !!projects.value);
    if (!projects.value) {
      (async () => {
        try {
          const { data } = await project.index();
          store.commit('setProjects', data);
        } catch (err) {
          console.debug(err);
        }
      })();
    }
    return {
      projects,
      isLoaded,
    };
  },
};
</script>
