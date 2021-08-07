<template>
  <div
    class="row justify-center"
  >
    <div
      class="col-10"
    >
      <q-card
        class="q-pa-md shadow-4"
      >
        <q-card-section
          class="q-pa-none"
        >
          <div
            class="row"
          >
            <div
              class="col-12 col-sm-4 q-pa-md"
            >
              <ProjectSettingMenu />
            </div>
            <div
              class="col-12 col-sm-8 q-pa-md"
            >
              <router-view
                v-if="isLoaded"
                :on-update-project="updateProject"
                :project="state.project"
                style="min-height: 500px"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  computed,
  reactive,
} from 'vue';
import {
  useRoute,
} from 'vue-router';
import * as actions from '@/actions';
import {
  ProjectSettingMenu,
} from '@/components';

export default {
  name: 'ProjectSetting',
  components: {
    ProjectSettingMenu,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      project: null,
    });
    const isLoaded = computed(() => !!state.project);
    const { projectId } = route.params;
    (async () => {
      try {
        const { data } = await actions.project.show({ projectId });
        state.project = data;
      } catch (err) {
        console.debug(err);
      }
    })();
    const updateProject = ({ name }) => {
      actions.project.update({
        projectId,
        name,
      });
    };
    return {
      state,
      isLoaded,
      updateProject,
    };
  },
};
</script>
