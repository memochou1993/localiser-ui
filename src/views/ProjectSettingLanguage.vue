<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        text="Languages"
      />
      <div
        class="row justify-between items-center"
      >
        <div
          class="row justify-between items-center my-12"
        >
          <q-btn
            class="q-mr-sm"
            color="red-4"
            dense
            icon="mdi-plus"
            round
            @click="state.enableCreateForm = true"
          />
        </div>
        <div
          class="row justify-between items-center my-12"
        >
          <AppFilter
            :on-input="(v) => state.keyword = v"
          />
        </div>
      </div>
      <LanguageList
        :languages="project.languages"
        :needle="state.keyword"
        :on-delete-language="(data) => confirm({
          title: 'Are you sure?',
          content: 'Delete this language with all translations? This action cannot be undone.',
          action: 'Delete',
          callback: () => deleteLanguage(data),
        })"
        :on-edit-language="editLanguage"
        class="my-12"
      />
      <LanguageEditor
        v-if="state.enableCreateForm"
        :languages="project.languages"
        :on-close="() => state.enableCreateForm = false"
        :on-submit="createLanguage"
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
  },
  setup(props) {
    const store = useStore();
    const q = useQuasar();
    const state = reactive({
      keyword: '',
      enableCreateForm: false,
    });
    const confirm = (data) => store.commit('setConfirmation', data);
    const createLanguage = async ({ name, code }) => {
      try {
        const { data } = await actions.language.store({
          projectId: props.project.id,
          name,
          code,
        });
        const { project } = props;
        project.languages.push(data);
        props.onUpdateProject(project);
        q.notify({
          color: 'info',
          group: false,
          message: 'Language created.',
          timeout: 1000,
        });
      } catch (err) {
        console.debug(err);
      }
    };
    const editLanguage = async ({ languageId, name, code }) => {
      try {
        const { data } = await actions.language.update({
          languageId,
          name,
          code,
        });
        const { project } = props;
        const language = project.languages.find((l) => l.id === languageId);
        Object.assign(language, data);
        props.onUpdateProject(project);
        q.notify({
          color: 'info',
          group: false,
          message: 'Language updated.',
          timeout: 1000,
        });
      } catch (err) {
        console.debug(err);
      }
    };
    const deleteLanguage = async ({ languageId }) => {
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
          message: 'Language deleted.',
          timeout: 1000,
        });
      } catch (err) {
        console.debug(err);
      }
    };
    return {
      state,
      confirm,
      createLanguage,
      editLanguage,
      deleteLanguage,
    };
  },
};
</script>
