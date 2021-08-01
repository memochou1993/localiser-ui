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
          <q-list
            v-if="isLoaded"
          >
            <template
              v-for="(project, i) in projects"
              :key="project.id"
            >
              <q-separator
                v-show="i === 0"
                spaced
              />
              <q-item>
                <q-item-section
                  class="text-weight-regular"
                >
                  <q-item-label
                    class="text-subtitle2 text-weight-regular q-mb-sm"
                  >
                    <router-link
                      :to="{ name: 'project', params: { projectId: project.id } }"
                      class="text-secondary underline-none underline-hover"
                      v-text="project.name"
                    />
                  </q-item-label>
                  <q-item-label
                    v-show="project.description"
                    caption
                    class="q-mb-sm"
                    v-text="project.description"
                  />
                  <q-item-label>
                    <template
                      v-for="(language) in project.languages"
                      :key="language.id"
                    >
                      <q-chip
                        :label="language.name"
                        class="q-ma-none q-mr-sm cursor-pointer"
                        color="red"
                        dense
                        outline
                        square
                      />
                    </template>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator
                spaced
              />
            </template>
          </q-list>
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
} from '@/components';

export default {
  name: 'Projects',
  components: {
    AppSkeleton,
  },
  setup() {
    const store = useStore();
    const projects = computed(() => store.state.projects);
    const isLoaded = computed(() => !!projects.value);
    if (!projects.value) {
      (async () => {
        const { data } = await project.index();
        store.commit('setProjects', data);
      })();
    }
    return {
      projects,
      isLoaded,
    };
  },
};
</script>
