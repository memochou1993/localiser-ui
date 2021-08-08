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
    <q-table
      :rows="project.languages"
      :columns="columns"
      :pagination="{ rowsPerPage: 0 }"
      bordered
      flat
      hide-bottom
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
  ProjectSettingHeading,
} from '@/components';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    sortable: false,
  },
  {
    name: 'code',
    required: true,
    label: 'Code',
    align: 'left',
    field: (row) => row.code,
    sortable: false,
  },
];

export default {
  name: 'ProjectSettingLanguage',
  components: {
    LanguageEditor,
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
      columns,
      createLanguage,
    };
  },
};
</script>
