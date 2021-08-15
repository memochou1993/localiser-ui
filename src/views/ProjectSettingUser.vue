<template>
  <div>
    <div
      class="q-mb-lg"
    >
      <AppTextHeading
        text="Members"
      />
      <div
        class="row justify-between items-center"
      >
        <div
          class="row justify-between items-center q-my-sm"
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
          class="row justify-between items-center q-my-sm"
        >
          <AppFilter
            :on-input="(v) => state.keyword = v"
          />
        </div>
      </div>
      <UserList
        :me="me"
        :needle="state.keyword"
        :on-delete-user="(data) => confirm({
          title: 'Are you sure?',
          content: 'Remove this user from this project?',
          action: 'Remove',
          callback: () => detachUser(data),
        })"
        :users="project.users"
        scope="project"
        class="q-my-sm"
      />
      <ProjectUserEditor
        v-if="state.enableCreateForm"
        :default-user-options="users"
        :users="project.users"
        :on-close="() => state.enableCreateForm = false"
        :on-submit="attachUser"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
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
  ProjectUserEditor,
  UserList,
} from '@/components';

export default {
  name: 'ProjectSettingUser',
  components: {
    AppFilter,
    AppTextHeading,
    ProjectUserEditor,
    UserList,
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
    const me = computed(() => store.state.user);
    const confirm = (data) => store.commit('setConfirmation', data);
    const attachUser = async ({ users }) => {
      try {
        await actions.project.attachUser({
          projectId: props.project.id,
          users,
        });
        const { project } = props;
        project.users = project.users.concat(users);
        props.onUpdateProject(project);
        q.notify({
          color: 'info',
          group: false,
          message: 'Member added.',
          timeout: 1000,
        });
      } catch (e) {
        console.debug(e);
      }
    };
    const detachUser = async ({ userId }) => {
      try {
        await actions.project.detachUser({
          projectId: props.project.id,
          userId,
        });
        const { project } = props;
        project.users.splice(project.users.findIndex((u) => u.id === userId), 1);
        props.onUpdateProject(project);
        q.notify({
          color: 'info',
          group: false,
          message: 'Member removed.',
          timeout: 1000,
        });
      } catch (e) {
        console.debug(e);
      }
    };
    return {
      state,
      me,
      confirm,
      attachUser,
      detachUser,
    };
  },
};
</script>
