<template>
  <div
    class="row justify-center"
  >
    <div
      class="col-10 col-sm-8"
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
          class="q-pb-none"
        >
          <AppFilter
            v-if="isLoaded"
            @update="(keyword) => state.keyword = keyword"
          />
          <AppSkeleton
            v-else
          />
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
import {
  project,
} from '@/actions';
import {
  AppFilter,
  AppSkeleton,
  ProjectList,
} from '@/components';

export default {
  name: 'Projects',
  components: {
    AppFilter,
    AppSkeleton,
    ProjectList,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      keyword: '',
    });
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
    const filter = (v) => v.name.toLowerCase().includes(state.keyword.toLowerCase());
    return {
      state,
      projects,
      isLoaded,
      filter,
    };
  },
};
</script>
