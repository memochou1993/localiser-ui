<template>
  <div>
    <ProjectSettingHeading
      text="Languages"
    />
    <div
      class="q-mb-lg"
    >
      <q-btn
        class="q-mr-sm"
        color="red-4"
        dense
        icon="mdi-plus"
        round
        @click="state.createForm = true"
      />
    </div>
    <LanguageList
      :languages="project.languages"
    />
    <LanguageEditor
      v-if="state.createForm"
      :languages="project.languages"
      :on-close="() => state.createForm = false"
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
  LanguageEditor,
  LanguageList,
  ProjectSettingHeading,
} from '@/components';

export default {
  name: 'ProjectSettingLanguage',
  components: {
    LanguageEditor,
    LanguageList,
    ProjectSettingHeading,
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
      createForm: false,
    });
    const createLanguage = async ({ name, code }) => {
      const { data } = await actions.language.store({
        projectId: props.project.id,
        name,
        code,
      });
      const { project } = props;
      project.languages.unshift(data);
      props.onUpdateProject(project);
    };
    return {
      state,
      createLanguage,
    };
  },
};
</script>
