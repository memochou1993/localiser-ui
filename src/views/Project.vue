<template>
  <div
    v-if="state.project"
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
            v-text="state.project.name"
          />
          <KeyList
            :keys="state.keys"
            :languages="state.project.languages"
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
  KeyList,
} from '@/components';

export default {
  name: 'Project',
  components: {
    KeyList,
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
