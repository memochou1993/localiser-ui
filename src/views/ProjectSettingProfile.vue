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
        :on-submit="(data) => confirm({
          title: 'Are you sure?',
          content: 'Delete this project with all translations? This action cannot be undone.',
          action: 'Delete',
          callback: () => deleteProject(data),
        })"
        :project-id="project.id"
      />
    </div>
  </div>
</template>

<script>
import {
  useStore,
} from 'vuex';
import {
  useRouter,
} from 'vue-router';
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
    const router = useRouter();
    const confirm = (data) => store.commit('setConfirmation', data);
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
    const deleteProject = async ({ projectId }) => {
      try {
        await actions.project.destroy({
          projectId,
        });
        props.onUpdateProject(null);
        await router.push({ name: 'project.index' });
      } catch (err) {
        console.debug(err);
      }
    };
    return {
      confirm,
      editProject,
      deleteProject,
    };
  },
};
</script>
