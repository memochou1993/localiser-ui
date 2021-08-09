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
      <q-card
        bordered
        flat
        class="q-pa-md my-12"
      >
        <q-card-section
          class="q-py-none"
        >
          <div
            class="row justify-between items-center"
          >
            <div
              class="col-12 col-md-8"
            >
              <AppTextCaption
                text="Delete this project"
              />
              <span
                v-text="'Once you delete a project, there is no going back. Please be certain.'"
              />
            </div>
            <div
              class="col-12 col-md-4 text-sm-right"
            >
              <q-btn
                class="text-red q-my-md"
                label="Delete this project"
                no-caps
                outline
                unelevated
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import * as actions from '@/actions';
import {
  AppTextCaption,
  ProjectEditorGeneral,
  AppTextHeading,
} from '@/components';

export default {
  name: 'ProjectSettingProfile',
  components: {
    AppTextCaption,
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
    return {
      editProject,
    };
  },
};
</script>
