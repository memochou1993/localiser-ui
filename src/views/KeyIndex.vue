<template>
  <div>
    <template
      v-if="isLoaded"
    >
      <div
        class="q-my-sm"
      >
        <q-breadcrumbs
          v-if="isLoaded"
          active-color="info"
        >
          <q-breadcrumbs-el
            :to="{ name: 'project.index' }"
            label="Projects"
          />
          <q-breadcrumbs-el
            :label="state.project.name"
          />
        </q-breadcrumbs>
      </div>
      <div
        class="row justify-between items-end"
      >
        <div
          class="row justify-between items-end q-my-sm"
        >
          <q-btn
            class="q-px-sm q-mr-sm"
            color="grey-8"
            dense
            label="Create"
            no-caps
            outline
            @click="state.createForm = true"
          />
          <q-btn
            :to="{ name: 'project.profile', params: { projectId: state.project.id } }"
            class="q-px-sm q-mr-sm"
            color="grey-8"
            dense
            label="Settings"
            no-caps
            outline
          />
        </div>
        <div
          class="row justify-between items-end q-my-sm"
        >
          <AppFilter
            :on-input="(v) => state.keyword = v"
          />
        </div>
      </div>
      <div
        class="q-my-sm"
      >
        <KeyList
          v-if="isLoaded"
          :keys="state.keys.filter(filter)"
          :on-create-value="createValue"
          :on-delete-key="deleteKey"
          :on-edit-key="editKey"
          :on-edit-value="editValue"
          :languages="state.project.languages"
        />
      </div>
      <KeyEditor
        v-if="state.createForm"
        :keys="state.keys"
        :on-close="() => state.createForm = false"
        :on-submit="createKey"
      />
    </template>
    <AppLoading
      v-else
    />
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
  AppLoading,
  KeyEditor,
  KeyList,
} from '@/components';

export default {
  name: 'KeyIndex',
  components: {
    AppFilter,
    AppLoading,
    KeyEditor,
    KeyList,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      project: null,
      keys: null,
      createForm: false,
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
    const filter = (k) => {
      const keyword = state.keyword.toLowerCase();
      return k.name.toLowerCase().includes(keyword)
        || k.values.some((v) => v.text?.toLowerCase().includes(keyword));
    };
    const createKey = async ({ name }) => {
      try {
        const { data } = await actions.key.store({
          projectId,
          name,
        });
        const key = { ...data, values: [] };
        state.keys.unshift(key);
      } catch (err) {
        console.debug(err);
      }
    };
    const editKey = async ({ keyId, name }) => {
      try {
        const { data } = await actions.key.update({ keyId, name });
        const key = state.keys.find((k) => k.id === keyId);
        Object.assign(key, data);
      } catch (err) {
        console.debug(err);
      }
    };
    const deleteKey = async ({ keyId }) => {
      try {
        await actions.key.destroy({
          keyId,
        });
        state.keys.splice(state.keys.findIndex((k) => k.id === keyId), 1);
      } catch (err) {
        console.debug(err);
      }
    };
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
        const value = state.keys.find((k) => k.id === keyId).values.find((v) => v.id === valueId);
        Object.assign(value, data);
      } catch (err) {
        console.debug(err);
      }
    };
    return {
      state,
      isLoaded,
      filter,
      createKey,
      editKey,
      deleteKey,
      createValue,
      editValue,
    };
  },
};
</script>
