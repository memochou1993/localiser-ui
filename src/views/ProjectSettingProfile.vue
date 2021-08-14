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
        class="q-my-sm"
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
        class="q-my-sm"
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
import { useQuasar } from 'quasar';
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
    const q = useQuasar();
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
        q.notify({
          color: 'info',
          message: 'Project updated.',
          timeout: 1000,
        });
      } catch (e) {
        console.debug(e);
      }
    };
    const deleteProject = async ({ projectId }) => {
      try {
        await actions.project.destroy({
          projectId,
        });
        props.onUpdateProject(null);
        q.notify({
          color: 'info',
          message: 'Project deleted.',
          timeout: 1000,
        });
        await router.push({ name: 'project.index' });
      } catch (e) {
        console.debug(e);
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
