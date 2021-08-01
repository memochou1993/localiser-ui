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
            :on-create-value="createValue"
            :on-edit-value="editValue"
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
import * as actions from '@/actions';
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
      try {
        const { data } = await actions.project.show(projectId);
        state.project = data;
      } catch (err) {
        console.debug(err);
      }
    })();
    (async () => {
      try {
        const { data } = await actions.key.index(projectId);
        state.keys = data;
      } catch (err) {
        console.debug(err);
      }
    })();
    const createValue = async ({ keyId, languageId, text }) => {
      try {
        const { data } = await actions.value.store({ keyId, languageId, text });
        state.keys.find((key) => key.id === keyId).values.push({
          ...data,
          language: { id: languageId },
        });
      } catch (err) {
        console.debug(err);
      }
    };
    const editValue = async ({ keyId, valueId, text }) => {
      try {
        const { data } = await actions.value.update({ valueId, text });
        state.keys
          .find((key) => key.id === keyId).values
          .find((value) => value.id === valueId).text = data.text;
      } catch (err) {
        console.debug(err);
      }
    };
    return {
      state,
      isLoaded,
      createValue,
      editValue,
    };
  },
};
</script>
