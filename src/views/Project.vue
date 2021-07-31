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
            v-text="'Keys'"
          />
          <template
            v-for="(key) in state.keys"
            :key="key.id"
          >
            <div
              class="row"
            >
              <div
                class="col-3"
              >
                <div
                  class="full-height flex items-center text-weight-regular"
                  v-text="key.name"
                />
              </div>
              <div
                class="col-9"
              >
                <KeyTable
                  :columns="columns"
                  :rows="state.rows"
                  :values="key.values"
                />
              </div>
            </div>
          </template>
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
  KeyTable,
} from '@/components';

const columns = [
  {
    align: 'left',
    name: 'language',
  },
  {
    align: 'left',
    name: 'value',
  },
];

export default {
  name: 'Project',
  components: {
    KeyTable,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      project: null,
      keys: null,
      rows: null,
    });
    const { projectId } = route.params;
    (async () => {
      const { data } = await project.show(projectId);
      state.project = data;
      state.rows = state.project.languages.map((language) => ({
        language,
      }));
    })();
    (async () => {
      const { data } = await key.index(projectId);
      state.keys = data;
    })();
    return {
      state,
      columns,
    };
  },
};
</script>
