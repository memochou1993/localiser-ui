<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        :text="t('__TitleLanguages')"
      />
      <div
        class="row justify-between items-center"
      >
        <div
          class="row justify-between items-center q-my-sm"
        >
          <div
            class="q-mr-sm"
          >
            <q-btn
              v-if="project.allow('create-languages')"
              color="red-4"
              dense
              icon="mdi-plus"
              round
              @click="state.enableCreateForm = true"
            />
            <LanguageEditor
              v-if="state.enableCreateForm"
              :languages="project.languages"
              :on-close="() => state.enableCreateForm = false"
              :on-submit="createLanguage"
            />
          </div>
        </div>
        <div
          class="row justify-between items-center q-my-sm"
        >
          <AppFilter
            :on-input="(v) => state.keyword = v"
          />
        </div>
      </div>
      <LanguageList
        :enable-delete-button="project.allow('delete-languages')"
        :enable-edit-button="project.allow('update-languages')"
        :languages="project.languages"
        :needle="state.keyword"
        :on-delete-language="(data) => confirm({
          title: 'Are you sure?',
          content: 'Delete this language with all translations? This action cannot be undone.',
          action: 'Delete',
          callback: () => deleteLanguage(data),
        })"
        :on-edit-language="editLanguage"
        class="q-my-sm"
      />
    </div>
  </div>
</template>

<script>
import {
  reactive,
} from 'vue';
import {
  useStore,
} from 'vuex';
import { useI18n } from 'vue-i18n/index';
import { useQuasar } from 'quasar';
import * as actions from '@/actions';
import {
  AppFilter,
  AppTextHeading,
  LanguageEditor,
  LanguageList,
} from '@/components';

export default {
  name: 'ProjectSettingLanguage',
  components: {
    AppFilter,
    AppTextHeading,
    LanguageEditor,
    LanguageList,
  },
  props: {
    onUpdateProject: {
      type: Function,
      default: () => {},
    },
    project: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore();
    const { t } = useI18n();
    const q = useQuasar();
    const state = reactive({
      keyword: '',
      enableCreateForm: false,
    });
    const confirm = (data) => store.commit('setConfirmation', data);
    const createLanguage = async ({
      name,
      locale,
    }) => {
      try {
        const { data } = await actions.language.store({
          projectId: props.project.id,
          name,
          locale,
        });
        const { project } = props;
        project.languages.push(data);
        props.onUpdateProject(project);
        q.notify({
          color: 'info',
          group: false,
          message: t('__NotificationLanguageCreated'),
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
    const editLanguage = async ({
      languageId,
      name,
      locale,
    }) => {
      try {
        const { data } = await actions.language.update({
          languageId,
          name,
          locale,
        });
        const { project } = props;
        const language = project.languages.find((l) => l.id === languageId);
        Object.assign(language, data);
        props.onUpdateProject(project);
        q.notify({
          color: 'info',
          group: false,
          message: t('__NotificationLanguageUpdated'),
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
    const deleteLanguage = async ({
      languageId,
    }) => {
      try {
        await actions.language.destroy({
          languageId,
        });
        const { project } = props;
        project.languages.splice(project.languages.findIndex((l) => l.id === languageId), 1);
        props.onUpdateProject(project);
        q.notify({
          color: 'info',
          group: false,
          message: t('__NotificationLanguageDeleted'),
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
      confirm,
      createLanguage,
      editLanguage,
      deleteLanguage,
    };
  },
};
</script>
