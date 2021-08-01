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
            v-text="state.project.name"
          />
          <AppSkeleton
            v-else
            width="25%"
          />
        </q-card-section>
        <q-card-section
          class="q-pa-md"
        >
          <KeyList
            v-if="isLoaded"
            :keys="state.keys"
            :languages="state.project.languages"
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
  useRoute,
} from 'vue-router';
import {
  project,
  key,
} from '@/actions';
import {
  AppSkeleton,
  KeyList,
} from '@/components';

export default {
  name: 'Project',
  components: {
    AppSkeleton,
    KeyList,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      project: null,
      keys: null,
    });
    const isLoaded = computed(() => !!state.project && !!state.keys);
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
      isLoaded,
    };
  },
};
</script>
