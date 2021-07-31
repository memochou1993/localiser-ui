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
          class="q-pa-md"
        >
          <span
            class="text-h6 text-weight-regular q-mb-md"
            v-text="'Projects'"
          />
          <q-list>
            <template
              v-for="(project) in projects"
              :key="project.id"
            >
              <q-separator
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
            </template>
            <q-separator
              spaced
            />
          </q-list>
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

export default {
  name: 'Projects',
  setup() {
    const store = useStore();
    const projects = computed(() => store.state.projects);
    if (!projects.value) {
      (async () => {
        const { data } = await project.index();
        store.commit('setProjects', data);
      })();
    }
    return {
      projects,
    };
  },
};
</script>
