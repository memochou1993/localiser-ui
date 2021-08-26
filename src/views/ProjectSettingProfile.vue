<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        :text="t('__TitleGeneral')"
      />
      <div
        class="row"
      />
      <ProjectEditorGeneral
        :default-description="project.description"
        :default-name="project.name"
        :default-key-prefix="project.settings.keyPrefix"
        :default-key-suffix="project.settings.keySuffix"
        :enable-submit-button="project.allow('update-projects')"
        :on-submit="editProject"
        :project-id="project.id"
        class="q-my-sm"
      />
    </div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        :text="t('__TitleDangerZone')"
      />
      <div
        class="row"
      />
      <ProjectEditorDanger
        :enable-delete-button="project.allow('delete-projects')"
        :on-submit="(data) => confirm({
          title: t('__ConfirmationTitle'),
          content: t('__ConfirmationDeleteProject'),
          action: t('__ButtonDelete'),
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
import { useI18n } from 'vue-i18n/index';
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
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const q = useQuasar();
    const confirm = (data) => store.commit('setConfirmation', data);
    const editProject = async ({
      projectId,
      name,
      description,
      keyPrefix,
      keySuffix,
    }) => {
      try {
        const { data } = await actions.project.update({
          projectId,
          name,
          description,
          settings: {
            keyPrefix,
            keySuffix,
          },
        });
        const { project } = props;
        Object.assign(project, data);
        props.onUpdateProject(project);
        q.notify({
          color: 'positive',
          group: false,
          message: t('__NotificationProjectUpdated'),
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
    const deleteProject = async ({
      projectId,
    }) => {
      try {
        await actions.project.destroy({
          projectId,
        });
        props.onUpdateProject(null);
        q.notify({
          color: 'positive',
          group: false,
          message: t('__NotificationProjectDeleted'),
          timeout: 1000,
        });
        await router.push({ name: 'project.index' });
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
      confirm,
      editProject,
      deleteProject,
    };
  },
};
</script>
