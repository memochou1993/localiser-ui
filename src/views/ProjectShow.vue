<template>
  <div>
    <template
      v-if="isLoaded"
    >
      <AppBreadcrumb
        :breadcrumbs="[
          { label: 'Projects', to: { name: 'project.index' } },
          { label: state.project.name },
        ]"
        class="my-12"
      />
      <div
        class="row justify-between items-center"
      >
        <div
          class="row justify-between items-center my-12"
        >
          <div>
            <q-btn
              class="q-mr-sm"
              color="red-4"
              dense
              icon="mdi-plus"
              round
              @click="state.enableCreateForm = true"
            />
          </div>
          <div>
            <q-btn
              class="q-mr-sm"
              color="indigo-4"
              dense
              icon="mdi-dots-horizontal"
              round
            />
            <ProjectMenu />
          </div>
        </div>
        <div
          class="row justify-between items-center my-12"
        >
          <AppFilter
            :on-input="(v) => state.keyword = v"
          />
        </div>
      </div>
      <KeyList
        v-if="isLoaded"
        :keys="state.keys"
        :languages="state.project.languages"
        :needle="state.keyword"
        :on-create-value="createValue"
        :on-delete-key="(data) => confirm({
          title: 'Are you sure?',
          content: 'Delete this key with all translations? This action cannot be undone.',
          action: 'Delete',
          callback: () => deleteKey(data),
        })"
        :on-edit-key="editKey"
        :on-edit-value="editValue"
        class="my-12"
      />
      <KeyEditor
        v-if="state.enableCreateForm"
        :keys="state.keys"
        :on-close="() => state.enableCreateForm = false"
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
  useStore,
} from 'vuex';
import {
  useRoute,
  useRouter,
} from 'vue-router';
import * as actions from '@/actions';
import {
  AppBreadcrumb,
  AppFilter,
  AppLoading,
  KeyEditor,
  KeyList,
  ProjectMenu,
} from '@/components';

export default {
  name: 'ProjectShow',
  components: {
    AppBreadcrumb,
    AppFilter,
    AppLoading,
    KeyEditor,
    KeyList,
    ProjectMenu,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      project: null,
      keys: null,
      enableCreateForm: false,
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
        return router.push({ name: 'project.index' });
      }
      try {
        const { data } = await actions.key.index({ projectId });
        state.keys = data;
      } catch (err) {
        console.debug(err);
        return router.push({ name: 'project.index' });
      }
      return null;
    })();
    const confirm = (data) => store.commit('setConfirmation', data);
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
      confirm,
      createKey,
      editKey,
      deleteKey,
      createValue,
      editValue,
    };
  },
};
</script>
