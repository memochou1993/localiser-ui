<template>
  <div>
    <template
      v-if="isLoaded"
    >
      <div
        class="text-h6 text-weight-regular my-12"
        v-text="t('__ViewTitleProjectIndex')"
      />
      <div
        class="row justify-between items-center"
      >
        <div
          class="row justify-between items-center my-12"
        >
          <div
            class="q-mr-sm"
          >
            <q-btn
              color="red-4"
              dense
              icon="mdi-plus"
              round
              @click="state.enableCreateForm = true"
            />
            <ProjectEditor
              v-if="state.enableCreateForm"
              :projects="state.projects"
              :on-close="() => state.enableCreateForm = false"
              :on-submit="createProject"
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
      <ProjectList
        v-if="isLoaded"
        :needle="state.keyword"
        :projects="state.projects"
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
import { useI18n } from 'vue-i18n/index';
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  AppFilter,
  AppLoading,
  ProjectEditor,
  ProjectList,
} from '@/components';

export default {
  name: 'ProjectIndex',
  components: {
    AppFilter,
    AppLoading,
    ProjectEditor,
    ProjectList,
  },
  setup() {
    const { t } = useI18n();
    const q = useQuasar();
    const state = reactive({
      projects: null,
      enableCreateForm: false,
      keyword: '',
    });
    const isLoaded = computed(() => !!state.projects);
    (async () => {
      try {
        const { data } = await actions.project.index();
        state.projects = data;
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText,
          timeout: 1000,
        });
      }
    })();
    const createProject = async ({
      name,
      description,
      languages,
    }) => {
      try {
        const { data } = await actions.project.store({
          name,
          description,
          languages,
        });
        const project = { ...data, languages };
        state.projects.unshift(project);
        q.notify({
          color: 'info',
          group: false,
          message: t('__NotificationProjectCreated'),
          timeout: 1000,
        });
      } catch (e) {
        q.notify({
          color: 'negative',
          message: e?.response?.data?.message || e.statusText,
          timeout: 1000,
        });
      }
    };
    return {
      t,
      state,
      isLoaded,
      createProject,
    };
  },
};
</script>
