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
                <q-table
                  :columns="columns"
                  :rows="state.rows"
                  flat
                  hide-bottom
                  hide-header
                  row-key="name"
                >
                  <template
                    #body="props"
                  >
                    <q-tr
                      :props="props"
                    >
                      <q-td
                        key="language"
                        :props="props"
                      >
                        <span
                          v-text="props.row.language.name"
                        />
                      </q-td>
                      <q-td
                        key="value"
                        :props="props"
                      >
                        <template
                          v-for="(value) in key.values"
                          :key="value.id"
                        >
                          <span
                            v-if="value.language.id === props.row.language.id"
                            v-text="value.text"
                          />
                        </template>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
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
  setup() {
    const route = useRoute();
    const state = reactive({
      project: null,
      keys: null,
      rows: null,
    });
    (async () => {
      const { data } = await project.show(route.params.projectId);
      state.project = data;
      state.rows = state.project.languages.map((language) => ({
        language,
      }));
    })();
    (async () => {
      const { data } = await key.index(route.params.projectId);
      state.keys = data;
    })();
    return {
      state,
      columns,
    };
  },
};
</script>
