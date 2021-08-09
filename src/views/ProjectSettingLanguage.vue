<template>
  <div>
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
      :on-delete-language="deleteLanguage"
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
</template>

<script>
import {
  reactive,
} from 'vue';
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
    project: {
      type: Object,
      required: true,
    },
    onUpdateProject: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      keyword: '',
      enableCreateForm: false,
    });
    const createLanguage = async ({ name, code }) => {
      try {
        const { data } = await actions.language.store({
          projectId: props.project.id,
          name,
          code,
        });
        const { project } = props;
        project.languages.unshift(data);
        props.onUpdateProject(project);
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
      } catch (err) {
        console.debug(err);
      }
    };
    return {
      state,
      createLanguage,
      editLanguage,
      deleteLanguage,
    };
  },
};
</script>
