<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        text="General"
      />
      <div
        class="row"
      />
      <ProjectEditorGeneral
        :default-name="project.name"
        :on-submit="editProject"
        :project-id="project.id"
        class="my-12"
      />
    </div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        text="Danger Zone"
      />
      <div
        class="row"
      />
      <ProjectEditorDanger
        :on-submit="deleteProject"
        :project-id="project.id"
      />
    </div>
  </div>
</template>

<script>
import * as actions from '@/actions';
import {
  ProjectEditorDanger,
  ProjectEditorGeneral,
  AppTextHeading,
} from '@/components';

export default {
  name: 'ProjectSettingProfile',
  components: {
    ProjectEditorDanger,
    ProjectEditorGeneral,
    AppTextHeading,
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
    const editProject = async ({ projectId, name }) => {
      try {
        const { data } = await actions.project.update({
          projectId,
          name,
        });
        const { project } = props;
        Object.assign(project, data);
        props.onUpdateProject(project);
      } catch (err) {
        console.debug(err);
      }
    };
    const deleteProject = async () => {
      // TODO
    };
    return {
      editProject,
      deleteProject,
    };
  },
};
</script>
