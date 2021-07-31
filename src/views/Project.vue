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
            v-text="'Keys'"
          />
          <q-list>
            <template
              v-for="(key) in state.keys"
              :key="key.id"
            >
              <q-separator
                spaced
              />
              <q-item
                class="q-pa-none"
              >
                <q-item-section>
                  <div
                    class="row"
                  >
                    <div
                      class="col-3 q-px-md"
                    >
                      <div
                        class="full-height flex items-center"
                        v-text="key.name"
                      />
                    </div>
                    <div
                      class="col-9"
                    >
                      <ValueList
                        :languages="state.project.languages"
                        :values="key.values"
                      />
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
          <q-separator
            spaced
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  reactive,
} from 'vue';
import {
  useRoute,
} from 'vue-router';
import {
  project,
  key,
} from '@/actions';
import {
  ValueList,
} from '@/components';

export default {
  name: 'Project',
  components: {
    ValueList,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      project: null,
      keys: null,
    });
    const { projectId } = route.params;
    (async () => {
      const { data } = await project.show(projectId);
      state.project = data;
    })();
    (async () => {
      const { data } = await key.index(projectId);
      state.keys = data;
    })();
    return {
      state,
    };
  },
};
</script>
