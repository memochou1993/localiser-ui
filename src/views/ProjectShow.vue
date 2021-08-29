<template>
  <div>
    <template
      v-if="isLoaded"
    >
      <AppBreadcrumb
        :breadcrumbs="[
          { label: t('__ViewTitleProjectIndex'), to: { name: 'project.index' } },
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
          <div
            v-if="state.project.allow('create-keys')"
            class="q-mr-sm"
          >
            <q-btn
              color="red-4"
              dense
              icon="mdi-plus"
              round
              @click="state.enableCreateForm = true"
            />
            <KeyEditor
              v-if="state.enableCreateForm"
              :keys="state.keys"
              :on-close="() => state.enableCreateForm = false"
              :on-submit="createKey"
            />
          </div>
          <div
            v-if="state.project.allow('update-projects')"
            class="q-mr-sm"
          >
            <q-btn
              color="indigo-4"
              dense
              icon="mdi-dots-horizontal"
              round
            />
            <ProjectMenu
              :on-clear-cache="clearCache"
            />
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
        :enable-key-destroyer="state.project.allow('delete-keys')"
        :enable-key-editor="state.project.allow('update-keys')"
        :enable-menu="state.project.allow('update-keys')"
        :enable-value-creator="state.project.allow('create-values')"
        :enable-value-editor="state.project.allow('update-values')"
        :key-prefix="state.project.settings.keyPrefix"
        :key-suffix="state.project.settings.keySuffix"
        :keys="state.keys"
        :languages="state.project.languages"
        :needle="state.keyword"
        :on-create-value="createValue"
        :on-delete-key="(data) => confirm({
          title: t('__ConfirmationTitle'),
          content: t('__ConfirmationDeleteKey'),
          action: t('__ButtonDelete'),
          callback: () => deleteKey(data),
        })"
        :on-edit-key="editKey"
        :on-edit-value="editValue"
        class="my-12"
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
import { useI18n } from 'vue-i18n/index';
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  Project,
} from '@/models';
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
    const { t } = useI18n();
    const q = useQuasar();
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
        const { data } = await actions.project.fetch({
          projectId,
        });
        state.project = Object.assign(new Project(), data);
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
        return router.push({ name: 'project.index' });
      }
      try {
        const { data } = await actions.key.index({
          projectId,
        });
        state.keys = data;
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
        return router.push({ name: 'project.index' });
      }
      return null;
    })();
    const confirm = (data) => store.commit('setConfirmation', data);
    const clearCache = async () => {
      try {
        await actions.project.destroyLocales({
          projectId: state.project.id,
        });
        await actions.project.destroyMessages({
          projectId: state.project.id,
        });
        q.notify({
          color: 'positive',
          group: false,
          message: t('__NotificationCacheCleared'),
          timeout: 1000,
        });
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
      }
    };
    const createKey = async ({
      name,
    }) => {
      try {
        const { data } = await actions.key.store({
          projectId,
          name,
        });
        const key = { ...data, values: [] };
        state.keys.unshift(key);
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
      }
    };
    const editKey = async ({
      keyId,
      name,
    }) => {
      try {
        const { data } = await actions.key.update({
          keyId,
          name,
        });
        const key = state.keys.find((k) => k.id === keyId);
        Object.assign(key, data);
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
      }
    };
    const deleteKey = async ({
      keyId,
    }) => {
      try {
        await actions.key.destroy({
          keyId,
        });
        state.keys.splice(state.keys.findIndex((k) => k.id === keyId), 1);
        q.notify({
          color: 'positive',
          group: false,
          message: t('__NotificationKeyDeleted'),
          timeout: 1000,
        });
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
      }
    };
    const createValue = async ({
      keyId,
      languageId,
      text,
    }) => {
      try {
        const { data } = await actions.value.store({
          keyId,
          languageId,
          text,
        });
        const value = { ...data, language: { id: languageId } };
        state.keys.find((k) => k.id === keyId).values.push(value);
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
      }
    };
    const editValue = async ({
      keyId,
      valueId,
      text,
    }) => {
      try {
        const { data } = await actions.value.update({
          valueId,
          text,
        });
        const value = state.keys.find((k) => k.id === keyId).values.find((v) => v.id === valueId);
        Object.assign(value, data);
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText || e.message,
          timeout: 1000,
        });
      }
    };
    return {
      t,
      state,
      isLoaded,
      confirm,
      clearCache,
      createKey,
      editKey,
      deleteKey,
      createValue,
      editValue,
    };
  },
};
</script>
