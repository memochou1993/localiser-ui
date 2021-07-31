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
          <div
            class="text-h6 text-weight-regular q-mb-md"
            v-text="'Projects'"
          />
          <div
            class="text-subtitle2"
          >
            <q-list>
              <template
                v-for="(project, i) in projects"
                :key="i"
              >
                <q-separator
                  spaced
                />
                <q-item>
                  <q-item-section
                    class="text-weight-regular"
                  >
                    <q-item-label
                      class="q-mb-sm"
                    >
                      <router-link
                        :to="{ name: 'project', params: { project: project.id } }"
                        class="text-secondary underline-none underline-hover"
                        v-text="project.name"
                      />
                    </q-item-label>
                    <q-item-label
                      v-show="project.description"
                      caption
                      class="q-mb-sm"
                    >
                      A new project
                    </q-item-label>
                    <q-item-label>
                      <q-chip
                        class="q-ma-none"
                        color="red"
                        dense
                        label="en"
                        outline
                        square
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <q-separator
                spaced
              />
            </q-list>
          </div>
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
