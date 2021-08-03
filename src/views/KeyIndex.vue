<template>
  <div
    class="row justify-center"
  >
    <div
      class="col-10"
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
            v-text="state.project.name"
          />
          <AppSkeleton
            v-else
            width="25%"
          />
        </q-card-section>
        <q-card-section
          class="q-pb-none"
        >
          <div
            v-if="isLoaded"
            class="row justify-between items-center"
          >
            <div
              class="col-12 col-sm-6 col-md-6"
            />
            <div
              class="col-12 col-sm-6 col-md-2"
            >
              <AppFilter
                @update="(keyword) => state.keyword = keyword"
              />
            </div>
          </div>
          <AppSkeleton
            v-else
          />
        </q-card-section>
        <q-card-section>
          <KeyList
            v-if="isLoaded"
            :keys="state.keys.filter(filter)"
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
  AppFilter,
  AppSkeleton,
  KeyList,
} from '@/components';

export default {
  name: 'KeyIndex',
  components: {
    AppFilter,
    AppSkeleton,
    KeyList,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      project: null,
      keys: null,
      keyword: '',
    });
    const isLoaded = computed(() => !!state.project && !!state.keys);
    const { projectId } = route.params;
    (async () => {
      try {
        const { data } = await actions.project.show({ projectId });
        state.project = data;
      } catch (err) {
        console.debug(err);
      }
    })();
    (async () => {
      try {
        const { data } = await actions.key.index({ projectId });
        state.keys = data;
      } catch (err) {
        console.debug(err);
      }
    })();
    const createValue = async ({ keyId, languageId, text }) => {
      try {
        const { data } = await actions.value.store({ keyId, languageId, text });
        const value = { ...data, language: { id: languageId } };
        state.keys.find((k) => k.id === keyId).values.push(value);
      } catch (err) {
        console.debug(err);
      }
    };
    const editValue = async ({ keyId, valueId, text }) => {
      try {
        const { data } = await actions.value.update({ valueId, text });
        const value = state.keys
          .find((k) => k.id === keyId).values
          .find((v) => v.id === valueId);
        Object.assign(value, data);
      } catch (err) {
        console.debug(err);
      }
    };
    const filter = (v) => v.name.toLowerCase().includes(state.keyword.toLowerCase());
    return {
      state,
      isLoaded,
      createValue,
      editValue,
      filter,
    };
  },
};
</script>
